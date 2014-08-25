/*
 * - LGPL
 *
 * row
 * 
 */

/**
 * @class Roo.bootstrap.NavSidebarItem
 * @extends Roo.bootstrap.Component
 * Bootstrap Navbar.NavSidebarItem class
 * @cfg {String} href  link to
 * @cfg {String} html content of button
 * @cfg {String} badge text inside badge
 * @cfg {String} glyphicon name of glyphicon
 * @cfg {String} icon name of font awesome icon
 * @cfg {Boolean} active Is item active
 * @cfg {Boolean} preventDefault (true | false) default false
 * @cfg {String} tabId the tab that this item activates.
  
 * @constructor
 * Create a new Navbar Button
 * @param {Object} config The config object
 */
Roo.bootstrap.Navbar.Item = function(config){
    Roo.bootstrap.Navbar.Item.superclass.constructor.call(this, config);
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

Roo.extend(Roo.bootstrap.Navbar.Item, Roo.bootstrap.Component,  {
    
    href: false,
    html: '',
    badge: '',
    icon: false,
    glyphicon: false,
    active: false,
    preventDefault : false,
    tabId : false,
    
    getAutoCreate : function(){
        
        var cfg = Roo.apply({}, Roo.bootstrap.Navbar.Item.superclass.getAutoCreate.call(this));
	
        
        cfg = {
            tag: 'li',
            cls: '',
            cn: [
                {
                tag: 'p',
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
        
        if (this.menu) {
            cfg.cn[0].cls += ' dropdown-toggle';
            cfg.cn[0].html = (cfg.cn[0].html || this.html) + '<span class="glyphicon glyphicon-chevron-down"></span>';
        }
        
        if (this.href) {
            cfg.cn[0].tag = 'a',
            cfg.cn[0].href = this.href;
        }
        
        if (this.badge !== '') {
            
            cfg.cn[0].cn=[
            cfg.cn[0].html + ' ',
            {
                tag: 'span',
                cls: 'badge',
                html: this.badge
            }
            ];
            cfg.cn[0].html=''
        }
        
        // fixme - this should handle glyphicon or ico
        if (this.glyphicon || this.icon) {
            var c = this.glyphicon  ? ('glyphicon glyphicon-'+this.glyphicon)  : this.icon;
            
            cfg.cn[0].html = '<i class="' +c+'"></i><span>' + cfg.cn[0].html || this.html + '</span>'
        }
        
        
        return cfg;
         
	   
    },
    initEvents: function() {
       // Roo.log('init events?');
       // Roo.log(this.el.dom);
        this.el.select('a',true).on('click', this.onClick, this);
        // at this point parent should be available..
        this.parent().register(this);
    },
    
    onClick : function(e)
    {
        if(this.preventDefault){
            e.preventDefault();
        }
        
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
        this.active = state;
        if (!state ) {
            this.el.removeClass('active');
        } else if (!this.el.hasClass('active')) {
            this.el.addClass('active');
        }
        if (fire) {
            this.fireEvent('changed', this, state);
        }
	
	
    }
     // this should not be here...
 
});
 

 