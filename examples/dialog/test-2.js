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
                            listeners : {
                                arrange : function (_self, formData)
                                {
                                    console.log("ARRANGE");
                                    console.log(formData);
                                },
                                crop : function (_self, data)
                                {
                                    console.log("CROP");
                                    console.log(data);
                                },
                                resize : function (_self)
                                {
                                    console.log("RESIZE");
                                },
                                rotate : function (_self)
                                {
                                    console.log("ROTATE");
                                },
                                render : function (_self)
                                {
                                    console.log("RENDER");
                                    console.log(_self);
                                    _this.cropbox = _self;
                                }
                            }
                        }
                    ]
                }
            ],
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
                                            console.log(uploadCropbox);
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
        console.log(test);
    });
});