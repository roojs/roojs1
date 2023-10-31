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
        this.items = [];

        for (var i = 0; i < 1; i++) {
            var tagBox = Roo.factory({
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

            Roo.log(tagBox);

            var tagDelete = Roo.factory({
                xns : Roo.bootstrap,
                xtype : 'Button',
                html : '-',
                listeners : {
                    'click' : function(_self, e) {
                        Roo.log('DELETE CLICK');
                    }
                }
            });

            Roo.log(tagDelete);

            var tagRow = {
                xns : Roo.bootstrap,
                xtype : 'Row',
                items : [
                    tagBox,
                    tagDelete
                ],
                listeners : {
                    'render' : function (_self) {
                        Roo.log('RENDER');
                        Roo.log(this);
                    }
                }
            };
        }

        // for (var i = 0; i < 2; i++) {
        //     var r = this.addxtype({
        //         xtype: 'Row',
        //         xns: Roo.bootstrap,
        //         items : [
        //             comboBox,
        //             deleteButton
        //         ]
        //     });
        //     this.items.push(r);
        // }
    }
});
