/*
 * - LGPL
 *
 * TabPanel
 * 
 */

/**
 * @class Roo.bootstrap.TabPanel
 * @extends Roo.bootstrap.Component
 * Bootstrap TabPanel class
 * @cfg {Boolean} active panel active
 * @cfg {String} html panel content
 * @cfg {String} tabId tab relate id
 * @cfg {String} navId The Roo.bootstrap.NavGroup which triggers show hide ()
 * 
 * 
 * @constructor
 * Create a new TabPanel
 * @param {Object} config The config object
 */

Roo.bootstrap.TabPanel = function(config){
    Roo.bootstrap.TabPanel.superclass.constructor.call(this, config);
     this.addEvents({
        /**
	     * @event changed
	     * Fires when the active status changes
	     * @param {Roo.bootstrap.TabPanel} this
	     * @param {Boolean} state the new state
	    
         */
        'changed': true
     });
    this.navId = this.navId  || Roo.id();
    
          // not really needed.. but just in case.. parent should be a NavGroup.
    var tg = Roo.bootstrap.TabGroup.get(p.navId);
    this.navId = this.navId || p.navId;
    Roo.log(['register', tg, this]);
    tg.register(this);
    
};

Roo.extend(Roo.bootstrap.TabPanel, Roo.bootstrap.Component,  {
    
    active: false,
    html: false,
    tabId: false,
    navId : false,
    
    getAutoCreate : function(){
        var cfg = {
            tag: 'div',
            cls: 'tab-pane',
            html: this.html || ''
        };
        
        if(this.active){
            cfg.cls += ' active';
        }
        
        if(this.tabId){
            cfg.tabId = this.tabId;
        }
        
        return cfg;
    },
    onRender : function(ct, position)
    {
       // Roo.log("Call onRender: " + this.xtype);
        
        Roo.bootstrap.TabPanel.superclass.onRender.call(this, ct, position);
        
        // registration with navgroups..
        if (this.navId && this.tabId) {
            var grp = Roo.bootstrap.NavGroup.get(this.navId);
            if (grp) {
                //code
                var item = grp.getNavItem(this.tabId);
                if (!item) {
                    Roo.log("could not find navID:"  + this.navId + ", tabId: " + this.tabId);
                } else {
                    item.on('changed', function(item, state) {
                        this.setActive(state);
                    }, this);
                }
            }
        }
        // tabgroup.
        var p = this.parent();
       
        
        
    },
    setActive: function(state)
    {
        Roo.log("panel - set active " + this.tabId + "=" + state);
        
        this.active = state;
        if (!state) {
            this.el.removeClass('active');
            
        } else  if (!this.el.hasClass('active')) {
            this.el.addClass('active');
        }
        this.fireEvent('changed', this, state);
    }
    
    
});
 

 

 