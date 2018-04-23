
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
            cls : 'form-control roo-money-input',
            autocomplete: 'new-password'
        };
        
        if (this.name) {
            input.name = this.name;
        }
        
        
        
            
    },
    
    initEvents : function()
    {
        
    }
    
});