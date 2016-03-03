
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
        
        var _this = this;
        
        window.addEventListener("resize", function() { _this.refresh(); } );
        
        this.fireEvent('initial', this);
    },
    
    renderProgressDialog : function()
    {
        var _this = this;
        
        this.progressDialog = new Roo.bootstrap.Modal({
            cls : 'roo-document-manager-progress-dialog',
            allow_close : false,
            title : '',
            buttons : [
                {
                    name  :'cancel',
                    weight : 'danger',
                    html : 'Cancel'
                }
            ], 
            listeners : { 
                btnclick : function() {
                    _this.uploadCancel();
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
        
        this.uploader.show();
        
        if(this.files.length > this.boxes - 1){
            this.uploader.hide();
        }
        
        var _this = this;
        
        var files = [];
        
        Roo.each(this.files, function(file){
            
            if(typeof(file.id) != 'undefined' && file.id * 1 > 0){
                var f = this.renderPreview(file);
                files.push(f);
                return;
            }
            
            this.delegates.push(
                (function(){
                    _this.process(file);
                }).createDelegate(this)
            );
            
        }, this);
        
        this.files = files;
        
        if(!this.delegates.length){
            this.refresh();
            return;
        }
        
        this.progressBar.aria_valuemax = this.delegates.length;
        
        this.arrange();
        
        return;
    },
    
    arrange : function()
    {
        if(!this.delegates.length){
            this.progressDialog.hide();
            this.refresh();
            return;
        }
        
        var delegate = this.delegates.shift();
        
        this.progressDialog.show();
        
        this.progressDialog.setTitle((this.progressBar.aria_valuemax - this.delegates.length) + ' / ' + this.progressBar.aria_valuemax);
        
        this.progressBar.update(this.progressBar.aria_valuemax - this.delegates.length);
        
        delegate();
    },
    
    refresh : function()
    {
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
        Roo.each(this.managerEl.select('.roo-document-manager-loading', true).elements, function(el){
            el.remove();
        }, this);
        
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
        
        var file = this.renderPreview(response.data);
        
        this.files.push(file);
        
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
        if(this.editable && file.type.indexOf('image') != -1){
            this.fireEvent('edit', this, file);
            return;
        }
        
        this.uploadStart(file, false);
        
        return;
    },
    
    uploadStart : function(file, crop)
    {
        this.xhr = new XMLHttpRequest();
        
        if(typeof(file.id) != 'undefined' && file.id * 1 > 0){
            this.arrange();
            return;
        }
        
        file.xhr = this.xhr;
            
        this.managerEl.createChild({
            tag : 'div',
            cls : 'roo-document-manager-loading',
            cn : [
                {
                    tag : 'div',
                    tooltip : file.name,
                    cls : 'roo-document-manager-thumb',
                    html : '<i class="fa fa-circle-o-notch fa-spin"></i>'
                }
            ]

        });

        this.xhr.open(this.method, this.url, true);
        
        var headers = {
            "Accept": "application/json",
            "Cache-Control": "no-cache",
            "X-Requested-With": "XMLHttpRequest"
        };
        
        for (var headerName in headers) {
            var headerValue = headers[headerName];
            if (headerValue) {
                this.xhr.setRequestHeader(headerName, headerValue);
            }
        }
        
        var _this = this;
        
        this.xhr.onload = function()
        {
            _this.xhrOnLoad(_this.xhr);
        }
        
        this.xhr.onerror = function()
        {
            _this.xhrOnError(_this.xhr);
        }
        
        var formData = new FormData();

        formData.append('returnHTML', 'NO');
        
        if(crop){
            formData.append('crop', crop);
        }
        
        formData.append(this.paramName, file, file.name);
        
        if(this.fireEvent('prepare', this, formData) != false){
            this.xhr.send(formData);
        };
    },
    
    uploadCancel : function()
    {
        this.xhr.abort();
        
        this.delegates = [];
        
        Roo.each(this.managerEl.select('.roo-document-manager-loading', true).elements, function(el){
            el.remove();
        }, this);
        
        this.arrange();
    },
    
    renderPreview : function(file)
    {
        var _this = this;
        
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

        image.addEventListener("load", function(){ _this.onPreviewLoad(); });
        
        image.on('click', this.onClick, this, file);
        
        return file;
    },
    
    onPreviewLoad : function()
    {
        
    }
});
