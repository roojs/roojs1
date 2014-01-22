/*
 * - LGPL
 *
 * page container.
 * 
 */


/**
 * @class Roo.bootstrap.Container
 * @extends Roo.bootstrap.Component
 * Bootstrap Container class
 * @cfg {Boolean} jumbotron is it a jubmotron element
 * @cfg {String} html content of element
    
 * @constructor
 * Create a new Navbar Button
 * @param {Object} config The config object
 */

Roo.bootstrap.Container = function(config){
    Roo.bootstrap.Container.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Container, Roo.bootstrap.Component,  {
     
    jumbotron : false, // doc me
	autoCreate : {
        cls: 'container',
        html : null
    },
    getAutoCreate : function(){
        
        var cfg = Roo.apply({}, Roo.bootstrap.Container.superclass.getAutoCreate.call(this));
        if (this.jumbotron) {
            cfg.cls = 'jumbotron';
        }
        
        cfg.html = this.html || cfg.html;
        return cfg;
    }
   
});

 