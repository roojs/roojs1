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
                cls : 'form-control tel-input',
                autocomplete: 'new-password'
                //placeholder : this.placeholder || '' 
            };
            
            if (this.name) {
                input.name = this.name;
            }
            
            if (this.disabled) {
                input.disabled=true;
            }
            
            var flag_container = {
                tag: 'div',
                cls: 'flag-container',
                cn: [
                    {
                        tag: 'div',
                        cls: 'flag'
                    },
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
                
                indicator.cls = 'roo-required-indicator text-danger fa fa-lg fa-star left-indicator';
                label.cn = [
                    indicator,
                    label_text
                ];
                
                if(this.indicatorpos == 'right') {
                    indicator.cls = 'roo-required-indicator text-danger fa fa-lg fa-star right-indicator';
                    label.cn = [
                        label_text,
                        indicator
                    ];
                }
                
                if(align == 'left') {
                    container = {
                        tag: 'div',
                        cn: [
                            container
                        ]
                    }
                    
                    if(this.labelWidth > 12){
                        label.style = "width: " + this.labelWidth + 'px';
                    }
                    if(this.labelWidth < 13 && this.labelmd == 0){
                        this.labelmd = this.labelWidth;
                    }
                    if(this.labellg > 0){
                        label.cls += ' col-lg-' + this.labellg;
                        input.cls += ' col-lg-' + (12 - this.labellg);
                    }
                    if(this.labelmd > 0){
                        label.cls += ' col-md-' + this.labelmd;
                        contentCfg.cls += ' col-md-' + (12 - this.labelmd);
                    }
                    if(this.labelsm > 0){
                        label.cls += ' col-sm-' + this.labelsm;
                        contentCfg.cls += ' col-sm-' + (12 - this.labelsm);
                    }
                    if(this.labelxs > 0){
                        label.cls += ' col-xs-' + this.labelxs;
                        contentCfg.cls += ' col-xs-' + (12 - this.labelxs);
                    }
                }
            }
            
            cfg.cn = [
                label,
                container
            ];
            
            
            var settings = this;
            
            ['xs','sm','md','lg'].map(function(size){
                if (settings[size]) {
                    cfg.cls += ' col-' + size + '-' + settings[size];
                }
            });
            
            return cfg;
        }

});