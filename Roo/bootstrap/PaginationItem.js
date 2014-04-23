/*
 * - LGPL
 *
 * Pagination item
 * 
 */


/**
 * @class Roo.bootstrap.PaginationItem
 * @extends Roo.bootstrap.Component
 * Bootstrap PaginationItem class
 * @cfg {String} html text
 * @cfg {String} href the link
 * @cfg {Boolean} preventDefault (true | false) default true
 * 
 * 
 * @constructor
 * Create a new PaginationItem
 * @param {Object} config The config object
 */


Roo.bootstrap.PaginationItem = function(config){
    Roo.bootstrap.PaginationItem.superclass.constructor.call(this, config);
    this.addEvents({
        // raw events
        /**
         * @event click
         * The raw click event for the entire grid.
         * @param {Roo.EventObject} e
         */
        "click" : true
    });
};

Roo.extend(Roo.bootstrap.PaginationItem, Roo.bootstrap.Component,  {
    
    href : false,
    html : false,
    preventDefault: true,
    
    getAutoCreate : function(){
        var cfg= {
	    tag: 'li',
	    cn: [
		{
		    tag : 'a',
		    href : this.href ? this.href : '#',
		    html : this.html ? this.html : ''
		}
	    ]
        };
	
        return cfg;
    },
    
    initEvents: function() {
        
        this.el.on('click', this.onClick, this);
        
    },
    onClick : function(e)
    {
        Roo.log('PaginationItem on click ');
        if(this.preventDefault){
            e.preventDefault();
        }
        
        this.fireEvent('click', this, e);
    }
   
});

 

 