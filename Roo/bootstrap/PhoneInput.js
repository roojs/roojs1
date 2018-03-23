Roo.bootstrap.PhoneInput = function(config) {
    Roo.bootstrap.PhoneInput.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.PhoneInput, Roo.bootstrap.Input,  {
        
        getAutoCreate : function()
        {
            var align = this.labelAlign || this.parentLabelAlign();
            var id = Roo.id();
            
            var cfg = {
                cls: 'form-group', //input-group
                cn: []
            };
            
            var input =  {
                tag: 'input',
                id : id,
                type : 'tel',
                cls : 'form-control tel-input'
                //style: 'padding-left: 50px',
                //autocomplete: 'new-password',
                //placeholder : this.placeholder || '' 
            };
            
            if (this.name) {
                input.name = this.name;
            }
            
            if (this.disabled) {
                input.disabled=true;
            }
            
            var flag = {
                tag: 'div',
                cls: 'flag'
            };
            
            //btn
            var flag_container = {
                tag: 'div',
                cls: 'flag-container',
                cn: [
                    flag,
                    {
                        tag: 'div',
                        cls: 'caret'
                    }
                ]
            };
            
            var box = {
                tag: 'div',
                cls: this.hasFeedback ? 'has-feedback' : '',
                cn: [
                    input
                ]
            };
            
            var container = {
                cls: 'roo-select2-container input-group',
                cn: [
                    flag_container,
                    box
                ]
            };
            
            /*
            cfg.cn = [
                container
            ];
            */
            if (this.fieldLabel.length) {
                var indicator = {
                    tag: 'i',
                    tooltip: 'This field is required'
                };
                
                var label = {
                    tag: 'label',
                    'for':  id,
                    cls: 'control-label',
                    cn: []
                };
                
                var label_text {
                    tag: 'span',
                    html: this.fieldLabel
                };
                
                if(this.indicatorpos == 'right') {
                    indicator.cls = 'roo-required-indicator text-danger fa fa-lg fa-star right-indicator';
                    label.cn = [
                        label_text,
                        indicator
                    ];
                } else {
                    indicator.cls = 'roo-required-indicator text-danger fa fa-lg fa-star left-indicator';
                    label.cn = [
                        indicator,
                        label_text
                    ];
                }
                
                if(align == 'left' && fieldLabel) {
                    
                }
            }
            
            
            var settings=this;
            
            ['xs','sm','md','lg'].map(function(size){
                if (settings[size]) {
                    cfg.cls += ' col-' + size + '-' + settings[size];
                }
            });
            
            return cfg;
        }

});