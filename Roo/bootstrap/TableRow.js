/*
 * - LGPL
 *
 * table row
 * 
 */

/**
 * @class Roo.bootstrap.TableRow
 * @extends Roo.bootstrap.Component
 * Bootstrap TableRow class
 * @cfg {String} cls row class
 * @cfg {String} align Aligns the content in a table row
 * @cfg {String} bgcolor Specifies a background color for a table row
 * @cfg {Number} charoff Sets the number of characters the content will be aligned from the character specified by the char attribute
 * @cfg {String} valign Vertical aligns the content in a table row
 * 
 * @constructor
 * Create a new TableRow
 * @param {Object} config The config object
 */

Roo.bootstrap.TableRow = function(config){
    Roo.bootstrap.TableRow.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.TableRow, Roo.bootstrap.Component,  {
    
    cls: false,
    align: false,
    bgcolor: false,
    charoff: false,
    valign: false,
    
    getAutoCreate : function(){
        var cfg = Roo.apply({}, Roo.bootstrap.TableRow.superclass.getAutoCreate.call(this));
	
        cfg = {
            tag: 'tr'
        }
            
        if(this.cls){
            cfg.cls = this.cls;
        }
        if(this.align){
            cfg.align = this.align;
        }
        if(this.bgcolor){
            cfg.bgcolor = this.bgcolor;
        }
        if(this.charoff){
            cfg.charoff = this.charoff;
        }
        if(this.valign){
            cfg.valign = this.valign;
        }
	
        Roo.log(cfg);
        
        return cfg;
    }
   
});

 

 