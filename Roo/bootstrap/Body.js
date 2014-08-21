/*
 * - LGPL
 *
 * Body
 * 
 */

/**
 * @class Roo.bootstrap.Body
 * @extends Roo.bootstrap.Component
 * Bootstrap Body class
 * 
 * @constructor
 * Create a new body
 * @param {Object} config The config object
 */

Roo.bootstrap.Body = function(config){
    Roo.bootstrap.Body.superclass.constructor.call(this, config);
    this.el = Roo.get(document.body);
};

Roo.extend(Roo.bootstrap.Body, Roo.bootstrap.Component,  {
      
	autoCreate : {
        cls: 'container'
    },
    onRender : function(ct, position)
    {
        if (this.cls && this.cls.length) {
            Roo.select('body').addClass(this.cls);
        }
        // style??? xttr???
    }
    
    
 
   
});

 