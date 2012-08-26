

 
           
Roo.form.DateDisplay = function(config){
    
    
    Roo.form.DateDisplay.superclass.constructor.call(this, config);
    this.picker = new Roo.DatePicker({
        
        
    });
    
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
        
    }
     
    
});