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
 * @class Roo.ComponentMgr
 * Provides a common registry of all components on a page so that they can be easily accessed by component id (see {@link Roo.getCmp}).
 * @singleton
 */
Roo.ComponentMgr = function(){
    var all = new Roo.util.MixedCollection();

    return {
        /**
         * Registers a component.
         * @param {Roo.Component} c The component
         */
        register : function(c){
            all.add(c);
        },

        /**
         * Unregisters a component.
         * @param {Roo.Component} c The component
         */
        unregister : function(c){
            all.remove(c);
        },

        /**
         * Returns a component by id
         * @param {String} id The component id
         */
        get : function(id){
            return all.get(id);
        },

        /**
         * Registers a function that will be called when a specified component is added to ComponentMgr
         * @param {String} id The component id
         * @param {Funtction} fn The callback function
         * @param {Object} scope The scope of the callback
         */
        onAvailable : function(id, fn, scope){
            all.on("add", function(index, o){
                if(o.id == id){
                    fn.call(scope || o, o);
                    all.un("add", fn, scope);
                }
            });
        }
    };
}();/*
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
 * @class Roo.Component
 * @extends Roo.util.Observable
 * Base class for all major Roo components.  All subclasses of Component can automatically participate in the standard
 * Roo component lifecycle of creation, rendering and destruction.  They also have automatic support for basic hide/show
 * and enable/disable behavior.  Component allows any subclass to be lazy-rendered into any {@link Roo.Container} and
 * to be automatically registered with the {@link Roo.ComponentMgr} so that it can be referenced at any time via {@link Roo.getCmp}.
 * All visual components (widgets) that require rendering into a layout should subclass Component.
 * @constructor
 * @param {Roo.Element/String/Object} config The configuration options.  If an element is passed, it is set as the internal
 * element and its id used as the component id.  If a string is passed, it is assumed to be the id of an existing element
 * and is used as the component id.  Otherwise, it is assumed to be a standard config object and is applied to the component.
 */
Roo.Component = function(config){
    config = config || {};
    if(config.tagName || config.dom || typeof config == "string"){ // element object
        config = {el: config, id: config.id || config};
    }
    this.initialConfig = config;

    Roo.apply(this, config);
    this.addEvents({
        /**
         * @event disable
         * Fires after the component is disabled.
	     * @param {Roo.Component} this
	     */
        disable : true,
        /**
         * @event enable
         * Fires after the component is enabled.
	     * @param {Roo.Component} this
	     */
        enable : true,
        /**
         * @event beforeshow
         * Fires before the component is shown.  Return false to stop the show.
	     * @param {Roo.Component} this
	     */
        beforeshow : true,
        /**
         * @event show
         * Fires after the component is shown.
	     * @param {Roo.Component} this
	     */
        show : true,
        /**
         * @event beforehide
         * Fires before the component is hidden. Return false to stop the hide.
	     * @param {Roo.Component} this
	     */
        beforehide : true,
        /**
         * @event hide
         * Fires after the component is hidden.
	     * @param {Roo.Component} this
	     */
        hide : true,
        /**
         * @event beforerender
         * Fires before the component is rendered. Return false to stop the render.
	     * @param {Roo.Component} this
	     */
        beforerender : true,
        /**
         * @event render
         * Fires after the component is rendered.
	     * @param {Roo.Component} this
	     */
        render : true,
        /**
         * @event beforedestroy
         * Fires before the component is destroyed. Return false to stop the destroy.
	     * @param {Roo.Component} this
	     */
        beforedestroy : true,
        /**
         * @event destroy
         * Fires after the component is destroyed.
	     * @param {Roo.Component} this
	     */
        destroy : true
    });
    if(!this.id){
        this.id = "ext-comp-" + (++Roo.Component.AUTO_ID);
    }
    Roo.ComponentMgr.register(this);
    Roo.Component.superclass.constructor.call(this);
    this.initComponent();
    if(this.renderTo){ // not supported by all components yet. use at your own risk!
        this.render(this.renderTo);
        delete this.renderTo;
    }
};

// private
Roo.Component.AUTO_ID = 1000;

Roo.extend(Roo.Component, Roo.util.Observable, {
    /**
     * @property {Boolean} hidden
     * true if this component is hidden. Read-only.
     */
    hidden : false,
    /**
     * true if this component is disabled. Read-only.
     */
    disabled : false,
    /**
     * true if this component has been rendered. Read-only.
     */
    rendered : false,
    
    /** @cfg {String} disableClass
     * CSS class added to the component when it is disabled (defaults to "x-item-disabled").
     */
    disabledClass : "x-item-disabled",
	/** @cfg {Boolean} allowDomMove
	 * Whether the component can move the Dom node when rendering (defaults to true).
	 */
    allowDomMove : true,
    /** @cfg {String} hideMode
     * How this component should hidden. Supported values are
     * "visibility" (css visibility), "offsets" (negative offset position) and
     * "display" (css display) - defaults to "display".
     */
    hideMode: 'display',

    // private
    ctype : "Roo.Component",

    /** @cfg {String} actionMode 
     * which property holds the element that used for  hide() / show() / disable() / enable()
     * default is 'el' 
     */
    actionMode : "el",

    // private
    getActionEl : function(){
        return this[this.actionMode];
    },

    initComponent : Roo.emptyFn,
    /**
     * If this is a lazy rendering component, render it to its container element.
     * @param {String/HTMLElement/Element} container (optional) The element this component should be rendered into. If it is being applied to existing markup, this should be left off.
     */
    render : function(container, position){
        if(!this.rendered && this.fireEvent("beforerender", this) !== false){
            if(!container && this.el){
                this.el = Roo.get(this.el);
                container = this.el.dom.parentNode;
                this.allowDomMove = false;
            }
            this.container = Roo.get(container);
            this.rendered = true;
            if(position !== undefined){
                if(typeof position == 'number'){
                    position = this.container.dom.childNodes[position];
                }else{
                    position = Roo.getDom(position);
                }
            }
            this.onRender(this.container, position || null);
            if(this.cls){
                this.el.addClass(this.cls);
                delete this.cls;
            }
            if(this.style){
                this.el.applyStyles(this.style);
                delete this.style;
            }
            this.fireEvent("render", this);
            this.afterRender(this.container);
            if(this.hidden){
                this.hide();
            }
            if(this.disabled){
                this.disable();
            }
        }
        return this;
    },

    // private
    // default function is not really useful
    onRender : function(ct, position){
        if(this.el){
            this.el = Roo.get(this.el);
            if(this.allowDomMove !== false){
                ct.dom.insertBefore(this.el.dom, position);
            }
        }
    },

    // private
    getAutoCreate : function(){
        var cfg = typeof this.autoCreate == "object" ?
                      this.autoCreate : Roo.apply({}, this.defaultAutoCreate);
        if(this.id && !cfg.id){
            cfg.id = this.id;
        }
        return cfg;
    },

    // private
    afterRender : Roo.emptyFn,

    /**
     * Destroys this component by purging any event listeners, removing the component's element from the DOM,
     * removing the component from its {@link Roo.Container} (if applicable) and unregistering it from {@link Roo.ComponentMgr}.
     */
    destroy : function(){
        if(this.fireEvent("beforedestroy", this) !== false){
            this.purgeListeners();
            this.beforeDestroy();
            if(this.rendered){
                this.el.removeAllListeners();
                this.el.remove();
                if(this.actionMode == "container"){
                    this.container.remove();
                }
            }
            this.onDestroy();
            Roo.ComponentMgr.unregister(this);
            this.fireEvent("destroy", this);
        }
    },

	// private
    beforeDestroy : function(){

    },

	// private
	onDestroy : function(){

    },

    /**
     * Returns the underlying {@link Roo.Element}.
     * @return {Roo.Element} The element
     */
    getEl : function(){
        return this.el;
    },

    /**
     * Returns the id of this component.
     * @return {String}
     */
    getId : function(){
        return this.id;
    },

    /**
     * Try to focus this component.
     * @param {Boolean} selectText True to also select the text in this component (if applicable)
     * @return {Roo.Component} this
     */
    focus : function(selectText){
        if(this.rendered){
            this.el.focus();
            if(selectText === true){
                this.el.dom.select();
            }
        }
        return this;
    },

    // private
    blur : function(){
        if(this.rendered){
            this.el.blur();
        }
        return this;
    },

    /**
     * Disable this component.
     * @return {Roo.Component} this
     */
    disable : function(){
        if(this.rendered){
            this.onDisable();
        }
        this.disabled = true;
        this.fireEvent("disable", this);
        return this;
    },

	// private
    onDisable : function(){
        this.getActionEl().addClass(this.disabledClass);
        this.el.dom.disabled = true;
    },

    /**
     * Enable this component.
     * @return {Roo.Component} this
     */
    enable : function(){
        if(this.rendered){
            this.onEnable();
        }
        this.disabled = false;
        this.fireEvent("enable", this);
        return this;
    },

	// private
    onEnable : function(){
        this.getActionEl().removeClass(this.disabledClass);
        this.el.dom.disabled = false;
    },

    /**
     * Convenience function for setting disabled/enabled by boolean.
     * @param {Boolean} disabled
     */
    setDisabled : function(disabled){
        this[disabled ? "disable" : "enable"]();
    },

    /**
     * Show this component.
     * @return {Roo.Component} this
     */
    show: function(){
        if(this.fireEvent("beforeshow", this) !== false){
            this.hidden = false;
            if(this.rendered){
                this.onShow();
            }
            this.fireEvent("show", this);
        }
        return this;
    },

    // private
    onShow : function(){
        var ae = this.getActionEl();
        if(this.hideMode == 'visibility'){
            ae.dom.style.visibility = "visible";
        }else if(this.hideMode == 'offsets'){
            ae.removeClass('x-hidden');
        }else{
            ae.dom.style.display = "";
        }
    },

    /**
     * Hide this component.
     * @return {Roo.Component} this
     */
    hide: function(){
        if(this.fireEvent("beforehide", this) !== false){
            this.hidden = true;
            if(this.rendered){
                this.onHide();
            }
            this.fireEvent("hide", this);
        }
        return this;
    },

    // private
    onHide : function(){
        var ae = this.getActionEl();
        if(this.hideMode == 'visibility'){
            ae.dom.style.visibility = "hidden";
        }else if(this.hideMode == 'offsets'){
            ae.addClass('x-hidden');
        }else{
            ae.dom.style.display = "none";
        }
    },

    /**
     * Convenience function to hide or show this component by boolean.
     * @param {Boolean} visible True to show, false to hide
     * @return {Roo.Component} this
     */
    setVisible: function(visible){
        if(visible) {
            this.show();
        }else{
            this.hide();
        }
        return this;
    },

    /**
     * Returns true if this component is visible.
     */
    isVisible : function(){
        return this.getActionEl().isVisible();
    },

    cloneConfig : function(overrides){
        overrides = overrides || {};
        var id = overrides.id || Roo.id();
        var cfg = Roo.applyIf(overrides, this.initialConfig);
        cfg.id = id; // prevent dup id
        return new this.constructor(cfg);
    }
});/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */
 (function(){ 
/**
 * @class Roo.Layer
 * @extends Roo.Element
 * An extended {@link Roo.Element} object that supports a shadow and shim, constrain to viewport and
 * automatic maintaining of shadow/shim positions.
 * @cfg {Boolean} shim False to disable the iframe shim in browsers which need one (defaults to true)
 * @cfg {String/Boolean} shadow True to create a shadow element with default class "x-layer-shadow", or
 * you can pass a string with a CSS class name. False turns off the shadow.
 * @cfg {Object} dh DomHelper object config to create element with (defaults to {tag: "div", cls: "x-layer"}).
 * @cfg {Boolean} constrain False to disable constrain to viewport (defaults to true)
 * @cfg {String} cls CSS class to add to the element
 * @cfg {Number} zindex Starting z-index (defaults to 11000)
 * @cfg {Number} shadowOffset Number of pixels to offset the shadow (defaults to 3)
 * @constructor
 * @param {Object} config An object with config options.
 * @param {String/HTMLElement} existingEl (optional) Uses an existing DOM element. If the element is not found it creates it.
 */

Roo.Layer = function(config, existingEl){
    config = config || {};
    var dh = Roo.DomHelper;
    var cp = config.parentEl, pel = cp ? Roo.getDom(cp) : document.body;
    if(existingEl){
        this.dom = Roo.getDom(existingEl);
    }
    if(!this.dom){
        var o = config.dh || {tag: "div", cls: "x-layer"};
        this.dom = dh.append(pel, o);
    }
    if(config.cls){
        this.addClass(config.cls);
    }
    this.constrain = config.constrain !== false;
    this.visibilityMode = Roo.Element.VISIBILITY;
    if(config.id){
        this.id = this.dom.id = config.id;
    }else{
        this.id = Roo.id(this.dom);
    }
    this.zindex = config.zindex || this.getZIndex();
    this.position("absolute", this.zindex);
    if(config.shadow){
        this.shadowOffset = config.shadowOffset || 4;
        this.shadow = new Roo.Shadow({
            offset : this.shadowOffset,
            mode : config.shadow
        });
    }else{
        this.shadowOffset = 0;
    }
    this.useShim = config.shim !== false && Roo.useShims;
    this.useDisplay = config.useDisplay;
    this.hide();
};

var supr = Roo.Element.prototype;

// shims are shared among layer to keep from having 100 iframes
var shims = [];

Roo.extend(Roo.Layer, Roo.Element, {

    getZIndex : function(){
        return this.zindex || parseInt(this.getStyle("z-index"), 10) || 11000;
    },

    getShim : function(){
        if(!this.useShim){
            return null;
        }
        if(this.shim){
            return this.shim;
        }
        var shim = shims.shift();
        if(!shim){
            shim = this.createShim();
            shim.enableDisplayMode('block');
            shim.dom.style.display = 'none';
            shim.dom.style.visibility = 'visible';
        }
        var pn = this.dom.parentNode;
        if(shim.dom.parentNode != pn){
            pn.insertBefore(shim.dom, this.dom);
        }
        shim.setStyle('z-index', this.getZIndex()-2);
        this.shim = shim;
        return shim;
    },

    hideShim : function(){
        if(this.shim){
            this.shim.setDisplayed(false);
            shims.push(this.shim);
            delete this.shim;
        }
    },

    disableShadow : function(){
        if(this.shadow){
            this.shadowDisabled = true;
            this.shadow.hide();
            this.lastShadowOffset = this.shadowOffset;
            this.shadowOffset = 0;
        }
    },

    enableShadow : function(show){
        if(this.shadow){
            this.shadowDisabled = false;
            this.shadowOffset = this.lastShadowOffset;
            delete this.lastShadowOffset;
            if(show){
                this.sync(true);
            }
        }
    },

    // private
    // this code can execute repeatedly in milliseconds (i.e. during a drag) so
    // code size was sacrificed for effeciency (e.g. no getBox/setBox, no XY calls)
    sync : function(doShow){
        var sw = this.shadow;
        if(!this.updating && this.isVisible() && (sw || this.useShim)){
            var sh = this.getShim();

            var w = this.getWidth(),
                h = this.getHeight();

            var l = this.getLeft(true),
                t = this.getTop(true);

            if(sw && !this.shadowDisabled){
                if(doShow && !sw.isVisible()){
                    sw.show(this);
                }else{
                    sw.realign(l, t, w, h);
                }
                if(sh){
                    if(doShow){
                       sh.show();
                    }
                    // fit the shim behind the shadow, so it is shimmed too
                    var a = sw.adjusts, s = sh.dom.style;
                    s.left = (Math.min(l, l+a.l))+"px";
                    s.top = (Math.min(t, t+a.t))+"px";
                    s.width = (w+a.w)+"px";
                    s.height = (h+a.h)+"px";
                }
            }else if(sh){
                if(doShow){
                   sh.show();
                }
                sh.setSize(w, h);
                sh.setLeftTop(l, t);
            }
            
        }
    },

    // private
    destroy : function(){
        this.hideShim();
        if(this.shadow){
            this.shadow.hide();
        }
        this.removeAllListeners();
        var pn = this.dom.parentNode;
        if(pn){
            pn.removeChild(this.dom);
        }
        Roo.Element.uncache(this.id);
    },

    remove : function(){
        this.destroy();
    },

    // private
    beginUpdate : function(){
        this.updating = true;
    },

    // private
    endUpdate : function(){
        this.updating = false;
        this.sync(true);
    },

    // private
    hideUnders : function(negOffset){
        if(this.shadow){
            this.shadow.hide();
        }
        this.hideShim();
    },

    // private
    constrainXY : function(){
        if(this.constrain){
            var vw = Roo.lib.Dom.getViewWidth(),
                vh = Roo.lib.Dom.getViewHeight();
            var s = Roo.get(document).getScroll();

            var xy = this.getXY();
            var x = xy[0], y = xy[1];   
            var w = this.dom.offsetWidth+this.shadowOffset, h = this.dom.offsetHeight+this.shadowOffset;
            // only move it if it needs it
            var moved = false;
            // first validate right/bottom
            if((x + w) > vw+s.left){
                x = vw - w - this.shadowOffset;
                moved = true;
            }
            if((y + h) > vh+s.top){
                y = vh - h - this.shadowOffset;
                moved = true;
            }
            // then make sure top/left isn't negative
            if(x < s.left){
                x = s.left;
                moved = true;
            }
            if(y < s.top){
                y = s.top;
                moved = true;
            }
            if(moved){
                if(this.avoidY){
                    var ay = this.avoidY;
                    if(y <= ay && (y+h) >= ay){
                        y = ay-h-5;   
                    }
                }
                xy = [x, y];
                this.storeXY(xy);
                supr.setXY.call(this, xy);
                this.sync();
            }
        }
    },

    isVisible : function(){
        return this.visible;    
    },

    // private
    showAction : function(){
        this.visible = true; // track visibility to prevent getStyle calls
        if(this.useDisplay === true){
            this.setDisplayed("");
        }else if(this.lastXY){
            supr.setXY.call(this, this.lastXY);
        }else if(this.lastLT){
            supr.setLeftTop.call(this, this.lastLT[0], this.lastLT[1]);
        }
    },

    // private
    hideAction : function(){
        this.visible = false;
        if(this.useDisplay === true){
            this.setDisplayed(false);
        }else{
            this.setLeftTop(-10000,-10000);
        }
    },

    // overridden Element method
    setVisible : function(v, a, d, c, e){
        if(v){
            this.showAction();
        }
        if(a && v){
            var cb = function(){
                this.sync(true);
                if(c){
                    c();
                }
            }.createDelegate(this);
            supr.setVisible.call(this, true, true, d, cb, e);
        }else{
            if(!v){
                this.hideUnders(true);
            }
            var cb = c;
            if(a){
                cb = function(){
                    this.hideAction();
                    if(c){
                        c();
                    }
                }.createDelegate(this);
            }
            supr.setVisible.call(this, v, a, d, cb, e);
            if(v){
                this.sync(true);
            }else if(!a){
                this.hideAction();
            }
        }
    },

    storeXY : function(xy){
        delete this.lastLT;
        this.lastXY = xy;
    },

    storeLeftTop : function(left, top){
        delete this.lastXY;
        this.lastLT = [left, top];
    },

    // private
    beforeFx : function(){
        this.beforeAction();
        return Roo.Layer.superclass.beforeFx.apply(this, arguments);
    },

    // private
    afterFx : function(){
        Roo.Layer.superclass.afterFx.apply(this, arguments);
        this.sync(this.isVisible());
    },

    // private
    beforeAction : function(){
        if(!this.updating && this.shadow){
            this.shadow.hide();
        }
    },

    // overridden Element method
    setLeft : function(left){
        this.storeLeftTop(left, this.getTop(true));
        supr.setLeft.apply(this, arguments);
        this.sync();
    },

    setTop : function(top){
        this.storeLeftTop(this.getLeft(true), top);
        supr.setTop.apply(this, arguments);
        this.sync();
    },

    setLeftTop : function(left, top){
        this.storeLeftTop(left, top);
        supr.setLeftTop.apply(this, arguments);
        this.sync();
    },

    setXY : function(xy, a, d, c, e){
        this.fixDisplay();
        this.beforeAction();
        this.storeXY(xy);
        var cb = this.createCB(c);
        supr.setXY.call(this, xy, a, d, cb, e);
        if(!a){
            cb();
        }
    },

    // private
    createCB : function(c){
        var el = this;
        return function(){
            el.constrainXY();
            el.sync(true);
            if(c){
                c();
            }
        };
    },

    // overridden Element method
    setX : function(x, a, d, c, e){
        this.setXY([x, this.getY()], a, d, c, e);
    },

    // overridden Element method
    setY : function(y, a, d, c, e){
        this.setXY([this.getX(), y], a, d, c, e);
    },

    // overridden Element method
    setSize : function(w, h, a, d, c, e){
        this.beforeAction();
        var cb = this.createCB(c);
        supr.setSize.call(this, w, h, a, d, cb, e);
        if(!a){
            cb();
        }
    },

    // overridden Element method
    setWidth : function(w, a, d, c, e){
        this.beforeAction();
        var cb = this.createCB(c);
        supr.setWidth.call(this, w, a, d, cb, e);
        if(!a){
            cb();
        }
    },

    // overridden Element method
    setHeight : function(h, a, d, c, e){
        this.beforeAction();
        var cb = this.createCB(c);
        supr.setHeight.call(this, h, a, d, cb, e);
        if(!a){
            cb();
        }
    },

    // overridden Element method
    setBounds : function(x, y, w, h, a, d, c, e){
        this.beforeAction();
        var cb = this.createCB(c);
        if(!a){
            this.storeXY([x, y]);
            supr.setXY.call(this, [x, y]);
            supr.setSize.call(this, w, h, a, d, cb, e);
            cb();
        }else{
            supr.setBounds.call(this, x, y, w, h, a, d, cb, e);
        }
        return this;
    },
    
    /**
     * Sets the z-index of this layer and adjusts any shadow and shim z-indexes. The layer z-index is automatically
     * incremented by two more than the value passed in so that it always shows above any shadow or shim (the shadow
     * element, if any, will be assigned z-index + 1, and the shim element, if any, will be assigned the unmodified z-index).
     * @param {Number} zindex The new z-index to set
     * @return {this} The Layer
     */
    setZIndex : function(zindex){
        this.zindex = zindex;
        this.setStyle("z-index", zindex + 2);
        if(this.shadow){
            this.shadow.setZIndex(zindex + 1);
        }
        if(this.shim){
            this.shim.setStyle("z-index", zindex);
        }
    }
});
})();/*
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
 * @class Roo.Shadow
 * Simple class that can provide a shadow effect for any element.  Note that the element MUST be absolutely positioned,
 * and the shadow does not provide any shimming.  This should be used only in simple cases -- for more advanced
 * functionality that can also provide the same shadow effect, see the {@link Roo.Layer} class.
 * @constructor
 * Create a new Shadow
 * @param {Object} config The config object
 */
Roo.Shadow = function(config){
    Roo.apply(this, config);
    if(typeof this.mode != "string"){
        this.mode = this.defaultMode;
    }
    var o = this.offset, a = {h: 0};
    var rad = Math.floor(this.offset/2);
    switch(this.mode.toLowerCase()){ // all this hideous nonsense calculates the various offsets for shadows
        case "drop":
            a.w = 0;
            a.l = a.t = o;
            a.t -= 1;
            if(Roo.isIE){
                a.l -= this.offset + rad;
                a.t -= this.offset + rad;
                a.w -= rad;
                a.h -= rad;
                a.t += 1;
            }
        break;
        case "sides":
            a.w = (o*2);
            a.l = -o;
            a.t = o-1;
            if(Roo.isIE){
                a.l -= (this.offset - rad);
                a.t -= this.offset + rad;
                a.l += 1;
                a.w -= (this.offset - rad)*2;
                a.w -= rad + 1;
                a.h -= 1;
            }
        break;
        case "frame":
            a.w = a.h = (o*2);
            a.l = a.t = -o;
            a.t += 1;
            a.h -= 2;
            if(Roo.isIE){
                a.l -= (this.offset - rad);
                a.t -= (this.offset - rad);
                a.l += 1;
                a.w -= (this.offset + rad + 1);
                a.h -= (this.offset + rad);
                a.h += 1;
            }
        break;
    };

    this.adjusts = a;
};

Roo.Shadow.prototype = {
    /**
     * @cfg {String} mode
     * The shadow display mode.  Supports the following options:<br />
     * sides: Shadow displays on both sides and bottom only<br />
     * frame: Shadow displays equally on all four sides<br />
     * drop: Traditional bottom-right drop shadow (default)
     */
    /**
     * @cfg {String} offset
     * The number of pixels to offset the shadow from the element (defaults to 4)
     */
    offset: 4,

    // private
    defaultMode: "drop",

    /**
     * Displays the shadow under the target element
     * @param {String/HTMLElement/Element} targetEl The id or element under which the shadow should display
     */
    show : function(target){
        target = Roo.get(target);
        if(!this.el){
            this.el = Roo.Shadow.Pool.pull();
            if(this.el.dom.nextSibling != target.dom){
                this.el.insertBefore(target);
            }
        }
        this.el.setStyle("z-index", this.zIndex || parseInt(target.getStyle("z-index"), 10)-1);
        if(Roo.isIE){
            this.el.dom.style.filter="progid:DXImageTransform.Microsoft.alpha(opacity=50) progid:DXImageTransform.Microsoft.Blur(pixelradius="+(this.offset)+")";
        }
        this.realign(
            target.getLeft(true),
            target.getTop(true),
            target.getWidth(),
            target.getHeight()
        );
        this.el.dom.style.display = "block";
    },

    /**
     * Returns true if the shadow is visible, else false
     */
    isVisible : function(){
        return this.el ? true : false;  
    },

    /**
     * Direct alignment when values are already available. Show must be called at least once before
     * calling this method to ensure it is initialized.
     * @param {Number} left The target element left position
     * @param {Number} top The target element top position
     * @param {Number} width The target element width
     * @param {Number} height The target element height
     */
    realign : function(l, t, w, h){
        if(!this.el){
            return;
        }
        var a = this.adjusts, d = this.el.dom, s = d.style;
        var iea = 0;
        s.left = (l+a.l)+"px";
        s.top = (t+a.t)+"px";
        var sw = (w+a.w), sh = (h+a.h), sws = sw +"px", shs = sh + "px";
        if(s.width != sws || s.height != shs){
            s.width = sws;
            s.height = shs;
            if(!Roo.isIE){
                var cn = d.childNodes;
                var sww = Math.max(0, (sw-12))+"px";
                cn[0].childNodes[1].style.width = sww;
                cn[1].childNodes[1].style.width = sww;
                cn[2].childNodes[1].style.width = sww;
                cn[1].style.height = Math.max(0, (sh-12))+"px";
            }
        }
    },

    /**
     * Hides this shadow
     */
    hide : function(){
        if(this.el){
            this.el.dom.style.display = "none";
            Roo.Shadow.Pool.push(this.el);
            delete this.el;
        }
    },

    /**
     * Adjust the z-index of this shadow
     * @param {Number} zindex The new z-index
     */
    setZIndex : function(z){
        this.zIndex = z;
        if(this.el){
            this.el.setStyle("z-index", z);
        }
    }
};

// Private utility class that manages the internal Shadow cache
Roo.Shadow.Pool = function(){
    var p = [];
    var markup = Roo.isIE ?
                 '<div class="x-ie-shadow"></div>' :
                 '<div class="x-shadow"><div class="xst"><div class="xstl"></div><div class="xstc"></div><div class="xstr"></div></div><div class="xsc"><div class="xsml"></div><div class="xsmc"></div><div class="xsmr"></div></div><div class="xsb"><div class="xsbl"></div><div class="xsbc"></div><div class="xsbr"></div></div></div>';
    return {
        pull : function(){
            var sh = p.shift();
            if(!sh){
                sh = Roo.get(Roo.DomHelper.insertHtml("beforeBegin", document.body.firstChild, markup));
                sh.autoBoxAdjust = false;
            }
            return sh;
        },

        push : function(sh){
            p.push(sh);
        }
    };
}();/*
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
 * @class Roo.BoxComponent
 * @extends Roo.Component
 * Base class for any visual {@link Roo.Component} that uses a box container.  BoxComponent provides automatic box
 * model adjustments for sizing and positioning and will work correctly withnin the Component rendering model.  All
 * container classes should subclass BoxComponent so that they will work consistently when nested within other Ext
 * layout containers.
 * @constructor
 * @param {Roo.Element/String/Object} config The configuration options.
 */
Roo.BoxComponent = function(config){
    Roo.Component.call(this, config);
    this.addEvents({
        /**
         * @event resize
         * Fires after the component is resized.
	     * @param {Roo.Component} this
	     * @param {Number} adjWidth The box-adjusted width that was set
	     * @param {Number} adjHeight The box-adjusted height that was set
	     * @param {Number} rawWidth The width that was originally specified
	     * @param {Number} rawHeight The height that was originally specified
	     */
        resize : true,
        /**
         * @event move
         * Fires after the component is moved.
	     * @param {Roo.Component} this
	     * @param {Number} x The new x position
	     * @param {Number} y The new y position
	     */
        move : true
    });
};

