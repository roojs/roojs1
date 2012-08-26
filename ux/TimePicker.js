

 
           
Roo.ux.TimePicker = function(config){
    
    
    // these are required... error out if not avail..
    var deps = true;
    if (typeof(Raphael) == 'undefined') {
        deps = false;
    }
    if (deps && typeof(Raphael.prototype) == 'undefined') {
        deps = false;
    }
    if (!deps) {
        alert("Error - required components not found  - Raphael and piechart");
        return;
    }
    
    Roo.ux.TimePicker.superclass.constructor.call(this, config);
};

Roo.extend(Roo.ux.TimePicker , Roo.form.DisplayField ,  {
    
    paper : false,
    width: 350,
    height: 350,
    
    startHour : '7:30',
    endHour : '19:15',
    
    onRender : function(ct, position){
        
        Roo.form.DisplayField.superclass.onRender.call(this, ct, position);
        //if(this.inputValue !== undefined){
        this.wrap = this.el.wrap();
        
        this.viewEl = this.wrap.createChild({ tag: 'div', cls: 'x-form-displayfield'});
        
        
        //?? needed??
        if (this.bodyStyle) {
            this.viewEl.applyStyles(this.bodyStyle);
        }
        //this.viewEl.setStyle('padding', '2px');
        
        this.viewEl.setHeight(this.height);
        this.viewEl.setWidth(this.width);
    
    // let's create a pie chart...
        
        var paper = this.paper = Raphael(this.viewEl.dom);
        
        paper.setSize(this.width,this.height);
        
        var data = [];
        var colors = [];
        
        // say we open for 7 - 19
        var open = this.startHour.split(':').shift();
        var close = this.endHour.split(':').shift();
        
        data.push(open);
        
        // colours should be configurable...
        
        colors.push('#003'); // off hour..
        //var clr = [ '#003' , '#FCC' , '#FEE', '#FCC'];
        var clr = [ '#FEE', '#FCC' ];
                   
        var times = [ '' ];
        
        for (var i = open; i < close ;i++) {
            data.push(1);
            
            if (!i) {
                times.push( 'midnight')
            } else if (i == 12) {
                times.push( 'noon' );
            } else {
              
                times.push(hr );
            }
             
            colors.push(clr[i % clr.length]);
        }
        data.push( 24-close );
        colors.push('#003');
        
        //Roo.log(data.length);
        //Roo.log(JSON.stringify(data));
        //Roo.log(JSON.stringify(colors));
        //Roo.log(colors.length);

        var outerpie = this.outerpie = paper.piechart(
            paper.height  / 2,
            paper.height  / 2 ,
            (paper.height / 2) - 70,
            data ,
            { 
                cut: data.length   ,
                colors :  colors,
                no_sort : true,
                start_angle :  270
            }
        );
        // fill in th emiddle...
        
        paper.circle(pie.cx,pie.cy, (paper.height / 2) - 100).attr({fill: "#fff"})
        
        // fixme .. add the quater hour segments..
        
        var innerpie = this.innerpie = paper.piechart(
            paper.height  / 2,
            paper.height  / 2 ,
            (paper.height / 2) - 130,
            [ 1 , 1 ,1 , 1 ],
            { 
                cut: 4   ,
                colors :   [ '#FEE', '#FCC' ,'#FEE', '#FCC' ] ,
                no_sort : true,
                start_angle :  270
            }
        );
        
        paper.circle(pie.cx,pie.cy, (paper.height / 2) - 140).attr({fill: "#fff"})
        
        
        var atime = "Pick\nTime";
        var asector = false;
        
        var tdisplay  = paper.text(pie.cx,pie.cy,atime).attr({ font: "32px  'Lucida Sans Unicode', 'Lucida Grande', sans-serif", weight: 'bold', fill: '#000' });
        pie.hover(
             // in?
            function() {
                Roo.log(this.j);
                if (!this.j || this.j == data.length -1) {
                    return;
                }
                 this.sector.stop();
                 if (this.sector != asector) {
                    this.sector.scale(1.1, 1.1, this.cx, this.cy);
                 }
                 tdisplay.attr( { text : times[this.j]} );
                 if (this.label) {
                     this.label[0].stop();
                     this.label[0].attr({ r: 7.5 });
                     this.label[1].attr({ "font-weight": 800 });
                 }
             },
             // out..?
             function () {
                if (!this.j || this.j == data.length) {
                    return;
                }
                if (this.sector != asector) {
                    this.sector.animate({ transform: 's1 1 ' + this.cx + ' ' + this.cy }, 500, "bounce");
                }
 
                if (this.label) {
                     this.label[0].animate({ r: 5 }, 500, "bounce");
                     this.label[1].attr({ "font-weight": 400 });
                }
                tdisplay.attr( { text : atime } );
             
        });
        pie.click(function() {
            if (!this.j || this.j == data.length -1) {
                return;
            }
            atime = times[this.j];
            tdisplay.attr( { text : atime } );
            if (asector) {
                asector.animate({ transform: 's1 1 ' + this.cx + ' ' + this.cy }, 500, "bounce");
            }
            
            this.sector.scale(1.1, 1.1, this.cx, this.cy);
            asector = this.sector;

            
            
        })
        
        
        
        for (var i = 0; i < (24/3); i++) {
            var angle = ( (360/24) * i * -3 )  -90;
            var p = pie.sector(pie.cx, pie.cy, 120, angle, angle, false);
            Roo.log([p[4],p[5], (i*3)+':00']);
            
            var hr = (i*3);
            
            var txt = (hr < 12 ? hr : (hr-12)) +  (hr < 12 ? 'am' : 'pm');
            if (!hr) { txt  = ""; }
            if (hr == 12) { txt= '12 noon'}
            paper.text(p[4],p[5], txt);
        }
            
        //pie.each(function() { Roo.log(this)});
        this.setValue(this.value);
        
    });
    
    
});