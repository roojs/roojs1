
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
            cls : 'form-control roo-money-amount-input',
            autocomplete: 'new-password'
        };
        
        if (this.name) {
            input.name = this.name;
        }

        if (this.disabled) {
            input.disabled = true;
        }

        var currency_box = {
            tag: 'div',
            cls: 'currency-box',
            cn: [
                {
                    tag: 'div',
                    cls: 'roo-money-currency-input'
                },
                {
                    tag: 'div',
                    cls: 'caret'
                }
            ]
        };

        var input_box = {
            tag: 'div',
            cls: this.hasFeedback ? 'has-feedback' : '',
            cn: [
                input
            ]
        };

        var container = {
            cls: 'roo-select2-container input-group',
            cn: [
                currency_box,
                input_box
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

        this.store = new Roo.data.Store({
            proxy : new Roo.data.MemoryProxy({}),
            reader : new Roo.data.JsonReader({
                fields : [
                    {
                        'name' : 'name',
                        'type' : 'string'
                    },
                    {
                        'name' : 'iso2',
                        'type' : 'string'
                    },
                    {
                        'name' : 'dialCode',
                        'type' : 'string'
                    },
                    {
                        'name' : 'priority',
                        'type' : 'string'
                    },
                    {
                        'name' : 'areaCodes',
                        'type' : 'string'
                    }
                ]
            })
        });

        if(!this.preferedCountries) {
            this.preferedCountries = [
                'hk',
                'gb',
                'us'
            ];
        }

        var p = this.preferedCountries.reverse();

        if(p) {
            for (var i = 0; i < p.length; i++) {
                for (var j = 0; j < this.allCountries.length; j++) {
                    if(this.allCountries[j].iso2 == p[i]) {
                        var t = this.allCountries[j];
                        this.allCountries.splice(j,1);
                        this.allCountries.unshift(t);
                    }
                } 
            }
        }

        this.store.proxy.data = {
            success: true,
            data: this.allCountries
        };

        return cfg;
    },
    
    initEvents : function()
    {
        
    }
    
});