/*
 * - LGPL
 *
 * Tooltip
 * 
 */

/**
 * @class Roo.bootstrap.Tooltip
 * Bootstrap Tooltip class
 * This is basic at present - all componets support it by default, however they should add tooltipEl() method
 * to determine which dom element triggers the tooltip.
 * 
 * It needs to add support for additional attributes like tooltip-position
 * 
 * @constructor
 * Create a new Toolti
 * @param {Object} config The config object
 */

Roo.bootstrap.Tooltip = function(config){
    Roo.bootstrap.Tooltip.superclass.constructor.call(this, config);
    
    this.alignment = Roo.bootstrap.Tooltip.alignment;
    
    if(typeof(config) != 'undefined' && typeof(config.alignment) != 'undefined'){
        this.alignment = config.alignment;
    }
    
};

Roo.apply(Roo.bootstrap.Tooltip, {
    /**
     * @function init initialize tooltip monitoring.
     * @static
     */
    currentEl : false,
    currentTip : false,
    currentRegion : false,
    
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
        
        //Roo.log(['enter',dom]);
        var el = Roo.fly(dom);
        if (this.currentEl) {
            //Roo.log(dom);
            //Roo.log(this.currentEl);
            //Roo.log(this.currentEl.contains(dom));
            if (this.currentEl == el) {
                return;
            }
            if (dom != this.currentEl.dom && this.currentEl.contains(dom)) {
                return;
            }

        }
        
        if (this.currentTip.el) {
            this.currentTip.el.setVisibilityMode(Roo.Element.DISPLAY).hide(); // force hiding...
        }    
        //Roo.log(ev);
        
        if(!el || el.dom == document){
            return;
        }
        
        var bindEl = el; 
        var pel = false;
        if (!el.attr('tooltip')) {
            pel = el.findParent("[tooltip]");
            if (pel) {
                bindEl = Roo.get(pel);
            }
        }
        
       
        
        // you can not look for children, as if el is the body.. then everythign is the child..
        if (!pel && !el.attr('tooltip')) { //
            if (!el.select("[tooltip]").elements.length) {
                return;
            }
            // is the mouse over this child...?
            bindEl = el.select("[tooltip]").first();
            var xy = ev.getXY();
            if (!bindEl.getRegion().contains( { top : xy[1] ,right : xy[0] , bottom : xy[1], left : xy[0]})) {
                //Roo.log("not in region.");
                return;
            }
            //Roo.log("child element over..");
            
        }
        this.currentEl = el;
        this.currentTip.bind(bindEl);
        this.currentRegion = Roo.lib.Region.getRegion(dom);
        this.currentTip.enter();
        
    },
    leave : function(ev)
    {
        var dom = ev.getTarget();
        //Roo.log(['leave',dom]);
        if (!this.currentEl) {
            return;
        }
        
        
        if (dom != this.currentEl.dom) {
            return;
        }
        var xy = ev.getXY();
        if (this.currentRegion.contains( new Roo.lib.Region( xy[1], xy[0] ,xy[1], xy[0]  ))) {
            return;
        }
        // only activate leave if mouse cursor is outside... bounding box..
        
        
        
        
        if (this.currentTip) {
            this.currentTip.leave();
        }
        //Roo.log('clear currentEl');
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
    
    alignment : false,
    
    getAutoCreate : function(){
    
        var cfg = {
           cls : 'tooltip',   
           role : 'tooltip',
           cn : [
                {
                    cls : 'tooltip-arrow arrow'
                },
                {
                    cls : 'tooltip-inner'
                }
           ]
        };
        
        return cfg;
    },
    bind : function(el)
    {
        this.bindEl = el;
    },
    
    initEvents : function()
    {
        this.arrowEl = this.el.select('.arrow', true).first();
        this.innerEl = this.el.select('.tooltip-inner', true).first();
    },
    
    enter : function () {
       
        if (this.timeout != null) {
            clearTimeout(this.timeout);
        }
        
        this.hoverState = 'in';
         //Roo.log("enter - show");
        if (!this.delay || !this.delay.show) {
            this.show();
            return;
        }
        var _t = this;
        this.timeout = setTimeout(function () {
            if (_t.hoverState == 'in') {
                _t.show();
            }
        }, this.delay.show);
    },
    leave : function()
    {
        clearTimeout(this.timeout);
    
        this.hoverState = 'out';
         if (!this.delay || !this.delay.hide) {
            this.hide();
            return;
        }
       
        var _t = this;
        this.timeout = setTimeout(function () {
            //Roo.log("leave - timeout");
            
            if (_t.hoverState == 'out') {
                _t.hide();
                Roo.bootstrap.Tooltip.currentEl = false;
            }
        }, delay);
    },
    
    show : function (msg)
    {
        if (!this.el) {
            this.render(document.body);
        }
        // set content.
        //Roo.log([this.bindEl, this.bindEl.attr('tooltip')]);
        
        var tip = msg || this.bindEl.attr('tooltip') || this.bindEl.select("[tooltip]").first().attr('tooltip');
        
        this.el.select('.tooltip-inner',true).first().dom.innerHTML = tip;
        
        this.el.removeClass(['fade','top','bottom', 'left', 'right','in',
                             'bs-tooltip-top','bs-tooltip-bottom', 'bs-tooltip-left', 'bs-tooltip-right']);

        if(this.bindEl.attr('tooltip-class')) {
            this.el.addClass(this.bindEl.attr('tooltip-class'));
        }
        
        var placement = typeof this.placement == 'function' ?
            this.placement.call(this, this.el, on_el) :
            this.placement;
        
        if(this.bindEl.attr('tooltip-placement')) {
            placement = this.bindEl.attr('tooltip-placement');
        }
            
        var autoToken = /\s?auto?\s?/i;
        var autoPlace = autoToken.test(placement);
        if (autoPlace) {
            placement = placement.replace(autoToken, '') || 'top';
        }
        
        //this.el.detach()
        //this.el.setXY([0,0]);
        this.el.show();
        //this.el.dom.style.display='block';
        
        //this.el.appendTo(on_el);
        
        var p = this.getPosition();
        var box = this.el.getBox();
        
        if (autoPlace) {
            // fixme..
        }
        
        var align = this.alignment[placement];
        
        var xy = this.el.getAlignToXY(this.bindEl, align[0], align[1]);
        
        if(placement == 'top' || placement == 'bottom'){
            if(xy[0] < 0){
                placement = 'right';
            }
            
            if(xy[0] + this.el.getWidth() > Roo.lib.Dom.getViewWidth()){
                placement = 'left';
            }
            
            var scroll = Roo.select('body', true).first().getScroll();
            
            if(xy[1] > Roo.lib.Dom.getViewHeight() + scroll.top - this.el.getHeight()){
                placement = 'top';
            }
            
            align = this.alignment[placement];
            
            this.arrowEl.setLeft((this.innerEl.getWidth()/2) - 5);
            
        }
        
        var elems = document.getElementsByTagName('div');
        var highest = Number.MIN_SAFE_INTEGER || -(Math.pow(2, 53) - 1);
        for (var i = 0; i < elems.length; i++) {
          var zindex = Number.parseInt(
                document.defaultView.getComputedStyle(elems[i], null).getPropertyValue("z-index"),
                10
          );
          if (zindex > highest) {
            highest = zindex;
          }
        }
        
        
        
        this.el.dom.style.zIndex = highest;
        
        this.el.alignTo(this.bindEl, align[0],align[1]);
        //var arrow = this.el.select('.arrow',true).first();
        //arrow.set(align[2], 
        
        this.el.addClass(placement);
        this.el.addClass("bs-tooltip-"+ placement);
        
        this.el.addClass('in fade show');
        
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
        if(this.bindEl.attr('tooltip-class')) {
            this.el.removeClass(this.bindEl.attr('tooltip-class'));
        }
        this.el.removeClass(['show', 'in']);
        //this.el.hide();
        
    }
    
});
 

 