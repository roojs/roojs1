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
	
    },
    
    
   
});