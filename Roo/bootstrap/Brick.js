/*
 * - LGPL
 *
 * element
 * 
 */

/**
 * @class Roo.bootstrap.Brick
 * @extends Roo.bootstrap.Component
 * Bootstrap Brick class
 * 
 * @constructor
 * Create a new Brick
 * @param {Object} config The config object
 */

Roo.bootstrap.Brick = function(config){
    Roo.bootstrap.Brick.superclass.constructor.call(this, config);
    
    this.addEvents({
        // raw events
        /**
         * @event click
         * When a Brick is click
         * @param {Roo.bootstrap.Brick} this
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
    
    getAutoCreate : function()
    {
        var cls = 'roo-brick';
        
        if(this.href.length){
            cls += ' roo-brick-link';
        }
        
        if(this.bgimage.length){
            cls += ' roo-brick-image';
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
                    cls: 'roo-brick-paragraph',
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
                cls: 'roo-brick-title',
                html: this.title
            });
        }
        
        if(this.html.length){
            cn.push({
                tag: 'p',
                cls: 'roo-brick-text',
                html: this.html
            });
        }
        
        if(this.bgimage.length){
            cfg.cn.push({
                tag: 'img',
                cls: 'roo-brick-image-view',
                src: this.bgimage
            });
        }
        
        return cfg;
    },
    
    initEvents: function() 
    {
        this.el.on('mouseenter'  ,this.enter, this);
        this.el.on('mouseleave', this.leave, this);
        
    },
    
    resize : function()
    {
        var paragraph = this.el.select('.masonry-brick-paragraph', true).first();
        paragraph.setHeight(paragraph.getWidth() + paragraph.getPadding('tb'));
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

 

 