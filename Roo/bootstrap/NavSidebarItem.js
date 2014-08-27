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
        
        var cfg = {
            tag: 'li',
            cls: '',
            cn: [
                {
                tag: 'a',
                href : '#'
                cls: '',
                html : ''
                }
            ]
        }
        
        if (this.html) {
            cfg.cn[0].html = this.html;
        }
        
        if (this.active) {
            this.cls += ' active';
        }
        
        
        
        if (this.href) {
            cfg.cn[0].tag = 'a',
            cfg.cn[0].href = this.href;
        }
        
        if (this.badge !== '') {
            cfg.cn[0].html += ' <span class="badge">' + this.badge + '</span>';
        }
        
        if (this.menu) {
            cfg.cn[0].cls += ' dropdown-toggle treeview';
            cfg.cn[0].html += '<span class="glyphicon glyphicon-chevron-down"></span>';
        }
        
        // fixme - this should handle glyphicon or ico
        if (this.glyphicon || this.icon) {
            var c = this.glyphicon  ? ('glyphicon glyphicon-'+this.glyphicon)  : this.icon;
            cfg.cn[0].html = '<i class="' +c+'"></i><span>' + cfg.cn[0].html  + '</span>'
        }
        
        
        return cfg;
         
	   
    }
   
     
 
});
 

 