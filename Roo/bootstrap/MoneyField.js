
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
            cls : 'form-control money-input',
            autocomplete: 'new-password'
        };
        
        var hiddenInput = {
            tag: 'input',
            type: 'hidden',
            cls: 'hidden-money-input'
        };
        
        if (this.name) {
            hiddenInput.name = this.name;
        }

        if (this.disabled) {
            input.disabled = true;
        }
        
        
            
            
        
        return cfg;
            
    },
    
    initEvents : function()
    {
        
    }
    
});