Roo.extend(Roo.BoxComponent, Roo.Component, {
    // private, set in afterRender to signify that the component has been rendered
    boxReady : false,
    // private, used to defer height settings to subclasses
    deferHeight: false,
    /** @cfg {Number} width
     * width (optional) size of component
     */
     /** @cfg {Number} height
     * height (optional) size of component
     */
     
    /**
     * Sets the width and height of the component.  This method fires the resize event.  This method can accept
     * either width and height as separate numeric arguments, or you can pass a size object like {width:10, height:20}.
     * @param {Number/Object} width The new width to set, or a size object in the format {width, height}
     * @param {Number} height The new height to set (not required if a size object is passed as the first arg)
     * @return {Roo.BoxComponent} this
     */
    setSize : function(w, h){
        // support for standard size objects
        if(typeof w == 'object'){
            h = w.height;
            w = w.width;
        }
        // not rendered
        if(!this.boxReady){
            this.width = w;
            this.height = h;
            return this;
        }

        // prevent recalcs when not needed
        if(this.lastSize && this.lastSize.width == w && this.lastSize.height == h){
            return this;
        }
        this.lastSize = {width: w, height: h};

        var adj = this.adjustSize(w, h);
        var aw = adj.width, ah = adj.height;
        if(aw !== undefined || ah !== undefined){ // this code is nasty but performs better with floaters
            var rz = this.getResizeEl();
            if(!this.deferHeight && aw !== undefined && ah !== undefined){
                rz.setSize(aw, ah);
            }else if(!this.deferHeight && ah !== undefined){
                rz.setHeight(ah);
            }else if(aw !== undefined){
                rz.setWidth(aw);
            }
            this.onResize(aw, ah, w, h);
            this.fireEvent('resize', this, aw, ah, w, h);
        }
        return this;
    },

    /**
     * Gets the current size of the component's underlying element.
     * @return {Object} An object containing the element's size {width: (element width), height: (element height)}
     */
    getSize : function(){
        return this.el.getSize();
    },

    /**
     * Gets the current XY position of the component's underlying element.
     * @param {Boolean} local (optional) If true the element's left and top are returned instead of page XY (defaults to false)
     * @return {Array} The XY position of the element (e.g., [100, 200])
     */
    getPosition : function(local){
        if(local === true){
            return [this.el.getLeft(true), this.el.getTop(true)];
        }
        return this.xy || this.el.getXY();
    },

    /**
     * Gets the current box measurements of the component's underlying element.
     * @param {Boolean} local (optional) If true the element's left and top are returned instead of page XY (defaults to false)
     * @returns {Object} box An object in the format {x, y, width, height}
     */
    getBox : function(local){
        var s = this.el.getSize();
        if(local){
            s.x = this.el.getLeft(true);
            s.y = this.el.getTop(true);
        }else{
            var xy = this.xy || this.el.getXY();
            s.x = xy[0];
            s.y = xy[1];
        }
        return s;
    },

    /**
     * Sets the current box measurements of the component's underlying element.
     * @param {Object} box An object in the format {x, y, width, height}
     * @returns {Roo.BoxComponent} this
     */
    updateBox : function(box){
        this.setSize(box.width, box.height);
        this.setPagePosition(box.x, box.y);
        return this;
    },

    // protected
    getResizeEl : function(){
        return this.resizeEl || this.el;
    },

    // protected
    getPositionEl : function(){
        return this.positionEl || this.el;
    },

    /**
     * Sets the left and top of the component.  To set the page XY position instead, use {@link #setPagePosition}.
     * This method fires the move event.
     * @param {Number} left The new left
     * @param {Number} top The new top
     * @returns {Roo.BoxComponent} this
     */
    setPosition : function(x, y){
        this.x = x;
        this.y = y;
        if(!this.boxReady){
            return this;
        }
        var adj = this.adjustPosition(x, y);
        var ax = adj.x, ay = adj.y;

        var el = this.getPositionEl();
        if(ax !== undefined || ay !== undefined){
            if(ax !== undefined && ay !== undefined){
                el.setLeftTop(ax, ay);
            }else if(ax !== undefined){
                el.setLeft(ax);
            }else if(ay !== undefined){
                el.setTop(ay);
            }
            this.onPosition(ax, ay);
            this.fireEvent('move', this, ax, ay);
        }
        return this;
    },

    /**
     * Sets the page XY position of the component.  To set the left and top instead, use {@link #setPosition}.
     * This method fires the move event.
     * @param {Number} x The new x position
     * @param {Number} y The new y position
     * @returns {Roo.BoxComponent} this
     */
    setPagePosition : function(x, y){
        this.pageX = x;
        this.pageY = y;
        if(!this.boxReady){
            return;
        }
        if(x === undefined || y === undefined){ // cannot translate undefined points
            return;
        }
        var p = this.el.translatePoints(x, y);
        this.setPosition(p.left, p.top);
        return this;
    },

    // private
    onRender : function(ct, position){
        Roo.BoxComponent.superclass.onRender.call(this, ct, position);
        if(this.resizeEl){
            this.resizeEl = Roo.get(this.resizeEl);
        }
        if(this.positionEl){
            this.positionEl = Roo.get(this.positionEl);
        }
    },

    // private
    afterRender : function(){
        Roo.BoxComponent.superclass.afterRender.call(this);
        this.boxReady = true;
        this.setSize(this.width, this.height);
        if(this.x || this.y){
            this.setPosition(this.x, this.y);
        }
        if(this.pageX || this.pageY){
            this.setPagePosition(this.pageX, this.pageY);
        }
    },

    /**
     * Force the component's size to recalculate based on the underlying element's current height and width.
     * @returns {Roo.BoxComponent} this
     */
    syncSize : function(){
        delete this.lastSize;
        this.setSize(this.el.getWidth(), this.el.getHeight());
        return this;
    },

    /**
     * Called after the component is resized, this method is empty by default but can be implemented by any
     * subclass that needs to perform custom logic after a resize occurs.
     * @param {Number} adjWidth The box-adjusted width that was set
     * @param {Number} adjHeight The box-adjusted height that was set
     * @param {Number} rawWidth The width that was originally specified
     * @param {Number} rawHeight The height that was originally specified
     */
    onResize : function(adjWidth, adjHeight, rawWidth, rawHeight){

    },

    /**
     * Called after the component is moved, this method is empty by default but can be implemented by any
     * subclass that needs to perform custom logic after a move occurs.
     * @param {Number} x The new x position
     * @param {Number} y The new y position
     */
    onPosition : function(x, y){

    },

    // private
    adjustSize : function(w, h){
        if(this.autoWidth){
            w = 'auto';
        }
        if(this.autoHeight){
            h = 'auto';
        }
        return {width : w, height: h};
    },

    // private
    adjustPosition : function(x, y){
        return {x : x, y: y};
    }
});/*
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
 * @class Roo.SplitBar
 * @extends Roo.util.Observable
 * Creates draggable splitter bar functionality from two elements (element to be dragged and element to be resized).
 * <br><br>
 * Usage:
 * <pre><code>
var split = new Roo.SplitBar("elementToDrag", "elementToSize",
                   Roo.SplitBar.HORIZONTAL, Roo.SplitBar.LEFT);
split.setAdapter(new Roo.SplitBar.AbsoluteLayoutAdapter("container"));
split.minSize = 100;
split.maxSize = 600;
split.animate = true;
split.on('moved', splitterMoved);
</code></pre>
 * @constructor
 * Create a new SplitBar
 * @param {String/HTMLElement/Roo.Element} dragElement The element to be dragged and act as the SplitBar. 
 * @param {String/HTMLElement/Roo.Element} resizingElement The element to be resized based on where the SplitBar element is dragged 
 * @param {Number} orientation (optional) Either Roo.SplitBar.HORIZONTAL or Roo.SplitBar.VERTICAL. (Defaults to HORIZONTAL)
 * @param {Number} placement (optional) Either Roo.SplitBar.LEFT or Roo.SplitBar.RIGHT for horizontal or  
                        Roo.SplitBar.TOP or Roo.SplitBar.BOTTOM for vertical. (By default, this is determined automatically by the initial
                        position of the SplitBar).
 */
Roo.SplitBar = function(dragElement, resizingElement, orientation, placement, existingProxy){
    
    /** @private */
    this.el = Roo.get(dragElement, true);
    this.el.dom.unselectable = "on";
    /** @private */
    this.resizingEl = Roo.get(resizingElement, true);

    /**
     * @private
     * The orientation of the split. Either Roo.SplitBar.HORIZONTAL or Roo.SplitBar.VERTICAL. (Defaults to HORIZONTAL)
     * Note: If this is changed after creating the SplitBar, the placement property must be manually updated
     * @type Number
     */
    this.orientation = orientation || Roo.SplitBar.HORIZONTAL;
    
    /**
     * The minimum size of the resizing element. (Defaults to 0)
     * @type Number
     */
    this.minSize = 0;
    
    /**
     * The maximum size of the resizing element. (Defaults to 2000)
     * @type Number
     */
    this.maxSize = 2000;
    
    /**
     * Whether to animate the transition to the new size
     * @type Boolean
     */
    this.animate = false;
    
    /**
     * Whether to create a transparent shim that overlays the page when dragging, enables dragging across iframes.
     * @type Boolean
     */
    this.useShim = false;
    
    /** @private */
    this.shim = null;
    
    if(!existingProxy){
        /** @private */
        this.proxy = Roo.SplitBar.createProxy(this.orientation);
    }else{
        this.proxy = Roo.get(existingProxy).dom;
    }
    /** @private */
    this.dd = new Roo.dd.DDProxy(this.el.dom.id, "XSplitBars", {dragElId : this.proxy.id});
    
    /** @private */
    this.dd.b4StartDrag = this.onStartProxyDrag.createDelegate(this);
    
    /** @private */
    this.dd.endDrag = this.onEndProxyDrag.createDelegate(this);
    
    /** @private */
    this.dragSpecs = {};
    
    /**
     * @private The adapter to use to positon and resize elements
     */
    this.adapter = new Roo.SplitBar.BasicLayoutAdapter();
    this.adapter.init(this);
    
    if(this.orientation == Roo.SplitBar.HORIZONTAL){
        /** @private */
        this.placement = placement || (this.el.getX() > this.resizingEl.getX() ? Roo.SplitBar.LEFT : Roo.SplitBar.RIGHT);
        this.el.addClass("x-splitbar-h");
    }else{
        /** @private */
        this.placement = placement || (this.el.getY() > this.resizingEl.getY() ? Roo.SplitBar.TOP : Roo.SplitBar.BOTTOM);
        this.el.addClass("x-splitbar-v");
    }
    
    this.addEvents({
        /**
         * @event resize
         * Fires when the splitter is moved (alias for {@link #event-moved})
         * @param {Roo.SplitBar} this
         * @param {Number} newSize the new width or height
         */
        "resize" : true,
        /**
         * @event moved
         * Fires when the splitter is moved
         * @param {Roo.SplitBar} this
         * @param {Number} newSize the new width or height
         */
        "moved" : true,
        /**
         * @event beforeresize
         * Fires before the splitter is dragged
         * @param {Roo.SplitBar} this
         */
        "beforeresize" : true,

        "beforeapply" : true
    });

    Roo.util.Observable.call(this);
};

Roo.extend(Roo.SplitBar, Roo.util.Observable, {
    onStartProxyDrag : function(x, y){
        this.fireEvent("beforeresize", this);
        if(!this.overlay){
            var o = Roo.DomHelper.insertFirst(document.body,  {cls: "x-drag-overlay", html: "&#160;"}, true);
            o.unselectable();
            o.enableDisplayMode("block");
            // all splitbars share the same overlay
            Roo.SplitBar.prototype.overlay = o;
        }
        this.overlay.setSize(Roo.lib.Dom.getViewWidth(true), Roo.lib.Dom.getViewHeight(true));
        this.overlay.show();
        Roo.get(this.proxy).setDisplayed("block");
        var size = this.adapter.getElementSize(this);
        this.activeMinSize = this.getMinimumSize();;
        this.activeMaxSize = this.getMaximumSize();;
        var c1 = size - this.activeMinSize;
        var c2 = Math.max(this.activeMaxSize - size, 0);
        if(this.orientation == Roo.SplitBar.HORIZONTAL){
            this.dd.resetConstraints();
            this.dd.setXConstraint(
                this.placement == Roo.SplitBar.LEFT ? c1 : c2, 
                this.placement == Roo.SplitBar.LEFT ? c2 : c1
            );
            this.dd.setYConstraint(0, 0);
        }else{
            this.dd.resetConstraints();
            this.dd.setXConstraint(0, 0);
            this.dd.setYConstraint(
                this.placement == Roo.SplitBar.TOP ? c1 : c2, 
                this.placement == Roo.SplitBar.TOP ? c2 : c1
            );
         }
        this.dragSpecs.startSize = size;
        this.dragSpecs.startPoint = [x, y];
        Roo.dd.DDProxy.prototype.b4StartDrag.call(this.dd, x, y);
    },
    
    /** 
     * @private Called after the drag operation by the DDProxy
     */
    onEndProxyDrag : function(e){
        Roo.get(this.proxy).setDisplayed(false);
        var endPoint = Roo.lib.Event.getXY(e);
        if(this.overlay){
            this.overlay.hide();
        }
        var newSize;
        if(this.orientation == Roo.SplitBar.HORIZONTAL){
            newSize = this.dragSpecs.startSize + 
                (this.placement == Roo.SplitBar.LEFT ?
                    endPoint[0] - this.dragSpecs.startPoint[0] :
                    this.dragSpecs.startPoint[0] - endPoint[0]
                );
        }else{
            newSize = this.dragSpecs.startSize + 
                (this.placement == Roo.SplitBar.TOP ?
                    endPoint[1] - this.dragSpecs.startPoint[1] :
                    this.dragSpecs.startPoint[1] - endPoint[1]
                );
        }
        newSize = Math.min(Math.max(newSize, this.activeMinSize), this.activeMaxSize);
        if(newSize != this.dragSpecs.startSize){
            if(this.fireEvent('beforeapply', this, newSize) !== false){
                this.adapter.setElementSize(this, newSize);
                this.fireEvent("moved", this, newSize);
                this.fireEvent("resize", this, newSize);
            }
        }
    },
    
    /**
     * Get the adapter this SplitBar uses
     * @return The adapter object
     */
    getAdapter : function(){
        return this.adapter;
    },
    
    /**
     * Set the adapter this SplitBar uses
     * @param {Object} adapter A SplitBar adapter object
     */
    setAdapter : function(adapter){
        this.adapter = adapter;
        this.adapter.init(this);
    },
    
    /**
     * Gets the minimum size for the resizing element
     * @return {Number} The minimum size
     */
    getMinimumSize : function(){
        return this.minSize;
    },
    
    /**
     * Sets the minimum size for the resizing element
     * @param {Number} minSize The minimum size
     */
    setMinimumSize : function(minSize){
        this.minSize = minSize;
    },
    
    /**
     * Gets the maximum size for the resizing element
     * @return {Number} The maximum size
     */
    getMaximumSize : function(){
        return this.maxSize;
    },
    
    /**
     * Sets the maximum size for the resizing element
     * @param {Number} maxSize The maximum size
     */
    setMaximumSize : function(maxSize){
        this.maxSize = maxSize;
    },
    
    /**
     * Sets the initialize size for the resizing element
     * @param {Number} size The initial size
     */
    setCurrentSize : function(size){
        var oldAnimate = this.animate;
        this.animate = false;
        this.adapter.setElementSize(this, size);
        this.animate = oldAnimate;
    },
    
    /**
     * Destroy this splitbar. 
     * @param {Boolean} removeEl True to remove the element
     */
    destroy : function(removeEl){
        if(this.shim){
            this.shim.remove();
        }
        this.dd.unreg();
        this.proxy.parentNode.removeChild(this.proxy);
        if(removeEl){
            this.el.remove();
        }
    }
});

/**
 * @private static Create our own proxy element element. So it will be the same same size on all browsers, we won't use borders. Instead we use a background color.
 */
Roo.SplitBar.createProxy = function(dir){
    var proxy = new Roo.Element(document.createElement("div"));
    proxy.unselectable();
    var cls = 'x-splitbar-proxy';
    proxy.addClass(cls + ' ' + (dir == Roo.SplitBar.HORIZONTAL ? cls +'-h' : cls + '-v'));
    document.body.appendChild(proxy.dom);
    return proxy.dom;
};

/** 
 * @class Roo.SplitBar.BasicLayoutAdapter
 * Default Adapter. It assumes the splitter and resizing element are not positioned
 * elements and only gets/sets the width of the element. Generally used for table based layouts.
 */
Roo.SplitBar.BasicLayoutAdapter = function(){
};

Roo.SplitBar.BasicLayoutAdapter.prototype = {
    // do nothing for now
    init : function(s){
    
    },
    /**
     * Called before drag operations to get the current size of the resizing element. 
     * @param {Roo.SplitBar} s The SplitBar using this adapter
     */
     getElementSize : function(s){
        if(s.orientation == Roo.SplitBar.HORIZONTAL){
            return s.resizingEl.getWidth();
        }else{
            return s.resizingEl.getHeight();
        }
    },
    
    /**
     * Called after drag operations to set the size of the resizing element.
     * @param {Roo.SplitBar} s The SplitBar using this adapter
     * @param {Number} newSize The new size to set
     * @param {Function} onComplete A function to be invoked when resizing is complete
     */
    setElementSize : function(s, newSize, onComplete){
        if(s.orientation == Roo.SplitBar.HORIZONTAL){
            if(!s.animate){
                s.resizingEl.setWidth(newSize);
                if(onComplete){
                    onComplete(s, newSize);
                }
            }else{
                s.resizingEl.setWidth(newSize, true, .1, onComplete, 'easeOut');
            }
        }else{
            
            if(!s.animate){
                s.resizingEl.setHeight(newSize);
                if(onComplete){
                    onComplete(s, newSize);
                }
            }else{
                s.resizingEl.setHeight(newSize, true, .1, onComplete, 'easeOut');
            }
        }
    }
};

/** 
 *@class Roo.SplitBar.AbsoluteLayoutAdapter
 * @extends Roo.SplitBar.BasicLayoutAdapter
 * Adapter that  moves the splitter element to align with the resized sizing element. 
 * Used with an absolute positioned SplitBar.
 * @param {String/HTMLElement/Roo.Element} container The container that wraps around the absolute positioned content. If it's
 * document.body, make sure you assign an id to the body element.
 */
Roo.SplitBar.AbsoluteLayoutAdapter = function(container){
    this.basic = new Roo.SplitBar.BasicLayoutAdapter();
    this.container = Roo.get(container);
};

Roo.SplitBar.AbsoluteLayoutAdapter.prototype = {
    init : function(s){
        this.basic.init(s);
    },
    
    getElementSize : function(s){
        return this.basic.getElementSize(s);
    },
    
    setElementSize : function(s, newSize, onComplete){
        this.basic.setElementSize(s, newSize, this.moveSplitter.createDelegate(this, [s]));
    },
    
    moveSplitter : function(s){
        var yes = Roo.SplitBar;
        switch(s.placement){
            case yes.LEFT:
                s.el.setX(s.resizingEl.getRight());
                break;
            case yes.RIGHT:
                s.el.setStyle("right", (this.container.getWidth() - s.resizingEl.getLeft()) + "px");
                break;
            case yes.TOP:
                s.el.setY(s.resizingEl.getBottom());
                break;
            case yes.BOTTOM:
                s.el.setY(s.resizingEl.getTop() - s.el.getHeight());
                break;
        }
    }
};

/**
 * Orientation constant - Create a vertical SplitBar
 * @static
 * @type Number
 */
Roo.SplitBar.VERTICAL = 1;

/**
 * Orientation constant - Create a horizontal SplitBar
 * @static
 * @type Number
 */
Roo.SplitBar.HORIZONTAL = 2;

/**
 * Placement constant - The resizing element is to the left of the splitter element
 * @static
 * @type Number
 */
Roo.SplitBar.LEFT = 1;

/**
 * Placement constant - The resizing element is to the right of the splitter element
 * @static
 * @type Number
 */
Roo.SplitBar.RIGHT = 2;

/**
 * Placement constant - The resizing element is positioned above the splitter element
 * @static
 * @type Number
 */
Roo.SplitBar.TOP = 3;

/**
 * Placement constant - The resizing element is positioned under splitter element
 * @static
 * @type Number
 */
Roo.SplitBar.BOTTOM = 4;
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
 * @class Roo.View
 * @extends Roo.util.Observable
 * Create a "View" for an element based on a data model or UpdateManager and the supplied DomHelper template. 
 * This class also supports single and multi selection modes. <br>
 * Create a data model bound view:
 <pre><code>
 var store = new Roo.data.Store(...);

 var view = new Roo.View("my-element",
 '&lt;div id="{0}"&gt;{2} - {1}&lt;/div&gt;', // auto create template
 {
 singleSelect: true,
 selectedClass: "ydataview-selected",
 store: store
 });

 // listen for node click?
 view.on("click", function(vw, index, node, e){
 alert('Node "' + node.id + '" at index: ' + index + " was clicked.");
 });

 // load XML data
 dataModel.load("foobar.xml");
 </code></pre>
 For an example of creating a JSON/UpdateManager view, see {@link Roo.JsonView}.
 * <br><br>
 * <b>Note: The root of your template must be a single node. Table/row implementations may work but are not supported due to
 * IE"s limited insertion support with tables and Opera"s faulty event bubbling.</b>
 * @constructor
 * Create a new View
 * @param {String/HTMLElement/Element} container The container element where the view is to be rendered.
 * @param {String/DomHelper.Template} tpl The rendering template or a string to create a template with
 * @param {Object} config The config object
 */
Roo.View = function(container, tpl, config){
    this.el = Roo.get(container);
    if(typeof tpl == "string"){
        tpl = new Roo.Template(tpl);
    }
    tpl.compile();
    /**
     * The template used by this View
     * @type {Roo.DomHelper.Template}
     */
    this.tpl = tpl;

    Roo.apply(this, config);

    /** @private */
    this.addEvents({
    /**
     * @event beforeclick
     * Fires before a click is processed. Returns false to cancel the default action.
     * @param {Roo.View} this
     * @param {Number} index The index of the target node
     * @param {HTMLElement} node The target node
     * @param {Roo.EventObject} e The raw event object
     */
        "beforeclick" : true,
    /**
     * @event click
     * Fires when a template node is clicked.
     * @param {Roo.View} this
     * @param {Number} index The index of the target node
     * @param {HTMLElement} node The target node
     * @param {Roo.EventObject} e The raw event object
     */
        "click" : true,
    /**
     * @event dblclick
     * Fires when a template node is double clicked.
     * @param {Roo.View} this
     * @param {Number} index The index of the target node
     * @param {HTMLElement} node The target node
     * @param {Roo.EventObject} e The raw event object
     */
        "dblclick" : true,
    /**
     * @event contextmenu
     * Fires when a template node is right clicked.
     * @param {Roo.View} this
     * @param {Number} index The index of the target node
     * @param {HTMLElement} node The target node
     * @param {Roo.EventObject} e The raw event object
     */
        "contextmenu" : true,
    /**
     * @event selectionchange
     * Fires when the selected nodes change.
     * @param {Roo.View} this
     * @param {Array} selections Array of the selected nodes
     */
        "selectionchange" : true,

    /**
     * @event beforeselect
     * Fires before a selection is made. If any handlers return false, the selection is cancelled.
     * @param {Roo.View} this
     * @param {HTMLElement} node The node to be selected
     * @param {Array} selections Array of currently selected nodes
     */
        "beforeselect" : true
    });

    this.el.on({
        "click": this.onClick,
        "dblclick": this.onDblClick,
        "contextmenu": this.onContextMenu,
        scope:this
    });

    this.selections = [];
    this.nodes = [];
    this.cmp = new Roo.CompositeElementLite([]);
    if(this.store){
        this.store = Roo.factory(this.store, Roo.data);
        this.setStore(this.store, true);
    }
    Roo.View.superclass.constructor.call(this);
};

Roo.extend(Roo.View, Roo.util.Observable, {
    /**
     * The css class to add to selected nodes
     * @type {Roo.DomHelper.Template}
     */
    selectedClass : "x-view-selected",
    
    emptyText : "",
    /**
     * Returns the element this view is bound to.
     * @return {Roo.Element}
     */
    getEl : function(){
        return this.el;
    },

    /**
     * Refreshes the view.
     */
    refresh : function(){
        var t = this.tpl;
        this.clearSelections();
        this.el.update("");
        var html = [];
        var records = this.store.getRange();
        if(records.length < 1){
            this.el.update(this.emptyText);
            return;
        }
        for(var i = 0, len = records.length; i < len; i++){
            var data = this.prepareData(records[i].data, i, records[i]);
            html[html.length] = t.apply(data);
        }
        this.el.update(html.join(""));
        this.nodes = this.el.dom.childNodes;
        this.updateIndexes(0);
    },

    /**
     * Function to override to reformat the data that is sent to
     * the template for each node.
     * @param {Array/Object} data The raw data (array of colData for a data model bound view or
     * a JSON object for an UpdateManager bound view).
     */
    prepareData : function(data){
        return data;
    },

    onUpdate : function(ds, record){
        this.clearSelections();
        var index = this.store.indexOf(record);
        var n = this.nodes[index];
        this.tpl.insertBefore(n, this.prepareData(record.data));
        n.parentNode.removeChild(n);
        this.updateIndexes(index, index);
    },

    onAdd : function(ds, records, index){
        this.clearSelections();
        if(this.nodes.length == 0){
            this.refresh();
            return;
        }
        var n = this.nodes[index];
        for(var i = 0, len = records.length; i < len; i++){
            var d = this.prepareData(records[i].data);
            if(n){
                this.tpl.insertBefore(n, d);
            }else{
                this.tpl.append(this.el, d);
            }
        }
        this.updateIndexes(index);
    },

    onRemove : function(ds, record, index){
        this.clearSelections();
        this.el.dom.removeChild(this.nodes[index]);
        this.updateIndexes(index);
    },

    /**
     * Refresh an individual node.
     * @param {Number} index
     */
    refreshNode : function(index){
        this.onUpdate(this.store, this.store.getAt(index));
    },

    updateIndexes : function(startIndex, endIndex){
        var ns = this.nodes;
        startIndex = startIndex || 0;
        endIndex = endIndex || ns.length - 1;
        for(var i = startIndex; i <= endIndex; i++){
            ns[i].nodeIndex = i;
        }
    },

    /**
     * Changes the data store this view uses and refresh the view.
     * @param {Store} store
     */
    setStore : function(store, initial){
        if(!initial && this.store){
            this.store.un("datachanged", this.refresh);
            this.store.un("add", this.onAdd);
            this.store.un("remove", this.onRemove);
            this.store.un("update", this.onUpdate);
            this.store.un("clear", this.refresh);
        }
        if(store){
          
            store.on("datachanged", this.refresh, this);
            store.on("add", this.onAdd, this);
            store.on("remove", this.onRemove, this);
            store.on("update", this.onUpdate, this);
            store.on("clear", this.refresh, this);
        }
        
        if(store){
            this.refresh();
        }
    },

    /**
     * Returns the template node the passed child belongs to or null if it doesn't belong to one.
     * @param {HTMLElement} node
     * @return {HTMLElement} The template node
     */
    findItemFromChild : function(node){
        var el = this.el.dom;
        if(!node || node.parentNode == el){
		    return node;
	    }
	    var p = node.parentNode;
	    while(p && p != el){
            if(p.parentNode == el){
            	return p;
            }
            p = p.parentNode;
        }
	    return null;
    },

    /** @ignore */
    onClick : function(e){
        var item = this.findItemFromChild(e.getTarget());
        if(item){
            var index = this.indexOf(item);
            if(this.onItemClick(item, index, e) !== false){
                this.fireEvent("click", this, index, item, e);
            }
        }else{
            this.clearSelections();
        }
    },

    /** @ignore */
    onContextMenu : function(e){
        var item = this.findItemFromChild(e.getTarget());
        if(item){
            this.fireEvent("contextmenu", this, this.indexOf(item), item, e);
        }
    },

    /** @ignore */
    onDblClick : function(e){
        var item = this.findItemFromChild(e.getTarget());
        if(item){
            this.fireEvent("dblclick", this, this.indexOf(item), item, e);
        }
    },

    onItemClick : function(item, index, e){
        if(this.fireEvent("beforeclick", this, index, item, e) === false){
            return false;
        }
        if(this.multiSelect || this.singleSelect){
            if(this.multiSelect && e.shiftKey && this.lastSelection){
                this.select(this.getNodes(this.indexOf(this.lastSelection), index), false);
            }else{
                this.select(item, this.multiSelect && e.ctrlKey);
                this.lastSelection = item;
            }
            e.preventDefault();
        }
        return true;
    },

    /**
     * Get the number of selected nodes.
     * @return {Number}
     */
    getSelectionCount : function(){
        return this.selections.length;
    },

    /**
     * Get the currently selected nodes.
     * @return {Array} An array of HTMLElements
     */
    getSelectedNodes : function(){
        return this.selections;
    },

    /**
     * Get the indexes of the selected nodes.
     * @return {Array}
     */
    getSelectedIndexes : function(){
        var indexes = [], s = this.selections;
        for(var i = 0, len = s.length; i < len; i++){
            indexes.push(s[i].nodeIndex);
        }
        return indexes;
    },

    /**
     * Clear all selections
     * @param {Boolean} suppressEvent (optional) true to skip firing of the selectionchange event
     */
    clearSelections : function(suppressEvent){
        if(this.nodes && (this.multiSelect || this.singleSelect) && this.selections.length > 0){
            this.cmp.elements = this.selections;
            this.cmp.removeClass(this.selectedClass);
            this.selections = [];
            if(!suppressEvent){
                this.fireEvent("selectionchange", this, this.selections);
            }
        }
    },

    /**
     * Returns true if the passed node is selected
     * @param {HTMLElement/Number} node The node or node index
     * @return {Boolean}
     */
    isSelected : function(node){
        var s = this.selections;
        if(s.length < 1){
            return false;
        }
        node = this.getNode(node);
        return s.indexOf(node) !== -1;
    },

    /**
     * Selects nodes.
     * @param {Array/HTMLElement/String/Number} nodeInfo An HTMLElement template node, index of a template node, id of a template node or an array of any of those to select
     * @param {Boolean} keepExisting (optional) true to keep existing selections
     * @param {Boolean} suppressEvent (optional) true to skip firing of the selectionchange vent
     */
    select : function(nodeInfo, keepExisting, suppressEvent){
        if(nodeInfo instanceof Array){
            if(!keepExisting){
                this.clearSelections(true);
            }
            for(var i = 0, len = nodeInfo.length; i < len; i++){
                this.select(nodeInfo[i], true, true);
            }
        } else{
            var node = this.getNode(nodeInfo);
            if(node && !this.isSelected(node)){
                if(!keepExisting){
                    this.clearSelections(true);
                }
                if(this.fireEvent("beforeselect", this, node, this.selections) !== false){
                    Roo.fly(node).addClass(this.selectedClass);
                    this.selections.push(node);
                    if(!suppressEvent){
                        this.fireEvent("selectionchange", this, this.selections);
                    }
                }
            }
        }
    },

    /**
     * Gets a template node.
     * @param {HTMLElement/String/Number} nodeInfo An HTMLElement template node, index of a template node or the id of a template node
     * @return {HTMLElement} The node or null if it wasn't found
     */
    getNode : function(nodeInfo){
        if(typeof nodeInfo == "string"){
            return document.getElementById(nodeInfo);
        }else if(typeof nodeInfo == "number"){
            return this.nodes[nodeInfo];
        }
        return nodeInfo;
    },

    /**
     * Gets a range template nodes.
     * @param {Number} startIndex
     * @param {Number} endIndex
     * @return {Array} An array of nodes
     */
    getNodes : function(start, end){
        var ns = this.nodes;
        start = start || 0;
        end = typeof end == "undefined" ? ns.length - 1 : end;
        var nodes = [];
        if(start <= end){
            for(var i = start; i <= end; i++){
                nodes.push(ns[i]);
            }
        } else{
            for(var i = start; i >= end; i--){
                nodes.push(ns[i]);
            }
        }
        return nodes;
    },

    /**
     * Finds the index of the passed node
     * @param {HTMLElement/String/Number} nodeInfo An HTMLElement template node, index of a template node or the id of a template node
     * @return {Number} The index of the node or -1
     */
    indexOf : function(node){
        node = this.getNode(node);
        if(typeof node.nodeIndex == "number"){
            return node.nodeIndex;
        }
        var ns = this.nodes;
        for(var i = 0, len = ns.length; i < len; i++){
            if(ns[i] == node){
                return i;
            }
        }
        return -1;
    }
});
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
 * @class Roo.JsonView
 * @extends Roo.View
 * Shortcut class to create a JSON + {@link Roo.UpdateManager} template view. Usage:
