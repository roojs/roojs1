/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */
 
/**
 * @class Roo.bootstrap.layout.Basic
 * @extends Roo.util.Observable
 * This class represents a lightweight region in a layout manager. This region does not move dom nodes
 * and does not have a titlebar, tabs or any other features. All it does is size and position 
 * panels. To create a BasicLayoutRegion, add lightweight:true or basic:true to your regions config.
 * @cfg {Roo.bootstrap.layout.Manager}   mgr The manager
 * @cfg {string}   region  the region that it inhabits..
 * @cfg {bool}   skipConfig skip config?
 * 

 */
Roo.bootstrap.layout.Basic = function(config){
    
    this.mgr = config.mgr;
    
    this.position = config.region;
    
    var skipConfig = config.skipConfig;
    
    this.events = {
        /**
         * @scope Roo.layout.BasicRegion
         */
        
        /**
         * @event beforeremove
         * Fires before a panel is removed (or closed). To cancel the removal set "e.cancel = true" on the event argument.
         * @param {Roo.layout.Region} this
         * @param {Roo.ContentPanel} panel The panel
         * @param {Object} e The cancel event object
         */
        "beforeremove" : true,
        /**
         * @event invalidated
         * Fires when the layout for this region is changed.
         * @param {Roo.layout.Region} this
         */
        "invalidated" : true,
        /**
         * @event visibilitychange
         * Fires when this region is shown or hidden 
         * @param {Roo.layout.Region} this
         * @param {Boolean} visibility true or false
         */
        "visibilitychange" : true,
        /**
         * @event paneladded
         * Fires when a panel is added. 
         * @param {Roo.layout.Region} this
         * @param {Roo.ContentPanel} panel The panel
         */
        "paneladded" : true,
        /**
         * @event panelremoved
         * Fires when a panel is removed. 
         * @param {Roo.layout.Region} this
         * @param {Roo.ContentPanel} panel The panel
         */
        "panelremoved" : true,
        /**
         * @event beforecollapse
         * Fires when this region before collapse.
         * @param {Roo.layout.Region} this
         */
        "beforecollapse" : true,
        /**
         * @event collapsed
         * Fires when this region is collapsed.
         * @param {Roo.layout.Region} this
         */
        "collapsed" : true,
        /**
         * @event expanded
         * Fires when this region is expanded.
         * @param {Roo.layout.Region} this
         */
        "expanded" : true,
        /**
         * @event slideshow
         * Fires when this region is slid into view.
         * @param {Roo.layout.Region} this
         */
        "slideshow" : true,
        /**
         * @event slidehide
         * Fires when this region slides out of view. 
         * @param {Roo.layout.Region} this
         */
        "slidehide" : true,
        /**
         * @event panelactivated
         * Fires when a panel is activated. 
         * @param {Roo.layout.Region} this
         * @param {Roo.ContentPanel} panel The activated panel
         */
        "panelactivated" : true,
        /**
         * @event resized
         * Fires when the user resizes this region. 
         * @param {Roo.layout.Region} this
         * @param {Number} newSize The new size (width for east/west, height for north/south)
         */
        "resized" : true
    };
    /** A collection of panels in this region. @type Roo.util.MixedCollection */
    this.panels = new Roo.util.MixedCollection();
    this.panels.getKey = this.getPanelId.createDelegate(this);
    this.box = null;
    this.activePanel = null;
    // ensure listeners are added...
    
    if (config.listeners || config.events) {
        Roo.bootstrap.layout.Basic.superclass.constructor.call(this, {
            listeners : config.listeners || {},
            events : config.events || {}
        });
    }
    
    if(skipConfig !== true){
        this.applyConfig(config);
    }
};

