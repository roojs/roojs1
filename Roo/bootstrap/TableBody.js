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

Roo.bootstrap.TableBody = function(config){
    Roo.bootstrap.TableBody.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.TableBody, Roo.bootstrap.Component,  {
    
    getAutoCreate : function(){
        var cfg = Roo.apply({}, Roo.bootstrap.TableBody.superclass.getAutoCreate.call(this));
	
	cfg = {
	    tag: 'tbody'
	}
	
        return cfg;
    }
   
});

 

 