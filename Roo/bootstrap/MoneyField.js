
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
    
    inputlg : 9,
    inputmd : 9,
    inputsm : 9,
    inputxs : 6,
    
    store : false,
    
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
            cls : 'form-control roo-money-amount-input',
            autocomplete: 'new-password'
        };
        
        if (this.name) {
            input.name = this.name;
        }

        if (this.disabled) {
            input.disabled = true;
        }

        var clg = 12 - this.inputlg;
        var cmd = 12 - this.inputmd;
        var csm = 12 - this.inputsm;
        var cxs = 12 - this.inputxs;
        
        var container = {
            tag : 'div',
            cls : 'row roo-money-field',
            cn : [
                {
                    tag : 'div',
                    cls : 'roo-money-currency column col-lg-' + clg + ' col-md-' + cmd + ' col-sm-' + csm + ' col-xs-' + cxs,
                    cn : [
                        {
                            tag : 'div',
                            cls: 'roo-select2-container input-group',
                            cn: [
                                {
                                    tag : 'input',
                                    cls : 'form-control roo-money-currency-input',
                                    autocomplete: 'new-password'
                                },
                                {
                                    tag :'span',
                                    cls : 'input-group-addon',
                                    cn : [
                                        {
                                            tag: 'span',
                                            cls: 'caret'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    tag : 'div',
                    cls : 'roo-money-amount column col-lg-' + this.inputlg + ' col-md-' + this.inputmd + ' col-sm-' + this.inputsm + ' col-xs-' + this.inputxs,
                    cn : [
                        {
                            tag: 'div',
                            cls: this.hasFeedback ? 'has-feedback' : '',
                            cn: [
                                input
                            ]
                        }
                    ]
                }
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

            var label_text = {
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
                };

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
                    container.cls += ' col-md-' + (12 - this.labelmd);
                }
                if(this.labelsm > 0){
                    label.cls += ' col-sm-' + this.labelsm;
                    container.cls += ' col-sm-' + (12 - this.labelsm);
                }
                if(this.labelxs > 0){
                    label.cls += ' col-xs-' + this.labelxs;
                    container.cls += ' col-xs-' + (12 - this.labelxs);
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
    },
    
    initEvents : function()
    {
        if (!this.store) {
            throw "can not find store for combo";
        }
        
        this.store = Roo.factory(this.store, Roo.data);
        this.store.parent = this;
        
        this.createList();
        
        this.indicator = this.indicatorEl();
        
        this.triggerEl = this.el.select('.input-group-addon', true).first();
        
        
        
        
        
    }
    
});