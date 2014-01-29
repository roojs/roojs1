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
 * @cfg {Boolean} jumbotron is it a jumbotron element
 * @cfg {String} html content of element
 * @cfg {Boolean} well container is a well
 *    
 * @constructor
 * Create a new Container
 * @param {Object} config The config object
 */

Roo.bootstrap.Container = function(config){
    Roo.bootstrap.Container.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Container, Roo.bootstrap.Component,  {
    
    jumbotron : false,
    well: false,
    
    getAutoCreate : function(){
        
        var cfg = {
            cls: 'container',
            html : ''
        };
        if (this.jumbotron) {
            cfg.cls = 'jumbotron';
        }
	if (this.cls) {
	    cfg.cls = '';
	}
        
        cfg.html = this.html || cfg.html;
        return cfg;
    }
   
});

 