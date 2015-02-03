

dashboard3.slidetest = {
    
    
    slide: function(el, dir) {
        
        // first tabcontent - needs overflow hidden..
        
        var tc = el.findParent('.tab-content', 3, true);
        tc.setStyle('overflow', 'hidden');
        var obox = tc.getBox();
        
        
        var box = el.getBox();
        el.setStyle({
            position: 'absolute',
            left : obox+ 'px',
            top : 0,
            width : box.width + 'px',
            height: box.height+ 'px',
            
        });
        // need to fix the left/right....
        
        
    }
    
    
}
