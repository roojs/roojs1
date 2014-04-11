/*
 * - LGPL
 *
 * DateField
 * 
 */

/**
 * @class Roo.bootstrap.DateField
 * @extends Roo.bootstrap.TriggerField
 * Bootstrap DateField class
 * 
 * @constructor
 * Create a new DateField
 * @param {Object} config The config object
 */

Roo.bootstrap.DateField = function(config){
    Roo.bootstrap.DateField.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.DateField, Roo.bootstrap.TriggerField,  {
    
    
    getAutoCreate : function(){
        var cfg = {
            tag: 'div',
            cls: 'input-append date',
            cn: [
                {
                    tag: 'input',
                    cls: 'span',
                    cn: [
                        {
                            tag: 'span',
                            cls: 'add-on',
                            html: '<i class="icon-th"></i>'
                        }
                    ]
                }
            ]
            
        };
        
        return cfg;
    }
   
});

 

 