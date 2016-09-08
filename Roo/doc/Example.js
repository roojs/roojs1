/*
 * - LGPL
 *
 */

/**
 * @class Roo.doc.Example
 * @extends Roo.bootstrap.Example
 * Example Element class
 * @cfg {String} lang (phpcode|programlisting) section type.
 * @cfg {String} code
 *
 * 
 * @constructor
 * Create a new Synopsis
 * @param {Object} config The config object
 */

Roo.mailer.Section = function(config){
    Roo.mailer.Section.superclass.constructor.call(this, config);
};

Roo.extend(Roo.mailer.Section, Roo.bootstrap.Component,  {
    
    
    lang:   'php',
    code : '',
    
    getAutoCreate : function(){
        
        // no colour highlighting in here....
        
        var cfg ={
            
            cls : this.lang,
            
            cn : [
                {
                    tag: 'code',
                    html :  String.format('{0}',this.code).replace(/\n/g, '<br/>')
                }
            ]
        }
        
	
        return cfg;
    },
  
    
    
   
});

 

 