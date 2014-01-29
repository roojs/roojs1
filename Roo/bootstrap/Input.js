/*
 * - LGPL
 *
 * Input
 * 
 */

/**
 * @class Roo.bootstrap.Input
 * @extends Roo.bootstrap.Component
 * Bootstrap Input class
 * @cfg {Boolean} disabled is it disabled
 * @cfg {String} fieldLabel - the label associated
 * @cfg {String} inputType button | checkbox | email | file | hidden | image | number | password | radio | range | reset | search | submit | text
 * @cfg {String} name name of the input
 * 
 * 
 * @constructor
 * Create a new Input
 * @param {Object} config The config object
 */

Roo.bootstrap.Input = function(config){
    Roo.bootstrap.Input.superclass.constructor.call(this, config);
   
};

Roo.extend(Roo.bootstrap.Input, Roo.bootstrap.Component,  {
    
    fieldLabel : '',
    inputType : 'text',
    disabled : false,
    name : false,
    placeholder: false,
    
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
        if (this.name) {
            input.name = name;
        }
        
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

 
