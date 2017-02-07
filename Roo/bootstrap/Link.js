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
 * @cfg {String} fa - favicon

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
    anchor : false,
    alt : false,
    fa: false,


    getAutoCreate : function()
    {
        var html = this.html || '';
        
        if (this.fa != false) {
            html = '<i class="fa fa-' + this.fa + '"></i>';
        }
        var cfg = {
            tag: 'a'
        };
        // anchor's do not require html/href...
        if (this.anchor === false) {
            cfg.html = html;
            cfg.href = this.href || '#';
        } else {
            cfg.name = this.anchor;
            if (this.html !== false) {
                cfg.html = html;
            }
            if (this.href !== false) {
                cfg.href = this.href;
            }
        }
        
        if(this.alt !== false){
            cfg.alt = this.alt;
        }
        
        
        if(this.target !== false) {
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

 