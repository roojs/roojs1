
/*
* Licence: LGPL
*/

/**
 * @class Roo.bootstrap.UploadCropbox
 * @extends Roo.bootstrap.Component
 * Bootstrap UploadCropbox class
 * @cfg {String} emptyText show when image has been loaded
 * @cfg {Number} minWidth default 300
 * @cfg {Number} minHeight default 300
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
         * @param {Roo.bootstrap.UploadCropbox} this
         */
        "beforeSelectFile" : true,
        /**
         * @event initial
         * Fire after initEvent
         * @param {Roo.bootstrap.UploadCropbox} this
         */
        "initial" : true,
        /**
         * @event crop
         * Fire after initEvent
         * @param {Roo.bootstrap.UploadCropbox} this
         * @param {String} imageData
         */
        "crop" : true
        
    });
};

Roo.extend(Roo.bootstrap.UploadCropbox, Roo.bootstrap.Component,  {
    
    emptyText : 'Click to upload image',
    scale : 0,
    rotate : 0,
    dragable : false,
    mouseX : 0,
    mouseY : 0,
    cropImageData : false,
    cropType : 'image/png',
    minWidth : 300,
    minHeight : 300,
    
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
        this.footerSection.hide();
        
        this.rotateLeft = this.el.select('.roo-upload-cropbox-rotate-left', true).first();
        this.rotateLeft.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        this.pictureBtn = this.el.select('.roo-upload-cropbox-picture', true).first();
        this.pictureBtn.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        this.rotateRight = this.el.select('.roo-upload-cropbox-rotate-right', true).first();
        this.rotateRight.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        this.calcThumbBoxSize();
        
        this.bind();
        
        this.fireEvent('initial', this);
    },

    bind : function()
    {
        this.image.on('load', this.onLoadCanvasImage, this);
        
        if(!this.imageSectionHasOnClickEvent){
            this.imageSection.on('click', this.beforeSelectFile, this);
            this.imageSectionHasOnClickEvent = true;
        }
        
        this.imageSection.on('mousedown', this.onMouseDown, this);
        
        this.imageSection.on('mousemove', this.onMouseMove, this);
        
        var mousewheel = (/Firefox/i.test(navigator.userAgent))? 'DOMMouseScroll' : 'mousewheel';
        
        this.imageSection.on(mousewheel, this.onMouseWheel, this);

        Roo.get(document).on('mouseup', this.onMouseUp, this);
        
        this.pictureBtn.on('click', this.beforeSelectFile, this);
        
        this.rotateLeft.on('click', this.onRotateLeft, this);
        
        this.rotateRight.on('click', this.onRotateRight, this);
        
    },
    
    unbind : function()
    {
        this.image.un('load', this.onLoadCanvasImage, this);
        
        if(this.imageSectionHasOnClickEvent){
            this.imageSection.un('click', this.beforeSelectFile, this);
            this.imageSectionHasOnClickEvent = false;
        }
        
        this.imageSection.un('mousedown', this.onMouseDown, this);
        
        this.imageSection.un('mousemove', this.onMouseMove, this);
        
        var mousewheel = (/Firefox/i.test(navigator.userAgent))? 'DOMMouseScroll' : 'mousewheel';
        
        this.imageSection.un(mousewheel, this.onMouseWheel, this);

        Roo.get(document).un('mouseup', this.onMouseUp, this);
        
        this.pictureBtn.un('click', this.beforeSelectFile, this);
        
        this.rotateLeft.un('click', this.onRotateLeft, this);
        
        this.rotateRight.un('click', this.onRotateRight, this);
    },
    
    reset : function()
    {    
        this.scale = 0;
        this.rotate = 0;
        this.dragable = false;
        this.mouseX = 0;
        this.mouseY = 0;
        this.cropImageData = false;
        
        this.imageCanvas.dom.removeAttribute('style');
        this.image.dom.removeAttribute('style');
        this.image.attr('src', '');
        
        if(!this.imageSectionHasOnClickEvent){
            this.imageSection.on('click', this.beforeSelectFile, this);
            this.imageSectionHasOnClickEvent = true;
        }
        
    },
    
    beforeSelectFile : function(e)
    {
        e.preventDefault();
        this.fireEvent('beforeSelectFile', this);
    },
    
    loadCanvasImage : function(src)
    {   
        this.reset();
        
        this.image.attr('src', src);
    },
    
    onLoadCanvasImage : function(src)
    {   
        if(this.imageSectionHasOnClickEvent){
            this.imageSection.un('click', this.beforeSelectFile, this);
            this.imageSectionHasOnClickEvent = false;
        }
        
        this.image.OriginWidth = this.image.getWidth();
        this.image.OriginHeight = this.image.getHeight();
        
        this.fitThumbBox();
        
        this.image.setWidth(this.image.OriginWidth * Math.pow(1.1, this.scale));
        this.image.setHeight(this.image.OriginHeight * Math.pow(1.1, this.scale));
                
        this.footerSection.show();
        
        this.setCanvasPosition();
    },
    
    setCanvasPosition : function()
    {   
        var pw = (this.imageSection.getWidth(true) - this.image.getWidth()) / 2;
        var ph = (this.imageSection.getHeight(true) - this.image.getHeight()) / 2;
        
        this.imageCanvas.setLeft(pw);
        this.imageCanvas.setTop(ph);
    },
    
    onMouseDown : function(e)
    {   
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
        
        var transform = new WebKitCSSMatrix(window.getComputedStyle(this.thumb.dom).webkitTransform);
        
        var minX = this.thumb.getLeft(true) + transform.m41;
        var minY = this.thumb.getTop(true) + transform.m42;
        
        var maxX = minX + this.thumb.getWidth() - this.image.getWidth();
        var maxY = minY + this.thumb.getHeight() - this.image.getHeight();
        
        if(this.rotate == 90 || this.rotate == 270){
            minX = this.thumb.getLeft(true) + transform.m41 - (this.image.getWidth() - this.image.getHeight()) / 2;
            minY = this.thumb.getTop(true) + transform.m42 + (this.image.getWidth() - this.image.getHeight()) / 2;
            
            maxX = minX + this.thumb.getWidth() - this.image.getHeight();
            maxY = minY + this.thumb.getHeight() - this.image.getWidth();
        }
        
        var x = e.getPageX() - this.mouseX;
        var y = e.getPageY() - this.mouseY;
        
        var bgX = x + this.imageCanvas.getLeft(true);
        var bgY = y + this.imageCanvas.getTop(true);
        
        bgX = (minX < bgX) ? minX : ((maxX > bgX) ? maxX : bgX);
        bgY = (minY < bgY) ? minY : ((maxY > bgY) ? maxY : bgY);
        
        this.imageCanvas.setLeft(bgX);
        this.imageCanvas.setTop(bgY);
        
        this.mouseX = e.getPageX();
        this.mouseY = e.getPageY();
    },
    
    onMouseUp : function(e)
    {   
        e.stopEvent();
        
        this.dragable = false;
    },
    
    onMouseWheel : function(e)
    {   
        e.stopEvent();
        
        var scale = (e.getWheelDelta() == 1) ? (this.scale + 1) : (this.scale - 1);
        
        var width = this.image.OriginWidth * Math.pow(1.1, scale);
        var height = this.image.OriginHeight * Math.pow(1.1, scale);
        
        if(
                e.getWheelDelta() == -1 &&
                (
                    width < this.thumb.getWidth() ||
                    height < this.thumb.getHeight()
                )
        ){
            return;
        }
        
        this.scale = scale;
        
        this.image.setWidth(width);
        this.image.setHeight(height);
        
        this.setCanvasPosition();
        
    },
    
    onRotateLeft : function(e)
    {
        e.stopEvent();
        
        this.rotate = (this.rotate < 90) ? 270 : this.rotate - 90;
        
        this.imageCanvas.setStyle({
            '-ms-transform' : 'rotate(' + this.rotate + 'deg)',
            '-webkit-transform' : 'rotate(' + this.rotate + 'deg)',
            'transform' : 'rotate(' + this.rotate + 'deg)'
        });
        
        this.setCanvasPosition();
    },
    
    onRotateRight : function(e)
    {
        e.stopEvent();
        
        this.rotate = (this.rotate > 180) ? 0 : this.rotate + 90;
        
        this.imageCanvas.setStyle({
            '-ms-transform' : 'rotate(' + this.rotate + 'deg)',
            '-webkit-transform' : 'rotate(' + this.rotate + 'deg)',
            'transform' : 'rotate(' + this.rotate + 'deg)'
        });
        
        this.setCanvasPosition();
    },
    
    crop : function()
    {
        var canvas = document.createElement("canvas");
        
        canvas.width = this.minWidth;
        canvas.height = this.minHeight;
        
        var centerX = this.minWidth / 2;
        var centerY = this.minHeight / 2;
        
        var cropWidth = this.thumb.getWidth() * Math.pow(1.1, this.scale * -1);
        var cropHeight = this.thumb.getHeight() * Math.pow(1.1, this.scale * -1);
        
        var transform = new WebKitCSSMatrix(window.getComputedStyle(this.thumb.dom).webkitTransform);
        var thumbX = this.thumb.getLeft(true) + transform.m41;
        var thumbY = this.thumb.getTop(true) + transform.m42;
        
        var x = (thumbX - this.imageCanvas.getLeft(true)) * Math.pow(1.1, this.scale * -1);
        var y = (thumbY - this.imageCanvas.getTop(true)) * Math.pow(1.1, this.scale * -1);
        
        if(this.rotate == 90){
            
            Roo.log(this.thumb.getTop(true) + transform.m42 + (this.image.getWidth() - this.image.getHeight()) / 2 - this.imageCanvas.getTop(true));
            
            y = this.image.getHeight() - this.thumb.getWidth() - (thumbX - (this.image.getWidth() - this.image.getHeight()) / 2 - this.imageCanvas.getLeft(true));
            
            
            x = x - (this.image.OriginWidth - this.image.OriginHeight) / 2;
            
            y = y + (this.image.OriginWidth - this.image.OriginHeight) / 2;
             
            cropWidth = this.thumb.getHeight() * Math.pow(1.1, this.scale * -1);
            cropHeight = this.thumb.getWidth() * Math.pow(1.1, this.scale * -1);
//            
            canvas.width = this.minHeight;
            canvas.height = this.minWidth;
//        
            centerX = this.minHeight / 2;
            centerY = this.minWidth / 2;
            
            
        }
        
        Roo.log([x,y]);
        
        var context = canvas.getContext("2d");
        
        context.translate(centerX, centerY);

        //context.rotate(this.rotate * Math.PI / 180);
        
        context.drawImage(this.image.dom, x, y, cropWidth, cropHeight, centerX * -1, centerY * -1, canvas.width, canvas.height);
        
        this.cropImageData = canvas.toDataURL(this.cropType);
        
        Roo.log(this.cropImageData);
        
//        this.fireEvent('crop', this, this.cropImageData);
    },
    
    calcThumbBoxSize : function()
    {
        var width, height;
        
        height = 300;
        width = this.minWidth * height / this.minHeight;
        
        if(this.minWidth > this.minHeight){
            width = 300;
            height = this.minHeight * width / this.minWidth;
        }
        
        this.thumb.setStyle({
            width : width + 'px',
            height : height + 'px'
        });

        return;
            
    },
    
    fitThumbBox : function()
    {
        var i = 0;
        var width = this.image.OriginWidth;
        var height = this.image.OriginHeight;
        
        if(this.image.OriginWidth > this.image.OriginHeight){
            
            if(this.image.OriginHeight > this.thumb.getHeight()){
                while (height > this.thumb.getHeight()){
                    i = i - 1;
                    height = this.image.OriginHeight * Math.pow(1.1, i);
                }

                this.scale = (height < this.thumb.getHeight()) ? (i + 1) : i;

                return;
            }

            while (height < this.thumb.getHeight()){
                i = i + 1;
                height = this.image.OriginWidth * Math.pow(1.1, i);
            }

            this.scale = (height > this.thumb.getHeight()) ? (i - 1) : i;
            
            return;
        }
        
        if(this.image.OriginWidth > this.thumb.getWidth()){
            while (width > this.thumb.getWidth()){
                i = i - 1;
                width = this.image.OriginWidth * Math.pow(1.1, i);
            }

            this.scale = (width < this.thumb.getWidth()) ? (i + 1) : i;

            return;
        }

        while (width < this.thumb.getWidth()){
            i = i + 1;
            width = this.image.OriginWidth * Math.pow(1.1, i);
        }

        this.scale = (width > this.thumb.getWidth()) ? (i - 1) : i;

        return;
        
    }
    
});
