/*
 * - LGPL
 *
 * column
 * 
 */

/**
 * @class Roo.bootstrap.Column
 * @extends Roo.bootstrap.Component
 * Bootstrap Column class
 * @cfg {number} colspan  Number of columsn to span
 * 
 * @constructor
 * Create a new Column
 * @param {Object} config The config object
 */

Roo.bootstrap.Submenu.Item = function(config){
    Roo.bootstrap.Submenu.Item.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Submenu.Item, Roo.bootstrap.Component,  {
    
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
    
    offset: 0,
    
	autoCreate : {
        cls: 'column'
    },
    
    getAutoCreate : function(){
        var cfg = Roo.apply({}, Roo.bootstrap.Submenu.Item.superclass.getAutoCreate.call(this));
        cfg.cls += 'col-md-' + this.md;
	
	
	
        return cfg;
    }
   
});

 

 