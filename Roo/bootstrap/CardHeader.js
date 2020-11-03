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

Roo.bootstrap.CardHeader = function(config){
    Roo.bootstrap.CardHeader.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.CardHeader, Roo.bootstrap.Element,  {
    
    tag: 'div',
    container_method : 'getCardHeader',
    
    getAutoCreate : function() {
        
        var cfg = {
            tag: 'div' 
        };
        
        return cfg;
    } 
    
    
   
});

 

 