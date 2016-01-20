
/*
* Licence: LGPL
*/

/**
 * @class Roo.bootstrap.UploadCropbox
 * @extends Roo.bootstrap.Component
 * Bootstrap UploadCropbox class
 * @cfg {String} emptyText 
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
                            cls : 'roo-upload-cropbox-canvas',
                            cn : [
                                {
                                    tag : 'img',
                                    cls : 'roo-upload-cropbox-image'
                                }
                            ]
                        },
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
//        this.image = Roo.get(new Image());
//      
        this.imageSection = this.el.select('.roo-upload-cropbox-image-section', true).first();
        this.imageSection.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        this.imageCanvas = this.el.select('.roo-upload-cropbox-canvas', true).first();
        this.imageCanvas.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        this.image = this.el.select('.roo-upload-cropbox-image', true).first();
        this.image.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
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
  
        this.bind();
    },
//    
    bind : function()
    {
        this.image.on('load', this.onLoadCanvasImage, this);
        
        this.imageSection.on('click', this.beforeSelectFile, this);
        
        this.imageSection.on('mousedown', this.onMouseDown, this);
        
        this.imageSection.on('mousemove', this.onMouseMove, this);
        
        var mousewheel = (/Firefox/i.test(navigator.userAgent))? 'DOMMouseScroll' : 'mousewheel';
        
        this.imageSection.on(mousewheel, this.onMouseWheel, this);

        Roo.get(document).on('mouseup', this.onMouseUp, this);
//        
//        this.imageSection.on('mousedown', this.onMouseDown, this);
//        
//        this.imageSection.on('mousemove', this.onMouseMove, this);
//        
//        Roo.get(document).on('mouseup', this.onMouseUp, this);
//        
//        var mousewheel = (/Firefox/i.test(navigator.userAgent))? 'DOMMouseScroll' : 'mousewheel';
//        
//        this.imageSection.on(mousewheel, this.onMouseWheel, this);
//        
//        this.pictureBtn.on('click', this.beforeSelectFile, this);
//        
//        this.rotateLeft.on('click', this.onRotateLeft, this);
//        
        this.rotateRight.on('click', this.onRotateRight, this);
        
    },
//    
//    destory : function()
//    {
//        
//    },
//    
//    reset : function()
//    {
//        this.ratio = 1;
//        this.dragable = false;
//        this.mouseX = 0;
//        this.mouseY = 0;
//    },
//    
    beforeSelectFile : function(e)
    {
        e.preventDefault();
        
        this.fireEvent('beforeSelectFile', this);
    },
    
    loadCanvasImage : function(src)
    {   
        this.imageSection.un('click', this.beforeSelectFile, this);
        
//        this.reset();
        
        this.image.attr('src', src);
        
    },
    
    onLoadCanvasImage : function(src)
    {   
        this.imageOriginWidth = this.image.getWidth();
        this.imageOriginHeight = this.image.getHeight();
        
        this.setCanvasPosition();
    },
    
    setCanvasPosition : function()
    {
        var pw = (this.imageSection.getWidth(true) - this.image.getWidth() - Math.max(0, (this.imageCanvas.getWidth() - this.image.getWidth()))) / 2;
        var ph = (this.imageSection.getHeight(true) - this.image.getHeight()) / 2;
        
        this.imageCanvas.setLeft(pw);
        this.imageCanvas.setTop(ph);
    },
    
    onMouseDown : function(e)
    {   
        Roo.log('on mouse Down');
        
        e.stopEvent();
        
        this.dragable = true;
        this.mouseX = e.getPageX();
        this.mouseY = e.getPageY();
        
    },
    
    onMouseMove : function(e)
    {   
        e.stopEvent();
        
        if (!this.dragable){
            return;
        }
        
        Roo.log('on mouse move');
        
        var x = e.getPageX() - this.mouseX;
        var y = e.getPageY() - this.mouseY;

        Roo.log(x);
        
        var bgX = x + this.imageCanvas.getLeft(true);
        var bgY = y + this.imageCanvas.getTop(true);
        
        Roo.log(Math.max(0, (this.imageCanvas.getWidth() - this.image.getWidth())) / 2);
        
        Roo.log([bgX, bgY]);
        
        var transform = new WebKitCSSMatrix(window.getComputedStyle(this.thumb.dom).webkitTransform);
        
        var minX = this.thumb.getLeft(true) + transform.m41;
        var minY = this.thumb.getTop(true) + transform.m42;
        
        var maxX = minX + this.thumb.getWidth() - this.image.getWidth();
        var maxY = minY + this.thumb.getHeight() - this.image.getHeight();
        
        Roo.log([minX, minY]);
        Roo.log([maxX, maxY]);
        
        if(minX < bgX){
            Roo.log('minX < bgX');
            bgX = minX;
        }
        
        if(maxX > bgX){
            Roo.log('maxX > bgX');
            bgX = maxX;
        }
        
        if(minY < bgY){
            bgY = minY;
        }
        
        if(maxY > bgY){
            bgY = maxY;
        }
        
        this.imageCanvas.setLeft(bgX);
        this.imageCanvas.setTop(bgY);
        
        this.mouseX = e.getPageX();
        this.mouseY = e.getPageY();
    },
    
    onMouseUp : function(e)
    {   
        Roo.log('on mouse up');
        
        e.stopEvent();
        
        this.dragable = false;
    },
    
    onMouseWheel : function(e)
    {   
        e.stopEvent();
        
        Roo.log('on mouse wheel');
        
        this.ratio = (e.getWheelDelta() == 1) ? (this.ratio * 1.1) : (this.ratio * 0.9);
        
        this.image.setWidth(this.imageOriginWidth * this.ratio);
        this.image.setHeight(this.imageOriginHeight * this.ratio);
        
        this.setCanvasPosition();
//        
//        Roo.log(ratio);
//        
//        return;
//        
//        if(
//                parseInt(this.image.dom.width) * ratio < this.thumb.getWidth() ||
//                parseInt(this.image.dom.height) * ratio < this.thumb.getHeight()
//        ){
//            return;
//        }
//        
//        this.ratio = (e.getWheelDelta() == 1) ? (this.ratio * 1.1) : (this.ratio * 0.9);
        
//        this.setBackground();
    },
//    
//    onRotateLeft : function(e)
//    {
//        e.stopEvent();
//        
//        Roo.log('on rotate left');
//    },
//    
    onRotateRight : function(e)
    {
        e.stopEvent();
        
        Roo.log('on rotate right');
        
    }
    
});
