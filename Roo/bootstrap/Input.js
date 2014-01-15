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
    disabled : false,
    
    getAutoCreate : function(){
        
        var parent = this.parent();
        
        var align = parent.labelAlign;
        
        var id = Roo.id();
        
        var cfg = {
            cls: 'form-group' //input-group
        };
        
        var input =  {
            tag: 'input',
            id : id,
            type : this.inputType,
            cls : 'form-control',
            placeholder : this.placeholder || '' 
            
        };

        
        switch(align) {
            case 'left':
                
                cfg.cn = [
                    
                    {
                        tag: 'label',
                        'for' :  id,
                        cls : 'col-sm-2 control-label',
                        html : this.fieldLabel
                        
                    },
                    {
                        cls : "col-sm-10", 
                        cn: [
                            input
                        ]
                    }
                    
                ];
                break;
            default:
                
                 cfg.cn = [
                   
                    {
                        tag: 'label',
                        //cls : 'input-group-addon',
                        html : this.fieldLabel
                        
                    },
                    
                    input
                    
                ];
                break;
                
        }
         
        
        
        
        if (this.disabled) {
            input.disabled=true;
        }
        return cfg;
        
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

 
