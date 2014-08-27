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
 * @extends Roo.bootstrap.Component
 * Bootstrap Navbar.NavSidebarItem class
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
	    * @param {Roo.bootstrap.Navbar.Item} this
	    * @param {boolean} state the new state
	     
         */
        'changed': true
    });
   
};

Roo.extend(Roo.bootstrap.NavSidebarItem, Roo.bootstrap.NavItem,  {
    
    
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
        var right = false;
        // fixme - this should handle glyphicon or ico
        if (this.glyphicon || this.icon) {
            var c = this.glyphicon  ? ('glyphicon glyphicon-'+this.glyphicon)  : this.icon;
            right = { tag : 'i', cls : c };
            a.cn.push(right) ;
        }
        a.cn.push(span);
        
        if (this.badge !== '') {
            a.push({ tag: 'span',  cls : 'badge pull-right ' + (this.badgecls || ''), html: this.badge }); 
        }
        
        if (this.menu) {
            right = right || { tag : 'i', cls : '' };
            a.cls += ' dropdown-toggle treeview';
            right.cls += 'glyphicon glyphicon-chevron-down';
        }
        
        
        
        return cfg;
         
	   
    }
   
     
 
});
 

 