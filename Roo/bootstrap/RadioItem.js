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
 * 
 * @constructor
 * Create a new RadioItem
 * @param {Object} config The config object
 */
Roo.bootstrap.RadioItem = function(config){
    Roo.bootstrap.RadioItem.superclass.constructor.call(this, config);
    
};

Roo.extend(Roo.bootstrap.RadioItem, Roo.bootstrap.Component,  {
    
    getAutoCreate : function()
    {
        var cfg = {
            tag : 'div',
            cls : 'roo-radio-item',
            cn : [
                {
                    tag : 'label',
                    cls : 'roo-radio-set-field-label',
                    cn : [
                        {
                            tag : 'span',
                            cls : 'roo-radio-set-field-label-text',
                            html : (this.fieldLabel.length) ? this.fieldLabel : ''
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
    
    initEvents: function() 
    {
        
    }
});
 

 