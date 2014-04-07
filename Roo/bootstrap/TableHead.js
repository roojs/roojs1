/*
 * - LGPL
 *
 * table row
 * 
 */

/**
 * @class Roo.bootstrap.TableHead
 * @extends Roo.bootstrap.Component
 * Bootstrap TableHead class
 * 
 * @constructor
 * Create a new TableHead
 * @param {Object} config The config object
 */

Roo.bootstrap.TableHead = function(config){
    Roo.bootstrap.TableHead.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.TableHead, Roo.bootstrap.Component,  {
    
    getAutoCreate : function(){
        var cfg = Roo.apply({}, Roo.bootstrap.TableHead.superclass.getAutoCreate.call(this));
	
	cfg = {
	    tag: 'thead'
	}
	
        return cfg;
    }
   
});

 

 