/*
 * - LGPL
 *
 * navbar
 * 
 */

/**
 * @class Roo.bootstrap.NavHeaderbar
 * @extends Roo.bootstrap.NavSimplebar
 * Bootstrap Sidebar class
 *
 *
 * @cfg {String} position (fixed-top|fixed-bottom|static-top) position

 * 
 * @constructor
 * Create a new Sidebar
 * @param {Object} config The config object
 */


Roo.bootstrap.NavHeaderbar = function(config){
    Roo.bootstrap.NavHeaderbar.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.NavHeaderbar, Roo.bootstrap.NavSimplebar,  {
    
    position: '',

    getAutoCreate : function(){
        
        
        
        var   cfg = {
                tag: this.nav || 'nav',
                cls: 'navbar',
                role: 'navigation',
                cn: [
                    {
                        tag: 'div',
                        cls: 'navbar-header',
                        cn: [
                            {
                            tag: 'button',
                            type: 'button',
                            cls: 'navbar-toggle',
                            'data-toggle': 'collapse',
                            cn: [
                                {
                                    tag: 'span',
                                    cls: 'sr-only',
                                    html: 'Toggle navigation'
                                },
                                {
                                    tag: 'span',
                                    cls: 'icon-bar'
                                },
                                {
                                    tag: 'span',
                                    cls: 'icon-bar'
                                },
                                {
                                    tag: 'span',
                                    cls: 'icon-bar'
                                }
                            ]
                            }
                        ]
                    },
                    {
                    tag: 'div',
                    cls: 'collapse navbar-collapse'
                    }
                ]
            };
            
            cfg.cls += this.inverse ? ' navbar-inverse' : ' navbar-default';
            
            if (['fixed-top','fixed-bottom','static-top'].indexOf(this.position)>-1) {
                cfg.cls += ' navbar-' + this.position;
                
                // not sure if this should occor??
                
                cfg.tag = this.position  == 'fixed-bottom' ? 'footer' : 'header';
            }
            
            if (this.brand !== '') {
                cfg.cn[0].cn.push({
                    tag: 'a',
                    href: this.brand_href ? this.brand_href : '#',
                    cls: 'navbar-brand',
                    cn: [
                    this.brand
                    ]
                });
            }
            
            if(this.main){
                cfg.cls += ' main-nav';
            }
            
            
            return cfg;
    
        
    }
    
    
    
});



 

 