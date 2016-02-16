
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
 * @cfg {Number} boxes number of boxes to show default 12
 * @cfg {Boolean} multiple multiple upload default true
 * @cfg {Number} minWidth default 300
 * @cfg {Number} minHeight default 300
 * 
 * @constructor
 * Create a new DocumentManager
 * @param {Object} config The config object
 */

Roo.bootstrap.DocumentManager = function(config){
    Roo.bootstrap.DocumentManager.superclass.constructor.call(this, config);
    
    this.addEvents({
        /**
         * @event inspect
         * inspect selected file
         * @param {Roo.bootstrap.DocumentManager} this
         * @param {File} file
         */
        "inspect" : true
    });
};

Roo.extend(Roo.bootstrap.DocumentManager, Roo.bootstrap.Component,  {
    
    boxes : 12,
    inputName : '',
    minWidth : 300,
    minHeight : 300,
    multiple : true,
    files : [],
    method : 'POST',
    url : '',
    paramName : 'imageUpload',
    
    getAutoCreate : function()
    {
        var cfg = {
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
                    cls : 'roo-document-manager-block roo-document-manager-uploader',
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
        
        return cfg;
        
    },
    
    initEvents : function()
    {
        this.selectorEl = this.el.select('.roo-document-manager-selector', true).first();
        this.selectorEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        this.selectorEl.hide();
        
        if(this.multiple){
            this.selectorEl.attr('multiple', 'multiple');
        }
        
        this.selectorEl.on('change', this.onSelect, this);
        
        this.uploader = this.el.select('.roo-document-manager-uploader', true).first();
        this.uploader.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        this.uploader.on('click', this.onUpload, this);
        
    },
    
    onUpload : function(e)
    {
        e.preventDefault();
        
        this.selectorEl.dom.click();
        
    },
    
    onSelect : function(e)
    {
        e.preventDefault();
        
        if(typeof(this.selectorEl.dom.files) == 'undefined' || !this.selectorEl.dom.files.length){
            return;
        }
        
        Roo.each(this.selectorEl.dom.files, function(file){
            if(this.fireEvent('inspect', this, file) != false){
                file.status = 'NEW';
                this.files.push(file);
            }
        }, this);
        
        this.process();
        
    },
    
    process : function()
    {
        if(!this.files.length){
            return;
        }
        
        if(this.files.length > 12){
            this.files = this.files.slice(0, 12);
        }
        
        var xhr = new XMLHttpRequest();
        
        Roo.each(this.files, function(file, index){
            if(file.status == 'PROCESSED'){
                return;
            }
            
            file.xhr = xhr;
            
            this.el.createChild({
                tag : 'div',
                cls : 'roo-document-manager-block',
                cn : [
                    {
                        tag : 'div',
                        tooltip : file.name,
                        cls : 'roo-document-manager-thumb roo-document-manager-thumb-' + index,
                        html : '<i class="fa fa-spinner fa-pulse"></i>'
                    }
                ]

            });
            
        }, this);
        
        if(this.files.length > 11){
            this.uploader.hide();
        }
        
        var headers = {
            "Accept": "application/json",
            "Cache-Control": "no-cache",
            "X-Requested-With": "XMLHttpRequest"
        };
        
        xhr.open(this.method, this.url, true);
        
        xhr.on('load', this.onXhrLoad, this);
//        
//        xhr.onload = function()
//        {
//            Roo.log('onload???');
//        }
        
        xhr.onerror = function()
        {
            Roo.log('onerror???');
        }
        
        for (var headerName in headers) {
            var headerValue = headers[headerName];
            if (headerValue) {
                xhr.setRequestHeader(headerName, headerValue);
            }
        }
      
        var formData = new FormData();

        Roo.each(this.files, function(file, index){
            
            if(file.status == 'PROCESSED'){
                return;
            }
            
            formData.append(this.getParamName(index), file, file.name);
            
        }, this);
        
        xhr.send(formData);
        
    },
    
    getParamName : function(i)
    {
        if(!this.multiple){
            return this.paramName;
        }
        
        return "" + this.paramName + "[" + i + "]";
    }
    
    
    
});