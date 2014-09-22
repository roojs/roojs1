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
 * @class Roo.TabPanel
 * @extends Roo.util.Observable
 * A lightweight tab container.
 * <br><br>
 * Usage:
 * <pre><code>
// basic tabs 1, built from existing content
var tabs = new Roo.TabPanel("tabs1");
tabs.addTab("script", "View Script");
tabs.addTab("markup", "View Markup");
tabs.activate("script");

// more advanced tabs, built from javascript
var jtabs = new Roo.TabPanel("jtabs");
jtabs.addTab("jtabs-1", "Normal Tab", "My content was added during construction.");

// set up the UpdateManager
var tab2 = jtabs.addTab("jtabs-2", "Ajax Tab 1");
var updater = tab2.getUpdateManager();
updater.setDefaultUrl("ajax1.htm");
tab2.on('activate', updater.refresh, updater, true);

// Use setUrl for Ajax loading
var tab3 = jtabs.addTab("jtabs-3", "Ajax Tab 2");
tab3.setUrl("ajax2.htm", null, true);

// Disabled tab
var tab4 = jtabs.addTab("tabs1-5", "Disabled Tab", "Can't see me cause I'm disabled");
tab4.disable();

jtabs.activate("jtabs-1");
 * </code></pre>
 * @constructor
 * Create a new TabPanel.
 * @param {String/HTMLElement/Roo.Element} container The id, DOM element or Roo.Element container where this TabPanel is to be rendered.
 * @param {Object/Boolean} config Config object to set any properties for this TabPanel, or true to render the tabs on the bottom.
 */
Roo.TabPanel = function(container, config){
    /**
    * The container element for this TabPanel.
    * @type Roo.Element
    */
    this.el = Roo.get(container, true);
    if(config){
        if(typeof config == "boolean"){
            this.tabPosition = config ? "bottom" : "top";
        }else{
            Roo.apply(this, config);
        }
    }
    if(this.tabPosition == "bottom"){
        this.bodyEl = Roo.get(this.createBody(this.el.dom));
        this.el.addClass("x-tabs-bottom");
    }
    this.stripWrap = Roo.get(this.createStrip(this.el.dom), true);
    this.stripEl = Roo.get(this.createStripList(this.stripWrap.dom), true);
    this.stripBody = Roo.get(this.stripWrap.dom.firstChild.firstChild, true);
    if(Roo.isIE){
        Roo.fly(this.stripWrap.dom.firstChild).setStyle("overflow-x", "hidden");
    }
    if(this.tabPosition != "bottom"){
        /** The body element that contains {@link Roo.TabPanelItem} bodies. +
         * @type Roo.Element
         */
        this.bodyEl = Roo.get(this.createBody(this.el.dom));
        this.el.addClass("x-tabs-top");
    }
    this.items = [];

    this.bodyEl.setStyle("position", "relative");

    this.active = null;
    this.activateDelegate = this.activate.createDelegate(this);

    this.addEvents({
        /**
         * @event tabchange
         * Fires when the active tab changes
         * @param {Roo.TabPanel} this
         * @param {Roo.TabPanelItem} activePanel The new active tab
         */
        "tabchange": true,
        /**
         * @event beforetabchange
         * Fires before the active tab changes, set cancel to true on the "e" parameter to cancel the change
         * @param {Roo.TabPanel} this
         * @param {Object} e Set cancel to true on this object to cancel the tab change
         * @param {Roo.TabPanelItem} tab The tab being changed to
         */
        "beforetabchange" : true
    });

    Roo.EventManager.onWindowResize(this.onResize, this);
    this.cpad = this.el.getPadding("lr");
    this.hiddenCount = 0;


    // toolbar on the tabbar support...
    if (this.toolbar) {
        var tcfg = this.toolbar;
        tcfg.container = this.stripEl.child('td.x-tab-strip-toolbar');  
        this.toolbar = new Roo.Toolbar(tcfg);
        if (Roo.isSafari) {
            var tbl = tcfg.container.child('table', true);
            tbl.setAttribute('width', '100%');
        }
        
    }
   


    Roo.TabPanel.superclass.constructor.call(this);
};

