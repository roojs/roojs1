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
        'context' : true,
    });
    
}

Roo.extend(Roo.svg.Canvas, Roo.bootstrap.Component,  {
   
    width: 100,
    height : 100, // changeable...
    
   
    getAutoCreate : function(){
        
       
        return {
            ns: "svg",
            xmlns: "http://www.w3.org/2000/svg",
            tag: "svg",
            width: this.width,
            height: this.height,
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
        this.g = this.el.select('g', true);
         
        
    },
    
    relayEvent: function(e)
    {
        //e.type
        var cel = e.getTarget().findParent('roo-svg-observable', false, true);
        if (typeof(cel.listeners[e.type]) == 'undefined') {
            this.fireEvent(e.type)
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
        var p = Roo.get(this.el.dom.parentNode);
        var gs = this.g.dom.getBBox();
        
        var x = p.getComputedWidth()  - p.getFrameWidth('lr');
        this.setSize(
            x,
            (gs.height / gs.width) //p.getComputedHeight() - p.getFrameWidth('tb')
        );
        
        
    }
    
    
   
});