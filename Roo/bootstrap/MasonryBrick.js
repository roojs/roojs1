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
        
        if(this.size){
            cls += ' masonry-' + this.size + '-brick';
        }
        
        var cfg = {
            tag: 'div',
            cls: cls,
            cn: [
                {
                    tag: 'div',
                    cls: 'masonry-brick-content',
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
                cls: 'masonry-brick-html',
                html: this.html
            });
        }
        
        
        return cfg;
    },
    
    initEvents: function() 
    {
        if(this.href.length){
            this.el.on('click', this.onClick, this);
        }
        
        this.parent().bricks.push(this);
    },
    
    onClick: function(e, el)
    {
        e.preventDefault();
        
        Roo.log('on click');
    }
    
});

 

 