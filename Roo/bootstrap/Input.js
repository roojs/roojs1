/*
 * - LGPL
 *
 * row
 * 
 */ 
Roo.bootstrap.Input = function(config){
    Roo.bootstrap.Input.superclass.constructor.call(this, config);
   
};

Roo.extend(Roo.bootstrap.Input, Roo.bootstrap.Component,  {
    
    fieldLabel : 'test',
    inputType : 'text',
    
    getAutoCreate : function(){
        
        return {
            cls: 'input-group',
            cn : [
                {
                    tag: 'span',
                    cls : 'input-group-addon',
                    html : this.fieldLabel
                    
                },
                {
                    tag: 'input',
                    type : this.inputType,
                    cls : 'form-control'
                }
        }
    }
    
});

 
