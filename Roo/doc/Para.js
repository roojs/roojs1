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

 

 