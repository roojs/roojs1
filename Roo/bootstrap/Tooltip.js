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

Roo.appply(Roo.bootstrap.Tooltip, {
    /**
     * @function init initialize tooltip monitoring.
     * @static
     */
    currentEl : false,
    currentTip : false,
    
    
    //  init : delay?
    
    init : function()
    {
        Roo.get(document.documentElement).on('mouseenter', this.enter ,this);
        Roo.get(document.documentElement).on('mouseenter', this.leave, this);
        this.currentTip = new Roo.bootstrap.Tooltip();
    },
    
    enter : function(el)
    {
        if (this.currentEl == el) {
            return;
        }
        if (this.currentTip) {
            this.currentTip.hide();
        }  
            
        
        if (!el.attr('tooltip')) { // parents who have tip?
            return;
        }
        this.currentEl = el;
        this.currentTip.bind(el);
        this.currentTip.enter();
        
    },
    leave : function(el)
    {
        if (!this.currentEl) {
            return;
        }
        
        
    },
    alignment : {
        'left' : ['r-l', [-10,0], 'right'],
        'right' : ['l-r', [10,0], 'left'],
        'bottom' : ['t-b', [0,10], 'top'],
        'top' : [ 'b-t', [0,-10], 'bottom']
    }
    
}


Roo.extend(Roo.bootstrap.Tooltip, Roo.bootstrap.Component,  {
    
    
    bindEl : false,
    
    delay : 0,
    
    timeout : null,
    
    hoverState : null, //???
    
    placement : 'top', 
    
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
    }
      
    
    enter : function () {
       
        if (this.timeout != null) {
            clearTimeout(this.timeout);
        }
        
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
    leave : function()
    {
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
    
    show : function ()
    {
        
        // set content.
        this.el.select('.popover-inner',true).first().dom.innerHtml = this.bindEl.attr('tooltip');
        
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
        this.el.dom.style.display='block';
        this.el.addClass(placement);
        
        //this.el.appendTo(on_el);
        
        var p = this.getPosition();
        var box = this.el.getBox();
        
        if (autoPlace) {
            // fixme..
        }
        var align = Roo.bootstrap.Tooltip.alignment[placement]
        this.el.alignTo(on_el, align[0],align[1]);
        //var arrow = this.el.select('.arrow',true).first();
        //arrow.set(align[2], 
        
        this.el.addClass('in');
        this.hoverState = null;
        
        if (this.el.hasClass('fade')) {
            // fade it?
        }
        
    },
    hide : function()
    {
        this.el.setXY([0,0]);
        this.el.removeClass('in');
        this.el.hide();
        
    }
    
});

Roo.bootstrap.Popover.

 