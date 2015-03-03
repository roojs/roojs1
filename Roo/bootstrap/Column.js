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
 * @cfg {Number} xs colspan out of 12 for mobile-sized screens or 0 for hidden
 * @cfg {Number} sm colspan out of 12 for tablet-sized screens or 0 for hidden
 * @cfg {Number} md colspan out of 12 for computer-sized screens or 0 for hidden
 * @cfg {Number} lg colspan out of 12 for large computer-sized screens or 0 for hidden
 * @cfg {String} alert (success|info|warning|danger) type alert (changes background / border...)
 * @cfg {String} fa (ban|check|...) font awesome icon
 * @cfg {String} icon (info-sign|check|...) glyphicon name

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
    
    xs: false,
    sm: false,
    md: false,
    lg: false,
    html: '',
    offset: 0,
    alert: false,
    
    getAutoCreate : function(){
        var cfg = Roo.apply({}, Roo.bootstrap.Column.superclass.getAutoCreate.call(this));
        
        cfg = {
            tag: 'div',
            cls: 'column'
        };
        
        var settings=this;
        ['xs','sm','md','lg'].map(function(size){
            if (settings[size] !== false) {
                if (!settings[size]) { // 0 = hidden
                    cfg.cls += ' hidden-' + size;
                    return;
                }
                cfg.cls += ' col-' + size + '-' + settings[size];
            }
        });
        
        if (this.alert && ["success","info","warning", "danger"].indexOf(this.alert) > -1) {
            cfg.cls +=' alert alert-' + this.alert;
        }
        
        
        if (this.html.length) {
            cfg.html = this.html;
        }
	
        return cfg;
    }
   
});

 

 