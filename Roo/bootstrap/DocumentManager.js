
/*
* Licence: LGPL
*/

/**
 * @class Roo.bootstrap.DocumentManager
 * @extends Roo.bootstrap.Component
 * Bootstrap DocumentManager class
 * @cfg {String} paramName default 'imageUpload'
 * @cfg {String} method default POST
 * @cfg {String} url action url
 * @cfg {Number} boxes number of boxes default 12
 * @cfg {Boolean} multiple multiple upload default true
 * @cfg {Number} minWidth default 300
 * @cfg {Number} minHeight default 300
 * @cfg {Number} thumbSize default 300
 * @cfg {String} fieldLabel
 * @cfg {Number} labelWidth default 4
 * @cfg {String} labelAlign (left|top) default left
 * @cfg {Boolean} editable (true|false) allow edit when upload a image default true
 * 
 * @constructor
 * Create a new DocumentManager
 * @param {Object} config The config object
 */

Roo.bootstrap.DocumentManager = function(config){
    Roo.bootstrap.DocumentManager.superclass.constructor.call(this, config);
    
    this.addEvents({
        /**
         * @event initial
         * Fire when initial the DocumentManager
         * @param {Roo.bootstrap.DocumentManager} this
         */
        "initial" : true,
        /**
         * @event inspect
         * inspect selected file
         * @param {Roo.bootstrap.DocumentManager} this
         * @param {File} file
         */
        "inspect" : true,
        /**
         * @event exception
         * Fire when xhr load exception
         * @param {Roo.bootstrap.DocumentManager} this
         * @param {XMLHttpRequest} xhr
         */
        "exception" : true,
        /**
         * @event prepare
         * prepare the form data
         * @param {Roo.bootstrap.DocumentManager} this
         * @param {Object} formData
         */
        "prepare" : true,
        /**
         * @event remove
         * Fire when remove the file
         * @param {Roo.bootstrap.DocumentManager} this
         * @param {Object} file
         */
        "remove" : true,
        /**
         * @event refresh
         * Fire after refresh the file
         * @param {Roo.bootstrap.DocumentManager} this
         */
        "refresh" : true,
        /**
         * @event click
         * Fire after click the image
         * @param {Roo.bootstrap.DocumentManager} this
         * @param {Object} file
         */
        "click" : true,
        /**
         * @event edit
         * Fire when upload a image and editable set to true
         * @param {Roo.bootstrap.DocumentManager} this
         * @param {Object} file
         */
        "edit" : true
        
    });
};

