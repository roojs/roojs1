/*
 * - LGPL
 *
 * numberBox
 * 
 */
Roo.bootstrap.dash = Roo.bootstrap.dash || {};

/**
 * @class Roo.bootstrap.dash.NumberBox
 * @extends Roo.bootstrap.Component
 * Bootstrap NumberBox class
 * @cfg {String} bgcolor Box background color, such as (aqua | green | yellow | red etc..) Default aqua
 * @cfg {String} headline Box headline
 * @cfg {String} content Box content
 * @cfg {String} icon Box icon
 * @cfg {Boolean} footer Ture to generate the footer element Default false.
 * 
 * @constructor
 * Create a new Input
 * @param {Object} config The config object
 */


Roo.bootstrap.dash.NumberBox = function(config){
    Roo.bootstrap.dash.NumberBox.superclass.constructor.call(this, config);
    
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

Roo.extend(Roo.bootstrap.dash.NumberBox, Roo.bootstrap.Component,  {
    
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
                tag: 'div',
                cls: 'inner',
                cn:[
                    {
                        tag: 'h3',
                        cls: 'roo-headline',
                        html: this.headline ? this.headline : 'Headline'
                    },
                    {
                        tag: 'p',
                        cls: '',
                        html: this.title ? this.title : 'Title'
                    }
                ]
            },
            {
                
                tag: 'a',
                href: this.more_url,
                cls: 'small-box-footer',
                html: this.more_text,
                cn: [{
                    tag: 'i',
                    cls: 'fa fa-arrow-circle-right'
                }]

            }]
        }

        cfg.cls += ' bg-' + (this.bgcolor ? this.bgcolor : 'aqua' );
        if(!this.more_text){
            cfg.cn[1].cn = null;

        }

        return  cfg;
    },

    onRender : function(ct,position){
        Roo.bootstrap.dash.NumberBox.superclass.onRender.call(this,ct,position);


       
                
    },

    setHeadline: function ()
    {
        this.el.select('.roo-headline',true).first().dom.innerHTML = value;
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

 
