/*
  
 * Licence LGPL
 
 */
 
/**
 * @class Roo.grid.Calendar
 * @extends Roo.util.Grid
 * This class extends the Grid to provide a calendar widget
 * <br><br>Usage:<pre><code>
 var grid = new Roo.grid.Calendar("my-container-id", {
     ds: myDataStore,
     cm: myColModel,
     selModel: mySelectionModel,
     autoSizeColumns: true,
     monitorWindowResize: false,
     trackMouseOver: true
     eventstore : real data store..
 });
 // set any options
 grid.render();
  
  * @constructor
 * @param {String/HTMLElement/Roo.Element} container The element into which this grid will be rendered -
 * The container MUST have some type of size defined for the grid to fill. The container will be
 * automatically set to position relative if it isn't already.
 * @param {Object} config A config object that sets properties on this grid.
 */
Roo.grid.Calendar = function(container, config){
	// initialize the container
	this.container = Roo.get(container);
	this.container.update("");
	this.container.setStyle("overflow", "hidden");
    this.container.addClass('x-grid-container');

    this.id = this.container.id;

    Roo.apply(this, config);
    // check and correct shorthanded configs
    
    var rows = [];
    var d =1;
    for (var r = 0;r < 6;r++) {
        
        rows[r]=[];
        for (var c =0;c < 7;c++) {
            rows[r][c]= '';
        }
    }
    if (this.eventStore) {
        this.eventStore= Roo.factory(this.eventStore, Roo.data);
        this.eventStore.on('load',this.onLoad, this);
        this.eventStore.on('beforeload',this.clearEvents, this);
         
    }
    
    this.dataSource = new Roo.data.Store({
            proxy: new Roo.data.MemoryProxy(rows),
            reader: new Roo.data.ArrayReader({}, [
                   'weekday0', 'weekday1', 'weekday2', 'weekday3', 'weekday4', 'weekday5', 'weekday6' ])
    });

    this.dataSource.load();
    this.ds = this.dataSource;
    this.ds.xmodule = this.xmodule || false;
    
    
    var cellRender = function(v,x,r)
    {
        return String.format(
            '<div class="fc-day  fc-widget-content"><div>' +
                '<div class="fc-event-container"></div>' +
                '<div class="fc-day-number">{0}</div>'+
                
                '<div class="fc-day-content"><div style="position:relative"></div></div>' +
            '</div></div>', v);
    
    }
    
    
    this.colModel = new Roo.grid.ColumnModel( [
        {
            xtype: 'ColumnModel',
            xns: Roo.grid,
            dataIndex : 'weekday0',
            header : 'Sunday',
            renderer : cellRender
        },
        {
            xtype: 'ColumnModel',
            xns: Roo.grid,
            dataIndex : 'weekday1',
            header : 'Monday',
            renderer : cellRender
        },
        {
            xtype: 'ColumnModel',
            xns: Roo.grid,
            dataIndex : 'weekday2',
            header : 'Tuesday',
            renderer : cellRender
        },
        {
            xtype: 'ColumnModel',
            xns: Roo.grid,
            dataIndex : 'weekday3',
            header : 'Wednesday',
            renderer : cellRender
        },
        {
            xtype: 'ColumnModel',
            xns: Roo.grid,
            dataIndex : 'weekday4',
            header : 'Thursday',
            renderer : cellRender
        },
        {
            xtype: 'ColumnModel',
            xns: Roo.grid,
            dataIndex : 'weekday5',
            header : 'Friday',
            renderer : cellRender
        },
        {
            xtype: 'ColumnModel',
            xns: Roo.grid,
            dataIndex : 'weekday6',
            header : 'Saturday',
            renderer : cellRender
        }
    ]);
    this.cm = this.colModel;
    this.cm.xmodule = this.xmodule || false;
 
        
          
    //this.selModel = new Roo.grid.CellSelectionModel();
    //this.sm = this.selModel;
    //this.selModel.init(this);
    
    
    if(this.width){
        this.container.setWidth(this.width);
    }

    if(this.height){
        this.container.setHeight(this.height);
    }
    /** @private */
	this.addEvents({
        // raw events
        /**
         * @event click
         * The raw click event for the entire grid.
         * @param {Roo.EventObject} e
         */
        "click" : true,
        /**
         * @event dblclick
         * The raw dblclick event for the entire grid.
         * @param {Roo.EventObject} e
         */
        "dblclick" : true,
        /**
         * @event contextmenu
         * The raw contextmenu event for the entire grid.
         * @param {Roo.EventObject} e
         */
        "contextmenu" : true,
        /**
         * @event mousedown
         * The raw mousedown event for the entire grid.
         * @param {Roo.EventObject} e
         */
        "mousedown" : true,
        /**
         * @event mouseup
         * The raw mouseup event for the entire grid.
         * @param {Roo.EventObject} e
         */
        "mouseup" : true,
        /**
         * @event mouseover
         * The raw mouseover event for the entire grid.
         * @param {Roo.EventObject} e
         */
        "mouseover" : true,
        /**
         * @event mouseout
         * The raw mouseout event for the entire grid.
         * @param {Roo.EventObject} e
         */
        "mouseout" : true,
        /**
         * @event keypress
         * The raw keypress event for the entire grid.
         * @param {Roo.EventObject} e
         */
        "keypress" : true,
        /**
         * @event keydown
         * The raw keydown event for the entire grid.
         * @param {Roo.EventObject} e
         */
        "keydown" : true,

        // custom events

        /**
         * @event cellclick
         * Fires when a cell is clicked
         * @param {Grid} this
         * @param {Number} rowIndex
         * @param {Number} columnIndex
         * @param {Roo.EventObject} e
         */
        "cellclick" : true,
        /**
         * @event celldblclick
         * Fires when a cell is double clicked
         * @param {Grid} this
         * @param {Number} rowIndex
         * @param {Number} columnIndex
         * @param {Roo.EventObject} e
         */
        "celldblclick" : true,
        /**
         * @event rowclick
         * Fires when a row is clicked
         * @param {Grid} this
         * @param {Number} rowIndex
         * @param {Roo.EventObject} e
         */
        "rowclick" : true,
        /**
         * @event rowdblclick
         * Fires when a row is double clicked
         * @param {Grid} this
         * @param {Number} rowIndex
         * @param {Roo.EventObject} e
         */
        "rowdblclick" : true,
        /**
         * @event headerclick
         * Fires when a header is clicked
         * @param {Grid} this
         * @param {Number} columnIndex
         * @param {Roo.EventObject} e
         */
        "headerclick" : true,
        /**
         * @event headerdblclick
         * Fires when a header cell is double clicked
         * @param {Grid} this
         * @param {Number} columnIndex
         * @param {Roo.EventObject} e
         */
        "headerdblclick" : true,
        /**
         * @event rowcontextmenu
         * Fires when a row is right clicked
         * @param {Grid} this
         * @param {Number} rowIndex
         * @param {Roo.EventObject} e
         */
        "rowcontextmenu" : true,
        /**
         * @event cellcontextmenu
         * Fires when a cell is right clicked
         * @param {Grid} this
         * @param {Number} rowIndex
         * @param {Number} cellIndex
         * @param {Roo.EventObject} e
         */
         "cellcontextmenu" : true,
        /**
         * @event headercontextmenu
         * Fires when a header is right clicked
         * @param {Grid} this
         * @param {Number} columnIndex
         * @param {Roo.EventObject} e
         */
        "headercontextmenu" : true,
        /**
         * @event bodyscroll
         * Fires when the body element is scrolled
         * @param {Number} scrollLeft
         * @param {Number} scrollTop
         */
        "bodyscroll" : true,
        /**
         * @event columnresize
         * Fires when the user resizes a column
         * @param {Number} columnIndex
         * @param {Number} newSize
         */
        "columnresize" : true,
        /**
         * @event columnmove
         * Fires when the user moves a column
         * @param {Number} oldIndex
         * @param {Number} newIndex
         */
        "columnmove" : true,
        /**
         * @event startdrag
         * Fires when row(s) start being dragged
         * @param {Grid} this
         * @param {Roo.GridDD} dd The drag drop object
         * @param {event} e The raw browser event
         */
        "startdrag" : true,
        /**
         * @event enddrag
         * Fires when a drag operation is complete
         * @param {Grid} this
         * @param {Roo.GridDD} dd The drag drop object
         * @param {event} e The raw browser event
         */
        "enddrag" : true,
        /**
         * @event dragdrop
         * Fires when dragged row(s) are dropped on a valid DD target
         * @param {Grid} this
         * @param {Roo.GridDD} dd The drag drop object
         * @param {String} targetId The target drag drop object
         * @param {event} e The raw browser event
         */
        "dragdrop" : true,
        /**
         * @event dragover
         * Fires while row(s) are being dragged. "targetId" is the id of the Yahoo.util.DD object the selected rows are being dragged over.
         * @param {Grid} this
         * @param {Roo.GridDD} dd The drag drop object
         * @param {String} targetId The target drag drop object
         * @param {event} e The raw browser event
         */
        "dragover" : true,
        /**
         * @event dragenter
         *  Fires when the dragged row(s) first cross another DD target while being dragged
         * @param {Grid} this
         * @param {Roo.GridDD} dd The drag drop object
         * @param {String} targetId The target drag drop object
         * @param {event} e The raw browser event
         */
        "dragenter" : true,
        /**
         * @event dragout
         * Fires when the dragged row(s) leave another DD target while being dragged
         * @param {Grid} this
         * @param {Roo.GridDD} dd The drag drop object
         * @param {String} targetId The target drag drop object
         * @param {event} e The raw browser event
         */
        "dragout" : true,
        /**
         * @event rowclass
         * Fires when a row is rendered, so you can change add a style to it.
         * @param {GridView} gridview   The grid view
         * @param {Object} rowcfg   contains record  rowIndex and rowClass - set rowClass to add a style.
         */
        'rowclass' : true,

        /**
         * @event render
         * Fires when the grid is rendered
         * @param {Grid} grid
         */
        'render' : true,
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
        'eventclick': true,
        /**
	     * @event eventrender
	     * Fires before each cell is rendered, so you can modify the contents, like cls / title / qtip
	     * @param {Calendar} this
	     * @param {data} data to be modified
	     */
        'eventrender': true
        
    });

    Roo.grid.Grid.superclass.constructor.call(this);
    this.on('render', function() {
        this.view.el.addClass('x-grid-cal'); 
        
        (function() { this.setDate(new Date()); }).defer(100,this); //default today..

    },this);
    
    if (!Roo.grid.Calendar.style) {
        Roo.grid.Calendar.style = Roo.util.CSS.createStyleSheet({
            
            
            '.x-grid-cal .x-grid-col' :  {
                height: 'auto !important',
                'vertical-align': 'top'
            },
            '.x-grid-cal  .fc-event-hori' : {
                height: '14px'
            }
             
            
        }, Roo.id());
    }

    
    
};
Roo.extend(Roo.grid.Calendar, Roo.grid.Grid, {
    /**
     * @cfg {Store} eventStore The store that loads events.
     */
    eventStore : 25,

     
    activeDate : false,
    startDay : 0,
    autoWidth : true,
    monitorWindowResize : false,

    
    resizeColumns : function() {
        var col = (this.view.el.getWidth() / 7) - 3;
        // loop through cols, and setWidth
        for(var i =0 ; i < 7 ; i++){
            this.cm.setColumnWidth(i, col);
        }
    },
     setDate :function(date) {
        
        Roo.log('setDate?');
        
        this.resizeColumns();
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
        
        
        this.cells = this.view.el.select('.x-grid-row .x-grid-col',true);
        
        this.textNodes = this.view.el.query('.x-grid-row .x-grid-col .x-grid-cell-text');
        //this.cells.addClassOnOver('fc-state-hover');
        
        var cells = this.cells.elements;
        var textEls = this.textNodes;
        
        //Roo.each(cells, function(cell){
        //    cell.removeClass([ 'fc-past', 'fc-other-month', 'fc-future', 'fc-state-highlight', 'fc-state-disabled']);
        //});
        
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
            if(t == today){
                cell.className += " fc-today";
                cell.className += " fc-state-highlight";
                cell.title = cal.todayText;
            }
            if(t == sel){
                // disable highlight in other month..
                cell.className += " fc-state-highlight";
                
            }
            // disabling
            if(t < min) {
                //cell.className = " fc-state-disabled";
                cell.title = cal.minText;
                return;
            }
            if(t > max) {
                //cell.className = " fc-state-disabled";
                cell.title = cal.maxText;
                return;
            }
            if(ddays){
                if(ddays.indexOf(d.getDay()) != -1){
                    // cell.title = ddaysText;
                   // cell.className = " fc-state-disabled";
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
            cells[i].dayName =  (++prevStart);
            Roo.log(textEls[i]);
            d.setDate(d.getDate()+1);
            
            //cells[i].className = "fc-past fc-other-month";
            setCellClass(this, cells[i]);
        }
        
        var intDay = 0;
        
        for(; i < days; i++){
            intDay = i - startingPos + 1;
            cells[i].dayName =  (intDay);
            d.setDate(d.getDate()+1);
            
            cells[i].className = ''; // "x-date-active";
            setCellClass(this, cells[i]);
        }
        var extraDays = 0;
        
        for(; i < 42; i++) {
            //textEls[i].innerHTML = (++extraDays);
            
            d.setDate(d.getDate()+1);
            cells[i].dayName = (++extraDays);
            cells[i].className = "fc-future fc-other-month";
            setCellClass(this, cells[i]);
        }
        
        //this.el.select('.fc-header-title h2',true).update(Date.monthNames[date.getMonth()] + " " + date.getFullYear());
        
        var totalRows = Math.ceil((date.getDaysInMonth() + date.getFirstDateOfMonth().getDay()) / 7);
        
        // this will cause all the cells to mis
        var rows= [];
        var i =0;
        for (var r = 0;r < 6;r++) {
            for (var c =0;c < 7;c++) {
                this.ds.getAt(r).set('weekday' + c ,cells[i++].dayName );
            }    
        }
        
        this.cells = this.view.el.select('.x-grid-row .x-grid-col',true);
        for(i=0;i<cells.length;i++) {
            
            this.cells.elements[i].dayName = cells[i].dayName ;
            this.cells.elements[i].className = cells[i].className;
            this.cells.elements[i].initialClassName = cells[i].initialClassName ;
            this.cells.elements[i].title = cells[i].title ;
            this.cells.elements[i].dateValue = cells[i].dateValue ;
        }
        
        
        
        
        //this.el.select('tr.fc-week.fc-prev-last',true).removeClass('fc-last');
        //this.el.select('tr.fc-week.fc-next-last',true).addClass('fc-last').show();
        
        ////if(totalRows != 6){
            //this.el.select('tr.fc-week.fc-last',true).removeClass('fc-last').addClass('fc-next-last').hide();
           // this.el.select('tr.fc-week.fc-prev-last',true).addClass('fc-last');
       // }
        
        this.fireEvent('monthchange', this, date);
        
        
    },
 /**
     * Returns the grid's SelectionModel.
     * @return {SelectionModel}
     */
    getSelectionModel : function(){
        if(!this.selModel){
            this.selModel = new Roo.grid.CellSelectionModel();
        }
        return this.selModel;
    },

    load: function() {
        this.eventStore.load()
        
        
        
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
    
    findCells : function(rec) {
        var s = rec.data.start_dt.clone().clearTime().getTime();
       // Roo.log(s);
        var e= rec.data.end_dt.clone().clearTime().getTime();
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
    
    
    addItem : function(rec)
    {
        // look for vertical location slot in
        var cells = this.findCells(rec);
        
        rec.row = this.findBestRow(cells);
        
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
        rec.els = [];
        rec.rows = rows;
        rec.cells = cells;
        for (var i = 0; i < cells.length;i++) {
            cells[i].rows = Math.max(cells[i].rows || 0 , rec.row + 1 );
            
        }
        
        
    },
    
    clearEvents: function() {
        
        if (!this.eventStore.getCount()) {
            return;
        }
        // reset number of rows in cells.
        Roo.each(this.cells.elements, function(c){
            c.rows = 0;
        });
        
        this.eventStore.each(function(e) {
            Roo.each(e.els, function(el) {
                el.un('mouseenter' ,this.onEventEnter, this);
                el.un('mouseleave' ,this.onEventLeave, this);
                el.remove();
            },this);
            e.els = [];
        },this);
        
    },
    
    
    renderEvent : function(ev,ctr) {
        if (!ctr) {
             ctr = this.view.el.select('.fc-event-container',true).first();
        }
        
        if (ev.els) {
            Roo.each(ev.els, function(el) {
                el.un('mouseenter' ,this.onEventEnter, this);
                el.un('mouseleave' ,this.onEventLeave, this);
                el.remove();
            },this);
            ev.els = [];
            //code
        }
        
        
        ev.els = [];
        var cells = ev.cells;
        var rows = ev.rows;
        this.fireEvent('eventrender', this, ev);
        
        for(var i =0; i < rows.length; i++) {
            
            cls = '';
            if (i == 0) {
                cls += ' fc-event-start';
            }
            if ((i+1) == rows.length) {
                cls += ' fc-event-end';
            }
            
            Roo.log(ev.data);
            // how many rows should it span..
            var cg = this.eventTmpl.append(ctr,Roo.apply({
                fccls : cls
                
            }, ev.data) , true);
            
            
            cg.on('mouseenter' ,this.onEventEnter, this, ev);
            cg.on('mouseleave' ,this.onEventLeave, this, ev);
            cg.on('click', this.onEventClick, this, ev);
            
            ev.els.push(cg);
            
            var sbox = rows[i].start.select('.fc-day-content',true).first().getBox();
            var ebox = rows[i].end.select('.fc-day-content',true).first().getBox();
            //Roo.log(cg);
             
            cg.setXY([sbox.x +2, sbox.y +(ev.row * 20)]);    
            cg.setWidth(ebox.right - sbox.x -2);
        }
    },
    
    renderEvents: function()
    {   
        // first make sure there is enough space..
        
        if (!this.eventTmpl) {
            this.eventTmpl = new Roo.Template(
                '<div class="roo-dynamic fc-event fc-event-hori fc-event-draggable ui-draggable {fccls} {cls}"  style="position: absolute" unselectable="on">' +
                    '<div class="fc-event-inner">' +
                        '<span class="fc-event-time">{time}</span>' +
                        '<span class="fc-event-title" qtip="{qtip}">{title}</span>' +
                    '</div>' +
                    '<div class="ui-resizable-heandle ui-resizable-e">&nbsp;&nbsp;&nbsp;</div>' +
                '</div>'
            );
                
        }
               
        
        
        this.cells.each(function(c) {
            Roo.log(c.select('.fc-day-content div',true).first());
            c.select('.fc-day-content div',true).first().setHeight(Math.max(34, (c.rows || 1) * 20));
        });
        
        var ctr = this.view.el.select('.fc-event-container',true).first();
        
        var cls;
        this.eventStore.each(function(ev){
            
            this.renderEvent(ev);
             
             
        }, this);
        this.view.layout();
        
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
        
        //Roo.log('calendar onload');
//         
        if(this.eventStore.getCount() > 0){
            
           
            
            this.eventStore.each(function(d){
                
                
                // FIXME..
                var add =   d.data;
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
                
                this.addItem(d);
                
             
            },this);
        }
        
        this.renderEvents();
    }
    

});
/*
 grid : {
                xtype: 'Grid',
                xns: Roo.grid,
                listeners : {
                    render : function ()
                    {
                        _this.grid = this;
                        
                        if (!this.view.el.hasClass('course-timesheet')) {
                            this.view.el.addClass('course-timesheet');
                        }
                        if (this.tsStyle) {
                            this.ds.load({});
                            return; 
                        }
                        Roo.log('width');
                        Roo.log(_this.grid.view.el.getWidth());
                        
                        
                        this.tsStyle =  Roo.util.CSS.createStyleSheet({
                            '.course-timesheet .x-grid-row' : {
                                height: '80px'
                            },
                            '.x-grid-row td' : {
                                'vertical-align' : 0
                            },
                            '.course-edit-link' : {
                                'color' : 'blue',
                                'text-overflow' : 'ellipsis',
                                'overflow' : 'hidden',
                                'white-space' : 'nowrap',
                                'cursor' : 'pointer'
                            },
                            '.sub-link' : {
                                'color' : 'green'
                            },
                            '.de-act-sup-link' : {
                                'color' : 'purple',
                                'text-decoration' : 'line-through'
                            },
                            '.de-act-link' : {
                                'color' : 'red',
                                'text-decoration' : 'line-through'
                            },
                            '.course-timesheet .course-highlight' : {
                                'border-top-style': 'dashed !important',
                                'border-bottom-bottom': 'dashed !important'
                            },
                            '.course-timesheet .course-item' : {
                                'font-family'   : 'tahoma, arial, helvetica',
                                'font-size'     : '11px',
                                'overflow'      : 'hidden',
                                'padding-left'  : '10px',
                                'padding-right' : '10px',
                                'padding-top' : '10px' 
                            }
                            
                        }, Roo.id());
                                this.ds.load({});
                    }
                },
                autoWidth : true,
                monitorWindowResize : false,
                cellrenderer : function(v,x,r)
                {
                    return v;
                },
                sm : {
                    xtype: 'CellSelectionModel',
                    xns: Roo.grid
                },
                dataSource : {
                    xtype: 'Store',
                    xns: Roo.data,
                    listeners : {
                        beforeload : function (_self, options)
                        {
                            options.params = options.params || {};
                            options.params._month = _this.monthField.getValue();
                            options.params.limit = 9999;
                            options.params['sort'] = 'when_dt';    
                            options.params['dir'] = 'ASC';    
                            this.proxy.loadResponse = this.loadResponse;
                            Roo.log("load?");
                            //this.addColumns();
                        },
                        load : function (_self, records, options)
                        {
                            _this.grid.view.el.select('.course-edit-link', true).on('click', function() {
                                // if you click on the translation.. you can edit it...
                                var el = Roo.get(this);
                                var id = el.dom.getAttribute('data-id');
                                var d = el.dom.getAttribute('data-date');
                                var t = el.dom.getAttribute('data-time');
                                //var id = this.child('span').dom.textContent;
                                
                                //Roo.log(this);
                                Pman.Dialog.CourseCalendar.show({
                                    id : id,
                                    when_d : d,
                                    when_t : t,
                                    productitem_active : id ? 1 : 0
                                }, function() {
                                    _this.grid.ds.load({});
                                });
                           
                           });
                           
                           _this.panel.fireEvent('resize', [ '', '' ]);
                        }
                    },
                    loadResponse : function(o, success, response){
                            // this is overridden on before load..
                            
                            Roo.log("our code?");	
                            //Roo.log(success);
                            //Roo.log(response)
                            delete this.activeRequest;
                            if(!success){
                                this.fireEvent("loadexception", this, o, response);
                                o.request.callback.call(o.request.scope, null, o.request.arg, false);
                                return;
                            }
                            var result;
                            try {
                                result = o.reader.read(response);
                            }catch(e){
                                Roo.log("load exception?");
                                this.fireEvent("loadexception", this, o, response, e);
                                o.request.callback.call(o.request.scope, null, o.request.arg, false);
                                return;
                            }
                            Roo.log("ready...");        
                            // loop through result.records;
                            // and set this.tdate[date] = [] << array of records..
                            _this.tdata  = {};
                            Roo.each(result.records, function(r){
                                //Roo.log(r.data);
                                if(typeof(_this.tdata[r.data.when_dt.format('j')]) == 'undefined'){
                                    _this.tdata[r.data.when_dt.format('j')] = [];
                                }
                                _this.tdata[r.data.when_dt.format('j')].push(r.data);
                            });
                            
                            //Roo.log(_this.tdata);
                            
                            result.records = [];
                            result.totalRecords = 6;
                    
                            // let's generate some duumy records for the rows.
                            //var st = _this.dateField.getValue();
                            
                            // work out monday..
                            //st = st.add(Date.DAY, -1 * st.format('w'));
                            
                            var date = Date.parseDate(_this.monthField.getValue(), "Y-m-d");
                            
                            var firstOfMonth = date.getFirstDayOfMonth();
                            var days = date.getDaysInMonth();
                            var d = 1;
                            var firstAdded = false;
                            for (var i = 0; i < result.totalRecords ; i++) {
                                //var d= st.add(Date.DAY, i);
                                var row = {};
                                var added = 0;
                                for(var w = 0 ; w < 7 ; w++){
                                    if(!firstAdded && firstOfMonth != w){
                                        continue;
                                    }
                                    if(d > days){
                                        continue;
                                    }
                                    firstAdded = true;
                                    var dd = (d > 0 && d < 10) ? "0"+d : d;
                                    row['weekday'+w] = String.format(
                                                    '<span style="font-size: 16px;"><b>{0}</b></span>'+
                                                    '<span class="course-edit-link" style="color:blue;" data-id="0" data-date="{1}"> Add New</span>',
                                                    d,
                                                    date.format('Y-m-')+dd
                                                );
                                    added++;
                                    if(typeof(_this.tdata[d]) != 'undefined'){
                                        Roo.each(_this.tdata[d], function(r){
                                            var is_sub = '';
                                            var deactive = '';
                                            var id = r.id;
                                            var desc = (r.productitem_id_descrip) ? r.productitem_id_descrip : '';
                                            if(r.parent_id*1>0){
                                                is_sub = (r.productitem_id_visible*1 < 1) ? 'de-act-sup-link' :'sub-link';
                                                id = r.parent_id;
                                            }
                                            if(r.productitem_id_visible*1 < 1 && r.parent_id*1 < 1){
                                                deactive = 'de-act-link';
                                            }
                                            
                                            row['weekday'+w] += String.format(
                                                    '<br /><span class="course-edit-link {3} {4}" qtip="{5}" data-id="{0}">{2} - {1}</span>',
                                                    id, //0
                                                    r.product_id_name, //1
                                                    r.when_dt.format('h:ia'), //2
                                                    is_sub, //3
                                                    deactive, //4
                                                    desc // 5
                                            );
                                        });
                                    }
                                    d++;
                                }
                                
                                // only do this if something added..
                                if(added > 0){ 
                                    result.records.push(_this.grid.dataSource.reader.newRow(row));
                                }
                                
                                
                                // push it twice. (second one with an hour..
                                
                            }
                            //Roo.log(result);
                            this.fireEvent("load", this, o, o.request.arg);
                            o.request.callback.call(o.request.scope, result, o.request.arg, true);
                        },
                    sortInfo : {field: 'when_dt', direction : 'ASC' },
                    proxy : {
                        xtype: 'HttpProxy',
                        xns: Roo.data,
                        method : 'GET',
                        url : baseURL + '/Roo/Shop_course.php'
                    },
                    reader : {
                        xtype: 'JsonReader',
                        xns: Roo.data,
                        id : 'id',
                        fields : [
                            {
                                'name': 'id',
                                'type': 'int'
                            },
                            {
                                'name': 'when_dt',
                                'type': 'string'
                            },
                            {
                                'name': 'end_dt',
                                'type': 'string'
                            },
                            {
                                'name': 'parent_id',
                                'type': 'int'
                            },
                            {
                                'name': 'product_id',
                                'type': 'int'
                            },
                            {
                                'name': 'productitem_id',
                                'type': 'int'
                            },
                            {
                                'name': 'guid',
                                'type': 'int'
                            }
                        ]
                    }
                },
                toolbar : {
                    xtype: 'Toolbar',
                    xns: Roo,
                    items : [
                        {
                            xtype: 'Button',
                            xns: Roo.Toolbar,
                            listeners : {
                                click : function (_self, e)
                                {
                                    var sd = Date.parseDate(_this.monthField.getValue(), "Y-m-d");
                                    sd.setMonth(sd.getMonth()-1);
                                    _this.monthField.setValue(sd.format('Y-m-d'));
                                    _this.grid.ds.load({});
                                }
                            },
                            text : "Back"
                        },
                        {
                            xtype: 'Separator',
                            xns: Roo.Toolbar
                        },
                        {
                            xtype: 'MonthField',
                            xns: Roo.form,
                            listeners : {
                                render : function (_self)
                                {
                                    _this.monthField = _self;
                                   // _this.monthField.set  today
                                },
                                select : function (combo, date)
                                {
                                    _this.grid.ds.load({});
                                }
                            },
                            value : (function() { return new Date(); })()
                        },
                        {
                            xtype: 'Separator',
                            xns: Roo.Toolbar
                        },
                        {
                            xtype: 'TextItem',
                            xns: Roo.Toolbar,
                            text : "Blue: in-active, green: in-active sup-event, red: de-active, purple: de-active sup-event"
                        },
                        {
                            xtype: 'Fill',
                            xns: Roo.Toolbar
                        },
                        {
                            xtype: 'Button',
                            xns: Roo.Toolbar,
                            listeners : {
                                click : function (_self, e)
                                {
                                    var sd = Date.parseDate(_this.monthField.getValue(), "Y-m-d");
                                    sd.setMonth(sd.getMonth()+1);
                                    _this.monthField.setValue(sd.format('Y-m-d'));
                                    _this.grid.ds.load({});
                                }
                            },
                            text : "Next"
                        }
                    ]
                },
                 
            }
        };
        
        */