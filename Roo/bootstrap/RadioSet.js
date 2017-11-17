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
 * @cfg {Boolean} allowblank (true|false) default true
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
    
    allowblank : true,
    
    /**
     * 
     */
    invalidClass : "has-warning",
    
    /**
     * 
     */
    validClass : "has-success",
    
    getAutoCreate : function()
    {
        var cfg = {
            tag : 'div',
            cls : 'roo-radio-set',
            cn : [
                {
                    tag : 'label',
                    cls : 'roo-radio-set-field-label',
                    cn : [
                        {
                            tag : 'span',
                            cls : 'roo-radio-set-field-label-text',
                            html : this.fieldLabel
                        }
                    ]
                },
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
        Roo.log('init radio set');
        
        this.fieldLabelEl = this.el.select('.roo-radio-set-field-label', true).first();
        this.fieldLabelEl.setVisibilityMode(Roo.Element.DISPLAY);
        
        this.itemsEl = this.el.select('.roo-radio-set-items', true).first();
        this.itemsEl.setVisibilityMode(Roo.Element.DISPLAY);
        
    },
    
    getChildContainer : function()
    {
        return this.itemsEl;
    },
    
    register : function(item)
    {
        Roo.log('radio set register');
        
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
//            this.markValid();
            Roo.log('mark valid');
            return true;
        }
        
        Roo.log('mark invalid');
//        this.markInvalid();
        return false;
        
    },
    
    markValid : function()
    {
        this.fireEvent('valid', this);
        
        Roo.each(this.items, function(i){
            i.removeClass([this.invalidClass, this.validClass]);
            i.addClass(this.validClass);
        }, this);
        
        var label = Roo.bootstrap.FieldLabel.get(this.name + '-group');
        
        if(this.groupId){
            label = Roo.bootstrap.FieldLabel.get(this.groupId + '-group');
        }
        
        if(label){
            label.markValid();
        }

        if(this.inputType == 'radio'){
            Roo.each(this.el.up('form').select('input[name='+this.name+']', true).elements, function(e){
                e.findParent('.form-group', false, true).removeClass([_this.invalidClass, _this.validClass]);
                e.findParent('.form-group', false, true).addClass(_this.validClass);
            });
            
            return;
        }
        
        if(!this.groupId){
            this.el.findParent('.form-group', false, true).removeClass([this.invalidClass, this.validClass]);
            this.el.findParent('.form-group', false, true).addClass(this.validClass);
            return;
        }
        
        var group = Roo.bootstrap.CheckBox.get(this.groupId);
            
        if(!group){
            return;
        }
        
        for(var i in group){
            group[i].el.findParent('.form-group', false, true).removeClass([this.invalidClass, this.validClass]);
            group[i].el.findParent('.form-group', false, true).addClass(this.validClass);
        }
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
