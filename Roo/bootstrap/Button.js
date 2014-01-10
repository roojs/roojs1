/*
 * - LGPL
 *
 * row
 * 
 */

/**
 * @class Roo.bootstrap.Button
 * @extends Roo.bootstrap.Component
 * Bootstrap Button class
 * @cfg {String} html The button content
 * @cfg {String} weight default (or empty) | primary | success | info | warning
 *
 *
 * 
 * @constructor
 * Create a new button
 * @param {Object} config The config object
 */


Roo.bootstrap.Button = function(config){
    Roo.bootstrap.Button.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Button, Roo.bootstrap.Component,  {
    
    html: false,
    active: false,
    weight: 'default',
    size: '',
    tag: 'button',
    href: '',
    disabled: false,
    
    autoCreate : {
        cls: 'btn',
        tag : 'button',
        html: 'hello'
    },
    
    getAutoCreate : function(){
        
        var cfg = Roo.apply({}, Roo.bootstrap.Button.superclass.getAutoCreate.call(this));
        
        cfg.html = this.html || cfg.html;
        
        if (['default', 'primary', 'success', 'info', 'warning', 'danger', 'link'].indexOf(this.weight) < 0) {
            Roo.log("Invalid value for weight: " + this.weight + ". must be default, primary, success, info or warning.");
            this.tag = 'button';
        } else {
            cfg.cls += ' btn-' + this.weight;
        }
        
        if (this.active) {
            cfg.cls += ' active';
        }
        
        cfg.cls += this.size.length ? (' btn-' + this.size) : '';
        
        if (['a', 'button', 'input', 'submit'].indexOf(this.tag) < 0) {
            Roo.log("Invalid value for tag: " + this.tag + ". must be a, button, input or submit.");
            this.tag = 'button';
        } else {
            cfg.tag = this.tag;
        }
        
        if (this.tag !== 'a' && this.href !== '') {
            Roo.log("Tag must be a to set href.");
        } else {
            cfg.href = this.href;
        }
        
        if (this.disabled) {
            cfg.disabled='disabled';
        }
        
        return cfg;
    }
   
});

 