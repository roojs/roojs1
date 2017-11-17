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
 * @cfg {Boolean} disabled is it disabled
 * @cfg {String} name name of the radio
 * @cfg {String} fieldLabel - the label associated
 * @cfg {String} value default value of the input
 * @cfg {Number} labelWidth set the width of label (0-12)
 * @cfg {String} labelAlign (top|left)
 * @cfg {String} indicatorpos (left|right) default left
 * @cfg {Boolean} inline (true|false) inline the element (default true)
 * @cfg {String} weight (primary|warning|info|danger|success) The text that appears beside the radio
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
        
        item.el.attr('name', this.name);
        
        if(this.inline){
            item.el.addClass('radio-inline');
        }
        
    },
    
    validate : function()
    {
        if(this.disabled || this.allowBlank){
            this.markValid();
            Roo.log('mark valid');
            return true;
        }
        
        
        
//        var valid = false;
//        
//        Roo.each(this.el.up('form').select('input[name='+this.name+']', true).elements, function(e){
//            if(!e.dom.checked){
//                return;
//            }
//            
//            valid = true;
//            
//            return false;
//        });
//        
//        this.markInvalid();
//        return false;
    }

});
