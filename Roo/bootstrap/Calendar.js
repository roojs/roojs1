/*
 * - LGPL
 *
 * based on jquery fullcalendar
 * 
 */


/**
 * @class Roo.bootstrap.Calendar
 * @extends Roo.bootstrap.Component
 * Bootstrap Calendar class
    
 * @constructor
 * Create a new Container
 * @param {Object} config The config object
 */

Roo.bootstrap.Calendar = function(config){
    Roo.bootstrap.Calendar.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Calendar, Roo.bootstrap.Component,  {
    
     
      
    getAutoCreate : function(){
        
        
        fc_button = function(name, corner, style, content ) {
            return Roo.apply({},{
                tag : 'span',
                cls : 'fc-button fc-button-'+name+' fc-state-default ' + 
                         (corner.length ?
                            'fc-corner-' + corner.split(' ').join(' fc-corner-') :
                            ''
                        ),
                html : '<SPAN class="fc-text-'+style+ '">'+content +'</SPAN>',
                unselectable: 'on'
            });
        };
        
        var header = {
            tag : 'table',
            cls : 'fc-header',
            style : 'width:100%',
            cn : [
                {
                    tag: 'tr',
                    cn : [
                        {
                            tag : 'td',
                            cls : 'fc-header-left',
                            cn : [
                                fc_button('prev', 'left', 'arrow', '&#8249;' ),
                                fc_button('next', 'right', 'arrow', '&#8250;' ),
                                { tag: 'span', cls: 'fc-header-space' },
                                fc_button('today', 'left right', '', 'today' ), // neds state disabled..
                                
                                
                            ]
                        },
                        
                        {
                            tag : 'td',
                            cls : 'fc-header-center',
                            cn : [
                                {
                                    tag: 'span',
                                    cls: 'fc-header-title',
                                    cn : {
                                        tag: 'H2',
                                        html : 'month / year'
                                    }
                                }
                                
                            ]
                        },
                        {
                            tag : 'td',
                            cls : 'fc-header-right',
                            cn : [
                                fc_button('month', 'left', '', 'month' ),
                                fc_button('week', '', '', 'week' ),
                                fc_button('day', 'right', '', 'day' )
                                
                                
                            ]
                        },
                        
                    ]
                }
            ]
        };
        
       
        var cal_heads = function() {
            var ret = [];
            for (var i =0; i < Date.dayNames.length; i++) {
                var d = Date.dayNames[i];
                ret.push({
                    tag: 'th',
                    cls : 'fc-day-header fc-' + d.substring(0,3).toLowerCase() + ' fc-widget-header',
                    html : d.substring(0,3)
                });
                
            }
            ret[0].cls += ' fc-first';
            ret[6].cls += ' fc-last';
            return ret;
        };
        var cal_cell = function(n) {
            return  {
                tag: 'td',
                cls : 'fc-day fc-'+n + ' fc-widget-content', ///fc-other-month fc-past
                cn : [
                    {
                        cn : [
                            {
                                cls: 'fc-day-number',
                                html: 'D'
                            },
                            {
                                cls: 'fc-day-content',
                             
                                cn : [
                                     {
                                        style: 'position: relative;' // height: 17px;
                                    }
                                ]
                            }
                            
                            
                        ]
                    }
                ]
                
            }
        };
        var cal_rows = function() {
            var ret = []
            for (var r = 0; r < 6; r++) {
                var row= {
                    tag : 'tr',
                    cls : 'fc-week',
                    cn : []
                };
                
                for (var i =0; i < Date.dayNames.length; i++) {
                    var d = Date.dayNames[i];
                    row.cn.push(cal_cell(d.substring(0,3).toLowerCase()));

                }
                row.cn[0].cls+=' fc-first';
                row.cn[0].cn[0].style = 'min-height:90px';
                row.cn[6].cls+=' fc-last';
                ret.push(row);
                
            }
            ret[0].cls += ' fc-first';
           
            ret[5].cls += ' fc-last';
            return ret;
            
        };
        var cal_table = {
            tag: 'table',
            cls: 'fc-border-separate',
            style : 'width:100%',
            cellspacing  : 0,
            cn : [
                { 
                    tag: 'thead',
                    cn : [
                        { 
                            tag: 'tr',
                            cls : 'fc-first fc-last',
                            cn : cal_heads()
                        }
                    ]
                },
                { 
                    tag: 'tbody',
                    cn : cal_rows()
                }
                  
            ]
        };
         
         var cfg = {
            cls : 'fc fc-ltr',
            cn : [
                header,
                {
                    cls : 'fc-content',
                    style : "position: relative;",
                    cn : [
                        {
                            cls : 'fc-view fc-view-month fc-grid',
                            style : 'position: relative',
                            unselectable : 'on',
                            cn : [
                                {
                                    cls : 'fc-event-container',
                                    style : 'position:absolute;z-index:8;top:0;left:0;'
                                },
                                cal_table
                            ]
                        }
                    ]
    
                }
           ] 
            
        };
        
         
        
        return cfg;
    },
    
    
    initEvents : function()
    {
        this.resize();
        this.cells = this.el.select('.fc-day',true);
        this.textNodes = this.el.query('.fc-day-number');
        
        
    },
    resize : function() {
        var sz  = this.el.getSize();
        
        this.el.select('.fc-day-header',true).setWidth(sz.width / 7);
        this.el.select('.fc-day-content div',true).setHeight(34);
    },
   // private
    update : function(date)
    {
        var vd = this.activeDate;
        this.activeDate = date;
        if(vd && this.el){
            var t = date.getTime();
            if(vd.getMonth() == date.getMonth() && vd.getFullYear() == date.getFullYear()){
                this.cells.removeClass("fc-state-highlight");
                this.cells.each(function(c){
                   if(c.dom.firstChild.dateValue == t){
                       c.addClass("fc-state-highlight");
                       setTimeout(function(){
                            try{c.dom.firstChild.focus();}catch(e){}
                       }, 50);
                       return false;
                   }
                   return true;
                });
                return;
            }
        }
        
        var days = date.getDaysInMonth();
        var firstOfMonth = date.getFirstDateOfMonth();
        var startingPos = firstOfMonth.getDay()-this.startDay;

        if(startingPos <= this.startDay){
            startingPos += 7;
        }

        var pm = date.add("mo", -1);
        var prevStart = pm.getDaysInMonth()-startingPos;

        var cells = this.cells.elements;
        var textEls = this.textNodes;
        days += startingPos;

        // convert everything to numbers so it's fast
        var day = 86400000;
        var d = (new Date(pm.getFullYear(), pm.getMonth(), prevStart)).clearTime();
        var today = new Date().clearTime().getTime();
        var sel = date.clearTime().getTime();
        var min = this.minDate ? this.minDate.clearTime() : Number.NEGATIVE_INFINITY;
        var max = this.maxDate ? this.maxDate.clearTime() : Number.POSITIVE_INFINITY;
        var ddMatch = this.disabledDatesRE;
        var ddText = this.disabledDatesText;
        var ddays = this.disabledDays ? this.disabledDays.join("") : false;
        var ddaysText = this.disabledDaysText;
        var format = this.format;

        var setCellClass = function(cal, cell){
            cell.title = "";
            var t = d.getTime();
            cell.firstChild.dateValue = t;
            if(t == today){
                cell.className += " fc-today";
                cell.title = cal.todayText;
            }
            if(t == sel){
                cell.className += " fc-state-highlight";
                setTimeout(function(){
                    try{cell.firstChild.focus();}catch(e){}
                }, 50);
            }
            // disabling
            if(t < min) {
                cell.className = " fc-state-disabled";
                cell.title = cal.minText;
                return;
            }
            if(t > max) {
                cell.className = " fc-state-disabled";
                cell.title = cal.maxText;
                return;
            }
            if(ddays){
                if(ddays.indexOf(d.getDay()) != -1){
                    cell.title = ddaysText;
                    cell.className = " fc-state-disabled";
                }
            }
            if(ddMatch && format){
                var fvalue = d.dateFormat(format);
                if(ddMatch.test(fvalue)){
                    cell.title = ddText.replace("%0", fvalue);
                    cell.className = " fc-state-disabled";
                }
            }
        };

        var i = 0;
        for(; i < startingPos; i++) {
            textEls[i].innerHTML = (++prevStart);
            d.setDate(d.getDate()+1);
            cells[i].className = "x-date-prevday";
            setCellClass(this, cells[i]);
        }
        for(; i < days; i++){
            intDay = i - startingPos + 1;
            textEls[i].innerHTML = (intDay);
            d.setDate(d.getDate()+1);
            cells[i].className = "x-date-active";
            setCellClass(this, cells[i]);
        }
        var extraDays = 0;
        for(; i < 42; i++) {
             textEls[i].innerHTML = (++extraDays);
             d.setDate(d.getDate()+1);
             cells[i].className = "x-date-nextday";
             setCellClass(this, cells[i]);
        }

        this.mbtn.setText(this.monthNames[date.getMonth()] + " " + date.getFullYear());
        this.fireEvent('monthchange', this, date);
        
        if(!this.internalRender){
            var main = this.el.dom.firstChild;
            var w = main.offsetWidth;
            this.el.setWidth(w + this.el.getBorderWidth("lr"));
            Roo.fly(main).setWidth(w);
            this.internalRender = true;
            // opera does not respect the auto grow header center column
            // then, after it gets a width opera refuses to recalculate
            // without a second pass
            if(Roo.isOpera && !this.secondPass){
                main.rows[0].cells[1].style.width = (w - (main.rows[0].cells[0].offsetWidth+main.rows[0].cells[2].offsetWidth)) + "px";
                this.secondPass = true;
                this.update.defer(10, this, [date]);
            }
        }
        
        
    }
});

 