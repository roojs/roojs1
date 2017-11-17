/*
 * - LGPL
 *
 * RadioItem
 * 
 */

/**
 * @class Roo.bootstrap.RadioItem
 * @extends Roo.bootstrap.Component
 * Bootstrap RadioItem class
 * @cfg {String} boxLabel - the label associated
 * @cfg {String} value - the value of radio
 * 
 * @constructor
 * Create a new RadioItem
 * @param {Object} config The config object
 */
Roo.bootstrap.RadioItem = function(config){
    Roo.bootstrap.RadioItem.superclass.constructor.call(this, config);
    
};

Roo.extend(Roo.bootstrap.RadioItem, Roo.bootstrap.Component,  {
    
    boxLabel : '',
    value : '',
    
    getAutoCreate : function()
    {
        var cfg = {
                tag : 'div',
                cls : 'form-group radio roo-radio-set-item',
                cn : [
                    {
                        tag : 'input',
                        cls : 'roo-radio roo-radio-set-item-input',
                        type : 'radio',
                        value : this.value,
                    },
                    {
                        tag : 'label',
                        cls : 'box-label roo-radio-set-item-box-label',
                        html : this.boxLabel
                    }
                ]
        };
        
        return cfg;
    },
    
    initEvents : function() 
    {
        this.parent().register(this);
    },
    
    inputEl : function()
    {
        return this.el.select('roo-radio-set-item-input', true).first();
    }
});
 

 