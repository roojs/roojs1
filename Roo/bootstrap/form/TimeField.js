/*
 * - LGPL
 *
 * TimeField
 * 
 */

/**
 * @class Roo.bootstrap.form.TimeField
 * @extends Roo.bootstrap.form.Input
 * Bootstrap DateField class
 * @cfg {Number} minuteStep the minutes is always the multiple of a fixed number, default 1
 * 
 * 
 * @constructor
 * Create a new TimeField
 * @param {Object} config The config object
 */

Roo.bootstrap.form.TimeField = function(config){
    Roo.bootstrap.form.TimeField.superclass.constructor.call(this, config);
    this.addEvents({
            /**
             * @event show
             * Fires when this field show.
             * @param {Roo.bootstrap.form.DateField} thisthis
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
            select : true
        });
};

Roo.extend(Roo.bootstrap.form.TimeField, Roo.bootstrap.form.Input,  {
    
    /**
     * @cfg {String} format
     * The default time format string which can be overriden for localization support.  The format must be
     * valid according to {@link Date#parseDate} (defaults to 'H:i').
     */
    format : "H:i",
    minuteStep : 1,
    language : 'en',
    hiddenField : false,
    getAutoCreate : function()
    {
        this.after = '<i class="fa far fa-clock"></i>';
        return Roo.bootstrap.form.TimeField.superclass.getAutoCreate.call(this);
        
         
    },
    onRender: function(ct, position)
    {
        
        Roo.bootstrap.form.TimeField.superclass.onRender.call(this, ct, position);

        this.language = this.language in Roo.bootstrap.form.TimeField.periodText ? this.language : "en";
                
        this.pickerEl = Roo.get(document.body).createChild(Roo.bootstrap.form.TimeField.template);
        
        this.picker().setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        this.pop = this.picker().select('>.datepicker-time',true).first();
        this.pop.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        this.picker().on('mousedown', this.onMousedown, this);
        this.picker().on('click', this.onClick, this);
        
        this.picker().addClass('datepicker-dropdown');
    
        this.fillTime();
        this.update();
            
        this.pop.select('.hours-up', true).first().on('click', this.onIncrementHours, this);
        this.pop.select('.hours-down', true).first().on('click', this.onDecrementHours, this);
        this.pop.select('.minutes-up', true).first().on('click', this.onIncrementMinutes, this);
        this.pop.select('.minutes-down', true).first().on('click', this.onDecrementMinutes, this);
        this.pop.select('button.period', true).first().on('click', this.onTogglePeriod, this);
        this.pop.select('button.ok', true).first().on('click', this.setTime, this);
        this.pop.select('button.ok', true).first().dom.innerHTML = Roo.bootstrap.form.TimeField.okText;

        this.hiddenField = this.inputEl().insertSibling(
            {tag : 'input', type : 'hidden', name : this.name},
            'before',
            true
        );
        this.inputEl().dom.setAttribute('name', this.name + '____hidden___');

    },
    
    fireKey: function(e){
        if (!this.picker().isVisible()){
            if (e.keyCode == 27) { // allow escape to hide and re-show picker
                this.show();
            }
            return;
        }

        e.preventDefault();
        
        switch(e.keyCode){
            case 27: // escape
                this.hide();
                break;
            case 37: // left
            case 39: // right
                this.onTogglePeriod();
                break;
            case 38: // up
                this.onIncrementMinutes();
                break;
            case 40: // down
                this.onDecrementMinutes();
                break;
            case 13: // enter
            case 9: // tab
                this.setTime();
                break;
        }
    },
    
    onClick: function(e) {
        e.stopPropagation();
        e.preventDefault();
    },
    
    picker : function()
    {
        return this.pickerEl;
    },
    
    fillTime: function()
    {    
        var time = this.pop.select('tbody', true).first();
        
        time.dom.innerHTML = '';
        
        time.createChild({
            tag: 'tr',
            cn: [
                {
                    tag: 'td',
                    cn: [
                        {
                            tag: 'a',
                            href: '#',
                            cls: 'btn',
                            cn: [
                                {
                                    tag: 'i',
                                    cls: 'hours-up fa fas fa-chevron-up'
                                }
                            ]
                        } 
                    ]
                },
                {
                    tag: 'td',
                    cls: 'separator'
                },
                {
                    tag: 'td',
                    cn: [
                        {
                            tag: 'a',
                            href: '#',
                            cls: 'btn',
                            cn: [
                                {
                                    tag: 'i',
                                    cls: 'minutes-up fa fas fa-chevron-up'
                                }
                            ]
                        }
                    ]
                },
                {
                    tag: 'td',
                    cls: 'separator'
                }
            ]
        });
        
        time.createChild({
            tag: 'tr',
            cn: [
                {
                    tag: 'td',
                    cn: [
                        {
                            tag: 'span',
                            cls: 'timepicker-hour',
                            html: '00'
                        }  
                    ]
                },
                {
                    tag: 'td',
                    cls: 'separator',
                    html: ':'
                },
                {
                    tag: 'td',
                    cn: [
                        {
                            tag: 'span',
                            cls: 'timepicker-minute',
                            html: '00'
                        }  
                    ]
                },
                {
                    tag: 'td',
                    cls: 'separator'
                },
                {
                    tag: 'td',
                    cn: [
                        {
                            tag: 'button',
                            type: 'button',
                            cls: 'btn btn-primary period',
                            html: 'AM'
                            
                        }
                    ]
                }
            ]
        });
        
        time.createChild({
            tag: 'tr',
            cn: [
                {
                    tag: 'td',
                    cn: [
                        {
                            tag: 'a',
                            href: '#',
                            cls: 'btn',
                            cn: [
                                {
                                    tag: 'span',
                                    cls: 'hours-down fa fas fa-chevron-down'
                                }
                            ]
                        }
                    ]
                },
                {
                    tag: 'td',
                    cls: 'separator'
                },
                {
                    tag: 'td',
                    cn: [
                        {
                            tag: 'a',
                            href: '#',
                            cls: 'btn',
                            cn: [
                                {
                                    tag: 'span',
                                    cls: 'minutes-down fa fas fa-chevron-down'
                                }
                            ]
                        }
                    ]
                },
                {
                    tag: 'td',
                    cls: 'separator'
                }
            ]
        });
        
    },
    
    update: function()
    {
        // default minute is a multiple of minuteStep
        if(typeof(this.time) === 'undefined') {
            this.time = new Date();
            this.time = this.time.add(Date.MINUTE, Math.round(parseInt(this.time.format('i')) / this.minuteStep) * this.minuteStep - parseInt(this.time.format('i')));
        }
        this.time = (typeof(this.time) === 'undefined') ? new Date() : this.time;
        
        this.fill();
    },
    
    fill: function() 
    {
        var hours = this.time.getHours();
        var minutes = this.time.getMinutes();
        var period = Roo.bootstrap.form.TimeField.periodText[this.language]['am'];
        
        if(hours > 11){
            period = Roo.bootstrap.form.TimeField.periodText[this.language]['pm'];
        }
        
        if(hours == 0){
            hours = 12;
        }
        
        
        if(hours > 12){
            hours = hours - 12;
        }
        
        if(hours < 10){
            hours = '0' + hours;
        }
        
        if(minutes < 10){
            minutes = '0' + minutes;
        }
        
        this.pop.select('.timepicker-hour', true).first().dom.innerHTML = hours;
        this.pop.select('.timepicker-minute', true).first().dom.innerHTML = minutes;
        this.pop.select('button', true).first().dom.innerHTML = period;
        
    },
    
    place: function()
    {   
        this.picker().removeClass(['bottom-left', 'bottom-right', 'top-left', 'top-right']);
        
        var cls = ['bottom'];
        
        if((Roo.lib.Dom.getViewHeight() + Roo.get(document.body).getScroll().top) - (this.inputEl().getBottom() + this.picker().getHeight()) < 0){ // top
            cls.pop();
            cls.push('top');
        }
        
        cls.push('right');
        
        if((Roo.lib.Dom.getViewWidth() + Roo.get(document.body).getScroll().left) - (this.inputEl().getLeft() + this.picker().getWidth()) < 0){ // left
            cls.pop();
            cls.push('left');
        }
        //this.picker().setXY(20000,20000);
        this.picker().addClass(cls.join('-'));
        
        var _this = this;
        
        Roo.each(cls, function(c){
            if(c == 'bottom'){
                (function() {
                 //  
                }).defer(200);
                 _this.picker().alignTo(_this.inputEl(),   "tr-br", [0, 10], false);
                //_this.picker().setTop(_this.inputEl().getHeight());
                return;
            }
            if(c == 'top'){
                 _this.picker().alignTo(_this.inputEl(),   "br-tr", [0, 10], false);
                
                //_this.picker().setTop(0 - _this.picker().getHeight());
                return;
            }
            /*
            if(c == 'left'){
                _this.picker().setLeft(_this.inputEl().getLeft() + _this.inputEl().getWidth() - _this.el.getLeft() - _this.picker().getWidth());
                return;
            }
            if(c == 'right'){
                _this.picker().setLeft(_this.inputEl().getLeft() - _this.el.getLeft());
                return;
            }
            */
        });
        
    },
  
    onFocus : function()
    {
        Roo.bootstrap.form.TimeField.superclass.onFocus.call(this);
        this.show();
    },
    
    onBlur : function()
    {
        Roo.bootstrap.form.TimeField.superclass.onBlur.call(this);
        this.hide();
    },
    
    show : function()
    {
        this.picker().show();
        this.pop.show();
        this.update();
        this.place();
        
        this.fireEvent('show', this, this.time);
    },
    
    hide : function()
    {
        this.picker().hide();
        this.pop.hide();
        
        this.fireEvent('hide', this, this.time);
    },
    
    setTime : function()
    {
        this.hide();
        this.setValue(this.time);
        
        this.fireEvent('select', this, this.time);
        
        
    },

    // return false when it fails
    parseTime : function(value)
    {
        if(!value) {
            return false;
        }
        if(value instanceof Date){
            return value;
        }
        var v = Date.parseDate(value, 'H:i:s');

        return (typeof(v) == 'undefined') ? false : v;
    },

    translateTime : function(time)
    {
        switch(this.language) {
            case 'zh_CN':
                return new Intl.DateTimeFormat('zh-CN', {
                    hour : 'numeric',
                    minute : 'numeric',
                    hour12 : true
                }).format(time);
            default :
                return time.format(this.format);
        }
    },

    setValue: function(v)
    {
        var t = this.parseTime(v);

        if(!t) {
            this.time = this.value = this.hiddenField.value =  '';
            if(this.rendered){
                this.inputEl().dom.value = '';
                this.validate();
            }
            return;
        }

        this.value = this.hiddenField.value = t.dateFormat('H:i:s');

        v = this.translateTime(t);

        if(this.rendered){
            this.inputEl().dom.value = (v === null || v === undefined ? '' : v);
            this.validate();
        }

        this.time = t;

        this.update();
    },

    setRawValue: function(v)
    {
        var t = this.parseTime(v);

        if(!t) {
            this.time = this.value = this.hiddenField.value =  '';
            if(this.rendered){
                this.inputEl().dom.value = (v === null || v === undefined ? '' : v);
            }
            return;
        }

        this.value = this.hiddenField.value = t.dateFormat('H:i:s');

        v = this.translateTime(t);

        if(this.rendered){
            this.inputEl().dom.value = (v === null || v === undefined ? '' : v);
        }

        this.time = t;

        this.update();
    },

    getValue: function()
    {
        return this.value;
    },

    getRawValue : function(){
        return this.getValue();
    },
    
    onMousedown: function(e){
        e.stopPropagation();
        e.preventDefault();
    },
    
    onIncrementHours: function()
    {
        Roo.log('onIncrementHours');
        this.time = this.time.add(Date.HOUR, 1);
        this.update();
        
    },
    
    onDecrementHours: function()
    {
        Roo.log('onDecrementHours');
        this.time = this.time.add(Date.HOUR, -1);
        this.update();
    },
    
    onIncrementMinutes: function()
    {
        Roo.log('onIncrementMinutes');
        var minutesToAdd = Math.round((parseInt(this.time.format('i')) + this.minuteStep) / this.minuteStep) * this.minuteStep - parseInt(this.time.format('i'));
        this.time = this.time.add(Date.MINUTE, minutesToAdd);
        this.update();
    },
    
    onDecrementMinutes: function()
    {
        Roo.log('onDecrementMinutes');
        var minutesToSubtract = parseInt(this.time.format('i')) - Math.round((parseInt(this.time.format('i')) - this.minuteStep) / this.minuteStep) * this.minuteStep;
        this.time = this.time.add(Date.MINUTE, -1 * minutesToSubtract);
        this.update();
    },
    
    onTogglePeriod: function()
    {
        Roo.log('onTogglePeriod');
        this.time = this.time.add(Date.HOUR, 12);
        this.update();
    }
    
   
});
Roo.apply(Roo.bootstrap.form.TimeField,  {
    okText : 'OK',
    periodText : {
        en : {
            am : 'AM',
            pm : 'PM'
        },
        zh_CN : {
            am : '上午',
            pm : '下午'
        }
    }
});

Roo.apply(Roo.bootstrap.form.TimeField,  {
    template : {
        tag: 'div',
        cls: 'datepicker dropdown-menu',
        cn: [
            {
                tag: 'div',
                cls: 'datepicker-time',
                cn: [
                {
                    tag: 'table',
                    cls: 'table-condensed',
                    cn:[
                        {
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
                        {
                            tag: 'tfoot',
                            cn: [
                                {
                                    tag: 'tr',
                                    cn: [
                                    {
                                        tag: 'th',
                                        colspan: '7',
                                        cls: '',
                                        cn: [
                                            {
                                                tag: 'button',
                                                cls: 'btn btn-info ok',
                                                html: "OK" // this is overridden on construciton
                                            }
                                        ]
                                    }
                    
                                    ]
                                }
                            ]
                        }
                    ]
                }
                ]
            }
        ]
    }
});

 

 