Roo.extend(Roo.bootstrap.DocumentManager, Roo.bootstrap.Component,  {
    
    boxes : 12,
    inputName : '',
    minWidth : 300,
    minHeight : 300,
    thumbSize : 300,
    multiple : true,
    files : [],
    method : 'POST',
    url : '',
    paramName : 'imageUpload',
    fieldLabel : '',
    labelWidth : 4,
    labelAlign : 'left',
    editable : true,
    delegates : [],
    
    getAutoCreate : function()
    {   
        var managerWidget = {
            tag : 'div',
            cls : 'roo-document-manager',
            cn : [
                {
                    tag : 'input',
                    cls : 'roo-document-manager-selector',
                    type : 'file'
                },
                {
                    tag : 'div',
                    cls : 'roo-document-manager-uploader',
                    cn : [
                        {
                            tag : 'div',
                            cls : 'roo-document-manager-upload-btn',
                            html : '<i class="fa fa-plus"></i>'
                        }
                    ]
                    
                }
            ]
        };
        
        var content = [
            {
                tag : 'div',
                cls : 'column col-md-12',
                cn : managerWidget
            }
        ];
        
        if(this.fieldLabel.length){
            
            content = [
                {
                    tag : 'div',
                    cls : 'column col-md-12',
                    html : this.fieldLabel
                },
                {
                    tag : 'div',
                    cls : 'column col-md-12',
                    cn : managerWidget
                }
            ];

            if(this.labelAlign == 'left'){
                content = [
                    {
                        tag : 'div',
                        cls : 'column col-md-' + this.labelWidth,
                        html : this.fieldLabel
                    },
                    {
                        tag : 'div',
                        cls : 'column col-md-' + (12 - this.labelWidth),
                        cn : managerWidget
                    }
                ];
                
            }
        }
        
        var cfg = {
            tag : 'div',
            cls : 'row clearfix',
            cn : content
        };
        
        return cfg;
        
    },
    
    initEvents : function()
    {
        this.managerEl = this.el.select('.roo-document-manager', true).first();
        this.managerEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        this.selectorEl = this.el.select('.roo-document-manager-selector', true).first();
        this.selectorEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        this.selectorEl.hide();
        
        if(this.multiple){
            this.selectorEl.attr('multiple', 'multiple');
        }
        
        this.selectorEl.on('change', this.onFileSelected, this);
        
        this.uploader = this.el.select('.roo-document-manager-uploader', true).first();
        this.uploader.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        this.uploader.on('click', this.onUploaderClick, this);
        
        this.renderProgressDialog();
        
//        var _this = this;
        
//        window.addEventListener("resize", function() { _this.refresh(); } );
        
        this.fireEvent('initial', this);
    },
    
    renderProgressDialog : function()
    {
        this.progressDialog = new Roo.bootstrap.Modal({
            cls : 'roo-document-manager-progress-dialog',
            allow_close : false,
            title : '',
            buttons : Roo.bootstrap.Modal.OK, 
            listeners : { 
                btnclick : function() { 
                     this.hide();
                }
            }
        });
         
        this.progressDialog.render(Roo.get(document.body));
         
        this.progress = new Roo.bootstrap.Progress({
            cls : 'roo-document-manager-progress',
            active : true,
            striped : true,
        });
        
        this.progress.render(this.progressDialog.getChildContainer());
        
        this.progressBar = new Roo.bootstrap.ProgressBar({
            cls : 'roo-document-manager-progress-bar',
            aria_valuenow : 0,
            aria_valuemin : 0,
            aria_valuemax : 12,
            panel : 'success'
        });
        
        this.progressBar.render(this.progress.getChildContainer());
    },
    
    updateProgressDialog : function()
    {
        
    },
    
    onUploaderClick : function(e)
    {
        e.preventDefault();
        this.selectorEl.dom.click();
    },
    
    onFileSelected : function(e)
    {
        e.preventDefault();
        
        if(typeof(this.selectorEl.dom.files) == 'undefined' || !this.selectorEl.dom.files.length){
            return;
        }
        
        Roo.each(this.selectorEl.dom.files, function(file){
            if(this.fireEvent('inspect', this, file) != false){
                this.files.push(file);
            }
        }, this);
        
        this.queue();
        
    },
    
    queue : function()
    {
        this.selectorEl.dom.value = '';
        
        if(!this.files.length){
            return;
        }
        
        if(this.files.length > this.boxes){
            this.files = this.files.slice(0, this.boxes);
        }
        
        var _this = this;
        
        var files = [];
        
        Roo.each(this.files, function(file){
            
            if(typeof(file.id) != 'undefined' && file.id * 1 > 0){
                files.push(file);
                return;
            }
            
            this.delegates.push(
                (function(){
                    _this.process(file);
                }).createDelegate(this)
            );
            
        }, this);
        
        this.files = files;
        
        this.arrange();
        
        return;
        
        
        if(!this.delegates.length){
            return;
        }
        
        this.progressBar.aria_valuemax = this.delegates.length;
        
        var delegate = this.delegates.shift();
        
        delegate();
        
        return;
        
        var xhr = new XMLHttpRequest();
        
        Roo.each(this.files, function(file, index){
            if(typeof(file.id) != 'undefined' && file.id * 1 > 0){
                return;
            }
            
            file.xhr = xhr;
            
            this.managerEl.createChild({
                tag : 'div',
                cls : 'roo-document-manager-loading',
                cn : [
                    {
                        tag : 'div',
                        tooltip : file.name,
                        cls : 'roo-document-manager-thumb',
                        html : '<i class="fa fa-spinner fa-pulse"></i>'
                    }
                ]

            });
            
        }, this);
        
        if(this.files.length > this.boxes - 1 ){
            this.uploader.hide();
        }
        
        var headers = {
            "Accept": "application/json",
            "Cache-Control": "no-cache",
            "X-Requested-With": "XMLHttpRequest"
        };
        
        xhr.open(this.method, this.url, true);
        
        for (var headerName in headers) {
            var headerValue = headers[headerName];
            if (headerValue) {
                xhr.setRequestHeader(headerName, headerValue);
            }
        }
        
        var _this = this;
        
        xhr.onload = function()
        {
            _this.xhrOnLoad(xhr);
        }
        
        xhr.onerror = function()
        {
            _this.xhrOnError(xhr);
        }
        
        var formData = new FormData();

        formData.append('returnHTML', 'NO');
        
        Roo.each(this.files, function(file, index){
            
            if(typeof(file.id) != 'undefined' && file.id * 1 > 0){
                return;
            }
            
            formData.append(this.getParamName(index), file, file.name);
            
        }, this);
        
        if(this.fireEvent('prepare', this, formData) != false){
            xhr.send(formData);
        };
        
    },
    
    arrange : function()
    {
        if(!this.delegates.length){
            return;
        }
        
        Roo.log('arrange...');
        
        Roo.log(this.delegates.length);
        
//        this.progressBar.aria_valuemax = this.delegates.length;
        
        var delegate = this.delegates.shift();
        
        delegate();
    },
    
    refresh : function()
    {
        Roo.each(this.managerEl.select('.roo-document-manager-loading', true).elements, function(el){
            el.remove();
        }, this);
        
        
        var files = [];
        
        Roo.each(this.files, function(file){
            
            if(typeof(file.id) == 'undefined' || file.id * 1 < 1){
                return;
            }
            
            if(file.target){
                files.push(file);
                return;
            }
            
            var previewEl = this.managerEl.createChild({
                tag : 'div',
                cls : 'roo-document-manager-preview',
                cn : [
                    {
                        tag : 'div',
                        tooltip : file.filename,
                        cls : 'roo-document-manager-thumb',
                        html : '<img src="' + baseURL +'/Images/Thumb/' + this.thumbSize + '/' + file.id + '/' + file.filename + '">'
                    },
                    {
                        tag : 'button',
                        cls : 'close',
                        html : 'x'
                    }
                ]
            });
            
            var close = previewEl.select('button.close', true).first();
            
            close.on('click', this.onRemove, this, file);
            
            file.target = previewEl;
            
            var image = previewEl.select('img', true).first();
            
            image.on('click', this.onClick, this, file);
            
            files.push(file);
            
            return;
            
        }, this);
        
        this.files = files;
        
        this.uploader.show();
        
        if(this.files.length > this.boxes - 1){
            this.uploader.hide();
        }
        
        Roo.isTouch ? this.closable(false) : this.closable(true);
        
        this.fireEvent('refresh', this);
    },
    
    onRemove : function(e, el, o)
    {
        e.preventDefault();
        
        this.fireEvent('remove', this, o);
        
    },
    
    remove : function(o)
    {
        var files = [];
        
        Roo.each(this.files, function(file){
            if(typeof(file.id) == 'undefined' || file.id * 1 < 1 || file.id != o.id){
                files.push(file);
                return;
            }

            o.target.remove();

        }, this);
        
        this.files = files;
        
        this.refresh();
    },
    
    onClick : function(e, el, o)
    {
        e.preventDefault();
        
        this.fireEvent('click', this, o);
        
    },
    
    closable : function(closable)
    {
        Roo.each(this.managerEl.select('.roo-document-manager-preview > button.close', true).elements, function(el){
            
            el.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
            
            if(closable){
                el.show();
                return;
            }
            
            el.hide();
            
        }, this);
    },
    
    xhrOnLoad : function(xhr)
    {
        if (xhr.readyState !== 4) {
            this.arrange();
            this.fireEvent('exception', this, xhr);
            return;
        }

        var response = Roo.decode(xhr.responseText);
        
        if(!response.success){
            this.arrange();
            this.fireEvent('exception', this, xhr);
            return;
        }
        
        this.files.push(response.data);
        
        this.arrange();
        
    },
    
    xhrOnError : function()
    {
        Roo.log('xhr on error');
        
        var response = Roo.decode(xhr.responseText);
          
        Roo.log(response);
        
        this.arrange();
    },
    
    process : function(file)
    {
        Roo.log('process...');
        Roo.log(file);
        
        if(this.editable && file.type.indexOf('image') != -1){
            this.fireEvent('edit', this, file);
            return;
        }
        
        
        
        return;
    },
    
    uploadStart : function(file, data)
    {
        var xhr = new XMLHttpRequest();
        
        if(typeof(file.id) != 'undefined' && file.id * 1 > 0){
            this.arrange();
            return;
        }
        
        file.xhr = xhr;
            
        this.managerEl.createChild({
            tag : 'div',
            cls : 'roo-document-manager-loading',
            cn : [
                {
                    tag : 'div',
                    tooltip : file.name,
                    cls : 'roo-document-manager-thumb',
                    html : '<i class="fa fa-spinner fa-pulse"></i>'
                }
            ]

        });

        xhr.open(this.method, this.url, true);
        
        var headers = {
            "Accept": "application/json",
            "Cache-Control": "no-cache",
            "X-Requested-With": "XMLHttpRequest"
        };
        
        for (var headerName in headers) {
            var headerValue = headers[headerName];
            if (headerValue) {
                xhr.setRequestHeader(headerName, headerValue);
            }
        }
        
        var _this = this;
        
        xhr.onload = function()
        {
            _this.xhrOnLoad(xhr);
        }
        
        xhr.onerror = function()
        {
            _this.xhrOnError(xhr);
        }
        
        var formData = new FormData();

        formData.append('returnHTML', 'NO');
        
        formData.append(this.paramName, file, file.name);
        
        if(this.fireEvent('prepare', this, formData) != false){
            xhr.send(formData);
        };
    }
    
});
