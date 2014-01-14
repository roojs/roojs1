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
    
    fieldLabel : '',
    inputType : 'text',
    
    getAutoCreate : function(){
        
        var id = Roo.id();
        return {
            cls: 'input-group',
            cn : [
                /*
                {
                    tag: 'span',
                    cls : 'input-group-addon',
                    html : this.fieldLabel
                    
                },
                */
                {
                    tag: 'label',
                    'for' :  id,
                    html : this.fieldLabel
                    
                },
                {
                    tag: 'input',
                    id : id,
                    type : this.inputType,
                    cls : 'form-control'
                }
            ]
        };
    }
    
});

 
