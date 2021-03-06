/*
 * - LGPL
 *
 * based on jquery fullcalendar
 * 
 */

 Roo.calendar = Roo.calendar || {};


/**
 * @class Roo.calendar.View
 * @extends Roo.bootstrap.Component
 * Bootstrap Calendar class
    
 * @constructor
 * Create a new Container
 * @param {Object} config The config object
 */




Roo.calendar.View = function(config){
   Roo.calendar.View.superclass.constructor.call(this, config);
     this.addEvents({
        /**
	     * @event select
	     * Fires when a date is selected
	     * @param {DatePicker} this
	     * @param {Date} date The selected date
	     */
        'select': true,
        /**
	     * @event monthchange
	     * Fires when the displayed month changes 
	     * @param {DatePicker} this
	     * @param {Date} date The selected month
	     */
        'monthchange': true,
        /**
	     * @event evententer
	     * Fires when mouse over an event
	     * @param {Calendar} this
	     * @param {event} Event
	     */
        'evententer': true,
        /**
	     * @event eventleave
	     * Fires when the mouse leaves an
	     * @param {Calendar} this
	     * @param {event}
	     */
        'eventleave': true,
        /**
	     * @event eventclick
	     * Fires when the mouse click an
	     * @param {Calendar} this
	     * @param {event}
	     */
        'eventclick': true
        
    });

};

