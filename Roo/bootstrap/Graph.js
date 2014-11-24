/*
 * - LGPL
 *
 * Graph
 * 
 */


/**
 * @class Roo.bootstrap.Graph
 * @extends Roo.bootstrap.Component
 * Bootstrap Graph class
> Prameters
 -sm {number} sm 4
 -md {number} md 5
 -graphtype {String} graphtype bar | vbar | pie
 -g_x {number}  x coodinator | centre x (pie)
 -g_y {number}  y coodinator | centre y (pie)
 -g_r {number}  radius (pie)
 -g_height {number} height of the chart (respected by all elements in the set)
 -g_width {number}  width of the chart (respected by all elements in the set)
 -{Array}  values
 -opts (object) options for the chart 
     o {
     o type (string) type of endings of the bar. Default: 'square'. Other options are: 'round', 'sharp', 'soft'.
     o gutter (number)(string) default '20%' (WHAT DOES IT DO?)
     o vgutter (number)
     o colors (array) colors be used repeatedly to plot the bars. If multicolumn bar is used each sequence of bars with use a different color.
     o stacked (boolean) whether or not to tread values as in a stacked bar chart
     o to
     o stretch (boolean)
     o }
 -opts (object) options for the pie
     o{
     o cut
     o startAngle (number)
     o endAngle (number)
     } 
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
    graphtype: 'bar',
    g_height: 250,
    g_width: 650,
    g_x: 50,
    g_y: 50,
    g_r: 30,
    opts:{
        //g_colors: this.colors,
        g_type: 'soft',
        g_gutter: '20%'

    },

    getAutoCreate : function(){
        
        var cfg = {
            tag: 'div',
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

    load : function(graphtype,xdata,opts){
        this.raphael.clear();
        if(!graphtype) {
            graphtype = this.graphtype;
        }
        if(!opts){
            opts = this.opts;
        }
        switch(graphtype){
            case 'bar':
                this.raphael.barchart(this.g_x,this.g_y,this.g_width,this.g_height,xdata,opts);
                break;
            case 'hbar':
                this.raphael.hbarchart(this.g_x,this.g_y,this.g_width,this.g_height,xdata,opts);
                break;
            case 'pie':
                this.raphael.piechart(this.g_x,this.g_y,this.g_r,xdata,opts);
                break;

        }
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

 
