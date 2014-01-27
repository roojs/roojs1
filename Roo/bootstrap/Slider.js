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

Roo.bootstrap.Slider = function(config){
    Roo.bootstrap.Slider.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Slider, Roo.bootstrap.Component,  {
	
    getAutoCreate : function(){
        
        var cfg = {
            tag: 'div'
        }
        
        return cfg;
    }
   
});

 