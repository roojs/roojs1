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
 * @class Roo.layout.Region
 * @extends Roo.layout.BasicRegion
 * This class represents a region in a layout manager.
 * @cfg {Boolean}   shouldShowCheckbox True to show checkbox near title. Tick to expand and untick to collapse (only for north and south region) (defaults to false)
 * @cfg {Boolean}   collapsible     False to disable collapsing (defaults to true)
 * @cfg {Boolean}   collapsed       True to set the initial display to collapsed (defaults to false)
 * @cfg {Boolean}   floatable       False to disable floating (defaults to true)
 * @cfg {Object}    margins         Margins for the element (defaults to {top: 0, left: 0, right:0, bottom: 0})
 * @cfg {Object}    cmargins        Margins for the element when collapsed (defaults to: north/south {top: 2, left: 0, right:0, bottom: 2} or east/west {top: 0, left: 2, right:2, bottom: 0})
 * @cfg {String}    tabPosition     (top|bottom) "top" or "bottom" (defaults to "bottom")
 * @cfg {String}    collapsedTitle  Optional string message to display in the collapsed block of a north or south region
 * @cfg {Boolean}   alwaysShowTabs  True to always display tabs even when there is only 1 panel (defaults to false)
 * @cfg {Boolean}   autoScroll      True to enable overflow scrolling (defaults to false)
 * @cfg {Boolean}   titlebar        True to display a title bar (defaults to true)
 * @cfg {String}    title           The title for the region (overrides panel titles)
 * @cfg {Boolean}   animate         True to animate expand/collapse (defaults to false)
 * @cfg {Boolean}   autoHide        False to disable auto hiding when the mouse leaves the "floated" region (defaults to true)
 * @cfg {Boolean}   preservePanels  True to preserve removed panels so they can be readded later (defaults to false)
 * @cfg {Boolean}   closeOnTab      True to place the close icon on the tabs instead of the region titlebar (defaults to false)
 * @cfg {Boolean}   hideTabs        True to hide the tab strip (defaults to false)
 * @cfg {Boolean}   resizeTabs      True to enable automatic tab resizing. This will resize the tabs so they are all the same size and fit within
 *                      the space available, similar to FireFox 1.5 tabs (defaults to false)
 * @cfg {Number}    minTabWidth     The minimum tab width (defaults to 40)
 * @cfg {Number}    preferredTabWidth The preferred tab width (defaults to 150)
 * @cfg {Boolean}   showPin         True to show a pin button
 * @cfg {Boolean}   hidden          True to start the region hidden (defaults to false)
 * @cfg {Boolean}   hideWhenEmpty   True to hide the region when it has no panels
 * @cfg {Boolean}   disableTabTips  True to disable tab tooltips
 * @cfg {Number}    width           For East/West panels
 * @cfg {Number}    height          For North/South panels
 * @cfg {Boolean}   split           To show the splitter
 * @cfg {Boolean}   toolbar         xtype configuration for a toolbar - shows on right of tabbar
 */
Roo.layout.Region = function(mgr, config, pos){
    Roo.layout.Region.superclass.constructor.call(this, mgr, config, pos, true);
    var dh = Roo.DomHelper;
    /** This region's container element 
    * @type Roo.Element */
    this.el = dh.append(mgr.el.dom, {tag: "div", cls: "x-layout-panel x-layout-panel-" + this.position}, true);
    /** This region's title element 
    * @type Roo.Element */

    this.titleEl = dh.append(this.el.dom, {tag: "div", unselectable: "on", cls: "x-unselectable x-layout-panel-hd x-layout-title-"+this.position, children:[
        {tag: "span", cls: "x-unselectable x-layout-panel-hd-text", unselectable: "on", html: "&#160;"},
        {tag: "div", cls: "x-unselectable x-layout-panel-hd-tools", unselectable: "on"}
    ]}, true);
    this.titleEl.enableDisplayMode();
    /** This region's title text element 
    * @type HTMLElement */
    this.titleTextEl = this.titleEl.dom.firstChild;
    this.tools = Roo.get(this.titleEl.dom.childNodes[1], true);
    this.closeBtn = this.createTool(this.tools.dom, "x-layout-close");
    this.closeBtn.enableDisplayMode();
    this.closeBtn.on("click", this.closeClicked, this);
    this.closeBtn.hide();

    this.createBody(config);
    this.visible = true;
    this.collapsed = false;
    this.shouldShowCheckbox = false;

    if(config.hideWhenEmpty){
        this.hide();
        this.on("paneladded", this.validateVisibility, this);
        this.on("panelremoved", this.validateVisibility, this);
    }
    this.applyConfig(config);
};

