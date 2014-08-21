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
    if (this.cls && this.cls.length) {
        Roo.get(document.body).addClass(this.cls);
    }
};

Roo.extend(Roo.bootstrap.Body, Roo.bootstrap.Component,  {
      
	autoCreate : {
        cls: 'container'
    },
    onRender : function(ct, position)
    {
        Roo.log("Roo.bootstrap.Body - onRender");
        if (this.cls && this.cls.length) {
            Roo.get(document.body).addClass(this.cls);
        }
        // style??? xttr???
    }
    
    
 
   
});

 