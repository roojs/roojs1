/*
 * - LGPL
 *
 * Card header - holder for the card header elements.
 * 
 */

/**
 * @class Roo.bootstrap.CardHeader
 * @extends Roo.bootstrap.Element
 * Bootstrap Element class
 * @constructor
 * Create a new Element
 * @param {Object} config The config object
 */

Roo.bootstrap.Element = function(config){
    Roo.bootstrap.Element.superclass.constructor.call(this, config);
    
    this.addEvents({
        // raw events
        /**
         * @event click
         * When a element is chick
         * @param {Roo.bootstrap.Element} this
         * @param {Roo.EventObject} e
         */
        "click" : true
    });
};

Roo.extend(Roo.bootstrap.Element, Roo.bootstrap.Component,  {
    
    tag: 'div',
    container_method : 'getCardHeader',
    
    getAutoCreate : function() {
        
        var cfg = {
            tag: 'div',
            cls : 'card-header'
        };
        
        return cfg;
    } 
    
    
   
});

 

 