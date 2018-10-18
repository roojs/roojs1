
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
     * @cfg {Boolean} allowDecimals False to disallow decimal values (defaults to true)
     */
    allowDecimals : true,
    /**
     * @cfg {String} decimalSeparator Character(s) to allow as the decimal separator (defaults to '.')
     */
    decimalSeparator : ".",
    /**
     * @cfg {Number} decimalPrecision The maximum precision to display after the decimal separator (defaults to 2)
     */
    decimalPrecision : 0,
    /**
     * @cfg {Boolean} allowNegative False to prevent entering a negative sign (defaults to true)
     */
    allowNegative : true,
    /**
     * @cfg {Boolean} allowZero False to blank out if the user enters '0' (defaults to true)
     */
    allowZero: true,
    /**
     * @cfg {Number} minValue The minimum allowed value (defaults to Number.NEGATIVE_INFINITY)
     */
    minValue : Number.NEGATIVE_INFINITY,
    /**
     * @cfg {Number} maxValue The maximum allowed value (defaults to Number.MAX_VALUE)
     */
    maxValue : Number.MAX_VALUE,
    /**
     * @cfg {String} minText Error text to display if the minimum value validation fails (defaults to "The minimum value for this field is {minValue}")
     */
    minText : "The minimum value for this field is {0}",
    /**
     * @cfg {String} maxText Error text to display if the maximum value validation fails (defaults to "The maximum value for this field is {maxValue}")
     */
    maxText : "The maximum value for this field is {0}",
    /**
     * @cfg {String} nanText Error text to display if the value is not a valid number.  For example, this can happen
     * if a valid character like '.' or '-' is left in the field with no number (defaults to "{value} is not a valid number")
     */
    nanText : "{0} is not a valid number",
    /**
     * @cfg {Boolean} castInt (true|false) cast int if true (defalut true)
     */
    castInt : true,
    /**
     * @cfg {String} defaults currency of the MoneyField
     * value should be in lkey
     */
    defaultCurrency : false,
    /**
     * @cfg {String} thousandsDelimiter Symbol of thousandsDelimiter
     */
    thousandsDelimiter : false,
    
    
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
        
        var hiddenInput = {
            tag: 'input',
            type: 'hidden',
            id: Roo.id(),
            cls: 'hidden-number-input'
        };
        
        if(
            this.max_length &&
            Number.isInteger(this.max_length * 1)
        ) {
            input.maxlength = this.max_length; 
        }
        
        if (this.name) {
            hiddenInput.name = this.name;
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
                                    autocomplete: 'new-password',
                                    readOnly : 1,
                                    name : this.currencyName
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
            container,
            hiddenInput
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
        this.indicator = this.indicatorEl();
        
        this.initCurrencyEvent();
        
        this.initNumberEvent();
    },
    
    initCurrencyEvent : function()
    {
        if (!this.store) {
            throw "can not find store for combo";
        }
        
        this.store = Roo.factory(this.store, Roo.data);
        this.store.parent = this;
        
        this.createList();
        
        this.triggerEl = this.el.select('.input-group-addon', true).first();
        
        this.triggerEl.on("click", this.onTriggerClick, this, { preventDefault : true });
        
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
        
        this.keyNav = new Roo.KeyNav(this.currencyEl(), {
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
        
        this.currencyEl().on("click", this.onTriggerClick, this, { preventDefault : true });
        
    },
    
    initNumberEvent : function(e)
    {
        this.inputEl().on("keydown" , this.fireKey,  this);
        this.inputEl().on("focus", this.onFocus,  this);
        this.inputEl().on("blur", this.onBlur,  this);
        
        this.inputEl().relayEvent('keyup', this);
        
        if(this.indicator){
            this.indicator.addClass('invisible');
        }
 
        this.originalValue = this.getValue();
        
        if(this.validationEvent == 'keyup'){
            this.validationTask = new Roo.util.DelayedTask(this.validate, this);
            this.inputEl().on('keyup', this.filterValidation, this);
        }
        else if(this.validationEvent !== false){
            this.inputEl().on(this.validationEvent, this.validate, this, {buffer: this.validationDelay});
        }
        
        if(this.selectOnFocus){
            this.on("focus", this.preFocus, this);
            
        }
        if(this.maskRe || (this.vtype && this.disableKeyFilter !== true && (this.maskRe = Roo.form.VTypes[this.vtype+'Mask']))){
            this.inputEl().on("keypress", this.filterKeys, this);
        } else {
            this.inputEl().relayEvent('keypress', this);
        }
        
        var allowed = "0123456789";
        
        if(this.allowDecimals){
            allowed += this.decimalSeparator;
        }
        
        if(this.allowNegative){
            allowed += "-";
        }
        
        if(this.thousandsDelimiter) {
            allowed += ",";
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
        
        this.inputEl().on("keypress", keyPress, this);
        
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
    
    getCurrency : function()
    {   
        var v = this.currencyEl().getValue();
        
        return v;
    },
    
    restrictHeight : function()
    {
        this.list.alignTo(this.currencyEl(), this.listAlign);
        this.list.alignTo(this.currencyEl(), this.listAlign);
    },
    
    onViewClick : function(view, doFocus, el, e)
    {
        var index = this.view.getSelectedIndexes()[0];
        
        var r = this.store.getAt(index);
        
        if(r){
            this.onSelect(r, index);
        }
    },
    
    onSelect : function(record, index){
        
        if(this.fireEvent('beforeselect', this, record, index) !== false){
        
            this.setFromCurrencyData(index > -1 ? record.data : false);
            
            this.collapse();
            
            this.fireEvent('select', this, record, index);
        }
    },
    
    setFromCurrencyData : function(o)
    {
        var currency = '';
        
        this.lastCurrency = o;
        
        if (this.currencyField) {
            currency = !o || typeof(o[this.currencyField]) == 'undefined' ? '' : o[this.currencyField];
        } else {
            Roo.log('no  currencyField value set for '+ (this.name ? this.name : this.id));
        }
        
        this.lastSelectionText = currency;
        
        //setting default currency
        if(o[this.currencyField] * 1 == 0 && this.defaultCurrency) {
            this.setCurrency(this.defaultCurrency);
            return;
        }
        
        this.setCurrency(currency);
    },
    
    setFromData : function(o)
    {
        var c = {};
        
        c[this.currencyField] = !o || typeof(o[this.currencyName]) == 'undefined' ? '' : o[this.currencyName];
        
        this.setFromCurrencyData(c);
        
        var value = '';
        
        if (this.name) {
            value = !o || typeof(o[this.name]) == 'undefined' ? '' : o[this.name];
        } else {
            Roo.log('no value set for '+ (this.name ? this.name : this.id));
        }
        
        this.setValue(value);
        
    },
    
    setCurrency : function(v)
    {   
        this.currencyValue = v;
        
        if(this.rendered){
            this.currencyEl().dom.value = (v === null || v === undefined ? '' : v);
            this.validate();
        }
    },
    
    setValue : function(v)
    {
        v = String(this.fixPrecision(v)).replace(".", this.decimalSeparator);
        
        this.value = v;
        
        if(this.rendered){
            
            this.hiddenEl().dom.value = (v === null || v === undefined ? '' : v);
            
            this.inputEl().dom.value = (v == '') ? '' :
                Roo.util.Format.number(v, this.decimalPrecision, this.thousandsDelimiter || '');
            
            if(!this.allowZero && v === '0') {
                this.hiddenEl().dom.value = '';
                this.inputEl().dom.value = '';
            }
            
            this.validate();
        }
    },
    
    getRawValue : function()
    {
        var v = this.inputEl().getValue();
        
        return v;
    },
    
    getValue : function()
    {
        return this.fixPrecision(this.parseValue(this.getRawValue()));
    },
    
    parseValue : function(value)
    {
        if(this.thousandsDelimiter) {
            value += "";
            r = new RegExp(",", "g");
            value = value.replace(r, "");
        }
        
        value = parseFloat(String(value).replace(this.decimalSeparator, "."));
        return isNaN(value) ? '' : value;
        
    },
    
    fixPrecision : function(value)
    {
        if(this.thousandsDelimiter) {
            value += "";
            r = new RegExp(",", "g");
            value = value.replace(r, "");
        }
        
        var nan = isNaN(value);
        
        if(!this.allowDecimals || this.decimalPrecision == -1 || nan || !value){
            return nan ? '' : value;
        }
        return parseFloat(value).toFixed(this.decimalPrecision);
    },
    
    decimalPrecisionFcn : function(v)
    {
        return Math.floor(v);
    },
    
    validateValue : function(value)
    {
        if(!Roo.bootstrap.MoneyField.superclass.validateValue.call(this, value)){
            return false;
        }
        
        var num = this.parseValue(value);
        
        if(isNaN(num)){
            this.markInvalid(String.format(this.nanText, value));
            return false;
        }
        
        if(num < this.minValue){
            this.markInvalid(String.format(this.minText, this.minValue));
            return false;
        }
        
        if(num > this.maxValue){
            this.markInvalid(String.format(this.maxText, this.maxValue));
            return false;
        }
        
        return true;
    },
    
    validate : function()
    {
        if(this.disabled || this.allowBlank){
            this.markValid();
            return true;
        }
        
        var currency = this.getCurrency();
        
        if(this.validateValue(this.getRawValue()) && currency.length){
            this.markValid();
            return true;
        }
        
        this.markInvalid();
        return false;
    },
    
    getName: function()
    {
        return this.name;
    },
    
    beforeBlur : function()
    {
        if(!this.castInt){
            return;
        }
        
        var v = this.parseValue(this.getRawValue());
        
        if(v || v == 0){
            this.setValue(v);
        }
    },
    
    onBlur : function()
    {
        this.beforeBlur();
        
        if(!Roo.isOpera && this.focusClass){ // don't touch in Opera
            //this.el.removeClass(this.focusClass);
        }
        
        this.hasFocus = false;
        
        if(this.validationEvent !== false && this.validateOnBlur && this.validationEvent != "blur"){
            this.validate();
        }
        
        var v = this.getValue();
        
        if(String(v) !== String(this.startValue)){
            this.fireEvent('change', this, v, this.startValue);
        }
        
        this.fireEvent("blur", this);
    },
    
    inputEl : function()
    {
        return this.el.select('.roo-money-amount-input', true).first();
    },
    
    currencyEl : function()
    {
        return this.el.select('.roo-money-currency-input', true).first();
    },
    
    hiddenEl : function()
    {
        return this.el.select('input.hidden-number-input',true).first();
    }
    
});