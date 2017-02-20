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
    size : true,
    
    getAutoCreate : function(){
        
        var cfg = {
            tag: 'div',
            cls: 'roo-masonry-brick',
            cn: [
                {
                    tag: 'div',
                    cls: 'roo-masonry-brick-content',
                    cn: []
                }
            ]
        };
        
        
        var cn = cfg.cn[0].cn;
        
        if(this.href.length){
            cn.push({
               tag: 'a',
               cls: 'roo-masonry-brick-link',
               style: "width: 100%; height: 100%;",
               href: this.href,
               cn: []
            });
            
            cn = cn[0].cn;
        }
        
        if(this.title.length){
            cn.push({
                tag: 'h4',
                cls: 'roo-masonry-brick-title',
                html: this.title
            });
        }
        
        if(this.html.length){
            cn.push({
                tag: 'p',
                cls: 'roo-masonry-brick-html',
                html: this.html
            });
        }
        
        
        
        
        return cfg;
    },
    
    initEvents: function() 
    {
        
    }
    
});

 

 