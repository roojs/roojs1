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

Roo.namespace(Roo.svg);

Roo.svg.Canvas = function(cfg)
{
    Roo.svg.Canvas.superclass.constructor.call(this, config);
    
    
}

Roo.extend(Roo.svg.Canvas, Roo.BoxComponent,  {
   
    getAutoCreate : function(){
        
        var cfg = {
            tag: this.tag,
            // cls: this.cls, double assign in parent class Component.js :: onRender
            html: this.html
        };
        return {
            ns: "svg",
            xmlns: "http://www.w3.org/2000/svg",
            tag: "svg",
            width: this.wrapper.dom.clientWidth,
            height: this.wrapper.dom.clientHeight,
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
        Roo.bootstrap.Element.superclass.initEvents.call(this);
        
        if(this.clickable){
            this.el.on('click', this.onClick, this);
        }
        
        
    },
   
   
});