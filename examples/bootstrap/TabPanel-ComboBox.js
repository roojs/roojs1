

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
        
        
        var _this = this;
        var MODULE = this;
         
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
                                                                    html : 'Normal',
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
                                                                    html : 'Multiple',
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
                                                                    html : 'Tickable',
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
                                                                                            displayField : 'title',
                                                                                            hiddenName : 'country_id',
                                                                                            md : '12',
                                                                                            size : 'sm',
                                                                                            name : 'country_id_name',
                                                                                            triggerAction : 'all',
                                                                                            minChars : '1',
                                                                                            tpl : '<li class="roo-select2-result"><b>{title}</b></div>',
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
                                                                                                sortInfo : { direction : 'ASC', field: 'title' },
                                                                                                proxy : {
                                                                                                    xtype: 'HttpProxy',
                                                                                                    xns: Roo.data,
                                                                                                    url : '../bootstrap/data.country.js',
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
                                                                                                            'name': 'title',
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
                                                            tabId : '#multiple',
                                                            xtype : 'TabPanel',
                                                            xns : Roo.bootstrap,
                                                            navId : '#top',
                                                            active : false,
                                                            listeners : {
                                                                   changed : function (_self, state)
                                                                   {
                                                                       if(state){
                                                                            _this.multipleSel.list.setWidth(Math.max(_this.multipleSel.inputEl().getWidth(), _this.multipleSel.minListWidth));
                                                                        }
                                                                   }
                                                            },
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
                                                                                            displayField : 'title',
                                                                                            hiddenName : 'country_id',
                                                                                            md : '12',
                                                                                            size : 'sm',
                                                                                            name : 'country_id_name',
                                                                                            triggerAction : 'all',
                                                                                            minChars : '1',
                                                                                            tpl : '<li class="roo-select2-result"><b>{title}</b></div>',
                                                                                            style : 'margin-top:20px;',
                                                                                            multiple: true,
                                                                                            listeners : {
                                                                                                render : function (_self) {
                                                                                                    _this.multipleSel = _self;
                                                                                                }
                                                                                            },
                                                                                            forceSelection : true,
                                                                                            valueField : 'id',
                                                                                            queryParam : 'query[name]',
                                                                                            editable : true,
                                                                                            alwaysQuery : true,
                                                                                            allowBlank : false,
                                                                                            fieldLabel : 'Country Multiple',
                                                                                            store : {
                                                                                                xtype: 'Store',
                                                                                                xns: Roo.data,
                                                                                                listeners : {
                                                                                                    beforeload : function (_self, o) {
                                                                                                        o.params = o.params || {};

                                                                                                    }
                                                                                                },
                                                                                                remoteSort : false,
                                                                                                sortInfo : { direction : 'ASC', field: 'title' },
                                                                                                proxy : {
                                                                                                    xtype: 'HttpProxy',
                                                                                                    xns: Roo.data,
                                                                                                    url : '../bootstrap/data.country.js',
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
                                                                                                            'name': 'title',
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
                                                            tabId : '#tickable',
                                                            xtype : 'TabPanel',
                                                            xns : Roo.bootstrap,
                                                            navId : '#top',
                                                            active : false,
                                                            listeners : {
                                                                   changed : function (_self, state)
                                                                   {
                                                                       if(state){
                                                                            _this.tickableSel.list.setWidth(Math.max(_this.tickableSel.inputEl().getWidth(), _this.tickableSel.minListWidth));
                                                                        }
                                                                   }
                                                            },
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
                                                                                    displayField : 'title',
                                                                                    hiddenName : 'country_id',
                                                                                    md : '12',
                                                                                    size : 'sm',
                                                                                    name : 'country_id_name',
                                                                                    triggerAction : 'all',
                                                                                    minChars : '1',
                                                                //                    tpl : '<li class="roo-select2-result"><b>{name}</b></div>',
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
                                                                                    store : {
                                                                                        xtype: 'Store',
                                                                                        xns: Roo.data,
                                                                                        listeners : {
                                                                                            beforeload : function (_self, o) {
                                                                                                o.params = o.params || {};

                                                                                            }
                                                                                        },
                                                                                        remoteSort : false,
                                                                                        sortInfo : { direction : 'ASC', field: 'title' },
                                                                                        proxy : {
                                                                                            xtype: 'HttpProxy',
                                                                                            xns: Roo.data,
                                                                                            url : '../bootstrap/data.country.js',
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
                                                                                                    'name': 'title',
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