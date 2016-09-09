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
 * @cfg {String} memberof class name
 * @cfg {bool} is_static is a static member
 * 
 * @constructor
 * Create a new Synopsis
 * @param {Object} config The config object
 */

Roo.doc.Synopsis = function(config){
    Roo.doc.Synopsis.superclass.constructor.call(this, config);
};

Roo.extend(Roo.doc.Synopsis, Roo.bootstrap.Component,  {
    
    memberof : '',
    is_static : false,
    returntype : '',
    name: '',
    stype:   'function',
     
    getAutoCreate : function(){
        
        var syn = this.items[0]; // hopefully...
        Roo.log(this.items);
        
         
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

 

 