Roo.extend(Roo.TabPanel, Roo.util.Observable, {
    /*
     *@cfg {String} tabPosition "top" or "bottom" (defaults to "top")
     */
    tabPosition : "top",
    /*
     *@cfg {Number} currentTabWidth The width of the current tab (defaults to 0)
     */
    currentTabWidth : 0,
    /*
     *@cfg {Number} minTabWidth The minimum width of a tab (defaults to 40) (ignored if {@link #resizeTabs} is not true)
     */
    minTabWidth : 40,
    /*
     *@cfg {Number} maxTabWidth The maximum width of a tab (defaults to 250) (ignored if {@link #resizeTabs} is not true)
     */
    maxTabWidth : 250,
    /*
     *@cfg {Number} preferredTabWidth The preferred (default) width of a tab (defaults to 175) (ignored if {@link #resizeTabs} is not true)
     */
    preferredTabWidth : 175,
    /*
     *@cfg {Boolean} resizeTabs True to enable dynamic tab resizing (defaults to false)
     */
    resizeTabs : false,
    /*
     *@cfg {Boolean} monitorResize Set this to true to turn on window resize monitoring (ignored if {@link #resizeTabs} is not true) (defaults to true)
     */
    monitorResize : true,
    /*
     *@cfg {Object} toolbar xtype description of toolbar to show at the right of the tab bar. 
     */
    toolbar : false,

    /**
     * Creates a new {@link Roo.TabPanelItem} by looking for an existing element with the provided id -- if it's not found it creates one.
     * @param {String} id The id of the div to use <b>or create</b>
     * @param {String} text The text for the tab
     * @param {String} content (optional) Content to put in the TabPanelItem body
     * @param {Boolean} closable (optional) True to create a close icon on the tab
     * @return {Roo.TabPanelItem} The created TabPanelItem
     */
    addTab : function(id, text, content, closable){
        var item = new Roo.TabPanelItem(this, id, text, closable);
        this.addTabItem(item);
        if(content){
            item.setContent(content);
        }
        return item;
    },

    /**
     * Returns the {@link Roo.TabPanelItem} with the specified id/index
     * @param {String/Number} id The id or index of the TabPanelItem to fetch.
     * @return {Roo.TabPanelItem}
     */
    getTab : function(id){
        return this.items[id];
    },

    /**
     * Hides the {@link Roo.TabPanelItem} with the specified id/index
     * @param {String/Number} id The id or index of the TabPanelItem to hide.
     */
    hideTab : function(id){
        var t = this.items[id];
        if(!t.isHidden()){
           t.setHidden(true);
           this.hiddenCount++;
           this.autoSizeTabs();
        }
    },

    /**
     * "Unhides" the {@link Roo.TabPanelItem} with the specified id/index.
     * @param {String/Number} id The id or index of the TabPanelItem to unhide.
     */
    unhideTab : function(id){
        var t = this.items[id];
        if(t.isHidden()){
           t.setHidden(false);
           this.hiddenCount--;
           this.autoSizeTabs();
        }
    },

    /**
     * Adds an existing {@link Roo.TabPanelItem}.
     * @param {Roo.TabPanelItem} item The TabPanelItem to add
     */
    addTabItem : function(item){
        Roo.log('Running addTabItem!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        Roo.log(item);
        this.items[item.id] = item;
        this.items.push(item);
        if(this.resizeTabs){
            Roo.log('resize tabs??');
           item.setWidth(this.currentTabWidth || this.preferredTabWidth);
           this.autoSizeTabs();
        }else{
            Roo.log('no resize tabs??');
            item.autoSize();
        }
    },

    /**
     * Removes a {@link Roo.TabPanelItem}.
     * @param {String/Number} id The id or index of the TabPanelItem to remove.
     */
    removeTab : function(id){
        var items = this.items;
        var tab = items[id];
        if(!tab) { return; }
        var index = items.indexOf(tab);
        if(this.active == tab && items.length > 1){
            var newTab = this.getNextAvailable(index);
            if(newTab) {
                newTab.activate();
            }
        }
        this.stripEl.dom.removeChild(tab.pnode.dom);
        if(tab.bodyEl.dom.parentNode == this.bodyEl.dom){ // if it was moved already prevent error
            this.bodyEl.dom.removeChild(tab.bodyEl.dom);
        }
        items.splice(index, 1);
        delete this.items[tab.id];
        tab.fireEvent("close", tab);
        tab.purgeListeners();
        this.autoSizeTabs();
    },

    getNextAvailable : function(start){
        var items = this.items;
        var index = start;
        // look for a next tab that will slide over to
        // replace the one being removed
        while(index < items.length){
            var item = items[++index];
            if(item && !item.isHidden()){
                return item;
            }
        }
        // if one isn't found select the previous tab (on the left)
        index = start;
        while(index >= 0){
            var item = items[--index];
            if(item && !item.isHidden()){
                return item;
            }
        }
        return null;
    },

    /**
     * Disables a {@link Roo.TabPanelItem}. It cannot be the active tab, if it is this call is ignored.
     * @param {String/Number} id The id or index of the TabPanelItem to disable.
     */
    disableTab : function(id){
        var tab = this.items[id];
        if(tab && this.active != tab){
            tab.disable();
        }
    },

    /**
     * Enables a {@link Roo.TabPanelItem} that is disabled.
     * @param {String/Number} id The id or index of the TabPanelItem to enable.
     */
    enableTab : function(id){
        var tab = this.items[id];
        tab.enable();
    },

    /**
     * Activates a {@link Roo.TabPanelItem}. The currently active one will be deactivated.
     * @param {String/Number} id The id or index of the TabPanelItem to activate.
     * @return {Roo.TabPanelItem} The TabPanelItem.
     */
    activate : function(id){
        var tab = this.items[id];
        if(!tab){
            return null;
        }
        if(tab == this.active || tab.disabled){
            return tab;
        }
        var e = {};
        this.fireEvent("beforetabchange", this, e, tab);
        if(e.cancel !== true && !tab.disabled){
            if(this.active){
                this.active.hide();
            }
            this.active = this.items[id];
            this.active.show();
            this.fireEvent("tabchange", this, this.active);
        }
        return tab;
    },

    /**
     * Gets the active {@link Roo.TabPanelItem}.
     * @return {Roo.TabPanelItem} The active TabPanelItem or null if none are active.
     */
    getActiveTab : function(){
        return this.active;
    },

    /**
     * Updates the tab body element to fit the height of the container element
     * for overflow scrolling
     * @param {Number} targetHeight (optional) Override the starting height from the elements height
     */
    syncHeight : function(targetHeight){
        var height = (targetHeight || this.el.getHeight())-this.el.getBorderWidth("tb")-this.el.getPadding("tb");
        var bm = this.bodyEl.getMargins();
        var newHeight = height-(this.stripWrap.getHeight()||0)-(bm.top+bm.bottom);
        this.bodyEl.setHeight(newHeight);
        return newHeight;
    },

    onResize : function(){
        if(this.monitorResize){
            this.autoSizeTabs();
        }
    },

    /**
     * Disables tab resizing while tabs are being added (if {@link #resizeTabs} is false this does nothing)
     */
    beginUpdate : function(){
        this.updating = true;
    },

    /**
     * Stops an update and resizes the tabs (if {@link #resizeTabs} is false this does nothing)
     */
    endUpdate : function(){
        this.updating = false;
        this.autoSizeTabs();
    },

    /**
     * Manual call to resize the tabs (if {@link #resizeTabs} is false this does nothing)
     */
    autoSizeTabs : function(){
        var count = this.items.length;
        var vcount = count - this.hiddenCount;
        if(!this.resizeTabs || count < 1 || vcount < 1 || this.updating) return;
        var w = Math.max(this.el.getWidth() - this.cpad, 10);
        var availWidth = Math.floor(w / vcount);
        var b = this.stripBody;
        if(b.getWidth() > w){
            var tabs = this.items;
            this.setTabWidth(Math.max(availWidth, this.minTabWidth)-2);
            if(availWidth < this.minTabWidth){
                /*if(!this.sleft){    // incomplete scrolling code
                    this.createScrollButtons();
                }
                this.showScroll();
                this.stripClip.setWidth(w - (this.sleft.getWidth()+this.sright.getWidth()));*/
            }
        }else{
            if(this.currentTabWidth < this.preferredTabWidth){
                this.setTabWidth(Math.min(availWidth, this.preferredTabWidth)-2);
            }
        }
    },

    /**
     * Returns the number of tabs in this TabPanel.
     * @return {Number}
     */
     getCount : function(){
         return this.items.length;
     },

    /**
     * Resizes all the tabs to the passed width
     * @param {Number} The new width
     */
    setTabWidth : function(width){
        this.currentTabWidth = width;
        for(var i = 0, len = this.items.length; i < len; i++) {
        	if(!this.items[i].isHidden())this.items[i].setWidth(width);
        }
    },

    /**
     * Destroys this TabPanel
     * @param {Boolean} removeEl (optional) True to remove the element from the DOM as well (defaults to undefined)
     */
    destroy : function(removeEl){
        Roo.EventManager.removeResizeListener(this.onResize, this);
        for(var i = 0, len = this.items.length; i < len; i++){
            this.items[i].purgeListeners();
        }
        if(removeEl === true){
            this.el.update("");
            this.el.remove();
        }
    }
});

/**
 * @class Roo.TabPanelItem
 * @extends Roo.util.Observable
 * Represents an individual item (tab plus body) in a TabPanel.
 * @param {Roo.TabPanel} tabPanel The {@link Roo.TabPanel} this TabPanelItem belongs to
 * @param {String} id The id of this TabPanelItem
 * @param {String} text The text for the tab of this TabPanelItem
 * @param {Boolean} closable True to allow this TabPanelItem to be closable (defaults to false)
 */
Roo.TabPanelItem = function(tabPanel, id, text, closable){
    /**
     * The {@link Roo.TabPanel} this TabPanelItem belongs to
     * @type Roo.TabPanel
     */
    this.tabPanel = tabPanel;
    /**
     * The id for this TabPanelItem
     * @type String
     */
    this.id = id;
    /** @private */
    this.disabled = false;
    /** @private */
    this.text = text;
    /** @private */
    this.loaded = false;
    this.closable = closable;

    /**
     * The body element for this TabPanelItem.
     * @type Roo.Element
     */
    this.bodyEl = Roo.get(tabPanel.createItemBody(tabPanel.bodyEl.dom, id));
    this.bodyEl.setVisibilityMode(Roo.Element.VISIBILITY);
    this.bodyEl.setStyle("display", "block");
    this.bodyEl.setStyle("zoom", "1");
    this.hideAction();

    var els = tabPanel.createStripElements(tabPanel.stripEl.dom, text, closable);
    /** @private */
    this.el = Roo.get(els.el, true);
    this.inner = Roo.get(els.inner, true);
    this.textEl = Roo.get(this.el.dom.firstChild.firstChild.firstChild, true);
    this.pnode = Roo.get(els.el.parentNode, true);
    this.el.on("mousedown", this.onTabMouseDown, this);
    this.el.on("click", this.onTabClick, this);
    /** @private */
    if(closable){
        var c = Roo.get(els.close, true);
        c.dom.title = this.closeText;
        c.addClassOnOver("close-over");
        c.on("click", this.closeClick, this);
     }

    this.addEvents({
         /**
         * @event activate
         * Fires when this tab becomes the active tab.
         * @param {Roo.TabPanel} tabPanel The parent TabPanel
         * @param {Roo.TabPanelItem} this
         */
        "activate": true,
        /**
         * @event beforeclose
         * Fires before this tab is closed. To cancel the close, set cancel to true on e (e.cancel = true).
         * @param {Roo.TabPanelItem} this
         * @param {Object} e Set cancel to true on this object to cancel the close.
         */
        "beforeclose": true,
        /**
         * @event close
         * Fires when this tab is closed.
         * @param {Roo.TabPanelItem} this
         */
         "close": true,
        /**
         * @event deactivate
         * Fires when this tab is no longer the active tab.
         * @param {Roo.TabPanel} tabPanel The parent TabPanel
         * @param {Roo.TabPanelItem} this
         */
         "deactivate" : true
    });
    this.hidden = false;

    Roo.TabPanelItem.superclass.constructor.call(this);
};

Roo.extend(Roo.TabPanelItem, Roo.util.Observable, {
    purgeListeners : function(){
       Roo.util.Observable.prototype.purgeListeners.call(this);
       this.el.removeAllListeners();
    },
    /**
     * Shows this TabPanelItem -- this <b>does not</b> deactivate the currently active TabPanelItem.
     */
    show : function(){
        this.pnode.addClass("on");
        this.showAction();
        if(Roo.isOpera){
            this.tabPanel.stripWrap.repaint();
        }
        this.fireEvent("activate", this.tabPanel, this);
    },

    /**
     * Returns true if this tab is the active tab.
     * @return {Boolean}
     */
    isActive : function(){
        return this.tabPanel.getActiveTab() == this;
    },

    /**
     * Hides this TabPanelItem -- if you don't activate another TabPanelItem this could look odd.
     */
    hide : function(){
        this.pnode.removeClass("on");
        this.hideAction();
        this.fireEvent("deactivate", this.tabPanel, this);
    },

    hideAction : function(){
        this.bodyEl.hide();
        this.bodyEl.setStyle("position", "absolute");
        this.bodyEl.setLeft("-20000px");
        this.bodyEl.setTop("-20000px");
    },

    showAction : function(){
        this.bodyEl.setStyle("position", "relative");
        this.bodyEl.setTop("");
        this.bodyEl.setLeft("");
        this.bodyEl.show();
    },

    /**
     * Set the tooltip for the tab.
     * @param {String} tooltip The tab's tooltip
     */
    setTooltip : function(text){
        if(Roo.QuickTips && Roo.QuickTips.isEnabled()){
            this.textEl.dom.qtip = text;
            this.textEl.dom.removeAttribute('title');
        }else{
            this.textEl.dom.title = text;
        }
    },

    onTabClick : function(e){
        e.preventDefault();
        this.tabPanel.activate(this.id);
    },

    onTabMouseDown : function(e){
        e.preventDefault();
        this.tabPanel.activate(this.id);
    },

    getWidth : function(){
        return this.inner.getWidth();
    },

    setWidth : function(width){
        var iwidth = width - this.pnode.getPadding("lr");
        this.inner.setWidth(iwidth);
        this.textEl.setWidth(iwidth-this.inner.getPadding("lr"));
        this.pnode.setWidth(width);
    },

    /**
     * Show or hide the tab
     * @param {Boolean} hidden True to hide or false to show.
     */
    setHidden : function(hidden){
        this.hidden = hidden;
        this.pnode.setStyle("display", hidden ? "none" : "");
    },

    /**
     * Returns true if this tab is "hidden"
     * @return {Boolean}
     */
    isHidden : function(){
        return this.hidden;
    },

    /**
     * Returns the text for this tab
     * @return {String}
     */
    getText : function(){
        return this.text;
    },

    autoSize : function(){
        //this.el.beginMeasure();
        this.textEl.setWidth(1);
        Roo.log(this.textEl.dom.scrollWidth);
        Roo.log(this.pnode.getPadding("lr"));
        Roo.log(this.inner.getPadding("lr"));
        Roo.log(this.textEl.dom.scrollWidth+this.pnode.getPadding("lr")+this.inner.getPadding("lr"));
        this.setWidth(this.textEl.dom.scrollWidth+this.pnode.getPadding("lr")+this.inner.getPadding("lr"));
        //this.el.endMeasure();
    },

    /**
     * Sets the text for the tab (Note: this also sets the tooltip text)
     * @param {String} text The tab's text and tooltip
     */
    setText : function(text){
        this.text = text;
        this.textEl.update(text);
        this.setTooltip(text);
        if(!this.tabPanel.resizeTabs){
            this.autoSize();
        }
    },
    /**
     * Activates this TabPanelItem -- this <b>does</b> deactivate the currently active TabPanelItem.
     */
    activate : function(){
        this.tabPanel.activate(this.id);
    },

    /**
     * Disables this TabPanelItem -- this does nothing if this is the active TabPanelItem.
     */
    disable : function(){
        if(this.tabPanel.active != this){
            this.disabled = true;
            this.pnode.addClass("disabled");
        }
    },

    /**
     * Enables this TabPanelItem if it was previously disabled.
     */
    enable : function(){
        this.disabled = false;
        this.pnode.removeClass("disabled");
    },

    /**
     * Sets the content for this TabPanelItem.
     * @param {String} content The content
     * @param {Boolean} loadScripts true to look for and load scripts
     */
    setContent : function(content, loadScripts){
        this.bodyEl.update(content, loadScripts);
    },

    /**
     * Gets the {@link Roo.UpdateManager} for the body of this TabPanelItem. Enables you to perform Ajax updates.
     * @return {Roo.UpdateManager} The UpdateManager
     */
    getUpdateManager : function(){
        return this.bodyEl.getUpdateManager();
    },

    /**
     * Set a URL to be used to load the content for this TabPanelItem.
     * @param {String/Function} url The URL to load the content from, or a function to call to get the URL
     * @param {String/Object} params (optional) The string params for the update call or an object of the params. See {@link Roo.UpdateManager#update} for more details. (Defaults to null)
     * @param {Boolean} loadOnce (optional) Whether to only load the content once. If this is false it makes the Ajax call every time this TabPanelItem is activated. (Defaults to false)
     * @return {Roo.UpdateManager} The UpdateManager
     */
    setUrl : function(url, params, loadOnce){
        if(this.refreshDelegate){
            this.un('activate', this.refreshDelegate);
        }
        this.refreshDelegate = this._handleRefresh.createDelegate(this, [url, params, loadOnce]);
        this.on("activate", this.refreshDelegate);
        return this.bodyEl.getUpdateManager();
    },

    /** @private */
    _handleRefresh : function(url, params, loadOnce){
        if(!loadOnce || !this.loaded){
            var updater = this.bodyEl.getUpdateManager();
            updater.update(url, params, this._setLoaded.createDelegate(this));
        }
    },

    /**
     *   Forces a content refresh from the URL specified in the {@link #setUrl} method.
     *   Will fail silently if the setUrl method has not been called.
     *   This does not activate the panel, just updates its content.
     */
    refresh : function(){
        if(this.refreshDelegate){
           this.loaded = false;
           this.refreshDelegate();
        }
    },

    /** @private */
    _setLoaded : function(){
        this.loaded = true;
    },

    /** @private */
    closeClick : function(e){
        var o = {};
        e.stopEvent();
        this.fireEvent("beforeclose", this, o);
        if(o.cancel !== true){
            this.tabPanel.removeTab(this.id);
        }
    },
    /**
     * The text displayed in the tooltip for the close icon.
     * @type String
     */
    closeText : "Close this tab"
});

/** @private */
Roo.TabPanel.prototype.createStrip = function(container){
    var strip = document.createElement("div");
    strip.className = "x-tabs-wrap";
    container.appendChild(strip);
    return strip;
};
/** @private */
Roo.TabPanel.prototype.createStripList = function(strip){
    // div wrapper for retard IE
    // returns the "tr" element.
    strip.innerHTML = '<div class="x-tabs-strip-wrap">'+
        '<table class="x-tabs-strip" cellspacing="0" cellpadding="0" border="0"><tbody><tr>'+
        '<td class="x-tab-strip-toolbar"></td></tr></tbody></table></div>';
    return strip.firstChild.firstChild.firstChild.firstChild;
};
/** @private */
Roo.TabPanel.prototype.createBody = function(container){
    var body = document.createElement("div");
    Roo.id(body, "tab-body");
    Roo.fly(body).addClass("x-tabs-body");
    container.appendChild(body);
    return body;
};
/** @private */
Roo.TabPanel.prototype.createItemBody = function(bodyEl, id){
    var body = Roo.getDom(id);
    if(!body){
        body = document.createElement("div");
        body.id = id;
    }
    Roo.fly(body).addClass("x-tabs-item-body");
    bodyEl.insertBefore(body, bodyEl.firstChild);
    return body;
};
/** @private */
Roo.TabPanel.prototype.createStripElements = function(stripEl, text, closable){
    var td = document.createElement("td");
    stripEl.insertBefore(td, stripEl.childNodes[stripEl.childNodes.length-1]);
    //stripEl.appendChild(td);
    if(closable){
        td.className = "x-tabs-closable";
        if(!this.closeTpl){
            this.closeTpl = new Roo.Template(
               '<a href="#" class="x-tabs-right"><span class="x-tabs-left"><em class="x-tabs-inner">' +
               '<span unselectable="on"' + (this.disableTooltips ? '' : ' title="{text}"') +' class="x-tabs-text">{text}</span>' +
               '<div unselectable="on" class="close-icon">&#160;</div></em></span></a>'
            );
        }
        var el = this.closeTpl.overwrite(td, {"text": text});
        var close = el.getElementsByTagName("div")[0];
        var inner = el.getElementsByTagName("em")[0];
        return {"el": el, "close": close, "inner": inner};
    } else {
        if(!this.tabTpl){
            this.tabTpl = new Roo.Template(
               '<a href="#" class="x-tabs-right"><span class="x-tabs-left"><em class="x-tabs-inner">' +
               '<span unselectable="on"' + (this.disableTooltips ? '' : ' title="{text}"') +' class="x-tabs-text">{text}</span></em></span></a>'
            );
        }
        var el = this.tabTpl.overwrite(td, {"text": text});
        var inner = el.getElementsByTagName("em")[0];
        return {"el": el, "inner": inner};
    }
};