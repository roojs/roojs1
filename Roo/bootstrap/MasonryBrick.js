/*
 * - LGPL
 *
 * element
 * 
 */

/**
 * @class Roo.bootstrap.MasonryBrick
 * @extends Roo.bootstrap.Component
 * Bootstrap MasonryBrick class
 * 
 * @constructor
 * Create a new MasonryBrick
 * @param {Object} config The config object
 */

Roo.bootstrap.MasonryBrick = function(config){
    Roo.bootstrap.MasonryBrick.superclass.constructor.call(this, config);
    
    this.addEvents({
        // raw events
        /**
         * @event click
         * When a MasonryBrick is clcik
         * @param {Roo.bootstrap.MasonryBrick} this
         * @param {Roo.EventObject} e
         */
        "click" : true
    });
};

Roo.extend(Roo.bootstrap.MasonryBrick, Roo.bootstrap.Component,  {
    
    /**
     * @cfg {String} title
     */   
    title : '',
    /**
     * @cfg {String} html
     */   
    html : '',
    /**
     * @cfg {String} bgimage
     */   
    bgimage : '',
    /**
     * @cfg {String} videourl
     */   
    videourl : '',
    /**
     * @cfg {String} cls
     */   
    cls : '',
    /**
     * @cfg {String} href
     */   
    href : '',
    /**
     * @cfg {String} size (xs|sm|md|md-left|md-right|tall|wide)
     */   
    size : 'xs',
    
    /**
     * @cfg {String} placetitle (center|bottom)
     */   
    placetitle : '',
    
    /**
     * @cfg {Boolean} isFitContainer defalut true
     */   
    isFitContainer : true, 
    
    /**
     * @cfg {Boolean} preventDefault defalut false
     */   
    preventDefault : false, 
    
    /**
     * @cfg {Boolean} inverse defalut false
     */   
    maskInverse : false, 
    
    getAutoCreate : function()
    {
        if(!this.isFitContainer){
            return this.getSplitAutoCreate();
        }
        
        var cls = 'masonry-brick masonry-brick-full';
        
        if(this.href.length){
            cls += ' masonry-brick-link';
        }
        
        if(this.bgimage.length){
            cls += ' masonry-brick-image';
        }
        
        if(this.maskInverse){
            cls += ' mask-inverse';
        }
        
        if(!this.html.length && !this.maskInverse){
            cls += ' enable-mask';
        }
        
        if(this.size){
            cls += ' masonry-' + this.size + '-brick';
        }
        
        if(this.placetitle.length){
            
            switch (this.placetitle) {
                case 'center' :
                    cls += ' masonry-center-title';
                    break;
                case 'bottom' :
                    cls += ' masonry-bottom-title';
                    break;
                default:
                    break;
            }
            
        } else {
            if(!this.html.length && !this.bgimage.length){
                cls += ' masonry-center-title';
            }

            if(!this.html.length && this.bgimage.length){
                cls += ' masonry-bottom-title';
            }
        }
        
        if(this.cls){
            cls += ' ' + this.cls;
        }
        
        var cfg = {
            tag: (this.href.length) ? 'a' : 'div',
            cls: cls,
            cn: [
                {
                    tag: 'div',
                    cls: 'masonry-brick-paragraph',
                    cn: []
                }
            ]
        };
        
        if(this.href.length){
            cfg.href = this.href;
        }
        
        var cn = cfg.cn[0].cn;
        
        if(this.title.length){
            cn.push({
                tag: 'h4',
                cls: 'masonry-brick-title',
                html: this.title
            });
        }
        
        if(this.html.length){
            cn.push({
                tag: 'p',
                cls: 'masonry-brick-text',
                html: this.html
            });
        }  
        if (!this.title.length && !this.html.length) {
            cfg.cn[0].cls += ' hide';
        }
        
        if(this.bgimage.length){
            cfg.cn.push({
                tag: 'img',
                cls: 'masonry-brick-image-view',
                src: this.bgimage
            });
        }
        
        if(this.videourl.length){
            var vurl = this.videourl.replace(/https:\/\/youtu\.be/, 'https://www.youtube.com/embed/');
            // youtube support only?
            cfg.cn.push({
                tag: 'iframe',
                cls: 'masonry-brick-image-view',
                src: vurl,
                frameborder : 0,
                allowfullscreen : true
            });
            
            
        }
        
        cfg.cn.push({
            tag: 'div',
            cls: 'masonry-brick-mask'
        });
        
        return cfg;
        
    },
    
    getSplitAutoCreate : function()
    {
        var cls = 'masonry-brick masonry-brick-split';
        
        if(this.href.length){
            cls += ' masonry-brick-link';
        }
        
        if(this.bgimage.length){
            cls += ' masonry-brick-image';
        }
        
        if(this.size){
            cls += ' masonry-' + this.size + '-brick';
        }
        
        switch (this.placetitle) {
            case 'center' :
                cls += ' masonry-center-title';
                break;
            case 'bottom' :
                cls += ' masonry-bottom-title';
                break;
            default:
                if(!this.bgimage.length){
                    cls += ' masonry-center-title';
                }

                if(this.bgimage.length){
                    cls += ' masonry-bottom-title';
                }
                break;
        }
        
        if(this.cls){
            cls += ' ' + this.cls;
        }
        
        var cfg = {
            tag: (this.href.length) ? 'a' : 'div',
            cls: cls,
            cn: [
                {
                    tag: 'div',
                    cls: 'masonry-brick-split-head',
                    cn: [
                        {
                            tag: 'div',
                            cls: 'masonry-brick-paragraph',
                            cn: []
                        }
                    ]
                },
                {
                    tag: 'div',
                    cls: 'masonry-brick-split-body',
                    cn: []
                }
            ]
        };
        
        if(this.href.length){
            cfg.href = this.href;
        }
        
        if(this.title.length){
            cfg.cn[0].cn[0].cn.push({
                tag: 'h4',
                cls: 'masonry-brick-title',
                html: this.title
            });
        }
        
        if(this.html.length){
            cfg.cn[1].cn.push({
                tag: 'p',
                cls: 'masonry-brick-text',
                html: this.html
            });
        }

        if(this.bgimage.length){
            cfg.cn[0].cn.push({
                tag: 'img',
                cls: 'masonry-brick-image-view',
                src: this.bgimage
            });
        }
        
        if(this.videourl.length){
            var vurl = this.videourl.replace(/https:\/\/youtu\.be/, 'https://www.youtube.com/embed/');
            // youtube support only?
            cfg.cn[0].cn.cn.push({
                tag: 'iframe',
                cls: 'masonry-brick-image-view',
                src: vurl,
                frameborder : 0,
                allowfullscreen : true
            });
        }
        
        return cfg;
    },
    
    initEvents: function() 
    {
        switch (this.size) {
            case 'xs' :
                this.x = 1;
                this.y = 1;
                break;
            case 'sm' :
                this.x = 2;
                this.y = 2;
                break;
            case 'md' :
            case 'md-left' :
            case 'md-right' :
                this.x = 3;
                this.y = 3;
                break;
            case 'tall' :
                this.x = 2;
                this.y = 3;
                break;
            case 'wide' :
                this.x = 3;
                this.y = 2;
                break;
            case 'wide-thin' :
                this.x = 3;
                this.y = 1;
                break;
                        
            default :
                break;
        }
        
        if(Roo.isTouch){
            this.el.on('touchstart', this.onTouchStart, this);
            this.el.on('touchmove', this.onTouchMove, this);
            this.el.on('touchend', this.onTouchEnd, this);
            this.el.on('contextmenu', this.onContextMenu, this);
        } else {
            this.el.on('mouseenter'  ,this.enter, this);
            this.el.on('mouseleave', this.leave, this);
            this.el.on('click', this.onClick, this);
        }
        
        if (typeof(this.parent().bricks) == 'object' && this.parent().bricks != null) {
            this.parent().bricks.push(this);   
        }
        
    },
    
    onClick: function(e, el)
    {
        var time = this.endTimer - this.startTimer;
        // Roo.log(e.preventDefault());
        if(Roo.isTouch){
            if(time > 1000){
                e.preventDefault();
                return;
            }
        }
        
        if(!this.preventDefault){
            return;
        }
        
        e.preventDefault();
        
        if (this.activeClass != '') {
            this.selectItem(e,el);
        }
        
        this.fireEvent('click', this);
    },
    
    enter: function(e, el)
    {
        e.preventDefault();
        
        if(!this.isFitContainer || this.maskInverse){
            return;
        }
        
        if(this.bgimage.length && this.html.length){
            this.el.select('.masonry-brick-paragraph', true).first().setOpacity(0.9, true);
        }
    },
    
    leave: function(e, el)
    {
        e.preventDefault();
        
        if(!this.isFitContainer || this.maskInverse){
            return;
        }
        
        if(this.bgimage.length && this.html.length){
            this.el.select('.masonry-brick-paragraph', true).first().setOpacity(0, true);
        }
    },
    
    onTouchStart: function(e, el)
    {
//        e.preventDefault();
        
        this.touchmoved = false;
        
        if(!this.isFitContainer){
            return;
        }
        
        if(!this.bgimage.length || !this.html.length){
            return;
        }
        
        this.el.select('.masonry-brick-paragraph', true).first().setOpacity(0.9, true);
        
        this.timer = new Date().getTime();
        
    },
    
    onTouchMove: function(e, el)
    {
        this.touchmoved = true;
    },
    
    onContextMenu : function(e,el)
    {
        e.preventDefault();
        e.stopPropagation();
        return false;
    },
    
    onTouchEnd: function(e, el)
    {
//        e.preventDefault();
        
        if((new Date().getTime() - this.timer > 1000) || !this.href.length || this.touchmoved){
        
            this.leave(e,el);
            
            return;
        }
        
        if(!this.bgimage.length || !this.html.length){
            
            if(this.href.length){
                window.location.href = this.href;
            }
            
            return;
        }
        
        if(!this.isFitContainer){
            return;
        }
        
        this.el.select('.masonry-brick-paragraph', true).first().setOpacity(0, true);
        
        window.location.href = this.href;
    }
    
});

 

 