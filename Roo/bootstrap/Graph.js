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
 * @cfg {String} href a tag href
 * @cfg {String} target (_self|_blank|_parent|_top)target for a href.
 * 
 * @constructor
 * Create a new Input
 * @param {Object} config The config object
 */

Roo.bootstrap.Graph = function(config){
    Roo.bootstrap.Graph.superclass.constructor.call(this, config);
    
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

Roo.extend(Roo.bootstrap.Graph, Roo.bootstrap.Component,  {
    
    sm: 4,
    md: 5,
    height:100;
    width:100;

    graphtype: 'bar',
    g_height: 500,
    g_width: 300,
    g_x: 100,
    g_y:400,
    opts:{
        g_colors: this.colors,
        g_type: 'square',
        g_gutter: '20%'
    },

    getAutoCreate : function(){
        
        var cfg = {
            tag: 'div',
            //cls: (this.imgResponsive) ? 'img-responsive' : '',
            html : null
        }
        
        
        return  cfg;
    },

    onRender : function(ct,position){
        Roo.bootstrap.Graph.superclass.onRender.call(this,ct,position);
        var r = {};
        this.raphael = Raphael(this.el.dom),
                    data1 = [[55, 20, 13, 32, 5, 1, 2, 10], [10, 2, 1, 5, 32, 13, 20, 55], [12, 20, 30]],
                    data2 = [[55, 20, 13, 32, 5, 1, 2, 10], [10, 2, 1, 5, 32, 13, 20, 55], [12, 20, 30]],
                    data3 = [[55, 20, 13, 32, 5, 1, 2, 10], [10, 2, 1, 5, 32, 13, 20, 55], [12, 20, 30]],
                    txtattr = { font: "12px 'Fontin Sans', Fontin-Sans, sans-serif" };
                /*
                r.text(160, 10, "Single Series Chart").attr(txtattr);
                r.text(480, 10, "Multiline Series Chart").attr(txtattr);
                r.text(160, 250, "Multiple Series Stacked Chart").attr(txtattr);
                r.text(480, 250, 'Multiline Series Stacked Vertical Chart. Type "round"').attr(txtattr);
                
                r.barchart(10, 10, 300, 220, [[55, 20, 13, 32, 5, 1, 2, 10]], 0, {type: "sharp"});
                r.barchart(330, 10, 300, 220, data1);
                r.barchart(10, 250, 300, 220, data2, {stacked: true});
                r.barchart(330, 250, 300, 220, data3, {stacked: true, type: "round"});
                */
                
                // var xdata = [55, 20, 13, 32, 5, 1, 2, 10,5 , 10];
                // r.barchart(30, 30, 560, 250,  xdata, {
                //    labels : [55, 20, 13, 32, 5, 1, 2, 10,5 , 10],
                //     axis : "0 0 1 1",
                //     axisxlabels :  xdata
                //     //yvalues : cols,
                   
                // });

    },

    load : function(xdata){
        this.raphael.clear();
        this.raphael.vbarchar(this.g_x,this.g_y,this.g_width,this.g_height,xdata,this.opts);
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

 
