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
 * @class Roo.BorderLayout
 * @extends Roo.LayoutManager
 * This class represents a common layout manager used in desktop applications. For screenshots and more details,
 * please see: <br><br>
 * <a href="http://www.jackslocum.com/yui/2006/10/19/cross-browser-web-20-layouts-with-yahoo-ui/">Cross Browser Layouts - Part 1</a><br>
 * <a href="http://www.jackslocum.com/yui/2006/10/28/cross-browser-web-20-layouts-part-2-ajax-feed-viewer-20/">Cross Browser Layouts - Part 2</a><br><br>
 * Example:
 <pre><code>
 var layout = new Roo.BorderLayout(document.body, {
    north: {
        initialSize: 25,
        titlebar: false
    },
    west: {
        split:true,
        initialSize: 200,
        minSize: 175,
        maxSize: 400,
        titlebar: true,
        collapsible: true
    },
    east: {
        split:true,
        initialSize: 202,
        minSize: 175,
        maxSize: 400,
        titlebar: true,
        collapsible: true
    },
    south: {
        split:true,
        initialSize: 100,
        minSize: 100,
        maxSize: 200,
        titlebar: true,
        collapsible: true
    },
    center: {
        titlebar: true,
        autoScroll:true,
        resizeTabs: true,
        minTabWidth: 50,
        preferredTabWidth: 150
    }
});

// shorthand
var CP = Roo.ContentPanel;

layout.beginUpdate();
layout.add("north", new CP("north", "North"));
layout.add("south", new CP("south", {title: "South", closable: true}));
layout.add("west", new CP("west", {title: "West"}));
layout.add("east", new CP("autoTabs", {title: "Auto Tabs", closable: true}));
layout.add("center", new CP("center1", {title: "Close Me", closable: true}));
layout.add("center", new CP("center2", {title: "Center Panel", closable: false}));
layout.getRegion("center").showPanel("center1");
layout.endUpdate();
</code></pre>

<b>The container the layout is rendered into can be either the body element or any other element.
If it is not the body element, the container needs to either be an absolute positioned element,
or you will need to add "position:relative" to the css of the container.  You will also need to specify
the container size if it is not the body element.</b>

* @constructor
* Create a new BorderLayout
* @param {String/HTMLElement/Element} container The container this layout is bound to
* @param {Object} config Configuration options
 */
Roo.BorderLayout = function(container, config){
    config = config || {};
    Roo.BorderLayout.superclass.constructor.call(this, container, config);
    this.factory = config.factory || Roo.BorderLayout.RegionFactory;
    for(var i = 0, len = this.factory.validRegions.length; i < len; i++) {
    	var target = this.factory.validRegions[i];
    	if(config[target]){
    	    this.addRegion(target, config[target]);
    	}
    }
};

