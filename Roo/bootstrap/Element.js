/*
 * - LGPL
 *
 * element
 * 
 */

/**
 * @class Roo.bootstrap.Element
 * @extends Roo.bootstrap.Component
 * Bootstrap Element class
 * @cfg {String} html contents of the element
 * @cfg {String} tag tag of the element
 * @cfg {String} cls class of the element
 * 
 * @constructor
 * Create a new Element
 * @param {Object} config The config object
 */

Roo.bootstrap.Element = function(config){
    Roo.bootstrap.Element.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Element, Roo.bootstrap.Component,  {
    
    tag: 'div',
    cls: '',
    html: '',
     
    
    getAutoCreate : function(){
        
        var cfg = {
            tag: this.tag,
            cls: this.cls,
            html: this.html
        }
        
        
	
        return cfg;
    },
    
    adjustWidth : function(width){
        if(typeof width == "number"){
            if(this.autoBoxAdjust && !this.isBorderBox()){
               width -= (this.getBorderWidth("lr") + this.getPadding("lr"));
            }
            if(width < 0){
                width = 0;
            }
        }
        return width;
    }
   
});

 

 