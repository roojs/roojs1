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
 * @cfg {DomElement} do_render - if this is set, then the constructor will try and initialize render, using this as the start point
 
 */

Roo.bootstrap.Body = function(config){

    config = config || {};

    Roo.bootstrap.Body.superclass.constructor.call(this, config);
    this.el = Roo.get(config.el ? config.el : document.body );
    if (this.cls && this.cls.length) {
        Roo.get(document.body).addClass(this.cls);
    }
    if (config.do_render) {
	this.onRender(config.do_render, '');
	this.addxtypeChildren(config.items);
    }
    
};

Roo.extend(Roo.bootstrap.Body, Roo.bootstrap.Component,  {

    do_render : false,
    is_body : true,// just to make sure it's constructed?

    autoCreate : {
        cls: 'container'
    },
    onRender : function(ct, position)
    {
        if (!this.do_render) {
	    return;
	}
	this.el = this.do_render;
        /* Roo.log("Roo.bootstrap.Body - onRender");
        if (this.cls && this.cls.length) {
            Roo.get(document.body).addClass(this.cls);
        }
        // style??? xttr???
        */
    }




});
