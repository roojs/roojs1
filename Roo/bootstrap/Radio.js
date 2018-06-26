/*
 * - LGPL
 *
 * RadioItem
 * 
 */

/**
 * @class Roo.bootstrap.Radio
 * @extends Roo.bootstrap.Component
 * Bootstrap Radio class
 * @cfg {String} boxLabel - the label associated
 * @cfg {String} value - the value of radio
 * 
 * @constructor
 * Create a new Radio
 * @param {Object} config The config object
 */
Roo.bootstrap.Radio = function(config){
    Roo.bootstrap.Radio.superclass.constructor.call(this, config);
    
};

Roo.extend(Roo.bootstrap.Radio, Roo.bootstrap.Component, {
    
    boxLabel : '',
    
    value : '',
    
    getAutoCreate : function()
    {
        var cfg = {
            tag : 'div',
            cls : 'form-group radio',
            cn : [
                {
                    tag : 'label',
                    cls : 'box-label',
                    html : this.boxLabel
                }
            ]
        };
        
        return cfg;
    },
    
    initEvents : function() 
    {
        this.parent().register(this);
        
        this.el.on('click', this.onClick, this);
        
    },
    
    onClick : function()
    {
        if(this.parent().fireEvent('click', this.parent(), e) !== false){
            this.setChecked(true);
        }
    },
    
    setChecked : function(state, suppressEvent)
    {
        this.parent().setValue(this.value, suppressEvent);
        
    },
    
    setBoxLabel : function(v)
    {
        this.boxLabel = v;
        
        if(this.rendered){
            this.el.select('label.box-label',true).first().dom.innerHTML = (v === null || v === undefined ? '' : v);
        }
    }
    
});
 

 