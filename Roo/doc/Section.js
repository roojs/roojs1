/*
 * - LGPL
 *
 */

/**
 * @class Roo.doc.Section
 * @extends Roo.bootstrap.Component
 * SectionElement class
 * @cfg {String} stype (desc|parameter|return|note|example) section type.
 * 
 * @constructor
 * Create a new Synopsis
 * @param {Object} config The config object
 */

Roo.doc.Section = function(config){
    Roo.doc.Section.superclass.constructor.call(this, config);
};

Roo.extend(Roo.doc.Section, Roo.bootstrap.Component,  {
    
    
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
        };
        if (this.stype == 'parameter') {
            
            // db package uses variable list here... - it results in dd/dl but the layout is messed up..
            cfg.cn.push({
                tag: 'ul',
                cls: 'itemizedlist roo-params'
            });
        }
        
	
        return cfg;
    },
    getChildContainer : function(build_call)
    {
         
        if (this.stype == 'parameter') {
            return this.el.select('.roo-params',true).first();
        }
        return this.el;
    }
    
    
   
});

 

 