/*
 * - LGPL
 *
 * navbar
 * navbar-fixed-top
 * navbar-expand-md  fixed-top 
 */

/**
 * @class Roo.bootstrap.NavHeaderbar
 * @extends Roo.bootstrap.NavSimplebar
 * Bootstrap Sidebar class
 *
 * @cfg {String} brand what is brand
 * @cfg {String} position (fixed-top|fixed-bottom|static-top) position
 * @cfg {String} brand_href href of the brand
 * @cfg {Boolean} srButton generate the (screen reader / mobile) sr-only button   default true
 * @cfg {Boolean} autohide a top nav bar header that hides on scroll.
 * @cfg {Boolean} desktopCenter should the header be centered on desktop using a container class
 * @cfg {Roo.bootstrap.Row} mobilerow - a row to display on mobile only..
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
    brand: '',
    brand_href: false,
    srButton : true,
    autohide : false,
    desktopCenter : false,
   
    
    getAutoCreate : function(){
        
        var   cfg = {
            tag: this.nav || 'nav',
            cls: 'navbar navbar-expand-md',
            role: 'navigation',
            cn: []
        };
        
        var cn = cfg.cn;
        if (this.desktopCenter) {
            cn.push({cls : 'container', cn : []});
            cn = cn[0].cn;
        }
        
        if(this.srButton){
            var btn = {
                tag: 'button',
                type: 'button',
                cls: 'navbar-toggle navbar-toggler',
                'data-toggle': 'collapse',
                cn: [
                    {
                        tag: 'span',
                        cls: 'sr-only',
                        html: 'Toggle navigation'
                    },
                    {
                        tag: 'span',
                        cls: 'icon-bar navbar-toggler-icon'
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
            };
            
            cn.push( Roo.bootstrap.version == 4 ? btn : {
                tag: 'div',
                cls: 'navbar-header',
                cn: [
                    btn
                ]
            });
        }
        
        cn.push({
            tag: 'div',
            cls: Roo.bootstrap.version == 4  ? 'nav flex-row roo-navbar-collapse' : 'collapse navbar-collapse roo-navbar-collapse',
            cn : []
        });
        
        cfg.cls += this.inverse ? ' navbar-inverse navbar-dark bg-dark' : ' navbar-default';
        
        if (['light','white'].indexOf(this.weight) > -1) {
	    cfg.cls += ['light','white'].indexOf(this.weight) > -1 ? ' navbar-light' : ' navbar-dark';
	}
	cfg.cls += ' bg-' + this.weight;
        
        
        if (['fixed-top','fixed-bottom','static-top'].indexOf(this.position)>-1) {
            cfg.cls += ' navbar-' + this.position + ' ' + this.position ;
            
            // tag can override this..
            
            cfg.tag = this.tag || (this.position  == 'fixed-bottom' ? 'footer' : 'header');
        }
        
        if (this.brand !== '') {
            var cp =  Roo.bootstrap.version == 4 ? cn : cn[0].cn;
            cp.unshift({ // changed from push ?? BS4 needs it at the start? - does this break or exsiting?
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

        
    },
    getHeaderChildContainer : function()
    {
        if (this.srButton && this.el.select('.navbar-header').getCount()) {
            return this.el.select('.navbar-header',true).first();
        }
        
        return this.getChildContainer();
    },
    
    
    initEvents : function()
    {
        Roo.bootstrap.NavHeaderbar.superclass.initEvents.call(this);
        
        if (this.autohide) {
            
            var prevScroll = 0;
            var ft = this.el;
            
            Roo.get(document).on('scroll',function(e) {
                var ns = Roo.get(document).getScroll().top;
                var os = prevScroll;
                prevScroll = ns;
                
                if(ns > os){
                    ft.removeClass('slideDown');
                    ft.addClass('slideUp');
                    return;
                }
                ft.removeClass('slideUp');
                ft.addClass('slideDown');
                 
              
          },this);
        }
    }    
    
});



 

 