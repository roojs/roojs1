/*
 * - LGPL
 *
 * row
 * 
 */

/**
 * @class Roo.bootstrap.Form
 * @extends Roo.bootstrap.Component
 * Bootstrap Form class
 * @cfg {String} method  GET | POST (default POST)
 * @cfg {String} labelAlign top | left (default top)
 * @cfg {String} size empty | lg | sm | xs
 * @cfg {String} tag empty | a | input | submit
 * @cfg {String} href empty or href
 * @cfg {Boolean} disabled false | true
 * @cfg {Boolean} isClose false | true
 * @cfg {String} empty | see glyphicon reference list
 * @cfg {String} badge text for badge
 * 
 * @constructor
 * Create a new button
 * @param {Object} config The config object
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
            id : this.id || Roo.id(),
            cls : ''
        }
        
        if (this.labelAlign == 'left' ) {
            cfg.cls += ' form-horizontal';
        }
        return cfg;
    }
    
});

 
