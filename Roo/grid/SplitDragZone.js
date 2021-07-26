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
 * @extends Roo.dd.DDProxy
 * @class Roo.grid.SplitDragZone
 * Support for Column Header resizing
 * @constructor
 * @param {Object} config
 */
// private
// This is a support class used internally by the Grid components
Roo.grid.SplitDragZone = function(grid, hd, hd2){
    this.grid = grid;
    this.view = grid.getView();
    this.proxy = this.view.resizeProxy;
    Roo.grid.SplitDragZone.superclass.constructor.call(
        this,
        hd, // ID
        "gridSplitters" + this.grid.getGridEl().id, // SGROUP
        {  // CONFIG
            dragElId : Roo.id(this.proxy.dom),
            resizeFrame:false
        }
    );
    
    this.setHandleElId(Roo.id(hd));
    if (hd2 !== false) {
        this.setOuterHandleElId(Roo.id(hd2));
    }
    
    this.scroll = false;
};
Roo.extend(Roo.grid.SplitDragZone, Roo.dd.DDProxy, {
    fly: Roo.Element.fly,

    b4StartDrag : function(x, y){
        this.view.headersDisabled = true;
        this.proxy.setHeight(this.view.mainWrap.getHeight());
        var w = this.cm.getColumnWidth(this.cellIndex);
        var minw = Math.max(w-this.grid.minColumnWidth, 0);
        this.resetConstraints();
        this.setXConstraint(minw, 1000);
        this.setYConstraint(0, 0);
        this.minX = x - minw;
        this.maxX = x + 1000;
        this.startPos = x;
        Roo.dd.DDProxy.prototype.b4StartDrag.call(this, x, y);
    },


    handleMouseDown : function(e){
        ev = Roo.EventObject.setEvent(e);
        var t = this.fly(ev.getTarget());
        if(t.hasClass("x-grid-split")){
            this.cellIndex = this.view.getCellIndex(t.dom);
            this.split = t.dom;
            this.cm = this.grid.colModel;
            if(this.cm.isResizable(this.cellIndex) && !this.cm.isFixed(this.cellIndex)){
                Roo.grid.SplitDragZone.superclass.handleMouseDown.apply(this, arguments);
            }
        }
    },

    endDrag : function(e){
        this.view.headersDisabled = false;
        var endX = Math.max(this.minX, Roo.lib.Event.getPageX(e));
        var diff = endX - this.startPos;
        this.view.onColumnSplitterMoved(this.cellIndex, this.cm.getColumnWidth(this.cellIndex)+diff);
    },

    autoOffset : function(){
        this.setDelta(0,0);
    }
});