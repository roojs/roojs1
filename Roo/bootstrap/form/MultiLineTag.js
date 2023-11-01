/**
 * 
 * @class Roo.bootstrap.form.MultiLineTag
 * @param {Object} config The config object
 * 
 */

Roo.bootstrap.form.MultiLineTag = function(config){
    Roo.bootstrap.form.MultiLineTag.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.form.MultiLineTag, Roo.bootstrap.form.Input,  {

    tagRows : [],

    getAutoCreate : function()
    {
        var config = {
            cls : 'roo-multi-line-tag'
        };

        return config;
    },

    initEvents : function()
    {
        var _this = this;
        this.tagRows = [];

        for (var i = 0; i < 2; i++) {
            this.addTagRow();
        }
    },

    addTagRow : function()
    {
        var comboBox = Roo.factory({
            xns: Roo.bootstrap.form,
            xtype : 'ComboBox',
            editable : true,
            displayField: 'name',
            valueField : 'id',
            labelWidth: 0,
            listWidth: 500,
            minChars: 2,
            placeholder : 'Corporate, CSR, ESG Product',
            queryParam : 'query[name]',
            triggerAction: 'all',
            store : {
                xns : Roo.data,
                xtype : 'Store',
                listeners : {
                    beforeload : function(_self, options)
                    {
                        options.params = options.params || {};
                        options.params._clients = 1;
                    }
                },
                proxy : {
                    xns : Roo.data,
                    xtype : 'HttpProxy',
                    method : 'GET',
                    url : 'http://localhost/web.MediaOutreach.publisher/index.local.php/Roo/Core_company'
                },
                reader : {
                    xns : Roo.data,
                    xtype : 'JsonReader',
                    fields : [
                        {
                            'name' : 'id',
                            'type' : 'int'
                        },
                        {
                            'name' : 'name',
                            'type' : 'string'
                        },
                        {
                            'name' : 'logo_url',
                            'type' : 'string'
                        }
                    ]
                }
            },
            listeners : {
                'render' : function (_self) {
                    Roo.log('COMBO BOX RENDER');
                    Roo.log(_self.input());

                    _self.inputEl().on('keyup', function(e) {
                        Roo.log('CB ON KEY UP');
                        Roo.log(_self.getValue());
                    });

                    _self.inputEl().on('blur', function(e) {
                        Roo.log("CB ON BLUR");
                        Roo.log(_self.getValue());
                    });
                }
            }
        });

        var button = Roo.factory({
            xns : Roo.bootstrap,
            xtype : 'Button',
            html : '-'
        });

        var row = {
            xns : Roo.bootstrap,
            xtype : 'Row',
            items : [
                comboBox,
                button
            ],
            listeners : {
                'render' : function (_self) {
                    this.inputCb = comboBox;
                    this.removeBtn = button;

                    this.removeBtn.on('click', function() {
                        _self.destroy();
                        _this.tagRows.splice(_this.tagRows.indexOf(_self), 1);
                    });
                }
            }
        };
        this.tagRows.push(this.addxtype(row));
    }
});
