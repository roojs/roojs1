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
            tag: 'div',
            cls: 'slider slider-sample1 vertical-handler ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all',
            cn: [
                {
                    tag: 'a',
                    cls: 'ui-slider-handle ui-state-default ui-corner-all'
                }
            ]
        }
        
        return cfg;
    }
   
});

 