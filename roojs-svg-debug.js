/**
 *
 * The SVG element.. - with a 'g' subelement, that can handle moving / panning etc..
 *
 *
 * The SVG element is the only element that handles events
 *   if you click on it, it will look for  roo-svg-observable in the event handler and pass on events to children.
 *
 *   
 * 
 *
 */

Roo.namespace('Roo.svg');

Roo.svg.Canvas = function(cfg)
{
    Roo.svg.Canvas.superclass.constructor.call(this, cfg);
    this.addEvents({
        'click' : true,
        'dblclick' : true,
        'context' : true
    });
    
}

Roo.extend(Roo.svg.Canvas, Roo.bootstrap.Component,  {
   
    
   
    getAutoCreate : function(){
        
       
        return {
            ns: "svg",
            xmlns: "http://www.w3.org/2000/svg",
            tag: "svg",
            width: 100,
            height: 100,
            cn : [
                {
                    ns: "svg",
                    tag: "g",
                    focusable : 'true'
                }
            ]
        };
    },
    
    initEvents: function() 
    {
        Roo.svg.Canvas.superclass.initEvents.call(this);
        // others...
        
        this.el.on('click', this.relayEvent, this);
        this.el.on('dblclick', this.relayEvent, this);
        this.el.on('context', this.relayEvent, this); // ??? any others
        this.g = this.el.select('g', true).first();
         
        
    },
    
    relayEvent: function(e)
    {
        //e.type
        var cel = e.getTarget('.roo-svg-observable', false, true);
        if (!cel || typeof(cel.listeners[e.type]) == 'undefined') {
            this.fireEvent(e.type);
            return;
        }
        cel.listeners[e.type].fire(e, cel);
          
    },
    
    
    fitToParent : function()
    {
        // should it fit Horizontal - as per this?
        // or fit full ? // in which case pan/zoom done by drag?
         
        if (!this.el.dom.parentNode) { // check if this Element still exists
            return;
        }
        (function() { 
            var p = Roo.get(this.el.dom.parentNode);
            var gs = this.g.dom.getBBox();
            var ratio = gs.height / gs.width;
            ratio = isNaN(ratio) || ratio < 0.2 ? 1 : ratio;
            var x = p.getComputedWidth()  - p.getFrameWidth('lr') - 20; // close as possible with scroll bar
            this.el.attr({
                width : x,
                height : x * ratio //p.getComputedHeight() - p.getFrameWidth('tb')
            });
            if (gs.height) {
                this.el.attr("viewBox", gs.x + " " + gs.y + " " + gs.width + " " + gs.height);
            }
            
        }).defer(300, this);
        
    } 
    
    
   
});/**
 *
 * The SVG element.. - with a 'g' subelement, that can handle moving / panning etc..
 *
 *
 * The SVG element is the only element that handles events
 *   if you click on it, it will look for  roo-svg-observable in the event handler and pass on events to children.
 *
 *    
 *
 */

Roo.namespace('Roo.svg');

Roo.svg.Element = function(cfg)
{
    Roo.svg.Element.superclass.constructor.call(this, cfg);
    this.addEvents({
        'click' : true,
        'dblclick' : true,
        'context' : true
    });
    
}

Roo.extend(Roo.svg.Element, Roo.Component,  {
   
    tag : 'g',
    
    cls : '',
   
    getAutoCreate : function(){
        
       
        return {
            ns: "svg",
            xmlns: "http://www.w3.org/2000/svg",
            tag: this.tag,
            cls : this.cls + ' roo-svg-observable'
        };
    },
    
    initEvents: function() 
    {
        Roo.svg.Canvas.superclass.initEvents.call(this);
        // others...
        this.el.relayEvent('click', this);
        this.el.relayEvent('dblclick', this);
        this.el.relayEvent('context', this);
        
    },
    
     // private
    onRender : function(ct, position)
    {
       // Roo.log("Call onRender: " + this.xtype);
        
        Roo.bootstrap.Component.superclass.onRender.call(this, ct, position);
        
        if(this.el){
            if (this.el.attr('xtype')) {
                this.el.attr('xtypex', this.el.attr('xtype'));
                this.el.dom.removeAttribute('xtype');
                
                this.initEvents();
            }
            
            return;
        }
        
         
        
        var cfg = Roo.apply({},  this.getAutoCreate());
        
        cfg.id = this.id || Roo.id();
        
        // fill in the extra attributes 
        if (this.xattr && typeof(this.xattr) =='object') {
            for (var i in this.xattr) {
                cfg[i] = this.xattr[i];
            }
        }
        
        if(this.dataId){
            cfg.dataId = this.dataId;
        }
        
        if (this.cls) {
            cfg.cls = (typeof(cfg.cls) == 'undefined') ? this.cls : cfg.cls + ' ' + this.cls;
        }
        
        if (this.style) { // fixme needs to support more complex style data.
            cfg.style = this.style;
        }
        
        if(this.name){
            cfg.name = this.name;
        }
        
        this.el = ct.createChild(cfg, position);
        
        if (this.tooltip) {
            this.tooltipEl().attr('tooltip', this.tooltip);
        }
        
        if(this.tabIndex !== undefined){
            this.el.dom.setAttribute('tabIndex', this.tabIndex);
        }
        
        this.initEvents();
	
    }
    
    
   
});