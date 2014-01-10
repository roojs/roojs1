/*
 * - LGPL
 *
 * row
 * 
 */ 
Roo.bootstrap.Navbar = function(config){
    Roo.bootstrap.Navbar.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Navbar, Roo.bootstrap.Component,  {
      
	autoCreate : {
        cls: 'navbar navbar-default',
        tag : 'nav',
        role : 'navigation',
        cn : [
            {
                cls: 'nav navbar-nav',
                tag : 'ul'
            }
        
        ]
    },
    getChildContainer : function() {
        return this.el.select('ul', true).first();
    },
   
});

 

 