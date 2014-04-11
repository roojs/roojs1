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
      
//    template : function()
//    {
//        return new Roo.bootstrap.Element (this.dateFieldTemplate()); 
//    },
    
    onRender: function(ct, position)
    {
        Roo.bootstrap.DateField.superclass.onRender.call(this, ct, position);
        
        this.el.createChild(Roo.bootstrap.DateField.template);
        this.fillDow();
        this.fillMonths();
        this.update();
//        Roo.log(this.template().render(ct).el);
//        this.picker = this.template().render(ct).el.appendTo(this.el);
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
    },
    
    hide : function()
    {
        this.picker().hide();
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
    }
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

 

 