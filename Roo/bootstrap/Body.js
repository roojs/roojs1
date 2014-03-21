/*
 * - LGPL
 *
 * page container.
 * 
 */ 
Roo.bootstrap.Body = function(config){
    Roo.bootstrap.Body.superclass.constructor.call(this, config);
    this.el = Roo.get(document.body);
};

Roo.extend(Roo.bootstrap.Body, Roo.bootstrap.Component,  {
      
	autoCreate : {
        cls: 'container'
    },
    onRender : function(ct, position){
        Roo.log('run');
        
        //this.el.addClass([this.fieldClass, this.cls]);
        
    }
    
    
 
   
});

 