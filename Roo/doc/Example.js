/*
 * - LGPL
 *
 */

/**
 * @class Roo.doc.Example
 * @extends Roo.bootstrap.Example
 * Example Element class
 * @cfg {String} lang (phpcode|programlisting) section type.
 * 
 * @constructor
 * Create a new Synopsis
 * @param {Object} config The config object
 */

Roo.mailer.Section = function(config){
    Roo.mailer.Section.superclass.constructor.call(this, config);
};

Roo.extend(Roo.mailer.Section, Roo.bootstrap.Component,  {
    
    
    stype:   '',
     
    getAutoCreate : function(){
        
        var cfg ={
            
            cls : 'refsection',
            // id... ?
            cn : [
                {
                    tag: 'h1',
                    cls : 'title',
                    html : this.stype.charAt(0).toUpperCase() + this.stype.slice(1) //ucfirst
                }
            ]
        }
        if (this.stype == 'parameter') {
            
            // db package uses variable list here... - it results in dd/dl but the layout is messed up..
            cfg.cn.push({
                tag: 'ul',
                cls: 'itemizedlist roo-params'
            })
        }
        
	
        return cfg;
    },
  
    
    
   
});

 

 