/*
 * - LGPL
 *
 * Input
 * 
 */

/**
 * @class Roo.bootstrap.TextArea
 * @extends Roo.bootstrap.Input
 * Bootstrap TextArea class
 * @cfg {Boolean} disabled is it disabled
 * @cfg {String} fieldLabel - the label associated
 * @cfg {String} inputType button | checkbox | email | file | hidden | image | number | password | radio | range | reset | search | submit | text
 * @cfg {String} name name of the input
 * @cfg {string} fieldLabel - the label associated
 * @cfg {string}  inputType - input / file submit ...
 * @cfg {string} placeholder - placeholder to put in text.
 * @cfg {string}  before - input group add on before
 * @cfg {string} after - input group add on after
 * @cfg {string} size - (lg|sm) or leave empty..
 * @cfg {Number} xs colspan out of 12 for mobile-sized screens
 * @cfg {Number} sm colspan out of 12 for tablet-sized screens
 * @cfg {Number} md colspan out of 12 for computer-sized screens
 * @cfg {Number} lg colspan out of 12 for large computer-sized screens
 * @cfg {string} value default value of the input
 * @cfg {Number} labelWidth set the width of label (0-12)
 * @cfg {Number} cols Specifies the visible width of a text area
 * @cfg {Number} rows Specifies the visible number of lines in a text area
 * @cfg {Number} readOnly Specifies that a text area should be read-only
 * @cfg {string} wrap (soft|hard)Specifies how the text in a text area is to be wrapped when submitted in a form
 * 
 * @constructor
 * Create a new TextArea
 * @param {Object} config The config object
 */

Roo.bootstrap.TextArea = function(config){
    Roo.bootstrap.TextArea.superclass.constructor.call(this, config);
   
   this.addEvents({
            /**
             * @event focus
             * Fires when this field receives textarea focus.
             * @param {Roo.form.Field} this
             */
            focus : true,
            /**
             * @event blur
             * Fires when this field loses textarea focus.
             * @param {Roo.form.Field} this
             */
            blur : true,
            /**
             * @event specialkey
             * Fires when any key related to navigation (arrows, tab, enter, esc, etc.) is pressed.  You can check
             * {@link Roo.EventObject#getKey} to determine which key was pressed.
             * @param {Roo.form.Field} this
             * @param {Roo.EventObject} e The event object
             */
            specialkey : true,
            /**
             * @event change
             * Fires just before the field blurs if the field value has changed.
             * @param {Roo.form.Field} this
             * @param {Mixed} newValue The new value
             * @param {Mixed} oldValue The original value
             */
            change : true,
            /**
             * @event invalid
             * Fires after the field has been marked as invalid.
             * @param {Roo.form.Field} this
             * @param {String} msg The validation message
             */
            invalid : true,
            /**
             * @event valid
             * Fires after the field has been validated with no errors.
             * @param {Roo.form.Field} this
             */
            valid : true,
             /**
             * @event keyup
             * Fires after the key up
             * @param {Roo.form.Field} this
             * @param {Roo.EventObject}  e The event Object
             */
            keyup : true
        });
};

Roo.extend(Roo.bootstrap.TextArea, Roo.bootstrap.Input,  {
     
    cols : false,
    rows : 5,
    readOnly : false,
    warp : 'soft',
    
    getAutoCreate : function(){
        
        var parent = this.parent();
        
        var align = parent.labelAlign;
        
        var id = Roo.id();
        
        var cfg = {};
        
        var input =  {
            tag: 'textarea',
            id : id,
            warp : this.warp,
            rows : this.rows,
            value : this.value,
            cls : 'form-control',
            placeholder : this.placeholder || '' 
            
        };
        
        if(this.cols){
            input.cols = this.cols;
        }
        
        if (this.readOnly) {
            input.readonly = true;
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
            
        }
        
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
        return this.el.select('textarea.form-control',true).first();
    }
});

 
