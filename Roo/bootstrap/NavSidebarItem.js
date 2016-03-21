/*
 * - LGPL
 *
 * sidebar item
 *
 *  li
 *    <span> icon </span>
 *    <span> text </span>
 *    <span>badge </span>
 */

/**
 * @class Roo.bootstrap.NavSidebarItem
 * @extends Roo.bootstrap.NavItem
 * Bootstrap Navbar.NavSidebarItem class
 * {String} badgeWeight (default|primary|success|info|warning|danger)the extra classes for the badge
 * @constructor
 * Create a new Navbar Button
 * @param {Object} config The config object
 */
Roo.bootstrap.NavSidebarItem = function(config){
    Roo.bootstrap.NavSidebarItem.superclass.constructor.call(this, config);
    this.addEvents({
        // raw events
        /**
         * @event click
         * The raw click event for the entire grid.
         * @param {Roo.EventObject} e
         */
        "click" : true,
	 /**
	    * @event changed
	    * Fires when the active item active state changes
	    * @param {Roo.bootstrap.NavSidebarItem} this
	    * @param {boolean} state the new state
	     
         */
        'changed': true
    });
   
};

Roo.extend(Roo.bootstrap.NavSidebarItem, Roo.bootstrap.NavItem,  {
    
    badgeWeight : 'default',
    
    getAutoCreate : function(){
        
        
        var a = {
                tag: 'a',
                href : this.href || '#',
                cls: '',
                html : '',
                cn : []
        };
        var cfg = {
            tag: 'li',
            cls: '',
            cn: [ a ]
        }
        var span = {
            tag: 'span',
            html : this.html || ''
        }
        
        
        if (this.active) {
            cfg.cls += ' active';
        }
        
        // left icon..
        if (this.glyphicon || this.icon) {
            var c = this.glyphicon  ? ('glyphicon glyphicon-'+this.glyphicon)  : this.icon;
            a.cn.push({ tag : 'i', cls : c }) ;
        }
        // html..
        a.cn.push(span);
        // then badge..
        if (this.badge !== '') {
            
            a.cn.push({ tag: 'span',  cls : 'badge pull-right badge-' + this.badgecls, html: this.badge }); 
        }
        // fi
        if (this.menu) {
            a.cn.push({ tag : 'i', cls : 'glyphicon glyphicon-chevron-down pull-right'});
            a.cls += 'dropdown-toggle treeview' ;
            
        }
        
        
        
        return cfg;
         
	   
    },
    
    initEvents : function()
    { 
        
    }
   
     
 
});
 

 