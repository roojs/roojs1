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
 *    
 * @constructor
 * Create a new Container
 * @param {Object} config The config object
 */

Roo.bootstrap.Container = function(config){
    Roo.bootstrap.Container.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Container, Roo.bootstrap.Component,  {
     
    jumbotron : false, // doc me
	
    getAutoCreate : function(){
        
        var cfg = {
            cls: 'container',
            html : ''
        };
        if (this.jumbotron) {
            cfg.cls = 'jumbotron';
        }
        
        cfg.html = this.html || cfg.html;
        return cfg;
    }
   
});

 