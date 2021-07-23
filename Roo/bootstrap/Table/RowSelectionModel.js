
/**
 *  @deprecated
 *
 *  
 */

Roo.bootstrap.Table.RowSelectionModel = function(config){
    Roo.apply(this, config);
    this.selections = new Roo.util.MixedCollection(false, function(o){
        return o.id;
    });

    this.last = false;
    this.lastActive = false;

    this.addEvents({
        /**
	     * @event selectionchange
	     * Fires when the selection changes
	     * @param {SelectionModel} this
	     */
	    "selectionchange" : true,
        /**
	     * @event afterselectionchange
	     * Fires after the selection changes (eg. by key press or clicking)
	     * @param {SelectionModel} this
	     */
	    "afterselectionchange" : true,
        /**
	     * @event beforerowselect
	     * Fires when a row is selected being selected, return false to cancel.
	     * @param {SelectionModel} this
	     * @param {Number} rowIndex The selected index
	     * @param {Boolean} keepExisting False if other selections will be cleared
	     */
	    "beforerowselect" : true,
        /**
	     * @event rowselect
	     * Fires when a row is selected.
	     * @param {SelectionModel} this
	     * @param {Number} rowIndex The selected index
	     * @param {Roo.data.Record} r The record
	     */
	    "rowselect" : true,
        /**
	     * @event rowdeselect
	     * Fires when a row is deselected.
	     * @param {SelectionModel} this
	     * @param {Number} rowIndex The selected index
	     */
        "rowdeselect" : true
    });
    Roo.bootstrap.Table.RowSelectionModel.superclass.constructor.call(this);
    this.locked = false;
 };

