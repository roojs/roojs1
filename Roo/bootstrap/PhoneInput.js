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
            
            var indicator = {
                tag: 'i',
                cls: 'roo-required-indicator text-danger fa fa-lg fa-star',
                tooltip: 'This field is required'
            };
            
            var label = {
                tag: 'label',
                'for' :  id,
                cls : 'control-label',
                html : this.fieldLabel
            };
            
            if (align ==='left' && this.fieldLabel.length) {
                cfg.cls += ' roo-form-group-label-left';
                indicator.cls += ' left-indicator'
                cfg.cn = [
                    {
                        tag : 'i',
                        cls : 'roo-required-indicator left-indicator text-danger fa fa-lg fa-star',
                        tooltip : 'This field is required'
                    },
                    {
                        tag: 'label',
                        'for' :  id,
                        cls : 'control-label',
                        html : this.fieldLabel
                    },
                    {
                        cls : "", 
                        cn: [
                            combobox
                        ]
                    }

                ];
                
                var labelCfg = cfg.cn[1];
                var contentCfg = cfg.cn[2];
                
                if(this.indicatorpos == 'right'){
                    cfg.cn = [
                        {
                            tag: 'label',
                            'for' :  id,
                            cls : 'control-label',
                            cn : [
                                {
                                    tag : 'span',
                                    html : this.fieldLabel
                                },
                                {
                                    tag : 'i',
                                    cls : 'roo-required-indicator right-indicator text-danger fa fa-lg fa-star',
                                    tooltip : 'This field is required'
                                }
                            ]
                        },
                        {
                            cls : "", 
                            cn: [
                                combobox
                            ]
                        }

                    ];
                    
                    labelCfg = cfg.cn[0];
                    contentCfg = cfg.cn[1];
                }
                
                if(this.labelWidth > 12){
                    labelCfg.style = "width: " + this.labelWidth + 'px';
                }
                
                if(this.labelWidth < 13 && this.labelmd == 0){
                    this.labelmd = this.labelWidth;
                }
                
                if(this.labellg > 0){
                    labelCfg.cls += ' col-lg-' + this.labellg;
                    contentCfg.cls += ' col-lg-' + (12 - this.labellg);
                }
                
                if(this.labelmd > 0){
                    labelCfg.cls += ' col-md-' + this.labelmd;
                    contentCfg.cls += ' col-md-' + (12 - this.labelmd);
                }
                
                if(this.labelsm > 0){
                    labelCfg.cls += ' col-sm-' + this.labelsm;
                    contentCfg.cls += ' col-sm-' + (12 - this.labelsm);
                }
                
                if(this.labelxs > 0){
                    labelCfg.cls += ' col-xs-' + this.labelxs;
                    contentCfg.cls += ' col-xs-' + (12 - this.labelxs);
                }
                
            } else if ( this.fieldLabel.length) {
    //                Roo.log(" label");
                cfg.cn = [
                    {
                       tag : 'i',
                       cls : 'roo-required-indicator left-indicator text-danger fa fa-lg fa-star',
                       tooltip : 'This field is required'
                   },
                   {
                       tag: 'label',
                       //cls : 'input-group-addon',
                       html : this.fieldLabel

                   },

                   combobox

                ];
                
                if(this.indicatorpos == 'right'){
                    
                    cfg.cn = [
                        {
                           tag: 'label',
                           cn : [
                               {
                                   tag : 'span',
                                   html : this.fieldLabel
                               },
                               {
                                  tag : 'i',
                                  cls : 'roo-required-indicator right-indicator text-danger fa fa-lg fa-star',
                                  tooltip : 'This field is required'
                               }
                           ]

                        },
                        combobox

                    ];

                }

            } else {
                
    //                Roo.log(" no label && no align");
                    cfg = combobox
                         
                    
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