<pre><code>
var view = new Roo.JsonView("my-element",
    '&lt;div id="{id}"&gt;{foo} - {bar}&lt;/div&gt;', // auto create template
    { multiSelect: true, jsonRoot: "data" }
);

// listen for node click?
view.on("click", function(vw, index, node, e){
    alert('Node "' + node.id + '" at index: ' + index + " was clicked.");
});

// direct load of JSON data
view.load("foobar.php");

// Example from my blog list
var tpl = new Roo.Template(
    '&lt;div class="entry"&gt;' +
    '&lt;a class="entry-title" href="{link}"&gt;{title}&lt;/a&gt;' +
    "&lt;h4&gt;{date} by {author} | {comments} Comments&lt;/h4&gt;{description}" +
    "&lt;/div&gt;&lt;hr /&gt;"
);

var moreView = new Roo.JsonView("entry-list", tpl, {
    jsonRoot: "posts"
});
moreView.on("beforerender", this.sortEntries, this);
moreView.load({
    url: "/blog/get-posts.php",
    params: "allposts=true",
    text: "Loading Blog Entries..."
});
</code></pre>
 * @constructor
 * Create a new JsonView
 * @param {String/HTMLElement/Element} container The container element where the view is to be rendered.
 * @param {Template} tpl The rendering template
 * @param {Object} config The config object
 */
Roo.JsonView = function(container, tpl, config){
    Roo.JsonView.superclass.constructor.call(this, container, tpl, config);

    var um = this.el.getUpdateManager();
    um.setRenderer(this);
    um.on("update", this.onLoad, this);
    um.on("failure", this.onLoadException, this);

    /**
     * @event beforerender
     * Fires before rendering of the downloaded JSON data.
     * @param {Roo.JsonView} this
     * @param {Object} data The JSON data loaded
     */
    /**
     * @event load
     * Fires when data is loaded.
     * @param {Roo.JsonView} this
     * @param {Object} data The JSON data loaded
     * @param {Object} response The raw Connect response object
     */
    /**
     * @event loadexception
     * Fires when loading fails.
     * @param {Roo.JsonView} this
     * @param {Object} response The raw Connect response object
     */
    this.addEvents({
        'beforerender' : true,
        'load' : true,
        'loadexception' : true
    });
};
Roo.extend(Roo.JsonView, Roo.View, {
    /**
     * The root property in the loaded JSON object that contains the data
     * @type {String}
     */
    jsonRoot : "",

    /**
     * Refreshes the view.
     */
    refresh : function(){
        this.clearSelections();
        this.el.update("");
        var html = [];
        var o = this.jsonData;
        if(o && o.length > 0){
            for(var i = 0, len = o.length; i < len; i++){
                var data = this.prepareData(o[i], i, o);
                html[html.length] = this.tpl.apply(data);
            }
        }else{
            html.push(this.emptyText);
        }
        this.el.update(html.join(""));
        this.nodes = this.el.dom.childNodes;
        this.updateIndexes(0);
    },

    /**
     * Performs an async HTTP request, and loads the JSON from the response. If <i>params</i> are specified it uses POST, otherwise it uses GET.
     * @param {Object/String/Function} url The URL for this request, or a function to call to get the URL, or a config object containing any of the following options:
     <pre><code>
     view.load({
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
     * are respectively shorthand for <i>disableCaching</i>, <i>indicatorText</i>, and <i>loadScripts</i> and are used to set their associated property on this UpdateManager instance.
     * @param {String/Object} params (optional) The parameters to pass, as either a URL encoded string "param1=1&amp;param2=2" or an object {param1: 1, param2: 2}
     * @param {Function} callback (optional) Callback when transaction is complete - called with signature (oElement, bSuccess)
     * @param {Boolean} discardUrl (optional) By default when you execute an update the defaultUrl is changed to the last used URL. If true, it will not store the URL.
     */
    load : function(){
        var um = this.el.getUpdateManager();
        um.update.apply(um, arguments);
    },

    render : function(el, response){
        this.clearSelections();
        this.el.update("");
        var o;
        try{
            o = Roo.util.JSON.decode(response.responseText);
            if(this.jsonRoot){
                
                o = /** eval:var:o */ eval("o." + this.jsonRoot);
            }
        } catch(e){
        }
        /**
         * The current JSON data or null
         */
        this.jsonData = o;
        this.beforeRender();
        this.refresh();
    },

/**
 * Get the number of records in the current JSON dataset
 * @return {Number}
 */
    getCount : function(){
        return this.jsonData ? this.jsonData.length : 0;
    },

/**
 * Returns the JSON object for the specified node(s)
 * @param {HTMLElement/Array} node The node or an array of nodes
 * @return {Object/Array} If you pass in an array, you get an array back, otherwise
 * you get the JSON object for the node
 */
    getNodeData : function(node){
        if(node instanceof Array){
            var data = [];
            for(var i = 0, len = node.length; i < len; i++){
                data.push(this.getNodeData(node[i]));
            }
            return data;
        }
        return this.jsonData[this.indexOf(node)] || null;
    },

    beforeRender : function(){
        this.snapshot = this.jsonData;
        if(this.sortInfo){
            this.sort.apply(this, this.sortInfo);
        }
        this.fireEvent("beforerender", this, this.jsonData);
    },

    onLoad : function(el, o){
        this.fireEvent("load", this, this.jsonData, o);
    },

    onLoadException : function(el, o){
        this.fireEvent("loadexception", this, o);
    },

/**
 * Filter the data by a specific property.
 * @param {String} property A property on your JSON objects
 * @param {String/RegExp} value Either string that the property values
 * should start with, or a RegExp to test against the property
 */
    filter : function(property, value){
        if(this.jsonData){
            var data = [];
            var ss = this.snapshot;
            if(typeof value == "string"){
                var vlen = value.length;
                if(vlen == 0){
                    this.clearFilter();
                    return;
                }
                value = value.toLowerCase();
                for(var i = 0, len = ss.length; i < len; i++){
                    var o = ss[i];
                    if(o[property].substr(0, vlen).toLowerCase() == value){
                        data.push(o);
                    }
                }
            } else if(value.exec){ // regex?
                for(var i = 0, len = ss.length; i < len; i++){
                    var o = ss[i];
                    if(value.test(o[property])){
                        data.push(o);
                    }
                }
            } else{
                return;
            }
            this.jsonData = data;
            this.refresh();
        }
    },

/**
 * Filter by a function. The passed function will be called with each
 * object in the current dataset. If the function returns true the value is kept,
 * otherwise it is filtered.
 * @param {Function} fn
 * @param {Object} scope (optional) The scope of the function (defaults to this JsonView)
 */
    filterBy : function(fn, scope){
        if(this.jsonData){
            var data = [];
            var ss = this.snapshot;
            for(var i = 0, len = ss.length; i < len; i++){
                var o = ss[i];
                if(fn.call(scope || this, o)){
                    data.push(o);
                }
            }
            this.jsonData = data;
            this.refresh();
        }
    },

/**
 * Clears the current filter.
 */
    clearFilter : function(){
        if(this.snapshot && this.jsonData != this.snapshot){
            this.jsonData = this.snapshot;
            this.refresh();
        }
    },


/**
 * Sorts the data for this view and refreshes it.
 * @param {String} property A property on your JSON objects to sort on
 * @param {String} direction (optional) "desc" or "asc" (defaults to "asc")
 * @param {Function} sortType (optional) A function to call to convert the data to a sortable value.
 */
    sort : function(property, dir, sortType){
        this.sortInfo = Array.prototype.slice.call(arguments, 0);
        if(this.jsonData){
            var p = property;
            var dsc = dir && dir.toLowerCase() == "desc";
            var f = function(o1, o2){
                var v1 = sortType ? sortType(o1[p]) : o1[p];
                var v2 = sortType ? sortType(o2[p]) : o2[p];
                ;
                if(v1 < v2){
                    return dsc ? +1 : -1;
                } else if(v1 > v2){
                    return dsc ? -1 : +1;
                } else{
                    return 0;
                }
            };
            this.jsonData.sort(f);
            this.refresh();
            if(this.jsonData != this.snapshot){
                this.snapshot.sort(f);
            }
        }
    }
});/*
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
 * @class Roo.ColorPalette
 * @extends Roo.Component
 * Simple color palette class for choosing colors.  The palette can be rendered to any container.<br />
 * Here's an example of typical usage:
 * <pre><code>
var cp = new Roo.ColorPalette({value:'993300'});  // initial selected color
cp.render('my-div');

cp.on('select', function(palette, selColor){
    // do something with selColor
});
</code></pre>
 * @constructor
 * Create a new ColorPalette
 * @param {Object} config The config object
 */
Roo.ColorPalette = function(config){
    Roo.ColorPalette.superclass.constructor.call(this, config);
    this.addEvents({
        /**
	     * @event select
	     * Fires when a color is selected
	     * @param {ColorPalette} this
	     * @param {String} color The 6-digit color hex code (without the # symbol)
	     */
        select: true
    });

    if(this.handler){
        this.on("select", this.handler, this.scope, true);
    }
};
Roo.extend(Roo.ColorPalette, Roo.Component, {
    /**
     * @cfg {String} itemCls
     * The CSS class to apply to the containing element (defaults to "x-color-palette")
     */
    itemCls : "x-color-palette",
    /**
     * @cfg {String} value
     * The initial color to highlight (should be a valid 6-digit color hex code without the # symbol).  Note that
     * the hex codes are case-sensitive.
     */
    value : null,
    clickEvent:'click',
    // private
    ctype: "Roo.ColorPalette",

    /**
     * @cfg {Boolean} allowReselect If set to true then reselecting a color that is already selected fires the selection event
     */
    allowReselect : false,

    /**
     * <p>An array of 6-digit color hex code strings (without the # symbol).  This array can contain any number
     * of colors, and each hex code should be unique.  The width of the palette is controlled via CSS by adjusting
     * the width property of the 'x-color-palette' class (or assigning a custom class), so you can balance the number
     * of colors with the width setting until the box is symmetrical.</p>
     * <p>You can override individual colors if needed:</p>
     * <pre><code>
var cp = new Roo.ColorPalette();
cp.colors[0] = "FF0000";  // change the first box to red
</code></pre>

Or you can provide a custom array of your own for complete control:
<pre><code>
var cp = new Roo.ColorPalette();
cp.colors = ["000000", "993300", "333300"];
</code></pre>
     * @type Array
     */
    colors : [
        "000000", "993300", "333300", "003300", "003366", "000080", "333399", "333333",
        "800000", "FF6600", "808000", "008000", "008080", "0000FF", "666699", "808080",
        "FF0000", "FF9900", "99CC00", "339966", "33CCCC", "3366FF", "800080", "969696",
        "FF00FF", "FFCC00", "FFFF00", "00FF00", "00FFFF", "00CCFF", "993366", "C0C0C0",
        "FF99CC", "FFCC99", "FFFF99", "CCFFCC", "CCFFFF", "99CCFF", "CC99FF", "FFFFFF"
    ],

    // private
    onRender : function(container, position){
        var t = new Roo.MasterTemplate(
            '<tpl><a href="#" class="color-{0}" hidefocus="on"><em><span style="background:#{0}" unselectable="on">&#160;</span></em></a></tpl>'
        );
        var c = this.colors;
        for(var i = 0, len = c.length; i < len; i++){
            t.add([c[i]]);
        }
        var el = document.createElement("div");
        el.className = this.itemCls;
        t.overwrite(el);
        container.dom.insertBefore(el, position);
        this.el = Roo.get(el);
        this.el.on(this.clickEvent, this.handleClick,  this, {delegate: "a"});
        if(this.clickEvent != 'click'){
            this.el.on('click', Roo.emptyFn,  this, {delegate: "a", preventDefault:true});
        }
    },

    // private
    afterRender : function(){
        Roo.ColorPalette.superclass.afterRender.call(this);
        if(this.value){
            var s = this.value;
            this.value = null;
            this.select(s);
        }
    },

    // private
    handleClick : function(e, t){
        e.preventDefault();
        if(!this.disabled){
            var c = t.className.match(/(?:^|\s)color-(.{6})(?:\s|$)/)[1];
            this.select(c.toUpperCase());
        }
    },

    /**
     * Selects the specified color in the palette (fires the select event)
     * @param {String} color A valid 6-digit color hex code (# will be stripped if included)
     */
    select : function(color){
        color = color.replace("#", "");
        if(color != this.value || this.allowReselect){
            var el = this.el;
            if(this.value){
                el.child("a.color-"+this.value).removeClass("x-color-palette-sel");
            }
            el.child("a.color-"+color).addClass("x-color-palette-sel");
            this.value = color;
            this.fireEvent("select", this, color);
        }
    }
});/*
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
 * @class Roo.DatePicker
 * @extends Roo.Component
 * Simple date picker class.
 * @constructor
 * Create a new DatePicker
 * @param {Object} config The config object
 */
Roo.DatePicker = function(config){
    Roo.DatePicker.superclass.constructor.call(this, config);

    this.value = config && config.value ?
                 config.value.clearTime() : new Date().clearTime();

    this.addEvents({
        /**
	     * @event select
	     * Fires when a date is selected
	     * @param {DatePicker} this
	     * @param {Date} date The selected date
	     */
        select: true
    });

    if(this.handler){
        this.on("select", this.handler,  this.scope || this);
    }
    // build the disabledDatesRE
    if(!this.disabledDatesRE && this.disabledDates){
        var dd = this.disabledDates;
        var re = "(?:";
        for(var i = 0; i < dd.length; i++){
            re += dd[i];
            if(i != dd.length-1) re += "|";
        }
        this.disabledDatesRE = new RegExp(re + ")");
    }
};

Roo.extend(Roo.DatePicker, Roo.Component, {
    /**
     * @cfg {String} todayText
     * The text to display on the button that selects the current date (defaults to "Today")
     */
    todayText : "Today",
    /**
     * @cfg {String} okText
     * The text to display on the ok button
     */
    okText : "&#160;OK&#160;", // &#160; to give the user extra clicking room
    /**
     * @cfg {String} cancelText
     * The text to display on the cancel button
     */
    cancelText : "Cancel",
    /**
     * @cfg {String} todayTip
     * The tooltip to display for the button that selects the current date (defaults to "{current date} (Spacebar)")
     */
    todayTip : "{0} (Spacebar)",
    /**
     * @cfg {Date} minDate
     * Minimum allowable date (JavaScript date object, defaults to null)
     */
    minDate : null,
    /**
     * @cfg {Date} maxDate
     * Maximum allowable date (JavaScript date object, defaults to null)
     */
    maxDate : null,
    /**
     * @cfg {String} minText
     * The error text to display if the minDate validation fails (defaults to "This date is before the minimum date")
     */
    minText : "This date is before the minimum date",
    /**
     * @cfg {String} maxText
     * The error text to display if the maxDate validation fails (defaults to "This date is after the maximum date")
     */
    maxText : "This date is after the maximum date",
    /**
     * @cfg {String} format
     * The default date format string which can be overriden for localization support.  The format must be
     * valid according to {@link Date#parseDate} (defaults to 'm/d/y').
     */
    format : "m/d/y",
    /**
     * @cfg {Array} disabledDays
     * An array of days to disable, 0-based. For example, [0, 6] disables Sunday and Saturday (defaults to null).
     */
    disabledDays : null,
    /**
     * @cfg {String} disabledDaysText
     * The tooltip to display when the date falls on a disabled day (defaults to "")
     */
    disabledDaysText : "",
    /**
     * @cfg {RegExp} disabledDatesRE
     * JavaScript regular expression used to disable a pattern of dates (defaults to null)
     */
    disabledDatesRE : null,
    /**
     * @cfg {String} disabledDatesText
     * The tooltip text to display when the date falls on a disabled date (defaults to "")
     */
    disabledDatesText : "",
    /**
     * @cfg {Boolean} constrainToViewport
     * True to constrain the date picker to the viewport (defaults to true)
     */
    constrainToViewport : true,
    /**
     * @cfg {Array} monthNames
     * An array of textual month names which can be overriden for localization support (defaults to Date.monthNames)
     */
    monthNames : Date.monthNames,
    /**
     * @cfg {Array} dayNames
     * An array of textual day names which can be overriden for localization support (defaults to Date.dayNames)
     */
    dayNames : Date.dayNames,
    /**
     * @cfg {String} nextText
     * The next month navigation button tooltip (defaults to 'Next Month (Control+Right)')
     */
    nextText: 'Next Month (Control+Right)',
    /**
     * @cfg {String} prevText
     * The previous month navigation button tooltip (defaults to 'Previous Month (Control+Left)')
     */
    prevText: 'Previous Month (Control+Left)',
    /**
     * @cfg {String} monthYearText
     * The header month selector tooltip (defaults to 'Choose a month (Control+Up/Down to move years)')
     */
    monthYearText: 'Choose a month (Control+Up/Down to move years)',
    /**
     * @cfg {Number} startDay
     * Day index at which the week should begin, 0-based (defaults to 0, which is Sunday)
     */
    startDay : 0,
    /**
     * @cfg {Bool} showClear
     * Show a clear button (usefull for date form elements that can be blank.)
     */
    
    showClear: false,
    
    /**
     * Sets the value of the date field
     * @param {Date} value The date to set
     */
    setValue : function(value){
        var old = this.value;
        this.value = value.clearTime(true);
        if(this.el){
            this.update(this.value);
        }
    },

    /**
     * Gets the current selected value of the date field
     * @return {Date} The selected date
     */
    getValue : function(){
        return this.value;
    },

    // private
    focus : function(){
        if(this.el){
            this.update(this.activeDate);
        }
    },

    // private
    onRender : function(container, position){
        var m = [
             '<table cellspacing="0">',
                '<tr><td class="x-date-left"><a href="#" title="', this.prevText ,'">&#160;</a></td><td class="x-date-middle" align="center"></td><td class="x-date-right"><a href="#" title="', this.nextText ,'">&#160;</a></td></tr>',
                '<tr><td colspan="3"><table class="x-date-inner" cellspacing="0"><thead><tr>'];
        var dn = this.dayNames;
        for(var i = 0; i < 7; i++){
            var d = this.startDay+i;
            if(d > 6){
                d = d-7;
            }
            m.push("<th><span>", dn[d].substr(0,1), "</span></th>");
        }
        m[m.length] = "</tr></thead><tbody><tr>";
        for(var i = 0; i < 42; i++) {
            if(i % 7 == 0 && i != 0){
                m[m.length] = "</tr><tr>";
            }
            m[m.length] = '<td><a href="#" hidefocus="on" class="x-date-date" tabIndex="1"><em><span></span></em></a></td>';
        }
        m[m.length] = '</tr></tbody></table></td></tr><tr>'+
            '<td colspan="3" class="x-date-bottom" align="center"></td></tr></table><div class="x-date-mp"></div>';

        var el = document.createElement("div");
        el.className = "x-date-picker";
        el.innerHTML = m.join("");

        container.dom.insertBefore(el, position);

        this.el = Roo.get(el);
        this.eventEl = Roo.get(el.firstChild);

        new Roo.util.ClickRepeater(this.el.child("td.x-date-left a"), {
            handler: this.showPrevMonth,
            scope: this,
            preventDefault:true,
            stopDefault:true
        });

        new Roo.util.ClickRepeater(this.el.child("td.x-date-right a"), {
            handler: this.showNextMonth,
            scope: this,
            preventDefault:true,
            stopDefault:true
        });

        this.eventEl.on("mousewheel", this.handleMouseWheel,  this);

        this.monthPicker = this.el.down('div.x-date-mp');
        this.monthPicker.enableDisplayMode('block');
        
        var kn = new Roo.KeyNav(this.eventEl, {
            "left" : function(e){
                e.ctrlKey ?
                    this.showPrevMonth() :
                    this.update(this.activeDate.add("d", -1));
            },

            "right" : function(e){
                e.ctrlKey ?
                    this.showNextMonth() :
                    this.update(this.activeDate.add("d", 1));
            },

            "up" : function(e){
                e.ctrlKey ?
                    this.showNextYear() :
                    this.update(this.activeDate.add("d", -7));
            },

            "down" : function(e){
                e.ctrlKey ?
                    this.showPrevYear() :
                    this.update(this.activeDate.add("d", 7));
            },

            "pageUp" : function(e){
                this.showNextMonth();
            },

            "pageDown" : function(e){
                this.showPrevMonth();
            },

            "enter" : function(e){
                e.stopPropagation();
                return true;
            },

            scope : this
        });

        this.eventEl.on("click", this.handleDateClick,  this, {delegate: "a.x-date-date"});

        this.eventEl.addKeyListener(Roo.EventObject.SPACE, this.selectToday,  this);

        this.el.unselectable();
        
        this.cells = this.el.select("table.x-date-inner tbody td");
        this.textNodes = this.el.query("table.x-date-inner tbody span");

        this.mbtn = new Roo.Button(this.el.child("td.x-date-middle", true), {
            text: "&#160;",
            tooltip: this.monthYearText
        });

        this.mbtn.on('click', this.showMonthPicker, this);
        this.mbtn.el.child(this.mbtn.menuClassTarget).addClass("x-btn-with-menu");


        var today = (new Date()).dateFormat(this.format);
        
        var baseTb = new Roo.Toolbar(this.el.child("td.x-date-bottom", true));
        baseTb.add({
            text: String.format(this.todayText, today),
            tooltip: String.format(this.todayTip, today),
            handler: this.selectToday,
            scope: this
        });
        
        //var todayBtn = new Roo.Button(this.el.child("td.x-date-bottom", true), {
            
        //});
        if (this.showClear) {
            
            baseTb.add( new Roo.Toolbar.Fill());
            baseTb.add({
                text: '&#160;',
                cls: 'x-btn-icon x-btn-clear',
                handler: function() {
                    //this.value = '';
                    this.fireEvent("select", this, '');
                },
                scope: this
            });
        }
        
        
        if(Roo.isIE){
            this.el.repaint();
        }
        this.update(this.value);
    },

    createMonthPicker : function(){
        if(!this.monthPicker.dom.firstChild){
            var buf = ['<table border="0" cellspacing="0">'];
            for(var i = 0; i < 6; i++){
                buf.push(
                    '<tr><td class="x-date-mp-month"><a href="#">', this.monthNames[i].substr(0, 3), '</a></td>',
                    '<td class="x-date-mp-month x-date-mp-sep"><a href="#">', this.monthNames[i+6].substr(0, 3), '</a></td>',
                    i == 0 ?
                    '<td class="x-date-mp-ybtn" align="center"><a class="x-date-mp-prev"></a></td><td class="x-date-mp-ybtn" align="center"><a class="x-date-mp-next"></a></td></tr>' :
                    '<td class="x-date-mp-year"><a href="#"></a></td><td class="x-date-mp-year"><a href="#"></a></td></tr>'
                );
            }
            buf.push(
                '<tr class="x-date-mp-btns"><td colspan="4"><button type="button" class="x-date-mp-ok">',
                    this.okText,
                    '</button><button type="button" class="x-date-mp-cancel">',
                    this.cancelText,
                    '</button></td></tr>',
                '</table>'
            );
            this.monthPicker.update(buf.join(''));
            this.monthPicker.on('click', this.onMonthClick, this);
            this.monthPicker.on('dblclick', this.onMonthDblClick, this);

            this.mpMonths = this.monthPicker.select('td.x-date-mp-month');
            this.mpYears = this.monthPicker.select('td.x-date-mp-year');

            this.mpMonths.each(function(m, a, i){
                i += 1;
                if((i%2) == 0){
                    m.dom.xmonth = 5 + Math.round(i * .5);
                }else{
                    m.dom.xmonth = Math.round((i-1) * .5);
                }
            });
        }
    },

    showMonthPicker : function(){
        this.createMonthPicker();
        var size = this.el.getSize();
        this.monthPicker.setSize(size);
        this.monthPicker.child('table').setSize(size);

        this.mpSelMonth = (this.activeDate || this.value).getMonth();
        this.updateMPMonth(this.mpSelMonth);
        this.mpSelYear = (this.activeDate || this.value).getFullYear();
        this.updateMPYear(this.mpSelYear);

        this.monthPicker.slideIn('t', {duration:.2});
    },

    updateMPYear : function(y){
        this.mpyear = y;
        var ys = this.mpYears.elements;
        for(var i = 1; i <= 10; i++){
            var td = ys[i-1], y2;
            if((i%2) == 0){
                y2 = y + Math.round(i * .5);
                td.firstChild.innerHTML = y2;
                td.xyear = y2;
            }else{
                y2 = y - (5-Math.round(i * .5));
                td.firstChild.innerHTML = y2;
                td.xyear = y2;
            }
            this.mpYears.item(i-1)[y2 == this.mpSelYear ? 'addClass' : 'removeClass']('x-date-mp-sel');
        }
    },

    updateMPMonth : function(sm){
        this.mpMonths.each(function(m, a, i){
            m[m.dom.xmonth == sm ? 'addClass' : 'removeClass']('x-date-mp-sel');
        });
    },

    selectMPMonth: function(m){
        
    },

    onMonthClick : function(e, t){
        e.stopEvent();
        var el = new Roo.Element(t), pn;
        if(el.is('button.x-date-mp-cancel')){
            this.hideMonthPicker();
        }
        else if(el.is('button.x-date-mp-ok')){
            this.update(new Date(this.mpSelYear, this.mpSelMonth, (this.activeDate || this.value).getDate()));
            this.hideMonthPicker();
        }
        else if(pn = el.up('td.x-date-mp-month', 2)){
            this.mpMonths.removeClass('x-date-mp-sel');
            pn.addClass('x-date-mp-sel');
            this.mpSelMonth = pn.dom.xmonth;
        }
        else if(pn = el.up('td.x-date-mp-year', 2)){
            this.mpYears.removeClass('x-date-mp-sel');
            pn.addClass('x-date-mp-sel');
            this.mpSelYear = pn.dom.xyear;
        }
        else if(el.is('a.x-date-mp-prev')){
            this.updateMPYear(this.mpyear-10);
        }
        else if(el.is('a.x-date-mp-next')){
            this.updateMPYear(this.mpyear+10);
        }
    },

    onMonthDblClick : function(e, t){
        e.stopEvent();
        var el = new Roo.Element(t), pn;
        if(pn = el.up('td.x-date-mp-month', 2)){
            this.update(new Date(this.mpSelYear, pn.dom.xmonth, (this.activeDate || this.value).getDate()));
            this.hideMonthPicker();
        }
        else if(pn = el.up('td.x-date-mp-year', 2)){
            this.update(new Date(pn.dom.xyear, this.mpSelMonth, (this.activeDate || this.value).getDate()));
            this.hideMonthPicker();
        }
    },

    hideMonthPicker : function(disableAnim){
        if(this.monthPicker){
            if(disableAnim === true){
                this.monthPicker.hide();
            }else{
                this.monthPicker.slideOut('t', {duration:.2});
            }
        }
    },

    // private
    showPrevMonth : function(e){
        this.update(this.activeDate.add("mo", -1));
    },

    // private
    showNextMonth : function(e){
        this.update(this.activeDate.add("mo", 1));
    },

    // private
    showPrevYear : function(){
        this.update(this.activeDate.add("y", -1));
    },

    // private
    showNextYear : function(){
        this.update(this.activeDate.add("y", 1));
    },

    // private
    handleMouseWheel : function(e){
        var delta = e.getWheelDelta();
        if(delta > 0){
            this.showPrevMonth();
            e.stopEvent();
        } else if(delta < 0){
            this.showNextMonth();
            e.stopEvent();
        }
    },

    // private
    handleDateClick : function(e, t){
        e.stopEvent();
        if(t.dateValue && !Roo.fly(t.parentNode).hasClass("x-date-disabled")){
            this.setValue(new Date(t.dateValue));
            this.fireEvent("select", this, this.value);
        }
    },

    // private
    selectToday : function(){
        this.setValue(new Date().clearTime());
        this.fireEvent("select", this, this.value);
    },

    // private
    update : function(date){
        var vd = this.activeDate;
        this.activeDate = date;
        if(vd && this.el){
            var t = date.getTime();
            if(vd.getMonth() == date.getMonth() && vd.getFullYear() == date.getFullYear()){
                this.cells.removeClass("x-date-selected");
                this.cells.each(function(c){
                   if(c.dom.firstChild.dateValue == t){
                       c.addClass("x-date-selected");
                       setTimeout(function(){
                            try{c.dom.firstChild.focus();}catch(e){}
                       }, 50);
                       return false;
                   }
                });
                return;
            }
        }
        var days = date.getDaysInMonth();
        var firstOfMonth = date.getFirstDateOfMonth();
        var startingPos = firstOfMonth.getDay()-this.startDay;

        if(startingPos <= this.startDay){
            startingPos += 7;
        }

        var pm = date.add("mo", -1);
        var prevStart = pm.getDaysInMonth()-startingPos;

        var cells = this.cells.elements;
        var textEls = this.textNodes;
        days += startingPos;

        // convert everything to numbers so it's fast
        var day = 86400000;
        var d = (new Date(pm.getFullYear(), pm.getMonth(), prevStart)).clearTime();
        var today = new Date().clearTime().getTime();
        var sel = date.clearTime().getTime();
        var min = this.minDate ? this.minDate.clearTime() : Number.NEGATIVE_INFINITY;
        var max = this.maxDate ? this.maxDate.clearTime() : Number.POSITIVE_INFINITY;
        var ddMatch = this.disabledDatesRE;
        var ddText = this.disabledDatesText;
        var ddays = this.disabledDays ? this.disabledDays.join("") : false;
        var ddaysText = this.disabledDaysText;
        var format = this.format;

        var setCellClass = function(cal, cell){
            cell.title = "";
            var t = d.getTime();
            cell.firstChild.dateValue = t;
            if(t == today){
                cell.className += " x-date-today";
                cell.title = cal.todayText;
            }
            if(t == sel){
                cell.className += " x-date-selected";
                setTimeout(function(){
                    try{cell.firstChild.focus();}catch(e){}
                }, 50);
            }
            // disabling
            if(t < min) {
                cell.className = " x-date-disabled";
                cell.title = cal.minText;
                return;
            }
            if(t > max) {
                cell.className = " x-date-disabled";
                cell.title = cal.maxText;
                return;
            }
            if(ddays){
                if(ddays.indexOf(d.getDay()) != -1){
                    cell.title = ddaysText;
                    cell.className = " x-date-disabled";
                }
            }
            if(ddMatch && format){
                var fvalue = d.dateFormat(format);
                if(ddMatch.test(fvalue)){
                    cell.title = ddText.replace("%0", fvalue);
                    cell.className = " x-date-disabled";
                }
            }
        };

        var i = 0;
        for(; i < startingPos; i++) {
            textEls[i].innerHTML = (++prevStart);
            d.setDate(d.getDate()+1);
            cells[i].className = "x-date-prevday";
            setCellClass(this, cells[i]);
        }
        for(; i < days; i++){
            intDay = i - startingPos + 1;
            textEls[i].innerHTML = (intDay);
            d.setDate(d.getDate()+1);
            cells[i].className = "x-date-active";
            setCellClass(this, cells[i]);
        }
        var extraDays = 0;
        for(; i < 42; i++) {
             textEls[i].innerHTML = (++extraDays);
             d.setDate(d.getDate()+1);
             cells[i].className = "x-date-nextday";
             setCellClass(this, cells[i]);
        }

        this.mbtn.setText(this.monthNames[date.getMonth()] + " " + date.getFullYear());

        if(!this.internalRender){
            var main = this.el.dom.firstChild;
            var w = main.offsetWidth;
            this.el.setWidth(w + this.el.getBorderWidth("lr"));
            Roo.fly(main).setWidth(w);
            this.internalRender = true;
            // opera does not respect the auto grow header center column
            // then, after it gets a width opera refuses to recalculate
            // without a second pass
            if(Roo.isOpera && !this.secondPass){
                main.rows[0].cells[1].style.width = (w - (main.rows[0].cells[0].offsetWidth+main.rows[0].cells[2].offsetWidth)) + "px";
                this.secondPass = true;
                this.update.defer(10, this, [date]);
            }
        }
    }
});/*
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
    /** The body element that contains {@link Roo.TabPanelItem} bodies.
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
        this.items[item.id] = item;
        this.items.push(item);
        if(this.resizeTabs){
           item.setWidth(this.currentTabWidth || this.preferredTabWidth);
           this.autoSizeTabs();
        }else{
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
        if(!tab) return;
        var index = items.indexOf(tab);
        if(this.active == tab && items.length > 1){
            var newTab = this.getNextAvailable(index);
            if(newTab)newTab.activate();
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
    strip.innerHTML = '<div class="x-tabs-strip-wrap"><table class="x-tabs-strip" cellspacing="0" cellpadding="0" border="0"><tbody><tr></tr></tbody></table></div>';
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
    stripEl.appendChild(td);
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
};/*
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
 * @class Roo.Button
 * @extends Roo.util.Observable
 * Simple Button class
 * @cfg {String} text The button text
 * @cfg {String} icon The path to an image to display in the button (the image will be set as the background-image
 * CSS property of the button by default, so if you want a mixed icon/text button, set cls:"x-btn-text-icon")
 * @cfg {Function} handler A function called when the button is clicked (can be used instead of click event)
 * @cfg {Object} scope The scope of the handler
 * @cfg {Number} minWidth The minimum width for this button (used to give a set of buttons a common width)
 * @cfg {String/Object} tooltip The tooltip for the button - can be a string or QuickTips config object
 * @cfg {Boolean} hidden True to start hidden (defaults to false)
 * @cfg {Boolean} disabled True to start disabled (defaults to false)
 * @cfg {Boolean} pressed True to start pressed (only if enableToggle = true)
 * @cfg {String} toggleGroup The group this toggle button is a member of (only 1 per group can be pressed, only
   applies if enableToggle = true)
 * @cfg {String/HTMLElement/Element} renderTo The element to append the button to
 * @cfg {Boolean/Object} repeat True to repeat fire the click event while the mouse is down. This can also be
  an {@link Roo.util.ClickRepeater} config object (defaults to false).
 * @constructor
 * Create a new button
 * @param {Object} config The config object
 */
