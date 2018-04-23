
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
            cls: 'form-group'
        };
        
        var input =  {
            tag: 'input',
            id : id,
            cls : 'form-control',
            autocomplete: 'new-password'
        };
        
        
        
        var input =  {
            tag: 'input',
            cls : 'form-control amount-input',
            autocomplete: 'new-password'
        };
        
        var hiddenInput = {
            tag: 'input',
            type: 'hidden',
            cls: 'hidden-amount-input'
        };
        
        if (this.name) {
            hiddenInput.name = this.name;
        }
        
        if (this.disabled) {
            input.disabled = true;
        }
        
        
            
    }
});