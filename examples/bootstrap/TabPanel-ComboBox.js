

Roo.example = Roo.example || {};

Roo.example.combobox = new Roo.XComponent({
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
                    '|xns' : 'Roo.bootstrap',
                    xtype : 'Container',
                    cls : 'content',
                    xns : Roo.bootstrap,
                    style : 'margin-top:100px',
                    items : [
                    	{
                            '|xns' : 'Roo.bootstrap',
                            xtype : 'Container',
                            cls : 'pad-wrapper',
                            xns : Roo.bootstrap,
                            items : [
                            	{
                                    '|xns' : 'Roo.bootstrap',
                                    xtype : 'Container',
                                    cls : 'container alpha',
                                    xns : Roo.bootstrap,
                                    items : [
                                    	{
                                            '|xns' : 'Roo.bootstrap',
                                            xtype : 'Container',
                                            xns : Roo.bootstrap,
                                            items : [
                                            	{
                                                    '|xns' : 'Roo.bootstrap',
                                                    xtype : 'NavSimplebar',
                                                    xns : Roo.bootstrap,
                                                    items : [
                                                    	{
                                                            '|xns' : 'Roo.bootstrap',
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
                                                                    '|xns' : 'Roo.bootstrap',
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
                                                                    '|xns' : 'Roo.bootstrap',
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
                                                    '|xns' : 'Roo.bootstrap',
                                                    xtype : 'TabGroup',
                                                    style : 'margin-top:20px;',
                                                    xns : Roo.bootstrap,
                                                    navId : '#top',
                                                    carousel : true,
                                                    items : [
                                                        {
                                                            '|xns' : 'Roo.bootstrap',
                                                            tabId : '#one',
                                                            xtype : 'TabPanel',
                                                            xns : Roo.bootstrap,
                                                            navId : '#top',
                                                            active : true,
                                                            items : [
                                                                {
                                                                    '|xns' : 'Roo.bootstrap',
                                                                    level : 4,
                                                                    xtype : 'Header',
                                                                    html : 'Your Basic Details',
                                                                    xns : Roo.bootstrap
                                                                },
                                                                {
                                                                    '|xns' : 'Roo.bootstrap',
                                                                    xtype : 'Container',
                                                                    well : 'md',
                                                                    xns : Roo.bootstrap,
                                                                    items : [
                                                                        {
                                                                            '|xns' : 'Roo.bootstrap',
                                                                            xtype : 'Row',
                                                                            xns : Roo.bootstrap,
                                                                            items : [
                                                                                {
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    md : 6,
                                                                                    xtype : 'Column',
                                                                                    xns : Roo.bootstrap,
                                                                                    items : [
                                                                                        {
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            labelAlign : 'top',
                                                                                            fieldLabel : 'Family Name',
                                                                                            xtype : 'Input',
                                                                                            allowBlank : true,
                                                                                            xns : Roo.bootstrap,
                                                                                            name : 'lastname'
                                                                                        }
                                                                                    ]

                                                                                },
                                                                                {
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    md : 6,
                                                                                    xtype : 'Column',
                                                                                    xns : Roo.bootstrap,
                                                                                    items : [
                                                                                        {
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            labelAlign : 'top',
                                                                                            fieldLabel : 'Family Name - Local Language (optional)',
                                                                                            xtype : 'Input',
                                                                                            allowBlank : true,
                                                                                            xns : Roo.bootstrap,
                                                                                            name : 'lastname_alt'
                                                                                        }
                                                                                    ]

                                                                                }
                                                                            ]

                                                                        },
                                                                        {
                                                                            '|xns' : 'Roo.bootstrap',
                                                                            xtype : 'Row',
                                                                            xns : Roo.bootstrap,
                                                                            items : [
                                                                                {
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    md : 6,
                                                                                    xtype : 'Column',
                                                                                    xns : Roo.bootstrap,
                                                                                    items : [
                                                                                        {
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            labelAlign : 'top',
                                                                                            fieldLabel : 'Given Name',
                                                                                            xtype : 'Input',
                                                                                            allowBlank : true,
                                                                                            xns : Roo.bootstrap,
                                                                                            name : 'firstname'
                                                                                        }
                                                                                    ]

                                                                                },
                                                                                {
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    md : 6,
                                                                                    xtype : 'Column',
                                                                                    xns : Roo.bootstrap,
                                                                                    items : [
                                                                                        {
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            labelAlign : 'top',
                                                                                            fieldLabel : 'Given Name - Local Language (optional)',
                                                                                            xtype : 'Input',
                                                                                            allowBlank : true,
                                                                                            xns : Roo.bootstrap,
                                                                                            name : 'firstname_alt'
                                                                                        }
                                                                                    ]

                                                                                }
                                                                            ]

                                                                        },
                                                                        {
                                                                            '|xns' : 'Roo.bootstrap',
                                                                            xtype : 'Row',
                                                                            xns : Roo.bootstrap,
                                                                            items : [
                                                                                {
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    md : 6,
                                                                                    xtype : 'Column',
                                                                                    xns : Roo.bootstrap,
                                                                                    items : [
                                                                                        {
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            allowBlank : false,
                                                                                            name : 'birth_date',
                                                                                            format : 'd/M/Y',
                                                                                            xtype : 'DateField',
                                                                                            placeholder : 'Day/Month/Year',
                                                                                            xns : Roo.bootstrap,
                                                                                            fieldLabel : 'Date of Birth',
                                                                                            before : '<i class=\"fa fa-clock-o\"></i>',
                                                                                            disableKeyFilter : true
                                                                                        }
                                                                                    ]

                                                                                }
                                                                            ]

                                                                        }
                                                                    ]

                                                                },
                                                                {
                                                                    '|xns' : 'Roo.bootstrap',
                                                                    level : 4,
                                                                    xtype : 'Header',
                                                                    html : 'Your Plans',
                                                                    xns : Roo.bootstrap
                                                                },
                                                                {
                                                                    '|xns' : 'Roo.bootstrap',
                                                                    xtype : 'Container',
                                                                    xns : Roo.bootstrap,
                                                                    well : 'md',
                                                                    items : [
                                                                        {
                                                                            '|xns' : 'Roo.bootstrap',
                                                                            xtype : 'Row',
                                                                            xns : Roo.bootstrap,
                                                                            items : [
                                                                                {
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    md : 6,
                                                                                    xtype : 'Column',
                                                                                    xns : Roo.bootstrap,
                                                                                    items : [
                                                                                        {
                                                                                            store : {
                                                                                                '|xns' : 'Roo.data',
                                                                                                data : [
                                                                                                    ['I am actively looking for work','YES'],
                                                                                                    [
                                                                                                        'Would consider a relivant offer',
                                                                                                        'MAYBE'
                                                                                                    ],
                                                                                                    [ 
                                                                                                       'Not currently interesetd unless meets aspirational goals',
                                                                                                       'ASPIRE'
                                                                                                    ]
                                                                                                ],
                                                                                                xtype : 'SimpleStore',
                                                                                                xns : Roo.data,
                                                                                                fields : [ 'label','value' ]
                                                                                            },
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            selectOnFocus : true,
                                                                                            mode : 'local',
                                                                                            name : '',
                                                                                            valueField : 'value',
                                                                                            xtype : 'ComboBox',
                                                                                            editable : false,
                                                                                            triggerAction : 'all',
                                                                                            alwaysQuery : true,
                                                                                            placeholder : '',
                                                                                            listWidth : 400,
                                                                                            xns : Roo.bootstrap,
                                                                                            tpl : '<div class=\"select2-result\"><b>{label}</b></div>',
                                                                                            fieldLabel : 'How would you describe your career plans',
                                                                                            hiddenName : 'employ_plan',
                                                                                            displayField : 'label',
                                                                                            forceSelection : true,
                                                                                            listeners : {
                                                                                                render : function (_self)
                                                                                                   {
                                                                                                      // this.setValue('Individual');
                                                                                                      this.el.select('span').removeClass('btn');
                                                                                                   },
                                                                                                select : function (combo, record, index)
                                                                                                   {

                                                                                                   }
                                                                                            },
                                                                                            items : [

                                                                                            ]

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
                                                            '|xns' : 'Roo.bootstrap',
                                                            tabId : '#two',
                                                            xtype : 'TabPanel',
                                                            xns : Roo.bootstrap,
                                                            navId : '#top',
                                                            active : false,
                                                            items : [
                                                                {
                                                                    '|xns' : 'Roo.bootstrap',
                                                                    level : 4,
                                                                    xtype : 'Header',
                                                                    html : 'Country and Languages',
                                                                    xns : Roo.bootstrap
                                                                },
                                                                {
                                                                    '|xns' : 'Roo.bootstrap',
                                                                    xtype : 'Container',
                                                                    well : 'md',
                                                                    xns : Roo.bootstrap,
                                                                    items : [
                                                                        {
                                                                            '|xns' : 'Roo.bootstrap',
                                                                            xtype : 'Row',
                                                                            xns : Roo.bootstrap,
                                                                            items : [
                                                                                {
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    md : 6,
                                                                                    xtype : 'Column',
                                                                                    xns : Roo.bootstrap,
                                                                                    items : [
                                                                                        {
                                                                                            store : {
                                                                                                proxy : {
                                                                                                    '|xns' : 'Roo.data',
                                                                                                    xtype : 'HttpProxy',
                                                                                                    xns : Roo.data,
                                                                                                    method : 'GET',
                                                                                                    url : baseURL+'/Geoip/Country'
                                                                                                },
                                                                                                reader : {
                                                                                                    '|xns' : 'Roo.data',
                                                                                                    xtype : 'JsonReader',
                                                                                                    xns : Roo.data,
                                                                                                    fields : [
                                                                                                        {
                                                                                                            'name': 'id',
                                                                                                            'type': 'int'
                                                                                                        },
                                                                                                        {
                                                                                                            'name': 'name',
                                                                                                            'type': 'string'
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                '|xns' : 'Roo.data',
                                                                                                xtype : 'Store',
                                                                                                xns : Roo.data,
                                                                                                sortInfo : {field:"name",direction:"ASC"},
                                                                                                listeners : {
                                                                                                        beforeload : function (_self, options)
                                                                                                           {

                                                                                                           }
                                                                                                },
                                                                                                items : [

                                                                                                ]

                                                                                            },
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            name : 'country',
                                                                                            minChars : 2,
                                                                                            valueField : 'id',
                                                                                            queryParam : 'query[name]',
                                                                                            typeAhead : true,
                                                                                            xtype : 'ComboBox',
                                                                                            triggerAction : 'all',
                                                                                            editable : true,
                                                                                            alwaysQuery : true,
                                                                                            listWidth : 500,
                                                                                            xns : Roo.bootstrap,
                                                                                            tpl : '<div class=\"select2-result\"><b>{name}</b></div>',
                                                                                            fieldLabel : 'Country of Residence',
                                                                                            hiddenName : 'country',
                                                                                            displayField : 'name',
                                                                                            append : true,
                                                                                            listeners : {
                                                                                                render : function (_self)
                                                                                                   {
                                                                                                      this.el.select('span').removeClass('btn');
                                                                                                   },
                                                                                                select : function (combo, record, index)
                                                                                                   {
                                                                                                       this.opt_id = record.data.id;
                                                                                                       _this.country = this;
                                                                                                   }
                                                                                            },
                                                                                            items : [

                                                                                            ]

                                                                                        }
                                                                                    ]

                                                                                },
                                                                                {
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    md : 6,
                                                                                    xtype : 'Column',
                                                                                    xns : Roo.bootstrap,
                                                                                    items : [
                                                                                        {
                                                                                            store : {
                                                                                                proxy : {
                                                                                                    '|xns' : 'Roo.data',
                                                                                                    xtype : 'HttpProxy',
                                                                                                    xns : Roo.data,
                                                                                                    method : 'GET',
                                                                                                    url : baseURL+'/Geoip/City'
                                                                                                },
                                                                                                reader : {
                                                                                                    '|xns' : 'Roo.data',
                                                                                                    xtype : 'JsonReader',
                                                                                                    fields : [
                                                                                                        {
                                                                                                            'name': 'id',
                                                                                                            'type': 'int'
                                                                                                        },
                                                                                                        {
                                                                                                            'name': 'name',
                                                                                                            'type': 'string'
                                                                                                        }

                                                                                                    ],
                                                                                                    xns : Roo.data
                                                                                                },
                                                                                                '|xns' : 'Roo.data',
                                                                                                xtype : 'Store',
                                                                                                xns : Roo.data,
                                                                                                sortInfo : {field:"name",direction:"ASC"},
                                                                                                listeners : {
                                                                                                        beforeload : function (_self, options)
                                                                                                           {
                                                                                                                   options.params.country_id = _this.country.opt_id;
                                                                                                           }
                                                                                                },
                                                                                                items : [

                                                                                                ]

                                                                                            },
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            name : 'city',
                                                                                            minChars : 2,
                                                                                            valueField : 'id',
                                                                                            queryParam : 'query[name]',
                                                                                            typeAhead : true,
                                                                                            xtype : 'ComboBox',
                                                                                            triggerAction : 'all',
                                                                                            editable : true,
                                                                                            alwaysQuery : true,
                                                                                            listWidth : 500,
                                                                                            xns : Roo.bootstrap,
                                                                                            tpl : '<div class=\"select2-result\"><b>{name}</b></div>',
                                                                                            fieldLabel : 'City',
                                                                                            hiddenName : 'city',
                                                                                            displayField : 'name',
                                                                                            append : true,
                                                                                            listeners : {
                                                                                                render : function (_self)
                                                                                                   {
                                                                                                      this.el.select('span').removeClass('btn');
                                                                                                   }
                                                                                            },
                                                                                            items : [

                                                                                            ]

                                                                                        }
                                                                                    ]

                                                                                }
                                                                            ]

                                                                        },
                                                                        {
                                                                            '|xns' : 'Roo.bootstrap',
                                                                            xtype : 'Row',
                                                                            xns : Roo.bootstrap,
                                                                            items : [
                                                                                {
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    md : 6,
                                                                                    xtype : 'Column',
                                                                                    xns : Roo.bootstrap,
                                                                                    items : [
                                                                                        {
                                                                                            store : {
                                                                                                proxy : {
                                                                                                    '|xns' : 'Roo.data',
                                                                                                    xtype : 'HttpProxy',
                                                                                                    xns : Roo.data,
                                                                                                    method : 'GET',
                                                                                                    url : baseURL+'/Roo/Core_enum'
                                                                                                },
                                                                                                reader : {
                                                                                                    '|xns' : 'Roo.data',
                                                                                                    xtype : 'JsonReader',
                                                                                                    xns : Roo.data,
                                                                                                    fields : [
                                                                                                        {
                                                                                                            'name': 'id',
                                                                                                            'type': 'int'
                                                                                                        },
                                                                                                        {
                                                                                                            'name': 'name',
                                                                                                            'type': 'string'
                                                                                                        },
                                                                                                        {
                                                                                                            'name': 'display_name',
                                                                                                            'type': 'string'
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                '|xns' : 'Roo.data',
                                                                                                xtype : 'Store',
                                                                                                sortInfo : {field:"display_name",direction:"ASC"},
                                                                                                xns : Roo.data,
                                                                                                listeners : {
                                                                                                        beforeload : function (_self, options)
                                                                                                           {
                                                                                                                   options.params.etype='Hydra.LanguageSpoken';

                                                                                                                   var selected = _this.lang.getValue();
                                                                                                                   if(selected.length){
                                                                                                                       options.params._skip = selected;
                                                                                                                   }
                                                                                                           }
                                                                                                },
                                                                                                items : [

                                                                                                ]

                                                                                            },
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            minChars : 2,
                                                                                            name : '',
                                                                                            valueField : 'id',
                                                                                            queryParam : 'query[search]',
                                                                                            xtype : 'ComboBox',
                                                                                            triggerAction : 'all',
                                                                                            editable : false,
                                                                                            alwaysQuery : true,
                                                                                            listWidth : 500,
                                                                                            xns : Roo.bootstrap,
                                                                                            tpl : '<div class=\"select2-result\"><b>{display_name}</b></div>',
                                                                                            fieldLabel : 'First (Native) Language',
                                                                                            hiddenName : 'lang',
                                                                                            displayField : 'display_name',
                                                                                            forceSelection : true,
                                                                                            listeners : {
                                                                                                render : function (_self)
                                                                                                   {
                                                                                                          this.el.select('span').removeClass('btn');
                                                                                                   }
                                                                                            },
                                                                                            items : [

                                                                                            ]

                                                                                        }
                                                                                    ]

                                                                                },
                                                                                {
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    md : 6,
                                                                                    xtype : 'Column',
                                                                                    xns : Roo.bootstrap,
                                                                                    items : [
                                                                                        {
                                                                                            store : {
                                                                                                proxy : {
                                                                                                    '|xns' : 'Roo.data',
                                                                                                    xtype : 'HttpProxy',
                                                                                                    xns : Roo.data,
                                                                                                    method : 'GET',
                                                                                                    url : baseURL+'/Roo/Core_enum'
                                                                                                },
                                                                                                reader : {
                                                                                                    '|xns' : 'Roo.data',
                                                                                                    xtype : 'JsonReader',
                                                                                                    fields : [
                                                                                                        {
                                                                                                            'name': 'id',
                                                                                                            'type': 'int'
                                                                                                        },
                                                                                                        {
                                                                                                            'name': 'display_name',
                                                                                                            'type': 'string'
                                                                                                        }
                                                                                                    ],
                                                                                                    xns : Roo.data
                                                                                                },
                                                                                                '|xns' : 'Roo.data',
                                                                                                xtype : 'Store',
                                                                                                xns : Roo.data,
                                                                                                sortInfo : {field:"display_name",direction:"ASC"},
                                                                                                listeners : {
                                                                                                        beforeload : function (_self, options)
                                                                                                           {
                                                                                                                   options.params.etype='Hydra.LanguageSpoken';

                                                                                                                   /*var selected = _this.lang.getValue();
                                                                                                                   if(selected.length){
                                                                                                                       options.params._skip = selected;
                                                                                                                   }*/
                                                                                                           }
                                                                                                },
                                                                                                items : [

                                                                                                ]

                                                                                            },
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            minChars : 2,
                                                                                            cls : 'col-md-12',
                                                                                            name : '',
                                                                                            valueField : 'id',
                                                                                            editNotList : true,
                                                                                            queryParam : 'query[search]',
                                                                                            xtype : 'ComboBox',
                                                                                            triggerAction : 'all',
                                                                                            editable : true,
                                                                                            alwaysQuery : true,
                                                                                            listWidth : 400,
                                                                                            xns : Roo.bootstrap,
                                                                                            fieldLabel : 'Other Languages Spoken',
                                                                                            hiddenName : 'lang_multi',
                                                                                            multiple : true,
                                                                                            tickable : true,
                                                                                            displayField : 'display_name',
                                                                                            forceSelection : true,
                                                                                            listeners : {
                                                                                                render : function (_self)
                                                                                                   {
                                                                                                       _this.lang = this;
                                                                                                   }
                                                                                            },
                                                                                            items : [

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

                }
            ]
        };
    }
});