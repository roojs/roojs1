/*
 * - LGPL
 *
 * row
 * 
 */ 
Roo.bootstrap.Menu = function(config){
    Roo.bootstrap.Menu.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Menu, Roo.bootstrap.Component,  {
    
    html : false,
    align : '',
    triggerEl : false,
    
    
    getChildContainer : function() {
        return this.el;  
    },
    
    getAutoCreate : function(){
	 
	//if (['right'].indexOf(this.align)!==-1) {
	//    cfg.cn[1].cls += ' pull-right'
	//}
	
        return {
                tag : 'ul',
                cls : 'dropdown-menu',
                
            };
    },
    initEvents : function() {
       // Roo.log("ADD event");
       // Roo.log(this.triggerEl.dom);
        this.triggerEl.on('click', this.toggle, this);
        this.triggerEl.addClass('dropdown-toggle');
        
    },
    toggle  : function(e)
    {
        //Roo.log(e.getTarget());
       // Roo.log(this.triggerEl.dom);
        if (Roo.get(e.getTarget()).findParent('.dropdown-menu')) {
            return;
        }
        var isActive = this.triggerEl.hasClass('open');
        // if disabled.. ingore
        this.clearMenus(e);
        //if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
         // if mobile we use a backdrop because click events don't delegate
        // $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
        // }
 
       //var relatedTarget = { relatedTarget: this }
       //$parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))
 
       //if (e.isDefaultPrevented()) return;
        
       this.triggerEl[isActive ? 'removeClass' : 'addClass']('open');
       
       //  .trigger('shown.bs.dropdown', relatedTarget)
 
       this.triggerEl.focus();
       Roo.log(e);
       e.preventDefault(); 
        
        
    },
    clearMenus : function()
    {
        //$(backdrop).remove()
        Roo.select('.dropdown-toggle',true).each(function(aa) {
            if (!aa.hasClass('open')) {
                return;
            }
            // triger close...
            aa.removeClass('open');
          //var parent = getParent($(this))
          //var relatedTarget = { relatedTarget: this }
          
           //$parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))
          //if (e.isDefaultPrevented()) return
           //$parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
        })
    }
    
   
});

 

 