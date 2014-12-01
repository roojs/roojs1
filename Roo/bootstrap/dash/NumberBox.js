/*
 * - LGPL
 *
 * numberBox
 * 
 */


/**
 * @class Roo.bootstrap.dash.NumberBox
 * @extends Roo.bootstrap.Component
 * Bootstrap NumberBox class
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
                        cls: '',
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

    // onRender : function(ct,position){
    //     Roo.bootstrap.Graph.superclass.onRender.call(this,ct,position);
                
    // },

    // load : function(graphtype,xdata){
    //     this.raphael.clear();
    //     if(!graphtype) {
    //         graphtype = this.graphtype;
    //     }
    //     switch(graphtype){
    //         case 'bar':
    //             this.raphael.barchart(this.g_x,this.g_y,this.g_width,this.g_height,xdata,this.opts);
    //             break;
    //         case 'hbar':
    //             this.raphael.hbarchart(this.g_x,this.g_y,this.g_width,this.g_height,xdata,this.opts);
    //             break;
    //         case 'pie':
    //             this.raphael.piechart(this.g_x,this.g_y,this.g_r,xdata,this.opts);
    //             break;

    //     }
    // },
    
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

 
