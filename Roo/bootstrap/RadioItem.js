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
 * @cfg {Boolean} inline (true|false) inline the element (default false)
 * @cfg {String} weight (primary|warning|info|danger|success) The text that appears beside the radio
 * 
 * @constructor
 * Create a new RadioItem
 * @param {Object} config The config object
 */
Roo.bootstrap.RadioItem = function(config){
    Roo.bootstrap.RadioItem.superclass.constructor.call(this, config);
    
};

Roo.extend(Roo.bootstrap.RadioItem, Roo.bootstrap.Component,  {
    
    inline : false,
    
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
 

 