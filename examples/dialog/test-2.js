var uploadCropbox = {
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
            width : 800,
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
                            xtype : 'UploadCropbox',
                            xns : Roo.dialog,
                            minWidth : 720,
                            minHeight: 480,
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
                                            uploadCropbox.show();
                                            document.body.onfocus = function(e) {
                                                if(!uploadCropbox.cropbox.selectorEl.dom.files.length) {
                                                    uploadCropbox.dialog.hide();
                                                }
                                            }
                                            uploadCropbox.cropbox.selectorEl.dom.click();
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