/*
 * - LGPL
 *
 * element
 * 
 */

/**
 * @class Roo.bootstrap.Popover
 * @extends Roo.bootstrap.Component
 * Bootstrap Element class
 * @cfg {String} html contents of the popover   (or false to use children..)
 * @cfg {String} title of popover (or false to hide)
 * @cfg {String} placement how it is placed
 * @cfg {String} trigger (or false to trigger manually)
 * @cfg {String} over what (parent or false to trigger manually.)
 * 
 * @constructor
 * Create a new Popover
 * @param {Object} config The config object
 */

Roo.bootstrap.Popover = function(config){
    Roo.bootstrap.Popover.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Popover, Roo.bootstrap.Component,  {
    
    title: 'Fill in a title',
    html: false,
    
    placement : 'right',
    trigger : 'click',
    
    over: 'parent',
    
    getChildContainer : function()
    {
        return this.el.select('.popover-content',true).first();
    },
    
    getAutoCreate : function(){
         
        var cfg = {
           cls : 'popover',
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
            this.el = Roo.get(document.body).createChild(cfg, position);
        }
        this.initEvents();
    },
    
    initEvents : function()
    {
        this.el.select('.popover-title',true).setVisibilityMode(Roo.Element.DISPLAY);
        this.el.setVisibilityMode(Roo.Element.DISPLAY);
        this.el.hide();
        if (over === false) {
            return; 
        }
        if (this.triggers === false) {
            return;
        }
        var on_el = (this.over == 'parent') ? this.parent().el : Roo.get(this.over);
        var triggers = this.trigger.split(' ');
        Roo.each(triggers, function(trigger) {
        
            if (trigger == 'click') {
                this.on_el.on('click', this.toggle, this);
            } else if (trigger != 'manual') {
                var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
                var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'
      
                this.on_el.on(eventIn  ,this.enter, this);
              this.$element.on(eventOut, this.leave, this);
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
    
        this.hoverState = 'in'
    
        if (!this.delay || !this.delay.show) {
            this.show();
            return 
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
    
        this.hoverState = 'out'
    
        if (!this.delay || !this.delay.hide) {
            this.hide();
            return 
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
        this.el.select('.popover-title').dom.innerHtml = this.title;
        if (this.html !== false) {
            this.el.select('.popover-content',true).dom.innerHtml = this.title;
        }
        this.el.removeClass('fade top bottom left right in');
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
        this.el.setXY([0,0]);
        this.el.show();
        this.el.addClass(placement);
        
        this.el.appendTo(on_el);
        
        var p = this.getPosition();
        var box = this.el.getBox();
        
        if (autoPlace) {
            // fixme..
        }
        
        this.el.alignTo(on_el, placement[0]);
        
        this.hoverState = null;
        
        if (this.el.hasClass('fade')) {
            // fade it?
            
        }
        
    },
    hide : function()
    {
        this.removeClass('in');
        
    }
    
});

 

 