Roo.Button = function(renderTo, config)
{
    if (!config) {
        config = renderTo;
        renderTo = config.renderTo || false;
    }
    
    Roo.apply(this, config);
    this.addEvents({
        /**
	     * @event click
	     * Fires when this button is clicked
	     * @param {Button} this
	     * @param {EventObject} e The click event
	     */
	    "click" : true,
        /**
	     * @event toggle
	     * Fires when the "pressed" state of this button changes (only if enableToggle = true)
	     * @param {Button} this
	     * @param {Boolean} pressed
	     */
	    "toggle" : true,
        /**
	     * @event mouseover
	     * Fires when the mouse hovers over the button
	     * @param {Button} this
	     * @param {Event} e The event object
	     */
        'mouseover' : true,
        /**
	     * @event mouseout
	     * Fires when the mouse exits the button
	     * @param {Button} this
	     * @param {Event} e The event object
	     */
        'mouseout': true,
         /**
	     * @event render
	     * Fires when the button is rendered
	     * @param {Button} this
	     */
        'render': true
    });
    if(this.menu){
        this.menu = Roo.menu.MenuMgr.get(this.menu);
    }
    if(renderTo){
        this.render(renderTo);
    }
    
    Roo.util.Observable.call(this);
};

Roo.extend(Roo.Button, Roo.util.Observable, {
    /**
     * 
     */
    
    /**
     * Read-only. True if this button is hidden
     * @type Boolean
     */
    hidden : false,
    /**
     * Read-only. True if this button is disabled
     * @type Boolean
     */
    disabled : false,
    /**
     * Read-only. True if this button is pressed (only if enableToggle = true)
     * @type Boolean
     */
    pressed : false,

    /**
     * @cfg {Number} tabIndex 
     * The DOM tabIndex for this button (defaults to undefined)
     */
    tabIndex : undefined,

    /**
     * @cfg {Boolean} enableToggle
     * True to enable pressed/not pressed toggling (defaults to false)
     */
    enableToggle: false,
    /**
     * @cfg {Mixed} menu
     * Standard menu attribute consisting of a reference to a menu object, a menu id or a menu config blob (defaults to undefined).
     */
    menu : undefined,
    /**
     * @cfg {String} menuAlign
     * The position to align the menu to (see {@link Roo.Element#alignTo} for more details, defaults to 'tl-bl?').
     */
    menuAlign : "tl-bl?",

    /**
     * @cfg {String} iconCls
     * A css class which sets a background image to be used as the icon for this button (defaults to undefined).
     */
    iconCls : undefined,
    /**
     * @cfg {String} type
     * The button's type, corresponding to the DOM input element type attribute.  Either "submit," "reset" or "button" (default).
     */
    type : 'button',

    // private
    menuClassTarget: 'tr',

    /**
     * @cfg {String} clickEvent
     * The type of event to map to the button's event handler (defaults to 'click')
     */
    clickEvent : 'click',

    /**
     * @cfg {Boolean} handleMouseEvents
     * False to disable visual cues on mouseover, mouseout and mousedown (defaults to true)
     */
    handleMouseEvents : true,

    /**
     * @cfg {String} tooltipType
     * The type of tooltip to use. Either "qtip" (default) for QuickTips or "title" for title attribute.
     */
    tooltipType : 'qtip',

    /**
     * @cfg {String} cls
     * A CSS class to apply to the button's main element.
     */
    
    /**
     * @cfg {Roo.Template} template (Optional)
     * An {@link Roo.Template} with which to create the Button's main element. This Template must
     * contain numeric substitution parameter 0 if it is to display the tRoo property. Changing the template could
     * require code modifications if required elements (e.g. a button) aren't present.
     */

    // private
    render : function(renderTo){
        var btn;
        if(this.hideParent){
            this.parentEl = Roo.get(renderTo);
        }
        if(!this.dhconfig){
            if(!this.template){
                if(!Roo.Button.buttonTemplate){
                    // hideous table template
                    Roo.Button.buttonTemplate = new Roo.Template(
                        '<table border="0" cellpadding="0" cellspacing="0" class="x-btn-wrap"><tbody><tr>',
                        '<td class="x-btn-left"><i>&#160;</i></td><td class="x-btn-center"><em unselectable="on"><button class="x-btn-text" type="{1}">{0}</button></em></td><td class="x-btn-right"><i>&#160;</i></td>',
                        "</tr></tbody></table>");
                }
                this.template = Roo.Button.buttonTemplate;
            }
            btn = this.template.append(renderTo, [this.text || '&#160;', this.type], true);
            var btnEl = btn.child("button:first");
            btnEl.on('focus', this.onFocus, this);
            btnEl.on('blur', this.onBlur, this);
            if(this.cls){
                btn.addClass(this.cls);
            }
            if(this.icon){
                btnEl.setStyle('background-image', 'url(' +this.icon +')');
            }
            if(this.iconCls){
                btnEl.addClass(this.iconCls);
                if(!this.cls){
                    btn.addClass(this.text ? 'x-btn-text-icon' : 'x-btn-icon');
                }
            }
            if(this.tabIndex !== undefined){
                btnEl.dom.tabIndex = this.tabIndex;
            }
            if(this.tooltip){
                if(typeof this.tooltip == 'object'){
                    Roo.QuickTips.tips(Roo.apply({
                          target: btnEl.id
                    }, this.tooltip));
                } else {
                    btnEl.dom[this.tooltipType] = this.tooltip;
                }
            }
        }else{
            btn = Roo.DomHelper.append(Roo.get(renderTo).dom, this.dhconfig, true);
        }
        this.el = btn;
        if(this.id){
            this.el.dom.id = this.el.id = this.id;
        }
        if(this.menu){
            this.el.child(this.menuClassTarget).addClass("x-btn-with-menu");
            this.menu.on("show", this.onMenuShow, this);
            this.menu.on("hide", this.onMenuHide, this);
        }
        btn.addClass("x-btn");
        if(Roo.isIE && !Roo.isIE7){
            this.autoWidth.defer(1, this);
        }else{
            this.autoWidth();
        }
        if(this.handleMouseEvents){
            btn.on("mouseover", this.onMouseOver, this);
            btn.on("mouseout", this.onMouseOut, this);
            btn.on("mousedown", this.onMouseDown, this);
        }
        btn.on(this.clickEvent, this.onClick, this);
        //btn.on("mouseup", this.onMouseUp, this);
        if(this.hidden){
            this.hide();
        }
        if(this.disabled){
            this.disable();
        }
        Roo.ButtonToggleMgr.register(this);
        if(this.pressed){
            this.el.addClass("x-btn-pressed");
        }
        if(this.repeat){
            var repeater = new Roo.util.ClickRepeater(btn,
                typeof this.repeat == "object" ? this.repeat : {}
            );
            repeater.on("click", this.onClick,  this);
        }
        this.fireEvent('render', this);
        
    },
    /**
     * Returns the button's underlying element
     * @return {Roo.Element} The element
     */
    getEl : function(){
        return this.el;  
    },
    
    /**
     * Destroys this Button and removes any listeners.
     */
    destroy : function(){
        Roo.ButtonToggleMgr.unregister(this);
        this.el.removeAllListeners();
        this.purgeListeners();
        this.el.remove();
    },

    // private
    autoWidth : function(){
        if(this.el){
            this.el.setWidth("auto");
            if(Roo.isIE7 && Roo.isStrict){
                var ib = this.el.child('button');
                if(ib && ib.getWidth() > 20){
                    ib.clip();
                    ib.setWidth(Roo.util.TextMetrics.measure(ib, this.text).width+ib.getFrameWidth('lr'));
                }
            }
            if(this.minWidth){
                if(this.hidden){
                    this.el.beginMeasure();
                }
                if(this.el.getWidth() < this.minWidth){
                    this.el.setWidth(this.minWidth);
                }
                if(this.hidden){
                    this.el.endMeasure();
                }
            }
        }
    },

    /**
     * Assigns this button's click handler
     * @param {Function} handler The function to call when the button is clicked
     * @param {Object} scope (optional) Scope for the function passed in
     */
    setHandler : function(handler, scope){
        this.handler = handler;
        this.scope = scope;  
    },
    
    /**
     * Sets this button's text
     * @param {String} text The button text
     */
    setText : function(text){
        this.text = text;
        if(this.el){
            this.el.child("td.x-btn-center button.x-btn-text").update(text);
        }
        this.autoWidth();
    },
    
    /**
     * Gets the text for this button
     * @return {String} The button text
     */
    getText : function(){
        return this.text;  
    },
    
    /**
     * Show this button
     */
    show: function(){
        this.hidden = false;
        if(this.el){
            this[this.hideParent? 'parentEl' : 'el'].setStyle("display", "");
        }
    },
    
    /**
     * Hide this button
     */
    hide: function(){
        this.hidden = true;
        if(this.el){
            this[this.hideParent? 'parentEl' : 'el'].setStyle("display", "none");
        }
    },
    
    /**
     * Convenience function for boolean show/hide
     * @param {Boolean} visible True to show, false to hide
     */
    setVisible: function(visible){
        if(visible) {
            this.show();
        }else{
            this.hide();
        }
    },
    
    /**
     * If a state it passed, it becomes the pressed state otherwise the current state is toggled.
     * @param {Boolean} state (optional) Force a particular state
     */
    toggle : function(state){
        state = state === undefined ? !this.pressed : state;
        if(state != this.pressed){
            if(state){
                this.el.addClass("x-btn-pressed");
                this.pressed = true;
                this.fireEvent("toggle", this, true);
            }else{
                this.el.removeClass("x-btn-pressed");
                this.pressed = false;
                this.fireEvent("toggle", this, false);
            }
            if(this.toggleHandler){
                this.toggleHandler.call(this.scope || this, this, state);
            }
        }
    },
    
    /**
     * Focus the button
     */
    focus : function(){
        this.el.child('button:first').focus();
    },
    
    /**
     * Disable this button
     */
    disable : function(){
        if(this.el){
            this.el.addClass("x-btn-disabled");
        }
        this.disabled = true;
    },
    
    /**
     * Enable this button
     */
    enable : function(){
        if(this.el){
            this.el.removeClass("x-btn-disabled");
        }
        this.disabled = false;
    },

    /**
     * Convenience function for boolean enable/disable
     * @param {Boolean} enabled True to enable, false to disable
     */
    setDisabled : function(v){
        this[v !== true ? "enable" : "disable"]();
    },

    // private
    onClick : function(e){
        if(e){
            e.preventDefault();
        }
        if(e.button != 0){
            return;
        }
        if(!this.disabled){
            if(this.enableToggle){
                this.toggle();
            }
            if(this.menu && !this.menu.isVisible()){
                this.menu.show(this.el, this.menuAlign);
            }
            this.fireEvent("click", this, e);
            if(this.handler){
                this.el.removeClass("x-btn-over");
                this.handler.call(this.scope || this, this, e);
            }
        }
    },
    // private
    onMouseOver : function(e){
        if(!this.disabled){
            this.el.addClass("x-btn-over");
            this.fireEvent('mouseover', this, e);
        }
    },
    // private
    onMouseOut : function(e){
        if(!e.within(this.el,  true)){
            this.el.removeClass("x-btn-over");
            this.fireEvent('mouseout', this, e);
        }
    },
    // private
    onFocus : function(e){
        if(!this.disabled){
            this.el.addClass("x-btn-focus");
        }
    },
    // private
    onBlur : function(e){
        this.el.removeClass("x-btn-focus");
    },
    // private
    onMouseDown : function(e){
        if(!this.disabled && e.button == 0){
            this.el.addClass("x-btn-click");
            Roo.get(document).on('mouseup', this.onMouseUp, this);
        }
    },
    // private
    onMouseUp : function(e){
        if(e.button == 0){
            this.el.removeClass("x-btn-click");
            Roo.get(document).un('mouseup', this.onMouseUp, this);
        }
    },
    // private
    onMenuShow : function(e){
        this.el.addClass("x-btn-menu-active");
    },
    // private
    onMenuHide : function(e){
        this.el.removeClass("x-btn-menu-active");
    }   
});

// Private utility class used by Button
Roo.ButtonToggleMgr = function(){
   var groups = {};
   
   function toggleGroup(btn, state){
       if(state){
           var g = groups[btn.toggleGroup];
           for(var i = 0, l = g.length; i < l; i++){
               if(g[i] != btn){
                   g[i].toggle(false);
               }
           }
       }
   }
   
   return {
       register : function(btn){
           if(!btn.toggleGroup){
               return;
           }
           var g = groups[btn.toggleGroup];
           if(!g){
               g = groups[btn.toggleGroup] = [];
           }
           g.push(btn);
           btn.on("toggle", toggleGroup);
       },
       
       unregister : function(btn){
           if(!btn.toggleGroup){
               return;
           }
           var g = groups[btn.toggleGroup];
           if(g){
               g.remove(btn);
               btn.un("toggle", toggleGroup);
           }
       }
   };
}();/*
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
 * @class Roo.SplitButton
 * @extends Roo.Button
 * A split button that provides a built-in dropdown arrow that can fire an event separately from the default
 * click event of the button.  Typically this would be used to display a dropdown menu that provides additional
 * options to the primary button action, but any custom handler can provide the arrowclick implementation.
 * @cfg {Function} arrowHandler A function called when the arrow button is clicked (can be used instead of click event)
 * @cfg {String} arrowTooltip The title attribute of the arrow
 * @constructor
 * Create a new menu button
 * @param {String/HTMLElement/Element} renderTo The element to append the button to
 * @param {Object} config The config object
 */
Roo.SplitButton = function(renderTo, config){
    Roo.SplitButton.superclass.constructor.call(this, renderTo, config);
    /**
     * @event arrowclick
     * Fires when this button's arrow is clicked
     * @param {SplitButton} this
     * @param {EventObject} e The click event
     */
    this.addEvents({"arrowclick":true});
};

Roo.extend(Roo.SplitButton, Roo.Button, {
    render : function(renderTo){
        // this is one sweet looking template!
        var tpl = new Roo.Template(
            '<table cellspacing="0" class="x-btn-menu-wrap x-btn"><tr><td>',
            '<table cellspacing="0" class="x-btn-wrap x-btn-menu-text-wrap"><tbody>',
            '<tr><td class="x-btn-left"><i>&#160;</i></td><td class="x-btn-center"><button class="x-btn-text" type="{1}">{0}</button></td></tr>',
            "</tbody></table></td><td>",
            '<table cellspacing="0" class="x-btn-wrap x-btn-menu-arrow-wrap"><tbody>',
            '<tr><td class="x-btn-center"><button class="x-btn-menu-arrow-el" type="button">&#160;</button></td><td class="x-btn-right"><i>&#160;</i></td></tr>',
            "</tbody></table></td></tr></table>"
        );
        var btn = tpl.append(renderTo, [this.text, this.type], true);
        var btnEl = btn.child("button");
        if(this.cls){
            btn.addClass(this.cls);
        }
        if(this.icon){
            btnEl.setStyle('background-image', 'url(' +this.icon +')');
        }
        if(this.iconCls){
            btnEl.addClass(this.iconCls);
            if(!this.cls){
                btn.addClass(this.text ? 'x-btn-text-icon' : 'x-btn-icon');
            }
        }
        this.el = btn;
        if(this.handleMouseEvents){
            btn.on("mouseover", this.onMouseOver, this);
            btn.on("mouseout", this.onMouseOut, this);
            btn.on("mousedown", this.onMouseDown, this);
            btn.on("mouseup", this.onMouseUp, this);
        }
        btn.on(this.clickEvent, this.onClick, this);
        if(this.tooltip){
            if(typeof this.tooltip == 'object'){
                Roo.QuickTips.tips(Roo.apply({
                      target: btnEl.id
                }, this.tooltip));
            } else {
                btnEl.dom[this.tooltipType] = this.tooltip;
            }
        }
        if(this.arrowTooltip){
            btn.child("button:nth(2)").dom[this.tooltipType] = this.arrowTooltip;
        }
        if(this.hidden){
            this.hide();
        }
        if(this.disabled){
            this.disable();
        }
        if(this.pressed){
            this.el.addClass("x-btn-pressed");
        }
        if(Roo.isIE && !Roo.isIE7){
            this.autoWidth.defer(1, this);
        }else{
            this.autoWidth();
        }
        if(this.menu){
            this.menu.on("show", this.onMenuShow, this);
            this.menu.on("hide", this.onMenuHide, this);
        }
        this.fireEvent('render', this);
    },

    // private
    autoWidth : function(){
        if(this.el){
            var tbl = this.el.child("table:first");
            var tbl2 = this.el.child("table:last");
            this.el.setWidth("auto");
            tbl.setWidth("auto");
            if(Roo.isIE7 && Roo.isStrict){
                var ib = this.el.child('button:first');
                if(ib && ib.getWidth() > 20){
                    ib.clip();
                    ib.setWidth(Roo.util.TextMetrics.measure(ib, this.text).width+ib.getFrameWidth('lr'));
                }
            }
            if(this.minWidth){
                if(this.hidden){
                    this.el.beginMeasure();
                }
                if((tbl.getWidth()+tbl2.getWidth()) < this.minWidth){
                    tbl.setWidth(this.minWidth-tbl2.getWidth());
                }
                if(this.hidden){
                    this.el.endMeasure();
                }
            }
            this.el.setWidth(tbl.getWidth()+tbl2.getWidth());
        } 
    },
    /**
     * Sets this button's click handler
     * @param {Function} handler The function to call when the button is clicked
     * @param {Object} scope (optional) Scope for the function passed above
     */
    setHandler : function(handler, scope){
        this.handler = handler;
        this.scope = scope;  
    },
    
    /**
     * Sets this button's arrow click handler
     * @param {Function} handler The function to call when the arrow is clicked
     * @param {Object} scope (optional) Scope for the function passed above
     */
    setArrowHandler : function(handler, scope){
        this.arrowHandler = handler;
        this.scope = scope;  
    },
    
    /**
     * Focus the button
     */
    focus : function(){
        if(this.el){
            this.el.child("button:first").focus();
        }
    },

    // private
    onClick : function(e){
        e.preventDefault();
        if(!this.disabled){
            if(e.getTarget(".x-btn-menu-arrow-wrap")){
                if(this.menu && !this.menu.isVisible()){
                    this.menu.show(this.el, this.menuAlign);
                }
                this.fireEvent("arrowclick", this, e);
                if(this.arrowHandler){
                    this.arrowHandler.call(this.scope || this, this, e);
                }
            }else{
                this.fireEvent("click", this, e);
                if(this.handler){
                    this.handler.call(this.scope || this, this, e);
                }
            }
        }
    },
    // private
    onMouseDown : function(e){
        if(!this.disabled){
            Roo.fly(e.getTarget("table")).addClass("x-btn-click");
        }
    },
    // private
    onMouseUp : function(e){
        Roo.fly(e.getTarget("table")).removeClass("x-btn-click");
    }   
});


// backwards compat
Roo.MenuButton = Roo.SplitButton;/*
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
 * @class Roo.Toolbar
 * Basic Toolbar class.
 * @constructor
 * Creates a new Toolbar
 * @param {Object} config The config object
 */ 
Roo.Toolbar = function(container, buttons, config)
{
    /// old consturctor format still supported..
    if(container instanceof Array){ // omit the container for later rendering
        buttons = container;
        config = buttons;
        container = null;
    }
    if (typeof(container) == 'object' && container.xtype) {
        config = container;
        container = config.container;
        buttons = config.buttons; // not really - use items!!
    }
    var xitems = [];
    if (config && config.items) {
        xitems = config.items;
        delete config.items;
    }
    Roo.apply(this, config);
    this.buttons = buttons;
    
    if(container){
        this.render(container);
    }
    Roo.each(xitems, function(b) {
        this.add(b);
    }, this);
    
};

