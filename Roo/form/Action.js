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
            
            Roo.log('SSE: Starting to read stream...');
            
            function read() {
                reader.read().then(function(result) {
                    chunkCount++;
                    Roo.log('SSE: Chunk #' + chunkCount + ' received, done=' + result.done);
                    
                    if (result.done) {
                        Roo.log('SSE: Stream complete');
                        Roo.MessageBox.hide();
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
                                    Roo.MessageBox.updateProgress(
                                        data.progress / 100, 
                                        data.message || 'Processing...'
                                    );
                                } else if (currentEvent === 'error') {
                                    Roo.log('SSE: ERROR event received');
                                    Roo.MessageBox.hide();
                                    _this.failureType = Roo.form.Action.SERVER_INVALID;
                                    _this.result = data;
                                    form.afterAction(_this, false);
                                } else if (currentEvent === 'complete') {
                                    Roo.log('SSE: COMPLETE event received, success=' + data.success);
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
                                } else {
                                    Roo.log('SSE: Unknown event type or no progress: ' + currentEvent);
                                }
                            } catch (e) {
                                Roo.log('SSE: JSON parse error: ' + e);
                                Roo.log('SSE: Failed JSON string: ' + jsonStr);
                            }
                            currentEvent = null;
                        } else if (line.startsWith(':')) {
                            Roo.log('SSE: Heartbeat/comment received');
                        } else {
                            Roo.log('SSE: Unknown line format: ' + line);
                        }
                    });
                    
                    read();
                }).catch(function(error) {
                    Roo.log('SSE: Read error: ' + error);
                    Roo.MessageBox.hide();
                    _this.failureType = Roo.form.Action.CONNECT_FAILURE;
                    form.afterAction(_this, false);
                });
            }
            
            read();
            
        }).catch(function(error) {
            Roo.log('SSE: Fetch error: ' + error);
            Roo.MessageBox.hide();
            _this.failureType = Roo.form.Action.CONNECT_FAILURE;
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