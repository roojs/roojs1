
/*
* Licence: LGPL
*/

/**
 * @class Roo.bootstrap.UploadCropbox
 * @extends Roo.bootstrap.Component
 * Bootstrap UploadCropbox class
 * @cfg {String} emptyText 
 * @cfg {String} imageSrc 
 * @cfg {Number} ratio default 1
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
        "beforeSelectFile" : true
        
    });
};

Roo.extend(Roo.bootstrap.UploadCropbox, Roo.bootstrap.Component,  {
    
    emptyText : 'Click to upload image',
    imageSrc : false,
    ratio : 1,
    
    getAutoCreate : function()
    {
        var cfg = {
            tag : 'div',
            cls : 'roo-upload-cropbox',
            cn : [
                {
                    tag : 'div',
                    cls : 'roo-upload-cropbox-image-section',
                    cn : [
                        {
                            tag : 'div',
                            cls : 'roo-upload-cropbox-thumb'
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
        this.image = Roo.get(new Image());
        
        this.imageSection = this.el.select('.roo-upload-cropbox-image-section', true).first();
        this.imageSection.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        this.thumb = this.el.select('.roo-upload-cropbox-thumb', true).first();
        this.thumb.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        this.footerSection = this.el.select('.roo-upload-cropbox-footer-section', true).first();
        this.footerSection.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        this.rotateLeft = this.el.select('.roo-upload-cropbox-rotate-left', true).first();
        this.rotateLeft.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        this.pictureBtn = this.el.select('.roo-upload-cropbox-picture', true).first();
        this.pictureBtn.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        this.rotateRight = this.el.select('.roo-upload-cropbox-rotate-right', true).first();
        this.rotateRight.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        this.image.on('load', this.onImageLoad, this);
        
//        this.image.onload = function(){
//            Roo.log('test');
//        }
        
//
//        this.pictureBtn.on('click', this.beforeSelectFile, this);
//        
//        this.emptyNotification.show();
//        this.imageView.hide();
//        this.footerSection.hide();
//        
        this.imageSection.on('click', this.beforeSelectFile, this);
        
    },
    
    beforeSelectFile : function(e)
    {
        e.preventDefault();
        
        this.fireEvent('beforeSelectFile', this);
        
    },
    
    loadImage : function(src)
    {
        Roo.log('load image');
        
        this.image.attr('src', src);
    },
    
    onImageLoad : function()
    {
        Roo.log('on image load');
        
        this.setBackground();
    },
    
    setBackground : function()
    {
        var w =  parseInt(this.image.dom.width) * this.ratio;
        var h =  parseInt(this.image.dom.height)* this.ratio;

        Roo.log(this.imageSection.getViewSize());
        return;
        var pw = (el.clientWidth - w) / 2;
        var ph = (el.clientHeight - h) / 2;

        el.setAttribute('style',
                'background-image: url(' + obj.image.src + '); ' +
                'background-size: ' + w +'px ' + h + 'px; ' +
                'background-position: ' + pw + 'px ' + ph + 'px; ' +
                'background-repeat: no-repeat');
    }
    
});
