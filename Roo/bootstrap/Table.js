/*
 * - LGPL
 *
 * table
 * 
 */

/**
 * @class Roo.bootstrap.Table
 * @extends Roo.bootstrap.Component
 * Bootstrap Table class
 * @cfg {String} html cell contain text
 * @cfg {String} cls cell class
 * @cfg {String} tag cell tag (td|th) default td
 * 
 * @constructor
 * Create a new Table
 * @param {Object} config The config object
 */

Roo.bootstrap.Table = function(config){
    Roo.bootstrap.Table.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Table, Roo.bootstrap.Component,  {
    
    html: false,
    cls: false,
    
    getAutoCreate : function(){
        var cfg = Roo.apply({}, Roo.bootstrap.Table.superclass.getAutoCreate.call(this));
	
	cfg = {
	    tag: 'table'
	}
        if (this.html) {
            cfg.html=this.html
        }
        if (this.cls) {
            cfg.cls=this.cls
        }
	
        return cfg;
    }
   
});

 

 