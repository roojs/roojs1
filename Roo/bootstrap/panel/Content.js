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
 * @class Roo.bootstrap.paenl.Content
 * @extends Roo.util.Observable
 * @children Roo.bootstrap.Component
 * @parent builder Roo.bootstrap.layout.Border
 * A basic ContentPanel element. - a panel that contain any content (eg. forms etc.)
 * @cfg {Boolean}   fitToFrame    True for this panel to adjust its size to fit when the region resizes  (defaults to false)
 * @cfg {Boolean}   fitContainer   When using {@link #fitToFrame} and {@link #resizeEl}, you can also fit the parent container  (defaults to false)
 * @cfg {Boolean/Object} autoCreate True to auto generate the DOM element for this panel, or a {@link Roo.DomHelper} config of the element to create
 * @cfg {Boolean}   closable      True if the panel can be closed/removed
 * @cfg {Boolean}   background    True if the panel should not be activated when it is added (defaults to false)
 * @cfg {String/HTMLElement/Element} resizeEl An element to resize if {@link #fitToFrame} is true (instead of this panel's element)
 * @cfg {Toolbar}   toolbar       A toolbar for this panel
 * @cfg {Boolean} autoScroll    True to scroll overflow in this panel (use with {@link #fitToFrame})
 * @cfg {String} title          The title for this panel
 * @cfg {Array} adjustments     Values to <b>add</b> to the width/height when doing a {@link #fitToFrame} (default is [0, 0])
 * @cfg {String} url            Calls {@link #setUrl} with this value
 * @cfg {String} region  [required] (center|north|south|east|west) which region to put this panel on (when used with xtype constructors)
 * @cfg {String/Object} params  When used with {@link #url}, calls {@link #setUrl} with this value
 * @cfg {Boolean} loadOnce      When used with {@link #url}, calls {@link #setUrl} with this value
 * @cfg {String}    content        Raw content to fill content panel with (uses setContent on construction.)
 * @cfg {Boolean} iframe      contents are an iframe - makes showing remote sources/CSS feasible..
 * @cfg {Boolean} badges render the badges
 * @cfg {String} cls  extra classes to use  
 * @cfg {String} background (primary|secondary|success|info|warning|danger|light|dark)
 
 * @constructor
 * Create a new ContentPanel.
 * @param {String/Object} config A string to set only the title or a config object
 
 */
Roo.bootstrap.panel.Content = function( config){
    
    this.tpl = config.tpl || false;
    
    var el = config.el;
    var content = config.content;

    if(config.autoCreate){ // xtype is available if this is called from factory
        el = Roo.id();
    }
    this.el = Roo.get(el);
    if(!this.el && config && config.autoCreate){
        if(typeof config.autoCreate == "object"){
            if(!config.autoCreate.id){
                config.autoCreate.id = config.id||el;
            }
            this.el = Roo.DomHelper.append(document.body,
                        config.autoCreate, true);
        }else{
            var elcfg =  {
                tag: "div",
                cls: (config.cls || '') +
                    (config.background ? ' bg-' + config.background : '') +
                    " roo-layout-inactive-content",
                id: config.id||el
            };
            if (config.iframe) {
                elcfg.cn = [
                    {
                        tag : 'iframe',
                        style : 'border: 0px',
                        src : 'data:text/html,%3Cbody%3E%3C%2Fbody%3E'
                    }
                ];
            }
              
            if (config.html) {
                elcfg.html = config.html;
                
            }
                        
            this.el = Roo.DomHelper.append(document.body, elcfg , true);
            if (config.iframe) {
                this.iframeEl = this.el.select('iframe',true).first();
            }
            
        }
    } 
    this.closable = false;
    this.loaded = false;
    this.active = false;
   
      
    if (config.toolbar && !config.toolbar.el && config.toolbar.xtype) {
        
        this.toolbar = new config.toolbar.xns[config.toolbar.xtype](config.toolbar);
        
        this.wrapEl = this.el; //this.el.wrap();
        var ti = [];
        if (config.toolbar.items) {
            ti = config.toolbar.items ;
            delete config.toolbar.items ;
        }
        
        var nitems = [];
        this.toolbar.render(this.wrapEl, 'before');
        for(var i =0;i < ti.length;i++) {
          //  Roo.log(['add child', items[i]]);
            nitems.push(this.toolbar.addxtype(Roo.apply({}, ti[i])));
        }
        this.toolbar.items = nitems;
        this.toolbar.el.insertBefore(this.wrapEl.dom.firstChild);
        delete config.toolbar;
        
    }
    /*
    // xtype created footer. - not sure if will work as we normally have to render first..
    if (this.footer && !this.footer.el && this.footer.xtype) {
        if (!this.wrapEl) {
            this.wrapEl = this.el.wrap();
        }
    
        this.footer.container = this.wrapEl.createChild();
         
        this.footer = Roo.factory(this.footer, Roo);
        
    }
    */
    
     if(typeof config == "string"){
        this.title = config;
    }else{
        Roo.apply(this, config);
    }
    
    if(this.resizeEl){
        this.resizeEl = Roo.get(this.resizeEl, true);
    }else{
        this.resizeEl = this.el;
    }
    // handle view.xtype
    
 
    
    
    this.addEvents({
        /**
         * @event activate
         * Fires when this panel is activated. 
         * @param {Roo.ContentPanel} this
         */
        "activate" : true,
        /**
         * @event deactivate
         * Fires when this panel is activated. 
         * @param {Roo.ContentPanel} this
         */
        "deactivate" : true,

        /**
         * @event resize
         * Fires when this panel is resized if fitToFrame is true.
         * @param {Roo.ContentPanel} this
         * @param {Number} width The width after any component adjustments
         * @param {Number} height The height after any component adjustments
         */
        "resize" : true,
        
         /**
         * @event render
         * Fires when this tab is created
         * @param {Roo.ContentPanel} this
         */
        "render" : true,
        
          /**
         * @event scroll
         * Fires when this content is scrolled
         * @param {Roo.ContentPanel} this
         * @param {Event} scrollEvent
         */
        "scroll" : true
        
        
        
    });
    

    
    
    if(this.autoScroll && !this.iframe){
        this.resizeEl.setStyle("overflow", "auto");
        this.resizeEl.on('scroll', this.onScroll, this);
    } else {
        // fix randome scrolling
        //this.el.on('scroll', function() {
        //    Roo.log('fix random scolling');
        //    this.scrollTo('top',0); 
        //});
    }
    content = content || this.content;
    if(content){
        this.setContent(content);
    }
    if(config && config.url){
        this.setUrl(this.url, this.params, this.loadOnce);
    }
    
    
    
    Roo.bootstrap.panel.Content.superclass.constructor.call(this);
    
    if (this.view && typeof(this.view.xtype) != 'undefined') {
        this.view.el = this.el.appendChild(document.createElement("div"));
        this.view = Roo.factory(this.view); 
        this.view.render  &&  this.view.render(false, '');  
    }
    
    
    this.fireEvent('render', this);
};

Roo.extend(Roo.bootstrap.panel.Content, Roo.bootstrap.Component, {
    
    cls : '',
    background : '',
    
    tabTip : '',
    
    iframe : false,
    iframeEl : false,
    
    /* Resize Element - use this to work out scroll etc. */
    resizeEl : false,
    
    setRegion : function(region){
        this.region = region;
        this.setActiveClass(region && !this.background);
    },
    
    
    setActiveClass: function(state)
    {
        if(state){
           this.el.replaceClass("roo-layout-inactive-content", "roo-layout-active-content");
           this.el.setStyle('position','relative');
        }else{
           this.el.replaceClass("roo-layout-active-content", "roo-layout-inactive-content");
           this.el.setStyle('position', 'absolute');
        } 
    },
    
    /**
     * Returns the toolbar for this Panel if one was configured. 
     * @return {Roo.Toolbar} 
     */
    getToolbar : function(){
        return this.toolbar;
    },
    
    setActiveState : function(active)
    {
        this.active = active;
        this.setActiveClass(active);
        if(!active){
            if(this.fireEvent("deactivate", this) === false){
                return false;
            }
            return true;
        }
        this.fireEvent("activate", this);
        return true;
    },
    /**
     * Updates this panel's element (not for iframe)
     * @param {String} content The new content
     * @param {Boolean} loadScripts (optional) true to look for and process scripts
    */
    setContent : function(content, loadScripts){
        if (this.iframe) {
            return;
        }
        
        this.el.update(content, loadScripts);
    },

    ignoreResize : function(w, h)
    {
        //return false; // always resize?
        if(this.lastSize && this.lastSize.width == w && this.lastSize.height == h){
            return true;
        }else{
            this.lastSize = {width: w, height: h};
            return false;
        }
    },
    /**
     * Get the {@link Roo.UpdateManager} for this panel. Enables you to perform Ajax updates.
     * @return {Roo.UpdateManager} The UpdateManager
     */
    getUpdateManager : function(){
        if (this.iframe) {
            return false;
        }
        return this.el.getUpdateManager();
    },
     /**
     * Loads this content panel immediately with content from XHR. Note: to delay loading until the panel is activated, use {@link #setUrl}.
     * Does not work with IFRAME contents
     * @param {Object/String/Function} url The url for this request or a function to call to get the url or a config object containing any of the following options:
<pre><code>
panel.load({
    url: "your-url.php",
    params: {param1: "foo", param2: "bar"}, // or a URL encoded string
    callback: yourFunction,
    scope: yourObject, //(optional scope)
    discardUrl: false,
    nocache: false,
    text: "Loading...",
    timeout: 30,
    scripts: false
});
</code></pre>
     
     * The only required property is <i>url</i>. The optional properties <i>nocache</i>, <i>text</i> and <i>scripts</i>
     * are shorthand for <i>disableCaching</i>, <i>indicatorText</i> and <i>loadScripts</i> and are used to set their associated property on this panel UpdateManager instance.
     * @param {String/Object} params (optional) The parameters to pass as either a URL encoded string "param1=1&amp;param2=2" or an object {param1: 1, param2: 2}
     * @param {Function} callback (optional) Callback when transaction is complete -- called with signature (oElement, bSuccess, oResponse)
     * @param {Boolean} discardUrl (optional) By default when you execute an update the defaultUrl is changed to the last used URL. If true, it will not store the URL.
     * @return {Roo.ContentPanel} this
     */
    load : function(){
        
        if (this.iframe) {
            return this;
        }
        
        var um = this.el.getUpdateManager();
        um.update.apply(um, arguments);
        return this;
    },


    /**
     * Set a URL to be used to load the content for this panel. When this panel is activated, the content will be loaded from that URL.
     * @param {String/Function} url The URL to load the content from or a function to call to get the URL
     * @param {String/Object} params (optional) The string params for the update call or an object of the params. See {@link Roo.UpdateManager#update} for more details. (Defaults to null)
     * @param {Boolean} loadOnce (optional) Whether to only load the content once. If this is false it makes the Ajax call every time this panel is activated. (Defaults to false)
     * @return {Roo.UpdateManager|Boolean} The UpdateManager or false if IFRAME
     */
    setUrl : function(url, params, loadOnce){
        if (this.iframe) {
            this.iframeEl.dom.src = url;
            return false;
        }
        
        if(this.refreshDelegate){
            this.removeListener("activate", this.refreshDelegate);
        }
        this.refreshDelegate = this._handleRefresh.createDelegate(this, [url, params, loadOnce]);
        this.on("activate", this.refreshDelegate);
        return this.el.getUpdateManager();
    },
    
    _handleRefresh : function(url, params, loadOnce){
        if(!loadOnce || !this.loaded){
            var updater = this.el.getUpdateManager();
            updater.update(url, params, this._setLoaded.createDelegate(this));
        }
    },
    
    _setLoaded : function(){
        this.loaded = true;
    }, 
    
    /**
     * Returns this panel's id
     * @return {String} 
     */
    getId : function(){
        return this.el.id;
    },
    
    /** 
     * Returns this panel's element - used by regiosn to add.
     * @return {Roo.Element} 
     */
    getEl : function(){
        return this.wrapEl || this.el;
    },
    
   
    
    adjustForComponents : function(width, height)
    {
        //Roo.log('adjustForComponents ');
        if(this.resizeEl != this.el){
            width -= this.el.getFrameWidth('lr');
            height -= this.el.getFrameWidth('tb');
        }
        if(this.toolbar){
            var te = this.toolbar.getEl();
            te.setWidth(width);
            height -= te.getHeight();
        }
        if(this.footer){
            var te = this.footer.getEl();
            te.setWidth(width);
            height -= te.getHeight();
        }
        
        
        if(this.adjustments){
            width += this.adjustments[0];
            height += this.adjustments[1];
        }
        return {"width": width, "height": height};
    },
    
    setSize : function(width, height){
        if(this.fitToFrame && !this.ignoreResize(width, height)){
            if(this.fitContainer && this.resizeEl != this.el){
                this.el.setSize(width, height);
            }
            var size = this.adjustForComponents(width, height);
            if (this.iframe) {
                this.iframeEl.setSize(width,height);
            }
            
            this.resizeEl.setSize(this.autoWidth ? "auto" : size.width, this.autoHeight ? "auto" : size.height);
            this.fireEvent('resize', this, size.width, size.height);
            
            
        }
    },
    
    /**
     * Returns this panel's title
     * @return {String} 
     */
    getTitle : function(){
        
        if (typeof(this.title) != 'object') {
            return this.title;
        }
        
        var t = '';
        for (var k in this.title) {
            if (!this.title.hasOwnProperty(k)) {
                continue;
            }
            
            if (k.indexOf('-') >= 0) {
                var s = k.split('-');
                for (var i = 0; i<s.length; i++) {
                    t += "<span class='visible-"+s[i]+"'>"+this.title[k]+"</span>";
                }
            } else {
                t += "<span class='visible-"+k+"'>"+this.title[k]+"</span>";
            }
        }
        return t;
    },
    
    /**
     * Set this panel's title
     * @param {String} title
     */
    setTitle : function(title){
        this.title = title;
        if(this.region){
            this.region.updatePanelTitle(this, title);
        }
    },
    
    /**
     * Returns true is this panel was configured to be closable
     * @return {Boolean} 
     */
    isClosable : function(){
        return this.closable;
    },
    
    beforeSlide : function(){
        this.el.clip();
        this.resizeEl.clip();
    },
    
    afterSlide : function(){
        this.el.unclip();
        this.resizeEl.unclip();
    },
    
    /**
     *   Force a content refresh from the URL specified in the {@link #setUrl} method.
     *   Will fail silently if the {@link #setUrl} method has not been called.
     *   This does not activate the panel, just updates its content.
     */
    refresh : function(){
        if(this.refreshDelegate){
           this.loaded = false;
           this.refreshDelegate();
        }
    },
    
    /**
     * Destroys this panel
     */
    destroy : function(){
        this.el.removeAllListeners();
        var tempEl = document.createElement("span");
        tempEl.appendChild(this.el.dom);
        tempEl.innerHTML = "";
        this.el.remove();
        this.el = null;
    },
    
    /**
     * form - if the content panel contains a form - this is a reference to it.
     * @type {Roo.form.Form}
     */
    form : false,
    /**
     * view - if the content panel contains a view (Roo.DatePicker / Roo.View / Roo.JsonView)
     *    This contains a reference to it.
     * @type {Roo.View}
     */
    view : false,
    
      /**
     * Adds a xtype elements to the panel - currently only supports Forms, View, JsonView.
     * <pre><code>

layout.addxtype({
       xtype : 'Form',
       items: [ .... ]
   }
);

</code></pre>
     * @param {Object} cfg Xtype definition of item to add.
     */
    
    
    getChildContainer: function () {
        return this.getEl();
    },
    
    
    onScroll : function(e)
    {
        this.fireEvent('scroll', this, e);
    }
    
    
    /*
        var  ret = new Roo.factory(cfg);
        return ret;
        
        
        // add form..
        if (cfg.xtype.match(/^Form$/)) {
            
            var el;
            //if (this.footer) {
            //    el = this.footer.container.insertSibling(false, 'before');
            //} else {
                el = this.el.createChild();
            //}

            this.form = new  Roo.form.Form(cfg);
            
            
            if ( this.form.allItems.length) {
                this.form.render(el.dom);
            }
            return this.form;
        }
        // should only have one of theses..
        if ([ 'View', 'JsonView', 'DatePicker'].indexOf(cfg.xtype) > -1) {
            // views.. should not be just added - used named prop 'view''
            
            cfg.el = this.el.appendChild(document.createElement("div"));
            // factory?
            
            var ret = new Roo.factory(cfg);
             
             ret.render && ret.render(false, ''); // render blank..
            this.view = ret;
            return ret;
        }
        return false;
    }
    \*/
});
 