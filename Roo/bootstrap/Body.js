/*
 * - LGPL
 *
 * page contgainer.
 * 
 */ 
Roo.bootstrap.Body = function(config){
    Roo.bootstrap.Body.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Body, Roo.bootstrap.Component,  {
      
	autoCreate : {
        cls: 'container'
    },
    onRender : function(ct, position){
        this.el = Roo.get(document.body);
        
        //this.el.addClass([this.fieldClass, this.cls]);
        
    }
    
    
 
   
});

 