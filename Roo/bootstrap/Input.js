/*
 * - LGPL
 *
 * row
 * 
 */
/**
 * @class Roo.bootstrap.Input
 * @extends Roo.bootstrap.Component
 * Bootstrap Input class
 * @cfg {boolean} disabled is it disabled
 * @cfg {string} fieldLabel - the label associated
 * @cfg {string}  inputType - input / file submit ...
 * @cfg {string} placeholder - placeholder to put in text.
 * @cfg {string}  before - input group add on before
 * @cfg {string} after - input group add on after
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
    before : false,
    after : false,
    
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
        
        var inputblock = input;
        
        if (this.before || this.after) {
            
            inputblock = {
                cls : 'input-group',
                cn :  [] 
            };
            if (this.before) {
                inputblock.cn.push({
                    tag :'span',
                    cls : 'input-group-addon',
                    html : this.before
                });
            }
            inputblock.cn.push(input);
            if (this.after) {
                inputblock.cn.push({
                    tag :'span',
                    cls : 'input-group-addon',
                    html : this.after
                });
            }
            
        }
        
        
        switch(align) {
            case 'left' && this.fieldLabel:
                
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
                            inputblock
                        ]
                    }
                    
                ];
                break;
            case  this.fieldLabel:
                
                 cfg.cn = [
                   
                    {
                        tag: 'label',
                        //cls : 'input-group-addon',
                        html : this.fieldLabel
                        
                    },
                    
                    inputblock
                    
                ];
                break;
            
            default:
                cfg.cn = [
                    
                        inputblock
                    
                ];
                
                
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

 
