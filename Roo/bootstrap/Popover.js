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
    
    getChildContainer : function()
    {
        return this.el.select('.popover-content',true).first();
    },
    
    getAutoCreate : function(){
         
        var cfg = {
           cls : 'popover roo-dynamic shadow roo-popover',
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
                            html : this.title || ''
                        },
                        {
                            cls : 'popover-content popover-body'  + this.cls,
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
            this.el.select('.popover-title',true).first().dom.innerHTML = str;
        }
        
    },
    /**
     * @param {string} the body content
     */
    setContent: function(str)
    {
        this.html = str;
        if (this.el) {
            this.el.select('.popover-content',true).first().dom.innerHTML = str;
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

        
        
        this.initEvents();
    },
    
    initEvents : function()
    {
        
        Roo.bootstrap.Popover.register(this);
        this.el.select('.popover-title',true).setVisibilityMode(Roo.Element.DISPLAY);
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
     * @param {Roo.Element|string|false} - element to align and point to.
     */
    show : function (on_el)
    {
        
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
        
        if (!this.title.length) {
            this.el.select('.popover-title',true).hide();
        }
        
        
        var placement = typeof this.placement == 'function' ?
            this.placement.call(this, this.el, on_el) :
            this.placement;
            
        /*
        var autoToken = /\s?auto?\s?/i;   /// not sure how this was supposed to work? right auto ? what?
        
        // I think  'auto right' - but 
        
        var autoPlace = autoToken.test(placement);
        if (autoPlace) {
            placement = placement.replace(autoToken, '') || 'top';
        }
        */
        
        
        this.el.show();
        this.el.dom.style.display='block';
        
        //this.el.appendTo(on_el);
        
        var p = this.getPosition();
        var box = this.el.getBox();
        
        
        var align = Roo.bootstrap.Popover.alignment[placement];
        this.el.addClass(align[2]);

//        Roo.log(align);

        if (on_el) {
            this.el.alignTo(on_el, align[0],align[1]);
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
        
        
        if (this.el.hasClass('fade')) {
            // fade it?
        }
        
        this.hoverState = 'in';
        
        this.fireEvent('show', this);
        
    },
    hide : function()
    {
        this.el.setXY([0,0]);
        this.el.removeClass('in');
        this.el.hide();
        this.hoverState = null;
        
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