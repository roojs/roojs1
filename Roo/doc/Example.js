/*
 * - LGPL
 *
 */

/**
 * @class Roo.doc.Example
 * @extends Roo.bootstrap.Component
 * Example Element class
 * @cfg {String} title short title describing example
 * @cfg {String} lang (php|txt|sql) section type.
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
    
    title : '',
    lang:   'php',
    code : '',
    output : '',
    outputlang : 'txt',
    
    getAutoCreate : function(){
        
        // no colour highlighting in here....
        
        var code = hljs ? hljs.highlight(this.lang,this.code).value :
                String.format('{0}',this.code).replace(/\n/g, '<br/>');
        
        Roo.log(code);
        var cfg ={
            cls : 'panel panel-info',
            cn : [
                {
                    cls : 'panel-heading',
                    html : this.title
                },
                {
                    cls : 'panel-body',
                    cn : [
                        {
                            tag: 'pre',
                            cls : 'lang-' + this.lang,
                            html :  code
                        }
                    ]
                }
            ]
        };
        
        if (this.output) {
            
            var out = hljs ? hljs.highlight(this.outputlang,this.output).value :
                    String.format('{0}',this.output).replace(/\n/g, '<br/>');
            cfg.cn.push(

                {
                    cls : 'panel-footer',
                    cn : {
                        tag: 'pre',
                        html : out 
                    }
                }
            
                
            );      
        }
        
        
	
        return cfg;
    }
  
    
    
   
});

 

 