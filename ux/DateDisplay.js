

 
           
Roo.form.DateDisplay = function(config){
    
    
    Roo.form.DateDisplay.superclass.constructor.call(this, config);
    this.picker = new Roo.DatePicker( config );
    
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

Roo.extend(Roo.form.DateDisplay , Roo.form.DateField ,  {
    
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
        this.fireEvent('select', this);
        
        
     
    }
    
});