/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */

// as we use this in bootstrap.
Roo.namespace('Roo.form');
 /**
 * @class Roo.form.Action
 * Internal Class used to handle form actions
 * @constructor
 * @param {Roo.form.BasicForm} el The form element or its id
 * @param {Object} config Configuration options
 */

 
 
// define the action interface
Roo.form.Action = function(form, options){
    this.form = form;
    this.options = options || {};
};
/**
 * Client Validation Failed
 * @const 
 */
Roo.form.Action.CLIENT_INVALID = 'client';
/**
 * Server Validation Failed
 * @const 
 */
Roo.form.Action.SERVER_INVALID = 'server';
 /**
 * Connect to Server Failed
 * @const 
 */
Roo.form.Action.CONNECT_FAILURE = 'connect';
/**
 * Reading Data from Server Failed
 * @const 
 */
Roo.form.Action.LOAD_FAILURE = 'load';

Roo.form.Action.prototype = {
    type : 'default',
    failureType : undefined,
    response : undefined,
    result : undefined,

    // interface method
    run : function(options){

    },

    // interface method
    success : function(response){

    },

    // interface method
    handleResponse : function(response){

    },

    // default connection failure
    failure : function(response){
        
        this.response = response;
        this.failureType = Roo.form.Action.CONNECT_FAILURE;
        this.form.afterAction(this, false);
    },

    processResponse : function(response){
        this.response = response;
        if(!response.responseText){
            return true;
        }
        this.result = this.handleResponse(response);
        return this.result;
    },

    // utility functions used internally
    getUrl : function(appendParams){
        var url = this.options.url || this.form.url || this.form.el.dom.action;
        if(appendParams){
            var p = this.getParams();
            if(p){
                url += (url.indexOf('?') != -1 ? '&' : '?') + p;
            }
        }
        return url;
    },

    getMethod : function(){
        return (this.options.method || this.form.method || this.form.el.dom.method || 'POST').toUpperCase();
    },

    getParams : function(){
        var bp = this.form.baseParams;
        var p = this.options.params;
        if(p){
            if(typeof p == "object"){
                p = Roo.urlEncode(Roo.applyIf(p, bp));
            }else if(typeof p == 'string' && bp){
                p += '&' + Roo.urlEncode(bp);
            }
        }else if(bp){
            p = Roo.urlEncode(bp);
        }
        return p;
    },

    createCallback : function(){
        return {
            success: this.success,
            failure: this.failure,
            scope: this,
            timeout: (this.form.timeout*1000),
            upload: this.form.fileUpload ? this.success : undefined
        };
    }
};

Roo.form.Action.Submit = function(form, options){
    Roo.form.Action.Submit.superclass.constructor.call(this, form, options);
};

