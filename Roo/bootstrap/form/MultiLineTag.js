/**
 * 
 * @class Roo.bootstrap.form.MultiLineTag
 * @param {Object} config The config object
 * 
 */

Roo.bootstrap.form.MultiLineTag = function(config){
    Roo.log('CONSTRUCT MUTLI LINE TAG');
    Roo.bootstrap.form.MultiLineTag.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.form.MultiLineTag, Roo.bootstrap.form.Input,  {
    getAutoCreate : function()
    {
        Roo.log('MultiLineTag getAutoCreate');
        var config = {
            cls : 'test'
        };

        return config;
    },

    initEvents : function()
    {
        Roo.log('MultiLineTag initEvents');
        this.items = [];

        var comboBox = {
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
        };

        var deleteButton = {
            xns : Roo.bootstrap,
            xtype : 'Button',
            html : '-'
        };

        var row = {
            xtype: 'Row',
            xns: Roo.bootstrap,
            items : [
                comboBox,
                deleteButton
            ]
        };

        for (var i = 0; i < 2; i++) {
            var r = this.addxtype(row);
            this.items.push(r);
        }
    }
});