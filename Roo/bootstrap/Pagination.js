/*
 * - LGPL
 *
 * column
 * 
 */

/**
 * @class Roo.bootstrap.Column
 * @extends Roo.bootstrap.Component
 * Bootstrap Column class
 * @cfg {number} colspan  Number of columsn to span
 * 
 * @constructor
 * Create a new Column
 * @param {Object} config The config object
 */

Roo.bootstrap.Pagination = function(config){
    Roo.bootstrap.Pagination.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Pagination, Roo.bootstrap.Component,  {
    
    html: false,
    cls: false,
    size: false,
    inverse: false,
    from: 1,
    to: 4,
    align: false,
    active: 1,
    
    getAutoCreate : function(){
	cfg = {
	    tag: 'ul',
            cls: 'pagination',
            cn: []
	}
        if (this.html) {
            cfg.html=this.html
        }
        if (this.cls) {
            cfg.cls=this.cls
        }
        cfg.cn[0]={
            tag: 'li',
            cn: [
                {
                    tag: 'a',
                    href:'#',
                    html: '&laquo;'
                }
            ]
        }
        cfg.cn.push(
            {
                tag: 'li',
                cn: [
                    {
                       tag: 'a',
                       href: '#',
                       html: '&raquo;'
                    }
                ]
            }
        )
	
        return cfg;
    }
   
});

 

 