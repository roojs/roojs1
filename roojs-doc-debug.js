/*
 * - LGPL
 *
 *  Documentation - designed to generate HTML+Docbook!?!
 */
Roo.doc = Roo.doc || {};

/**
 * @class Roo.doc.Entry
 * @extends Roo.bootstrap.Component
 * Entry Element class - describes a method etc...
 * @cfg name {String} name of method
 * @cfg purpose {String} short description of method.
 * 
 * @constructor
 * Create a new E
 * @param {Object} config The config object
 */



Roo.doc.Entry  = function(config){
    Roo.doc.Entry.superclass.constructor.call(this, config);
    //this.el = Roo.get(document.body);
    var body = Roo.get(document.body);
    body.attr({
        leftmargin : 0,
        marginwidth : 0,
        topmargin : 0,
        marginheight : 0,
        offset : 0
    });
    
     
    // call onRender once... and block next call...?
    this.onRender(body);
    this.el = body;
    //this.onRender = function() { };

};

Roo.doc.Entry._calls = 0;

Roo.extend(Roo.doc.Entry, Roo.bootstrap.Component,  {
    
    
    name : '',
    purpose : '',
    
    getAutoCreate : function(){
        
        var cfg ={
            cls : 'refentry',
            cn : [
                {
                    tag: 'h1',
                    cls: 'refname',
                    html : this.name
                },
                {
                    cls: 'refnamediv',
                    html : this.purpose
                }
            ]
        };
        
        
         
	
        return cfg;
    },
    
    addxtype :   function (tree, cntr)
    {
        return this.addxtypeChild(tree,cntr);
    },
    
    onRender : function(ct, position)
    {
        
        Roo.doc.Entry._calls++;
        if (Roo.doc.Entry._calls > 1 || !ct) {
            return;
        }
        
    // call onRender once... and block next call...?
    
        Roo.bootstrap.Component.prototype.onRender.call(this, ct, position);
    }
   
});

 

 /*
 * - LGPL
 *
 */

/**
 * @class Roo.doc.Example
 * @extends Roo.bootstrap.Component
 * Example Element class
 * @cfg {String} lang (phpcode|programlisting) section type.
 * @cfg {String} code
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
        };
        
	
        return cfg;
    }
  
    
    
   
});

 

 /*
 * - LGPL
 *
 */

/**
 * @class Roo.doc.Para
 * @extends Roo.bootstrap.Component
 * Param Element class
 * @cfg {String} html
 * 
 * @constructor
 * Create a new Paragraph
 * @param {Object} config The config object
 */

Roo.doc.Para = function(config){
    Roo.doc.Para.superclass.constructor.call(this, config);
};

Roo.extend(Roo.doc.Para, Roo.bootstrap.Component,  {
    
    html : '',
    getAutoCreate : function(){
        
        //?? this is the synopsis type....
        
        // this is not very fancy...
        
        var cfg ={
            tag: 'p',
            cls: 'para',
            html : this.html
        };
         
        if (this.parent().is_list) {
            return {
                tag: 'li',
                cls : listitme,
                cn : [ cfg ]
            };
            
        }
	
        return cfg;
    }
     
    
    
    
    
   
});

 

 /*
 * - LGPL
 *
 */

/**
 * @class Roo.doc.Param
 * @extends Roo.bootstrap.Component
 * Param Element class
 * @cfg {bool} is_optional is the argument optional
 * @cfg {String} type  argument type
 * @cfg {String} name name of the parameter
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
            tag: 'h2',
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
                                    }
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

 

 