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
 * @class Roo.grid.CellSelectionModel
 * @extends Roo.grid.AbstractSelectionModel
 * This class provides the basic implementation for cell selection in a grid.
 * @constructor
 * @param {Object} config The object containing the configuration of this model.
 * @cfg {Boolean} enter_is_tab Enter behaves the same as tab. (eg. goes to next cell) default: false
 */
Roo.grid.CellSelectionModel = function(config){
    Roo.apply(this, config);

    this.selection = null;

    this.addEvents({
        /**
	     * @event beforerowselect
	     * Fires before a cell is selected.
	     * @param {SelectionModel} this
	     * @param {Number} rowIndex The selected row index
	     * @param {Number} colIndex The selected cell index
	     */
	    "beforecellselect" : true,
        /**
	     * @event cellselect
	     * Fires when a cell is selected.
	     * @param {SelectionModel} this
	     * @param {Number} rowIndex The selected row index
	     * @param {Number} colIndex The selected cell index
	     */
	    "cellselect" : true,
        /**
	     * @event selectionchange
	     * Fires when the active selection changes.
	     * @param {SelectionModel} this
	     * @param {Object} selection null for no selection or an object (o) with two properties
	        <ul>
	        <li>o.record: the record object for the row the selection is in</li>
	        <li>o.cell: An array of [rowIndex, columnIndex]</li>
	        </ul>
	     */
	    "selectionchange" : true,
        /**
	     * @event tabend
	     * Fires when the tab (or enter) was pressed on the last editable cell
	     * You can use this to trigger add new row.
	     * @param {SelectionModel} this
	     */
	    "tabend" : true,
         /**
	     * @event beforeeditnext
	     * Fires before the next editable sell is made active
	     * You can use this to skip to another cell or fire the tabend
	     *    if you set cell to false
	     * @param {Object} eventdata object : { cell : [ row, col ] } 
	     */
	    "beforeeditnext" : true
    });
    Roo.grid.CellSelectionModel.superclass.constructor.call(this);
};

