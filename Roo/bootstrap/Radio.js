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
        this.setChecked(true);
    },
    
    setChecked : function(state, suppressEvent)
    {
        Roo.each(this.parent().items, function(i){
            i.checked = false;
            i.el.removeClass('checked');
        });
        
        if(state){
            this.checked = true;
            this.el.addClass('checked');
        }
        
        if(suppressEvent !== true){
            this.fireEvent('check', this, state);
        }
        
        this.parent().validate();
    }
    
});
 

 