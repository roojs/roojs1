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
 * @cfg {Number} border Specifies whether the table cells should have borders or not
 * @cfg {Number} cellpadding Specifies the space between the cell wall and the cell content
 * @cfg {Number} cellspacing Specifies the space between cells
 * @cfg {String} frame Specifies which parts of the outside borders that should be visible
 * @cfg {String} rules Specifies which parts of the inside borders that should be visible
 * @cfg {String} sortable Specifies that the table should be sortable
 * @cfg {String} summary Specifies a summary of the content of a table
 * @cfg {Number} width Specifies the width of a table
 * @cfg {Number} striped Specifies the width of a table
*
 
 
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
    align: false,
    bgcolor: false,
    border: false,
    cellpadding: false,
    cellspacing: false,
    frame: false,
    rules: false,
    sortable: false,
    summary: false,
    width: false,
    
    
    
    getAutoCreate : function(){
        var cfg = Roo.apply({}, Roo.bootstrap.Table.superclass.getAutoCreate.call(this));
        
        cfg = {
            tag: 'table'
        }
            
        if (this.cls) {
            cfg.cls=this.cls
        }
        if (this.align) {
            cfg.align=this.align
        }
        if (this.bgcolor) {
            cfg.bgcolor=this.bgcolor
        }
        if (this.border) {
            cfg.border=this.border
        }
        if (this.cellpadding) {
            cfg.cellpadding=this.cellpadding
        }
        if (this.cellspacing) {
            cfg.cellspacing=this.cellspacing
        }
        if (this.frame) {
            cfg.frame=this.frame
        }
        if (this.rules) {
            cfg.rules=this.rules
        }
        if (this.sortable) {
            cfg.sortable=this.sortable
        }
        if (this.summary) {
            cfg.summary=this.summary
        }if (this.width) {
            cfg.width=this.width
        }
        
        
	
        return cfg;
    }
   
});

 

 