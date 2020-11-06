/*
 * - LGPL
 *
 * dropable area
 * 
 */

/**
 * @class Roo.bootstrap.DropTarget
 * @extends Roo.bootstrap.Element
 * Bootstrap DropTarget class
 
 * @cfg {string} name dropable name
 * 
 * @constructor
 * Create a new Dropable Area
 * @param {Object} config The config object
 */

Roo.bootstrap.DropTarget = function(config){
    Roo.bootstrap.DropTarget.superclass.constructor.call(this, config);
    
    this.addEvents({
        // raw events
        /**
         * @event click
         * When a element is chick
         * @param {Roo.bootstrap.Element} this
         * @param {Roo.EventObject} e
         */
        "drop" : true
    });
};

Roo.extend(Roo.bootstrap.DropTarget, Roo.bootstrap.Element,  {
    
    
    getAutoCreate : function(){
        
         
    },
    
    initEvents: function() 
    {
        Roo.bootstrap.DropTarget.superclass.initEvents.call(this);
        this.dropZone = new Roo.dd.DropTarget(this.getEl(), {
            ddGroup: this.name,
            listeners : {
                drop : this.onDrop,
                enter : this.onEnter,
                out : this.onOut,
                over : this.onOver
            }
        });
         
    },
    
    onDrop : function(source,e,data)
    {
        // user has to decide how to impliment this.
        this.fireEvent('drop', this, source, e ,data);
        return false;
    },
    
    onEnter : function(source)
    {
        // probably want to resize the element to match the dropped element..
        Roo.log("enter");
    },
    
    onOut : function(value)
    {
        // resize back to normal
        Roo.log("out");
    },
    
    onOver : function()
    {
        // ??? do nothing?
    }
   
});

 

 