var cropboxDialog = {
    dialog : false,
    callback : false,

    show : function(data, cb)
    {
        if (!this.dialog) {
            this.create();
        }

        this.callback = cb;
        this.data = data;
        this.dialog.show();
    },

    create : function()
    {
        var _this = this;
        this.dialog = Roo.factory({
            xns : Roo,
            xtype : 'LayoutDialog',
            width : 700,
            height : 600,
            center : {
                xns : Roo,
                xtype : 'LayoutRegion'
            },
            items : [
                {
                    xtype: 'ContentPanel',
                    xns: Roo,
                    region : "center",
                    items : [
                        {
                            xtype : 'Cropbox',
                            xns : Roo.panel,
                            minWidth : 720,
                            minHeight : 480,
                            outputMaxWidth : 1200,
                            windowSize : 300,
                            url: 'http://localhost/web.MediaOutreach/press.local.php/Roo/Images.php',
                            buttons: [],
                            listeners : {
                                render : function (_self)
                                {
                                    _this.cropbox = _self;
                                },
                                loadcanvas : function (_self, imageEl)
                                {
                                    if(imageEl.OriginWidth < 720) {
                                        Roo.Msg.show({
                                            title: 'Error',
                                            msg: "Image width should be at least 720",
                                            buttons: {ok : true},
                                            fn: function(res) {
                                                _this.cropbox.selectorEl.dom.value = '';
                                                _this.cropbox.selectorEl.dom.click();
                                            }
                                        });
                                        return false;
                                    }
                                },
                                arrange : function (_self, formData)
                                {
                                    formData.append("onid", "43024");
                                    formData.append("ontable", "pressrelease_boilerplate");
                                }
                            }
                        }
                    ]
                }
            ],
            buttons : [
                {
                    xtype : 'Button',
                    xns : Roo,
                    text : 'Save',
                    listeners : {
                        click : function () {
                            _this.cropbox.crop();
                            _this.dialog.hide();
                        }   
                    }
                },
                {
                    xtype : 'Button',
                    xns : Roo,
                    text : 'Cancel',
                    listeners : {
                        click : function () {
                            _this.dialog.hide();
                        }   
                    }
                }
            ]
        });
    }
}

var test = {

    dialog : false,
    callback : false,

    show : function(data, cb)
    {
        if (!this.dialog) {
            this.create();
        }

        this.callback = cb;
        this.data = data;
        this.dialog.show();
    },

    create : function()
    {
        var _this = this;
        this.dialog = Roo.factory({
            xns : Roo,
            xtype : 'LayoutDialog',
            width : 600,
            height : 450,
            center : {
                xns : Roo,
                xtype : 'LayoutRegion'
            },
            items : [
                {
                    xns : Roo,
                    xtype: 'GridPanel',
                    region : "center",
                    grid : {
                        xns : Roo.grid,
                        xtype : 'Grid',
                        cm : [
                            {
                                xns : Roo.grid,
                                xtype : 'ColumnModel',
                                header : 'test'
                            }
                        ],
                        ds : {
                            xns: Roo.data,
                            xtype: 'Store'
                        },
                        toolbar : {
                            xns: Roo,
                            xtype: 'Toolbar',
                            items : [
                                { 
                                    xtype : 'Button',
                                    text : 'Add',
                                    listeners : {
                                        click : function () {
                                            cropboxDialog.show();
                                            document.body.onfocus = function(e) {
                                                if(!cropboxDialog.cropbox.selectorEl.dom.files.length) {
                                                    cropboxDialog.dialog.hide();
                                                }
                                            }
                                            cropboxDialog.cropbox.selectorEl.dom.click();
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            ],
        });
    }
}

Roo.onReady(function() {
    
    Roo.get('show-dialog-btn').on('click',function () {
        test.show({});
    });
});