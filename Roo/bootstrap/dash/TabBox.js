/*
 * - LGPL
 *
 * TabBox
 * 
 */


/**
 * @class Roo.bootstrap.dash.TabBox
 * @extends Roo.bootstrap.Component
 * Bootstrap TabBox class
 * @cfg {String} bgcolor
 * @cfg {number} sm 4
 * @cfg {number} md 5
 * @cfg {String} headline
 * @cfg {String} title
 * @cfg {String} more_url
 * @cfg {String} more_text
 * @cfg {Array}  opts values
 * 
 * @constructor
 * Create a new Input
 * @param {Object} config The config object
 */

Roo.bootstrap.dash = Roo.bootstrap.dash || {};
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
    
    bgcolor:'',
    // width: 200,
    height: 150,
    headline: '',
    title: 'Title',
    more_url: '',
    more_text: '',

    getAutoCreate : function(){
        
        var cfg = {
            tag: 'div',
            cls: 'small-box',
            html : null,
            cn: [
            {
                tag: 'h3',
                cls: '',
                html: this.headline ? this.headline : 'Headline'
            },
            {
                tag: 'p',
                cls: '',
                html: this.title ? this.title : 'Title'
            },
            {
                tag: 'div',
                cls: '',
                html : null,
                cn: [{
                    tag: 'a',
                    href: this.more_url,
                    cls: 'small-box-footer',
                    html: this.more_text
                }]

            }]
        }

        cfg.cls += ' bg-' + (this.bgcolor ? this.bgcolor : 'aqua' );
        if(!this.more_text){
            cfg.cn[2].cn = null;

        }

        return  cfg;
    },
    
    initEvents: function() {
        
        if(!this.href){
            this.el.on('click', this.onClick, this);
        }
    },
    
    onClick : function(e)
    {
        Roo.log('img onclick');
        this.fireEvent('click', this, e);
    }
   
});

 