Roo.Toolbar.prototype = {
    /**
     * @cfg {Roo.data.Store} items
     * array of button configs or elements to add
     */
    
    /**
     * @cfg {String/HTMLElement/Element} container
     * The id or element that will contain the toolbar
     */
    // private
    render : function(ct){
        this.el = Roo.get(ct);
        if(this.cls){
            this.el.addClass(this.cls);
        }
        // using a table allows for vertical alignment
        // 100% width is needed by Safari...
        this.el.update('<div class="x-toolbar x-small-editor"><table cellspacing="0"><tr></tr></table></div>');
        this.tr = this.el.child("tr", true);
        var autoId = 0;
        this.items = new Roo.util.MixedCollection(false, function(o){
            return o.id || ("item" + (++autoId));
        });
        if(this.buttons){
            this.add.apply(this, this.buttons);
            delete this.buttons;
        }
    },

    /**
     * Adds element(s) to the toolbar -- this function takes a variable number of 
     * arguments of mixed type and adds them to the toolbar.
     * @param {Mixed} arg1 The following types of arguments are all valid:<br />
     * <ul>
     * <li>{@link Roo.Toolbar.Button} config: A valid button config object (equivalent to {@link #addButton})</li>
     * <li>HtmlElement: Any standard HTML element (equivalent to {@link #addElement})</li>
     * <li>Field: Any form field (equivalent to {@link #addField})</li>
     * <li>Item: Any subclass of {@link Roo.Toolbar.Item} (equivalent to {@link #addItem})</li>
     * <li>String: Any generic string (gets wrapped in a {@link Roo.Toolbar.TextItem}, equivalent to {@link #addText}).
     * Note that there are a few special strings that are treated differently as explained nRoo.</li>
     * <li>'separator' or '-': Creates a separator element (equivalent to {@link #addSeparator})</li>
     * <li>' ': Creates a spacer element (equivalent to {@link #addSpacer})</li>
     * <li>'->': Creates a fill element (equivalent to {@link #addFill})</li>
     * </ul>
     * @param {Mixed} arg2
     * @param {Mixed} etc.
     */
    add : function(){
        var a = arguments, l = a.length;
        for(var i = 0; i < l; i++){
            this._add(a[i]);
        }
    },
    // private..
    _add : function(el) {
        
        if (el.xtype) {
            el = Roo.factory(el, typeof(Roo.Toolbar[el.xtype]) == 'undefined' ? Roo.form : Roo.Toolbar);
        }
        
        if (el.applyTo){ // some kind of form field
            return this.addField(el);
        } 
        if (el.render){ // some kind of Toolbar.Item
            return this.addItem(el);
        }
        if (typeof el == "string"){ // string
            if(el == "separator" || el == "-"){
                return this.addSeparator();
            }
            if (el == " "){
                return this.addSpacer();
            }
            if(el == "->"){
                return this.addFill();
            }
            return this.addText(el);
            
        }
        if(el.tagName){ // element
            return this.addElement(el);
        }
        if(typeof el == "object"){ // must be button config?
            return this.addButton(el);
        }
        // and now what?!?!
        return false;
        
    },
    
    /**
     * Add an Xtype element
     * @param {Object} xtype Xtype Object
     * @return {Object} created Object
     */
    addxtype : function(e){
        return this.add(e);  
    },
    
    /**
     * Returns the Element for this toolbar.
     * @return {Roo.Element}
     */
    getEl : function(){
        return this.el;  
    },
    
    /**
     * Adds a separator
     * @return {Roo.Toolbar.Item} The separator item
     */
    addSeparator : function(){
        return this.addItem(new Roo.Toolbar.Separator());
    },

    /**
     * Adds a spacer element
     * @return {Roo.Toolbar.Spacer} The spacer item
     */
    addSpacer : function(){
        return this.addItem(new Roo.Toolbar.Spacer());
    },

    /**
     * Adds a fill element that forces subsequent additions to the right side of the toolbar
     * @return {Roo.Toolbar.Fill} The fill item
     */
    addFill : function(){
        return this.addItem(new Roo.Toolbar.Fill());
    },

    /**
     * Adds any standard HTML element to the toolbar
     * @param {String/HTMLElement/Element} el The element or id of the element to add
     * @return {Roo.Toolbar.Item} The element's item
     */
    addElement : function(el){
        return this.addItem(new Roo.Toolbar.Item(el));
    },
    /**
     * Collection of items on the toolbar.. (only Toolbar Items, so use fields to retrieve fields)
     * @type Roo.util.MixedCollection  
     */
    items : false,
     
    /**
     * Adds any Toolbar.Item or subclass
     * @param {Roo.Toolbar.Item} item
     * @return {Roo.Toolbar.Item} The item
     */
    addItem : function(item){
        var td = this.nextBlock();
        item.render(td);
        this.items.add(item);
        return item;
    },
    
    /**
     * Adds a button (or buttons). See {@link Roo.Toolbar.Button} for more info on the config.
     * @param {Object/Array} config A button config or array of configs
     * @return {Roo.Toolbar.Button/Array}
     */
    addButton : function(config){
        if(config instanceof Array){
            var buttons = [];
            for(var i = 0, len = config.length; i < len; i++) {
                buttons.push(this.addButton(config[i]));
            }
            return buttons;
        }
        var b = config;
        if(!(config instanceof Roo.Toolbar.Button)){
            b = config.split ?
                new Roo.Toolbar.SplitButton(config) :
                new Roo.Toolbar.Button(config);
        }
        var td = this.nextBlock();
        b.render(td);
        this.items.add(b);
        return b;
    },
    
    /**
     * Adds text to the toolbar
     * @param {String} text The text to add
     * @return {Roo.Toolbar.Item} The element's item
     */
    addText : function(text){
        return this.addItem(new Roo.Toolbar.TextItem(text));
    },
    
    /**
     * Inserts any {@link Roo.Toolbar.Item}/{@link Roo.Toolbar.Button} at the specified index.
     * @param {Number} index The index where the item is to be inserted
     * @param {Object/Roo.Toolbar.Item/Roo.Toolbar.Button (may be Array)} item The button, or button config object to be inserted.
     * @return {Roo.Toolbar.Button/Item}
     */
    insertButton : function(index, item){
        if(item instanceof Array){
            var buttons = [];
            for(var i = 0, len = item.length; i < len; i++) {
               buttons.push(this.insertButton(index + i, item[i]));
            }
            return buttons;
        }
        if (!(item instanceof Roo.Toolbar.Button)){
           item = new Roo.Toolbar.Button(item);
        }
        var td = document.createElement("td");
        this.tr.insertBefore(td, this.tr.childNodes[index]);
        item.render(td);
        this.items.insert(index, item);
        return item;
    },
    
    /**
     * Adds a new element to the toolbar from the passed {@link Roo.DomHelper} config.
     * @param {Object} config
     * @return {Roo.Toolbar.Item} The element's item
     */
    addDom : function(config, returnEl){
        var td = this.nextBlock();
        Roo.DomHelper.overwrite(td, config);
        var ti = new Roo.Toolbar.Item(td.firstChild);
        ti.render(td);
        this.items.add(ti);
        return ti;
    },

    /**
     * Collection of fields on the toolbar.. usefull for quering (value is false if there are no fields)
     * @type Roo.util.MixedCollection  
     */
    fields : false,
    
    /**
     * Adds a dynamically rendered Roo.form field (TextField, ComboBox, etc). Note: the field should not have
     * been rendered yet. For a field that has already been rendered, use {@link #addElement}.
     * @param {Roo.form.Field} field
     * @return {Roo.ToolbarItem}
     */
     
      
    addField : function(field) {
        if (!this.fields) {
            var autoId = 0;
            this.fields = new Roo.util.MixedCollection(false, function(o){
                return o.id || ("item" + (++autoId));
            });

        }
        
        var td = this.nextBlock();
        field.render(td);
        var ti = new Roo.Toolbar.Item(td.firstChild);
        ti.render(td);
        this.items.add(ti);
        this.fields.add(field);
        return ti;
    },
    /**
     * Hide the toolbar
     * @method hide
     */
     
      
    hide : function()
    {
        this.el.child('div').setVisibilityMode(Roo.Element.DISPLAY);
        this.el.child('div').hide();
    },
    /**
     * Show the toolbar
     * @method show
     */
    show : function()
    {
        this.el.child('div').show();
    },
      
    // private
    nextBlock : function(){
        var td = document.createElement("td");
        this.tr.appendChild(td);
        return td;
    },

    // private
    destroy : function(){
        if(this.items){ // rendered?
            Roo.destroy.apply(Roo, this.items.items);
        }
        if(this.fields){ // rendered?
            Roo.destroy.apply(Roo, this.fields.items);
        }
        Roo.Element.uncache(this.el, this.tr);
    }
};

/**
 * @class Roo.Toolbar.Item
 * The base class that other classes should extend in order to get some basic common toolbar item functionality.
 * @constructor
 * Creates a new Item
 * @param {HTMLElement} el 
 */
Roo.Toolbar.Item = function(el){
    this.el = Roo.getDom(el);
    this.id = Roo.id(this.el);
    this.hidden = false;
};

Roo.Toolbar.Item.prototype = {
    
    /**
     * Get this item's HTML Element
     * @return {HTMLElement}
     */
    getEl : function(){
       return this.el;  
    },

    // private
    render : function(td){
        this.td = td;
        td.appendChild(this.el);
    },
    
    /**
     * Removes and destroys this item.
     */
    destroy : function(){
        this.td.parentNode.removeChild(this.td);
    },
    
    /**
     * Shows this item.
     */
    show: function(){
        this.hidden = false;
        this.td.style.display = "";
    },
    
    /**
     * Hides this item.
     */
    hide: function(){
        this.hidden = true;
        this.td.style.display = "none";
    },
    
    /**
     * Convenience function for boolean show/hide.
     * @param {Boolean} visible true to show/false to hide
     */
    setVisible: function(visible){
        if(visible) {
            this.show();
        }else{
            this.hide();
        }
    },
    
    /**
     * Try to focus this item.
     */
    focus : function(){
        Roo.fly(this.el).focus();
    },
    
    /**
     * Disables this item.
     */
    disable : function(){
        Roo.fly(this.td).addClass("x-item-disabled");
        this.disabled = true;
        this.el.disabled = true;
    },
    
    /**
     * Enables this item.
     */
    enable : function(){
        Roo.fly(this.td).removeClass("x-item-disabled");
        this.disabled = false;
        this.el.disabled = false;
    }
};


/**
 * @class Roo.Toolbar.Separator
 * @extends Roo.Toolbar.Item
 * A simple toolbar separator class
 * @constructor
 * Creates a new Separator
 */
Roo.Toolbar.Separator = function(){
    var s = document.createElement("span");
    s.className = "ytb-sep";
    Roo.Toolbar.Separator.superclass.constructor.call(this, s);
};
Roo.extend(Roo.Toolbar.Separator, Roo.Toolbar.Item, {
    enable:Roo.emptyFn,
    disable:Roo.emptyFn,
    focus:Roo.emptyFn
});

/**
 * @class Roo.Toolbar.Spacer
 * @extends Roo.Toolbar.Item
 * A simple element that adds extra horizontal space to a toolbar.
 * @constructor
 * Creates a new Spacer
 */
Roo.Toolbar.Spacer = function(){
    var s = document.createElement("div");
    s.className = "ytb-spacer";
    Roo.Toolbar.Spacer.superclass.constructor.call(this, s);
};
Roo.extend(Roo.Toolbar.Spacer, Roo.Toolbar.Item, {
    enable:Roo.emptyFn,
    disable:Roo.emptyFn,
    focus:Roo.emptyFn
});

/**
 * @class Roo.Toolbar.Fill
 * @extends Roo.Toolbar.Spacer
 * A simple element that adds a greedy (100% width) horizontal space to a toolbar.
 * @constructor
 * Creates a new Spacer
 */
Roo.Toolbar.Fill = Roo.extend(Roo.Toolbar.Spacer, {
    // private
    render : function(td){
        td.style.width = '100%';
        Roo.Toolbar.Fill.superclass.render.call(this, td);
    }
});

/**
 * @class Roo.Toolbar.TextItem
 * @extends Roo.Toolbar.Item
 * A simple class that renders text directly into a toolbar.
 * @constructor
 * Creates a new TextItem
 * @param {String} text
 */
Roo.Toolbar.TextItem = function(text){
    if (typeof(text) == 'object') {
        text = text.text;
    }
    var s = document.createElement("span");
    s.className = "ytb-text";
    s.innerHTML = text;
    Roo.Toolbar.TextItem.superclass.constructor.call(this, s);
};
Roo.extend(Roo.Toolbar.TextItem, Roo.Toolbar.Item, {
    enable:Roo.emptyFn,
    disable:Roo.emptyFn,
    focus:Roo.emptyFn
});

/**
 * @class Roo.Toolbar.Button
 * @extends Roo.Button
 * A button that renders into a toolbar.
 * @constructor
 * Creates a new Button
 * @param {Object} config A standard {@link Roo.Button} config object
 */
Roo.Toolbar.Button = function(config){
    Roo.Toolbar.Button.superclass.constructor.call(this, null, config);
};
Roo.extend(Roo.Toolbar.Button, Roo.Button, {
    render : function(td){
        this.td = td;
        Roo.Toolbar.Button.superclass.render.call(this, td);
    },
    
    /**
     * Removes and destroys this button
     */
    destroy : function(){
        Roo.Toolbar.Button.superclass.destroy.call(this);
        this.td.parentNode.removeChild(this.td);
    },
    
    /**
     * Shows this button
     */
    show: function(){
        this.hidden = false;
        this.td.style.display = "";
    },
    
    /**
     * Hides this button
     */
    hide: function(){
        this.hidden = true;
        this.td.style.display = "none";
    },

    /**
     * Disables this item
     */
    disable : function(){
        Roo.fly(this.td).addClass("x-item-disabled");
        this.disabled = true;
    },

    /**
     * Enables this item
     */
    enable : function(){
        Roo.fly(this.td).removeClass("x-item-disabled");
        this.disabled = false;
    }
});
// backwards compat
Roo.ToolbarButton = Roo.Toolbar.Button;

/**
 * @class Roo.Toolbar.SplitButton
 * @extends Roo.SplitButton
 * A menu button that renders into a toolbar.
 * @constructor
 * Creates a new SplitButton
 * @param {Object} config A standard {@link Roo.SplitButton} config object
 */
Roo.Toolbar.SplitButton = function(config){
    Roo.Toolbar.SplitButton.superclass.constructor.call(this, null, config);
};
Roo.extend(Roo.Toolbar.SplitButton, Roo.SplitButton, {
    render : function(td){
        this.td = td;
        Roo.Toolbar.SplitButton.superclass.render.call(this, td);
    },
    
    /**
     * Removes and destroys this button
     */
    destroy : function(){
        Roo.Toolbar.SplitButton.superclass.destroy.call(this);
        this.td.parentNode.removeChild(this.td);
    },
    
    /**
     * Shows this button
     */
    show: function(){
        this.hidden = false;
        this.td.style.display = "";
    },
    
    /**
     * Hides this button
     */
    hide: function(){
        this.hidden = true;
        this.td.style.display = "none";
    }
});

// backwards compat
Roo.Toolbar.MenuButton = Roo.Toolbar.SplitButton;/*
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
 * @class Roo.PagingToolbar
 * @extends Roo.Toolbar
 * A specialized toolbar that is bound to a {@link Roo.data.Store} and provides automatic paging controls.
 * @constructor
 * Create a new PagingToolbar
 * @param {Object} config The config object
 */
Roo.PagingToolbar = function(el, ds, config)
{
    // old args format still supported... - xtype is prefered..
    if (typeof(el) == 'object' && el.xtype) {
        // created from xtype...
        config = el;
        ds = el.dataSource;
        el = config.container;
    }
    
    
    Roo.PagingToolbar.superclass.constructor.call(this, el, null, config);
    this.ds = ds;
    this.cursor = 0;
    this.renderButtons(this.el);
    this.bind(ds);
};

Roo.extend(Roo.PagingToolbar, Roo.Toolbar, {
    /**
     * @cfg {Roo.data.Store} dataSource
     * The underlying data store providing the paged data
     */
    /**
     * @cfg {String/HTMLElement/Element} container
     * container The id or element that will contain the toolbar
     */
    /**
     * @cfg {Boolean} displayInfo
     * True to display the displayMsg (defaults to false)
     */
    /**
     * @cfg {Number} pageSize
     * The number of records to display per page (defaults to 20)
     */
    pageSize: 20,
    /**
     * @cfg {String} displayMsg
     * The paging status message to display (defaults to "Displaying {start} - {end} of {total}")
     */
    displayMsg : 'Displaying {0} - {1} of {2}',
    /**
     * @cfg {String} emptyMsg
     * The message to display when no records are found (defaults to "No data to display")
     */
    emptyMsg : 'No data to display',
    /**
     * Customizable piece of the default paging text (defaults to "Page")
     * @type String
     */
    beforePageText : "Page",
    /**
     * Customizable piece of the default paging text (defaults to "of %0")
     * @type String
     */
    afterPageText : "of {0}",
    /**
     * Customizable piece of the default paging text (defaults to "First Page")
     * @type String
     */
    firstText : "First Page",
    /**
     * Customizable piece of the default paging text (defaults to "Previous Page")
     * @type String
     */
    prevText : "Previous Page",
    /**
     * Customizable piece of the default paging text (defaults to "Next Page")
     * @type String
     */
    nextText : "Next Page",
    /**
     * Customizable piece of the default paging text (defaults to "Last Page")
     * @type String
     */
    lastText : "Last Page",
    /**
     * Customizable piece of the default paging text (defaults to "Refresh")
     * @type String
     */
    refreshText : "Refresh",

    // private
    renderButtons : function(el){
        Roo.PagingToolbar.superclass.render.call(this, el);
        this.first = this.addButton({
            tooltip: this.firstText,
            cls: "x-btn-icon x-grid-page-first",
            disabled: true,
            handler: this.onClick.createDelegate(this, ["first"])
        });
        this.prev = this.addButton({
            tooltip: this.prevText,
            cls: "x-btn-icon x-grid-page-prev",
            disabled: true,
            handler: this.onClick.createDelegate(this, ["prev"])
        });
        this.addSeparator();
        this.add(this.beforePageText);
        this.field = Roo.get(this.addDom({
           tag: "input",
           type: "text",
           size: "3",
           value: "1",
           cls: "x-grid-page-number"
        }).el);
        this.field.on("keydown", this.onPagingKeydown, this);
        this.field.on("focus", function(){this.dom.select();});
        this.afterTextEl = this.addText(String.format(this.afterPageText, 1));
        this.field.setHeight(18);
        this.addSeparator();
        this.next = this.addButton({
            tooltip: this.nextText,
            cls: "x-btn-icon x-grid-page-next",
            disabled: true,
            handler: this.onClick.createDelegate(this, ["next"])
        });
        this.last = this.addButton({
            tooltip: this.lastText,
            cls: "x-btn-icon x-grid-page-last",
            disabled: true,
            handler: this.onClick.createDelegate(this, ["last"])
        });
        this.addSeparator();
        this.loading = this.addButton({
            tooltip: this.refreshText,
            cls: "x-btn-icon x-grid-loading",
            handler: this.onClick.createDelegate(this, ["refresh"])
        });

        if(this.displayInfo){
            this.displayEl = Roo.fly(this.el.dom.firstChild).createChild({cls:'x-paging-info'});
        }
    },

    // private
    updateInfo : function(){
        if(this.displayEl){
            var count = this.ds.getCount();
            var msg = count == 0 ?
                this.emptyMsg :
                String.format(
                    this.displayMsg,
                    this.cursor+1, this.cursor+count, this.ds.getTotalCount()    
                );
            this.displayEl.update(msg);
        }
    },

    // private
    onLoad : function(ds, r, o){
       this.cursor = o.params ? o.params.start : 0;
       var d = this.getPageData(), ap = d.activePage, ps = d.pages;

       this.afterTextEl.el.innerHTML = String.format(this.afterPageText, d.pages);
       this.field.dom.value = ap;
       this.first.setDisabled(ap == 1);
       this.prev.setDisabled(ap == 1);
       this.next.setDisabled(ap == ps);
       this.last.setDisabled(ap == ps);
       this.loading.enable();
       this.updateInfo();
    },

    // private
    getPageData : function(){
        var total = this.ds.getTotalCount();
        return {
            total : total,
            activePage : Math.ceil((this.cursor+this.pageSize)/this.pageSize),
            pages :  total < this.pageSize ? 1 : Math.ceil(total/this.pageSize)
        };
    },

    // private
    onLoadError : function(){
        this.loading.enable();
    },

    // private
    onPagingKeydown : function(e){
        var k = e.getKey();
        var d = this.getPageData();
        if(k == e.RETURN){
            var v = this.field.dom.value, pageNum;
            if(!v || isNaN(pageNum = parseInt(v, 10))){
                this.field.dom.value = d.activePage;
                return;
            }
            pageNum = Math.min(Math.max(1, pageNum), d.pages) - 1;
            this.ds.load({params:{start: pageNum * this.pageSize, limit: this.pageSize}});
            e.stopEvent();
        }
        else if(k == e.HOME || (k == e.UP && e.ctrlKey) || (k == e.PAGEUP && e.ctrlKey) || (k == e.RIGHT && e.ctrlKey) || k == e.END || (k == e.DOWN && e.ctrlKey) || (k == e.LEFT && e.ctrlKey) || (k == e.PAGEDOWN && e.ctrlKey))
        {
          var pageNum = (k == e.HOME || (k == e.DOWN && e.ctrlKey) || (k == e.LEFT && e.ctrlKey) || (k == e.PAGEDOWN && e.ctrlKey)) ? 1 : d.pages;
          this.field.dom.value = pageNum;
          this.ds.load({params:{start: (pageNum - 1) * this.pageSize, limit: this.pageSize}});
          e.stopEvent();
        }
        else if(k == e.UP || k == e.RIGHT || k == e.PAGEUP || k == e.DOWN || k == e.LEFT || k == e.PAGEDOWN)
        {
          var v = this.field.dom.value, pageNum; 
          var increment = (e.shiftKey) ? 10 : 1;
          if(k == e.DOWN || k == e.LEFT || k == e.PAGEDOWN)
            increment *= -1;
          if(!v || isNaN(pageNum = parseInt(v, 10))) {
            this.field.dom.value = d.activePage;
            return;
          }
          else if(parseInt(v, 10) + increment >= 1 & parseInt(v, 10) + increment <= d.pages)
          {
            this.field.dom.value = parseInt(v, 10) + increment;
            pageNum = Math.min(Math.max(1, pageNum + increment), d.pages) - 1;
            this.ds.load({params:{start: pageNum * this.pageSize, limit: this.pageSize}});
          }
          e.stopEvent();
        }
    },

    // private
    beforeLoad : function(){
        if(this.loading){
            this.loading.disable();
        }
    },

    // private
    onClick : function(which){
        var ds = this.ds;
        switch(which){
            case "first":
                ds.load({params:{start: 0, limit: this.pageSize}});
            break;
            case "prev":
                ds.load({params:{start: Math.max(0, this.cursor-this.pageSize), limit: this.pageSize}});
            break;
            case "next":
                ds.load({params:{start: this.cursor+this.pageSize, limit: this.pageSize}});
            break;
            case "last":
                var total = ds.getTotalCount();
                var extra = total % this.pageSize;
                var lastStart = extra ? (total - extra) : total-this.pageSize;
                ds.load({params:{start: lastStart, limit: this.pageSize}});
            break;
            case "refresh":
                ds.load({params:{start: this.cursor, limit: this.pageSize}});
            break;
        }
    },

    /**
     * Unbinds the paging toolbar from the specified {@link Roo.data.Store}
     * @param {Roo.data.Store} store The data store to unbind
     */
    unbind : function(ds){
        ds.un("beforeload", this.beforeLoad, this);
        ds.un("load", this.onLoad, this);
        ds.un("loadexception", this.onLoadError, this);
        ds.un("remove", this.updateInfo, this);
        ds.un("add", this.updateInfo, this);
        this.ds = undefined;
    },

    /**
     * Binds the paging toolbar to the specified {@link Roo.data.Store}
     * @param {Roo.data.Store} store The data store to bind
     */
    bind : function(ds){
        ds.on("beforeload", this.beforeLoad, this);
        ds.on("load", this.onLoad, this);
        ds.on("loadexception", this.onLoadError, this);
        ds.on("remove", this.updateInfo, this);
        ds.on("add", this.updateInfo, this);
        this.ds = ds;
    }
});/*
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
 * @class Roo.Resizable
 * @extends Roo.util.Observable
 * <p>Applies drag handles to an element to make it resizable. The drag handles are inserted into the element
 * and positioned absolute. Some elements, such as a textarea or image, don't support this. To overcome that, you can wrap
 * the textarea in a div and set "resizeChild" to true (or to the id of the element), <b>or</b> set wrap:true in your config and
 * the element will be wrapped for you automatically.</p>
 * <p>Here is the list of valid resize handles:</p>
 * <pre>
Value   Description
------  -------------------
 'n'     north
 's'     south
 'e'     east
 'w'     west
 'nw'    northwest
 'sw'    southwest
 'se'    southeast
 'ne'    northeast
 'all'   all
</pre>
 * <p>Here's an example showing the creation of a typical Resizable:</p>
 * <pre><code>
var resizer = new Roo.Resizable("element-id", {
    handles: 'all',
    minWidth: 200,
    minHeight: 100,
    maxWidth: 500,
    maxHeight: 400,
    pinned: true
});
resizer.on("resize", myHandler);
</code></pre>
 * <p>To hide a particular handle, set its display to none in CSS, or through script:<br>
 * resizer.east.setDisplayed(false);</p>
 * @cfg {Boolean/String/Element} resizeChild True to resize the first child, or id/element to resize (defaults to false)
 * @cfg {Array/String} adjustments String "auto" or an array [width, height] with values to be <b>added</b> to the
 * resize operation's new size (defaults to [0, 0])
 * @cfg {Number} minWidth The minimum width for the element (defaults to 5)
 * @cfg {Number} minHeight The minimum height for the element (defaults to 5)
 * @cfg {Number} maxWidth The maximum width for the element (defaults to 10000)
 * @cfg {Number} maxHeight The maximum height for the element (defaults to 10000)
 * @cfg {Boolean} enabled False to disable resizing (defaults to true)
 * @cfg {Boolean} wrap True to wrap an element with a div if needed (required for textareas and images, defaults to false)
 * @cfg {Number} width The width of the element in pixels (defaults to null)
 * @cfg {Number} height The height of the element in pixels (defaults to null)
 * @cfg {Boolean} animate True to animate the resize (not compatible with dynamic sizing, defaults to false)
 * @cfg {Number} duration Animation duration if animate = true (defaults to .35)
 * @cfg {Boolean} dynamic True to resize the element while dragging instead of using a proxy (defaults to false)
 * @cfg {String} handles String consisting of the resize handles to display (defaults to undefined)
 * @cfg {Boolean} multiDirectional <b>Deprecated</b>.  The old style of adding multi-direction resize handles, deprecated
 * in favor of the handles config option (defaults to false)
 * @cfg {Boolean} disableTrackOver True to disable mouse tracking. This is only applied at config time. (defaults to false)
 * @cfg {String} easing Animation easing if animate = true (defaults to 'easingOutStrong')
 * @cfg {Number} widthIncrement The increment to snap the width resize in pixels (dynamic must be true, defaults to 0)
 * @cfg {Number} heightIncrement The increment to snap the height resize in pixels (dynamic must be true, defaults to 0)
 * @cfg {Boolean} pinned True to ensure that the resize handles are always visible, false to display them only when the
 * user mouses over the resizable borders. This is only applied at config time. (defaults to false)
 * @cfg {Boolean} preserveRatio True to preserve the original ratio between height and width during resize (defaults to false)
 * @cfg {Boolean} transparent True for transparent handles. This is only applied at config time. (defaults to false)
 * @cfg {Number} minX The minimum allowed page X for the element (only used for west resizing, defaults to 0)
 * @cfg {Number} minY The minimum allowed page Y for the element (only used for north resizing, defaults to 0)
 * @cfg {Boolean} draggable Convenience to initialize drag drop (defaults to false)
 * @constructor
 * Create a new resizable component
 * @param {String/HTMLElement/Roo.Element} el The id or element to resize
 * @param {Object} config configuration options
  */
Roo.Resizable = function(el, config){
    this.el = Roo.get(el);

    if(config && config.wrap){
        config.resizeChild = this.el;
        this.el = this.el.wrap(typeof config.wrap == "object" ? config.wrap : {cls:"xresizable-wrap"});
        this.el.id = this.el.dom.id = config.resizeChild.id + "-rzwrap";
        this.el.setStyle("overflow", "hidden");
        this.el.setPositioning(config.resizeChild.getPositioning());
        config.resizeChild.clearPositioning();
        if(!config.width || !config.height){
            var csize = config.resizeChild.getSize();
            this.el.setSize(csize.width, csize.height);
        }
        if(config.pinned && !config.adjustments){
            config.adjustments = "auto";
        }
    }

    this.proxy = this.el.createProxy({tag: "div", cls: "x-resizable-proxy", id: this.el.id + "-rzproxy"});
    this.proxy.unselectable();
    this.proxy.enableDisplayMode('block');

    Roo.apply(this, config);

    if(this.pinned){
        this.disableTrackOver = true;
        this.el.addClass("x-resizable-pinned");
    }
    // if the element isn't positioned, make it relative
    var position = this.el.getStyle("position");
    if(position != "absolute" && position != "fixed"){
        this.el.setStyle("position", "relative");
    }
    if(!this.handles){ // no handles passed, must be legacy style
        this.handles = 's,e,se';
        if(this.multiDirectional){
            this.handles += ',n,w';
        }
    }
    if(this.handles == "all"){
        this.handles = "n s e w ne nw se sw";
    }
    var hs = this.handles.split(/\s*?[,;]\s*?| /);
    var ps = Roo.Resizable.positions;
    for(var i = 0, len = hs.length; i < len; i++){
        if(hs[i] && ps[hs[i]]){
            var pos = ps[hs[i]];
            this[pos] = new Roo.Resizable.Handle(this, pos, this.disableTrackOver, this.transparent);
        }
    }
    // legacy
    this.corner = this.southeast;

    if(this.handles.indexOf("n") != -1 || this.handles.indexOf("w") != -1){
        this.updateBox = true;
    }

    this.activeHandle = null;

    if(this.resizeChild){
        if(typeof this.resizeChild == "boolean"){
            this.resizeChild = Roo.get(this.el.dom.firstChild, true);
        }else{
            this.resizeChild = Roo.get(this.resizeChild, true);
        }
    }

    if(this.adjustments == "auto"){
        var rc = this.resizeChild;
        var hw = this.west, he = this.east, hn = this.north, hs = this.south;
        if(rc && (hw || hn)){
            rc.position("relative");
            rc.setLeft(hw ? hw.el.getWidth() : 0);
            rc.setTop(hn ? hn.el.getHeight() : 0);
        }
        this.adjustments = [
            (he ? -he.el.getWidth() : 0) + (hw ? -hw.el.getWidth() : 0),
            (hn ? -hn.el.getHeight() : 0) + (hs ? -hs.el.getHeight() : 0) -1
        ];
    }

    if(this.draggable){
        this.dd = this.dynamic ?
            this.el.initDD(null) : this.el.initDDProxy(null, {dragElId: this.proxy.id});
        this.dd.setHandleElId(this.resizeChild ? this.resizeChild.id : this.el.id);
    }

    // public events
    this.addEvents({
        /**
         * @event beforeresize
         * Fired before resize is allowed. Set enabled to false to cancel resize.
         * @param {Roo.Resizable} this
         * @param {Roo.EventObject} e The mousedown event
         */
        "beforeresize" : true,
        /**
         * @event resize
         * Fired after a resize.
         * @param {Roo.Resizable} this
         * @param {Number} width The new width
         * @param {Number} height The new height
         * @param {Roo.EventObject} e The mouseup event
         */
        "resize" : true
    });

    if(this.width !== null && this.height !== null){
        this.resizeTo(this.width, this.height);
    }else{
        this.updateChildSize();
    }
    if(Roo.isIE){
        this.el.dom.style.zoom = 1;
    }
    Roo.Resizable.superclass.constructor.call(this);
};

