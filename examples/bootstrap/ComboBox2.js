

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
        var baseURL = '/web.roojsolutions/index.local.php';
        
        return {
            xtype: 'Body',
            xns: Roo.bootstrap,
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
                    tpl : '<li class="dropdown-item  roo-select2-result "><b>{title}</b></li>',
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
                },
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
                    queryParam : 'query[title]',
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
                        remoteSort : true,
                        sortInfo : { direction : 'ASC', field: 'name' },
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
        };
    }
});