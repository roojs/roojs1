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
 
// private
// This is a support class used internally by the Grid components
Roo.grid.GridDragZone = function(grid, config){
    this.view = grid.getView();
    Roo.grid.GridDragZone.superclass.constructor.call(this, this.view.mainBody.dom, config);
    if(this.view.lockedBody){
        this.setHandleElId(Roo.id(this.view.mainBody.dom));
        this.setOuterHandleElId(Roo.id(this.view.lockedBody.dom));
    }
    this.scroll = false;
    this.grid = grid;
    this.ddel = document.createElement('div');
    this.ddel.className = 'x-grid-dd-wrap';
};

Roo.extend(Roo.grid.GridDragZone, Roo.dd.DragZone, {
    ddGroup : "GridDD",

    getDragData : function(e){
        var t = Roo.lib.Event.getTarget(e);
        var rowIndex = this.view.findRowIndex(t);
        var sm = this.grid.selModel;
            
        //Roo.log(rowIndex);
        
        if (sm.getSelectedCell) {
            // cell selection..
            if (!sm.getSelectedCell()) {
                return false;
            }
            if (rowIndex != sm.getSelectedCell()[0]) {
                return false;
            }
        
        }
        
        var sels = sm.getSelections ? sm.getSelections() : (
                    sm.getSelectedCell() ? [ this.grid.ds.getAt(sm.getSelectedCell()[0]) ] : []);
        
        // before it used to all dragging of unseleted... - now we dont do that.
        if(sels || sels.length){
            
            // if editorgrid.. 
            
            
            //Roo.log([ sm.getSelectedCell() ? sm.getSelectedCell()[0] : 'NO' , rowIndex ]);
               
            //if(!sm.isSelected(rowIndex) || e.hasModifier()){
              //  
            //}
            if (e.hasModifier()){
                sm.handleMouseDown(e, t); // non modifier buttons are handled by row select.
            }
            
            Roo.log("getDragData");
            
            return {
                grid: this.grid,
                ddel: this.ddel,
                rowIndex: rowIndex,
                selections:sm.getSelections ? sm.getSelections() : (
                    sm.getSelectedCell() ? [ this.grid.ds.getAt(sm.getSelectedCell()[0]) ] : []
                )
            };
        }
        return false;
    },
    
    onBeforeDrag : function(data, e)
    {
        // if we dont have any data to drag - then cancel.
        return data !== false;
    },
    onInitDrag : function(e){
        var data = this.dragData;
        this.ddel.innerHTML = this.grid.getDragDropText();
        this.proxy.update(this.ddel);
        // fire start drag?
    },

    afterRepair : function(){
        this.dragging = false;
    },

    getRepairXY : function(e, data){
        return false;
    },

    onEndDrag : function(data, e){
        // fire end drag?
    },

    onValidDrop : function(dd, e, id){
        // fire drag drop?
        this.hideProxy();
    },

    beforeInvalidDrop : function(e, id){

    }
});