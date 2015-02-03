

dashboard3.slidetest = {
    
    
    slide: function(el, dir) {
        
        // first tabcontent - needs overflow hidden..
        
        var tc = el.findParent('.tab-content', 3, true);
        tc.setStyle('overflow', 'hidden');
        
        var box = el.getBox();
        el.setStyle({
            position: 'absolute',
            left : 0,
            top : 0,
            width : box.width + 'px',
            height: box.height+ 'px',
            
        });
        
        
    }
    
    
}
