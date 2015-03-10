/*
 * - LGPL
 *
 * image
 * 
 */


/**
 * @class Roo.bootstrap.Link
 * @extends Roo.bootstrap.Component
 * Bootstrap Link Class
 * @cfg {String} alt image alternative text
 * @cfg {String} href a tag href
 * @cfg {String} target (_self|_blank|_parent|_top) target for a href.
 * @cfg {String} html the content of the link.
 * @cfg {String} anchor name for the anchor link

 * @cfg {Boolean} preventDefault (true | false) default false

 * 
 * @constructor
 * Create a new Input
 * @param {Object} config The config object
 */

Roo.bootstrap.Link = function(config){
    Roo.bootstrap.Link.superclass.constructor.call(this, config);
    
    this.addEvents({
        // img events
        /**
         * @event click
         * The img click event for the img.
         * @param {Roo.EventObject} e
         */
        "click" : true
    });
};

Roo.extend(Roo.bootstrap.Link, Roo.bootstrap.Component,  {
    
    href: false,
    target: false,
    preventDefault: false,

    getAutoCreate : function()
    {
        
        var cfg = {
            tag: 'a',
        
        }
        if (this.anchor === false) {
            cfg.html = this.html || 'html-missing';
            cfg.href = this.href || '#';
        } else {
            cfg.name = this.anchor;
        }
        
        if(this.alt){
            cfg.alt = this.alt;
        }
        
        
        if(this.target){
            cfg.target = this.target;
        }
        
        return cfg;
    },
    
    initEvents: function() {
        
        if(!this.href || this.preventDefault){
            this.el.on('click', this.onClick, this);
        }
    },
    
    onClick : function(e)
    {
        if(this.preventDefault){
            e.preventDefault();
        }
        //Roo.log('img onclick');
        this.fireEvent('click', this, e);
    }
   
});

 