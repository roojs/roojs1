/**
 * 
 * @class Roo.bootstrap.form.MultiLineTag
 * @param {Object} config The config object
 * 
 */

Roo.bootstrap.form.MultiLineTag = function(config){
    Roo.bootstrap.form.MultiLineTag.superclass.constructor.call(this, config);

    this.addEvents({
        /**
         * @event beforeload
         * Fires before a request is made for a new data object.  If the beforeload handler returns false
         * the load action will be canceled.
         * @param {Roo.boostrap.form.MultiLineTag} this
         * @param {Store} store
         * @param {Object} options The loading options that were specified (see {@link #load} for details)
         */
         beforeload : true
    });
};

Roo.extend(Roo.bootstrap.form.MultiLineTag, Roo.bootstrap.form.Input,  {
    tagRows : [],
    minimumRow : 2,

    // for combo box
    displayField : '',
    valueField : '',
    placeholder : '',
    queryParam : '',
    listWidth : 300,

    // for combo box store
    url : undefined,
    fields : [],



    getAutoCreate : function()
    {
        var config = {
            cls : 'roo-multi-line-tag form-group'
        };

        config = this.getAutoCreateLabel( config, {
            cls : 'roo-multi-line-tag-container'
        } );

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
            triggerAction: 'all',
            minChars: 2,
            displayField: _this.displayField,
            valueField : _this.valueField,
            listWidth: _this.listWidth,
            placeholder : _this.placeholder,
            queryParam : _this.queryParam,
            store : {
                xns : Roo.data,
                xtype : 'Store',
                listeners : {
                    beforeload : function(_self, options)
                    {
                        _this.fireEvent('beforeload', _this, _self, options);
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
                    fields : _this.fields
                }
            },
            listeners : {
                'render' : function (_self) {
                    _self.inputEl().on('keyup', function(e) {
                        if(_this.shouldAutoAddTagRow()) {
                            _this.addTagRow();
                        }
                    });
                    _self.inputEl().on('change', function(e) {
                        _this.fireEvent('change', _this, _this.getValue(), false);
                        _this.showHideRemoveBtn();

                    });
                },
                'select' : function(_self, record, index) {
                    _this.fireEvent('change', _this, _this.getValue(), false);
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
                        _this.removeTagRow(_self);
                    });
                }
            }
        };
        this.tagRows.push(this.addxtype(row));

        _this.showHideRemoveBtn();
    },

    // a new tags should be added automatically when all existing tags are not empty
    shouldAutoAddTagRow : function()
    {
        var ret = true;

        Roo.each(this.tagRows, function(r) {
            if(r.inputCb.getRawValue() == '') {
                ret = false;
            }
        });

        return ret;
    },

    removeTagRow : function(row)
    {
        row.destroy();
        this.tagRows.splice(this.tagRows.indexOf(row), 1);
        this.fireEvent('change', this, this.getValue(), false);
        this.showHideRemoveBtn();
    },

    // hide all remove buttons if there are {minimumRow} or less tags
    // hide the remove button for empty tag
    showHideRemoveBtn : function()
    {
        var _this = this;
        
        Roo.each(this.tagRows, function (r) {

            r.removeBtn.show();

            if(_this.tagRows.length <= _this.minimumRow || r.inputCb.getRawValue() == '') {
                r.removeBtn.hide();
            }
        });
    },

    getValue : function()
    {
        var _this = this;
        var tags = [];
        Roo.each(_this.tagRows, function(r) {
            var value = r.inputCb.getRawValue();
            if(value != '') {
                var tag = {};
                tag[_this.valueField] = r.inputCb.getRawValue();
                tags.push(tag);
            }
        });
        
        return JSON.stringify(tags);
    },

    setValue : function(json)
    {

        // remove all old tags
        var oldTotal = this.tagRows.length;

        for(var i = 0; i < oldTotal; i ++) {
            this.removeTagRow(this.tagRows[0]);
        }

        // empty tag if invalid json
        var arr = [];

        try {
            // set new tags
            arr = JSON.parse(json);
        }
        catch {}

        for (var i = 0; i < arr.length; i ++) {
            this.addTagRow();
            this.tagRows[i].inputCb.setRawValue(arr[i][this.valueField]);
        }

        // always add one extra empty tag
        this.addTagRow();

        // add empty tags until there are {minimumRow} tags
        while(this.tagRows.length < this.minimumRow) {
            this.addTagRow();
        }
        
    },

    getChildContainer : function()
    {
        Roo.log(Roo.select('.roo-multi-line-tag-container', true).elements[0]);
        Roo.log(this.el);
        return Roo.select('.roo-multi-line-tag-container', true).elements[0];
        // return this.el;
    }
});