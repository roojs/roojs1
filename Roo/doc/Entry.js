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
 * @name {String} name of method
 * @purpose {String} short description of method.
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
    Roo.mailer.Body._calls++;
    if (Roo.mailer.Body._calls > 1) {
        throw "test";
    }
    // call onRender once... and block next call...?
    this.onRender(body);
    this.onRender = function() { };

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
    }

    
    
   
});

 

 