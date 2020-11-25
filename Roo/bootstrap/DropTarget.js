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
                drop : this.dragDrop.createDelegate(this),
                enter : this.dragEnter.createDelegate(this),
                out : this.dragOut.createDelegate(this),
                over : this.dragOver.createDelegate(this)
            }
            
        });
        this.dropZone.DDM.useCache = false // so data gets refreshed when we resize stuff
    },
    
    dragDrop : function(source,e,data)
    {
        // user has to decide how to impliment this.
        Roo.log('drop');
        Roo.log(this);
        //this.fireEvent('drop', this, source, e ,data);
        return false;
    },
    
    dragEnter : function(n, dd, e, data)
    {
        // probably want to resize the element to match the dropped element..
        Roo.log("enter");
        this.originalSize = this.el.getSize();
        this.el.setSize( n.el.getSize());
        this.dropZone.DDM.refreshCache(this.name);
        Roo.log([n, dd, e, data]);
    },
    
    dragOut : function(value)
    {
        // resize back to normal
        Roo.log("out");
        this.el.setSize(this.originalSize);
        this.dropZone.resetConstraints();
    },
    
    dragOver : function()
    {
        // ??? do nothing?
    }
   
});

 

 