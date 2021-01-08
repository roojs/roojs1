/*
 * - LGPL
 *
 *  Breadcrumb Nav
 * 
 */
Roo.namespace('Roo.bootstrap.breadcrumb');


/**
 * @class Roo.bootstrap.breadcrumb.Nav
 * @extends Roo.bootstrap.Component
 * Bootstrap Breadcrumb Nav Class
 *  
 * @children Roo.bootstrap.breadcrumb.Item
 * 
 * @constructor
 * Create a new breadcrumb.Nav
 * @param {Object} config The config object
 */


Roo.bootstrap.breadcrumb.Nav = function(config){
    Roo.bootstrap.breadcrumb.Nav.superclass.constructor.call(this, config);
    
    
};

Roo.extend(Roo.bootstrap.breadcrumb.Nav, Roo.bootstrap.Component,  {
    
    getAutoCreate : function()
    {

        var cfg = {
            tag: 'nav',
            cn : [
                {
                    tag : 'ol',
                    cls : 'breadcrumb'
                }
            ]
            
        };
          
        return cfg;
    },
    
    initEvents: function()
    {
        this.olEl = this.el.select('ol',true).first();    
    },
    getChildContainer : function()
    {
        return this.olEl;  
    }
    
});

 