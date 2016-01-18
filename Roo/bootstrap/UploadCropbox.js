
/*
* Licence: LGPL
*/

/**
 * @class Roo.bootstrap.UploadCropbox
 * @extends Roo.bootstrap.Component
 * Bootstrap UploadCropbox class
 * @cfg {String} uploadinputName default 'imageUpload'
 * 
 * @constructor
 * Create a new UploadCropbox
 * @param {Object} config The config object
 */

Roo.bootstrap.UploadCropbox = function(config){
    Roo.bootstrap.UploadCropbox.superclass.constructor.call(this, config);
    
    this.addEvents({
        /**
         * @event beforeSelectFile
         * Fire before select file
         * @param {Roo.EventObject} e
         */
        "beforeSelectFile" : true,
        /**
         * @event onSelectFile
         * Fire after select file
         * @param {Roo.EventObject} e
         */
        "onSelectFile" : true
    });
};

Roo.extend(Roo.bootstrap.UploadCropbox, Roo.bootstrap.Component,  {
    
    uploadinputName : 'imageUpload',
    
    getAutoCreate : function()
    {
        var cfg = {
            tag : 'div',
            cls : 'roo-upload-cropbox',
            cn : [
                {
                    tag : 'input',
                    cls : 'roo-upload-cropbox-file-input',
                    type : 'file',
                    name : 'uploadinputName'
                },
                {
                    tag : 'div',
                    cls : 'roo-upload-cropbox-image-section',
                    cn : [
                        {
                            tag : 'img',
                            cls : 'roo-upload-cropbox-image-view',
                            src : ''
                        }
                    ]
                },
                {
                    tag : 'div',
                    cls : 'roo-upload-cropbox-footer-section',
                    cn : {
                        tag : 'div',
                        cls : 'btn-group btn-group-justified roo-upload-cropbox-btn-group',
                        cn : [
                            {
                                tag : 'div',
                                cls : 'btn-group',
                                cn : [
                                    {
                                        tag : 'button',
                                        cls : 'btn btn-default roo-upload-cropbox-rotate-left',
                                        html : '<i class="fa fa-undo"></i>'
                                    }
                                ]
                            },
                            {
                                tag : 'div',
                                cls : 'btn-group',
                                cn : [
                                    {
                                        tag : 'button',
                                        cls : 'btn btn-default roo-upload-cropbox-picture',
                                        html : '<i class="fa fa-picture-o"></i>'
                                    }
                                ]
                            },
                            {
                                tag : 'div',
                                cls : 'btn-group',
                                cn : [
                                    {
                                        tag : 'button',
                                        cls : 'btn btn-default roo-upload-cropbox-rotate-right',
                                        html : '<i class="fa fa-repeat"></i>'
                                    }
                                ]
                            }
                        ]
                    }
                }
            ]
        };
        
        return cfg;
    },
    
    initEvents : function()
    {
        this.inputEl = this.el.select('.roo-upload-cropbox-file-input', true).first();
        this.inputEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        this.imageSection = this.el.select('.roo-upload-cropbox-image-section', true).first();
        this.imageSection.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        this.imageView = this.el.select('.roo-upload-cropbox-image-view', true).first();
        this.imageView.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        this.footerSection = this.el.select('.roo-upload-cropbox-footer-section', true).first();
        this.footerSection.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        this.rotateLeft = this.el.select('.roo-upload-cropbox-rotate-left', true).first();
        this.rotateLeft.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        this.pictureBtn = this.el.select('.roo-upload-cropbox-picture', true).first();
        this.pictureBtn.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        this.rotateRight = this.el.select('.roo-upload-cropbox-rotate-right', true).first();
        this.rotateRight.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';

        this.inputEl.hide();
        this.footerSection.hide();
        
        this.imageSection.on('click', this.beforeSelectFile, this);
        
        this.inputEl.on('change', this.onSelectFile, this);
    },
    
    beforeSelectFile : function(e)
    {
        e.preventDefault();
        
        if(this.fireEvent('beforeSelectFile', this) !== false){
            this.inputEl.dom.click();
        }
        
    },
    
    onSelectFile : function(e)
    {
        e.preventDefault();
        
        this.fireEvent('onSelectFile', this);
    }
    
    
});
