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

Roo.svg.Element = function(cfg)
{
    Roo.svg.Element.superclass.constructor.call(this, cfg);
    this.addEvents({
        'click' : true,
        'dblclick' : true,
        'context' : true
    });
    
}

Roo.extend(Roo.svg.Element, Roo.BoxComponent,  {
   
    tag : 'g',
    
   
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
        
    }
    
     
    
    
   
});