Roo.extend(Roo.form.Action.Submit, Roo.form.Action, {
    type : 'submit',

    haveProgress : false,
    uploadComplete : false,
    
    // uploadProgress indicator.
    uploadProgress : function()
    {
        if (!this.form.progressUrl) {
            return;
        }
        
        if (!this.haveProgress) {
            Roo.MessageBox.progress("Uploading", "Uploading");
        }
        if (this.uploadComplete) {
           Roo.MessageBox.hide();
           return;
        }
        
        this.haveProgress = true;
   
        var uid = this.form.findField('UPLOAD_IDENTIFIER').getValue();
        
        var c = new Roo.data.Connection();
        c.request({
            url : this.form.progressUrl,
            params: {
                id : uid
            },
            method: 'GET',
            success : function(req){
               //console.log(data);
                var rdata = false;
                var edata;
                try  {
                   rdata = Roo.decode(req.responseText)
                } catch (e) {
                    Roo.log("Invalid data from server..");
                    Roo.log(edata);
                    return;
                }
                if (!rdata || !rdata.success) {
                    Roo.log(rdata);
                    Roo.MessageBox.alert(Roo.encode(rdata));
                    return;
                }
                var data = rdata.data;
                
                if (this.uploadComplete) {
                   Roo.MessageBox.hide();
                   return;
                }
                   
                if (data){
                    Roo.MessageBox.updateProgress(data.bytes_uploaded/data.bytes_total,
                       Math.floor((data.bytes_total - data.bytes_uploaded)/1000) + 'k remaining'
                    );
                }
                this.uploadProgress.defer(2000,this);
            },
       
            failure: function(data) {
                Roo.log('progress url failed ');
                Roo.log(data);
            },
            scope : this
        });
           
    },
    
    
    run : function()
    {
        // run get Values on the form, so it syncs any secondary forms.
        this.form.getValues();
        
        var o = this.options;
        var method = this.getMethod();
        var isPost = method == 'POST';
        if(o.clientValidation === false || this.form.isValid()){

            // Check if SSE mode is enabled
            if (this.form.useSSE || o.useSSE) {
                this.runSSE();
                return;
            }
            
            if (this.form.progressUrl) {
                this.form.findField('UPLOAD_IDENTIFIER').setValue(
                    (new Date() * 1) + '' + Math.random());
                    
            } 

            Roo.Ajax.request(Roo.apply(this.createCallback(), {
                form:this.form.el.dom,
                url:this.getUrl(!isPost),
                method: method,
                params:isPost ? this.getParams() : null,
                isUpload: this.form.fileUpload,
                formData : this.form.formData
            }));
            
            this.uploadProgress();

        }else if (o.clientValidation !== false){ // client validation failed
            this.failureType = Roo.form.Action.CLIENT_INVALID;
            this.form.afterAction(this, false);
        }
    },

    /**
     * Run form submit using SSE (Server-Sent Events) for streaming response
     */
    runSSE : function()
    {
        var _this = this;
        var form = this.form;
        
        Roo.log('=== SSE: Starting runSSE ===');
        Roo.log('SSE: Form URL: ' + this.getUrl(false));
        
        // Build FormData from form
        var formData = new FormData(form.el.dom);
        
        // Add any extra params
        var params = this.options.params || {};
        for (var key in params) {
            formData.append(key, params[key]);
            Roo.log('SSE: Added param: ' + key + ' = ' + params[key]);
        }
        
        // Show progress
        Roo.MessageBox.progress("Processing", "Starting...");
        
        Roo.log('SSE: Calling fetch...');
        
        fetch(this.getUrl(false), {
            method: 'POST',
            body: formData
        }).then(function(response) {
            Roo.log('SSE: Fetch response received');
            Roo.log('SSE: Response OK: ' + response.ok);
            Roo.log('SSE: Response status: ' + response.status);

            
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.status);
            }
            
            var reader = response.body.getReader();
            var decoder = new TextDecoder();
            var buffer = '';
            var chunkCount = 0;
            
            // Fake progress animation state
            var fakeProgressInterval = null;
            var baseProgress = 0;           // The real progress from server
            var progressMessage = 'Processing...';
            
            // Function to stop fake progress animation
            function stopFakeProgress() {
                if (fakeProgressInterval) {
                    clearInterval(fakeProgressInterval);
                    fakeProgressInterval = null;
                    Roo.log('SSE: Stopped fake progress animation');
                }
            }
            
            // Function to start fake progress animation
            // totalSteps: total number of steps (e.g., 4 means each step = 25%)
            function startFakeProgress(realProgress, message, totalSteps) {
                stopFakeProgress(); // Clear any existing animation
                
                baseProgress = realProgress;
                progressMessage = message || 'Processing...';
                totalSteps = totalSteps || 1;  // Default to 1 step if not provided
                
                // Calculate step space (how much % each step represents)
                var stepSpace = 100 / totalSteps;
                
                // Oscillation step: 20% of step space
                // e.g., 1 step -> stepSpace=100% -> oscillateStep=20%
                var oscillateStep = stepSpace * 0.20;
                
                // Animation phases:
                // Phase 1 (initial climb): 0 -> 1 -> 2 -> 3 -> 4 (offset 0 to maxOffset)
                // Phase 2 (bounce): 4 -> 3 -> 2 -> 3 -> 4 -> 3 -> 2 -> ... (between minBounce and maxOffset)
                var tickCount = 0;
                var maxOffset = 4;    // Peak offset (80% of stepSpace)
                var minBounce = 2;    // Lower bound for bounce (40% of stepSpace)
                var currentOffset = 0;
                var goingUp = true;
                var inBouncePhase = false;
                
                Roo.log('SSE: Starting fake progress animation from ' + baseProgress + '%, stepSpace=' + stepSpace + '%, oscillateStep=' + oscillateStep + '%');
                
                // Oscillate every 1 second
                fakeProgressInterval = setInterval(function() {
                    tickCount++;
                    
                    if (!inBouncePhase) {
                        // Phase 1: Initial climb from 0 to maxOffset
                        currentOffset = tickCount;
                        if (currentOffset >= maxOffset) {
                            currentOffset = maxOffset;
                            inBouncePhase = true;
                            goingUp = false;  // Start going down after reaching peak
                        }
                    } else {
                        // Phase 2: Bounce between minBounce and maxOffset
                        if (goingUp) {
                            currentOffset++;
                            if (currentOffset >= maxOffset) {
                                currentOffset = maxOffset;
                                goingUp = false;
                            }
                        } else {
                            currentOffset--;
                            if (currentOffset <= minBounce) {
                                currentOffset = minBounce;
                                goingUp = true;
                            }
                        }
                    }
                    
                    var displayedProgress = baseProgress + (currentOffset * oscillateStep);
                    
                    // Roo.log('SSE: Fake progress update: ' + displayedProgress.toFixed(2) + '% (offset=' + currentOffset + ', bounce=' + inBouncePhase + ')');
                    Roo.MessageBox.updateProgress(
                        displayedProgress / 100,
                        progressMessage
                    );
                }, 1000);
            }
            
            Roo.log('SSE: Starting to read stream...');
            
            // Track if we've already handled a terminal event (error/complete)
            var finished = false;
            
            function read() {
                reader.read().then(function(result) {
                    chunkCount++;
                    Roo.log('SSE: Chunk #' + chunkCount + ' received, done=' + result.done);
                    
                    if (result.done) {
                        Roo.log('SSE: Stream complete, finished=' + finished);
                        stopFakeProgress();
                        // Only hide MessageBox if we haven't already handled error/complete
                        if (!finished) {
                            Roo.MessageBox.hide();
                        }
                        return;
                    }
                    
                    // Don't process more chunks if we've already finished
                    if (finished) {
                        Roo.log('SSE: Ignoring chunk - already finished');
                        return;
                    }
                    
                    var chunk = decoder.decode(result.value, {stream: true});
                    Roo.log('SSE: Raw chunk (' + chunk.length + ' chars): ' + chunk.substring(0, 200));
                    
                    buffer += chunk;
                    var lines = buffer.split('\n');
                    buffer = lines.pop(); // Keep incomplete line
                    
                    Roo.log('SSE: Processing ' + lines.length + ' lines, buffer remaining: ' + buffer.length + ' chars');
                    
                    var currentEvent = null;
                    
                    lines.forEach(function(line) {
                        if (line.trim() === '') {
                            return; // Skip empty lines
                        }
                        
                        Roo.log('SSE: Line: "' + line + '"');
                        
                        if (line.startsWith('event: ')) {
                            currentEvent = line.substring(7).trim();
                            Roo.log('SSE: Event type: ' + currentEvent);
                        } else if (line.startsWith('data: ')) {
                            var jsonStr = line.substring(6);
                            Roo.log('SSE: Data JSON (' + jsonStr.length + ' chars): ' + jsonStr.substring(0, 100) + '...');
                            
                            try {
                                var data = JSON.parse(jsonStr);
                                Roo.log('SSE: Parsed data for event "' + currentEvent + '":');
                                Roo.log(data);
                                
                                if (currentEvent === 'progress' && data.progress !== undefined) {
                                    Roo.log('SSE: Updating progress: ' + data.progress + '%');
                                    // Show real progress immediately
                                    Roo.MessageBox.updateProgress(
                                        data.progress / 100, 
                                        data.message || 'Processing...'
                                    );
                                    // Start fake progress animation for this step
                                    // data.total = total number of steps (e.g., 4)
                                    startFakeProgress(data.progress, data.message, data.total);
                                } else if (currentEvent === 'error') {
                                    Roo.log('SSE: ERROR event received');
                                    finished = true;  // Mark as finished before showing error
                                    stopFakeProgress();
                                    _this.failureType = Roo.form.Action.SERVER_INVALID;
                                    _this.result = data;
                                    form.afterAction(_this, false);
                                    return; // Stop processing this chunk
                                } else if (currentEvent === 'complete') {
                                    Roo.log('SSE: COMPLETE event received, success=' + data.success);
                                    finished = true;  // Mark as finished
                                    stopFakeProgress();
                                    Roo.MessageBox.hide();
                                    _this.result = data;
                                    if (data.success) {
                                        Roo.log('SSE: Calling form.afterAction with success=true');
                                        form.afterAction(_this, true);
                                    } else {
                                        Roo.log('SSE: Calling form.afterAction with success=false');
                                        _this.failureType = Roo.form.Action.SERVER_INVALID;
                                        form.afterAction(_this, false);
                                    }
                                    return; // Stop processing this chunk
                                } else {
                                    Roo.log('SSE: Unknown event type or no progress: ' + currentEvent);
                                }
                            } catch (e) {
                                Roo.log('SSE: JSON parse error: ' + e);
                                Roo.log('SSE: Failed JSON string: ' + jsonStr);
                                finished = true;  // Mark as finished
                                stopFakeProgress();
                                _this.failureType = Roo.form.Action.SERVER_INVALID;
                                _this.result = {
                                    success: false,
                                    errorMsg: "Failed to read server message: " + jsonStr.substring(0, 200),
                                    errors: []
                                };
                                form.afterAction(_this, false);
                                return;
                            }
                            currentEvent = null;
                        } else if (line.startsWith(':')) {
                            Roo.log('SSE: Heartbeat/comment received');
                        } else {
                            Roo.log('SSE: Unknown line format: ' + line);
                        }
                    });
                    
                    // Only continue reading if not finished
                    if (!finished) {
                        read();
                    }
                }).catch(function(error) {
                    Roo.log('SSE: Read error: ' + error);
                    if (finished) {
                        return; // Already handled
                    }
                    finished = true;
                    stopFakeProgress();
                    _this.failureType = Roo.form.Action.CONNECT_FAILURE;
                    _this.result = {
                        success: false,
                        errorMsg: 'SSE read error: ' + error.toString()
                    };
                    form.afterAction(_this, false);
                });
            }
            
            read();
            
        }).catch(function(error) {
            Roo.log('SSE: Fetch error: ' + error);
            Roo.MessageBox.hide();
            _this.failureType = Roo.form.Action.CONNECT_FAILURE;
            _this.result = {
                success: false,
                errorMsg: 'SSE connection error: ' + error.toString()
            };
            form.afterAction(_this, false);
        });
    },

    success : function(response)
    {
        this.uploadComplete= true;
        if (this.haveProgress) {
            Roo.MessageBox.hide();
        }
        
        
        var result = this.processResponse(response);
        if(result === true || result.success){
            this.form.afterAction(this, true);
            return;
        }
        if(result.errors){
            this.form.markInvalid(result.errors);
            this.failureType = Roo.form.Action.SERVER_INVALID;
        }
        this.form.afterAction(this, false);
    },
    failure : function(response)
    {
        this.uploadComplete= true;
        if (this.haveProgress) {
            Roo.MessageBox.hide();
        }
        
        this.response = response;
        this.failureType = Roo.form.Action.CONNECT_FAILURE;
        this.form.afterAction(this, false);
    },
    
    handleResponse : function(response){
        if(this.form.errorReader){
            var rs = this.form.errorReader.read(response);
            var errors = [];
            if(rs.records){
                for(var i = 0, len = rs.records.length; i < len; i++) {
                    var r = rs.records[i];
                    errors[i] = r.data;
                }
            }
            if(errors.length < 1){
                errors = null;
            }
            return {
                success : rs.success,
                errors : errors
            };
        }
        var ret = false;
        try {
            var rt = response.responseText;
            if (rt.match(/^\<!--\[CDATA\[/)) {
                rt = rt.replace(/^\<!--\[CDATA\[/,'');
                rt = rt.replace(/\]\]--\>$/,'');
            }
            
            ret = Roo.decode(rt);
        } catch (e) {
            ret = {
                success: false,
                errorMsg: "Failed to read server message: " + (response ? response.responseText : ' - no message'),
                errors : []
            };
        }
        return ret;
        
    }
});


Roo.form.Action.Load = function(form, options){
    Roo.form.Action.Load.superclass.constructor.call(this, form, options);
    this.reader = this.form.reader;
};

Roo.extend(Roo.form.Action.Load, Roo.form.Action, {
    type : 'load',

    run : function(){
        
        Roo.Ajax.request(Roo.apply(
                this.createCallback(), {
                    method:this.getMethod(),
                    url:this.getUrl(false),
                    params:this.getParams()
        }));
    },

    success : function(response){
        
        var result = this.processResponse(response);
        if(result === true || !result.success || !result.data){
            this.failureType = Roo.form.Action.LOAD_FAILURE;
            this.form.afterAction(this, false);
            return;
        }
        this.form.clearInvalid();
        this.form.setValues(result.data);
        this.form.afterAction(this, true);
    },

    handleResponse : function(response){
        if(this.form.reader){
            var rs = this.form.reader.read(response);
            var data = rs.records && rs.records[0] ? rs.records[0].data : null;
            return {
                success : rs.success,
                data : data
            };
        }
        return Roo.decode(response.responseText);
    }
});

Roo.form.Action.ACTION_TYPES = {
    'load' : Roo.form.Action.Load,
    'submit' : Roo.form.Action.Submit
};