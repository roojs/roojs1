/*
 * - LGPL
 *
 * RadioSet
 *
 *
 */

/**
 * @class Roo.bootstrap.RadioSet
 * @extends Roo.bootstrap.Component
 * Bootstrap RadioSet class
 * @cfg {Boolean} disabled (true|false) default false
 * @cfg {Boolean} allowBlank (true|false) default true
 * @cfg {String} name name of the radio
 * @cfg {String} fieldLabel - the label associated
 * @cfg {String} value default value of the input
 * @cfg {Number} labelWidth set the width of label (0-12)
 * @cfg {String} labelAlign (top|left)
 * @cfg {String} indicatorpos (left|right) default left
 * @cfg {Boolean} inline (true|false) inline the element (default true)
 * @cfg {String} weight (primary|warning|info|danger|success) The text that appears beside the radio
 * @cfg {String} invalidClass The CSS class to use when marking a field invalid
 * @cfg {String} validClass The CSS class to use when marking a field valid
 * @constructor
 * Create a new RadioSet
 * @param {Object} config The config object
 */

Roo.bootstrap.RadioSet = function(config){
    
    Roo.bootstrap.RadioSet.superclass.constructor.call(this, config);

    this.itmes = [];
    
    Roo.bootstrap.RadioSet.register(this);
    
};

Roo.extend(Roo.bootstrap.RadioSet, Roo.bootstrap.Component,  {

    items : false,
    
    inline : true,
    
    name : '',
    
    weight : '',
    
    fieldLabel : '',
    
    disabled : false,
    
    allowBlank : true,
    
    invalidClass : 'has-warning',
    
    validClass : 'has-success',
    
    indicatorpos : 'left',
    
    getAutoCreate : function()
    {
        var label = {
            tag : 'label',
            cls : 'roo-radio-set-field-label',
            cn : [
                {
                    tag : 'span',
                    cls : 'roo-radio-set-field-label-text',
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
                cls : 'roo-required-indicator left-indicator text-danger fa fa-lg fa-star',
                tooltip : 'This field is required'
            });
        }
        
        var cfg = {
            tag : 'div',
            cls : 'roo-radio-set',
            cn : [
                label,
                {
                    tag : 'div',
                    cls : 'roo-radio-set-items'
                }
            ]
        };
        
        
        
        return cfg;
        
    },

    initEvents : function()
    {
        this.fieldLabelEl = this.el.select('.roo-radio-set-field-label', true).first();
        this.fieldLabelEl.setVisibilityMode(Roo.Element.DISPLAY);
        
        this.itemsEl = this.el.select('.roo-radio-set-items', true).first();
        this.itemsEl.setVisibilityMode(Roo.Element.DISPLAY);
        
        this.indicatorEl = this.el.select('.roo-required-indicator', true).first();
        this.indicatorEl.setVisibilityMode(Roo.Element.DISPLAY);
        this.indicatorEl.hide();
        
    },
    
    getChildContainer : function()
    {
        return this.itemsEl;
    },
    
    register : function(item)
    {
        this.items.push(item);
        
        item.inputEl().attr('name', this.name);
        
        if(this.inline){
            item.el.addClass('radio-inline');
        }
        
    },
    
    validate : function()
    {   
        var valid = false;
        
        Roo.each(this.items, function(i){
            if(!i.checked){
                return;
            }
            
            valid = true;
            return false;
        });
        
        if(this.disabled || this.allowBlank || valid){
            this.markValid();
            return true;
        }
        
        this.markInvalid();
        return false;
        
    },
    
    markValid : function()
    {
        this.indicatorEl.hide();
        this.el.removeClass([this.invalidClass, this.validClass]);
        this.el.addClass(this.validClass);
        
        this.fireEvent('valid', this);
    },
    
    markInvalid : function(msg)
    {
        if(this.allowBlank || this.disabled){
            return;
        }
        
        this.indicatorEl.show();
        this.el.removeClass([this.invalidClass, this.validClass]);
        this.el.addClass(this.invalidClass);
        
        this.fireEvent('invalid', this, msg);
        
    },

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
