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
 * @class Roo.mailer.Block 
 * @extends Roo.bootstrap.Component
 * Bootstrap Element class
 * @cfg {String} cls class of the element
 * @cfg {String} html content of header (not used for columns)
 * @cfg {String} blocktype  (header|preheader|footer|body|olumn-container)
 * 
 * @constructor
 * Create a new Element
 * @param {Object} config The config object
 */

Roo.mailer.Block = function(config){
    Roo.mailer.Block.superclass.constructor.call(this, config);
};

Roo.extend(Roo.mailer.Block, Roo.bootstrap.Component,  {
    
    
    cls: '',
    html : '',
    blocktype :   'header',
     
    getAutoCreate : function(){
                                            
        var tr = {
            tag : 'tr',
            cls : 'roo-m-block-tr'
        }
        if (this.blocktype != 'row') {
           tr.cn = [
                {
                    tag : 'td',
                    align : 'center',
                    valight : 'top',
                    cls : 'roo-m-' + this.blocktype + '-content',
                    html : this.html
                }
           ]
        }
        
        var cfg =   {
            tag: 'table',
            border : 0,
            cellpadding : 0,
            cellspacing : 0,
            width : '100%',
            align : 'center',
            cls: 'roo-m-' + this.blocktype + ' ' + this.cls,
            
            cn : [ tr ]
            
        };
 
	
        return cfg;
    },
    getChildContainer : function()
    {
        // add a child...
        if (this.blogtype == 'column-container') {
            var par = this.select(
                        'roo-m-block-tr',true
                    ).first();
            return par.createChild( {    
                    tag:  'td',
                    align : 'center',
                    valign : 'top',
                    style : 'padding-top : 20px;',
                    cls : 'roo-m-column-container'
                }
          
            );
        }
        
        return this.el.select('.roo-m-' + this.blocktype + '-content',true).first();
    }
    
    
    
    
   
});

 

 