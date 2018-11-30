

Roo.example = Roo.example || {};

Roo.example.combobox = new Roo.XComponent({
    part     :  ["example","combobox"],
    order    : '001-viewpanel',
    region   : '',
    parent   : false,
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
                    xtype: 'ComboBox',
                    xns: Roo.bootstrap,
                    placeholder : 'Select a country',
                    displayField : 'title',
                    hiddenName : 'country_id',
                    md : '12',
                    size : 'sm',
                    name : 'title',
                    triggerAction : 'all',
                    minChars : '1',
                    tpl : '<li class="roo-select2-result"><b>{title}</b></div>',
                    listWidth : '400',
                    multiple: true,
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
                    pageSize : '10',
                    append: true,
                    store : {
                        xtype: 'Store',
                        xns: Roo.data,
                        listeners : {
                            beforeload : function (_self, o) {
                                o.params = o.params || {};
                                
                                var selected = _this.countrySel.getValue();
                                
                                if(selected.length){
                                    o.params._skip = selected;
                                }
                                
                            }
                        },
                        remoteSort : true,
                        sortInfo : { direction : 'ASC', field: 'name' },
                        proxy : {
                            xtype: 'HttpProxy',
                            xns: Roo.data,
                            url : '../boostrap/data.country.js',
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