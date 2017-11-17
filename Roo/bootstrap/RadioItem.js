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
 * @cfg {Boolean} boxLabel - the label associated
 * 
 * @constructor
 * Create a new RadioItem
 * @param {Object} config The config object
 */
Roo.bootstrap.RadioItem = function(config){
    Roo.bootstrap.RadioItem.superclass.constructor.call(this, config);
    
};

Roo.extend(Roo.bootstrap.RadioItem, Roo.bootstrap.Component,  {
    
    getAutoCreate : function()
    {
        var cfg = {
                tag : this.inline ? 'span' : 'div',
                cls : 'form-group',
                cn : []
        };

        var inline = this.inline ? ' radio-inline' : '';
        
        return cfg;
    },
    
    initEvents: function() 
    {
        
    }
});
 

 