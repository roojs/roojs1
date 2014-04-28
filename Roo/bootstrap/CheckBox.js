/*
 * - LGPL
 *
 * CheckBox
 * 
 */

/**
 * @class Roo.bootstrap.CheckBox
 * @extends Roo.bootstrap.Component
 * Bootstrap CheckBox class
 * 
 * @cfg {String} valueOff The value that should go into the generated input element's value when unchecked.
 * 
 * @constructor
 * Create a new CheckBox
 * @param {Object} config The config object
 */

Roo.bootstrap.CheckBox = function(config){
    Roo.bootstrap.CheckBox.superclass.constructor.call(this, config);
   
        this.addEvents({
            /**
            * @event check
            * Fires when the checkbox or radio is checked or unchecked.
            * @param {Roo.bootstrap.Input} this This input
            * @param {Boolean} checked The new checked value
            */
           check : true
        });
};

Roo.extend(Roo.bootstrap.CheckBox, Roo.bootstrap.Input,  {
    
    
    getAutoCreate : function()
    {
        
        
    },
    
    initEvents : function()
    {
        
    }
    
});

 
