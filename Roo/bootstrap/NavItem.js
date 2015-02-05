/*
 * - LGPL
 *
 * row
 * 
 */

/**
 * @class Roo.bootstrap.NavItem
 * @extends Roo.bootstrap.Component
 * Bootstrap Navbar.NavItem class
 * @cfg {String} href  link to
 * @cfg {String} html content of button
 * @cfg {String} badge text inside badge
 * @cfg {String} badgecls (bg-green|bg-red|bg-yellow)the extra classes for the badge
 * @cfg {String} glyphicon name of glyphicon
 * @cfg {String} icon name of font awesome icon
 * @cfg {Boolean} active Is item active
 * @cfg {Boolean} disabled Is item disabled
 
 * @cfg {Boolean} preventDefault (true | false) default false
 * @cfg {String} tabId the tab that this item activates.
 * @cfg {String} tagtype (a|span) render as a href or span?
  
 * @constructor
 * Create a new Navbar Item
 * @param {Object} config The config object
 */
Roo.bootstrap.NavItem = function(config){
    Roo.bootstrap.NavItem.superclass.constructor.call(this, config);
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
	    * @param {Roo.bootstrap.NavItem} this
	    * @param {boolean} state the new state
	     
         */
        'changed': true
    });
   
};

Roo.extend(Roo.bootstrap.NavItem, Roo.bootstrap.Component,  {
    
    href: false,
    html: '',
    badge: '',
    icon: false,
    glyphicon: false,
    active: false,
    preventDefault : false,
    tabId : false,
    tagtype : 'a',
    disabled : false,
    
    was_active : false,
    
    getAutoCreate : function(){
         
        var cfg = {
            tag: 'li',
            cls: 'nav-item'
            
        }
        if (this.active) {
            cfg.cls = typeof(cfg.cls) == 'undefined' ? 'active' : cfg.cls + ' active';
        }
        if (this.disabled) {
            cfg.cls += ' disabled';
        }
        
        if (this.href || this.html || this.glyphicon || this.icon) {
            cfg.cn = [
                {
                    tag: this.tagtype,
                    href : this.href || "#",
                    html: this.html || ''
                }
            ];
            
            if (this.icon) {
                cfg.cn[0].html = '<i class="'+this.icon+'"></i> <span>' + cfg.cn[0].html + '</span>'
            }

            if(this.glyphicon) {
                cfg.cn[0].html = '<span class="glyphicon glyphicon-' + this.glyphicon + '"></span> '  + cfg.cn[0].html;
            }
            
            if (this.menu) {
                
                cfg.cn[0].html += " <span class='caret'></span>";
             
            }
            
            if (this.badge !== '') {
                 
                cfg.cn[0].html += ' <span class="badge">' + this.badge + '</span>';
            }
        }
        
        
        
        return cfg;
    },
    initEvents: function() {
       // Roo.log('init events?');
       // Roo.log(this.el.dom);
        if (typeof (this.menu) != 'undefined') {
            this.menu.parentType = this.xtype;
            this.menu.triggerEl = this.el;
            this.addxtype(Roo.apply({}, this.menu));
        }

       
        this.el.select('a',true).on('click', this.onClick, this);
        // at this point parent should be available..
        this.parent().register(this);
    },
    
    onClick : function(e)
    {
         
        if(this.preventDefault){
            e.preventDefault();
        }
        if (this.disabled) {
            return;
        }
        Roo.log("fire event clicked");
        if(this.fireEvent('click', this, e) === false){
            return;
        };
        
        if (['tabs','pills'].indexOf(this.parent().type)!==-1) {
            if (typeof(this.parent().setActiveItem) !== 'undefined') {
                this.parent().setActiveItem(this);
            }
        } 
    },
    
    isActive: function () {
        return this.active
    },
    setActive : function(state, fire)
    {
        if (this.active && !state & this.navId) {
            this.was_active = true;
            var nv = Roo.bootstrap.NavGroup.get(this.navId);
            if (nv) {
                nv.clearWasActive(this);
            }
            
        }
        this.active = state;
        
        if (!state ) {
            this.el.removeClass('active');
        } else if (!this.el.hasClass('active')) {
            this.el.addClass('active');
        }
        if (fire) {
            this.fireEvent('changed', this, state);
        }
        
        // show a panel if it's registered and related..
        
        if (!this.navId || !this.tabId || !state) {
            return;
        }
        
        var tg = Roo.bootstrap.TabGroup.get(this.navId);
        if (!tg) {
            return;
        }
        var pan = tg.getPanelByName(this.tabId);
        if (!pan) {
            return;
        }
        // if we can not flip to new panel - go back to old nav highlight..
        if (false == tg.showPanel(pan)) {
            var nv = Roo.bootstrap.NavGroup.get(this.navId);
            if (nv) {
                var onav = nv.getWasActive();
                if (onav) {
                    onav.setActive(true, false);
                }
            }
            
        }
        
        
	
    },
     // this should not be here...
    setDisabled : function(state)
    {
        this.disabled = state;
        if (!state ) {
            this.el.removeClass('disabled');
        } else if (!this.el.hasClass('disabled')) {
            this.el.addClass('disabled');
        }
        
    }
});
 

 