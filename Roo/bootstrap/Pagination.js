/*
 * - LGPL
 *
 * pagination
 * 
 */

/**
 * @class Roo.bootstrap.Pagination
 * @extends Roo.bootstrap.Component
 * @children Roo.bootstrap.Pagination
 * Bootstrap Pagination class
 * 
 * @cfg {String} size (xs|sm|md|lg|xl)
 * @cfg {Boolean} inverse 
 * 
 * @constructor
 * Create a new Pagination
 * @param {Object} config The config object
 */

Roo.bootstrap.Pagination = function(config){
    Roo.bootstrap.Pagination.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Pagination, Roo.bootstrap.Component,  {
    
    cls: false,
    size: false,
    inverse: false,
    
    getAutoCreate : function(){
        var cfg = {
            tag: 'ul',
                cls: 'pagination'
        };
        if (this.inverse) {
            cfg.cls += ' inverse';
        }
        if (this.html) {
            cfg.html=this.html;
        }
        if (this.cls) {
            cfg.cls += " " + this.cls;
        }
        return cfg;
    }
   
});

 

 