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
         * @param {Roo.bootstrap.DateField} this
         * @param {Mixed} date The date value
         */
        show : true,
        /**
         * @event show
         * Fires when this field hide.
         * @param {Roo.bootstrap.DateField} this
         * @param {Mixed} date The date value
         */
        hide : true,
        /**
         * @event select
         * Fires when select a date.
         * @param {Roo.bootstrap.DateField} this
         * @param {Mixed} date The date value
         */
        select : true
    });
};

Roo.extend(Roo.bootstrap.MonthField, Roo.bootstrap.Input,  {
    
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
                        
    }
});

 

 