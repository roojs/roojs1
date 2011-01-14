/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */

 /**
 * @class Roo.dd.DDTarget
 * A DragDrop implementation that does not move, but can be a drop
 * target.  You would get the same result by simply omitting implementation
 * for the event callbacks, but this way we reduce the processing cost of the
 * event listener and the callbacks.
 * @extends Roo.dd.DragDrop
 * @constructor
 * @param {String} id the id of the element that is a drop target
 * @param {String} sGroup the group of related DragDrop objects
 * @param {object} config an object containing configurable attributes
 *                 Valid properties for DDTarget in addition to those in
 *                 DragDrop:
 *                    none
 */
Roo.dd.DDTarget = function(id, sGroup, config) {
    if (id) {
        this.initTarget(id, sGroup, config);
    }
    if (config.listeners || config.events) { 
       Roo.dd.DragDrop.superclass.constructor.call(this,  { 
            listeners : config.listeners || {}, 
            events : config.events || {} 
        });    
    }
};

// Roo.dd.DDTarget.prototype = new Roo.dd.DragDrop();
Roo.extend(Roo.dd.DDTarget, Roo.dd.DragDrop, {
    toString: function() {
        return ("DDTarget " + this.id);
    }
});
