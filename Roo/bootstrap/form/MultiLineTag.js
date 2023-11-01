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

    getAutoCreate : function()
    {
        var config = {
            cls : 'roo-multi-line-tag'
        };

        return config;
    },

    initEvents : function()
    {
        this.tagRows = [];

        for (var i = 0; i < 2; i++) {
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
                }
            });

            var button = Roo.factory({
                xns : Roo.bootstrap,
                xtype : 'Button',
                html : '-',
                listeners : {
                    'click' : function(_self, e) {
                        Roo.log('REMOVE CLICK');
                    }
                }
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
                        });
                    }
                }
            };
            this.tagRows.push(this.addxtype(row));

            this.addListener('childrenrendered', function(_self) {
                Roo.log('CHILDREN RENDERED');
            }, this);
        }
    }
});
