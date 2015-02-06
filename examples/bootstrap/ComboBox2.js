

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
                    listWidth : '400',
                    style : 'margin-top:20px;',
                    multiple: true,
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
                    pageSize : '10',
                    append: true,
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
        };
    }
});