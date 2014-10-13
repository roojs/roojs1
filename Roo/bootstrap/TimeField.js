/*
 * - LGPL
 *
 * TimeField
 * 
 */

/**
 * @class Roo.bootstrap.TimeField
 * @extends Roo.bootstrap.Input
 * Bootstrap DateField class
 * 
 * 
 * @constructor
 * Create a new TimeField
 * @param {Object} config The config object
 */

Roo.bootstrap.TimeField = function(config){
    Roo.bootstrap.TimeField.superclass.constructor.call(this, config);
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

Roo.extend(Roo.bootstrap.TimeField, Roo.bootstrap.Input,  {
    
    /**
     * @cfg {String} format
     * The default time format string which can be overriden for localization support.  The format must be
     * valid according to {@link Date#parseDate} (defaults to 'H:i').
     */
    format : "H:i",
       
    onRender: function(ct, position)
    {
        
        Roo.bootstrap.TimeField.superclass.onRender.call(this, ct, position);
                
        this.el.select('>.input-group', true).first().createChild(Roo.bootstrap.TimeField.template);
        
        this.picker().setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        this.pop = this.picker().select('>.datepicker-time',true).first();
        this.pop.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block' 
        
        this.picker().on('mousedown', this.onMousedown, this);
        this.picker().on('click', this.onClick, this);
        
        this.picker().addClass('datepicker-dropdown');
    
        this.fillTime();
        this.update();
            
        this.pop.select('span.hours-up', true).first().on('click', this.onIncrementHours, this);
        this.pop.select('span.hours-down', true).first().on('click', this.onDecrementHours, this);
        this.pop.select('span.minutes-up', true).first().on('click', this.onIncrementMinutes, this);
        this.pop.select('span.minutes-down', true).first().on('click', this.onDecrementMinutes, this);
        this.pop.select('button.period', true).first().on('click', this.onTogglePeriod, this);
        this.pop.select('button.ok', true).first().on('click', this.setTime, this);

    },
    
    fireKey: function(e){
        if (!this.picker().isVisible()){
            if (e.keyCode == 27) // allow escape to hide and re-show picker
                this.show();
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
        return this.el.select('.datepicker', true).first();
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
                                    tag: 'span',
                                    cls: 'hours-up glyphicon glyphicon-chevron-up'
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
                                    cls: 'minutes-up glyphicon glyphicon-chevron-up'
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
                                    cls: 'hours-down glyphicon glyphicon-chevron-down'
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
                                    cls: 'minutes-down glyphicon glyphicon-chevron-down'
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
        
        this.time = (typeof(this.time) === 'undefined') ? new Date() : this.time;
        
        this.fill();
    },
    
    fill: function() 
    {
        var hours = this.time.getHours();
        var minutes = this.time.getMinutes();
        var period = 'AM';
        
        if(hours > 11){
            period = 'PM';
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
        
        Roo.log('run!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1');
        Roo.log(Roo.lib.Dom.getViewWidth());
        Roo.log(Roo.get(document.body).getScroll());
        Roo.log(this.inputEl().getLeft());
        Roo.log(this.picker().getWidth());
        Roo.log(this.el);
        Roo.log(this.el.getLeft());
        Roo.log(this.inputEl());
        Roo.log(this.inputEl().getLeft());
        if((Roo.lib.Dom.getViewHeight() + Roo.get(document.body).getScroll().top) - (this.inputEl().getBottom() + this.picker().getHeight()) < 0){ // top
            cls.pop();
            cls.push('top');
        }
        
        cls.push('right');
        
        if((Roo.lib.Dom.getViewWidth() + Roo.get(document.body).getScroll().left) - (this.inputEl().getLeft() + this.picker().getWidth()) < 0){ // left
            cls.pop();
            cls.push('left');
        }
        
        this.picker().addClass(cls.join('-'));
        
        Roo.each(cls, function(c){
            if(c == 'bottom'){
                this.picker().setTop(this.inputEl().getHeight());
                return;
            }
            if(c == 'top'){
                this.picker().setTop(0 - this.picker().getHeight());
                return;
            }
            
            if(c == 'left'){
                this.picker().setLeft(this.inputEl().getLeft() - this.el.getLeft());
                return;
            }
            if(c == 'right'){
                this.picker().setLeft(this.inputEl().getLeft() - this.el.getLeft());
                return;
            }
        });
        
//        this.picker().setTop(0 - this.picker().getHeight()).setLeft(this.inputEl().getLeft() - this.el.getLeft());
//        this.picker().setTop(this.inputEl().getHeight()).setLeft(this.inputEl().getLeft() - this.el.getLeft());
    },
  
    onFocus : function()
    {
        Roo.bootstrap.TimeField.superclass.onFocus.call(this);
        this.show();
    },
    
    onBlur : function()
    {
        Roo.bootstrap.TimeField.superclass.onBlur.call(this);
        this.hide();
    },
    
    show : function()
    {
        this.picker().show();
        this.pop.show();
        this.update();
        this.place();
        
        this.fireEvent('show', this, this.date);
    },
    
    hide : function()
    {
        this.picker().hide();
        this.pop.hide();
        
        this.fireEvent('hide', this, this.date);
    },
    
    setTime : function()
    {
        this.hide();
        this.setValue(this.time.format(this.format));
        
        this.fireEvent('select', this, this.date);
        
        
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
        this.time = this.time.add(Date.MINUTE, 1);
        this.update();
    },
    
    onDecrementMinutes: function()
    {
        Roo.log('onDecrementMinutes');
        this.time = this.time.add(Date.MINUTE, -1);
        this.update();
    },
    
    onTogglePeriod: function()
    {
        Roo.log('onTogglePeriod');
        this.time = this.time.add(Date.HOUR, 12);
        this.update();
    }
    
   
});

Roo.apply(Roo.bootstrap.TimeField,  {
    
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
                    cls: '',
                    cn: [
                        {
                            tag: 'button',
                            cls: 'btn btn-info ok',
                            html: 'OK'
                        }
                    ]
                }

                ]
            }
        ]
    }
});

Roo.apply(Roo.bootstrap.TimeField,  {
  
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
                    Roo.bootstrap.TimeField.content,
                    Roo.bootstrap.TimeField.footer
                    ]
                }
                ]
            }
        ]
    }
});

 

 