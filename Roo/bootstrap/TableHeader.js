/*
 * - LGPL
 *
 * table row
 * 
 */

/**
 * @class Roo.bootstrap.TableHeader
 * @extends Roo.bootstrap.Component
 * Bootstrap TableHeader class
 * 
 * @constructor
 * Create a new TableHeader
 * @param {Object} config The config object
 */

Roo.bootstrap.TableHeader = function(config){
    Roo.bootstrap.TableHeader.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.TableHeader, Roo.bootstrap.Component,  {
    
    getAutoCreate : function(){
        var cfg = Roo.apply({}, Roo.bootstrap.TableHeader.superclass.getAutoCreate.call(this));
	
	cfg = {
	    tag: 'th'
	}
	
        return cfg;
    }
   
});

 

 