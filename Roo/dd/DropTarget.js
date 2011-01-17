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
 * @class Roo.dd.DropTarget
 * @extends Roo.dd.DDTarget
 * A simple class that provides the basic implementation needed to make any element a drop target that can have
 * draggable items dropped onto it.  The drop has no effect until an implementation of notifyDrop is provided.
 * @constructor
 * @param {String/HTMLElement/Element} el The container element
 * @param {Object} config
 */
Roo.dd.DropTarget = function(el, config){
    this.el = Roo.get(el);
    
    var listeners = false; ;
    if (config && config.listeners) {
        listeners= config.listeners;
        delete config.listeners;
    }
    Roo.apply(this, config);
    
    if(this.containerScroll){
        Roo.dd.ScrollManager.register(this.el);
    }
    this.addEvents( {
         /**
         * @scope Roo.dd.DropTarget
         */
         
         /**
         * @event enter
         * The function a {@link Roo.dd.DragSource} calls once to notify this drop target that the source is now over the
         * target.  This default implementation adds the CSS class specified by overClass (if any) to the drop element
         * and returns the dropAllowed config value.  This method should be overridden if drop validation is required.
         * 
         * IMPORTANT : it should set this.overClass and this.dropAllowed
         * 
         * @param {Roo.dd.DragSource} source The drag source that was dragged over this drop target
         * @param {Event} e The event
         * @param {Object} data An object containing arbitrary data supplied by the drag source
         */
        "enter" : true,
        
         /**
         * @event over
         * The function a {@link Roo.dd.DragSource} calls continuously while it is being dragged over the target.
         * This method will be called on every mouse movement while the drag source is over the drop target.
         * This default implementation simply returns the dropAllowed config value.
         * 
         * IMPORTANT : it should set this.dropAllowed
         * 
         * @param {Roo.dd.DragSource} source The drag source that was dragged over this drop target
         * @param {Event} e The event
         * @param {Object} data An object containing arbitrary data supplied by the drag source
         
         */
        "over" : true,
        /**
         * @event out
         * The function a {@link Roo.dd.DragSource} calls once to notify this drop target that the source has been dragged
         * out of the target without dropping.  This default implementation simply removes the CSS class specified by
         * overClass (if any) from the drop element.
         * @param {Roo.dd.DragSource} source The drag source that was dragged over this drop target
         * @param {Event} e The event
         * @param {Object} data An object containing arbitrary data supplied by the drag source
         */
         "out" : true,
         
        /**
         * @event drop
         * The function a {@link Roo.dd.DragSource} calls once to notify this drop target that the dragged item has
         * been dropped on it.  This method has no default implementation and returns false, so you must provide an
         * implementation that does something to process the drop event and returns true so that the drag source's
         * repair action does not run.
         * 
         * IMPORTANT : it should set this.success
         * 
         * @param {Roo.dd.DragSource} source The drag source that was dragged over this drop target
         * @param {Event} e The event
         * @param {Object} data An object containing arbitrary data supplied by the drag source
        */
         "drop" : true
    });
            
     
    Roo.dd.DropTarget.superclass.constructor.call(  this, 
        this.el.dom, 
        this.ddGroup || this.group,
        {
            isTarget: true,
            listeners : listeners || {} 
           
        
        }
    );

};

Roo.extend(Roo.dd.DropTarget, Roo.dd.DDTarget, {
    /**
     * @cfg {String} overClass
     * The CSS class applied to the drop target element while the drag source is over it (defaults to "").
     */
     /**
     * @cfg {String} ddGroup
     * The drag drop group to handle drop events for
     */
     
    /**
     * @cfg {String} dropAllowed
     * The CSS class returned to the drag source when drop is allowed (defaults to "x-dd-drop-ok").
     */
    dropAllowed : "x-dd-drop-ok",
    /**
     * @cfg {String} dropNotAllowed
     * The CSS class returned to the drag source when drop is not allowed (defaults to "x-dd-drop-nodrop").
     */
    dropNotAllowed : "x-dd-drop-nodrop",
    /**
     * @cfg {boolean} success
     * set this after drop listener.. 
     */
    success : false,
    /**
     * @cfg {boolean|String} valid true/false or string (add/sub/ok/nodrop)
     * if the drop point is valid for over/enter..
     */
    valid : false,
    // private
    isTarget : true,

    // private
    isNotifyTarget : true,
    
    /**
     * @hide
     */
    notifyEnter : function(dd, e, data)
    {
        this.valid = true;
        this.fireEvent('enter', dd, e, data);
        if(this.overClass){
            this.el.addClass(this.overClass);
        }
        return typeof(this.valid) == 'string' ? 'x-dd-drop-' + this.valid : (
            this.valid ? this.dropAllowed : this.dropNotAllowed
        );
    },

    /**
     * @hide
     */
    notifyOver : function(dd, e, data)
    {
        this.valid = true;
        this.fireEvent('over', dd, e, data);
        return typeof(this.valid) == 'string' ? 'x-dd-drop-' + this.valid : (
            this.valid ? this.dropAllowed : this.dropNotAllowed
        );
    },

    /**
     * @hide
     */
    notifyOut : function(dd, e, data)
    {
        this.fireEvent('out', dd, e, data);
        if(this.overClass){
            this.el.removeClass(this.overClass);
        }
    },

    /**
     * @hide
     */
    notifyDrop : function(dd, e, data)
    {
        this.success = false;
        this.fireEvent('drop', dd, e, data);
        return this.success;
    }
});