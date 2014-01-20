/*
 * - LGPL
 *
 * page contgainer.
 * 
 */


/**
 * @class Roo.bootstrap.ButtonGroup
 * @extends Roo.bootstrap.Component
 * Bootstrap ButtonGroup class
 * @cfg {string} size lg | sm | xs (default empty normal)
 * @cfg {string} align vertical | justified  (default none)
 * @cfg {string} direction up | down (default down)
 * 
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
    
    autoCreate : {
        tag: 'img',
        cls: 'img-responsive',
        html : null
    },

    getAutoCreate : function(){
        
        var cfg = Roo.apply({}, Roo.bootstrap.Img.superclass.getAutoCreate.call(this));
        
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

 