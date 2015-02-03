

dashboard3.slidetest = function (tba,tbb, dir)
{
    this.tba = tba;
    this.tbb = tbb;
    this.el = tba.el;
    this.nel = tbb.el;
    this.dir = dir;
    this.slide();
}
Roo.apply(dashboard3.slidetest.prototype, {
    el : false,
    dir : 1,
    nel : false, // next el.
    pel : false, // parent el.
    
    
    slide: function() {
        
        // first tabcontent - needs overflow hidden..
        
        this.pel = this.el.findParent('.tab-content', 3, true);
        this.pel.setStyle('overflow', 'hidden');
        var obox = this.pel.getBox(true,true);
        
        
        var box = this.el.getBox();
        Roo.log([obox,box]);
        this.el.setStyle({
            position: 'absolute',
            left : obox.x+ 'px',
            top : 0,
            width : box.width + 'px',
            height: box.height+ 'px',
            
        });
        // need to fix the left/right....
        
        var nbox = this.nel.getBox();
        // if dir = 1 - then put on right..
        
        var start = this.dir > 0 ? (box.width + obox.x + 50 ) : (-1 * (box.width + 50)) + obox.x;
        
        var end = this.dir > 0 ? -1 * (box.width + 50 ) : (box.width + obox.x + 50 );
        
        this.nel.setStyle({
            position: 'absolute',
            left : start + 'px',
            top : 0,
            width : box.width + 'px',
            height: nbox.height+ 'px',
        });
        this.nel.addClass('active');
        
        // now we need to animate the both boxes moving from box.width + obox.x + 50 --> obox.x
        var _t = this;
        this.nel.animate({
            left : {
                from : start,
                to : obox.x 
            }
        }, 0.5,function() { _t.completeSlide(); }, 'easeOut', 'run');
        
        this.el.animate({
            left : {
                from : obox.x , 
                to : end 
            }
        }, 0.5, false, 'easeOut', 'run');
        
        
        
    },
    completeSlide : function()
    {
          
          this.el.removeClass('active');
          
          this.pel.setStyle('overflow', '');
          this.nel.setStyle({
            position: '',
            left : '',
            top : '',
            width :'',
            height: ''
          });
          
          
          
          this.el.setStyle({
            position: '',
            left : '',
            top : '',
            width :'',
            height: ''
          });  
            
        
    }
    
    
});