Roo.extend(Roo.bootstrap.layout.Basic, Roo.util.Observable,
{
    getPanelId : function(p){
        return p.getId();
    },
    
    applyConfig : function(config){
        this.margins = config.margins || this.margins || {top: 0, left: 0, right:0, bottom: 0};
        this.config = config;
        
    },
    
    /**
     * Resizes the region to the specified size. For vertical regions (west, east) this adjusts 
     * the width, for horizontal (north, south) the height.
     * @param {Number} newSize The new width or height
     */
    resizeTo : function(newSize){
        var el = this.el ? this.el :
                 (this.activePanel ? this.activePanel.getEl() : null);
        if(el){
            switch(this.position){
                case "east":
                case "west":
                    el.setWidth(newSize);
                    this.fireEvent("resized", this, newSize);
                break;
                case "north":
                case "south":
                    el.setHeight(newSize);
                    this.fireEvent("resized", this, newSize);
                break;                
            }
        }
    },
    
    getBox : function(){
        return this.activePanel ? this.activePanel.getEl().getBox(false, true) : null;
    },
    
    getMargins : function(){
        return this.margins;
    },
    
    updateBox : function(box){
        this.box = box;
        var el = this.activePanel.getEl();
        el.dom.style.left = box.x + "px";
        el.dom.style.top = box.y + "px";
        this.activePanel.setSize(box.width, box.height);
    },
    
    /**
     * Returns the container element for this region.
     * @return {Roo.Element}
     */
    getEl : function(){
        return this.activePanel;
    },
    
    /**
     * Returns true if this region is currently visible.
     * @return {Boolean}
     */
    isVisible : function(){
        return this.activePanel ? true : false;
    },
    
    setActivePanel : function(panel){
        panel = this.getPanel(panel);
        if(this.activePanel && this.activePanel != panel){
            this.activePanel.setActiveState(false);
            this.activePanel.getEl().setLeftTop(-10000,-10000);
        }
        this.activePanel = panel;
        panel.setActiveState(true);
        if(this.box){
            panel.setSize(this.box.width, this.box.height);
        }
        this.fireEvent("panelactivated", this, panel);
        this.fireEvent("invalidated");
    },
    
    /**
     * Show the specified panel.
     * @param {Number/String/ContentPanel} panelId The panels index, id or the panel itself
     * @return {Roo.ContentPanel} The shown panel or null
     */
    showPanel : function(panel){
        panel = this.getPanel(panel);
        if(panel){
            this.setActivePanel(panel);
        }
        return panel;
    },
    
    /**
     * Get the active panel for this region.
     * @return {Roo.ContentPanel} The active panel or null
     */
    getActivePanel : function(){
        return this.activePanel;
    },
    
    /**
     * Add the passed ContentPanel(s)
     * @param {ContentPanel...} panel The ContentPanel(s) to add (you can pass more than one)
     * @return {Roo.ContentPanel} The panel added (if only one was added)
     */
    add : function(panel){
        if(arguments.length > 1){
            for(var i = 0, len = arguments.length; i < len; i++) {
            	this.add(arguments[i]);
            }
            return null;
        }
        if(this.hasPanel(panel)){
            this.showPanel(panel);
            return panel;
        }
        var el = panel.getEl();
        if(el.dom.parentNode != this.mgr.el.dom){
            this.mgr.el.dom.appendChild(el.dom);
        }
        if(panel.setRegion){
            panel.setRegion(this);
        }
        this.panels.add(panel);
        el.setStyle("position", "absolute");
        if(!panel.background){
            this.setActivePanel(panel);
            if(this.config.initialSize && this.panels.getCount()==1){
                this.resizeTo(this.config.initialSize);
            }
        }
        this.fireEvent("paneladded", this, panel);
        return panel;
    },
    
    /**
     * Returns true if the panel is in this region.
     * @param {Number/String/ContentPanel} panel The panels index, id or the panel itself
     * @return {Boolean}
     */
    hasPanel : function(panel){
        if(typeof panel == "object"){ // must be panel obj
            panel = panel.getId();
        }
        return this.getPanel(panel) ? true : false;
    },
    
    /**
     * Removes the specified panel. If preservePanel is not true (either here or in the config), the panel is destroyed.
     * @param {Number/String/ContentPanel} panel The panels index, id or the panel itself
     * @param {Boolean} preservePanel Overrides the config preservePanel option
     * @return {Roo.ContentPanel} The panel that was removed
     */
    remove : function(panel, preservePanel){
        panel = this.getPanel(panel);
        if(!panel){
            return null;
        }
        var e = {};
        this.fireEvent("beforeremove", this, panel, e);
        if(e.cancel === true){
            return null;
        }
        var panelId = panel.getId();
        this.panels.removeKey(panelId);
        return panel;
    },
    
    /**
     * Returns the panel specified or null if it's not in this region.
     * @param {Number/String/ContentPanel} panel The panels index, id or the panel itself
     * @return {Roo.ContentPanel}
     */
    getPanel : function(id){
        if(typeof id == "object"){ // must be panel obj
            return id;
        }
        return this.panels.get(id);
    },
    
    /**
     * Returns this regions position (north/south/east/west/center).
     * @return {String} 
     */
    getPosition: function(){
        return this.position;    
    }
});