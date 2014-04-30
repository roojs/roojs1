/*
 * - LGPL
 *
 * table cell
 * 
 */

/**
 * @class Roo.bootstrap.Table.TableCell
 * @extends Roo.bootstrap.Component
 * Bootstrap TableCell class
 * @cfg {String} html cell contain text
 * @cfg {String} cls cell class
 * @cfg {String} tag cell tag (td|th) default td
 * @cfg {String} abbr Specifies an abbreviated version of the content in a cell
 * @cfg {String} align Aligns the content in a cell
 * @cfg {String} axis Categorizes cells
 * @cfg {String} bgcolor Specifies the background color of a cell
 * @cfg {Number} charoff Sets the number of characters the content will be aligned from the character specified by the char attribute
 * @cfg {Number} colspan Specifies the number of columns a cell should span
 * @cfg {String} headers Specifies one or more header cells a cell is related to
 * @cfg {Number} height Sets the height of a cell
 * @cfg {String} nowrap Specifies that the content inside a cell should not wrap
 * @cfg {Number} rowspan Sets the number of rows a cell should span
 * @cfg {String} scope Defines a way to associate header cells and data cells in a table
 * @cfg {String} valign Vertical aligns the content in a cell
 * @cfg {Number} width Specifies the width of a cell
 * 
 * @constructor
 * Create a new TableCell
 * @param {Object} config The config object
 */

Roo.bootstrap.Table.TableCell = function(config){
    Roo.bootstrap.Table.TableCell.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Table.TableCell, Roo.bootstrap.Component,  {
    
    html: false,
    cls: false,
    tag: false,
    abbr: false,
    align: false,
    axis: false,
    bgcolor: false,
    charoff: false,
    colspan: false,
    headers: false,
    height: false,
    nowrap: false,
    rowspan: false,
    scope: false,
    valign: false,
    width: false,
    
    
    getAutoCreate : function(){
        var cfg = Roo.apply({}, Roo.bootstrap.Table.TableCell.superclass.getAutoCreate.call(this));
	
	cfg = {
	    tag: 'td'
	}
        
        if(this.tag){
            cfg.tag = this.tag;
        }
        
        if (this.html) {
            cfg.html=this.html
        }
        if (this.cls) {
            cfg.cls=this.cls
        }
        if (this.abbr) {
            cfg.abbr=this.abbr
        }
        if (this.align) {
            cfg.align=this.align
        }
        if (this.axis) {
            cfg.axis=this.axis
        }
        if (this.bgcolor) {
            cfg.bgcolor=this.bgcolor
        }
        if (this.charoff) {
            cfg.charoff=this.charoff
        }
        if (this.colspan) {
            cfg.colspan=this.colspan
        }
        if (this.headers) {
            cfg.headers=this.headers
        }
        if (this.height) {
            cfg.height=this.height
        }
        if (this.nowrap) {
            cfg.nowrap=this.nowrap
        }
        if (this.rowspan) {
            cfg.rowspan=this.rowspan
        }
        if (this.scope) {
            cfg.scope=this.scope
        }
        if (this.valign) {
            cfg.valign=this.valign
        }
        if (this.width) {
            cfg.width=this.width
        }
        
	
        return cfg;
    }
   
});

 

 