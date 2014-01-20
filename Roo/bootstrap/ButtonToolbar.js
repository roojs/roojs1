/*
 * - LGPL
 *
 * page contgainer.
 * 
 */


/**
 * @class Roo.bootstrap.ButtonGroup
 * @extends Roo.bootstrap.Component
 * Bootstrap ButtonGroup class
 * @cfg {string} size lg | sm | xs (default empty normal)
 * @cfg {string} align vertical | justified  (default none)
 * @cfg {string} direction up | down (default down)
 * 
 * 
 * @constructor
 * Create a new Input
 * @param {Object} config The config object
 */

Roo.bootstrap.ButtonToolbar = function(config){
    Roo.bootstrap.ButtonToolbar.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.ButtonToolbar, Roo.bootstrap.Component,  {
    
    autoCreate : {
        cls: 'btn-toolbar',
        html : null
    },

    getAutoCreate : function(){
        
        var cfg = Roo.apply({}, Roo.bootstrap.ButtonToolbar.superclass.getAutoCreate.call(this));
        
        cfg.html = this.html || cfg.html;
        
        return cfg;
    }
   
});

 