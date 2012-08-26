

 
           
Roo.form.DateDisplay = function(config){
    
    config.listener = config.listener  || {};
    var c = Roo.apply({}, config);
    delete c.listener;
    Roo.form.DateDisplay.superclass.constructor.call(this, config);
    
    
    
    Roo.log(c);
    
    
    this.picker = new Roo.DatePicker( c );
    
    this.addEvents({
        /**
	     * @event select
	     * Fires when a date is selected
	     * @param {DatePicker} this
	     * @param {Date} date The selected date
	     */
        'select': true,
        /**
	     * @event monthchange
	     * Fires when the displayed month changes 
	     * @param {DatePicker} this
	     * @param {Date} date The selected month
	     */
        'monthchange': true
    });

    
    this.picker.on('select', this.onSelect, this);
    
};

Roo.extend(Roo.form.DateDisplay , Roo.form.TextField ,  {
    
    inputType  : 'hidden',
    
    onRender : function(ct, position)
    {
        Roo.form.TextField.superclass.onRender.call(this, ct, position);
        
        
        this.el.dom.value = this.value ? this.formatDate(this.value, 'Y-m-d') : '';
        // prevent input submission
        
        // now render the field..  
        this.wrap = this.el.wrap();
        
        this.viewEl = this.wrap.createChild({ tag: 'div', cls: 'x-form-displayfield'});
        
        this.picker.onRender(this.viewEl, position);
        
    },
    onSelect : function(sel) {
        
        if (this.picker.value) {
            this.setValue(this.picker.value.format('Y-m-d'));
            this.fireEvent('select', this);
        }
         
    }
    
});