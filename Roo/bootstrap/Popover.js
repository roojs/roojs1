/*
 * - LGPL
 *
 * element
 * 
 */

/**
 * @class Roo.bootstrap.Popover
 * @extends Roo.bootstrap.Component
 * Bootstrap Popover class
 * @cfg {String} html contents of the popover   (or false to use children..)
 * @cfg {String} title of popover (or false to hide)
 * @cfg {String|function} (right|top|bottom|left|auto) placement how it is placed
 * @cfg {String} trigger click || hover (or false to trigger manually)
 * @cfg {Boolean} modal - popovers that are modal will mask the screen, and must be closed with another event.
 * @cfg {String|Boolean|Roo.Element} add click hander to trigger show over what element
 *      - if false and it has a 'parent' then it will be automatically added to that element
 *      - if string - Roo.get  will be called 
 * @cfg {Number} delay - delay before showing
 
 * @constructor
 * Create a new Popover
 * @param {Object} config The config object
 */

Roo.bootstrap.Popover = function(config){
    Roo.bootstrap.Popover.superclass.constructor.call(this, config);
    
    this.addEvents({
        // raw events
         /**
         * @event show
         * After the popover show
         * 
         * @param {Roo.bootstrap.Popover} this
         */
        "show" : true,
        /**
         * @event hide
         * After the popover hide
         * 
         * @param {Roo.bootstrap.Popover} this
         */
        "hide" : true
    });
};

