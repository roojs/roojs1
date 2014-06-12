/*
 * - LGPL
 *
 * nav group
 * 
 */

/**
 * @class Roo.bootstrap.NavGroup
 * @extends Roo.bootstrap.Component
 * Bootstrap NavGroup class
 * @cfg {String} align left | right
 * @cfg {Boolean} inverse false | true
 * @cfg {String} type (nav|pills|tab) default nav
 * @cfg {Boolean} disable (true|false) disable the bar, add marks
 * 
 * @constructor
 * Create a new nav group
 * @param {Object} config The config object
 */

Roo.bootstrap.NavGroup = function(config){
    Roo.bootstrap.NavGroup.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.NavGroup, Roo.bootstrap.Component,  {
    
    align: '',
    inverse: false,
    form: false,
    type: 'nav',
    disable : false,
    
    getAutoCreate : function(){
        var cfg = Roo.apply({}, Roo.bootstrap.NavGroup.superclass.getAutoCreate.call(this));
        
        cfg = {
            tag : 'ul',
            cls: 'nav' 
        }
        
        if (['tabs','pills'].indexOf(this.type)!==-1) {
            cfg.cls += ' nav-' + this.type
        } else {
            if (this.type!=='nav') {
                Roo.log('nav type must be nav/tabs/pills')
            }
            cfg.cls += ' navbar-nav'
        }
        
        if (this.parent().sidebar === true) {
            cfg = {
                tag: 'ul',
                cls: 'dashboard-menu'
            }
            
            return cfg;
        }
        
        if (this.form === true) {
            cfg = {
                tag: 'form',
                cls: 'navbar-form'
            }
            
            if (this.align === 'right') {
                cfg.cls += ' navbar-right';
            } else {
                cfg.cls += ' navbar-left';
            }
        }
        
        if (this.align === 'right') {
            cfg.cls += ' navbar-right';
        }
        
        if (this.inverse) {
            cfg.cls += ' navbar-inverse';
            
        }
        
        
        return cfg;
    },
    
    initEvents :function ()
    {
        Roo.bootstrap.NavGroup.superclass.initEvents.call(this);
        
        var mark = {
            tag: "div",
            cls:"x-dlg-mask"
        }
        
        this.maskEl = Roo.DomHelper.append(this.el, mark, true);
        
        var size = this.el.getSize();
        if(this.disable && this.sidebar){
            Roo.log('size!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            Roo.log(this.el);
            var a = this.el.select('.dashboard-menu', true).first();
            Roo.log(a);
            
        }
        this.maskEl.setSize(size.width, size.height);
        this.maskEl.enableDisplayMode("block");
        
        if(this.disable){
            this.maskEl.show();
        }
    }
   
});

 

 