/*
 * - LGPL
 *
 * DateField
 * 
 */

/**
 * @class Roo.bootstrap.form.DateField
 * @extends Roo.bootstrap.form.Input
 * Bootstrap DateField class
 * @cfg {Number} weekStart default 0
 * @cfg {String} viewMode default empty, (months|years)
 * @cfg {String} minViewMode default empty, (months|years)
 * @cfg {Number} startDate default -Infinity
 * @cfg {Number} endDate default Infinity
 * @cfg {Boolean} todayHighlight default false
 * @cfg {Boolean} todayBtn default false
 * @cfg {Boolean} calendarWeeks default false
 * @cfg {Object} daysOfWeekDisabled default empty
 * @cfg {Boolean} singleMode default false (true | false)
 * 
 * @cfg {Boolean} keyboardNavigation default true
 * @cfg {String} language default en
 * 
 * @constructor
 * Create a new DateField
 * @param {Object} config The config object
 */
 
Roo.bootstrap.form.DateField = function(config){
    Roo.bootstrap.form.DateField.superclass.constructor.call(this, config);
     this.addEvents({
            /**
             * @event show
             * Fires when this field show.
             * @param {Roo.bootstrap.form.DateField} this
             * @param {Mixed} date The date value
             */
            show : true,
            /**
             * @event show
             * Fires when this field hide.
             * @param {Roo.bootstrap.form.DateField} this
             * @param {Mixed} date The date value
             */
            hide : true,
            /**
             * @event select
             * Fires when select a date.
             * @param {Roo.bootstrap.form.DateField} this
             * @param {Mixed} date The date value
             */
            select : true,
            /**
             * @event beforeselect
             * Fires when before select a date.
             * @param {Roo.bootstrap.form.DateField} this
             * @param {Mixed} date The date value
             */
            beforeselect : true
        });
};