Roo.extend(Roo.grid.CellSelectionModel, Roo.grid.AbstractSelectionModel,  {
    
    enter_is_tab: false,

    /** @ignore */
    initEvents : function(){
        this.grid.on("mousedown", this.handleMouseDown, this);
        this.grid.getGridEl().on(Roo.isIE ? "keydown" : "keypress", this.handleKeyDown, this);
        var view = this.grid.view;
        view.on("refresh", this.onViewChange, this);
        view.on("rowupdated", this.onRowUpdated, this);
        view.on("beforerowremoved", this.clearSelections, this);
        view.on("beforerowsinserted", this.clearSelections, this);
        if(this.grid.isEditor){
            this.grid.on("beforeedit", this.beforeEdit,  this);
        }
    },

	//private
    beforeEdit : function(e){
        this.select(e.row, e.column, false, true, e.record);
    },

	//private
    onRowUpdated : function(v, index, r){
        if(this.selection && this.selection.record == r){
            v.onCellSelect(index, this.selection.cell[1]);
        }
    },

	//private
    onViewChange : function(){
        this.clearSelections(true);
    },

	/**
	 * Returns the currently selected cell,.
	 * @return {Array} The selected cell (row, column) or null if none selected.
	 */
    getSelectedCell : function(){
        return this.selection ? this.selection.cell : null;
    },

    /**
     * Clears all selections.
     * @param {Boolean} true to prevent the gridview from being notified about the change.
     */
    clearSelections : function(preventNotify){
        var s = this.selection;
        if(s){
            if(preventNotify !== true){
                this.grid.view.onCellDeselect(s.cell[0], s.cell[1]);
            }
            this.selection = null;
            this.fireEvent("selectionchange", this, null);
        }
    },

    /**
     * Returns true if there is a selection.
     * @return {Boolean}
     */
    hasSelection : function(){
        return this.selection ? true : false;
    },

    /** @ignore */
    handleMouseDown : function(e, t){
        var v = this.grid.getView();
        if(this.isLocked()){
            return;
        };
        var row = v.findRowIndex(t);
        var cell = v.findCellIndex(t);
        if(row !== false && cell !== false){
            this.select(row, cell);
        }
    },

    /**
     * Selects a cell.
     * @param {Number} rowIndex
     * @param {Number} collIndex
     */
    select : function(rowIndex, colIndex, preventViewNotify, preventFocus, /*internal*/ r){
        if(this.fireEvent("beforecellselect", this, rowIndex, colIndex) !== false){
            this.clearSelections();
            r = r || this.grid.dataSource.getAt(rowIndex);
            this.selection = {
                record : r,
                cell : [rowIndex, colIndex]
            };
            if(!preventViewNotify){
                var v = this.grid.getView();
                v.onCellSelect(rowIndex, colIndex);
                if(preventFocus !== true){
                    v.focusCell(rowIndex, colIndex);
                }
            }
            this.fireEvent("cellselect", this, rowIndex, colIndex);
            this.fireEvent("selectionchange", this, this.selection);
        }
    },

	//private
    isSelectable : function(rowIndex, colIndex, cm){
        return !cm.isHidden(colIndex);
    },

    /** @ignore */
    handleKeyDown : function(e){
        //Roo.log('Cell Sel Model handleKeyDown');
        if(!e.isNavKeyPress()){
            return;
        }
        var g = this.grid, s = this.selection;
        if(!s){
            e.stopEvent();
            var cell = g.walkCells(0, 0, 1, this.isSelectable,  this);
            if(cell){
                this.select(cell[0], cell[1]);
            }
            return;
        }
        var sm = this;
        var walk = function(row, col, step){
            return g.walkCells(row, col, step, sm.isSelectable,  sm);
        };
        var k = e.getKey(), r = s.cell[0], c = s.cell[1];
        var newCell;

      

        switch(k){
            case e.TAB:
                // handled by onEditorKey
                if (g.isEditor && g.editing) {
                    return;
                }
                if(e.shiftKey) {
                    newCell = walk(r, c-1, -1);
                } else {
                    newCell = walk(r, c+1, 1);
                }
                break;
            
            case e.DOWN:
               newCell = walk(r+1, c, 1);
                break;
            
            case e.UP:
                newCell = walk(r-1, c, -1);
                break;
            
            case e.RIGHT:
                newCell = walk(r, c+1, 1);
                break;
            
            case e.LEFT:
                newCell = walk(r, c-1, -1);
                break;
            
            case e.ENTER:
                
                if(g.isEditor && !g.editing){
                   g.startEditing(r, c);
                   e.stopEvent();
                   return;
                }
                
                
             break;
        };
        if(newCell){
            this.select(newCell[0], newCell[1]);
            e.stopEvent();
            
        }
    },

    acceptsNav : function(row, col, cm){
        return !cm.isHidden(col) && cm.isCellEditable(col, row);
    },
    /**
     * Selects a cell.
     * @param {Number} field (not used) - as it's normally used as a listener
     * @param {Number} e - event - fake it by using
     *
     * var e = Roo.EventObjectImpl.prototype;
     * e.keyCode = e.TAB
     *
     * 
     */
    onEditorKey : function(field, e){
        
        var k = e.getKey(),
            newCell,
            g = this.grid,
            ed = g.activeEditor,
            forward = false;
        ///Roo.log('onEditorKey' + k);
        
        
        if (this.enter_is_tab && k == e.ENTER) {
            k = e.TAB;
        }
        
        if(k == e.TAB){
            if(e.shiftKey){
                newCell = g.walkCells(ed.row, ed.col-1, -1, this.acceptsNav, this);
            }else{
                newCell = g.walkCells(ed.row, ed.col+1, 1, this.acceptsNav, this);
                forward = true;
            }
            
            e.stopEvent();
            
        } else if(k == e.ENTER &&  !e.ctrlKey){
            ed.completeEdit();
            e.stopEvent();
            newCell = g.walkCells(ed.row, ed.col+1, 1, this.acceptsNav, this);
        
		} else if(k == e.ESC){
            ed.cancelEdit();
        }
		
        if (newCell) {
            var ecall = { cell : newCell, forward : forward };
            this.fireEvent('beforeeditnext', ecall );
            newCell = ecall.cell;
			forward = ecall.forward;
        }
		
        if(newCell){
            //Roo.log('next cell after edit');
            g.startEditing.defer(100, g, [newCell[0], newCell[1]]);
        } else if (forward) {
            // tabbed past last
            this.fireEvent.defer(100, this, ['tabend',this]);
        }
    }
});