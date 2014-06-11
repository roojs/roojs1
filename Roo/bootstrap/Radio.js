/*
 * - LGPL
 *
 * Radio
 * 
 */

/**
 * @class Roo.bootstrap.Radio
 * @extends Roo.bootstrap.CheckBox
 * Bootstrap Radio class

 * @constructor
 * Create a new Radio
 * @param {Object} config The config object
 */

Roo.bootstrap.Radio = function(config){
    Roo.bootstrap.Radio.superclass.constructor.call(this, config);
   
};

Roo.extend(Roo.bootstrap.Radio, Roo.bootstrap.CheckBox,  {
    
    inputType: 'radio',
    inputValue: '',
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
            value : (!this.checked) ? this.valueOff : this.inputValue,
            cls : 'form-box',
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
                        cls : 'control-label col-md-' + this.labelWidth,
                        html : this.fieldLabel
                        
                    },
                    {
                        cls : "col-md-" + (12 - this.labelWidth), 
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
                        'for': id,
                        cls: 'control-label box-input-label',
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
        
        if(this.boxLabel){
            cfg.cn.push({
                tag: 'span',
                'for': id,
                cls: 'box-label',
                html: this.boxLabel
            })
        }
        
        return cfg;
        
    },
   
    onClick : function()
    {   
        this.setChecked(true);
    },
    
    setChecked : function(state,suppressEvent)
    {
        Roo.each(this.inputEl().up('form').select('input[name='+this.inputEl().dom.name+']', true).elements, function(v){
            v.dom.checked = false;
        });
        
        this.checked = state;
        this.inputEl().dom.checked = state;
        
        if(suppressEvent !== true){
            this.fireEvent('check', this, state);
        }
        
        this.inputEl().dom.value = state ? this.inputValue : this.valueOff;
        
    },
    
    getGroupValue : function()
    {
        Roo.each(this.inputEl().up('form').select('input[name='+this.inputEl().dom.name+']', true).elements, function(v){
            
            if(v.dom.checked == true){
            
                return v.dom.value;
            }
        });
        
        return '';
    },
    
    /**
     * Returns the normalized data value (undefined or emptyText will be returned as '').  To return the raw value see {@link #getRawValue}.
     * @return {Mixed} value The field value
     */
    getValue : function(){
        return this.getGroupValue();
    }
    
});

 