Roo.extend(Roo.calendar.View, Roo.BoxComponent,  {
    
     /**
     * @cfg {Number} startDay
     * Day index at which the week should begin, 0-based (defaults to 0, which is Sunday)
     */
    startDay : 0,
    
    
    skipNavHeader : false,
    skipMonthHeader : false,
    
    
    
    
    navHeader: function() {
        // header is a bit specific to bootstrap implementation - eg. roo would not use this..
    
        var fc_button = function(name, corner, style, content ) {
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
     
        return  {
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
                                fc_button('today', 'left right', '', 'today' )  // neds state disabled..
                                
                                
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
                          //     fc_button('month', 'left', '', 'month' ),
                            //    fc_button('week', '', '', 'week' ),
                              //  fc_button('day', 'right', '', 'day' )
                            //    
                                
                            ]
                        }
                        
                    ]
                }
            ]
        };
    },
    
    monthHeader : function ()
    {
        var ret = [];
            // fixme - handle this.
            
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
    },
    
    monthBody : function()
    {
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
        ret[4].cls += ' fc-prev-last';
        ret[5].cls += ' fc-last';
        return ret;
    
    },
    
    monthTable : function()
    {
        var ret = {
            tag: 'table',
            cls: 'fc-border-separate',
            style : 'width:100%',
            cellspacing  : 0,
            cn : []
        }
        if (!this.skipMonthHeader) {
           ret.cn.push( { 
                tag: 'thead',
                cn : [
                    { 
                        tag: 'tr',
                        cls : 'fc-first fc-last',
                        cn : this.monthHeader()
                    }
                ]
            });
        }
        ret.cn.push( { 
                    tag: 'tbody',
                    cn : this.monthBody()
                });
        return ret;
    },
    
    
    
      
    getAutoCreate : function(){
         
         
        var mbody = [];
        if (!this.skipNavHeader) {
            mbody.push(this.navHeader());
        }
        mbody.push({
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
                        this.monthTable()
                    ]
                }
            ]

        });
        return  {
            cls : 'fc fc-ltr',
            cn : mbody
           
        };
        
          
    },
    
    
    initEvents : function()
    {
        if(!this.store){
            throw "can not find store for calendar";
        }
        
        this.store = Roo.factory(this.store, Roo.data);
        this.store.on('load', this.onLoad, this);
        
        this.resize();
        
        this.cells = this.el.select('.fc-day',true);
        //Roo.log(this.cells);
        this.textNodes = this.el.query('.fc-day-number');
        this.cells.addClassOnOver('fc-state-hover');
        
        
        if (!this.skipNavHeader) {
                
            this.el.select('.fc-button-prev',true).on('click', this.showPrevMonth, this);
            this.el.select('.fc-button-next',true).on('click', this.showNextMonth, this);
            this.el.select('.fc-button-today',true).on('click', this.showToday, this);
            this.el.select('.fc-button',true).addClassOnOver('fc-state-hover');
        }
        this.on('monthchange', this.onMonthChange, this);
        
        this.update(new Date().clearTime());
    },
    
    resize : function() {
        var sz  = this.el.getSize();
        
        this.el.select('.fc-day-header',true).setWidth(sz.width / 7);
        this.el.select('.fc-day-content div',true).setHeight(34);
    },
    
    
    // private
    showPrevMonth : function(e){
        this.update(this.activeDate.add("mo", -1));
    },
    showToday : function(e){
        this.update(new Date().clearTime());
    },
    // private
    showNextMonth : function(e){
        this.update(this.activeDate.add("mo", 1));
    },

    // private
    showPrevYear : function(){
        this.update(this.activeDate.add("y", -1));
    },

    // private
    showNextYear : function(){
        this.update(this.activeDate.add("y", 1));
    },

    
   // private
    update : function(date)
    {
        var vd = this.activeDate;
        this.activeDate = date;
//        if(vd && this.el){
//            var t = date.getTime();
//            if(vd.getMonth() == date.getMonth() && vd.getFullYear() == date.getFullYear()){
//                Roo.log('using add remove');
//                
//                this.fireEvent('monthchange', this, date);
//                
//                this.cells.removeClass("fc-state-highlight");
//                this.cells.each(function(c){
//                   if(c.dateValue == t){
//                       c.addClass("fc-state-highlight");
//                       setTimeout(function(){
//                            try{c.dom.firstChild.focus();}catch(e){}
//                       }, 50);
//                       return false;
//                   }
//                   return true;
//                });
//                return;
//            }
//        }
        
        var days = date.getDaysInMonth();
        
        var firstOfMonth = date.getFirstDateOfMonth();
        var startingPos = firstOfMonth.getDay()-this.startDay;
        
        if(startingPos < this.startDay){
            startingPos += 7;
        }
        
        var pm = date.add(Date.MONTH, -1);
        var prevStart = pm.getDaysInMonth()-startingPos;
//        
        this.cells = this.el.select('.fc-day',true);
        this.textNodes = this.el.query('.fc-day-number');
        this.cells.addClassOnOver('fc-state-hover');
        
        var cells = this.cells.elements;
        var textEls = this.textNodes;
        
        Roo.each(cells, function(cell){
            cell.removeClass([ 'fc-past', 'fc-other-month', 'fc-future', 'fc-state-highlight', 'fc-state-disabled']);
        });
        
        days += startingPos;

        // convert everything to numbers so it's fast
        var day = 86400000;
        var d = (new Date(pm.getFullYear(), pm.getMonth(), prevStart)).clearTime();
        //Roo.log(d);
        //Roo.log(pm);
        //Roo.log(prevStart);
        
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
            
            //Roo.log('set Cell Class');
            cell.title = "";
            var t = d.getTime();
            
            //Roo.log(d);
            
            cell.dateValue = t;
            
            cell.className += " fc-cell-" + t;
            
            if(t == today){
                cell.className += " fc-today";
                cell.className += " fc-state-highlight";
                cell.title = cal.todayText;
            }
            if(t == sel){
                // disable highlight in other month..
                //cell.className += " fc-state-highlight";
                
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
            
            if (!cell.initialClassName) {
                cell.initialClassName = cell.dom.className;
            }
            
            cell.dom.className = cell.initialClassName  + ' ' +  cell.className;
        };

        var i = 0;
        
        for(; i < startingPos; i++) {
            textEls[i].innerHTML = (++prevStart);
            d.setDate(d.getDate()+1);
            
            cells[i].className = "fc-past fc-other-month";
            setCellClass(this, cells[i]);
        }
        
        var intDay = 0;
        
        for(; i < days; i++){
            intDay = i - startingPos + 1;
            textEls[i].innerHTML = (intDay);
            d.setDate(d.getDate()+1);
            
            cells[i].className = ''; // "x-date-active";
            setCellClass(this, cells[i]);
        }
        var extraDays = 0;
        
        for(; i < 42; i++) {
            textEls[i].innerHTML = (++extraDays);
            d.setDate(d.getDate()+1);
            
            cells[i].className = "fc-future fc-other-month";
            setCellClass(this, cells[i]);
        }
        
        this.el.select('.fc-header-title h2',true).update(Date.monthNames[date.getMonth()] + " " + date.getFullYear());
        
        var totalRows = Math.ceil((date.getDaysInMonth() + date.getFirstDateOfMonth().getDay()) / 7);
        
        this.el.select('tr.fc-week.fc-prev-last',true).removeClass('fc-last');
        this.el.select('tr.fc-week.fc-next-last',true).addClass('fc-last').show();
        
        if(totalRows != 6){
            this.el.select('tr.fc-week.fc-last',true).removeClass('fc-last').addClass('fc-next-last').hide();
            this.el.select('tr.fc-week.fc-prev-last',true).addClass('fc-last');
        }
        
        this.fireEvent('monthchange', this, date);
        
        
        /*
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
        */
        
    },
    
    findCell : function(dt) {
        dt = dt.clearTime().getTime();
        var ret = false;
        this.cells.each(function(c){
            //Roo.log("check " +c.dateValue + '?=' + dt);
            if(c.dateValue == dt){
                ret = c;
                return false;
            }
            return true;
        });
        
        return ret;
    },
    
    findCells : function(ev) {
        var s = ev.start_dt.clone().clearTime().getTime();
       // Roo.log(s);
        var e= ev.end_dt.clone().clearTime().getTime();
       // Roo.log(e);
        var ret = [];
        this.cells.each(function(c){
             ////Roo.log("check " +c.dateValue + '<' + e + ' > ' + s);
            
            if(c.dateValue > e){
                return ;
            }
            if(c.dateValue < s){
                return ;
            }
            ret.push(c);
        });
        
        return ret;    
    },
    
    findBestRow: function(cells)
    {
        var ret = 0;
        
        for (var i =0 ; i < cells.length;i++) {
            ret  = Math.max(cells[i].rows || 0,ret);
        }
        return ret;
        
    },
    
    
    addItem : function(ev)
    {
        // look for vertical location slot in
        var cells = this.findCells(ev);
        
        ev.row = this.findBestRow(cells);
        
        // work out the location.
        
        var crow = false;
        var rows = [];
        for(var i =0; i < cells.length; i++) {
            if (!crow) {
                crow = {
                    start : cells[i],
                    end :  cells[i]
                };
                continue;
            }
            if (crow.start.getY() == cells[i].getY()) {
                // on same row.
                crow.end = cells[i];
                continue;
            }
            // different row.
            rows.push(crow);
            crow = {
                start: cells[i],
                end : cells[i]
            };
            
        }
        
        rows.push(crow);
        ev.els = [];
        ev.rows = rows;
        ev.cells = cells;
        for (var i = 0; i < cells.length;i++) {
            cells[i].rows = Math.max(cells[i].rows || 0 , ev.row + 1 );
            
        }
        
        this.calevents.push(ev);
    },
    
    clearEvents: function() {
        
        if(!this.calevents){
            return;
        }
        
        Roo.each(this.cells.elements, function(c){
            c.rows = 0;
        });
        
        Roo.each(this.calevents, function(e) {
            Roo.each(e.els, function(el) {
                el.un('mouseenter' ,this.onEventEnter, this);
                el.un('mouseleave' ,this.onEventLeave, this);
                el.remove();
            },this);
        },this);
        
    },
    
    renderEvents: function()
    {   
        // first make sure there is enough space..
        
        this.cells.each(function(c) {
//            c.select('.fc-day-content div',true).first().setHeight(20);
            c.select('.fc-day-content div',true).first().setHeight(Math.max(34, c.rows * 20));
        });
        
        for (var e = 0; e < this.calevents.length; e++) {
            var ev = this.calevents[e];
            var cells = ev.cells;
            var rows = ev.rows;
            
            for(var i =0; i < rows.length; i++) {
                
                var startCell = Roo.select('.fc-cell-' + rows[i].start.dateValue + ' .fc-day-content div', true).first();
                
                // how many rows should it span..
                
                var  cfg = {
                    cls : 'roo-dynamic fc-event fc-event-hori fc-event-draggable ui-draggable',
                    style : 'position: absolute', // left: 387px; width: 121px; top: 359px;
                    
                    unselectable : "on",
                    cn : [
                        {
                            cls: 'fc-event-inner',
                            cn : [
                                {
                                  tag:'span',
                                  cls: 'fc-event-time',
                                  html : cells.length > 1 ? '' : ev.start_dt.format('h:ia')
                                },
                                {
                                  tag:'span',
                                  cls: 'fc-event-title',
                                  html : String.format('{0}', ev.title)
                                }
                                
                                
                            ]
                        },
                        {
                            cls: 'ui-resizable-handle ui-resizable-e',
                            html : '&nbsp;&nbsp;&nbsp'
                        }
                        
                    ]
                };
                if (i == 0) {
                    cfg.cls += ' fc-event-start';
                }
                
                if ((i+1) == rows.length) {
                    cfg.cls += ' fc-event-end';
                }
                
//                var ctr = this.el.select('.fc-event-container',true).first();
                var cg = startCell.createChild(cfg);
                
                cg.on('mouseenter' ,this.onEventEnter, this, ev);
                cg.on('mouseleave' ,this.onEventLeave, this, ev);
                cg.on('click', this.onEventClick, this, ev);
                
                ev.els.push(cg);
//                
                var sbox = rows[i].start.select('.fc-day-content',true).first().getBox();
                var ebox = rows[i].end.select('.fc-day-content',true).first().getBox();
//                //Roo.log(cg);
                cg.setXY([sbox.x +2, sbox.y +(ev.row * 20)]);   
//                Roo.log(rows[i]);
                var boxes = Math.ceil((rows[i].end.dateValue - rows[i].start.dateValue) / 86400000) + 1;
//                cg.setWidth(ebox.right - sbox.x -2);
//                Roo.log(boxes);
                cg.setWidth(134 * boxes);
//                cg.setWidth(134);
                
            }
            
            
        }
        
    },
    
    onEventEnter: function (e, el,event,d) {
        this.fireEvent('evententer', this, el, event);
    },
    
    onEventLeave: function (e, el,event,d) {
        this.fireEvent('eventleave', this, el, event);
    },
    
    onEventClick: function (e, el,event,d) {
        this.fireEvent('eventclick', this, el, event);
    },
    
    onMonthChange: function () {
        this.store.load();
    },
    
    onLoad: function () {
        
        this.clearEvents();
        //Roo.log('calendar onload');
//        
        this.calevents = [];
         
        if(this.store.getCount() > 0){
            this.store.data.each(function(d){
                
                
                // FIXME..
                var add = Roo.apply({}, d.data);
                if (typeof(add.end_dt) == 'undefined')  {
                    Roo.log("Missing End time in calendar data: ");
                    Roo.log(d);
                    return;
                }
                if (typeof(add.start_dt) == 'undefined')  {
                    Roo.log("Missing Start time in calendar data: ");
                    Roo.log(d);
                    return;
                }
                add.start_dt = typeof(add.start_dt) == 'string' ? Date.parseDate(add.start_dt,'Y-m-d H:i:s') : add.start_dt,
                add.end_dt = typeof(add.end_dt) == 'string' ? Date.parseDate(add.end_dt,'Y-m-d H:i:s') : add.end_dt,
                add.id = add.id || d.id;
                add.title = add.title || '??';
                this.addItem(add);
                
                // other than the 'required' coluns, we should just pass the data from the store.
                
                
               /*cal.addItem({
                    id : d.data.id,
                    start: new Date(d.data.start_dt),
                    end : new Date(d.data.end_dt),
                    time : d.data.start_time,
                    title : d.data.title,
                    description : d.data.description,
                    venue : d.data.venue
                });*/
            },this);
        }
        
        this.renderEvents();
    }
});

 
 