/*
 * - LGPL
 *
 * element
 
                              
 */
Roo.mailer = Roo.mailer || {};

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

_calls = 0;

Roo.mailer.Body  = function(config){
    Roo.mailer.Body.superclass.constructor.call(this, config);
    //this.el = Roo.get(document.body);
    var body = Roo.get(document.body);
    body.attr({
        leftmargin : 0,
        marginwidth : 0,
        topmargin : 0,
        marginheight : 0,
        offset : 0
    });
    _calls++;
    if (_calls > 1) {
        throw "test";
    }
    
    this.onRender(body);
    this.onRender = function() { };

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
    },
    addxtype :   function (tree, cntr)
    {
        return this.addxtypeChild(tree,cntr);
    }

    
    
   
});

 

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
 * @cfg {String} blocktype  (header|preheader|footer|body|row)
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
    getChildContainer : function(build_call)
    {
        // add a child...
        if (this.blocktype == 'row' && build_call) {
            var par = this.el.select(
                        '.roo-m-block-tr',true
                    ).first();
            return par.createChild( {    
                    tag:  'td',
                    align : 'center',
                    valign : 'top',
                    style : 'padding-top : 20px;',
                    cls : 'roo-m-row'
                }
          
            );
        }
        
        return this.el.select('.roo-m-' + this.blocktype + '-content',true).first();
    }
    
    
    
    
   
});

 

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
        var tr = this.el.select('tbody',true).first().createChild({
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

 

 