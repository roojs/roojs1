/**
 * @class Roo.bootstrap.form.Password
 * @extends Roo.bootstrap.form.Input
 * Bootstrap Password class
 * 
 * 
 * 
 * 
 * @constructor
 * Create a new Password
 * @param {Object} config The config object
 */

Roo.bootstrap.form.Password = function(config){
    Roo.bootstrap.form.Password.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.form.NumberField, Roo.bootstrap.form.Input, {
    getAutoCreate : function()
    {
        var cfg = Roo.bootstrap.form.NumberField.superclass.getAutoCreate.call(this);
        
        return cfg;
    },

    initEvents : function()
    {   
        Roo.bootstrap.form.NumberField.superclass.initEvents.call(this);
    }
});