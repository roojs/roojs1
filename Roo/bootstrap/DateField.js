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
    
    viewMode : 0,
    
    minViewMode : 0,
      
//    template : function()
//    {
//        return new Roo.bootstrap.Element (this.dateFieldTemplate()); 
//    },
    
    onRender: function(ct, position)
    {
        Roo.bootstrap.DateField.superclass.onRender.call(this, ct, position);
        
//        this.el.select('.input-group', true).first().createChild(Roo.bootstrap.DateField.template);
        this.picker().setVisibilityMode(Roo.Element.DISPLAY);
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
        
        this.picker().select('.datepicker-days thead', true).first().createChild(dow);
    },
    
    fillMonths: function()
    {   
        var html = '';
        var i = 0
        var months = this.picker().select('.datepicker-months td', true).first();
        
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
                currentDate = this.date.valueOf();
                
        
        this.picker().select('.datepicker-days th.switch', true).first().dom.innerHTML = Roo.bootstrap.DateField.dates.months[month]+' '+year;
        
        var prevMonth = new Date(year, month-1, 28,0,0,0,0),
                day = prevMonth.getDaysInMonth();
                
        prevMonth.setDate(day);
        prevMonth.setDate(day - (prevMonth.getDay() - this.weekStart + 7)%7);
        
        var nextMonth = new Date(prevMonth);
        
        nextMonth.setDate(nextMonth.getDate() + 42);
        
        nextMonth = nextMonth.valueOf();
        
        var html = [];
        var clsName = '',
                prevY,
                prevM;
        
        while(prevMonth.valueOf() < nextMonth) {
                if (prevMonth.getDay() === this.weekStart) {
                        html.push('<tr>');
                }
//                clsName = this.onRender(prevMonth);
                prevY = prevMonth.getFullYear();
                prevM = prevMonth.getMonth();
                if ((prevM < month &&  prevY === year) ||  prevY < year) {
                        clsName += ' old';
                } else if ((prevM > month && prevY === year) || prevY > year) {
                        clsName += ' new';
                }
                if (prevMonth.valueOf() === currentDate) {
                        clsName += ' active';
                }
                html.push('<td class="day '+clsName+'">'+prevMonth.getDate() + '</td>');
                if (prevMonth.getDay() === this.weekEnd) {
                        html.push('</tr>');
                }
                prevMonth.setDate(prevMonth.getDate()+1);
        }
        this.picker().select('.datepicker-days tbody',true).first().innerHTML = '';
        this.picker().select('.datepicker-days tbody',true).first().createChild(html.join(''));
//        
//        var currentYear = this.date.getFullYear();
////
//        var months = this.picker().select('.datepicker-months',true).first().select('th',true).first().dom.innerHTML = year;
////                                .find('th:eq(1)')
////                                        .text(year)
////                                        .end()
////                                .find('span').removeClass('active');
//        if (currentYear === year) {
//                months.eq(this.date.getMonth()).addClass('active');
//        }
//
//        html = '';
//        year = parseInt(year/10, 10) * 10;
//        var yearCont = this.picker().select('.datepicker-years', true).first().select('th', true).first().dom.innerHTML = year + '-' + (year + 9);
////                                                .find('th:eq(1)')
////                                                        .text(year + '-' + (year + 9))
////                                                        .end()
////                                                .find('td');
//        year -= 1;
//        for (var i = -1; i < 11; i++) {
//                html += '<span class="year'+(i === -1 || i === 10 ? ' old' : '')+(currentYear === year ? ' active' : '')+'">'+year+'</span>';
//                year += 1;
//        }
//        yearCont.select('td', true).first().dom.innerHTML = html;
    },
    
    showMode: function(dir) {
        if (dir) {
                this.viewMode = Math.max(this.minViewMode, Math.min(2, this.viewMode + dir));
        }
        Roo.each(this.picker().select('>div',true).elements, function(v){
//            Roo.log(v.hide);
            v.setVisibilityMode(Roo.Element.DISPLAY);
            v.hide();
        });
        this.picker().select('.datepicker-'+Roo.bootstrap.DateField.modes[this.viewMode].clsName, true).first().show();
    },
    
    place: function()
    {
        Roo.log(this.el);
        var input = this.el.select('input', true).first();
        Roo.log(input);
        this.picker().setTop(input.getHeight()).setLeft(input.getLeft() - this.el.getLeft());
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
                        html: '&lsaquo;'
                    },
                    {
                        tag: 'th',
                        cls: 'switch',
                        colspan: '5'
                    },
                    {
                        tag: 'th',
                        cls: 'next',
                        html: '&rsaquo;'
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
    
    dates:{
            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
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
                            }
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
                            Roo.bootstrap.DateField.content
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
                            Roo.bootstrap.DateField.content
                        ]
                    }
                ]
            }
        ]
    }
});

 

 