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
 

if(Roo.dd.DragZone){
Roo.tree.TreeDragZone = function(tree, config){
    Roo.tree.TreeDragZone.superclass.constructor.call(this, tree.getTreeEl(), config);
    this.tree = tree;
};

Roo.extend(Roo.tree.TreeDragZone, Roo.dd.DragZone, {
    ddGroup : "TreeDD",
    scroller : false, // 't' or 'b'
    
    onBeforeDrag : function(data, e){
        var n = data.node;
        return n && n.draggable && !n.disabled;
    },
    
    onDragOut : function(e, id) 
    {
        var ret = Roo.tree.TreeDragZone.superclass.constructor.prototype.onDragOut.call(this, e, id);
        
        // if it's gone off top and bottom, start the scroller
        
        this.scrollDir = 't';
        this.scroller = window.se
        Roo.log('ondragout');
        Roo.log(this.el.dom);
        
        return ret;
    },
    onDragEnter : function(e, id) 
    {
        var ret = Roo.tree.TreeDragZone.superclass.constructor.prototype.onDragEnter.call(this, e, id);
        
        if (this.scroller !== false) {
            window.clearInterval(this.scroller);
            this.scroller =false;
            
        }
        
        Roo.log('ondrageneter');
        
        
        Roo.log(this);
        
        return ret;
    },
    
    scrollAct: function()
    {
        if (this.scrollDir === false) {
            return;
        }
        this.el.scroll(this.scrollDir, 5, true);
        
        
    }
    
    onInitDrag : function(e){
        var data = this.dragData;
        this.tree.getSelectionModel().select(data.node);
        this.proxy.update("");
        data.node.ui.appendDDGhost(this.proxy.ghost.dom);
        this.tree.fireEvent("startdrag", this.tree, data.node, e);
    },
    
    getRepairXY : function(e, data){
        return data.node.ui.getDDRepairXY();
    },
    
    onEndDrag : function(data, e){
        this.tree.fireEvent("enddrag", this.tree, data.node, e);
    },
    
    onValidDrop : function(dd, e, id){
        this.tree.fireEvent("dragdrop", this.tree, this.dragData.node, dd, e);
        this.hideProxy();
    },
    
    beforeInvalidDrop : function(e, id){
        // this scrolls the original position back into view
        var sm = this.tree.getSelectionModel();
        sm.clearSelections();
        sm.select(this.dragData.node);
    }
});
}