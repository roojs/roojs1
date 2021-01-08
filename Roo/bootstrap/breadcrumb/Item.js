/*
 * - LGPL
 *
 *  Breadcrumb Item
 * 
 */


/**
 * @class Roo.bootstrap.breadcrumb.Nav
 * @extends Roo.bootstrap.Component
 * Bootstrap Breadcrumb Nav Class
 *  
 * @children Roo.bootstrap.breadcrumb.Component
 * @cfg {String} html the content of the link.
 * @cfg {String} href where it links to if '#' is used the link will be handled by onClick.
 * @cfg {Boolean} active is it active

 * 
 * @constructor
 * Create a new breadcrumb.Nav
 * @param {Object} config The config object
 */

Roo.bootstrap.breadcrumb.Item = function(config){
    Roo.bootstrap.breadcrumb.Item.superclass.constructor.call(this, config);
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

Roo.extend(Roo.bootstrap.breadcrumb.Item, Roo.bootstrap.Component,  {
    
    href: false,
    html : '',
    
    getAutoCreate : function()
    {

        var cfg = {
            tag: 'li'
        };
        if (this.href !== false) {
            cfg.cn = [{
                tag : 'a',
                href : this.href,
                html : this.html
            }];
        } else {
            cfg.html = this.html;
        }
        
        return cfg;
    },
    
    initEvents: function()
    {
        if (this.href) {
            this.el.select('a', true).first().onClick(this.onClick, this)
        }
        
    },
    onClick : function(e)
    {
        e.preventDefault();
        this.fireEvent('click',this,  e);
    }
    
});

 