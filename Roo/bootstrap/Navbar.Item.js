/*
 * - LGPL
 *
 * row
 * 
 */ 
Roo.bootstrap.Navbar.Item = function(config){
    Roo.bootstrap.Navbar.Item.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Navbar.Item, Roo.bootstrap.Component,  {
      
	href : false,
    html : false,
    
    autoCreate : {
        cls: 'nav navbar-nav',
        tag : 'li',
        cn : [
            {
                tag : 'a',
                href : '#',
                html : 'Link'
            }
        ]
    },
    
    getAutoCreate : function(){
        
        var cfg = Roo.apply({}, Roo.bootstrap.Navbar.Item.superclass.getAutoCreate.call(this));
        cfg.cn[0].href = this.href || cfg.cn[0].href ;
        cfg.cn[0].html = this.html || cfg.cn[0].html ;
        return cfg;
    }
   
});

 

 