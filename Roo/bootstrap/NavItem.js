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
 * @cfg {String} button_weight (default | primary | secondary | success | info | warning | danger | link ) default none

 * @cfg {String} html content of button
 * @cfg {String} badge text inside badge
 * @cfg {String} badgecls (bg-green|bg-red|bg-yellow)the extra classes for the badge
 * @cfg {String} glyphicon DEPRICATED - use fa
 * @cfg {String} icon DEPRICATED - use fa
 * @cfg {String} fa - Fontawsome icon name (can add stuff to it like fa-2x)
 * @cfg {Boolean} active Is item active
 * @cfg {Boolean} disabled Is item disabled
 
 * @cfg {Boolean} preventDefault (true | false) default false
 * @cfg {String} tabId the tab that this item activates.
 * @cfg {String} tagtype (a|span) render as a href or span?
 * @cfg {Boolean} animateRef (true|false) link to element default false  
  
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
        'changed': true,
        /**
	    * @event scrollto
	    * Fires when scroll to element
	    * @param {Roo.bootstrap.NavItem} this
	    * @param {Object} options
            * @param {Roo.EventObject} e
	     
         */
        'scrollto': true
    });
   
};

Roo.extend(Roo.bootstrap.NavItem, Roo.bootstrap.Component,  {
    
    href: false,
    html: '',
    badge: '',
    icon: false,
    fa : false,
    glyphicon: false,
    active: false,
    preventDefault : false,
    tabId : false,
    tagtype : 'a',
    tag: 'li',
    disabled : false,
    animateRef : false,
    was_active : false,
    button_weight : '',
    button_outline : false,
    
    navLink: false,
    
    getAutoCreate : function(){
         
        var cfg = {
            tag: this.tag,
            cls: 'nav-item'
        };
        
        if (this.active) {
            cfg.cls = typeof(cfg.cls) == 'undefined' ? 'active' : cfg.cls + ' active';
        }
        if (this.disabled) {
            cfg.cls += ' disabled';
        }
	
	// BS4 only?
	if (this.button_weight.length) {
	    cfg.tag = this.href ? 'a' : 'button';
	    cfg.html = this.html || '';
	    cfg.cls += ' btn btn' + (this.button_outline ? '-outline' : '') + '-' + this.button_weight;
	    if (this.href) {
		cfg.href = this.href;
	    }
	    if (this.fa) {
                cfg.html = '<i class="fa fas fa-'+this.fa+'"></i> <span>' + this.html + '</span>';
            }
	    
	    // menu .. should add dropdown-menu class - so no need for carat..
	    
	    if (this.badge !== '') {
                 
                cfg.html += ' <span class="badge badge-secondary">' + this.badge + '</span>';
            }
	    return cfg;
	}
        
        if (this.href || this.html || this.glyphicon || this.icon || this.fa) {
            cfg.cn = [
                {
                    tag: this.tagtype,
                    href : this.href || "#",
                    html: this.html || ''
                }
            ];
            if (this.tagtype == 'a') {
		cfg.cn[0].cls = 'nav-link';
	    }
            if (this.icon) {
                cfg.cn[0].html = '<i class="'+this.icon+'"></i> <span>' + cfg.cn[0].html + '</span>';
            }
	    if (this.fa) {
                cfg.cn[0].html = '<i class="fa fas fa-'+this.fa+'"></i> <span>' + cfg.cn[0].html + '</span>';
            }
            if(this.glyphicon) {
                cfg.cn[0].html = '<span class="glyphicon glyphicon-' + this.glyphicon + '"></span> '  + cfg.cn[0].html;
            }
            
            if (this.menu) {
                
                cfg.cn[0].html += " <span class='caret'></span>";
             
            }
            
            if (this.badge !== '') {
                 
                cfg.cn[0].html += ' <span class="badge badge-secondary">' + this.badge + '</span>';
            }
        }
        
        
        
        return cfg;
    },
    onRender : function(ct, position)
    {
       // Roo.log("Call onRender: " + this.xtype);
        if (Roo.bootstrap.version == 4 && ct.dom.type != 'ul') {
	    this.tag = 'div';
	}
	
        var ret = Roo.bootstrap.NavItem.superclass.onRender.call(this, ct, position);
	this.navLink = this.el.select('.nav-link',true).first();
	return ret;
    },
      
    
    initEvents: function() 
    {
        if (typeof (this.menu) != 'undefined') {
            this.menu.parentType = this.xtype;
            this.menu.triggerEl = this.el;
            this.menu = this.addxtype(Roo.apply({}, this.menu));
        }
        
        this.el.select('a',true).on('click', this.onClick, this);
        
        if(this.tagtype == 'span'){
            this.el.select('span',true).on('click', this.onClick, this);
        }
       
        // at this point parent should be available..
        this.parent().register(this);
    },
    
    onClick : function(e)
    {
        if (e.getTarget('.dropdown-menu-item')) {
            // did you click on a menu itemm.... - then don't trigger onclick..
            return;
        }
        
        if(
                this.preventDefault || 
                this.href == '#' 
        ){
            Roo.log("NavItem - prevent Default?");
            e.preventDefault();
        }
        
        if (this.disabled) {
            return;
        }
        
        var tg = Roo.bootstrap.TabGroup.get(this.navId);
        if (tg && tg.transition) {
            Roo.log("waiting for the transitionend");
            return;
        }
        
        
        
        //Roo.log("fire event clicked");
        if(this.fireEvent('click', this, e) === false){
            return;
        };
        
        if(this.tagtype == 'span'){
            return;
        }
        
        //Roo.log(this.href);
        var ael = this.el.select('a',true).first();
        //Roo.log(ael);
        
        if(ael && this.animateRef && this.href.indexOf('#') > -1){
            //Roo.log(["test:",ael.dom.href.split("#")[0], document.location.toString().split("#")[0]]);
            if (ael.dom.href.split("#")[0] != document.location.toString().split("#")[0]) {
                return; // ignore... - it's a 'hash' to another page.
            }
            Roo.log("NavItem - prevent Default?");
            e.preventDefault();
            this.scrollToElement(e);
        }
        
        
        var p =  this.parent();
   
        if (['tabs','pills'].indexOf(p.type)!==-1) {
            if (typeof(p.setActiveItem) !== 'undefined') {
                p.setActiveItem(this);
            }
        }
        
        // if parent is a navbarheader....- and link is probably a '#' page ref.. then remove the expanded menu.
        if (p.parentType == 'NavHeaderbar' && !this.menu) {
            // remove the collapsed menu expand...
            p.parent().el.select('.navbar-collapse',true).removeClass('in');  
        }
    },
    
    isActive: function () {
        return this.active
    },
    setActive : function(state, fire, is_was_active)
    {
        if (this.active && !state && this.navId) {
            this.was_active = true;
            var nv = Roo.bootstrap.NavGroup.get(this.navId);
            if (nv) {
                nv.clearWasActive(this);
            }
            
        }
        this.active = state;
        
        if (!state ) {
            this.el.removeClass('active');
	    this.navLink ? this.navLink.removeClass('active') : false;
        } else if (!this.el.hasClass('active')) {
	    
            this.el.addClass('active');
	    if (Roo.bootstrap.version == 4 && this.navLink ) {
		this.navLink.addClass('active');
	    }
	    
        }
        if (fire) {
            this.fireEvent('changed', this, state);
        }
        
        // show a panel if it's registered and related..
        
        if (!this.navId || !this.tabId || !state || is_was_active) {
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
                    onav.setActive(true, false, true);
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
        
    },
    
    /**
     * Fetch the element to display the tooltip on.
     * @return {Roo.Element} defaults to this.el
     */
    tooltipEl : function()
    {
        return this.el.select('' + this.tagtype + '', true).first();
    },
    
    scrollToElement : function(e)
    {
        var c = document.body;
        
        /*
         * Firefox / IE places the overflow at the html level, unless specifically styled to behave differently.
         */
        if(Roo.isFirefox || Roo.isIE || Roo.isIE11){
            c = document.documentElement;
        }
        
        var target = Roo.get(c).select('a[name=' + this.href.split('#')[1] +']', true).first();
        
        if(!target){
            return;
        }

        var o = target.calcOffsetsTo(c);
        
        var options = {
            target : target,
            value : o[1]
        };
        
        this.fireEvent('scrollto', this, options, e);
        
        Roo.get(c).scrollTo('top', options.value, true);
        
        return;
    }
});
 

 