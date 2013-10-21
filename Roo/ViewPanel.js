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
 * @class Roo.grid.EditorGrid
 * @extends Roo.grid.Grid
 * Class for creating and editable grid.
 * @param {String/HTMLElement/Roo.Element} container The element into which this grid will be rendered - 
 * The container MUST have some type of size defined for the grid to fill. The container will be 
 * automatically set to position relative if it isn't already.
 * @param {Object} dataSource The data model to bind to
 * @param {Object} colModel The column model with info about this grid's columns
 */
Roo.grid.ViewPanel = function(container, config){
    Roo.grid.ViewPanel.superclass.constructor.call(this, container, config);
    this.getGridEl().addClass("xedit-grid");

    if(!this.selModel){
        this.selModel = new Roo.grid.CellSelectionModel();
    }

    this.activeEditor = null;

	this.addEvents({
	    /**
	     * @event beforeedit
	     * Fires before cell editing is triggered. The edit event object has the following properties <br />
	     * <ul style="padding:5px;padding-left:16px;">
	     * <li>grid - This grid</li>
	     * <li>record - The record being edited</li>
	     * <li>field - The field name being edited</li>
	     * <li>value - The value for the field being edited.</li>
	     * <li>row - The grid row index</li>
	     * <li>column - The grid column index</li>
	     * <li>cancel - Set this to true to cancel the edit or return false from your handler.</li>
	     * </ul>
	     * @param {Object} e An edit event (see above for description)
	     */
	    "beforeedit" : true,
	    /**
	     * @event afteredit
	     * Fires after a cell is edited. <br />
	     * <ul style="padding:5px;padding-left:16px;">
	     * <li>grid - This grid</li>
	     * <li>record - The record being edited</li>
	     * <li>field - The field name being edited</li>
	     * <li>value - The value being set</li>
	     * <li>originalValue - The original value for the field, before the edit.</li>
	     * <li>row - The grid row index</li>
	     * <li>column - The grid column index</li>
	     * </ul>
	     * @param {Object} e An edit event (see above for description)
	     */
	    "afteredit" : true,
	    /**
	     * @event validateedit
	     * Fires after a cell is edited, but before the value is set in the record. 
         * You can use this to modify the value being set in the field, Return false
	     * to cancel the change. The edit event object has the following properties <br />
	     * <ul style="padding:5px;padding-left:16px;">
         * <li>editor - This editor</li>
	     * <li>grid - This grid</li>
	     * <li>record - The record being edited</li>
	     * <li>field - The field name being edited</li>
	     * <li>value - The value being set</li>
	     * <li>originalValue - The original value for the field, before the edit.</li>
	     * <li>row - The grid row index</li>
	     * <li>column - The grid column index</li>
	     * <li>cancel - Set this to true to cancel the edit or return false from your handler.</li>
	     * </ul>
	     * @param {Object} e An edit event (see above for description)
	     */
	    "validateedit" : true
	});
    this.on("bodyscroll", this.stopEditing,  this);
    this.on(this.clicksToEdit == 1 ? "cellclick" : "celldblclick", this.onCellDblClick,  this);
};


Roo.extend(Roo.grid.ViewPanel, Roo.grid.Grid, {
    
});