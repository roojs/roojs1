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
 * @class Roo.bootstrap.layout.Border
 * @extends Roo.bootstrap.layout.Manager
 * @children Roo.bootstrap.panel.Content Roo.bootstrap.panel.Nest Roo.bootstrap.panel.Grid
 * @parent builder Roo.bootstrap.panel.Nest Roo.bootstrap.panel.Nest Roo.bootstrap.Modal
 * This class represents a common layout manager used in desktop applications. For screenshots and more details,
 * please see: examples/bootstrap/nested.html<br><br>
 
<b>The container the layout is rendered into can be either the body element or any other element.
If it is not the body element, the container needs to either be an absolute positioned element,
or you will need to add "position:relative" to the css of the container.  You will also need to specify
the container size if it is not the body element.</b>

* @constructor
* Create a new Border
* @param {Object} config Configuration options
 */
Roo.bootstrap.layout.Border = function(config){
    config = config || {};
    Roo.bootstrap.layout.Border.superclass.constructor.call(this, config);
    
    
    
    Roo.each(Roo.bootstrap.layout.Border.regions, function(region) {
        if(config[region]){
            config[region].region = region;
    	    this.addRegion(config[region]);
    	}
    },this);
    
};

Roo.bootstrap.layout.Border.regions =  ["center", "north","south","east","west"];

Roo.extend(Roo.bootstrap.layout.Border, Roo.bootstrap.layout.Manager, {
    
	/**
	 * @cfg {Roo.bootstrap.layout.Region} center region to go in center
	 */
	/**
	 * @cfg {Roo.bootstrap.layout.Region} west region to go in west
	 */
	/**
	 * @cfg {Roo.bootstrap.layout.Region} east region to go in east
	 */
	/**
	 * @cfg {Roo.bootstrap.layout.Region} south region to go in south
	 */
	/**
	 * @cfg {Roo.bootstrap.layout.Region} north region to go in north
	 */
	
	
	
	
    parent : false, // this might point to a 'nest' or a ???
    
    /**
     * Creates and adds a new region if it doesn't already exist.
     * @param {String} target The target region key (north, south, east, west or center).
     * @param {Object} config The regions config object
     * @return {BorderLayoutRegion} The new region
     */
    addRegion : function(config)
    {
        if(!this.regions[config.region]){
            var r = this.factory(config);
    	    this.bindRegion(r);
        }
        return this.regions[config.region];
    },

    // private (kinda)
    bindRegion : function(r){
        this.regions[r.config.region] = r;
        
        r.on("visibilitychange",    this.layout, this);
        r.on("paneladded",          this.layout, this);
        r.on("panelremoved",        this.layout, this);
        r.on("invalidated",         this.layout, this);
        r.on("resized",             this.onRegionResized, this);
        r.on("collapsed",           this.onRegionCollapsed, this);
        r.on("expanded",            this.onRegionExpanded, this);
    },

    /**
     * Performs a layout update.
     */
    layout : function()
    {
        if(this.updating) {
            return;
        }
        
        // render all the rebions if they have not been done alreayd?
        Roo.each(Roo.bootstrap.layout.Border.regions, function(region) {
            if(this.regions[region] && !this.regions[region].bodyEl){
                this.regions[region].onRender(this.el)
            }
        },this);
        
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
   /*
    restoreState : function(provider){
        if(!provider){
            provider = Roo.state.Manager;
        }
        var sm = new Roo.layout.StateManager();
        sm.init(this, provider);
    },
*/
 
 
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
        //Roo.log('Roo.layout.Border add ' + cfg.xtype)
        
        
        // theory?  children can only be panels??
        
        //if (!cfg.xtype.match(/Panel$/)) {
        //    return false;
        //}
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
	
	if ( region == 'center') {
	    Roo.log("Center: " + cfg.title);
	}
	
        
        switch(cfg.xtype) 
        {
            case 'Content':  // ContentPanel (el, cfg)
            case 'Scroll':  // ContentPanel (el, cfg)
            case 'View': 
                cfg.autoCreate = cfg.autoCreate || true;
                ret = new cfg.xns[cfg.xtype](cfg); // new panel!!!!!
                //} else {
                //    var el = this.el.createChild();
                //    ret = new Roo[cfg.xtype](el, cfg); // new panel!!!!!
                //}
                
                this.add(region, ret);
                break;
            
            /*
            case 'TreePanel': // our new panel!
                cfg.el = this.el.createChild();
                ret = new Roo[cfg.xtype](cfg); // new panel!!!!!
                this.add(region, ret);
                break;
            */
            
            case 'Nest': 
                // create a new Layout (which is  a Border Layout...
                
                var clayout = cfg.layout;
                clayout.el  = this.el.createChild();
                clayout.items   = clayout.items  || [];
                
                delete cfg.layout;
                
                // replace this exitems with the clayout ones..
                xitems = clayout.items;
                 
                // force background off if it's in center...
                if (region == 'center' && this.active && this.getRegion('center').panels.length < 1) {
                    cfg.background = false;
                }
                cfg.layout  = new Roo.bootstrap.layout.Border(clayout);
                
                
                ret = new cfg.xns[cfg.xtype](cfg); // new panel!!!!!
                //console.log('adding nested layout panel '  + cfg.toSource());
                this.add(region, ret);
                nb = {}; /// find first...
                break;
            
            case 'Grid':
                
                // needs grid and region
                
                //var el = this.getRegion(region).el.createChild();
                /*
                 *var el = this.el.createChild();
                // create the grid first...
                cfg.grid.container = el;
                cfg.grid = new cfg.grid.xns[cfg.grid.xtype](cfg.grid);
                */
                
                if (region == 'center' && this.active ) {
                    cfg.background = false;
                }
                
                ret = new cfg.xns[cfg.xtype](cfg); // new panel!!!!!
                
                this.add(region, ret);
                /*
                if (cfg.background) {
                    // render grid on panel activation (if panel background)
                    ret.on('activate', function(gp) {
                        if (!gp.grid.rendered) {
                    //        gp.grid.render(el);
                        }
                    });
                } else {
                  //  cfg.grid.render(el);
                }
                */
                break;
           
           
            case 'Border': // it can get called on it'self... - might need to check if this is fixed?
                // it was the old xcomponent building that caused this before.
                // espeically if border is the top element in the tree.
                ret = this;
                break; 
                
                    
                
                
                
            default:
                /*
                if (typeof(Roo[cfg.xtype]) != 'undefined') {
                    
                    ret = new Roo[cfg.xtype](cfg); // new panel!!!!!
                    this.add(region, ret);
                } else {
                */
                    Roo.log(cfg);
                    throw "Can not add '" + cfg.xtype + "' to Border";
                    return null;
             
                                
             
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
        
    },
    
    
// private
    factory : function(cfg)
    {
        
        var validRegions = Roo.bootstrap.layout.Border.regions;

        var target = cfg.region;
        cfg.mgr = this;
        
        var r = Roo.bootstrap.layout;
        Roo.log(target);
        switch(target){
            case "north":
                return new r.North(cfg);
            case "south":
                return new r.South(cfg);
            case "east":
                return new r.East(cfg);
            case "west":
                return new r.West(cfg);
            case "center":
                return new r.Center(cfg);
        }
        throw 'Layout region "'+target+'" not supported.';
    }
    
    
});
 