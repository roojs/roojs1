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
 @cfg {String} graphtype  bar | vbar | pie
 @cfg {number} g_x coodinator | centre x (pie)
 @cfg {number} g_y coodinator | centre y (pie)
 @cfg {number} g_r radius (pie)
 @cfg {number} g_height height of the chart (respected by all elements in the set)
 @cfg {number} g_width width of the chart (respected by all elements in the set)
 @cfg {Object} title The title of the chart
    
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
    g_width: 400,
    g_x: 50,
    g_y: 50,
    g_r: 30,
    opts:{
        //g_colors: this.colors,
        g_type: 'soft',
        g_gutter: '20%'

    },
    title : false,

    getAutoCreate : function(){
        
        var cfg = {
            tag: 'div',
            html : null
        }
        
        
        return  cfg;
    },

    onRender : function(ct,position){
        Roo.bootstrap.Graph.superclass.onRender.call(this,ct,position);
        this.raphael = Raphael(this.el.dom);
        
                    // data1 = [[55, 20, 13, 32, 5, 1, 2, 10], [10, 2, 1, 5, 32, 13, 20, 55], [12, 20, 30]],
                    // data2 = [[55, 20, 13, 32, 5, 1, 2, 10], [10, 2, 1, 5, 32, 13, 20, 55], [12, 20, 30]],
                    // data3 = [[55, 20, 13, 32, 5, 1, 2, 10], [10, 2, 1, 5, 32, 13, 20, 55], [12, 20, 30]],
                    // txtattr = { font: "12px 'Fontin Sans', Fontin-Sans, sans-serif" };
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
//        var xdata = [55, 20, 13, 32, 5, 1, 2, 10,5 , 10];
//        
//        this.load(null,xdata,{
//                axis : "0 0 1 1",
//                axisxlabels :  xdata
//                });

    },

    load : function(graphtype,xdata,opts){
        this.raphael.clear();
        if(!graphtype) {
            graphtype = this.graphtype;
        }
        if(!opts){
            opts = this.opts;
        }
        var r = this.raphael,
            fin = function () {
                this.flag = r.popup(this.bar.x, this.bar.y, this.bar.value || "0").insertBefore(this);
            },
            fout = function () {
                this.flag.animate({opacity: 0}, 300, function () {this.remove();});
            },
            pfin = function() {
                this.sector.stop();
                this.sector.scale(1.1, 1.1, this.cx, this.cy);

                if (this.label) {
                    this.label[0].stop();
                    this.label[0].attr({ r: 7.5 });
                    this.label[1].attr({ "font-weight": 800 });
                }
            },
            pfout = function() {
                this.sector.animate({ transform: 's1 1 ' + this.cx + ' ' + this.cy }, 500, "bounce");

                if (this.label) {
                    this.label[0].animate({ r: 5 }, 500, "bounce");
                    this.label[1].attr({ "font-weight": 400 });
                }
            };

        switch(graphtype){
            case 'bar':
                this.raphael.barchart(this.g_x,this.g_y,this.g_width,this.g_height,xdata,opts).hover(fin,fout);
                break;
            case 'hbar':
                this.raphael.hbarchart(this.g_x,this.g_y,this.g_width,this.g_height,xdata,opts).hover(fin,fout);
                break;
            case 'pie':
//                opts = { legend: ["%% - Enterprise Users", "% - ddd","Chrome Users"], legendpos: "west", 
//                href: ["http://raphaeljs.com", "http://g.raphaeljs.com"]};
//            
                Roo.log(opt);
                this.raphael.piechart(this.g_x,this.g_y,this.g_r,xdata,opts).hover(pfin, pfout);
                
                
                break;

        }
        
        if(this.title){
            this.raphael.text(this.title.x, this.title.y, this.title.text).attr(this.title.attr);
        }
        
    },
    
    setTitle: function(o)
    {
        this.title = o;
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

 
