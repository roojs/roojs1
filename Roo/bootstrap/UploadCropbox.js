
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
        "beforeselectfile" : true,
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
        "crop" : true,
        /**
         * @event prepare
         * Fire when preparing the file data
         * @param {Roo.bootstrap.UploadCropbox} this
         * @param {Object} file
         */
        "prepare" : true,
        /**
         * @event exception
         * Fire when get exception
         * @param {Roo.bootstrap.UploadCropbox} this
         * @param {Object} options
         */
        "exception" : true,
        /**
         * @event beforeloadimage
         * Fire before load the image
         * @param {Roo.bootstrap.UploadCropbox} this
         * @param {String} src
         */
        "beforeloadimage" : true
        
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
    minWidth : 300,
    minHeight : 300,
    file : false,
    exif : {},
    baseRotate : 1,
    
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
        
        this.fireEvent('beforeselectfile', this);
    },
    
    loadCanvasImage : function(src)
    {   
        if(this.fireEvent('beforeloadimage', this, src) != false){
            this.reset();
            this.image.attr('src', src);
        }
    },
    
    onLoadCanvasImage : function(src)
    {   
        this.emptyNotify.hide();
        this.thumb.show();
        this.footerSection.show();
        
        this.placeThumbBox();
        
        this.Orientation();
        
        alert(this.baseRotate);
        
        if(this.imageSectionHasOnClickEvent){
            this.imageSection.un('click', this.beforeSelectFile, this);
            this.imageSectionHasOnClickEvent = false;
        }
        
        this.image.OriginWidth = this.image.getWidth();
        this.image.OriginHeight = this.image.getHeight();
        
        this.fitThumbBox();
        
        this.image.setWidth(Math.ceil(this.image.OriginWidth * this.getScaleLevel(false)));
        this.image.setHeight(Math.ceil(this.image.OriginHeight * this.getScaleLevel(false)));
        
        this.setCanvasPosition();
    },
    
    setCanvasPosition : function()
    {   
        var pw = Math.ceil((this.imageSection.getWidth() - this.image.getWidth()) / 2);
        var ph = Math.ceil((this.imageSection.getHeight() - this.image.getHeight()) / 2);
        
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
        
        var minX = Math.ceil(this.thumb.getLeft(true));
        var minY = Math.ceil(this.thumb.getTop(true));
        
        var maxX = Math.ceil(minX + this.thumb.getWidth() - this.image.getWidth());
        var maxY = Math.ceil(minY + this.thumb.getHeight() - this.image.getHeight());
        
        if(this.rotate == 90 || this.rotate == 270){
            minX = Math.ceil(this.thumb.getLeft(true) - (this.image.getWidth() - this.image.getHeight()) / 2);
            minY = Math.ceil(this.thumb.getTop(true) + (this.image.getWidth() - this.image.getHeight()) / 2);
            
            maxX = Math.ceil(minX + this.thumb.getWidth() - this.image.getHeight());
            maxY = Math.ceil(minY + this.thumb.getHeight() - this.image.getWidth());
        }
        
        var x = Roo.isTouch ? e.browserEvent.touches[0].pageX : e.getPageX();
        var y = Roo.isTouch ? e.browserEvent.touches[0].pageY : e.getPageY();
        
        x = x - this.mouseX;
        y = y - this.mouseY;
        
        var bgX = Math.ceil(x + this.imageCanvas.getLeft(true));
        var bgY = Math.ceil(y + this.imageCanvas.getTop(true));
        
        bgX = (minX < bgX) ? minX : ((maxX > bgX) ? maxX : bgX);
        bgY = (minY < bgY) ? minY : ((maxY > bgY) ? maxY : bgY);
        
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
        
        var width = Math.ceil(this.image.OriginWidth * this.getScaleLevel(false));
        var height = Math.ceil(this.image.OriginHeight * this.getScaleLevel(false));
        
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
        
        var thumbX = Math.ceil(this.thumb.getLeft(true));
        var thumbY = Math.ceil(this.thumb.getTop(true));
        
        var x = (thumbX - this.imageCanvas.getLeft(true)) * this.getScaleLevel(true);
        var y = (thumbY - this.imageCanvas.getTop(true)) * this.getScaleLevel(true);
        
        if(this.rotate == 90){
            
            x = thumbY + (this.image.getWidth() - this.image.getHeight()) / 2 - this.imageCanvas.getTop(true);
            y = this.image.getHeight() - this.thumb.getWidth() - (thumbX - (this.image.getWidth() - this.image.getHeight()) / 2 - this.imageCanvas.getLeft(true));
            
            x = x * this.getScaleLevel(true);
            y = y * this.getScaleLevel(true);
            
            if(this.image.OriginWidth - cropHeight < x){
                x = this.image.OriginWidth - cropHeight;
            }

            if(this.image.OriginHeight - cropWidth < y){
                y = this.image.OriginHeight - cropWidth;
            }
            
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
    
            this.cropImageData = canvas2.toDataURL(this.file.type);
            
            this.fireEvent('crop', this, this.cropImageData);
            
            return;
        }
        
        if(this.rotate == 270){
            
            x = thumbY + (this.image.getWidth() - this.image.getHeight()) / 2 - this.imageCanvas.getTop(true);
            y = thumbX - (this.image.getWidth() - this.image.getHeight()) / 2 - this.imageCanvas.getLeft(true);
            
            x = (this.image.getWidth() - this.thumb.getHeight() - x) * this.getScaleLevel(true);
            y = y * this.getScaleLevel(true);
            
            if(this.image.OriginWidth - cropHeight < x){
                x = this.image.OriginWidth - cropHeight;
            }

            if(this.image.OriginHeight - cropWidth < y){
                y = this.image.OriginHeight - cropWidth;
            }

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
    
            this.cropImageData = canvas2.toDataURL(this.file.type);
            
            this.fireEvent('crop', this, this.cropImageData);
            
            return;
        }
        
        if(this.rotate == 180){
            x = this.image.OriginWidth - this.thumb.getWidth() * this.getScaleLevel(true) - x;
            y = this.image.OriginHeight - this.thumb.getHeight() * this.getScaleLevel(true) - y;
        }
        
        if(this.image.OriginWidth - cropWidth < x){
            x = this.image.OriginWidth - cropWidth;
        }
        
        if(this.image.OriginHeight - cropHeight < y){
            y = this.image.OriginHeight - cropHeight;
        }
        
        x = x < 0 ? 0 : x;
        y = y < 0 ? 0 : y;
        
        context.translate(centerX, centerY);

        context.rotate(this.rotate * Math.PI / 180);
        
        context.drawImage(this.image.dom, x, y, cropWidth, cropHeight, centerX * -1, centerY * -1, canvas.width, canvas.height);
        
        this.cropImageData = canvas.toDataURL(this.file.type);
        
        this.fireEvent('crop', this, this.cropImageData);
    },
    
    calcThumbBoxSize : function()
    {
        var width, height;
        
        height = 300;
        width = Math.ceil(this.minWidth * height / this.minHeight);
        
        if(this.minWidth > this.minHeight){
            width = 300;
            height = Math.ceil(this.minHeight * width / this.minWidth);
        }
        
        this.thumb.setStyle({
            width : width + 'px',
            height : height + 'px'
        });

        return;
            
    },
    
    placeThumbBox : function()
    {
        var x = Math.ceil((this.imageSection.getWidth() - this.thumb.getWidth()) / 2 );
        var y = Math.ceil((this.imageSection.getHeight() - this.thumb.getHeight()) / 2);
        
        this.thumb.setLeft(x);
        this.thumb.setTop(y);
        
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
    
    Orientation : function()
    {
        this.baseRotate = Roo.bootstrap.UploadCropbox['Orientation'][1];
        
        if(typeof(this.exif[Roo.bootstrap.UploadCropbox['tags']['Orientation']]) == 'undefined'){
            return;
        }
        
        this.baseRotate = Roo.bootstrap.UploadCropbox['Orientation'][this.exif[Roo.bootstrap.UploadCropbox['tags']['Orientation']]]
        
        if([1, 3, 6, 8].indexOf(this.baseRotate) === false){
            this.baseRotate = 1
        }
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
        
        this.pinching = true;
        this.dragable = false;
        
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
        
        var width = Math.ceil(this.image.OriginWidth * this.baseScale * Math.pow(1.1, scale));
        var height = Math.ceil(this.image.OriginHeight * this.baseScale * Math.pow(1.1, scale));
        
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
        
    },
    
    prepare : function(input)
    {
        if(!input.files || !input.files[0]){
            return;
        }
        
        this.file = input.files[0];
        
        var noMetaData = !(window.DataView  && this.file && this.file.size >= 12 && this.file.type === 'image/jpeg');
        
        if(noMetaData){ // ??? only for jpeg ???
            Roo.log('noMetaData');
            return;
        }
        
        var _this = this;
        
        if(this.fireEvent('prepare', this, this.file) != false){
            
            var reader = new FileReader();
            
            reader.onload = function (e) {
                if (e.target.error) {
                    Roo.log(e.target.error);
                    return;
                }
                
                var buffer = e.target.result,
                    dataView = new DataView(buffer),
                    offset = 2,
                    maxOffset = dataView.byteLength - 4,
                    markerBytes,
                    markerLength;
                
                if (dataView.getUint16(0) === 0xffd8) {
                    while (offset < maxOffset) {
                        markerBytes = dataView.getUint16(offset);
                        
                        if ((markerBytes >= 0xffe0 && markerBytes <= 0xffef) || markerBytes === 0xfffe) {
                            markerLength = dataView.getUint16(offset + 2) + 2;
                            if (offset + markerLength > dataView.byteLength) {
                                Roo.log('Invalid meta data: Invalid segment size.');
                                break;
                            }
                            
                            if(markerBytes == 0xffe1){
                                _this.parseExifData(
                                    dataView,
                                    offset,
                                    markerLength
                                );
                            }
                            
                            offset += markerLength;
                            
                            continue;
                        }
                        
                        break;
                    }
                    
                }
                
                var urlAPI = (window.createObjectURL && window) || (window.URL && URL.revokeObjectURL && URL) || (window.webkitURL && webkitURL);
                
                if(!urlAPI){
                    return;
                }
                
                var url = urlAPI.createObjectURL(_this.file);
                
                _this.loadCanvasImage(url);
                
                return;
            }
            
            reader.readAsArrayBuffer(this.file);
            
        }
        
    },
    
    parseExifData : function(dataView, offset, length)
    {
        var tiffOffset = offset + 10,
            littleEndian,
            dirOffset;
    
        if (dataView.getUint32(offset + 4) !== 0x45786966) {
            // No Exif data, might be XMP data instead
            return;
        }
        
        // Check for the ASCII code for "Exif" (0x45786966):
        if (dataView.getUint32(offset + 4) !== 0x45786966) {
            // No Exif data, might be XMP data instead
            return;
        }
        if (tiffOffset + 8 > dataView.byteLength) {
            Roo.log('Invalid Exif data: Invalid segment size.');
            return;
        }
        // Check for the two null bytes:
        if (dataView.getUint16(offset + 8) !== 0x0000) {
            Roo.log('Invalid Exif data: Missing byte alignment offset.');
            return;
        }
        // Check the byte alignment:
        switch (dataView.getUint16(tiffOffset)) {
        case 0x4949:
            littleEndian = true;
            break;
        case 0x4D4D:
            littleEndian = false;
            break;
        default:
            Roo.log('Invalid Exif data: Invalid byte alignment marker.');
            return;
        }
        // Check for the TIFF tag marker (0x002A):
        if (dataView.getUint16(tiffOffset + 2, littleEndian) !== 0x002A) {
            Roo.log('Invalid Exif data: Missing TIFF marker.');
            return;
        }
        // Retrieve the directory offset bytes, usually 0x00000008 or 8 decimal:
        dirOffset = dataView.getUint32(tiffOffset + 4, littleEndian);
        
        this.parseExifTags(
            dataView,
            tiffOffset,
            tiffOffset + dirOffset,
            littleEndian
        );
    },
    
    parseExifTags : function(dataView, tiffOffset, dirOffset, littleEndian)
    {
        var tagsNumber,
            dirEndOffset,
            i;
        if (dirOffset + 6 > dataView.byteLength) {
            console.log('Invalid Exif data: Invalid directory offset.');
            return;
        }
        tagsNumber = dataView.getUint16(dirOffset, littleEndian);
        dirEndOffset = dirOffset + 2 + 12 * tagsNumber;
        if (dirEndOffset + 4 > dataView.byteLength) {
            console.log('Invalid Exif data: Invalid directory size.');
            return;
        }
        for (i = 0; i < tagsNumber; i += 1) {
            this.parseExifTag(
                dataView,
                tiffOffset,
                dirOffset + 2 + 12 * i, // tag offset
                littleEndian
            );
        }
        // Return the offset to the next directory:
        return dataView.getUint32(dirEndOffset, littleEndian);
    },
    
    parseExifTag : function (dataView, tiffOffset, offset, littleEndian) 
    {
        var tag = dataView.getUint16(offset, littleEndian);
        
        this.exif[tag] = this.getExifValue(
            dataView,
            tiffOffset,
            offset,
            dataView.getUint16(offset + 2, littleEndian), // tag type
            dataView.getUint32(offset + 4, littleEndian), // tag length
            littleEndian
        );
    },
    
    getExifValue : function (dataView, tiffOffset, offset, type, length, littleEndian)
    {
        var tagType = Roo.bootstrap.UploadCropbox.exifTagTypes[type],
            tagSize,
            dataOffset,
            values,
            i,
            str,
            c;
    
        if (!tagType) {
            Roo.log('Invalid Exif data: Invalid tag type.');
            return;
        }
        
        tagSize = tagType.size * length;
        // Determine if the value is contained in the dataOffset bytes,
        // or if the value at the dataOffset is a pointer to the actual data:
        dataOffset = tagSize > 4 ?
                tiffOffset + dataView.getUint32(offset + 8, littleEndian) : (offset + 8);
        if (dataOffset + tagSize > dataView.byteLength) {
            Roo.log('Invalid Exif data: Invalid data offset.');
            return;
        }
        if (length === 1) {
            return tagType.getValue(dataView, dataOffset, littleEndian);
        }
        values = [];
        for (i = 0; i < length; i += 1) {
            values[i] = tagType.getValue(dataView, dataOffset + i * tagType.size, littleEndian);
        }
        
        if (tagType.ascii) {
            str = '';
            // Concatenate the chars:
            for (i = 0; i < values.length; i += 1) {
                c = values[i];
                // Ignore the terminating NULL byte(s):
                if (c === '\u0000') {
                    break;
                }
                str += c;
            }
            return str;
        }
        return values;
    }
    
});

