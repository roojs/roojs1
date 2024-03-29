/*
 * - LGPL
 *
 * based on jquery fullcalendar
 * 
 */

Roo.bootstrap = Roo.bootstrap || {};
/**
 * @class Roo.bootstrap.Calendar
 * @extends Roo.bootstrap.Component
 * Bootstrap Calendar class
 * @cfg {Boolean} loadMask (true|false) default false
 * @cfg {Object} header generate the user specific header of the calendar, default false

 * @constructor
 * Create a new Container
 * @param {Object} config The config object
 */



Roo.bootstrap.Calendar = function(config){
    Roo.bootstrap.Calendar.superclass.constructor.call(this, config);
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

Roo.extend(Roo.bootstrap.Calendar, Roo.bootstrap.Component,  {
    
	  /**
     * @cfg {Roo.data.Store} store
     * The data source for the calendar
     */
	store : false,
     /**
     * @cfg {Number} startDay
     * Day index at which the week should begin, 0-based (defaults to 0, which is Sunday)
     */
    startDay : 0,
    
    loadMask : false,
    
    header : false,
      
    getAutoCreate : function(){
        
        
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
        
        var header = {};
        
        if(!this.header){
            header = {
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
                              /*      fc_button('month', 'left', '', 'month' ),
                                    fc_button('week', '', '', 'week' ),
                                    fc_button('day', 'right', '', 'day' )
                                */    

                                ]
                            }

                        ]
                    }
                ]
            };
        }
        
        header = this.header;
        
       
        var cal_heads = function() {
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
            
            var ret = [];
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
        if(!this.store){
            throw "can not find store for calendar";
        }
        
        var mark = {
            tag: "div",
            cls:"x-dlg-mask",
            style: "text-align:center",
            cn: [
                {
                    tag: "div",
                    style: "background-color:white;width:50%;margin:250 auto",
                    cn: [
                        {
                            tag: "img",
                            src: Roo.rootURL + '/images/ux/lightbox/loading.gif' 
                        },
                        {
                            tag: "span",
                            html: "Loading"
                        }
                        
                    ]
                }
            ]
        };
        this.maskEl = Roo.DomHelper.append(this.el.select('.fc-content', true).first(), mark, true);
        
        var size = this.el.select('.fc-content', true).first().getSize();
        this.maskEl.setSize(size.width, size.height);
        this.maskEl.enableDisplayMode("block");
        if(!this.loadMask){
            this.maskEl.hide();
        }
        
        this.store = Roo.factory(this.store, Roo.data);
        this.store.on('load', this.onLoad, this);
        this.store.on('beforeload', this.onBeforeLoad, this);
        
        this.resize();
        
        this.cells = this.el.select('.fc-day',true);
        //Roo.log(this.cells);
        this.textNodes = this.el.query('.fc-day-number');
        this.cells.addClassOnOver('fc-state-hover');
        
        this.el.select('.fc-button-prev',true).on('click', this.showPrevMonth, this);
        this.el.select('.fc-button-next',true).on('click', this.showNextMonth, this);
        this.el.select('.fc-button-today',true).on('click', this.showToday, this);
        this.el.select('.fc-button',true).addClassOnOver('fc-state-hover');
        
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
            cell.row = 0;
            cell.events = [];
            cell.more = [];
            //Roo.log('set Cell Class');
            cell.title = "";
            var t = d.getTime();
            
            //Roo.log(d);
            
            cell.dateValue = t;
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
        var s = ev.start.clone().clearTime().getTime();
       // Roo.log(s);
        var e= ev.end.clone().clearTime().getTime();
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
    
//    findBestRow: function(cells)
//    {
//        var ret = 0;
//        
//        for (var i =0 ; i < cells.length;i++) {
//            ret  = Math.max(cells[i].rows || 0,ret);
//        }
//        return ret;
//        
//    },
    
    
    addItem : function(ev)
    {
        // look for vertical location slot in
        var cells = this.findCells(ev);
        
//        ev.row = this.findBestRow(cells);
        
        // work out the location.
        
        var crow = false;
        var rows = [];
        for(var i =0; i < cells.length; i++) {
            
            cells[i].row = cells[0].row;
            
            if(i == 0){
                cells[i].row = cells[i].row + 1;
            }
            
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
        
        cells[0].events.push(ev);
        
        this.calevents.push(ev);
    },
    
    clearEvents: function() {
        
        if(!this.calevents){
            return;
        }
        
        Roo.each(this.cells.elements, function(c){
            c.row = 0;
            c.events = [];
            c.more = [];
        });
        
        Roo.each(this.calevents, function(e) {
            Roo.each(e.els, function(el) {
                el.un('mouseenter' ,this.onEventEnter, this);
                el.un('mouseleave' ,this.onEventLeave, this);
                el.remove();
            },this);
        },this);
        
        Roo.each(Roo.select('.fc-more-event', true).elements, function(e){
            e.remove();
        });
        
    },
    
    renderEvents: function()
    {   
        var _this = this;
        
        this.cells.each(function(c) {
            
            if(c.row < 5){
                return;
            }
            
            var ev = c.events;
            
            var r = 4;
            if(c.row != c.events.length){
                r = 4 - (4 - (c.row - c.events.length));
            }
            
            c.events = ev.slice(0, r);
            c.more = ev.slice(r);
            
            if(c.more.length && c.more.length == 1){
                c.events.push(c.more.pop());
            }
            
            c.row = (c.row - ev.length) + c.events.length + ((c.more.length) ? 1 : 0);
            
        });
            
        this.cells.each(function(c) {
            
            c.select('.fc-day-content div',true).first().setHeight(Math.max(34, c.row * 20));
            
            
            for (var e = 0; e < c.events.length; e++){
                var ev = c.events[e];
                var rows = ev.rows;
                
                for(var i = 0; i < rows.length; i++) {
                
                    // how many rows should it span..

                    var  cfg = {
                        cls : 'roo-dynamic fc-event fc-event-hori fc-event-draggable ui-draggable',
                        style : 'position: absolute', // left: 387px; width: 121px; top: 359px;

                        unselectable : "on",
                        cn : [
                            {
                                cls: 'fc-event-inner',
                                cn : [
    //                                {
    //                                  tag:'span',
    //                                  cls: 'fc-event-time',
    //                                  html : cells.length > 1 ? '' : ev.time
    //                                },
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

                    var ctr = _this.el.select('.fc-event-container',true).first();
                    var cg = ctr.createChild(cfg);

                    var sbox = rows[i].start.select('.fc-day-content',true).first().getBox();
                    var ebox = rows[i].end.select('.fc-day-content',true).first().getBox();

                    var r = (c.more.length) ? 1 : 0;
                    cg.setXY([sbox.x +2, sbox.y + ((c.row - c.events.length - r + e) * 20)]);    
                    cg.setWidth(ebox.right - sbox.x -2);

                    cg.on('mouseenter' ,_this.onEventEnter, _this, ev);
                    cg.on('mouseleave' ,_this.onEventLeave, _this, ev);
                    cg.on('click', _this.onEventClick, _this, ev);

                    ev.els.push(cg);
                    
                }
                
            }
            
            
            if(c.more.length){
                var  cfg = {
                    cls : 'fc-more-event roo-dynamic fc-event fc-event-hori fc-event-draggable ui-draggable fc-event-start fc-event-end',
                    style : 'position: absolute',
                    unselectable : "on",
                    cn : [
                        {
                            cls: 'fc-event-inner',
                            cn : [
                                {
                                  tag:'span',
                                  cls: 'fc-event-title',
                                  html : 'More'
                                }


                            ]
                        },
                        {
                            cls: 'ui-resizable-handle ui-resizable-e',
                            html : '&nbsp;&nbsp;&nbsp'
                        }

                    ]
                };

                var ctr = _this.el.select('.fc-event-container',true).first();
                var cg = ctr.createChild(cfg);

                var sbox = c.select('.fc-day-content',true).first().getBox();
                var ebox = c.select('.fc-day-content',true).first().getBox();
                //Roo.log(cg);
                cg.setXY([sbox.x +2, sbox.y +((c.row - 1) * 20)]);    
                cg.setWidth(ebox.right - sbox.x -2);

                cg.on('click', _this.onMoreEventClick, _this, c.more);
                
            }
            
        });
        
        
        
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
    
    onMoreEventClick: function(e, el, more)
    {
        var _this = this;
        
        this.calpopover.placement = 'right';
        this.calpopover.setTitle('More');
        
        this.calpopover.setContent('');
        
        var ctr = this.calpopover.el.select('.popover-content', true).first();
        
        Roo.each(more, function(m){
            var cfg = {
                cls : 'fc-event-hori fc-event-draggable',
                html : m.title
            };
            var cg = ctr.createChild(cfg);
            
            cg.on('click', _this.onEventClick, _this, m);
        });
        
        this.calpopover.show(el);
        
        
    },
    
    onLoad: function () 
    {   
        this.calevents = [];
        var cal = this;
        
        if(this.store.getCount() > 0){
            this.store.data.each(function(d){
               cal.addItem({
                    id : d.data.id,
                    start: (typeof(d.data.start_dt) === 'string') ? new Date.parseDate(d.data.start_dt, 'Y-m-d H:i:s') : d.data.start_dt,
                    end : (typeof(d.data.end_dt) === 'string') ? new Date.parseDate(d.data.end_dt, 'Y-m-d H:i:s') : d.data.end_dt,
                    time : d.data.start_time,
                    title : d.data.title,
                    description : d.data.description,
                    venue : d.data.venue
                });
            });
        }
        
        this.renderEvents();
        
        if(this.calevents.length && this.loadMask){
            this.maskEl.hide();
        }
    },
    
    onBeforeLoad: function()
    {
        this.clearEvents();
        if(this.loadMask){
            this.maskEl.show();
        }
    }
});

 
 