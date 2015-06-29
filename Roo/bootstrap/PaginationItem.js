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
 * @cfg {Boolean} active (true | false) default false
 * @cfg {Boolean} disabled default false
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
    active : false,
    cls : false,
    disabled: false,
    
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
        
        if(this.cls){
            cfg.cls = this.cls;
        }
        
        if(this.disabled){
            cfg.cls = typeof(cfg.cls) !== 'undefined' ? cfg.cls + ' disabled' : 'disabled';
        }
        
        if(this.active){
            cfg.cls = typeof(cfg.cls) !== 'undefined' ? cfg.cls + ' active' : 'active';
        }
	
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
        
        if(this.disabled){
            return;
        }
        
        this.fireEvent('click', this, e);
    }
   
});

 

 