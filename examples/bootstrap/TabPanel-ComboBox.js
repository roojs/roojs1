

Roo.example = Roo.example || {};

Roo.example.TabPanelCombobox = new Roo.XComponent({
    part     :  ["layout","viewpanel"],
    order    : '001-viewpanel',
    region   : '',
    parent   : '#bootstrap',
    name     : "unnamed module",
    disabled : false, 
    permname : '', 
    _tree : function()
    {
        
        this.parent = {
            el : new Roo.bootstrap.Body()
        }
        this.parent.el.layout = false;
        this.parent.el.render(document.body);
        
        var _this = this;
        var MODULE = this;
        var baseURL = '/web.eventmanager/demo.local.php';
        
        return {
            xtype: 'Body',
            xns: Roo.bootstrap,
            items : [
                 {
                    xtype : 'Container',
                    cls : 'content',
                    xns : Roo.bootstrap,
                    style : 'margin-top:100px',
                    items : [
                    	{
                            xtype : 'Container',
                            cls : 'pad-wrapper',
                            xns : Roo.bootstrap,
                            items : [
                            	{
                                    xtype : 'Container',
                                    cls : 'container alpha',
                                    xns : Roo.bootstrap,
                                    items : [
                                    	{
                                            xtype : 'Container',
                                            xns : Roo.bootstrap,
                                            items : [
                                            	{
                                                    xtype : 'NavSimplebar',
                                                    xns : Roo.bootstrap,
                                                    items : [
                                                    	{
                                                            navId : '#top',
                                                            xtype : 'NavGroup',
                                                            xns : Roo.bootstrap,
                                                            type : 'pills',
                                                            listeners : {
                                                            	render : function (_self)
                                                            	   {
                                                            	        _this.navGroup = this;
                                                            	   }
                                                            },
                                                            items : [
                                                            	{
                                                                    tabId : '#one',
                                                                    xtype : 'NavItem',
                                                                    preventDefault : true,
                                                                    html : 1,
                                                                    xns : Roo.bootstrap,
                                                                    active : true,
                                                                    listeners : {
                                                                    	render : function (_self)
                                                                    	   {
                                                                    	      _this.one = this;
                                                                    	      
                                                                    	   }
                                                                    }
                                                                },
                                                            	{
                                                                    tabId : '#two',
                                                                    xtype : 'NavItem',
                                                                    preventDefault : true,
                                                                    html : 2,
                                                                    xns : Roo.bootstrap,
                                                                    active : false,
                                                                    listeners : {
                                                                    	render : function (_self)
                                                                    	   {
                                                                    	      _this.two = this;
                                                                    	      
                                                                    	   }
                                                                    }
                                                                }
                                                            ]

                                                        }
                                                    ]

                                                },
                                            	{
                                                    xtype : 'TabGroup',
                                                    style : 'margin-top:20px;',
                                                    xns : Roo.bootstrap,
                                                    navId : '#top',
                                                    carousel : true,
                                                    items : [
                                                        {
                                                            tabId : '#one',
                                                            xtype : 'TabPanel',
                                                            xns : Roo.bootstrap,
                                                            navId : '#top',
                                                            active : true,
                                                            items : [
                                                                {
                                                                    level : 4,
                                                                    xtype : 'Header',
                                                                    html : 'First TabPanel With ComboBox',
                                                                    xns : Roo.bootstrap
                                                                },
                                                                {
                                                                    xtype : 'Container',
                                                                    well : 'md',
                                                                    xns : Roo.bootstrap,
                                                                    items : [
                                                                        {
                                                                            xtype : 'Row',
                                                                            xns : Roo.bootstrap,
                                                                            items : [
                                                                                {
                                                                                    md : 12,
                                                                                    xtype : 'Column',
                                                                                    xns : Roo.bootstrap,
                                                                                    items : [
                                                                                        {
                                                                                            labelAlign : 'top',
                                                                                            fieldLabel : 'Family Name',
                                                                                            xtype : 'Input',
                                                                                            allowBlank : true,
                                                                                            xns : Roo.bootstrap,
                                                                                            name : 'lastname'
                                                                                        }
                                                                                    ]

                                                                                }
                                                                            ]

                                                                        }
                                                                    ]

                                                                }
                                                            ]

                                                        },
                                                        {
                                                            tabId : '#two',
                                                            xtype : 'TabPanel',
                                                            xns : Roo.bootstrap,
                                                            navId : '#top',
                                                            active : false,
                                                            items : [
                                                                {
                                                                    level : 4,
                                                                    xtype : 'Header',
                                                                    html : 'Second TabPanel With ComboBox',
                                                                    xns : Roo.bootstrap
                                                                },
                                                                {
                                                                    xtype : 'Container',
                                                                    well : 'md',
                                                                    xns : Roo.bootstrap,
                                                                    items : [
                                                                        {
                                                                            xtype : 'Row',
                                                                            xns : Roo.bootstrap,
                                                                            items : [
                                                                                {
                                                                                    md : 12,
                                                                                    xtype : 'Column',
                                                                                    xns : Roo.bootstrap,
                                                                                    items : [
                                                                                        {
                                                                                            labelAlign : 'top',
                                                                                            fieldLabel : 'Family Name',
                                                                                            xtype : 'Input',
                                                                                            allowBlank : true,
                                                                                            xns : Roo.bootstrap,
                                                                                            name : 'lastname'
                                                                                        }
                                                                                    ]

                                                                                }
                                                                            ]

                                                                        }
                                                                    ]

                                                                }
                                                            ]

                                                        }
                                                    ]

                                                }
                                            ]

                                        }
                                    ]

                                }
                            ]

                        }
                    ]

                }
            ]
        };
    }
});