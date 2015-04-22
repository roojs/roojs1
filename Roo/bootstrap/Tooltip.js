/*
 * - LGPL
 *
 * Tooltip
 * 
 */

/**
 * @class Roo.bootstrap.Tooltip
 * Bootstrap Tooltip class
 * @cfg {String} html contents of the popover   (or false to use children..)
 * @cfg {String} title of popover (or false to hide)
 * @cfg {String} placement how it is placed
 * @cfg {String} trigger click || hover (or false to trigger manually)
 * @cfg {String} over what (parent or false to trigger manually.)
 * 
 * @constructor
 * Create a new Popover
 * @param {Object} config The config object
 */

Roo.bootstrap.Tooltip = function(config){
    Roo.bootstrap.Tooltip.superclass.constructor.call(this, config);
};

Roo.apply(Roo.bootstrap.Tooltip, {
    /**
     * @function init initialize tooltip monitoring.
     * @static
     */
    currentEl : false,
    currentTip : false,
    
    
    //  init : delay?
    
    init : function()
    {
        Roo.get(document).on('mouseover', this.enter ,this);
        Roo.get(document).on('mouseout', this.leave, this);
         
        
        this.currentTip = new Roo.bootstrap.Tooltip();
    },
    
    enter : function(ev)
    {
        var dom = ev.getTarget();
        
        var el = Roo.fly(dom);
        if (this.currentEl) {
            Roo.log(dom);
            Roo.log(this.currentEl.contains(dom));
            if (this.currentEl == el) {
                return;
            }
            if (dom != this.currentEl.dom && this.currentEl.contains(dom)) {
                return;
          }

        }
        
        
        
        if (this.currentTip) {
            this.currentTip.hide();
        }    
        //Roo.log(el);
        if (!el.attr('tooltip')) { // parents who have tip?
            return;
        }
        this.currentEl = el;
        this.currentTip.bind(el);
        this.currentTip.enter();
        
    },
    leave : function(ev)
    {
        var dom = ev.getTarget();
        if (!this.currentEl) {
            return;
        }
        
        
        if (dom != this.currentEl.dom && this.currentEl.contains(dom)) {
            return;
        }
        
        if (this.currentTip) {
            this.currentTip.leave();
        }
        Roo.log('clear currentEl');
        
        this.currentEl = false;
        
    },
    alignment : {
        'left' : ['r-l', [-2,0], 'right'],
        'right' : ['l-r', [2,0], 'left'],
        'bottom' : ['t-b', [0,2], 'top'],
        'top' : [ 'b-t', [0,-2], 'bottom']
    }
    
});


Roo.extend(Roo.bootstrap.Tooltip, Roo.bootstrap.Component,  {
    
    
    bindEl : false,
    
    delay : null, // can be { show : 300 , hide: 500}
    
    timeout : null,
    
    hoverState : null, //???
    
    placement : 'bottom', 
    
    getAutoCreate : function(){
    
        var cfg = {
           cls : 'tooltip',
           role : 'tooltip',
           cn : [
                {
                    cls : 'tooltip-arrow'
                },
                {
                    cls : 'tooltip-inner',
                }
           ]
        };
        
        return cfg;
    },
    bind : function(el)
    {
        this.bindEl = el;
    },
      
    
    enter : function () {
       
        if (this.timeout != null) {
            clearTimeout(this.timeout);
        }
        
        this.hoverState = 'in'
         Roo.log("enter - show");
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
    leave : function()
    {
        clearTimeout(this.timeout);
    
        this.hoverState = 'out'
        var delay = this.delay && this.delay.hide ? this.delay.hide : 500;
       /* if (!this.delay || !this.delay.hide) {
            this.hide();
            return 
        }
        */
        var _t = this;
        this.timeout = setTimeout(function () {
            Roo.log("leave - timeout");
            
            if (_t.hoverState == 'out') {
                _t.hide();
            }
        }, delay)
    },
    
    show : function ()
    {
        if (!this.el) {
            this.render(document.body);
        }
        // set content.
        Roo.log([this.bindEl, this.bindEl.attr('tooltip')]);
        this.el.select('.tooltip-inner',true).first().dom.innerHTML = this.bindEl.attr('tooltip');
        
        this.el.removeClass(['fade','top','bottom', 'left', 'right','in']);
        
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
        //this.el.dom.style.display='block';
        this.el.addClass(placement);
        
        //this.el.appendTo(on_el);
        
        var p = this.getPosition();
        var box = this.el.getBox();
        
        if (autoPlace) {
            // fixme..
        }
        var align = Roo.bootstrap.Tooltip.alignment[placement]
        this.el.alignTo(this.bindEl, align[0],align[1]);
        //var arrow = this.el.select('.arrow',true).first();
        //arrow.set(align[2], 
        
        this.el.addClass('in fade');
        this.hoverState = null;
        
        if (this.el.hasClass('fade')) {
            // fade it?
        }
        
    },
    hide : function()
    {
         
        if (!this.el) {
            return;
        }
        //this.el.setXY([0,0]);
        this.el.removeClass('in');
        //this.el.hide();
        
    }
    
});
 

 