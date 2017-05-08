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
     * @cfg {String} cls
     */   
    cls : '',
    /**
     * @cfg {String} href
     */   
    href : '',
    /**
     * @cfg {String} (xs|sm|md|md-left|md-right|tall|wide) size
     */   
    size : 'xs',
    
    /**
     * @cfg {String} (center|bottom) placetitle
     */   
    placetitle : '',
    
    getAutoCreate : function()
    {
        var cls = 'masonry-brick';
        
        if(this.href.length){
            cls += ' masonry-brick-link';
        }
        
        if(this.bgimage.length){
            cls += ' masonry-brick-image';
        }
        
        if(this.size){
            cls += ' masonry-' + this.size + '-brick';
        }
        
        if(this.placetitle.length){
            
            Roo.log('in????');
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
        
        if(this.bgimage.length){
            cfg.cn.push({
                tag: 'img',
                cls: 'masonry-brick-image-view',
                src: this.bgimage
            });
        }
        
        return cfg;
        
    },
    
    initEvents: function() 
    {
        switch (this.size) {
            case 'xs' :
//                this.intSize = 1;
                this.x = 1;
                this.y = 1;
                break;
            case 'sm' :
//                this.intSize = 2;
                this.x = 2;
                this.y = 2;
                break;
            case 'md' :
            case 'md-left' :
            case 'md-right' :
//                this.intSize = 3;
                this.x = 3;
                this.y = 3;
                break;
            case 'tall' :
//                this.intSize = 3;
                this.x = 2;
                this.y = 3;
                break;
            case 'wide' :
//                this.intSize = 3;
                this.x = 3;
                this.y = 2;
                break;
            default :
                break;
        }
        
        
        
        if(Roo.isTouch){
            this.el.on('touchstart', this.onTouchStart, this);
            this.el.on('touchend', this.onTouchEnd, this);
        } else {
            this.el.on('mouseenter'  ,this.enter, this);
            this.el.on('mouseleave', this.leave, this);
        }
        
        if (typeof(this.parent().bricks) == 'object' && this.parent().bricks != null) {
            this.parent().bricks.push(this);   
        }
        
    },
    
    onClick: function(e, el)
    {
        alert('click');
        
        if(!Roo.isTouch){
            return;
        }
        
        var time = this.endTimer - this.startTimer;
        
        alert(time);
        
        if(time < 1000){
            return;
        }
        
        e.preventDefault();
    },
    
    enter: function(e, el)
    {
        e.preventDefault();
        
        if(this.bgimage.length && this.html.length){
            this.el.select('.masonry-brick-paragraph', true).first().setOpacity(0.9, true);
        }
    },
    
    leave: function(e, el)
    {
        e.preventDefault();
        
        if(this.bgimage.length && this.html.length){
            this.el.select('.masonry-brick-paragraph', true).first().setOpacity(0, true);
        }
    },
    
    onTouchStart: function(e, el)
    {
        e.preventDefault();
        
        if(!this.bgimage.length || !this.html.length){
            return;
        }
        
        this.el.select('.masonry-brick-paragraph', true).first().setOpacity(0.9, true);
        
        this.timer = new Date().getTime();
    },
    
    onTouchEnd: function(e, el)
    {
        e.preventDefault();
        
        if(!this.bgimage.length || !this.html.length){
            
            if(this.href.length){
                window.location.href = this.href;
            }
            
            return;
        }
        
        this.el.select('.masonry-brick-paragraph', true).first().setOpacity(0, true);
        
        if((new Date().getTime() - this.timer > 1000) || !this.href.length){
            return;
        }
        
        window.location.href = this.href;
    }
    
});

 

 