
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
        
        if (this.name) {
            input.name = this.name;
        }
        
        if (this.disabled) {
            input.disabled=true;
        }
        
        var inputblock = input;
        
        if(this.hasFeedback && !this.allowBlank){
            
            var feedback = {
                tag: 'span',
                cls: 'glyphicon form-control-feedback'
            };
            
            inputblock = {
                cls : 'has-feedback',
                cn :  [
                    inputblock,
                    feedback
                ] 
            };
        }
        
        var box = {
            tag: 'div',
            cn: [
                {
                    tag: 'input',
                    type : 'hidden',
                    cls: 'form-hidden-field'
                },
                inputblock
            ]
            
        };
            
    }
});