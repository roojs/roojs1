/*
 * - LGPL
 *
 * column
 * 
 */ 
Roo.bootstrap.Column = function(config){
    Roo.bootstrap.Column.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Column, Roo.bootstrap.Component,  {
      
    colspan : 6,
    
	autoCreate : {
        cls: 'column'
    },
    
    getAutoCreate : function(){
        var cfg = Roo.apply({}, Roo.bootstrap.Column.superclass.getAutoCreate.call(this));
        cfg.cls += 'col-md-' + this.colspan;
        return cfg;
    }
   
});

 

 