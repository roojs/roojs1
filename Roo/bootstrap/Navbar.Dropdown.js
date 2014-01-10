/*
 * - LGPL
 *
 * row
 * 
 */ 
Roo.bootstrap.Navbar.Dropdown = function(config){
    Roo.bootstrap.Navbar.Dropdown.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Navbar.Dropdown, Roo.bootstrap.Component,  {
    
    html : false,
    align : 'left',
    
    autoCreate : {
        cls: 'dropdown',
        tag : 'li',
        cn : [
            {
                tag : 'a',
                href : '#',
                cls : 'dropdown-toggle',
                'data-toggle' : 'dropdown',
                cn : [
                    'Link',
                    {
                        tag: 'strong',
                        cls : 'caret'
                    },
                    
                ]
                
            },
            {
                tag : 'ul',
                cls : 'dropdown-menu',
                
            }
        ]
    },
    
    getChildContainer : function() {
        return this.el.select('ul', true).first();
    },
    
    getAutoCreate : function(){
        var cfg = Roo.bootstrap.Navbar.Dropdown.superclass.getAutoCreate.call(this);
          
        cfg.cn[0].cn[0] = this.html || cfg.cn[0].cn[0];
        return cfg;
    },
    initEvents : function() {
        Roo.log("ADD event");
        Roo.log(this.el.dom);
        this.el.on('click', this.toggle, this);
        
    },
    toggle  : function(e)
    {
        Roo.log(e.getTarget());
        Roo.log(this.el.dom);
        if (Roo.get(e.getTarget()).findParent('ul.dropdown-menu')) {
            return;
        }
        var isActive = this.el.hasClass('open');
        // if disabled.. ingore
        this.clearMenus(e);
        //if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
         // if mobile we use a backdrop because click events don't delegate
        // $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
        // }
 
       //var relatedTarget = { relatedTarget: this }
       //$parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))
 
       //if (e.isDefaultPrevented()) return;
        
       this.el.toggleClass('open');
       
       //  .trigger('shown.bs.dropdown', relatedTarget)
 
       this.el.focus();
       Roo.log(e);
       e.preventDefault(); 
        
        
    },
    clearMenus : function()
    {
        //$(backdrop).remove()
        this.el.select('a.dropdown-toggle',true).each(function(aa) {
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

 

 