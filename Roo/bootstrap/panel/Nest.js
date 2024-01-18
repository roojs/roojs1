
/**
 * @class Roo.bootstrap.panel.Nest
 * @extends Roo.bootstrap.panel.Content
 * @constructor
 * Create a new Panel, that can contain a layout.Border.
 * 
 * 
 * @param {String/Object} config A string to set only the title or a config object
 */
Roo.bootstrap.panel.Nest = function(config)
{
    // construct with only one argument..
    /* FIXME - implement nicer consturctors
    if (layout.layout) {
        config = layout;
        layout = config.layout;
        delete config.layout;
    }
    if (layout.xtype && !layout.getEl) {
        // then layout needs constructing..
        layout = Roo.factory(layout, Roo);
    }
    */
    
    config.el =  config.layout.getEl();
    
    Roo.bootstrap.panel.Nest.superclass.constructor.call(this, config);
    
    config.layout.monitorWindowResize = false; // turn off autosizing
    this.layout = config.layout;
    this.layout.getEl().addClass("roo-layout-nested-layout");
    this.layout.parent = this;
    
    
    
    
};

Roo.extend(Roo.bootstrap.panel.Nest, Roo.bootstrap.panel.Content, {
    /**
    * @cfg {Roo.layout.Border} layout The layout for this panel
    */
    layout : false,

    setSize : function(width, height){
        if(!this.ignoreResize(width, height)){
            var size = this.adjustForComponents(width, height);
            var el = this.layout.getEl();
            if (size.height < 1) {
                el.setWidth(size.width);   
            } else {
                el.setSize(size.width, size.height);
            }
            var touch = el.dom.offsetWidth;
            this.layout.layout();
            // ie requires a double layout on the first pass
            if(Roo.isIE && !this.initialized){
                this.initialized = true;
                this.layout.layout();
            }
        }
    },
    
    // activate all subpanels if not currently active..
    
    setActiveState : function(active){
        this.active = active;
        this.setActiveClass(active);
        
        if(!active){
            this.fireEvent("deactivate", this);
            return;
        }
        
        this.fireEvent("activate", this);
        // not sure if this should happen before or after..
        if (!this.layout) {
            return; // should not happen..
        }
        var reg = false;
        for (var r in this.layout.regions) {
            reg = this.layout.getRegion(r);
            if (reg.getActivePanel()) {
                //reg.showPanel(reg.getActivePanel()); // force it to activate.. 
                reg.setActivePanel(reg.getActivePanel());
                continue;
            }
            if (!reg.panels.length) {
                continue;
            }
            reg.showPanel(reg.getPanel(0));
        }
        
        
        
        
    },
    
    /**
     * Returns the nested BorderLayout for this panel
     * @return {Roo.layout.Border} 
     */
    getLayout : function(){
        return this.layout;
    },
    
     /**
     * Adds a xtype elements to the layout of the nested panel
     * <pre><code>

panel.addxtype({
       xtype : 'ContentPanel',
       region: 'west',
       items: [ .... ]
   }
);

panel.addxtype({
        xtype : 'NestedLayoutPanel',
        region: 'west',
        layout: {
           center: { },
           west: { }   
        },
        items : [ ... list of content panels or nested layout panels.. ]
   }
);
</code></pre>
     * @param {Object} cfg Xtype definition of item to add.
     */
    addxtype : function(cfg) {
        return this.layout.addxtype(cfg);
    
    }
});