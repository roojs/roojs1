/*
 * - LGPL
 *
 * row
 * 
 */ 
Roo.bootstrap.MenuItem = function(config){
    Roo.bootstrap.MenuItem.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.MenuItem, Roo.bootstrap.Component,  {
      
	href : false,
    html : false,
    
    
    
    getAutoCreate : function(){
        var cfg= {
            // cls: '',
             tag : 'li',
             cn : [
             {
                 tag : 'a',
                 href : '#',
                 html : 'Link'
             }
             ]
         };
	    
        cfg.cn[0].href = this.href || cfg.cn[0].href ;
        cfg.cn[0].html = this.html || cfg.cn[0].html ;
        return cfg;
    }
   
});

 

 