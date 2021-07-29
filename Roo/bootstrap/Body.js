/*
 * - LGPL
 *
 * Body
 *
 */

/**
 * @class Roo.bootstrap.Body
 * @extends Roo.bootstrap.Component
 * @builder-top
 * Bootstrap Body class
 *
 * @constructor
 * Create a new body
 * @param {Object} config The config object
 */

Roo.bootstrap.Body = function(config){

    config = config || {};

    Roo.bootstrap.Body.superclass.constructor.call(this, config);
    this.el = Roo.get(config.el ? config.el : document.body );
    if (this.cls && this.cls.length) {
        Roo.get(document.body).addClass(this.cls);
    }
};

Roo.extend(Roo.bootstrap.Body, Roo.bootstrap.Component,  {

    is_body : true,// just to make sure it's constructed?

	autoCreate : {
        cls: 'container'
    },
    onRender : function(ct, position)
    {
       /* Roo.log("Roo.bootstrap.Body - onRender");
        if (this.cls && this.cls.length) {
            Roo.get(document.body).addClass(this.cls);
        }
        // style??? xttr???
        */
    }




});
