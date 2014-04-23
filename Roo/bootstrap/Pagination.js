/*
 * - LGPL
 *
 * pagination
 * 
 */

/**
 * @class Roo.bootstrap.Pagination
 * @extends Roo.bootstrap.Component
 * Bootstrap Pagination class
 * @cfg {String} size xs | sm | md | lg
 * @cfg {Boolean} inverse false | true
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
//        cfg.cn[0]={
//            tag: 'li',
//            cn: [
//                {
//                    tag: 'a',
//                    href:'#',
//                    html: '&laquo;'
//                }
//            ]
//        };
//        var from=this.from>0?this.from:1;
//        var to=this.to-from<=10?this.to:from+10;
//        var active=this.active>=from&&this.active<=to?this.active:null;
//        for (var i=from;i<=to;i++) {
//            cfg.cn.push(
//                {
//                    tag: 'li',
//                    cls: active===i?'active':'',
//                    cn: [
//                        {
//                            tag: 'a',
//                            href: '#',
//                            html: i
//                        }
//                    ]
//                }
//            );
//        }
//        
//        cfg.cn.push(
//            {
//                tag: 'li',
//                cn: [
//                    {
//                       tag: 'a',
//                       href: '#',
//                       html: '&raquo;'
//                    }
//                ]
//            }
//        );
	
        return cfg;
    }
   
});

 

 