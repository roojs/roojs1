/*
 * - LGPL
 *
 * TabPanel
 * 
 */

/**
 * @class Roo.bootstrap.TabPanel
 * @extends Roo.bootstrap.Component
 * Bootstrap TabPanel class
 * @cfg {Boolean} active panel active
 * @cfg {String} html panel content
 * 
 * 
 * @constructor
 * Create a new TabPanel
 * @param {Object} config The config object
 */

Roo.bootstrap.TabPanel = function(config){
    Roo.bootstrap.TabPanel.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.TabPanel, Roo.bootstrap.Component,  {
    
    active: false,
    html: false,
    
    getAutoCreate : function(){
        var cfg = {
            tag: 'div',
            cls: 'tab-pane',
            html: this.html || ''
        };
        
        if(this.active){
            cfg.cls += ' active';
        }
        
        return cfg;
    }
   
});

 

 