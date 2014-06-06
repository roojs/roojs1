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
 * @cfg {Number} cols Specifies the visible width of a text area
 * @cfg {Number} rows Specifies the visible number of lines in a text area
 * @cfg {Number} readOnly Specifies that a text area should be read-only
 * @cfg {string} wrap (soft|hard)Specifies how the text in a text area is to be wrapped when submitted in a form
 * @cfg {string} resize (none|both|horizontal|vertical|inherit|initial)
 * @cfg {string} html text
 * 
 * @constructor
 * Create a new TextArea
 * @param {Object} config The config object
 */

Roo.bootstrap.TextArea = function(config){
    Roo.bootstrap.TextArea.superclass.constructor.call(this, config);
   
};

Roo.extend(Roo.bootstrap.TextArea, Roo.bootstrap.Input,  {
     
    cols : false,
    rows : 5,
    readOnly : false,
    warp : 'soft',
    resize : false,
    value: false,
    html: false,
    
    getAutoCreate : function(){
        
        var align = (!this.labelAlign) ? this.parentLabelAlign() : this.labelAlign;
        
        var id = Roo.id();
        
        var cfg = {};
        
        var input =  {
            tag: 'textarea',
            id : id,
            warp : this.warp,
            rows : this.rows,
            value : this.value || '',
            html: this.html || '',
            cls : 'form-control',
            placeholder : this.placeholder || '' 
            
        };
        
        if(this.maxLength && this.maxLength != Number.MAX_VALUE){
            input.maxLength = this.maxLength;
        }
        
        if(this.resize){
            input.style = (typeof(input.style) == 'undefined') ? 'resize:' + this.resize : input.style + 'resize:' + this.resize;
        }
        
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
            input.cls = (typeof(input.cls) == 'undefined') ? 'input-' + this.size : input.cls + ' input-' + this.size;
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

 
