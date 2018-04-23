
/**
 * @class Roo.bootstrap.MoneyField
 * @extends Roo.bootstrap.TriggerField
 * Bootstrap MoneyField class
 * 
 * @constructor
 * Create a new MoneyField.
 * @param {Object} config Configuration options
 */

Roo.bootstrap.MoneyField = function(config) {
    Roo.bootstrap.MoneyField.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.MoneyField, Roo.bootstrap.TriggerField, {
    
    getAutoCreate : function()
    {
        var align = this.labelAlign || this.parentLabelAlign();
        
        var id = Roo.id();
        
        var cfg = {
            cls: 'form-group',
            cn: []
        };
        
        var input =  {
            tag: 'input',
            id : id,
            cls : 'form-control money-input',
            autocomplete: 'new-password'
        };
        
        var hiddenInput = {
            tag: 'input',
            type: 'hidden',
            cls: 'hidden-money-input'
        };
        
        var currency_input =  {
            tag: 'input',
            cls : 'form-control',
            autocomplete: 'new-password'
        };
        
        var amount_input =  {
            tag: 'input',
            id : id,
            cls : 'form-control',
            autocomplete: 'new-password'
        };
        
        if (this.name) {
            currency_input.name = this.name;
        }
        
        if (this.currency_name) {
            currency_input.name = this.currency_name;
        }
        
        if (this.disabled) {
            currency_input.disabled = true;
            amount_input.disabled = true;
        }
        
        var inputblock = amount_input;
        
        if(this.hasFeedback && !this.allowBlank){
            
            var feedback = {
                tag: 'span',
                cls: 'glyphicon form-control-feedback'
            };
            
            inputblock = {
                cls : 'has-feedback',
                cn :  [
                    currency_input,
                    inputblock,
                    feedback
                ] 
            };
        }
        
        var box = {
            tag: 'div',
            cn: [
                {
                    tag: 'input',
                    type : 'hidden',
                    cls: 'form-hidden-field'
                },
                inputblock
            ]
        };
        
        var combobox = {
            cls: 'roo-select2-container input-group',
            cn: [
                box
            ]
        };
        
        var caret = {
            tag: 'span',
            cls: 'caret'
        };
        
        combobox.cn.push({
            tag :'span',
            cls : 'input-group-addon btn dropdown-toggle',
            cn : [
                caret,
                {
                    tag: 'span',
                    cls: 'combobox-clear',
                    cn  : [
                        {
                            tag : 'i',
                            cls: 'icon-remove'
                        }
                    ]
                }
            ]
        });
        
        if (align ==='left' && this.fieldLabel.length) {
            
            cfg.cls += ' roo-form-group-label-left';

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
            cfg.cn = [
                {
                   tag : 'i',
                   cls : 'roo-required-indicator left-indicator text-danger fa fa-lg fa-star',
                   tooltip : 'This field is required'
               },
               {
                   tag: 'label',
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
            cfg = combobox
        }
        
        var settings=this;
        ['xs','sm','md','lg'].map(function(size){
            if (settings[size]) {
                cfg.cls += ' col-' + size + '-' + settings[size];
            }
        });
        
        return cfg;
            
    },
    
    initEvents : function()
    {
        
    }
    
});