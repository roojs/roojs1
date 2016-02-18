
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
 * @cfg {Array} buttons default ['rotateLeft', 'pictureBtn', 'rotateRight']
 * 
 * @constructor
 * Create a new UploadCropbox
 * @param {Object} config The config object
 */

Roo.bootstrap.UploadCropbox = function(config){
    Roo.bootstrap.UploadCropbox.superclass.constructor.call(this, config);
    
    this.addEvents({
        /**
         * @event beforeselectfile
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
         * @param {String} data
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
         * @event beforeloadcanvas
         * Fire before load the canvas
         * @param {Roo.bootstrap.UploadCropbox} this
         * @param {String} src
         */
        "beforeloadcanvas" : true,
        /**
         * @event trash
         * Fire when trash image
         * @param {Roo.bootstrap.UploadCropbox} this
         */
        "trash" : true,
        /**
         * @event save
         * Fire when save the image
         * @param {Roo.bootstrap.UploadCropbox} this
         */
        "save" : true
        
    });
    
    this.buttons = this.buttons || Roo.bootstrap.UploadCropbox.footer.STANDARD;
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
    cropData : false,
    minWidth : 300,
    minHeight : 300,
    file : false,
    exif : {},
    baseRotate : 1,
    cropType : 'image/jpeg',
    buttons : false,
    
    getAutoCreate : function()
    {
        var cfg = {
            tag : 'div',
            cls : 'roo-upload-cropbox',
            cn : [
                {
                    tag : 'div',
                    cls : 'roo-upload-cropbox-body',
                    cn : [
                        {
                            tag : 'div',
                            cls : 'roo-upload-cropbox-preview'
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
                    cls : 'roo-upload-cropbox-footer',
                    cn : {
                        tag : 'div',
                        cls : 'btn-group btn-group-justified roo-upload-cropbox-btn-group',
                        cn : []
                    }
                }
            ]
        };
        
        return cfg;
    },
    
    onRender : function(ct, position)
    {
        Roo.bootstrap.UploadCropbox.superclass.onRender.call(this, ct, position);
        
        if (this.buttons.length) {
            Roo.each(this.buttons, function(bb) {
                
                var btn = this.el.select('.roo-upload-cropbox-footer div.roo-upload-cropbox-btn-group').first().createChild(bb);
                
                btn.on('click', this.onFooterButtonClick.createDelegate(this, [bb.action], true));
                
            },this);
        }
    },
    
    initEvents : function()
    {
        this.urlAPI = (window.createObjectURL && window) || 
                                (window.URL && URL.revokeObjectURL && URL) || 
                                (window.webkitURL && webkitURL);
                        
        this.bodyEl = this.el.select('.roo-upload-cropbox-body', true).first();
        this.bodyEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        this.bodyHasOnClickEvent = false;
        
        this.previewEl = this.el.select('.roo-upload-cropbox-preview', true).first();
        this.previewEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        this.thumbEl = this.el.select('.roo-upload-cropbox-thumb', true).first();
        this.thumbEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        this.thumbEl.hide();
        
        this.notifyEl = this.el.select('.roo-upload-cropbox-empty-notify', true).first();
        this.notifyEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        this.footerEl = this.el.select('.roo-upload-cropbox-footer', true).first();
        this.footerEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        this.footerEl.hide();
        
//        this.rotateLeft = this.el.select('.roo-upload-cropbox-rotate-left', true).first();
//        this.rotateLeft.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'table-cell';
//        this.rotateLeft.hide();
//        
//        this.pictureBtn = this.el.select('.roo-upload-cropbox-picture', true).first();
//        this.pictureBtn.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'table-cell';
//        this.pictureBtn.hide();
//        
//        this.trashBtn = this.el.select('.roo-upload-cropbox-trash', true).first();
//        this.trashBtn.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'table-cell';
//        this.trashBtn.hide();
//        
//        this.saveBtn = this.el.select('.roo-upload-cropbox-save', true).first();
//        this.saveBtn.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'table-cell';
//        this.saveBtn.hide();
//        
//        this.rotateRight = this.el.select('.roo-upload-cropbox-rotate-right', true).first();
//        this.rotateRight.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'table-cell';
//        this.rotateRight.hide();
//        
//        Roo.each(this.buttons, function(btn){
//            this[btn].show();
//        }, this);
        
        this.setThumbBoxSize();
        
        this.bind();
        
        this.fireEvent('initial', this);
    },

    bind : function()
    {
        var _this = this;
        
        window.addEventListener("resize", function() { _this.resize(); } );
        
        if(!this.bodyHasOnClickEvent){
            this.bodyEl.on('click', this.beforeSelectFile, this);
            this.bodyHasOnClickEvent = true;
        }
        
        if(Roo.isTouch){
            this.bodyEl.on('touchstart', this.onTouchStart, this);
            this.bodyEl.on('touchmove', this.onTouchMove, this);
            this.bodyEl.on('touchend', this.onTouchEnd, this);
        }
        
        if(!Roo.isTouch){
            this.bodyEl.on('mousedown', this.onMouseDown, this);
            this.bodyEl.on('mousemove', this.onMouseMove, this);
            var mousewheel = (/Firefox/i.test(navigator.userAgent))? 'DOMMouseScroll' : 'mousewheel';
            this.bodyEl.on(mousewheel, this.onMouseWheel, this);
            Roo.get(document).on('mouseup', this.onMouseUp, this);
        }
        
//        this.pictureBtn.on('click', this.beforeSelectFile, this);
//        
//        this.trashBtn.on('click', this.onTrash, this);
//        
//        this.saveBtn.on('click', this.onSave, this);
//        
//        this.rotateLeft.on('click', this.onRotateLeft, this);
//        
//        this.rotateRight.on('click', this.onRotateRight, this);
        
    },
    
    reset : function()
    {    
        this.scale = 0;
        this.baseScale = 1;
        this.rotate = 0;
        this.baseRotate = 1;
        this.dragable = false;
        this.pinching = false;
        this.mouseX = 0;
        this.mouseY = 0;
        this.cropData = false;
        
    },
    
    resize : function()
    {
        this.setThumbBoxPosition();
        this.setCanvasPosition();
    },
    
    onFooterButtonClick : function(e, el, o, type)
    {
        switch (type) {
            case 'rotate-left' :
                this.onRotateLeft();
                break;
            case 'rotate-right' :
                this.onRotateRight();
                break;
            case 'picture' :
                this.beforeSelectFile();
                break;
            case 'trash' :
                this.trash();
                break;
            case 'save' :
                this.save();
                break;
            default :
                break;
        }
        
        
    },
    
    beforeSelectFile : function(e)
    {
        e.preventDefault();
        
        this.fireEvent('beforeselectfile', this);
    },
    
    trash : function(e)
    {
        e.preventDefault();
        
        this.fireEvent('trash', this);
    },
    
    save : function(e)
    {
        e.preventDefault();
        
        this.fireEvent('save', this);
    },
    
    loadCanvas : function(src)
    {   
        if(this.fireEvent('beforeloadcanvas', this, src) != false){
            
            this.reset();
            
            this.imageEl = document.createElement('img');
            
            var _this = this;
            
            this.imageEl.addEventListener("load", function(){ _this.onLoadCanvas(); });
            
            this.imageEl.src = src;
        }
    },
    
    onLoadCanvas : function()
    {   
        if(this.bodyHasOnClickEvent){
            this.bodyEl.un('click', this.beforeSelectFile, this);
            this.bodyHasOnClickEvent = false;
        }
        
        this.notifyEl.hide();
        this.thumbEl.show();
        this.footerEl.show();
        
        this.imageEl.OriginWidth = this.imageEl.naturalWidth || this.imageEl.width;
        this.imageEl.OriginHeight = this.imageEl.naturalHeight || this.imageEl.height;
        
        this.setThumbBoxPosition();
        this.baseRotateLevel();
        this.baseScaleLevel();
        
        this.draw();
        
    },
    
    setCanvasPosition : function()
    {   
        var pw = Math.ceil((this.bodyEl.getWidth() - this.canvasEl.width) / 2);
        var ph = Math.ceil((this.bodyEl.getHeight() - this.canvasEl.height) / 2);
        
        this.previewEl.setLeft(pw);
        this.previewEl.setTop(ph);
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
        
        var minX = Math.ceil(this.thumbEl.getLeft(true));
        var minY = Math.ceil(this.thumbEl.getTop(true));
        
        var maxX = Math.ceil(minX + this.thumbEl.getWidth() - this.canvasEl.width);
        var maxY = Math.ceil(minY + this.thumbEl.getHeight() - this.canvasEl.height);
        
        var x = Roo.isTouch ? e.browserEvent.touches[0].pageX : e.getPageX();
        var y = Roo.isTouch ? e.browserEvent.touches[0].pageY : e.getPageY();
        
        x = x - this.mouseX;
        y = y - this.mouseY;
        
        var bgX = Math.ceil(x + this.previewEl.getLeft(true));
        var bgY = Math.ceil(y + this.previewEl.getTop(true));
        
        bgX = (minX < bgX) ? minX : ((maxX > bgX) ? maxX : bgX);
        bgY = (minY < bgY) ? minY : ((maxY > bgY) ? maxY : bgY);
        
        this.previewEl.setLeft(bgX);
        this.previewEl.setTop(bgY);
        
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
        
        var width = Math.ceil(this.imageEl.OriginWidth * this.getScaleLevel());
        var height = Math.ceil(this.imageEl.OriginHeight * this.getScaleLevel());
        
        if(
                e.getWheelDelta() == -1 &&
                (
                    (
                        (this.rotate == 0 || this.rotate == 180) && (width < this.thumbEl.getWidth() || height < this.thumbEl.getHeight())
                    )
                    ||
                    (
                        (this.rotate == 90 || this.rotate == 270) && (height < this.thumbEl.getWidth() || width < this.thumbEl.getHeight())
                    )
                )
        ){
            this.scale = (e.getWheelDelta() == 1) ? (this.scale - 1) : (this.scale + 1);
            return;
        }
        
        this.draw();
    },
    
    onRotateLeft : function(e)
    {
        e.stopEvent();
        
        if(
                (
                    (this.rotate == 0 || this.rotate == 180) 
                    &&
                    (this.canvasEl.height < this.thumbEl.getWidth() || this.canvasEl.width < this.thumbEl.getHeight())
                )
                ||
                (
                    (this.rotate == 90 || this.rotate == 270) 
                    &&
                    (this.canvasEl.height < this.thumbEl.getWidth() || this.canvasEl.width < this.thumbEl.getHeight())
                )
                
        ){
            return;
        }
        
        this.rotate = (this.rotate < 90) ? 270 : this.rotate - 90;

        this.draw();
        
    },
    
    onRotateRight : function(e)
    {
        e.stopEvent();
        
        if(
                (
                    (this.rotate == 0 || this.rotate == 180) 
                    &&
                    (this.canvasEl.height < this.thumbEl.getWidth() || this.canvasEl.width < this.thumbEl.getHeight())
                )
                ||
                (
                    (this.rotate == 90 || this.rotate == 270) 
                    &&
                    (this.canvasEl.height < this.thumbEl.getWidth() || this.canvasEl.width < this.thumbEl.getHeight())
                )
                
        ){
            return false;
        }
        
        this.rotate = (this.rotate > 180) ? 0 : this.rotate + 90;

        this.draw();
        
    },
    
    draw : function()
    {
        this.previewEl.dom.innerHTML = '';
        
        var canvasEl = document.createElement("canvas");
        
        var contextEl = canvasEl.getContext("2d");
        
        canvasEl.width = this.imageEl.OriginWidth * this.getScaleLevel();
        canvasEl.height = this.imageEl.OriginWidth * this.getScaleLevel();
        var center = this.imageEl.OriginWidth / 2;
        
        if(this.imageEl.OriginWidth < this.imageEl.OriginHeight){
            canvasEl.width = this.imageEl.OriginHeight * this.getScaleLevel();
            canvasEl.height = this.imageEl.OriginHeight * this.getScaleLevel();
            center = this.imageEl.OriginHeight / 2;
        }
        
        contextEl.scale(this.getScaleLevel(), this.getScaleLevel());
        
        contextEl.translate(center, center);
        contextEl.rotate(this.rotate * Math.PI / 180);

        contextEl.drawImage(this.imageEl, 0, 0, this.imageEl.OriginWidth, this.imageEl.OriginHeight, center * -1, center * -1, this.imageEl.OriginWidth, this.imageEl.OriginHeight);
        
        this.canvasEl = document.createElement("canvas");
        
        this.contextEl = this.canvasEl.getContext("2d");
        
        switch (this.rotate) {
            case 0 :
                
                this.canvasEl.width = this.imageEl.OriginWidth * this.getScaleLevel();
                this.canvasEl.height = this.imageEl.OriginHeight * this.getScaleLevel();
                
                this.contextEl.drawImage(canvasEl, 0, 0, this.canvasEl.width, this.canvasEl.height, 0, 0, this.canvasEl.width, this.canvasEl.height);
                
                break;
            case 90 : 
                
                this.canvasEl.width = this.imageEl.OriginHeight * this.getScaleLevel();
                this.canvasEl.height = this.imageEl.OriginWidth * this.getScaleLevel();
                
                if(this.imageEl.OriginWidth > this.imageEl.OriginHeight){
                    this.contextEl.drawImage(canvasEl, Math.abs(this.canvasEl.width - this.canvasEl.height), 0, this.canvasEl.width, this.canvasEl.height, 0, 0, this.canvasEl.width, this.canvasEl.height);
                    break;
                }
                
                this.contextEl.drawImage(canvasEl, 0, 0, this.canvasEl.width, this.canvasEl.height, 0, 0, this.canvasEl.width, this.canvasEl.height);
                
                break;
            case 180 :
                
                this.canvasEl.width = this.imageEl.OriginWidth * this.getScaleLevel();
                this.canvasEl.height = this.imageEl.OriginHeight * this.getScaleLevel();
                
                if(this.imageEl.OriginWidth > this.imageEl.OriginHeight){
                    this.contextEl.drawImage(canvasEl, 0, Math.abs(this.canvasEl.width - this.canvasEl.height), this.canvasEl.width, this.canvasEl.height, 0, 0, this.canvasEl.width, this.canvasEl.height);
                    break;
                }
                
                this.contextEl.drawImage(canvasEl, Math.abs(this.canvasEl.width - this.canvasEl.height), 0, this.canvasEl.width, this.canvasEl.height, 0, 0, this.canvasEl.width, this.canvasEl.height);
                
                break;
            case 270 :
                
                this.canvasEl.width = this.imageEl.OriginHeight * this.getScaleLevel();
                this.canvasEl.height = this.imageEl.OriginWidth * this.getScaleLevel();
        
                if(this.imageEl.OriginWidth > this.imageEl.OriginHeight){
                    this.contextEl.drawImage(canvasEl, 0, 0, this.canvasEl.width, this.canvasEl.height, 0, 0, this.canvasEl.width, this.canvasEl.height);
                    break;
                }
                
                this.contextEl.drawImage(canvasEl, 0, Math.abs(this.canvasEl.width - this.canvasEl.height), this.canvasEl.width, this.canvasEl.height, 0, 0, this.canvasEl.width, this.canvasEl.height);
                
                break;
            default : 
                break;
        }
        
        this.previewEl.appendChild(this.canvasEl);
        
        this.setCanvasPosition();
    },
    
    crop : function()
    {
        var canvas = document.createElement("canvas");
        
        var context = canvas.getContext("2d");
        
        canvas.width = this.minWidth;
        canvas.height = this.minHeight;
        
        var cropWidth = this.thumbEl.getWidth();
        var cropHeight = this.thumbEl.getHeight();
        
        var x = this.thumbEl.getLeft(true) - this.previewEl.getLeft(true);
        var y = this.thumbEl.getTop(true) - this.previewEl.getTop(true);
        
        if(this.canvasEl.width - cropWidth < x){
            x = this.canvasEl.width - cropWidth;
        }
        
        if(this.canvasEl.height - cropHeight < y){
            y = this.canvasEl.height - cropHeight;
        }
        
        x = x < 0 ? 0 : x;
        y = y < 0 ? 0 : y;
        
        context.drawImage(this.canvasEl, x, y, cropWidth, cropHeight, 0, 0, canvas.width, canvas.height);
        
        this.cropData = canvas.toDataURL(this.cropType);
        
        this.fireEvent('crop', this, this.cropData);
        
    },
    
    setThumbBoxSize : function()
    {
        var height = 300;
        var width = Math.ceil(this.minWidth * height / this.minHeight);
        
        if(this.minWidth > this.minHeight){
            width = 300;
            height = Math.ceil(this.minHeight * width / this.minWidth);
        }
        
        this.thumbEl.setStyle({
            width : width + 'px',
            height : height + 'px'
        });

        return;
            
    },
    
    setThumbBoxPosition : function()
    {
        var x = Math.ceil((this.bodyEl.getWidth() - this.thumbEl.getWidth()) / 2 );
        var y = Math.ceil((this.bodyEl.getHeight() - this.thumbEl.getHeight()) / 2);
        
        this.thumbEl.setLeft(x);
        this.thumbEl.setTop(y);
        
    },
    
    baseRotateLevel : function()
    {
        this.baseRotate = 1;
        
        if(
                typeof(this.exif) != 'undefined' &&
                typeof(this.exif[Roo.bootstrap.UploadCropbox['tags']['Orientation']]) != 'undefined' &&
                [1, 3, 6, 8].indexOf(this.exif[Roo.bootstrap.UploadCropbox['tags']['Orientation']]) != -1
        ){
            this.baseRotate = this.exif[Roo.bootstrap.UploadCropbox['tags']['Orientation']];
        }
        
        this.rotate = Roo.bootstrap.UploadCropbox['Orientation'][this.baseRotate];
        
    },
    
    baseScaleLevel : function()
    {
        var width, height;
        
        if(this.baseRotate == 6 || this.baseRotate == 8){
            
            width = this.thumbEl.getHeight();
            this.baseScale = height / this.imageEl.OriginHeight;
            
            if(this.imageEl.OriginHeight * this.baseScale < this.thumbEl.getWidth()){
                height = this.thumbEl.getWidth();
                this.baseScale = height / this.imageEl.OriginHeight;
            }
            
            if(this.imageEl.OriginWidth > this.imageEl.OriginHeight){
                height = this.thumbEl.getWidth();
                this.baseScale = height / this.imageEl.OriginHeight;
                
                if(this.imageEl.OriginWidth * this.baseScale < this.thumbEl.getHeight()){
                    width = this.thumbEl.getHeight();
                    this.baseScale = width / this.imageEl.OriginWidth;
                }
            }
            
            return;
        }
        
        width = this.thumbEl.getWidth();
        this.baseScale = width / this.imageEl.OriginWidth;
        
        if(this.imageEl.OriginHeight * this.baseScale < this.thumbEl.getHeight()){
            height = this.thumbEl.getHeight();
            this.baseScale = height / this.imageEl.OriginHeight;
        }
        
        
        if(this.imageEl.OriginWidth > this.imageEl.OriginHeight){
            
            height = this.thumbEl.getHeight();
            this.baseScale = height / this.imageEl.OriginHeight;
            
            if(this.imageEl.OriginWidth * this.baseScale < this.thumbEl.getWidth()){
                width = this.thumbEl.getWidth();
                this.baseScale = width / this.imageEl.OriginWidth;
            }
            
        }
        
        return;
    },
    
    getScaleLevel : function()
    {
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
        
        this.startDistance = Math.sqrt(x + y);
        
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
        
        this.endDistance = Math.sqrt(x + y);
        
        var scale = this.startScale + Math.floor(Math.log(this.endDistance / this.startDistance) / Math.log(1.1));
        
        var width = Math.ceil(this.imageEl.OriginWidth * this.baseScale * Math.pow(1.1, scale));
        var height = Math.ceil(this.imageEl.OriginHeight * this.baseScale * Math.pow(1.1, scale));
        
        if(
                this.endDistance / this.startDistance < 1 &&
                (
                    (
                        (this.rotate == 0 || this.rotate == 180) && (width < this.thumbEl.getWidth() || height < this.thumbEl.getHeight())
                    )
                    ||
                    (
                        (this.rotate == 90 || this.rotate == 270) && (height < this.thumbEl.getWidth() || width < this.thumbEl.getHeight())
                    )
                )
        ){
            return;
        }
        
        this.scale = scale;
        
        this.draw();
        
    },
    
    onTouchEnd : function(e)
    {
        e.stopEvent();
        
        this.pinching = false;
        this.dragable = false;
        
    },
    
    prepare : function(input)
    {        
        this.file = false;
        this.exif = {};
        
        if(typeof(input) === 'string'){
            this.loadCanvas(input);
            return;
        }
        
        if(!input.files || !input.files[0] || !this.urlAPI){
            return;
        }
        
        this.file = input.files[0];
        this.cropType = this.file.type;
        
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
                
                var url = _this.urlAPI.createObjectURL(_this.file);
                
                _this.loadCanvas(url);
                
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
            Roo.log('Invalid Exif data: Invalid directory offset.');
            return;
        }
        tagsNumber = dataView.getUint16(dirOffset, littleEndian);
        dirEndOffset = dirOffset + 2 + 12 * tagsNumber;
        if (dirEndOffset + 4 > dataView.byteLength) {
            Roo.log('Invalid Exif data: Invalid directory size.');
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
            1: 0, //'top-left',
//            2: 'top-right',
            3: 180, //'bottom-right',
//            4: 'bottom-left',
//            5: 'left-top',
            6: 90, //'right-top',
//            7: 'right-bottom',
            8: 270 //'left-bottom'
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
    },
    
    footer : {
        STANDARD : [
            {
                tag : 'div',
                cls : 'btn-group roo-upload-cropbox-rotate-left',
                action : 'rotate-left',
                cn : [
                    {
                        tag : 'button',
                        cls : 'btn btn-default',
                        html : '<i class="fa fa-undo"></i>'
                    }
                ]
            },
            {
                tag : 'div',
                cls : 'btn-group roo-upload-cropbox-picture',
                action : 'picture',
                cn : [
                    {
                        tag : 'button',
                        cls : 'btn btn-default',
                        html : '<i class="fa fa-picture-o"></i>'
                    }
                ]
            },
            {
                tag : 'div',
                cls : 'btn-group roo-upload-cropbox-rotate-right',
                action : 'rotate-right',
                cn : [
                    {
                        tag : 'button',
                        cls : 'btn btn-default',
                        html : '<i class="fa fa-repeat"></i>'
                    }
                ]
            }
        ],
        DOCUMENT : [
            {
                tag : 'div',
                cls : 'btn-group roo-upload-cropbox-rotate-left',
                action : 'rotate-left',
                cn : [
                    {
                        tag : 'button',
                        cls : 'btn btn-default',
                        html : '<i class="fa fa-undo"></i>'
                    }
                ]
            },
            {
                tag : 'div',
                cls : 'btn-group roo-upload-cropbox-trash',
                action : 'trash',
                cn : [
                    {
                        tag : 'button',
                        cls : 'btn btn-default',
                        html : '<i class="fa fa-trash"></i>'
                    }
                ]
            },
            {
                tag : 'div',
                cls : 'btn-group roo-upload-cropbox-save',
                action : 'save',
                cn : [
                    {
                        tag : 'button',
                        cls : 'btn btn-default',
                        html : '<i class="fa fa-floppy-o"></i>'
                    }
                ]
            },
            {
                tag : 'div',
                cls : 'btn-group roo-upload-cropbox-rotate-right',
                action : 'rotate-right',
                cn : [
                    {
                        tag : 'button',
                        cls : 'btn btn-default',
                        html : '<i class="fa fa-repeat"></i>'
                    }
                ]
            }
        ]
    }
});
