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
 * @cfg {String} navId The navbar which triggers show hide
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
        
        if (this.navId && this.tabId) {
            var item = Roo.bootstrap.NavGroup.get(this.navId).getNavItem(this.tabId);
            if (!item) {
                Roo.log("could not find navID:"  + this.navId + ", tabId: " + this.tabId);
            } else {
                item.on('changed', function(item, state, e) {
                    Roo.log(e);
                    this.setActive(state);
                }, this);
            }
        }
        
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
 

 

 