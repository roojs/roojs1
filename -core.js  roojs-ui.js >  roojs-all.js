[1mdiff --git a/Roo/ContentPanel.js b/Roo/ContentPanel.js[m
[1mindex 0984532b54..cc1b9d0ce5 100644[m
[1m--- a/Roo/ContentPanel.js[m
[1m+++ b/Roo/ContentPanel.js[m
[36m@@ -41,7 +41,6 @@[m
  */[m
 Roo.ContentPanel = function(el, config, content){[m
     [m
[31m-     [m
     /*[m
     if(el.autoCreate || el.xtype){ // xtype is available if this is called from factory[m
         config = el;[m
[36m@@ -425,6 +424,14 @@[m [mlayout.addxtype({[m
      */[m
     [m
     addxtype : function(cfg) {[m
[32m+[m[32m        if(cfg.xtype.match(/^UploadCropbox$/)) {[m
[32m+[m
[32m+[m[32m            this.cropbox = new Roo.factory(cfg);[m
[32m+[m
[32m+[m[32m            this.cropbox.render(this.el);[m
[32m+[m
[32m+[m[32m            return this.cropbox;[m
[32m+[m[32m        }[m
         // add form..[m
         if (cfg.xtype.match(/^Form$/)) {[m
             [m
[1mdiff --git a/Roo/dialog/UploadCropbox.js b/Roo/dialog/UploadCropbox.js[m
[1mnew file mode 100644[m
[1mindex 0000000000..8cf986b2e5[m
[1m--- /dev/null[m
[1m+++ b/Roo/dialog/UploadCropbox.js[m
[36m@@ -0,0 +1,1791 @@[m
[32m+[m
[32m+[m[32m/*[m
[32m+[m[32m* Licence: LGPL[m
[32m+[m[32m*/[m
[32m+[m
[32m+[m[32m/**[m
[32m+[m[32m * @class Roo.dialog.UploadCropbox[m
[32m+[m[32m * @extends Roo.BoxComponent[m
[32m+[m[32m * Dialog UploadCropbox class[m
[32m+[m[32m * @cfg {String} emptyText show when image has been loaded[m
[32m+[m[32m * @cfg {String} rotateNotify show when image too small to rotate[m
[32m+[m[32m * @cfg {Number} errorTimeout default 3000[m
[32m+[m[32m * @cfg {Number} minWidth default 300[m
[32m+[m[32m * @cfg {Number} minHeight default 300[m
[32m+[m[32m * @cfg {Array} buttons default ['rotateLeft', 'pictureBtn', 'rotateRight'][m
[32m+[m[32m * @cfg {Boolean} isDocument (true|false) default false[m
[32m+[m[32m * @cfg {String} url action url[m
[32m+[m[32m * @cfg {String} paramName default 'imageUpload'[m
[32m+[m[32m * @cfg {String} method default POST[m
[32m+[m[32m * @cfg {Boolean} loadMask (true|false) default true[m
[32m+[m[32m * @cfg {Boolean} loadingText default 'Loading...'[m
[32m+[m[32m *[m[41m [m
[32m+[m[32m * @constructor[m
[32m+[m[32m * Create a new UploadCropbox[m
[32m+[m[32m * @param {Object} config The config object[m
[32m+[m[32m */[m
[32m+[m
[32m+[m[32m Roo.dialog.UploadCropbox = function(config){[m
[32m+[m[32m    Roo.dialog.UploadCropbox.superclass.constructor.call(this, config);[m
[32m+[m[41m    [m
[32m+[m[32m    this.addEvents({[m
[32m+[m[32m        /**[m
[32m+[m[32m         * @event beforeselectfile[m
[32m+[m[32m         * Fire before select file[m
[32m+[m[32m         * @param {Roo.dialog.UploadCropbox} this[m
[32m+[m[32m         */[m
[32m+[m[32m        "beforeselectfile" : true,[m
[32m+[m[32m        /**[m
[32m+[m[32m         * @event initial[m
[32m+[m[32m         * Fire after initEvent[m
[32m+[m[32m         * @param {Roo.dialog.UploadCropbox} this[m
[32m+[m[32m         */[m
[32m+[m[32m        "initial" : true,[m
[32m+[m[32m        /**[m
[32m+[m[32m         * @event crop[m
[32m+[m[32m         * Fire after initEvent[m
[32m+[m[32m         * @param {Roo.dialog.UploadCropbox} this[m
[32m+[m[32m         * @param {String} data[m
[32m+[m[32m         */[m
[32m+[m[32m        "crop" : true,[m
[32m+[m[32m        /**[m
[32m+[m[32m         * @event prepare[m
[32m+[m[32m         * Fire when preparing the file data[m
[32m+[m[32m         * @param {Roo.dialog.UploadCropbox} this[m
[32m+[m[32m         * @param {Object} file[m
[32m+[m[32m         */[m
[32m+[m[32m        "prepare" : true,[m
[32m+[m[32m        /**[m
[32m+[m[32m         * @event exception[m
[32m+[m[32m         * Fire when get exception[m
[32m+[m[32m         * @param {Roo.dialog.UploadCropbox} this[m
[32m+[m[32m         * @param {XMLHttpRequest} xhr[m
[32m+[m[32m         */[m
[32m+[m[32m        "exception" : true,[m
[32m+[m[32m        /**[m
[32m+[m[32m         * @event beforeloadcanvas[m
[32m+[m[32m         * Fire before load the canvas[m
[32m+[m[32m         * @param {Roo.dialog.UploadCropbox} this[m
[32m+[m[32m         * @param {String} src[m
[32m+[m[32m         */[m
[32m+[m[32m        "beforeloadcanvas" : true,[m
[32m+[m[32m        /**[m
[32m+[m[32m         * @event trash[m
[32m+[m[32m         * Fire when trash image[m
[32m+[m[32m         * @param {Roo.dialog.UploadCropbox} this[m
[32m+[m[32m         */[m
[32m+[m[32m        "trash" : true,[m
[32m+[m[32m        /**[m
[32m+[m[32m         * @event download[m
[32m+[m[32m         * Fire when download the image[m
[32m+[m[32m         * @param {Roo.dialog.UploadCropbox} this[m
[32m+[m[32m         */[m
[32m+[m[32m        "download" : true,[m
[32m+[m[32m        /**[m
[32m+[m[32m         * @event footerbuttonclick[m
[32m+[m[32m         * Fire when footerbuttonclick[m
[32m+[m[32m         * @param {Roo.dialog.UploadCropbox} this[m
[32m+[m[32m         * @param {String} type[m
[32m+[m[32m         */[m
[32m+[m[32m        "footerbuttonclick" : true,[m
[32m+[m[32m        /**[m
[32m+[m[32m         * @event resize[m
[32m+[m[32m         * Fire when resize[m
[32m+[m[32m         * @param {Roo.dialog.UploadCropbox} this[m
[32m+[m[32m         */[m
[32m+[m[32m        "resize" : true,[m
[32m+[m[32m        /**[m
[32m+[m[32m         * @event rotate[m
[32m+[m[32m         * Fire when rotate the image[m
[32m+[m[32m         * @param {Roo.dialog.UploadCropbox} this[m
[32m+[m[32m         * @param {String} pos[m
[32m+[m[32m         */[m
[32m+[m[32m        "rotate" : true,[m
[32m+[m[32m        /**[m
[32m+[m[32m         * @event inspect[m
[32m+[m[32m         * Fire when inspect the file[m
[32m+[m[32m         * @param {Roo.dialog.UploadCropbox} this[m
[32m+[m[32m         * @param {Object} file[m
[32m+[m[32m         */[m
[32m+[m[32m        "inspect" : true,[m
[32m+[m[32m        /**[m
[32m+[m[32m         * @event upload[m
[32m+[m[32m         * Fire when xhr upload the file[m
[32m+[m[32m         * @param {Roo.dialog.UploadCropbox} this[m
[32m+[m[32m         * @param {Object} data[m
[32m+[m[32m         */[m
[32m+[m[32m        "upload" : true,[m
[32m+[m[32m        /**[m
[32m+[m[32m         * @event arrange[m
[32m+[m[32m         * Fire when arrange the file data[m
[32m+[m[32m         * @param {Roo.dialog.UploadCropbox} this[m
[32m+[m[32m         * @param {Object} formData[m
[32m+[m[32m         */[m
[32m+[m[32m        "arrange" : true,[m
[32m+[m[32m        /**[m
[32m+[m[32m         * @event loadcanvas[m
[32m+[m[32m         * Fire after load the canvas[m
[32m+[m[32m         * @param {Roo.dialog.UploadCropbox}[m
[32m+[m[32m         * @param {Object} imgEl[m
[32m+[m[32m         */[m
[32m+[m[32m        "loadcanvas" : true[m
[32m+[m[32m    });[m
[32m+[m[41m    [m
[32m+[m[32m    this.buttons = this.buttons || Roo.dialog.UploadCropbox.footer.STANDARD;[m
[32m+[m[32m};[m
[32m+[m
[32m+[m[32mRoo.extend(Roo.dialog.UploadCropbox, Roo.Component,  {[m
[32m+[m[41m    [m
[32m+[m[32m    emptyText : 'Click to upload image',[m
[32m+[m[32m    rotateNotify : 'Image is too small to rotate',[m
[32m+[m[32m    errorTimeout : 3000,[m
[32m+[m[32m    scale : 0,[m
[32m+[m[32m    baseScale : 1,[m
[32m+[m[32m    rotate : 0,[m
[32m+[m[32m    dragable : false,[m
[32m+[m[32m    pinching : false,[m
[32m+[m[32m    mouseX : 0,[m
[32m+[m[32m    mouseY : 0,[m
[32m+[m[32m    cropData : false,[m
[32m+[m[32m    minWidth : 300,[m
[32m+[m[32m    minHeight : 300,[m
[32m+[m[32m    file : false,[m
[32m+[m[32m    exif : {},[m
[32m+[m[32m    baseRotate : 1,[m
[32m+[m[32m    cropType : 'image/jpeg',[m
[32m+[m[32m    buttons : false,[m
[32m+[m[32m    canvasLoaded : false,[m
[32m+[m[32m    isDocument : false,[m
[32m+[m[32m    method : 'POST',[m
[32m+[m[32m    paramName : 'imageUpload',[m
[32m+[m[32m    loadMask : true,[m
[32m+[m[32m    loadingText : 'Loading...',[m
[32m+[m[32m    maskEl : false,[m
[32m+[m[41m    [m
[32m+[m[32m    getAutoCreate : function()[m
[32m+[m[32m    {[m
[32m+[m[32m        var cfg = {[m
[32m+[m[32m            tag : 'div',[m
[32m+[m[32m            cls : 'roo-upload-cropbox',[m
[32m+[m[32m            cn : [[m
[32m+[m[32m                {[m
[32m+[m[32m                    tag : 'input',[m
[32m+[m[32m                    cls : 'roo-upload-cropbox-selector',[m
[32m+[m[32m                    type : 'file'[m
[32m+[m[32m                },[m
[32m+[m[32m                {[m
[32m+[m[32m                    tag : 'div',[m
[32m+[m[32m                    cls : 'roo-upload-cropbox-body',[m
[32m+[m[32m                    style : 'cursor:pointer',[m
[32m+[m[32m                    cn : [[m
[32m+[m[32m                        {[m
[32m+[m[32m                            tag : 'div',[m
[32m+[m[32m                            cls : 'roo-upload-cropbox-preview'[m
[32m+[m[32m                        },[m
[32m+[m[32m                        {[m
[32m+[m[32m                            tag : 'div',[m
[32m+[m[32m                            cls : 'roo-upload-cropbox-thumb'[m
[32m+[m[32m                        },[m
[32m+[m[32m                        {[m
[32m+[m[32m                            tag : 'div',[m
[32m+[m[32m                            cls : 'roo-upload-cropbox-empty-notify',[m
[32m+[m[32m                            html : this.emptyText[m
[32m+[m[32m                        },[m
[32m+[m[32m                        {[m
[32m+[m[32m                            tag : 'div',[m
[32m+[m[32m                            cls : 'roo-upload-cropbox-error-notify alert alert-danger',[m
[32m+[m[32m                            html : this.rotateNotify[m
[32m+[m[32m                        }[m
[32m+[m[32m                    ][m
[32m+[m[32m                },[m
[32m+[m[32m                {[m
[32m+[m[32m                    tag : 'div',[m
[32m+[m[32m                    cls : 'roo-upload-cropbox-footer',[m
[32m+[m[32m                    cn : {[m
[32m+[m[32m                        tag : 'div',[m
[32m+[m[32m                        cls : 'btn-group btn-group-justified roo-upload-cropbox-btn-group',[m
[32m+[m[32m                        cn : [][m
[32m+[m[32m                    }[m
[32m+[m[32m                }[m
[32m+[m[32m            ][m
[32m+[m[32m        };[m
[32m+[m[41m        [m
[32m+[m[32m        return cfg;[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    onRender : function(ct, position)[m
[32m+[m[32m    {[m
[32m+[m[32m        console.log("On Render");[m
[32m+[m[32m        console.log(this);[m
[32m+[m[32m        Roo.dialog.UploadCropbox.superclass.onRender.call(this, ct, position);[m
[32m+[m
[32m+[m[32m        if(this.el){[m
[32m+[m[32m            if (this.el.attr('xtype')) {[m
[32m+[m[32m                this.el.attr('xtypex', this.el.attr('xtype'));[m
[32m+[m[32m                this.el.dom.removeAttribute('xtype');[m
[32m+[m[41m                [m
[32m+[m[32m                this.initEvents();[m
[32m+[m[32m            }[m
[32m+[m[32m        }[m
[32m+[m[32m        else {[m
[32m+[m[32m            var cfg = Roo.apply({},  this.getAutoCreate());[m
[32m+[m[41m        [m
[32m+[m[32m            cfg.id = this.id || Roo.id();[m
[32m+[m[41m            [m
[32m+[m[32m            if (this.cls) {[m
[32m+[m[32m                cfg.cls = (typeof(cfg.cls) == 'undefined' ? this.cls : cfg.cls) + ' ' + this.cls;[m
[32m+[m[32m            }[m
[32m+[m[41m            [m
[32m+[m[32m            if (this.style) { // fixme needs to support more complex style data.[m
[32m+[m[32m                cfg.style = (typeof(cfg.style) == 'undefined' ? this.style : cfg.style) + '; ' + this.style;[m
[32m+[m[32m            }[m
[32m+[m[41m            [m
[32m+[m[32m            this.el = ct.createChild(cfg, position);[m
[32m+[m[41m            [m
[32m+[m[32m            this.initEvents();[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if (this.buttons.length) {[m
[32m+[m[41m            [m
[32m+[m[32m            Roo.each(this.buttons, function(bb) {[m
[32m+[m[41m                [m
[32m+[m[32m                var btn = this.el.select('.roo-upload-cropbox-footer div.roo-upload-cropbox-btn-group').first().createChild(bb);[m
[32m+[m[41m                [m
[32m+[m[32m                btn.on('click', this.onFooterButtonClick.createDelegate(this, [bb.action], true));[m
[32m+[m[41m                [m
[32m+[m[32m            }, this);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.loadMask){[m
[32m+[m[32m            this.maskEl = this.el;[m
[32m+[m[32m        }[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    initEvents : function()[m
[32m+[m[32m    {[m
[32m+[m[32m        this.urlAPI = (window.createObjectURL && window) ||[m[41m [m
[32m+[m[32m                                (window.URL && URL.revokeObjectURL && URL) ||[m[41m [m
[32m+[m[32m                                (window.webkitURL && webkitURL);[m
[32m+[m[41m                        [m
[32m+[m[32m        this.bodyEl = this.el.select('.roo-upload-cropbox-body', true).first();[m
[32m+[m[32m        this.bodyEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';[m
[32m+[m[41m        [m
[32m+[m[32m        this.selectorEl = this.el.select('.roo-upload-cropbox-selector', true).first();[m
[32m+[m[32m        this.selectorEl.hide();[m
[32m+[m[41m        [m
[32m+[m[32m        this.previewEl = this.el.select('.roo-upload-cropbox-preview', true).first();[m
[32m+[m[32m        this.previewEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';[m
[32m+[m[41m        [m
[32m+[m[32m        this.thumbEl = this.el.select('.roo-upload-cropbox-thumb', true).first();[m
[32m+[m[32m        this.thumbEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';[m
[32m+[m[32m        this.thumbEl.hide();[m
[32m+[m[41m        [m
[32m+[m[32m        this.notifyEl = this.el.select('.roo-upload-cropbox-empty-notify', true).first();[m
[32m+[m[32m        this.notifyEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';[m
[32m+[m[41m        [m
[32m+[m[32m        this.errorEl = this.el.select('.roo-upload-cropbox-error-notify', true).first();[m
[32m+[m[32m        this.errorEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';[m
[32m+[m[32m        this.errorEl.hide();[m
[32m+[m[41m        [m
[32m+[m[32m        this.footerEl = this.el.select('.roo-upload-cropbox-footer', true).first();[m
[32m+[m[32m        this.footerEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';[m
[32m+[m[32m        this.footerEl.hide();[m
[32m+[m[41m        [m
[32m+[m[32m        this.setThumbBoxSize();[m
[32m+[m[41m        [m
[32m+[m[32m        this.bind();[m
[32m+[m[41m        [m
[32m+[m[32m        this.resize();[m
[32m+[m[41m        [m
[32m+[m[32m        this.fireEvent('initial', this);[m
[32m+[m[32m    },[m
[32m+[m
[32m+[m[32m    bind : function()[m
[32m+[m[32m    {[m
[32m+[m[32m        var _this = this;[m
[32m+[m[41m        [m
[32m+[m[32m        window.addEventListener("resize", function() { _this.resize(); } );[m
[32m+[m[41m        [m
[32m+[m[32m        this.bodyEl.on('click', this.beforeSelectFile, this);[m
[32m+[m[41m        [m
[32m+[m[32m        if(Roo.isTouch){[m
[32m+[m[32m            this.bodyEl.on('touchstart', this.onTouchStart, this);[m
[32m+[m[32m            this.bodyEl.on('touchmove', this.onTouchMove, this);[m
[32m+[m[32m            this.bodyEl.on('touchend', this.onTouchEnd, this);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if(!Roo.isTouch){[m
[32m+[m[32m            this.bodyEl.on('mousedown', this.onMouseDown, this);[m
[32m+[m[32m            this.bodyEl.on('mousemove', this.onMouseMove, this);[m
[32m+[m[32m            var mousewheel = (/Firefox/i.test(navigator.userAgent))? 'DOMMouseScroll' : 'mousewheel';[m
[32m+[m[32m            this.bodyEl.on(mousewheel, this.onMouseWheel, this);[m
[32m+[m[32m            Roo.get(document).on('mouseup', this.onMouseUp, this);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.selectorEl.on('change', this.onFileSelected, this);[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    reset : function()[m
[32m+[m[32m    {[m[41m    [m
[32m+[m[32m        this.scale = 0;[m
[32m+[m[32m        this.baseScale = 1;[m
[32m+[m[32m        this.rotate = 0;[m
[32m+[m[32m        this.baseRotate = 1;[m
[32m+[m[32m        this.dragable = false;[m
[32m+[m[32m        this.pinching = false;[m
[32m+[m[32m        this.mouseX = 0;[m
[32m+[m[32m        this.mouseY = 0;[m
[32m+[m[32m        this.cropData = false;[m
[32m+[m[32m        this.notifyEl.dom.innerHTML = this.emptyText;[m
[32m+[m[41m        [m
[32m+[m[32m        // this.selectorEl.dom.value = '';[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    resize : function()[m
[32m+[m[32m    {[m
[32m+[m[32m        if(this.fireEvent('resize', this) != false){[m
[32m+[m[32m            this.setThumbBoxPosition();[m
[32m+[m[32m            this.setCanvasPosition();[m
[32m+[m[32m        }[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    onFooterButtonClick : function(e, el, o, type)[m
[32m+[m[32m    {[m
[32m+[m[32m        switch (type) {[m
[32m+[m[32m            case 'rotate-left' :[m
[32m+[m[32m                this.onRotateLeft(e);[m
[32m+[m[32m                break;[m
[32m+[m[32m            case 'rotate-right' :[m
[32m+[m[32m                this.onRotateRight(e);[m
[32m+[m[32m                break;[m
[32m+[m[32m            case 'picture' :[m
[32m+[m[32m                this.beforeSelectFile(e);[m
[32m+[m[32m                break;[m
[32m+[m[32m            case 'trash' :[m
[32m+[m[32m                this.trash(e);[m
[32m+[m[32m                break;[m
[32m+[m[32m            case 'crop' :[m
[32m+[m[32m                this.crop(e);[m
[32m+[m[32m                break;[m
[32m+[m[32m            case 'download' :[m
[32m+[m[32m                this.download(e);[m
[32m+[m[32m                break;[m
[32m+[m[32m            default :[m
[32m+[m[32m                break;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.fireEvent('footerbuttonclick', this, type);[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    beforeSelectFile : function(e)[m
[32m+[m[32m    {[m
[32m+[m[32m        e.preventDefault();[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.fireEvent('beforeselectfile', this) != false){[m
[32m+[m[32m            this.selectorEl.dom.click();[m
[32m+[m[32m        }[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    onFileSelected : function(e)[m
[32m+[m[32m    {[m
[32m+[m[32m        e.preventDefault();[m
[32m+[m[41m        [m
[32m+[m[32m        if(typeof(this.selectorEl.dom.files) == 'undefined' || !this.selectorEl.dom.files.length){[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        var file = this.selectorEl.dom.files[0];[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.fireEvent('inspect', this, file) != false){[m
[32m+[m[32m            this.prepare(file);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    trash : function(e)[m
[32m+[m[32m    {[m
[32m+[m[32m        this.fireEvent('trash', this);[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    download : function(e)[m
[32m+[m[32m    {[m
[32m+[m[32m        this.fireEvent('download', this);[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    loadCanvas : function(src)[m
[32m+[m[32m    {[m[41m   [m
[32m+[m[32m        if(this.fireEvent('beforeloadcanvas', this, src) != false){[m
[32m+[m[41m            [m
[32m+[m[32m            this.reset();[m
[32m+[m[41m            [m
[32m+[m[32m            this.imageEl = document.createElement('img');[m
[32m+[m[41m            [m
[32m+[m[32m            var _this = this;[m
[32m+[m[41m            [m
[32m+[m[32m            this.imageEl.addEventListener("load", function(){ _this.onLoadCanvas(); });[m
[32m+[m[41m            [m
[32m+[m[32m            this.imageEl.src = src;[m
[32m+[m[32m        }[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    onLoadCanvas : function()[m
[32m+[m[32m    {[m[41m   [m
[32m+[m[32m        this.imageEl.OriginWidth = this.imageEl.naturalWidth || this.imageEl.width;[m
[32m+[m[32m        this.imageEl.OriginHeight = this.imageEl.naturalHeight || this.imageEl.height;[m
[32m+[m
[32m+[m[32m        if(this.fireEvent('loadcanvas', this, this.imageEl) != false){[m
[32m+[m[41m        [m
[32m+[m[32m            this.bodyEl.un('click', this.beforeSelectFile, this);[m
[32m+[m[41m            [m
[32m+[m[32m            this.notifyEl.hide();[m
[32m+[m[32m            this.thumbEl.show();[m
[32m+[m[32m            this.footerEl.show();[m
[32m+[m[41m            [m
[32m+[m[32m            this.baseRotateLevel();[m
[32m+[m[41m            [m
[32m+[m[32m            if(this.isDocument){[m
[32m+[m[32m                this.setThumbBoxSize();[m
[32m+[m[32m            }[m
[32m+[m[41m            [m
[32m+[m[32m            this.setThumbBoxPosition();[m
[32m+[m[41m            [m
[32m+[m[32m            this.baseScaleLevel();[m
[32m+[m[41m            [m
[32m+[m[32m            this.draw();[m
[32m+[m[41m            [m
[32m+[m[32m            this.resize();[m
[32m+[m[41m            [m
[32m+[m[32m            this.canvasLoaded = true;[m
[32m+[m[41m        [m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.loadMask){[m
[32m+[m[32m            this.maskEl.unmask();[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    setCanvasPosition : function()[m
[32m+[m[32m    {[m[41m   [m
[32m+[m[32m        if(!this.canvasEl){[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        var pw = Math.ceil((this.bodyEl.getWidth() - this.canvasEl.width) / 2);[m
[32m+[m[32m        var ph = Math.ceil((this.bodyEl.getHeight() - this.canvasEl.height) / 2);[m
[32m+[m[41m        [m
[32m+[m[32m        this.previewEl.setLeft(pw);[m
[32m+[m[32m        this.previewEl.setTop(ph);[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    onMouseDown : function(e)[m
[32m+[m[32m    {[m[41m   [m
[32m+[m[32m        e.stopEvent();[m
[32m+[m[41m        [m
[32m+[m[32m        this.dragable = true;[m
[32m+[m[32m        this.pinching = false;[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.isDocument && (this.canvasEl.width < this.thumbEl.getWidth() || this.canvasEl.height < this.thumbEl.getHeight())){[m
[32m+[m[32m            this.dragable = false;[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.mouseX = Roo.isTouch ? e.browserEvent.touches[0].pageX : e.getPageX();[m
[32m+[m[32m        this.mouseY = Roo.isTouch ? e.browserEvent.touches[0].pageY : e.getPageY();[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    onMouseMove : function(e)[m
[32m+[m[32m    {[m[41m   [m
[32m+[m[32m        e.stopEvent();[m
[32m+[m[41m        [m
[32m+[m[32m        if(!this.canvasLoaded){[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if (!this.dragable){[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        var minX = Math.ceil(this.thumbEl.getLeft(true));[m
[32m+[m[32m        var minY = Math.ceil(this.thumbEl.getTop(true));[m
[32m+[m[41m        [m
[32m+[m[32m        var maxX = Math.ceil(minX + this.thumbEl.getWidth() - this.canvasEl.width);[m
[32m+[m[32m        var maxY = Math.ceil(minY + this.thumbEl.getHeight() - this.canvasEl.height);[m
[32m+[m[41m        [m
[32m+[m[32m        var x = Roo.isTouch ? e.browserEvent.touches[0].pageX : e.getPageX();[m
[32m+[m[32m        var y = Roo.isTouch ? e.browserEvent.touches[0].pageY : e.getPageY();[m
[32m+[m[41m        [m
[32m+[m[32m        x = x - this.mouseX;[m
[32m+[m[32m        y = y - this.mouseY;[m
[32m+[m[41m        [m
[32m+[m[32m        var bgX = Math.ceil(x + this.previewEl.getLeft(true));[m
[32m+[m[32m        var bgY = Math.ceil(y + this.previewEl.getTop(true));[m
[32m+[m[41m        [m
[32m+[m[32m        bgX = (minX < bgX) ? minX : ((maxX > bgX) ? maxX : bgX);[m
[32m+[m[32m        bgY = (minY < bgY) ? minY : ((maxY > bgY) ? maxY : bgY);[m
[32m+[m[41m        [m
[32m+[m[32m        this.previewEl.setLeft(bgX);[m
[32m+[m[32m        this.previewEl.setTop(bgY);[m
[32m+[m[41m        [m
[32m+[m[32m        this.mouseX = Roo.isTouch ? e.browserEvent.touches[0].pageX : e.getPageX();[m
[32m+[m[32m        this.mouseY = Roo.isTouch ? e.browserEvent.touches[0].pageY : e.getPageY();[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    onMouseUp : function(e)[m
[32m+[m[32m    {[m[41m   [m
[32m+[m[32m        e.stopEvent();[m
[32m+[m[41m        [m
[32m+[m[32m        this.dragable = false;[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    onMouseWheel : function(e)[m
[32m+[m[32m    {[m[41m   [m
[32m+[m[32m        e.stopEvent();[m
[32m+[m[41m        [m
[32m+[m[32m        this.startScale = this.scale;[m
[32m+[m[41m        [m
[32m+[m[32m        this.scale = (e.getWheelDelta() == 1) ? (this.scale + 1) : (this.scale - 1);[m
[32m+[m[41m        [m
[32m+[m[32m        if(!this.zoomable()){[m
[32m+[m[32m            this.scale = this.startScale;[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.draw();[m
[32m+[m[41m        [m
[32m+[m[32m        return;[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    zoomable : function()[m
[32m+[m[32m    {[m
[32m+[m[32m        var minScale = this.thumbEl.getWidth() / this.minWidth;[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.minWidth < this.minHeight){[m
[32m+[m[32m            minScale = this.thumbEl.getHeight() / this.minHeight;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        var width = Math.ceil(this.imageEl.OriginWidth * this.getScaleLevel() / minScale);[m
[32m+[m[32m        var height = Math.ceil(this.imageEl.OriginHeight * this.getScaleLevel() / minScale);[m
[32m+[m[41m        [m
[32m+[m[32m        if([m
[32m+[m[32m                this.isDocument &&[m
[32m+[m[32m                (this.rotate == 0 || this.rotate == 180) &&[m[41m [m
[32m+[m[32m                ([m
[32m+[m[32m                    width > this.imageEl.OriginWidth ||[m[41m [m
[32m+[m[32m                    height > this.imageEl.OriginHeight ||[m
[32m+[m[32m                    (width < this.minWidth && height < this.minHeight)[m
[32m+[m[32m                )[m
[32m+[m[32m        ){[m
[32m+[m[32m            return false;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if([m
[32m+[m[32m                this.isDocument &&[m
[32m+[m[32m                (this.rotate == 90 || this.rotate == 270) &&[m[41m [m
[32m+[m[32m                ([m
[32m+[m[32m                    width > this.imageEl.OriginWidth ||[m[41m [m
[32m+[m[32m                    height > this.imageEl.OriginHeight ||[m
[32m+[m[32m                    (width < this.minHeight && height < this.minWidth)[m
[32m+[m[32m                )[m
[32m+[m[32m        ){[m
[32m+[m[32m            return false;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if([m
[32m+[m[32m                !this.isDocument &&[m
[32m+[m[32m                (this.rotate == 0 || this.rotate == 180) &&[m[41m [m
[32m+[m[32m                ([m
[32m+[m[32m                    width < this.minWidth ||[m[41m [m
[32m+[m[32m                    width > this.imageEl.OriginWidth ||[m[41m [m
[32m+[m[32m                    height < this.minHeight ||[m[41m [m
[32m+[m[32m                    height > this.imageEl.OriginHeight[m
[32m+[m[32m                )[m
[32m+[m[32m        ){[m
[32m+[m[32m            return false;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if([m
[32m+[m[32m                !this.isDocument &&[m
[32m+[m[32m                (this.rotate == 90 || this.rotate == 270) &&[m[41m [m
[32m+[m[32m                ([m
[32m+[m[32m                    width < this.minHeight ||[m[41m [m
[32m+[m[32m                    width > this.imageEl.OriginWidth ||[m[41m [m
[32m+[m[32m                    height < this.minWidth ||[m[41m [m
[32m+[m[32m                    height > this.imageEl.OriginHeight[m
[32m+[m[32m                )[m
[32m+[m[32m        ){[m
[32m+[m[32m            return false;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        return true;[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    onRotateLeft : function(e)[m
[32m+[m[32m    {[m[41m   [m
[32m+[m[32m        if(!this.isDocument && (this.canvasEl.height < this.thumbEl.getWidth() || this.canvasEl.width < this.thumbEl.getHeight())){[m
[32m+[m[41m            [m
[32m+[m[32m            var minScale = this.thumbEl.getWidth() / this.minWidth;[m
[32m+[m[41m            [m
[32m+[m[32m            var bw = Math.ceil(this.canvasEl.width / this.getScaleLevel());[m
[32m+[m[32m            var bh = Math.ceil(this.canvasEl.height / this.getScaleLevel());[m
[32m+[m[41m            [m
[32m+[m[32m            this.startScale = this.scale;[m
[32m+[m[41m            [m
[32m+[m[32m            while (this.getScaleLevel() < minScale){[m
[32m+[m[41m            [m
[32m+[m[32m                this.scale = this.scale + 1;[m
[32m+[m[41m                [m
[32m+[m[32m                if(!this.zoomable()){[m
[32m+[m[32m                    break;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                if([m
[32m+[m[32m                        Math.ceil(bw * this.getScaleLevel()) < this.thumbEl.getHeight() ||[m
[32m+[m[32m                        Math.ceil(bh * this.getScaleLevel()) < this.thumbEl.getWidth()[m
[32m+[m[32m                ){[m
[32m+[m[32m                    continue;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                this.rotate = (this.rotate < 90) ? 270 : this.rotate - 90;[m
[32m+[m
[32m+[m[32m                this.draw();[m
[32m+[m[41m                [m
[32m+[m[32m                return;[m
[32m+[m[32m            }[m
[32m+[m[41m            [m
[32m+[m[32m            this.scale = this.startScale;[m
[32m+[m[41m            [m
[32m+[m[32m            this.onRotateFail();[m
[32m+[m[41m            [m
[32m+[m[32m            return false;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.rotate = (this.rotate < 90) ? 270 : this.rotate - 90;[m
[32m+[m
[32m+[m[32m        if(this.isDocument){[m
[32m+[m[32m            this.setThumbBoxSize();[m
[32m+[m[32m            this.setThumbBoxPosition();[m
[32m+[m[32m            this.setCanvasPosition();[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.draw();[m
[32m+[m[41m        [m
[32m+[m[32m        this.fireEvent('rotate', this, 'left');[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    onRotateRight : function(e)[m
[32m+[m[32m    {[m
[32m+[m[32m        if(!this.isDocument && (this.canvasEl.height < this.thumbEl.getWidth() || this.canvasEl.width < this.thumbEl.getHeight())){[m
[32m+[m[41m            [m
[32m+[m[32m            var minScale = this.thumbEl.getWidth() / this.minWidth;[m
[32m+[m[41m        [m
[32m+[m[32m            var bw = Math.ceil(this.canvasEl.width / this.getScaleLevel());[m
[32m+[m[32m            var bh = Math.ceil(this.canvasEl.height / this.getScaleLevel());[m
[32m+[m[41m            [m
[32m+[m[32m            this.startScale = this.scale;[m
[32m+[m[41m            [m
[32m+[m[32m            while (this.getScaleLevel() < minScale){[m
[32m+[m[41m            [m
[32m+[m[32m                this.scale = this.scale + 1;[m
[32m+[m[41m                [m
[32m+[m[32m                if(!this.zoomable()){[m
[32m+[m[32m                    break;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                if([m
[32m+[m[32m                        Math.ceil(bw * this.getScaleLevel()) < this.thumbEl.getHeight() ||[m
[32m+[m[32m                        Math.ceil(bh * this.getScaleLevel()) < this.thumbEl.getWidth()[m
[32m+[m[32m                ){[m
[32m+[m[32m                    continue;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                this.rotate = (this.rotate > 180) ? 0 : this.rotate + 90;[m
[32m+[m
[32m+[m[32m                this.draw();[m
[32m+[m[41m                [m
[32m+[m[32m                return;[m
[32m+[m[32m            }[m
[32m+[m[41m            [m
[32m+[m[32m            this.scale = this.startScale;[m
[32m+[m[41m            [m
[32m+[m[32m            this.onRotateFail();[m
[32m+[m[41m            [m
[32m+[m[32m            return false;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.rotate = (this.rotate > 180) ? 0 : this.rotate + 90;[m
[32m+[m
[32m+[m[32m        if(this.isDocument){[m
[32m+[m[32m            this.setThumbBoxSize();[m
[32m+[m[32m            this.setThumbBoxPosition();[m
[32m+[m[32m            this.setCanvasPosition();[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.draw();[m
[32m+[m[41m        [m
[32m+[m[32m        this.fireEvent('rotate', this, 'right');[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    onRotateFail : function()[m
[32m+[m[32m    {[m
[32m+[m[32m        this.errorEl.show(true);[m
[32m+[m[41m        [m
[32m+[m[32m        var _this = this;[m
[32m+[m[41m        [m
[32m+[m[32m        (function() { _this.errorEl.hide(true); }).defer(this.errorTimeout);[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    draw : function()[m
[32m+[m[32m    {[m
[32m+[m[32m        this.previewEl.dom.innerHTML = '';[m
[32m+[m[41m        [m
[32m+[m[32m        var canvasEl = document.createElement("canvas");[m
[32m+[m[41m        [m
[32m+[m[32m        var contextEl = canvasEl.getContext("2d");[m
[32m+[m[41m        [m
[32m+[m[32m        canvasEl.width = this.imageEl.OriginWidth * this.getScaleLevel();[m
[32m+[m[32m        canvasEl.height = this.imageEl.OriginWidth * this.getScaleLevel();[m
[32m+[m[32m        var center = this.imageEl.OriginWidth / 2;[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.imageEl.OriginWidth < this.imageEl.OriginHeight){[m
[32m+[m[32m            canvasEl.width = this.imageEl.OriginHeight * this.getScaleLevel();[m
[32m+[m[32m            canvasEl.height = this.imageEl.OriginHeight * this.getScaleLevel();[m
[32m+[m[32m            center = this.imageEl.OriginHeight / 2;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        contextEl.scale(this.getScaleLevel(), this.getScaleLevel());[m
[32m+[m[41m        [m
[32m+[m[32m        contextEl.translate(center, center);[m
[32m+[m[32m        contextEl.rotate(this.rotate * Math.PI / 180);[m
[32m+[m
[32m+[m[32m        contextEl.drawImage(this.imageEl, 0, 0, this.imageEl.OriginWidth, this.imageEl.OriginHeight, center * -1, center * -1, this.imageEl.OriginWidth, this.imageEl.OriginHeight);[m
[32m+[m[41m        [m
[32m+[m[32m        this.canvasEl = document.createElement("canvas");[m
[32m+[m[41m        [m
[32m+[m[32m        this.contextEl = this.canvasEl.getContext("2d");[m
[32m+[m[41m        [m
[32m+[m[32m        switch (this.rotate) {[m
[32m+[m[32m            case 0 :[m
[32m+[m[41m                [m
[32m+[m[32m                this.canvasEl.width = this.imageEl.OriginWidth * this.getScaleLevel();[m
[32m+[m[32m                this.canvasEl.height = this.imageEl.OriginHeight * this.getScaleLevel();[m
[32m+[m[41m                [m
[32m+[m[32m                this.contextEl.drawImage(canvasEl, 0, 0, this.canvasEl.width, this.canvasEl.height, 0, 0, this.canvasEl.width, this.canvasEl.height);[m
[32m+[m[41m                [m
[32m+[m[32m                break;[m
[32m+[m[32m            case 90 :[m[41m [m
[32m+[m[41m                [m
[32m+[m[32m                this.canvasEl.width = this.imageEl.OriginHeight * this.getScaleLevel();[m
[32m+[m[32m                this.canvasEl.height = this.imageEl.OriginWidth * this.getScaleLevel();[m
[32m+[m[41m                [m
[32m+[m[32m                if(this.imageEl.OriginWidth > this.imageEl.OriginHeight){[m
[32m+[m[32m                    this.contextEl.drawImage(canvasEl, Math.abs(this.canvasEl.width - this.canvasEl.height), 0, this.canvasEl.width, this.canvasEl.height, 0, 0, this.canvasEl.width, this.canvasEl.height);[m
[32m+[m[32m                    break;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                this.contextEl.drawImage(canvasEl, 0, 0, this.canvasEl.width, this.canvasEl.height, 0, 0, this.canvasEl.width, this.canvasEl.height);[m
[32m+[m[41m                [m
[32m+[m[32m                break;[m
[32m+[m[32m            case 180 :[m
[32m+[m[41m                [m
[32m+[m[32m                this.canvasEl.width = this.imageEl.OriginWidth * this.getScaleLevel();[m
[32m+[m[32m                this.canvasEl.height = this.imageEl.OriginHeight * this.getScaleLevel();[m
[32m+[m[41m                [m
[32m+[m[32m                if(this.imageEl.OriginWidth > this.imageEl.OriginHeight){[m
[32m+[m[32m                    this.contextEl.drawImage(canvasEl, 0, Math.abs(this.canvasEl.width - this.canvasEl.height), this.canvasEl.width, this.canvasEl.height, 0, 0, this.canvasEl.width, this.canvasEl.height);[m
[32m+[m[32m                    break;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                this.contextEl.drawImage(canvasEl, Math.abs(this.canvasEl.width - this.canvasEl.height), 0, this.canvasEl.width, this.canvasEl.height, 0, 0, this.canvasEl.width, this.canvasEl.height);[m
[32m+[m[41m                [m
[32m+[m[32m                break;[m
[32m+[m[32m            case 270 :[m
[32m+[m[41m                [m
[32m+[m[32m                this.canvasEl.width = this.imageEl.OriginHeight * this.getScaleLevel();[m
[32m+[m[32m                this.canvasEl.height = this.imageEl.OriginWidth * this.getScaleLevel();[m
[32m+[m[41m        [m
[32m+[m[32m                if(this.imageEl.OriginWidth > this.imageEl.OriginHeight){[m
[32m+[m[32m                    this.contextEl.drawImage(canvasEl, 0, 0, this.canvasEl.width, this.canvasEl.height, 0, 0, this.canvasEl.width, this.canvasEl.height);[m
[32m+[m[32m                    break;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                this.contextEl.drawImage(canvasEl, 0, Math.abs(this.canvasEl.width - this.canvasEl.height), this.canvasEl.width, this.canvasEl.height, 0, 0, this.canvasEl.width, this.canvasEl.height);[m
[32m+[m[41m                [m
[32m+[m[32m                break;[m
[32m+[m[32m            default :[m[41m [m
[32m+[m[32m                break;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.previewEl.appendChild(this.canvasEl);[m
[32m+[m[41m        [m
[32m+[m[32m        this.setCanvasPosition();[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    crop : function()[m
[32m+[m[32m    {[m
[32m+[m[32m        if(!this.canvasLoaded){[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        var imageCanvas = document.createElement("canvas");[m
[32m+[m[41m        [m
[32m+[m[32m        var imageContext = imageCanvas.getContext("2d");[m
[32m+[m[41m        [m
[32m+[m[32m        imageCanvas.width = (this.imageEl.OriginWidth > this.imageEl.OriginHeight) ? this.imageEl.OriginWidth : this.imageEl.OriginHeight;[m
[32m+[m[32m        imageCanvas.height = (this.imageEl.OriginWidth > this.imageEl.OriginHeight) ? this.imageEl.OriginWidth : this.imageEl.OriginHeight;[m
[32m+[m[41m        [m
[32m+[m[32m        var center = imageCanvas.width / 2;[m
[32m+[m[41m        [m
[32m+[m[32m        imageContext.translate(center, center);[m
[32m+[m[41m        [m
[32m+[m[32m        imageContext.rotate(this.rotate * Math.PI / 180);[m
[32m+[m[41m        [m
[32m+[m[32m        imageContext.drawImage(this.imageEl, 0, 0, this.imageEl.OriginWidth, this.imageEl.OriginHeight, center * -1, center * -1, this.imageEl.OriginWidth, this.imageEl.OriginHeight);[m
[32m+[m[41m        [m
[32m+[m[32m        var canvas = document.createElement("canvas");[m
[32m+[m[41m        [m
[32m+[m[32m        var context = canvas.getContext("2d");[m
[32m+[m[41m                [m
[32m+[m[32m        canvas.width = this.minWidth;[m
[32m+[m[32m        canvas.height = this.minHeight;[m
[32m+[m
[32m+[m[32m        switch (this.rotate) {[m
[32m+[m[32m            case 0 :[m
[32m+[m[41m                [m
[32m+[m[32m                var width = (this.thumbEl.getWidth() / this.getScaleLevel() > this.imageEl.OriginWidth) ? this.imageEl.OriginWidth : (this.thumbEl.getWidth() / this.getScaleLevel());[m
[32m+[m[32m                var height = (this.thumbEl.getHeight() / this.getScaleLevel() > this.imageEl.OriginHeight) ? this.imageEl.OriginHeight : (this.thumbEl.getHeight() / this.getScaleLevel());[m
[32m+[m[41m                [m
[32m+[m[32m                var x = (this.thumbEl.getLeft(true) > this.previewEl.getLeft(true)) ? 0 : ((this.previewEl.getLeft(true) - this.thumbEl.getLeft(true)) / this.getScaleLevel());[m
[32m+[m[32m                var y = (this.thumbEl.getTop(true) > this.previewEl.getTop(true)) ? 0 : ((this.previewEl.getTop(true) - this.thumbEl.getTop(true)) / this.getScaleLevel());[m
[32m+[m[41m                [m
[32m+[m[32m                var targetWidth = this.minWidth - 2 * x;[m
[32m+[m[32m                var targetHeight = this.minHeight - 2 * y;[m
[32m+[m[41m                [m
[32m+[m[32m                var scale = 1;[m
[32m+[m[41m                [m
[32m+[m[32m                if((x == 0 && y == 0) || (x == 0 && y > 0)){[m
[32m+[m[32m                    scale = targetWidth / width;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                if(x > 0 && y == 0){[m
[32m+[m[32m                    scale = targetHeight / height;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                if(x > 0 && y > 0){[m
[32m+[m[32m                    scale = targetWidth / width;[m
[32m+[m[41m                    [m
[32m+[m[32m                    if(width < height){[m
[32m+[m[32m                        scale = targetHeight / height;[m
[32m+[m[32m                    }[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                context.scale(scale, scale);[m
[32m+[m[41m                [m
[32m+[m[32m                var sx = Math.min(this.canvasEl.width - this.thumbEl.getWidth(), this.thumbEl.getLeft(true) - this.previewEl.getLeft(true));[m
[32m+[m[32m                var sy = Math.min(this.canvasEl.height - this.thumbEl.getHeight(), this.thumbEl.getTop(true) - this.previewEl.getTop(true));[m
[32m+[m
[32m+[m[32m                sx = sx < 0 ? 0 : (sx / this.getScaleLevel());[m
[32m+[m[32m                sy = sy < 0 ? 0 : (sy / this.getScaleLevel());[m
[32m+[m
[32m+[m[32m                context.drawImage(imageCanvas, sx, sy, width, height, x, y, width, height);[m
[32m+[m[41m                [m
[32m+[m[32m                break;[m
[32m+[m[32m            case 90 :[m[41m [m
[32m+[m[41m                [m
[32m+[m[32m                var width = (this.thumbEl.getWidth() / this.getScaleLevel() > this.imageEl.OriginHeight) ? this.imageEl.OriginHeight : (this.thumbEl.getWidth() / this.getScaleLevel());[m
[32m+[m[32m                var height = (this.thumbEl.getHeight() / this.getScaleLevel() > this.imageEl.OriginWidth) ? this.imageEl.OriginWidth : (this.thumbEl.getHeight() / this.getScaleLevel());[m
[32m+[m[41m                [m
[32m+[m[32m                var x = (this.thumbEl.getLeft(true) > this.previewEl.getLeft(true)) ? 0 : ((this.previewEl.getLeft(true) - this.thumbEl.getLeft(true)) / this.getScaleLevel());[m
[32m+[m[32m                var y = (this.thumbEl.getTop(true) > this.previewEl.getTop(true)) ? 0 : ((this.previewEl.getTop(true) - this.thumbEl.getTop(true)) / this.getScaleLevel());[m
[32m+[m[41m                [m
[32m+[m[32m                var targetWidth = this.minWidth - 2 * x;[m
[32m+[m[32m                var targetHeight = this.minHeight - 2 * y;[m
[32m+[m[41m                [m
[32m+[m[32m                var scale = 1;[m
[32m+[m[41m                [m
[32m+[m[32m                if((x == 0 && y == 0) || (x == 0 && y > 0)){[m
[32m+[m[32m                    scale = targetWidth / width;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                if(x > 0 && y == 0){[m
[32m+[m[32m                    scale = targetHeight / height;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                if(x > 0 && y > 0){[m
[32m+[m[32m                    scale = targetWidth / width;[m
[32m+[m[41m                    [m
[32m+[m[32m                    if(width < height){[m
[32m+[m[32m                        scale = targetHeight / height;[m
[32m+[m[32m                    }[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                context.scale(scale, scale);[m
[32m+[m[41m                [m
[32m+[m[32m                var sx = Math.min(this.canvasEl.width - this.thumbEl.getWidth(), this.thumbEl.getLeft(true) - this.previewEl.getLeft(true));[m
[32m+[m[32m                var sy = Math.min(this.canvasEl.height - this.thumbEl.getHeight(), this.thumbEl.getTop(true) - this.previewEl.getTop(true));[m
[32m+[m
[32m+[m[32m                sx = sx < 0 ? 0 : (sx / this.getScaleLevel());[m
[32m+[m[32m                sy = sy < 0 ? 0 : (sy / this.getScaleLevel());[m
[32m+[m[41m                [m
[32m+[m[32m                sx += (this.imageEl.OriginWidth > this.imageEl.OriginHeight) ? Math.abs(this.imageEl.OriginWidth - this.imageEl.OriginHeight) : 0;[m
[32m+[m[41m                [m
[32m+[m[32m                context.drawImage(imageCanvas, sx, sy, width, height, x, y, width, height);[m
[32m+[m[41m                [m
[32m+[m[32m                break;[m
[32m+[m[32m            case 180 :[m
[32m+[m[41m                [m
[32m+[m[32m                var width = (this.thumbEl.getWidth() / this.getScaleLevel() > this.imageEl.OriginWidth) ? this.imageEl.OriginWidth : (this.thumbEl.getWidth() / this.getScaleLevel());[m
[32m+[m[32m                var height = (this.thumbEl.getHeight() / this.getScaleLevel() > this.imageEl.OriginHeight) ? this.imageEl.OriginHeight : (this.thumbEl.getHeight() / this.getScaleLevel());[m
[32m+[m[41m                [m
[32m+[m[32m                var x = (this.thumbEl.getLeft(true) > this.previewEl.getLeft(true)) ? 0 : ((this.previewEl.getLeft(true) - this.thumbEl.getLeft(true)) / this.getScaleLevel());[m
[32m+[m[32m                var y = (this.thumbEl.getTop(true) > this.previewEl.getTop(true)) ? 0 : ((this.previewEl.getTop(true) - this.thumbEl.getTop(true)) / this.getScaleLevel());[m
[32m+[m[41m                [m
[32m+[m[32m                var targetWidth = this.minWidth - 2 * x;[m
[32m+[m[32m                var targetHeight = this.minHeight - 2 * y;[m
[32m+[m[41m                [m
[32m+[m[32m                var scale = 1;[m
[32m+[m[41m                [m
[32m+[m[32m                if((x == 0 && y == 0) || (x == 0 && y > 0)){[m
[32m+[m[32m                    scale = targetWidth / width;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                if(x > 0 && y == 0){[m
[32m+[m[32m                    scale = targetHeight / height;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                if(x > 0 && y > 0){[m
[32m+[m[32m                    scale = targetWidth / width;[m
[32m+[m[41m                    [m
[32m+[m[32m                    if(width < height){[m
[32m+[m[32m                        scale = targetHeight / height;[m
[32m+[m[32m                    }[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                context.scale(scale, scale);[m
[32m+[m[41m                [m
[32m+[m[32m                var sx = Math.min(this.canvasEl.width - this.thumbEl.getWidth(), this.thumbEl.getLeft(true) - this.previewEl.getLeft(true));[m
[32m+[m[32m                var sy = Math.min(this.canvasEl.height - this.thumbEl.getHeight(), this.thumbEl.getTop(true) - this.previewEl.getTop(true));[m
[32m+[m
[32m+[m[32m                sx = sx < 0 ? 0 : (sx / this.getScaleLevel());[m
[32m+[m[32m                sy = sy < 0 ? 0 : (sy / this.getScaleLevel());[m
[32m+[m
[32m+[m[32m                sx += (this.imageEl.OriginWidth > this.imageEl.OriginHeight) ? 0 : Math.abs(this.imageEl.OriginWidth - this.imageEl.OriginHeight);[m
[32m+[m[32m                sy += (this.imageEl.OriginWidth > this.imageEl.OriginHeight) ? Math.abs(this.imageEl.OriginWidth - this.imageEl.OriginHeight) : 0;[m
[32m+[m[41m                [m
[32m+[m[32m                context.drawImage(imageCanvas, sx, sy, width, height, x, y, width, height);[m
[32m+[m[41m                [m
[32m+[m[32m                break;[m
[32m+[m[32m            case 270 :[m
[32m+[m[41m                [m
[32m+[m[32m                var width = (this.thumbEl.getWidth() / this.getScaleLevel() > this.imageEl.OriginHeight) ? this.imageEl.OriginHeight : (this.thumbEl.getWidth() / this.getScaleLevel());[m
[32m+[m[32m                var height = (this.thumbEl.getHeight() / this.getScaleLevel() > this.imageEl.OriginWidth) ? this.imageEl.OriginWidth : (this.thumbEl.getHeight() / this.getScaleLevel());[m
[32m+[m[41m                [m
[32m+[m[32m                var x = (this.thumbEl.getLeft(true) > this.previewEl.getLeft(true)) ? 0 : ((this.previewEl.getLeft(true) - this.thumbEl.getLeft(true)) / this.getScaleLevel());[m
[32m+[m[32m                var y = (this.thumbEl.getTop(true) > this.previewEl.getTop(true)) ? 0 : ((this.previewEl.getTop(true) - this.thumbEl.getTop(true)) / this.getScaleLevel());[m
[32m+[m[41m                [m
[32m+[m[32m                var targetWidth = this.minWidth - 2 * x;[m
[32m+[m[32m                var targetHeight = this.minHeight - 2 * y;[m
[32m+[m[41m                [m
[32m+[m[32m                var scale = 1;[m
[32m+[m[41m                [m
[32m+[m[32m                if((x == 0 && y == 0) || (x == 0 && y > 0)){[m
[32m+[m[32m                    scale = targetWidth / width;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                if(x > 0 && y == 0){[m
[32m+[m[32m                    scale = targetHeight / height;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                if(x > 0 && y > 0){[m
[32m+[m[32m                    scale = targetWidth / width;[m
[32m+[m[41m                    [m
[32m+[m[32m                    if(width < height){[m
[32m+[m[32m                        scale = targetHeight / height;[m
[32m+[m[32m                    }[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                context.scale(scale, scale);[m
[32m+[m[41m                [m
[32m+[m[32m                var sx = Math.min(this.canvasEl.width - this.thumbEl.getWidth(), this.thumbEl.getLeft(true) - this.previewEl.getLeft(true));[m
[32m+[m[32m                var sy = Math.min(this.canvasEl.height - this.thumbEl.getHeight(), this.thumbEl.getTop(true) - this.previewEl.getTop(true));[m
[32m+[m
[32m+[m[32m                sx = sx < 0 ? 0 : (sx / this.getScaleLevel());[m
[32m+[m[32m                sy = sy < 0 ? 0 : (sy / this.getScaleLevel());[m
[32m+[m[41m                [m
[32m+[m[32m                sy += (this.imageEl.OriginWidth > this.imageEl.OriginHeight) ? 0 : Math.abs(this.imageEl.OriginWidth - this.imageEl.OriginHeight);[m
[32m+[m[41m                [m
[32m+[m[32m                context.drawImage(imageCanvas, sx, sy, width, height, x, y, width, height);[m
[32m+[m[41m                [m
[32m+[m[32m                break;[m
[32m+[m[32m            default :[m[41m [m
[32m+[m[32m                break;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.cropData = canvas.toDataURL(this.cropType);[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.fireEvent('crop', this, this.cropData) !== false){[m
[32m+[m[32m            this.process(this.file, this.cropData);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        return;[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    setThumbBoxSize : function()[m
[32m+[m[32m    {[m
[32m+[m[32m        var width, height;[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.isDocument && typeof(this.imageEl) != 'undefined'){[m
[32m+[m[32m            width = (this.imageEl.OriginWidth > this.imageEl.OriginHeight) ? Math.max(this.minWidth, this.minHeight) : Math.min(this.minWidth, this.minHeight);[m
[32m+[m[32m            height = (this.imageEl.OriginWidth > this.imageEl.OriginHeight) ? Math.min(this.minWidth, this.minHeight) : Math.max(this.minWidth, this.minHeight);[m
[32m+[m[41m            [m
[32m+[m[32m            this.minWidth = width;[m
[32m+[m[32m            this.minHeight = height;[m
[32m+[m[41m            [m
[32m+[m[32m            if(this.rotate == 90 || this.rotate == 270){[m
[32m+[m[32m                this.minWidth = height;[m
[32m+[m[32m                this.minHeight = width;[m
[32m+[m[32m            }[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        height = 300;[m
[32m+[m[32m        width = Math.ceil(this.minWidth * height / this.minHeight);[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.minWidth > this.minHeight){[m
[32m+[m[32m            width = 300;[m
[32m+[m[32m            height = Math.ceil(this.minHeight * width / this.minWidth);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.thumbEl.setStyle({[m
[32m+[m[32m            width : width + 'px',[m
[32m+[m[32m            height : height + 'px'[m
[32m+[m[32m        });[m
[32m+[m
[32m+[m[32m        return;[m
[32m+[m[41m            [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    setThumbBoxPosition : function()[m
[32m+[m[32m    {[m
[32m+[m[32m        var x = Math.ceil((this.bodyEl.getWidth() - this.thumbEl.getWidth()) / 2 );[m
[32m+[m[32m        var y = Math.ceil((this.bodyEl.getHeight() - this.thumbEl.getHeight()) / 2);[m
[32m+[m[41m        [m
[32m+[m[32m        this.thumbEl.setLeft(x);[m
[32m+[m[32m        this.thumbEl.setTop(y);[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    baseRotateLevel : function()[m
[32m+[m[32m    {[m
[32m+[m[32m        this.baseRotate = 1;[m
[32m+[m[41m        [m
[32m+[m[32m        if([m
[32m+[m[32m                typeof(this.exif) != 'undefined' &&[m
[32m+[m[32m                typeof(this.exif[Roo.dialog.UploadCropbox['tags']['Orientation']]) != 'undefined' &&[m
[32m+[m[32m                [1, 3, 6, 8].indexOf(this.exif[Roo.dialog.UploadCropbox['tags']['Orientation']]) != -1[m
[32m+[m[32m        ){[m
[32m+[m[32m            this.baseRotate = this.exif[Roo.dialog.UploadCropbox['tags']['Orientation']];[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.rotate = Roo.dialog.UploadCropbox['Orientation'][this.baseRotate];[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    baseScaleLevel : function()[m
[32m+[m[32m    {[m
[32m+[m[32m        var width, height;[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.isDocument){[m
[32m+[m[41m            [m
[32m+[m[32m            if(this.baseRotate == 6 || this.baseRotate == 8){[m
[32m+[m[41m            [m
[32m+[m[32m                height = this.thumbEl.getHeight();[m
[32m+[m[32m                this.baseScale = height / this.imageEl.OriginWidth;[m
[32m+[m
[32m+[m[32m                if(this.imageEl.OriginHeight * this.baseScale > this.thumbEl.getWidth()){[m
[32m+[m[32m                    width = this.thumbEl.getWidth();[m
[32m+[m[32m                    this.baseScale = width / this.imageEl.OriginHeight;[m
[32m+[m[32m                }[m
[32m+[m
[32m+[m[32m                return;[m
[32m+[m[32m            }[m
[32m+[m
[32m+[m[32m            height = this.thumbEl.getHeight();[m
[32m+[m[32m            this.baseScale = height / this.imageEl.OriginHeight;[m
[32m+[m
[32m+[m[32m            if(this.imageEl.OriginWidth * this.baseScale > this.thumbEl.getWidth()){[m
[32m+[m[32m                width = this.thumbEl.getWidth();[m
[32m+[m[32m                this.baseScale = width / this.imageEl.OriginWidth;[m
[32m+[m[32m            }[m
[32m+[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.baseRotate == 6 || this.baseRotate == 8){[m
[32m+[m[41m            [m
[32m+[m[32m            width = this.thumbEl.getHeight();[m
[32m+[m[32m            this.baseScale = width / this.imageEl.OriginHeight;[m
[32m+[m[41m            [m
[32m+[m[32m            if(this.imageEl.OriginHeight * this.baseScale < this.thumbEl.getWidth()){[m
[32m+[m[32m                height = this.thumbEl.getWidth();[m
[32m+[m[32m                this.baseScale = height / this.imageEl.OriginHeight;[m
[32m+[m[32m            }[m
[32m+[m[41m            [m
[32m+[m[32m            if(this.imageEl.OriginWidth > this.imageEl.OriginHeight){[m
[32m+[m[32m                height = this.thumbEl.getWidth();[m
[32m+[m[32m                this.baseScale = height / this.imageEl.OriginHeight;[m
[32m+[m[41m                [m
[32m+[m[32m                if(this.imageEl.OriginWidth * this.baseScale < this.thumbEl.getHeight()){[m
[32m+[m[32m                    width = this.thumbEl.getHeight();[m
[32m+[m[32m                    this.baseScale = width / this.imageEl.OriginWidth;[m
[32m+[m[32m                }[m
[32m+[m[32m            }[m
[32m+[m[41m            [m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        width = this.thumbEl.getWidth();[m
[32m+[m[32m        this.baseScale = width / this.imageEl.OriginWidth;[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.imageEl.OriginHeight * this.baseScale < this.thumbEl.getHeight()){[m
[32m+[m[32m            height = this.thumbEl.getHeight();[m
[32m+[m[32m            this.baseScale = height / this.imageEl.OriginHeight;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.imageEl.OriginWidth > this.imageEl.OriginHeight){[m
[32m+[m[41m            [m
[32m+[m[32m            height = this.thumbEl.getHeight();[m
[32m+[m[32m            this.baseScale = height / this.imageEl.OriginHeight;[m
[32m+[m[41m            [m
[32m+[m[32m            if(this.imageEl.OriginWidth * this.baseScale < this.thumbEl.getWidth()){[m
[32m+[m[32m                width = this.thumbEl.getWidth();[m
[32m+[m[32m                this.baseScale = width / this.imageEl.OriginWidth;[m
[32m+[m[32m            }[m
[32m+[m[41m            [m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        return;[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    getScaleLevel : function()[m
[32m+[m[32m    {[m
[32m+[m[32m        return this.baseScale * Math.pow(1.1, this.scale);[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    onTouchStart : function(e)[m
[32m+[m[32m    {[m
[32m+[m[32m        if(!this.canvasLoaded){[m
[32m+[m[32m            this.beforeSelectFile(e);[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        var touches = e.browserEvent.touches;[m
[32m+[m[41m        [m
[32m+[m[32m        if(!touches){[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if(touches.length == 1){[m
[32m+[m[32m            this.onMouseDown(e);[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if(touches.length != 2){[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        var coords = [];[m
[32m+[m[41m        [m
[32m+[m[32m        for(var i = 0, finger; finger = touches[i]; i++){[m
[32m+[m[32m            coords.push(finger.pageX, finger.pageY);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        var x = Math.pow(coords[0] - coords[2], 2);[m
[32m+[m[32m        var y = Math.pow(coords[1] - coords[3], 2);[m
[32m+[m[41m        [m
[32m+[m[32m        this.startDistance = Math.sqrt(x + y);[m
[32m+[m[41m        [m
[32m+[m[32m        this.startScale = this.scale;[m
[32m+[m[41m        [m
[32m+[m[32m        this.pinching = true;[m
[32m+[m[32m        this.dragable = false;[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    onTouchMove : function(e)[m
[32m+[m[32m    {[m
[32m+[m[32m        if(!this.pinching && !this.dragable){[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        var touches = e.browserEvent.touches;[m
[32m+[m[41m        [m
[32m+[m[32m        if(!touches){[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.dragable){[m
[32m+[m[32m            this.onMouseMove(e);[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        var coords = [];[m
[32m+[m[41m        [m
[32m+[m[32m        for(var i = 0, finger; finger = touches[i]; i++){[m
[32m+[m[32m            coords.push(finger.pageX, finger.pageY);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        var x = Math.pow(coords[0] - coords[2], 2);[m
[32m+[m[32m        var y = Math.pow(coords[1] - coords[3], 2);[m
[32m+[m[41m        [m
[32m+[m[32m        this.endDistance = Math.sqrt(x + y);[m
[32m+[m[41m        [m
[32m+[m[32m        this.scale = this.startScale + Math.floor(Math.log(this.endDistance / this.startDistance) / Math.log(1.1));[m
[32m+[m[41m        [m
[32m+[m[32m        if(!this.zoomable()){[m
[32m+[m[32m            this.scale = this.startScale;[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.draw();[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    onTouchEnd : function(e)[m
[32m+[m[32m    {[m
[32m+[m[32m        this.pinching = false;[m
[32m+[m[32m        this.dragable = false;[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    process : function(file, crop)[m
[32m+[m[32m    {[m
[32m+[m[32m        if(this.loadMask){[m
[32m+[m[32m            this.maskEl.mask(this.loadingText);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.xhr = new XMLHttpRequest();[m
[32m+[m[41m        [m
[32m+[m[32m        file.xhr = this.xhr;[m
[32m+[m
[32m+[m[32m        this.xhr.open(this.method, this.url, true);[m
[32m+[m[41m        [m
[32m+[m[32m        var headers = {[m
[32m+[m[32m            "Accept": "application/json",[m
[32m+[m[32m            "Cache-Control": "no-cache",[m
[32m+[m[32m            "X-Requested-With": "XMLHttpRequest"[m
[32m+[m[32m        };[m
[32m+[m[41m        [m
[32m+[m[32m        for (var headerName in headers) {[m
[32m+[m[32m            var headerValue = headers[headerName];[m
[32m+[m[32m            if (headerValue) {[m
[32m+[m[32m                this.xhr.setRequestHeader(headerName, headerValue);[m
[32m+[m[32m            }[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        var _this = this;[m
[32m+[m[41m        [m
[32m+[m[32m        this.xhr.onload = function()[m
[32m+[m[32m        {[m
[32m+[m[32m            _this.xhrOnLoad(_this.xhr);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.xhr.onerror = function()[m
[32m+[m[32m        {[m
[32m+[m[32m            _this.xhrOnError(_this.xhr);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        var formData = new FormData();[m
[32m+[m
[32m+[m[32m        formData.append('returnHTML', 'NO');[m
[32m+[m[41m        [m
[32m+[m[32m        if(crop){[m
[32m+[m[32m            formData.append('crop', crop);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if(typeof(file) != 'undefined' && (typeof(file.id) == 'undefined' || file.id * 1 < 1)){[m
[32m+[m[32m            formData.append(this.paramName, file, file.name);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if(typeof(file.filename) != 'undefined'){[m
[32m+[m[32m            formData.append('filename', file.filename);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if(typeof(file.mimetype) != 'undefined'){[m
[32m+[m[32m            formData.append('mimetype', file.mimetype);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.fireEvent('arrange', this, formData) != false){[m
[32m+[m[32m            this.xhr.send(formData);[m
[32m+[m[32m        };[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    xhrOnLoad : function(xhr)[m
[32m+[m[32m    {[m
[32m+[m[32m        if(this.loadMask){[m
[32m+[m[32m            this.maskEl.unmask();[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if (xhr.readyState !== 4) {[m
[32m+[m[32m            this.fireEvent('exception', this, xhr);[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m
[32m+[m[32m        var response = Roo.decode(xhr.responseText);[m
[32m+[m[41m        [m
[32m+[m[32m        if(!response.success){[m
[32m+[m[32m            this.fireEvent('exception', this, xhr);[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        var response = Roo.decode(xhr.responseText);[m
[32m+[m[41m        [m
[32m+[m[32m        this.fireEvent('upload', this, response);[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    xhrOnError : function()[m
[32m+[m[32m    {[m
[32m+[m[32m        if(this.loadMask){[m
[32m+[m[32m            this.maskEl.unmask();[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        Roo.log('xhr on error');[m
[32m+[m[41m        [m
[32m+[m[32m        var response = Roo.decode(xhr.responseText);[m
[32m+[m[41m          [m
[32m+[m[32m        Roo.log(response);[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    prepare : function(file)[m
[32m+[m[32m    {[m[41m   [m
[32m+[m[32m        if(this.loadMask){[m
[32m+[m[32m            this.maskEl.mask(this.loadingText);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.file = false;[m
[32m+[m[32m        this.exif = {};[m
[32m+[m[41m        [m
[32m+[m[32m        if(typeof(file) === 'string'){[m
[32m+[m[32m            this.loadCanvas(file);[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if(!file || !this.urlAPI){[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.file = file;[m
[32m+[m[32m        this.cropType = file.type;[m
[32m+[m[41m        [m
[32m+[m[32m        var _this = this;[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.fireEvent('prepare', this, this.file) != false){[m
[32m+[m[41m            [m
[32m+[m[32m            var reader = new FileReader();[m
[32m+[m[41m            [m
[32m+[m[32m            reader.onload = function (e) {[m
[32m+[m[32m                if (e.target.error) {[m
[32m+[m[32m                    Roo.log(e.target.error);[m
[32m+[m[32m                    return;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                var buffer = e.target.result,[m
[32m+[m[32m                    dataView = new DataView(buffer),[m
[32m+[m[32m                    offset = 2,[m
[32m+[m[32m                    maxOffset = dataView.byteLength - 4,[m
[32m+[m[32m                    markerBytes,[m
[32m+[m[32m                    markerLength;[m
[32m+[m[41m                [m
[32m+[m[32m                if (dataView.getUint16(0) === 0xffd8) {[m
[32m+[m[32m                    while (offset < maxOffset) {[m
[32m+[m[32m                        markerBytes = dataView.getUint16(offset);[m
[32m+[m[41m                        [m
[32m+[m[32m                        if ((markerBytes >= 0xffe0 && markerBytes <= 0xffef) || markerBytes === 0xfffe) {[m
[32m+[m[32m                            markerLength = dataView.getUint16(offset + 2) + 2;[m
[32m+[m[32m                            if (offset + markerLength > dataView.byteLength) {[m
[32m+[m[32m                                Roo.log('Invalid meta data: Invalid segment size.');[m
[32m+[m[32m                                break;[m
[32m+[m[32m                            }[m
[32m+[m[41m                            [m
[32m+[m[32m                            if(markerBytes == 0xffe1){[m
[32m+[m[32m                                _this.parseExifData([m
[32m+[m[32m                                    dataView,[m
[32m+[m[32m                                    offset,[m
[32m+[m[32m                                    markerLength[m
[32m+[m[32m                                );[m
[32m+[m[32m                            }[m
[32m+[m[41m                            [m
[32m+[m[32m                            offset += markerLength;[m
[32m+[m[41m                            [m
[32m+[m[32m                            continue;[m
[32m+[m[32m                        }[m
[32m+[m[41m                        [m
[32m+[m[32m                        break;[m
[32m+[m[32m                    }[m
[32m+[m[41m                    [m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                var url = _this.urlAPI.createObjectURL(_this.file);[m
[32m+[m[41m                [m
[32m+[m[32m                _this.loadCanvas(url);[m
[32m+[m[41m                [m
[32m+[m[32m                return;[m
[32m+[m[32m            }[m
[32m+[m[41m            [m
[32m+[m[32m            reader.readAsArrayBuffer(this.file);[m
[32m+[m[41m            [m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    parseExifData : function(dataView, offset, length)[m
[32m+[m[32m    {[m
[32m+[m[32m        var tiffOffset = offset + 10,[m
[32m+[m[32m            littleEndian,[m
[32m+[m[32m            dirOffset;[m
[32m+[m[41m    [m
[32m+[m[32m        if (dataView.getUint32(offset + 4) !== 0x45786966) {[m
[32m+[m[32m            // No Exif data, might be XMP data instead[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        // Check for the ASCII code for "Exif" (0x45786966):[m
[32m+[m[32m        if (dataView.getUint32(offset + 4) !== 0x45786966) {[m
[32m+[m[32m            // No Exif data, might be XMP data instead[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[32m        if (tiffOffset + 8 > dataView.byteLength) {[m
[32m+[m[32m            Roo.log('Invalid Exif data: Invalid segment size.');[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[32m        // Check for the two null bytes:[m
[32m+[m[32m        if (dataView.getUint16(offset + 8) !== 0x0000) {[m
[32m+[m[32m            Roo.log('Invalid Exif data: Missing byte alignment offset.');[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[32m        // Check the byte alignment:[m
[32m+[m[32m        switch (dataView.getUint16(tiffOffset)) {[m
[32m+[m[32m        case 0x4949:[m
[32m+[m[32m            littleEndian = true;[m
[32m+[m[32m            break;[m
[32m+[m[32m        case 0x4D4D:[m
[32m+[m[32m            littleEndian = false;[m
[32m+[m[32m            break;[m
[32m+[m[32m        default:[m
[32m+[m[32m            Roo.log('Invalid Exif data: Invalid byte alignment marker.');[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[32m        // Check for the TIFF tag marker (0x002A):[m
[32m+[m[32m        if (dataView.getUint16(tiffOffset + 2, littleEndian) !== 0x002A) {[m
[32m+[m[32m            Roo.log('Invalid Exif data: Missing TIFF marker.');[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[32m        // Retrieve the directory offset bytes, usually 0x00000008 or 8 decimal:[m
[32m+[m[32m        dirOffset = dataView.getUint32(tiffOffset + 4, littleEndian);[m
[32m+[m[41m        [m
[32m+[m[32m        this.parseExifTags([m
[32m+[m[32m            dataView,[m
[32m+[m[32m            tiffOffset,[m
[32m+[m[32m            tiffOffset + dirOffset,[m
[32m+[m[32m            littleEndian[m
[32m+[m[32m        );[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    parseExifTags : function(dataView, tiffOffset, dirOffset, littleEndian)[m
[32m+[m[32m    {[m
[32m+[m[32m        var tagsNumber,[m
[32m+[m[32m            dirEndOffset,[m
[32m+[m[32m            i;[m
[32m+[m[32m        if (dirOffset + 6 > dataView.byteLength) {[m
[32m+[m[32m            Roo.log('Invalid Exif data: Invalid directory offset.');[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[32m        tagsNumber = dataView.getUint16(dirOffset, littleEndian);[m
[32m+[m[32m        dirEndOffset = dirOffset + 2 + 12 * tagsNumber;[m
[32m+[m[32m        if (dirEndOffset + 4 > dataView.byteLength) {[m
[32m+[m[32m            Roo.log('Invalid Exif data: Invalid directory size.');[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[32m        for (i = 0; i < tagsNumber; i += 1) {[m
[32m+[m[32m            this.parseExifTag([m
[32m+[m[32m                dataView,[m
[32m+[m[32m                tiffOffset,[m
[32m+[m[32m                dirOffset + 2 + 12 * i, // tag offset[m
[32m+[m[32m                littleEndian[m
[32m+[m[32m            );[m
[32m+[m[32m        }[m
[32m+[m[32m        // Return the offset to the next directory:[m
[32m+[m[32m        return dataView.getUint32(dirEndOffset, littleEndian);[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    parseExifTag : function (dataView, tiffOffset, offset, littleEndian)[m[41m [m
[32m+[m[32m    {[m
[32m+[m[32m        var tag = dataView.getUint16(offset, littleEndian);[m
[32m+[m[41m        [m
[32m+[m[32m        this.exif[tag] = this.getExifValue([m
[32m+[m[32m            dataView,[m
[32m+[m[32m            tiffOffset,[m
[32m+[m[32m            offset,[m
[32m+[m[32m            dataView.getUint16(offset + 2, littleEndian), // tag type[m
[32m+[m[32m            dataView.getUint32(offset + 4, littleEndian), // tag length[m
[32m+[m[32m            littleEndian[m
[32m+[m[32m        );[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    getExifValue : function (dataView, tiffOffset, offset, type, length, littleEndian)[m
[32m+[m[32m    {[m
[32m+[m[32m        var tagType = Roo.dialog.UploadCropbox.exifTagTypes[type],[m
[32m+[m[32m            tagSize,[m
[32m+[m[32m            dataOffset,[m
[32m+[m[32m            values,[m
[32m+[m[32m            i,[m
[32m+[m[32m            str,[m
[32m+[m[32m            c;[m
[32m+[m[41m    [m
[32m+[m[32m        if (!tagType) {[m
[32m+[m[32m            Roo.log('Invalid Exif data: Invalid tag type.');[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        tagSize = tagType.size * length;[m
[32m+[m[32m        // Determine if the value is contained in the dataOffset bytes,[m
[32m+[m[32m        // or if the value at the dataOffset is a pointer to the actual data:[m
[32m+[m[32m        dataOffset = tagSize > 4 ?[m
[32m+[m[32m                tiffOffset + dataView.getUint32(offset + 8, littleEndian) : (offset + 8);[m
[32m+[m[32m        if (dataOffset + tagSize > dataView.byteLength) {[m
[32m+[m[32m            Roo.log('Invalid Exif data: Invalid data offset.');[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[32m        if (length === 1) {[m
[32m+[m[32m            return tagType.getValue(dataView, dataOffset, littleEndian);[m
[32m+[m[32m        }[m
[32m+[m[32m        values = [];[m
[32m+[m[32m        for (i = 0; i < length; i += 1) {[m
[32m+[m[32m            values[i] = tagType.getValue(dataView, dataOffset + i * tagType.size, littleEndian);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if (tagType.ascii) {[m
[32m+[m[32m            str = '';[m
[32m+[m[32m            // Concatenate the chars:[m
[32m+[m[32m            for (i = 0; i < values.length; i += 1) {[m
[32m+[m[32m                c = values[i];[m
[32m+[m[32m                // Ignore the terminating NULL byte(s):[m
[32m+[m[32m                if (c === '\u0000') {[m
[32m+[m[32m                    break;[m
[32m+[m[32m                }[m
[32m+[m[32m                str += c;[m
[32m+[m[32m            }[m
[32m+[m[32m            return str;[m
[32m+[m[32m        }[m
[32m+[m[32m        return values;[m
[32m+[m[32m    }[m
[32m+[m[41m    [m
[32m+[m[32m});[m
[32m+[m
[32m+[m[32mRoo.apply(Roo.dialog.UploadCropbox, {[m
[32m+[m[32m    tags : {[m
[32m+[m[32m        'Orientation': 0x0112[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    Orientation: {[m
[32m+[m[32m            1: 0, //'top-left',[m
[32m+[m[32m//            2: 'top-right',[m
[32m+[m[32m            3: 180, //'bottom-right',[m
[32m+[m[32m//            4: 'bottom-left',[m
[32m+[m[32m//            5: 'left-top',[m
[32m+[m[32m            6: 90, //'right-top',[m
[32m+[m[32m//            7: 'right-bottom',[m
[32m+[m[32m            8: 270 //'left-bottom'[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    exifTagTypes : {[m
[32m+[m[32m        // byte, 8-bit unsigned int:[m
[32m+[m[32m        1: {[m
[32m+[m[32m            getValue: function (dataView, dataOffset) {[m
[32m+[m[32m                return dataView.getUint8(dataOffset);[m
[32m+[m[32m            },[m
[32m+[m[32m            size: 1[m
[32m+[m[32m        },[m
[32m+[m[32m        // ascii, 8-bit byte:[m
[32m+[m[32m        2: {[m
[32m+[m[32m            getValue: function (dataView, dataOffset) {[m
[32m+[m[32m                return String.fromCharCode(dataView.getUint8(dataOffset));[m
[32m+[m[32m            },[m
[32m+[m[32m            size: 1,[m
[32m+[m[32m            ascii: true[m
[32m+[m[32m        },[m
[32m+[m[32m        // short, 16 bit int:[m
[32m+[m[32m        3: {[m
[32m+[m[32m            getValue: function (dataView, dataOffset, littleEndian) {[m
[32m+[m[32m                return dataView.getUint16(dataOffset, littleEndian);[m
[32m+[m[32m            },[m
[32m+[m[32m            size: 2[m
[32m+[m[32m        },[m
[32m+[m[32m        // long, 32 bit int:[m
[32m+[m[32m        4: {[m
[32m+[m[32m            getValue: function (dataView, dataOffset, littleEndian) {[m
[32m+[m[32m                return dataView.getUint32(dataOffset, littleEndian);[m
[32m+[m[32m            },[m
[32m+[m[32m            size: 4[m
[32m+[m[32m        },[m
[32m+[m[32m        // rational = two long values, first is numerator, second is denominator:[m
[32m+[m[32m        5: {[m
[32m+[m[32m            getValue: function (dataView, dataOffset, littleEndian) {[m
[32m+[m[32m                return dataView.getUint32(dataOffset, littleEndian) /[m
[32m+[m[32m                    dataView.getUint32(dataOffset + 4, littleEndian);[m
[32m+[m[32m            },[m
[32m+[m[32m            size: 8[m
[32m+[m[32m        },[m
[32m+[m[32m        // slong, 32 bit signed int:[m
[32m+[m[32m        9: {[m
[32m+[m[32m            getValue: function (dataView, dataOffset, littleEndian) {[m
[32m+[m[32m                return dataView.getInt32(dataOffset, littleEndian);[m
[32m+[m[32m            },[m
[32m+[m[32m            size: 4[m
[32m+[m[32m        },[m
[32m+[m[32m        // srational, two slongs, first is numerator, second is denominator:[m
[32m+[m[32m        10: {[m
[32m+[m[32m            getValue: function (dataView, dataOffset, littleEndian) {[m
[32m+[m[32m                return dataView.getInt32(dataOffset, littleEndian) /[m
[32m+[m[32m                    dataView.getInt32(dataOffset + 4, littleEndian);[m
[32m+[m[32m            },[m
[32m+[m[32m            size: 8[m
[32m+[m[32m        }[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    footer : {[m
[32m+[m[32m        STANDARD : [[m
[32m+[m[32m            {[m
[32m+[m[32m                tag : 'div',[m
[32m+[m[32m                cls : 'btn-group roo-upload-cropbox-rotate-left',[m
[32m+[m[32m                action : 'rotate-left',[m
[32m+[m[32m                cn : [[m
[32m+[m[32m                    {[m
[32m+[m[32m                        tag : 'button',[m
[32m+[m[32m                        cls : 'btn btn-default',[m
[32m+[m[32m                        html : '<i class="fa fa-undo"></i>'[m
[32m+[m[32m                    }[m
[32m+[m[32m                ][m
[32m+[m[32m            },[m
[32m+[m[32m            {[m
[32m+[m[32m                tag : 'div',[m
[32m+[m[32m                cls : 'btn-group roo-upload-cropbox-picture',[m
[32m+[m[32m                action : 'picture',[m
[32m+[m[32m                cn : [[m
[32m+[m[32m                    {[m
[32m+[m[32m                        tag : 'button',[m
[32m+[m[32m                        cls : 'btn btn-default',[m
[32m+[m[32m                        html : '<i class="fa fa-picture-o"></i>'[m
[32m+[m[32m                    }[m
[32m+[m[32m                ][m
[32m+[m[32m            },[m
[32m+[m[32m            {[m
[32m+[m[32m                tag : 'div',[m
[32m+[m[32m                cls : 'btn-group roo-upload-cropbox-rotate-right',[m
[32m+[m[32m                action : 'rotate-right',[m
[32m+[m[32m                cn : [[m
[32m+[m[32m                    {[m
[32m+[m[32m                        tag : 'button',[m
[32m+[m[32m                        cls : 'btn btn-default',[m
[32m+[m[32m                        html : '<i class="fa fa-repeat"></i>'[m
[32m+[m[32m                    }[m
[32m+[m[32m                ][m
[32m+[m[32m            }[m
[32m+[m[32m        ],[m
[32m+[m[32m        DOCUMENT : [[m
[32m+[m[32m            {[m
[32m+[m[32m                tag : 'div',[m
[32m+[m[32m                cls : 'btn-group roo-upload-cropbox-rotate-left',[m
[32m+[m[32m                action : 'rotate-left',[m
[32m+[m[32m                cn : [[m
[32m+[m[32m                    {[m
[32m+[m[32m                        tag : 'button',[m
[32m+[m[32m                        cls : 'btn btn-default',[m
[32m+[m[32m                        html : '<i class="fa fa-undo"></i>'[m
[32m+[m[32m                    }[m
[32m+[m[32m                ][m
[32m+[m[32m            },[m
[32m+[m[32m            {[m
[32m+[m[32m                tag : 'div',[m
[32m+[m[32m                cls : 'btn-group roo-upload-cropbox-download',[m
[32m+[m[32m                action : 'download',[m
[32m+[m[32m                cn : [[m
[32m+[m[32m                    {[m
[32m+[m[32m                        tag : 'button',[m
[32m+[m[32m                        cls : 'btn btn-default',[m
[32m+[m[32m                        html : '<i class="fa fa-download"></i>'[m
[32m+[m[32m                    }[m
[32m+[m[32m                ][m
[32m+[m[32m            },[m
[32m+[m[32m            {[m
[32m+[m[32m                tag : 'div',[m
[32m+[m[32m                cls : 'btn-group roo-upload-cropbox-crop',[m
[32m+[m[32m                action : 'crop',[m
[32m+[m[32m                cn : [[m
[32m+[m[32m                    {[m
[32m+[m[32m                        tag : 'button',[m
[32m+[m[32m                        cls : 'btn btn-default',[m
[32m+[m[32m                        html : '<i class="fa fa-crop"></i>'[m
[32m+[m[32m                    }[m
[32m+[m[32m                ][m
[32m+[m[32m            },[m
[32m+[m[32m            {[m
[32m+[m[32m                tag : 'div',[m
[32m+[m[32m                cls : 'btn-group roo-upload-cropbox-trash',[m
[32m+[m[32m                action : 'trash',[m
[32m+[m[32m                cn : [[m
[32m+[m[32m                    {[m
[32m+[m[32m                        tag : 'button',[m
[32m+[m[32m                        cls : 'btn btn-default',[m
[32m+[m[32m                        html : '<i class="fa fa-trash"></i>'[m
[32m+[m[32m                    }[m
[32m+[m[32m                ][m
[32m+[m[32m            },[m
[32m+[m[32m            {[m
[32m+[m[32m                tag : 'div',[m
[32m+[m[32m                cls : 'btn-group roo-upload-cropbox-rotate-right',[m
[32m+[m[32m                action : 'rotate-right',[m
[32m+[m[32m                cn : [[m
[32m+[m[32m                    {[m
[32m+[m[32m                        tag : 'button',[m
[32m+[m[32m                        cls : 'btn btn-default',[m
[32m+[m[32m                        html : '<i class="fa fa-repeat"></i>'[m
[32m+[m[32m                    }[m
[32m+[m[32m                ][m
[32m+[m[32m            }[m
[32m+[m[32m        ],[m
[32m+[m[32m        ROTATOR : [[m
[32m+[m[32m            {[m
[32m+[m[32m                tag : 'div',[m
[32m+[m[32m                cls : 'btn-group roo-upload-cropbox-rotate-left',[m
[32m+[m[32m                action : 'rotate-left',[m
[32m+[m[32m                cn : [[m
[32m+[m[32m                    {[m
[32m+[m[32m                        tag : 'button',[m
[32m+[m[32m                        cls : 'btn btn-default',[m
[32m+[m[32m                        html : '<i class="fa fa-undo"></i>'[m
[32m+[m[32m                    }[m
[32m+[m[32m                ][m
[32m+[m[32m            },[m
[32m+[m[32m            {[m
[32m+[m[32m                tag : 'div',[m
[32m+[m[32m                cls : 'btn-group roo-upload-cropbox-rotate-right',[m
[32m+[m[32m                action : 'rotate-right',[m
[32m+[m[32m                cn : [[m
[32m+[m[32m                    {[m
[32m+[m[32m                        tag : 'button',[m
[32m+[m[32m                        cls : 'btn btn-default',[m
[32m+[m[32m                        html : '<i class="fa fa-repeat"></i>'[m
[32m+[m[32m                    }[m
[32m+[m[32m                ][m
[32m+[m[32m            }[m
[32m+[m[32m        ][m
[32m+[m[32m    }[m
[32m+[m[32m});[m
[1mdiff --git a/buildSDK/dependancy_ui.txt b/buildSDK/dependancy_ui.txt[m
[1mindex 5a8e5a9ac5..f89656e412 100644[m
[1m--- a/buildSDK/dependancy_ui.txt[m
[1m+++ b/buildSDK/dependancy_ui.txt[m
[36m@@ -197,3 +197,6 @@[m [mRoo.XTemplate[m
 [m
 // is this ready yet? - is it used?[m
 // Roo.Login[m
[32m+[m
[32m+[m[32mRoo.dialog.namespace[m
[32m+[m[32mRoo.dialog.UploadCropbox[m
[1mdiff --git a/css/alert.css b/css/alert.css[m
[1mnew file mode 100644[m
[1mindex 0000000000..0cc7751f02[m
[1m--- /dev/null[m
[1m+++ b/css/alert.css[m
[36m@@ -0,0 +1,75 @@[m
[32m+[m[32m.alert {[m
[32m+[m[32m  padding: 15px;[m
[32m+[m[32m  margin-bottom: 20px;[m
[32m+[m[32m  border: 1px solid transparent;[m
[32m+[m[32m  border-radius: 4px;[m
[32m+[m[32m}[m
[32m+[m[32m.alert h4 {[m
[32m+[m[32m  margin-top: 0;[m
[32m+[m[32m  color: inherit;[m
[32m+[m[32m}[m
[32m+[m[32m.alert .alert-link {[m
[32m+[m[32m  font-weight: bold;[m
[32m+[m[32m}[m
[32m+[m[32m.alert > p,[m
[32m+[m[32m.alert > ul {[m
[32m+[m[32m  margin-bottom: 0;[m
[32m+[m[32m}[m
[32m+[m[32m.alert > p + p {[m
[32m+[m[32m  margin-top: 5px;[m
[32m+[m[32m}[m
[32m+[m[32m.alert-dismissable,[m
[32m+[m[32m.alert-dismissible {[m
[32m+[m[32m  padding-right: 35px;[m
[32m+[m[32m}[m
[32m+[m[32m.alert-dismissable .close,[m
[32m+[m[32m.alert-dismissible .close {[m
[32m+[m[32m  position: relative;[m
[32m+[m[32m  top: -2px;[m
[32m+[m[32m  right: -21px;[m
[32m+[m[32m  color: inherit;[m
[32m+[m[32m}[m
[32m+[m[32m.alert-success {[m
[32m+[m[32m  background-color: #dff0d8;[m
[32m+[m[32m  border-color: #d6e9c6;[m
[32m+[m[32m  color: #3c763d;[m
[32m+[m[32m}[m
[32m+[m[32m.alert-success hr {[m
[32m+[m[32m  border-top-color: #c9e2b3;[m
[32m+[m[32m}[m
[32m+[m[32m.alert-success .alert-link {[m
[32m+[m[32m  color: #2b542c;[m
[32m+[m[32m}[m
[32m+[m[32m.alert-info {[m
[32m+[m[32m  background-color: #d9edf7;[m
[32m+[m[32m  border-color: #bce8f1;[m
[32m+[m[32m  color: #31708f;[m
[32m+[m[32m}[m
[32m+[m[32m.alert-info hr {[m
[32m+[m[32m  border-top-color: #a6e1ec;[m
[32m+[m[32m}[m
[32m+[m[32m.alert-info .alert-link {[m
[32m+[m[32m  color: #245269;[m
[32m+[m[32m}[m
[32m+[m[32m.alert-warning {[m
[32m+[m[32m  background-color: #fcf8e3;[m
[32m+[m[32m  border-color: #faebcc;[m
[32m+[m[32m  color: #8a6d3b;[m
[32m+[m[32m}[m
[32m+[m[32m.alert-warning hr {[m
[32m+[m[32m  border-top-color: #f7e1b5;[m
[32m+[m[32m}[m
[32m+[m[32m.alert-warning .alert-link {[m
[32m+[m[32m  color: #66512c;[m
[32m+[m[32m}[m
[32m+[m[32m.alert-danger {[m
[32m+[m[32m  background-color: #f2dede;[m
[32m+[m[32m  border-color: #ebccd1;[m
[32m+[m[32m  color: #a94442;[m
[32m+[m[32m}[m
[32m+[m[32m.alert-danger hr {[m
[32m+[m[32m  border-top-color: #e4b9c0;[m
[32m+[m[32m}[m
[32m+[m[32m.alert-danger .alert-link {[m
[32m+[m[32m  color: #843534;[m
[32m+[m[32m}[m
\ No newline at end of file[m
[1mdiff --git a/css/button-groups.css b/css/button-groups.css[m
[1mnew file mode 100644[m
[1mindex 0000000000..b725faf99b[m
[1m--- /dev/null[m
[1m+++ b/css/button-groups.css[m
[36m@@ -0,0 +1,171 @@[m
[32m+[m[32m.btn-group,[m
[32m+[m[32m.btn-group-vertical {[m
[32m+[m[32m  position: relative;[m
[32m+[m[32m  display: inline-block;[m
[32m+[m[32m  vertical-align: middle;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-group > .btn,[m
[32m+[m[32m.btn-group-vertical > .btn {[m
[32m+[m[32m  position: relative;[m
[32m+[m[32m  float: left;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-group > .btn:hover,[m
[32m+[m[32m.btn-group-vertical > .btn:hover,[m
[32m+[m[32m.btn-group > .btn:focus,[m
[32m+[m[32m.btn-group-vertical > .btn:focus,[m
[32m+[m[32m.btn-group > .btn:active,[m
[32m+[m[32m.btn-group-vertical > .btn:active,[m
[32m+[m[32m.btn-group > .btn.active,[m
[32m+[m[32m.btn-group-vertical > .btn.active {[m
[32m+[m[32m  z-index: 2;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-group .btn + .btn,[m
[32m+[m[32m.btn-group .btn + .btn-group,[m
[32m+[m[32m.btn-group .btn-group + .btn,[m
[32m+[m[32m.btn-group .btn-group + .btn-group {[m
[32m+[m[32m  margin-left: -1px;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-toolbar {[m
[32m+[m[32m  margin-left: -5px;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-toolbar .btn,[m
[32m+[m[32m.btn-toolbar .btn-group,[m
[32m+[m[32m.btn-toolbar .input-group {[m
[32m+[m[32m  float: left;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-toolbar > .btn,[m
[32m+[m[32m.btn-toolbar > .btn-group,[m
[32m+[m[32m.btn-toolbar > .input-group {[m
[32m+[m[32m  margin-left: 5px;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-group > .btn:not(:first-child):not(:last-child):not(.dropdown-toggle) {[m
[32m+[m[32m  border-radius: 0;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-group > .btn:first-child {[m
[32m+[m[32m  margin-left: 0;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-group > .btn:first-child:not(:last-child):not(.dropdown-toggle) {[m
[32m+[m[32m  border-bottom-right-radius: 0;[m
[32m+[m[32m  border-top-right-radius: 0;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-group > .btn:last-child:not(:first-child),[m
[32m+[m[32m.btn-group > .dropdown-toggle:not(:first-child) {[m
[32m+[m[32m  border-bottom-left-radius: 0;[m
[32m+[m[32m  border-top-left-radius: 0;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-group > .btn-group {[m
[32m+[m[32m  float: left;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-group > .btn-group:not(:first-child):not(:last-child) > .btn {[m
[32m+[m[32m  border-radius: 0;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-group > .btn-group:first-child:not(:last-child) > .btn:last-child,[m
[32m+[m[32m.btn-group > .btn-group:first-child:not(:last-child) > .dropdown-toggle {[m
[32m+[m[32m  border-bottom-right-radius: 0;[m
[32m+[m[32m  border-top-right-radius: 0;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-group > .btn-group:last-child:not(:first-child) > .btn:first-child {[m
[32m+[m[32m  border-bottom-left-radius: 0;[m
[32m+[m[32m  border-top-left-radius: 0;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-group .dropdown-toggle:active,[m
[32m+[m[32m.btn-group.open .dropdown-toggle {[m
[32m+[m[32m  outline: 0;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-group > .btn + .dropdown-toggle {[m
[32m+[m[32m  padding-left: 8px;[m
[32m+[m[32m  padding-right: 8px;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-group > .btn-lg + .dropdown-toggle {[m
[32m+[m[32m  padding-left: 12px;[m
[32m+[m[32m  padding-right: 12px;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-group.open .dropdown-toggle {[m
[32m+[m[32m  -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);[m
[32m+[m[32m  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);[m
[32m+[m[32m}[m
[32m+[m[32m.btn-group.open .dropdown-toggle.btn-link {[m
[32m+[m[32m  -webkit-box-shadow: none;[m
[32m+[m[32m  box-shadow: none;[m
[32m+[m[32m}[m
[32m+[m[32m.btn .caret {[m
[32m+[m[32m  margin-left: 0;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-lg .caret {[m
[32m+[m[32m  border-width: 5px 5px 0;[m
[32m+[m[32m  border-bottom-width: 0;[m
[32m+[m[32m}[m
[32m+[m[32m.dropup .btn-lg .caret {[m
[32m+[m[32m  border-width: 0 5px 5px;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-group-vertical > .btn,[m
[32m+[m[32m.btn-group-vertical > .btn-group,[m
[32m+[m[32m.btn-group-vertical > .btn-group > .btn {[m
[32m+[m[32m  display: block;[m
[32m+[m[32m  float: none;[m
[32m+[m[32m  width: 100%;[m
[32m+[m[32m  max-width: 100%;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-group-vertical > .btn-group > .btn {[m
[32m+[m[32m  float: none;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-group-vertical > .btn + .btn,[m
[32m+[m[32m.btn-group-vertical > .btn + .btn-group,[m
[32m+[m[32m.btn-group-vertical > .btn-group + .btn,[m
[32m+[m[32m.btn-group-vertical > .btn-group + .btn-group {[m
[32m+[m[32m  margin-top: -1px;[m
[32m+[m[32m  margin-left: 0;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-group-vertical > .btn:not(:first-child):not(:last-child) {[m
[32m+[m[32m  border-radius: 0;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-group-vertical > .btn:first-child:not(:last-child) {[m
[32m+[m[32m  border-top-right-radius: 4px;[m
[32m+[m[32m  border-top-left-radius: 4px;[m
[32m+[m[32m  border-bottom-right-radius: 0;[m
[32m+[m[32m  border-bottom-left-radius: 0;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-group-vertical > .btn:last-child:not(:first-child) {[m
[32m+[m[32m  border-top-right-radius: 0;[m
[32m+[m[32m  border-top-left-radius: 0;[m
[32m+[m[32m  border-bottom-right-radius: 4px;[m
[32m+[m[32m  border-bottom-left-radius: 4px;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-group-vertical > .btn-group:not(:first-child):not(:last-child) > .btn {[m
[32m+[m[32m  border-radius: 0;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-group-vertical > .btn-group:first-child:not(:last-child) > .btn:last-child,[m
[32m+[m[32m.btn-group-vertical > .btn-group:first-child:not(:last-child) > .dropdown-toggle {[m
[32m+[m[32m  border-bottom-right-radius: 0;[m
[32m+[m[32m  border-bottom-left-radius: 0;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-group-vertical > .btn-group:last-child:not(:first-child) > .btn:first-child {[m
[32m+[m[32m  border-top-right-radius: 0;[m
[32m+[m[32m  border-top-left-radius: 0;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-group-justified {[m
[32m+[m[32m  display: table;[m
[32m+[m[32m  width: 100%;[m
[32m+[m[32m  table-layout: fixed;[m
[32m+[m[32m  border-collapse: separate;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-group-justified > .btn,[m
[32m+[m[32m.btn-group-justified > .btn-group {[m
[32m+[m[32m  float: none;[m
[32m+[m[32m  display: table-cell;[m
[32m+[m[32m  width: 1%;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-group-justified > .btn-group .btn {[m
[32m+[m[32m  width: 100%;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-group-justified > .btn-group .dropdown-menu {[m
[32m+[m[32m  left: auto;[m
[32m+[m[32m}[m
[32m+[m[32m[data-toggle="buttons"] > .btn input[type="radio"],[m
[32m+[m[32m[data-toggle="buttons"] > .btn-group > .btn input[type="radio"],[m
[32m+[m[32m[data-toggle="buttons"] > .btn input[type="checkbox"],[m
[32m+[m[32m[data-toggle="buttons"] > .btn-group > .btn input[type="checkbox"] {[m
[32m+[m[32m  position: absolute;[m
[32m+[m[32m  clip: rect(0, 0, 0, 0);[m
[32m+[m[32m  pointer-events: none;[m
[32m+[m[32m}[m
\ No newline at end of file[m
[1mdiff --git a/css/buttons.css b/css/buttons.css[m
[1mnew file mode 100644[m
[1mindex 0000000000..42ec098feb[m
[1m--- /dev/null[m
[1m+++ b/css/buttons.css[m
[36m@@ -0,0 +1,463 @@[m
[32m+[m[32m.btn {[m
[32m+[m[32m  display: inline-block;[m
[32m+[m[32m  margin-bottom: 0;[m
[32m+[m[32m  font-weight: normal;[m
[32m+[m[32m  text-align: center;[m
[32m+[m[32m  vertical-align: middle;[m
[32m+[m[32m  touch-action: manipulation;[m
[32m+[m[32m  cursor: pointer;[m
[32m+[m[32m  background-image: none;[m
[32m+[m[32m  border: 1px solid transparent;[m
[32m+[m[32m  white-space: nowrap;[m
[32m+[m[32m  padding: 6px 12px;[m
[32m+[m[32m  font-size: 14px;[m
[32m+[m[32m  line-height: 1.42857143;[m
[32m+[m[32m  border-radius: 4px;[m
[32m+[m[32m  -webkit-user-select: none;[m
[32m+[m[32m  -moz-user-select: none;[m
[32m+[m[32m  -ms-user-select: none;[m
[32m+[m[32m  user-select: none;[m
[32m+[m[32m}[m
[32m+[m[32m.btn:focus,[m
[32m+[m[32m.btn:active:focus,[m
[32m+[m[32m.btn.active:focus,[m
[32m+[m[32m.btn.focus,[m
[32m+[m[32m.btn:active.focus,[m
[32m+[m[32m.btn.active.focus {[m
[32m+[m[32m  outline: 5px auto -webkit-focus-ring-color;[m
[32m+[m[32m  outline-offset: -2px;[m
[32m+[m[32m}[m
[32m+[m[32m.btn:hover,[m
[32m+[m[32m.btn:focus,[m
[32m+[m[32m.btn.focus {[m
[32m+[m[32m  color: #333333;[m
[32m+[m[32m  text-decoration: none;[m
[32m+[m[32m}[m
[32m+[m[32m.btn:active,[m
[32m+[m[32m.btn.active {[m
[32m+[m[32m  outline: 0;[m
[32m+[m[32m  background-image: none;[m
[32m+[m[32m  -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);[m
[32m+[m[32m  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);[m
[32m+[m[32m}[m
[32m+[m[32m.btn.disabled,[m
[32m+[m[32m.btn[disabled],[m
[32m+[m[32mfieldset[disabled] .btn {[m
[32m+[m[32m  cursor: not-allowed;[m
[32m+[m[32m  opacity: 0.65;[m
[32m+[m[32m  filter: alpha(opacity=65);[m
[32m+[m[32m  -webkit-box-shadow: none;[m
[32m+[m[32m  box-shadow: none;[m
[32m+[m[32m}[m
[32m+[m[32ma.btn.disabled,[m
[32m+[m[32mfieldset[disabled] a.btn {[m
[32m+[m[32m  pointer-events: none;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-default {[m
[32m+[m[32m  color: #333333;[m
[32m+[m[32m  background-color: #ffffff;[m
[32m+[m[32m  border-color: #cccccc;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-default:focus,[m
[32m+[m[32m.btn-default.focus {[m
[32m+[m[32m  color: #333333;[m
[32m+[m[32m  background-color: #e6e6e6;[m
[32m+[m[32m  border-color: #8c8c8c;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-default:hover {[m
[32m+[m[32m  color: #333333;[m
[32m+[m[32m  background-color: #e6e6e6;[m
[32m+[m[32m  border-color: #adadad;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-default:active,[m
[32m+[m[32m.btn-default.active,[m
[32m+[m[32m.open > .dropdown-toggle.btn-default {[m
[32m+[m[32m  color: #333333;[m
[32m+[m[32m  background-color: #e6e6e6;[m
[32m+[m[32m  border-color: #adadad;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-default:active:hover,[m
[32m+[m[32m.btn-default.active:hover,[m
[32m+[m[32m.open > .dropdown-toggle.btn-default:hover,[m
[32m+[m[32m.btn-default:active:focus,[m
[32m+[m[32m.btn-default.active:focus,[m
[32m+[m[32m.open > .dropdown-toggle.btn-default:focus,[m
[32m+[m[32m.btn-default:active.focus,[m
[32m+[m[32m.btn-default.active.focus,[m
[32m+[m[32m.open > .dropdown-toggle.btn-default.focus {[m
[32m+[m[32m  color: #333333;[m
[32m+[m[32m  background-color: #d4d4d4;[m
[32m+[m[32m  border-color: #8c8c8c;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-default:active,[m
[32m+[m[32m.btn-default.active,[m
[32m+[m[32m.open > .dropdown-toggle.btn-default {[m
[32m+[m[32m  background-image: none;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-default.disabled:hover,[m
[32m+[m[32m.btn-default[disabled]:hover,[m
[32m+[m[32mfieldset[disabled] .btn-default:hover,[m
[32m+[m[32m.btn-default.disabled:focus,[m
[32m+[m[32m.btn-default[disabled]:focus,[m
[32m+[m[32mfieldset[disabled] .btn-default:focus,[m
[32m+[m[32m.btn-default.disabled.focus,[m
[32m+[m[32m.btn-default[disabled].focus,[m
[32m+[m[32mfieldset[disabled] .btn-default.focus {[m
[32m+[m[32m  background-color: #ffffff;[m
[32m+[m[32m  border-color: #cccccc;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-default .badge {[m
[32m+[m[32m  color: #ffffff;[m
[32m+[m[32m  background-color: #333333;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-primary {[m
[32m+[m[32m  color: #ffffff;[m
[32m+[m[32m  background-color: #337ab7;[m
[32m+[m[32m  border-color: #2e6da4;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-primary:focus,[m
[32m+[m[32m.btn-primary.focus {[m
[32m+[m[32m  color: #ffffff;[m
[32m+[m[32m  background-color: #286090;[m
[32m+[m[32m  border-color: #122b40;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-primary:hover {[m
[32m+[m[32m  color: #ffffff;[m
[32m+[m[32m  background-color: #286090;[m
[32m+[m[32m  border-color: #204d74;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-primary:active,[m
[32m+[m[32m.btn-primary.active,[m
[32m+[m[32m.open > .dropdown-toggle.btn-primary {[m
[32m+[m[32m  color: #ffffff;[m
[32m+[m[32m  background-color: #286090;[m
[32m+[m[32m  border-color: #204d74;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-primary:active:hover,[m
[32m+[m[32m.btn-primary.active:hover,[m
[32m+[m[32m.open > .dropdown-toggle.btn-primary:hover,[m
[32m+[m[32m.btn-primary:active:focus,[m
[32m+[m[32m.btn-primary.active:focus,[m
[32m+[m[32m.open > .dropdown-toggle.btn-primary:focus,[m
[32m+[m[32m.btn-primary:active.focus,[m
[32m+[m[32m.btn-primary.active.focus,[m
[32m+[m[32m.open > .dropdown-toggle.btn-primary.focus {[m
[32m+[m[32m  color: #ffffff;[m
[32m+[m[32m  background-color: #204d74;[m
[32m+[m[32m  border-color: #122b40;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-primary:active,[m
[32m+[m[32m.btn-primary.active,[m
[32m+[m[32m.open > .dropdown-toggle.btn-primary {[m
[32m+[m[32m  background-image: none;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-primary.disabled:hover,[m
[32m+[m[32m.btn-primary[disabled]:hover,[m
[32m+[m[32mfieldset[disabled] .btn-primary:hover,[m
[32m+[m[32m.btn-primary.disabled:focus,[m
[32m+[m[32m.btn-primary[disabled]:focus,[m
[32m+[m[32mfieldset[disabled] .btn-primary:focus,[m
[32m+[m[32m.btn-primary.disabled.focus,[m
[32m+[m[32m.btn-primary[disabled].focus,[m
[32m+[m[32mfieldset[disabled] .btn-primary.focus {[m
[32m+[m[32m  background-color: #337ab7;[m
[32m+[m[32m  border-color: #2e6da4;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-primary .badge {[m
[32m+[m[32m  color: #337ab7;[m
[32m+[m[32m  background-color: #ffffff;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-success {[m
[32m+[m[32m  color: #ffffff;[m
[32m+[m[32m  background-color: #5cb85c;[m
[32m+[m[32m  border-color: #4cae4c;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-success:focus,[m
[32m+[m[32m.btn-success.focus {[m
[32m+[m[32m  color: #ffffff;[m
[32m+[m[32m  background-color: #449d44;[m
[32m+[m[32m  border-color: #255625;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-success:hover {[m
[32m+[m[32m  color: #ffffff;[m
[32m+[m[32m  background-color: #449d44;[m
[32m+[m[32m  border-color: #398439;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-success:active,[m
[32m+[m[32m.btn-success.active,[m
[32m+[m[32m.open > .dropdown-toggle.btn-success {[m
[32m+[m[32m  color: #ffffff;[m
[32m+[m[32m  background-color: #449d44;[m
[32m+[m[32m  border-color: #398439;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-success:active:hover,[m
[32m+[m[32m.btn-success.active:hover,[m
[32m+[m[32m.open > .dropdown-toggle.btn-success:hover,[m
[32m+[m[32m.btn-success:active:focus,[m
[32m+[m[32m.btn-success.active:focus,[m
[32m+[m[32m.open > .dropdown-toggle.btn-success:focus,[m
[32m+[m[32m.btn-success:active.focus,[m
[32m+[m[32m.btn-success.active.focus,[m
[32m+[m[32m.open > .dropdown-toggle.btn-success.focus {[m
[32m+[m[32m  color: #ffffff;[m
[32m+[m[32m  background-color: #398439;[m
[32m+[m[32m  border-color: #255625;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-success:active,[m
[32m+[m[32m.btn-success.active,[m
[32m+[m[32m.open > .dropdown-toggle.btn-success {[m
[32m+[m[32m  background-image: none;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-success.disabled:hover,[m
[32m+[m[32m.btn-success[disabled]:hover,[m
[32m+[m[32mfieldset[disabled] .btn-success:hover,[m
[32m+[m[32m.btn-success.disabled:focus,[m
[32m+[m[32m.btn-success[disabled]:focus,[m
[32m+[m[32mfieldset[disabled] .btn-success:focus,[m
[32m+[m[32m.btn-success.disabled.focus,[m
[32m+[m[32m.btn-success[disabled].focus,[m
[32m+[m[32mfieldset[disabled] .btn-success.focus {[m
[32m+[m[32m  background-color: #5cb85c;[m
[32m+[m[32m  border-color: #4cae4c;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-success .badge {[m
[32m+[m[32m  color: #5cb85c;[m
[32m+[m[32m  background-color: #ffffff;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-info {[m
[32m+[m[32m  color: #ffffff;[m
[32m+[m[32m  background-color: #5bc0de;[m
[32m+[m[32m  border-color: #46b8da;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-info:focus,[m
[32m+[m[32m.btn-info.focus {[m
[32m+[m[32m  color: #ffffff;[m
[32m+[m[32m  background-color: #31b0d5;[m
[32m+[m[32m  border-color: #1b6d85;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-info:hover {[m
[32m+[m[32m  color: #ffffff;[m
[32m+[m[32m  background-color: #31b0d5;[m
[32m+[m[32m  border-color: #269abc;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-info:active,[m
[32m+[m[32m.btn-info.active,[m
[32m+[m[32m.open > .dropdown-toggle.btn-info {[m
[32m+[m[32m  color: #ffffff;[m
[32m+[m[32m  background-color: #31b0d5;[m
[32m+[m[32m  border-color: #269abc;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-info:active:hover,[m
[32m+[m[32m.btn-info.active:hover,[m
[32m+[m[32m.open > .dropdown-toggle.btn-info:hover,[m
[32m+[m[32m.btn-info:active:focus,[m
[32m+[m[32m.btn-info.active:focus,[m
[32m+[m[32m.open > .dropdown-toggle.btn-info:focus,[m
[32m+[m[32m.btn-info:active.focus,[m
[32m+[m[32m.btn-info.active.focus,[m
[32m+[m[32m.open > .dropdown-toggle.btn-info.focus {[m
[32m+[m[32m  color: #ffffff;[m
[32m+[m[32m  background-color: #269abc;[m
[32m+[m[32m  border-color: #1b6d85;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-info:active,[m
[32m+[m[32m.btn-info.active,[m
[32m+[m[32m.open > .dropdown-toggle.btn-info {[m
[32m+[m[32m  background-image: none;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-info.disabled:hover,[m
[32m+[m[32m.btn-info[disabled]:hover,[m
[32m+[m[32mfieldset[disabled] .btn-info:hover,[m
[32m+[m[32m.btn-info.disabled:focus,[m
[32m+[m[32m.btn-info[disabled]:focus,[m
[32m+[m[32mfieldset[disabled] .btn-info:focus,[m
[32m+[m[32m.btn-info.disabled.focus,[m
[32m+[m[32m.btn-info[disabled].focus,[m
[32m+[m[32mfieldset[disabled] .btn-info.focus {[m
[32m+[m[32m  background-color: #5bc0de;[m
[32m+[m[32m  border-color: #46b8da;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-info .badge {[m
[32m+[m[32m  color: #5bc0de;[m
[32m+[m[32m  background-color: #ffffff;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-warning {[m
[32m+[m[32m  color: #ffffff;[m
[32m+[m[32m  background-color: #f0ad4e;[m
[32m+[m[32m  border-color: #eea236;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-warning:focus,[m
[32m+[m[32m.btn-warning.focus {[m
[32m+[m[32m  color: #ffffff;[m
[32m+[m[32m  background-color: #ec971f;[m
[32m+[m[32m  border-color: #985f0d;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-warning:hover {[m
[32m+[m[32m  color: #ffffff;[m
[32m+[m[32m  background-color: #ec971f;[m
[32m+[m[32m  border-color: #d58512;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-warning:active,[m
[32m+[m[32m.btn-warning.active,[m
[32m+[m[32m.open > .dropdown-toggle.btn-warning {[m
[32m+[m[32m  color: #ffffff;[m
[32m+[m[32m  background-color: #ec971f;[m
[32m+[m[32m  border-color: #d58512;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-warning:active:hover,[m
[32m+[m[32m.btn-warning.active:hover,[m
[32m+[m[32m.open > .dropdown-toggle.btn-warning:hover,[m
[32m+[m[32m.btn-warning:active:focus,[m
[32m+[m[32m.btn-warning.active:focus,[m
[32m+[m[32m.open > .dropdown-toggle.btn-warning:focus,[m
[32m+[m[32m.btn-warning:active.focus,[m
[32m+[m[32m.btn-warning.active.focus,[m
[32m+[m[32m.open > .dropdown-toggle.btn-warning.focus {[m
[32m+[m[32m  color: #ffffff;[m
[32m+[m[32m  background-color: #d58512;[m
[32m+[m[32m  border-color: #985f0d;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-warning:active,[m
[32m+[m[32m.btn-warning.active,[m
[32m+[m[32m.open > .dropdown-toggle.btn-warning {[m
[32m+[m[32m  background-image: none;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-warning.disabled:hover,[m
[32m+[m[32m.btn-warning[disabled]:hover,[m
[32m+[m[32mfieldset[disabled] .btn-warning:hover,[m
[32m+[m[32m.btn-warning.disabled:focus,[m
[32m+[m[32m.btn-warning[disabled]:focus,[m
[32m+[m[32mfieldset[disabled] .btn-warning:focus,[m
[32m+[m[32m.btn-warning.disabled.focus,[m
[32m+[m[32m.btn-warning[disabled].focus,[m
[32m+[m[32mfieldset[disabled] .btn-warning.focus {[m
[32m+[m[32m  background-color: #f0ad4e;[m
[32m+[m[32m  border-color: #eea236;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-warning .badge {[m
[32m+[m[32m  color: #f0ad4e;[m
[32m+[m[32m  background-color: #ffffff;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-danger {[m
[32m+[m[32m  color: #ffffff;[m
[32m+[m[32m  background-color: #d9534f;[m
[32m+[m[32m  border-color: #d43f3a;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-danger:focus,[m
[32m+[m[32m.btn-danger.focus {[m
[32m+[m[32m  color: #ffffff;[m
[32m+[m[32m  background-color: #c9302c;[m
[32m+[m[32m  border-color: #761c19;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-danger:hover {[m
[32m+[m[32m  color: #ffffff;[m
[32m+[m[32m  background-color: #c9302c;[m
[32m+[m[32m  border-color: #ac2925;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-danger:active,[m
[32m+[m[32m.btn-danger.active,[m
[32m+[m[32m.open > .dropdown-toggle.btn-danger {[m
[32m+[m[32m  color: #ffffff;[m
[32m+[m[32m  background-color: #c9302c;[m
[32m+[m[32m  border-color: #ac2925;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-danger:active:hover,[m
[32m+[m[32m.btn-danger.active:hover,[m
[32m+[m[32m.open > .dropdown-toggle.btn-danger:hover,[m
[32m+[m[32m.btn-danger:active:focus,[m
[32m+[m[32m.btn-danger.active:focus,[m
[32m+[m[32m.open > .dropdown-toggle.btn-danger:focus,[m
[32m+[m[32m.btn-danger:active.focus,[m
[32m+[m[32m.btn-danger.active.focus,[m
[32m+[m[32m.open > .dropdown-toggle.btn-danger.focus {[m
[32m+[m[32m  color: #ffffff;[m
[32m+[m[32m  background-color: #ac2925;[m
[32m+[m[32m  border-color: #761c19;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-danger:active,[m
[32m+[m[32m.btn-danger.active,[m
[32m+[m[32m.open > .dropdown-toggle.btn-danger {[m
[32m+[m[32m  background-image: none;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-danger.disabled:hover,[m
[32m+[m[32m.btn-danger[disabled]:hover,[m
[32m+[m[32mfieldset[disabled] .btn-danger:hover,[m
[32m+[m[32m.btn-danger.disabled:focus,[m
[32m+[m[32m.btn-danger[disabled]:focus,[m
[32m+[m[32mfieldset[disabled] .btn-danger:focus,[m
[32m+[m[32m.btn-danger.disabled.focus,[m
[32m+[m[32m.btn-danger[disabled].focus,[m
[32m+[m[32mfieldset[disabled] .btn-danger.focus {[m
[32m+[m[32m  background-color: #d9534f;[m
[32m+[m[32m  border-color: #d43f3a;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-danger .badge {[m
[32m+[m[32m  color: #d9534f;[m
[32m+[m[32m  background-color: #ffffff;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-link {[m
[32m+[m[32m  color: #337ab7;[m
[32m+[m[32m  font-weight: normal;[m
[32m+[m[32m  border-radius: 0;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-link,[m
[32m+[m[32m.btn-link:active,[m
[32m+[m[32m.btn-link.active,[m
[32m+[m[32m.btn-link[disabled],[m
[32m+[m[32mfieldset[disabled] .btn-link {[m
[32m+[m[32m  background-color: transparent;[m
[32m+[m[32m  -webkit-box-shadow: none;[m
[32m+[m[32m  box-shadow: none;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-link,[m
[32m+[m[32m.btn-link:hover,[m
[32m+[m[32m.btn-link:focus,[m
[32m+[m[32m.btn-link:active {[m
[32m+[m[32m  border-color: transparent;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-link:hover,[m
[32m+[m[32m.btn-link:focus {[m
[32m+[m[32m  color: #23527c;[m
[32m+[m[32m  text-decoration: underline;[m
[32m+[m[32m  background-color: transparent;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-link[disabled]:hover,[m
[32m+[m[32mfieldset[disabled] .btn-link:hover,[m
[32m+[m[32m.btn-link[disabled]:focus,[m
[32m+[m[32mfieldset[disabled] .btn-link:focus {[m
[32m+[m[32m  color: #777777;[m
[32m+[m[32m  text-decoration: none;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-lg,[m
[32m+[m[32m.btn-group-lg > .btn {[m
[32m+[m[32m  padding: 10px 16px;[m
[32m+[m[32m  font-size: 18px;[m
[32m+[m[32m  line-height: 1.3333333;[m
[32m+[m[32m  border-radius: 6px;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-sm,[m
[32m+[m[32m.btn-group-sm > .btn {[m
[32m+[m[32m  padding: 5px 10px;[m
[32m+[m[32m  font-size: 12px;[m
[32m+[m[32m  line-height: 1.5;[m
[32m+[m[32m  border-radius: 3px;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-xs,[m
[32m+[m[32m.btn-group-xs > .btn {[m
[32m+[m[32m  padding: 1px 5px;[m
[32m+[m[32m  font-size: 12px;[m
[32m+[m[32m  line-height: 1.5;[m
[32m+[m[32m  border-radius: 3px;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-block {[m
[32m+[m[32m  display: block;[m
[32m+[m[32m  width: 100%;[m
[32m+[m[32m}[m
[32m+[m[32m.btn-block + .btn-block {[m
[32m+[m[32m  margin-top: 5px;[m
[32m+[m[32m}[m
[32m+[m[32minput[type="submit"].btn-block,[m
[32m+[m[32minput[type="reset"].btn-block,[m
[32m+[m[32minput[type="button"].btn-block {[m
[32m+[m[32m  width: 100%;[m
[32m+[m[32m}[m
\ No newline at end of file[m
[1mdiff --git a/css/upload-cropbox.css b/css/upload-cropbox.css[m
[1mnew file mode 100644[m
[1mindex 0000000000..f8500935aa[m
[1m--- /dev/null[m
[1m+++ b/css/upload-cropbox.css[m
[36m@@ -0,0 +1,62 @@[m
[32m+[m[32m.roo-upload-cropbox-selector {[m
[32m+[m[32m  visibility: hidden;[m
[32m+[m[32m  height: 0px;[m
[32m+[m[32m}[m
[32m+[m[32m.roo-upload-cropbox-dialog .modal-header,[m
[32m+[m[32m.roo-upload-cropbox-dialog .modal-footer {[m
[32m+[m[32m  padding-top: 5px;[m
[32m+[m[32m  padding-bottom: 5px;[m
[32m+[m[32m}[m
[32m+[m[32m.roo-upload-cropbox-body {[m
[32m+[m[32m  background-color: #ffffff;[m
[32m+[m[32m  border: 1px solid #777777;[m
[32m+[m[32m  width: 100%;[m
[32m+[m[32m  height: 450px;[m
[32m+[m[32m  max-height: 450px;[m
[32m+[m[32m  position: relative;[m
[32m+[m[32m  overflow: hidden;[m
[32m+[m[32m  cursor: move;[m
[32m+[m[32m}[m
[32m+[m[32m.roo-upload-cropbox-preview {[m
[32m+[m[32m  position: absolute;[m
[32m+[m[32m  top: 0px;[m
[32m+[m[32m  left: 0px;[m
[32m+[m[32m  text-align: center;[m
[32m+[m[32m  margin: 0px;[m
[32m+[m[32m  padding: 0px;[m
[32m+[m[32m  border: none;[m
[32m+[m[32m}[m
[32m+[m[32m.roo-upload-cropbox-body .roo-upload-cropbox-thumb {[m
[32m+[m[32m  position: absolute;[m
[32m+[m[32m  /*    top: 50%;[m
[32m+[m[32m    left: 50%;[m
[32m+[m[32m    transform: translate(-50%, -50%);*/[m
[32m+[m[32m  box-sizing: border-box;[m
[32m+[m[32m  border: 1px solid #777777;[m
[32m+[m[32m  box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0.5);[m
[32m+[m[32m  background: none repeat scroll 0% 0% transparent;[m
[32m+[m[32m}[m
[32m+[m[32m.roo-upload-cropbox-body .roo-upload-cropbox-empty-notify {[m
[32m+[m[32m  height: 100%;[m
[32m+[m[32m  background-color: rgba(0, 0, 0, 0.5);[m
[32m+[m[32m  color: #ffffff;[m
[32m+[m[32m  font-weight: bold;[m
[32m+[m[32m  font-size: 24px;[m
[32m+[m[32m  text-align: center;[m
[32m+[m[32m  padding-top: 50px;[m
[32m+[m[32m  font-style: italic;[m
[32m+[m[32m}[m
[32m+[m[32m.roo-upload-cropbox-btn-group button {[m
[32m+[m[32m  background-color: #000000;[m
[32m+[m[32m  color: #ffffff;[m
[32m+[m[32m  border-color: #333333;[m
[32m+[m[32m}[m
[32m+[m[32m.roo-upload-cropbox-error-notify {[m
[32m+[m[32m  border-radius: 0px;[m
[32m+[m[32m  text-align: center;[m
[32m+[m[32m  padding: 0px !important;[m
[32m+[m[32m  margin: 0px !important;[m
[32m+[m[32m  position: absolute;[m
[32m+[m[32m  top: 0;[m
[32m+[m[32m  left: 0;[m
[32m+[m[32m}[m
\ No newline at end of file[m
[1mdiff --git a/examples/dialog/hello.html b/examples/dialog/hello.html[m
[1mindex ab43ed9999..ec001bf313 100644[m
[1m--- a/examples/dialog/hello.html[m
[1m+++ b/examples/dialog/hello.html[m
[36m@@ -1,27 +1,27 @@[m
[31m-<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">[m
[31m-<html>[m
[31m-<head>[m
[31m-<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">[m
[31m-<title>Hello World Dialog Example</title>[m
[32m+[m[32m<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">[m
[32m+[m[32m<html>[m
[32m+[m[32m<head>[m
[32m+[m[32m<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">[m
[32m+[m[32m<title>Hello World Dialog Example</title>[m
  <link rel="stylesheet" type="text/css" href="../../css/roojs-debug.css"/>[m
     <link rel="stylesheet" type="text/css" href="../../css/xtheme-slate.css"/>[m
 [m
      <script type="text/javascript" src="../../roojs-debug.js"></script>   [m
[31m-  [m
[31m-     <script language="javascript" src="hello.js"></script>[m
[31m- [m
[31m-<!-- Common Styles for the examples -->[m
[31m-<link rel="stylesheet" type="text/css" href="../examples.css" />[m
[31m-</head>[m
[31m-<body>[m
[31m-<script type="text/javascript" src="../examples.js"></script><!-- EXAMPLES -->[m
[31m-[m
[31m-<h1>Hello World Dialog</h1>[m
[31m-<p>This example shows how to create a very simple modal BasicDialog with "autoTabs".</p>[m
[31m-<input type="button" id="show-dialog-btn" value="Hello World" /><br /><br />[m
[32m+[m[41m  [m
[32m+[m[32m     <script language="javascript" src="hello.js"></script>[m
[32m+[m[41m [m
[32m+[m[32m<!-- Common Styles for the examples -->[m
[32m+[m[32m<link rel="stylesheet" type="text/css" href="../examples.css" />[m
[32m+[m[32m</head>[m
[32m+[m[32m<body>[m
[32m+[m[32m<script type="text/javascript" src="../examples.js"></script><!-- EXAMPLES -->[m
[32m+[m
[32m+[m[32m<h1>Hello World Dialog</h1>[m
[32m+[m[32m<p>This example shows how to create a very simple modal BasicDialog with "autoTabs".</p>[m
[32m+[m[32m<input type="button" id="show-dialog-btn" value="Hello World" /><br /><br />[m
 <p>Note that the js is not minified so it is readable. See [m
[31m-<button type="button" onclick="RooDocs.viewSource.show('/hello.js')">hello.js</button>for the full source code.</p>[m
[31m-Here's snapshot of the code that creates the dialog:[m
[32m+[m[32m<button type="button" onclick="RooDocs.viewSource.show('/hello.js')">hello.js</button>for the full source code.</p>[m
[32m+[m[32mHere's snapshot of the code that creates the dialog:[m
 <pre class="code"><code>Roo.BLANK_IMAGE_URL  = "../../images/default/s.gif";[m
 [m
 [m
[36m@@ -121,29 +121,29 @@[m [mRoo.onReady(function() {[m
     Roo.get('show-dialog-btn').on('click',function () {[m
         HelloWorld.show({ _el : this});[m
     });[m
[31m-});[m
[31m-</code></pre>[m
[31m-[m
[31m-    <!-- The dialog is created from existing markup.[m
[31m-         The inline styles just hide it until it created and should be in a stylesheet -->[m
[31m-    <div id="hello-dlg" style="visibility:hidden;position:absolute;top:0px;">[m
[31m-    <div class="x-dlg-hd">Hello Dialog</div>[m
[31m-    <div class="x-dlg-bd">[m
[31m-        <!-- Auto create tab 1 -->[m
[31m-        <div class="x-dlg-tab" title="Hello World 1">[m
[31m-            <!-- Nested "inner-tab" to safely add padding -->[m
[31m-            <div class="inner-tab">[m
[31m-                 Hello...<br><br><br>[m
[31m-            </div>[m
[31m-        </div>[m
[31m-        <!-- Auto create tab 2 -->[m
[31m-        <div class="x-dlg-tab" title="Hello World 2">[m
[31m-            <div class="inner-tab">[m
[31m-            ... World![m
[31m-            </div>[m
[31m-        </div>[m
[31m-        </div>[m
[31m-    </div>[m
[31m-</div>[m
[31m-</body>[m
[31m-</html>[m
[32m+[m[32m});[m
[32m+[m[32m</code></pre>[m
[32m+[m
[32m+[m[32m    <!-- The dialog is created from existing markup.[m
[32m+[m[32m         The inline styles just hide it until it created and should be in a stylesheet -->[m
[32m+[m[32m    <div id="hello-dlg" style="visibility:hidden;position:absolute;top:0px;">[m
[32m+[m[32m    <div class="x-dlg-hd">Hello Dialog</div>[m
[32m+[m[32m    <div class="x-dlg-bd">[m
[32m+[m[32m        <!-- Auto create tab 1 -->[m
[32m+[m[32m        <div class="x-dlg-tab" title="Hello World 1">[m
[32m+[m[32m            <!-- Nested "inner-tab" to safely add padding -->[m
[32m+[m[32m            <div class="inner-tab">[m
[32m+[m[32m                 Hello...<br><br><br>[m
[32m+[m[32m            </div>[m
[32m+[m[32m        </div>[m
[32m+[m[32m        <!-- Auto create tab 2 -->[m
[32m+[m[32m        <div class="x-dlg-tab" title="Hello World 2">[m
[32m+[m[32m            <div class="inner-tab">[m
[32m+[m[32m            ... World![m
[32m+[m[32m            </div>[m
[32m+[m[32m        </div>[m
[32m+[m[32m        </div>[m
[32m+[m[32m    </div>[m
[32m+[m[32m</div>[m
[32m+[m[32m</body>[m
[32m+[m[32m</html>[m
[1mdiff --git a/examples/dialog/test-2.html b/examples/dialog/test-2.html[m
[1mnew file mode 100644[m
[1mindex 0000000000..e26d6ee586[m
[1m--- /dev/null[m
[1m+++ b/examples/dialog/test-2.html[m
[36m@@ -0,0 +1,30 @@[m
[32m+[m[32m<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">[m
[32m+[m[32m<html>[m
[32m+[m[32m<head>[m
[32m+[m[32m    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">[m
[32m+[m[32m    <title>Upload Cropbox Dialog Example</title>[m
[32m+[m
[32m+[m[32m    <link rel="stylesheet" type="text/css" href="../../css/roojs-debug.css"/>[m
[32m+[m[32m    <link rel="stylesheet" type="text/css" href="../../css-bootstrap/font-awesome.css"/>[m
[32m+[m[32m    <link rel="stylesheet" type="text/css" href="../../css/upload-cropbox.css"/>[m
[32m+[m[32m    <link rel="stylesheet" type="text/css" href="../../css/alert.css"/>[m
[32m+[m[32m    <link rel="stylesheet" type="text/css" href="../../css/buttons.css"/>[m
[32m+[m[32m    <link rel="stylesheet" type="text/css" href="../../css/button-groups.css"/>[m
[32m+[m[32m    <link rel="stylesheet" type="text/css" href="../examples.css" />[m
[32m+[m
[32m+[m[32m     <script type="text/javascript" src="../../roojs-debug.js"></script>[m[41m   [m
[32m+[m[32m     <script language="javascript" src="test-2.js"></script>[m
[32m+[m[32m     <script type="text/javascript" src="../examples.js"></script>[m
[32m+[m
[32m+[m[32m</head>[m
[32m+[m[32m<body>[m
[32m+[m
[32m+[m[32m<h1>Upload Cropbox Dialog</h1>[m
[32m+[m[32m<p>This example shows how to create a very simple BasicDialog with "UploadCropbox".</p>[m
[32m+[m[32m<input type="button" id="show-dialog-btn" value="test" /><br /><br />[m
[32m+[m[32m<p>Note that the js is not minified so it is readable. See[m[41m [m
[32m+[m[32m<button type="button" onclick="RooDocs.viewSource.show('../../../Roo/dialog/UploadCropbox.js')">UploadCropbox.js</button>for the full source code.</p>[m
[32m+[m
[32m+[m[32m</div>[m
[32m+[m[32m</body>[m
[32m+[m[32m</html>[m
[1mdiff --git a/examples/dialog/test-2.js b/examples/dialog/test-2.js[m
[1mnew file mode 100644[m
[1mindex 0000000000..c4dcdedd7e[m
[1m--- /dev/null[m
[1m+++ b/examples/dialog/test-2.js[m
[36m@@ -0,0 +1,171 @@[m
[32m+[m[32mvar uploadCropbox = {[m
[32m+[m[32m    dialog : false,[m
[32m+[m[32m    callback : false,[m
[32m+[m
[32m+[m[32m    show : function(data, cb)[m
[32m+[m[32m    {[m
[32m+[m[32m        if (!this.dialog) {[m
[32m+[m[32m            this.create();[m
[32m+[m[32m        }[m
[32m+[m
[32m+[m[32m        this.callback = cb;[m
[32m+[m[32m        this.data = data;[m
[32m+[m[32m        this.dialog.show();[m
[32m+[m[32m    },[m
[32m+[m
[32m+[m[32m    create : function()[m
[32m+[m[32m    {[m
[32m+[m[32m        var _this = this;[m
[32m+[m[32m        this.dialog = Roo.factory({[m
[32m+[m[32m            xns : Roo,[m
[32m+[m[32m            xtype : 'LayoutDialog',[m
[32m+[m[32m            width : 800,[m
[32m+[m[32m            height : 600,[m
[32m+[m[32m            center : {[m
[32m+[m[32m                xns : Roo,[m
[32m+[m[32m                xtype : 'LayoutRegion'[m
[32m+[m[32m            },[m
[32m+[m[32m            items : [[m
[32m+[m[32m                {[m
[32m+[m[32m                    xtype: 'ContentPanel',[m
[32m+[m[32m                    xns: Roo,[m
[32m+[m[32m                    region : "center",[m
[32m+[m[32m                    items : [[m
[32m+[m[32m                        {[m
[32m+[m[32m                            xtype : 'UploadCropbox',[m
[32m+[m[32m                            xns : Roo.dialog,[m
[32m+[m[32m                            minWidth : 720,[m
[32m+[m[32m                            minHeight: 480,[m
[32m+[m[32m                            buttons: [],[m
[32m+[m[32m                            listeners : {[m
[32m+[m[32m                                render : function (_self)[m
[32m+[m[32m                                {[m
[32m+[m[32m                                    _this.cropbox = _self;[m
[32m+[m[32m                                },[m
[32m+[m[32m                                loadcanvas : function (_self, imageEl)[m
[32m+[m[32m                                {[m
[32m+[m[32m                                    if(imageEl.OriginWidth < 720) {[m
[32m+[m[32m                                        Roo.Msg.show({[m
[32m+[m[32m                                            title: 'Error',[m
[32m+[m[32m                                            msg: "Image width should be at least 720",[m
[32m+[m[32m                                            buttons: {ok : true},[m
[32m+[m[32m                                            fn: function(res) {[m
[32m+[m[32m                                                _this.cropbox.selectorEl.dom.click();[m
[32m+[m[32m                                            }[m
[32m+[m[32m                                        });[m
[32m+[m[32m                                        return false;[m
[32m+[m[32m                                    }[m
[32m+[m[32m                                }[m
[32m+[m[32m                            }[m
[32m+[m[32m                        }[m
[32m+[m[32m                    ][m
[32m+[m[32m                }[m
[32m+[m[32m            ],[m
[32m+[m[32m            buttons : [[m
[32m+[m[32m                {[m
[32m+[m[32m                    xtype : 'Button',[m
[32m+[m[32m                    xns : Roo,[m
[32m+[m[32m                    text : 'Save',[m
[32m+[m[32m                    listeners : {[m
[32m+[m[32m                        click : function () {[m
[32m+[m[32m                        }[m[41m   [m
[32m+[m[32m                    }[m
[32m+[m[32m                },[m
[32m+[m[32m                {[m
[32m+[m[32m                    xtype : 'Button',[m
[32m+[m[32m                    xns : Roo,[m
[32m+[m[32m                    text : 'Cancel',[m
[32m+[m[32m                    listeners : {[m
[32m+[m[32m                        click : function () {[m
[32m+[m[32m                            _this.dialog.hide()[m
[32m+[m[32m                        }[m[41m   [m
[32m+[m[32m                    }[m
[32m+[m[32m                }[m
[32m+[m[32m            ][m
[32m+[m[32m        });[m
[32m+[m[32m    }[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32mvar test = {[m
[32m+[m
[32m+[m[32m    dialog : false,[m
[32m+[m[32m    callback : false,[m
[32m+[m
[32m+[m[32m    show : function(data, cb)[m
[32m+[m[32m    {[m
[32m+[m[32m        if (!this.dialog) {[m
[32m+[m[32m            this.create();[m
[32m+[m[32m        }[m
[32m+[m
[32m+[m[32m        this.callback = cb;[m
[32m+[m[32m        this.data = data;[m
[32m+[m[32m        this.dialog.show();[m
[32m+[m[32m    },[m
[32m+[m
[32m+[m[32m    create : function()[m
[32m+[m[32m    {[m
[32m+[m[32m        var _this = this;[m
[32m+[m[32m        this.dialog = Roo.factory({[m
[32m+[m[32m            xns : Roo,[m
[32m+[m[32m            xtype : 'LayoutDialog',[m
[32m+[m[32m            width : 600,[m
[32m+[m[32m            height : 450,[m
[32m+[m[32m            center : {[m
[32m+[m[32m                xns : Roo,[m
[32m+[m[32m                xtype : 'LayoutRegion'[m
[32m+[m[32m            },[m
[32m+[m[32m            items : [[m
[32m+[m[32m                {[m
[32m+[m[32m                    xns : Roo,[m
[32m+[m[32m                    xtype: 'GridPanel',[m
[32m+[m[32m                    region : "center",[m
[32m+[m[32m                    grid : {[m
[32m+[m[32m                        xns : Roo.grid,[m
[32m+[m[32m                        xtype : 'Grid',[m
[32m+[m[32m                        cm : [[m
[32m+[m[32m                            {[m
[32m+[m[32m                                xns : Roo.grid,[m
[32m+[m[32m                                xtype : 'ColumnModel',[m
[32m+[m[32m                                header : 'test'[m
[32m+[m[32m                            }[m
[32m+[m[32m                        ],[m
[32m+[m[32m                        ds : {[m
[32m+[m[32m                            xns: Roo.data,[m
[32m+[m[32m                            xtype: 'Store'[m
[32m+[m[32m                        },[m
[32m+[m[32m                        toolbar : {[m
[32m+[m[32m                            xns: Roo,[m
[32m+[m[32m                            xtype: 'Toolbar',[m
[32m+[m[32m                            items : [[m
[32m+[m[32m                                {[m[41m [m
[32m+[m[32m                                    xtype : 'Button',[m
[32m+[m[32m                                    text : 'Add',[m
[32m+[m[32m                                    listeners : {[m
[32m+[m[32m                                        click : function () {[m
[32m+[m[32m                                            uploadCropbox.show();[m
[32m+[m[32m                                            document.body.onfocus = function(e) {[m
[32m+[m[32m                                                document.body.onfocus = null;[m
[32m+[m[32m                                                if(!uploadCropbox.cropbox.selectorEl.dom.files.length) {[m
[32m+[m[32m                                                    uploadCropbox.dialog.hide();[m
[32m+[m[32m                                                }[m
[32m+[m[32m                                            }[m
[32m+[m[32m                                            uploadCropbox.cropbox.selectorEl.dom.click();[m
[32m+[m[32m                                        }[m
[32m+[m[32m                                    }[m
[32m+[m[32m                                }[m
[32m+[m[32m                            ][m
[32m+[m[32m                        }[m
[32m+[m[32m                    }[m
[32m+[m[32m                }[m
[32m+[m[32m            ],[m
[32m+[m[32m        });[m
[32m+[m[32m    }[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32mRoo.onReady(function() {[m
[32m+[m[41m    [m
[32m+[m[32m    Roo.get('show-dialog-btn').on('click',function () {[m
[32m+[m[32m        test.show({});[m
[32m+[m[32m        console.log(test);[m
[32m+[m[32m    });[m
[32m+[m[32m});[m
\ No newline at end of file[m
[1mdiff --git a/examples/dialog/test.html b/examples/dialog/test.html[m
[1mnew file mode 100644[m
[1mindex 0000000000..ecb2a0afa3[m
[1m--- /dev/null[m
[1m+++ b/examples/dialog/test.html[m
[36m@@ -0,0 +1,29 @@[m
[32m+[m[32m<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">[m
[32m+[m[32m<html>[m
[32m+[m[32m<head>[m
[32m+[m[32m    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">[m
[32m+[m[32m    <title>Upload Cropbox Dialog Example</title>[m
[32m+[m
[32m+[m[32m    <link rel="stylesheet" type="text/css" href="../../css/roojs-debug.css"/>[m
[32m+[m[32m    <link rel="stylesheet" type="text/css" href="../../css-bootstrap/bootstrap.css"/>[m
[32m+[m[32m    <link rel="stylesheet" type="text/css" href="../../css-bootstrap/font-awesome.css"/>[m
[32m+[m[32m    <link rel="stylesheet" type="text/css" href="../../css-bootstrap/roojs-bootstrap-debug.css"/>[m
[32m+[m[32m    <link rel="stylesheet" type="text/css" href="../examples.css" />[m
[32m+[m
[32m+[m[32m     <script type="text/javascript" src="../../roojs-debug.js"></script>[m[41m   [m
[32m+[m[32m     <script type="text/javascript" src="../../roojs-bootstrap-debug.js"></script>[m[41m [m
[32m+[m[32m     <script language="javascript" src="test.js"></script>[m
[32m+[m[32m     <script type="text/javascript" src="../examples.js"></script>[m
[32m+[m
[32m+[m[32m</head>[m
[32m+[m[32m<body>[m
[32m+[m
[32m+[m[32m<h1>Upload Cropbox Bootstrap</h1>[m
[32m+[m[32m<p>This example shows how to create a very simple modal BasicDialog with "autoTabs".</p>[m
[32m+[m[32m<input type="button" id="show-dialog-btn" value="test" /><br /><br />[m
[32m+[m[32m<p>Note that the js is not minified so it is readable. See[m[41m [m
[32m+[m[32m<button type="button" onclick="RooDocs.viewSource.show('../../../Roo/bootstrap/UploadCropbox.js')">test.js</button>for the full source code.</p>[m
[32m+[m
[32m+[m[32m</div>[m
[32m+[m[32m</body>[m
[32m+[m[32m</html>[m
[1mdiff --git a/examples/dialog/test.js b/examples/dialog/test.js[m
[1mnew file mode 100644[m
[1mindex 0000000000..f08db909f3[m
[1m--- /dev/null[m
[1m+++ b/examples/dialog/test.js[m
[36m@@ -0,0 +1,94 @@[m
[32m+[m[32mvar test = {[m
[32m+[m
[32m+[m[32m    dialog : false,[m
[32m+[m[32m    callback : false,[m
[32m+[m
[32m+[m[32m    show : function(data, cb)[m
[32m+[m[32m    {[m
[32m+[m[32m        if (!this.dialog) {[m
[32m+[m[32m            this.create();[m
[32m+[m[32m        }[m
[32m+[m
[32m+[m[32m        this.callback = cb;[m
[32m+[m[32m        this.data = data;[m
[32m+[m[32m        this.dialog.show();[m
[32m+[m[32m    },[m
[32m+[m
[32m+[m[32m    create : function()[m
[32m+[m[32m    {[m
[32m+[m[32m        var _this = this;[m
[32m+[m[32m        this.dialog = Roo.factory({[m
[32m+[m[32m            xtype : 'Modal',[m
[32m+[m[32m            xns : Roo.bootstrap,[m
[32m+[m[32m            title : 'Upload an Image',[m
[32m+[m[32m            buttons : Roo.bootstrap.Modal.OKCANCEL,[m
[32m+[m[32m            items: [[m
[32m+[m[32m                {[m
[32m+[m[32m                    xtype : 'Row',[m
[32m+[m[32m                    xns : Roo.bootstrap,[m
[32m+[m[32m                    items: [[m
[32m+[m[32m                        {[m
[32m+[m[32m                            xtype : 'Column',[m
[32m+[m[32m                            xns : Roo.bootstrap,[m
[32m+[m[32m                            items: [[m
[32m+[m[32m                                {[m
[32m+[m[32m                                    xtype : 'UploadCropbox',[m
[32m+[m[32m                                    xns : Roo.bootstrap,[m
[32m+[m[32m                                    minWidth : 720,[m
[32m+[m[32m                                    minHeight: 480,[m
[32m+[m[32m                                    listeners : {[m
[32m+[m[32m                                        arrange : function (_self, formData)[m
[32m+[m[32m                                        {[m
[32m+[m[32m                                            console.log("ARRANGE");[m
[32m+[m[32m                                            console.log(formData);[m
[32m+[m[32m                                        },[m
[32m+[m[32m                                        crop : function (_self, data)[m
[32m+[m[32m                                        {[m
[32m+[m[32m                                            console.log("CROP");[m
[32m+[m[32m                                            console.log(data);[m
[32m+[m[32m                                        },[m
[32m+[m[32m                                        resize : function (_self)[m
[32m+[m[32m                                        {[m
[32m+[m[32m                                            console.log("RESIZE");[m
[32m+[m[32m                                        },[m
[32m+[m[32m                                        rotate : function (_self)[m
[32m+[m[32m                                        {[m
[32m+[m[32m                                            console.log("ROTATE");[m
[32m+[m[32m                                        },[m
[32m+[m[32m                                        render : function (_self)[m
[32m+[m[32m                                        {[m
[32m+[m[32m                                            console.log("RENDER");[m
[32m+[m[32m                                            console.log(_self);[m
[32m+[m[32m                                            _this.cropbox = _self;[m
[32m+[m[32m                                        }[m
[32m+[m[41m                        [m
[32m+[m[32m                                    }[m
[32m+[m[32m                                }[m
[32m+[m[32m                            ][m
[32m+[m[32m                        }[m
[32m+[m[32m                    ][m
[32m+[m[32m                }[m
[32m+[m[32m            ],[m
[32m+[m[32m            listeners : {[m
[32m+[m[32m                btnclick : function (e)[m
[32m+[m[32m                {[m
[32m+[m[32m                    console.log(e);[m
[32m+[m[32m                    if(e == 'cancel') {[m
[32m+[m[32m                        _this.dialog.hide();[m
[32m+[m[32m                        return;[m
[32m+[m[32m                    }[m
[32m+[m
[32m+[m[32m                    _this.cropbox.crop();[m
[32m+[m[32m                }[m
[32m+[m[32m            }[m
[32m+[m[32m        });[m
[32m+[m[32m    }[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32mRoo.onReady(function() {[m
[32m+[m[41m    [m
[32m+[m[32m    Roo.get('show-dialog-btn').on('click',function () {[m
[32m+[m[32m        test.show({});[m
[32m+[m[32m        console.log(test);[m
[32m+[m[32m    });[m
[32m+[m[32m});[m
\ No newline at end of file[m
[1mdiff --git a/roojs-all.js b/roojs-all.js[m
[1mindex 9d9fc1f28f..f98434e789 100644[m
[1m--- a/roojs-all.js[m
[1m+++ b/roojs-all.js[m
[36m@@ -2544,9 +2544,9 @@[m [mreturn this.el.getUpdateManager();},_handleRefresh:function(A,B,C){if(!C||!this.[m
 te.setWidth(A);}if(this.adjustments){A+=this.adjustments[0];B+=this.adjustments[1];}return {"width":A,"height":B};},setSize:function(A,B){if(this.fitToFrame&&!this.ignoreResize(A,B)){if(this.fitContainer&&this.resizeEl!=this.el){this.el.setSize(A,B);}var C=this.adjustForComponents(A,B);[m
 this.resizeEl.setSize(this.autoWidth?"auto":C.width,this.autoHeight?"auto":C.height);this.fireEvent('resize',this,C.width,C.height);}},getTitle:function(){return this.title;},setTitle:function(A){this.title=A;if(this.region){this.region.updatePanelTitle(this,A);[m
 }},isClosable:function(){return this.closable;},beforeSlide:function(){this.el.clip();this.resizeEl.clip();},afterSlide:function(){this.el.unclip();this.resizeEl.unclip();},refresh:function(){if(this.refreshDelegate){this.loaded=false;this.refreshDelegate();[m
[31m-}},destroy:function(){this.el.removeAllListeners();var A=document.createElement("span");A.appendChild(this.el.dom);A.innerHTML="";this.el.remove();this.el=null;},form:false,view:false,addxtype:function(A){if(A.xtype.match(/^Form$/)){var el;el=this.el.createChild();[m
[31m-this.form=new Roo.form.Form(A);if(this.form.allItems.length){this.form.render(el.dom);}return this.form;}if(['View','JsonView','DatePicker'].indexOf(A.xtype)>-1){A.el=this.el.appendChild(document.createElement("div"));var B=new Roo.factory(A);B.render&&B.render(false,'');[m
[31m-this.view=B;return B;}return false;}});[m
[32m+[m[32m}},destroy:function(){this.el.removeAllListeners();var A=document.createElement("span");A.appendChild(this.el.dom);A.innerHTML="";this.el.remove();this.el=null;},form:false,view:false,addxtype:function(A){if(A.xtype.match(/^UploadCropbox$/)){this.cropbox=new Roo.factory(A);[m
[32m+[m[32mthis.cropbox.render(this.el);return this.cropbox;}if(A.xtype.match(/^Form$/)){var el;el=this.el.createChild();this.form=new Roo.form.Form(A);if(this.form.allItems.length){this.form.render(el.dom);}return this.form;}if(['View','JsonView','DatePicker'].indexOf(A.xtype)>-1){A.el=this.el.appendChild(document.createElement("div"));[m
[32m+[m[32mvar B=new Roo.factory(A);B.render&&B.render(false,'');this.view=B;return B;}return false;}});[m
 // Roo/GridPanel.js[m
 Roo.GridPanel=function(A,B){if(typeof(A.grid)!='undefined'){B=A;A=B.grid;}this.wrapper=Roo.DomHelper.append(document.body,{tag:"div",cls:"x-layout-grid-wrapper x-layout-inactive-content"},true);this.wrapper.dom.appendChild(A.getGridEl().dom);Roo.GridPanel.superclass.constructor.call(this,this.wrapper,B);[m
 if(this.toolbar){this.toolbar.el.insertBefore(this.wrapper.dom.firstChild);}if(this.footer&&!this.footer.el&&this.footer.xtype){this.footer.container=this.grid.getView().getFooterPanel(true);this.footer.dataSource=this.grid.dataSource;this.footer=Roo.factory(this.footer,Roo);[m
[36m@@ -2875,3 +2875,103 @@[m [mF.push("(typeof("+G+") == 'undefined')");});var H='(('+F.join(" || ")+") ? undef[m
 }return "'"+A+H+C+")"+A+"'";};var B;if(Roo.isGecko){B="tpl.compiled = function(values, parent){  with(values) { return '"+tpl.body.replace(/(\r\n|\n)/g,'\\n').replace(/'/g,"\\'").replace(this.re,fn)+"';};};";}else{B=["tpl.compiled = function(values, parent){  with (values) { return ['"];[m
 B.push(tpl.body.replace(/(\r\n|\n)/g,'\\n').replace(/'/g,"\\'").replace(this.re,fn));B.push("'].join('');};};");B=B.join('');}Roo.debug&&Roo.log(B.replace(/\\n/,'\n'));eval(B);return this;},applyTemplate:function(A){return this.master.compiled.call(this,A,{}[m
 );},apply:function(){return this.applyTemplate.apply(this,arguments);}});Roo.XTemplate.from=function(el){el=Roo.getDom(el);return new Roo.XTemplate(el.value||el.innerHTML);};[m
[32m+[m[32m// Roo/dialog/namespace.js[m
[32m+[m[32mRoo.dialog={};[m
[32m+[m[32m// Roo/dialog/UploadCropbox.js[m
[32m+[m[32mRoo.dialog.UploadCropbox=function(A){console.log("Dialog UploadCropbox Constructor");Roo.dialog.UploadCropbox.superclass.constructor.call(this,A);this.addEvents({"beforeselectfile":true,"initial":true,"crop":true,"prepare":true,"exception":true,"beforeloadcanvas":true,"trash":true,"download":true,"footerbuttonclick":true,"resize":true,"rotate":true,"inspect":true,"upload":true,"arrange":true,"loadcanvas":true}[m
[32m+[m[32m);this.buttons=this.buttons||Roo.dialog.UploadCropbox.footer.STANDARD;};Roo.extend(Roo.dialog.UploadCropbox,Roo.Component,{emptyText:'Click to upload image',rotateNotify:'Image is too small to rotate',errorTimeout:3000,scale:0,baseScale:1,rotate:0,dragable:false,pinching:false,mouseX:0,mouseY:0,cropData:false,minWidth:300,minHeight:300,file:false,exif:{}[m
[32m+[m[32m,baseRotate:1,cropType:'image/jpeg',buttons:false,canvasLoaded:false,isDocument:false,method:'POST',paramName:'imageUpload',loadMask:true,loadingText:'Loading...',maskEl:false,getAutoCreate:function(){var A={tag:'div',cls:'roo-upload-cropbox',cn:[{tag:'input',cls:'roo-upload-cropbox-selector',type:'file'}[m
[32m+[m[32m,{tag:'div',cls:'roo-upload-cropbox-body',style:'cursor:pointer',cn:[{tag:'div',cls:'roo-upload-cropbox-preview'},{tag:'div',cls:'roo-upload-cropbox-thumb'},{tag:'div',cls:'roo-upload-cropbox-empty-notify',html:this.emptyText},{tag:'div',cls:'roo-upload-cropbox-error-notify alert alert-danger',html:this.rotateNotify}[m
[32m+[m[32m]},{tag:'div',cls:'roo-upload-cropbox-footer',cn:{tag:'div',cls:'btn-group btn-group-justified roo-upload-cropbox-btn-group',cn:[]}}]};return A;},onRender:function(ct,A){console.log("On Render");console.log(this);Roo.dialog.UploadCropbox.superclass.onRender.call(this,ct,A);[m
[32m+[m[32mif(this.el){if(this.el.attr('xtype')){this.el.attr('xtypex',this.el.attr('xtype'));this.el.dom.removeAttribute('xtype');this.initEvents();}}else{var B=Roo.apply({},this.getAutoCreate());B.id=this.id||Roo.id();if(this.cls){B.cls=(typeof(B.cls)=='undefined'?this.cls:B.cls)+' '+this.cls;[m
[32m+[m[32m}if(this.style){B.style=(typeof(B.style)=='undefined'?this.style:B.style)+'; '+this.style;}this.el=ct.createChild(B,A);this.initEvents();}if(this.buttons.length){Roo.each(this.buttons,function(bb){var C=this.el.select('.roo-upload-cropbox-footer div.roo-upload-cropbox-btn-group').first().createChild(bb);[m
[32m+[m[32mC.on('click',this.onFooterButtonClick.createDelegate(this,[bb.action],true));},this);}if(this.loadMask){this.maskEl=this.el;}},initEvents:function(){this.urlAPI=(window.createObjectURL&&window)||(window.URL&&URL.revokeObjectURL&&URL)||(window.webkitURL&&webkitURL);[m
[32m+[m[32mthis.bodyEl=this.el.select('.roo-upload-cropbox-body',true).first();this.bodyEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay='block';this.selectorEl=this.el.select('.roo-upload-cropbox-selector',true).first();this.selectorEl.hide();this.previewEl=this.el.select('.roo-upload-cropbox-preview',true).first();[m
[32m+[m[32mthis.previewEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay='block';this.thumbEl=this.el.select('.roo-upload-cropbox-thumb',true).first();this.thumbEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay='block';this.thumbEl.hide();this.notifyEl=this.el.select('.roo-upload-cropbox-empty-notify',true).first();[m
[32m+[m[32mthis.notifyEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay='block';this.errorEl=this.el.select('.roo-upload-cropbox-error-notify',true).first();this.errorEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay='block';this.errorEl.hide();this.footerEl=this.el.select('.roo-upload-cropbox-footer',true).first();[m
[32m+[m[32mthis.footerEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay='block';this.footerEl.hide();this.setThumbBoxSize();this.bind();this.resize();this.fireEvent('initial',this);},bind:function(){var A=this;window.addEventListener("resize",function(){A.resize();[m
[32m+[m[32m});this.bodyEl.on('click',this.beforeSelectFile,this);if(Roo.isTouch){this.bodyEl.on('touchstart',this.onTouchStart,this);this.bodyEl.on('touchmove',this.onTouchMove,this);this.bodyEl.on('touchend',this.onTouchEnd,this);}if(!Roo.isTouch){this.bodyEl.on('mousedown',this.onMouseDown,this);[m
[32m+[m[32mthis.bodyEl.on('mousemove',this.onMouseMove,this);var B=(/Firefox/i.test(navigator.userAgent))?'DOMMouseScroll':'mousewheel';this.bodyEl.on(B,this.onMouseWheel,this);Roo.get(document).on('mouseup',this.onMouseUp,this);}this.selectorEl.on('change',this.onFileSelected,this);[m
[32m+[m[32m},reset:function(){this.scale=0;this.baseScale=1;this.rotate=0;this.baseRotate=1;this.dragable=false;this.pinching=false;this.mouseX=0;this.mouseY=0;this.cropData=false;this.notifyEl.dom.innerHTML=this.emptyText;},resize:function(){if(this.fireEvent('resize',this)!=false){this.setThumbBoxPosition();[m
[32m+[m[32mthis.setCanvasPosition();}},onFooterButtonClick:function(e,el,o,A){switch(A){case 'rotate-left':this.onRotateLeft(e);break;case 'rotate-right':this.onRotateRight(e);break;case 'picture':this.beforeSelectFile(e);break;case 'trash':this.trash(e);break;case 'crop':this.crop(e);[m
[32m+[m[32mbreak;case 'download':this.download(e);break;default:break;}this.fireEvent('footerbuttonclick',this,A);},beforeSelectFile:function(e){e.preventDefault();if(this.fireEvent('beforeselectfile',this)!=false){this.selectorEl.dom.click();}},onFileSelected:function(e){e.preventDefault();[m
[32m+[m[32mif(typeof(this.selectorEl.dom.files)=='undefined'||!this.selectorEl.dom.files.length){return;}var A=this.selectorEl.dom.files[0];if(this.fireEvent('inspect',this,A)!=false){this.prepare(A);}},trash:function(e){this.fireEvent('trash',this);},download:function(e){this.fireEvent('download',this);[m
[32m+[m[32m},loadCanvas:function(A){if(this.fireEvent('beforeloadcanvas',this,A)!=false){this.reset();this.imageEl=document.createElement('img');var B=this;this.imageEl.addEventListener("load",function(){B.onLoadCanvas();});this.imageEl.src=A;}},onLoadCanvas:function(){this.imageEl.OriginWidth=this.imageEl.naturalWidth||this.imageEl.width;[m
[32m+[m[32mthis.imageEl.OriginHeight=this.imageEl.naturalHeight||this.imageEl.height;if(this.fireEvent('loadcanvas',this,this.imageEl)!=false){this.bodyEl.un('click',this.beforeSelectFile,this);this.notifyEl.hide();this.thumbEl.show();this.footerEl.show();this.baseRotateLevel();[m
[32m+[m[32mif(this.isDocument){this.setThumbBoxSize();}this.setThumbBoxPosition();this.baseScaleLevel();this.draw();this.resize();this.canvasLoaded=true;}if(this.loadMask){this.maskEl.unmask();}},setCanvasPosition:function(){if(!this.canvasEl){return;}var pw=Math.ceil((this.bodyEl.getWidth()-this.canvasEl.width)/2);[m
[32m+[m[32mvar ph=Math.ceil((this.bodyEl.getHeight()-this.canvasEl.height)/2);this.previewEl.setLeft(pw);this.previewEl.setTop(ph);},onMouseDown:function(e){e.stopEvent();this.dragable=true;this.pinching=false;if(this.isDocument&&(this.canvasEl.width<this.thumbEl.getWidth()||this.canvasEl.height<this.thumbEl.getHeight())){this.dragable=false;[m
[32m+[m[32mreturn;}this.mouseX=Roo.isTouch?e.browserEvent.touches[0].pageX:e.getPageX();this.mouseY=Roo.isTouch?e.browserEvent.touches[0].pageY:e.getPageY();},onMouseMove:function(e){e.stopEvent();if(!this.canvasLoaded){return;}if(!this.dragable){return;}var A=Math.ceil(this.thumbEl.getLeft(true));[m
[32m+[m[32mvar B=Math.ceil(this.thumbEl.getTop(true));var C=Math.ceil(A+this.thumbEl.getWidth()-this.canvasEl.width);var D=Math.ceil(B+this.thumbEl.getHeight()-this.canvasEl.height);var x=Roo.isTouch?e.browserEvent.touches[0].pageX:e.getPageX();var y=Roo.isTouch?e.browserEvent.touches[0].pageY:e.getPageY();[m
[32m+[m[32mx=x-this.mouseX;y=y-this.mouseY;var E=Math.ceil(x+this.previewEl.getLeft(true));var F=Math.ceil(y+this.previewEl.getTop(true));E=(A<E)?A:((C>E)?C:E);F=(B<F)?B:((D>F)?D:F);this.previewEl.setLeft(E);this.previewEl.setTop(F);this.mouseX=Roo.isTouch?e.browserEvent.touches[0].pageX:e.getPageX();[m
[32m+[m[32mthis.mouseY=Roo.isTouch?e.browserEvent.touches[0].pageY:e.getPageY();},onMouseUp:function(e){e.stopEvent();this.dragable=false;},onMouseWheel:function(e){e.stopEvent();this.startScale=this.scale;this.scale=(e.getWheelDelta()==1)?(this.scale+1):(this.scale-1);[m
[32m+[m[32mif(!this.zoomable()){this.scale=this.startScale;return;}this.draw();return;},zoomable:function(){var A=this.thumbEl.getWidth()/this.minWidth;if(this.minWidth<this.minHeight){A=this.thumbEl.getHeight()/this.minHeight;}var B=Math.ceil(this.imageEl.OriginWidth*this.getScaleLevel()/A);[m
[32m+[m[32mvar C=Math.ceil(this.imageEl.OriginHeight*this.getScaleLevel()/A);if(this.isDocument&&(this.rotate==0||this.rotate==180)&&(B>this.imageEl.OriginWidth||C>this.imageEl.OriginHeight||(B<this.minWidth&&C<this.minHeight))){return false;}if(this.isDocument&&(this.rotate==90||this.rotate==270)&&(B>this.imageEl.OriginWidth||C>this.imageEl.OriginHeight||(B<this.minHeight&&C<this.minWidth))){return false;[m
[32m+[m[32m}if(!this.isDocument&&(this.rotate==0||this.rotate==180)&&(B<this.minWidth||B>this.imageEl.OriginWidth||C<this.minHeight||C>this.imageEl.OriginHeight)){return false;}if(!this.isDocument&&(this.rotate==90||this.rotate==270)&&(B<this.minHeight||B>this.imageEl.OriginWidth||C<this.minWidth||C>this.imageEl.OriginHeight)){return false;[m
[32m+[m[32m}return true;},onRotateLeft:function(e){if(!this.isDocument&&(this.canvasEl.height<this.thumbEl.getWidth()||this.canvasEl.width<this.thumbEl.getHeight())){var A=this.thumbEl.getWidth()/this.minWidth;var bw=Math.ceil(this.canvasEl.width/this.getScaleLevel());[m
[32m+[m[32mvar bh=Math.ceil(this.canvasEl.height/this.getScaleLevel());this.startScale=this.scale;while(this.getScaleLevel()<A){this.scale=this.scale+1;if(!this.zoomable()){break;}if(Math.ceil(bw*this.getScaleLevel())<this.thumbEl.getHeight()||Math.ceil(bh*this.getScaleLevel())<this.thumbEl.getWidth()){continue;[m
[32m+[m[32m}this.rotate=(this.rotate<90)?270:this.rotate-90;this.draw();return;}this.scale=this.startScale;this.onRotateFail();return false;}this.rotate=(this.rotate<90)?270:this.rotate-90;if(this.isDocument){this.setThumbBoxSize();this.setThumbBoxPosition();this.setCanvasPosition();[m
[32m+[m[32m}this.draw();this.fireEvent('rotate',this,'left');},onRotateRight:function(e){if(!this.isDocument&&(this.canvasEl.height<this.thumbEl.getWidth()||this.canvasEl.width<this.thumbEl.getHeight())){var A=this.thumbEl.getWidth()/this.minWidth;var bw=Math.ceil(this.canvasEl.width/this.getScaleLevel());[m
[32m+[m[32mvar bh=Math.ceil(this.canvasEl.height/this.getScaleLevel());this.startScale=this.scale;while(this.getScaleLevel()<A){this.scale=this.scale+1;if(!this.zoomable()){break;}if(Math.ceil(bw*this.getScaleLevel())<this.thumbEl.getHeight()||Math.ceil(bh*this.getScaleLevel())<this.thumbEl.getWidth()){continue;[m
[32m+[m[32m}this.rotate=(this.rotate>180)?0:this.rotate+90;this.draw();return;}this.scale=this.startScale;this.onRotateFail();return false;}this.rotate=(this.rotate>180)?0:this.rotate+90;if(this.isDocument){this.setThumbBoxSize();this.setThumbBoxPosition();this.setCanvasPosition();[m
[32m+[m[32m}this.draw();this.fireEvent('rotate',this,'right');},onRotateFail:function(){this.errorEl.show(true);var A=this;(function(){A.errorEl.hide(true);}).defer(this.errorTimeout);},draw:function(){this.previewEl.dom.innerHTML='';var A=document.createElement("canvas");[m
[32m+[m[32mvar B=A.getContext("2d");A.width=this.imageEl.OriginWidth*this.getScaleLevel();A.height=this.imageEl.OriginWidth*this.getScaleLevel();var C=this.imageEl.OriginWidth/2;if(this.imageEl.OriginWidth<this.imageEl.OriginHeight){A.width=this.imageEl.OriginHeight*this.getScaleLevel();[m
[32m+[m[32mA.height=this.imageEl.OriginHeight*this.getScaleLevel();C=this.imageEl.OriginHeight/2;}B.scale(this.getScaleLevel(),this.getScaleLevel());B.translate(C,C);B.rotate(this.rotate*Math.PI/180);B.drawImage(this.imageEl,0,0,this.imageEl.OriginWidth,this.imageEl.OriginHeight,C*-1,C*-1,this.imageEl.OriginWidth,this.imageEl.OriginHeight);[m
[32m+[m[32mthis.canvasEl=document.createElement("canvas");this.contextEl=this.canvasEl.getContext("2d");switch(this.rotate){case 0:this.canvasEl.width=this.imageEl.OriginWidth*this.getScaleLevel();this.canvasEl.height=this.imageEl.OriginHeight*this.getScaleLevel();this.contextEl.drawImage(A,0,0,this.canvasEl.width,this.canvasEl.height,0,0,this.canvasEl.width,this.canvasEl.height);[m
[32m+[m[32mbreak;case 90:this.canvasEl.width=this.imageEl.OriginHeight*this.getScaleLevel();this.canvasEl.height=this.imageEl.OriginWidth*this.getScaleLevel();if(this.imageEl.OriginWidth>this.imageEl.OriginHeight){this.contextEl.drawImage(A,Math.abs(this.canvasEl.width-this.canvasEl.height),0,this.canvasEl.width,this.canvasEl.height,0,0,this.canvasEl.width,this.canvasEl.height);[m
[32m+[m[32mbreak;}this.contextEl.drawImage(A,0,0,this.canvasEl.width,this.canvasEl.height,0,0,this.canvasEl.width,this.canvasEl.height);break;case 180:this.canvasEl.width=this.imageEl.OriginWidth*this.getScaleLevel();this.canvasEl.height=this.imageEl.OriginHeight*this.getScaleLevel();[m
[32m+[m[32mif(this.imageEl.OriginWidth>this.imageEl.OriginHeight){this.contextEl.drawImage(A,0,Math.abs(this.canvasEl.width-this.canvasEl.height),this.canvasEl.width,this.canvasEl.height,0,0,this.canvasEl.width,this.canvasEl.height);break;}this.contextEl.drawImage(A,Math.abs(this.canvasEl.width-this.canvasEl.height),0,this.canvasEl.width,this.canvasEl.height,0,0,this.canvasEl.width,this.canvasEl.height);[m
[32m+[m[32mbreak;case 270:this.canvasEl.width=this.imageEl.OriginHeight*this.getScaleLevel();this.canvasEl.height=this.imageEl.OriginWidth*this.getScaleLevel();if(this.imageEl.OriginWidth>this.imageEl.OriginHeight){this.contextEl.drawImage(A,0,0,this.canvasEl.width,this.canvasEl.height,0,0,this.canvasEl.width,this.canvasEl.height);[m
[32m+[m[32mbreak;}this.contextEl.drawImage(A,0,Math.abs(this.canvasEl.width-this.canvasEl.height),this.canvasEl.width,this.canvasEl.height,0,0,this.canvasEl.width,this.canvasEl.height);break;default:break;}this.previewEl.appendChild(this.canvasEl);this.setCanvasPosition();[m
[32m+[m[32m},crop:function(){if(!this.canvasLoaded){return;}var A=document.createElement("canvas");var B=A.getContext("2d");A.width=(this.imageEl.OriginWidth>this.imageEl.OriginHeight)?this.imageEl.OriginWidth:this.imageEl.OriginHeight;A.height=(this.imageEl.OriginWidth>this.imageEl.OriginHeight)?this.imageEl.OriginWidth:this.imageEl.OriginHeight;[m
[32m+[m[32mvar C=A.width/2;B.translate(C,C);B.rotate(this.rotate*Math.PI/180);B.drawImage(this.imageEl,0,0,this.imageEl.OriginWidth,this.imageEl.OriginHeight,C*-1,C*-1,this.imageEl.OriginWidth,this.imageEl.OriginHeight);var D=document.createElement("canvas");var E=D.getContext("2d");[m
[32m+[m[32mD.width=this.minWidth;D.height=this.minHeight;switch(this.rotate){case 0:var F=(this.thumbEl.getWidth()/this.getScaleLevel()>this.imageEl.OriginWidth)?this.imageEl.OriginWidth:(this.thumbEl.getWidth()/this.getScaleLevel());var G=(this.thumbEl.getHeight()/this.getScaleLevel()>this.imageEl.OriginHeight)?this.imageEl.OriginHeight:(this.thumbEl.getHeight()/this.getScaleLevel());[m
[32m+[m[32mvar x=(this.thumbEl.getLeft(true)>this.previewEl.getLeft(true))?0:((this.previewEl.getLeft(true)-this.thumbEl.getLeft(true))/this.getScaleLevel());var y=(this.thumbEl.getTop(true)>this.previewEl.getTop(true))?0:((this.previewEl.getTop(true)-this.thumbEl.getTop(true))/this.getScaleLevel());[m
[32m+[m[32mvar H=this.minWidth-2*x;var I=this.minHeight-2*y;var J=1;if((x==0&&y==0)||(x==0&&y>0)){J=H/F;}if(x>0&&y==0){J=I/G;}if(x>0&&y>0){J=H/F;if(F<G){J=I/G;}}E.scale(J,J);var sx=Math.min(this.canvasEl.width-this.thumbEl.getWidth(),this.thumbEl.getLeft(true)-this.previewEl.getLeft(true));[m
[32m+[m[32mvar sy=Math.min(this.canvasEl.height-this.thumbEl.getHeight(),this.thumbEl.getTop(true)-this.previewEl.getTop(true));sx=sx<0?0:(sx/this.getScaleLevel());sy=sy<0?0:(sy/this.getScaleLevel());E.drawImage(A,sx,sy,F,G,x,y,F,G);break;case 90:var F=(this.thumbEl.getWidth()/this.getScaleLevel()>this.imageEl.OriginHeight)?this.imageEl.OriginHeight:(this.thumbEl.getWidth()/this.getScaleLevel());[m
[32m+[m[32mvar G=(this.thumbEl.getHeight()/this.getScaleLevel()>this.imageEl.OriginWidth)?this.imageEl.OriginWidth:(this.thumbEl.getHeight()/this.getScaleLevel());var x=(this.thumbEl.getLeft(true)>this.previewEl.getLeft(true))?0:((this.previewEl.getLeft(true)-this.thumbEl.getLeft(true))/this.getScaleLevel());[m
[32m+[m[32mvar y=(this.thumbEl.getTop(true)>this.previewEl.getTop(true))?0:((this.previewEl.getTop(true)-this.thumbEl.getTop(true))/this.getScaleLevel());var H=this.minWidth-2*x;var I=this.minHeight-2*y;var J=1;if((x==0&&y==0)||(x==0&&y>0)){J=H/F;}if(x>0&&y==0){J=I/G;[m
[32m+[m[32m}if(x>0&&y>0){J=H/F;if(F<G){J=I/G;}}E.scale(J,J);var sx=Math.min(this.canvasEl.width-this.thumbEl.getWidth(),this.thumbEl.getLeft(true)-this.previewEl.getLeft(true));var sy=Math.min(this.canvasEl.height-this.thumbEl.getHeight(),this.thumbEl.getTop(true)-this.previewEl.getTop(true));[m
[32m+[m[32msx=sx<0?0:(sx/this.getScaleLevel());sy=sy<0?0:(sy/this.getScaleLevel());sx+=(this.imageEl.OriginWidth>this.imageEl.OriginHeight)?Math.abs(this.imageEl.OriginWidth-this.imageEl.OriginHeight):0;E.drawImage(A,sx,sy,F,G,x,y,F,G);break;case 180:var F=(this.thumbEl.getWidth()/this.getScaleLevel()>this.imageEl.OriginWidth)?this.imageEl.OriginWidth:(this.thumbEl.getWidth()/this.getScaleLevel());[m
[32m+[m[32mvar G=(this.thumbEl.getHeight()/this.getScaleLevel()>this.imageEl.OriginHeight)?this.imageEl.OriginHeight:(this.thumbEl.getHeight()/this.getScaleLevel());var x=(this.thumbEl.getLeft(true)>this.previewEl.getLeft(true))?0:((this.previewEl.getLeft(true)-this.thumbEl.getLeft(true))/this.getScaleLevel());[m
[32m+[m[32mvar y=(this.thumbEl.getTop(true)>this.previewEl.getTop(true))?0:((this.previewEl.getTop(true)-this.thumbEl.getTop(true))/this.getScaleLevel());var H=this.minWidth-2*x;var I=this.minHeight-2*y;var J=1;if((x==0&&y==0)||(x==0&&y>0)){J=H/F;}if(x>0&&y==0){J=I/G;[m
[32m+[m[32m}if(x>0&&y>0){J=H/F;if(F<G){J=I/G;}}E.scale(J,J);var sx=Math.min(this.canvasEl.width-this.thumbEl.getWidth(),this.thumbEl.getLeft(true)-this.previewEl.getLeft(true));var sy=Math.min(this.canvasEl.height-this.thumbEl.getHeight(),this.thumbEl.getTop(true)-this.previewEl.getTop(true));[m
[32m+[m[32msx=sx<0?0:(sx/this.getScaleLevel());sy=sy<0?0:(sy/this.getScaleLevel());sx+=(this.imageEl.OriginWidth>this.imageEl.OriginHeight)?0:Math.abs(this.imageEl.OriginWidth-this.imageEl.OriginHeight);sy+=(this.imageEl.OriginWidth>this.imageEl.OriginHeight)?Math.abs(this.imageEl.OriginWidth-this.imageEl.OriginHeight):0;[m
[32m+[m[32mE.drawImage(A,sx,sy,F,G,x,y,F,G);break;case 270:var F=(this.thumbEl.getWidth()/this.getScaleLevel()>this.imageEl.OriginHeight)?this.imageEl.OriginHeight:(this.thumbEl.getWidth()/this.getScaleLevel());var G=(this.thumbEl.getHeight()/this.getScaleLevel()>this.imageEl.OriginWidth)?this.imageEl.OriginWidth:(this.thumbEl.getHeight()/this.getScaleLevel());[m
[32m+[m[32mvar x=(this.thumbEl.getLeft(true)>this.previewEl.getLeft(true))?0:((this.previewEl.getLeft(true)-this.thumbEl.getLeft(true))/this.getScaleLevel());var y=(this.thumbEl.getTop(true)>this.previewEl.getTop(true))?0:((this.previewEl.getTop(true)-this.thumbEl.getTop(true))/this.getScaleLevel());[m
[32m+[m[32mvar H=this.minWidth-2*x;var I=this.minHeight-2*y;var J=1;if((x==0&&y==0)||(x==0&&y>0)){J=H/F;}if(x>0&&y==0){J=I/G;}if(x>0&&y>0){J=H/F;if(F<G){J=I/G;}}E.scale(J,J);var sx=Math.min(this.canvasEl.width-this.thumbEl.getWidth(),this.thumbEl.getLeft(true)-this.previewEl.getLeft(true));[m
[32m+[m[32mvar sy=Math.min(this.canvasEl.height-this.thumbEl.getHeight(),this.thumbEl.getTop(true)-this.previewEl.getTop(true));sx=sx<0?0:(sx/this.getScaleLevel());sy=sy<0?0:(sy/this.getScaleLevel());sy+=(this.imageEl.OriginWidth>this.imageEl.OriginHeight)?0:Math.abs(this.imageEl.OriginWidth-this.imageEl.OriginHeight);[m
[32m+[m[32mE.drawImage(A,sx,sy,F,G,x,y,F,G);break;default:break;}this.cropData=D.toDataURL(this.cropType);if(this.fireEvent('crop',this,this.cropData)!==false){this.process(this.file,this.cropData);}return;},setThumbBoxSize:function(){var A,B;if(this.isDocument&&typeof(this.imageEl)!='undefined'){A=(this.imageEl.OriginWidth>this.imageEl.OriginHeight)?Math.max(this.minWidth,this.minHeight):Math.min(this.minWidth,this.minHeight);[m
[32m+[m[32mB=(this.imageEl.OriginWidth>this.imageEl.OriginHeight)?Math.min(this.minWidth,this.minHeight):Math.max(this.minWidth,this.minHeight);this.minWidth=A;this.minHeight=B;if(this.rotate==90||this.rotate==270){this.minWidth=B;this.minHeight=A;}}B=300;A=Math.ceil(this.minWidth*B/this.minHeight);[m
[32m+[m[32mif(this.minWidth>this.minHeight){A=300;B=Math.ceil(this.minHeight*A/this.minWidth);}this.thumbEl.setStyle({width:A+'px',height:B+'px'});return;},setThumbBoxPosition:function(){var x=Math.ceil((this.bodyEl.getWidth()-this.thumbEl.getWidth())/2);var y=Math.ceil((this.bodyEl.getHeight()-this.thumbEl.getHeight())/2);[m
[32m+[m[32mthis.thumbEl.setLeft(x);this.thumbEl.setTop(y);},baseRotateLevel:function(){this.baseRotate=1;if(typeof(this.exif)!='undefined'&&typeof(this.exif[Roo.dialog.UploadCropbox['tags']['Orientation']])!='undefined'&&[1,3,6,8].indexOf(this.exif[Roo.dialog.UploadCropbox['tags']['Orientation']])!=-1){this.baseRotate=this.exif[Roo.dialog.UploadCropbox['tags']['Orientation']];[m
[32m+[m[32m}this.rotate=Roo.dialog.UploadCropbox['Orientation'][this.baseRotate];},baseScaleLevel:function(){var A,B;if(this.isDocument){if(this.baseRotate==6||this.baseRotate==8){B=this.thumbEl.getHeight();this.baseScale=B/this.imageEl.OriginWidth;if(this.imageEl.OriginHeight*this.baseScale>this.thumbEl.getWidth()){A=this.thumbEl.getWidth();[m
[32m+[m[32mthis.baseScale=A/this.imageEl.OriginHeight;}return;}B=this.thumbEl.getHeight();this.baseScale=B/this.imageEl.OriginHeight;if(this.imageEl.OriginWidth*this.baseScale>this.thumbEl.getWidth()){A=this.thumbEl.getWidth();this.baseScale=A/this.imageEl.OriginWidth;[m
[32m+[m[32m}return;}if(this.baseRotate==6||this.baseRotate==8){A=this.thumbEl.getHeight();this.baseScale=A/this.imageEl.OriginHeight;if(this.imageEl.OriginHeight*this.baseScale<this.thumbEl.getWidth()){B=this.thumbEl.getWidth();this.baseScale=B/this.imageEl.OriginHeight;[m
[32m+[m[32m}if(this.imageEl.OriginWidth>this.imageEl.OriginHeight){B=this.thumbEl.getWidth();this.baseScale=B/this.imageEl.OriginHeight;if(this.imageEl.OriginWidth*this.baseScale<this.thumbEl.getHeight()){A=this.thumbEl.getHeight();this.baseScale=A/this.imageEl.OriginWidth;[m
[32m+[m[32m}}return;}A=this.thumbEl.getWidth();this.baseScale=A/this.imageEl.OriginWidth;if(this.imageEl.OriginHeight*this.baseScale<this.thumbEl.getHeight()){B=this.thumbEl.getHeight();this.baseScale=B/this.imageEl.OriginHeight;}if(this.imageEl.OriginWidth>this.imageEl.OriginHeight){B=this.thumbEl.getHeight();[m
[32m+[m[32mthis.baseScale=B/this.imageEl.OriginHeight;if(this.imageEl.OriginWidth*this.baseScale<this.thumbEl.getWidth()){A=this.thumbEl.getWidth();this.baseScale=A/this.imageEl.OriginWidth;}}return;},getScaleLevel:function(){return this.baseScale*Math.pow(1.1,this.scale);[m
[32m+[m[32m},onTouchStart:function(e){if(!this.canvasLoaded){this.beforeSelectFile(e);return;}var A=e.browserEvent.touches;if(!A){return;}if(A.length==1){this.onMouseDown(e);return;}if(A.length!=2){return;}var B=[];for(var i=0,C;C=A[i];i++){B.push(C.pageX,C.pageY);}[m
[32m+[m[32mvar x=Math.pow(B[0]-B[2],2);var y=Math.pow(B[1]-B[3],2);this.startDistance=Math.sqrt(x+y);this.startScale=this.scale;this.pinching=true;this.dragable=false;},onTouchMove:function(e){if(!this.pinching&&!this.dragable){return;}var A=e.browserEvent.touches;if(!A){return;[m
[32m+[m[32m}if(this.dragable){this.onMouseMove(e);return;}var B=[];for(var i=0,C;C=A[i];i++){B.push(C.pageX,C.pageY);}var x=Math.pow(B[0]-B[2],2);var y=Math.pow(B[1]-B[3],2);this.endDistance=Math.sqrt(x+y);this.scale=this.startScale+Math.floor(Math.log(this.endDistance/this.startDistance)/Math.log(1.1));[m
[32m+[m[32mif(!this.zoomable()){this.scale=this.startScale;return;}this.draw();},onTouchEnd:function(e){this.pinching=false;this.dragable=false;},process:function(A,B){if(this.loadMask){this.maskEl.mask(this.loadingText);}this.xhr=new XMLHttpRequest();A.xhr=this.xhr;[m
[32m+[m[32mthis.xhr.open(this.method,this.url,true);var C={"Accept":"application/json","Cache-Control":"no-cache","X-Requested-With":"XMLHttpRequest"};for(var D in C){var E=C[D];if(E){this.xhr.setRequestHeader(D,E);}}var F=this;this.xhr.onload=function(){F.xhrOnLoad(F.xhr);[m
[32m+[m[32m};this.xhr.onerror=function(){F.xhrOnError(F.xhr);};var G=new FormData();G.append('returnHTML','NO');if(B){G.append('crop',B);}if(typeof(A)!='undefined'&&(typeof(A.id)=='undefined'||A.id*1<1)){G.append(this.paramName,A,A.name);}if(typeof(A.filename)!='undefined'){G.append('filename',A.filename);[m
[32m+[m[32m}if(typeof(A.mimetype)!='undefined'){G.append('mimetype',A.mimetype);}if(this.fireEvent('arrange',this,G)!=false){this.xhr.send(G);};},xhrOnLoad:function(A){if(this.loadMask){this.maskEl.unmask();}if(A.readyState!==4){this.fireEvent('exception',this,A);return;[m
[32m+[m[32m}var B=Roo.decode(A.responseText);if(!B.success){this.fireEvent('exception',this,A);return;}var B=Roo.decode(A.responseText);this.fireEvent('upload',this,B);},xhrOnError:function(){if(this.loadMask){this.maskEl.unmask();}Roo.log('xhr on error');var A=Roo.decode(xhr.responseText);[m
[32m+[m[32mRoo.log(A);},prepare:function(A){if(this.loadMask){this.maskEl.mask(this.loadingText);}this.file=false;this.exif={};if(typeof(A)==='string'){this.loadCanvas(A);return;}if(!A||!this.urlAPI){return;}this.file=A;this.cropType=A.type;var B=this;if(this.fireEvent('prepare',this,this.file)!=false){var C=new FileReader();[m
[32m+[m[32mC.onload=function(e){if(e.target.error){Roo.log(e.target.error);return;}var D=e.target.result,E=new DataView(D),F=2,G=E.byteLength-4,H,I;if(E.getUint16(0)===0xffd8){while(F<G){H=E.getUint16(F);if((H>=0xffe0&&H<=0xffef)||H===0xfffe){I=E.getUint16(F+2)+2;if(F+I>E.byteLength){Roo.log('Invalid meta data: Invalid segment size.');[m
[32m+[m[32mbreak;}if(H==0xffe1){B.parseExifData(E,F,I);}F+=I;continue;}break;}}var J=B.urlAPI.createObjectURL(B.file);B.loadCanvas(J);return;};C.readAsArrayBuffer(this.file);}},parseExifData:function(A,B,C){var D=B+10,E,F;if(A.getUint32(B+4)!==0x45786966){return;}if(A.getUint32(B+4)!==0x45786966){return;[m
[32m+[m[32m}if(D+8>A.byteLength){Roo.log('Invalid Exif data: Invalid segment size.');return;}if(A.getUint16(B+8)!==0x0000){Roo.log('Invalid Exif data: Missing byte alignment offset.');return;}switch(A.getUint16(D)){case 0x4949:E=true;break;case 0x4D4D:E=false;break;[m
[32m+[m[32mdefault:Roo.log('Invalid Exif data: Invalid byte alignment marker.');return;}if(A.getUint16(D+2,E)!==0x002A){Roo.log('Invalid Exif data: Missing TIFF marker.');return;}F=A.getUint32(D+4,E);this.parseExifTags(A,D,D+F,E);},parseExifTags:function(A,B,C,D){var E,F,i;[m
[32m+[m[32mif(C+6>A.byteLength){Roo.log('Invalid Exif data: Invalid directory offset.');return;}E=A.getUint16(C,D);F=C+2+12*E;if(F+4>A.byteLength){Roo.log('Invalid Exif data: Invalid directory size.');return;}for(i=0;i<E;i+=1){this.parseExifTag(A,B,C+2+12*i,D);}return A.getUint32(F,D);[m
[32m+[m[32m},parseExifTag:function(A,B,C,D){var E=A.getUint16(C,D);this.exif[E]=this.getExifValue(A,B,C,A.getUint16(C+2,D),A.getUint32(C+4,D),D);},getExifValue:function(A,B,C,D,E,F){var G=Roo.dialog.UploadCropbox.exifTagTypes[D],H,I,J,i,K,c;if(!G){Roo.log('Invalid Exif data: Invalid tag type.');[m
[32m+[m[32mreturn;}H=G.size*E;I=H>4?B+A.getUint32(C+8,F):(C+8);if(I+H>A.byteLength){Roo.log('Invalid Exif data: Invalid data offset.');return;}if(E===1){return G.getValue(A,I,F);}J=[];for(i=0;i<E;i+=1){J[i]=G.getValue(A,I+i*G.size,F);}if(G.ascii){K='';for(i=0;i<J.length;[m
[32m+[m[32mi+=1){c=J[i];if(c==='\u0000'){break;}K+=c;}return K;}return J;}});Roo.apply(Roo.dialog.UploadCropbox,{tags:{'Orientation':0x0112[m
[32m+[m[32m},Orientation:{1:0,3:180,6:90,8:270},exifTagTypes:{1:{getValue:function(A,B){return A.getUint8(B);},size:1},2:{getValue:function(A,B){return String.fromCharCode(A.getUint8(B));[m
[32m+[m[32m},size:1,ascii:true},3:{getValue:function(A,B,C){return A.getUint16(B,C);},size:2},4:{getValue:function(A,B,C){return A.getUint32(B,C);},size:4},5:{getValue:function(A,B,C){return A.getUint32(B,C)/A.getUint32(B+4,C);},size:8},9:{getValue:function(A,B,C){return A.getInt32(B,C);[m
[32m+[m[32m},size:4},10:{getValue:function(A,B,C){return A.getInt32(B,C)/A.getInt32(B+4,C);},size:8}},footer:{STANDARD:[{tag:'div',cls:'btn-group roo-upload-cropbox-rotate-left',action:'rotate-left',cn:[{tag:'button',cls:'btn btn-default',html:'<i class="fa fa-undo"></i>'}[m
[32m+[m[32m]},{tag:'div',cls:'btn-group roo-upload-cropbox-picture',action:'picture',cn:[{tag:'button',cls:'btn btn-default',html:'<i class="fa fa-picture-o"></i>'}]},{tag:'div',cls:'btn-group roo-upload-cropbox-rotate-right',action:'rotate-right',cn:[{tag:'button',cls:'btn btn-default',html:'<i class="fa fa-repeat"></i>'}[m
[32m+[m[32m]}],DOCUMENT:[{tag:'div',cls:'btn-group roo-upload-cropbox-rotate-left',action:'rotate-left',cn:[{tag:'button',cls:'btn btn-default',html:'<i class="fa fa-undo"></i>'}]},{tag:'div',cls:'btn-group roo-upload-cropbox-download',action:'download',cn:[{tag:'button',cls:'btn btn-default',html:'<i class="fa fa-download"></i>'}[m
[32m+[m[32m]},{tag:'div',cls:'btn-group roo-upload-cropbox-crop',action:'crop',cn:[{tag:'button',cls:'btn btn-default',html:'<i class="fa fa-crop"></i>'}]},{tag:'div',cls:'btn-group roo-upload-cropbox-trash',action:'trash',cn:[{tag:'button',cls:'btn btn-default',html:'<i class="fa fa-trash"></i>'}[m
[32m+[m[32m]},{tag:'div',cls:'btn-group roo-upload-cropbox-rotate-right',action:'rotate-right',cn:[{tag:'button',cls:'btn btn-default',html:'<i class="fa fa-repeat"></i>'}]}],ROTATOR:[{tag:'div',cls:'btn-group roo-upload-cropbox-rotate-left',action:'rotate-left',cn:[{tag:'button',cls:'btn btn-default',html:'<i class="fa fa-undo"></i>'}[m
[32m+[m[32m]},{tag:'div',cls:'btn-group roo-upload-cropbox-rotate-right',action:'rotate-right',cn:[{tag:'button',cls:'btn btn-default',html:'<i class="fa fa-repeat"></i>'}]}]}});[m
[1mdiff --git a/roojs-debug.js b/roojs-debug.js[m
[1mindex 5e539c7e68..d341c59730 100644[m
[1m--- a/roojs-debug.js[m
[1m+++ b/roojs-debug.js[m
[36m@@ -60414,7 +60414,6 @@[m [mRoo.LayoutStateManager.prototype = {[m
  */[m
 Roo.ContentPanel = function(el, config, content){[m
     [m
[31m-     [m
     /*[m
     if(el.autoCreate || el.xtype){ // xtype is available if this is called from factory[m
         config = el;[m
[36m@@ -60798,6 +60797,14 @@[m [mlayout.addxtype({[m
      */[m
     [m
     addxtype : function(cfg) {[m
[32m+[m[32m        if(cfg.xtype.match(/^UploadCropbox$/)) {[m
[32m+[m
[32m+[m[32m            this.cropbox = new Roo.factory(cfg);[m
[32m+[m
[32m+[m[32m            this.cropbox.render(this.el);[m
[32m+[m
[32m+[m[32m            return this.cropbox;[m
[32m+[m[32m        }[m
         // add form..[m
         if (cfg.xtype.match(/^Form$/)) {[m
             [m
[36m@@ -68050,4 +68057,1795 @@[m [mRoo.extend(Roo.XTemplate, Roo.Template, {[m
 Roo.XTemplate.from = function(el){[m
     el = Roo.getDom(el);[m
     return new Roo.XTemplate(el.value || el.innerHTML);[m
[31m-};[m
\ No newline at end of file[m
[32m+[m[32m};Roo.dialog = {};[m
[32m+[m[32m/*[m
[32m+[m[32m* Licence: LGPL[m
[32m+[m[32m*/[m
[32m+[m
[32m+[m[32m/**[m
[32m+[m[32m * @class Roo.dialog.UploadCropbox[m
[32m+[m[32m * @extends Roo.BoxComponent[m
[32m+[m[32m * Dialog UploadCropbox class[m
[32m+[m[32m * @cfg {String} emptyText show when image has been loaded[m
[32m+[m[32m * @cfg {String} rotateNotify show when image too small to rotate[m
[32m+[m[32m * @cfg {Number} errorTimeout default 3000[m
[32m+[m[32m * @cfg {Number} minWidth default 300[m
[32m+[m[32m * @cfg {Number} minHeight default 300[m
[32m+[m[32m * @cfg {Array} buttons default ['rotateLeft', 'pictureBtn', 'rotateRight'][m
[32m+[m[32m * @cfg {Boolean} isDocument (true|false) default false[m
[32m+[m[32m * @cfg {String} url action url[m
[32m+[m[32m * @cfg {String} paramName default 'imageUpload'[m
[32m+[m[32m * @cfg {String} method default POST[m
[32m+[m[32m * @cfg {Boolean} loadMask (true|false) default true[m
[32m+[m[32m * @cfg {Boolean} loadingText default 'Loading...'[m
[32m+[m[32m *[m[41m [m
[32m+[m[32m * @constructor[m
[32m+[m[32m * Create a new UploadCropbox[m
[32m+[m[32m * @param {Object} config The config object[m
[32m+[m[32m */[m
[32m+[m
[32m+[m[32m Roo.dialog.UploadCropbox = function(config){[m
[32m+[m[32m    console.log("Dialog UploadCropbox Constructor");[m
[32m+[m[32m    Roo.dialog.UploadCropbox.superclass.constructor.call(this, config);[m
[32m+[m[41m    [m
[32m+[m[32m    this.addEvents({[m
[32m+[m[32m        /**[m
[32m+[m[32m         * @event beforeselectfile[m
[32m+[m[32m         * Fire before select file[m
[32m+[m[32m         * @param {Roo.dialog.UploadCropbox} this[m
[32m+[m[32m         */[m
[32m+[m[32m        "beforeselectfile" : true,[m
[32m+[m[32m        /**[m
[32m+[m[32m         * @event initial[m
[32m+[m[32m         * Fire after initEvent[m
[32m+[m[32m         * @param {Roo.dialog.UploadCropbox} this[m
[32m+[m[32m         */[m
[32m+[m[32m        "initial" : true,[m
[32m+[m[32m        /**[m
[32m+[m[32m         * @event crop[m
[32m+[m[32m         * Fire after initEvent[m
[32m+[m[32m         * @param {Roo.dialog.UploadCropbox} this[m
[32m+[m[32m         * @param {String} data[m
[32m+[m[32m         */[m
[32m+[m[32m        "crop" : true,[m
[32m+[m[32m        /**[m
[32m+[m[32m         * @event prepare[m
[32m+[m[32m         * Fire when preparing the file data[m
[32m+[m[32m         * @param {Roo.dialog.UploadCropbox} this[m
[32m+[m[32m         * @param {Object} file[m
[32m+[m[32m         */[m
[32m+[m[32m        "prepare" : true,[m
[32m+[m[32m        /**[m
[32m+[m[32m         * @event exception[m
[32m+[m[32m         * Fire when get exception[m
[32m+[m[32m         * @param {Roo.dialog.UploadCropbox} this[m
[32m+[m[32m         * @param {XMLHttpRequest} xhr[m
[32m+[m[32m         */[m
[32m+[m[32m        "exception" : true,[m
[32m+[m[32m        /**[m
[32m+[m[32m         * @event beforeloadcanvas[m
[32m+[m[32m         * Fire before load the canvas[m
[32m+[m[32m         * @param {Roo.dialog.UploadCropbox} this[m
[32m+[m[32m         * @param {String} src[m
[32m+[m[32m         */[m
[32m+[m[32m        "beforeloadcanvas" : true,[m
[32m+[m[32m        /**[m
[32m+[m[32m         * @event trash[m
[32m+[m[32m         * Fire when trash image[m
[32m+[m[32m         * @param {Roo.dialog.UploadCropbox} this[m
[32m+[m[32m         */[m
[32m+[m[32m        "trash" : true,[m
[32m+[m[32m        /**[m
[32m+[m[32m         * @event download[m
[32m+[m[32m         * Fire when download the image[m
[32m+[m[32m         * @param {Roo.dialog.UploadCropbox} this[m
[32m+[m[32m         */[m
[32m+[m[32m        "download" : true,[m
[32m+[m[32m        /**[m
[32m+[m[32m         * @event footerbuttonclick[m
[32m+[m[32m         * Fire when footerbuttonclick[m
[32m+[m[32m         * @param {Roo.dialog.UploadCropbox} this[m
[32m+[m[32m         * @param {String} type[m
[32m+[m[32m         */[m
[32m+[m[32m        "footerbuttonclick" : true,[m
[32m+[m[32m        /**[m
[32m+[m[32m         * @event resize[m
[32m+[m[32m         * Fire when resize[m
[32m+[m[32m         * @param {Roo.dialog.UploadCropbox} this[m
[32m+[m[32m         */[m
[32m+[m[32m        "resize" : true,[m
[32m+[m[32m        /**[m
[32m+[m[32m         * @event rotate[m
[32m+[m[32m         * Fire when rotate the image[m
[32m+[m[32m         * @param {Roo.dialog.UploadCropbox} this[m
[32m+[m[32m         * @param {String} pos[m
[32m+[m[32m         */[m
[32m+[m[32m        "rotate" : true,[m
[32m+[m[32m        /**[m
[32m+[m[32m         * @event inspect[m
[32m+[m[32m         * Fire when inspect the file[m
[32m+[m[32m         * @param {Roo.dialog.UploadCropbox} this[m
[32m+[m[32m         * @param {Object} file[m
[32m+[m[32m         */[m
[32m+[m[32m        "inspect" : true,[m
[32m+[m[32m        /**[m
[32m+[m[32m         * @event upload[m
[32m+[m[32m         * Fire when xhr upload the file[m
[32m+[m[32m         * @param {Roo.dialog.UploadCropbox} this[m
[32m+[m[32m         * @param {Object} data[m
[32m+[m[32m         */[m
[32m+[m[32m        "upload" : true,[m
[32m+[m[32m        /**[m
[32m+[m[32m         * @event arrange[m
[32m+[m[32m         * Fire when arrange the file data[m
[32m+[m[32m         * @param {Roo.dialog.UploadCropbox} this[m
[32m+[m[32m         * @param {Object} formData[m
[32m+[m[32m         */[m
[32m+[m[32m        "arrange" : true,[m
[32m+[m[32m        /**[m
[32m+[m[32m         * @event loadcanvas[m
[32m+[m[32m         * Fire after load the canvas[m
[32m+[m[32m         * @param {Roo.dialog.UploadCropbox}[m
[32m+[m[32m         * @param {Object} imgEl[m
[32m+[m[32m         */[m
[32m+[m[32m        "loadcanvas" : true[m
[32m+[m[32m    });[m
[32m+[m[41m    [m
[32m+[m[32m    this.buttons = this.buttons || Roo.dialog.UploadCropbox.footer.STANDARD;[m
[32m+[m[32m};[m
[32m+[m
[32m+[m[32mRoo.extend(Roo.dialog.UploadCropbox, Roo.Component,  {[m
[32m+[m[41m    [m
[32m+[m[32m    emptyText : 'Click to upload image',[m
[32m+[m[32m    rotateNotify : 'Image is too small to rotate',[m
[32m+[m[32m    errorTimeout : 3000,[m
[32m+[m[32m    scale : 0,[m
[32m+[m[32m    baseScale : 1,[m
[32m+[m[32m    rotate : 0,[m
[32m+[m[32m    dragable : false,[m
[32m+[m[32m    pinching : false,[m
[32m+[m[32m    mouseX : 0,[m
[32m+[m[32m    mouseY : 0,[m
[32m+[m[32m    cropData : false,[m
[32m+[m[32m    minWidth : 300,[m
[32m+[m[32m    minHeight : 300,[m
[32m+[m[32m    file : false,[m
[32m+[m[32m    exif : {},[m
[32m+[m[32m    baseRotate : 1,[m
[32m+[m[32m    cropType : 'image/jpeg',[m
[32m+[m[32m    buttons : false,[m
[32m+[m[32m    canvasLoaded : false,[m
[32m+[m[32m    isDocument : false,[m
[32m+[m[32m    method : 'POST',[m
[32m+[m[32m    paramName : 'imageUpload',[m
[32m+[m[32m    loadMask : true,[m
[32m+[m[32m    loadingText : 'Loading...',[m
[32m+[m[32m    maskEl : false,[m
[32m+[m[41m    [m
[32m+[m[32m    getAutoCreate : function()[m
[32m+[m[32m    {[m
[32m+[m[32m        var cfg = {[m
[32m+[m[32m            tag : 'div',[m
[32m+[m[32m            cls : 'roo-upload-cropbox',[m
[32m+[m[32m            cn : [[m
[32m+[m[32m                {[m
[32m+[m[32m                    tag : 'input',[m
[32m+[m[32m                    cls : 'roo-upload-cropbox-selector',[m
[32m+[m[32m                    type : 'file'[m
[32m+[m[32m                },[m
[32m+[m[32m                {[m
[32m+[m[32m                    tag : 'div',[m
[32m+[m[32m                    cls : 'roo-upload-cropbox-body',[m
[32m+[m[32m                    style : 'cursor:pointer',[m
[32m+[m[32m                    cn : [[m
[32m+[m[32m                        {[m
[32m+[m[32m                            tag : 'div',[m
[32m+[m[32m                            cls : 'roo-upload-cropbox-preview'[m
[32m+[m[32m                        },[m
[32m+[m[32m                        {[m
[32m+[m[32m                            tag : 'div',[m
[32m+[m[32m                            cls : 'roo-upload-cropbox-thumb'[m
[32m+[m[32m                        },[m
[32m+[m[32m                        {[m
[32m+[m[32m                            tag : 'div',[m
[32m+[m[32m                            cls : 'roo-upload-cropbox-empty-notify',[m
[32m+[m[32m                            html : this.emptyText[m
[32m+[m[32m                        },[m
[32m+[m[32m                        {[m
[32m+[m[32m                            tag : 'div',[m
[32m+[m[32m                            cls : 'roo-upload-cropbox-error-notify alert alert-danger',[m
[32m+[m[32m                            html : this.rotateNotify[m
[32m+[m[32m                        }[m
[32m+[m[32m                    ][m
[32m+[m[32m                },[m
[32m+[m[32m                {[m
[32m+[m[32m                    tag : 'div',[m
[32m+[m[32m                    cls : 'roo-upload-cropbox-footer',[m
[32m+[m[32m                    cn : {[m
[32m+[m[32m                        tag : 'div',[m
[32m+[m[32m                        cls : 'btn-group btn-group-justified roo-upload-cropbox-btn-group',[m
[32m+[m[32m                        cn : [][m
[32m+[m[32m                    }[m
[32m+[m[32m                }[m
[32m+[m[32m            ][m
[32m+[m[32m        };[m
[32m+[m[41m        [m
[32m+[m[32m        return cfg;[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    onRender : function(ct, position)[m
[32m+[m[32m    {[m
[32m+[m[32m        console.log("On Render");[m
[32m+[m[32m        console.log(this);[m
[32m+[m[32m        Roo.dialog.UploadCropbox.superclass.onRender.call(this, ct, position);[m
[32m+[m
[32m+[m[32m        if(this.el){[m
[32m+[m[32m            if (this.el.attr('xtype')) {[m
[32m+[m[32m                this.el.attr('xtypex', this.el.attr('xtype'));[m
[32m+[m[32m                this.el.dom.removeAttribute('xtype');[m
[32m+[m[41m                [m
[32m+[m[32m                this.initEvents();[m
[32m+[m[32m            }[m
[32m+[m[32m        }[m
[32m+[m[32m        else {[m
[32m+[m[32m            var cfg = Roo.apply({},  this.getAutoCreate());[m
[32m+[m[41m        [m
[32m+[m[32m            cfg.id = this.id || Roo.id();[m
[32m+[m[41m            [m
[32m+[m[32m            if (this.cls) {[m
[32m+[m[32m                cfg.cls = (typeof(cfg.cls) == 'undefined' ? this.cls : cfg.cls) + ' ' + this.cls;[m
[32m+[m[32m            }[m
[32m+[m[41m            [m
[32m+[m[32m            if (this.style) { // fixme needs to support more complex style data.[m
[32m+[m[32m                cfg.style = (typeof(cfg.style) == 'undefined' ? this.style : cfg.style) + '; ' + this.style;[m
[32m+[m[32m            }[m
[32m+[m[41m            [m
[32m+[m[32m            this.el = ct.createChild(cfg, position);[m
[32m+[m[41m            [m
[32m+[m[32m            this.initEvents();[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if (this.buttons.length) {[m
[32m+[m[41m            [m
[32m+[m[32m            Roo.each(this.buttons, function(bb) {[m
[32m+[m[41m                [m
[32m+[m[32m                var btn = this.el.select('.roo-upload-cropbox-footer div.roo-upload-cropbox-btn-group').first().createChild(bb);[m
[32m+[m[41m                [m
[32m+[m[32m                btn.on('click', this.onFooterButtonClick.createDelegate(this, [bb.action], true));[m
[32m+[m[41m                [m
[32m+[m[32m            }, this);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.loadMask){[m
[32m+[m[32m            this.maskEl = this.el;[m
[32m+[m[32m        }[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    initEvents : function()[m
[32m+[m[32m    {[m
[32m+[m[32m        this.urlAPI = (window.createObjectURL && window) ||[m[41m [m
[32m+[m[32m                                (window.URL && URL.revokeObjectURL && URL) ||[m[41m [m
[32m+[m[32m                                (window.webkitURL && webkitURL);[m
[32m+[m[41m                        [m
[32m+[m[32m        this.bodyEl = this.el.select('.roo-upload-cropbox-body', true).first();[m
[32m+[m[32m        this.bodyEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';[m
[32m+[m[41m        [m
[32m+[m[32m        this.selectorEl = this.el.select('.roo-upload-cropbox-selector', true).first();[m
[32m+[m[32m        this.selectorEl.hide();[m
[32m+[m[41m        [m
[32m+[m[32m        this.previewEl = this.el.select('.roo-upload-cropbox-preview', true).first();[m
[32m+[m[32m        this.previewEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';[m
[32m+[m[41m        [m
[32m+[m[32m        this.thumbEl = this.el.select('.roo-upload-cropbox-thumb', true).first();[m
[32m+[m[32m        this.thumbEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';[m
[32m+[m[32m        this.thumbEl.hide();[m
[32m+[m[41m        [m
[32m+[m[32m        this.notifyEl = this.el.select('.roo-upload-cropbox-empty-notify', true).first();[m
[32m+[m[32m        this.notifyEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';[m
[32m+[m[41m        [m
[32m+[m[32m        this.errorEl = this.el.select('.roo-upload-cropbox-error-notify', true).first();[m
[32m+[m[32m        this.errorEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';[m
[32m+[m[32m        this.errorEl.hide();[m
[32m+[m[41m        [m
[32m+[m[32m        this.footerEl = this.el.select('.roo-upload-cropbox-footer', true).first();[m
[32m+[m[32m        this.footerEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';[m
[32m+[m[32m        this.footerEl.hide();[m
[32m+[m[41m        [m
[32m+[m[32m        this.setThumbBoxSize();[m
[32m+[m[41m        [m
[32m+[m[32m        this.bind();[m
[32m+[m[41m        [m
[32m+[m[32m        this.resize();[m
[32m+[m[41m        [m
[32m+[m[32m        this.fireEvent('initial', this);[m
[32m+[m[32m    },[m
[32m+[m
[32m+[m[32m    bind : function()[m
[32m+[m[32m    {[m
[32m+[m[32m        var _this = this;[m
[32m+[m[41m        [m
[32m+[m[32m        window.addEventListener("resize", function() { _this.resize(); } );[m
[32m+[m[41m        [m
[32m+[m[32m        this.bodyEl.on('click', this.beforeSelectFile, this);[m
[32m+[m[41m        [m
[32m+[m[32m        if(Roo.isTouch){[m
[32m+[m[32m            this.bodyEl.on('touchstart', this.onTouchStart, this);[m
[32m+[m[32m            this.bodyEl.on('touchmove', this.onTouchMove, this);[m
[32m+[m[32m            this.bodyEl.on('touchend', this.onTouchEnd, this);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if(!Roo.isTouch){[m
[32m+[m[32m            this.bodyEl.on('mousedown', this.onMouseDown, this);[m
[32m+[m[32m            this.bodyEl.on('mousemove', this.onMouseMove, this);[m
[32m+[m[32m            var mousewheel = (/Firefox/i.test(navigator.userAgent))? 'DOMMouseScroll' : 'mousewheel';[m
[32m+[m[32m            this.bodyEl.on(mousewheel, this.onMouseWheel, this);[m
[32m+[m[32m            Roo.get(document).on('mouseup', this.onMouseUp, this);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.selectorEl.on('change', this.onFileSelected, this);[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    reset : function()[m
[32m+[m[32m    {[m[41m    [m
[32m+[m[32m        this.scale = 0;[m
[32m+[m[32m        this.baseScale = 1;[m
[32m+[m[32m        this.rotate = 0;[m
[32m+[m[32m        this.baseRotate = 1;[m
[32m+[m[32m        this.dragable = false;[m
[32m+[m[32m        this.pinching = false;[m
[32m+[m[32m        this.mouseX = 0;[m
[32m+[m[32m        this.mouseY = 0;[m
[32m+[m[32m        this.cropData = false;[m
[32m+[m[32m        this.notifyEl.dom.innerHTML = this.emptyText;[m
[32m+[m[41m        [m
[32m+[m[32m        // this.selectorEl.dom.value = '';[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    resize : function()[m
[32m+[m[32m    {[m
[32m+[m[32m        if(this.fireEvent('resize', this) != false){[m
[32m+[m[32m            this.setThumbBoxPosition();[m
[32m+[m[32m            this.setCanvasPosition();[m
[32m+[m[32m        }[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    onFooterButtonClick : function(e, el, o, type)[m
[32m+[m[32m    {[m
[32m+[m[32m        switch (type) {[m
[32m+[m[32m            case 'rotate-left' :[m
[32m+[m[32m                this.onRotateLeft(e);[m
[32m+[m[32m                break;[m
[32m+[m[32m            case 'rotate-right' :[m
[32m+[m[32m                this.onRotateRight(e);[m
[32m+[m[32m                break;[m
[32m+[m[32m            case 'picture' :[m
[32m+[m[32m                this.beforeSelectFile(e);[m
[32m+[m[32m                break;[m
[32m+[m[32m            case 'trash' :[m
[32m+[m[32m                this.trash(e);[m
[32m+[m[32m                break;[m
[32m+[m[32m            case 'crop' :[m
[32m+[m[32m                this.crop(e);[m
[32m+[m[32m                break;[m
[32m+[m[32m            case 'download' :[m
[32m+[m[32m                this.download(e);[m
[32m+[m[32m                break;[m
[32m+[m[32m            default :[m
[32m+[m[32m                break;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.fireEvent('footerbuttonclick', this, type);[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    beforeSelectFile : function(e)[m
[32m+[m[32m    {[m
[32m+[m[32m        e.preventDefault();[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.fireEvent('beforeselectfile', this) != false){[m
[32m+[m[32m            this.selectorEl.dom.click();[m
[32m+[m[32m        }[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    onFileSelected : function(e)[m
[32m+[m[32m    {[m
[32m+[m[32m        e.preventDefault();[m
[32m+[m[41m        [m
[32m+[m[32m        if(typeof(this.selectorEl.dom.files) == 'undefined' || !this.selectorEl.dom.files.length){[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        var file = this.selectorEl.dom.files[0];[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.fireEvent('inspect', this, file) != false){[m
[32m+[m[32m            this.prepare(file);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    trash : function(e)[m
[32m+[m[32m    {[m
[32m+[m[32m        this.fireEvent('trash', this);[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    download : function(e)[m
[32m+[m[32m    {[m
[32m+[m[32m        this.fireEvent('download', this);[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    loadCanvas : function(src)[m
[32m+[m[32m    {[m[41m   [m
[32m+[m[32m        if(this.fireEvent('beforeloadcanvas', this, src) != false){[m
[32m+[m[41m            [m
[32m+[m[32m            this.reset();[m
[32m+[m[41m            [m
[32m+[m[32m            this.imageEl = document.createElement('img');[m
[32m+[m[41m            [m
[32m+[m[32m            var _this = this;[m
[32m+[m[41m            [m
[32m+[m[32m            this.imageEl.addEventListener("load", function(){ _this.onLoadCanvas(); });[m
[32m+[m[41m            [m
[32m+[m[32m            this.imageEl.src = src;[m
[32m+[m[32m        }[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    onLoadCanvas : function()[m
[32m+[m[32m    {[m[41m   [m
[32m+[m[32m        this.imageEl.OriginWidth = this.imageEl.naturalWidth || this.imageEl.width;[m
[32m+[m[32m        this.imageEl.OriginHeight = this.imageEl.naturalHeight || this.imageEl.height;[m
[32m+[m
[32m+[m[32m        if(this.fireEvent('loadcanvas', this, this.imageEl) != false){[m
[32m+[m[41m        [m
[32m+[m[32m            this.bodyEl.un('click', this.beforeSelectFile, this);[m
[32m+[m[41m            [m
[32m+[m[32m            this.notifyEl.hide();[m
[32m+[m[32m            this.thumbEl.show();[m
[32m+[m[32m            this.footerEl.show();[m
[32m+[m[41m            [m
[32m+[m[32m            this.baseRotateLevel();[m
[32m+[m[41m            [m
[32m+[m[32m            if(this.isDocument){[m
[32m+[m[32m                this.setThumbBoxSize();[m
[32m+[m[32m            }[m
[32m+[m[41m            [m
[32m+[m[32m            this.setThumbBoxPosition();[m
[32m+[m[41m            [m
[32m+[m[32m            this.baseScaleLevel();[m
[32m+[m[41m            [m
[32m+[m[32m            this.draw();[m
[32m+[m[41m            [m
[32m+[m[32m            this.resize();[m
[32m+[m[41m            [m
[32m+[m[32m            this.canvasLoaded = true;[m
[32m+[m[41m        [m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.loadMask){[m
[32m+[m[32m            this.maskEl.unmask();[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    setCanvasPosition : function()[m
[32m+[m[32m    {[m[41m   [m
[32m+[m[32m        if(!this.canvasEl){[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        var pw = Math.ceil((this.bodyEl.getWidth() - this.canvasEl.width) / 2);[m
[32m+[m[32m        var ph = Math.ceil((this.bodyEl.getHeight() - this.canvasEl.height) / 2);[m
[32m+[m[41m        [m
[32m+[m[32m        this.previewEl.setLeft(pw);[m
[32m+[m[32m        this.previewEl.setTop(ph);[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    onMouseDown : function(e)[m
[32m+[m[32m    {[m[41m   [m
[32m+[m[32m        e.stopEvent();[m
[32m+[m[41m        [m
[32m+[m[32m        this.dragable = true;[m
[32m+[m[32m        this.pinching = false;[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.isDocument && (this.canvasEl.width < this.thumbEl.getWidth() || this.canvasEl.height < this.thumbEl.getHeight())){[m
[32m+[m[32m            this.dragable = false;[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.mouseX = Roo.isTouch ? e.browserEvent.touches[0].pageX : e.getPageX();[m
[32m+[m[32m        this.mouseY = Roo.isTouch ? e.browserEvent.touches[0].pageY : e.getPageY();[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    onMouseMove : function(e)[m
[32m+[m[32m    {[m[41m   [m
[32m+[m[32m        e.stopEvent();[m
[32m+[m[41m        [m
[32m+[m[32m        if(!this.canvasLoaded){[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if (!this.dragable){[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        var minX = Math.ceil(this.thumbEl.getLeft(true));[m
[32m+[m[32m        var minY = Math.ceil(this.thumbEl.getTop(true));[m
[32m+[m[41m        [m
[32m+[m[32m        var maxX = Math.ceil(minX + this.thumbEl.getWidth() - this.canvasEl.width);[m
[32m+[m[32m        var maxY = Math.ceil(minY + this.thumbEl.getHeight() - this.canvasEl.height);[m
[32m+[m[41m        [m
[32m+[m[32m        var x = Roo.isTouch ? e.browserEvent.touches[0].pageX : e.getPageX();[m
[32m+[m[32m        var y = Roo.isTouch ? e.browserEvent.touches[0].pageY : e.getPageY();[m
[32m+[m[41m        [m
[32m+[m[32m        x = x - this.mouseX;[m
[32m+[m[32m        y = y - this.mouseY;[m
[32m+[m[41m        [m
[32m+[m[32m        var bgX = Math.ceil(x + this.previewEl.getLeft(true));[m
[32m+[m[32m        var bgY = Math.ceil(y + this.previewEl.getTop(true));[m
[32m+[m[41m        [m
[32m+[m[32m        bgX = (minX < bgX) ? minX : ((maxX > bgX) ? maxX : bgX);[m
[32m+[m[32m        bgY = (minY < bgY) ? minY : ((maxY > bgY) ? maxY : bgY);[m
[32m+[m[41m        [m
[32m+[m[32m        this.previewEl.setLeft(bgX);[m
[32m+[m[32m        this.previewEl.setTop(bgY);[m
[32m+[m[41m        [m
[32m+[m[32m        this.mouseX = Roo.isTouch ? e.browserEvent.touches[0].pageX : e.getPageX();[m
[32m+[m[32m        this.mouseY = Roo.isTouch ? e.browserEvent.touches[0].pageY : e.getPageY();[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    onMouseUp : function(e)[m
[32m+[m[32m    {[m[41m   [m
[32m+[m[32m        e.stopEvent();[m
[32m+[m[41m        [m
[32m+[m[32m        this.dragable = false;[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    onMouseWheel : function(e)[m
[32m+[m[32m    {[m[41m   [m
[32m+[m[32m        e.stopEvent();[m
[32m+[m[41m        [m
[32m+[m[32m        this.startScale = this.scale;[m
[32m+[m[41m        [m
[32m+[m[32m        this.scale = (e.getWheelDelta() == 1) ? (this.scale + 1) : (this.scale - 1);[m
[32m+[m[41m        [m
[32m+[m[32m        if(!this.zoomable()){[m
[32m+[m[32m            this.scale = this.startScale;[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.draw();[m
[32m+[m[41m        [m
[32m+[m[32m        return;[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    zoomable : function()[m
[32m+[m[32m    {[m
[32m+[m[32m        var minScale = this.thumbEl.getWidth() / this.minWidth;[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.minWidth < this.minHeight){[m
[32m+[m[32m            minScale = this.thumbEl.getHeight() / this.minHeight;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        var width = Math.ceil(this.imageEl.OriginWidth * this.getScaleLevel() / minScale);[m
[32m+[m[32m        var height = Math.ceil(this.imageEl.OriginHeight * this.getScaleLevel() / minScale);[m
[32m+[m[41m        [m
[32m+[m[32m        if([m
[32m+[m[32m                this.isDocument &&[m
[32m+[m[32m                (this.rotate == 0 || this.rotate == 180) &&[m[41m [m
[32m+[m[32m                ([m
[32m+[m[32m                    width > this.imageEl.OriginWidth ||[m[41m [m
[32m+[m[32m                    height > this.imageEl.OriginHeight ||[m
[32m+[m[32m                    (width < this.minWidth && height < this.minHeight)[m
[32m+[m[32m                )[m
[32m+[m[32m        ){[m
[32m+[m[32m            return false;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if([m
[32m+[m[32m                this.isDocument &&[m
[32m+[m[32m                (this.rotate == 90 || this.rotate == 270) &&[m[41m [m
[32m+[m[32m                ([m
[32m+[m[32m                    width > this.imageEl.OriginWidth ||[m[41m [m
[32m+[m[32m                    height > this.imageEl.OriginHeight ||[m
[32m+[m[32m                    (width < this.minHeight && height < this.minWidth)[m
[32m+[m[32m                )[m
[32m+[m[32m        ){[m
[32m+[m[32m            return false;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if([m
[32m+[m[32m                !this.isDocument &&[m
[32m+[m[32m                (this.rotate == 0 || this.rotate == 180) &&[m[41m [m
[32m+[m[32m                ([m
[32m+[m[32m                    width < this.minWidth ||[m[41m [m
[32m+[m[32m                    width > this.imageEl.OriginWidth ||[m[41m [m
[32m+[m[32m                    height < this.minHeight ||[m[41m [m
[32m+[m[32m                    height > this.imageEl.OriginHeight[m
[32m+[m[32m                )[m
[32m+[m[32m        ){[m
[32m+[m[32m            return false;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if([m
[32m+[m[32m                !this.isDocument &&[m
[32m+[m[32m                (this.rotate == 90 || this.rotate == 270) &&[m[41m [m
[32m+[m[32m                ([m
[32m+[m[32m                    width < this.minHeight ||[m[41m [m
[32m+[m[32m                    width > this.imageEl.OriginWidth ||[m[41m [m
[32m+[m[32m                    height < this.minWidth ||[m[41m [m
[32m+[m[32m                    height > this.imageEl.OriginHeight[m
[32m+[m[32m                )[m
[32m+[m[32m        ){[m
[32m+[m[32m            return false;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        return true;[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    onRotateLeft : function(e)[m
[32m+[m[32m    {[m[41m   [m
[32m+[m[32m        if(!this.isDocument && (this.canvasEl.height < this.thumbEl.getWidth() || this.canvasEl.width < this.thumbEl.getHeight())){[m
[32m+[m[41m            [m
[32m+[m[32m            var minScale = this.thumbEl.getWidth() / this.minWidth;[m
[32m+[m[41m            [m
[32m+[m[32m            var bw = Math.ceil(this.canvasEl.width / this.getScaleLevel());[m
[32m+[m[32m            var bh = Math.ceil(this.canvasEl.height / this.getScaleLevel());[m
[32m+[m[41m            [m
[32m+[m[32m            this.startScale = this.scale;[m
[32m+[m[41m            [m
[32m+[m[32m            while (this.getScaleLevel() < minScale){[m
[32m+[m[41m            [m
[32m+[m[32m                this.scale = this.scale + 1;[m
[32m+[m[41m                [m
[32m+[m[32m                if(!this.zoomable()){[m
[32m+[m[32m                    break;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                if([m
[32m+[m[32m                        Math.ceil(bw * this.getScaleLevel()) < this.thumbEl.getHeight() ||[m
[32m+[m[32m                        Math.ceil(bh * this.getScaleLevel()) < this.thumbEl.getWidth()[m
[32m+[m[32m                ){[m
[32m+[m[32m                    continue;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                this.rotate = (this.rotate < 90) ? 270 : this.rotate - 90;[m
[32m+[m
[32m+[m[32m                this.draw();[m
[32m+[m[41m                [m
[32m+[m[32m                return;[m
[32m+[m[32m            }[m
[32m+[m[41m            [m
[32m+[m[32m            this.scale = this.startScale;[m
[32m+[m[41m            [m
[32m+[m[32m            this.onRotateFail();[m
[32m+[m[41m            [m
[32m+[m[32m            return false;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.rotate = (this.rotate < 90) ? 270 : this.rotate - 90;[m
[32m+[m
[32m+[m[32m        if(this.isDocument){[m
[32m+[m[32m            this.setThumbBoxSize();[m
[32m+[m[32m            this.setThumbBoxPosition();[m
[32m+[m[32m            this.setCanvasPosition();[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.draw();[m
[32m+[m[41m        [m
[32m+[m[32m        this.fireEvent('rotate', this, 'left');[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    onRotateRight : function(e)[m
[32m+[m[32m    {[m
[32m+[m[32m        if(!this.isDocument && (this.canvasEl.height < this.thumbEl.getWidth() || this.canvasEl.width < this.thumbEl.getHeight())){[m
[32m+[m[41m            [m
[32m+[m[32m            var minScale = this.thumbEl.getWidth() / this.minWidth;[m
[32m+[m[41m        [m
[32m+[m[32m            var bw = Math.ceil(this.canvasEl.width / this.getScaleLevel());[m
[32m+[m[32m            var bh = Math.ceil(this.canvasEl.height / this.getScaleLevel());[m
[32m+[m[41m            [m
[32m+[m[32m            this.startScale = this.scale;[m
[32m+[m[41m            [m
[32m+[m[32m            while (this.getScaleLevel() < minScale){[m
[32m+[m[41m            [m
[32m+[m[32m                this.scale = this.scale + 1;[m
[32m+[m[41m                [m
[32m+[m[32m                if(!this.zoomable()){[m
[32m+[m[32m                    break;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                if([m
[32m+[m[32m                        Math.ceil(bw * this.getScaleLevel()) < this.thumbEl.getHeight() ||[m
[32m+[m[32m                        Math.ceil(bh * this.getScaleLevel()) < this.thumbEl.getWidth()[m
[32m+[m[32m                ){[m
[32m+[m[32m                    continue;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                this.rotate = (this.rotate > 180) ? 0 : this.rotate + 90;[m
[32m+[m
[32m+[m[32m                this.draw();[m
[32m+[m[41m                [m
[32m+[m[32m                return;[m
[32m+[m[32m            }[m
[32m+[m[41m            [m
[32m+[m[32m            this.scale = this.startScale;[m
[32m+[m[41m            [m
[32m+[m[32m            this.onRotateFail();[m
[32m+[m[41m            [m
[32m+[m[32m            return false;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.rotate = (this.rotate > 180) ? 0 : this.rotate + 90;[m
[32m+[m
[32m+[m[32m        if(this.isDocument){[m
[32m+[m[32m            this.setThumbBoxSize();[m
[32m+[m[32m            this.setThumbBoxPosition();[m
[32m+[m[32m            this.setCanvasPosition();[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.draw();[m
[32m+[m[41m        [m
[32m+[m[32m        this.fireEvent('rotate', this, 'right');[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    onRotateFail : function()[m
[32m+[m[32m    {[m
[32m+[m[32m        this.errorEl.show(true);[m
[32m+[m[41m        [m
[32m+[m[32m        var _this = this;[m
[32m+[m[41m        [m
[32m+[m[32m        (function() { _this.errorEl.hide(true); }).defer(this.errorTimeout);[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    draw : function()[m
[32m+[m[32m    {[m
[32m+[m[32m        this.previewEl.dom.innerHTML = '';[m
[32m+[m[41m        [m
[32m+[m[32m        var canvasEl = document.createElement("canvas");[m
[32m+[m[41m        [m
[32m+[m[32m        var contextEl = canvasEl.getContext("2d");[m
[32m+[m[41m        [m
[32m+[m[32m        canvasEl.width = this.imageEl.OriginWidth * this.getScaleLevel();[m
[32m+[m[32m        canvasEl.height = this.imageEl.OriginWidth * this.getScaleLevel();[m
[32m+[m[32m        var center = this.imageEl.OriginWidth / 2;[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.imageEl.OriginWidth < this.imageEl.OriginHeight){[m
[32m+[m[32m            canvasEl.width = this.imageEl.OriginHeight * this.getScaleLevel();[m
[32m+[m[32m            canvasEl.height = this.imageEl.OriginHeight * this.getScaleLevel();[m
[32m+[m[32m            center = this.imageEl.OriginHeight / 2;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        contextEl.scale(this.getScaleLevel(), this.getScaleLevel());[m
[32m+[m[41m        [m
[32m+[m[32m        contextEl.translate(center, center);[m
[32m+[m[32m        contextEl.rotate(this.rotate * Math.PI / 180);[m
[32m+[m
[32m+[m[32m        contextEl.drawImage(this.imageEl, 0, 0, this.imageEl.OriginWidth, this.imageEl.OriginHeight, center * -1, center * -1, this.imageEl.OriginWidth, this.imageEl.OriginHeight);[m
[32m+[m[41m        [m
[32m+[m[32m        this.canvasEl = document.createElement("canvas");[m
[32m+[m[41m        [m
[32m+[m[32m        this.contextEl = this.canvasEl.getContext("2d");[m
[32m+[m[41m        [m
[32m+[m[32m        switch (this.rotate) {[m
[32m+[m[32m            case 0 :[m
[32m+[m[41m                [m
[32m+[m[32m                this.canvasEl.width = this.imageEl.OriginWidth * this.getScaleLevel();[m
[32m+[m[32m                this.canvasEl.height = this.imageEl.OriginHeight * this.getScaleLevel();[m
[32m+[m[41m                [m
[32m+[m[32m                this.contextEl.drawImage(canvasEl, 0, 0, this.canvasEl.width, this.canvasEl.height, 0, 0, this.canvasEl.width, this.canvasEl.height);[m
[32m+[m[41m                [m
[32m+[m[32m                break;[m
[32m+[m[32m            case 90 :[m[41m [m
[32m+[m[41m                [m
[32m+[m[32m                this.canvasEl.width = this.imageEl.OriginHeight * this.getScaleLevel();[m
[32m+[m[32m                this.canvasEl.height = this.imageEl.OriginWidth * this.getScaleLevel();[m
[32m+[m[41m                [m
[32m+[m[32m                if(this.imageEl.OriginWidth > this.imageEl.OriginHeight){[m
[32m+[m[32m                    this.contextEl.drawImage(canvasEl, Math.abs(this.canvasEl.width - this.canvasEl.height), 0, this.canvasEl.width, this.canvasEl.height, 0, 0, this.canvasEl.width, this.canvasEl.height);[m
[32m+[m[32m                    break;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                this.contextEl.drawImage(canvasEl, 0, 0, this.canvasEl.width, this.canvasEl.height, 0, 0, this.canvasEl.width, this.canvasEl.height);[m
[32m+[m[41m                [m
[32m+[m[32m                break;[m
[32m+[m[32m            case 180 :[m
[32m+[m[41m                [m
[32m+[m[32m                this.canvasEl.width = this.imageEl.OriginWidth * this.getScaleLevel();[m
[32m+[m[32m                this.canvasEl.height = this.imageEl.OriginHeight * this.getScaleLevel();[m
[32m+[m[41m                [m
[32m+[m[32m                if(this.imageEl.OriginWidth > this.imageEl.OriginHeight){[m
[32m+[m[32m                    this.contextEl.drawImage(canvasEl, 0, Math.abs(this.canvasEl.width - this.canvasEl.height), this.canvasEl.width, this.canvasEl.height, 0, 0, this.canvasEl.width, this.canvasEl.height);[m
[32m+[m[32m                    break;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                this.contextEl.drawImage(canvasEl, Math.abs(this.canvasEl.width - this.canvasEl.height), 0, this.canvasEl.width, this.canvasEl.height, 0, 0, this.canvasEl.width, this.canvasEl.height);[m
[32m+[m[41m                [m
[32m+[m[32m                break;[m
[32m+[m[32m            case 270 :[m
[32m+[m[41m                [m
[32m+[m[32m                this.canvasEl.width = this.imageEl.OriginHeight * this.getScaleLevel();[m
[32m+[m[32m                this.canvasEl.height = this.imageEl.OriginWidth * this.getScaleLevel();[m
[32m+[m[41m        [m
[32m+[m[32m                if(this.imageEl.OriginWidth > this.imageEl.OriginHeight){[m
[32m+[m[32m                    this.contextEl.drawImage(canvasEl, 0, 0, this.canvasEl.width, this.canvasEl.height, 0, 0, this.canvasEl.width, this.canvasEl.height);[m
[32m+[m[32m                    break;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                this.contextEl.drawImage(canvasEl, 0, Math.abs(this.canvasEl.width - this.canvasEl.height), this.canvasEl.width, this.canvasEl.height, 0, 0, this.canvasEl.width, this.canvasEl.height);[m
[32m+[m[41m                [m
[32m+[m[32m                break;[m
[32m+[m[32m            default :[m[41m [m
[32m+[m[32m                break;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.previewEl.appendChild(this.canvasEl);[m
[32m+[m[41m        [m
[32m+[m[32m        this.setCanvasPosition();[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    crop : function()[m
[32m+[m[32m    {[m
[32m+[m[32m        if(!this.canvasLoaded){[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        var imageCanvas = document.createElement("canvas");[m
[32m+[m[41m        [m
[32m+[m[32m        var imageContext = imageCanvas.getContext("2d");[m
[32m+[m[41m        [m
[32m+[m[32m        imageCanvas.width = (this.imageEl.OriginWidth > this.imageEl.OriginHeight) ? this.imageEl.OriginWidth : this.imageEl.OriginHeight;[m
[32m+[m[32m        imageCanvas.height = (this.imageEl.OriginWidth > this.imageEl.OriginHeight) ? this.imageEl.OriginWidth : this.imageEl.OriginHeight;[m
[32m+[m[41m        [m
[32m+[m[32m        var center = imageCanvas.width / 2;[m
[32m+[m[41m        [m
[32m+[m[32m        imageContext.translate(center, center);[m
[32m+[m[41m        [m
[32m+[m[32m        imageContext.rotate(this.rotate * Math.PI / 180);[m
[32m+[m[41m        [m
[32m+[m[32m        imageContext.drawImage(this.imageEl, 0, 0, this.imageEl.OriginWidth, this.imageEl.OriginHeight, center * -1, center * -1, this.imageEl.OriginWidth, this.imageEl.OriginHeight);[m
[32m+[m[41m        [m
[32m+[m[32m        var canvas = document.createElement("canvas");[m
[32m+[m[41m        [m
[32m+[m[32m        var context = canvas.getContext("2d");[m
[32m+[m[41m                [m
[32m+[m[32m        canvas.width = this.minWidth;[m
[32m+[m[32m        canvas.height = this.minHeight;[m
[32m+[m
[32m+[m[32m        switch (this.rotate) {[m
[32m+[m[32m            case 0 :[m
[32m+[m[41m                [m
[32m+[m[32m                var width = (this.thumbEl.getWidth() / this.getScaleLevel() > this.imageEl.OriginWidth) ? this.imageEl.OriginWidth : (this.thumbEl.getWidth() / this.getScaleLevel());[m
[32m+[m[32m                var height = (this.thumbEl.getHeight() / this.getScaleLevel() > this.imageEl.OriginHeight) ? this.imageEl.OriginHeight : (this.thumbEl.getHeight() / this.getScaleLevel());[m
[32m+[m[41m                [m
[32m+[m[32m                var x = (this.thumbEl.getLeft(true) > this.previewEl.getLeft(true)) ? 0 : ((this.previewEl.getLeft(true) - this.thumbEl.getLeft(true)) / this.getScaleLevel());[m
[32m+[m[32m                var y = (this.thumbEl.getTop(true) > this.previewEl.getTop(true)) ? 0 : ((this.previewEl.getTop(true) - this.thumbEl.getTop(true)) / this.getScaleLevel());[m
[32m+[m[41m                [m
[32m+[m[32m                var targetWidth = this.minWidth - 2 * x;[m
[32m+[m[32m                var targetHeight = this.minHeight - 2 * y;[m
[32m+[m[41m                [m
[32m+[m[32m                var scale = 1;[m
[32m+[m[41m                [m
[32m+[m[32m                if((x == 0 && y == 0) || (x == 0 && y > 0)){[m
[32m+[m[32m                    scale = targetWidth / width;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                if(x > 0 && y == 0){[m
[32m+[m[32m                    scale = targetHeight / height;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                if(x > 0 && y > 0){[m
[32m+[m[32m                    scale = targetWidth / width;[m
[32m+[m[41m                    [m
[32m+[m[32m                    if(width < height){[m
[32m+[m[32m                        scale = targetHeight / height;[m
[32m+[m[32m                    }[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                context.scale(scale, scale);[m
[32m+[m[41m                [m
[32m+[m[32m                var sx = Math.min(this.canvasEl.width - this.thumbEl.getWidth(), this.thumbEl.getLeft(true) - this.previewEl.getLeft(true));[m
[32m+[m[32m                var sy = Math.min(this.canvasEl.height - this.thumbEl.getHeight(), this.thumbEl.getTop(true) - this.previewEl.getTop(true));[m
[32m+[m
[32m+[m[32m                sx = sx < 0 ? 0 : (sx / this.getScaleLevel());[m
[32m+[m[32m                sy = sy < 0 ? 0 : (sy / this.getScaleLevel());[m
[32m+[m
[32m+[m[32m                context.drawImage(imageCanvas, sx, sy, width, height, x, y, width, height);[m
[32m+[m[41m                [m
[32m+[m[32m                break;[m
[32m+[m[32m            case 90 :[m[41m [m
[32m+[m[41m                [m
[32m+[m[32m                var width = (this.thumbEl.getWidth() / this.getScaleLevel() > this.imageEl.OriginHeight) ? this.imageEl.OriginHeight : (this.thumbEl.getWidth() / this.getScaleLevel());[m
[32m+[m[32m                var height = (this.thumbEl.getHeight() / this.getScaleLevel() > this.imageEl.OriginWidth) ? this.imageEl.OriginWidth : (this.thumbEl.getHeight() / this.getScaleLevel());[m
[32m+[m[41m                [m
[32m+[m[32m                var x = (this.thumbEl.getLeft(true) > this.previewEl.getLeft(true)) ? 0 : ((this.previewEl.getLeft(true) - this.thumbEl.getLeft(true)) / this.getScaleLevel());[m
[32m+[m[32m                var y = (this.thumbEl.getTop(true) > this.previewEl.getTop(true)) ? 0 : ((this.previewEl.getTop(true) - this.thumbEl.getTop(true)) / this.getScaleLevel());[m
[32m+[m[41m                [m
[32m+[m[32m                var targetWidth = this.minWidth - 2 * x;[m
[32m+[m[32m                var targetHeight = this.minHeight - 2 * y;[m
[32m+[m[41m                [m
[32m+[m[32m                var scale = 1;[m
[32m+[m[41m                [m
[32m+[m[32m                if((x == 0 && y == 0) || (x == 0 && y > 0)){[m
[32m+[m[32m                    scale = targetWidth / width;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                if(x > 0 && y == 0){[m
[32m+[m[32m                    scale = targetHeight / height;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                if(x > 0 && y > 0){[m
[32m+[m[32m                    scale = targetWidth / width;[m
[32m+[m[41m                    [m
[32m+[m[32m                    if(width < height){[m
[32m+[m[32m                        scale = targetHeight / height;[m
[32m+[m[32m                    }[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                context.scale(scale, scale);[m
[32m+[m[41m                [m
[32m+[m[32m                var sx = Math.min(this.canvasEl.width - this.thumbEl.getWidth(), this.thumbEl.getLeft(true) - this.previewEl.getLeft(true));[m
[32m+[m[32m                var sy = Math.min(this.canvasEl.height - this.thumbEl.getHeight(), this.thumbEl.getTop(true) - this.previewEl.getTop(true));[m
[32m+[m
[32m+[m[32m                sx = sx < 0 ? 0 : (sx / this.getScaleLevel());[m
[32m+[m[32m                sy = sy < 0 ? 0 : (sy / this.getScaleLevel());[m
[32m+[m[41m                [m
[32m+[m[32m                sx += (this.imageEl.OriginWidth > this.imageEl.OriginHeight) ? Math.abs(this.imageEl.OriginWidth - this.imageEl.OriginHeight) : 0;[m
[32m+[m[41m                [m
[32m+[m[32m                context.drawImage(imageCanvas, sx, sy, width, height, x, y, width, height);[m
[32m+[m[41m                [m
[32m+[m[32m                break;[m
[32m+[m[32m            case 180 :[m
[32m+[m[41m                [m
[32m+[m[32m                var width = (this.thumbEl.getWidth() / this.getScaleLevel() > this.imageEl.OriginWidth) ? this.imageEl.OriginWidth : (this.thumbEl.getWidth() / this.getScaleLevel());[m
[32m+[m[32m                var height = (this.thumbEl.getHeight() / this.getScaleLevel() > this.imageEl.OriginHeight) ? this.imageEl.OriginHeight : (this.thumbEl.getHeight() / this.getScaleLevel());[m
[32m+[m[41m                [m
[32m+[m[32m                var x = (this.thumbEl.getLeft(true) > this.previewEl.getLeft(true)) ? 0 : ((this.previewEl.getLeft(true) - this.thumbEl.getLeft(true)) / this.getScaleLevel());[m
[32m+[m[32m                var y = (this.thumbEl.getTop(true) > this.previewEl.getTop(true)) ? 0 : ((this.previewEl.getTop(true) - this.thumbEl.getTop(true)) / this.getScaleLevel());[m
[32m+[m[41m                [m
[32m+[m[32m                var targetWidth = this.minWidth - 2 * x;[m
[32m+[m[32m                var targetHeight = this.minHeight - 2 * y;[m
[32m+[m[41m                [m
[32m+[m[32m                var scale = 1;[m
[32m+[m[41m                [m
[32m+[m[32m                if((x == 0 && y == 0) || (x == 0 && y > 0)){[m
[32m+[m[32m                    scale = targetWidth / width;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                if(x > 0 && y == 0){[m
[32m+[m[32m                    scale = targetHeight / height;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                if(x > 0 && y > 0){[m
[32m+[m[32m                    scale = targetWidth / width;[m
[32m+[m[41m                    [m
[32m+[m[32m                    if(width < height){[m
[32m+[m[32m                        scale = targetHeight / height;[m
[32m+[m[32m                    }[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                context.scale(scale, scale);[m
[32m+[m[41m                [m
[32m+[m[32m                var sx = Math.min(this.canvasEl.width - this.thumbEl.getWidth(), this.thumbEl.getLeft(true) - this.previewEl.getLeft(true));[m
[32m+[m[32m                var sy = Math.min(this.canvasEl.height - this.thumbEl.getHeight(), this.thumbEl.getTop(true) - this.previewEl.getTop(true));[m
[32m+[m
[32m+[m[32m                sx = sx < 0 ? 0 : (sx / this.getScaleLevel());[m
[32m+[m[32m                sy = sy < 0 ? 0 : (sy / this.getScaleLevel());[m
[32m+[m
[32m+[m[32m                sx += (this.imageEl.OriginWidth > this.imageEl.OriginHeight) ? 0 : Math.abs(this.imageEl.OriginWidth - this.imageEl.OriginHeight);[m
[32m+[m[32m                sy += (this.imageEl.OriginWidth > this.imageEl.OriginHeight) ? Math.abs(this.imageEl.OriginWidth - this.imageEl.OriginHeight) : 0;[m
[32m+[m[41m                [m
[32m+[m[32m                context.drawImage(imageCanvas, sx, sy, width, height, x, y, width, height);[m
[32m+[m[41m                [m
[32m+[m[32m                break;[m
[32m+[m[32m            case 270 :[m
[32m+[m[41m                [m
[32m+[m[32m                var width = (this.thumbEl.getWidth() / this.getScaleLevel() > this.imageEl.OriginHeight) ? this.imageEl.OriginHeight : (this.thumbEl.getWidth() / this.getScaleLevel());[m
[32m+[m[32m                var height = (this.thumbEl.getHeight() / this.getScaleLevel() > this.imageEl.OriginWidth) ? this.imageEl.OriginWidth : (this.thumbEl.getHeight() / this.getScaleLevel());[m
[32m+[m[41m                [m
[32m+[m[32m                var x = (this.thumbEl.getLeft(true) > this.previewEl.getLeft(true)) ? 0 : ((this.previewEl.getLeft(true) - this.thumbEl.getLeft(true)) / this.getScaleLevel());[m
[32m+[m[32m                var y = (this.thumbEl.getTop(true) > this.previewEl.getTop(true)) ? 0 : ((this.previewEl.getTop(true) - this.thumbEl.getTop(true)) / this.getScaleLevel());[m
[32m+[m[41m                [m
[32m+[m[32m                var targetWidth = this.minWidth - 2 * x;[m
[32m+[m[32m                var targetHeight = this.minHeight - 2 * y;[m
[32m+[m[41m                [m
[32m+[m[32m                var scale = 1;[m
[32m+[m[41m                [m
[32m+[m[32m                if((x == 0 && y == 0) || (x == 0 && y > 0)){[m
[32m+[m[32m                    scale = targetWidth / width;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                if(x > 0 && y == 0){[m
[32m+[m[32m                    scale = targetHeight / height;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                if(x > 0 && y > 0){[m
[32m+[m[32m                    scale = targetWidth / width;[m
[32m+[m[41m                    [m
[32m+[m[32m                    if(width < height){[m
[32m+[m[32m                        scale = targetHeight / height;[m
[32m+[m[32m                    }[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                context.scale(scale, scale);[m
[32m+[m[41m                [m
[32m+[m[32m                var sx = Math.min(this.canvasEl.width - this.thumbEl.getWidth(), this.thumbEl.getLeft(true) - this.previewEl.getLeft(true));[m
[32m+[m[32m                var sy = Math.min(this.canvasEl.height - this.thumbEl.getHeight(), this.thumbEl.getTop(true) - this.previewEl.getTop(true));[m
[32m+[m
[32m+[m[32m                sx = sx < 0 ? 0 : (sx / this.getScaleLevel());[m
[32m+[m[32m                sy = sy < 0 ? 0 : (sy / this.getScaleLevel());[m
[32m+[m[41m                [m
[32m+[m[32m                sy += (this.imageEl.OriginWidth > this.imageEl.OriginHeight) ? 0 : Math.abs(this.imageEl.OriginWidth - this.imageEl.OriginHeight);[m
[32m+[m[41m                [m
[32m+[m[32m                context.drawImage(imageCanvas, sx, sy, width, height, x, y, width, height);[m
[32m+[m[41m                [m
[32m+[m[32m                break;[m
[32m+[m[32m            default :[m[41m [m
[32m+[m[32m                break;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.cropData = canvas.toDataURL(this.cropType);[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.fireEvent('crop', this, this.cropData) !== false){[m
[32m+[m[32m            this.process(this.file, this.cropData);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        return;[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    setThumbBoxSize : function()[m
[32m+[m[32m    {[m
[32m+[m[32m        var width, height;[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.isDocument && typeof(this.imageEl) != 'undefined'){[m
[32m+[m[32m            width = (this.imageEl.OriginWidth > this.imageEl.OriginHeight) ? Math.max(this.minWidth, this.minHeight) : Math.min(this.minWidth, this.minHeight);[m
[32m+[m[32m            height = (this.imageEl.OriginWidth > this.imageEl.OriginHeight) ? Math.min(this.minWidth, this.minHeight) : Math.max(this.minWidth, this.minHeight);[m
[32m+[m[41m            [m
[32m+[m[32m            this.minWidth = width;[m
[32m+[m[32m            this.minHeight = height;[m
[32m+[m[41m            [m
[32m+[m[32m            if(this.rotate == 90 || this.rotate == 270){[m
[32m+[m[32m                this.minWidth = height;[m
[32m+[m[32m                this.minHeight = width;[m
[32m+[m[32m            }[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        height = 300;[m
[32m+[m[32m        width = Math.ceil(this.minWidth * height / this.minHeight);[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.minWidth > this.minHeight){[m
[32m+[m[32m            width = 300;[m
[32m+[m[32m            height = Math.ceil(this.minHeight * width / this.minWidth);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.thumbEl.setStyle({[m
[32m+[m[32m            width : width + 'px',[m
[32m+[m[32m            height : height + 'px'[m
[32m+[m[32m        });[m
[32m+[m
[32m+[m[32m        return;[m
[32m+[m[41m            [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    setThumbBoxPosition : function()[m
[32m+[m[32m    {[m
[32m+[m[32m        var x = Math.ceil((this.bodyEl.getWidth() - this.thumbEl.getWidth()) / 2 );[m
[32m+[m[32m        var y = Math.ceil((this.bodyEl.getHeight() - this.thumbEl.getHeight()) / 2);[m
[32m+[m[41m        [m
[32m+[m[32m        this.thumbEl.setLeft(x);[m
[32m+[m[32m        this.thumbEl.setTop(y);[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    baseRotateLevel : function()[m
[32m+[m[32m    {[m
[32m+[m[32m        this.baseRotate = 1;[m
[32m+[m[41m        [m
[32m+[m[32m        if([m
[32m+[m[32m                typeof(this.exif) != 'undefined' &&[m
[32m+[m[32m                typeof(this.exif[Roo.dialog.UploadCropbox['tags']['Orientation']]) != 'undefined' &&[m
[32m+[m[32m                [1, 3, 6, 8].indexOf(this.exif[Roo.dialog.UploadCropbox['tags']['Orientation']]) != -1[m
[32m+[m[32m        ){[m
[32m+[m[32m            this.baseRotate = this.exif[Roo.dialog.UploadCropbox['tags']['Orientation']];[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.rotate = Roo.dialog.UploadCropbox['Orientation'][this.baseRotate];[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    baseScaleLevel : function()[m
[32m+[m[32m    {[m
[32m+[m[32m        var width, height;[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.isDocument){[m
[32m+[m[41m            [m
[32m+[m[32m            if(this.baseRotate == 6 || this.baseRotate == 8){[m
[32m+[m[41m            [m
[32m+[m[32m                height = this.thumbEl.getHeight();[m
[32m+[m[32m                this.baseScale = height / this.imageEl.OriginWidth;[m
[32m+[m
[32m+[m[32m                if(this.imageEl.OriginHeight * this.baseScale > this.thumbEl.getWidth()){[m
[32m+[m[32m                    width = this.thumbEl.getWidth();[m
[32m+[m[32m                    this.baseScale = width / this.imageEl.OriginHeight;[m
[32m+[m[32m                }[m
[32m+[m
[32m+[m[32m                return;[m
[32m+[m[32m            }[m
[32m+[m
[32m+[m[32m            height = this.thumbEl.getHeight();[m
[32m+[m[32m            this.baseScale = height / this.imageEl.OriginHeight;[m
[32m+[m
[32m+[m[32m            if(this.imageEl.OriginWidth * this.baseScale > this.thumbEl.getWidth()){[m
[32m+[m[32m                width = this.thumbEl.getWidth();[m
[32m+[m[32m                this.baseScale = width / this.imageEl.OriginWidth;[m
[32m+[m[32m            }[m
[32m+[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.baseRotate == 6 || this.baseRotate == 8){[m
[32m+[m[41m            [m
[32m+[m[32m            width = this.thumbEl.getHeight();[m
[32m+[m[32m            this.baseScale = width / this.imageEl.OriginHeight;[m
[32m+[m[41m            [m
[32m+[m[32m            if(this.imageEl.OriginHeight * this.baseScale < this.thumbEl.getWidth()){[m
[32m+[m[32m                height = this.thumbEl.getWidth();[m
[32m+[m[32m                this.baseScale = height / this.imageEl.OriginHeight;[m
[32m+[m[32m            }[m
[32m+[m[41m            [m
[32m+[m[32m            if(this.imageEl.OriginWidth > this.imageEl.OriginHeight){[m
[32m+[m[32m                height = this.thumbEl.getWidth();[m
[32m+[m[32m                this.baseScale = height / this.imageEl.OriginHeight;[m
[32m+[m[41m                [m
[32m+[m[32m                if(this.imageEl.OriginWidth * this.baseScale < this.thumbEl.getHeight()){[m
[32m+[m[32m                    width = this.thumbEl.getHeight();[m
[32m+[m[32m                    this.baseScale = width / this.imageEl.OriginWidth;[m
[32m+[m[32m                }[m
[32m+[m[32m            }[m
[32m+[m[41m            [m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        width = this.thumbEl.getWidth();[m
[32m+[m[32m        this.baseScale = width / this.imageEl.OriginWidth;[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.imageEl.OriginHeight * this.baseScale < this.thumbEl.getHeight()){[m
[32m+[m[32m            height = this.thumbEl.getHeight();[m
[32m+[m[32m            this.baseScale = height / this.imageEl.OriginHeight;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.imageEl.OriginWidth > this.imageEl.OriginHeight){[m
[32m+[m[41m            [m
[32m+[m[32m            height = this.thumbEl.getHeight();[m
[32m+[m[32m            this.baseScale = height / this.imageEl.OriginHeight;[m
[32m+[m[41m            [m
[32m+[m[32m            if(this.imageEl.OriginWidth * this.baseScale < this.thumbEl.getWidth()){[m
[32m+[m[32m                width = this.thumbEl.getWidth();[m
[32m+[m[32m                this.baseScale = width / this.imageEl.OriginWidth;[m
[32m+[m[32m            }[m
[32m+[m[41m            [m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        return;[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    getScaleLevel : function()[m
[32m+[m[32m    {[m
[32m+[m[32m        return this.baseScale * Math.pow(1.1, this.scale);[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    onTouchStart : function(e)[m
[32m+[m[32m    {[m
[32m+[m[32m        if(!this.canvasLoaded){[m
[32m+[m[32m            this.beforeSelectFile(e);[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        var touches = e.browserEvent.touches;[m
[32m+[m[41m        [m
[32m+[m[32m        if(!touches){[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if(touches.length == 1){[m
[32m+[m[32m            this.onMouseDown(e);[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if(touches.length != 2){[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        var coords = [];[m
[32m+[m[41m        [m
[32m+[m[32m        for(var i = 0, finger; finger = touches[i]; i++){[m
[32m+[m[32m            coords.push(finger.pageX, finger.pageY);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        var x = Math.pow(coords[0] - coords[2], 2);[m
[32m+[m[32m        var y = Math.pow(coords[1] - coords[3], 2);[m
[32m+[m[41m        [m
[32m+[m[32m        this.startDistance = Math.sqrt(x + y);[m
[32m+[m[41m        [m
[32m+[m[32m        this.startScale = this.scale;[m
[32m+[m[41m        [m
[32m+[m[32m        this.pinching = true;[m
[32m+[m[32m        this.dragable = false;[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    onTouchMove : function(e)[m
[32m+[m[32m    {[m
[32m+[m[32m        if(!this.pinching && !this.dragable){[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        var touches = e.browserEvent.touches;[m
[32m+[m[41m        [m
[32m+[m[32m        if(!touches){[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.dragable){[m
[32m+[m[32m            this.onMouseMove(e);[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        var coords = [];[m
[32m+[m[41m        [m
[32m+[m[32m        for(var i = 0, finger; finger = touches[i]; i++){[m
[32m+[m[32m            coords.push(finger.pageX, finger.pageY);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        var x = Math.pow(coords[0] - coords[2], 2);[m
[32m+[m[32m        var y = Math.pow(coords[1] - coords[3], 2);[m
[32m+[m[41m        [m
[32m+[m[32m        this.endDistance = Math.sqrt(x + y);[m
[32m+[m[41m        [m
[32m+[m[32m        this.scale = this.startScale + Math.floor(Math.log(this.endDistance / this.startDistance) / Math.log(1.1));[m
[32m+[m[41m        [m
[32m+[m[32m        if(!this.zoomable()){[m
[32m+[m[32m            this.scale = this.startScale;[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.draw();[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    onTouchEnd : function(e)[m
[32m+[m[32m    {[m
[32m+[m[32m        this.pinching = false;[m
[32m+[m[32m        this.dragable = false;[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    process : function(file, crop)[m
[32m+[m[32m    {[m
[32m+[m[32m        if(this.loadMask){[m
[32m+[m[32m            this.maskEl.mask(this.loadingText);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.xhr = new XMLHttpRequest();[m
[32m+[m[41m        [m
[32m+[m[32m        file.xhr = this.xhr;[m
[32m+[m
[32m+[m[32m        this.xhr.open(this.method, this.url, true);[m
[32m+[m[41m        [m
[32m+[m[32m        var headers = {[m
[32m+[m[32m            "Accept": "application/json",[m
[32m+[m[32m            "Cache-Control": "no-cache",[m
[32m+[m[32m            "X-Requested-With": "XMLHttpRequest"[m
[32m+[m[32m        };[m
[32m+[m[41m        [m
[32m+[m[32m        for (var headerName in headers) {[m
[32m+[m[32m            var headerValue = headers[headerName];[m
[32m+[m[32m            if (headerValue) {[m
[32m+[m[32m                this.xhr.setRequestHeader(headerName, headerValue);[m
[32m+[m[32m            }[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        var _this = this;[m
[32m+[m[41m        [m
[32m+[m[32m        this.xhr.onload = function()[m
[32m+[m[32m        {[m
[32m+[m[32m            _this.xhrOnLoad(_this.xhr);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.xhr.onerror = function()[m
[32m+[m[32m        {[m
[32m+[m[32m            _this.xhrOnError(_this.xhr);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        var formData = new FormData();[m
[32m+[m
[32m+[m[32m        formData.append('returnHTML', 'NO');[m
[32m+[m[41m        [m
[32m+[m[32m        if(crop){[m
[32m+[m[32m            formData.append('crop', crop);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if(typeof(file) != 'undefined' && (typeof(file.id) == 'undefined' || file.id * 1 < 1)){[m
[32m+[m[32m            formData.append(this.paramName, file, file.name);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if(typeof(file.filename) != 'undefined'){[m
[32m+[m[32m            formData.append('filename', file.filename);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if(typeof(file.mimetype) != 'undefined'){[m
[32m+[m[32m            formData.append('mimetype', file.mimetype);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.fireEvent('arrange', this, formData) != false){[m
[32m+[m[32m            this.xhr.send(formData);[m
[32m+[m[32m        };[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    xhrOnLoad : function(xhr)[m
[32m+[m[32m    {[m
[32m+[m[32m        if(this.loadMask){[m
[32m+[m[32m            this.maskEl.unmask();[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if (xhr.readyState !== 4) {[m
[32m+[m[32m            this.fireEvent('exception', this, xhr);[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m
[32m+[m[32m        var response = Roo.decode(xhr.responseText);[m
[32m+[m[41m        [m
[32m+[m[32m        if(!response.success){[m
[32m+[m[32m            this.fireEvent('exception', this, xhr);[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        var response = Roo.decode(xhr.responseText);[m
[32m+[m[41m        [m
[32m+[m[32m        this.fireEvent('upload', this, response);[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    xhrOnError : function()[m
[32m+[m[32m    {[m
[32m+[m[32m        if(this.loadMask){[m
[32m+[m[32m            this.maskEl.unmask();[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        Roo.log('xhr on error');[m
[32m+[m[41m        [m
[32m+[m[32m        var response = Roo.decode(xhr.responseText);[m
[32m+[m[41m          [m
[32m+[m[32m        Roo.log(response);[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    prepare : function(file)[m
[32m+[m[32m    {[m[41m   [m
[32m+[m[32m        if(this.loadMask){[m
[32m+[m[32m            this.maskEl.mask(this.loadingText);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.file = false;[m
[32m+[m[32m        this.exif = {};[m
[32m+[m[41m        [m
[32m+[m[32m        if(typeof(file) === 'string'){[m
[32m+[m[32m            this.loadCanvas(file);[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if(!file || !this.urlAPI){[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.file = file;[m
[32m+[m[32m        this.cropType = file.type;[m
[32m+[m[41m        [m
[32m+[m[32m        var _this = this;[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.fireEvent('prepare', this, this.file) != false){[m
[32m+[m[41m            [m
[32m+[m[32m            var reader = new FileReader();[m
[32m+[m[41m            [m
[32m+[m[32m            reader.onload = function (e) {[m
[32m+[m[32m                if (e.target.error) {[m
[32m+[m[32m                    Roo.log(e.target.error);[m
[32m+[m[32m                    return;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                var buffer = e.target.result,[m
[32m+[m[32m                    dataView = new DataView(buffer),[m
[32m+[m[32m                    offset = 2,[m
[32m+[m[32m                    maxOffset = dataView.byteLength - 4,[m
[32m+[m[32m                    markerBytes,[m
[32m+[m[32m                    markerLength;[m
[32m+[m[41m                [m
[32m+[m[32m                if (dataView.getUint16(0) === 0xffd8) {[m
[32m+[m[32m                    while (offset < maxOffset) {[m
[32m+[m[32m                        markerBytes = dataView.getUint16(offset);[m
[32m+[m[41m                        [m
[32m+[m[32m                        if ((markerBytes >= 0xffe0 && markerBytes <= 0xffef) || markerBytes === 0xfffe) {[m
[32m+[m[32m                            markerLength = dataView.getUint16(offset + 2) + 2;[m
[32m+[m[32m                            if (offset + markerLength > dataView.byteLength) {[m
[32m+[m[32m                                Roo.log('Invalid meta data: Invalid segment size.');[m
[32m+[m[32m                                break;[m
[32m+[m[32m                            }[m
[32m+[m[41m                            [m
[32m+[m[32m                            if(markerBytes == 0xffe1){[m
[32m+[m[32m                                _this.parseExifData([m
[32m+[m[32m                                    dataView,[m
[32m+[m[32m                                    offset,[m
[32m+[m[32m                                    markerLength[m
[32m+[m[32m                                );[m
[32m+[m[32m                            }[m
[32m+[m[41m                            [m
[32m+[m[32m                            offset += markerLength;[m
[32m+[m[41m                            [m
[32m+[m[32m                            continue;[m
[32m+[m[32m                        }[m
[32m+[m[41m                        [m
[32m+[m[32m                        break;[m
[32m+[m[32m                    }[m
[32m+[m[41m                    [m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                var url = _this.urlAPI.createObjectURL(_this.file);[m
[32m+[m[41m                [m
[32m+[m[32m                _this.loadCanvas(url);[m
[32m+[m[41m                [m
[32m+[m[32m                return;[m
[32m+[m[32m            }[m
[32m+[m[41m            [m
[32m+[m[32m            reader.readAsArrayBuffer(this.file);[m
[32m+[m[41m            [m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    parseExifData : function(dataView, offset, length)[m
[32m+[m[32m    {[m
[32m+[m[32m        var tiffOffset = offset + 10,[m
[32m+[m[32m            littleEndian,[m
[32m+[m[32m            dirOffset;[m
[32m+[m[41m    [m
[32m+[m[32m        if (dataView.getUint32(offset + 4) !== 0x45786966) {[m
[32m+[m[32m            // No Exif data, might be XMP data instead[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        // Check for the ASCII code for "Exif" (0x45786966):[m
[32m+[m[32m        if (dataView.getUint32(offset + 4) !== 0x45786966) {[m
[32m+[m[32m            // No Exif data, might be XMP data instead[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[32m        if (tiffOffset + 8 > dataView.byteLength) {[m
[32m+[m[32m            Roo.log('Invalid Exif data: Invalid segment size.');[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[32m        // Check for the two null bytes:[m
[32m+[m[32m        if (dataView.getUint16(offset + 8) !== 0x0000) {[m
[32m+[m[32m            Roo.log('Invalid Exif data: Missing byte alignment offset.');[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[32m        // Check the byte alignment:[m
[32m+[m[32m        switch (dataView.getUint16(tiffOffset)) {[m
[32m+[m[32m        case 0x4949:[m
[32m+[m[32m            littleEndian = true;[m
[32m+[m[32m            break;[m
[32m+[m[32m        case 0x4D4D:[m
[32m+[m[32m            littleEndian = false;[m
[32m+[m[32m            break;[m
[32m+[m[32m        default:[m
[32m+[m[32m            Roo.log('Invalid Exif data: Invalid byte alignment marker.');[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[32m        // Check for the TIFF tag marker (0x002A):[m
[32m+[m[32m        if (dataView.getUint16(tiffOffset + 2, littleEndian) !== 0x002A) {[m
[32m+[m[32m            Roo.log('Invalid Exif data: Missing TIFF marker.');[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[32m        // Retrieve the directory offset bytes, usually 0x00000008 or 8 decimal:[m
[32m+[m[32m        dirOffset = dataView.getUint32(tiffOffset + 4, littleEndian);[m
[32m+[m[41m        [m
[32m+[m[32m        this.parseExifTags([m
[32m+[m[32m            dataView,[m
[32m+[m[32m            tiffOffset,[m
[32m+[m[32m            tiffOffset + dirOffset,[m
[32m+[m[32m            littleEndian[m
[32m+[m[32m        );[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    parseExifTags : function(dataView, tiffOffset, dirOffset, littleEndian)[m
[32m+[m[32m    {[m
[32m+[m[32m        var tagsNumber,[m
[32m+[m[32m            dirEndOffset,[m
[32m+[m[32m            i;[m
[32m+[m[32m        if (dirOffset + 6 > dataView.byteLength) {[m
[32m+[m[32m            Roo.log('Invalid Exif data: Invalid directory offset.');[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[32m        tagsNumber = dataView.getUint16(dirOffset, littleEndian);[m
[32m+[m[32m        dirEndOffset = dirOffset + 2 + 12 * tagsNumber;[m
[32m+[m[32m        if (dirEndOffset + 4 > dataView.byteLength) {[m
[32m+[m[32m            Roo.log('Invalid Exif data: Invalid directory size.');[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[32m        for (i = 0; i < tagsNumber; i += 1) {[m
[32m+[m[32m            this.parseExifTag([m
[32m+[m[32m                dataView,[m
[32m+[m[32m                tiffOffset,[m
[32m+[m[32m                dirOffset + 2 + 12 * i, // tag offset[m
[32m+[m[32m                littleEndian[m
[32m+[m[32m            );[m
[32m+[m[32m        }[m
[32m+[m[32m        // Return the offset to the next directory:[m
[32m+[m[32m        return dataView.getUint32(dirEndOffset, littleEndian);[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    parseExifTag : function (dataView, tiffOffset, offset, littleEndian)[m[41m [m
[32m+[m[32m    {[m
[32m+[m[32m        var tag = dataView.getUint16(offset, littleEndian);[m
[32m+[m[41m        [m
[32m+[m[32m        this.exif[tag] = this.getExifValue([m
[32m+[m[32m            dataView,[m
[32m+[m[32m            tiffOffset,[m
[32m+[m[32m            offset,[m
[32m+[m[32m            dataView.getUint16(offset + 2, littleEndian), // tag type[m
[32m+[m[32m            dataView.getUint32(offset + 4, littleEndian), // tag length[m
[32m+[m[32m            littleEndian[m
[32m+[m[32m        );[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    getExifValue : function (dataView, tiffOffset, offset, type, length, littleEndian)[m
[32m+[m[32m    {[m
[32m+[m[32m        var tagType = Roo.dialog.UploadCropbox.exifTagTypes[type],[m
[32m+[m[32m            tagSize,[m
[32m+[m[32m            dataOffset,[m
[32m+[m[32m            values,[m
[32m+[m[32m            i,[m
[32m+[m[32m            str,[m
[32m+[m[32m            c;[m
[32m+[m[41m    [m
[32m+[m[32m        if (!tagType) {[m
[32m+[m[32m            Roo.log('Invalid Exif data: Invalid tag type.');[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        tagSize = tagType.size * length;[m
[32m+[m[32m        // Determine if the value is contained in the dataOffset bytes,[m
[32m+[m[32m        // or if the value at the dataOffset is a pointer to the actual data:[m
[32m+[m[32m        dataOffset = tagSize > 4 ?[m
[32m+[m[32m                tiffOffset + dataView.getUint32(offset + 8, littleEndian) : (offset + 8);[m
[32m+[m[32m        if (dataOffset + tagSize > dataView.byteLength) {[m
[32m+[m[32m            Roo.log('Invalid Exif data: Invalid data offset.');[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[32m        if (length === 1) {[m
[32m+[m[32m            return tagType.getValue(dataView, dataOffset, littleEndian);[m
[32m+[m[32m        }[m
[32m+[m[32m        values = [];[m
[32m+[m[32m        for (i = 0; i < length; i += 1) {[m
[32m+[m[32m            values[i] = tagType.getValue(dataView, dataOffset + i * tagType.size, littleEndian);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if (tagType.ascii) {[m
[32m+[m[32m            str = '';[m
[32m+[m[32m            // Concatenate the chars:[m
[32m+[m[32m            for (i = 0; i < values.length; i += 1) {[m
[32m+[m[32m                c = values[i];[m
[32m+[m[32m                // Ignore the terminating NULL byte(s):[m
[32m+[m[32m                if (c === '\u0000') {[m
[32m+[m[32m                    break;[m
[32m+[m[32m                }[m
[32m+[m[32m                str += c;[m
[32m+[m[32m            }[m
[32m+[m[32m            return str;[m
[32m+[m[32m        }[m
[32m+[m[32m        return values;[m
[32m+[m[32m    }[m
[32m+[m[41m    [m
[32m+[m[32m});[m
[32m+[m
[32m+[m[32mRoo.apply(Roo.dialog.UploadCropbox, {[m
[32m+[m[32m    tags : {[m
[32m+[m[32m        'Orientation': 0x0112[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    Orientation: {[m
[32m+[m[32m            1: 0, //'top-left',[m
[32m+[m[32m//            2: 'top-right',[m
[32m+[m[32m            3: 180, //'bottom-right',[m
[32m+[m[32m//            4: 'bottom-left',[m
[32m+[m[32m//            5: 'left-top',[m
[32m+[m[32m            6: 90, //'right-top',[m
[32m+[m[32m//            7: 'right-bottom',[m
[32m+[m[32m            8: 270 //'left-bottom'[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    exifTagTypes : {[m
[32m+[m[32m        // byte, 8-bit unsigned int:[m
[32m+[m[32m        1: {[m
[32m+[m[32m            getValue: function (dataView, dataOffset) {[m
[32m+[m[32m                return dataView.getUint8(dataOffset);[m
[32m+[m[32m            },[m
[32m+[m[32m            size: 1[m
[32m+[m[32m        },[m
[32m+[m[32m        // ascii, 8-bit byte:[m
[32m+[m[32m        2: {[m
[32m+[m[32m            getValue: function (dataView, dataOffset) {[m
[32m+[m[32m                return String.fromCharCode(dataView.getUint8(dataOffset));[m
[32m+[m[32m            },[m
[32m+[m[32m            size: 1,[m
[32m+[m[32m            ascii: true[m
[32m+[m[32m        },[m
[32m+[m[32m        // short, 16 bit int:[m
[32m+[m[32m        3: {[m
[32m+[m[32m            getValue: function (dataView, dataOffset, littleEndian) {[m
[32m+[m[32m                return dataView.getUint16(dataOffset, littleEndian);[m
[32m+[m[32m            },[m
[32m+[m[32m            size: 2[m
[32m+[m[32m        },[m
[32m+[m[32m        // long, 32 bit int:[m
[32m+[m[32m        4: {[m
[32m+[m[32m            getValue: function (dataView, dataOffset, littleEndian) {[m
[32m+[m[32m                return dataView.getUint32(dataOffset, littleEndian);[m
[32m+[m[32m            },[m
[32m+[m[32m            size: 4[m
[32m+[m[32m        },[m
[32m+[m[32m        // rational = two long values, first is numerator, second is denominator:[m
[32m+[m[32m        5: {[m
[32m+[m[32m            getValue: function (dataView, dataOffset, littleEndian) {[m
[32m+[m[32m                return dataView.getUint32(dataOffset, littleEndian) /[m
[32m+[m[32m                    dataView.getUint32(dataOffset + 4, littleEndian);[m
[32m+[m[32m            },[m
[32m+[m[32m            size: 8[m
[32m+[m[32m        },[m
[32m+[m[32m        // slong, 32 bit signed int:[m
[32m+[m[32m        9: {[m
[32m+[m[32m            getValue: function (dataView, dataOffset, littleEndian) {[m
[32m+[m[32m                return dataView.getInt32(dataOffset, littleEndian);[m
[32m+[m[32m            },[m
[32m+[m[32m            size: 4[m
[32m+[m[32m        },[m
[32m+[m[32m        // srational, two slongs, first is numerator, second is denominator:[m
[32m+[m[32m        10: {[m
[32m+[m[32m            getValue: function (dataView, dataOffset, littleEndian) {[m
[32m+[m[32m                return dataView.getInt32(dataOffset, littleEndian) /[m
[32m+[m[32m                    dataView.getInt32(dataOffset + 4, littleEndian);[m
[32m+[m[32m            },[m
[32m+[m[32m            size: 8[m
[32m+[m[32m        }[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    footer : {[m
[32m+[m[32m        STANDARD : [[m
[32m+[m[32m            {[m
[32m+[m[32m                tag : 'div',[m
[32m+[m[32m                cls : 'btn-group roo-upload-cropbox-rotate-left',[m
[32m+[m[32m                action : 'rotate-left',[m
[32m+[m[32m                cn : [[m
[32m+[m[32m                    {[m
[32m+[m[32m                        tag : 'button',[m
[32m+[m[32m                        cls : 'btn btn-default',[m
[32m+[m[32m                        html : '<i class="fa fa-undo"></i>'[m
[32m+[m[32m                    }[m
[32m+[m[32m                ][m
[32m+[m[32m            },[m
[32m+[m[32m            {[m
[32m+[m[32m                tag : 'div',[m
[32m+[m[32m                cls : 'btn-group roo-upload-cropbox-picture',[m
[32m+[m[32m                action : 'picture',[m
[32m+[m[32m                cn : [[m
[32m+[m[32m                    {[m
[32m+[m[32m                        tag : 'button',[m
[32m+[m[32m                        cls : 'btn btn-default',[m
[32m+[m[32m                        html : '<i class="fa fa-picture-o"></i>'[m
[32m+[m[32m                    }[m
[32m+[m[32m                ][m
[32m+[m[32m            },[m
[32m+[m[32m            {[m
[32m+[m[32m                tag : 'div',[m
[32m+[m[32m                cls : 'btn-group roo-upload-cropbox-rotate-right',[m
[32m+[m[32m                action : 'rotate-right',[m
[32m+[m[32m                cn : [[m
[32m+[m[32m                    {[m
[32m+[m[32m                        tag : 'button',[m
[32m+[m[32m                        cls : 'btn btn-default',[m
[32m+[m[32m                        html : '<i class="fa fa-repeat"></i>'[m
[32m+[m[32m                    }[m
[32m+[m[32m                ][m
[32m+[m[32m            }[m
[32m+[m[32m        ],[m
[32m+[m[32m        DOCUMENT : [[m
[32m+[m[32m            {[m
[32m+[m[32m                tag : 'div',[m
[32m+[m[32m                cls : 'btn-group roo-upload-cropbox-rotate-left',[m
[32m+[m[32m                action : 'rotate-left',[m
[32m+[m[32m                cn : [[m
[32m+[m[32m                    {[m
[32m+[m[32m                        tag : 'button',[m
[32m+[m[32m                        cls : 'btn btn-default',[m
[32m+[m[32m                        html : '<i class="fa fa-undo"></i>'[m
[32m+[m[32m                    }[m
[32m+[m[32m                ][m
[32m+[m[32m            },[m
[32m+[m[32m            {[m
[32m+[m[32m                tag : 'div',[m
[32m+[m[32m                cls : 'btn-group roo-upload-cropbox-download',[m
[32m+[m[32m                action : 'download',[m
[32m+[m[32m                cn : [[m
[32m+[m[32m                    {[m
[32m+[m[32m                        tag : 'button',[m
[32m+[m[32m                        cls : 'btn btn-default',[m
[32m+[m[32m                        html : '<i class="fa fa-download"></i>'[m
[32m+[m[32m                    }[m
[32m+[m[32m                ][m
[32m+[m[32m            },[m
[32m+[m[32m            {[m
[32m+[m[32m                tag : 'div',[m
[32m+[m[32m                cls : 'btn-group roo-upload-cropbox-crop',[m
[32m+[m[32m                action : 'crop',[m
[32m+[m[32m                cn : [[m
[32m+[m[32m                    {[m
[32m+[m[32m                        tag : 'button',[m
[32m+[m[32m                        cls : 'btn btn-default',[m
[32m+[m[32m                        html : '<i class="fa fa-crop"></i>'[m
[32m+[m[32m                    }[m
[32m+[m[32m                ][m
[32m+[m[32m            },[m
[32m+[m[32m            {[m
[32m+[m[32m                tag : 'div',[m
[32m+[m[32m                cls : 'btn-group roo-upload-cropbox-trash',[m
[32m+[m[32m                action : 'trash',[m
[32m+[m[32m                cn : [[m
[32m+[m[32m                    {[m
[32m+[m[32m                        tag : 'button',[m
[32m+[m[32m                        cls : 'btn btn-default',[m
[32m+[m[32m                        html : '<i class="fa fa-trash"></i>'[m
[32m+[m[32m                    }[m
[32m+[m[32m                ][m
[32m+[m[32m            },[m
[32m+[m[32m            {[m
[32m+[m[32m                tag : 'div',[m
[32m+[m[32m                cls : 'btn-group roo-upload-cropbox-rotate-right',[m
[32m+[m[32m                action : 'rotate-right',[m
[32m+[m[32m                cn : [[m
[32m+[m[32m                    {[m
[32m+[m[32m                        tag : 'button',[m
[32m+[m[32m                        cls : 'btn btn-default',[m
[32m+[m[32m                        html : '<i class="fa fa-repeat"></i>'[m
[32m+[m[32m                    }[m
[32m+[m[32m                ][m
[32m+[m[32m            }[m
[32m+[m[32m        ],[m
[32m+[m[32m        ROTATOR : [[m
[32m+[m[32m            {[m
[32m+[m[32m                tag : 'div',[m
[32m+[m[32m                cls : 'btn-group roo-upload-cropbox-rotate-left',[m
[32m+[m[32m                action : 'rotate-left',[m
[32m+[m[32m                cn : [[m
[32m+[m[32m                    {[m
[32m+[m[32m                        tag : 'button',[m
[32m+[m[32m                        cls : 'btn btn-default',[m
[32m+[m[32m                        html : '<i class="fa fa-undo"></i>'[m
[32m+[m[32m                    }[m
[32m+[m[32m                ][m
[32m+[m[32m            },[m
[32m+[m[32m            {[m
[32m+[m[32m                tag : 'div',[m
[32m+[m[32m                cls : 'btn-group roo-upload-cropbox-rotate-right',[m
[32m+[m[32m                action : 'rotate-right',[m
[32m+[m[32m                cn : [[m
[32m+[m[32m                    {[m
[32m+[m[32m                        tag : 'button',[m
[32m+[m[32m                        cls : 'btn btn-default',[m
[32m+[m[32m                        html : '<i class="fa fa-repeat"></i>'[m
[32m+[m[32m                    }[m
[32m+[m[32m                ][m
[32m+[m[32m            }[m
[32m+[m[32m        ][m
[32m+[m[32m    }[m
[32m+[m[32m});[m
[1mdiff --git a/roojs-ui-debug.js b/roojs-ui-debug.js[m
[1mindex 4458d38422..4cc277300f 100644[m
[1m--- a/roojs-ui-debug.js[m
[1m+++ b/roojs-ui-debug.js[m
[36m@@ -35922,7 +35922,6 @@[m [mRoo.LayoutStateManager.prototype = {[m
  */[m
 Roo.ContentPanel = function(el, config, content){[m
     [m
[31m-     [m
     /*[m
     if(el.autoCreate || el.xtype){ // xtype is available if this is called from factory[m
         config = el;[m
[36m@@ -36306,6 +36305,14 @@[m [mlayout.addxtype({[m
      */[m
     [m
     addxtype : function(cfg) {[m
[32m+[m[32m        if(cfg.xtype.match(/^UploadCropbox$/)) {[m
[32m+[m
[32m+[m[32m            this.cropbox = new Roo.factory(cfg);[m
[32m+[m
[32m+[m[32m            this.cropbox.render(this.el);[m
[32m+[m
[32m+[m[32m            return this.cropbox;[m
[32m+[m[32m        }[m
         // add form..[m
         if (cfg.xtype.match(/^Form$/)) {[m
             [m
[36m@@ -43558,4 +43565,1795 @@[m [mRoo.extend(Roo.XTemplate, Roo.Template, {[m
 Roo.XTemplate.from = function(el){[m
     el = Roo.getDom(el);[m
     return new Roo.XTemplate(el.value || el.innerHTML);[m
[31m-};[m
\ No newline at end of file[m
[32m+[m[32m};Roo.dialog = {};[m
[32m+[m[32m/*[m
[32m+[m[32m* Licence: LGPL[m
[32m+[m[32m*/[m
[32m+[m
[32m+[m[32m/**[m
[32m+[m[32m * @class Roo.dialog.UploadCropbox[m
[32m+[m[32m * @extends Roo.BoxComponent[m
[32m+[m[32m * Dialog UploadCropbox class[m
[32m+[m[32m * @cfg {String} emptyText show when image has been loaded[m
[32m+[m[32m * @cfg {String} rotateNotify show when image too small to rotate[m
[32m+[m[32m * @cfg {Number} errorTimeout default 3000[m
[32m+[m[32m * @cfg {Number} minWidth default 300[m
[32m+[m[32m * @cfg {Number} minHeight default 300[m
[32m+[m[32m * @cfg {Array} buttons default ['rotateLeft', 'pictureBtn', 'rotateRight'][m
[32m+[m[32m * @cfg {Boolean} isDocument (true|false) default false[m
[32m+[m[32m * @cfg {String} url action url[m
[32m+[m[32m * @cfg {String} paramName default 'imageUpload'[m
[32m+[m[32m * @cfg {String} method default POST[m
[32m+[m[32m * @cfg {Boolean} loadMask (true|false) default true[m
[32m+[m[32m * @cfg {Boolean} loadingText default 'Loading...'[m
[32m+[m[32m *[m[41m [m
[32m+[m[32m * @constructor[m
[32m+[m[32m * Create a new UploadCropbox[m
[32m+[m[32m * @param {Object} config The config object[m
[32m+[m[32m */[m
[32m+[m
[32m+[m[32m Roo.dialog.UploadCropbox = function(config){[m
[32m+[m[32m    console.log("Dialog UploadCropbox Constructor");[m
[32m+[m[32m    Roo.dialog.UploadCropbox.superclass.constructor.call(this, config);[m
[32m+[m[41m    [m
[32m+[m[32m    this.addEvents({[m
[32m+[m[32m        /**[m
[32m+[m[32m         * @event beforeselectfile[m
[32m+[m[32m         * Fire before select file[m
[32m+[m[32m         * @param {Roo.dialog.UploadCropbox} this[m
[32m+[m[32m         */[m
[32m+[m[32m        "beforeselectfile" : true,[m
[32m+[m[32m        /**[m
[32m+[m[32m         * @event initial[m
[32m+[m[32m         * Fire after initEvent[m
[32m+[m[32m         * @param {Roo.dialog.UploadCropbox} this[m
[32m+[m[32m         */[m
[32m+[m[32m        "initial" : true,[m
[32m+[m[32m        /**[m
[32m+[m[32m         * @event crop[m
[32m+[m[32m         * Fire after initEvent[m
[32m+[m[32m         * @param {Roo.dialog.UploadCropbox} this[m
[32m+[m[32m         * @param {String} data[m
[32m+[m[32m         */[m
[32m+[m[32m        "crop" : true,[m
[32m+[m[32m        /**[m
[32m+[m[32m         * @event prepare[m
[32m+[m[32m         * Fire when preparing the file data[m
[32m+[m[32m         * @param {Roo.dialog.UploadCropbox} this[m
[32m+[m[32m         * @param {Object} file[m
[32m+[m[32m         */[m
[32m+[m[32m        "prepare" : true,[m
[32m+[m[32m        /**[m
[32m+[m[32m         * @event exception[m
[32m+[m[32m         * Fire when get exception[m
[32m+[m[32m         * @param {Roo.dialog.UploadCropbox} this[m
[32m+[m[32m         * @param {XMLHttpRequest} xhr[m
[32m+[m[32m         */[m
[32m+[m[32m        "exception" : true,[m
[32m+[m[32m        /**[m
[32m+[m[32m         * @event beforeloadcanvas[m
[32m+[m[32m         * Fire before load the canvas[m
[32m+[m[32m         * @param {Roo.dialog.UploadCropbox} this[m
[32m+[m[32m         * @param {String} src[m
[32m+[m[32m         */[m
[32m+[m[32m        "beforeloadcanvas" : true,[m
[32m+[m[32m        /**[m
[32m+[m[32m         * @event trash[m
[32m+[m[32m         * Fire when trash image[m
[32m+[m[32m         * @param {Roo.dialog.UploadCropbox} this[m
[32m+[m[32m         */[m
[32m+[m[32m        "trash" : true,[m
[32m+[m[32m        /**[m
[32m+[m[32m         * @event download[m
[32m+[m[32m         * Fire when download the image[m
[32m+[m[32m         * @param {Roo.dialog.UploadCropbox} this[m
[32m+[m[32m         */[m
[32m+[m[32m        "download" : true,[m
[32m+[m[32m        /**[m
[32m+[m[32m         * @event footerbuttonclick[m
[32m+[m[32m         * Fire when footerbuttonclick[m
[32m+[m[32m         * @param {Roo.dialog.UploadCropbox} this[m
[32m+[m[32m         * @param {String} type[m
[32m+[m[32m         */[m
[32m+[m[32m        "footerbuttonclick" : true,[m
[32m+[m[32m        /**[m
[32m+[m[32m         * @event resize[m
[32m+[m[32m         * Fire when resize[m
[32m+[m[32m         * @param {Roo.dialog.UploadCropbox} this[m
[32m+[m[32m         */[m
[32m+[m[32m        "resize" : true,[m
[32m+[m[32m        /**[m
[32m+[m[32m         * @event rotate[m
[32m+[m[32m         * Fire when rotate the image[m
[32m+[m[32m         * @param {Roo.dialog.UploadCropbox} this[m
[32m+[m[32m         * @param {String} pos[m
[32m+[m[32m         */[m
[32m+[m[32m        "rotate" : true,[m
[32m+[m[32m        /**[m
[32m+[m[32m         * @event inspect[m
[32m+[m[32m         * Fire when inspect the file[m
[32m+[m[32m         * @param {Roo.dialog.UploadCropbox} this[m
[32m+[m[32m         * @param {Object} file[m
[32m+[m[32m         */[m
[32m+[m[32m        "inspect" : true,[m
[32m+[m[32m        /**[m
[32m+[m[32m         * @event upload[m
[32m+[m[32m         * Fire when xhr upload the file[m
[32m+[m[32m         * @param {Roo.dialog.UploadCropbox} this[m
[32m+[m[32m         * @param {Object} data[m
[32m+[m[32m         */[m
[32m+[m[32m        "upload" : true,[m
[32m+[m[32m        /**[m
[32m+[m[32m         * @event arrange[m
[32m+[m[32m         * Fire when arrange the file data[m
[32m+[m[32m         * @param {Roo.dialog.UploadCropbox} this[m
[32m+[m[32m         * @param {Object} formData[m
[32m+[m[32m         */[m
[32m+[m[32m        "arrange" : true,[m
[32m+[m[32m        /**[m
[32m+[m[32m         * @event loadcanvas[m
[32m+[m[32m         * Fire after load the canvas[m
[32m+[m[32m         * @param {Roo.dialog.UploadCropbox}[m
[32m+[m[32m         * @param {Object} imgEl[m
[32m+[m[32m         */[m
[32m+[m[32m        "loadcanvas" : true[m
[32m+[m[32m    });[m
[32m+[m[41m    [m
[32m+[m[32m    this.buttons = this.buttons || Roo.dialog.UploadCropbox.footer.STANDARD;[m
[32m+[m[32m};[m
[32m+[m
[32m+[m[32mRoo.extend(Roo.dialog.UploadCropbox, Roo.Component,  {[m
[32m+[m[41m    [m
[32m+[m[32m    emptyText : 'Click to upload image',[m
[32m+[m[32m    rotateNotify : 'Image is too small to rotate',[m
[32m+[m[32m    errorTimeout : 3000,[m
[32m+[m[32m    scale : 0,[m
[32m+[m[32m    baseScale : 1,[m
[32m+[m[32m    rotate : 0,[m
[32m+[m[32m    dragable : false,[m
[32m+[m[32m    pinching : false,[m
[32m+[m[32m    mouseX : 0,[m
[32m+[m[32m    mouseY : 0,[m
[32m+[m[32m    cropData : false,[m
[32m+[m[32m    minWidth : 300,[m
[32m+[m[32m    minHeight : 300,[m
[32m+[m[32m    file : false,[m
[32m+[m[32m    exif : {},[m
[32m+[m[32m    baseRotate : 1,[m
[32m+[m[32m    cropType : 'image/jpeg',[m
[32m+[m[32m    buttons : false,[m
[32m+[m[32m    canvasLoaded : false,[m
[32m+[m[32m    isDocument : false,[m
[32m+[m[32m    method : 'POST',[m
[32m+[m[32m    paramName : 'imageUpload',[m
[32m+[m[32m    loadMask : true,[m
[32m+[m[32m    loadingText : 'Loading...',[m
[32m+[m[32m    maskEl : false,[m
[32m+[m[41m    [m
[32m+[m[32m    getAutoCreate : function()[m
[32m+[m[32m    {[m
[32m+[m[32m        var cfg = {[m
[32m+[m[32m            tag : 'div',[m
[32m+[m[32m            cls : 'roo-upload-cropbox',[m
[32m+[m[32m            cn : [[m
[32m+[m[32m                {[m
[32m+[m[32m                    tag : 'input',[m
[32m+[m[32m                    cls : 'roo-upload-cropbox-selector',[m
[32m+[m[32m                    type : 'file'[m
[32m+[m[32m                },[m
[32m+[m[32m                {[m
[32m+[m[32m                    tag : 'div',[m
[32m+[m[32m                    cls : 'roo-upload-cropbox-body',[m
[32m+[m[32m                    style : 'cursor:pointer',[m
[32m+[m[32m                    cn : [[m
[32m+[m[32m                        {[m
[32m+[m[32m                            tag : 'div',[m
[32m+[m[32m                            cls : 'roo-upload-cropbox-preview'[m
[32m+[m[32m                        },[m
[32m+[m[32m                        {[m
[32m+[m[32m                            tag : 'div',[m
[32m+[m[32m                            cls : 'roo-upload-cropbox-thumb'[m
[32m+[m[32m                        },[m
[32m+[m[32m                        {[m
[32m+[m[32m                            tag : 'div',[m
[32m+[m[32m                            cls : 'roo-upload-cropbox-empty-notify',[m
[32m+[m[32m                            html : this.emptyText[m
[32m+[m[32m                        },[m
[32m+[m[32m                        {[m
[32m+[m[32m                            tag : 'div',[m
[32m+[m[32m                            cls : 'roo-upload-cropbox-error-notify alert alert-danger',[m
[32m+[m[32m                            html : this.rotateNotify[m
[32m+[m[32m                        }[m
[32m+[m[32m                    ][m
[32m+[m[32m                },[m
[32m+[m[32m                {[m
[32m+[m[32m                    tag : 'div',[m
[32m+[m[32m                    cls : 'roo-upload-cropbox-footer',[m
[32m+[m[32m                    cn : {[m
[32m+[m[32m                        tag : 'div',[m
[32m+[m[32m                        cls : 'btn-group btn-group-justified roo-upload-cropbox-btn-group',[m
[32m+[m[32m                        cn : [][m
[32m+[m[32m                    }[m
[32m+[m[32m                }[m
[32m+[m[32m            ][m
[32m+[m[32m        };[m
[32m+[m[41m        [m
[32m+[m[32m        return cfg;[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    onRender : function(ct, position)[m
[32m+[m[32m    {[m
[32m+[m[32m        console.log("On Render");[m
[32m+[m[32m        console.log(this);[m
[32m+[m[32m        Roo.dialog.UploadCropbox.superclass.onRender.call(this, ct, position);[m
[32m+[m
[32m+[m[32m        if(this.el){[m
[32m+[m[32m            if (this.el.attr('xtype')) {[m
[32m+[m[32m                this.el.attr('xtypex', this.el.attr('xtype'));[m
[32m+[m[32m                this.el.dom.removeAttribute('xtype');[m
[32m+[m[41m                [m
[32m+[m[32m                this.initEvents();[m
[32m+[m[32m            }[m
[32m+[m[32m        }[m
[32m+[m[32m        else {[m
[32m+[m[32m            var cfg = Roo.apply({},  this.getAutoCreate());[m
[32m+[m[41m        [m
[32m+[m[32m            cfg.id = this.id || Roo.id();[m
[32m+[m[41m            [m
[32m+[m[32m            if (this.cls) {[m
[32m+[m[32m                cfg.cls = (typeof(cfg.cls) == 'undefined' ? this.cls : cfg.cls) + ' ' + this.cls;[m
[32m+[m[32m            }[m
[32m+[m[41m            [m
[32m+[m[32m            if (this.style) { // fixme needs to support more complex style data.[m
[32m+[m[32m                cfg.style = (typeof(cfg.style) == 'undefined' ? this.style : cfg.style) + '; ' + this.style;[m
[32m+[m[32m            }[m
[32m+[m[41m            [m
[32m+[m[32m            this.el = ct.createChild(cfg, position);[m
[32m+[m[41m            [m
[32m+[m[32m            this.initEvents();[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if (this.buttons.length) {[m
[32m+[m[41m            [m
[32m+[m[32m            Roo.each(this.buttons, function(bb) {[m
[32m+[m[41m                [m
[32m+[m[32m                var btn = this.el.select('.roo-upload-cropbox-footer div.roo-upload-cropbox-btn-group').first().createChild(bb);[m
[32m+[m[41m                [m
[32m+[m[32m                btn.on('click', this.onFooterButtonClick.createDelegate(this, [bb.action], true));[m
[32m+[m[41m                [m
[32m+[m[32m            }, this);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.loadMask){[m
[32m+[m[32m            this.maskEl = this.el;[m
[32m+[m[32m        }[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    initEvents : function()[m
[32m+[m[32m    {[m
[32m+[m[32m        this.urlAPI = (window.createObjectURL && window) ||[m[41m [m
[32m+[m[32m                                (window.URL && URL.revokeObjectURL && URL) ||[m[41m [m
[32m+[m[32m                                (window.webkitURL && webkitURL);[m
[32m+[m[41m                        [m
[32m+[m[32m        this.bodyEl = this.el.select('.roo-upload-cropbox-body', true).first();[m
[32m+[m[32m        this.bodyEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';[m
[32m+[m[41m        [m
[32m+[m[32m        this.selectorEl = this.el.select('.roo-upload-cropbox-selector', true).first();[m
[32m+[m[32m        this.selectorEl.hide();[m
[32m+[m[41m        [m
[32m+[m[32m        this.previewEl = this.el.select('.roo-upload-cropbox-preview', true).first();[m
[32m+[m[32m        this.previewEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';[m
[32m+[m[41m        [m
[32m+[m[32m        this.thumbEl = this.el.select('.roo-upload-cropbox-thumb', true).first();[m
[32m+[m[32m        this.thumbEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';[m
[32m+[m[32m        this.thumbEl.hide();[m
[32m+[m[41m        [m
[32m+[m[32m        this.notifyEl = this.el.select('.roo-upload-cropbox-empty-notify', true).first();[m
[32m+[m[32m        this.notifyEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';[m
[32m+[m[41m        [m
[32m+[m[32m        this.errorEl = this.el.select('.roo-upload-cropbox-error-notify', true).first();[m
[32m+[m[32m        this.errorEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';[m
[32m+[m[32m        this.errorEl.hide();[m
[32m+[m[41m        [m
[32m+[m[32m        this.footerEl = this.el.select('.roo-upload-cropbox-footer', true).first();[m
[32m+[m[32m        this.footerEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';[m
[32m+[m[32m        this.footerEl.hide();[m
[32m+[m[41m        [m
[32m+[m[32m        this.setThumbBoxSize();[m
[32m+[m[41m        [m
[32m+[m[32m        this.bind();[m
[32m+[m[41m        [m
[32m+[m[32m        this.resize();[m
[32m+[m[41m        [m
[32m+[m[32m        this.fireEvent('initial', this);[m
[32m+[m[32m    },[m
[32m+[m
[32m+[m[32m    bind : function()[m
[32m+[m[32m    {[m
[32m+[m[32m        var _this = this;[m
[32m+[m[41m        [m
[32m+[m[32m        window.addEventListener("resize", function() { _this.resize(); } );[m
[32m+[m[41m        [m
[32m+[m[32m        this.bodyEl.on('click', this.beforeSelectFile, this);[m
[32m+[m[41m        [m
[32m+[m[32m        if(Roo.isTouch){[m
[32m+[m[32m            this.bodyEl.on('touchstart', this.onTouchStart, this);[m
[32m+[m[32m            this.bodyEl.on('touchmove', this.onTouchMove, this);[m
[32m+[m[32m            this.bodyEl.on('touchend', this.onTouchEnd, this);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if(!Roo.isTouch){[m
[32m+[m[32m            this.bodyEl.on('mousedown', this.onMouseDown, this);[m
[32m+[m[32m            this.bodyEl.on('mousemove', this.onMouseMove, this);[m
[32m+[m[32m            var mousewheel = (/Firefox/i.test(navigator.userAgent))? 'DOMMouseScroll' : 'mousewheel';[m
[32m+[m[32m            this.bodyEl.on(mousewheel, this.onMouseWheel, this);[m
[32m+[m[32m            Roo.get(document).on('mouseup', this.onMouseUp, this);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.selectorEl.on('change', this.onFileSelected, this);[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    reset : function()[m
[32m+[m[32m    {[m[41m    [m
[32m+[m[32m        this.scale = 0;[m
[32m+[m[32m        this.baseScale = 1;[m
[32m+[m[32m        this.rotate = 0;[m
[32m+[m[32m        this.baseRotate = 1;[m
[32m+[m[32m        this.dragable = false;[m
[32m+[m[32m        this.pinching = false;[m
[32m+[m[32m        this.mouseX = 0;[m
[32m+[m[32m        this.mouseY = 0;[m
[32m+[m[32m        this.cropData = false;[m
[32m+[m[32m        this.notifyEl.dom.innerHTML = this.emptyText;[m
[32m+[m[41m        [m
[32m+[m[32m        // this.selectorEl.dom.value = '';[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    resize : function()[m
[32m+[m[32m    {[m
[32m+[m[32m        if(this.fireEvent('resize', this) != false){[m
[32m+[m[32m            this.setThumbBoxPosition();[m
[32m+[m[32m            this.setCanvasPosition();[m
[32m+[m[32m        }[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    onFooterButtonClick : function(e, el, o, type)[m
[32m+[m[32m    {[m
[32m+[m[32m        switch (type) {[m
[32m+[m[32m            case 'rotate-left' :[m
[32m+[m[32m                this.onRotateLeft(e);[m
[32m+[m[32m                break;[m
[32m+[m[32m            case 'rotate-right' :[m
[32m+[m[32m                this.onRotateRight(e);[m
[32m+[m[32m                break;[m
[32m+[m[32m            case 'picture' :[m
[32m+[m[32m                this.beforeSelectFile(e);[m
[32m+[m[32m                break;[m
[32m+[m[32m            case 'trash' :[m
[32m+[m[32m                this.trash(e);[m
[32m+[m[32m                break;[m
[32m+[m[32m            case 'crop' :[m
[32m+[m[32m                this.crop(e);[m
[32m+[m[32m                break;[m
[32m+[m[32m            case 'download' :[m
[32m+[m[32m                this.download(e);[m
[32m+[m[32m                break;[m
[32m+[m[32m            default :[m
[32m+[m[32m                break;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.fireEvent('footerbuttonclick', this, type);[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    beforeSelectFile : function(e)[m
[32m+[m[32m    {[m
[32m+[m[32m        e.preventDefault();[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.fireEvent('beforeselectfile', this) != false){[m
[32m+[m[32m            this.selectorEl.dom.click();[m
[32m+[m[32m        }[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    onFileSelected : function(e)[m
[32m+[m[32m    {[m
[32m+[m[32m        e.preventDefault();[m
[32m+[m[41m        [m
[32m+[m[32m        if(typeof(this.selectorEl.dom.files) == 'undefined' || !this.selectorEl.dom.files.length){[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        var file = this.selectorEl.dom.files[0];[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.fireEvent('inspect', this, file) != false){[m
[32m+[m[32m            this.prepare(file);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    trash : function(e)[m
[32m+[m[32m    {[m
[32m+[m[32m        this.fireEvent('trash', this);[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    download : function(e)[m
[32m+[m[32m    {[m
[32m+[m[32m        this.fireEvent('download', this);[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    loadCanvas : function(src)[m
[32m+[m[32m    {[m[41m   [m
[32m+[m[32m        if(this.fireEvent('beforeloadcanvas', this, src) != false){[m
[32m+[m[41m            [m
[32m+[m[32m            this.reset();[m
[32m+[m[41m            [m
[32m+[m[32m            this.imageEl = document.createElement('img');[m
[32m+[m[41m            [m
[32m+[m[32m            var _this = this;[m
[32m+[m[41m            [m
[32m+[m[32m            this.imageEl.addEventListener("load", function(){ _this.onLoadCanvas(); });[m
[32m+[m[41m            [m
[32m+[m[32m            this.imageEl.src = src;[m
[32m+[m[32m        }[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    onLoadCanvas : function()[m
[32m+[m[32m    {[m[41m   [m
[32m+[m[32m        this.imageEl.OriginWidth = this.imageEl.naturalWidth || this.imageEl.width;[m
[32m+[m[32m        this.imageEl.OriginHeight = this.imageEl.naturalHeight || this.imageEl.height;[m
[32m+[m
[32m+[m[32m        if(this.fireEvent('loadcanvas', this, this.imageEl) != false){[m
[32m+[m[41m        [m
[32m+[m[32m            this.bodyEl.un('click', this.beforeSelectFile, this);[m
[32m+[m[41m            [m
[32m+[m[32m            this.notifyEl.hide();[m
[32m+[m[32m            this.thumbEl.show();[m
[32m+[m[32m            this.footerEl.show();[m
[32m+[m[41m            [m
[32m+[m[32m            this.baseRotateLevel();[m
[32m+[m[41m            [m
[32m+[m[32m            if(this.isDocument){[m
[32m+[m[32m                this.setThumbBoxSize();[m
[32m+[m[32m            }[m
[32m+[m[41m            [m
[32m+[m[32m            this.setThumbBoxPosition();[m
[32m+[m[41m            [m
[32m+[m[32m            this.baseScaleLevel();[m
[32m+[m[41m            [m
[32m+[m[32m            this.draw();[m
[32m+[m[41m            [m
[32m+[m[32m            this.resize();[m
[32m+[m[41m            [m
[32m+[m[32m            this.canvasLoaded = true;[m
[32m+[m[41m        [m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.loadMask){[m
[32m+[m[32m            this.maskEl.unmask();[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    setCanvasPosition : function()[m
[32m+[m[32m    {[m[41m   [m
[32m+[m[32m        if(!this.canvasEl){[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        var pw = Math.ceil((this.bodyEl.getWidth() - this.canvasEl.width) / 2);[m
[32m+[m[32m        var ph = Math.ceil((this.bodyEl.getHeight() - this.canvasEl.height) / 2);[m
[32m+[m[41m        [m
[32m+[m[32m        this.previewEl.setLeft(pw);[m
[32m+[m[32m        this.previewEl.setTop(ph);[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    onMouseDown : function(e)[m
[32m+[m[32m    {[m[41m   [m
[32m+[m[32m        e.stopEvent();[m
[32m+[m[41m        [m
[32m+[m[32m        this.dragable = true;[m
[32m+[m[32m        this.pinching = false;[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.isDocument && (this.canvasEl.width < this.thumbEl.getWidth() || this.canvasEl.height < this.thumbEl.getHeight())){[m
[32m+[m[32m            this.dragable = false;[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.mouseX = Roo.isTouch ? e.browserEvent.touches[0].pageX : e.getPageX();[m
[32m+[m[32m        this.mouseY = Roo.isTouch ? e.browserEvent.touches[0].pageY : e.getPageY();[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    onMouseMove : function(e)[m
[32m+[m[32m    {[m[41m   [m
[32m+[m[32m        e.stopEvent();[m
[32m+[m[41m        [m
[32m+[m[32m        if(!this.canvasLoaded){[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if (!this.dragable){[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        var minX = Math.ceil(this.thumbEl.getLeft(true));[m
[32m+[m[32m        var minY = Math.ceil(this.thumbEl.getTop(true));[m
[32m+[m[41m        [m
[32m+[m[32m        var maxX = Math.ceil(minX + this.thumbEl.getWidth() - this.canvasEl.width);[m
[32m+[m[32m        var maxY = Math.ceil(minY + this.thumbEl.getHeight() - this.canvasEl.height);[m
[32m+[m[41m        [m
[32m+[m[32m        var x = Roo.isTouch ? e.browserEvent.touches[0].pageX : e.getPageX();[m
[32m+[m[32m        var y = Roo.isTouch ? e.browserEvent.touches[0].pageY : e.getPageY();[m
[32m+[m[41m        [m
[32m+[m[32m        x = x - this.mouseX;[m
[32m+[m[32m        y = y - this.mouseY;[m
[32m+[m[41m        [m
[32m+[m[32m        var bgX = Math.ceil(x + this.previewEl.getLeft(true));[m
[32m+[m[32m        var bgY = Math.ceil(y + this.previewEl.getTop(true));[m
[32m+[m[41m        [m
[32m+[m[32m        bgX = (minX < bgX) ? minX : ((maxX > bgX) ? maxX : bgX);[m
[32m+[m[32m        bgY = (minY < bgY) ? minY : ((maxY > bgY) ? maxY : bgY);[m
[32m+[m[41m        [m
[32m+[m[32m        this.previewEl.setLeft(bgX);[m
[32m+[m[32m        this.previewEl.setTop(bgY);[m
[32m+[m[41m        [m
[32m+[m[32m        this.mouseX = Roo.isTouch ? e.browserEvent.touches[0].pageX : e.getPageX();[m
[32m+[m[32m        this.mouseY = Roo.isTouch ? e.browserEvent.touches[0].pageY : e.getPageY();[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    onMouseUp : function(e)[m
[32m+[m[32m    {[m[41m   [m
[32m+[m[32m        e.stopEvent();[m
[32m+[m[41m        [m
[32m+[m[32m        this.dragable = false;[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    onMouseWheel : function(e)[m
[32m+[m[32m    {[m[41m   [m
[32m+[m[32m        e.stopEvent();[m
[32m+[m[41m        [m
[32m+[m[32m        this.startScale = this.scale;[m
[32m+[m[41m        [m
[32m+[m[32m        this.scale = (e.getWheelDelta() == 1) ? (this.scale + 1) : (this.scale - 1);[m
[32m+[m[41m        [m
[32m+[m[32m        if(!this.zoomable()){[m
[32m+[m[32m            this.scale = this.startScale;[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.draw();[m
[32m+[m[41m        [m
[32m+[m[32m        return;[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    zoomable : function()[m
[32m+[m[32m    {[m
[32m+[m[32m        var minScale = this.thumbEl.getWidth() / this.minWidth;[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.minWidth < this.minHeight){[m
[32m+[m[32m            minScale = this.thumbEl.getHeight() / this.minHeight;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        var width = Math.ceil(this.imageEl.OriginWidth * this.getScaleLevel() / minScale);[m
[32m+[m[32m        var height = Math.ceil(this.imageEl.OriginHeight * this.getScaleLevel() / minScale);[m
[32m+[m[41m        [m
[32m+[m[32m        if([m
[32m+[m[32m                this.isDocument &&[m
[32m+[m[32m                (this.rotate == 0 || this.rotate == 180) &&[m[41m [m
[32m+[m[32m                ([m
[32m+[m[32m                    width > this.imageEl.OriginWidth ||[m[41m [m
[32m+[m[32m                    height > this.imageEl.OriginHeight ||[m
[32m+[m[32m                    (width < this.minWidth && height < this.minHeight)[m
[32m+[m[32m                )[m
[32m+[m[32m        ){[m
[32m+[m[32m            return false;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if([m
[32m+[m[32m                this.isDocument &&[m
[32m+[m[32m                (this.rotate == 90 || this.rotate == 270) &&[m[41m [m
[32m+[m[32m                ([m
[32m+[m[32m                    width > this.imageEl.OriginWidth ||[m[41m [m
[32m+[m[32m                    height > this.imageEl.OriginHeight ||[m
[32m+[m[32m                    (width < this.minHeight && height < this.minWidth)[m
[32m+[m[32m                )[m
[32m+[m[32m        ){[m
[32m+[m[32m            return false;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if([m
[32m+[m[32m                !this.isDocument &&[m
[32m+[m[32m                (this.rotate == 0 || this.rotate == 180) &&[m[41m [m
[32m+[m[32m                ([m
[32m+[m[32m                    width < this.minWidth ||[m[41m [m
[32m+[m[32m                    width > this.imageEl.OriginWidth ||[m[41m [m
[32m+[m[32m                    height < this.minHeight ||[m[41m [m
[32m+[m[32m                    height > this.imageEl.OriginHeight[m
[32m+[m[32m                )[m
[32m+[m[32m        ){[m
[32m+[m[32m            return false;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if([m
[32m+[m[32m                !this.isDocument &&[m
[32m+[m[32m                (this.rotate == 90 || this.rotate == 270) &&[m[41m [m
[32m+[m[32m                ([m
[32m+[m[32m                    width < this.minHeight ||[m[41m [m
[32m+[m[32m                    width > this.imageEl.OriginWidth ||[m[41m [m
[32m+[m[32m                    height < this.minWidth ||[m[41m [m
[32m+[m[32m                    height > this.imageEl.OriginHeight[m
[32m+[m[32m                )[m
[32m+[m[32m        ){[m
[32m+[m[32m            return false;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        return true;[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    onRotateLeft : function(e)[m
[32m+[m[32m    {[m[41m   [m
[32m+[m[32m        if(!this.isDocument && (this.canvasEl.height < this.thumbEl.getWidth() || this.canvasEl.width < this.thumbEl.getHeight())){[m
[32m+[m[41m            [m
[32m+[m[32m            var minScale = this.thumbEl.getWidth() / this.minWidth;[m
[32m+[m[41m            [m
[32m+[m[32m            var bw = Math.ceil(this.canvasEl.width / this.getScaleLevel());[m
[32m+[m[32m            var bh = Math.ceil(this.canvasEl.height / this.getScaleLevel());[m
[32m+[m[41m            [m
[32m+[m[32m            this.startScale = this.scale;[m
[32m+[m[41m            [m
[32m+[m[32m            while (this.getScaleLevel() < minScale){[m
[32m+[m[41m            [m
[32m+[m[32m                this.scale = this.scale + 1;[m
[32m+[m[41m                [m
[32m+[m[32m                if(!this.zoomable()){[m
[32m+[m[32m                    break;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                if([m
[32m+[m[32m                        Math.ceil(bw * this.getScaleLevel()) < this.thumbEl.getHeight() ||[m
[32m+[m[32m                        Math.ceil(bh * this.getScaleLevel()) < this.thumbEl.getWidth()[m
[32m+[m[32m                ){[m
[32m+[m[32m                    continue;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                this.rotate = (this.rotate < 90) ? 270 : this.rotate - 90;[m
[32m+[m
[32m+[m[32m                this.draw();[m
[32m+[m[41m                [m
[32m+[m[32m                return;[m
[32m+[m[32m            }[m
[32m+[m[41m            [m
[32m+[m[32m            this.scale = this.startScale;[m
[32m+[m[41m            [m
[32m+[m[32m            this.onRotateFail();[m
[32m+[m[41m            [m
[32m+[m[32m            return false;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.rotate = (this.rotate < 90) ? 270 : this.rotate - 90;[m
[32m+[m
[32m+[m[32m        if(this.isDocument){[m
[32m+[m[32m            this.setThumbBoxSize();[m
[32m+[m[32m            this.setThumbBoxPosition();[m
[32m+[m[32m            this.setCanvasPosition();[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.draw();[m
[32m+[m[41m        [m
[32m+[m[32m        this.fireEvent('rotate', this, 'left');[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    onRotateRight : function(e)[m
[32m+[m[32m    {[m
[32m+[m[32m        if(!this.isDocument && (this.canvasEl.height < this.thumbEl.getWidth() || this.canvasEl.width < this.thumbEl.getHeight())){[m
[32m+[m[41m            [m
[32m+[m[32m            var minScale = this.thumbEl.getWidth() / this.minWidth;[m
[32m+[m[41m        [m
[32m+[m[32m            var bw = Math.ceil(this.canvasEl.width / this.getScaleLevel());[m
[32m+[m[32m            var bh = Math.ceil(this.canvasEl.height / this.getScaleLevel());[m
[32m+[m[41m            [m
[32m+[m[32m            this.startScale = this.scale;[m
[32m+[m[41m            [m
[32m+[m[32m            while (this.getScaleLevel() < minScale){[m
[32m+[m[41m            [m
[32m+[m[32m                this.scale = this.scale + 1;[m
[32m+[m[41m                [m
[32m+[m[32m                if(!this.zoomable()){[m
[32m+[m[32m                    break;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                if([m
[32m+[m[32m                        Math.ceil(bw * this.getScaleLevel()) < this.thumbEl.getHeight() ||[m
[32m+[m[32m                        Math.ceil(bh * this.getScaleLevel()) < this.thumbEl.getWidth()[m
[32m+[m[32m                ){[m
[32m+[m[32m                    continue;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                this.rotate = (this.rotate > 180) ? 0 : this.rotate + 90;[m
[32m+[m
[32m+[m[32m                this.draw();[m
[32m+[m[41m                [m
[32m+[m[32m                return;[m
[32m+[m[32m            }[m
[32m+[m[41m            [m
[32m+[m[32m            this.scale = this.startScale;[m
[32m+[m[41m            [m
[32m+[m[32m            this.onRotateFail();[m
[32m+[m[41m            [m
[32m+[m[32m            return false;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.rotate = (this.rotate > 180) ? 0 : this.rotate + 90;[m
[32m+[m
[32m+[m[32m        if(this.isDocument){[m
[32m+[m[32m            this.setThumbBoxSize();[m
[32m+[m[32m            this.setThumbBoxPosition();[m
[32m+[m[32m            this.setCanvasPosition();[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.draw();[m
[32m+[m[41m        [m
[32m+[m[32m        this.fireEvent('rotate', this, 'right');[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    onRotateFail : function()[m
[32m+[m[32m    {[m
[32m+[m[32m        this.errorEl.show(true);[m
[32m+[m[41m        [m
[32m+[m[32m        var _this = this;[m
[32m+[m[41m        [m
[32m+[m[32m        (function() { _this.errorEl.hide(true); }).defer(this.errorTimeout);[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    draw : function()[m
[32m+[m[32m    {[m
[32m+[m[32m        this.previewEl.dom.innerHTML = '';[m
[32m+[m[41m        [m
[32m+[m[32m        var canvasEl = document.createElement("canvas");[m
[32m+[m[41m        [m
[32m+[m[32m        var contextEl = canvasEl.getContext("2d");[m
[32m+[m[41m        [m
[32m+[m[32m        canvasEl.width = this.imageEl.OriginWidth * this.getScaleLevel();[m
[32m+[m[32m        canvasEl.height = this.imageEl.OriginWidth * this.getScaleLevel();[m
[32m+[m[32m        var center = this.imageEl.OriginWidth / 2;[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.imageEl.OriginWidth < this.imageEl.OriginHeight){[m
[32m+[m[32m            canvasEl.width = this.imageEl.OriginHeight * this.getScaleLevel();[m
[32m+[m[32m            canvasEl.height = this.imageEl.OriginHeight * this.getScaleLevel();[m
[32m+[m[32m            center = this.imageEl.OriginHeight / 2;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        contextEl.scale(this.getScaleLevel(), this.getScaleLevel());[m
[32m+[m[41m        [m
[32m+[m[32m        contextEl.translate(center, center);[m
[32m+[m[32m        contextEl.rotate(this.rotate * Math.PI / 180);[m
[32m+[m
[32m+[m[32m        contextEl.drawImage(this.imageEl, 0, 0, this.imageEl.OriginWidth, this.imageEl.OriginHeight, center * -1, center * -1, this.imageEl.OriginWidth, this.imageEl.OriginHeight);[m
[32m+[m[41m        [m
[32m+[m[32m        this.canvasEl = document.createElement("canvas");[m
[32m+[m[41m        [m
[32m+[m[32m        this.contextEl = this.canvasEl.getContext("2d");[m
[32m+[m[41m        [m
[32m+[m[32m        switch (this.rotate) {[m
[32m+[m[32m            case 0 :[m
[32m+[m[41m                [m
[32m+[m[32m                this.canvasEl.width = this.imageEl.OriginWidth * this.getScaleLevel();[m
[32m+[m[32m                this.canvasEl.height = this.imageEl.OriginHeight * this.getScaleLevel();[m
[32m+[m[41m                [m
[32m+[m[32m                this.contextEl.drawImage(canvasEl, 0, 0, this.canvasEl.width, this.canvasEl.height, 0, 0, this.canvasEl.width, this.canvasEl.height);[m
[32m+[m[41m                [m
[32m+[m[32m                break;[m
[32m+[m[32m            case 90 :[m[41m [m
[32m+[m[41m                [m
[32m+[m[32m                this.canvasEl.width = this.imageEl.OriginHeight * this.getScaleLevel();[m
[32m+[m[32m                this.canvasEl.height = this.imageEl.OriginWidth * this.getScaleLevel();[m
[32m+[m[41m                [m
[32m+[m[32m                if(this.imageEl.OriginWidth > this.imageEl.OriginHeight){[m
[32m+[m[32m                    this.contextEl.drawImage(canvasEl, Math.abs(this.canvasEl.width - this.canvasEl.height), 0, this.canvasEl.width, this.canvasEl.height, 0, 0, this.canvasEl.width, this.canvasEl.height);[m
[32m+[m[32m                    break;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                this.contextEl.drawImage(canvasEl, 0, 0, this.canvasEl.width, this.canvasEl.height, 0, 0, this.canvasEl.width, this.canvasEl.height);[m
[32m+[m[41m                [m
[32m+[m[32m                break;[m
[32m+[m[32m            case 180 :[m
[32m+[m[41m                [m
[32m+[m[32m                this.canvasEl.width = this.imageEl.OriginWidth * this.getScaleLevel();[m
[32m+[m[32m                this.canvasEl.height = this.imageEl.OriginHeight * this.getScaleLevel();[m
[32m+[m[41m                [m
[32m+[m[32m                if(this.imageEl.OriginWidth > this.imageEl.OriginHeight){[m
[32m+[m[32m                    this.contextEl.drawImage(canvasEl, 0, Math.abs(this.canvasEl.width - this.canvasEl.height), this.canvasEl.width, this.canvasEl.height, 0, 0, this.canvasEl.width, this.canvasEl.height);[m
[32m+[m[32m                    break;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                this.contextEl.drawImage(canvasEl, Math.abs(this.canvasEl.width - this.canvasEl.height), 0, this.canvasEl.width, this.canvasEl.height, 0, 0, this.canvasEl.width, this.canvasEl.height);[m
[32m+[m[41m                [m
[32m+[m[32m                break;[m
[32m+[m[32m            case 270 :[m
[32m+[m[41m                [m
[32m+[m[32m                this.canvasEl.width = this.imageEl.OriginHeight * this.getScaleLevel();[m
[32m+[m[32m                this.canvasEl.height = this.imageEl.OriginWidth * this.getScaleLevel();[m
[32m+[m[41m        [m
[32m+[m[32m                if(this.imageEl.OriginWidth > this.imageEl.OriginHeight){[m
[32m+[m[32m                    this.contextEl.drawImage(canvasEl, 0, 0, this.canvasEl.width, this.canvasEl.height, 0, 0, this.canvasEl.width, this.canvasEl.height);[m
[32m+[m[32m                    break;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                this.contextEl.drawImage(canvasEl, 0, Math.abs(this.canvasEl.width - this.canvasEl.height), this.canvasEl.width, this.canvasEl.height, 0, 0, this.canvasEl.width, this.canvasEl.height);[m
[32m+[m[41m                [m
[32m+[m[32m                break;[m
[32m+[m[32m            default :[m[41m [m
[32m+[m[32m                break;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.previewEl.appendChild(this.canvasEl);[m
[32m+[m[41m        [m
[32m+[m[32m        this.setCanvasPosition();[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    crop : function()[m
[32m+[m[32m    {[m
[32m+[m[32m        if(!this.canvasLoaded){[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        var imageCanvas = document.createElement("canvas");[m
[32m+[m[41m        [m
[32m+[m[32m        var imageContext = imageCanvas.getContext("2d");[m
[32m+[m[41m        [m
[32m+[m[32m        imageCanvas.width = (this.imageEl.OriginWidth > this.imageEl.OriginHeight) ? this.imageEl.OriginWidth : this.imageEl.OriginHeight;[m
[32m+[m[32m        imageCanvas.height = (this.imageEl.OriginWidth > this.imageEl.OriginHeight) ? this.imageEl.OriginWidth : this.imageEl.OriginHeight;[m
[32m+[m[41m        [m
[32m+[m[32m        var center = imageCanvas.width / 2;[m
[32m+[m[41m        [m
[32m+[m[32m        imageContext.translate(center, center);[m
[32m+[m[41m        [m
[32m+[m[32m        imageContext.rotate(this.rotate * Math.PI / 180);[m
[32m+[m[41m        [m
[32m+[m[32m        imageContext.drawImage(this.imageEl, 0, 0, this.imageEl.OriginWidth, this.imageEl.OriginHeight, center * -1, center * -1, this.imageEl.OriginWidth, this.imageEl.OriginHeight);[m
[32m+[m[41m        [m
[32m+[m[32m        var canvas = document.createElement("canvas");[m
[32m+[m[41m        [m
[32m+[m[32m        var context = canvas.getContext("2d");[m
[32m+[m[41m                [m
[32m+[m[32m        canvas.width = this.minWidth;[m
[32m+[m[32m        canvas.height = this.minHeight;[m
[32m+[m
[32m+[m[32m        switch (this.rotate) {[m
[32m+[m[32m            case 0 :[m
[32m+[m[41m                [m
[32m+[m[32m                var width = (this.thumbEl.getWidth() / this.getScaleLevel() > this.imageEl.OriginWidth) ? this.imageEl.OriginWidth : (this.thumbEl.getWidth() / this.getScaleLevel());[m
[32m+[m[32m                var height = (this.thumbEl.getHeight() / this.getScaleLevel() > this.imageEl.OriginHeight) ? this.imageEl.OriginHeight : (this.thumbEl.getHeight() / this.getScaleLevel());[m
[32m+[m[41m                [m
[32m+[m[32m                var x = (this.thumbEl.getLeft(true) > this.previewEl.getLeft(true)) ? 0 : ((this.previewEl.getLeft(true) - this.thumbEl.getLeft(true)) / this.getScaleLevel());[m
[32m+[m[32m                var y = (this.thumbEl.getTop(true) > this.previewEl.getTop(true)) ? 0 : ((this.previewEl.getTop(true) - this.thumbEl.getTop(true)) / this.getScaleLevel());[m
[32m+[m[41m                [m
[32m+[m[32m                var targetWidth = this.minWidth - 2 * x;[m
[32m+[m[32m                var targetHeight = this.minHeight - 2 * y;[m
[32m+[m[41m                [m
[32m+[m[32m                var scale = 1;[m
[32m+[m[41m                [m
[32m+[m[32m                if((x == 0 && y == 0) || (x == 0 && y > 0)){[m
[32m+[m[32m                    scale = targetWidth / width;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                if(x > 0 && y == 0){[m
[32m+[m[32m                    scale = targetHeight / height;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                if(x > 0 && y > 0){[m
[32m+[m[32m                    scale = targetWidth / width;[m
[32m+[m[41m                    [m
[32m+[m[32m                    if(width < height){[m
[32m+[m[32m                        scale = targetHeight / height;[m
[32m+[m[32m                    }[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                context.scale(scale, scale);[m
[32m+[m[41m                [m
[32m+[m[32m                var sx = Math.min(this.canvasEl.width - this.thumbEl.getWidth(), this.thumbEl.getLeft(true) - this.previewEl.getLeft(true));[m
[32m+[m[32m                var sy = Math.min(this.canvasEl.height - this.thumbEl.getHeight(), this.thumbEl.getTop(true) - this.previewEl.getTop(true));[m
[32m+[m
[32m+[m[32m                sx = sx < 0 ? 0 : (sx / this.getScaleLevel());[m
[32m+[m[32m                sy = sy < 0 ? 0 : (sy / this.getScaleLevel());[m
[32m+[m
[32m+[m[32m                context.drawImage(imageCanvas, sx, sy, width, height, x, y, width, height);[m
[32m+[m[41m                [m
[32m+[m[32m                break;[m
[32m+[m[32m            case 90 :[m[41m [m
[32m+[m[41m                [m
[32m+[m[32m                var width = (this.thumbEl.getWidth() / this.getScaleLevel() > this.imageEl.OriginHeight) ? this.imageEl.OriginHeight : (this.thumbEl.getWidth() / this.getScaleLevel());[m
[32m+[m[32m                var height = (this.thumbEl.getHeight() / this.getScaleLevel() > this.imageEl.OriginWidth) ? this.imageEl.OriginWidth : (this.thumbEl.getHeight() / this.getScaleLevel());[m
[32m+[m[41m                [m
[32m+[m[32m                var x = (this.thumbEl.getLeft(true) > this.previewEl.getLeft(true)) ? 0 : ((this.previewEl.getLeft(true) - this.thumbEl.getLeft(true)) / this.getScaleLevel());[m
[32m+[m[32m                var y = (this.thumbEl.getTop(true) > this.previewEl.getTop(true)) ? 0 : ((this.previewEl.getTop(true) - this.thumbEl.getTop(true)) / this.getScaleLevel());[m
[32m+[m[41m                [m
[32m+[m[32m                var targetWidth = this.minWidth - 2 * x;[m
[32m+[m[32m                var targetHeight = this.minHeight - 2 * y;[m
[32m+[m[41m                [m
[32m+[m[32m                var scale = 1;[m
[32m+[m[41m                [m
[32m+[m[32m                if((x == 0 && y == 0) || (x == 0 && y > 0)){[m
[32m+[m[32m                    scale = targetWidth / width;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                if(x > 0 && y == 0){[m
[32m+[m[32m                    scale = targetHeight / height;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                if(x > 0 && y > 0){[m
[32m+[m[32m                    scale = targetWidth / width;[m
[32m+[m[41m                    [m
[32m+[m[32m                    if(width < height){[m
[32m+[m[32m                        scale = targetHeight / height;[m
[32m+[m[32m                    }[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                context.scale(scale, scale);[m
[32m+[m[41m                [m
[32m+[m[32m                var sx = Math.min(this.canvasEl.width - this.thumbEl.getWidth(), this.thumbEl.getLeft(true) - this.previewEl.getLeft(true));[m
[32m+[m[32m                var sy = Math.min(this.canvasEl.height - this.thumbEl.getHeight(), this.thumbEl.getTop(true) - this.previewEl.getTop(true));[m
[32m+[m
[32m+[m[32m                sx = sx < 0 ? 0 : (sx / this.getScaleLevel());[m
[32m+[m[32m                sy = sy < 0 ? 0 : (sy / this.getScaleLevel());[m
[32m+[m[41m                [m
[32m+[m[32m                sx += (this.imageEl.OriginWidth > this.imageEl.OriginHeight) ? Math.abs(this.imageEl.OriginWidth - this.imageEl.OriginHeight) : 0;[m
[32m+[m[41m                [m
[32m+[m[32m                context.drawImage(imageCanvas, sx, sy, width, height, x, y, width, height);[m
[32m+[m[41m                [m
[32m+[m[32m                break;[m
[32m+[m[32m            case 180 :[m
[32m+[m[41m                [m
[32m+[m[32m                var width = (this.thumbEl.getWidth() / this.getScaleLevel() > this.imageEl.OriginWidth) ? this.imageEl.OriginWidth : (this.thumbEl.getWidth() / this.getScaleLevel());[m
[32m+[m[32m                var height = (this.thumbEl.getHeight() / this.getScaleLevel() > this.imageEl.OriginHeight) ? this.imageEl.OriginHeight : (this.thumbEl.getHeight() / this.getScaleLevel());[m
[32m+[m[41m                [m
[32m+[m[32m                var x = (this.thumbEl.getLeft(true) > this.previewEl.getLeft(true)) ? 0 : ((this.previewEl.getLeft(true) - this.thumbEl.getLeft(true)) / this.getScaleLevel());[m
[32m+[m[32m                var y = (this.thumbEl.getTop(true) > this.previewEl.getTop(true)) ? 0 : ((this.previewEl.getTop(true) - this.thumbEl.getTop(true)) / this.getScaleLevel());[m
[32m+[m[41m                [m
[32m+[m[32m                var targetWidth = this.minWidth - 2 * x;[m
[32m+[m[32m                var targetHeight = this.minHeight - 2 * y;[m
[32m+[m[41m                [m
[32m+[m[32m                var scale = 1;[m
[32m+[m[41m                [m
[32m+[m[32m                if((x == 0 && y == 0) || (x == 0 && y > 0)){[m
[32m+[m[32m                    scale = targetWidth / width;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                if(x > 0 && y == 0){[m
[32m+[m[32m                    scale = targetHeight / height;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                if(x > 0 && y > 0){[m
[32m+[m[32m                    scale = targetWidth / width;[m
[32m+[m[41m                    [m
[32m+[m[32m                    if(width < height){[m
[32m+[m[32m                        scale = targetHeight / height;[m
[32m+[m[32m                    }[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                context.scale(scale, scale);[m
[32m+[m[41m                [m
[32m+[m[32m                var sx = Math.min(this.canvasEl.width - this.thumbEl.getWidth(), this.thumbEl.getLeft(true) - this.previewEl.getLeft(true));[m
[32m+[m[32m                var sy = Math.min(this.canvasEl.height - this.thumbEl.getHeight(), this.thumbEl.getTop(true) - this.previewEl.getTop(true));[m
[32m+[m
[32m+[m[32m                sx = sx < 0 ? 0 : (sx / this.getScaleLevel());[m
[32m+[m[32m                sy = sy < 0 ? 0 : (sy / this.getScaleLevel());[m
[32m+[m
[32m+[m[32m                sx += (this.imageEl.OriginWidth > this.imageEl.OriginHeight) ? 0 : Math.abs(this.imageEl.OriginWidth - this.imageEl.OriginHeight);[m
[32m+[m[32m                sy += (this.imageEl.OriginWidth > this.imageEl.OriginHeight) ? Math.abs(this.imageEl.OriginWidth - this.imageEl.OriginHeight) : 0;[m
[32m+[m[41m                [m
[32m+[m[32m                context.drawImage(imageCanvas, sx, sy, width, height, x, y, width, height);[m
[32m+[m[41m                [m
[32m+[m[32m                break;[m
[32m+[m[32m            case 270 :[m
[32m+[m[41m                [m
[32m+[m[32m                var width = (this.thumbEl.getWidth() / this.getScaleLevel() > this.imageEl.OriginHeight) ? this.imageEl.OriginHeight : (this.thumbEl.getWidth() / this.getScaleLevel());[m
[32m+[m[32m                var height = (this.thumbEl.getHeight() / this.getScaleLevel() > this.imageEl.OriginWidth) ? this.imageEl.OriginWidth : (this.thumbEl.getHeight() / this.getScaleLevel());[m
[32m+[m[41m                [m
[32m+[m[32m                var x = (this.thumbEl.getLeft(true) > this.previewEl.getLeft(true)) ? 0 : ((this.previewEl.getLeft(true) - this.thumbEl.getLeft(true)) / this.getScaleLevel());[m
[32m+[m[32m                var y = (this.thumbEl.getTop(true) > this.previewEl.getTop(true)) ? 0 : ((this.previewEl.getTop(true) - this.thumbEl.getTop(true)) / this.getScaleLevel());[m
[32m+[m[41m                [m
[32m+[m[32m                var targetWidth = this.minWidth - 2 * x;[m
[32m+[m[32m                var targetHeight = this.minHeight - 2 * y;[m
[32m+[m[41m                [m
[32m+[m[32m                var scale = 1;[m
[32m+[m[41m                [m
[32m+[m[32m                if((x == 0 && y == 0) || (x == 0 && y > 0)){[m
[32m+[m[32m                    scale = targetWidth / width;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                if(x > 0 && y == 0){[m
[32m+[m[32m                    scale = targetHeight / height;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                if(x > 0 && y > 0){[m
[32m+[m[32m                    scale = targetWidth / width;[m
[32m+[m[41m                    [m
[32m+[m[32m                    if(width < height){[m
[32m+[m[32m                        scale = targetHeight / height;[m
[32m+[m[32m                    }[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                context.scale(scale, scale);[m
[32m+[m[41m                [m
[32m+[m[32m                var sx = Math.min(this.canvasEl.width - this.thumbEl.getWidth(), this.thumbEl.getLeft(true) - this.previewEl.getLeft(true));[m
[32m+[m[32m                var sy = Math.min(this.canvasEl.height - this.thumbEl.getHeight(), this.thumbEl.getTop(true) - this.previewEl.getTop(true));[m
[32m+[m
[32m+[m[32m                sx = sx < 0 ? 0 : (sx / this.getScaleLevel());[m
[32m+[m[32m                sy = sy < 0 ? 0 : (sy / this.getScaleLevel());[m
[32m+[m[41m                [m
[32m+[m[32m                sy += (this.imageEl.OriginWidth > this.imageEl.OriginHeight) ? 0 : Math.abs(this.imageEl.OriginWidth - this.imageEl.OriginHeight);[m
[32m+[m[41m                [m
[32m+[m[32m                context.drawImage(imageCanvas, sx, sy, width, height, x, y, width, height);[m
[32m+[m[41m                [m
[32m+[m[32m                break;[m
[32m+[m[32m            default :[m[41m [m
[32m+[m[32m                break;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.cropData = canvas.toDataURL(this.cropType);[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.fireEvent('crop', this, this.cropData) !== false){[m
[32m+[m[32m            this.process(this.file, this.cropData);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        return;[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    setThumbBoxSize : function()[m
[32m+[m[32m    {[m
[32m+[m[32m        var width, height;[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.isDocument && typeof(this.imageEl) != 'undefined'){[m
[32m+[m[32m            width = (this.imageEl.OriginWidth > this.imageEl.OriginHeight) ? Math.max(this.minWidth, this.minHeight) : Math.min(this.minWidth, this.minHeight);[m
[32m+[m[32m            height = (this.imageEl.OriginWidth > this.imageEl.OriginHeight) ? Math.min(this.minWidth, this.minHeight) : Math.max(this.minWidth, this.minHeight);[m
[32m+[m[41m            [m
[32m+[m[32m            this.minWidth = width;[m
[32m+[m[32m            this.minHeight = height;[m
[32m+[m[41m            [m
[32m+[m[32m            if(this.rotate == 90 || this.rotate == 270){[m
[32m+[m[32m                this.minWidth = height;[m
[32m+[m[32m                this.minHeight = width;[m
[32m+[m[32m            }[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        height = 300;[m
[32m+[m[32m        width = Math.ceil(this.minWidth * height / this.minHeight);[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.minWidth > this.minHeight){[m
[32m+[m[32m            width = 300;[m
[32m+[m[32m            height = Math.ceil(this.minHeight * width / this.minWidth);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.thumbEl.setStyle({[m
[32m+[m[32m            width : width + 'px',[m
[32m+[m[32m            height : height + 'px'[m
[32m+[m[32m        });[m
[32m+[m
[32m+[m[32m        return;[m
[32m+[m[41m            [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    setThumbBoxPosition : function()[m
[32m+[m[32m    {[m
[32m+[m[32m        var x = Math.ceil((this.bodyEl.getWidth() - this.thumbEl.getWidth()) / 2 );[m
[32m+[m[32m        var y = Math.ceil((this.bodyEl.getHeight() - this.thumbEl.getHeight()) / 2);[m
[32m+[m[41m        [m
[32m+[m[32m        this.thumbEl.setLeft(x);[m
[32m+[m[32m        this.thumbEl.setTop(y);[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    baseRotateLevel : function()[m
[32m+[m[32m    {[m
[32m+[m[32m        this.baseRotate = 1;[m
[32m+[m[41m        [m
[32m+[m[32m        if([m
[32m+[m[32m                typeof(this.exif) != 'undefined' &&[m
[32m+[m[32m                typeof(this.exif[Roo.dialog.UploadCropbox['tags']['Orientation']]) != 'undefined' &&[m
[32m+[m[32m                [1, 3, 6, 8].indexOf(this.exif[Roo.dialog.UploadCropbox['tags']['Orientation']]) != -1[m
[32m+[m[32m        ){[m
[32m+[m[32m            this.baseRotate = this.exif[Roo.dialog.UploadCropbox['tags']['Orientation']];[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.rotate = Roo.dialog.UploadCropbox['Orientation'][this.baseRotate];[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    baseScaleLevel : function()[m
[32m+[m[32m    {[m
[32m+[m[32m        var width, height;[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.isDocument){[m
[32m+[m[41m            [m
[32m+[m[32m            if(this.baseRotate == 6 || this.baseRotate == 8){[m
[32m+[m[41m            [m
[32m+[m[32m                height = this.thumbEl.getHeight();[m
[32m+[m[32m                this.baseScale = height / this.imageEl.OriginWidth;[m
[32m+[m
[32m+[m[32m                if(this.imageEl.OriginHeight * this.baseScale > this.thumbEl.getWidth()){[m
[32m+[m[32m                    width = this.thumbEl.getWidth();[m
[32m+[m[32m                    this.baseScale = width / this.imageEl.OriginHeight;[m
[32m+[m[32m                }[m
[32m+[m
[32m+[m[32m                return;[m
[32m+[m[32m            }[m
[32m+[m
[32m+[m[32m            height = this.thumbEl.getHeight();[m
[32m+[m[32m            this.baseScale = height / this.imageEl.OriginHeight;[m
[32m+[m
[32m+[m[32m            if(this.imageEl.OriginWidth * this.baseScale > this.thumbEl.getWidth()){[m
[32m+[m[32m                width = this.thumbEl.getWidth();[m
[32m+[m[32m                this.baseScale = width / this.imageEl.OriginWidth;[m
[32m+[m[32m            }[m
[32m+[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.baseRotate == 6 || this.baseRotate == 8){[m
[32m+[m[41m            [m
[32m+[m[32m            width = this.thumbEl.getHeight();[m
[32m+[m[32m            this.baseScale = width / this.imageEl.OriginHeight;[m
[32m+[m[41m            [m
[32m+[m[32m            if(this.imageEl.OriginHeight * this.baseScale < this.thumbEl.getWidth()){[m
[32m+[m[32m                height = this.thumbEl.getWidth();[m
[32m+[m[32m                this.baseScale = height / this.imageEl.OriginHeight;[m
[32m+[m[32m            }[m
[32m+[m[41m            [m
[32m+[m[32m            if(this.imageEl.OriginWidth > this.imageEl.OriginHeight){[m
[32m+[m[32m                height = this.thumbEl.getWidth();[m
[32m+[m[32m                this.baseScale = height / this.imageEl.OriginHeight;[m
[32m+[m[41m                [m
[32m+[m[32m                if(this.imageEl.OriginWidth * this.baseScale < this.thumbEl.getHeight()){[m
[32m+[m[32m                    width = this.thumbEl.getHeight();[m
[32m+[m[32m                    this.baseScale = width / this.imageEl.OriginWidth;[m
[32m+[m[32m                }[m
[32m+[m[32m            }[m
[32m+[m[41m            [m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        width = this.thumbEl.getWidth();[m
[32m+[m[32m        this.baseScale = width / this.imageEl.OriginWidth;[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.imageEl.OriginHeight * this.baseScale < this.thumbEl.getHeight()){[m
[32m+[m[32m            height = this.thumbEl.getHeight();[m
[32m+[m[32m            this.baseScale = height / this.imageEl.OriginHeight;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.imageEl.OriginWidth > this.imageEl.OriginHeight){[m
[32m+[m[41m            [m
[32m+[m[32m            height = this.thumbEl.getHeight();[m
[32m+[m[32m            this.baseScale = height / this.imageEl.OriginHeight;[m
[32m+[m[41m            [m
[32m+[m[32m            if(this.imageEl.OriginWidth * this.baseScale < this.thumbEl.getWidth()){[m
[32m+[m[32m                width = this.thumbEl.getWidth();[m
[32m+[m[32m                this.baseScale = width / this.imageEl.OriginWidth;[m
[32m+[m[32m            }[m
[32m+[m[41m            [m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        return;[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    getScaleLevel : function()[m
[32m+[m[32m    {[m
[32m+[m[32m        return this.baseScale * Math.pow(1.1, this.scale);[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    onTouchStart : function(e)[m
[32m+[m[32m    {[m
[32m+[m[32m        if(!this.canvasLoaded){[m
[32m+[m[32m            this.beforeSelectFile(e);[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        var touches = e.browserEvent.touches;[m
[32m+[m[41m        [m
[32m+[m[32m        if(!touches){[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if(touches.length == 1){[m
[32m+[m[32m            this.onMouseDown(e);[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if(touches.length != 2){[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        var coords = [];[m
[32m+[m[41m        [m
[32m+[m[32m        for(var i = 0, finger; finger = touches[i]; i++){[m
[32m+[m[32m            coords.push(finger.pageX, finger.pageY);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        var x = Math.pow(coords[0] - coords[2], 2);[m
[32m+[m[32m        var y = Math.pow(coords[1] - coords[3], 2);[m
[32m+[m[41m        [m
[32m+[m[32m        this.startDistance = Math.sqrt(x + y);[m
[32m+[m[41m        [m
[32m+[m[32m        this.startScale = this.scale;[m
[32m+[m[41m        [m
[32m+[m[32m        this.pinching = true;[m
[32m+[m[32m        this.dragable = false;[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    onTouchMove : function(e)[m
[32m+[m[32m    {[m
[32m+[m[32m        if(!this.pinching && !this.dragable){[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        var touches = e.browserEvent.touches;[m
[32m+[m[41m        [m
[32m+[m[32m        if(!touches){[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.dragable){[m
[32m+[m[32m            this.onMouseMove(e);[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        var coords = [];[m
[32m+[m[41m        [m
[32m+[m[32m        for(var i = 0, finger; finger = touches[i]; i++){[m
[32m+[m[32m            coords.push(finger.pageX, finger.pageY);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        var x = Math.pow(coords[0] - coords[2], 2);[m
[32m+[m[32m        var y = Math.pow(coords[1] - coords[3], 2);[m
[32m+[m[41m        [m
[32m+[m[32m        this.endDistance = Math.sqrt(x + y);[m
[32m+[m[41m        [m
[32m+[m[32m        this.scale = this.startScale + Math.floor(Math.log(this.endDistance / this.startDistance) / Math.log(1.1));[m
[32m+[m[41m        [m
[32m+[m[32m        if(!this.zoomable()){[m
[32m+[m[32m            this.scale = this.startScale;[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.draw();[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    onTouchEnd : function(e)[m
[32m+[m[32m    {[m
[32m+[m[32m        this.pinching = false;[m
[32m+[m[32m        this.dragable = false;[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    process : function(file, crop)[m
[32m+[m[32m    {[m
[32m+[m[32m        if(this.loadMask){[m
[32m+[m[32m            this.maskEl.mask(this.loadingText);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.xhr = new XMLHttpRequest();[m
[32m+[m[41m        [m
[32m+[m[32m        file.xhr = this.xhr;[m
[32m+[m
[32m+[m[32m        this.xhr.open(this.method, this.url, true);[m
[32m+[m[41m        [m
[32m+[m[32m        var headers = {[m
[32m+[m[32m            "Accept": "application/json",[m
[32m+[m[32m            "Cache-Control": "no-cache",[m
[32m+[m[32m            "X-Requested-With": "XMLHttpRequest"[m
[32m+[m[32m        };[m
[32m+[m[41m        [m
[32m+[m[32m        for (var headerName in headers) {[m
[32m+[m[32m            var headerValue = headers[headerName];[m
[32m+[m[32m            if (headerValue) {[m
[32m+[m[32m                this.xhr.setRequestHeader(headerName, headerValue);[m
[32m+[m[32m            }[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        var _this = this;[m
[32m+[m[41m        [m
[32m+[m[32m        this.xhr.onload = function()[m
[32m+[m[32m        {[m
[32m+[m[32m            _this.xhrOnLoad(_this.xhr);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.xhr.onerror = function()[m
[32m+[m[32m        {[m
[32m+[m[32m            _this.xhrOnError(_this.xhr);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        var formData = new FormData();[m
[32m+[m
[32m+[m[32m        formData.append('returnHTML', 'NO');[m
[32m+[m[41m        [m
[32m+[m[32m        if(crop){[m
[32m+[m[32m            formData.append('crop', crop);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if(typeof(file) != 'undefined' && (typeof(file.id) == 'undefined' || file.id * 1 < 1)){[m
[32m+[m[32m            formData.append(this.paramName, file, file.name);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if(typeof(file.filename) != 'undefined'){[m
[32m+[m[32m            formData.append('filename', file.filename);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if(typeof(file.mimetype) != 'undefined'){[m
[32m+[m[32m            formData.append('mimetype', file.mimetype);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.fireEvent('arrange', this, formData) != false){[m
[32m+[m[32m            this.xhr.send(formData);[m
[32m+[m[32m        };[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    xhrOnLoad : function(xhr)[m
[32m+[m[32m    {[m
[32m+[m[32m        if(this.loadMask){[m
[32m+[m[32m            this.maskEl.unmask();[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if (xhr.readyState !== 4) {[m
[32m+[m[32m            this.fireEvent('exception', this, xhr);[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m
[32m+[m[32m        var response = Roo.decode(xhr.responseText);[m
[32m+[m[41m        [m
[32m+[m[32m        if(!response.success){[m
[32m+[m[32m            this.fireEvent('exception', this, xhr);[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        var response = Roo.decode(xhr.responseText);[m
[32m+[m[41m        [m
[32m+[m[32m        this.fireEvent('upload', this, response);[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    xhrOnError : function()[m
[32m+[m[32m    {[m
[32m+[m[32m        if(this.loadMask){[m
[32m+[m[32m            this.maskEl.unmask();[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        Roo.log('xhr on error');[m
[32m+[m[41m        [m
[32m+[m[32m        var response = Roo.decode(xhr.responseText);[m
[32m+[m[41m          [m
[32m+[m[32m        Roo.log(response);[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    prepare : function(file)[m
[32m+[m[32m    {[m[41m   [m
[32m+[m[32m        if(this.loadMask){[m
[32m+[m[32m            this.maskEl.mask(this.loadingText);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.file = false;[m
[32m+[m[32m        this.exif = {};[m
[32m+[m[41m        [m
[32m+[m[32m        if(typeof(file) === 'string'){[m
[32m+[m[32m            this.loadCanvas(file);[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if(!file || !this.urlAPI){[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        this.file = file;[m
[32m+[m[32m        this.cropType = file.type;[m
[32m+[m[41m        [m
[32m+[m[32m        var _this = this;[m
[32m+[m[41m        [m
[32m+[m[32m        if(this.fireEvent('prepare', this, this.file) != false){[m
[32m+[m[41m            [m
[32m+[m[32m            var reader = new FileReader();[m
[32m+[m[41m            [m
[32m+[m[32m            reader.onload = function (e) {[m
[32m+[m[32m                if (e.target.error) {[m
[32m+[m[32m                    Roo.log(e.target.error);[m
[32m+[m[32m                    return;[m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                var buffer = e.target.result,[m
[32m+[m[32m                    dataView = new DataView(buffer),[m
[32m+[m[32m                    offset = 2,[m
[32m+[m[32m                    maxOffset = dataView.byteLength - 4,[m
[32m+[m[32m                    markerBytes,[m
[32m+[m[32m                    markerLength;[m
[32m+[m[41m                [m
[32m+[m[32m                if (dataView.getUint16(0) === 0xffd8) {[m
[32m+[m[32m                    while (offset < maxOffset) {[m
[32m+[m[32m                        markerBytes = dataView.getUint16(offset);[m
[32m+[m[41m                        [m
[32m+[m[32m                        if ((markerBytes >= 0xffe0 && markerBytes <= 0xffef) || markerBytes === 0xfffe) {[m
[32m+[m[32m                            markerLength = dataView.getUint16(offset + 2) + 2;[m
[32m+[m[32m                            if (offset + markerLength > dataView.byteLength) {[m
[32m+[m[32m                                Roo.log('Invalid meta data: Invalid segment size.');[m
[32m+[m[32m                                break;[m
[32m+[m[32m                            }[m
[32m+[m[41m                            [m
[32m+[m[32m                            if(markerBytes == 0xffe1){[m
[32m+[m[32m                                _this.parseExifData([m
[32m+[m[32m                                    dataView,[m
[32m+[m[32m                                    offset,[m
[32m+[m[32m                                    markerLength[m
[32m+[m[32m                                );[m
[32m+[m[32m                            }[m
[32m+[m[41m                            [m
[32m+[m[32m                            offset += markerLength;[m
[32m+[m[41m                            [m
[32m+[m[32m                            continue;[m
[32m+[m[32m                        }[m
[32m+[m[41m                        [m
[32m+[m[32m                        break;[m
[32m+[m[32m                    }[m
[32m+[m[41m                    [m
[32m+[m[32m                }[m
[32m+[m[41m                [m
[32m+[m[32m                var url = _this.urlAPI.createObjectURL(_this.file);[m
[32m+[m[41m                [m
[32m+[m[32m                _this.loadCanvas(url);[m
[32m+[m[41m                [m
[32m+[m[32m                return;[m
[32m+[m[32m            }[m
[32m+[m[41m            [m
[32m+[m[32m            reader.readAsArrayBuffer(this.file);[m
[32m+[m[41m            [m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    parseExifData : function(dataView, offset, length)[m
[32m+[m[32m    {[m
[32m+[m[32m        var tiffOffset = offset + 10,[m
[32m+[m[32m            littleEndian,[m
[32m+[m[32m            dirOffset;[m
[32m+[m[41m    [m
[32m+[m[32m        if (dataView.getUint32(offset + 4) !== 0x45786966) {[m
[32m+[m[32m            // No Exif data, might be XMP data instead[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        // Check for the ASCII code for "Exif" (0x45786966):[m
[32m+[m[32m        if (dataView.getUint32(offset + 4) !== 0x45786966) {[m
[32m+[m[32m            // No Exif data, might be XMP data instead[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[32m        if (tiffOffset + 8 > dataView.byteLength) {[m
[32m+[m[32m            Roo.log('Invalid Exif data: Invalid segment size.');[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[32m        // Check for the two null bytes:[m
[32m+[m[32m        if (dataView.getUint16(offset + 8) !== 0x0000) {[m
[32m+[m[32m            Roo.log('Invalid Exif data: Missing byte alignment offset.');[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[32m        // Check the byte alignment:[m
[32m+[m[32m        switch (dataView.getUint16(tiffOffset)) {[m
[32m+[m[32m        case 0x4949:[m
[32m+[m[32m            littleEndian = true;[m
[32m+[m[32m            break;[m
[32m+[m[32m        case 0x4D4D:[m
[32m+[m[32m            littleEndian = false;[m
[32m+[m[32m            break;[m
[32m+[m[32m        default:[m
[32m+[m[32m            Roo.log('Invalid Exif data: Invalid byte alignment marker.');[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[32m        // Check for the TIFF tag marker (0x002A):[m
[32m+[m[32m        if (dataView.getUint16(tiffOffset + 2, littleEndian) !== 0x002A) {[m
[32m+[m[32m            Roo.log('Invalid Exif data: Missing TIFF marker.');[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[32m        // Retrieve the directory offset bytes, usually 0x00000008 or 8 decimal:[m
[32m+[m[32m        dirOffset = dataView.getUint32(tiffOffset + 4, littleEndian);[m
[32m+[m[41m        [m
[32m+[m[32m        this.parseExifTags([m
[32m+[m[32m            dataView,[m
[32m+[m[32m            tiffOffset,[m
[32m+[m[32m            tiffOffset + dirOffset,[m
[32m+[m[32m            littleEndian[m
[32m+[m[32m        );[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    parseExifTags : function(dataView, tiffOffset, dirOffset, littleEndian)[m
[32m+[m[32m    {[m
[32m+[m[32m        var tagsNumber,[m
[32m+[m[32m            dirEndOffset,[m
[32m+[m[32m            i;[m
[32m+[m[32m        if (dirOffset + 6 > dataView.byteLength) {[m
[32m+[m[32m            Roo.log('Invalid Exif data: Invalid directory offset.');[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[32m        tagsNumber = dataView.getUint16(dirOffset, littleEndian);[m
[32m+[m[32m        dirEndOffset = dirOffset + 2 + 12 * tagsNumber;[m
[32m+[m[32m        if (dirEndOffset + 4 > dataView.byteLength) {[m
[32m+[m[32m            Roo.log('Invalid Exif data: Invalid directory size.');[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[32m        for (i = 0; i < tagsNumber; i += 1) {[m
[32m+[m[32m            this.parseExifTag([m
[32m+[m[32m                dataView,[m
[32m+[m[32m                tiffOffset,[m
[32m+[m[32m                dirOffset + 2 + 12 * i, // tag offset[m
[32m+[m[32m                littleEndian[m
[32m+[m[32m            );[m
[32m+[m[32m        }[m
[32m+[m[32m        // Return the offset to the next directory:[m
[32m+[m[32m        return dataView.getUint32(dirEndOffset, littleEndian);[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    parseExifTag : function (dataView, tiffOffset, offset, littleEndian)[m[41m [m
[32m+[m[32m    {[m
[32m+[m[32m        var tag = dataView.getUint16(offset, littleEndian);[m
[32m+[m[41m        [m
[32m+[m[32m        this.exif[tag] = this.getExifValue([m
[32m+[m[32m            dataView,[m
[32m+[m[32m            tiffOffset,[m
[32m+[m[32m            offset,[m
[32m+[m[32m            dataView.getUint16(offset + 2, littleEndian), // tag type[m
[32m+[m[32m            dataView.getUint32(offset + 4, littleEndian), // tag length[m
[32m+[m[32m            littleEndian[m
[32m+[m[32m        );[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    getExifValue : function (dataView, tiffOffset, offset, type, length, littleEndian)[m
[32m+[m[32m    {[m
[32m+[m[32m        var tagType = Roo.dialog.UploadCropbox.exifTagTypes[type],[m
[32m+[m[32m            tagSize,[m
[32m+[m[32m            dataOffset,[m
[32m+[m[32m            values,[m
[32m+[m[32m            i,[m
[32m+[m[32m            str,[m
[32m+[m[32m            c;[m
[32m+[m[41m    [m
[32m+[m[32m        if (!tagType) {[m
[32m+[m[32m            Roo.log('Invalid Exif data: Invalid tag type.');[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        tagSize = tagType.size * length;[m
[32m+[m[32m        // Determine if the value is contained in the dataOffset bytes,[m
[32m+[m[32m        // or if the value at the dataOffset is a pointer to the actual data:[m
[32m+[m[32m        dataOffset = tagSize > 4 ?[m
[32m+[m[32m                tiffOffset + dataView.getUint32(offset + 8, littleEndian) : (offset + 8);[m
[32m+[m[32m        if (dataOffset + tagSize > dataView.byteLength) {[m
[32m+[m[32m            Roo.log('Invalid Exif data: Invalid data offset.');[m
[32m+[m[32m            return;[m
[32m+[m[32m        }[m
[32m+[m[32m        if (length === 1) {[m
[32m+[m[32m            return tagType.getValue(dataView, dataOffset, littleEndian);[m
[32m+[m[32m        }[m
[32m+[m[32m        values = [];[m
[32m+[m[32m        for (i = 0; i < length; i += 1) {[m
[32m+[m[32m            values[i] = tagType.getValue(dataView, dataOffset + i * tagType.size, littleEndian);[m
[32m+[m[32m        }[m
[32m+[m[41m        [m
[32m+[m[32m        if (tagType.ascii) {[m
[32m+[m[32m            str = '';[m
[32m+[m[32m            // Concatenate the chars:[m
[32m+[m[32m            for (i = 0; i < values.length; i += 1) {[m
[32m+[m[32m                c = values[i];[m
[32m+[m[32m                // Ignore the terminating NULL byte(s):[m
[32m+[m[32m                if (c === '\u0000') {[m
[32m+[m[32m                    break;[m
[32m+[m[32m                }[m
[32m+[m[32m                str += c;[m
[32m+[m[32m            }[m
[32m+[m[32m            return str;[m
[32m+[m[32m        }[m
[32m+[m[32m        return values;[m
[32m+[m[32m    }[m
[32m+[m[41m    [m
[32m+[m[32m});[m
[32m+[m
[32m+[m[32mRoo.apply(Roo.dialog.UploadCropbox, {[m
[32m+[m[32m    tags : {[m
[32m+[m[32m        'Orientation': 0x0112[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    Orientation: {[m
[32m+[m[32m            1: 0, //'top-left',[m
[32m+[m[32m//            2: 'top-right',[m
[32m+[m[32m            3: 180, //'bottom-right',[m
[32m+[m[32m//            4: 'bottom-left',[m
[32m+[m[32m//            5: 'left-top',[m
[32m+[m[32m            6: 90, //'right-top',[m
[32m+[m[32m//            7: 'right-bottom',[m
[32m+[m[32m            8: 270 //'left-bottom'[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    exifTagTypes : {[m
[32m+[m[32m        // byte, 8-bit unsigned int:[m
[32m+[m[32m        1: {[m
[32m+[m[32m            getValue: function (dataView, dataOffset) {[m
[32m+[m[32m                return dataView.getUint8(dataOffset);[m
[32m+[m[32m            },[m
[32m+[m[32m            size: 1[m
[32m+[m[32m        },[m
[32m+[m[32m        // ascii, 8-bit byte:[m
[32m+[m[32m        2: {[m
[32m+[m[32m            getValue: function (dataView, dataOffset) {[m
[32m+[m[32m                return String.fromCharCode(dataView.getUint8(dataOffset));[m
[32m+[m[32m            },[m
[32m+[m[32m            size: 1,[m
[32m+[m[32m            ascii: true[m
[32m+[m[32m        },[m
[32m+[m[32m        // short, 16 bit int:[m
[32m+[m[32m        3: {[m
[32m+[m[32m            getValue: function (dataView, dataOffset, littleEndian) {[m
[32m+[m[32m                return dataView.getUint16(dataOffset, littleEndian);[m
[32m+[m[32m            },[m
[32m+[m[32m            size: 2[m
[32m+[m[32m        },[m
[32m+[m[32m        // long, 32 bit int:[m
[32m+[m[32m        4: {[m
[32m+[m[32m            getValue: function (dataView, dataOffset, littleEndian) {[m
[32m+[m[32m                return dataView.getUint32(dataOffset, littleEndian);[m
[32m+[m[32m            },[m
[32m+[m[32m            size: 4[m
[32m+[m[32m        },[m
[32m+[m[32m        // rational = two long values, first is numerator, second is denominator:[m
[32m+[m[32m        5: {[m
[32m+[m[32m            getValue: function (dataView, dataOffset, littleEndian) {[m
[32m+[m[32m                return dataView.getUint32(dataOffset, littleEndian) /[m
[32m+[m[32m                    dataView.getUint32(dataOffset + 4, littleEndian);[m
[32m+[m[32m            },[m
[32m+[m[32m            size: 8[m
[32m+[m[32m        },[m
[32m+[m[32m        // slong, 32 bit signed int:[m
[32m+[m[32m        9: {[m
[32m+[m[32m            getValue: function (dataView, dataOffset, littleEndian) {[m
[32m+[m[32m                return dataView.getInt32(dataOffset, littleEndian);[m
[32m+[m[32m            },[m
[32m+[m[32m            size: 4[m
[32m+[m[32m        },[m
[32m+[m[32m        // srational, two slongs, first is numerator, second is denominator:[m
[32m+[m[32m        10: {[m
[32m+[m[32m            getValue: function (dataView, dataOffset, littleEndian) {[m
[32m+[m[32m                return dataView.getInt32(dataOffset, littleEndian) /[m
[32m+[m[32m                    dataView.getInt32(dataOffset + 4, littleEndian);[m
[32m+[m[32m            },[m
[32m+[m[32m            size: 8[m
[32m+[m[32m        }[m
[32m+[m[32m    },[m
[32m+[m[41m    [m
[32m+[m[32m    footer : {[m
[32m+[m[32m        STANDARD : [[m
[32m+[m[32m            {[m
[32m+[m[32m                tag : 'div',[m
[32m+[m[32m                cls : 'btn-group roo-upload-cropbox-rotate-left',[m
[32m+[m[32m                action : 'rotate-left',[m
[32m+[m[32m                cn : [[m
[32m+[m[32m                    {[m
[32m+[m[32m                        tag : 'button',[m
[32m+[m[32m                        cls : 'btn btn-default',[m
[32m+[m[32m                        html : '<i class="fa fa-undo"></i>'[m
[32m+[m[32m                    }[m
[32m+[m[32m                ][m
[32m+[m[32m            },[m
[32m+[m[32m            {[m
[32m+[m[32m                tag : 'div',[m
[32m+[m[32m                cls : 'btn-group roo-upload-cropbox-picture',[m
[32m+[m[32m                action : 'picture',[m
[32m+[m[32m                cn : [[m
[32m+[m[32m                    {[m
[32m+[m[32m                        tag : 'button',[m
[32m+[m[32m                        cls : 'btn btn-default',[m
[32m+[m[32m                        html : '<i class="fa fa-picture-o"></i>'[m
[32m+[m[32m                    }[m
[32m+[m[32m                ][m
[32m+[m[32m            },[m
[32m+[m[32m            {[m
[32m+[m[32m                tag : 'div',[m
[32m+[m[32m                cls : 'btn-group roo-upload-cropbox-rotate-right',[m
[32m+[m[32m                action : 'rotate-right',[m
[32m+[m[32m                cn : [[m
[32m+[m[32m                    {[m
[32m+[m[32m                        tag : 'button',[m
[32m+[m[32m                        cls : 'btn btn-default',[m
[32m+[m[32m                        html : '<i class="fa fa-repeat"></i>'[m
[32m+[m[32m                    }[m
[32m+[m[32m                ][m
[32m+[m[32m            }[m
[32m+[m[32m        ],[m
[32m+[m[32m        DOCUMENT : [[m
[32m+[m[32m            {[m
[32m+[m[32m                tag : 'div',[m
[32m+[m[32m                cls : 'btn-group roo-upload-cropbox-rotate-left',[m
[32m+[m[32m                action : 'rotate-left',[m
[32m+[m[32m                cn : [[m
[32m+[m[32m                    {[m
[32m+[m[32m                        tag : 'button',[m
[32m+[m[32m                        cls : 'btn btn-default',[m
[32m+[m[32m                        html : '<i class="fa fa-undo"></i>'[m
[32m+[m[32m                    }[m
[32m+[m[32m                ][m
[32m+[m[32m            },[m
[32m+[m[32m            {[m
[32m+[m[32m                tag : 'div',[m
[32m+[m[32m                cls : 'btn-group roo-upload-cropbox-download',[m
[32m+[m[32m                action : 'download',[m
[32m+[m[32m                cn : [[m
[32m+[m[32m                    {[m
[32m+[m[32m                        tag : 'button',[m
[32m+[m[32m                        cls : 'btn btn-default',[m
[32m+[m[32m                        html : '<i class="fa fa-download"></i>'[m
[32m+[m[32m                    }[m
[32m+[m[32m                ][m
[32m+[m[32m            },[m
[32m+[m[32m            {[m
[32m+[m[32m                tag : 'div',[m
[32m+[m[32m                cls : 'btn-group roo-upload-cropbox-crop',[m
[32m+[m[32m                action : 'crop',[m
[32m+[m[32m                cn : [[m
[32m+[m[32m                    {[m
[32m+[m[32m                        tag : 'button',[m
[32m+[m[32m                        cls : 'btn btn-default',[m
[32m+[m[32m                        html : '<i class="fa fa-crop"></i>'[m
[32m+[m[32m                    }[m
[32m+[m[32m                ][m
[32m+[m[32m            },[m
[32m+[m[32m            {[m
[32m+[m[32m                tag : 'div',[m
[32m+[m[32m                cls : 'btn-group roo-upload-cropbox-trash',[m
[32m+[m[32m                action : 'trash',[m
[32m+[m[32m                cn : [[m
[32m+[m[32m                    {[m
[32m+[m[32m                        tag : 'button',[m
[32m+[m[32m                        cls : 'btn btn-default',[m
[32m+[m[32m                        html : '<i class="fa fa-trash"></i>'[m
[32m+[m[32m                    }[m
[32m+[m[32m                ][m
[32m+[m[32m            },[m
[32m+[m[32m            {[m
[32m+[m[32m                tag : 'div',[m
[32m+[m[32m                cls : 'btn-group roo-upload-cropbox-rotate-right',[m
[32m+[m[32m                action : 'rotate-right',[m
[32m+[m[32m                cn : [[m
[32m+[m[32m                    {[m
[32m+[m[32m                        tag : 'button',[m
[32m+[m[32m                        cls : 'btn btn-default',[m
[32m+[m[32m                        html : '<i class="fa fa-repeat"></i>'[m
[32m+[m[32m                    }[m
[32m+[m[32m                ][m
[32m+[m[32m            }[m
[32m+[m[32m        ],[m
[32m+[m[32m        ROTATOR : [[m
[32m+[m[32m            {[m
[32m+[m[32m                tag : 'div',[m
[32m+[m[32m                cls : 'btn-group roo-upload-cropbox-rotate-left',[m
[32m+[m[32m                action : 'rotate-left',[m
[32m+[m[32m                cn : [[m
[32m+[m[32m                    {[m
[32m+[m[32m                        tag : 'button',[m
[32m+[m[32m                        cls : 'btn btn-default',[m
[32m+[m[32m                        html : '<i class="fa fa-undo"></i>'[m
[32m+[m[32m                    }[m
[32m+[m[32m                ][m
[32m+[m[32m            },[m
[32m+[m[32m            {[m
[32m+[m[32m                tag : 'div',[m
[32m+[m[32m                cls : 'btn-group roo-upload-cropbox-rotate-right',[m
[32m+[m[32m                action : 'rotate-right',[m
[32m+[m[32m                cn : [[m
[32m+[m[32m                    {[m
[32m+[m[32m                        tag : 'button',[m
[32m+[m[32m                        cls : 'btn btn-default',[m
[32m+[m[32m                        html : '<i class="fa fa-repeat"></i>'[m
[32m+[m[32m                    }[m
[32m+[m[32m                ][m
[32m+[m[32m            }[m
[32m+[m[32m        ][m
[32m+[m[32m    }[m
[32m+[m[32m});[m
[1mdiff --git a/roojs-ui.js b/roojs-ui.js[m
[1mindex 98443d0ddf..0cc67d83a4 100644[m
[1m--- a/roojs-ui.js[m
[1m+++ b/roojs-ui.js[m
[36m@@ -1598,9 +1598,9 @@[m [mreturn this.el.getUpdateManager();},_handleRefresh:function(A,B,C){if(!C||!this.[m
 te.setWidth(A);}if(this.adjustments){A+=this.adjustments[0];B+=this.adjustments[1];}return {"width":A,"height":B};},setSize:function(A,B){if(this.fitToFrame&&!this.ignoreResize(A,B)){if(this.fitContainer&&this.resizeEl!=this.el){this.el.setSize(A,B);}var C=this.adjustForComponents(A,B);[m
 this.resizeEl.setSize(this.autoWidth?"auto":C.width,this.autoHeight?"auto":C.height);this.fireEvent('resize',this,C.width,C.height);}},getTitle:function(){return this.title;},setTitle:function(A){this.title=A;if(this.region){this.region.updatePanelTitle(this,A);[m
 }},isClosable:function(){return this.closable;},beforeSlide:function(){this.el.clip();this.resizeEl.clip();},afterSlide:function(){this.el.unclip();this.resizeEl.unclip();},refresh:function(){if(this.refreshDelegate){this.loaded=false;this.refreshDelegate();[m
[31m-}},destroy:function(){this.el.removeAllListeners();var A=document.createElement("span");A.appendChild(this.el.dom);A.innerHTML="";this.el.remove();this.el=null;},form:false,view:false,addxtype:function(A){if(A.xtype.match(/^Form$/)){var el;el=this.el.createChild();[m
[31m-this.form=new Roo.form.Form(A);if(this.form.allItems.length){this.form.render(el.dom);}return this.form;}if(['View','JsonView','DatePicker'].indexOf(A.xtype)>-1){A.el=this.el.appendChild(document.createElement("div"));var B=new Roo.factory(A);B.render&&B.render(false,'');[m
[31m-this.view=B;return B;}return false;}});[m
[32m+[m[32m}},destroy:function(){this.el.removeAllListeners();var A=document.createElement("span");A.appendChild(this.el.dom);A.innerHTML="";this.el.remove();this.el=null;},form:false,view:false,addxtype:function(A){if(A.xtype.match(/^UploadCropbox$/)){this.cropbox=new Roo.factory(A);[m
[32m+[m[32mthis.cropbox.render(this.el);return this.cropbox;}if(A.xtype.match(/^Form$/)){var el;el=this.el.createChild();this.form=new Roo.form.Form(A);if(this.form.allItems.length){this.form.render(el.dom);}return this.form;}if(['View','JsonView','DatePicker'].indexOf(A.xtype)>-1){A.el=this.el.appendChild(document.createElement("div"));[m
[32m+[m[32mvar B=new Roo.factory(A);B.render&&B.render(false,'');this.view=B;return B;}return false;}});[m
 // Roo/GridPanel.js[m
 Roo.GridPanel=function(A,B){if(typeof(A.grid)!='undefined'){B=A;A=B.grid;}this.wrapper=Roo.DomHelper.append(document.body,{tag:"div",cls:"x-layout-grid-wrapper x-layout-inactive-content"},true);this.wrapper.dom.appendChild(A.getGridEl().dom);Roo.GridPanel.superclass.constructor.call(this,this.wrapper,B);[m
 if(this.toolbar){this.toolbar.el.insertBefore(this.wrapper.dom.firstChild);}if(this.footer&&!this.footer.el&&this.footer.xtype){this.footer.container=this.grid.getView().getFooterPanel(true);this.footer.dataSource=this.grid.dataSource;this.footer=Roo.factory(this.footer,Roo);[m
[36m@@ -1929,3 +1929,103 @@[m [mF.push("(typeof("+G+") == 'undefined')");});var H='(('+F.join(" || ")+") ? undef[m
 }return "'"+A+H+C+")"+A+"'";};var B;if(Roo.isGecko){B="tpl.compiled = function(values, parent){  with(values) { return '"+tpl.body.replace(/(\r\n|\n)/g,'\\n').replace(/'/g,"\\'").replace(this.re,fn)+"';};};";}else{B=["tpl.compiled = function(values, parent){  with (values) { return ['"];[m
 B.push(tpl.body.replace(/(\r\n|\n)/g,'\\n').replace(/'/g,"\\'").replace(this.re,fn));B.push("'].join('');};};");B=B.join('');}Roo.debug&&Roo.log(B.replace(/\\n/,'\n'));eval(B);return this;},applyTemplate:function(A){return this.master.compiled.call(this,A,{}[m
 );},apply:function(){return this.applyTemplate.apply(this,arguments);}});Roo.XTemplate.from=function(el){el=Roo.getDom(el);return new Roo.XTemplate(el.value||el.innerHTML);};[m
[32m+[m[32m// Roo/dialog/namespace.js[m
[32m+[m[32mRoo.dialog={};[m
[32m+[m[32m// Roo/dialog/UploadCropbox.js[m
[32m+[m[32mRoo.dialog.UploadCropbox=function(A){console.log("Dialog UploadCropbox Constructor");Roo.dialog.UploadCropbox.superclass.constructor.call(this,A);this.addEvents({"beforeselectfile":true,"initial":true,"crop":true,"prepare":true,"exception":true,"beforeloadcanvas":true,"trash":true,"download":true,"footerbuttonclick":true,"resize":true,"rotate":true,"inspect":true,"upload":true,"arrange":true,"loadcanvas":true}[m
[32m+[m[32m);this.buttons=this.buttons||Roo.dialog.UploadCropbox.footer.STANDARD;};Roo.extend(Roo.dialog.UploadCropbox,Roo.Component,{emptyText:'Click to upload image',rotateNotify:'Image is too small to rotate',errorTimeout:3000,scale:0,baseScale:1,rotate:0,dragable:false,pinching:false,mouseX:0,mouseY:0,cropData:false,minWidth:300,minHeight:300,file:false,exif:{}[m
[32m+[m[32m,baseRotate:1,cropType:'image/jpeg',buttons:false,canvasLoaded:false,isDocument:false,method:'POST',paramName:'imageUpload',loadMask:true,loadingText:'Loading...',maskEl:false,getAutoCreate:function(){var A={tag:'div',cls:'roo-upload-cropbox',cn:[{tag:'input',cls:'roo-upload-cropbox-selector',type:'file'}[m
[32m+[m[32m,{tag:'div',cls:'roo-upload-cropbox-body',style:'cursor:pointer',cn:[{tag:'div',cls:'roo-upload-cropbox-preview'},{tag:'div',cls:'roo-upload-cropbox-thumb'},{tag:'div',cls:'roo-upload-cropbox-empty-notify',html:this.emptyText},{tag:'div',cls:'roo-upload-cropbox-error-notify alert alert-danger',html:this.rotateNotify}[m
[32m+[m[32m]},{tag:'div',cls:'roo-upload-cropbox-footer',cn:{tag:'div',cls:'btn-group btn-group-justified roo-upload-cropbox-btn-group',cn:[]}}]};return A;},onRender:function(ct,A){console.log("On Render");console.log(this);Roo.dialog.UploadCropbox.superclass.onRender.call(this,ct,A);[m
[32m+[m[32mif(this.el){if(this.el.attr('xtype')){this.el.attr('xtypex',this.el.attr('xtype'));this.el.dom.removeAttribute('xtype');this.initEvents();}}else{var B=Roo.apply({},this.getAutoCreate());B.id=this.id||Roo.id();if(this.cls){B.cls=(typeof(B.cls)=='undefined'?this.cls:B.cls)+' '+this.cls;[m
[32m+[m[32m}if(this.style){B.style=(typeof(B.style)=='undefined'?this.style:B.style)+'; '+this.style;}this.el=ct.createChild(B,A);this.initEvents();}if(this.buttons.length){Roo.each(this.buttons,function(bb){var C=this.el.select('.roo-upload-cropbox-footer div.roo-upload-cropbox-btn-group').first().createChild(bb);[m
[32m+[m[32mC.on('click',this.onFooterButtonClick.createDelegate(this,[bb.action],true));},this);}if(this.loadMask){this.maskEl=this.el;}},initEvents:function(){this.urlAPI=(window.createObjectURL&&window)||(window.URL&&URL.revokeObjectURL&&URL)||(window.webkitURL&&webkitURL);[m
[32m+[m[32mthis.bodyEl=this.el.select('.roo-upload-cropbox-body',true).first();this.bodyEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay='block';this.selectorEl=this.el.select('.roo-upload-cropbox-selector',true).first();this.selectorEl.hide();this.previewEl=this.el.select('.roo-upload-cropbox-preview',true).first();[m
[32m+[m[32mthis.previewEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay='block';this.thumbEl=this.el.select('.roo-upload-cropbox-thumb',true).first();this.thumbEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay='block';this.thumbEl.hide();this.notifyEl=this.el.select('.roo-upload-cropbox-empty-notify',true).first();[m
[32m+[m[32mthis.notifyEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay='block';this.errorEl=this.el.select('.roo-upload-cropbox-error-notify',true).first();this.errorEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay='block';this.errorEl.hide();this.footerEl=this.el.select('.roo-upload-cropbox-footer',true).first();[m
[32m+[m[32mthis.footerEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay='block';this.footerEl.hide();this.setThumbBoxSize();this.bind();this.resize();this.fireEvent('initial',this);},bind:function(){var A=this;window.addEventListener("resize",function(){A.resize();[m
[32m+[m[32m});this.bodyEl.on('click',this.beforeSelectFile,this);if(Roo.isTouch){this.bodyEl.on('touchstart',this.onTouchStart,this);this.bodyEl.on('touchmove',this.onTouchMove,this);this.bodyEl.on('touchend',this.onTouchEnd,this);}if(!Roo.isTouch){this.bodyEl.on('mousedown',this.onMouseDown,this);[m
[32m+[m[32mthis.bodyEl.on('mousemove',this.onMouseMove,this);var B=(/Firefox/i.test(navigator.userAgent))?'DOMMouseScroll':'mousewheel';this.bodyEl.on(B,this.onMouseWheel,this);Roo.get(document).on('mouseup',this.onMouseUp,this);}this.selectorEl.on('change',this.onFileSelected,this);[m
[32m+[m[32m},reset:function(){this.scale=0;this.baseScale=1;this.rotate=0;this.baseRotate=1;this.dragable=false;this.pinching=false;this.mouseX=0;this.mouseY=0;this.cropData=false;this.notifyEl.dom.innerHTML=this.emptyText;},resize:function(){if(this.fireEvent('resize',this)!=false){this.setThumbBoxPosition();[m
[32m+[m[32mthis.setCanvasPosition();}},onFooterButtonClick:function(e,el,o,A){switch(A){case 'rotate-left':this.onRotateLeft(e);break;case 'rotate-right':this.onRotateRight(e);break;case 'picture':this.beforeSelectFile(e);break;case 'trash':this.trash(e);break;case 'crop':this.crop(e);[m
[32m+[m[32mbreak;case 'download':this.download(e);break;default:break;}this.fireEvent('footerbuttonclick',this,A);},beforeSelectFile:function(e){e.preventDefault();if(this.fireEvent('beforeselectfile',this)!=false){this.selectorEl.dom.click();}},onFileSelected:function(e){e.preventDefault();[m
[32m+[m[32mif(typeof(this.selectorEl.dom.files)=='undefined'||!this.selectorEl.dom.files.length){return;}var A=this.selectorEl.dom.files[0];if(this.fireEvent('inspect',this,A)!=false){this.prepare(A);}},trash:function(e){this.fireEvent('trash',this);},download:function(e){this.fireEvent('download',this);[m
[32m+[m[32m},loadCanvas:function(A){if(this.fireEvent('beforeloadcanvas',this,A)!=false){this.reset();this.imageEl=document.createElement('img');var B=this;this.imageEl.addEventListener("load",function(){B.onLoadCanvas();});this.imageEl.src=A;}},onLoadCanvas:function(){this.imageEl.OriginWidth=this.imageEl.naturalWidth||this.imageEl.width;[m
[32m+[m[32mthis.imageEl.OriginHeight=this.imageEl.naturalHeight||this.imageEl.height;if(this.fireEvent('loadcanvas',this,this.imageEl)!=false){this.bodyEl.un('click',this.beforeSelectFile,this);this.notifyEl.hide();this.thumbEl.show();this.footerEl.show();this.baseRotateLevel();[m
[32m+[m[32mif(this.isDocument){this.setThumbBoxSize();}this.setThumbBoxPosition();this.baseScaleLevel();this.draw();this.resize();this.canvasLoaded=true;}if(this.loadMask){this.maskEl.unmask();}},setCanvasPosition:function(){if(!this.canvasEl){return;}var pw=Math.ceil((this.bodyEl.getWidth()-this.canvasEl.width)/2);[m
[32m+[m[32mvar ph=Math.ceil((this.bodyEl.getHeight()-this.canvasEl.height)/2);this.previewEl.setLeft(pw);this.previewEl.setTop(ph);},onMouseDown:function(e){e.stopEvent();this.dragable=true;this.pinching=false;if(this.isDocument&&(this.canvasEl.width<this.thumbEl.getWidth()||this.canvasEl.height<this.thumbEl.getHeight())){this.dragable=false;[m
[32m+[m[32mreturn;}this.mouseX=Roo.isTouch?e.browserEvent.touches[0].pageX:e.getPageX();this.mouseY=Roo.isTouch?e.browserEvent.touches[0].pageY:e.getPageY();},onMouseMove:function(e){e.stopEvent();if(!this.canvasLoaded){return;}if(!this.dragable){return;}var A=Math.ceil(this.thumbEl.getLeft(true));[m
[32m+[m[32mvar B=Math.ceil(this.thumbEl.getTop(true));var C=Math.ceil(A+this.thumbEl.getWidth()-this.canvasEl.width);var D=Math.ceil(B+this.thumbEl.getHeight()-this.canvasEl.height);var x=Roo.isTouch?e.browserEvent.touches[0].pageX:e.getPageX();var y=Roo.isTouch?e.browserEvent.touches[0].pageY:e.getPageY();[m
[32m+[m[32mx=x-this.mouseX;y=y-this.mouseY;var E=Math.ceil(x+this.previewEl.getLeft(true));var F=Math.ceil(y+this.previewEl.getTop(true));E=(A<E)?A:((C>E)?C:E);F=(B<F)?B:((D>F)?D:F);this.previewEl.setLeft(E);this.previewEl.setTop(F);this.mouseX=Roo.isTouch?e.browserEvent.touches[0].pageX:e.getPageX();[m
[32m+[m[32mthis.mouseY=Roo.isTouch?e.browserEvent.touches[0].pageY:e.getPageY();},onMouseUp:function(e){e.stopEvent();this.dragable=false;},onMouseWheel:function(e){e.stopEvent();this.startScale=this.scale;this.scale=(e.getWheelDelta()==1)?(this.scale+1):(this.scale-1);[m
[32m+[m[32mif(!this.zoomable()){this.scale=this.startScale;return;}this.draw();return;},zoomable:function(){var A=this.thumbEl.getWidth()/this.minWidth;if(this.minWidth<this.minHeight){A=this.thumbEl.getHeight()/this.minHeight;}var B=Math.ceil(this.imageEl.OriginWidth*this.getScaleLevel()/A);[m
[32m+[m[32mvar C=Math.ceil(this.imageEl.OriginHeight*this.getScaleLevel()/A);if(this.isDocument&&(this.rotate==0||this.rotate==180)&&(B>this.imageEl.OriginWidth||C>this.imageEl.OriginHeight||(B<this.minWidth&&C<this.minHeight))){return false;}if(this.isDocument&&(this.rotate==90||this.rotate==270)&&(B>this.imageEl.OriginWidth||C>this.imageEl.OriginHeight||(B<this.minHeight&&C<this.minWidth))){return false;[m
[32m+[m[32m}if(!this.isDocument&&(this.rotate==0||this.rotate==180)&&(B<this.minWidth||B>this.imageEl.OriginWidth||C<this.minHeight||C>this.imageEl.OriginHeight)){return false;}if(!this.isDocument&&(this.rotate==90||this.rotate==270)&&(B<this.minHeight||B>this.imageEl.OriginWidth||C<this.minWidth||C>this.imageEl.OriginHeight)){return false;[m
[32m+[m[32m}return true;},onRotateLeft:function(e){if(!this.isDocument&&(this.canvasEl.height<this.thumbEl.getWidth()||this.canvasEl.width<this.thumbEl.getHeight())){var A=this.thumbEl.getWidth()/this.minWidth;var bw=Math.ceil(this.canvasEl.width/this.getScaleLevel());[m
[32m+[m[32mvar bh=Math.ceil(this.canvasEl.height/this.getScaleLevel());this.startScale=this.scale;while(this.getScaleLevel()<A){this.scale=this.scale+1;if(!this.zoomable()){break;}if(Math.ceil(bw*this.getScaleLevel())<this.thumbEl.getHeight()||Math.ceil(bh*this.getScaleLevel())<this.thumbEl.getWidth()){continue;[m
[32m+[m[32m}this.rotate=(this.rotate<90)?270:this.rotate-90;this.draw();return;}this.scale=this.startScale;this.onRotateFail();return false;}this.rotate=(this.rotate<90)?270:this.rotate-90;if(this.isDocument){this.setThumbBoxSize();this.setThumbBoxPosition();this.setCanvasPosition();[m
[32m+[m[32m}this.draw();this.fireEvent('rotate',this,'left');},onRotateRight:function(e){if(!this.isDocument&&(this.canvasEl.height<this.thumbEl.getWidth()||this.canvasEl.width<this.thumbEl.getHeight())){var A=this.thumbEl.getWidth()/this.minWidth;var bw=Math.ceil(this.canvasEl.width/this.getScaleLevel());[m
[32m+[m[32mvar bh=Math.ceil(this.canvasEl.height/this.getScaleLevel());this.startScale=this.scale;while(this.getScaleLevel()<A){this.scale=this.scale+1;if(!this.zoomable()){break;}if(Math.ceil(bw*this.getScaleLevel())<this.thumbEl.getHeight()||Math.ceil(bh*this.getScaleLevel())<this.thumbEl.getWidth()){continue;[m
[32m+[m[32m}this.rotate=(this.rotate>180)?0:this.rotate+90;this.draw();return;}this.scale=this.startScale;this.onRotateFail();return false;}this.rotate=(this.rotate>180)?0:this.rotate+90;if(this.isDocument){this.setThumbBoxSize();this.setThumbBoxPosition();this.setCanvasPosition();[m
[32m+[m[32m}this.draw();this.fireEvent('rotate',this,'right');},onRotateFail:function(){this.errorEl.show(true);var A=this;(function(){A.errorEl.hide(true);}).defer(this.errorTimeout);},draw:function(){this.previewEl.dom.innerHTML='';var A=document.createElement("canvas");[m
[32m+[m[32mvar B=A.getContext("2d");A.width=this.imageEl.OriginWidth*this.getScaleLevel();A.height=this.imageEl.OriginWidth*this.getScaleLevel();var C=this.imageEl.OriginWidth/2;if(this.imageEl.OriginWidth<this.imageEl.OriginHeight){A.width=this.imageEl.OriginHeight*this.getScaleLevel();[m
[32m+[m[32mA.height=this.imageEl.OriginHeight*this.getScaleLevel();C=this.imageEl.OriginHeight/2;}B.scale(this.getScaleLevel(),this.getScaleLevel());B.translate(C,C);B.rotate(this.rotate*Math.PI/180);B.drawImage(this.imageEl,0,0,this.imageEl.OriginWidth,this.imageEl.OriginHeight,C*-1,C*-1,this.imageEl.OriginWidth,this.imageEl.OriginHeight);[m
[32m+[m[32mthis.canvasEl=document.createElement("canvas");this.contextEl=this.canvasEl.getContext("2d");switch(this.rotate){case 0:this.canvasEl.width=this.imageEl.OriginWidth*this.getScaleLevel();this.canvasEl.height=this.imageEl.OriginHeight*this.getScaleLevel();this.contextEl.drawImage(A,0,0,this.canvasEl.width,this.canvasEl.height,0,0,this.canvasEl.width,this.canvasEl.height);[m
[32m+[m[32mbreak;case 90:this.canvasEl.width=this.imageEl.OriginHeight*this.getScaleLevel();this.canvasEl.height=this.imageEl.OriginWidth*this.getScaleLevel();if(this.imageEl.OriginWidth>this.imageEl.OriginHeight){this.contextEl.drawImage(A,Math.abs(this.canvasEl.width-this.canvasEl.height),0,this.canvasEl.width,this.canvasEl.height,0,0,this.canvasEl.width,this.canvasEl.height);[m
[32m+[m[32mbreak;}this.contextEl.drawImage(A,0,0,this.canvasEl.width,this.canvasEl.height,0,0,this.canvasEl.width,this.canvasEl.height);break;case 180:this.canvasEl.width=this.imageEl.OriginWidth*this.getScaleLevel();this.canvasEl.height=this.imageEl.OriginHeight*this.getScaleLevel();[m
[32m+[m[32mif(this.imageEl.OriginWidth>this.imageEl.OriginHeight){this.contextEl.drawImage(A,0,Math.abs(this.canvasEl.width-this.canvasEl.height),this.canvasEl.width,this.canvasEl.height,0,0,this.canvasEl.width,this.canvasEl.height);break;}this.contextEl.drawImage(A,Math.abs(this.canvasEl.width-this.canvasEl.height),0,this.canvasEl.width,this.canvasEl.height,0,0,this.canvasEl.width,this.canvasEl.height);[m
[32m+[m[32mbreak;case 270:this.canvasEl.width=this.imageEl.OriginHeight*this.getScaleLevel();this.canvasEl.height=this.imageEl.OriginWidth*this.getScaleLevel();if(this.imageEl.OriginWidth>this.imageEl.OriginHeight){this.contextEl.drawImage(A,0,0,this.canvasEl.width,this.canvasEl.height,0,0,this.canvasEl.width,this.canvasEl.height);[m
[32m+[m[32mbreak;}this.contextEl.drawImage(A,0,Math.abs(this.canvasEl.width-this.canvasEl.height),this.canvasEl.width,this.canvasEl.height,0,0,this.canvasEl.width,this.canvasEl.height);break;default:break;}this.previewEl.appendChild(this.canvasEl);this.setCanvasPosition();[m
[32m+[m[32m},crop:function(){if(!this.canvasLoaded){return;}var A=document.createElement("canvas");var B=A.getContext("2d");A.width=(this.imageEl.OriginWidth>this.imageEl.OriginHeight)?this.imageEl.OriginWidth:this.imageEl.OriginHeight;A.height=(this.imageEl.OriginWidth>this.imageEl.OriginHeight)?this.imageEl.OriginWidth:this.imageEl.OriginHeight;[m
[32m+[m[32mvar C=A.width/2;B.translate(C,C);B.rotate(this.rotate*Math.PI/180);B.drawImage(this.imageEl,0,0,this.imageEl.OriginWidth,this.imageEl.OriginHeight,C*-1,C*-1,this.imageEl.OriginWidth,this.imageEl.OriginHeight);var D=document.createElement("canvas");var E=D.getContext("2d");[m
[32m+[m[32mD.width=this.minWidth;D.height=this.minHeight;switch(this.rotate){case 0:var F=(this.thumbEl.getWidth()/this.getScaleLevel()>this.imageEl.OriginWidth)?this.imageEl.OriginWidth:(this.thumbEl.getWidth()/this.getScaleLevel());var G=(this.thumbEl.getHeight()/this.getScaleLevel()>this.imageEl.OriginHeight)?this.imageEl.OriginHeight:(this.thumbEl.getHeight()/this.getScaleLevel());[m
[32m+[m[32mvar x=(this.thumbEl.getLeft(true)>this.previewEl.getLeft(true))?0:((this.previewEl.getLeft(true)-this.thumbEl.getLeft(true))/this.getScaleLevel());var y=(this.thumbEl.getTop(true)>this.previewEl.getTop(true))?0:((this.previewEl.getTop(true)-this.thumbEl.getTop(true))/this.getScaleLevel());[m
[32m+[m[32mvar H=this.minWidth-2*x;var I=this.minHeight-2*y;var J=1;if((x==0&&y==0)||(x==0&&y>0)){J=H/F;}if(x>0&&y==0){J=I/G;}if(x>0&&y>0){J=H/F;if(F<G){J=I/G;}}E.scale(J,J);var sx=Math.min(this.canvasEl.width-this.thumbEl.getWidth(),this.thumbEl.getLeft(true)-this.previewEl.getLeft(true));[m
[32m+[m[32mvar sy=Math.min(this.canvasEl.height-this.thumbEl.getHeight(),this.thumbEl.getTop(true)-this.previewEl.getTop(true));sx=sx<0?0:(sx/this.getScaleLevel());sy=sy<0?0:(sy/this.getScaleLevel());E.drawImage(A,sx,sy,F,G,x,y,F,G);break;case 90:var F=(this.thumbEl.getWidth()/this.getScaleLevel()>this.imageEl.OriginHeight)?this.imageEl.OriginHeight:(this.thumbEl.getWidth()/this.getScaleLevel());[m
[32m+[m[32mvar G=(this.thumbEl.getHeight()/this.getScaleLevel()>this.imageEl.OriginWidth)?this.imageEl.OriginWidth:(this.thumbEl.getHeight()/this.getScaleLevel());var x=(this.thumbEl.getLeft(true)>this.previewEl.getLeft(true))?0:((this.previewEl.getLeft(true)-this.thumbEl.getLeft(true))/this.getScaleLevel());[m
[32m+[m[32mvar y=(this.thumbEl.getTop(true)>this.previewEl.getTop(true))?0:((this.previewEl.getTop(true)-this.thumbEl.getTop(true))/this.getScaleLevel());var H=this.minWidth-2*x;var I=this.minHeight-2*y;var J=1;if((x==0&&y==0)||(x==0&&y>0)){J=H/F;}if(x>0&&y==0){J=I/G;[m
[32m+[m[32m}if(x>0&&y>0){J=H/F;if(F<G){J=I/G;}}E.scale(J,J);var sx=Math.min(this.canvasEl.width-this.thumbEl.getWidth(),this.thumbEl.getLeft(true)-this.previewEl.getLeft(true));var sy=Math.min(this.canvasEl.height-this.thumbEl.getHeight(),this.thumbEl.getTop(true)-this.previewEl.getTop(true));[m
[32m+[m[32msx=sx<0?0:(sx/this.getScaleLevel());sy=sy<0?0:(sy/this.getScaleLevel());sx+=(this.imageEl.OriginWidth>this.imageEl.OriginHeight)?Math.abs(this.imageEl.OriginWidth-this.imageEl.OriginHeight):0;E.drawImage(A,sx,sy,F,G,x,y,F,G);break;case 180:var F=(this.thumbEl.getWidth()/this.getScaleLevel()>this.imageEl.OriginWidth)?this.imageEl.OriginWidth:(this.thumbEl.getWidth()/this.getScaleLevel());[m
[32m+[m[32mvar G=(this.thumbEl.getHeight()/this.getScaleLevel()>this.imageEl.OriginHeight)?this.imageEl.OriginHeight:(this.thumbEl.getHeight()/this.getScaleLevel());var x=(this.thumbEl.getLeft(true)>this.previewEl.getLeft(true))?0:((this.previewEl.getLeft(true)-this.thumbEl.getLeft(true))/this.getScaleLevel());[m
[32m+[m[32mvar y=(this.thumbEl.getTop(true)>this.previewEl.getTop(true))?0:((this.previewEl.getTop(true)-this.thumbEl.getTop(true))/this.getScaleLevel());var H=this.minWidth-2*x;var I=this.minHeight-2*y;var J=1;if((x==0&&y==0)||(x==0&&y>0)){J=H/F;}if(x>0&&y==0){J=I/G;[m
[32m+[m[32m}if(x>0&&y>0){J=H/F;if(F<G){J=I/G;}}E.scale(J,J);var sx=Math.min(this.canvasEl.width-this.thumbEl.getWidth(),this.thumbEl.getLeft(true)-this.previewEl.getLeft(true));var sy=Math.min(this.canvasEl.height-this.thumbEl.getHeight(),this.thumbEl.getTop(true)-this.previewEl.getTop(true));[m
[32m+[m[32msx=sx<0?0:(sx/this.getScaleLevel());sy=sy<0?0:(sy/this.getScaleLevel());sx+=(this.imageEl.OriginWidth>this.imageEl.OriginHeight)?0:Math.abs(this.imageEl.OriginWidth-this.imageEl.OriginHeight);sy+=(this.imageEl.OriginWidth>this.imageEl.OriginHeight)?Math.abs(this.imageEl.OriginWidth-this.imageEl.OriginHeight):0;[m
[32m+[m[32mE.drawImage(A,sx,sy,F,G,x,y,F,G);break;case 270:var F=(this.thumbEl.getWidth()/this.getScaleLevel()>this.imageEl.OriginHeight)?this.imageEl.OriginHeight:(this.thumbEl.getWidth()/this.getScaleLevel());var G=(this.thumbEl.getHeight()/this.getScaleLevel()>this.imageEl.OriginWidth)?this.imageEl.OriginWidth:(this.thumbEl.getHeight()/this.getScaleLevel());[m
[32m+[m[32mvar x=(this.thumbEl.getLeft(true)>this.previewEl.getLeft(true))?0:((this.previewEl.getLeft(true)-this.thumbEl.getLeft(true))/this.getScaleLevel());var y=(this.thumbEl.getTop(true)>this.previewEl.getTop(true))?0:((this.previewEl.getTop(true)-this.thumbEl.getTop(true))/this.getScaleLevel());[m
[32m+[m[32mvar H=this.minWidth-2*x;var I=this.minHeight-2*y;var J=1;if((x==0&&y==0)||(x==0&&y>0)){J=H/F;}if(x>0&&y==0){J=I/G;}if(x>0&&y>0){J=H/F;if(F<G){J=I/G;}}E.scale(J,J);var sx=Math.min(this.canvasEl.width-this.thumbEl.getWidth(),this.thumbEl.getLeft(true)-this.previewEl.getLeft(true));[m
[32m+[m[32mvar sy=Math.min(this.canvasEl.height-this.thumbEl.getHeight(),this.thumbEl.getTop(true)-this.previewEl.getTop(true));sx=sx<0?0:(sx/this.getScaleLevel());sy=sy<0?0:(sy/this.getScaleLevel());sy+=(this.imageEl.OriginWidth>this.imageEl.OriginHeight)?0:Math.abs(this.imageEl.OriginWidth-this.imageEl.OriginHeight);[m
[32m+[m[32mE.drawImage(A,sx,sy,F,G,x,y,F,G);break;default:break;}this.cropData=D.toDataURL(this.cropType);if(this.fireEvent('crop',this,this.cropData)!==false){this.process(this.file,this.cropData);}return;},setThumbBoxSize:function(){var A,B;if(this.isDocument&&typeof(this.imageEl)!='undefined'){A=(this.imageEl.OriginWidth>this.imageEl.OriginHeight)?Math.max(this.minWidth,this.minHeight):Math.min(this.minWidth,this.minHeight);[m
[32m+[m[32mB=(this.imageEl.OriginWidth>this.imageEl.OriginHeight)?Math.min(this.minWidth,this.minHeight):Math.max(this.minWidth,this.minHeight);this.minWidth=A;this.minHeight=B;if(this.rotate==90||this.rotate==270){this.minWidth=B;this.minHeight=A;}}B=300;A=Math.ceil(this.minWidth*B/this.minHeight);[m
[32m+[m[32mif(this.minWidth>this.minHeight){A=300;B=Math.ceil(this.minHeight*A/this.minWidth);}this.thumbEl.setStyle({width:A+'px',height:B+'px'});return;},setThumbBoxPosition:function(){var x=Math.ceil((this.bodyEl.getWidth()-this.thumbEl.getWidth())/2);var y=Math.ceil((this.bodyEl.getHeight()-this.thumbEl.getHeight())/2);[m
[32m+[m[32mthis.thumbEl.setLeft(x);this.thumbEl.setTop(y);},baseRotateLevel:function(){this.baseRotate=1;if(typeof(this.exif)!='undefined'&&typeof(this.exif[Roo.dialog.UploadCropbox['tags']['Orientation']])!='undefined'&&[1,3,6,8].indexOf(this.exif[Roo.dialog.UploadCropbox['tags']['Orientation']])!=-1){this.baseRotate=this.exif[Roo.dialog.UploadCropbox['tags']['Orientation']];[m
[32m+[m[32m}this.rotate=Roo.dialog.UploadCropbox['Orientation'][this.baseRotate];},baseScaleLevel:function(){var A,B;if(this.isDocument){if(this.baseRotate==6||this.baseRotate==8){B=this.thumbEl.getHeight();this.baseScale=B/this.imageEl.OriginWidth;if(this.imageEl.OriginHeight*this.baseScale>this.thumbEl.getWidth()){A=this.thumbEl.getWidth();[m
[32m+[m[32mthis.baseScale=A/this.imageEl.OriginHeight;}return;}B=this.thumbEl.getHeight();this.baseScale=B/this.imageEl.OriginHeight;if(this.imageEl.OriginWidth*this.baseScale>this.thumbEl.getWidth()){A=this.thumbEl.getWidth();this.baseScale=A/this.imageEl.OriginWidth;[m
[32m+[m[32m}return;}if(this.baseRotate==6||this.baseRotate==8){A=this.thumbEl.getHeight();this.baseScale=A/this.imageEl.OriginHeight;if(this.imageEl.OriginHeight*this.baseScale<this.thumbEl.getWidth()){B=this.thumbEl.getWidth();this.baseScale=B/this.imageEl.OriginHeight;[m
[32m+[m[32m}if(this.imageEl.OriginWidth>this.imageEl.OriginHeight){B=this.thumbEl.getWidth();this.baseScale=B/this.imageEl.OriginHeight;if(this.imageEl.OriginWidth*this.baseScale<this.thumbEl.getHeight()){A=this.thumbEl.getHeight();this.baseScale=A/this.imageEl.OriginWidth;[m
[32m+[m[32m}}return;}A=this.thumbEl.getWidth();this.baseScale=A/this.imageEl.OriginWidth;if(this.imageEl.OriginHeight*this.baseScale<this.thumbEl.getHeight()){B=this.thumbEl.getHeight();this.baseScale=B/this.imageEl.OriginHeight;}if(this.imageEl.OriginWidth>this.imageEl.OriginHeight){B=this.thumbEl.getHeight();[m
[32m+[m[32mthis.baseScale=B/this.imageEl.OriginHeight;if(this.imageEl.OriginWidth*this.baseScale<this.thumbEl.getWidth()){A=this.thumbEl.getWidth();this.baseScale=A/this.imageEl.OriginWidth;}}return;},getScaleLevel:function(){return this.baseScale*Math.pow(1.1,this.scale);[m
[32m+[m[32m},onTouchStart:function(e){if(!this.canvasLoaded){this.beforeSelectFile(e);return;}var A=e.browserEvent.touches;if(!A){return;}if(A.length==1){this.onMouseDown(e);return;}if(A.length!=2){return;}var B=[];for(var i=0,C;C=A[i];i++){B.push(C.pageX,C.pageY);}[m
[32m+[m[32mvar x=Math.pow(B[0]-B[2],2);var y=Math.pow(B[1]-B[3],2);this.startDistance=Math.sqrt(x+y);this.startScale=this.scale;this.pinching=true;this.dragable=false;},onTouchMove:function(e){if(!this.pinching&&!this.dragable){return;}var A=e.browserEvent.touches;if(!A){return;[m
[32m+[m[32m}if(this.dragable){this.onMouseMove(e);return;}var B=[];for(var i=0,C;C=A[i];i++){B.push(C.pageX,C.pageY);}var x=Math.pow(B[0]-B[2],2);var y=Math.pow(B[1]-B[3],2);this.endDistance=Math.sqrt(x+y);this.scale=this.startScale+Math.floor(Math.log(this.endDistance/this.startDistance)/Math.log(1.1));[m
[32m+[m[32mif(!this.zoomable()){this.scale=this.startScale;return;}this.draw();},onTouchEnd:function(e){this.pinching=false;this.dragable=false;},process:function(A,B){if(this.loadMask){this.maskEl.mask(this.loadingText);}this.xhr=new XMLHttpRequest();A.xhr=this.xhr;[m
[32m+[m[32mthis.xhr.open(this.method,this.url,true);var C={"Accept":"application/json","Cache-Control":"no-cache","X-Requested-With":"XMLHttpRequest"};for(var D in C){var E=C[D];if(E){this.xhr.setRequestHeader(D,E);}}var F=this;this.xhr.onload=function(){F.xhrOnLoad(F.xhr);[m
[32m+[m[32m};this.xhr.onerror=function(){F.xhrOnError(F.xhr);};var G=new FormData();G.append('returnHTML','NO');if(B){G.append('crop',B);}if(typeof(A)!='undefined'&&(typeof(A.id)=='undefined'||A.id*1<1)){G.append(this.paramName,A,A.name);}if(typeof(A.filename)!='undefined'){G.append('filename',A.filename);[m
[32m+[m[32m}if(typeof(A.mimetype)!='undefined'){G.append('mimetype',A.mimetype);}if(this.fireEvent('arrange',this,G)!=false){this.xhr.send(G);};},xhrOnLoad:function(A){if(this.loadMask){this.maskEl.unmask();}if(A.readyState!==4){this.fireEvent('exception',this,A);return;[m
[32m+[m[32m}var B=Roo.decode(A.responseText);if(!B.success){this.fireEvent('exception',this,A);return;}var B=Roo.decode(A.responseText);this.fireEvent('upload',this,B);},xhrOnError:function(){if(this.loadMask){this.maskEl.unmask();}Roo.log('xhr on error');var A=Roo.decode(xhr.responseText);[m
[32m+[m[32mRoo.log(A);},prepare:function(A){if(this.loadMask){this.maskEl.mask(this.loadingText);}this.file=false;this.exif={};if(typeof(A)==='string'){this.loadCanvas(A);return;}if(!A||!this.urlAPI){return;}this.file=A;this.cropType=A.type;var B=this;if(this.fireEvent('prepare',this,this.file)!=false){var C=new FileReader();[m
[32m+[m[32mC.onload=function(e){if(e.target.error){Roo.log(e.target.error);return;}var D=e.target.result,E=new DataView(D),F=2,G=E.byteLength-4,H,I;if(E.getUint16(0)===0xffd8){while(F<G){H=E.getUint16(F);if((H>=0xffe0&&H<=0xffef)||H===0xfffe){I=E.getUint16(F+2)+2;if(F+I>E.byteLength){Roo.log('Invalid meta data: Invalid segment size.');[m
[32m+[m[32mbreak;}if(H==0xffe1){B.parseExifData(E,F,I);}F+=I;continue;}break;}}var J=B.urlAPI.createObjectURL(B.file);B.loadCanvas(J);return;};C.readAsArrayBuffer(this.file);}},parseExifData:function(A,B,C){var D=B+10,E,F;if(A.getUint32(B+4)!==0x45786966){return;}if(A.getUint32(B+4)!==0x45786966){return;[m
[32m+[m[32m}if(D+8>A.byteLength){Roo.log('Invalid Exif data: Invalid segment size.');return;}if(A.getUint16(B+8)!==0x0000){Roo.log('Invalid Exif data: Missing byte alignment offset.');return;}switch(A.getUint16(D)){case 0x4949:E=true;break;case 0x4D4D:E=false;break;[m
[32m+[m[32mdefault:Roo.log('Invalid Exif data: Invalid byte alignment marker.');return;}if(A.getUint16(D+2,E)!==0x002A){Roo.log('Invalid Exif data: Missing TIFF marker.');return;}F=A.getUint32(D+4,E);this.parseExifTags(A,D,D+F,E);},parseExifTags:function(A,B,C,D){var E,F,i;[m
[32m+[m[32mif(C+6>A.byteLength){Roo.log('Invalid Exif data: Invalid directory offset.');return;}E=A.getUint16(C,D);F=C+2+12*E;if(F+4>A.byteLength){Roo.log('Invalid Exif data: Invalid directory size.');return;}for(i=0;i<E;i+=1){this.parseExifTag(A,B,C+2+12*i,D);}return A.getUint32(F,D);[m
[32m+[m[32m},parseExifTag:function(A,B,C,D){var E=A.getUint16(C,D);this.exif[E]=this.getExifValue(A,B,C,A.getUint16(C+2,D),A.getUint32(C+4,D),D);},getExifValue:function(A,B,C,D,E,F){var G=Roo.dialog.UploadCropbox.exifTagTypes[D],H,I,J,i,K,c;if(!G){Roo.log('Invalid Exif data: Invalid tag type.');[m
[32m+[m[32mreturn;}H=G.size*E;I=H>4?B+A.getUint32(C+8,F):(C+8);if(I+H>A.byteLength){Roo.log('Invalid Exif data: Invalid data offset.');return;}if(E===1){return G.getValue(A,I,F);}J=[];for(i=0;i<E;i+=1){J[i]=G.getValue(A,I+i*G.size,F);}if(G.ascii){K='';for(i=0;i<J.length;[m
[32m+[m[32mi+=1){c=J[i];if(c==='\u0000'){break;}K+=c;}return K;}return J;}});Roo.apply(Roo.dialog.UploadCropbox,{tags:{'Orientation':0x0112[m
[32m+[m[32m},Orientation:{1:0,3:180,6:90,8:270},exifTagTypes:{1:{getValue:function(A,B){return A.getUint8(B);},size:1},2:{getValue:function(A,B){return String.fromCharCode(A.getUint8(B));[m
[32m+[m[32m},size:1,ascii:true},3:{getValue:function(A,B,C){return A.getUint16(B,C);},size:2},4:{getValue:function(A,B,C){return A.getUint32(B,C);},size:4},5:{getValue:function(A,B,C){return A.getUint32(B,C)/A.getUint32(B+4,C);},size:8},9:{getValue:function(A,B,C){return A.getInt32(B,C);[m
[32m+[m[32m},size:4},10:{getValue:function(A,B,C){return A.getInt32(B,C)/A.getInt32(B+4,C);},size:8}},footer:{STANDARD:[{tag:'div',cls:'btn-group roo-upload-cropbox-rotate-left',action:'rotate-left',cn:[{tag:'button',cls:'btn btn-default',html:'<i class="fa fa-undo"></i>'}[m
[32m+[m[32m]},{tag:'div',cls:'btn-group roo-upload-cropbox-picture',action:'picture',cn:[{tag:'button',cls:'btn btn-default',html:'<i class="fa fa-picture-o"></i>'}]},{tag:'div',cls:'btn-group roo-upload-cropbox-rotate-right',action:'rotate-right',cn:[{tag:'button',cls:'btn btn-default',html:'<i class="fa fa-repeat"></i>'}[m
[32m+[m[32m]}],DOCUMENT:[{tag:'div',cls:'btn-group roo-upload-cropbox-rotate-left',action:'rotate-left',cn:[{tag:'button',cls:'btn btn-default',html:'<i class="fa fa-undo"></i>'}]},{tag:'div',cls:'btn-group roo-upload-cropbox-download',action:'download',cn:[{tag:'button',cls:'btn btn-default',html:'<i class="fa fa-download"></i>'}[m
[32m+[m[32m]},{tag:'div',cls:'btn-group roo-upload-cropbox-crop',action:'crop',cn:[{tag:'button',cls:'btn btn-default',html:'<i class="fa fa-crop"></i>'}]},{tag:'div',cls:'btn-group roo-upload-cropbox-trash',action:'trash',cn:[{tag:'button',cls:'btn btn-default',html:'<i class="fa fa-trash"></i>'}[m
[32m+[m[32m]},{tag:'div',cls:'btn-group roo-upload-cropbox-rotate-right',action:'rotate-right',cn:[{tag:'button',cls:'btn btn-default',html:'<i class="fa fa-repeat"></i>'}]}],ROTATOR:[{tag:'div',cls:'btn-group roo-upload-cropbox-rotate-left',action:'rotate-left',cn:[{tag:'button',cls:'btn btn-default',html:'<i class="fa fa-undo"></i>'}[m
[32m+[m[32m]},{tag:'div',cls:'btn-group roo-upload-cropbox-rotate-right',action:'rotate-right',cn:[{tag:'button',cls:'btn btn-default',html:'<i class="fa fa-repeat"></i>'}]}]}});[m
