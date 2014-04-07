/*
 * - LGPL
 *
 * table row
 * 
 */

/**
 * @class Roo.bootstrap.TableFoot
 * @extends Roo.bootstrap.Component
 * Bootstrap TableFoot class
 * 
 * @constructor
 * Create a new TableFoot
 * @param {Object} config The config object
 */

Roo.bootstrap.TableFoot = function(config){
    Roo.bootstrap.TableFoot.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.TableFoot, Roo.bootstrap.Component,  {
    
    getAutoCreate : function(){
        var cfg = Roo.apply({}, Roo.bootstrap.TableFoot.superclass.getAutoCreate.call(this));
	
	cfg = {
	    tag: 'tfoot'
	}
	
        return cfg;
    }
   
});

 

 