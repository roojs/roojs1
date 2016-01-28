
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
    baseScale : 1,
    rotate : 0,
    dragable : false,
    pinching : false,
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
                        },
                        {
                            tag : 'div',
                            cls : 'roo-upload-cropbox-empty-notify',
                            html : this.emptyText
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
        this.thumb.hide();
        
        this.emptyNotify = this.el.select('.roo-upload-cropbox-empty-notify', true).first();
        this.emptyNotify.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
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
        
        if(Roo.isTouch){
            this.imageSection.on('touchstart', this.onTouchStart, this);
            this.imageSection.on('touchmove', this.onTouchMove, this);
            this.imageSection.on('touchend', this.onTouchEnd, this);
        }
        
        if(!Roo.isTouch){
            this.imageSection.on('mousedown', this.onMouseDown, this);
        
            this.imageSection.on('mousemove', this.onMouseMove, this);

            var mousewheel = (/Firefox/i.test(navigator.userAgent))? 'DOMMouseScroll' : 'mousewheel';

            this.imageSection.on(mousewheel, this.onMouseWheel, this);

            Roo.get(document).on('mouseup', this.onMouseUp, this);
        }
        
        this.pictureBtn.on('click', this.beforeSelectFile, this);
        
        this.rotateLeft.on('click', this.onRotateLeft, this);
        
        this.rotateRight.on('click', this.onRotateRight, this);
        
    },
    
    reset : function()
    {    
        this.scale = 0;
        this.baseScale = 1;
        this.rotate = 0;
        this.dragable = false;
        this.pinching = false;
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
        this.emptyNotify.hide();
        this.thumb.show();
        this.footerSection.show();
        
        if(this.imageSectionHasOnClickEvent){
            this.imageSection.un('click', this.beforeSelectFile, this);
            this.imageSectionHasOnClickEvent = false;
        }
        
        this.image.OriginWidth = this.image.getWidth();
        this.image.OriginHeight = this.image.getHeight();
        
        this.fitThumbBox();
        
        this.image.setWidth(this.image.OriginWidth * this.getScaleLevel(false));
        this.image.setHeight(this.image.OriginHeight * this.getScaleLevel(false));
        
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
        this.pinching = false;
        
        this.mouseX = Roo.isTouch ? e.browserEvent.touches[0].pageX : e.getPageX();
        this.mouseY = Roo.isTouch ? e.browserEvent.touches[0].pageY : e.getPageY();
        
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
        
        var x = Roo.isTouch ? e.browserEvent.touches[0].pageX : e.getPageX();
        var y = Roo.isTouch ? e.browserEvent.touches[0].pageY : e.getPageY();
        
        x = x - this.mouseX;
        y = y - this.mouseY;
        
        alert(x);
        
        alert(this.imageCanvas.getLeft(true));
        
        var bgX = x + this.imageCanvas.getLeft(true);
        var bgY = y + this.imageCanvas.getTop(true);
        
        alert(bgX);
        
//        bgX = (minX < bgX) ? minX : ((maxX > bgX) ? maxX : bgX);
//        bgY = (minY < bgY) ? minY : ((maxY > bgY) ? maxY : bgY);
        
        alert(bgX);
        
        this.imageCanvas.setLeft(bgX);
        this.imageCanvas.setTop(bgY);
        
        this.mouseX = Roo.isTouch ? e.browserEvent.touches[0].pageX : e.getPageX();
        this.mouseY = Roo.isTouch ? e.browserEvent.touches[0].pageY : e.getPageY();
    },
    
    onMouseUp : function(e)
    {   
        e.stopEvent();
        
        this.dragable = false;
    },
    
    onMouseWheel : function(e)
    {   
        e.stopEvent();
        
        this.scale = (e.getWheelDelta() == 1) ? (this.scale + 1) : (this.scale - 1);
        
        var width = this.image.OriginWidth * this.getScaleLevel(false);
        var height = this.image.OriginHeight * this.getScaleLevel(false);
        
        if(
                e.getWheelDelta() == -1 &&
                (
                    (
                        (this.rotate == 0 || this.rotate == 180) && (width < this.thumb.getWidth() || height < this.thumb.getHeight())
                    )
                    ||
                    (
                        (this.rotate == 90 || this.rotate == 270) && (height < this.thumb.getWidth() || width < this.thumb.getHeight())
                    )
                )
        ){
            this.scale = (e.getWheelDelta() == 1) ? (this.scale - 1) : (this.scale + 1);
            return;
        }
        
        this.image.setWidth(width);
        this.image.setHeight(height);
        
        this.setCanvasPosition();
        
    },
    
    onRotateLeft : function(e)
    {
        e.stopEvent();
        
        if(
                (
                    (this.rotate == 0 || this.rotate == 180) 
                    &&
                    (this.image.getHeight() < this.thumb.getWidth() || this.image.getWidth() < this.thumb.getHeight())
                )
                ||
                (
                    (this.rotate == 90 || this.rotate == 270) 
                    &&
                    (this.image.getWidth() < this.thumb.getWidth() || this.image.getHeight() < this.thumb.getHeight())
                )
                
        ){
            return;
        }
        
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
        
        if(
                (
                    (this.rotate == 0 || this.rotate == 180) 
                    &&
                    (this.image.getHeight() < this.thumb.getWidth() || this.image.getWidth() < this.thumb.getHeight())
                )
                ||
                (
                    (this.rotate == 90 || this.rotate == 270) 
                    &&
                    (this.image.getWidth() < this.thumb.getWidth() || this.image.getHeight() < this.thumb.getHeight())
                )
                
        ){
            return false;
        }
        
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
        
        var context = canvas.getContext("2d");
        
        canvas.width = this.minWidth;
        canvas.height = this.minHeight;
        
        var centerX = this.minWidth / 2;
        var centerY = this.minHeight / 2;
        
        var cropWidth = this.thumb.getWidth() * this.getScaleLevel(true);
        var cropHeight = this.thumb.getHeight() * this.getScaleLevel(true);
        
        var transform = new WebKitCSSMatrix(window.getComputedStyle(this.thumb.dom).webkitTransform);
        var thumbX = this.thumb.getLeft(true) + transform.m41;
        var thumbY = this.thumb.getTop(true) + transform.m42;
        
        var x = (thumbX - this.imageCanvas.getLeft(true)) * this.getScaleLevel(true);
        var y = (thumbY - this.imageCanvas.getTop(true)) * this.getScaleLevel(true);
        
        if(this.rotate == 90){
            
            x = thumbY + (this.image.getWidth() - this.image.getHeight()) / 2 - this.imageCanvas.getTop(true);
            y = this.image.getHeight() - this.thumb.getWidth() - (thumbX - (this.image.getWidth() - this.image.getHeight()) / 2 - this.imageCanvas.getLeft(true));
            
            x = x * this.getScaleLevel(true);
            y = y * this.getScaleLevel(true);
            
            x = x < 0 ? 0 : x;
            y = y < 0 ? 0 : y;
            
            cropWidth = this.thumb.getHeight() * this.getScaleLevel(true);
            cropHeight = this.thumb.getWidth() * this.getScaleLevel(true);
            
            canvas.width = this.minWidth > this.minHeight ? this.minWidth : this.minHeight;
            canvas.height = this.minWidth > this.minHeight ? this.minWidth : this.minHeight;

            centerX = this.minWidth > this.minHeight ? (this.minWidth / 2) : (this.minHeight / 2);
            centerY = this.minWidth > this.minHeight ? (this.minWidth / 2) : (this.minHeight / 2);
            
            context.translate(centerX, centerY);
            context.rotate(this.rotate * Math.PI / 180);
            
            context.drawImage(this.image.dom, x, y, cropWidth, cropHeight, centerX * -1, centerY * -1, this.minHeight, this.minWidth);
        
            var canvas2 = document.createElement("canvas");
            var context2 = canvas2.getContext("2d");
            
            canvas2.width = this.minWidth;
            canvas2.height = this.minHeight;
            
            context2.drawImage(canvas, Math.abs(this.minWidth - this.minHeight), 0, this.minWidth, this.minHeight, 0, 0, this.minWidth, this.minHeight);
    
            this.cropImageData = canvas2.toDataURL(this.cropType);

            this.fireEvent('crop', this, this.cropImageData);
            
            return;
            
        }
        
        if(this.rotate == 270){
            
            x = thumbY + (this.image.getWidth() - this.image.getHeight()) / 2 - this.imageCanvas.getTop(true);
            y = thumbX - (this.image.getWidth() - this.image.getHeight()) / 2 - this.imageCanvas.getLeft(true);
            
            x = (this.image.getWidth() - this.thumb.getHeight() - x) * this.getScaleLevel(true);
            y = y * this.getScaleLevel(true);
            
            x = x < 0 ? 0 : x;
            y = y < 0 ? 0 : y;
            
            cropWidth = this.thumb.getHeight() * this.getScaleLevel(true);
            cropHeight = this.thumb.getWidth() * this.getScaleLevel(true);
            
            canvas.width = this.minWidth > this.minHeight ? this.minWidth : this.minHeight;
            canvas.height = this.minWidth > this.minHeight ? this.minWidth : this.minHeight;

            centerX = this.minWidth > this.minHeight ? (this.minWidth / 2) : (this.minHeight / 2);
            centerY = this.minWidth > this.minHeight ? (this.minWidth / 2) : (this.minHeight / 2);
            
            context.translate(centerX, centerY);
            context.rotate(this.rotate * Math.PI / 180);
            
            context.drawImage(this.image.dom, x, y, cropWidth, cropHeight, centerX * -1, centerY * -1, this.minHeight, this.minWidth);
        
            var canvas2 = document.createElement("canvas");
            var context2 = canvas2.getContext("2d");
            
            canvas2.width = this.minWidth;
            canvas2.height = this.minHeight;
            
            context2.drawImage(canvas, 0, 0, this.minWidth, this.minHeight, 0, 0, this.minWidth, this.minHeight);
    
            this.cropImageData = canvas2.toDataURL(this.cropType);
            
            this.fireEvent('crop', this, this.cropImageData);
            
            return;
            
        }
        
        if(this.rotate == 180){
            x = this.image.OriginWidth - this.thumb.getWidth() * this.getScaleLevel(true) - x;
            y = this.image.OriginHeight - this.thumb.getHeight() * this.getScaleLevel(true) - y;
        }
        
        x = x < 0 ? 0 : x;
        y = y < 0 ? 0 : y;
            
        context.translate(centerX, centerY);

        context.rotate(this.rotate * Math.PI / 180);
        
        context.drawImage(this.image.dom, x, y, cropWidth, cropHeight, centerX * -1, centerY * -1, canvas.width, canvas.height);
        
        this.cropImageData = canvas.toDataURL(this.cropType);
        
        this.fireEvent('crop', this, this.cropImageData);
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
        var width = this.thumb.getWidth();
        var height = this.image.OriginHeight * width / this.image.OriginWidth;
        
        this.baseScale = width / this.image.OriginWidth;
        
        if(this.image.OriginWidth > this.image.OriginHeight){
            height = this.thumb.getHeight();
            width = this.image.OriginWidth * height / this.image.OriginHeight;
            
            this.baseScale = height / this.image.OriginHeight;
        }
        
        return;
    },
    
    getScaleLevel : function(reverse)
    {
        if(reverse){
            return Math.pow(1.1, this.scale * -1) / this.baseScale;
        }
        
        return this.baseScale * Math.pow(1.1, this.scale);
    },
    
    onTouchStart : function(e)
    {
        e.stopEvent();
        
        var touches = e.browserEvent.touches;
        
        if(!touches){
            return;
        }
        
        if(touches.length == 1){
            this.onMouseDown(e);
            return;
        }
        
        if(touches.length != 2){
            return;
        }
        
        var coords = [];
        
        for(var i = 0, finger; finger = touches[i]; i++){
            coords.push(finger.pageX, finger.pageY);
        }
        
        var x = Math.pow(coords[0] - coords[2], 2);
        var y = Math.pow(coords[1] - coords[3], 2);
        
        this.startDistance =  Math.sqrt(x + y);
        
        this.startScale = this.scale;
        
        this.dragable = false;
        this.pinching = true;
        
    },
    
    onTouchMove : function(e)
    {
        e.stopEvent();
        
        if(!this.pinching && !this.dragable){
            return;
        }
        
        var touches = e.browserEvent.touches;
        
        if(!touches){
            return;
        }
        
        if(this.dragable){
            this.onMouseMove(e);
            return;
        }
        
        var coords = [];
        
        for(var i = 0, finger; finger = touches[i]; i++){
            coords.push(finger.pageX, finger.pageY);
        }
        
        var x = Math.pow(coords[0] - coords[2], 2);
        var y = Math.pow(coords[1] - coords[3], 2);
        
        this.endDistance =  Math.sqrt(x + y);
        
        var scale = this.startScale + Math.floor(Math.log(this.endDistance / this.startDistance) / Math.log(1.1));
        
        var width = this.image.OriginWidth * this.baseScale * Math.pow(1.1, scale);
        var height = this.image.OriginHeight * this.baseScale * Math.pow(1.1, scale);
        
        if(
                this.endDistance / this.startDistance < 1 &&
                (
                    (
                        (this.rotate == 0 || this.rotate == 180) && (width < this.thumb.getWidth() || height < this.thumb.getHeight())
                    )
                    ||
                    (
                        (this.rotate == 90 || this.rotate == 270) && (height < this.thumb.getWidth() || width < this.thumb.getHeight())
                    )
                )
        ){
            return;
        }
        
        this.scale = scale;
        
        this.image.setWidth(width);
        this.image.setHeight(height);
        
        this.setCanvasPosition();
        
        
    },
    
    onTouchEnd : function(e)
    {
        e.stopEvent();
        
        this.pinching = false;
        this.dragable = false;
        
    }
});
