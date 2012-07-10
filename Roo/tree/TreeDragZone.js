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
   
    onBeforeDrag : function(data, e){
        var n = data.node;
        return n && n.draggable && !n.disabled;
    },
     
    
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
    },
    autoScroll: function(x, y, h, w) {
        Roo.log("drop zone - autoscroll called");
        
        Roo.log( [ x, y, h , w, this.scroll ] );
        Roo.log(this.el.getBox());
         Roo.log(this.el.getScroll());
        if (this.scroll) {
            
            var box = this.el.getBox();
            var scroll = this.el.getScroll();
            
             // The client height
            var clientH = box.height;

            // The client width
            var clientW = box.width;

            // The amt scrolled down
            var st = scroll.top;

            // The amt scrolled right
            var sl = scroll.left;

            // Location of the bottom of the element
            var bot = h + y;

            // Location of the right of the element
            var right = w + x;

            // The distance from the cursor to the bottom of the visible area,
            // adjusted so that we don't scroll if the cursor is beyond the
            // element drag constraints
            var toBot = (clientH + st - y - this.deltaY);

            // The distance from the cursor to the right of the visible area
            var toRight = (clientW + sl - x - this.deltaX);


            // How close to the edge the cursor must be before we scroll
            // var thresh = (document.all) ? 100 : 40;
            var thresh = 40;

            // How many pixels to scroll per autoscroll op.  This helps to reduce
            // clunky scrolling. IE is more sensitive about this ... it needs this
            // value to be higher.
            var scrAmt = 80; //(document.all) ? 80 : 30;

            // Scroll down if we are near the bottom of the visible page and the
            // obj extends below the crease
            if ( bot > clientH && toBot < thresh ) {
                this.el.scrollTo('d', sl, st + scrAmt);
            }

            // Scroll up if the window is scrolled down and the top of the object
            // goes above the top border
            if ( y < st && st > 0 && y - st < thresh ) {
                this.el.scrollTo(sl, st - scrAmt);
            }

            // Scroll right if the obj is beyond the right border and the cursor is
            // near the border.
            if ( right > clientW && toRight < thresh ) {
                this.el.scrollTo(sl + scrAmt, st);
            }

            // Scroll left if the window has been scrolled to the right and the obj
            // extends past the left border
            if ( x < sl && sl > 0 && x - sl < thresh ) {
                this.el.scrollTo(sl - scrAmt, st);
            }
        }
    }
});
}