/*
 * - LGPL
 *
 * element
 * 
 */

/**
 * @class Roo.bootstrap.MessageBar
 * @extends Roo.bootstrap.Component
 * Bootstrap MessageBar class
 * @cfg {String} html contents of the MessageBar
 * @cfg {String} weight (info | success | warning | danger) default info
 * 
 * @constructor
 * Create a new Element
 * @param {Object} config The config object
 */

Roo.bootstrap.MessageBar = function(config){
    Roo.bootstrap.MessageBar.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.MessageBar, Roo.bootstrap.Component,  {
    
    html: '',
    weight: 'info',
     
    
    getAutoCreate : function(){
        
        var cfg = {
            tag: 'div',
            cls: 'alert alert-dismissable alert-messages alert-' + this.weight,
            html: this.html || ''
        }
        
        return cfg;
    }
   
});

 

 