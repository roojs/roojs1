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
 * @cfg {String} inputValue The value that should go into the generated input element's value when checked.
 * @cfg {String} boxLabel The text that appears beside the checkbox
 * @cfg {String} weight (primary|warning|info|danger|success) The text that appears beside the checkbox
 * @cfg {Boolean} checked initnal the element
 * @cfg {Boolean} inline inline the element (default false)
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
            * @param {Roo.bootstrap.CheckBox} this This input
            * @param {Boolean} checked The new checked value
            */
           check : true
        });
};

Roo.extend(Roo.bootstrap.CheckBox, Roo.bootstrap.Input,  {
    
    inputType: 'checkbox',
    inputValue: 1,
    valueOff: 0,
    boxLabel: false,
    checked: false,
    weight : false,
    inline: false,
    
    getAutoCreate : function()
    {
        var align = (!this.labelAlign) ? this.parentLabelAlign() : this.labelAlign;
        
        var id = Roo.id();
        
        var cfg = {};
        
        cfg.cls = 'form-group ' + this.inputType //input-group
        
        if(this.inline){
            cfg.cls += ' ' + this.inputType + '-inline';
        }
        
        var input =  {
            tag: 'input',
            id : id,
            type : this.inputType,
            value : (!this.checked) ? this.valueOff : this.inputValue,
            cls : 'roo-' + this.inputType, //'form-box',
            placeholder : this.placeholder || ''
            
        };
        
        if (this.weight) { // Validity check?
            cfg.cls += " " + this.inputType + "-" + this.weight;
        }
        
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
                        tag: this.boxLabel ? 'span' : 'label',
                        'for': id,
                        cls: 'control-label box-input-label',
                        //cls : 'input-group-addon',
                        html : this.fieldLabel
                        
                    },
                    
                    inputblock
                    
                ];

        } else {
            
                Roo.log(" no label && no align");
                cfg.cn = [  inputblock ] ;
                
                
        };
         if(this.boxLabel){
            cfg.cn.push( {
                tag: 'label',
                'for': id,
                cls: 'box-label',
                html: this.boxLabel
                
            });
        }
        
        
       
        return cfg;
        
    },
    
    /**
     * return the real input element.
     */
    inputEl: function ()
    {
        return this.el.select('input.roo-' + this.inputType,true).first();
    },
    
    label: function()
    {
        return this.el.select('label.control-label',true).first();
    },
    
    initEvents : function()
    {
//        Roo.bootstrap.CheckBox.superclass.initEvents.call(this);
        
        this.inputEl().on('click', this.onClick,  this);
        
    },
    
    onClick : function()
    {   
        this.setChecked(!this.checked);
    },
    
    setChecked : function(state,suppressEvent)
    {
        if(this.inputType == 'radio'){
            
            this.inputEl().dom.checked = true;
            
            Roo.each(this.el.up('form').child('input[name='+this.name+']', true).elements, function(e){
                e.dom.checked = false;
            }})
            
            if(suppressEvent !== true){
                this.fireEvent('check', this, state);
            }

            return;
        }
        
        this.checked = state;
        
        if(suppressEvent !== true){
            this.fireEvent('check', this, state);
        }
        
        this.inputEl().dom.checked = state;
        
        this.inputEl().dom.value = state ? this.inputValue : this.valueOff;
        
    },
    
    getValue : function()
    {
        if(this.inputType == 'radio'){
            return this.getGroupValue();
        }
        
        return this.inputEl().getValue();
        
    },
    
    getGroupValue : function()
    {
        return this.el.up('form').child('input[name='+this.name+']:checked', true).value;
    },
    
    setValue : function(v,suppressEvent)
    {
        this.setChecked(((typeof(v) == 'undefined') ? this.checked : (String(v) === String(this.inputValue))), suppressEvent);
    }
    
});

 
