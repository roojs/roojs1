/*
 * - LGPL
 *
 * row
 * 
 */ 
Roo.bootstrap.Button = function(config){
    Roo.bootstrap.Button.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Button, Roo.bootstrap.Component,  {
      
    html: false,
    active: false,
    
    autoCreate : {
        cls: 'btn btn-default',
        tag : 'button',
        html: 'hello'
    },
    
    getAutoCreate : function(){
        
        var cfg = Roo.apply({}, Roo.bootstrap.Button.superclass.getAutoCreate.call(this));
        
        cfg.html = this.html || cfg.html ;
        
        if (this.active) {
            cfg.cls += ' active';
        }
        
        return cfg;
    }
   
});

 