Roo.extend(Roo.layout.Region, Roo.layout.BasicRegion, {

    createBody : function(){
        /** This region's body element 
        * @type Roo.Element */
        this.bodyEl = this.el.createChild({tag: "div", cls: "x-layout-panel-body"});
    },

    applyConfig : function(c){
        if(c.collapsible && this.position != "center" && !this.collapsedEl){
            var showCheckbox = c.shouldShowCheckbox && ['north', 'south'].includes(this.position);

            var dh = Roo.DomHelper;
            if(c.titlebar !== false){
                this.collapseBtn = showCheckbox ? Roo.DomHelper.append(this.tools.dom, {
                    tag: "div",
                    class: "x-layout-tools-checkbox x-layout-checked"
                }, true) : this.createTool(this.tools.dom, "x-layout-collapse-"+this.position);
                this.collapseBtn.on("click", this.collapse, this);
                this.collapseBtn.enableDisplayMode();

                if(c.showPin === true || this.showPin){
                    this.stickBtn = this.createTool(this.tools.dom, "x-layout-stick");
                    this.stickBtn.enableDisplayMode();
                    this.stickBtn.on("click", this.expand, this);
                    this.stickBtn.hide();
                }

                this.slideInBtn = this.createTool(this.tools.dom, "x-layout-slide-in-"+this.position);
                this.slideInBtn.on("click", this.slideIn, this);
                this.slideInBtn.enableDisplayMode();
                this.slideInBtn.hide();

                // put buttons on top left for east region
                if(this.position == 'east' || showCheckbox) {
                    this.tools.setStyle('right', 'initial');
                    this.closeBtn.setStyle('float', 'left');
                    this.collapseBtn.setStyle('float', 'left');
                    if(this.stickBtn) {
                        this.stickBtn.setStyle('float', 'left');
                    }
                    this.slideInBtn.setStyle('float', 'left');
                    this.titleTextEl.style['marginLeft'] = showCheckbox ? '20px' : '15px';
                }
            }
            /** This region's collapsed element
            * @type Roo.Element */
            this.collapsedEl = dh.append(this.mgr.el.dom, {cls: "x-layout-collapsed x-layout-collapsed-"+this.position, children:[
                {cls: "x-layout-collapsed-tools", children:[{cls: "x-layout-ctools-inner"}]}
            ]}, true);

            if(c.floatable !== false && !showCheckbox){
                // click collapsed elemnt to slide in / out
               this.collapsedEl.addClassOnOver("x-layout-collapsed-over");
               this.collapsedEl.on("click", this.collapseClick, this);
            }

            if(showCheckbox) {
                // click collapsed element to expand
                this.collapsedEl.addClassOnOver("x-layout-collapsed-over");
                this.collapsedEl.on("click", this.expand, this);
            }

            if(c.collapsedTitle && (this.position == "north" || this.position== "south")) {
                this.collapsedTitleTextEl = dh.append(this.collapsedEl.dom, {tag: "div", cls: "x-unselectable x-layout-panel-hd-text",
                   id: "message", unselectable: "on", style:{"float":"left"}});
               this.collapsedTitleTextEl.innerHTML = c.collapsedTitle;
             }

            this.expandBtn = showCheckbox ? Roo.DomHelper.append(this.collapsedEl.dom.firstChild.firstChild, {
                tag: "div",
                class: "x-layout-tools-checkbox"
            }, true) : this.createTool(this.collapsedEl.dom.firstChild.firstChild, "x-layout-expand-"+this.position);
            this.expandBtn.on("click", this.expand, this);
        }
        if(this.collapseBtn){
            this.collapseBtn.setVisible(c.collapsible == true);
        }
        this.cmargins = c.cmargins || this.cmargins ||
                         (this.position == "west" || this.position == "east" ?
                             {top: 0, left: 2, right:2, bottom: 0} :
                             {top: 2, left: 0, right:0, bottom: 2});
        this.margins = c.margins || this.margins || {top: 0, left: 0, right:0, bottom: 0};
        this.bottomTabs = c.tabPosition != "top";
        this.autoScroll = c.autoScroll || false;
        if(this.autoScroll){
            this.bodyEl.setStyle("overflow", "auto");
        }else{
            this.bodyEl.setStyle("overflow", "hidden");
        }
        //if(c.titlebar !== false){
            if((!c.titlebar && !c.title) || c.titlebar === false){
                this.titleEl.hide();
            }else{
                this.titleEl.show();
                if(c.title){
                    this.titleTextEl.innerHTML = c.title;
                }
            }
        //}
        this.duration = c.duration || .30;
        this.slideDuration = c.slideDuration || .45;
        this.autoHide = c.autoHide === false ? false : true;
        this.config = c;
        if(c.collapsed){
            this.collapse(true);
        }
        if(c.hidden){
            this.hide();
        }
    },
    /**
     * Returns true if this region is currently visible.
     * @return {Boolean}
     */
    isVisible : function(){
        return this.visible;
    },

    /**
     * Updates the title for collapsed north/south regions (used with {@link #collapsedTitle} config option)
     * @param {String} title (optional) The title text (accepts HTML markup, defaults to the numeric character reference for a non-breaking space, "&amp;#160;")
     */
    setCollapsedTitle : function(title){
        title = title || "&#160;";
        if(this.collapsedTitleTextEl){
            this.collapsedTitleTextEl.innerHTML = title;
        }
    },

    getBox : function(){
        var b;
        if(!this.collapsed){
            b = this.el.getBox(false, true);
        }else{
            b = this.collapsedEl.getBox(false, true);
        }
        return b;
    },

    getMargins : function(){
        return this.collapsed ? this.cmargins : this.margins;
    },

    highlight : function(){
        this.el.addClass("x-layout-panel-dragover");
    },

    unhighlight : function(){
        this.el.removeClass("x-layout-panel-dragover");
    },

    updateBox : function(box){
        this.box = box;
        if(!this.collapsed){
            this.el.dom.style.left = box.x + "px";
            this.el.dom.style.top = box.y + "px";
            this.updateBody(box.width, box.height);
        }else{
            this.collapsedEl.dom.style.left = box.x + "px";
            this.collapsedEl.dom.style.top = box.y + "px";
            this.collapsedEl.setSize(box.width, box.height);
        }
        if(this.tabs){
            this.tabs.autoSizeTabs();
        }
    },

    updateBody : function(w, h){
        if(w !== null){
            this.el.setWidth(w);
            w -= this.el.getBorderWidth("rl");
            if(this.config.adjustments){
                w += this.config.adjustments[0];
            }
        }
        if(h !== null){
            this.el.setHeight(h);
            h = this.titleEl && this.titleEl.isDisplayed() ? h - (this.titleEl.getHeight()||0) : h;
            h -= this.el.getBorderWidth("tb");
            if(this.config.adjustments){
                h += this.config.adjustments[1];
            }
            this.bodyEl.setHeight(h);
            if(this.tabs){
                h = this.tabs.syncHeight(h);
            }
        }
        if(this.panelSize){
            w = w !== null ? w : this.panelSize.width;
            h = h !== null ? h : this.panelSize.height;
        }
        if(this.activePanel){
            var el = this.activePanel.getEl();
            w = w !== null ? w : el.getWidth();
            h = h !== null ? h : el.getHeight();
            this.panelSize = {width: w, height: h};
            this.activePanel.setSize(w, h);
        }
        if(Roo.isIE && this.tabs){
            this.tabs.el.repaint();
        }
    },

    /**
     * Returns the container element for this region.
     * @return {Roo.Element}
     */
    getEl : function(){
        return this.el;
    },

    /**
     * Hides this region.
     */
    hide : function(){
        if(!this.collapsed){
            this.el.dom.style.left = "-2000px";
            this.el.hide();
        }else{
            this.collapsedEl.dom.style.left = "-2000px";
            this.collapsedEl.hide();
        }
        this.visible = false;
        this.fireEvent("visibilitychange", this, false);
    },

    /**
     * Shows this region if it was previously hidden.
     */
    show : function(){
        if(!this.collapsed){
            this.el.show();
        }else{
            this.collapsedEl.show();
        }
        this.visible = true;
        this.fireEvent("visibilitychange", this, true);
    },

    closeClicked : function(){
        if(this.activePanel){
            this.remove(this.activePanel);
        }
    },

    collapseClick : function(e){
        if(this.isSlid){
           e.stopPropagation();
           this.slideIn();
        }else{
           e.stopPropagation();
           this.slideOut();
        }
    },

    /**
     * Collapses this region.
     * @param {Boolean} skipAnim (optional) true to collapse the element without animation (if animate is true)
     */
    collapse : function(skipAnim, skipCheck){
        if(this.collapsed) {
            return;
        }
        
        if(skipCheck || this.fireEvent("beforecollapse", this) != false){
            
            this.collapsed = true;
            if(this.split){
                this.split.el.hide();
            }
            if(this.config.animate && skipAnim !== true){
                this.fireEvent("invalidated", this);
                this.animateCollapse();
            }else{
                this.el.setLocation(-20000,-20000);
                this.el.hide();
                this.collapsedEl.show();
                this.fireEvent("collapsed", this);
                this.fireEvent("invalidated", this);
            }
        }
        
    },

    animateCollapse : function(){
        // overridden
    },

    /**
     * Expands this region if it was previously collapsed.
     * @param {Roo.EventObject} e The event that triggered the expand (or null if calling manually)
     * @param {Boolean} skipAnim (optional) true to expand the element without animation (if animate is true)
     */
    expand : function(e, skipAnim){
        if(e) {
            e.stopPropagation();
        }
        if(!this.collapsed || this.el.hasActiveFx()) {
            return;
        }
        if(this.isSlid){
            this.afterSlideIn();
            skipAnim = true;
        }
        this.collapsed = false;
        if(this.config.animate && skipAnim !== true){
            this.animateExpand();
        }else{
            this.el.show();
            if(this.split){
                this.split.el.show();
            }
            this.collapsedEl.setLocation(-2000,-2000);
            this.collapsedEl.hide();
            this.fireEvent("invalidated", this);
            this.fireEvent("expanded", this);
        }
    },

    animateExpand : function(){
        // overridden
    },

    initTabs : function()
    {
        this.bodyEl.setStyle("overflow", "hidden");
        var ts = new Roo.panel.Tab(
                this.bodyEl.dom,
                {
                    tabPosition: this.bottomTabs ? 'bottom' : 'top',
                    disableTooltips: this.config.disableTabTips,
                    toolbar : this.config.toolbar
                }
        );
        if(this.config.hideTabs){
            ts.stripWrap.setDisplayed(false);
        }
        this.tabs = ts;
        ts.resizeTabs = this.config.resizeTabs === true;
        ts.minTabWidth = this.config.minTabWidth || 40;
        ts.maxTabWidth = this.config.maxTabWidth || 250;
        ts.preferredTabWidth = this.config.preferredTabWidth || 150;
        ts.monitorResize = false;
        ts.bodyEl.setStyle("overflow", this.config.autoScroll ? "auto" : "hidden");
        ts.bodyEl.addClass('x-layout-tabs-body');
        this.panels.each(this.initPanelAsTab, this);
    },

    initPanelAsTab : function(panel){
        var ti = this.tabs.addTab(panel.getEl().id, panel.getTitle(), null,
                    this.config.closeOnTab && panel.isClosable());
        if(panel.tabTip !== undefined){
            ti.setTooltip(panel.tabTip);
        }
        ti.on("activate", function(){
              this.setActivePanel(panel);
        }, this);
        if(this.config.closeOnTab){
            ti.on("beforeclose", function(t, e){
                e.cancel = true;
                this.remove(panel);
            }, this);
        }
        return ti;
    },

    updatePanelTitle : function(panel, title){
        if(this.activePanel == panel){
            this.updateTitle(title);
        }
        if(this.tabs){
            var ti = this.tabs.getTab(panel.getEl().id);
            ti.setText(title);
            if(panel.tabTip !== undefined){
                ti.setTooltip(panel.tabTip);
            }
        }
    },

    updateTitle : function(title){
        if(this.titleTextEl && !this.config.title){
            this.titleTextEl.innerHTML = (typeof title != "undefined" && title.length > 0 ? title : "&#160;");
        }
    },

    setActivePanel : function(panel){
        panel = this.getPanel(panel);
        if(this.activePanel && this.activePanel != panel){
            this.activePanel.setActiveState(false);
        }
        this.activePanel = panel;
        panel.setActiveState(true);
        if(this.panelSize){
            panel.setSize(this.panelSize.width, this.panelSize.height);
        }
        if(this.closeBtn){
            this.closeBtn.setVisible(!this.config.closeOnTab && !this.isSlid && panel.isClosable());
        }
        this.updateTitle(panel.getTitle());
        if(this.tabs){
            this.fireEvent("invalidated", this);
        }
        this.fireEvent("panelactivated", this, panel);
    },

    /**
     * Shows the specified panel.
     * @param {Number/String/panel.Content} panelId The panel's index, id or the panel itself
     * @return {Roo.panel.Content} The shown panel, or null if a panel could not be found from panelId
     */
    showPanel : function(panel)
    {
        panel = this.getPanel(panel);
        if(panel){
            if(this.tabs){
                var tab = this.tabs.getTab(panel.getEl().id);
                if(tab.isHidden()){
                    this.tabs.unhideTab(tab.id);
                }
                tab.activate();
            }else{
                this.setActivePanel(panel);
            }
        }
        return panel;
    },

    /**
     * Get the active panel for this region.
     * @return {Roo.panel.Content} The active panel or null
     */
    getActivePanel : function(){
        return this.activePanel;
    },

    validateVisibility : function(){
        if(this.panels.getCount() < 1){
            this.updateTitle("&#160;");
            this.closeBtn.hide();
            this.hide();
        }else{
            if(!this.isVisible()){
                this.show();
            }
        }
    },

    /**
     * Adds the passed ContentPanel(s) to this region.
     * @param {panel.Content...} panel The ContentPanel(s) to add (you can pass more than one)
     * @return {Roo.panel.Content} The panel added (if only one was added; null otherwise)
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
        panel.setRegion(this);
        this.panels.add(panel);
        if(this.panels.getCount() == 1 && !this.config.alwaysShowTabs){
            this.bodyEl.dom.appendChild(panel.getEl().dom);
            if(panel.background !== true){
                this.setActivePanel(panel);
            }
            this.fireEvent("paneladded", this, panel);
            return panel;
        }
        if(!this.tabs){
            this.initTabs();
        }else{
            this.initPanelAsTab(panel);
        }
        if(panel.background !== true){
            this.tabs.activate(panel.getEl().id);
        }
        this.fireEvent("paneladded", this, panel);
        return panel;
    },

    /**
     * Hides the tab for the specified panel.
     * @param {Number/String/panel.Content} panel The panel's index, id or the panel itself
     */
    hidePanel : function(panel){
        if(this.tabs && (panel = this.getPanel(panel))){
            this.tabs.hideTab(panel.getEl().id);
        }
    },

    /**
     * Unhides the tab for a previously hidden panel.
     * @param {Number/String/panel.Content} panel The panel's index, id or the panel itself
     */
    unhidePanel : function(panel){
        if(this.tabs && (panel = this.getPanel(panel))){
            this.tabs.unhideTab(panel.getEl().id);
        }
    },

    clearPanels : function(){
        while(this.panels.getCount() > 0){
             this.remove(this.panels.first());
        }
    },

    /**
     * Removes the specified panel. If preservePanel is not true (either here or in the config), the panel is destroyed.
     * @param {Number/String/panel.Content} panel The panel's index, id or the panel itself
     * @param {Boolean} preservePanel Overrides the config preservePanel option
     * @return {Roo.panel.Content} The panel that was removed
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
        preservePanel = (typeof preservePanel != "undefined" ? preservePanel : (this.config.preservePanels === true || panel.preserve === true));
        var panelId = panel.getId();
        this.panels.removeKey(panelId);
        if(preservePanel){
            document.body.appendChild(panel.getEl().dom);
        }
        if(this.tabs){
            this.tabs.removeTab(panel.getEl().id);
        }else if (!preservePanel){
            this.bodyEl.dom.removeChild(panel.getEl().dom);
        }
        if(this.panels.getCount() == 1 && this.tabs && !this.config.alwaysShowTabs){
            var p = this.panels.first();
            var tempEl = document.createElement("div"); // temp holder to keep IE from deleting the node
            tempEl.appendChild(p.getEl().dom);
            this.bodyEl.update("");
            this.bodyEl.dom.appendChild(p.getEl().dom);
            tempEl = null;
            this.updateTitle(p.getTitle());
            this.tabs = null;
            this.bodyEl.setStyle("overflow", this.config.autoScroll ? "auto" : "hidden");
            this.setActivePanel(p);
        }
        panel.setRegion(null);
        if(this.activePanel == panel){
            this.activePanel = null;
        }
        if(this.config.autoDestroy !== false && preservePanel !== true){
            try{panel.destroy();}catch(e){}
        }
        this.fireEvent("panelremoved", this, panel);
        return panel;
    },

    /**
     * Returns the TabPanel component used by this region
     * @return {Roo.panel.Tab}
     */
    getTabs : function(){
        return this.tabs;
    },

    createTool : function(parentEl, className){
        var btn = Roo.DomHelper.append(parentEl, {tag: "div", cls: "x-layout-tools-button",
            children: [{tag: "div", cls: "x-layout-tools-button-inner " + className, html: "&#160;"}]}, true);
        btn.addClassOnOver("x-layout-tools-button-over");
        return btn;
    }
});