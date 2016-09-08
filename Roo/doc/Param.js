/*
 * - LGPL
 *
 */

/**
 * @class Roo.doc.Param
 * @extends Roo.bootstrap.Component
 * Param Element class
 * @cfg {bool} is_optional 
 * @cfg {String} type  argument type
 * @cfg {String} name
 * @cfg {String} desc  short description
 * @cfg {String} defaultvalue default value
 * 
 * @constructor
 * Create a new Param
 * @param {Object} config The config object
 */

Roo.doc.Param = function(config){
    Roo.doc.Param.superclass.constructor.call(this, config);
};

Roo.extend(Roo.doc.Param, Roo.bootstrap.Component,  {
    
    is_optional : false,
    type : '',
    name: '',
    defaultvalue:   '',
    desc: '',
     
    getAutoCreate : function(){
        
        //?? this is the synopsis type....
        
        
        if (this.parent().stype == 'parameter') {
            
            return {
                tag : 'li',
                cn : [
                    {
                        tag : 'p',
                        cls: 'para',
                        cn : [
                            {
                                tag: 'code',
                                html : this.type + ' ' + this.name
                            },
                            this.desc
                        ]
                    }
                ]
            };
            
        }
         if (this.parent().stype == 'return') {
            return {
                    tag : 'p',
                    cls: 'para',
                    cn : [
                        {
                            tag: 'code',
                            html : this.type
                        },
                        this.desc
                    ]
                };
                
         }
       
        
        
        // this is not very fancy...
        
        var cfg ={
            tag: 'span',
            cn : [
                is_optional ? '[' : '',
                this.type,
                ' ',
                this.name,
                this.defaultvalue == '' ? '' : ' = ',
                this.defaultvalue,
                ',' // not really.. but let's do it anyway...
            ]
        };
         
        
        
	
        return cfg;
    }
     
    
    
    
    
   
});

 

 