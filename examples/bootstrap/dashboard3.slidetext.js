

dashboard3.slidetest = {
    
    
    slide: function(el, dir) {
        
        // first tabcontent - needs overflow hidden..
        
        var tc = el.findParent('.tab-content', 3, true);
        tc.setStyle('overflow', 'hidden');
        
        var bx = el.getBox();
        el.setStyle({
            position: 'absolute',
            left : bx.x + 'px',
            top : bx.y + 'px'
        });
        
        
    }
    
    
}
