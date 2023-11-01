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
    minimumRow : 5,

    // for combo box

    displayField : 'name',
    valueField : 'id',
    placeholder : 'Corporate, CSR, ESG Product',
    queryParam : 'query[name]',
    listWidth : 300,

    url : 'http://localhost/web.MediaOutreach.publisher/index.local.php/Roo/Core_company',



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

        for (var i = 0; i < this.minimumRow; i++) {
            this.addTagRow();
        }
    },

    addTagRow : function()
    {
        var _this = this; 

        var comboBox = Roo.factory({
            xns: Roo.bootstrap.form,
            xtype : 'ComboBox',
            editable : true,
            displayField: _this.displayField,
            valueField : _this.valueField,
            // labelWidth: 0,
            listWidth: _this.listWidth,
            minChars: 2,
            placeholder : _this.placeholder,
            queryParam : _this.queryParam,
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
                    url : _this.url
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
                    _self.inputEl().on('keyup', function(e) {
                        if(_this.shouldAddTagRow()) {
                            _this.addTagRow();
                        }
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
                        _this.showHideRemoveBtn();
                    });
                }
            }
        };
        this.tagRows.push(this.addxtype(row));

        _this.showHideRemoveBtn();
    },

    // a new tags should be added when all existing tags are not empty
    shouldAddTagRow : function()
    {
        var ret = true;

        Roo.each(this.tagRows, function(r) {
            if(r.inputCb.getRawValue() == '') {
                ret = false;
            }
        });

        return ret;
    },

    // show remove buttons only if there are more than {minimumRow} tags
    showHideRemoveBtn : function()
    {
        var _this = this;
        
        Roo.each(this.tagRows, function (r) {

            r.removeBtn.show();

            if(_this.tagRows.length <= _this.minimumRow) {
                r.removeBtn.hide();
            }
        });
    }
});
