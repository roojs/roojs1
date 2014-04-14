/*
 * - LGPL
 *
 * DateField
 * 
 */

/**
 * @class Roo.bootstrap.DateField
 * @extends Roo.bootstrap.Input
 * Bootstrap DateField class
 * @cfg {Number} weekStart default 0
 * @cfg {Number} weekStart default 0
 * @cfg {Number} viewMode default empty, (months|years)
 * @cfg {Number} minViewMode default empty, (months|years)
 * @cfg {Boolean} todayHighlight default false
 * @cfg {String} language default en
 * 
 * @constructor
 * Create a new DateField
 * @param {Object} config The config object
 */

Roo.bootstrap.DateField = function(config){
    Roo.bootstrap.DateField.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.DateField, Roo.bootstrap.Input,  {
    
    /**
     * @cfg {String} format
     * The default date format string which can be overriden for localization support.  The format must be
     * valid according to {@link Date#parseDate} (defaults to 'm/d/y').
     */
    format : "m/d/y",
    /**
     * @cfg {String} altFormats
     * Multiple date formats separated by "|" to try when parsing a user input value and it doesn't match the defined
     * format (defaults to 'm/d/Y|m-d-y|m-d-Y|m/d|m-d|d').
     */
    altFormats : "m/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d",
    
    weekStart : 0,
    
    viewMode : '',
    
    minViewMode : '',
    
    todayHighlight : false,
    
    language: 'en',
    
    UTCDate: function()
    {
        return new Date(Date.UTC.apply(Date, arguments));
    },
    
    UTCToday: function()
    {
        var today = new Date();
        return UTCDate(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
    },
        
    onRender: function(ct, position)
    {
        Roo.bootstrap.DateField.superclass.onRender.call(this, ct, position);
        
        if (typeof(this.minViewMode === 'string')) {
            switch (this.minViewMode) {
                    case 'months':
                            this.minViewMode = 1;
                            break;
                    case 'years':
                            this.minViewMode = 2;
                            break;
                    default:
                            this.minViewMode = 0;
                            break;
            }
        }
        
        if (typeof(this.viewMode === 'string')) {
            switch (this.viewMode) {
                    case 'months':
                            this.viewMode = 1;
                            break;
                    case 'years':
                            this.viewMode = 2;
                            break;
                    default:
                            this.viewMode = 0;
                            break;
            }
        }
                
        this.el.select('>.input-group', true).first().createChild(Roo.bootstrap.DateField.template);
        
        this.picker().setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        this.picker().on('mousedown', this.onMousedown, this);
        this.picker().on('click', this.onClick, this);
        
        this.startViewMode = this.viewMode;
        this.weekEnd = this.weekStart === 0 ? 6 : this.weekStart - 1;
        this.fillDow();
        this.fillMonths();
        this.update();
        this.showMode();
    },
    
    picker : function()
    {
        return this.el.select('.datepicker', true).first();
    },
    
    fillDow: function()
    {
        var dowCnt = this.weekStart;
        
        var dow = {
            tag: 'tr',
            cn: [
                
            ]
        };
        
        while (dowCnt < this.weekStart + 7) {
                dow.cn.push({
                    tag: 'th',
                    cls: 'dow',
                    html: Roo.bootstrap.DateField.dates.daysMin[(dowCnt++)%7]
                });
        }
        
        this.picker().select('>.datepicker-days thead', true).first().createChild(dow);
    },
    
    fillMonths: function()
    {   
        var i = 0
        var months = this.picker().select('>.datepicker-months td', true).first();
        
        while (i < 12) {
            var month = {
                tag: 'span',
                cls: 'month',
                html: Roo.bootstrap.DateField.dates.monthsShort[i++]
            }
            
            months.createChild(month);
        }
        
    },
    
    update: function(newDate){
        
        this.date = (typeof(newDate) === 'undefined') ? new Date() : (typeof(newDate) === 'string') ? this.parseDate(newDate) : newDate;
        
        this.viewDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1, 0, 0, 0, 0);
        
        this.fill();
    },
    
    fill: function() {
        var d = new Date(this.viewDate),
                year = d.getFullYear(),
                month = d.getMonth(),
                currentDate = this.date.clearTime().valueOf();
        
        this.picker().select('>.datepicker-days th.switch', true).first().dom.innerHTML = Roo.bootstrap.DateField.dates.months[month]+' '+year;
        
        var prevMonth = new Date(year, month-1, 28,0,0,0,0),
                day = prevMonth.getDaysInMonth();
                
        prevMonth.setDate(day);
        prevMonth.setDate(day - (prevMonth.getDay() - this.weekStart + 7)%7);
        
        var nextMonth = new Date(prevMonth);
        
        nextMonth.setDate(nextMonth.getDate() + 42);
        
        nextMonth = nextMonth.valueOf();
        
        var fillMonths = false;
        
        this.picker().select('>.datepicker-days tbody',true).first().dom.innerHTML = '';
        
        while(prevMonth.valueOf() < nextMonth) {
            var clsName = '';
            
            if (prevMonth.getDay() === this.weekStart) {
                    if(fillMonths){
                        this.picker().select('>.datepicker-days tbody',true).first().createChild(fillMonths);
                    }
                    
                    fillMonths = {
                        tag: 'tr',
                        cn: []
                    };
            }
            
            var prevY = prevMonth.getFullYear();
            var prevM = prevMonth.getMonth();
            var prevD = prevMonth.getDate();
            var today = new Date();
            
            if ((prevM < month &&  prevY === year) ||  prevY < year) {
                    clsName += ' old';
            } else if ((prevM > month && prevY === year) || prevY > year) {
                    clsName += ' new';
            }
            if (this.todayHighlight &&
                    prevY == today.getFullYear() &&
                    prevM == today.getMonth() &&
                    prevD == today.getDate()) {
                    clsName += ' today';
            }
            
            if (prevMonth.valueOf() === currentDate) {
                    clsName += ' active';
            }
            
            fillMonths.cn.push({
                tag: 'td',
                cls: 'day ' + clsName,
                html: prevMonth.getDate()
            })
            
            prevMonth.setDate(prevMonth.getDate()+1);
        }
          
        var currentYear = this.date.getFullYear();
        var currentMonth = this.date.getMonth();

        this.picker().select('>.datepicker-months th.switch',true).first().dom.innerHTML = year;
        
        Roo.each(this.picker().select('>.datepicker-months tbody span',true).elements, function(v,k){
            v.removeClass('active');
            
            if(currentYear === year && k === currentMonth){
                v.addClass('active');
            }
        });
        
        year = parseInt(year/10, 10) * 10;
        
        this.picker().select('>.datepicker-years th.switch', true).first().dom.innerHTML = year + '-' + (year + 9);
        
        this.picker().select('>.datepicker-years tbody td',true).first().dom.innerHTML = '';
        
        year -= 1;
        for (var i = -1; i < 11; i++) {
            this.picker().select('>.datepicker-years tbody td',true).first().createChild({
                tag: 'span',
                cls: 'year' + (i === -1 || i === 10 ? ' old' : '')+(currentYear === year ? ' active' : ''),
                html: year
            })
            
            year += 1;
        }
    },
    
    showMode: function(dir) {
        if (dir) {
                this.viewMode = Math.max(this.minViewMode, Math.min(2, this.viewMode + dir));
        }
        Roo.each(this.picker().select('>div',true).elements, function(v){
            v.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
            v.hide();
        });
        this.picker().select('>.datepicker-'+Roo.bootstrap.DateField.modes[this.viewMode].clsName, true).first().show();
    },
    
    place: function()
    {
        this.picker().setTop(this.inputEl().getHeight()).setLeft(this.inputEl().getLeft() - this.el.getLeft());
    },
    
    parseDate : function(value){
        if(!value || value instanceof Date){
            return value;
        }
        var v = Date.parseDate(value, this.format);
         if (!v && this.useIso) {
            v = Date.parseDate(value, 'Y-m-d');
        }
        if(!v && this.altFormats){
            if(!this.altFormatsArray){
                this.altFormatsArray = this.altFormats.split("|");
            }
            for(var i = 0, len = this.altFormatsArray.length; i < len && !v; i++){
                v = Date.parseDate(value, this.altFormatsArray[i]);
            }
        }
        return v;
    },
    
    formatDate : function(date, fmt){
        return (!date || !(date instanceof Date)) ?
               date : date.dateFormat(fmt || this.format);
    },
    
    onFocus : function()
    {
        Roo.bootstrap.DateField.superclass.onFocus.call(this);
        Roo.log('onFocus !');
        this.show();
    },
    
    onBlur : function()
    {
        Roo.bootstrap.DateField.superclass.onBlur.call(this);
        Roo.log('onBlur !');
        this.hide();
    },
    
    show : function()
    {
        this.picker().show();
        this.place();
    },
    
    hide : function()
    {
        this.picker().hide();
        this.viewMode = this.startViewMode;
        this.showMode();
    },
    
    onMousedown: function(e){
        e.stopPropagation();
        e.preventDefault();
    },
    
    onClick: function(e) {
        
        var target = e.getTarget();
        
        var nodeName = target.nodeName;
        var className = target.className;
        var html = target.innerHTML;
        
        switch(nodeName.toLowerCase()) {
                case 'th':
                    switch(className) {
                        case 'switch':
                            this.showMode(1);
                            break;
                        case 'prev':
                        case 'next':
                            this.viewDate['set'+Roo.bootstrap.DateField.modes[this.viewMode].navFnc].call(
                                    this.viewDate,
                                    this.viewDate['get'+Roo.bootstrap.DateField.modes[this.viewMode].navFnc].call(this.viewDate) + 
                                    Roo.bootstrap.DateField.modes[this.viewMode].navStep * (target.className === 'prev' ? -1 : 1)
                            );
                            this.fill();
//                                        this.setValue(this.formatDate(this.date));
                            break;
                    }
                    break;
                case 'span':
                    if (className.indexOf('month') !== -1) {
                        this.viewDate.setMonth(new Date(html + " 1").getMonth());
                    } else {
                        var year = parseInt(html, 10) || 0;
                        this.viewDate.setFullYear(year);
                    }
                    if (this.viewMode !== 0) {
                        this.date = new Date(this.viewDate);
//                        this.element.trigger({
//                                type: 'changeDate',
//                                date: this.date,
//                                viewMode: DPGlobal.modes[this.viewMode].clsName
//                        });
                    }
                    this.showMode(-1);
                    this.fill();
//                    this.set();
                    break;
                case 'td':
                    if (className.indexOf('day') !== -1 && className.indexOf('disabled') === -1){
                        var day = parseInt(html, 10) || 1;
                        var month = this.viewDate.getMonth();

                        if (className.indexOf('old') !== -1) {
                                month -= 1;
                        } else if (className.indexOf('new') !== -1) {
                                month += 1;
                        }
                        var year = this.viewDate.getFullYear();
                        this.date = new Date(year, month, day,0,0,0,0);
                        this.viewDate = new Date(year, month, Math.min(28, day),0,0,0,0);
                        this.fill();
                        this.setValue(this.formatDate(this.date));
                        this.hide();
//                                this.element.trigger({
//                                        type: 'changeDate',
//                                        date: this.date,
//                                        viewMode: DPGlobal.modes[this.viewMode].clsName
//                                });
                    }
                    break;
        }
    }
//    getAutoCreate : function(){
//        var cfg = {
//            tag: 'div',
//            cls: 'input-append date',
//            cn: [
//                {
//                    tag: 'input',
//                    cls: 'span2 form-control'
//                },
//                {
//                        tag: 'span',
//                        cls: 'add-on',
//                        html: '<i class="icon-th"></i>'
//                    }
//            ]
//            
//        };
//        
//        return cfg;
//    }
   
});

