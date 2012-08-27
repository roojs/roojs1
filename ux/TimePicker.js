

 
           
Roo.form.TimePicker = function(config){
    
    Roo.log("CTOR CALLED");
    // these are required... error out if not avail..
    var deps = true;
    if (typeof(Raphael) == 'undefined') {
        deps = false;
    }
    if (deps && typeof(Raphael.prototype) == 'undefined') {
        deps = false;
    }
    if (!deps) {
        Roo.log("Error - required components not found  - Raphael and piechart"); 
        return;
    }
    
    Roo.form.TimePicker.superclass.constructor.call(this, config);
    
    this.addEvents({
        /**
	     * @event select
	     * Fires when a date is selected
	     * @param {DatePicker} this
	     * @param {Date} date The selected date
	     */
        'select': true,
        
    });
    
};

Roo.extend(Roo.form.TimePicker , Roo.form.DisplayField ,  {
    
    paper : false,
    width: 280,
    height: 250,
    
    startHour : '7:30',
    endHour : '19:15',
    
    tdisplay  : false,
    
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
        
         
        var paper = this.paper = Raphael(this.viewEl.dom);
        
        paper.setSize(this.width,this.height);
        
        this.renderPaper(this.startHour,this.endHour);
    },
    
    
    
    renderPaper : function( startHour , endHour )
    { 
        // let's create a pie chart...
        var open =  startHour.split(':').shift() * 1;
        var close =  endHour.split(':').shift() * 1;
        
        var paper = this.paper;
        this.paper.clear();
        
        var data = [];
        var colors = [];
        
        // say we open for 7 - 19
        
        
        Roo.log([open, close]);
        data.push(open);
        
        // colours should be configurable...
        
        colors.push('#003'); // off hour..
        //var clr = [ '#003' , '#FCC' , '#FEE', '#FCC'];
        var clr = [ '#FEE', '#FCC' ];
                   
        var times = [ '' ];
        
        for (var i = open; i < close ;i++) {
            data.push(1);
            if (i < 10) {
                times.push( '0'  + i);
            } else { 
                times.push( '' + i);
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
            paper.width  / 2,
            paper.height  / 2 ,
            110,
            data ,
            { 
                cut: data.length   ,
                colors :  colors,
                no_sort : true,
                start_angle :  270
            }
        );
        
        
        // fill in th emiddle...
        
        paper.circle(outerpie.cx,outerpie.cy, 90).attr({fill: "#fff"})
        // fixme .. add the quater hour segments..
        
        var innerpie = this.innerpie = paper.piechart(
            paper.width  / 2,
            paper.height  / 2 ,
            80,
            [ 1 , 1 ,1 , 1 ],
            { 
                cut: 4   ,
                colors :   [ '#FEE', '#FCC' ,'#FEE', '#FCC' ] ,
                no_sort : true,
                start_angle :  135
            }
        );

        paper.circle(outerpie.cx,outerpie.cy, 60).attr({fill: "#fff"})
 
        
      
        var tdisplay  = this.tdisplay = paper.text(outerpie.cx,outerpie.cy, "Pick\nTime").attr({
                font: "32px  'Lucida Sans Unicode', 'Lucida Grande', sans-serif",
                weight: 'bold', fill: '#000' });
        
        
        
        
        
        for (var i = 0; i < (24/3); i++) {
            var angle = ( (360/24) * i * -3 )  -90;
            var p = outerpie.sector(outerpie.cx, outerpie.cy, 105, angle, angle, false);
            var innerp = outerpie.sector(outerpie.cx, outerpie.cy, 70, angle, angle, false);

            Roo.log([p[4],p[5], (i*3)+':00']);
            
            var hr = (i*3);
            
            var txt = (hr < 12 ? hr : (hr-12)) +  (hr < 12 ? 'am' : 'pm');
            if (!hr) { txt  = ""; }
            if (hr == 12) {
                txt= '12 noon'
            }
            
            paper.text(p[4],p[5], txt);
            // inner...
            if (i%2 ==1) {
                continue;
            }
            paper.text(innerp[4],innerp[5], ((Math.floor(i/2) * 15) + 30) % 60);
            
            
        }
        var asector = false;

        var _t = this;
        outerpie.hover(
             // in?
            function() {
                Roo.log(this.j);
                if (!this.j || this.j == data.length -1) {
                    return;
                }
                var ov = _t.getValue();
               
                this.sector.stop();
                
                 
                if (this.sector != asector) {
                    this.sector.scale(1.1, 1.1, this.cx, this.cy);
                }
            
                var min = ov ? _t.getValue().split(':').pop() : '00';
                var ntime = times[this.j] + ':' + min;
                tdisplay.attr( { text : _t.formatTime(ntime) });
                 
                
            },
             // out..?
            function () {
                if (!this.j || this.j == data.length) {
                    return;
                }
                if (this.sector != asector) {
                    this.sector.animate({ transform: 's1 1 ' + this.cx + ' ' + this.cy }, 500, "bounce");
                }
                    
                tdisplay.attr( { text : _t.formatTime(_t.getValue()) } );
             
        });
        outerpie.click(function() {
            if (!this.j || this.j == data.length -1) {
                return;
            }
           
            var ov = _t.getValue();
            var min = ov ? _t.getValue().split(':').pop() : '00';
            var ntime = times[this.j] + ':' + min;
            _t.setValue(ntime);
            _t.fireEvent('select', ntime);
            
            if (asector) {
                // reset 
                asector.transform( 's1 1');
            }
            
            //this.sector.scale(1.1, 1.1, this.cx, this.cy);
            asector = this.sector;
 
            
        });
        
         var bsector = false;

         innerpie.hover(
             // in?
            function() {
                Roo.log(this.j);
                /*
                if (!this.j || this.j == data.length -1) {
                    return;
                }
                */
                this.sector.stop();
                if (this.sector != bsector) {
                    this.sector.scale(1.1, 1.1, this.cx, this.cy);
                }
                var min = this.j*15;
                 min = min ? min : '00';
                
                var ov = _t.getValue();
                var hr = ov ? _t.getValue().split(':').shift() : '12';
                var ntime = hr + ':' + min;
                tdisplay.attr( { text : _t.formatTime(ntime) });
                 
                
            },
             // out..?
            function () {
                /*
                if (!this.j || this.j == data.length) {
                    return;
                }
                */
                if (this.sector != bsector) {
                    this.sector.animate({ transform: 's1 1 ' + this.cx + ' ' + this.cy }, 500, "bounce");
                }
 
                tdisplay.attr( { text : _t.formatTime(_t.getValue()) } );
             
        });
        innerpie.click(function() {
             
            Roo.log(this.j);
            var min = this.j*15;
            min = min ? min : '00';
                
             
            var ov = _t.getValue();
            var hr = ov ? _t.getValue().split(':').shift() : '12';
            var ntime = hr + ':' + min;
            _t.setValue(ntime);
            _t.fireEvent('select', ntime);
            
            //tdisplay.attr( { text : _t.formatTime(ntime) });
            
            //var ov = _t.getValue();
            //var min = ov ? _t.getValue().split(':').pop() : '00';
            //var ntime = times[this.j] + ':' + min;
            //_t.setValue(ntime);
            
            if (bsector) {
                bsector.transform( 's1 1');
            }
            
            //this.sector.scale(1.1, 1.1, this.cx, this.cy);
            bsector = this.sector;
 
            
        });
        this.setValue(this.value);
        
        
        
        
        
        //pie.each(function() { Roo.log(this)});
        //this.setValue(this.value);
    },
    setValue : function(v){
        this.value = v;
        if (!this.viewEl) {
            return;
        }
        //this.viewEl.dom.innerHTML = html;
        Roo.form.DisplayField.superclass.setValue.call(this, v);
        if (this.tdisplay) {
            this.tdisplay.attr( { text : this.formatTime(v) } );
        }

    },
    formatTime : function(ntime)
    {
        if (!ntime) {
            return "Pick\nTime";
        }
        if (ntime == '00:00') {
            return "Midnight";
        }
        if (ntime == '12:00') {
            return "12\nnoon";
        }
        Roo.log(ntime);
        var d = Date.parseDate(ntime, "H:i");
        return d.format('h:i') + "\n" + d.format('a')  ; 
        
        
        
    }
    
});