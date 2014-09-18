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
 * @class Roo.mailer.Column 
 * @extends Roo.bootstrap.Component
 * Bootstrap Element class
 * @cfg {String} cls class of the element
 * @cfg {String} html content of body
 * @cfg {String} src image url
 * @cfg {String} column  (left|right)
 * @cfg {String width (100%|200|340)
 * 
 * @constructor
 * Create a new Element
 * @param {Object} config The config object
 */

Roo.mailer.Column = function(config){
    Roo.mailer.Column.superclass.constructor.call(this, config);
};

Roo.extend(Roo.mailer.Column, Roo.bootstrap.Component,  {
    
    
    cls: '',
    html : '',
    src : '',
    column : 'left',
    width : '100%',
     
    getAutoCreate : function(){
                                            
        var tr = {
            tag : 'tr',
            cn : [ ]
        }
         
       
        
        var cfg =   { 
            tag: 'table',
            border : 0,
            cellpadding :20,
            cellspacing : 0,
            width : '100%',
            cn :  []
            
        };
        if (this.src != '') {
           cfg.cn.push({
                tag  : 'tr',
                cn : [
                    {
                        tag : 'td',
                        align : 'center',
                        valight : 'top',
                        cls : 'roo-m-column-'+ this.column + '-content',
                        cn : [
                            {
                                tag : 'img',
                                src : this.src,
                                cls : 'roo-m-column-image',
                                style : 'max-width: 260px;'
                            }
                        ]
                    }
                ]
            });
           
        }
        cfg.cn.push({
             tag  : 'tr',
             cn : [
                 {
                     tag : 'td',
                     align : 'center',
                     valight : 'top',
                     cls : 'roo-m-column-'+ this.column + '-content roo-m-column-body',
                     html : this.html
                 }
             ]
         });
           
	
        return cfg;
    },
    getChildContainer : function()
    {
        // add a child...
        
        return this.el.select('.roo-m-column-body',true).first();
    }
    
    
    
    
   
});

 

 