Roo.apply(Roo.bootstrap.DateField,  {
    
    head : {
        tag: 'thead',
        cn: [
            {
                tag: 'tr',
                cn: [
                    {
                        tag: 'th',
                        cls: 'prev',
                        html: '<i class="icon-arrow-left"/>'
                    },
                    {
                        tag: 'th',
                        cls: 'switch',
                        colspan: '5'
                    },
                    {
                        tag: 'th',
                        cls: 'next',
                        html: '<i class="icon-arrow-right"/>'
                    }

                ]
            }
        ]
    },
    
    content : {
        tag: 'tbody',
        cn: [
            {
                tag: 'tr',
                cn: [
                    {
                        tag: 'td',
                        colspan: '7'
                    }
                ]
            }
        ]
    },
    
    footer : {
        tag: 'tfoot',
        cn: [
            {
                tag: 'tr',
                cn: [
                    {
                        tag: 'th',
                        colspan: '7',
                        cls: 'today'
                    }
                    
                ]
            }
        ]
    },
    
    dates:{
        en: {
                days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                today: "Today"
            }
    },
    
    modes: [
            {
                clsName: 'days',
                navFnc: 'Month',
                navStep: 1
            },
            {
                clsName: 'months',
                navFnc: 'FullYear',
                navStep: 1
            },
            {
                clsName: 'years',
                navFnc: 'FullYear',
                navStep: 10
    }]
});

Roo.apply(Roo.bootstrap.DateField,  {
  
    template : {
        tag: 'div',
        cls: 'datepicker dropdown-menu',
        cn: [
            {
                tag: 'div',
                cls: 'datepicker-days',
                cn: [
                    {
                        tag: 'table',
                        cls: 'table-condensed',
                        cn:[
                            Roo.bootstrap.DateField.head,
                            {
                                tag: 'tbody'
                            },
                            Roo.bootstrap.DateField.footer
                        ]
                    }
                ]
            },
            {
                tag: 'div',
                cls: 'datepicker-months',
                cn: [
                    {
                        tag: 'table',
                        cls: 'table-condensed',
                        cn:[
                            Roo.bootstrap.DateField.head,
                            Roo.bootstrap.DateField.content,
                            Roo.bootstrap.DateField.footer
                        ]
                    }
                ]
            },
            {
                tag: 'div',
                cls: 'datepicker-years',
                cn: [
                    {
                        tag: 'table',
                        cls: 'table-condensed',
                        cn:[
                            Roo.bootstrap.DateField.head,
                            Roo.bootstrap.DateField.content,
                            Roo.bootstrap.DateField.footer
                        ]
                    }
                ]
            }
        ]
    }
});

 

 