
Roo.panel.Scroll = function(el, config, content){
    config = config || {};
    config.fitToFrame = true;
    Roo.panel.Scroll.superclass.constructor.call(this, el, config, content);
    
    this.el.dom.style.overflow = "hidden";
    var wrap = this.el.wrap({cls: "x-scroller x-layout-inactive-content"});
    this.el.removeClass("x-layout-inactive-content");
    this.el.on("mousewheel", this.onWheel, this);

    var up = wrap.createChild({cls: "x-scroller-up", html: "&#160;"}, this.el.dom);
    var down = wrap.createChild({cls: "x-scroller-down", html: "&#160;"});
    up.unselectable(); down.unselectable();
    up.on("click", this.scrollUp, this);
    down.on("click", this.scrollDown, this);
    up.addClassOnOver("x-scroller-btn-over");
    down.addClassOnOver("x-scroller-btn-over");
    up.addClassOnClick("x-scroller-btn-click");
    down.addClassOnClick("x-scroller-btn-click");
    this.adjustments = [0, -(up.getHeight() + down.getHeight())];

    this.resizeEl = this.el;
    this.el = wrap; this.up = up; this.down = down;
};

Roo.extend(Roo.panel.Scroll, Roo.panel.Content, {
    increment : 100,
    wheelIncrement : 5,
    scrollUp : function(){
        this.resizeEl.scroll("up", this.increment, {callback: this.afterScroll, scope: this});
    },

    scrollDown : function(){
        this.resizeEl.scroll("down", this.increment, {callback: this.afterScroll, scope: this});
    },

    afterScroll : function(){
        var el = this.resizeEl;
        var t = el.dom.scrollTop, h = el.dom.scrollHeight, ch = el.dom.clientHeight;
        this.up[t == 0 ? "addClass" : "removeClass"]("x-scroller-btn-disabled");
        this.down[h - t <= ch ? "addClass" : "removeClass"]("x-scroller-btn-disabled");
    },

    setSize : function(){
        Roo.panel.Scroll.superclass.setSize.apply(this, arguments);
        this.afterScroll();
    },

    onWheel : function(e){
        var d = e.getWheelDelta();
        this.resizeEl.dom.scrollTop -= (d*this.wheelIncrement);
        this.afterScroll();
        e.stopEvent();
    },

    setContent : function(content, loadScripts){
        this.resizeEl.update(content, loadScripts);
    }

});