Roo.extend(Roo.bootstrap.form.DateField, Roo.bootstrap.form.Input,  {
    
    /**
     * @cfg {String} format
     * The default date format string which can be overriden for localization support.  The format must be
     * valid according to {@link Date#parseDate} (defaults to 'm/d/y').
     */
    format : "m/d/y",
    
    weekStart : 0,
    
    viewMode : '',
    
    minViewMode : '',
    
    todayHighlight : false,
    
    todayBtn: false,
    
    language: 'en',
    
    keyboardNavigation: true,
    
    calendarWeeks: false,
    
    startDate: -Infinity,
    
    endDate: Infinity,
    
    daysOfWeekDisabled: [],
    
    _events: [],
    
    singleMode : false,

    hiddenField : false,
    
    UTCDate: function()
    {
        return new Date(Date.UTC.apply(Date, arguments));
    },
    
    UTCToday: function()
    {
        var today = new Date();
        return this.UTCDate(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
    },
    
    getDate: function() {
            var d = this.getUTCDate();
            return new Date(d.getTime() + (d.getTimezoneOffset()*60000));
    },
    
    getUTCDate: function() {
            return this.date;
    },
    
    setDate: function(d) {
            this.setUTCDate(new Date(d.getTime() - (d.getTimezoneOffset()*60000)));
    },
    
    setUTCDate: function(d) {
            this.date = d;
            this.setValue(this.date);
    },

    setDatesTranslation: function(lang) 
    {
        Roo.bootstrap.form.DateField.dates[lang] = {
            days: [],
            daysShort: [],
            daysMin: [],
            months: [],
            monthsShort: [],
            today: "Today"
        };

        locale = lang.replace('_', '-');

        for(var i = 0; i < 7; i++) {
            var date = new Date(2020, 0, 5 + i);

            Roo.bootstrap.form.DateField.dates[lang]['days'].push(new Intl.DateTimeFormat(locale, {
                weekday : 'long'
            }).format(date));

            Roo.bootstrap.form.DateField.dates[lang]['daysShort'].push(new Intl.DateTimeFormat(locale, {
                weekday : 'short'
            }).format(date));

            Roo.bootstrap.form.DateField.dates[lang]['daysMin'].push(new Intl.DateTimeFormat(locale, {
                weekday : 'narrow'
            }).format(date));
        }

        for(var i = 0; i < 12; i++) {
            var date = new Date(2020, i);

            Roo.bootstrap.form.DateField.dates[lang]['months'].push(new Intl.DateTimeFormat(locale, {
                month : 'long'
            }).format(date));

            Roo.bootstrap.form.DateField.dates[lang]['monthsShort'].push(new Intl.DateTimeFormat(locale, {
                month : 'short'
            }).format(date));
        }
    },
        
    onRender: function(ct, position)
    {
        
        Roo.bootstrap.form.DateField.superclass.onRender.call(this, ct, position);

        this.setDatesTranslation('zh_CN');
        
        this.language = this.language || 'en';
        this.language = this.language in Roo.bootstrap.form.DateField.dates ? this.language : this.language.split('-')[0];
        this.language = this.language in Roo.bootstrap.form.DateField.dates ? this.language : "en";
        
        this.isRTL = Roo.bootstrap.form.DateField.dates[this.language].rtl || false;
        this.format = this.format || 'm/d/y';
        this.isInline = false;
        this.isInput = true;
        this.component = this.el.select('.add-on', true).first() || false;
        this.component = (this.component && this.component.length === 0) ? false : this.component;
        this.hasInput = this.component && this.inputEl().length;
        
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
                
        this.pickerEl = Roo.get(document.body).createChild(Roo.bootstrap.form.DateField.template);
        
//        this.el.select('>.input-group', true).first().createChild(Roo.bootstrap.form.DateField.template);
        
        this.picker().setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        this.picker().on('mousedown', this.onMousedown, this);
        this.picker().on('click', this.onClick, this);
        
        this.picker().addClass('datepicker-dropdown');
        
        this.startViewMode = this.viewMode;
        
        if(this.singleMode){
            Roo.each(this.picker().select('thead > tr > th', true).elements, function(v){
                v.setVisibilityMode(Roo.Element.DISPLAY);
                v.hide();
            });
            
            Roo.each(this.picker().select('tbody > tr > td', true).elements, function(v){
                v.setStyle('width', '189px');
            });
        }
        
        Roo.each(this.picker().select('tfoot th.today', true).elements, function(v){
            if(!this.calendarWeeks){
                v.remove();
                return;
            }
            
            v.dom.innerHTML = Roo.bootstrap.form.DateField.dates[this.language].today;
            v.attr('colspan', function(i, val){
                return parseInt(val) + 1;
            });
        });
			
        
        this.weekEnd = this.weekStart === 0 ? 6 : this.weekStart - 1;
        
        this.setStartDate(this.startDate);
        this.setEndDate(this.endDate);
        
        this.setDaysOfWeekDisabled(this.daysOfWeekDisabled);
        
        this.fillDow();
        this.fillMonths();
        this.update();
        this.showMode();
        
        if(this.isInline) {
            this.showPopup();
        }

        this.hiddenField = this.inputEl().insertSibling(
            {tag : 'input', type : 'hidden', name : this.name},
            'before',
            true
        );
        this.inputEl().dom.setAttribute('name', this.name + '____hidden___');
        this.hiddenField.value = this.date.dateFormat('Y-m-d');

    },
    
    picker : function()
    {
        return this.pickerEl;
//        return this.el.select('.datepicker', true).first();
    },
    
    fillDow: function()
    {
        var dowCnt = this.weekStart;
        
        var dow = {
            tag: 'tr',
            cn: [
                
            ]
        };
        
        if(this.calendarWeeks){
            dow.cn.push({
                tag: 'th',
                cls: 'cw',
                html: '&nbsp;'
            })
        }
        
        while (dowCnt < this.weekStart + 7) {
            dow.cn.push({
                tag: 'th',
                cls: 'dow',
                html: Roo.bootstrap.form.DateField.dates[this.language].daysMin[(dowCnt++)%7]
            });
        }
        
        this.picker().select('>.datepicker-days thead', true).first().createChild(dow);
    },
    
    fillMonths: function()
    {    
        var i = 0;
        var months = this.picker().select('>.datepicker-months td', true).first();
        
        months.dom.innerHTML = '';
        
        while (i < 12) {
            var month = {
                tag: 'span',
                cls: 'month',
                html: Roo.bootstrap.form.DateField.dates[this.language].monthsShort[i++]
            };
            
            months.createChild(month);
        }
        
    },
    
    update: function()
    {
        this.date = (typeof(this.date) === 'undefined' || ((typeof(this.date) === 'string') && !this.date.length)) ? this.UTCToday() : (typeof(this.date) === 'string') ? this.parseDate(this.date) : this.date;
        
        if (this.date < this.startDate) {
            this.viewDate = new Date(this.startDate);
        } else if (this.date > this.endDate) {
            this.viewDate = new Date(this.endDate);
        } else {
            this.viewDate = new Date(this.date);
        }
        
        this.fill();
    },
    
    fill: function() 
    {
        var d = new Date(this.viewDate),
                year = d.getUTCFullYear(),
                month = d.getUTCMonth(),
                startYear = this.startDate !== -Infinity ? this.startDate.getUTCFullYear() : -Infinity,
                startMonth = this.startDate !== -Infinity ? this.startDate.getUTCMonth() : -Infinity,
                endYear = this.endDate !== Infinity ? this.endDate.getUTCFullYear() : Infinity,
                endMonth = this.endDate !== Infinity ? this.endDate.getUTCMonth() : Infinity,
                currentDate = this.date && this.date.valueOf(),
                today = this.UTCToday();
        
        this.picker().select('>.datepicker-days thead th.switch', true).first().dom.innerHTML = Roo.bootstrap.form.DateField.dates[this.language].months[month]+' '+year;
        
//        this.picker().select('>tfoot th.today', true).first().dom.innerHTML = Roo.bootstrap.form.DateField.dates[this.language].today;
        
//        this.picker.select('>tfoot th.today').
//						.text(dates[this.language].today)
//						.toggle(this.todayBtn !== false);
    
        this.updateNavArrows();
        this.fillMonths();
                                                
        var prevMonth = this.UTCDate(year, month-1, 28,0,0,0,0),
        
        day = prevMonth.getDaysInMonth(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth());
         
        prevMonth.setUTCDate(day);
        
        prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.weekStart + 7)%7);
        
        var nextMonth = new Date(prevMonth);
        
        nextMonth.setUTCDate(nextMonth.getUTCDate() + 42);
        
        nextMonth = nextMonth.valueOf();
        
        var fillMonths = false;
        
        this.picker().select('>.datepicker-days tbody',true).first().dom.innerHTML = '';
        
        while(prevMonth.valueOf() <= nextMonth) {
            var clsName = '';
            
            if (prevMonth.getUTCDay() === this.weekStart) {
                if(fillMonths){
                    this.picker().select('>.datepicker-days tbody',true).first().createChild(fillMonths);
                }
                    
                fillMonths = {
                    tag: 'tr',
                    cn: []
                };
                
                if(this.calendarWeeks){
                    // ISO 8601: First week contains first thursday.
                    // ISO also states week starts on Monday, but we can be more abstract here.
                    var
                    // Start of current week: based on weekstart/current date
                    ws = new Date(+prevMonth + (this.weekStart - prevMonth.getUTCDay() - 7) % 7 * 864e5),
                    // Thursday of this week
                    th = new Date(+ws + (7 + 4 - ws.getUTCDay()) % 7 * 864e5),
                    // First Thursday of year, year from thursday
                    yth = new Date(+(yth = this.UTCDate(th.getUTCFullYear(), 0, 1)) + (7 + 4 - yth.getUTCDay())%7*864e5),
                    // Calendar week: ms between thursdays, div ms per day, div 7 days
                    calWeek =  (th - yth) / 864e5 / 7 + 1;
                    
                    fillMonths.cn.push({
                        tag: 'td',
                        cls: 'cw',
                        html: calWeek
                    });
                }
            }
            
            if (prevMonth.getUTCFullYear() < year || (prevMonth.getUTCFullYear() == year && prevMonth.getUTCMonth() < month)) {
                clsName += ' old';
            } else if (prevMonth.getUTCFullYear() > year || (prevMonth.getUTCFullYear() == year && prevMonth.getUTCMonth() > month)) {
                clsName += ' new';
            }
            if (this.todayHighlight &&
                prevMonth.getUTCFullYear() == today.getFullYear() &&
                prevMonth.getUTCMonth() == today.getMonth() &&
                prevMonth.getUTCDate() == today.getDate()) {
                clsName += ' today';
            }
            
            if (currentDate && prevMonth.valueOf() === currentDate) {
                clsName += ' active';
            }
            
            if (prevMonth.valueOf() < this.startDate || prevMonth.valueOf() > this.endDate ||
                    this.daysOfWeekDisabled.indexOf(prevMonth.getUTCDay()) !== -1) {
                    clsName += ' disabled';
            }
            
            fillMonths.cn.push({
                tag: 'td',
                cls: 'day ' + clsName,
                html: prevMonth.getDate()
            });
            
            prevMonth.setDate(prevMonth.getDate()+1);
        }
          
        var currentYear = this.date && this.date.getUTCFullYear();
        var currentMonth = this.date && this.date.getUTCMonth();
        
        this.picker().select('>.datepicker-months th.switch',true).first().dom.innerHTML = year;
        
        Roo.each(this.picker().select('>.datepicker-months tbody span',true).elements, function(v,k){
            v.removeClass('active');
            
            if(currentYear === year && k === currentMonth){
                v.addClass('active');
            }
            
            if (year < startYear || year > endYear || (year == startYear && k < startMonth) || (year == endYear && k > endMonth)) {
                v.addClass('disabled');
            }
            
        });
        
        
        year = parseInt(year/10, 10) * 10;
        
        this.picker().select('>.datepicker-years th.switch', true).first().dom.innerHTML = year + '-' + (year + 9);
        
        this.picker().select('>.datepicker-years tbody td',true).first().dom.innerHTML = '';
        
        year -= 1;
        for (var i = -1; i < 11; i++) {
            this.picker().select('>.datepicker-years tbody td',true).first().createChild({
                tag: 'span',
                cls: 'year' + (i === -1 || i === 10 ? ' old' : '') + (currentYear === year ? ' active' : '') + (year < startYear || year > endYear ? ' disabled' : ''),
                html: year
            });
            
            year += 1;
        }
    },
    
    showMode: function(dir) 
    {
        if (dir) {
            this.viewMode = Math.max(this.minViewMode, Math.min(2, this.viewMode + dir));
        }
        
        Roo.each(this.picker().select('>div',true).elements, function(v){
            v.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
            v.hide();
        });
        this.picker().select('>.datepicker-'+Roo.bootstrap.form.DateField.modes[this.viewMode].clsName, true).first().show();
    },
    
    place: function()
    {
        if(this.isInline) {
            return;
        }
        
        this.picker().removeClass(['bottom', 'top']);
        
        if((Roo.lib.Dom.getViewHeight() + Roo.get(document.body).getScroll().top) - (this.inputEl().getBottom() + this.picker().getHeight()) < 0){
            /*
             * place to the top of element!
             *
             */
            
            this.picker().addClass('top');
            this.picker().setTop(this.inputEl().getTop() - this.picker().getHeight()).setLeft(this.inputEl().getLeft());
            
            return;
        }
        
        this.picker().addClass('bottom');
        
        this.picker().setTop(this.inputEl().getBottom()).setLeft(this.inputEl().getLeft());
    },
    
    parseDate : function(value)
    {
        if(!value || value instanceof Date){
            return value;
        }
        var v = Date.parseDate(value, this.format);

        if(typeof(v) == 'undefined') {
            v = Date.parseDate(value, 'Y-m-d');
        }

        return (typeof(v) == 'undefined') ? false : v;
    },
    
    formatDate : function(date, fmt)
    {   
        return (!date || !(date instanceof Date)) ?
        date : date.dateFormat(fmt || this.format);
    },

    translateDate : function(date)
    {
        switch(this.language) {
            case 'zh_CN':
                return new Intl.DateTimeFormat('zh-CN', {
                    year : 'numeric',
                    month : 'long',
                    day : 'numeric'
                }).format(date);
            default :
                return this.formatDate(date);
        }
    },
    
    onFocus : function()
    {
        Roo.bootstrap.form.DateField.superclass.onFocus.call(this);
        this.showPopup();
    },
    
    onBlur : function()
    {
        Roo.bootstrap.form.DateField.superclass.onBlur.call(this);

        if(!this.readOnly) {
            var d = this.inputEl().getValue();
            this.setValue(d);
        }
                
        this.hidePopup();
    },
    
    showPopup : function()
    {
        this.picker().show();
        this.update();
        this.place();
        
        this.fireEvent('showpopup', this, this.date);
    },
    
    hidePopup : function()
    {
        if(this.isInline) {
            return;
        }
        this.picker().hide();
        this.viewMode = this.startViewMode;
        this.showMode();
        
        this.fireEvent('hidepopup', this, this.date);
        
    },
    
    onMousedown: function(e)
    {
        e.stopPropagation();
        e.preventDefault();
    },
    
    keyup: function(e)
    {
        Roo.bootstrap.form.DateField.superclass.keyup.call(this);
        this.update();
    },

    setValue: function(v)
    {
        Roo.log('SET VALUE:');
        Roo.log(v);
        if(this.fireEvent('beforeselect', this, v) !== false){
            var d = new Date(this.parseDate(v) ).clearTime();
        
            if(isNaN(d.getTime())){
                this.date = this.viewDate = '';
                Roo.bootstrap.form.DateField.superclass.setValue.call(this, '');
                return;
            }

            this.value = this.hiddenField.value = d.dateFormat('Y-m-d');

            v = this.translateDate(d);
            if(this.rendered){
                this.inputEl().dom.value = (v === null || v === undefined ? '' : v);
                this.validate();
            }

            this.date = new Date(d.getTime() - d.getTimezoneOffset()*60000);

            this.update();

            this.fireEvent('select', this, this.date);
        }
    },
    
    getValue: function()
    {
        return this.hiddenField.value;
    },

    getRawValue : function(){
        return this.getValue();
    },
    
    fireKey: function(e)
    {
        if (!this.picker().isVisible()){
            if (e.keyCode == 27) { // allow escape to hide and re-show picker
                this.showPopup();
            }
            return;
        }
        
        var dateChanged = false,
        dir, day, month,
        newDate, newViewDate;
        
        switch(e.keyCode){
            case 27: // escape
                this.hidePopup();
                e.preventDefault();
                break;
            case 37: // left
            case 39: // right
                if (!this.keyboardNavigation) {
                    break;
                }
                dir = e.keyCode == 37 ? -1 : 1;
                
                if (e.ctrlKey){
                    newDate = this.moveYear(this.date, dir);
                    newViewDate = this.moveYear(this.viewDate, dir);
                } else if (e.shiftKey){
                    newDate = this.moveMonth(this.date, dir);
                    newViewDate = this.moveMonth(this.viewDate, dir);
                } else {
                    newDate = new Date(this.date);
                    newDate.setUTCDate(this.date.getUTCDate() + dir);
                    newViewDate = new Date(this.viewDate);
                    newViewDate.setUTCDate(this.viewDate.getUTCDate() + dir);
                }
                if (this.dateWithinRange(newDate)){
                    this.date = newDate;
                    this.viewDate = newViewDate;
                    this.setValue(this.date);
//                    this.update();
                    e.preventDefault();
                    dateChanged = true;
                }
                break;
            case 38: // up
            case 40: // down
                if (!this.keyboardNavigation) {
                    break;
                }
                dir = e.keyCode == 38 ? -1 : 1;
                if (e.ctrlKey){
                    newDate = this.moveYear(this.date, dir);
                    newViewDate = this.moveYear(this.viewDate, dir);
                } else if (e.shiftKey){
                    newDate = this.moveMonth(this.date, dir);
                    newViewDate = this.moveMonth(this.viewDate, dir);
                } else {
                    newDate = new Date(this.date);
                    newDate.setUTCDate(this.date.getUTCDate() + dir * 7);
                    newViewDate = new Date(this.viewDate);
                    newViewDate.setUTCDate(this.viewDate.getUTCDate() + dir * 7);
                }
                if (this.dateWithinRange(newDate)){
                    this.date = newDate;
                    this.viewDate = newViewDate;
                    this.setValue(this.date);
//                    this.update();
                    e.preventDefault();
                    dateChanged = true;
                }
                break;
            case 13: // enter
                this.setValue(this.date);
                this.hidePopup();
                e.preventDefault();
                break;
            case 9: // tab
                this.setValue(this.date);
                this.hidePopup();
                break;
            case 16: // shift
            case 17: // ctrl
            case 18: // alt
                break;
            default :
                this.hidePopup();
                
        }
    },
    
    
    onClick: function(e) 
    {
        e.stopPropagation();
        e.preventDefault();
        
        var target = e.getTarget();
        
        if(target.nodeName.toLowerCase() === 'i'){
            target = Roo.get(target).dom.parentNode;
        }
        
        var nodeName = target.nodeName;
        var className = target.className;
        var html = target.innerHTML;
        //Roo.log(nodeName);
        
        switch(nodeName.toLowerCase()) {
            case 'th':
                switch(className) {
                    case 'switch':
                        this.showMode(1);
                        break;
                    case 'prev':
                    case 'next':
                        var dir = Roo.bootstrap.form.DateField.modes[this.viewMode].navStep * (className == 'prev' ? -1 : 1);
                        switch(this.viewMode){
                                case 0:
                                        this.viewDate = this.moveMonth(this.viewDate, dir);
                                        break;
                                case 1:
                                case 2:
                                        this.viewDate = this.moveYear(this.viewDate, dir);
                                        break;
                        }
                        this.fill();
                        break;
                    case 'today':
                        var date = new Date();
                        this.date = this.UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
//                        this.fill()
                        this.setValue(this.date);
                        
                        this.hidePopup();
                        break;
                }
                break;
            case 'span':
                if (className.indexOf('disabled') < 0) {
                if (!this.viewDate) {
                    this.viewDate = new Date();
                }
                this.viewDate.setUTCDate(1);
                    if (className.indexOf('month') > -1) {
                        this.viewDate.setUTCMonth(Roo.bootstrap.form.DateField.dates[this.language].monthsShort.indexOf(html));
                    } else {
                        var year = parseInt(html, 10) || 0;
                        this.viewDate.setUTCFullYear(year);
                        
                    }
                    
                    if(this.singleMode){
                        this.setValue(this.viewDate);
                        this.hidePopup();
                        return;
                    }
                    
                    this.showMode(-1);
                    this.fill();
                }
                break;
                
            case 'td':
                //Roo.log(className);
                if (className.indexOf('day') > -1 && className.indexOf('disabled') < 0 ){
                    var day = parseInt(html, 10) || 1;
                    var year =  (this.viewDate || new Date()).getUTCFullYear(),
                        month = (this.viewDate || new Date()).getUTCMonth();

                    if (className.indexOf('old') > -1) {
                        if(month === 0 ){
                            month = 11;
                            year -= 1;
                        }else{
                            month -= 1;
                        }
                    } else if (className.indexOf('new') > -1) {
                        if (month == 11) {
                            month = 0;
                            year += 1;
                        } else {
                            month += 1;
                        }
                    }
                    //Roo.log([year,month,day]);
                    this.date = this.UTCDate(year, month, day,0,0,0,0);
                    this.viewDate = this.UTCDate(year, month, Math.min(28, day),0,0,0,0);
//                    this.fill();
                    //Roo.log(this.formatDate(this.date));
                    this.setValue(this.date);
                    this.hidePopup();
                }
                break;
        }
    },
    
    setStartDate: function(startDate)
    {
        this.startDate = startDate || -Infinity;
        if (this.startDate !== -Infinity) {
            this.startDate = this.parseDate(this.startDate);
        }
        this.update();
        this.updateNavArrows();
    },

    setEndDate: function(endDate)
    {
        this.endDate = endDate || Infinity;
        if (this.endDate !== Infinity) {
            this.endDate = this.parseDate(this.endDate);
        }
        this.update();
        this.updateNavArrows();
    },
    
    setDaysOfWeekDisabled: function(daysOfWeekDisabled)
    {
        this.daysOfWeekDisabled = daysOfWeekDisabled || [];
        if (typeof(this.daysOfWeekDisabled) !== 'object') {
            this.daysOfWeekDisabled = this.daysOfWeekDisabled.split(/,\s*/);
        }
        this.daysOfWeekDisabled = this.daysOfWeekDisabled.map(function (d) {
            return parseInt(d, 10);
        });
        this.update();
        this.updateNavArrows();
    },
    
    updateNavArrows: function() 
    {
        if(this.singleMode){
            return;
        }
        
        var d = new Date(this.viewDate),
        year = d.getUTCFullYear(),
        month = d.getUTCMonth();
        
        Roo.each(this.picker().select('.prev', true).elements, function(v){
            v.show();
            switch (this.viewMode) {
                case 0:

                    if (this.startDate !== -Infinity && year <= this.startDate.getUTCFullYear() && month <= this.startDate.getUTCMonth()) {
                        v.hide();
                    }
                    break;
                case 1:
                case 2:
                    if (this.startDate !== -Infinity && year <= this.startDate.getUTCFullYear()) {
                        v.hide();
                    }
                    break;
            }
        });
        
        Roo.each(this.picker().select('.next', true).elements, function(v){
            v.show();
            switch (this.viewMode) {
                case 0:

                    if (this.endDate !== Infinity && year >= this.endDate.getUTCFullYear() && month >= this.endDate.getUTCMonth()) {
                        v.hide();
                    }
                    break;
                case 1:
                case 2:
                    if (this.endDate !== Infinity && year >= this.endDate.getUTCFullYear()) {
                        v.hide();
                    }
                    break;
            }
        })
    },
    
    moveMonth: function(date, dir)
    {
        if (!dir) {
            return date;
        }
        var new_date = new Date(date.valueOf()),
        day = new_date.getUTCDate(),
        month = new_date.getUTCMonth(),
        mag = Math.abs(dir),
        new_month, test;
        dir = dir > 0 ? 1 : -1;
        if (mag == 1){
            test = dir == -1
            // If going back one month, make sure month is not current month
            // (eg, Mar 31 -> Feb 31 == Feb 28, not Mar 02)
            ? function(){
                return new_date.getUTCMonth() == month;
            }
            // If going forward one month, make sure month is as expected
            // (eg, Jan 31 -> Feb 31 == Feb 28, not Mar 02)
            : function(){
                return new_date.getUTCMonth() != new_month;
            };
            new_month = month + dir;
            new_date.setUTCMonth(new_month);
            // Dec -> Jan (12) or Jan -> Dec (-1) -- limit expected date to 0-11
            if (new_month < 0 || new_month > 11) {
                new_month = (new_month + 12) % 12;
            }
        } else {
            // For magnitudes >1, move one month at a time...
            for (var i=0; i<mag; i++) {
                // ...which might decrease the day (eg, Jan 31 to Feb 28, etc)...
                new_date = this.moveMonth(new_date, dir);
            }
            // ...then reset the day, keeping it in the new month
            new_month = new_date.getUTCMonth();
            new_date.setUTCDate(day);
            test = function(){
                return new_month != new_date.getUTCMonth();
            };
        }
        // Common date-resetting loop -- if date is beyond end of month, make it
        // end of month
        while (test()){
            new_date.setUTCDate(--day);
            new_date.setUTCMonth(new_month);
        }
        return new_date;
    },

    moveYear: function(date, dir)
    {
        return this.moveMonth(date, dir*12);
    },

    dateWithinRange: function(date)
    {
        return date >= this.startDate && date <= this.endDate;
    },

    
    remove: function() 
    {
        this.picker().remove();
    },
    
    validateValue : function(value)
    {
        if(this.getVisibilityEl().hasClass('hidden')){
            return true;
        }
        
        if(value.length < 1)  {
            if(this.allowBlank){
                return true;
            }
            return false;
        }
        
        if(value.length < this.minLength){
            return false;
        }
        if(value.length > this.maxLength){
            return false;
        }
        if(this.vtype){
            var vt = Roo.form.VTypes;
            if(!vt[this.vtype](value, this)){
                return false;
            }
        }
        if(typeof this.validator == "function"){
            var msg = this.validator(value);
            if(msg !== true){
                return false;
            }
        }
        
        if(this.regex && !this.regex.test(value)){
            return false;
        }
        
        if(typeof(this.parseDate(value)) == 'undefined'){
            return false;
        }
        
        if (this.endDate !== Infinity && this.parseDate(value).getTime() > this.endDate.getTime()) {
            return false;
        }      
        
        if (this.startDate !== -Infinity && this.parseDate(value).getTime() < this.startDate.getTime()) {
            return false;
        } 
        
        
        return true;
    },
    
    reset : function()
    {
        this.date = this.viewDate = '';
        
        Roo.bootstrap.form.DateField.superclass.setValue.call(this, '');
    }
   
});

