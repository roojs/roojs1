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

Roo.bootstrap.Column = function(config){
    Roo.bootstrap.Column.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Column, Roo.bootstrap.Component,  {
    
    xs: 12,
    sm: null,
    md: null,
    lg: null,
    
    offset: 0,
    
	autoCreate : {
        cls: 'column'
    },
    
    getAutoCreate : function(){
        var cfg = Roo.apply({}, Roo.bootstrap.Column.superclass.getAutoCreate.call(this));
        cfg.cls += 'col-md-' + this.colspan;
	
	
	
        return cfg;
    }
   
});

 

 