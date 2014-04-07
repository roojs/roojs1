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
 * @cfg {String} cls table class
 * @cfg {String} align (left|center|right) Specifies the alignment of a table according to surrounding text
 * @cfg {String} bgcolor Specifies the background color for a table
 * @cfg {String} border Specifies whether the table cells should have borders or not
 * @cfg {String} cellpadding Specifies the space between the cell wall and the cell content
 * @cfg {String} cellspacing Specifies the space between cells
 * @cfg {String} frame Specifies which parts of the outside borders that should be visible
 * @cfg {String} rules Specifies which parts of the inside borders that should be visible
 * @cfg {String} sortable Specifies that the table should be sortable
 * @cfg {String} summary Specifies a summary of the content of a table
 * @cfg {String} width Specifies the width of a table
 * 
 * @constructor
 * Create a new Table
 * @param {Object} config The config object
 */

Roo.bootstrap.Table = function(config){
    Roo.bootstrap.Table.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Table, Roo.bootstrap.Component,  {
    
    cls: false,
    
    getAutoCreate : function(){
        var cfg = Roo.apply({}, Roo.bootstrap.Table.superclass.getAutoCreate.call(this));
	
	cfg = {
	    tag: 'table'
	}
        
        if (this.cls) {
            cfg.cls=this.cls
        }
	
        return cfg;
    }
   
});

 

 