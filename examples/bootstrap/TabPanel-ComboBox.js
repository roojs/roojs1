

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
                                                                    tabId : '#normal',
                                                                    xtype : 'NavItem',
                                                                    preventDefault : true,
                                                                    html : 1,
                                                                    xns : Roo.bootstrap,
                                                                    active : true,
                                                                    listeners : {
                                                                    	render : function (_self)
                                                                    	   {
                                                                    	      _this.normal = this;
                                                                    	      
                                                                    	   }
                                                                    }
                                                                },
                                                            	{
                                                                    tabId : '#multiple',
                                                                    xtype : 'NavItem',
                                                                    preventDefault : true,
                                                                    html : 2,
                                                                    xns : Roo.bootstrap,
                                                                    active : false,
                                                                    listeners : {
                                                                    	render : function (_self)
                                                                    	   {
                                                                    	      _this.multiple = this;
                                                                    	      
                                                                    	   }
                                                                    }
                                                                },
                                                                {
                                                                    tabId : '#tickable',
                                                                    xtype : 'NavItem',
                                                                    preventDefault : true,
                                                                    html : 2,
                                                                    xns : Roo.bootstrap,
                                                                    active : false,
                                                                    listeners : {
                                                                    	render : function (_self)
                                                                    	   {
                                                                    	      _this.tickable = this;
                                                                    	      
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
                                                            tabId : '#normal',
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
                                                                                            xtype: 'ComboBox',
                                                                                            xns: Roo.bootstrap,
                                                                                            placeholder : 'Select a country',
                                                                                            displayField : 'name',
                                                                                            hiddenName : 'country_id',
                                                                                            md : '12',
                                                                                            size : 'sm',
                                                                                            name : 'country_id_name',
                                                                                            triggerAction : 'all',
                                                                                            minChars : '1',
                                                                                            tpl : '<li class="select2-result"><b>{name}</b></div>',
                                                                                            style : 'margin-top:20px;',
                                                                                            listeners : {
                                                                                                render : function (_self) {
                                                                                                    _this.normalSel = _self;
                                                                                                }
                                                                                            },
                                                                                            forceSelection : true,
                                                                                            valueField : 'id',
                                                                                            queryParam : 'query[name]',
                                                                                            editable : true,
                                                                                            alwaysQuery : true,
                                                                                            allowBlank : false,
                                                                                            fieldLabel : 'Country Normal',
                                                                                            store : {
                                                                                                xtype: 'Store',
                                                                                                xns: Roo.data,
                                                                                                listeners : {
                                                                                                    beforeload : function (_self, o) {
                                                                                                        o.params = o.params || {};

                                                                                                    }
                                                                                                },
                                                                                                remoteSort : true,
                                                                                                sortInfo : { direction : 'ASC', field: 'name' },
                                                                                                proxy : {
                                                                                                    xtype: 'HttpProxy',
                                                                                                    xns: Roo.data,
                                                                                                    url : baseURL + '/Geoip/Core_geoip_country',
                                                                                                    method : 'GET'
                                                                                                },
                                                                                                reader : {
                                                                                                    xtype: 'JsonReader',
                                                                                                    xns: Roo.data,
                                                                                                    fields : [
                                                                                                        {
                                                                                                            'name': 'id',
                                                                                                            'type': 'int'
                                                                                                        },
                                                                                                        {
                                                                                                            'name': 'code',
                                                                                                            'type': 'string'
                                                                                                        },
                                                                                                        {
                                                                                                            'name': 'name',
                                                                                                            'type': 'string'
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            }
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
                                                                                            xtype: 'ComboBox',
                                                                                            xns: Roo.bootstrap,
                                                                                            placeholder : 'Select a country',
                                                                                            displayField : 'name',
                                                                                            hiddenName : 'country_id',
                                                                                            md : '12',
                                                                                            size : 'sm',
                                                                                            name : 'country_id_name',
                                                                                            triggerAction : 'all',
                                                                                            minChars : '1',
                                                                                            tpl : '<li class="select2-result"><b>{name}</b></div>',
                                                                                            style : 'margin-top:20px;',
//                                                                                            multiple: true,
                                                                                            listeners : {
                                                                                                render : function (_self) {
                                                                                                    _this.normalSel = _self;
                                                                                                }
                                                                                            },
                                                                                            forceSelection : true,
                                                                                            valueField : 'id',
                                                                                            queryParam : 'query[name]',
                                                                                            editable : true,
                                                                                            alwaysQuery : true,
                                                                                            allowBlank : false,
                                                                                            fieldLabel : 'Country Normal',
                                                                                            store : {
                                                                                                xtype: 'Store',
                                                                                                xns: Roo.data,
                                                                                                listeners : {
                                                                                                    beforeload : function (_self, o) {
                                                                                                        o.params = o.params || {};

                                                                                                    }
                                                                                                },
                                                                                                remoteSort : true,
                                                                                                sortInfo : { direction : 'ASC', field: 'name' },
                                                                                                proxy : {
                                                                                                    xtype: 'HttpProxy',
                                                                                                    xns: Roo.data,
                                                                                                    url : baseURL + '/Geoip/Core_geoip_country',
                                                                                                    method : 'GET'
                                                                                                },
                                                                                                reader : {
                                                                                                    xtype: 'JsonReader',
                                                                                                    xns: Roo.data,
                                                                                                    fields : [
                                                                                                        {
                                                                                                            'name': 'id',
                                                                                                            'type': 'int'
                                                                                                        },
                                                                                                        {
                                                                                                            'name': 'code',
                                                                                                            'type': 'string'
                                                                                                        },
                                                                                                        {
                                                                                                            'name': 'name',
                                                                                                            'type': 'string'
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            }
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
                                                                                    xtype: 'ComboBox',
                                                                                    xns: Roo.bootstrap,
                                                                                    placeholder : 'Select a country',
                                                                                    displayField : 'name',
                                                                                    hiddenName : 'country_id',
                                                                                    md : '12',
                                                                                    size : 'sm',
                                                                                    name : 'country_id_name',
                                                                                    triggerAction : 'all',
                                                                                    minChars : '1',
                                                                //                    tpl : '<li class="select2-result"><b>{name}</b></div>',
                                                                                    style : 'margin-top:20px;',
                                                                                    multiple: true,
                                                                                    tickable: true,
                                                                                    listeners : {
                                                                                        render : function (_self) {
                                                                                            _this.tickableSel = _self;
                                                                                        }
                                                                                    },
                                                                                    forceSelection : true,
                                                                                    valueField : 'id',
                                                                                    queryParam : 'query[name]',
                                                                                    editable : true,
                                                                                    alwaysQuery : true,
                                                                                    allowBlank : false,
                                                                                    fieldLabel : 'Country With Tickable',
                                                                //                    pageSize : '10',
                                                                //                    append: true,
                                                                                    store : {
                                                                                        xtype: 'Store',
                                                                                        xns: Roo.data,
                                                                                        listeners : {
                                                                                            beforeload : function (_self, o) {
                                                                                                o.params = o.params || {};

                                                                                            }
                                                                                        },
                                                                                        remoteSort : true,
                                                                                        sortInfo : { direction : 'ASC', field: 'name' },
                                                                                        proxy : {
                                                                                            xtype: 'HttpProxy',
                                                                                            xns: Roo.data,
                                                                                            url : baseURL + '/Geoip/Core_geoip_country',
                                                                                            method : 'GET'
                                                                                        },
                                                                                        reader : {
                                                                                            xtype: 'JsonReader',
                                                                                            xns: Roo.data,
                                                                                            fields : [
                                                                                                {
                                                                                                    'name': 'id',
                                                                                                    'type': 'int'
                                                                                                },
                                                                                                {
                                                                                                    'name': 'code',
                                                                                                    'type': 'string'
                                                                                                },
                                                                                                {
                                                                                                    'name': 'name',
                                                                                                    'type': 'string'
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    }
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