Roo.extend(Roo.BorderLayout, Roo.LayoutManager, {
    /**
     * Creates and adds a new region if it doesn't already exist.
     * @param {String} target The target region key (north, south, east, west or center).
     * @param {Object} config The regions config object
     * @return {BorderLayoutRegion} The new region
     */
    addRegion : function(target, config){
        if(!this.regions[target]){
            var r = this.factory.create(target, this, config);
    	    this.bindRegion(target, r);
        }
        return this.regions[target];
    },

    // private (kinda)
    bindRegion : function(name, r){
        this.regions[name] = r;
        r.on("visibilitychange", this.layout, this);
        r.on("paneladded", this.layout, this);
        r.on("panelremoved", this.layout, this);
        r.on("invalidated", this.layout, this);
        r.on("resized", this.onRegionResized, this);
        r.on("collapsed", this.onRegionCollapsed, this);
        r.on("expanded", this.onRegionExpanded, this);
    },

    /**
     * Performs a layout update.
     */
    layout : function(){
        if(this.updating) {
            return;
        }
        var size = this.getViewSize();
        var w = size.width;
        var h = size.height;
        var centerW = w;
        var centerH = h;
        var centerY = 0;
        var centerX = 0;
        //var x = 0, y = 0;

        var rs = this.regions;
        var north = rs["north"];
        var south = rs["south"]; 
        var west = rs["west"];
        var east = rs["east"];
        var center = rs["center"];
        //if(this.hideOnLayout){ // not supported anymore
            //c.el.setStyle("display", "none");
        //}
        if(north && north.isVisible()){
            var b = north.getBox();
            var m = north.getMargins();
            b.width = w - (m.left+m.right);
            b.x = m.left;
            b.y = m.top;
            centerY = b.height + b.y + m.bottom;
            centerH -= centerY;
            north.updateBox(this.safeBox(b));
        }
        if(south && south.isVisible()){
            var b = south.getBox();
            var m = south.getMargins();
            b.width = w - (m.left+m.right);
            b.x = m.left;
            var totalHeight = (b.height + m.top + m.bottom);
            b.y = h - totalHeight + m.top;
            centerH -= totalHeight;
            south.updateBox(this.safeBox(b));
        }
        if(west && west.isVisible()){
            var b = west.getBox();
            var m = west.getMargins();
            b.height = centerH - (m.top+m.bottom);
            b.x = m.left;
            b.y = centerY + m.top;
            var totalWidth = (b.width + m.left + m.right);
            centerX += totalWidth;
            centerW -= totalWidth;
            west.updateBox(this.safeBox(b));
        }
        if(east && east.isVisible()){
            var b = east.getBox();
            var m = east.getMargins();
            b.height = centerH - (m.top+m.bottom);
            var totalWidth = (b.width + m.left + m.right);
            b.x = w - totalWidth + m.left;
            b.y = centerY + m.top;
            centerW -= totalWidth;
            east.updateBox(this.safeBox(b));
        }
        if(center){
            var m = center.getMargins();
            var centerBox = {
                x: centerX + m.left,
                y: centerY + m.top,
                width: centerW - (m.left+m.right),
                height: centerH - (m.top+m.bottom)
            };
            //if(this.hideOnLayout){
                //center.el.setStyle("display", "block");
            //}
            center.updateBox(this.safeBox(centerBox));
        }
        this.el.repaint();
        this.fireEvent("layout", this);
    },

    // private
    safeBox : function(box){
        box.width = Math.max(0, box.width);
        box.height = Math.max(0, box.height);
        return box;
    },

    /**
     * Adds a ContentPanel (or subclass) to this layout.
     * @param {String} target The target region key (north, south, east, west or center).
     * @param {Roo.ContentPanel} panel The panel to add
     * @return {Roo.ContentPanel} The added panel
     */
    add : function(target, panel){
         
        target = target.toLowerCase();
        return this.regions[target].add(panel);
    },

    /**
     * Remove a ContentPanel (or subclass) to this layout.
     * @param {String} target The target region key (north, south, east, west or center).
     * @param {Number/String/Roo.ContentPanel} panel The index, id or panel to remove
     * @return {Roo.ContentPanel} The removed panel
     */
    remove : function(target, panel){
        target = target.toLowerCase();
        return this.regions[target].remove(panel);
    },

    /**
     * Searches all regions for a panel with the specified id
     * @param {String} panelId
     * @return {Roo.ContentPanel} The panel or null if it wasn't found
     */
    findPanel : function(panelId){
        var rs = this.regions;
        for(var target in rs){
            if(typeof rs[target] != "function"){
                var p = rs[target].getPanel(panelId);
                if(p){
                    return p;
                }
            }
        }
        return null;
    },

    /**
     * Searches all regions for a panel with the specified id and activates (shows) it.
     * @param {String/ContentPanel} panelId The panels id or the panel itself
     * @return {Roo.ContentPanel} The shown panel or null
     */
    showPanel : function(panelId) {
      var rs = this.regions;
      for(var target in rs){
         var r = rs[target];
         if(typeof r != "function"){
            if(r.hasPanel(panelId)){
               return r.showPanel(panelId);
            }
         }
      }
      return null;
   },

   /**
     * Restores this layout's state using Roo.state.Manager or the state provided by the passed provider.
     * @param {Roo.state.Provider} provider (optional) An alternate state provider
     */
    restoreState : function(provider){
        if(!provider){
            provider = Roo.state.Manager;
        }
        var sm = new Roo.LayoutStateManager();
        sm.init(this, provider);
    },

    /**
     * Adds a batch of multiple ContentPanels dynamically by passing a special regions config object.  This config
     * object should contain properties for each region to add ContentPanels to, and each property's value should be
     * a valid ContentPanel config object.  Example:
     * <pre><code>
// Create the main layout
var layout = new Roo.BorderLayout('main-ct', {
    west: {
        split:true,
        minSize: 175,
        titlebar: true
    },
    center: {
        title:'Components'
    }
}, 'main-ct');

// Create and add multiple ContentPanels at once via configs
layout.batchAdd({
   west: {
       id: 'source-files',
       autoCreate:true,
       title:'Ext Source Files',
       autoScroll:true,
       fitToFrame:true
   },
   center : {
       el: cview,
       autoScroll:true,
       fitToFrame:true,
       toolbar: tb,
       resizeEl:'cbody'
   }
});
</code></pre>
     * @param {Object} regions An object containing ContentPanel configs by region name
     */
    batchAdd : function(regions){
        this.beginUpdate();
        for(var rname in regions){
            var lr = this.regions[rname];
            if(lr){
                this.addTypedPanels(lr, regions[rname]);
            }
        }
        this.endUpdate();
    },

    // private
    addTypedPanels : function(lr, ps){
        if(typeof ps == 'string'){
            lr.add(new Roo.ContentPanel(ps));
        }
        else if(ps instanceof Array){
            for(var i =0, len = ps.length; i < len; i++){
                this.addTypedPanels(lr, ps[i]);
            }
        }
        else if(!ps.events){ // raw config?
            var el = ps.el;
            delete ps.el; // prevent conflict
            lr.add(new Roo.ContentPanel(el || Roo.id(), ps));
        }
        else {  // panel object assumed!
            lr.add(ps);
        }
    },
    /**
     * Adds a xtype elements to the layout.
     * <pre><code>

layout.addxtype({
       xtype : 'ContentPanel',
       region: 'west',
       items: [ .... ]
   }
);

layout.addxtype({
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
    addxtype : function(cfg)
    {
        // basically accepts a pannel...
        // can accept a layout region..!?!?
        //Roo.log('Roo.BorderLayout add ' + cfg.xtype)
        
        if (!cfg.xtype.match(/Panel$/)) {
            return false;
        }
        var ret = false;
        
        if (typeof(cfg.region) == 'undefined') {
            Roo.log("Failed to add Panel, region was not set");
            Roo.log(cfg);
            return false;
        }
        var region = cfg.region;
        delete cfg.region;
        
          
        var xitems = [];
        if (cfg.items) {
            xitems = cfg.items;
            delete cfg.items;
        }
        var nb = false;
        
        switch(cfg.xtype) 
        {
            case 'ContentPanel':  // ContentPanel (el, cfg)
            case 'ScrollPanel':  // ContentPanel (el, cfg)
            case 'ViewPanel': 
                if(cfg.autoCreate) {
                    ret = new Roo[cfg.xtype](cfg); // new panel!!!!!
                } else {
                    var el = this.el.createChild();
                    ret = new Roo[cfg.xtype](el, cfg); // new panel!!!!!
                }
                
                this.add(region, ret);
                break;
            
            
            case 'TreePanel': // our new panel!
                cfg.el = this.el.createChild();
                ret = new Roo[cfg.xtype](cfg); // new panel!!!!!
                this.add(region, ret);
                break;
            
            case 'NestedLayoutPanel': 
                // create a new Layout (which is  a Border Layout...
                var el = this.el.createChild();
                var clayout = cfg.layout;
                delete cfg.layout;
                clayout.items   = clayout.items  || [];
                // replace this exitems with the clayout ones..
                xitems = clayout.items;
                 
                
                if (region == 'center' && this.active && this.getRegion('center').panels.length < 1) {
                    cfg.background = false;
                }
                var layout = new Roo.BorderLayout(el, clayout);
                
                ret = new Roo[cfg.xtype](layout, cfg); // new panel!!!!!
                //console.log('adding nested layout panel '  + cfg.toSource());
                this.add(region, ret);
                nb = {}; /// find first...
                break;
                
            case 'GridPanel': 
            
                // needs grid and region
                
                //var el = this.getRegion(region).el.createChild();
                var el = this.el.createChild();
                // create the grid first...
                
                var grid = new Roo.grid[cfg.grid.xtype](el, cfg.grid);
                delete cfg.grid;
                if (region == 'center' && this.active ) {
                    cfg.background = false;
                }
                ret = new Roo[cfg.xtype](grid, cfg); // new panel!!!!!
                
                this.add(region, ret);
                if (cfg.background) {
                    ret.on('activate', function(gp) {
                        if (!gp.grid.rendered) {
                            gp.grid.render();
                        }
                    });
                } else {
                    grid.render();
                }
                break;
           
           
           
                
                
                
            default:
                if (typeof(Roo[cfg.xtype]) != 'undefined') {
                    
                    ret = new Roo[cfg.xtype](cfg); // new panel!!!!!
                    this.add(region, ret);
                } else {
                
                    alert("Can not add '" + cfg.xtype + "' to BorderLayout");
                    return null;
                }
                
             // GridPanel (grid, cfg)
            
        }
        this.beginUpdate();
        // add children..
        var region = '';
        var abn = {};
        Roo.each(xitems, function(i)  {
            region = nb && i.region ? i.region : false;
            
            var add = ret.addxtype(i);
           
            if (region) {
                nb[region] = nb[region] == undefined ? 0 : nb[region]+1;
                if (!i.background) {
                    abn[region] = nb[region] ;
                }
            }
            
        });
        this.endUpdate();

        // make the last non-background panel active..
        //if (nb) { Roo.log(abn); }
        if (nb) {
            
            for(var r in abn) {
                region = this.getRegion(r);
                if (region) {
                    // tried using nb[r], but it does not work..
                     
                    region.showPanel(abn[r]);
                   
                }
            }
        }
        return ret;
        
    }
});

/**
 * Shortcut for creating a new BorderLayout object and adding one or more ContentPanels to it in a single step, handling
 * the beginUpdate and endUpdate calls internally.  The key to this method is the <b>panels</b> property that can be
 * provided with each region config, which allows you to add ContentPanel configs in addition to the region configs
 * during creation.  The following code is equivalent to the constructor-based example at the beginning of this class:
 * <pre><code>
// shorthand
var CP = Roo.ContentPanel;

var layout = Roo.BorderLayout.create({
    north: {
        initialSize: 25,
        titlebar: false,
        panels: [new CP("north", "North")]
    },
    west: {
        split:true,
        initialSize: 200,
        minSize: 175,
        maxSize: 400,
        titlebar: true,
        collapsible: true,
        panels: [new CP("west", {title: "West"})]
    },
    east: {
        split:true,
        initialSize: 202,
        minSize: 175,
        maxSize: 400,
        titlebar: true,
        collapsible: true,
        panels: [new CP("autoTabs", {title: "Auto Tabs", closable: true})]
    },
    south: {
        split:true,
        initialSize: 100,
        minSize: 100,
        maxSize: 200,
        titlebar: true,
        collapsible: true,
        panels: [new CP("south", {title: "South", closable: true})]
    },
    center: {
        titlebar: true,
        autoScroll:true,
        resizeTabs: true,
        minTabWidth: 50,
        preferredTabWidth: 150,
        panels: [
            new CP("center1", {title: "Close Me", closable: true}),
            new CP("center2", {title: "Center Panel", closable: false})
        ]
    }
}, document.body);

layout.getRegion("center").showPanel("center1");
</code></pre>
 * @param config
 * @param targetEl
 */
Roo.BorderLayout.create = function(config, targetEl){
    var layout = new Roo.BorderLayout(targetEl || document.body, config);
    layout.beginUpdate();
    var regions = Roo.BorderLayout.RegionFactory.validRegions;
    for(var j = 0, jlen = regions.length; j < jlen; j++){
        var lr = regions[j];
        if(layout.regions[lr] && config[lr].panels){
            var r = layout.regions[lr];
            var ps = config[lr].panels;
            layout.addTypedPanels(r, ps);
        }
    }
    layout.endUpdate();
    return layout;
};

// private
Roo.BorderLayout.RegionFactory = {
    // private
    validRegions : ["north","south","east","west","center"],

    // private
    create : function(target, mgr, config){
        target = target.toLowerCase();
        if(config.lightweight || config.basic){
            return new Roo.BasicLayoutRegion(mgr, config, target);
        }
        switch(target){
            case "north":
                return new Roo.NorthLayoutRegion(mgr, config);
            case "south":
                return new Roo.SouthLayoutRegion(mgr, config);
            case "east":
                return new Roo.EastLayoutRegion(mgr, config);
            case "west":
                return new Roo.WestLayoutRegion(mgr, config);
            case "center":
                return new Roo.CenterLayoutRegion(mgr, config);
        }
        throw 'Layout region "'+target+'" not supported.';
    }
};