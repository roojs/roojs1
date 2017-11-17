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
                cls : 'form-group roo-radio-set-item',
                cn : [
                    {
                        tag : 'input',
                        cls : 'roo-'
                        type : 'radio',
                        value : this.value,
                    },
                    {
                        tag : 'label',
                        cls : 'radio-item-box-label',
                        html : this.boxLabel
                    }
                ]
        };
        
        return cfg;
    },
    
    initEvents: function() 
    {
        
    }
});
 

 