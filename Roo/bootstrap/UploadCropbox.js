
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
    dragable : false,
    mouseX : 0,
    mouseY : 0,
    
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
  
//        this.emptyNotification.show();
//        this.imageView.hide();
//        this.footerSection.hide();
//        
        this.imageSection.on('click', this.beforeSelectFile, this);
        
        
        this.pictureBtn.on('click', this.beforeSelectFile, this);
        
    },
    
    beforeSelectFile : function(e)
    {
        e.preventDefault();
        
        this.fireEvent('beforeSelectFile', this);
        
    },
    
    loadImage : function(src)
    {
        Roo.log('load image');
        
        this.imageSection.un('click', this.beforeSelectFile, this);
        
        this.image.attr('src', src);
        
        this.setBackground();
        
        this.imageSection.on('mousedown', this.onMouseDown, this);
        
        this.imageSection.on('mousemove', this.onMouseMove, this);
        
        Roo.get(document).on('mouseup', this.onMouseUp, this);
        
        var mousewheel = (/Firefox/i.test(navigator.userAgent))? 'DOMMouseScroll' : 'mousewheel';
        
        this.imageSection.on(mousewheel, this.onMouseWheel, this);
        
    },
    
    setBackground : function()
    {
        Roo.log('on Image load');
        
        Roo.log(this.thumb.getBoundingClientRect());
        Roo.log(this.thumb.getTop());
        
        var w =  parseInt(this.image.dom.width) * this.ratio;
        var h =  parseInt(this.image.dom.height)* this.ratio;

        var pw = (this.imageSection.dom.clientWidth - w) / 2;
        var ph = (this.imageSection.dom.clientHeight - h) / 2;
        
        Roo.log(pw);
        Roo.log(ph);

        this.imageSection.setStyle('background-image', 'url(' + this.image.attr('src') + ')');
        this.imageSection.setStyle('background-size', w +'px ' + h + 'px' );
        this.imageSection.setStyle('background-position', pw + 'px ' + ph + 'px');
        this.imageSection.setStyle('background-repeat', 'no-repeat');
    },
    
    onMouseDown : function(e)
    {
        Roo.log('onMouseDown');
        
        e.stopEvent();
        
        this.dragable = true;
        this.mouseX = e.getPageX();
        this.mouseY = e.getPageY();
        
    },
    
    onMouseMove : function(e)
    {
        Roo.log('onMouseMove');
        
        e.stopEvent();
        
        if (!this.dragable){
            return;
        }
        
        var x = e.getPageX() - this.mouseX;
        var y = e.getPageY() - this.mouseY;

        
        var bg = this.imageSection.getStyle('background-position').split(' ');

        var bgX = x + parseInt(bg[0]);
        var bgY = y + parseInt(bg[1]);

        this.imageSection.setStyle('background-position', bgX +'px ' + bgY + 'px');

        this.mouseX = e.getPageX();
        this.mouseY = e.getPageY();
    },
    
    onMouseUp : function(e)
    {
        Roo.log('onMouseUp');
        
        e.stopEvent();
        
        this.dragable = false;
    },
    
    onMouseWheel : function(e)
    {
        Roo.log('on mouse wheel');
        
        e.stopEvent();
        
        
        this.ratio = (e.getWheelDelta() == 1) ? (this.ratio * 1.1) : (this.ratio * 0.9);
        
        this.setBackground();
    }
    
});
