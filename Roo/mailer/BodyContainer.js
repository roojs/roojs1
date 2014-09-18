/*
 * - LGPL
 *
 * element
 * <!-- BEGIN TEMPLATE // -->
                    	<table border="0" cellpadding="0" cellspacing="0" id="templateContainer">
                        	<tr>
                            	<td align="center" valign="top">
                              
 */

/**
 * @class Roo.mailer.BodyContainer 
 * @extends Roo.bootstrap.Component
 * Bootstrap Element class
 * @cfg {String} cls class of the element
 * 
 * @constructor
 * Create a new Element
 * @param {Object} config The config object
 */

Roo.mailer.BodyContainer = function(config){
    Roo.mailer.BodyContainer.superclass.constructor.call(this, config);
};

Roo.extend(Roo.mailer.BodyContainer, Roo.bootstrap.Component,  {
    
    
    cls: '',
     
    
    getAutoCreate : function(){
        
        var cfg = {
            tag: 'table',
            border : 0,
            cellpadding : 0,
            cellspacing : 0,
            cls: 'roo-m-body-container ' + this.cls,
            cn : [
                {  tag : 'tbody' }
            ]
        };
        
        
	
        return cfg;
    },
    getChildContainer : function()
    {
        // add a child...
        var tr = this.el.select('tbody').createChild({
                    tag : 'tr',
                    cn : [
                        {   
                            tag:  'td',
                            align : 'center',
                            valign : 'top',
                            cls : 'roo-m-child-ctr'
                        }
                    ]
                });
        
        return tr.select('.roo-m-child-ctr').first();
    }
    
    
    
    
   
});

 

 