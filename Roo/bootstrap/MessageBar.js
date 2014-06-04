/*
 * - LGPL
 *
 * element
 * 
 */

/**
 * @class Roo.bootstrap.MessageBar
 * @extends Roo.bootstrap.Component
 * Bootstrap MessageBar class
 * @cfg {String} html contents of the MessageBar
 * @cfg {String} weight (info | success | warning | danger) default info
 * @cfg {Boolean} closable (true | false) default true
 * 
 * @constructor
 * Create a new Element
 * @param {Object} config The config object
 */

Roo.bootstrap.MessageBar = function(config){
    Roo.bootstrap.MessageBar.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.MessageBar, Roo.bootstrap.Component,  {
    
    html: '',
    weight: 'info',
    closable: true,
    
    getAutoCreate : function(){
        
        var cfg = {
            tag: 'div',
            cls: 'alert alert-dismissable alert-messages alert-' + this.weight,
            html: this.html || ''
        }
        
        if(this.closable){
            cfg.cn = {
                tag: 'button',
                cls: 'close',
                html: 'x'
            }
        }
        
        return cfg;
    },
    
    onRender : function(ct, position)
    {
        Roo.bootstrap.Component.superclass.onRender.call(this, ct, position);
        
        if(!this.el){
            var cfg = Roo.apply({},  this.getAutoCreate());
            cfg.id = Roo.id();
            //if(!cfg.name){
            //    cfg.name = typeof(this.name) == 'undefined' ? this.id : this.name;
            //}
            //if (!cfg.name.length) {
            //    delete cfg.name;
           // }
            if (this.cls) {
                cfg.cls += ' ' + this.cls;
            }
            if (this.style) {
                cfg.style = this.style;
            }
            this.el = Roo.get(document.body).createChild(cfg, position);
        }
        
        this.el.select('>button.close').on('click', this.hide, this);
        
    },
    
    show : function()
    {
        if (!this.rendered) {
            this.render();
        }
        
        Roo.select('.bootstrap-sticky-wrap', true).first().setStyle('margin-top', this.el.getHeight() + 'px');
        
        var navbar_fixed_top = Roo.select('.navbar-fixed-top', true).first();
        
        if(navbar_fixed_top != null){
            navbar_fixed_top.setStyle('margin-top', this.el.getHeight() + 'px');
        }
        
    },
    
    hide : function()
    {
        this.el.hide();
        
        Roo.select('.bootstrap-sticky-wrap', true).first().setStyle('margin-top', '0px');
        
        var navbar_fixed_top = Roo.select('.navbar-fixed-top', true).first();
        
        if(navbar_fixed_top != null){
            navbar_fixed_top.setStyle('margin-top', '0px');
        }
    }
   
});

 

 