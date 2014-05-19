

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
                    placeholder : 'Location',
                    displayField : 'country_name',
                    hiddenName : 'country',
                    md : '4',
                    size : 'sm',
                    style : 'margin-left:10px',
                    name : 'country_name',
                    triggerAction : 'all',
                    minChars : '2',
                    tpl : '<div class="x-grid-cell-text x-btn button"><b>{country_name}</b></div>',
                    listWidth : '400',
                    listeners : {
                        render : function (_self) {
                            _this.locSel = _self;

                        }
                    },
                    forceSelection : true,
                    valueField : 'country',
                    queryParam : 'query[country]',
                    editable : true,
                    alwaysQuery : true,
                    store : {
                        xtype: 'Store',
                        xns: Roo.data,
                        listeners : {
                            beforeload : function (_self, o) {
                                o.params = o.params || {};
                                o.params._countryList = 1;
                            }
                        },
                        proxy : {
                            xtype: 'HttpProxy',
                            xns: Roo.data,
                            url : baseURL + '/Roo/Core_cities',
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
                                    'name': 'name',
                                    'type': 'string'
                                },
                                {
                                    'name': 'country',
                                    'type': 'string'
                                },
                                {
                                    'name': 'country_name',
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