Roo.extend(Roo.bootstrap.Popover, Roo.bootstrap.Component,  {
    
    title: false,
    html: false,
    
    placement : 'right',
    trigger : 'hover', // hover
    modal : false,
    delay : 0,
    
    over: false,
    
    can_build_overlaid : false,
    
    maskEl : false, // the mask element
    headerEl : false,
    contentEl : false,
    alignEl : false, // when show is called with an element - this get's stored.
    
    getChildContainer : function()
    {
        return this.contentEl;
        
    },
    getPopoverHeader : function()
    {
        this.title = true; // flag not to hide it..
        this.headerEl.addClass('p-0');
        return this.headerEl
    },
    
    
    getAutoCreate : function(){
         
        var cfg = {
           cls : 'popover roo-dynamic shadow roo-popover' + (this.modal ? '-modal' : ''),
           style: 'display:block',
           cn : [
                {
                    cls : 'arrow'
                },
                {
                    cls : 'popover-inner ',
                    cn : [
                        {
                            tag: 'h3',
                            cls: 'popover-title popover-header',
                            html : this.title === false ? '' : this.title
                        },
                        {
                            cls : 'popover-content popover-body '  + (this.cls || ''),
                            html : this.html || ''
                        }
                    ]
                    
                }
           ]
        };
        
        return cfg;
    },
    /**
     * @param {string} the title
     */
    setTitle: function(str)
    {
        this.title = str;
        if (this.el) {
            this.headerEl.dom.innerHTML = str;
        }
        
    },
    /**
     * @param {string} the body content
     */
    setContent: function(str)
    {
        this.html = str;
        if (this.contentEl) {
            this.contentEl.dom.innerHTML = str;
        }
        
    },
    // as it get's added to the bottom of the page.
    onRender : function(ct, position)
    {
        Roo.bootstrap.Component.superclass.onRender.call(this, ct, position);
        
        
        
        if(!this.el){
            var cfg = Roo.apply({},  this.getAutoCreate());
            cfg.id = Roo.id();
            
            if (this.cls) {
                cfg.cls += ' ' + this.cls;
            }
            if (this.style) {
                cfg.style = this.style;
            }
            //Roo.log("adding to ");
            this.el = Roo.get(document.body).createChild(cfg, position);
//            Roo.log(this.el);
        }
        
        this.contentEl = this.el.select('.popover-content',true).first();
        this.headerEl =  this.el.select('.popover-title',true).first();
        
        var nitems = [];
        if(typeof(this.items) != 'undefined'){
            var items = this.items;
            delete this.items;

            for(var i =0;i < items.length;i++) {
                nitems.push(this.addxtype(Roo.apply({}, items[i])));
            }
        }

        this.items = nitems;
        
        this.maskEl = Roo.DomHelper.append(document.body, {tag: "div", cls:"x-dlg-mask"}, true);
        Roo.EventManager.onWindowResize(this.resizeMask, this, true);
        
        
        
        this.initEvents();
    },
    
    resizeMask : function()
    {
        this.maskEl.setSize(
            Roo.lib.Dom.getViewWidth(true),
            Roo.lib.Dom.getViewHeight(true)
        );
    },
    
    initEvents : function()
    {
        
        if (!this.modal) { 
            Roo.bootstrap.Popover.register(this);
        }
         
        this.arrowEl = this.el.select('.arrow',true).first();
        this.headerEl.setVisibilityMode(Roo.Element.DISPLAY); // probably not needed as it's default in BS4
        this.el.enableDisplayMode('block');
        this.el.hide();
 
        
        if (this.over === false && !this.parent()) {
            return; 
        }
        if (this.triggers === false) {
            return;
        }
         
        // support parent
        var on_el = (this.over == 'parent' || this.over === false) ? this.parent().el : Roo.get(this.over);
        var triggers = this.trigger ? this.trigger.split(' ') : [];
        Roo.each(triggers, function(trigger) {
        
            if (trigger == 'click') {
                on_el.on('click', this.toggle, this);
            } else if (trigger != 'manual') {
                var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin';
                var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout';
      
                on_el.on(eventIn  ,this.enter, this);
                on_el.on(eventOut, this.leave, this);
            }
        }, this);
    },
    
    
    // private
    timeout : null,
    hoverState : null,
    
    toggle : function () {
        this.hoverState == 'in' ? this.leave() : this.enter();
    },
    
    enter : function () {
        
        clearTimeout(this.timeout);
    
        this.hoverState = 'in';
    
        if (!this.delay || !this.delay.show) {
            this.show();
            return;
        }
        var _t = this;
        this.timeout = setTimeout(function () {
            if (_t.hoverState == 'in') {
                _t.show();
            }
        }, this.delay.show)
    },
    
    leave : function() {
        clearTimeout(this.timeout);
    
        this.hoverState = 'out';
    
        if (!this.delay || !this.delay.hide) {
            this.hide();
            return;
        }
        var _t = this;
        this.timeout = setTimeout(function () {
            if (_t.hoverState == 'out') {
                _t.hide();
            }
        }, this.delay.hide)
    },
    /**
     * Show the popover
     * @param {Roo.Element|string|Boolean} - element to align and point to. (set align to [ pos, offset ])
     * @param {string} (left|right|top|bottom) position
     */
    show : function (on_el, placement)
    {
        this.placement = typeof(placement) == 'undefined' ?  this.placement   : placement;
        on_el = on_el || false; // default to false
         
        if (!on_el) {
            if (this.parent() && (this.over == 'parent' || (this.over === false))) {
                on_el = this.parent().el;
            } else if (this.over) {
                Roo.get(this.over);
            }
            
        }
        
        if (!this.el) {
            this.render(document.body);
        }
        
        
        this.el.removeClass([
            'fade','top','bottom', 'left', 'right','in',
            'bs-popover-top','bs-popover-bottom', 'bs-popover-left', 'bs-popover-right'
        ]);
        
        if (this.title === false) {
            this.headerEl.hide();
        }
        
       
        this.el.show();
        this.el.dom.style.display = 'block';
         
        
        this.el.addClass(placement + ' roo-popover-' + placement);

        if (on_el) {
            this.updatePosition();
             
        } else {
            // this is usually just done by the builder = to show the popoup in the middle of the scren.
            var es = this.el.getSize();
            var x = Roo.lib.Dom.getViewWidth()/2;
            var y = Roo.lib.Dom.getViewHeight()/2;
            this.el.setXY([ x-(es.width/2),  y-(es.height/2)] );
            
        }

        
        //var arrow = this.el.select('.arrow',true).first();
        //arrow.set(align[2], 
        
        this.el.addClass('in');
        
         
        
        this.hoverState = 'in';
        
        if (this.modal) {
            this.maskEl.setSize(Roo.lib.Dom.getViewWidth(true),   Roo.lib.Dom.getViewHeight(true));
            this.maskEl.setStyle('z-index', Roo.bootstrap.Popover.zIndex++);
            this.maskEl.dom.style.display = 'block';
            this.maskEl.addClass('show');
        }
        this.el.setStyle('z-index', Roo.bootstrap.Popover.zIndex++);
 
        this.fireEvent('show', this);
        
    },
    /**
     * fire this manually after loading a grid in the table for example
     *
     */
    updatePosition : function(placement, try_move)
    {
        this.el.addClass(placement + ' roo-popover-' + placement);
        
        if (!this.alignEl ) {
            return;
        }
        
        switch ()
        
        this.el.alignTo(this.alignEl , this.alignment[0],this.alignment[1]);
        
        // work out the pointy position.
        var p1 = this.alignment[0].split('-').pop().replace('?','');
        var xy = this.alignEl.getAnchorXY(p1, false);
        xy[0]+=2;xy[1]+=5;
        this.arrowEl.setXY(xy);
        
    },
    
    hide : function()
    {
        this.el.setXY([0,0]);
        this.el.removeClass('in');
        this.el.hide();
        this.hoverState = null;
        this.maskEl.hide(); // always..
        this.fireEvent('hide', this);
    }
    
});


Roo.apply(Roo.bootstrap.Popover, {

    alignment : {
        'left' : ['r-l', [-10,0], 'left bs-popover-left'],
        'right' : ['l-br', [10,0], 'right bs-popover-right'],
        'bottom' : ['t-b', [0,10], 'top bs-popover-top'],
        'top' : [ 'b-t', [0,-10], 'bottom bs-popover-bottom']
    },
    
    zIndex : 20001,

    clickHander : false,
    

    onMouseDown : function(e)
    {
        if (!e.getTarget(".roo-popover")) {
            this.hideAll();
        }
         
    },
    
    popups : [],
    
    register : function(popup)
    {
        if (!Roo.bootstrap.Popover.clickHandler) {
            Roo.bootstrap.Popover.clickHandler = Roo.get(document).on("mousedown", Roo.bootstrap.Popover.onMouseDown, Roo.bootstrap.Popover);
        }
        // hide other popups.
        this.hideAll();
        this.popups.push(popup);
    },
    hideAll : function()
    {
        this.popups.forEach(function(p) {
            p.hide();
        });
    }

});