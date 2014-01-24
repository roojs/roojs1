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
    
    xs: null,
    sm: null,
    md: null,
    lg: null,
    
    offset: 0,
    
    getAutoCreate : function(){
        var cfg = Roo.apply({}, Roo.bootstrap.Column.superclass.getAutoCreate.call(this));
	
	cfg = {
	    tag: 'div',
	    cls: 'column'
	}
	
	['xs','sm','md','lg'].map(function(size){
	    if (this[size]) {
		cfg.cls += ' col-'+size+'-'+this[size];
	    }
	})
	
        return cfg;
    }
   
});

 

 