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

 * 
 * @constructor
 * Create a new TabPane
 * @param {Object} config The config object
 */

Roo.bootstrap.dash.TabPane = function(config){
    Roo.bootstrap.dash.TabPane.superclass.constructor.call(this, config);
    
};

Roo.extend(Roo.bootstrap.dash.TabPane, Roo.bootstrap.Component,  {
    
    //text: '',
    // inverse: false,
    // form: false,
    // type: 'nav',
    // navId : '',
    // private
    
  
    getAutoCreate : function() {
        var cfg = {
            tag: 'div',
            cls: 'tab-pane',
        }
          
        
        return cfg;
    }
    
    
});

 


 