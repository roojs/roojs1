/*
 * - LGPL
 *
 * MonthField
 * 
 */

/**
 * @class Roo.bootstrap.MonthField
 * @extends Roo.bootstrap.DateField
 * Bootstrap MonthField class
 * 
 * @constructor
 * Create a new MonthField
 * @param {Object} config The config object
 */

Roo.bootstrap.MonthField = function(config){
    Roo.bootstrap.MonthField.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.MonthField, Roo.bootstrap.DateField,  {
    
    singleMode : true,
    
    onRender: function(ct, position)
    {
        
        Roo.bootstrap.MonthField.superclass.onRender.call(this, ct, position);
        
        this.language = this.language || 'en';
        this.language = this.language in Roo.bootstrap.DateField.dates ? this.language : this.language.split('-')[0];
        this.language = this.language in Roo.bootstrap.DateField.dates ? this.language : "en";
        
        this.isRTL = Roo.bootstrap.DateField.dates[this.language].rtl || false;
        this.format = this.format || 'm/d/y';
        this.isInline = false;
        this.isInput = true;
        this.component = this.el.select('.add-on', true).first() || false;
        this.component = (this.component && this.component.length === 0) ? false : this.component;
        this.hasInput = this.component && this.inputEL().length;
        
        this.minViewMode = 1;
        this.viewMode = 1;
                
        this.pickerEl = Roo.get(document.body).createChild(Roo.bootstrap.DateField.template);
        
        this.picker().setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        this.picker().on('mousedown', this.onMousedown, this);
        this.picker().on('click', this.onClick, this);
        
        this.picker().addClass('datepicker-dropdown');
        
        this.startViewMode = this.viewMode;
        
        Roo.each(this.picker().select('thead > tr > th', true).elements, function(v){
            v.setVisibilityMode(Roo.Element.DISPLAY)
            v.hide();
        })

        Roo.each(this.picker().select('tbody > tr > td', true).elements, function(v){
            v.setStyle('width', '189px');
        });
        
        Roo.each(this.picker().select('tfoot th.today', true).elements, function(v){
            if(!this.calendarWeeks){
                v.remove();
                return;
            };
            
            v.dom.innerHTML = Roo.bootstrap.DateField.dates[this.language].today
            v.attr('colspan', function(i, val){
                return parseInt(val) + 1;
            });
        })
			
        
        this.weekEnd = this.weekStart === 0 ? 6 : this.weekStart - 1;
        
        this.setStartDate(this.startDate);
        this.setEndDate(this.endDate);
        
        this.setDaysOfWeekDisabled(this.daysOfWeekDisabled);
        
        this.fillDow();
        this.fillMonths();
        this.update();
        this.showMode();
        
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
                        var dir = Roo.bootstrap.DateField.modes[this.viewMode].navStep * (className == 'prev' ? -1 : 1);
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
                        this.setValue(this.formatDate(this.date));
                        
                        this.hide();
                        break;
                }
                break;
            case 'span':
                if (className.indexOf('disabled') < 0) {
                    this.viewDate.setUTCDate(1);
                    if (className.indexOf('month') > -1) {
                        this.viewDate.setUTCMonth(Roo.bootstrap.DateField.dates[this.language].monthsShort.indexOf(html));
                    } else {
                        var year = parseInt(html, 10) || 0;
                        this.viewDate.setUTCFullYear(year);
                        
                    }
                    
                    if(this.singleMode){
                        this.setValue(this.formatDate(this.viewDate));
                        this.hide();
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
                    var year = this.viewDate.getUTCFullYear(),
                        month = this.viewDate.getUTCMonth();

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
                    this.setValue(this.formatDate(this.date));
                    this.hide();
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

 

 