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
 * @cfg {String} navId - reference Id for navbar.

 * 
 * @constructor
 * Create a new nav group
 * @param {Object} config The config object
 */

Roo.bootstrap.NavGroup = function(config){
    Roo.bootstrap.NavGroup.superclass.constructor.call(this, config);
    this.navItems = [];
    Roo.bootstrap.NavGroup.register(this);
     this.addEvents({
        /**
	     * @event itemactivate
	     * Fires when the active item changes
	     * @param {Roo.bootstrap.NavGroup} this
	     * @param {Roo.bootstrap.Navbar.Item} item The item selected
	     * @param {Roo.bootstrap.Navbar.Item} item The previously selected item 
         */
        'changed': true
     });
    
};

Roo.extend(Roo.bootstrap.NavGroup, Roo.bootstrap.Component,  {
    
    align: '',
    inverse: false,
    form: false,
    type: 'nav',
    navId : '',
    // private
    
    navItems : false,
    
    getAutoCreate : function()
    {
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
    
    setActiveItem : function(item)
    {
        var prev = false;
        Roo.each(this.navItems, function(v){
            if (v.isActive()) {
                v.setActive(false, false);
                prev = v;
                
            }
            
        });

        item.el.setActive('active', false);
        this.fireEvent('itemactivate', this, item, prev);
        
        
    },
    
    
    register : function(item)
    {
	this.navItems.push( item);
	item.navId = this.navId;
    
    }
    
});

 
Roo.apply(Roo.bootstrap.NavGroup, {
    
    groups: {},
    
    register : function(navgrp)
    {
	this.groups[navgrp.navId] = navgrp;
	
    }
    
    
    
});

 