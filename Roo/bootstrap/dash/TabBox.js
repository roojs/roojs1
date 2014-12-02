/*
 * - LGPL
 *
 * TabBox
 * 
 */
Roo.bootstrap.dash = Roo.bootstrap.dash || {};

/**
 * @class Roo.bootstrap.dash.TabBox
 * @extends Roo.bootstrap.Component
 * Bootstrap TabBox class
 * @cfg {String} title Title of the TabBox
 * @cfg {String} icon Icon of the TabBox
 * 
 * @constructor
 * Create a new TabBox
 * @param {Object} config The config object
 */


Roo.bootstrap.dash.TabBox = function(config){
    Roo.bootstrap.dash.TabBox.superclass.constructor.call(this, config);
    
    this.addEvents({
        // img events
        /**
         * @event click
         * The img click event for the img.
         * @param {Roo.EventObject} e
         */
        "click" : true
    });
};

Roo.extend(Roo.bootstrap.dash.TabBox, Roo.bootstrap.Component,  {

    title : '',
    icon : false,
    
    getAutoCreate : function(){
        
        var header = {
            tag: 'li',
            cls: 'pull-left header',
            html: this.title,
            cn : []
        };
        
        if(this.icon){
            header.cn.push({
                tag: 'i',
                cls: 'fa ' + this.icon
            });
        }
        
        
        var cfg = {
            tag: 'div',
            cls: 'nav-tabs-custom',
            cn: [
                {
                    tag: 'ul',
                    cls: 'nav nav-tabs pull-right',
                    cn: [
                        header
                    ]
                }
            ]
        }

        return  cfg;
    },
    
    initEvents: function() {
        
//        var _this = this;
//        Roo.each(_this.el.select('li',true).elements, function(el){
//            Roo.log(el);
//            el.on('click', _this.onClick, el);
//        })
    },
    
    onClick : function(e)
    {
//        Roo.log('img onclick');
//
//        this.findParent('ul',false, true).select('li.active').removeClass('active');
//        this.addClass('active');
//        Roo.log(this);

    }
   
});

 
