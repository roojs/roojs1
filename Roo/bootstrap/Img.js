/*
 * - LGPL
 *
 * image
 * 
 */


/**
 * @class Roo.bootstrap.Img
 * @extends Roo.bootstrap.Component
 * Bootstrap Img class
 * @cfg {Boolean} imgResponsive false | true
 * @cfg {String} border rounded | circle | thumbnail
 * @cfg {String} src image source
 * @cfg {String} alt image alternative text
 * 
 * @constructor
 * Create a new Input
 * @param {Object} config The config object
 */

Roo.bootstrap.Img = function(config){
    Roo.bootstrap.Img.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Img, Roo.bootstrap.Component,  {
    
    imgResponsive: true,
    border: '',
    src: '',

    getAutoCreate : function(){
        
        cfg = {
            tag: 'img',
            cls: 'img-responsive',
            html : null
        }
        
        cfg.html = this.html || cfg.html;
        
        cfg.src = this.src || cfg.src;
        
        if (['rounded','circle','thumbnail'].indexOf(this.border)>-1) {
            cfg.cls += ' img-' + this.border;
        }
        
        if(this.alt){
            cfg.alt = this.alt;
        }
        
        return cfg;
    }
   
});

 