
/**
 * @class Roo.bootstrap.Table.AbstractSelectionModel
 * @extends Roo.util.Observable
 * Abstract base class for grid SelectionModels.  It provides the interface that should be
 * implemented by descendant classes.  This class should not be directly instantiated.
 * @constructor
 */
Roo.bootstrap.Table.AbstractSelectionModel = function(){
    this.locked = false;
    Roo.bootstrap.Tabel.AbstractSelectionModel.superclass.constructor.call(this);
};


Roo.extend(Roo.bootstrap.Table.AbstractSelectionModel, Roo.util.Observable,  {
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