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
 * @cfg {String} placement how it is placed
 * @cfg {String} trigger click || hover (or false to trigger manually)
 * @cfg {String} over what (parent or false to trigger manually.)
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
    
    title: 'Fill in a title',
    html: false,
    
    placement : 'right',
    trigger : 'hover', // hover
    
    delay : 0,
    
    over: 'parent',
    
    can_build_overlaid : false,
    
    getChildContainer : function()
    {
        return this.el.select('.popover-content',true).first();
    },
    
    getAutoCreate : function(){
         
        var cfg = {
           cls : 'popover roo-dynamic',
           style: 'display:block',
           cn : [
                {
                    cls : 'arrow'
                },
                {
                    cls : 'popover-inner',
                    cn : [
                        {
                            tag: 'h3',
                            cls: 'popover-title',
                            html : this.title
                        },
                        {
                            cls : 'popover-content',
                            html : this.html
                        }
                    ]
                    
                }
           ]
        };
        
        return cfg;
    },
    setTitle: function(str)
    {
        this.title = str;
        this.el.select('.popover-title',true).first().dom.innerHTML = str;
    },
    setContent: function(str)
    {
        this.html = str;
        this.el.select('.popover-content',true).first().dom.innerHTML = str;
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
        this.initEvents();
    },
    
    initEvents : function()
    {
        this.el.select('.popover-title',true).setVisibilityMode(Roo.Element.DISPLAY);
        this.el.enableDisplayMode('block');
        this.el.hide();
        if (this.over === false) {
            return; 
        }
        if (this.triggers === false) {
            return;
        }
        var on_el = (this.over == 'parent') ? this.parent().el : Roo.get(this.over);
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
    
    show : function (on_el)
    {
        if (!on_el) {
            on_el= (this.over == 'parent') ? this.parent().el : Roo.get(this.over);
        }
        // set content.
        this.el.select('.popover-title',true).first().dom.innerHtml = this.title;
        if (this.html !== false) {
            this.el.select('.popover-content',true).first().dom.innerHtml = this.html;
        }
        this.el.removeClass(['fade','top','bottom', 'left', 'right','in']);
        if (!this.title.length) {
            this.el.select('.popover-title',true).hide();
        }
        
        var placement = typeof this.placement == 'function' ?
            this.placement.call(this, this.el, on_el) :
            this.placement;
            
        var autoToken = /\s?auto?\s?/i;
        var autoPlace = autoToken.test(placement);
        if (autoPlace) {
            placement = placement.replace(autoToken, '') || 'top';
        }
        
        //this.el.detach()
        //this.el.setXY([0,0]);
        this.el.show();
        this.el.dom.style.display='block';
        this.el.addClass(placement);
        
        //this.el.appendTo(on_el);
        
        var p = this.getPosition();
        var box = this.el.getBox();
        
        if (autoPlace) {
            // fixme..
        }
        var align = Roo.bootstrap.Popover.alignment[placement];
        this.el.alignTo(on_el, align[0],align[1]);
        //var arrow = this.el.select('.arrow',true).first();
        //arrow.set(align[2], 
        
        this.el.addClass('in');
        
        
        if (this.el.hasClass('fade')) {
            // fade it?
        }
        
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

Roo.bootstrap.Popover.alignment = {
    'left' : ['r-l', [-10,0], 'right'],
    'right' : ['l-r', [10,0], 'left'],
    'bottom' : ['t-b', [0,10], 'top'],
    'top' : [ 'b-t', [0,-10], 'bottom']
};

 