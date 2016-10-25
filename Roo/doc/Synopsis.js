/*
 * - LGPL
 *
 */

/**
 * @class Roo.doc.Synopsis
 * @extends Roo.bootstrap.Component
 * Synopsis Element class
 * @cfg {String} returntype return value
 * @cfg {String} returndesc description of return value. (used in the return section if set..)
 * @cfg {String} name title really..
 * @cfg {String} stype (function|constant)
 * @cfg {String} memberof class name
 * @cfg {bool} is_static is a static member
 * @cfg {bool} is_constructor is a static member
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
    returndesc : '',
    name: '',
    stype:   'function',
    is_constructor : false,
    
    getAutoCreate : function(){
        
        var syn = this.items[0]; // hopefully...
        
        
        
        var nmp = (this.is_static ? '' : '$') +
            this.memberof +
            (this.is_static ? '::' : '->');
            
        var nm = this.name;
        // this should probably do the params....?? then we need to disable the rendering..
        
        if (this.is_constructor) {
            
            nm = this.memberof;
            nmp = 'new ';
        }
        
         
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
                                    this.returntype + ' ' + nmp,
                                    {
                                        tag: 'strong',
                                        cls : this.stype,
                                        html : nm
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

 

 