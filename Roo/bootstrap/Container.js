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
 * @cfg {String} well (lg|sm|md) a well, large, small or medium.
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
    well: '',
    panel : '',
    header: '',
    footer : '',
    
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
        
        if (this.well.length) {
            switch (this.well) {
                case 'lg':
                case 'sm':
                    cfg.cls +'well well-' +this.well;
                    break;
                default:
                    cfg.cls +'well';
                    break;
            }
        }
        if (this.well.length) {
            switch (this.well) {
                case 'lg':
                case 'sm':
                    cfg.cls +'well well-' +this.well;
                    break;
                default:
                    cfg.cls +'well';
                    break;
            }
        }
        
        
        cfg.html = this.html || cfg.html;
        return cfg;
    }
   
});

 