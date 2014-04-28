/*
 * - LGPL
 *
 * CheckBox
 * 
 */

/**
 * @class Roo.bootstrap.CheckBox
 * @extends Roo.bootstrap.Input
 * Bootstrap CheckBox class
 * 
 * @cfg {String} valueOff The value that should go into the generated input element's value when unchecked.
 * 
 * @constructor
 * Create a new CheckBox
 * @param {Object} config The config object
 */

Roo.bootstrap.CheckBox = function(config){
    Roo.bootstrap.CheckBox.superclass.constructor.call(this, config);
   
        this.addEvents({
            /**
            * @event check
            * Fires when the element is checked or unchecked.
            * @param {Roo.bootstrap.Input} this This input
            * @param {Boolean} checked The new checked value
            */
           check : true
        });
};

Roo.extend(Roo.bootstrap.CheckBox, Roo.bootstrap.Input,  {
    
    inputType: 'checkbox',
    valueOff: '',
    
    getAutoCreate : function()
    {
        var align = (!this.labelAlign) ? this.parentLabelAlign() : this.labelAlign;
        
        var id = Roo.id();
        
        var cfg = {};
        
        cfg.cls = 'form-group' //input-group
        
        var input =  {
            tag: 'input',
            id : id,
            type : this.inputType,
            value : this.value,
            cls : 'form-checkbox',
            placeholder : this.placeholder || ''
            
        };
        
        if (this.disabled) {
            input.disabled=true;
        }
        
        if(this.checked){
            input.checked = this.checked;
        }
        
        if (this.name) {
            input.name = this.name;
        }
        if (this.size) {
            input.cls += ' input-' + this.size;
        }
        
        var settings=this;
        ['xs','sm','md','lg'].map(function(size){
            if (settings[size]) {
                cfg.cls += ' col-' + size + '-' + settings[size];
            }
        });
        
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
            
        };
        
        if (align ==='left' && this.fieldLabel.length) {
                Roo.log("left and has label");
                cfg.cn = [
                    
                    {
                        tag: 'label',
                        'for' :  id,
                        cls : 'control-label col-sm-' + this.labelWidth,
                        html : this.fieldLabel
                        
                    },
                    {
                        cls : "col-sm-" + (12 - this.labelWidth), 
                        cn: [
                            inputblock
                        ]
                    }
                    
                ];
        } else if ( this.fieldLabel.length) {
                Roo.log(" label");
                 cfg.cn = [
                   
                    {
                        tag: 'label',
                        //cls : 'input-group-addon',
                        html : this.fieldLabel
                        
                    },
                    
                    inputblock
                    
                ];

        } else {
            
                   Roo.log(" no label && no align");
                cfg.cn = [
                    
                        inputblock
                    
                ];
                
                
        };
        
        return cfg;
        
    },
    
    /**
     * return the real input element.
     */
    inputEl: function ()
    {
        return this.el.select('input[type=checkbox]',true).first();
    },
    
    initEvents : function()
    {
       
        this.inputEl().on('click', this.onClick,  this);
    },
    
//    getGroupValue : function()
//    {
//        if(typeof(this.inputEl().up('form').child('input[name='+this.inputEl().dom.name+']:checked', true)) == 'undefined'){
//            return '';
//        }
//        
//        return this.inputEl().up('form').child('input[name='+this.inputEl().dom.name+']:checked', true).value;
//    },
    
    onClick : function()
    {
        if(this.inputType != 'checkbox' && this.inputType != 'radio'){
            return;
        }
        
        this.setChecked(!this.checked);
    },
    
    setChecked : function(state,suppressEvent)
    {
    
        this.checked = state;
        
        if(suppressEvent !== true){
            this.fireEvent('check', this, state);
        }
        
        this.inputEl().dom.value = state ? this.value : this.valueOff;
        
    }
    
    /**
     * Returns the normalized data value (undefined or emptyText will be returned as '').  To return the raw value see {@link #getRawValue}.
     * @return {Mixed} value The field value
     */
//    getValue : function(){
//        return this.getGroupValue();
//    },
    
});

 
