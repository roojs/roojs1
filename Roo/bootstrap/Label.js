/*
 * - LGPL
 *
 * Label
 * 
 */

/**
 * @class Roo.bootstrap.Label
 * @extends Roo.bootstrap.Component
 * Bootstrap Label class
 * @cfg {String} html The label content
 * @cfg {String} tag (span|label) The tag of this element, default label
 * 
 * @constructor
 * Create a new Label
 * @param {Object} config The config object
 */

Roo.bootstrap.Label = function(config){
    Roo.bootstrap.Label.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Label, Roo.bootstrap.Component,  {
    
    html: false,
    tag: 'label',
    
    getAutoCreate : function(){
        
        var cfg = {
            tag: this.tag,
            html: this.html || ''
        }
        
        
        if (this.cls) {
            cfg.cls = this.cls;
        }
        
        return cfg;
    }
   
});

 

 