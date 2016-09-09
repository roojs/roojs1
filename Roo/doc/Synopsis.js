/*
 * - LGPL
 *
 */

/**
 * @class Roo.doc.Synopsis
 * @extends Roo.bootstrap.Component
 * Synopsis Element class
 * @cfg {String} returntype return value
 * @cfg {String} name title really..
 * @cfg {String} stype (function|constant)
 * 
 * @constructor
 * Create a new Synopsis
 * @param {Object} config The config object
 */

Roo.doc.Synopsis = function(config){
    Roo.doc.Synopsis.superclass.constructor.call(this, config);
};

Roo.extend(Roo.doc.Synopsis, Roo.bootstrap.Component,  {
    
    
    returntype : '',
    name: '',
    stype:   'function',
     
    getAutoCreate : function(){
        
        var cfg ={
            tag: 'h5',
            cls : 'refsynopsisdiv',
            cn : [
                {
                    cls: 'funcsynopsis',
                    cn: [
                        {
                            tag: 'p',
                            cn: {
                                tag:'code',
                                cls : 'funcprototype',
                                cn: [
                                    this.returntype + ' ',
                                    {
                                        tag: 'strong',
                                        cls : this.stype,
                                        html : this.name
                                    },
                                    '(',
                                    {
                                        tag: 'span',
                                        cls : 'roo-params'
                                    },
                                    ')'
                                ]
                                
                            }
                        }
                    ]
                }
                
            ]
        };
        
        
	
        return cfg;
    },
    getChildContainer : function(build_call)
    {
         
        
        return this.el.select('.roo-params',true).first();
    }
    
    
    
    
   
});

 

 