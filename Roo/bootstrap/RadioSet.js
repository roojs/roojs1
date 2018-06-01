/*
 * - LGPL
 *
 * RadioSet
 *
 *
 */

/**
 * @class Roo.bootstrap.RadioSet
 * @extends Roo.bootstrap.Input
 * Bootstrap RadioSet class
 * @cfg {String} indicatorpos (left|right) default left
 * @cfg {Boolean} inline (true|false) inline the element (default true)
 * @cfg {String} weight (primary|warning|info|danger|success) The text that appears beside the radio
 * @constructor
 * Create a new RadioSet
 * @param {Object} config The config object
 */

Roo.bootstrap.RadioSet = function(config){
    
    Roo.bootstrap.RadioSet.superclass.constructor.call(this, config);
    
    this.radioes = [];
    
    Roo.bootstrap.RadioSet.register(this);
    
    this.addEvents({
        /**
        * @event check
        * Fires when the element is checked or unchecked.
        * @param {Roo.bootstrap.RadioSet} this This radio
        * @param {Roo.bootstrap.Radio} item The checked item
        */
       check : true
    });
    
};

Roo.extend(Roo.bootstrap.RadioSet, Roo.bootstrap.Input,  {

    radioes : false,
    
    inline : true,
    
    weight : '',
    
    indicatorpos : 'left',
    
    getAutoCreate : function()
    {
        var label = {
            tag : 'label',
            cls : 'roo-radio-set-label',
            cn : [
                {
                    tag : 'span',
                    html : this.fieldLabel
                }
            ]
        };
        
        if(this.indicatorpos == 'left'){
            label.cn.unshift({
                tag : 'i',
                cls : 'roo-required-indicator left-indicator text-danger fa fa-lg fa-star',
                tooltip : 'This field is required'
            });
        } else {
            label.cn.push({
                tag : 'i',
                cls : 'roo-required-indicator right-indicator text-danger fa fa-lg fa-star',
                tooltip : 'This field is required'
            });
        }
        
        var items = {
            tag : 'div',
            cls : 'roo-radio-set-items'
        };
        
        var align = (!this.labelAlign) ? this.parentLabelAlign() : this.labelAlign;
        
        if (align === 'left' && this.fieldLabel.length) {
            
            items = {
                cls : "roo-radio-set-right", 
                cn: [
                    items
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
                items.cls += ' col-lg-' + (12 - this.labellg);
            }
            
            if(this.labelmd > 0){
                label.cls += ' col-md-' + this.labelmd;
                items.cls += ' col-md-' + (12 - this.labelmd);
            }
            
            if(this.labelsm > 0){
                label.cls += ' col-sm-' + this.labelsm;
                items.cls += ' col-sm-' + (12 - this.labelsm);
            }
            
            if(this.labelxs > 0){
                label.cls += ' col-xs-' + this.labelxs;
                items.cls += ' col-xs-' + (12 - this.labelxs);
            }
        }
        
        var cfg = {
            tag : 'div',
            cls : 'roo-radio-set',
            cn : [
                {
                    tag : 'input',
                    cls : 'roo-radio-set-input',
                    type : 'hidden',
                    name : this.name,
                    value : this.value ? this.value :  ''
                },
                label,
                items
            ]
        };
        
        if(this.weight.length){
            cfg.cls += ' roo-radio-' + this.weight;
        }
        
        if(this.inline) {
            cfg.cls += ' roo-radio-set-inline';
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
        this.labelEl = this.el.select('.roo-radio-set-label', true).first();
        this.labelEl.setVisibilityMode(Roo.Element.DISPLAY);
        
        if(!this.fieldLabel.length){
            this.labelEl.hide();
        }
        
        this.itemsEl = this.el.select('.roo-radio-set-items', true).first();
        this.itemsEl.setVisibilityMode(Roo.Element.DISPLAY);
        
        this.indicatorEl().addClass('invisible');
        
        this.originalValue = this.getValue();
        
    },
    
    inputEl: function ()
    {
        return this.el.select('.roo-radio-set-input', true).first();
    },
    
    getChildContainer : function()
    {
        return this.itemsEl;
    },
    
    register : function(item)
    {
        this.radioes.push(item);
        
    },
    
    validate : function()
    {   
        var valid = false;
        
        Roo.each(this.radioes, function(i){
            if(!i.checked){
                return;
            }
            
            valid = true;
            return false;
        });
        
        if(this.allowBlank) {
            return true;
        }
        
        if(this.disabled || valid){
            this.markValid();
            return true;
        }
        
        this.markInvalid();
        return false;
        
    },
    
    markValid : function()
    {
        if(this.labelEl.isVisible(true)){
            this.indicatorEl().removeClass('visible');
            this.indicatorEl().addClass('invisible');
        }
        
        this.el.removeClass([this.invalidClass, this.validClass]);
        this.el.addClass(this.validClass);
        
        this.fireEvent('valid', this);
    },
    
    markInvalid : function(msg)
    {
        if(this.allowBlank || this.disabled){
            return;
        }
        
        if(this.labelEl.isVisible(true)){
            this.indicatorEl().removeClass('invisible');
            this.indicatorEl().addClass('visible');
        }
        
        this.el.removeClass([this.invalidClass, this.validClass]);
        this.el.addClass(this.invalidClass);
        
        this.fireEvent('invalid', this, msg);
        
    },
    
    setValue : function(v, suppressEvent)
    {   
        if(this.value === v){
            return;
        }
        
        this.value = v;
        
        if(this.rendered){
            this.inputEl().dom.value = (v === null || v === undefined ? '' : v);
        }
        
        Roo.each(this.radioes, function(i){
            
            i.checked = false;
            i.el.removeClass('checked');
            
            if(i.value === v || i.value.toString() === v.toString()){
                i.checked = true;
                i.el.addClass('checked');
                
                Roo.log(suppressEvent);
                
                if(suppressEvent !== true){
                    this.fireEvent('check', this, i);
                }
            }
            
        }, this);
        
        this.validate();
    },
    
    clearInvalid : function(){
        
        if(!this.el || this.preventMark){
            return;
        }
        
        this.el.removeClass([this.invalidClass]);
        
        this.fireEvent('valid', this);
    }
    
});

Roo.apply(Roo.bootstrap.RadioSet, {
    
    groups: {},
    
    register : function(set)
    {
        this.groups[set.name] = set;
    },
    
    get: function(name) 
    {
        if (typeof(this.groups[name]) == 'undefined') {
            return false;
        }
        
        return this.groups[name] ;
    }
    
});
