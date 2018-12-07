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
Roo.bootstrap.panel.Tabs = function(config){
    /**
    * The container element for this TabPanel.
    * @type Roo.Element
    */
    this.el = Roo.get(config.el);
    delete config.el;
    if(config){
        if(typeof config == "boolean"){
            this.tabPosition = config ? "bottom" : "top";
        }else{
            Roo.apply(this, config);
        }
    }
    
    if(this.tabPosition == "bottom"){
        // if tabs are at the bottom = create the body first.
        this.bodyEl = Roo.get(this.createBody(this.el.dom));
        this.el.addClass("roo-tabs-bottom");
    }
    // next create the tabs holders
    
    if (this.tabPosition == "west"){
        
        var reg = this.region; // fake it..
        while (reg) {
            if (!reg.mgr.parent) {
                break;
            }
            reg = reg.mgr.parent.region;
        }
        Roo.log("got nest?");
        Roo.log(reg);
        if (reg.mgr.getRegion('west')) {
            var ctrdom = reg.mgr.getRegion('west').bodyEl.dom;
            this.stripWrap = Roo.get(this.createStrip(ctrdom ), true);
            this.stripEl = Roo.get(this.createStripList(this.stripWrap.dom), true);
            this.stripEl.setVisibilityMode(Roo.Element.DISPLAY);
            this.stripBody = Roo.get(this.stripWrap.dom.firstChild.firstChild, true);
        
            
        }
        
        
    } else {
     
        this.stripWrap = Roo.get(this.createStrip(this.el.dom), true);
        this.stripEl = Roo.get(this.createStripList(this.stripWrap.dom), true);
        this.stripEl.setVisibilityMode(Roo.Element.DISPLAY);
        this.stripBody = Roo.get(this.stripWrap.dom.firstChild.firstChild, true);
    }
    
    
    if(Roo.isIE){
        Roo.fly(this.stripWrap.dom.firstChild).setStyle("overflow-x", "hidden");
    }
    
    // finally - if tabs are at the top, then create the body last..
    if(this.tabPosition != "bottom"){
        /** The body element that contains {@link Roo.TabPanelItem} bodies. +
         * @type Roo.Element
         */
        this.bodyEl = Roo.get(this.createBody(this.el.dom));
        this.el.addClass("roo-tabs-top");
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
        alert("no toolbar support yet");
        this.toolbar  = false;
        /*
        var tcfg = this.toolbar;
        tcfg.container = this.stripEl.child('td.x-tab-strip-toolbar');  
        this.toolbar = new Roo.Toolbar(tcfg);
        if (Roo.isSafari) {
            var tbl = tcfg.container.child('table', true);
            tbl.setAttribute('width', '100%');
        }
        */
        
    }
   


    Roo.bootstrap.panel.Tabs.superclass.constructor.call(this);
};

