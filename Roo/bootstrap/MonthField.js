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
         * @param {String} oldvalue The old value
         * @param {String} newvalue The new value
         */
        select : true
    });
};

Roo.extend(Roo.bootstrap.MonthField, Roo.bootstrap.Input,  {
    
    onRender: function(ct, position)
    {
        
        Roo.bootstrap.MonthField.superclass.onRender.call(this, ct, position);
        
        this.language = this.language || 'en';
        this.language = this.language in Roo.bootstrap.MonthField.dates ? this.language : this.language.split('-')[0];
        this.language = this.language in Roo.bootstrap.MonthField.dates ? this.language : "en";
        
        this.isRTL = Roo.bootstrap.MonthField.dates[this.language].rtl || false;
        this.isInline = false;
        this.isInput = true;
        this.component = this.el.select('.add-on', true).first() || false;
        this.component = (this.component && this.component.length === 0) ? false : this.component;
        this.hasInput = this.component && this.inputEL().length;
        
        this.pickerEl = Roo.get(document.body).createChild(Roo.bootstrap.MonthField.template);
        
        this.picker().setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        this.picker().on('mousedown', this.onMousedown, this);
        this.picker().on('click', this.onClick, this);
        
        this.picker().addClass('datepicker-dropdown');
        
        Roo.each(this.picker().select('tbody > tr > td', true).elements, function(v){
            v.setStyle('width', '189px');
        });
        
        this.fillMonths();
        
        this.update();
        
        if(this.isInline) {
            this.show();
        }
        
    },
    
    setValue: function(v, suppressEvent)
    {   
        var o = this.getValue();
        
        Roo.bootstrap.MonthField.superclass.setValue.call(this, v);
        
        this.update();

        if(suppressEvent !== true){
            this.fireEvent('select', this, o, v);
        }
        
    },
    
    getValue: function()
    {
        return this.value;
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
        
        this.vIndex = Roo.bootstrap.MonthField.dates[this.language].monthsShort.indexOf(html);
        
        this.setValue(Roo.bootstrap.MonthField.dates[this.language].months[this.vIndex]);
        
        this.hide();
                        
    },
    
    picker : function()
    {
        return this.pickerEl;
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
                html: Roo.bootstrap.MonthField.dates[this.language].monthsShort[i++]
            };
            
            months.createChild(month);
        }
        
    },
    
    update: function()
    {
        var _this = this;
        
        if(typeof(this.vIndex) == 'undefined' && this.value.length){
            this.vIndex = Roo.bootstrap.MonthField.dates[this.language].months.indexOf(this.value);
        }
        
        Roo.each(this.pickerEl.select('> .datepicker-months tbody > tr > td > span', true).elements, function(e, k){
            e.removeClass('active');
            
            if(typeof(_this.vIndex) != 'undefined' && k == _this.vIndex){
                e.addClass('active');
            }
        })
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
    
    onFocus : function()
    {
        Roo.bootstrap.MonthField.superclass.onFocus.call(this);
        this.show();
    },
    
    onBlur : function()
    {
        Roo.bootstrap.MonthField.superclass.onBlur.call(this);
        
        var d = this.inputEl().getValue();
        
        this.setValue(d);
                
        this.hide();
    },
    
    show : function()
    {
        this.picker().show();
        this.picker().select('>.datepicker-months', true).first().show();
        this.update();
        this.place();
        
        this.fireEvent('show', this, this.date);
    },
    
    hide : function()
    {
        if(this.isInline) {
            return;
        }
        this.picker().hide();
        this.fireEvent('hide', this, this.date);
        
    },
    
    onMousedown: function(e)
    {
        e.stopPropagation();
        e.preventDefault();
    },
    
    keyup: function(e)
    {
        Roo.bootstrap.MonthField.superclass.keyup.call(this);
        this.update();
    },

    fireKey: function(e)
    {
        if (!this.picker().isVisible()){
            if (e.keyCode == 27) // allow escape to hide and re-show picker
                this.show();
            return;
        }
        
        var dir;
        
        switch(e.keyCode){
            case 27: // escape
                this.hide();
                e.preventDefault();
                break;
            case 37: // left
            case 39: // right
                dir = e.keyCode == 37 ? -1 : 1;
                
                this.vIndex = this.vIndex + dir;
                
                if(this.vIndex < 0){
                    this.vIndex = 0;
                }
                
                if(this.vIndex > 11){
                    this.vIndex = 11;
                }
                
                if(isNaN(this.vIndex)){
                    this.vIndex = 0;
                }
                
                this.setValue(Roo.bootstrap.MonthField.dates[this.language].months[this.vIndex]);
                
                break;
            case 38: // up
            case 40: // down
                
                dir = e.keyCode == 38 ? -1 : 1;
                
                this.vIndex = this.vIndex + dir * 4;
                
                if(this.vIndex < 0){
                    this.vIndex = 0;
                }
                
                if(this.vIndex > 11){
                    this.vIndex = 11;
                }
                
                if(isNaN(this.vIndex)){
                    this.vIndex = 0;
                }
                
                this.setValue(Roo.bootstrap.MonthField.dates[this.language].months[this.vIndex]);
                break;
                
            case 13: // enter
                
                if(typeof(this.vIndex) != 'undefined' && !isNaN(this.vIndex)){
                    this.setValue(Roo.bootstrap.MonthField.dates[this.language].months[this.vIndex]);
                }
                
                this.hide();
                e.preventDefault();
                break;
            case 9: // tab
                if(typeof(this.vIndex) != 'undefined' && !isNaN(this.vIndex)){
                    this.setValue(Roo.bootstrap.MonthField.dates[this.language].months[this.vIndex]);
                }
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
    
    remove: function() 
    {
        this.picker().remove();
    }
   
});

Roo.apply(Roo.bootstrap.MonthField,  {
    
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
        en: {
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        }
    }
});

Roo.apply(Roo.bootstrap.MonthField,  {
  
    template : {
        tag: 'div',
        cls: 'datepicker dropdown-menu roo-dynamic',
        cn: [
            {
                tag: 'div',
                cls: 'datepicker-months',
                cn: [
                {
                    tag: 'table',
                    cls: 'table-condensed',
                    cn:[
                        Roo.bootstrap.DateField.content
                    ]
                }
                ]
            }
        ]
    }
});

 

 
 