

dashboard3.slidetest = {
    
    
    slide: function(el, dir) {
        
        // first tabcontent - needs overflow hidden..
        
        var tc = el.findParent('.tab-content', 3, true);
        tc.setStyle('overflow', 'hidden');
        var obox = tc.getBox(true,true);
        
        
        var box = el.getBox();
        Roo.log([obox,box]);
        el.setStyle({
            position: 'absolute',
            left : obox.x+ 'px',
            top : 0,
            width : box.width + 'px',
            height: box.height+ 'px',
            
        });
        // need to fix the left/right....
        var panes = tc.select('.tab-pane',true);
        var ix = panes.indexOf(el);
        
        // dir = 1...
        
        var nel = panes.item(ix+1);
        var nbox = nel.getBox();
        Roo.log([nbox]);
        nel.setStyle({
            position: 'absolute',
            left : (box.width + obox.x ) + 'px',
            top : 0,
            width : box.width + 'px',
            height: nbox.height+ 'px',
        });
        nel.addClass('active');
        
        
    }
    
    
}
