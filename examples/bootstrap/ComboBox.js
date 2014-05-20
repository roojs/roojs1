

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
                    wdith: 300,
                    name : 'country_id_name',
                    triggerAction : 'all',
                    minChars : '2',
                    tpl : '<div class="x-grid-cell-text x-btn button"><b>{name}</b></div>',
                    listWidth : '400',
                    listeners : {
                        render : function (_self) {
                            _this.countrySel = _self;
                        }
                    },
                    forceSelection : true,
                    valueField : 'id',
                    queryParam : 'query[name]',
                    editable : true,
                    alwaysQuery : true,
                    allowBlank : false,
                    fieldLabel : 'Country',
                    pageSize : '20',
                    append: true,
                    store : {
                        xtype: 'Store',
                        xns: Roo.data,
                        listeners : {
                            beforeload : function (_self, o) {
                                o.params = o.params || {};
                            }
                        },
                        proxy : {
                            xtype: 'HttpProxy',
                            xns: Roo.data,
                            url : baseURL + '/Roo/Core_geoip_country',
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
        };
    }
});