Roo.extend(Roo.bootstrap.Table.RowSelectionModel, Roo.bootstrap.Table.AbstractSelectionModel,  {
    /**
     * @cfg {Boolean} singleSelect
     * True to allow selection of only one row at a time (defaults to false)
     */
    singleSelect : false,

    // private
    initEvents : function()
    {

        //if(!this.grid.enableDragDrop && !this.grid.enableDrag){
        //    this.growclickrid.on("mousedown", this.handleMouseDown, this);
        //}else{ // allow click to work like normal
         //   this.grid.on("rowclick", this.handleDragableRowClick, this);
        //}
        //this.grid.on("rowdblclick", this.handleMouseDBClick, this);
        this.grid.on("rowclick", this.handleMouseDown, this);
        
        this.rowNav = new Roo.KeyNav(this.grid.getGridEl(), {
            "up" : function(e){
                if(!e.shiftKey){
                    this.selectPrevious(e.shiftKey);
                }else if(this.last !== false && this.lastActive !== false){
                    var last = this.last;
                    this.selectRange(this.last,  this.lastActive-1);
                    this.grid.getView().focusRow(this.lastActive);
                    if(last !== false){
                        this.last = last;
                    }
                }else{
                    this.selectFirstRow();
                }
                this.fireEvent("afterselectionchange", this);
            },
            "down" : function(e){
                if(!e.shiftKey){
                    this.selectNext(e.shiftKey);
                }else if(this.last !== false && this.lastActive !== false){
                    var last = this.last;
                    this.selectRange(this.last,  this.lastActive+1);
                    this.grid.getView().focusRow(this.lastActive);
                    if(last !== false){
                        this.last = last;
                    }
                }else{
                    this.selectFirstRow();
                }
                this.fireEvent("afterselectionchange", this);
            },
            scope: this
        });
        this.grid.store.on('load', function(){
            this.selections.clear();
        },this);
        /*
        var view = this.grid.view;
        view.on("refresh", this.onRefresh, this);
        view.on("rowupdated", this.onRowUpdated, this);
        view.on("rowremoved", this.onRemove, this);
        */
    },

    // private
    onRefresh : function()
    {
        var ds = this.grid.store, i, v = this.grid.view;
        var s = this.selections;
        s.each(function(r){
            if((i = ds.indexOfId(r.id)) != -1){
                v.onRowSelect(i);
            }else{
                s.remove(r);
            }
        });
    },

    // private
    onRemove : function(v, index, r){
        this.selections.remove(r);
    },

    // private
    onRowUpdated : function(v, index, r){
        if(this.isSelected(r)){
            v.onRowSelect(index);
        }
    },

    /**
     * Select records.
     * @param {Array} records The records to select
     * @param {Boolean} keepExisting (optional) True to keep existing selections
     */
    selectRecords : function(records, keepExisting)
    {
        if(!keepExisting){
            this.clearSelections();
        }
	    var ds = this.grid.store;
        for(var i = 0, len = records.length; i < len; i++){
            this.selectRow(ds.indexOf(records[i]), true);
        }
    },

    /**
     * Gets the number of selected rows.
     * @return {Number}
     */
    getCount : function(){
        return this.selections.length;
    },

    /**
     * Selects the first row in the grid.
     */
    selectFirstRow : function(){
        this.selectRow(0);
    },

    /**
     * Select the last row.
     * @param {Boolean} keepExisting (optional) True to keep existing selections
     */
    selectLastRow : function(keepExisting){
        //this.selectRow(this.grid.dataSource.getCount() - 1, keepExisting);
        this.selectRow(this.grid.store.getCount() - 1, keepExisting);
    },

    /**
     * Selects the row immediately following the last selected row.
     * @param {Boolean} keepExisting (optional) True to keep existing selections
     */
    selectNext : function(keepExisting)
    {
	    if(this.last !== false && (this.last+1) < this.grid.store.getCount()){
            this.selectRow(this.last+1, keepExisting);
            this.grid.getView().focusRow(this.last);
        }
    },

    /**
     * Selects the row that precedes the last selected row.
     * @param {Boolean} keepExisting (optional) True to keep existing selections
     */
    selectPrevious : function(keepExisting){
        if(this.last){
            this.selectRow(this.last-1, keepExisting);
            this.grid.getView().focusRow(this.last);
        }
    },

    /**
     * Returns the selected records
     * @return {Array} Array of selected records
     */
    getSelections : function(){
        return [].concat(this.selections.items);
    },

    /**
     * Returns the first selected record.
     * @return {Record}
     */
    getSelected : function(){
        return this.selections.itemAt(0);
    },


    /**
     * Clears all selections.
     */
    clearSelections : function(fast)
    {
        if(this.locked) {
            return;
        }
        if(fast !== true){
	        var ds = this.grid.store;
            var s = this.selections;
            s.each(function(r){
                this.deselectRow(ds.indexOfId(r.id));
            }, this);
            s.clear();
        }else{
            this.selections.clear();
        }
        this.last = false;
    },


    /**
     * Selects all rows.
     */
    selectAll : function(){
        if(this.locked) {
            return;
        }
        this.selections.clear();
        for(var i = 0, len = this.grid.store.getCount(); i < len; i++){
            this.selectRow(i, true);
        }
    },

    /**
     * Returns True if there is a selection.
     * @return {Boolean}
     */
    hasSelection : function(){
        return this.selections.length > 0;
    },

    /**
     * Returns True if the specified row is selected.
     * @param {Number/Record} record The record or index of the record to check
     * @return {Boolean}
     */
    isSelected : function(index){
	    var r = typeof index == "number" ? this.grid.store.getAt(index) : index;
        return (r && this.selections.key(r.id) ? true : false);
    },

    /**
     * Returns True if the specified record id is selected.
     * @param {String} id The id of record to check
     * @return {Boolean}
     */
    isIdSelected : function(id){
        return (this.selections.key(id) ? true : false);
    },


    // private
    handleMouseDBClick : function(e, t){
	
    },
    // private
    handleMouseDown : function(e, t)
    {
	    var rowIndex = this.grid.headerShow  ? t.dom.rowIndex - 1 : t.dom.rowIndex ; // first row is header???
        if(this.isLocked() || rowIndex < 0 ){
            return;
        };
        if(e.shiftKey && this.last !== false){
            var last = this.last;
            this.selectRange(last, rowIndex, e.ctrlKey);
            this.last = last; // reset the last
            t.focus();
    
        }else{
            var isSelected = this.isSelected(rowIndex);
            //Roo.log("select row:" + rowIndex);
            if(isSelected){
                this.deselectRow(rowIndex);
            } else {
		        this.selectRow(rowIndex, true);
            }
    
            /*
                if(e.button !== 0 && isSelected){
                alert('rowIndex 2: ' + rowIndex);
                    view.focusRow(rowIndex);
                }else if(e.ctrlKey && isSelected){
                    this.deselectRow(rowIndex);
                }else if(!isSelected){
                    this.selectRow(rowIndex, e.button === 0 && (e.ctrlKey || e.shiftKey));
                    view.focusRow(rowIndex);
                }
            */
        }
        this.fireEvent("afterselectionchange", this);
    },
    // private
    handleDragableRowClick :  function(grid, rowIndex, e) 
    {
        if(e.button === 0 && !e.shiftKey && !e.ctrlKey) {
            this.selectRow(rowIndex, false);
            grid.view.focusRow(rowIndex);
             this.fireEvent("afterselectionchange", this);
        }
    },
    
    /**
     * Selects multiple rows.
     * @param {Array} rows Array of the indexes of the row to select
     * @param {Boolean} keepExisting (optional) True to keep existing selections
     */
    selectRows : function(rows, keepExisting){
        if(!keepExisting){
            this.clearSelections();
        }
        for(var i = 0, len = rows.length; i < len; i++){
            this.selectRow(rows[i], true);
        }
    },

    /**
     * Selects a range of rows. All rows in between startRow and endRow are also selected.
     * @param {Number} startRow The index of the first row in the range
     * @param {Number} endRow The index of the last row in the range
     * @param {Boolean} keepExisting (optional) True to retain existing selections
     */
    selectRange : function(startRow, endRow, keepExisting){
        if(this.locked) {
            return;
        }
        if(!keepExisting){
            this.clearSelections();
        }
        if(startRow <= endRow){
            for(var i = startRow; i <= endRow; i++){
                this.selectRow(i, true);
            }
        }else{
            for(var i = startRow; i >= endRow; i--){
                this.selectRow(i, true);
            }
        }
    },

    /**
     * Deselects a range of rows. All rows in between startRow and endRow are also deselected.
     * @param {Number} startRow The index of the first row in the range
     * @param {Number} endRow The index of the last row in the range
     */
    deselectRange : function(startRow, endRow, preventViewNotify){
        if(this.locked) {
            return;
        }
        for(var i = startRow; i <= endRow; i++){
            this.deselectRow(i, preventViewNotify);
        }
    },

    /**
     * Selects a row.
     * @param {Number} row The index of the row to select
     * @param {Boolean} keepExisting (optional) True to keep existing selections
     */
    selectRow : function(index, keepExisting, preventViewNotify)
    {
	    if(this.locked || (index < 0 || index > this.grid.store.getCount())) {
            return;
        }
        if(this.fireEvent("beforerowselect", this, index, keepExisting) !== false){
            if(!keepExisting || this.singleSelect){
                this.clearSelections();
            }
  	    
            var r = this.grid.store.getAt(index);
            //console.log('selectRow - record id :' + r.id);
            
            this.selections.add(r);
            this.last = this.lastActive = index;
            if(!preventViewNotify){
                var proxy = new Roo.Element(
                                this.grid.getRowDom(index)
                );
                proxy.addClass('bg-info info');
            }
            this.fireEvent("rowselect", this, index, r);
            this.fireEvent("selectionchange", this);
        }
    },

    /**
     * Deselects a row.
     * @param {Number} row The index of the row to deselect
     */
    deselectRow : function(index, preventViewNotify)
    {
        if(this.locked) {
            return;
        }
        if(this.last == index){
            this.last = false;
        }
        if(this.lastActive == index){
            this.lastActive = false;
        }
	
        var r = this.grid.store.getAt(index);
        if (!r) {
            return;
        }
        
        this.selections.remove(r);
        //.console.log('deselectRow - record id :' + r.id);
        if(!preventViewNotify){
   	
    	    var proxy = new Roo.Element(
                this.grid.getRowDom(index)
            );
            proxy.removeClass('bg-info info');
        }
        this.fireEvent("rowdeselect", this, index);
        this.fireEvent("selectionchange", this);
    },

    // private
    restoreLast : function(){
        if(this._last){
            this.last = this._last;
        }
    },

    // private
    acceptsNav : function(row, col, cm){
        return !cm.isHidden(col) && cm.isCellEditable(col, row);
    },

    // private
    onEditorKey : function(field, e){
        var k = e.getKey(), newCell, g = this.grid, ed = g.activeEditor;
        if(k == e.TAB){
            e.stopEvent();
            ed.completeEdit();
            if(e.shiftKey){
                newCell = g.walkCells(ed.row, ed.col-1, -1, this.acceptsNav, this);
            }else{
                newCell = g.walkCells(ed.row, ed.col+1, 1, this.acceptsNav, this);
            }
        }else if(k == e.ENTER && !e.ctrlKey){
            e.stopEvent();
            ed.completeEdit();
            if(e.shiftKey){
                newCell = g.walkCells(ed.row-1, ed.col, -1, this.acceptsNav, this);
            }else{
                newCell = g.walkCells(ed.row+1, ed.col, 1, this.acceptsNav, this);
            }
        }else if(k == e.ESC){
            ed.cancelEdit();
        }
        if(newCell){
            g.startEditing(newCell[0], newCell[1]);
        }
    }
});
