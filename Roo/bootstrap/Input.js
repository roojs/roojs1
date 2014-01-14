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
        var cfg = {
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
                    cls : 'form-control',
                    placeholder : this.placeholder || '',
                    
                }
            ]
        };
        if (this.disabled) {
            cfg.cn[1].disabled=true;
        }
        
    },
    setDisabled : function(v)
    {
        var i  = this.el.select('input',true).dom;
        if (v) {
            i.removeAttribute('disabled');
            return;
            
        }
        i.setAttribute('disabled','true');
    }
});

 