Roo.extend(Roo.Resizable, Roo.util.Observable, {
        resizeChild : false,
        adjustments : [0, 0],
        minWidth : 5,
        minHeight : 5,
        maxWidth : 10000,
        maxHeight : 10000,
        enabled : true,
        animate : false,
        duration : .35,
        dynamic : false,
        handles : false,
        multiDirectional : false,
        disableTrackOver : false,
        easing : 'easeOutStrong',
        widthIncrement : 0,
        heightIncrement : 0,
        pinned : false,
        width : null,
        height : null,
        preserveRatio : false,
        transparent: false,
        minX: 0,
        minY: 0,
        draggable: false,

        /**
         * @cfg {String/HTMLElement/Element} constrainTo Constrain the resize to a particular element
         */
        constrainTo: undefined,
        /**
         * @cfg {Roo.lib.Region} resizeRegion Constrain the resize to a particular region
         */
        resizeRegion: undefined,


    /**
     * Perform a manual resize
     * @param {Number} width
     * @param {Number} height
     */
    resizeTo : function(width, height){
        this.el.setSize(width, height);
        this.updateChildSize();
        this.fireEvent("resize", this, width, height, null);
    },

    // private
    startSizing : function(e, handle){
        this.fireEvent("beforeresize", this, e);
        if(this.enabled){ // 2nd enabled check in case disabled before beforeresize handler

            if(!this.overlay){
                this.overlay = this.el.createProxy({tag: "div", cls: "x-resizable-overlay", html: "&#160;"});
                this.overlay.unselectable();
                this.overlay.enableDisplayMode("block");
                this.overlay.on("mousemove", this.onMouseMove, this);
                this.overlay.on("mouseup", this.onMouseUp, this);
            }
            this.overlay.setStyle("cursor", handle.el.getStyle("cursor"));

            this.resizing = true;
            this.startBox = this.el.getBox();
            this.startPoint = e.getXY();
            this.offsets = [(this.startBox.x + this.startBox.width) - this.startPoint[0],
                            (this.startBox.y + this.startBox.height) - this.startPoint[1]];

            this.overlay.setSize(Roo.lib.Dom.getViewWidth(true), Roo.lib.Dom.getViewHeight(true));
            this.overlay.show();

            if(this.constrainTo) {
                var ct = Roo.get(this.constrainTo);
                this.resizeRegion = ct.getRegion().adjust(
                    ct.getFrameWidth('t'),
                    ct.getFrameWidth('l'),
                    -ct.getFrameWidth('b'),
                    -ct.getFrameWidth('r')
                );
            }

            this.proxy.setStyle('visibility', 'hidden'); // workaround display none
            this.proxy.show();
            this.proxy.setBox(this.startBox);
            if(!this.dynamic){
                this.proxy.setStyle('visibility', 'visible');
            }
        }
    },

    // private
    onMouseDown : function(handle, e){
        if(this.enabled){
            e.stopEvent();
            this.activeHandle = handle;
            this.startSizing(e, handle);
        }
    },

    // private
    onMouseUp : function(e){
        var size = this.resizeElement();
        this.resizing = false;
        this.handleOut();
        this.overlay.hide();
        this.proxy.hide();
        this.fireEvent("resize", this, size.width, size.height, e);
    },

    // private
    updateChildSize : function(){
        if(this.resizeChild){
            var el = this.el;
            var child = this.resizeChild;
            var adj = this.adjustments;
            if(el.dom.offsetWidth){
                var b = el.getSize(true);
                child.setSize(b.width+adj[0], b.height+adj[1]);
            }
            // Second call here for IE
            // The first call enables instant resizing and
            // the second call corrects scroll bars if they
            // exist
            if(Roo.isIE){
                setTimeout(function(){
                    if(el.dom.offsetWidth){
                        var b = el.getSize(true);
                        child.setSize(b.width+adj[0], b.height+adj[1]);
                    }
                }, 10);
            }
        }
    },

    // private
    snap : function(value, inc, min){
        if(!inc || !value) return value;
        var newValue = value;
        var m = value % inc;
        if(m > 0){
            if(m > (inc/2)){
                newValue = value + (inc-m);
            }else{
                newValue = value - m;
            }
        }
        return Math.max(min, newValue);
    },

    // private
    resizeElement : function(){
        var box = this.proxy.getBox();
        if(this.updateBox){
            this.el.setBox(box, false, this.animate, this.duration, null, this.easing);
        }else{
            this.el.setSize(box.width, box.height, this.animate, this.duration, null, this.easing);
        }
        this.updateChildSize();
        if(!this.dynamic){
            this.proxy.hide();
        }
        return box;
    },

    // private
    constrain : function(v, diff, m, mx){
        if(v - diff < m){
            diff = v - m;
        }else if(v - diff > mx){
            diff = mx - v;
        }
        return diff;
    },

    // private
    onMouseMove : function(e){
        if(this.enabled){
            try{// try catch so if something goes wrong the user doesn't get hung

            if(this.resizeRegion && !this.resizeRegion.contains(e.getPoint())) {
            	return;
            }

            //var curXY = this.startPoint;
            var curSize = this.curSize || this.startBox;
            var x = this.startBox.x, y = this.startBox.y;
            var ox = x, oy = y;
            var w = curSize.width, h = curSize.height;
            var ow = w, oh = h;
            var mw = this.minWidth, mh = this.minHeight;
            var mxw = this.maxWidth, mxh = this.maxHeight;
            var wi = this.widthIncrement;
            var hi = this.heightIncrement;

            var eventXY = e.getXY();
            var diffX = -(this.startPoint[0] - Math.max(this.minX, eventXY[0]));
            var diffY = -(this.startPoint[1] - Math.max(this.minY, eventXY[1]));

            var pos = this.activeHandle.position;

            switch(pos){
                case "east":
                    w += diffX;
                    w = Math.min(Math.max(mw, w), mxw);
                    break;
                case "south":
                    h += diffY;
                    h = Math.min(Math.max(mh, h), mxh);
                    break;
                case "southeast":
                    w += diffX;
                    h += diffY;
                    w = Math.min(Math.max(mw, w), mxw);
                    h = Math.min(Math.max(mh, h), mxh);
                    break;
                case "north":
                    diffY = this.constrain(h, diffY, mh, mxh);
                    y += diffY;
                    h -= diffY;
                    break;
                case "west":
                    diffX = this.constrain(w, diffX, mw, mxw);
                    x += diffX;
                    w -= diffX;
                    break;
                case "northeast":
                    w += diffX;
                    w = Math.min(Math.max(mw, w), mxw);
                    diffY = this.constrain(h, diffY, mh, mxh);
                    y += diffY;
                    h -= diffY;
                    break;
                case "northwest":
                    diffX = this.constrain(w, diffX, mw, mxw);
                    diffY = this.constrain(h, diffY, mh, mxh);
                    y += diffY;
                    h -= diffY;
                    x += diffX;
                    w -= diffX;
                    break;
               case "southwest":
                    diffX = this.constrain(w, diffX, mw, mxw);
                    h += diffY;
                    h = Math.min(Math.max(mh, h), mxh);
                    x += diffX;
                    w -= diffX;
                    break;
            }

            var sw = this.snap(w, wi, mw);
            var sh = this.snap(h, hi, mh);
            if(sw != w || sh != h){
                switch(pos){
                    case "northeast":
                        y -= sh - h;
                    break;
                    case "north":
                        y -= sh - h;
                        break;
                    case "southwest":
                        x -= sw - w;
                    break;
                    case "west":
                        x -= sw - w;
                        break;
                    case "northwest":
                        x -= sw - w;
                        y -= sh - h;
                    break;
                }
                w = sw;
                h = sh;
            }

            if(this.preserveRatio){
                switch(pos){
                    case "southeast":
                    case "east":
                        h = oh * (w/ow);
                        h = Math.min(Math.max(mh, h), mxh);
                        w = ow * (h/oh);
                       break;
                    case "south":
                        w = ow * (h/oh);
                        w = Math.min(Math.max(mw, w), mxw);
                        h = oh * (w/ow);
                        break;
                    case "northeast":
                        w = ow * (h/oh);
                        w = Math.min(Math.max(mw, w), mxw);
                        h = oh * (w/ow);
                    break;
                    case "north":
                        var tw = w;
                        w = ow * (h/oh);
                        w = Math.min(Math.max(mw, w), mxw);
                        h = oh * (w/ow);
                        x += (tw - w) / 2;
                        break;
                    case "southwest":
                        h = oh * (w/ow);
                        h = Math.min(Math.max(mh, h), mxh);
                        var tw = w;
                        w = ow * (h/oh);
                        x += tw - w;
                        break;
                    case "west":
                        var th = h;
                        h = oh * (w/ow);
                        h = Math.min(Math.max(mh, h), mxh);
                        y += (th - h) / 2;
                        var tw = w;
                        w = ow * (h/oh);
                        x += tw - w;
                       break;
                    case "northwest":
                        var tw = w;
                        var th = h;
                        h = oh * (w/ow);
                        h = Math.min(Math.max(mh, h), mxh);
                        w = ow * (h/oh);
                        y += th - h;
                         x += tw - w;
                       break;

                }
            }
            this.proxy.setBounds(x, y, w, h);
            if(this.dynamic){
                this.resizeElement();
            }
            }catch(e){}
        }
    },

    // private
    handleOver : function(){
        if(this.enabled){
            this.el.addClass("x-resizable-over");
        }
    },

    // private
    handleOut : function(){
        if(!this.resizing){
            this.el.removeClass("x-resizable-over");
        }
    },

    /**
     * Returns the element this component is bound to.
     * @return {Roo.Element}
     */
    getEl : function(){
        return this.el;
    },

    /**
     * Returns the resizeChild element (or null).
     * @return {Roo.Element}
     */
    getResizeChild : function(){
        return this.resizeChild;
    },

    /**
     * Destroys this resizable. If the element was wrapped and
     * removeEl is not true then the element remains.
     * @param {Boolean} removeEl (optional) true to remove the element from the DOM
     */
    destroy : function(removeEl){
        this.proxy.remove();
        if(this.overlay){
            this.overlay.removeAllListeners();
            this.overlay.remove();
        }
        var ps = Roo.Resizable.positions;
        for(var k in ps){
            if(typeof ps[k] != "function" && this[ps[k]]){
                var h = this[ps[k]];
                h.el.removeAllListeners();
                h.el.remove();
            }
        }
        if(removeEl){
            this.el.update("");
            this.el.remove();
        }
    }
});

// private
// hash to map config positions to true positions
Roo.Resizable.positions = {
    n: "north", s: "south", e: "east", w: "west", se: "southeast", sw: "southwest", nw: "northwest", ne: "northeast"
};

// private
Roo.Resizable.Handle = function(rz, pos, disableTrackOver, transparent){
    if(!this.tpl){
        // only initialize the template if resizable is used
        var tpl = Roo.DomHelper.createTemplate(
            {tag: "div", cls: "x-resizable-handle x-resizable-handle-{0}"}
        );
        tpl.compile();
        Roo.Resizable.Handle.prototype.tpl = tpl;
    }
    this.position = pos;
    this.rz = rz;
    this.el = this.tpl.append(rz.el.dom, [this.position], true);
    this.el.unselectable();
    if(transparent){
        this.el.setOpacity(0);
    }
    this.el.on("mousedown", this.onMouseDown, this);
    if(!disableTrackOver){
        this.el.on("mouseover", this.onMouseOver, this);
        this.el.on("mouseout", this.onMouseOut, this);
    }
};

// private
Roo.Resizable.Handle.prototype = {
    afterResize : function(rz){
        // do nothing
    },
    // private
    onMouseDown : function(e){
        this.rz.onMouseDown(this, e);
    },
    // private
    onMouseOver : function(e){
        this.rz.handleOver(this, e);
    },
    // private
    onMouseOut : function(e){
        this.rz.handleOut(this, e);
    }
};/*
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
 * @class Roo.Editor
 * @extends Roo.Component
 * A base editor field that handles displaying/hiding on demand and has some built-in sizing and event handling logic.
 * @constructor
 * Create a new Editor
 * @param {Roo.form.Field} field The Field object (or descendant)
 * @param {Object} config The config object
 */
Roo.Editor = function(field, config){
    Roo.Editor.superclass.constructor.call(this, config);
    this.field = field;
    this.addEvents({
        /**
	     * @event beforestartedit
	     * Fires when editing is initiated, but before the value changes.  Editing can be canceled by returning
	     * false from the handler of this event.
	     * @param {Editor} this
	     * @param {Roo.Element} boundEl The underlying element bound to this editor
	     * @param {Mixed} value The field value being set
	     */
        "beforestartedit" : true,
        /**
	     * @event startedit
	     * Fires when this editor is displayed
	     * @param {Roo.Element} boundEl The underlying element bound to this editor
	     * @param {Mixed} value The starting field value
	     */
        "startedit" : true,
        /**
	     * @event beforecomplete
	     * Fires after a change has been made to the field, but before the change is reflected in the underlying
	     * field.  Saving the change to the field can be canceled by returning false from the handler of this event.
	     * Note that if the value has not changed and ignoreNoChange = true, the editing will still end but this
	     * event will not fire since no edit actually occurred.
	     * @param {Editor} this
	     * @param {Mixed} value The current field value
	     * @param {Mixed} startValue The original field value
	     */
        "beforecomplete" : true,
        /**
	     * @event complete
	     * Fires after editing is complete and any changed value has been written to the underlying field.
	     * @param {Editor} this
	     * @param {Mixed} value The current field value
	     * @param {Mixed} startValue The original field value
	     */
        "complete" : true,
        /**
         * @event specialkey
         * Fires when any key related to navigation (arrows, tab, enter, esc, etc.) is pressed.  You can check
         * {@link Roo.EventObject#getKey} to determine which key was pressed.
         * @param {Roo.form.Field} this
         * @param {Roo.EventObject} e The event object
         */
        "specialkey" : true
    });
};

Roo.extend(Roo.Editor, Roo.Component, {
    /**
     * @cfg {Boolean/String} autosize
     * True for the editor to automatically adopt the size of the underlying field, "width" to adopt the width only,
     * or "height" to adopt the height only (defaults to false)
     */
    /**
     * @cfg {Boolean} revertInvalid
     * True to automatically revert the field value and cancel the edit when the user completes an edit and the field
     * validation fails (defaults to true)
     */
    /**
     * @cfg {Boolean} ignoreNoChange
     * True to skip the the edit completion process (no save, no events fired) if the user completes an edit and
     * the value has not changed (defaults to false).  Applies only to string values - edits for other data types
     * will never be ignored.
     */
    /**
     * @cfg {Boolean} hideEl
     * False to keep the bound element visible while the editor is displayed (defaults to true)
     */
    /**
     * @cfg {Mixed} value
     * The data value of the underlying field (defaults to "")
     */
    value : "",
    /**
     * @cfg {String} alignment
     * The position to align to (see {@link Roo.Element#alignTo} for more details, defaults to "c-c?").
     */
    alignment: "c-c?",
    /**
     * @cfg {Boolean/String} shadow "sides" for sides/bottom only, "frame" for 4-way shadow, and "drop"
     * for bottom-right shadow (defaults to "frame")
     */
    shadow : "frame",
    /**
     * @cfg {Boolean} constrain True to constrain the editor to the viewport
     */
    constrain : false,
    /**
     * @cfg {Boolean} completeOnEnter True to complete the edit when the enter key is pressed (defaults to false)
     */
    completeOnEnter : false,
    /**
     * @cfg {Boolean} cancelOnEsc True to cancel the edit when the escape key is pressed (defaults to false)
     */
    cancelOnEsc : false,
    /**
     * @cfg {Boolean} updateEl True to update the innerHTML of the bound element when the update completes (defaults to false)
     */
    updateEl : false,

    // private
    onRender : function(ct, position){
        this.el = new Roo.Layer({
            shadow: this.shadow,
            cls: "x-editor",
            parentEl : ct,
            shim : this.shim,
            shadowOffset:4,
            id: this.id,
            constrain: this.constrain
        });
        this.el.setStyle("overflow", Roo.isGecko ? "auto" : "hidden");
        if(this.field.msgTarget != 'title'){
            this.field.msgTarget = 'qtip';
        }
        this.field.render(this.el);
        if(Roo.isGecko){
            this.field.el.dom.setAttribute('autocomplete', 'off');
        }
        this.field.on("specialkey", this.onSpecialKey, this);
        if(this.swallowKeys){
            this.field.el.swallowEvent(['keydown','keypress']);
        }
        this.field.show();
        this.field.on("blur", this.onBlur, this);
        if(this.field.grow){
            this.field.on("autosize", this.el.sync,  this.el, {delay:1});
        }
    },

    onSpecialKey : function(field, e){
        if(this.completeOnEnter && e.getKey() == e.ENTER){
            e.stopEvent();
            this.completeEdit();
        }else if(this.cancelOnEsc && e.getKey() == e.ESC){
            this.cancelEdit();
        }else{
            this.fireEvent('specialkey', field, e);
        }
    },

    /**
     * Starts the editing process and shows the editor.
     * @param {String/HTMLElement/Element} el The element to edit
     * @param {String} value (optional) A value to initialize the editor with. If a value is not provided, it defaults
      * to the innerHTML of el.
     */
    startEdit : function(el, value){
        if(this.editing){
            this.completeEdit();
        }
        this.boundEl = Roo.get(el);
        var v = value !== undefined ? value : this.boundEl.dom.innerHTML;
        if(!this.rendered){
            this.render(this.parentEl || document.body);
        }
        if(this.fireEvent("beforestartedit", this, this.boundEl, v) === false){
            return;
        }
        this.startValue = v;
        this.field.setValue(v);
        if(this.autoSize){
            var sz = this.boundEl.getSize();
            switch(this.autoSize){
                case "width":
                this.setSize(sz.width,  "");
                break;
                case "height":
                this.setSize("",  sz.height);
                break;
                default:
                this.setSize(sz.width,  sz.height);
            }
        }
        this.el.alignTo(this.boundEl, this.alignment);
        this.editing = true;
        if(Roo.QuickTips){
            Roo.QuickTips.disable();
        }
        this.show();
    },

    /**
     * Sets the height and width of this editor.
     * @param {Number} width The new width
     * @param {Number} height The new height
     */
    setSize : function(w, h){
        this.field.setSize(w, h);
        if(this.el){
            this.el.sync();
        }
    },

    /**
     * Realigns the editor to the bound field based on the current alignment config value.
     */
    realign : function(){
        this.el.alignTo(this.boundEl, this.alignment);
    },

    /**
     * Ends the editing process, persists the changed value to the underlying field, and hides the editor.
     * @param {Boolean} remainVisible Override the default behavior and keep the editor visible after edit (defaults to false)
     */
    completeEdit : function(remainVisible){
        if(!this.editing){
            return;
        }
        var v = this.getValue();
        if(this.revertInvalid !== false && !this.field.isValid()){
            v = this.startValue;
            this.cancelEdit(true);
        }
        if(String(v) === String(this.startValue) && this.ignoreNoChange){
            this.editing = false;
            this.hide();
            return;
        }
        if(this.fireEvent("beforecomplete", this, v, this.startValue) !== false){
            this.editing = false;
            if(this.updateEl && this.boundEl){
                this.boundEl.update(v);
            }
            if(remainVisible !== true){
                this.hide();
            }
            this.fireEvent("complete", this, v, this.startValue);
        }
    },

    // private
    onShow : function(){
        this.el.show();
        if(this.hideEl !== false){
            this.boundEl.hide();
        }
        this.field.show();
        if(Roo.isIE && !this.fixIEFocus){ // IE has problems with focusing the first time
            this.fixIEFocus = true;
            this.deferredFocus.defer(50, this);
        }else{
            this.field.focus();
        }
        this.fireEvent("startedit", this.boundEl, this.startValue);
    },

    deferredFocus : function(){
        if(this.editing){
            this.field.focus();
        }
    },

    /**
     * Cancels the editing process and hides the editor without persisting any changes.  The field value will be
     * reverted to the original starting value.
     * @param {Boolean} remainVisible Override the default behavior and keep the editor visible after
     * cancel (defaults to false)
     */
    cancelEdit : function(remainVisible){
        if(this.editing){
            this.setValue(this.startValue);
            if(remainVisible !== true){
                this.hide();
            }
        }
    },

    // private
    onBlur : function(){
        if(this.allowBlur !== true && this.editing){
            this.completeEdit();
        }
    },

    // private
    onHide : function(){
        if(this.editing){
            this.completeEdit();
            return;
        }
        this.field.blur();
        if(this.field.collapse){
            this.field.collapse();
        }
        this.el.hide();
        if(this.hideEl !== false){
            this.boundEl.show();
        }
        if(Roo.QuickTips){
            Roo.QuickTips.enable();
        }
    },

    /**
     * Sets the data value of the editor
     * @param {Mixed} value Any valid value supported by the underlying field
     */
    setValue : function(v){
        this.field.setValue(v);
    },

    /**
     * Gets the data value of the editor
     * @return {Mixed} The data value
     */
    getValue : function(){
        return this.field.getValue();
    }
});/*
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
 * @class Roo.BasicDialog
 * @extends Roo.util.Observable
 * Lightweight Dialog Class.  The code below shows the creation of a typical dialog using existing HTML markup:
 * <pre><code>
var dlg = new Roo.BasicDialog("my-dlg", {
    height: 200,
    width: 300,
    minHeight: 100,
    minWidth: 150,
    modal: true,
    proxyDrag: true,
    shadow: true
});
dlg.addKeyListener(27, dlg.hide, dlg); // ESC can also close the dialog
dlg.addButton('OK', dlg.hide, dlg);    // Could call a save function instead of hiding
dlg.addButton('Cancel', dlg.hide, dlg);
dlg.show();
</code></pre>
  <b>A Dialog should always be a direct child of the body element.</b>
 * @cfg {Boolean/DomHelper} autoCreate True to auto create from scratch, or using a DomHelper Object (defaults to false)
 * @cfg {String} title Default text to display in the title bar (defaults to null)
 * @cfg {Number} width Width of the dialog in pixels (can also be set via CSS).  Determined by browser if unspecified.
 * @cfg {Number} height Height of the dialog in pixels (can also be set via CSS).  Determined by browser if unspecified.
 * @cfg {Number} x The default left page coordinate of the dialog (defaults to center screen)
 * @cfg {Number} y The default top page coordinate of the dialog (defaults to center screen)
 * @cfg {String/Element} animateTarget Id or element from which the dialog should animate while opening
 * (defaults to null with no animation)
 * @cfg {Boolean} resizable False to disable manual dialog resizing (defaults to true)
 * @cfg {String} resizeHandles Which resize handles to display - see the {@link Roo.Resizable} handles config
 * property for valid values (defaults to 'all')
 * @cfg {Number} minHeight The minimum allowable height for a resizable dialog (defaults to 80)
 * @cfg {Number} minWidth The minimum allowable width for a resizable dialog (defaults to 200)
 * @cfg {Boolean} modal True to show the dialog modally, preventing user interaction with the rest of the page (defaults to false)
 * @cfg {Boolean} autoScroll True to allow the dialog body contents to overflow and display scrollbars (defaults to false)
 * @cfg {Boolean} closable False to remove the built-in top-right corner close button (defaults to true)
 * @cfg {Boolean} collapsible False to remove the built-in top-right corner collapse button (defaults to true)
 * @cfg {Boolean} constraintoviewport True to keep the dialog constrained within the visible viewport boundaries (defaults to true)
 * @cfg {Boolean} syncHeightBeforeShow True to cause the dimensions to be recalculated before the dialog is shown (defaults to false)
 * @cfg {Boolean} draggable False to disable dragging of the dialog within the viewport (defaults to true)
 * @cfg {Boolean} autoTabs If true, all elements with class 'x-dlg-tab' will get automatically converted to tabs (defaults to false)
 * @cfg {String} tabTag The tag name of tab elements, used when autoTabs = true (defaults to 'div')
 * @cfg {Boolean} proxyDrag True to drag a lightweight proxy element rather than the dialog itself, used when
 * draggable = true (defaults to false)
 * @cfg {Boolean} fixedcenter True to ensure that anytime the dialog is shown or resized it gets centered (defaults to false)
 * @cfg {Boolean/String} shadow True or "sides" for the default effect, "frame" for 4-way shadow, and "drop" for bottom-right
 * shadow (defaults to false)
 * @cfg {Number} shadowOffset The number of pixels to offset the shadow if displayed (defaults to 5)
 * @cfg {String} buttonAlign Valid values are "left," "center" and "right" (defaults to "right")
 * @cfg {Number} minButtonWidth Minimum width of all dialog buttons (defaults to 75)
 * @cfg {Array} buttons Array of buttons
 * @cfg {Boolean} shim True to create an iframe shim that prevents selects from showing through (defaults to false)
 * @constructor
 * Create a new BasicDialog.
 * @param {String/HTMLElement/Roo.Element} el The container element or DOM node, or its id
 * @param {Object} config Configuration options
 */