Roo.apply(Roo.bootstrap.UploadCropbox, {
    tags : {
        'Orientation': 0x0112
    },
    
    Orientation: {
        1: 'top-left',
        2: 'top-right',
        3: 'bottom-right',
        4: 'bottom-left',
        5: 'left-top',
        6: 'right-top',
        7: 'right-bottom',
        8: 'left-bottom'
    },
    
    exifTagTypes : {
        // byte, 8-bit unsigned int:
        1: {
            getValue: function (dataView, dataOffset) {
                return dataView.getUint8(dataOffset);
            },
            size: 1
        },
        // ascii, 8-bit byte:
        2: {
            getValue: function (dataView, dataOffset) {
                return String.fromCharCode(dataView.getUint8(dataOffset));
            },
            size: 1,
            ascii: true
        },
        // short, 16 bit int:
        3: {
            getValue: function (dataView, dataOffset, littleEndian) {
                return dataView.getUint16(dataOffset, littleEndian);
            },
            size: 2
        },
        // long, 32 bit int:
        4: {
            getValue: function (dataView, dataOffset, littleEndian) {
                return dataView.getUint32(dataOffset, littleEndian);
            },
            size: 4
        },
        // rational = two long values, first is numerator, second is denominator:
        5: {
            getValue: function (dataView, dataOffset, littleEndian) {
                return dataView.getUint32(dataOffset, littleEndian) /
                    dataView.getUint32(dataOffset + 4, littleEndian);
            },
            size: 8
        },
        // slong, 32 bit signed int:
        9: {
            getValue: function (dataView, dataOffset, littleEndian) {
                return dataView.getInt32(dataOffset, littleEndian);
            },
            size: 4
        },
        // srational, two slongs, first is numerator, second is denominator:
        10: {
            getValue: function (dataView, dataOffset, littleEndian) {
                return dataView.getInt32(dataOffset, littleEndian) /
                    dataView.getInt32(dataOffset + 4, littleEndian);
            },
            size: 8
        }
    }
});
