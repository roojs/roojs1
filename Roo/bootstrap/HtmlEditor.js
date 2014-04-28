/*
 * - LGPL
 *
 * HtmlEditor
 * 
 */

/**
 * @class Roo.bootstrap.HtmlEditor
 * @extends Roo.bootstrap.Component
 * Bootstrap HtmlEditor class

 * @constructor
 * Create a new HtmlEditor
 * @param {Object} config The config object
 */

Roo.bootstrap.HtmlEditor = function(config){
    Roo.bootstrap.HtmlEditor.superclass.constructor.call(this, config);
    
};


Roo.extend(Roo.bootstrap.HtmlEditor, Roo.bootstrap.Component,  {
    
    getAutoCreate : function()
    {
        var cfg = {
            tag: "textarea",
            cls: "form-control",
            style:'width: ' + this.width + 'px;height: ' + this.height + 'px;',
            autocomplete: "off"
        }
        
        return cfg;
        
    }
});