Roo.extend(Roo.bootstrap.panel.Tabs, Roo.util.Observable, {
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
    toolbar : false,  // set by caller..
    
    region : false, /// set by caller
    
    disableTooltips : true, // not used yet...

    /**
     * Creates a new {@link Roo.TabPanelItem} by looking for an existing element with the provided id -- if it's not found it creates one.
     * @param {String} id The id of the div to use <b>or create</b>
     * @param {String} text The text for the tab
     * @param {String} content (optional) Content to put in the TabPanelItem body
     * @param {Boolean} closable (optional) True to create a close icon on the tab
     * @return {Roo.TabPanelItem} The created TabPanelItem
     */
    addTab : function(id, text, content, closable, tpl)
    {
        var item = new Roo.bootstrap.panel.TabItem({
            panel: this,
            id : id,
            text : text,
            closable : closable,
            tpl : tpl
        });
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
    addTabItem : function(item)
    {
        this.items[item.id] = item;
        this.items.push(item);
        this.autoSizeTabs();
      //  if(this.resizeTabs){
    //       item.setWidth(this.currentTabWidth || this.preferredTabWidth);
  //         this.autoSizeTabs();
//        }else{
//            item.autoSize();
       // }
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
    activate : function(id)
    {
        //Roo.log('activite:'  + id);
        
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
    autoSizeTabs : function()
    {
        var count = this.items.length;
        var vcount = count - this.hiddenCount;
        
        if (vcount < 2) {
            this.stripEl.hide();
        } else {
            this.stripEl.show();
        }
        
        if(!this.resizeTabs || count < 1 || vcount < 1 || this.updating) {
            return;
        }
        
        
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
        	if(!this.items[i].isHidden()) {
                this.items[i].setWidth(width);
            }
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
    },
    
    createStrip : function(container)
    {
        var strip = document.createElement("nav");
        strip.className = Roo.bootstrap.version == 4 ?
            "navbar-light bg-light" : 
            "navbar navbar-default"; //"x-tabs-wrap";
        container.appendChild(strip);
        return strip;
    },
    
    createStripList : function(strip)
    {
        // div wrapper for retard IE
        // returns the "tr" element.
        strip.innerHTML = '<ul class="nav nav-tabs" role="tablist"></ul>';
        //'<div class="x-tabs-strip-wrap">'+
          //  '<table class="x-tabs-strip" cellspacing="0" cellpadding="0" border="0"><tbody><tr>'+
          //  '<td class="x-tab-strip-toolbar"></td></tr></tbody></table></div>';
        return strip.firstChild; //.firstChild.firstChild.firstChild;
    },
    createBody : function(container)
    {
        var body = document.createElement("div");
        Roo.id(body, "tab-body");
        //Roo.fly(body).addClass("x-tabs-body");
        Roo.fly(body).addClass("tab-content");
        container.appendChild(body);
        return body;
    },
    createItemBody :function(bodyEl, id){
        var body = Roo.getDom(id);
        if(!body){
            body = document.createElement("div");
            body.id = id;
        }
        //Roo.fly(body).addClass("x-tabs-item-body");
        Roo.fly(body).addClass("tab-pane");
         bodyEl.insertBefore(body, bodyEl.firstChild);
        return body;
    },
    /** @private */
    createStripElements :  function(stripEl, text, closable, tpl)
    {
        var td = document.createElement("li"); // was td..
        td.className = 'nav-item';
        
        //stripEl.insertBefore(td, stripEl.childNodes[stripEl.childNodes.length-1]);
        
        
        stripEl.appendChild(td);
        /*if(closable){
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
        */
        // not sure what this is..
//            if(!this.tabTpl){
                //this.tabTpl = new Roo.Template(
                //   '<a href="#" class="x-tabs-right"><span class="x-tabs-left"><em class="x-tabs-inner">' +
                //   '<span unselectable="on"' + (this.disableTooltips ? '' : ' title="{text}"') +' class="x-tabs-text">{text}</span></em></span></a>'
                //);
//                this.tabTpl = new Roo.Template(
//                   '<a href="#">' +
//                   '<span unselectable="on"' +
//                            (this.disableTooltips ? '' : ' title="{text}"') +
//                            ' >{text}</span></a>'
//                );
//                
//            }


            var template = tpl || this.tabTpl || false;
            
            if(!template){
                template =  new Roo.Template(
                        Roo.bootstrap.version == 4 ? 
                            (
                                '<a class="nav-link" href="#" unselectable="on"' +
                                     (this.disableTooltips ? '' : ' title="{text}"') +
                                     ' >{text}</a>'
                            ) : (
                                '<a class="nav-link" href="#">' +
                                '<span unselectable="on"' +
                                         (this.disableTooltips ? '' : ' title="{text}"') +
                                    ' >{text}</span></a>'
                            )
                );
            }
            
            switch (typeof(template)) {
                case 'object' :
                    break;
                case 'string' :
                    template = new Roo.Template(template);
                    break;
                default :
                    break;
            }
            
            var el = template.overwrite(td, {"text": text});
            
            var inner = el.getElementsByTagName("span")[0];
            
            return {"el": el, "inner": inner};
            
    }
        
    
});
