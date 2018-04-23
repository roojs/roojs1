
/**
 * @class Roo.bootstrap.MoneyField
 * @extends Roo.bootstrap.TriggerField
 * Bootstrap MoneyField class
 * 
 * @constructor
 * Create a new MoneyField.
 * @param {Object} config Configuration options
 */

Roo.bootstrap.MoneyField = function(config) {
    Roo.bootstrap.MoneyField.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.MoneyField, Roo.bootstrap.TriggerField, {
    
    getChildContainer : function() 
    {
        return this.el;  
    },
    
    getAutoCreate : function()
    {
        var cfg = {
            cls: 'form-group'
        };
        
        return cfg;
    },
    
    initEvents : function()
    {
        
    }
    
});