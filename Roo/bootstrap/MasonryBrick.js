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
         * When a MasonryBrick is chick
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
     * @cfg {String} video
     */   
    video : '',
    /**
     * @cfg {Boolean} square
     */   
    square : true,
    /**
     * @cfg {String} (xs|sm|md) size
     */   
    size : 'xs',
    
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
        
        var cfg = {
            tag: 'div',
            cls: cls,
            cn: [
                {
                    tag: 'div',
                    cls: 'masonry-brick-paragraph',
                    cn: []
                }
            ]
        };
        
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
        this.intSize = 1;
        
        switch (this.size) {
            case 'xs' :
                this.intSize = 1;
                break;
            case 'sm' :
                this.intSize = 2;
                break;
            case 'md' :
                this.intSize = 3;
                break;
            default :
                break;
        }
        
        if(this.href.length){
            this.el.on('click', this.onClick, this);
        }
        
        this.el.on('mouseenter'  ,this.enter, this);
        this.el.on('mouseleave', this.leave, this);
        
        this.parent().bricks.push(this);
    },
    
    onClick: function(e, el)
    {
        e.preventDefault();
        
        Roo.log('on click');
    },
    
    enter: function(e, el)
    {
        e.preventDefault();
        
        if(this.bgimage.length){
            this.el.select('.masonry-brick-paragraph', true).first().setOpacity(0.9, true);
        }
    },
    
    leave: function(e, el)
    {
        e.preventDefault();
        
        if(this.bgimage.length){
            this.el.select('.masonry-brick-paragraph', true).first().setOpacity(0, true);
        }
    }
    
});

 

 