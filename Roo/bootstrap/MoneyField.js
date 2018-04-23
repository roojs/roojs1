
/**
 * @class Roo.bootstrap.MoneyField
 * @extends Roo.bootstrap.ComboBox
 * Bootstrap MoneyField class
 * 
 * @constructor
 * Create a new MoneyField.
 * @param {Object} config Configuration options
 */

Roo.bootstrap.MoneyField = function(config) {
    
    Roo.bootstrap.MoneyField.superclass.constructor.call(this, config);
    
};

Roo.extend(Roo.bootstrap.MoneyField, Roo.bootstrap.ComboBox, {
    
    /**
     * @cfg {String} decimalSeparator Character(s) to allow as the decimal separator (defaults to '.')
     */
    decimalSeparator : ".",
    
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
        this.initCurrencyEvent();
        
        this.initInputEvent();
        
    },
    
    initCurrencyEvent : function()
    {
        if (!this.store) {
            throw "can not find store for combo";
        }
        
        this.store = Roo.factory(this.store, Roo.data);
        this.store.parent = this;
        
        this.createList();
        
        this.indicator = this.indicatorEl();
        
        this.triggerEl = this.el.select('.input-group-addon', true).first();
        
        this.triggerEl.on("click", this.onTriggerClick, this, { preventDefault : true });
        
        this.currencyEl = this.el.select('.roo-money-currency-input', true).first();
        
        this.amountEl = this.el.select('.roo-money-amount-input', true).first();
        
        var _this = this;
        
        (function(){
            var lw = _this.listWidth || Math.max(_this.inputEl().getWidth(), _this.minListWidth);
            _this.list.setWidth(lw);
        }).defer(100);
        
        this.list.on('mouseover', this.onViewOver, this);
        this.list.on('mousemove', this.onViewMove, this);
        this.list.on('scroll', this.onViewScroll, this);
        
        if(!this.tpl){
            this.tpl = '<li><a href="#">{' + this.currencyField + '}</a></li>';
        }
        
        this.view = new Roo.View(this.list, this.tpl, {
            singleSelect:true, store: this.store, selectedClass: this.selectedClass
        });
        
        this.view.on('click', this.onViewClick, this);
        
        this.store.on('beforeload', this.onBeforeLoad, this);
        this.store.on('load', this.onLoad, this);
        this.store.on('loadexception', this.onLoadException, this);
        
        this.keyNav = new Roo.KeyNav(this.currencyEl, {
            "up" : function(e){
                this.inKeyMode = true;
                this.selectPrev();
            },

            "down" : function(e){
                if(!this.isExpanded()){
                    this.onTriggerClick();
                }else{
                    this.inKeyMode = true;
                    this.selectNext();
                }
            },

            "enter" : function(e){
                this.collapse();
                
                if(this.fireEvent("specialkey", this, e)){
                    this.onViewClick(false);
                }
                
                return true;
            },

            "esc" : function(e){
                this.collapse();
            },

            "tab" : function(e){
                this.collapse();
                
                if(this.fireEvent("specialkey", this, e)){
                    this.onViewClick(false);
                }
                
                return true;
            },

            scope : this,

            doRelay : function(foo, bar, hname){
                if(hname == 'down' || this.scope.isExpanded()){
                   return Roo.KeyNav.prototype.doRelay.apply(this, arguments);
                }
                return true;
            },

            forceKeyDown: true
        });
        
    },
    
    initInputEvent : function(e)
    {
        var allowed = "0123456789";
        
        if(this.allowDecimals){
            allowed += this.decimalSeparator;
        }
        
        if(this.allowNegative){
            allowed += "-";
        }
        
        this.stripCharsRe = new RegExp('[^'+allowed+']', 'gi');
        
        var keyPress = function(e){
            
            var k = e.getKey();
            
            var c = e.getCharCode();
            
            if(
                    (String.fromCharCode(c) == '.' || String.fromCharCode(c) == '-') &&
                    allowed.indexOf(String.fromCharCode(c)) === -1
            ){
                e.stopEvent();
                return;
            }
            
            if(!Roo.isIE && (e.isSpecialKey() || k == e.BACKSPACE || k == e.DELETE)){
                return;
            }
            
            if(allowed.indexOf(String.fromCharCode(c)) === -1){
                e.stopEvent();
            }
        };
        
        this.el.on("keypress", keyPress, this);
        
        
        
    },
    
    onTriggerClick : function(e)
    {   
        if(this.disabled){
            return;
        }
        
        this.page = 0;
        this.loadNext = false;
        
        if(this.isExpanded()){
            this.collapse();
            return;
        }
        
        this.hasFocus = true;
        
        if(this.triggerAction == 'all') {
            this.doQuery(this.allQuery, true);
            return;
        }
        
        this.doQuery(this.getRawValue());
    },
    
    restrictHeight : function()
    {
        this.list.alignTo(this.currencyEl, this.listAlign);
        this.list.alignTo(this.currencyEl, this.listAlign);
    },
    
    onViewClick : function(view, doFocus, el, e)
    {
        var index = this.view.getSelectedIndexes()[0];
        
        var r = this.store.getAt(index);
        
        if(r){
            this.onSelect(r, index);
        }
    },
    
    setFromData : function(o)
    {
        var currency = '';
        
        this.lastData = o;
        
        if (this.currencyField) {
            currency = !o || typeof(o[this.currencyField]) == 'undefined' ? '' : o[this.currencyField];
        } else {
            Roo.log('no  displayField value set for '+ (this.name ? this.name : this.id));
        }
        
        this.lastSelectionText = currency;
        this.currencyValue = currency;
        
        this.setCurrency(currency);
        
        
    },
    
    setCurrency : function(v)
    {   
        this.currencyValue = v;
        
        if(this.rendered){
            this.currencyEl.dom.value = (v === null || v === undefined ? '' : v);
            this.validate();
        }
    },
    
    validate : function()
    {
        return;
        
        var v = this.getRawValue();
        
        if(this.multiple){
            v = this.getValue();
        }
        
        if(this.disabled || this.allowBlank || v.length){
            this.markValid();
            return true;
        }
        
        this.markInvalid();
        return false;
    },
    
    parseValue : function(value)
    {
        value = parseFloat(String(value).replace(this.decimalSeparator, "."));
        return isNaN(value) ? '' : value;
    },
    
    
});