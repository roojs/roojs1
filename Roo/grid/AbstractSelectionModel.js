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
 * @class Roo.grid.AbstractSelectionModel
 * @extends Roo.util.Observable
 * @abstract
 * Abstract base class for grid SelectionModels.  It provides the interface that should be
 * implemented by descendant classes.  This class should not be directly instantiated.
 * @constructor
 */
Roo.grid.AbstractSelectionModel = function(){
    this.locked = false;
    Roo.grid.AbstractSelectionModel.superclass.constructor.call(this);
};

Roo.extend(Roo.grid.AbstractSelectionModel, Roo.util.Observable,  {
    /** @ignore Called by the grid automatically. Do not call directly. */
    init : function(grid){
        this.grid = grid;
        this.initEvents();
    },

    /**
     * Locks the selections.
     */
    lock : function(){
        this.locked = true;
    },

    /**
     * Unlocks the selections.
     */
    unlock : function(){
        this.locked = false;
    },

    /**
     * Returns true if the selections are locked.
     * @return {Boolean}
     */
    isLocked : function(){
        return this.locked;
    }
});