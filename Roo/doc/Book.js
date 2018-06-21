/*
 * - LGPL
 *
 */

/**
 * @class Roo.doc.Book
 * @extends Roo.bootstrap.Component
 * Book Element class - Represents the outer book
 * @cfg {String} title   Title of the book
 * @cfg {String} abstract Abstract (or just add para's to the book, and it will get added to the abstract)
 * 
 * 
 * @constructor
 * Create a new Book
 * @param {Object} config The config object
 */

Roo.doc.Book = function(config){
    Roo.doc.Book.superclass.constructor.call(this, config);
};

Roo.extend(Roo.doc.Book, Roo.bootstrap.Component,  {
    
    title : '',
    abstract : '',
    getAutoCreate : function(){
        
        //?? this is the synopsis type....
        
        // this is not very fancy...
        
        var cfg ={
            cls: 'book',
            cn : [
                {
                    cls : 'info',
                    cn: [
                        {
                            tag: 'h1',
                            html : this.title
                        }
                    ]
                }
            ]
        };
         
        if (this.abstract.length) {
            cfg.cn[0].cn.push({
                cls : 'abstract',
                cn : {
                    tag : 'p',
                    cls : 'para',
                    html : String.format('{0}', this.abstract)
                }
                
            });
            
        }
	
        return cfg;
    }
     
    
    
    
    
   
});

 

 