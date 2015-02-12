/*
 * - LGPL
 *
 * column
 * 
 */

/**
 * @class Roo.bootstrap.Column
 * @extends Roo.bootstrap.Component
 * Bootstrap Column class
 * @cfg {Number} xs colspan out of 12 for mobile-sized screens or hide
 * @cfg {Number} sm colspan out of 12 for tablet-sized screens or hide
 * @cfg {Number} md colspan out of 12 for computer-sized screens or hide
 * @cfg {Number} lg colspan out of 12 for large computer-sized screens or hide
 * @cfg {String} html content of column.
 * 
 * @constructor
 * Create a new Column
 * @param {Object} config The config object
 */

Roo.bootstrap.Column = function(config){
    Roo.bootstrap.Column.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Column, Roo.bootstrap.Component,  {
    
    xs: null,
    sm: null,
    md: null,
    lg: null,
    html: '',
    offset: 0,
    
    getAutoCreate : function(){
        var cfg = Roo.apply({}, Roo.bootstrap.Column.superclass.getAutoCreate.call(this));
        
        cfg = {
            tag: 'div',
            cls: 'column'
        };
        
        var settings=this;
        ['xs','sm','md','lg'].map(function(size){
            if (settings[size]) {
                if (settings[size] == 'hide') {
                    cfg.cls += 'hidden-' + size;
                    return;
                }
                cfg.cls += ' col-' + size + '-' + settings[size];
            }
        });
        if (this.html.length) {
            cfg.html = this.html;
        }
	
        return cfg;
    }
   
});

 

 