
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
        var id = Roo.id();
        
        var cfg = {
            cls: 'form-group',
            cn : []
        };
        
        if (this.fieldLabel.length) {
            
            cfg.cn = [
                {
                   tag : 'i',
                   cls : 'roo-required-indicator left-indicator text-danger fa fa-lg fa-star',
                   tooltip : 'This field is required'
               },
               {
                   tag: 'label',
                   'for' :  id,
                   html : this.fieldLabel

               }
            ];
            
            if(this.indicatorpos == 'right'){
                
                cfg.cn = [
                    {
                       tag: 'label',
                       cn : [
                           {
                               tag : 'span',
                               'for' :  id,
                               html : this.fieldLabel
                           },
                           {
                              tag : 'i',
                              cls : 'roo-required-indicator right-indicator text-danger fa fa-lg fa-star',
                              tooltip : 'This field is required'
                           }
                       ]

                    }
                ];
            }
        }
        
        var settings=this;
        ['xs','sm','md','lg'].map(function(size){
            if (settings[size]) {
                cfg.cls += ' col-' + size + '-' + settings[size];
            }
        });
        
        cfg.cn.push({
            tag : 'div',
            cls : 'money-currency'
        });
        
        cfg.cn.push({
            tag : 'div',
            cls : 'money-amount'
        });
        
        return cfg;
            
    },
    
    initEvents : function()
    {
        
    }
    
});