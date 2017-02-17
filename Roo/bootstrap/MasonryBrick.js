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
    
    getAutoCreate : function(){
        
        var cfg = {
            tag: 'div',
            cls: 'masonry-brick'
        };
        
        return cfg;
    },
    
    initEvents: function() 
    {
        Roo.bootstrap.Element.superclass.initEvents.call(this);
        
        if(this.clickable){
            this.el.on('click', this.onClick, this);
        }
        
    },
    
    onClick : function(e)
    {
        if(this.preventDefault){
            e.preventDefault();
        }
        
        this.fireEvent('click', this, e);
    },
    
    getValue : function()
    {
        return this.el.dom.innerHTML;
    },
    
    setValue : function(value)
    {
        this.el.dom.innerHTML = value;
    }
   
});

 

 