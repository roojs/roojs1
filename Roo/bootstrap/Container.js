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
 * @cfg {String} alert (success|info|warning|danger) type alert (changes background / border...)
 * @cfg {String} fa (ban|check|...) font awesome icon
 * @cfg {String} icon (info-sign|check|...) glyphicon name
 * @cfg {Boolean} hidden (true|false) hide the element
 * @cfg {Boolean} expandable (true|false) default false
 * @cfg {Boolean} expanded (true|false) default true
 * @cfg {String} rheader contet on the right of header

 *     
 * @constructor
 * Create a new Container
 * @param {Object} config The config object
 */

Roo.bootstrap.Container = function(config){
    Roo.bootstrap.Container.superclass.constructor.call(this, config);
    
    this.addEvents({
        // raw events
         /**
         * @event expand
         * After the panel has been expand
         * 
         * @param {Roo.bootstrap.Container} this
         */
        "expand" : true,
        /**
         * @event collapse
         * After the panel has been collapsed
         * 
         * @param {Roo.bootstrap.Container} this
         */
        "collapse" : true
    });
};

Roo.extend(Roo.bootstrap.Container, Roo.bootstrap.Component,  {
    
    jumbotron : false,
    well: '',
    panel : '',
    header: '',
    footer : '',
    sticky: '',
    tag : false,
    alert : false,
    fa: false,
    icon : false,
    expandable : false,
    rheader : '',
    expanded : true,
  
     
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
        
        if (this.hidden) {
            cfg.cls += ' hidden';
        }
        
        
        if (this.alert && ["success","info","warning", "danger"].indexOf(this.alert) > -1) {
            cfg.cls +=' alert alert-' + this.alert;
        }
        
        var body = cfg;
        
        if (this.panel.length) {
            cfg.cls += ' panel panel-' + this.panel;
            cfg.cn = [];
            if (this.header.length) {
                
                var h = [];
                
                if(this.expandable){
                    
                    cfg.cls = cfg.cls + ' expandable';
                    
                    h.push({
                        tag: 'i',
                        cls: (this.expanded ? 'fa fa-minus' : 'fa fa-plus') 
                    });
                    
                }
                
                h.push(
                    {
                        tag: 'span',
                        cls : 'panel-title',
                        html : (this.expandable ? '&nbsp;' : '') + this.header
                    },
                    {
                        tag: 'span',
                        cls: 'panel-header-right',
                        html: this.rheader
                    }
                );
                
                cfg.cn.push({
                    cls : 'panel-heading',
                    cn : h
                });
                
            }
            
            body = false;
            cfg.cn.push({
                cls : 'panel-body' + (this.expanded ? '' : ' hide'),
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
            // prefix with the icons..
            if (this.fa) {
                body.html = '<i class="fa fa-'+this.fa + '"></i>' + body.html ;
            }
            if (this.icon) {
                body.html = '<i class="glyphicon glyphicon-'+this.icon + '"></i>' + body.html ;
            }
            
            
        }
        if ((!this.cls || !this.cls.length) && (!cfg.cls || !cfg.cls.length)) {
            cfg.cls =  'container';
        }
        
        return cfg;
    },
    
    initEvents: function() 
    {
        if(!this.expandable){
            return;
        }
        
        var headerEl = this.headerEl();
        
        if(!headerEl){
            return;
        }
        
        headerEl.on('click', this.onToggleClick, this);
        
    },
    
    onToggleClick : function()
    {
        var headerEl = this.headerEl();
        
        if(!headerEl){
            return;
        }
        
        if(this.expanded){
            this.collapse();
            return;
        }
        
        this.expand();
    },
    
    expand : function()
    {
        if(this.fireEvent('expand', this)) {
            
            this.expanded = true;
            
            //this.el.select('.panel-body',true).first().setVisibilityMode(Roo.Element.DISPLAY).show();
            
            this.el.select('.panel-body',true).first().removeClass('hide');
            
            var toggleEl = this.toggleEl();

            if(!toggleEl){
                return;
            }

            toggleEl.removeClass(['fa-minus', 'fa-plus']).addClass(['fa-minus']);
        }
        
    },
    
    collapse : function()
    {
        if(this.fireEvent('collapse', this)) {
            
            this.expanded = false;
            
            //this.el.select('.panel-body',true).first().setVisibilityMode(Roo.Element.DISPLAY).hide();
            this.el.select('.panel-body',true).first().addClass('hide');
        
            var toggleEl = this.toggleEl();

            if(!toggleEl){
                return;
            }

            toggleEl.removeClass(['fa-minus', 'fa-plus']).addClass(['fa-plus']);
        }
    },
    
    toggleEl : function()
    {
        if(!this.el || !this.panel.length || !this.header.length || !this.expandable){
            return;
        }
        
        return this.el.select('.panel-heading .fa',true).first();
    },
    
    headerEl : function()
    {
        if(!this.el || !this.panel.length || !this.header.length){
            return;
        }
        
        return this.el.select('.panel-heading',true).first()
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
    },
    
    setRightTitle : function(v)
    {
        var t = this.el.select('.panel-header-right',true).first();
        
        if(!t){
            return;
        }
        
        t.dom.innerHTML = v;
    }
   
});

 