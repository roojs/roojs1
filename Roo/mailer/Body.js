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

Roo.mailer = Roo.mailer || {};

Roo.mailer.Body  = function(config){
    Roo.mailer.Body.superclass.constructor.call(this, config);
    //this.el = Roo.get(document.body);
    
    Roo.get(document.body).attr({
        leftmargin : 0,
        marginwidth : 0,
        topmargin : 0,
        marginheight : 0,
        offset : 0
    });
    this.onRender(document.body);

};

Roo.extend(Roo.mailer.Body, Roo.bootstrap.Component,  {
    
    
    cls: '',
     
    
    getAutoCreate : function(){
        
        var cfg ={
            tag : 'center',
            cn : [
                {
                    tag: 'table',
                    border : 0,
                    cellpadding : 0,
                    cellspacing : 0,
                    height : '100%',
                    align : 'center',
                    cls: 'roo-m-body-table ' + this.cls,
                    
                    cn : [
                        {
                            tag : 'tr',
                            cn : [
                                {
                                    tag : 'td',
                                    align : 'center',
                                    valight : 'top',
                                    cls : 'roo-m-body-cell'
                                }
                            ]
                        }
                    ]
                }
            ]
        };
         
	
        return cfg;
    },
    getChildContainer : function()
    {
        // add a child...
         
        return this.el.select('.roo-m-body-cell').first();
    }
    
    
    
    
   
});

 

 