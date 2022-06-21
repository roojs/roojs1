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
                    title : "Grid Panel Title",
                    grid : {
                        xns : Roo.grid,
                        xtype : 'Grid',
                        colModel : [
                            {
                                xns : Roo.grid,
                                xtype : 'ColumnModel'
                            }
                        ]
                    }
                }
            ],
            // items: [
            //     {
            //         xtype : 'UploadCropbox',
            //         xns : Roo.dialog,
            //         minWidth : 60,
            //         minHeight: 40,
            //         listeners : {
            //             arrange : function (_self, formData)
            //             {
            //                 console.log("ARRANGE");
            //                 console.log(formData);
            //             },
            //             crop : function (_self, data)
            //             {
            //                 console.log("CROP");
            //                 console.log(data);
            //             },
            //             resize : function (_self)
            //             {
            //                 console.log("RESIZE");
            //             },
            //             rotate : function (_self)
            //             {
            //                 console.log("ROTATE");
            //             },
            //             render : function (_self)
            //             {
            //                 console.log("RENDER");
            //                 console.log(_self);
            //                 _this.cropbox = _self;
            //             }
        
            //         }
            //     }
            // ],
            buttons : [
                {
                    xtype : 'Button',
                    xns : Roo,
                    text : 'Submit',
                    listeners : {
                        click : function () {
                            _this.dialog.hide()
                        }   
                    }
                },
                {
                    xtype : 'Button',
                    xns : Roo,
                    text : 'Close',
                    listeners : {
                        click : function () {
                            _this.dialog.hide()
                        }   
                    }
                }
            ]
        });
    }
}

Roo.onReady(function() {
    
    Roo.get('show-dialog-btn').on('click',function () {
        test.show({});
        console.log(test);
    });
});