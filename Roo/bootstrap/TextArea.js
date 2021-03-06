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
        
        if(this.inputType != 'hidden'){
            cfg.cls = 'form-group' //input-group
        }
        
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
        
        if(this.hasFeedback && !this.allowBlank){
            
            var feedback = {
                tag: 'span',
                cls: 'glyphicon form-control-feedback'
            };

            inputblock = {
                cls : 'has-feedback',
                cn :  [
                    input,
                    feedback
                ] 
            };  
        }
        
        
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
            
            if(this.hasFeedback && !this.allowBlank){
                inputblock.cls += ' has-feedback';
                inputblock.cn.push(feedback);
            }
            
            if (this.after) {
                inputblock.cn.push({
                    tag :'span',
                    cls : 'input-group-addon',
                    html : this.after
                });
            }
            
        }
        
        if (align ==='left' && this.fieldLabel.length) {
            cfg.cn = [
                {
                    tag: 'label',
                    'for' :  id,
                    cls : 'control-label',
                    html : this.fieldLabel
                },
                {
                    cls : "",
                    cn: [
                        inputblock
                    ]
                }

            ];
            
            if(this.labelWidth > 12){
                cfg.cn[0].style = "width: " + this.labelWidth + 'px';
            }

            if(this.labelWidth < 13 && this.labelmd == 0){
                this.labelmd = this.labelWidth;
            }

            if(this.labellg > 0){
                cfg.cn[0].cls += ' col-lg-' + this.labellg;
                cfg.cn[1].cls += ' col-lg-' + (12 - this.labellg);
            }

            if(this.labelmd > 0){
                cfg.cn[0].cls += ' col-md-' + this.labelmd;
                cfg.cn[1].cls += ' col-md-' + (12 - this.labelmd);
            }

            if(this.labelsm > 0){
                cfg.cn[0].cls += ' col-sm-' + this.labelsm;
                cfg.cn[1].cls += ' col-sm-' + (12 - this.labelsm);
            }

            if(this.labelxs > 0){
                cfg.cn[0].cls += ' col-xs-' + this.labelxs;
                cfg.cn[1].cls += ' col-xs-' + (12 - this.labelxs);
            }
            
        } else if ( this.fieldLabel.length) {
            cfg.cn = [

               {
                   tag: 'label',
                   //cls : 'input-group-addon',
                   html : this.fieldLabel

               },

               inputblock

           ];

        } else {

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
    },
    
    /**
     * Clear any invalid styles/messages for this field
     */
    clearInvalid : function()
    {
        
        if(!this.el || this.preventMark){ // not rendered
            return;
        }
        
        var label = this.el.select('label', true).first();
        var icon = this.el.select('i.fa-star', true).first();
        
        if(label && icon){
            icon.remove();
        }
        this.el.removeClass( this.validClass);
        this.inputEl().removeClass('is-invalid');
         
        if(this.hasFeedback && this.inputType != 'hidden' && !this.allowBlank){
            
            var feedback = this.el.select('.form-control-feedback', true).first();
            
            if(feedback){
                this.el.select('.form-control-feedback', true).first().removeClass(this.invalidFeedbackClass);
            }
            
        }
        
        this.fireEvent('valid', this);
    },
    
     /**
     * Mark this field as valid
     */
    markValid : function()
    {
        if(!this.el  || this.preventMark){ // not rendered
            return;
        }
        
        this.el.removeClass([this.invalidClass, this.validClass]);
        this.inputEl().removeClass(['is-valid', 'is-invalid']);
        
        var feedback = this.el.select('.form-control-feedback', true).first();
            
        if(feedback){
            this.el.select('.form-control-feedback', true).first().removeClass([this.invalidFeedbackClass, this.validFeedbackClass]);
        }

        if(this.disabled || this.allowBlank){
            return;
        }
        
        var label = this.el.select('label', true).first();
        var icon = this.el.select('i.fa-star', true).first();
        
        if(label && icon){
            icon.remove();
        }
        if (Roo.bootstrap.version == 3) {
            this.el.addClass(this.validClass);
        } else {
            this.inputEl().addClass('is-valid');
        }
        
        
        if(this.hasFeedback && this.inputType != 'hidden' && !this.allowBlank && (this.getValue().length || this.forceFeedback)){
            
            var feedback = this.el.select('.form-control-feedback', true).first();
            
            if(feedback){
                this.el.select('.form-control-feedback', true).first().removeClass([this.invalidFeedbackClass, this.validFeedbackClass]);
                this.el.select('.form-control-feedback', true).first().addClass([this.validFeedbackClass]);
            }
            
        }
        
        this.fireEvent('valid', this);
    },
    
     /**
     * Mark this field as invalid
     * @param {String} msg The validation message
     */
    markInvalid : function(msg)
    {
        if(!this.el  || this.preventMark){ // not rendered
            return;
        }
        
        this.el.removeClass([this.invalidClass, this.validClass]);
        this.inputEl().removeClass(['is-valid', 'is-invalid']);
        
        var feedback = this.el.select('.form-control-feedback', true).first();
            
        if(feedback){
            this.el.select('.form-control-feedback', true).first().removeClass([this.invalidFeedbackClass, this.validFeedbackClass]);
        }

        if(this.disabled || this.allowBlank){
            return;
        }
        
        var label = this.el.select('label', true).first();
        var icon = this.el.select('i.fa-star', true).first();
        
        if(!this.getValue().length && label && !icon){
            this.el.createChild({
                tag : 'i',
                cls : 'text-danger fa fa-lg fa-star',
                tooltip : 'This field is required',
                style : 'margin-right:5px;'
            }, label, true);
        }
        
        if (Roo.bootstrap.version == 3) {
            this.el.addClass(this.invalidClass);
        } else {
            this.inputEl().addClass('is-invalid');
        }
        
        // fixme ... this may be depricated need to test..
        if(this.hasFeedback && this.inputType != 'hidden' && !this.allowBlank){
            
            var feedback = this.el.select('.form-control-feedback', true).first();
            
            if(feedback){
                this.el.select('.form-control-feedback', true).first().removeClass([this.invalidFeedbackClass, this.validFeedbackClass]);
                
                if(this.getValue().length || this.forceFeedback){
                    this.el.select('.form-control-feedback', true).first().addClass([this.invalidFeedbackClass]);
                }
                
            }
            
        }
        
        this.fireEvent('invalid', this, msg);
    }
});

 
