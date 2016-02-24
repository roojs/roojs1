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
 * @cfg {Number} xsoff colspan offset out of 12 for mobile-sized screens or 0 for hidden
 * @cfg {Number} smoff colspan offset out of 12 for tablet-sized screens or 0 for hidden
 * @cfg {Number} mdoff colspan offset out of 12 for computer-sized screens or 0 for hidden
 * @cfg {Number} lgoff colspan offset out of 12 for large computer-sized screens or 0 for hidden
 *
 * 
 * @cfg {Boolean} hidden (true|false) hide the element
 * @cfg {String} alert (success|info|warning|danger) type alert (changes background / border...)
 * @cfg {String} fa (ban|check|...) font awesome icon
 * @cfg {Number} fasize (1|2|....) font awsome size

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
    xsoff: false,
    smoff: false,
    mdoff: false,
    lgoff: false,
    html: '',
    offset: 0,
    alert: false,
    fa: false,
    icon : false,
    hidden : false,
    fasize : 1,
    
    getAutoCreate : function(){
        var cfg = Roo.apply({}, Roo.bootstrap.Column.superclass.getAutoCreate.call(this));
        Roo.log(this.html);
        cfg = {
            tag: 'div',
            cls: 'column'
            html : this.html || ''
        };
        
        var settings=this;
        ['xs','sm','md','lg'].map(function(size){
            //Roo.log( size + ':' + settings[size]);
            
            if (settings[size+'off'] !== false) {
                cfg.cls += ' col-' + size + '-offset-' + settings[size+'off'] ;
            }
            
            if (settings[size] === false) {
                return;
            }
            Roo.log(settings[size]);
            if (!settings[size]) { // 0 = hidden
                cfg.cls += ' hidden-' + size;
                return;
            }
            cfg.cls += ' col-' + size + '-' + settings[size];
            
        });
        
        if (this.hidden) {
            cfg.cls += ' hidden';
        }
        
        if (this.alert && ["success","info","warning", "danger"].indexOf(this.alert) > -1) {
            cfg.cls +=' alert alert-' + this.alert;
        }
        
        
//        if (this.html.length) {
//            cfg.html = this.html;
//        }
        
        if (this.fa) {
            var fasize = '';
            if (this.fasize > 1) {
                fasize = ' fa-' + this.fasize + 'x';
            }
            cfg.html = '<i class="fa fa-'+this.fa + fasize + '"></i>' + (cfg.html || '');
            
            
        }
        if (this.icon) {
            cfg.html = '<i class="glyphicon glyphicon-'+this.icon + '"></i>' +  (cfg.html || '');
        }
        
        return cfg;
    }
   
});

 

 