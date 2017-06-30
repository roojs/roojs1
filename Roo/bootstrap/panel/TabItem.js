
/**
 * @class Roo.TabPanelItem
 * @extends Roo.util.Observable
 * Represents an individual item (tab plus body) in a TabPanel.
 * @param {Roo.TabPanel} tabPanel The {@link Roo.TabPanel} this TabPanelItem belongs to
 * @param {String} id The id of this TabPanelItem
 * @param {String} text The text for the tab of this TabPanelItem
 * @param {Boolean} closable True to allow this TabPanelItem to be closable (defaults to false)
 */
Roo.bootstrap.panel.TabItem = function(config){
    /**
     * The {@link Roo.TabPanel} this TabPanelItem belongs to
     * @type Roo.TabPanel
     */
    this.tabPanel = config.panel;
    /**
     * The id for this TabPanelItem
     * @type String
     */
    this.id = config.id;
    /** @private */
    this.disabled = false;
    /** @private */
    this.text = config.text;
    /** @private */
    this.loaded = false;
    this.closable = config.closable;

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
        /*
         *  #2804 [new] Tabs in Roojs
         *  increase the width by 2-4 pixels to prevent the ellipssis showing in chrome
         */
        this.setWidth(this.textEl.dom.scrollWidth+this.pnode.getPadding("lr")+this.inner.getPadding("lr") + 2);
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