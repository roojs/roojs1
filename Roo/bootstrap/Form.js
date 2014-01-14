/*
 * - LGPL
 *
 * row
 * 
 */ 
Roo.bootstrap.Form = function(config){
    Roo.bootstrap.Form.superclass.constructor.call(this, config);
    this.addEvents({
        /**
         * @event clientvalidation
         * If the monitorValid config option is true, this event fires repetitively to notify of valid state
         * @param {Form} this
         * @param {Boolean} valid true if the form has passed client-side validation
         */
        clientvalidation: true,
        /**
         * @event rendered
         * Fires when the form is rendered
         * @param {Roo.form.Form} form
         */
        rendered : true
    });
};

Roo.extend(Roo.bootstrap.Form, Roo.bootstrap.Component,  {
      
    
     getAutoCreate : function(){
        
        var cfg = {
            tag: 'form',
            method : this.method || 'POST',
            id : this.id || Roo.id()
        }
        
        if (this.labelAlign == 'left' ) {
            cfg.cls += ' form-horizontal';
        }
        return cfg;
    }
    
});

 
