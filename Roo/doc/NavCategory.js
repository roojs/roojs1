/*
 * - LGPL
 *
 */

/**
 * @class Roo.doc.NavCategory
 * @extends Roo.bootstrap.Component
 * Navigation Category class
 * @cfg {string} title
 * @cfg {string} name
 *
 * Represent's an category on the left menu.
 * - phpdoc @category elements map the pages to the categories
 *   this should be on the left side of the menu, when the
 *   contents are loaded, then it can expand this out, and add links
 *   for each of the methods.
 *
 * 
 * 
 * @constructor
 * Create a new Paragraph
 * @param {Object} config The config object
 */

Roo.doc.NavCategory = function(config){
    Roo.doc.Para.superclass.constructor.call(this, config);
};

Roo.extend(Roo.doc.Para, Roo.bootstrap.Component,  {
    
    title : '',
    name : '',
    getAutoCreate : function(){
        
        //?? this is the synopsis type....
        
        // this is not very fancy...
        
        var cfg ={
            
            cn : [
                {
                    tag : 'a',
                    href : '#' + this.name,
                    html : this.title
                },
                {
                    cls : 'container roo-child-ctr'
                }
            ]
        };

        return cfg;
    },
    getChildContainer : function()
    {
        return this.el.select('roo-child-ctr').first();
    }
    
    
   
});

 

 