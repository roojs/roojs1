/*
 * - LGPL
 *
 * table cell
 * 
 */

/**
 * @class Roo.bootstrap.TableCell
 * @extends Roo.bootstrap.Component
 * Bootstrap TableCell class
 * 
 * @constructor
 * Create a new TableCell
 * @param {Object} config The config object
 */

Roo.bootstrap.TableCell = function(config){
    Roo.bootstrap.TableCell.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.TableCell, Roo.bootstrap.Component,  {
    
    getAutoCreate : function(){
        var cfg = Roo.apply({}, Roo.bootstrap.TableCell.superclass.getAutoCreate.call(this));
	
	cfg = {
	    tag: 'td'
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

 

 