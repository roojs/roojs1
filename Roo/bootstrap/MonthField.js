/*
 * - LGPL
 *
 * MonthField
 * 
 */

/**
 * @class Roo.bootstrap.MonthField
 * @extends Roo.bootstrap.Input
 * Bootstrap MonthField class
 * 
 * @cfg {String} language default en
 * 
 * @constructor
 * Create a new MonthField
 * @param {Object} config The config object
 */

Roo.bootstrap.MonthField = function(config){
    Roo.bootstrap.MonthField.superclass.constructor.call(this, config);
    
    this.addEvents({
        /**
         * @event show
         * Fires when this field show.
         * @param {Roo.bootstrap.MonthField} this
         * @param {Mixed} date The date value
         */
        show : true,
        /**
         * @event show
         * Fires when this field hide.
         * @param {Roo.bootstrap.MonthField} this
         * @param {Mixed} date The date value
         */
        hide : true,
        /**
         * @event select
         * Fires when select a date.
         * @param {Roo.bootstrap.MonthField} this
         * @param {Mixed} date The date value
         */
        select : true
    });
};

Roo.extend(Roo.bootstrap.MonthField, Roo.bootstrap.Input,  {
    
    format : "F",
    
    onRender: function(ct, position)
    {
        
        Roo.bootstrap.MonthField.superclass.onRender.call(this, ct, position);
        
        this.language = this.language || 'en';
        this.language = this.language in Roo.bootstrap.MonthField.dates ? this.language : this.language.split('-')[0];
        this.language = this.language in Roo.bootstrap.MonthField.dates ? this.language : "en";
        
        this.isRTL = Roo.bootstrap.MonthField.dates[this.language].rtl || false;
        this.format = this.format || 'F';
        this.isInline = false;
        this.isInput = true;
        this.component = this.el.select('.add-on', true).first() || false;
        this.component = (this.component && this.component.length === 0) ? false : this.component;
        this.hasInput = this.component && this.inputEL().length;
        
        this.minViewMode = 1;
        this.viewMode = 1;
                
        this.pickerEl = Roo.get(document.body).createChild(Roo.bootstrap.MonthField.template);
        
        this.picker().setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        this.picker().on('mousedown', this.onMousedown, this);
        this.picker().on('click', this.onClick, this);
        
        this.picker().addClass('datepicker-dropdown');
        
        this.startViewMode = this.viewMode;

        Roo.each(this.picker().select('tbody > tr > td', true).elements, function(v){
            v.setStyle('width', '189px');
        });
        
        this.fillMonths();
        this.update();
        
        if(this.isInline) {
            this.show();
        }
    },
    
    setValue: function(v)
    {
        
        var d = new Date(this.parseDate(v) ).clearTime();
        
        if(isNaN(d.getTime())){
            this.date = this.viewDate = '';
            Roo.bootstrap.DateField.superclass.setValue.call(this, '');
            return;
        }
        
        v = this.formatDate(d);
        
        Roo.bootstrap.DateField.superclass.setValue.call(this, v);
        
        this.date = new Date(d.getTime() - d.getTimezoneOffset()*60000);
     
        this.update();

        this.fireEvent('select', this, this.date);
        
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
        
        if(nodeName.toLowerCase() != 'span' || className.indexOf('disabled') > -1 || className.indexOf('month') == -1){
            return;
        }
        this.viewDate.setUTCDate(1);
        this.viewDate.setUTCMonth(Roo.bootstrap.DateField.dates[this.language].monthsShort.indexOf(html));
        
        this.setValue(this.formatDate(this.viewDate));
        this.hide();
                        
    },
    
    picker : function()
    {
        return this.pickerEl;
//        return this.el.select('.datepicker', true).first();
    },
    
    fillMonths: function()
    {    
        var i = 0
        var months = this.picker().select('>.datepicker-months td', true).first();
        
        months.dom.innerHTML = '';
        
        while (i < 12) {
            var month = {
                tag: 'span',
                cls: 'month',
                html: Roo.bootstrap.DateField.dates[this.language].monthsShort[i++]
            }
            
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
        this.fillMonths();
    },
    
    place: function()
    {
        if(this.isInline) return;
        
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
        if (!v && (this.useIso || value.match(/^(\d{4})-0?(\d+)-0?(\d+)/))) {
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
    
    formatDate : function(date, fmt)
    {   
        return (!date || !(date instanceof Date)) ?
        date : date.dateFormat(fmt || this.format);
    },
    
    onFocus : function()
    {
        Roo.bootstrap.DateField.superclass.onFocus.call(this);
        this.show();
    },
    
    onBlur : function()
    {
        Roo.bootstrap.DateField.superclass.onBlur.call(this);
        
        var d = this.inputEl().getValue();
        
        this.setValue(d);
                
        this.hide();
    },
    
    show : function()
    {
        this.picker().show();
        this.update();
        this.place();
        
        this.fireEvent('show', this, this.date);
    },
    
    hide : function()
    {
        if(this.isInline) return;
        this.picker().hide();
        this.viewMode = this.startViewMode;
        this.showMode();
        
        this.fireEvent('hide', this, this.date);
        
    },
    
    onMousedown: function(e)
    {
        e.stopPropagation();
        e.preventDefault();
    },
    
    keyup: function(e)
    {
        Roo.bootstrap.DateField.superclass.keyup.call(this);
        this.update();
    },

    getValue: function()
    {
        return this.formatDate(this.date);
    },
    
    fireKey: function(e)
    {
        if (!this.picker().isVisible()){
            if (e.keyCode == 27) // allow escape to hide and re-show picker
                this.show();
            return;
        }
        
        var dateChanged = false,
        dir, day, month,
        newDate, newViewDate;
        
        switch(e.keyCode){
            case 27: // escape
                this.hide();
                e.preventDefault();
                break;
            case 37: // left
            case 39: // right
                if (!this.keyboardNavigation) break;
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
                    this.setValue(this.formatDate(this.date));
//                    this.update();
                    e.preventDefault();
                    dateChanged = true;
                }
                break;
            case 38: // up
            case 40: // down
                if (!this.keyboardNavigation) break;
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
                    this.setValue(this.formatDate(this.date));
//                    this.update();
                    e.preventDefault();
                    dateChanged = true;
                }
                break;
            case 13: // enter
                this.setValue(this.formatDate(this.date));
                this.hide();
                e.preventDefault();
                break;
            case 9: // tab
                this.setValue(this.formatDate(this.date));
                this.hide();
                break;
            case 16: // shift
            case 17: // ctrl
            case 18: // alt
                break;
            default :
                this.hide();
                
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
        if (!dir) return date;
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
            if (new_month < 0 || new_month > 11)
                new_month = (new_month + 12) % 12;
        } else {
            // For magnitudes >1, move one month at a time...
            for (var i=0; i<mag; i++)
                // ...which might decrease the day (eg, Jan 31 to Feb 28, etc)...
                new_date = this.moveMonth(new_date, dir);
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
    }
   
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

Roo.apply(Roo.bootstrap.DateField,  {
  
    template : {
        tag: 'div',
        cls: 'datepicker dropdown-menu roo-dynamic',
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

 

 
 