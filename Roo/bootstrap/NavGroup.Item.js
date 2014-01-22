/*
 * - LGPL
 *
 * row
 * 
 */ 
Roo.bootstrap.NavGroup.Item = function(config){
    Roo.bootstrap.NavGroup.Item.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.NavGroup.Item, Roo.bootstrap.Component,  {
    
    href : false,
    html : false,
    badge : '',
    
    autoCreate : {
        tag : 'li'
    },
    
    getAutoCreate : function(){
        
        var cfg = Roo.apply({}, Roo.bootstrap.NavGroup.Item.superclass.getAutoCreate.call(this));
	 
	
        return cfg;
    }
   
});

 

 