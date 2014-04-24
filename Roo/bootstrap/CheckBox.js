/*
 * - LGPL
 *
 * Input
 * 
 */

/**
 * @class Roo.bootstrap.CheckBox
 * @extends Roo.bootstrap.Input
 * Bootstrap CheckBox class
 * @cfg {Number} cols Specifies the visible width of a text area
 * @cfg {Number} rows Specifies the visible number of lines in a text area
 * @cfg {Number} readOnly Specifies that a text area should be read-only
 * @cfg {string} wrap (soft|hard)Specifies how the text in a text area is to be wrapped when submitted in a form
 * @cfg {string} resize (none|both|horizontal|vertical|inherit|initial)
 * 
 * @constructor
 * Create a new CheckBox
 * @param {Object} config The config object
 */

Roo.bootstrap.CheckBox = function(config){
    Roo.bootstrap.CheckBox.superclass.constructor.call(this, config);
   
};

Roo.extend(Roo.bootstrap.CheckBox, Roo.bootstrap.Input,  {
     
    
    
    getAutoCreate : function(){
        
        var align = (!this.labelAlign) ? this.parentLabelAlign() : this.labelAlign;
        
        var id = Roo.id();
        
        var cfg = {};
        
        var input =  {
            tag: 'input',
            type: 'checkbox'
            id : id,
            value : this.value || '',
            placeholder : this.placeholder || '' 
            
        };
        
        if (this.name) {
            input.name = this.name;
        }
        
        if (this.size) {
            input.cls = (typeof(input.cls) == 'undefined') ? 'input-' + this.size : input.cls + ' input-' + this.size;
        }
        
        var settings=this;
        ['xs','sm','md','lg'].map(function(size){
            if (settings[size]) {
                cfg.cls += ' col-' + size + '-' + settings[size];
            }
        });
        
        var inputblock = input;
        
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
                
                
        }
        
        if (this.disabled) {
            input.disabled=true;
        }
        
        return cfg;
        
    },
    /**
     * return the real textarea element.
     */
    inputEl: function ()
    {
        return this.el.select('input[type=checkbox]',true).first();
    }
});

 
