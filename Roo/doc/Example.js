/*
 * - LGPL
 *
 */

/**
 * @class Roo.doc.Example
 * @extends Roo.bootstrap.Component
 * Example Element class
 * @cfg {String} lang (phpcode|programlisting) section type.
 * @cfg {String} code  example code
 * @cfg {String} output The expected output from the code
 *
 * 
 * @constructor
 * Create a new Synopsis
 * @param {Object} config The config object
 */

Roo.doc.Example = function(config){
    Roo.doc.Example.superclass.constructor.call(this, config);
};

Roo.extend(Roo.doc.Example, Roo.bootstrap.Component,  {
    
    
    lang:   'php',
    code : '',
    output : '',
    
    getAutoCreate : function(){
        
        // no colour highlighting in here....
        
        var cfg ={
            
            cls : this.lang,
            
            cn : [
                {
                    tag: 'pre',
                    html :  String.format('{0}',this.code).replace(/\n/g, '<br/>')
                }
            ]
        };
        if (this.output) {
            
        }
        
        
	
        return cfg;
    }
  
    
    
   
});

 

 