

dashboard3.slidetest = function (el,dir)
{
    this.el = el;
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
        var panes = this.pel.select('.tab-pane',true);
        var ix = panes.indexOf(this.el);
        
        // dir = 1...
        
        this.nel = panes.item(ix+1);
        var nbox = this.nel.getBox();
        
        this.nel.setStyle({
            position: 'absolute',
            left : (box.width + obox.x + 50 ) + 'px',
            top : 0,
            width : box.width + 'px',
            height: nbox.height+ 'px',
        });
        this.nel.addClass('active');
        
        // now we need to animate the both boxes moving from box.width + obox.x + 50 --> obox.x
        var _t = this;
        this.nel.animate({
            left : {
                from : (box.width + obox.x + 50 ),
                to : obox.x 
            }
        }, 1000,function() { _t.completeSlide(); }, 'easeOut', 'run');
        
        this.el.animate({
            left : {
                from : obox.x , 
                to : -1 * (box.width + 50 )
            }
        }, 1000, false, 'easeOut', 'run');
        
        
        
    },
    completeSlide : function()
    {
          return;
          this.pel.setStyle('overflow', '');
          this.nel.setStyle({
            position: 'relative',
            left : '',
            top : '',
            width :'',
            height: ''
          });
          this.el.setStyle({
            position: 'relative',
            left : '',
            top : '',
            width :'',
            height: ''
          });  
    
        
    }
    
    
});