Roo.BasicDialog = function(el, config){
    this.el = Roo.get(el);
    var dh = Roo.DomHelper;
    if(!this.el && config && config.autoCreate){
        if(typeof config.autoCreate == "object"){
            if(!config.autoCreate.id){
                config.autoCreate.id = el;
            }
            this.el = dh.append(document.body,
                        config.autoCreate, true);
        }else{
            this.el = dh.append(document.body,
                        {tag: "div", id: el, style:'visibility:hidden;'}, true);
        }
    }
    el = this.el;
    el.setDisplayed(true);
    el.hide = this.hideAction;
    this.id = el.id;
    el.addClass("x-dlg");

    Roo.apply(this, config);

    this.proxy = el.createProxy("x-dlg-proxy");
    this.proxy.hide = this.hideAction;
    this.proxy.setOpacity(.5);
    this.proxy.hide();

    if(config.width){
        el.setWidth(config.width);
    }
    if(config.height){
        el.setHeight(config.height);
    }
    this.size = el.getSize();
    if(typeof config.x != "undefined" && typeof config.y != "undefined"){
        this.xy = [config.x,config.y];
    }else{
        this.xy = el.getCenterXY(true);
    }
    /** The header element @type Roo.Element */
    this.header = el.child("> .x-dlg-hd");
    /** The body element @type Roo.Element */
    this.body = el.child("> .x-dlg-bd");
    /** The footer element @type Roo.Element */
    this.footer = el.child("> .x-dlg-ft");

    if(!this.header){
        this.header = el.createChild({tag: "div", cls:"x-dlg-hd", html: "&#160;"}, this.body ? this.body.dom : null);
    }
    if(!this.body){
        this.body = el.createChild({tag: "div", cls:"x-dlg-bd"});
    }

    this.header.unselectable();
    if(this.title){
        this.header.update(this.title);
    }
    // this element allows the dialog to be focused for keyboard event
    this.focusEl = el.createChild({tag: "a", href:"#", cls:"x-dlg-focus", tabIndex:"-1"});
    this.focusEl.swallowEvent("click", true);

    this.header.wrap({cls:"x-dlg-hd-right"}).wrap({cls:"x-dlg-hd-left"}, true);

    // wrap the body and footer for special rendering
    this.bwrap = this.body.wrap({tag: "div", cls:"x-dlg-dlg-body"});
    if(this.footer){
        this.bwrap.dom.appendChild(this.footer.dom);
    }

    this.bg = this.el.createChild({
        tag: "div", cls:"x-dlg-bg",
        html: '<div class="x-dlg-bg-left"><div class="x-dlg-bg-right"><div class="x-dlg-bg-center">&#160;</div></div></div>'
    });
    this.centerBg = this.bg.child("div.x-dlg-bg-center");


    if(this.autoScroll !== false && !this.autoTabs){
        this.body.setStyle("overflow", "auto");
    }

    this.toolbox = this.el.createChild({cls: "x-dlg-toolbox"});

    if(this.closable !== false){
        this.el.addClass("x-dlg-closable");
        this.close = this.toolbox.createChild({cls:"x-dlg-close"});
        this.close.on("click", this.closeClick, this);
        this.close.addClassOnOver("x-dlg-close-over");
    }
    if(this.collapsible !== false){
        this.collapseBtn = this.toolbox.createChild({cls:"x-dlg-collapse"});
        this.collapseBtn.on("click", this.collapseClick, this);
        this.collapseBtn.addClassOnOver("x-dlg-collapse-over");
        this.header.on("dblclick", this.collapseClick, this);
    }
    if(this.resizable !== false){
        this.el.addClass("x-dlg-resizable");
        this.resizer = new Roo.Resizable(el, {
            minWidth: this.minWidth || 80,
            minHeight:this.minHeight || 80,
            handles: this.resizeHandles || "all",
            pinned: true
        });
        this.resizer.on("beforeresize", this.beforeResize, this);
        this.resizer.on("resize", this.onResize, this);
    }
    if(this.draggable !== false){
        el.addClass("x-dlg-draggable");
        if (!this.proxyDrag) {
            var dd = new Roo.dd.DD(el.dom.id, "WindowDrag");
        }
        else {
            var dd = new Roo.dd.DDProxy(el.dom.id, "WindowDrag", {dragElId: this.proxy.id});
        }
        dd.setHandleElId(this.header.id);
        dd.endDrag = this.endMove.createDelegate(this);
        dd.startDrag = this.startMove.createDelegate(this);
        dd.onDrag = this.onDrag.createDelegate(this);
        dd.scroll = false;
        this.dd = dd;
    }
    if(this.modal){
        this.mask = dh.append(document.body, {tag: "div", cls:"x-dlg-mask"}, true);
        this.mask.enableDisplayMode("block");
        this.mask.hide();
        this.el.addClass("x-dlg-modal");
    }
    if(this.shadow){
        this.shadow = new Roo.Shadow({
            mode : typeof this.shadow == "string" ? this.shadow : "sides",
            offset : this.shadowOffset
        });
    }else{
        this.shadowOffset = 0;
    }
    if(Roo.useShims && this.shim !== false){
        this.shim = this.el.createShim();
        this.shim.hide = this.hideAction;
        this.shim.hide();
    }else{
        this.shim = false;
    }
    if(this.autoTabs){
        this.initTabs();
    }
    if (this.buttons) { 
        var bts= this.buttons;
        this.buttons = [];
        Roo.each(bts, function(b) {
            this.addButton(b);
        }, this);
    }
    
    
    this.addEvents({
        /**
         * @event keydown
         * Fires when a key is pressed
         * @param {Roo.BasicDialog} this
         * @param {Roo.EventObject} e
         */
        "keydown" : true,
        /**
         * @event move
         * Fires when this dialog is moved by the user.
         * @param {Roo.BasicDialog} this
         * @param {Number} x The new page X
         * @param {Number} y The new page Y
         */
        "move" : true,
        /**
         * @event resize
         * Fires when this dialog is resized by the user.
         * @param {Roo.BasicDialog} this
         * @param {Number} width The new width
         * @param {Number} height The new height
         */
        "resize" : true,
        /**
         * @event beforehide
         * Fires before this dialog is hidden.
         * @param {Roo.BasicDialog} this
         */
        "beforehide" : true,
        /**
         * @event hide
         * Fires when this dialog is hidden.
         * @param {Roo.BasicDialog} this
         */
        "hide" : true,
        /**
         * @event beforeshow
         * Fires before this dialog is shown.
         * @param {Roo.BasicDialog} this
         */
        "beforeshow" : true,
        /**
         * @event show
         * Fires when this dialog is shown.
         * @param {Roo.BasicDialog} this
         */
        "show" : true
    });
    el.on("keydown", this.onKeyDown, this);
    el.on("mousedown", this.toFront, this);
    Roo.EventManager.onWindowResize(this.adjustViewport, this, true);
    this.el.hide();
    Roo.DialogManager.register(this);
    Roo.BasicDialog.superclass.constructor.call(this);
};

Roo.extend(Roo.BasicDialog, Roo.util.Observable, {
    shadowOffset: Roo.isIE ? 6 : 5,
    minHeight: 80,
    minWidth: 200,
    minButtonWidth: 75,
    defaultButton: null,
    buttonAlign: "right",
    tabTag: 'div',
    firstShow: true,

    /**
     * Sets the dialog title text
     * @param {String} text The title text to display
     * @return {Roo.BasicDialog} this
     */
    setTitle : function(text){
        this.header.update(text);
        return this;
    },

    // private
    closeClick : function(){
        this.hide();
    },

    // private
    collapseClick : function(){
        this[this.collapsed ? "expand" : "collapse"]();
    },

    /**
     * Collapses the dialog to its minimized state (only the title bar is visible).
     * Equivalent to the user clicking the collapse dialog button.
     */
    collapse : function(){
        if(!this.collapsed){
            this.collapsed = true;
            this.el.addClass("x-dlg-collapsed");
            this.restoreHeight = this.el.getHeight();
            this.resizeTo(this.el.getWidth(), this.header.getHeight());
        }
    },

    /**
     * Expands a collapsed dialog back to its normal state.  Equivalent to the user
     * clicking the expand dialog button.
     */
    expand : function(){
        if(this.collapsed){
            this.collapsed = false;
            this.el.removeClass("x-dlg-collapsed");
            this.resizeTo(this.el.getWidth(), this.restoreHeight);
        }
    },

    /**
     * Reinitializes the tabs component, clearing out old tabs and finding new ones.
     * @return {Roo.TabPanel} The tabs component
     */
    initTabs : function(){
        var tabs = this.getTabs();
        while(tabs.getTab(0)){
            tabs.removeTab(0);
        }
        this.el.select(this.tabTag+'.x-dlg-tab').each(function(el){
            var dom = el.dom;
            tabs.addTab(Roo.id(dom), dom.title);
            dom.title = "";
        });
        tabs.activate(0);
        return tabs;
    },

    // private
    beforeResize : function(){
        this.resizer.minHeight = Math.max(this.minHeight, this.getHeaderFooterHeight(true)+40);
    },

    // private
    onResize : function(){
        this.refreshSize();
        this.syncBodyHeight();
        this.adjustAssets();
        this.focus();
        this.fireEvent("resize", this, this.size.width, this.size.height);
    },

    // private
    onKeyDown : function(e){
        if(this.isVisible()){
            this.fireEvent("keydown", this, e);
        }
    },

    /**
     * Resizes the dialog.
     * @param {Number} width
     * @param {Number} height
     * @return {Roo.BasicDialog} this
     */
    resizeTo : function(width, height){
        this.el.setSize(width, height);
        this.size = {width: width, height: height};
        this.syncBodyHeight();
        if(this.fixedcenter){
            this.center();
        }
        if(this.isVisible()){
            this.constrainXY();
            this.adjustAssets();
        }
        this.fireEvent("resize", this, width, height);
        return this;
    },


    /**
     * Resizes the dialog to fit the specified content size.
     * @param {Number} width
     * @param {Number} height
     * @return {Roo.BasicDialog} this
     */
    setContentSize : function(w, h){
        h += this.getHeaderFooterHeight() + this.body.getMargins("tb");
        w += this.body.getMargins("lr") + this.bwrap.getMargins("lr") + this.centerBg.getPadding("lr");
        //if(!this.el.isBorderBox()){
            h +=  this.body.getPadding("tb") + this.bwrap.getBorderWidth("tb") + this.body.getBorderWidth("tb") + this.el.getBorderWidth("tb");
            w += this.body.getPadding("lr") + this.bwrap.getBorderWidth("lr") + this.body.getBorderWidth("lr") + this.bwrap.getPadding("lr") + this.el.getBorderWidth("lr");
        //}
        if(this.tabs){
            h += this.tabs.stripWrap.getHeight() + this.tabs.bodyEl.getMargins("tb") + this.tabs.bodyEl.getPadding("tb");
            w += this.tabs.bodyEl.getMargins("lr") + this.tabs.bodyEl.getPadding("lr");
        }
        this.resizeTo(w, h);
        return this;
    },

    /**
     * Adds a key listener for when this dialog is displayed.  This allows you to hook in a function that will be
     * executed in response to a particular key being pressed while the dialog is active.
     * @param {Number/Array/Object} key Either the numeric key code, array of key codes or an object with the following options:
     *                                  {key: (number or array), shift: (true/false), ctrl: (true/false), alt: (true/false)}
     * @param {Function} fn The function to call
     * @param {Object} scope (optional) The scope of the function
     * @return {Roo.BasicDialog} this
     */
    addKeyListener : function(key, fn, scope){
        var keyCode, shift, ctrl, alt;
        if(typeof key == "object" && !(key instanceof Array)){
            keyCode = key["key"];
            shift = key["shift"];
            ctrl = key["ctrl"];
            alt = key["alt"];
        }else{
            keyCode = key;
        }
        var handler = function(dlg, e){
            if((!shift || e.shiftKey) && (!ctrl || e.ctrlKey) &&  (!alt || e.altKey)){
                var k = e.getKey();
                if(keyCode instanceof Array){
                    for(var i = 0, len = keyCode.length; i < len; i++){
                        if(keyCode[i] == k){
                          fn.call(scope || window, dlg, k, e);
                          return;
                        }
                    }
                }else{
                    if(k == keyCode){
                        fn.call(scope || window, dlg, k, e);
                    }
                }
            }
        };
        this.on("keydown", handler);
        return this;
    },

    /**
     * Returns the TabPanel component (creates it if it doesn't exist).
     * Note: If you wish to simply check for the existence of tabs without creating them,
     * check for a null 'tabs' property.
     * @return {Roo.TabPanel} The tabs component
     */
    getTabs : function(){
        if(!this.tabs){
            this.el.addClass("x-dlg-auto-tabs");
            this.body.addClass(this.tabPosition == "bottom" ? "x-tabs-bottom" : "x-tabs-top");
            this.tabs = new Roo.TabPanel(this.body.dom, this.tabPosition == "bottom");
        }
        return this.tabs;
    },

    /**
     * Adds a button to the footer section of the dialog.
     * @param {String/Object} config A string becomes the button text, an object can either be a Button config
     * object or a valid Roo.DomHelper element config
     * @param {Function} handler The function called when the button is clicked
     * @param {Object} scope (optional) The scope of the handler function (accepts position as a property)
     * @return {Roo.Button} The new button
     */
    addButton : function(config, handler, scope){
        var dh = Roo.DomHelper;
        if(!this.footer){
            this.footer = dh.append(this.bwrap, {tag: "div", cls:"x-dlg-ft"}, true);
        }
        if(!this.btnContainer){
            var tb = this.footer.createChild({

                cls:"x-dlg-btns x-dlg-btns-"+this.buttonAlign,
                html:'<table cellspacing="0"><tbody><tr></tr></tbody></table><div class="x-clear"></div>'
            }, null, true);
            this.btnContainer = tb.firstChild.firstChild.firstChild;
        }
        var bconfig = {
            handler: handler,
            scope: scope,
            minWidth: this.minButtonWidth,
            hideParent:true
        };
        if(typeof config == "string"){
            bconfig.text = config;
        }else{
            if(config.tag){
                bconfig.dhconfig = config;
            }else{
                Roo.apply(bconfig, config);
            }
        }
        var fc = false;
        if ((typeof(bconfig.position) != 'undefined') && bconfig.position < this.btnContainer.childNodes.length-1) {
            bconfig.position = Math.max(0, bconfig.position);
            fc = this.btnContainer.childNodes[bconfig.position];
        }
         
        var btn = new Roo.Button(
            fc ? 
                this.btnContainer.insertBefore(document.createElement("td"),fc)
                : this.btnContainer.appendChild(document.createElement("td")),
            //Roo.get(this.btnContainer).createChild( { tag: 'td'},  fc ),
            bconfig
        );
        this.syncBodyHeight();
        if(!this.buttons){
            /**
             * Array of all the buttons that have been added to this dialog via addButton
             * @type Array
             */
            this.buttons = [];
        }
        this.buttons.push(btn);
        return btn;
    },

    /**
     * Sets the default button to be focused when the dialog is displayed.
     * @param {Roo.BasicDialog.Button} btn The button object returned by {@link #addButton}
     * @return {Roo.BasicDialog} this
     */
    setDefaultButton : function(btn){
        this.defaultButton = btn;
        return this;
    },

    // private
    getHeaderFooterHeight : function(safe){
        var height = 0;
        if(this.header){
           height += this.header.getHeight();
        }
        if(this.footer){
           var fm = this.footer.getMargins();
            height += (this.footer.getHeight()+fm.top+fm.bottom);
        }
        height += this.bwrap.getPadding("tb")+this.bwrap.getBorderWidth("tb");
        height += this.centerBg.getPadding("tb");
        return height;
    },

    // private
    syncBodyHeight : function(){
        var bd = this.body, cb = this.centerBg, bw = this.bwrap;
        var height = this.size.height - this.getHeaderFooterHeight(false);
        bd.setHeight(height-bd.getMargins("tb"));
        var hh = this.header.getHeight();
        var h = this.size.height-hh;
        cb.setHeight(h);
        bw.setLeftTop(cb.getPadding("l"), hh+cb.getPadding("t"));
        bw.setHeight(h-cb.getPadding("tb"));
        bw.setWidth(this.el.getWidth(true)-cb.getPadding("lr"));
        bd.setWidth(bw.getWidth(true));
        if(this.tabs){
            this.tabs.syncHeight();
            if(Roo.isIE){
                this.tabs.el.repaint();
            }
        }
    },

    /**
     * Restores the previous state of the dialog if Roo.state is configured.
     * @return {Roo.BasicDialog} this
     */
    restoreState : function(){
        var box = Roo.state.Manager.get(this.stateId || (this.el.id + "-state"));
        if(box && box.width){
            this.xy = [box.x, box.y];
            this.resizeTo(box.width, box.height);
        }
        return this;
    },

    // private
    beforeShow : function(){
        this.expand();
        if(this.fixedcenter){
            this.xy = this.el.getCenterXY(true);
        }
        if(this.modal){
            Roo.get(document.body).addClass("x-body-masked");
            this.mask.setSize(Roo.lib.Dom.getViewWidth(true), Roo.lib.Dom.getViewHeight(true));
            this.mask.show();
        }
        this.constrainXY();
    },

    // private
    animShow : function(){
        var b = Roo.get(this.animateTarget, true).getBox();
        this.proxy.setSize(b.width, b.height);
        this.proxy.setLocation(b.x, b.y);
        this.proxy.show();
        this.proxy.setBounds(this.xy[0], this.xy[1], this.size.width, this.size.height,
                    true, .35, this.showEl.createDelegate(this));
    },

    /**
     * Shows the dialog.
     * @param {String/HTMLElement/Roo.Element} animateTarget (optional) Reset the animation target
     * @return {Roo.BasicDialog} this
     */
    show : function(animateTarget){
        if (this.fireEvent("beforeshow", this) === false){
            return;
        }
        if(this.syncHeightBeforeShow){
            this.syncBodyHeight();
        }else if(this.firstShow){
            this.firstShow = false;
            this.syncBodyHeight(); // sync the height on the first show instead of in the constructor
        }
        this.animateTarget = animateTarget || this.animateTarget;
        if(!this.el.isVisible()){
            this.beforeShow();
            if(this.animateTarget){
                this.animShow();
            }else{
                this.showEl();
            }
        }
        return this;
    },

    // private
    showEl : function(){
        this.proxy.hide();
        this.el.setXY(this.xy);
        this.el.show();
        this.adjustAssets(true);
        this.toFront();
        this.focus();
        // IE peekaboo bug - fix found by Dave Fenwick
        if(Roo.isIE){
            this.el.repaint();
        }
        this.fireEvent("show", this);
    },

    /**
     * Focuses the dialog.  If a defaultButton is set, it will receive focus, otherwise the
     * dialog itself will receive focus.
     */
    focus : function(){
        if(this.defaultButton){
            this.defaultButton.focus();
        }else{
            this.focusEl.focus();
        }
    },

    // private
    constrainXY : function(){
        if(this.constraintoviewport !== false){
            if(!this.viewSize){
                if(this.container){
                    var s = this.container.getSize();
                    this.viewSize = [s.width, s.height];
                }else{
                    this.viewSize = [Roo.lib.Dom.getViewWidth(),Roo.lib.Dom.getViewHeight()];
                }
            }
            var s = Roo.get(this.container||document).getScroll();

            var x = this.xy[0], y = this.xy[1];
            var w = this.size.width, h = this.size.height;
            var vw = this.viewSize[0], vh = this.viewSize[1];
            // only move it if it needs it
            var moved = false;
            // first validate right/bottom
            if(x + w > vw+s.left){
                x = vw - w;
                moved = true;
            }
            if(y + h > vh+s.top){
                y = vh - h;
                moved = true;
            }
            // then make sure top/left isn't negative
            if(x < s.left){
                x = s.left;
                moved = true;
            }
            if(y < s.top){
                y = s.top;
                moved = true;
            }
            if(moved){
                // cache xy
                this.xy = [x, y];
                if(this.isVisible()){
                    this.el.setLocation(x, y);
                    this.adjustAssets();
                }
            }
        }
    },

    // private
    onDrag : function(){
        if(!this.proxyDrag){
            this.xy = this.el.getXY();
            this.adjustAssets();
        }
    },

    // private
    adjustAssets : function(doShow){
        var x = this.xy[0], y = this.xy[1];
        var w = this.size.width, h = this.size.height;
        if(doShow === true){
            if(this.shadow){
                this.shadow.show(this.el);
            }
            if(this.shim){
                this.shim.show();
            }
        }
        if(this.shadow && this.shadow.isVisible()){
            this.shadow.show(this.el);
        }
        if(this.shim && this.shim.isVisible()){
            this.shim.setBounds(x, y, w, h);
        }
    },

    // private
    adjustViewport : function(w, h){
        if(!w || !h){
            w = Roo.lib.Dom.getViewWidth();
            h = Roo.lib.Dom.getViewHeight();
        }
        // cache the size
        this.viewSize = [w, h];
        if(this.modal && this.mask.isVisible()){
            this.mask.setSize(w, h); // first make sure the mask isn't causing overflow
            this.mask.setSize(Roo.lib.Dom.getViewWidth(true), Roo.lib.Dom.getViewHeight(true));
        }
        if(this.isVisible()){
            this.constrainXY();
        }
    },

    /**
     * Destroys this dialog and all its supporting elements (including any tabs, shim,
     * shadow, proxy, mask, etc.)  Also removes all event listeners.
     * @param {Boolean} removeEl (optional) true to remove the element from the DOM
     */
    destroy : function(removeEl){
        if(this.isVisible()){
            this.animateTarget = null;
            this.hide();
        }
        Roo.EventManager.removeResizeListener(this.adjustViewport, this);
        if(this.tabs){
            this.tabs.destroy(removeEl);
        }
        Roo.destroy(
             this.shim,
             this.proxy,
             this.resizer,
             this.close,
             this.mask
        );
        if(this.dd){
            this.dd.unreg();
        }
        if(this.buttons){
           for(var i = 0, len = this.buttons.length; i < len; i++){
               this.buttons[i].destroy();
           }
        }
        this.el.removeAllListeners();
        if(removeEl === true){
            this.el.update("");
            this.el.remove();
        }
        Roo.DialogManager.unregister(this);
    },

    // private
    startMove : function(){
        if(this.proxyDrag){
            this.proxy.show();
        }
        if(this.constraintoviewport !== false){
            this.dd.constrainTo(document.body, {right: this.shadowOffset, bottom: this.shadowOffset});
        }
    },

    // private
    endMove : function(){
        if(!this.proxyDrag){
            Roo.dd.DD.prototype.endDrag.apply(this.dd, arguments);
        }else{
            Roo.dd.DDProxy.prototype.endDrag.apply(this.dd, arguments);
            this.proxy.hide();
        }
        this.refreshSize();
        this.adjustAssets();
        this.focus();
        this.fireEvent("move", this, this.xy[0], this.xy[1]);
    },

    /**
     * Brings this dialog to the front of any other visible dialogs
     * @return {Roo.BasicDialog} this
     */
    toFront : function(){
        Roo.DialogManager.bringToFront(this);
        return this;
    },

    /**
     * Sends this dialog to the back (under) of any other visible dialogs
     * @return {Roo.BasicDialog} this
     */
    toBack : function(){
        Roo.DialogManager.sendToBack(this);
        return this;
    },

    /**
     * Centers this dialog in the viewport
     * @return {Roo.BasicDialog} this
     */
    center : function(){
        var xy = this.el.getCenterXY(true);
        this.moveTo(xy[0], xy[1]);
        return this;
    },

    /**
     * Moves the dialog's top-left corner to the specified point
     * @param {Number} x
     * @param {Number} y
     * @return {Roo.BasicDialog} this
     */
    moveTo : function(x, y){
        this.xy = [x,y];
        if(this.isVisible()){
            this.el.setXY(this.xy);
            this.adjustAssets();
        }
        return this;
    },

    /**
     * Aligns the dialog to the specified element
     * @param {String/HTMLElement/Roo.Element} element The element to align to.
     * @param {String} position The position to align to (see {@link Roo.Element#alignTo} for more details).
     * @param {Array} offsets (optional) Offset the positioning by [x, y]
     * @return {Roo.BasicDialog} this
     */
    alignTo : function(element, position, offsets){
        this.xy = this.el.getAlignToXY(element, position, offsets);
        if(this.isVisible()){
            this.el.setXY(this.xy);
            this.adjustAssets();
        }
        return this;
    },

    /**
     * Anchors an element to another element and realigns it when the window is resized.
     * @param {String/HTMLElement/Roo.Element} element The element to align to.
     * @param {String} position The position to align to (see {@link Roo.Element#alignTo} for more details)
     * @param {Array} offsets (optional) Offset the positioning by [x, y]
     * @param {Boolean/Number} monitorScroll (optional) true to monitor body scroll and reposition. If this parameter
     * is a number, it is used as the buffer delay (defaults to 50ms).
     * @return {Roo.BasicDialog} this
     */
    anchorTo : function(el, alignment, offsets, monitorScroll){
        var action = function(){
            this.alignTo(el, alignment, offsets);
        };
        Roo.EventManager.onWindowResize(action, this);
        var tm = typeof monitorScroll;
        if(tm != 'undefined'){
            Roo.EventManager.on(window, 'scroll', action, this,
                {buffer: tm == 'number' ? monitorScroll : 50});
        }
        action.call(this);
        return this;
    },

    /**
     * Returns true if the dialog is visible
     * @return {Boolean}
     */
    isVisible : function(){
        return this.el.isVisible();
    },

    // private
    animHide : function(callback){
        var b = Roo.get(this.animateTarget).getBox();
        this.proxy.show();
        this.proxy.setBounds(this.xy[0], this.xy[1], this.size.width, this.size.height);
        this.el.hide();
        this.proxy.setBounds(b.x, b.y, b.width, b.height, true, .35,
                    this.hideEl.createDelegate(this, [callback]));
    },

    /**
     * Hides the dialog.
     * @param {Function} callback (optional) Function to call when the dialog is hidden
     * @return {Roo.BasicDialog} this
     */
    hide : function(callback){
        if (this.fireEvent("beforehide", this) === false){
            return;
        }
        if(this.shadow){
            this.shadow.hide();
        }
        if(this.shim) {
          this.shim.hide();
        }
        if(this.animateTarget){
           this.animHide(callback);
        }else{
            this.el.hide();
            this.hideEl(callback);
        }
        return this;
    },

    // private
    hideEl : function(callback){
        this.proxy.hide();
        if(this.modal){
            this.mask.hide();
            Roo.get(document.body).removeClass("x-body-masked");
        }
        this.fireEvent("hide", this);
        if(typeof callback == "function"){
            callback();
        }
    },

    // private
    hideAction : function(){
        this.setLeft("-10000px");
        this.setTop("-10000px");
        this.setStyle("visibility", "hidden");
    },

    // private
    refreshSize : function(){
        this.size = this.el.getSize();
        this.xy = this.el.getXY();
        Roo.state.Manager.set(this.stateId || this.el.id + "-state", this.el.getBox());
    },

    // private
    // z-index is managed by the DialogManager and may be overwritten at any time
    setZIndex : function(index){
        if(this.modal){
            this.mask.setStyle("z-index", index);
        }
        if(this.shim){
            this.shim.setStyle("z-index", ++index);
        }
        if(this.shadow){
            this.shadow.setZIndex(++index);
        }
        this.el.setStyle("z-index", ++index);
        if(this.proxy){
            this.proxy.setStyle("z-index", ++index);
        }
        if(this.resizer){
            this.resizer.proxy.setStyle("z-index", ++index);
        }

        this.lastZIndex = index;
    },

    /**
     * Returns the element for this dialog
     * @return {Roo.Element} The underlying dialog Element
     */
    getEl : function(){
        return this.el;
    }
});

/**
 * @class Roo.DialogManager
 * Provides global access to BasicDialogs that have been created and
 * support for z-indexing (layering) multiple open dialogs.
 */
Roo.DialogManager = function(){
    var list = {};
    var accessList = [];
    var front = null;

    // private
    var sortDialogs = function(d1, d2){
        return (!d1._lastAccess || d1._lastAccess < d2._lastAccess) ? -1 : 1;
    };

    // private
    var orderDialogs = function(){
        accessList.sort(sortDialogs);
        var seed = Roo.DialogManager.zseed;
        for(var i = 0, len = accessList.length; i < len; i++){
            var dlg = accessList[i];
            if(dlg){
                dlg.setZIndex(seed + (i*10));
            }
        }
    };

    return {
        /**
         * The starting z-index for BasicDialogs (defaults to 9000)
         * @type Number The z-index value
         */
        zseed : 9000,

        // private
        register : function(dlg){
            list[dlg.id] = dlg;
            accessList.push(dlg);
        },

        // private
        unregister : function(dlg){
            delete list[dlg.id];
            var i=0;
            var len=0;
            if(!accessList.indexOf){
                for(  i = 0, len = accessList.length; i < len; i++){
                    if(accessList[i] == dlg){
                        accessList.splice(i, 1);
                        return;
                    }
                }
            }else{
                 i = accessList.indexOf(dlg);
                if(i != -1){
                    accessList.splice(i, 1);
                }
            }
        },

        /**
         * Gets a registered dialog by id
         * @param {String/Object} id The id of the dialog or a dialog
         * @return {Roo.BasicDialog} this
         */
        get : function(id){
            return typeof id == "object" ? id : list[id];
        },

        /**
         * Brings the specified dialog to the front
         * @param {String/Object} dlg The id of the dialog or a dialog
         * @return {Roo.BasicDialog} this
         */
        bringToFront : function(dlg){
            dlg = this.get(dlg);
            if(dlg != front){
                front = dlg;
                dlg._lastAccess = new Date().getTime();
                orderDialogs();
            }
            return dlg;
        },

        /**
         * Sends the specified dialog to the back
         * @param {String/Object} dlg The id of the dialog or a dialog
         * @return {Roo.BasicDialog} this
         */
        sendToBack : function(dlg){
            dlg = this.get(dlg);
            dlg._lastAccess = -(new Date().getTime());
            orderDialogs();
            return dlg;
        },

        /**
         * Hides all dialogs
         */
        hideAll : function(){
            for(var id in list){
                if(list[id] && typeof list[id] != "function" && list[id].isVisible()){
                    list[id].hide();
                }
            }
        }
    };
}();

/**
 * @class Roo.LayoutDialog
 * @extends Roo.BasicDialog
 * Dialog which provides adjustments for working with a layout in a Dialog.
 * Add your necessary layout config options to the dialog's config.<br>
 * Example usage (including a nested layout):
 * <pre><code>
if(!dialog){
    dialog = new Roo.LayoutDialog("download-dlg", {
        modal: true,
        width:600,
        height:450,
        shadow:true,
        minWidth:500,
        minHeight:350,
        autoTabs:true,
        proxyDrag:true,
        // layout config merges with the dialog config
        center:{
            tabPosition: "top",
            alwaysShowTabs: true
        }
    });
    dialog.addKeyListener(27, dialog.hide, dialog);
    dialog.setDefaultButton(dialog.addButton("Close", dialog.hide, dialog));
    dialog.addButton("Build It!", this.getDownload, this);

    // we can even add nested layouts
    var innerLayout = new Roo.BorderLayout("dl-inner", {
        east: {
            initialSize: 200,
            autoScroll:true,
            split:true
        },
        center: {
            autoScroll:true
        }
    });
    innerLayout.beginUpdate();
    innerLayout.add("east", new Roo.ContentPanel("dl-details"));
    innerLayout.add("center", new Roo.ContentPanel("selection-panel"));
    innerLayout.endUpdate(true);

    var layout = dialog.getLayout();
    layout.beginUpdate();
    layout.add("center", new Roo.ContentPanel("standard-panel",
                        {title: "Download the Source", fitToFrame:true}));
    layout.add("center", new Roo.NestedLayoutPanel(innerLayout,
               {title: "Build your own roo.js"}));
    layout.getRegion("center").showPanel(sp);
    layout.endUpdate();
}
</code></pre>
    * @constructor
    * @param {String/HTMLElement/Roo.Element} el The id of or container element, or config
    * @param {Object} config configuration options
  */
