/**
*    This script refer to:
*    Title: International Telephone Input
*    Author: Jack O'Connor
*    Code version:  v12.1.12
*    Availability: https://github.com/jackocnr/intl-tel-input.git
**/

/**
 * @class Roo.bootstrap.form.PhoneInput
 * @extends Roo.bootstrap.form.TriggerField
 * An input with International dial-code selection
 
 * @cfg {String} defaultDialCode default '+852'
 * @cfg {Array} preferedCountries default []
  
 * @constructor
 * Create a new PhoneInput.
 * @param {Object} config Configuration options
 */

Roo.bootstrap.form.PhoneInput = function(config) {
    Roo.log(config);
    Roo.bootstrap.form.PhoneInput.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.form.PhoneInput, Roo.bootstrap.form.TriggerField, {
        /**
        * @cfg {Roo.data.Store} store [required] The data store to which this combo is bound (defaults to undefined)
        */
        listWidth: undefined,
        
        selectedClass: 'active',
        
        invalidClass : "has-warning",
        
        validClass: 'has-success',
        
        allowed: '0123456789',
        
        max_length: 15,
        
        /**
         * @cfg {String} defaultDialCode The default dial code when initializing the input
         */
        defaultDialCode: '+852',
        
        /**
         * @cfg {Array} preferedCountries A list of iso2 in array (e.g. ['hk','us']). Those related countries will show at the top of the input's choices
         */
        preferedCountries: false,
        
        getAutoCreate : function()
        {
            var data = Roo.bootstrap.form.PhoneInputData();
            var align = this.labelAlign || this.parentLabelAlign();
            var id = Roo.id();
            
            this.allCountries = [];
            this.dialCodeMapping = [];
            
            for (var i = 0; i < data.length; i++) {
              var c = data[i];
              this.allCountries[i] = {
                name: c[0],
                iso2: c[1],
                dialCode: c[2],
                priority: c[3] || 0,
                areaCodes: c[4] || null
              };
              this.dialCodeMapping[c[2]] = {
                  name: c[0],
                  iso2: c[1],
                  priority: c[3] || 0,
                  areaCodes: c[4] || null
              };
            }
            
            var cfg = {
                cls: 'form-group',
                cn: []
            };
            
            var input =  {
                tag: 'input',
                id : id,
                // type: 'number', -- do not use number - we get the flaky up/down arrows.
                maxlength: this.max_length,
                cls : 'form-control tel-input',
                autocomplete: 'new-password'
            };
            
            var hiddenInput = {
                tag: 'input',
                type: 'hidden',
                cls: 'hidden-tel-input'
            };
            
            if (this.name) {
                hiddenInput.name = this.name;
            }
            
            if (this.disabled) {
                input.disabled = true;
            }
            
            var flag_container = {
                tag: 'div',
                cls: 'flag-box',
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
                    hiddenInput,
                    input,
                    {
                        tag: 'input',
                        cls: 'dial-code-holder',
                        disabled: true
                    }
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
            this.createList();
            Roo.bootstrap.form.PhoneInput.superclass.initEvents.call(this);
            
            this.indicator = this.indicatorEl();
            this.flag = this.flagEl();
            this.dialCodeHolder = this.dialCodeHolderEl();
            
            this.trigger = this.el.select('div.flag-box',true).first();
            this.trigger.on("click", this.onTriggerClick, this, {preventDefault:true});
            
            var _this = this;
            
            (function(){
                var lw = _this.listWidth || Math.max(_this.inputEl().getWidth(), _this.minListWidth);
                _this.list.setWidth(lw);
            }).defer(100);
            
            this.list.on('mouseover', this.onViewOver, this);
            this.list.on('mousemove', this.onViewMove, this);
            this.inputEl().on("keyup", this.onKeyUp, this);
            this.inputEl().on("keypress", this.onKeyPress, this);
            
            this.tpl = '<li><a href="#"><div class="flag {iso2}"></div>{name} <span class="dial-code">+{dialCode}</span></a></li>';

            this.view = new Roo.View(this.list, this.tpl, {
                singleSelect:true, store: this.store, selectedClass: this.selectedClass
            });
            
            this.view.on('click', this.onViewClick, this);
            this.setValue(this.defaultDialCode);
        },
        
        onTriggerClick : function(e)
        {
            Roo.log('trigger click');
            if(this.disabled){
                return;
            }
            
            if(this.isExpanded()){
                this.collapse();
                this.hasFocus = false;
            }else {
                this.store.load({});
                this.hasFocus = true;
                this.expand();
            }
        },
        
        isExpanded : function()
        {
            return this.list.isVisible();
        },
        
        collapse : function()
        {
            if(!this.isExpanded()){
                return;
            }
            this.list.hide();
            Roo.get(document).un('mousedown', this.collapseIf, this);
            Roo.get(document).un('mousewheel', this.collapseIf, this);
            this.fireEvent('collapse', this);
            this.validate();
        },
        
        expand : function()
        {
            Roo.log('expand');

            if(this.isExpanded() || !this.hasFocus){
                return;
            }
            
            var lw = this.listWidth || Math.max(this.inputEl().getWidth(), this.minListWidth);
            this.list.setWidth(lw);
            
            this.list.show();
            this.restrictHeight();
            
            Roo.get(document).on('mousedown', this.collapseIf, this);
            Roo.get(document).on('mousewheel', this.collapseIf, this);
            
            this.fireEvent('expand', this);
        },
        
        restrictHeight : function()
        {
            this.list.alignTo(this.inputEl(), this.listAlign);
            this.list.alignTo(this.inputEl(), this.listAlign);
        },
        
        onViewOver : function(e, t)
        {
            if(this.inKeyMode){
                return;
            }
            var item = this.view.findItemFromChild(t);
            
            if(item){
                var index = this.view.indexOf(item);
                this.select(index, false);
            }
        },

        // private
        onViewClick : function(view, doFocus, el, e)
        {
            var index = this.view.getSelectedIndexes()[0];
            
            var r = this.store.getAt(index);
            
            if(r){
                this.onSelect(r, index);
            }
            if(doFocus !== false && !this.blockFocus){
                this.inputEl().focus();
            }
        },
        
        onViewMove : function(e, t)
        {
            this.inKeyMode = false;
        },
        
        select : function(index, scrollIntoView)
        {
            this.selectedIndex = index;
            this.view.select(index);
            if(scrollIntoView !== false){
                var el = this.view.getNode(index);
                if(el){
                    this.list.scrollChildIntoView(el, false);
                }
            }
        },
        
        createList : function()
        {
            this.list = Roo.get(document.body).createChild({
                tag: 'ul',
                cls: 'typeahead typeahead-long dropdown-menu tel-list',
                style: 'display:none'
            });
            
            this.list.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        },
        
        collapseIf : function(e)
        {
            var in_combo  = e.within(this.el);
            var in_list =  e.within(this.list);
            var is_list = (Roo.get(e.getTarget()).id == this.list.id) ? true : false;
            
            if (in_combo || in_list || is_list) {
                return;
            }
            this.collapse();
        },
        
        onSelect : function(record, index)
        {
            if(this.fireEvent('beforeselect', this, record, index) !== false){
                
                this.setFlagClass(record.data.iso2);
                this.setDialCode(record.data.dialCode);
                this.hasFocus = false;
                this.collapse();
                this.fireEvent('select', this, record, index);
            }
        },
        
        flagEl : function()
        {
            var flag = this.el.select('div.flag',true).first();
            if(!flag){
                return false;
            }
            return flag;
        },
        
        dialCodeHolderEl : function()
        {
            var d = this.el.select('input.dial-code-holder',true).first();
            if(!d){
                return false;
            }
            return d;
        },
        
        setDialCode : function(v)
        {
            this.dialCodeHolder.dom.value = '+'+v;
        },
        
        setFlagClass : function(n)
        {
            this.flag.dom.className = 'flag '+n;
        },
        
        getValue : function()
        {
            var v = this.inputEl().getValue();
            if(this.dialCodeHolder) {
                v = this.dialCodeHolder.dom.value+this.inputEl().getValue();
            }
            return v;
        },
        
        setValue : function(v)
        {
            var d = this.getDialCode(v);
            
            //invalid dial code
            if(v.length == 0 || !d || d.length == 0) {
                if(this.rendered){
                    this.inputEl().dom.value = (v === null || v === undefined ? '' : v);
                    this.hiddenEl().dom.value = (v === null || v === undefined ? '' : v);
                }
                return;
            }
            
            //valid dial code
            this.setFlagClass(this.dialCodeMapping[d].iso2);
            this.setDialCode(d);
            this.inputEl().dom.value = v.replace('+'+d,'');
            this.hiddenEl().dom.value = this.getValue();
            
            this.validate();
        },
        
        getDialCode : function(v)
        {
            v = v ||  '';
            
            if (v.length == 0) {
                return this.dialCodeHolder.dom.value;
            }
            
            var dialCode = "";
            if (v.charAt(0) != "+") {
                return false;
            }
            var numericChars = "";
            for (var i = 1; i < v.length; i++) {
              var c = v.charAt(i);
              if (!isNaN(c)) {
                numericChars += c;
                if (this.dialCodeMapping[numericChars]) {
                  dialCode = v.substr(1, i);
                }
                if (numericChars.length == 4) {
                  break;
                }
              }
            }
            return dialCode;
        },
        
        reset : function()
        {
            this.setValue(this.defaultDialCode);
            this.validate();
        },
        
        hiddenEl : function()
        {
            return this.el.select('input.hidden-tel-input',true).first();
        },
        
        // after setting val
        onKeyUp : function(e){
            this.setValue(this.getValue());
        },
        
        onKeyPress : function(e){
            if(this.allowed.indexOf(String.fromCharCode(e.getCharCode())) === -1){
                e.stopEvent();
            }
        }
        
});