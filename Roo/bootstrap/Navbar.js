/*
 * - LGPL
 *
 * navbar
 * 
 */

/**
 * @class Roo.bootstrap.Navbar
 * @extends Roo.bootstrap.Component
 * Bootstrap Navbar class
 * @cfg {Boolean} sidebar has side bar
 * @cfg {Boolean} bar is a bar?
 * @cfg {String} position (fixed-top|fixed-bottom|static-top) position
 * @cfg {String} brand what is brand
 * @cfg {Boolean} inverse is inverted color
 * @cfg {String} type (nav | pills | tabs)
 * @cfg {Boolean} arrangement stacked | justified
 * @cfg {String} align (left | right) alignment
 * @cfg {String} brand_href href of the brand
 * @cfg {Boolean} main (true|false) main nav bar? default false
 * @cfg {Boolean} disable (true|false) disable the bar, add marks
 *
 * 
 * @constructor
 * Create a new Navbar
 * @param {Object} config The config object
 */


Roo.bootstrap.Navbar = function(config){
    Roo.bootstrap.Navbar.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Navbar, Roo.bootstrap.Component,  {
    
    sidebar: false,
    
    bar: false,
    brand: '',
    inverse: false,
    position: '',
    align : false,
    type: 'nav',
    arrangement: '',
    brand_href: false,
    main : false,
    disable : false,
    
    getAutoCreate : function(){
        var cfg = {
            cls : 'navbar'
        };
	
        if (this.sidebar === true) {
            cfg = {
                tag: 'div',
                cls: 'sidebar-nav'
            };
            return cfg;
        }
        
        if (this.bar === true) {
            cfg = {
                tag: 'nav',
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
        
        } else if (this.bar === false) {
            
        } else {
            Roo.log('Property \'bar\' in of Navbar must be either true or false')
        }
	
        cfg.cn = [
            {
                cls: 'nav',
                tag : 'ul'
            }
        ];
        
        if (['tabs','pills'].indexOf(this.type)!==-1) {
            cfg.cn[0].cls += ' nav-' + this.type
        } else {
            if (this.type!=='nav') {
            Roo.log('nav type must be nav/tabs/pills')
            }
            cfg.cn[0].cls += ' navbar-nav'
        }
        
        if (['stacked','justified'].indexOf(this.arrangement)!==-1) {
            cfg.cn[0].cls += ' nav-' + this.arrangement;
        }
        
        if (this.align === 'right') {
            cfg.cn[0].cls += ' navbar-right';
        }
        if (this.inverse) {
            cfg.cls += ' navbar-inverse';
            
        }
        
        
        return cfg;
    },
    
    initEvents :function ()
    {
        //Roo.log(this.el.select('.navbar-toggle',true));
        this.el.select('.navbar-toggle',true).on('click', function() {
           // Roo.log('click');
            this.el.select('.navbar-collapse',true).toggleClass('in');                                 
        }, this);
        
        var mark = {
            tag: "div",
            cls:"x-dlg-mask"
        }
        
        this.maskEl = Roo.DomHelper.append(this.el, mark, true);
        
        var size = this.el.getSize();
        this.maskEl.setSize(size.width, size.height);
        this.maskEl.enableDisplayMode("block");
        
        if(this.disable){
            this.maskEl.show();
        }
    },
    
    
    getChildContainer : function()
    {
        if (this.bar === true) {
            return this.el.select('.collapse',true).first();
        }
        console.log(this);
        return this.el;
    }
   
});

 

 