Roo.apply(Roo.bootstrap.form.DateField,  {
    
    head : {
        tag: 'thead',
        cn: [
        {
            tag: 'tr',
            cn: [
            {
                tag: 'th',
                cls: 'prev',
                html: '<i class="fa fa-arrow-left"/>'
            },
            {
                tag: 'th',
                cls: 'switch',
                colspan: '5'
            },
            {
                tag: 'th',
                cls: 'next',
                html: '<i class="fa fa-arrow-right"/>'
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

Roo.apply(Roo.bootstrap.form.DateField,  {
  
    template : {
        tag: 'div',
        cls: 'datepicker dropdown-menu roo-dynamic shadow',
        cn: [
        {
            tag: 'div',
            cls: 'datepicker-days',
            cn: [
            {
                tag: 'table',
                cls: 'table-condensed',
                cn:[
                Roo.bootstrap.form.DateField.head,
                {
                    tag: 'tbody'
                },
                Roo.bootstrap.form.DateField.footer
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
                Roo.bootstrap.form.DateField.head,
                Roo.bootstrap.form.DateField.content,
                Roo.bootstrap.form.DateField.footer
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
                Roo.bootstrap.form.DateField.head,
                Roo.bootstrap.form.DateField.content,
                Roo.bootstrap.form.DateField.footer
                ]
            }
            ]
        }
        ]
    }
});

 

 