Roo.LayoutDialog = function(el, cfg){
    
    var config=  cfg;
    if (typeof(cfg) == 'undefined') {
        config = Roo.apply({}, el);
        el = Roo.get( document.documentElement || document.body).createChild();
        //config.autoCreate = true;
    }
    
    
    config.autoTabs = false;
    Roo.LayoutDialog.superclass.constructor.call(this, el, config);
    this.body.setStyle({overflow:"hidden", position:"relative"});
    this.layout = new Roo.BorderLayout(this.body.dom, config);
    this.layout.monitorWindowResize = false;
    this.el.addClass("x-dlg-auto-layout");
    // fix case when center region overwrites center function
    this.center = Roo.BasicDialog.prototype.center;
    this.on("show", this.layout.layout, this.layout, true);
    if (config.items) {
        var xitems = config.items;
        delete config.items;
        Roo.each(xitems, this.addxtype, this);
    }
    
    
};
Roo.extend(Roo.LayoutDialog, Roo.BasicDialog, {
    /**
     * Ends update of the layout <strike>and resets display to none</strike>. Use standard beginUpdate/endUpdate on the layout.
     * @deprecated
     */
    endUpdate : function(){
        this.layout.endUpdate();
    },

    /**
     * Begins an update of the layout <strike>and sets display to block and visibility to hidden</strike>. Use standard beginUpdate/endUpdate on the layout.
     *  @deprecated
     */
    beginUpdate : function(){
        this.layout.beginUpdate();
    },

    /**
     * Get the BorderLayout for this dialog
     * @return {Roo.BorderLayout}
     */
    getLayout : function(){
        return this.layout;
    },

    showEl : function(){
        Roo.LayoutDialog.superclass.showEl.apply(this, arguments);
        if(Roo.isIE7){
            this.layout.layout();
        }
    },

    // private
    // Use the syncHeightBeforeShow config option to control this automatically
    syncBodyHeight : function(){
        Roo.LayoutDialog.superclass.syncBodyHeight.call(this);
        if(this.layout){this.layout.layout();}
    },
    
      /**
     * Add an xtype element (actually adds to the layout.)
     * @return {Object} xdata xtype object data.
     */
    
    addxtype : function(c) {
        return this.layout.addxtype(c);
    }
});/*
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
 * @class Roo.MessageBox
 * Utility class for generating different styles of message boxes.  The alias Roo.Msg can also be used.
 * Example usage:
 *<pre><code>
// Basic alert:
Roo.Msg.alert('Status', 'Changes saved successfully.');

// Prompt for user data:
Roo.Msg.prompt('Name', 'Please enter your name:', function(btn, text){
    if (btn == 'ok'){
        // process text value...
    }
});

// Show a dialog using config options:
Roo.Msg.show({
   title:'Save Changes?',
   msg: 'Your are closing a tab that has unsaved changes. Would you like to save your changes?',
   buttons: Roo.Msg.YESNOCANCEL,
   fn: processResult,
   animEl: 'elId'
});
</code></pre>
 * @singleton
 */
Roo.MessageBox = function(){
    var dlg, opt, mask, waitTimer;
    var bodyEl, msgEl, textboxEl, textareaEl, progressEl, pp;
    var buttons, activeTextEl, bwidth;

    // private
    var handleButton = function(button){
        dlg.hide();
        Roo.callback(opt.fn, opt.scope||window, [button, activeTextEl.dom.value], 1);
    };

    // private
    var handleHide = function(){
        if(opt && opt.cls){
            dlg.el.removeClass(opt.cls);
        }
        if(waitTimer){
            Roo.TaskMgr.stop(waitTimer);
            waitTimer = null;
        }
    };

    // private
    var updateButtons = function(b){
        var width = 0;
        if(!b){
            buttons["ok"].hide();
            buttons["cancel"].hide();
            buttons["yes"].hide();
            buttons["no"].hide();
            dlg.footer.dom.style.display = 'none';
            return width;
        }
        dlg.footer.dom.style.display = '';
        for(var k in buttons){
            if(typeof buttons[k] != "function"){
                if(b[k]){
                    buttons[k].show();
                    buttons[k].setText(typeof b[k] == "string" ? b[k] : Roo.MessageBox.buttonText[k]);
                    width += buttons[k].el.getWidth()+15;
                }else{
                    buttons[k].hide();
                }
            }
        }
        return width;
    };

    // private
    var handleEsc = function(d, k, e){
        if(opt && opt.closable !== false){
            dlg.hide();
        }
        if(e){
            e.stopEvent();
        }
    };

    return {
        /**
         * Returns a reference to the underlying {@link Roo.BasicDialog} element
         * @return {Roo.BasicDialog} The BasicDialog element
         */
        getDialog : function(){
           if(!dlg){
                dlg = new Roo.BasicDialog("x-msg-box", {
                    autoCreate : true,
                    shadow: true,
                    draggable: true,
                    resizable:false,
                    constraintoviewport:false,
                    fixedcenter:true,
                    collapsible : false,
                    shim:true,
                    modal: true,
                    width:400, height:100,
                    buttonAlign:"center",
                    closeClick : function(){
                        if(opt && opt.buttons && opt.buttons.no && !opt.buttons.cancel){
                            handleButton("no");
                        }else{
                            handleButton("cancel");
                        }
                    }
                });
                dlg.on("hide", handleHide);
                mask = dlg.mask;
                dlg.addKeyListener(27, handleEsc);
                buttons = {};
                var bt = this.buttonText;
                buttons["ok"] = dlg.addButton(bt["ok"], handleButton.createCallback("ok"));
                buttons["yes"] = dlg.addButton(bt["yes"], handleButton.createCallback("yes"));
                buttons["no"] = dlg.addButton(bt["no"], handleButton.createCallback("no"));
                buttons["cancel"] = dlg.addButton(bt["cancel"], handleButton.createCallback("cancel"));
                bodyEl = dlg.body.createChild({

                    html:'<span class="roo-mb-text"></span><br /><input type="text" class="roo-mb-input" /><textarea class="roo-mb-textarea"></textarea><div class="roo-mb-progress-wrap"><div class="roo-mb-progress"><div class="roo-mb-progress-bar">&#160;</div></div></div>'
                });
                msgEl = bodyEl.dom.firstChild;
                textboxEl = Roo.get(bodyEl.dom.childNodes[2]);
                textboxEl.enableDisplayMode();
                textboxEl.addKeyListener([10,13], function(){
                    if(dlg.isVisible() && opt && opt.buttons){
                        if(opt.buttons.ok){
                            handleButton("ok");
                        }else if(opt.buttons.yes){
                            handleButton("yes");
                        }
                    }
                });
                textareaEl = Roo.get(bodyEl.dom.childNodes[3]);
                textareaEl.enableDisplayMode();
                progressEl = Roo.get(bodyEl.dom.childNodes[4]);
                progressEl.enableDisplayMode();
                var pf = progressEl.dom.firstChild;
                if (pf) {
                    pp = Roo.get(pf.firstChild);
                    pp.setHeight(pf.offsetHeight);
                }
                
            }
            return dlg;
        },

        /**
         * Updates the message box body text
         * @param {String} text (optional) Replaces the message box element's innerHTML with the specified string (defaults to
         * the XHTML-compliant non-breaking space character '&amp;#160;')
         * @return {Roo.MessageBox} This message box
         */
        updateText : function(text){
            if(!dlg.isVisible() && !opt.width){
                dlg.resizeTo(this.maxWidth, 100); // resize first so content is never clipped from previous shows
            }
            msgEl.innerHTML = text || '&#160;';
            var w = Math.max(Math.min(opt.width || msgEl.offsetWidth, this.maxWidth), 
                        Math.max(opt.minWidth || this.minWidth, bwidth));
            if(opt.prompt){
                activeTextEl.setWidth(w);
            }
            if(dlg.isVisible()){
                dlg.fixedcenter = false;
            }
            dlg.setContentSize(w, bodyEl.getHeight());
            if(dlg.isVisible()){
                dlg.fixedcenter = true;
            }
            return this;
        },

        /**
         * Updates a progress-style message box's text and progress bar.  Only relevant on message boxes
         * initiated via {@link Roo.MessageBox#progress} or by calling {@link Roo.MessageBox#show} with progress: true.
         * @param {Number} value Any number between 0 and 1 (e.g., .5)
         * @param {String} text (optional) If defined, the message box's body text is replaced with the specified string (defaults to undefined)
         * @return {Roo.MessageBox} This message box
         */
        updateProgress : function(value, text){
            if(text){
                this.updateText(text);
            }
            if (pp) { // weird bug on my firefox - for some reason this is not defined
                pp.setWidth(Math.floor(value*progressEl.dom.firstChild.offsetWidth));
            }
            return this;
        },        

        /**
         * Returns true if the message box is currently displayed
         * @return {Boolean} True if the message box is visible, else false
         */
        isVisible : function(){
            return dlg && dlg.isVisible();  
        },

        /**
         * Hides the message box if it is displayed
         */
        hide : function(){
            if(this.isVisible()){
                dlg.hide();
            }  
        },

        /**
         * Displays a new message box, or reinitializes an existing message box, based on the config options
         * passed in. All functions (e.g. prompt, alert, etc) on MessageBox call this function internally.
         * The following config object properties are supported:
         * <pre>
Property    Type             Description
----------  ---------------  ------------------------------------------------------------------------------------
animEl            String/Element   An id or Element from which the message box should animate as it opens and
                                   closes (defaults to undefined)
buttons           Object/Boolean   A button config object (e.g., Roo.MessageBox.OKCANCEL or {ok:'Foo',
                                   cancel:'Bar'}), or false to not show any buttons (defaults to false)
closable          Boolean          False to hide the top-right close button (defaults to true).  Note that
                                   progress and wait dialogs will ignore this property and always hide the
                                   close button as they can only be closed programmatically.
cls               String           A custom CSS class to apply to the message box element
defaultTextHeight Number           The default height in pixels of the message box's multiline textarea if
                                   displayed (defaults to 75)
fn                Function         A callback function to execute after closing the dialog.  The arguments to the
                                   function will be btn (the name of the button that was clicked, if applicable,
                                   e.g. "ok"), and text (the value of the active text field, if applicable).
                                   Progress and wait dialogs will ignore this option since they do not respond to
                                   user actions and can only be closed programmatically, so any required function
                                   should be called by the same code after it closes the dialog.
icon              String           A CSS class that provides a background image to be used as an icon for
                                   the dialog (e.g., Roo.MessageBox.WARNING or 'custom-class', defaults to '')
maxWidth          Number           The maximum width in pixels of the message box (defaults to 600)
minWidth          Number           The minimum width in pixels of the message box (defaults to 100)
modal             Boolean          False to allow user interaction with the page while the message box is
                                   displayed (defaults to true)
msg               String           A string that will replace the existing message box body text (defaults
                                   to the XHTML-compliant non-breaking space character '&#160;')
multiline         Boolean          True to prompt the user to enter multi-line text (defaults to false)
progress          Boolean          True to display a progress bar (defaults to false)
progressText      String           The text to display inside the progress bar if progress = true (defaults to '')
prompt            Boolean          True to prompt the user to enter single-line text (defaults to false)
proxyDrag         Boolean          True to display a lightweight proxy while dragging (defaults to false)
title             String           The title text
value             String           The string value to set into the active textbox element if displayed
wait              Boolean          True to display a progress bar (defaults to false)
width             Number           The width of the dialog in pixels
</pre>
         *
         * Example usage:
         * <pre><code>
Roo.Msg.show({
   title: 'Address',
   msg: 'Please enter your address:',
   width: 300,
   buttons: Roo.MessageBox.OKCANCEL,
   multiline: true,
   fn: saveAddress,
   animEl: 'addAddressBtn'
});
</code></pre>
         * @param {Object} config Configuration options
         * @return {Roo.MessageBox} This message box
         */
        show : function(options){
            if(this.isVisible()){
                this.hide();
            }
            var d = this.getDialog();
            opt = options;
            d.setTitle(opt.title || "&#160;");
            d.close.setDisplayed(opt.closable !== false);
            activeTextEl = textboxEl;
            opt.prompt = opt.prompt || (opt.multiline ? true : false);
            if(opt.prompt){
                if(opt.multiline){
                    textboxEl.hide();
                    textareaEl.show();
                    textareaEl.setHeight(typeof opt.multiline == "number" ?
                        opt.multiline : this.defaultTextHeight);
                    activeTextEl = textareaEl;
                }else{
                    textboxEl.show();
                    textareaEl.hide();
                }
            }else{
                textboxEl.hide();
                textareaEl.hide();
            }
            progressEl.setDisplayed(opt.progress === true);
            this.updateProgress(0);
            activeTextEl.dom.value = opt.value || "";
            if(opt.prompt){
                dlg.setDefaultButton(activeTextEl);
            }else{
                var bs = opt.buttons;
                var db = null;
                if(bs && bs.ok){
                    db = buttons["ok"];
                }else if(bs && bs.yes){
                    db = buttons["yes"];
                }
                dlg.setDefaultButton(db);
            }
            bwidth = updateButtons(opt.buttons);
            this.updateText(opt.msg);
            if(opt.cls){
                d.el.addClass(opt.cls);
            }
            d.proxyDrag = opt.proxyDrag === true;
            d.modal = opt.modal !== false;
            d.mask = opt.modal !== false ? mask : false;
            if(!d.isVisible()){
                // force it to the end of the z-index stack so it gets a cursor in FF
                document.body.appendChild(dlg.el.dom);
                d.animateTarget = null;
                d.show(options.animEl);
            }
            return this;
        },

        /**
         * Displays a message box with a progress bar.  This message box has no buttons and is not closeable by
         * the user.  You are responsible for updating the progress bar as needed via {@link Roo.MessageBox#updateProgress}
         * and closing the message box when the process is complete.
         * @param {String} title The title bar text
         * @param {String} msg The message box body text
         * @return {Roo.MessageBox} This message box
         */
        progress : function(title, msg){
            this.show({
                title : title,
                msg : msg,
                buttons: false,
                progress:true,
                closable:false,
                minWidth: this.minProgressWidth,
                modal : true
            });
            return this;
        },

        /**
         * Displays a standard read-only message box with an OK button (comparable to the basic JavaScript Window.alert).
         * If a callback function is passed it will be called after the user clicks the button, and the
         * id of the button that was clicked will be passed as the only parameter to the callback
         * (could also be the top-right close button).
         * @param {String} title The title bar text
         * @param {String} msg The message box body text
         * @param {Function} fn (optional) The callback function invoked after the message box is closed
         * @param {Object} scope (optional) The scope of the callback function
         * @return {Roo.MessageBox} This message box
         */
        alert : function(title, msg, fn, scope){
            this.show({
                title : title,
                msg : msg,
                buttons: this.OK,
                fn: fn,
                scope : scope,
                modal : true
            });
            return this;
        },

        /**
         * Displays a message box with an infinitely auto-updating progress bar.  This can be used to block user
         * interaction while waiting for a long-running process to complete that does not have defined intervals.
         * You are responsible for closing the message box when the process is complete.
         * @param {String} msg The message box body text
         * @param {String} title (optional) The title bar text
         * @return {Roo.MessageBox} This message box
         */
        wait : function(msg, title){
            this.show({
                title : title,
                msg : msg,
                buttons: false,
                closable:false,
                progress:true,
                modal:true,
                width:300,
                wait:true
            });
            waitTimer = Roo.TaskMgr.start({
                run: function(i){
                    Roo.MessageBox.updateProgress(((((i+20)%20)+1)*5)*.01);
                },
                interval: 1000
            });
            return this;
        },

        /**
         * Displays a confirmation message box with Yes and No buttons (comparable to JavaScript's Window.confirm).
         * If a callback function is passed it will be called after the user clicks either button, and the id of the
         * button that was clicked will be passed as the only parameter to the callback (could also be the top-right close button).
         * @param {String} title The title bar text
         * @param {String} msg The message box body text
         * @param {Function} fn (optional) The callback function invoked after the message box is closed
         * @param {Object} scope (optional) The scope of the callback function
         * @return {Roo.MessageBox} This message box
         */
        confirm : function(title, msg, fn, scope){
            this.show({
                title : title,
                msg : msg,
                buttons: this.YESNO,
                fn: fn,
                scope : scope,
                modal : true
            });
            return this;
        },

        /**
         * Displays a message box with OK and Cancel buttons prompting the user to enter some text (comparable to
         * JavaScript's Window.prompt).  The prompt can be a single-line or multi-line textbox.  If a callback function
         * is passed it will be called after the user clicks either button, and the id of the button that was clicked
         * (could also be the top-right close button) and the text that was entered will be passed as the two
         * parameters to the callback.
         * @param {String} title The title bar text
         * @param {String} msg The message box body text
         * @param {Function} fn (optional) The callback function invoked after the message box is closed
         * @param {Object} scope (optional) The scope of the callback function
         * @param {Boolean/Number} multiline (optional) True to create a multiline textbox using the defaultTextHeight
         * property, or the height in pixels to create the textbox (defaults to false / single-line)
         * @return {Roo.MessageBox} This message box
         */
        prompt : function(title, msg, fn, scope, multiline){
            this.show({
                title : title,
                msg : msg,
                buttons: this.OKCANCEL,
                fn: fn,
                minWidth:250,
                scope : scope,
                prompt:true,
                multiline: multiline,
                modal : true
            });
            return this;
        },

        /**
         * Button config that displays a single OK button
         * @type Object
         */
        OK : {ok:true},
        /**
         * Button config that displays Yes and No buttons
         * @type Object
         */
        YESNO : {yes:true, no:true},
        /**
         * Button config that displays OK and Cancel buttons
         * @type Object
         */
        OKCANCEL : {ok:true, cancel:true},
        /**
         * Button config that displays Yes, No and Cancel buttons
         * @type Object
         */
        YESNOCANCEL : {yes:true, no:true, cancel:true},

        /**
         * The default height in pixels of the message box's multiline textarea if displayed (defaults to 75)
         * @type Number
         */
        defaultTextHeight : 75,
        /**
         * The maximum width in pixels of the message box (defaults to 600)
         * @type Number
         */
        maxWidth : 600,
        /**
         * The minimum width in pixels of the message box (defaults to 100)
         * @type Number
         */
        minWidth : 100,
        /**
         * The minimum width in pixels of the message box if it is a progress-style dialog.  This is useful
         * for setting a different minimum width than text-only dialogs may need (defaults to 250)
         * @type Number
         */
        minProgressWidth : 250,
        /**
         * An object containing the default button text strings that can be overriden for localized language support.
         * Supported properties are: ok, cancel, yes and no.
         * Customize the default text like so: Roo.MessageBox.buttonText.yes = "S?";
         * @type Object
         */
        buttonText : {
            ok : "OK",
            cancel : "Cancel",
            yes : "Yes",
            no : "No"
        }
    };
}();

/**
 * Shorthand for {@link Roo.MessageBox}
 */
Roo.Msg = Roo.MessageBox;/*
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
 * @class Roo.QuickTips
 * Provides attractive and customizable tooltips for any element.
 * @singleton
 */
Roo.QuickTips = function(){
    var el, tipBody, tipBodyText, tipTitle, tm, cfg, close, tagEls = {}, esc, removeCls = null, bdLeft, bdRight;
    var ce, bd, xy, dd;
    var visible = false, disabled = true, inited = false;
    var showProc = 1, hideProc = 1, dismissProc = 1, locks = [];
    
    var onOver = function(e){
        if(disabled){
            return;
        }
        var t = e.getTarget();
        if(!t || t.nodeType !== 1 || t == document || t == document.body){
            return;
        }
        if(ce && t == ce.el){
            clearTimeout(hideProc);
            return;
        }
        if(t && tagEls[t.id]){
            tagEls[t.id].el = t;
            showProc = show.defer(tm.showDelay, tm, [tagEls[t.id]]);
            return;
        }
        var ttp, et = Roo.fly(t);
        var ns = cfg.namespace;
        if(tm.interceptTitles && t.title){
            ttp = t.title;
            t.qtip = ttp;
            t.removeAttribute("title");
            e.preventDefault();
        }else{
            ttp = t.qtip || et.getAttributeNS(ns, cfg.attribute);
        }
        if(ttp){
            showProc = show.defer(tm.showDelay, tm, [{
                el: t, 
                text: ttp, 
                width: et.getAttributeNS(ns, cfg.width),
                autoHide: et.getAttributeNS(ns, cfg.hide) != "user",
                title: et.getAttributeNS(ns, cfg.title),
           	    cls: et.getAttributeNS(ns, cfg.cls)
            }]);
        }
    };
    
    var onOut = function(e){
        clearTimeout(showProc);
        var t = e.getTarget();
        if(t && ce && ce.el == t && (tm.autoHide && ce.autoHide !== false)){
            hideProc = setTimeout(hide, tm.hideDelay);
        }
    };
    
    var onMove = function(e){
        if(disabled){
            return;
        }
        xy = e.getXY();
        xy[1] += 18;
        if(tm.trackMouse && ce){
            el.setXY(xy);
        }
    };
    
    var onDown = function(e){
        clearTimeout(showProc);
        clearTimeout(hideProc);
        if(!e.within(el)){
            if(tm.hideOnClick){
                hide();
                tm.disable();
                tm.enable.defer(100, tm);
            }
        }
    };
    
    var getPad = function(){
        return 2;//bdLeft.getPadding('l')+bdRight.getPadding('r');
    };

    var show = function(o){
        if(disabled){
            return;
        }
        clearTimeout(dismissProc);
        ce = o;
        if(removeCls){ // in case manually hidden
            el.removeClass(removeCls);
            removeCls = null;
        }
        if(ce.cls){
            el.addClass(ce.cls);
            removeCls = ce.cls;
        }
        if(ce.title){
            tipTitle.update(ce.title);
            tipTitle.show();
        }else{
            tipTitle.update('');
            tipTitle.hide();
        }
        el.dom.style.width  = tm.maxWidth+'px';
        //tipBody.dom.style.width = '';
        tipBodyText.update(o.text);
        var p = getPad(), w = ce.width;
        if(!w){
            var td = tipBodyText.dom;
            var aw = Math.max(td.offsetWidth, td.clientWidth, td.scrollWidth);
            if(aw > tm.maxWidth){
                w = tm.maxWidth;
            }else if(aw < tm.minWidth){
                w = tm.minWidth;
            }else{
                w = aw;
            }
        }
        //tipBody.setWidth(w);
        el.setWidth(parseInt(w, 10) + p);
        if(ce.autoHide === false){
            close.setDisplayed(true);
            if(dd){
                dd.unlock();
            }
        }else{
            close.setDisplayed(false);
            if(dd){
                dd.lock();
            }
        }
        if(xy){
            el.avoidY = xy[1]-18;
            el.setXY(xy);
        }
        if(tm.animate){
            el.setOpacity(.1);
            el.setStyle("visibility", "visible");
            el.fadeIn({callback: afterShow});
        }else{
            afterShow();
        }
    };
    
    var afterShow = function(){
        if(ce){
            el.show();
            esc.enable();
            if(tm.autoDismiss && ce.autoHide !== false){
                dismissProc = setTimeout(hide, tm.autoDismissDelay);
            }
        }
    };
    
    var hide = function(noanim){
        clearTimeout(dismissProc);
        clearTimeout(hideProc);
        ce = null;
        if(el.isVisible()){
            esc.disable();
            if(noanim !== true && tm.animate){
                el.fadeOut({callback: afterHide});
            }else{
                afterHide();
            } 
        }
    };
    
    var afterHide = function(){
        el.hide();
        if(removeCls){
            el.removeClass(removeCls);
            removeCls = null;
        }
    };
    
    return {
        /**
        * @cfg {Number} minWidth
        * The minimum width of the quick tip (defaults to 40)
        */
       minWidth : 40,
        /**
        * @cfg {Number} maxWidth
        * The maximum width of the quick tip (defaults to 300)
        */
       maxWidth : 300,
        /**
        * @cfg {Boolean} interceptTitles
        * True to automatically use the element's DOM title value if available (defaults to false)
        */
       interceptTitles : false,
        /**
        * @cfg {Boolean} trackMouse
        * True to have the quick tip follow the mouse as it moves over the target element (defaults to false)
        */
       trackMouse : false,
        /**
        * @cfg {Boolean} hideOnClick
        * True to hide the quick tip if the user clicks anywhere in the document (defaults to true)
        */
       hideOnClick : true,
        /**
        * @cfg {Number} showDelay
        * Delay in milliseconds before the quick tip displays after the mouse enters the target element (defaults to 500)
        */
       showDelay : 500,
        /**
        * @cfg {Number} hideDelay
        * Delay in milliseconds before the quick tip hides when autoHide = true (defaults to 200)
        */
       hideDelay : 200,
        /**
        * @cfg {Boolean} autoHide
        * True to automatically hide the quick tip after the mouse exits the target element (defaults to true).
        * Used in conjunction with hideDelay.
        */
       autoHide : true,
        /**
        * @cfg {Boolean}
        * True to automatically hide the quick tip after a set period of time, regardless of the user's actions
        * (defaults to true).  Used in conjunction with autoDismissDelay.
        */
       autoDismiss : true,
        /**
        * @cfg {Number}
        * Delay in milliseconds before the quick tip hides when autoDismiss = true (defaults to 5000)
        */
       autoDismissDelay : 5000,
       /**
        * @cfg {Boolean} animate
        * True to turn on fade animation. Defaults to false (ClearType/scrollbar flicker issues in IE7).
        */
       animate : false,

       /**
        * @cfg {String} title
        * Title text to display (defaults to '').  This can be any valid HTML markup.
        */
        title: '',
       /**
        * @cfg {String} text
        * Body text to display (defaults to '').  This can be any valid HTML markup.
        */
        text : '',
       /**
        * @cfg {String} cls
        * A CSS class to apply to the base quick tip element (defaults to '').
        */
        cls : '',
       /**
        * @cfg {Number} width
        * Width in pixels of the quick tip (defaults to auto).  Width will be ignored if it exceeds the bounds of
        * minWidth or maxWidth.
        */
        width : null,

    /**
     * Initialize and enable QuickTips for first use.  This should be called once before the first attempt to access
     * or display QuickTips in a page.
     */
       init : function(){
          tm = Roo.QuickTips;
          cfg = tm.tagConfig;
          if(!inited){
              if(!Roo.isReady){ // allow calling of init() before onReady
                  Roo.onReady(Roo.QuickTips.init, Roo.QuickTips);
                  return;
              }
              el = new Roo.Layer({cls:"x-tip", shadow:"drop", shim: true, constrain:true, shadowOffset:4});
              el.fxDefaults = {stopFx: true};
              // maximum custom styling
              //el.update('<div class="x-tip-top-left"><div class="x-tip-top-right"><div class="x-tip-top"></div></div></div><div class="x-tip-bd-left"><div class="x-tip-bd-right"><div class="x-tip-bd"><div class="x-tip-close"></div><h3></h3><div class="x-tip-bd-inner"></div><div class="x-clear"></div></div></div></div><div class="x-tip-ft-left"><div class="x-tip-ft-right"><div class="x-tip-ft"></div></div></div>');
              el.update('<div class="x-tip-bd"><div class="x-tip-close"></div><h3></h3><div class="x-tip-bd-inner"></div><div class="x-clear"></div></div>');              
              tipTitle = el.child('h3');
              tipTitle.enableDisplayMode("block");
              tipBody = el.child('div.x-tip-bd');
              tipBodyText = el.child('div.x-tip-bd-inner');
              //bdLeft = el.child('div.x-tip-bd-left');
              //bdRight = el.child('div.x-tip-bd-right');
              close = el.child('div.x-tip-close');
              close.enableDisplayMode("block");
              close.on("click", hide);
              var d = Roo.get(document);
              d.on("mousedown", onDown);
              d.on("mouseover", onOver);
              d.on("mouseout", onOut);
              d.on("mousemove", onMove);
              esc = d.addKeyListener(27, hide);
              esc.disable();
              if(Roo.dd.DD){
                  dd = el.initDD("default", null, {
                      onDrag : function(){
                          el.sync();  
                      }
                  });
                  dd.setHandleElId(tipTitle.id);
                  dd.lock();
              }
              inited = true;
          }
          this.enable(); 
       },

    /**
     * Configures a new quick tip instance and assigns it to a target element.  The following config options
     * are supported:
     * <pre>
Property    Type                   Description
----------  ---------------------  ------------------------------------------------------------------------
target      Element/String/Array   An Element, id or array of ids that this quick tip should be tied to
     * </ul>
     * @param {Object} config The config object
     */
       register : function(config){
           var cs = config instanceof Array ? config : arguments;
           for(var i = 0, len = cs.length; i < len; i++) {
               var c = cs[i];
               var target = c.target;
               if(target){
                   if(target instanceof Array){
                       for(var j = 0, jlen = target.length; j < jlen; j++){
                           tagEls[target[j]] = c;
                       }
                   }else{
                       tagEls[typeof target == 'string' ? target : Roo.id(target)] = c;
                   }
               }
           }
       },

    /**
     * Removes this quick tip from its element and destroys it.
     * @param {String/HTMLElement/Element} el The element from which the quick tip is to be removed.
     */
       unregister : function(el){
           delete tagEls[Roo.id(el)];
       },

    /**
     * Enable this quick tip.
     */
       enable : function(){
           if(inited && disabled){
               locks.pop();
               if(locks.length < 1){
                   disabled = false;
               }
           }
       },

    /**
     * Disable this quick tip.
     */
       disable : function(){
          disabled = true;
          clearTimeout(showProc);
          clearTimeout(hideProc);
          clearTimeout(dismissProc);
          if(ce){
              hide(true);
          }
          locks.push(1);
       },

    /**
     * Returns true if the quick tip is enabled, else false.
     */
       isEnabled : function(){
            return !disabled;
       },

        // private
       tagConfig : {
           namespace : "ext",
           attribute : "qtip",
           width : "width",
           target : "target",
           title : "qtitle",
           hide : "hide",
           cls : "qclass"
       }
   };
}();

// backwards compat
Roo.QuickTips.tips = Roo.QuickTips.register;