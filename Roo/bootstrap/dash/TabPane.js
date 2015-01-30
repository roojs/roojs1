/*
 * - LGPL
 *
 * Tab pane
 * 
 */
Roo.bootstrap.dash = Roo.bootstrap.dash || {};
/**
 * @class Roo.bootstrap.TabPane
 * @extends Roo.bootstrap.Component
 * Bootstrap TabPane class
 * @cfg {Boolean} active (false | true) Default false
 * @cfg {String} title title of panel
 * 
 * @constructor
 * Create a new TabPane
 * @param {Object} config The config object
 */

Roo.bootstrap.dash.TabPane = function(config){
    Roo.bootstrap.dash.TabPane.superclass.constructor.call(this, config);
    
};

Roo.extend(Roo.bootstrap.dash.TabPane, Roo.bootstrap.Component,  {
    
    active : false,
    title : '',
    
//    
//    getBox : function()
//    {
//        return this.el.findParent('.nav-tabs-custom', false, true);
//    },
    
    getAutoCreate : function() 
    {
        var cfg = {
            tag: 'div',
            cls: 'tab-pane'
        }
        
        if(this.active){
            cfg.cls += ' active';
        }
        
        return cfg;
    },
    initEvents  : function()
    {
        Roo.log('trigger add pane handler');
        this.parent().fireEvent('addpane', this)
    }
    
    
    
});

 


 