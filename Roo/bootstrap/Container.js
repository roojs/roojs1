/*
 * - LGPL
 *
 * page container.
 * 
 */


/**
 * @class Roo.bootstrap.Container
 * @extends Roo.bootstrap.Component
 * Bootstrap Container class
 * @cfg {Boolean} jumbotron is it a jumbotron element
 * @cfg {String} html content of element
 * @cfg {String} well (lg|sm|md) a well, large, small or medium.
 * @cfg {String} panel (primary|success|info|warning|danger) render as a panel.
 * @cfg {String} header content of header (for panel)
 * @cfg {String} footer content of footer (for panel)
 * @cfg {String} sticky (footer|wrap|push) block to use as footer or body- needs css-bootstrap/sticky-footer.css
 * @cfg {String} tag (header|aside|section) type of HTML tag.

 *     
 * @constructor
 * Create a new Container
 * @param {Object} config The config object
 */

Roo.bootstrap.Container = function(config){
    Roo.bootstrap.Container.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Container, Roo.bootstrap.Component,  {
    
    jumbotron : false,
    well: '',
    panel : '',
    header: '',
    footer : '',
    sticky: '',
    tag : false,
  
     
    getChildContainer : function() {
        
        if(!this.el){
            return false;
        }
        
        if (this.panel.length) {
            return this.el.select('.panel-body',true).first();
        }
        
        return this.el;
    },
    
    
    getAutoCreate : function(){
        
        var cfg = {
            tag : this.tag || 'div',
            html : '',
            cls : ''
        };
        if (this.jumbotron) {
            cfg.cls = 'jumbotron';
        }
        // - this is applied by the parent..
        //if (this.cls) {
        //    cfg.cls = this.cls + '';
        //}
        
        if (this.sticky.length) {
            
            var bd = Roo.get(document.body);
            if (!bd.hasClass('bootstrap-sticky')) {
                bd.addClass('bootstrap-sticky');
                Roo.select('html',true).setStyle('height', '100%');
            }
             
            cfg.cls += 'bootstrap-sticky-' + this.sticky;
        }
	
	
        if (this.well.length) {
            switch (this.well) {
                case 'lg':
                case 'sm':
                    cfg.cls +=' well well-' +this.well;
                    break;
                default:
                    cfg.cls +=' well';
                    break;
            }
        }
        
        var body = cfg;
        
        if (this.panel.length) {
            cfg.cls += ' panel panel-' + this.panel;
            cfg.cn = [];
            if (this.header.length) {
                cfg.cn.push({
                    
                    cls : 'panel-heading',
                    cn : [{
                        tag: 'h3',
                        cls : 'panel-title',
                        html : this.header
                    }]
                    
                });
            }
            body = false;
            cfg.cn.push({
                cls : 'panel-body',
                html : this.html
            });
            
            
            if (this.footer.length) {
                cfg.cn.push({
                    cls : 'panel-footer',
                    html : this.footer
                    
                });
            }
            
        }
        
        if (body) {
            body.html = this.html || cfg.html;
        }
        if ((!this.cls || !this.cls.length) && (!cfg.cls || !cfg.cls.length)) {
            cfg.cls =  'container';
        }
        
        return cfg;
    },
    
    titleEl : function()
    {
        if(!this.el || !this.panel.length || !this.header.length){
            return;
        }
        
        return this.el.select('.panel-title',true).first();
    },
    
    setTitle : function(v)
    {
        var titleEl = this.titleEl();
        
        if(!titleEl){
            return;
        }
        
        titleEl.dom.innerHTML = v;
    },
    
    getTitle : function()
    {
        
        var titleEl = this.titleEl();
        
        if(!titleEl){
            return '';
        }
        
        return titleEl.dom.innerHTML;
    }
   
});

 