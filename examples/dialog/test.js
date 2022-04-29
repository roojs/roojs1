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
        this.dialog.show(data._el ? data._el : false);
        if(this.form) {
            this.form.reset();
            this.form.setValues(data);
            this.form.fireEvent('actioncomplete', this.form, {type: 'setdata', data: data});
        }
    },

    create : function()
    {
        var _this = this;
        this.dialog = Roo.factory({
            xtype : 'Modal',
            xns : Roo.bootstrap,
            title : 'Upload an Image',
            buttons : Roo.bootstrap.Modal.OKCANCEL,
            items: [
                {
                    xtype : 'Row',
                    xns : Roo.bootstrap,
                    items: [
                        {
                            xtype : 'Column',
                            xns : Roo.bootstrap,
                            items: [
                                {
                                    xtype : 'UploadCropbox',
                                    xns : Roo.bootstrap,
                                    minHeight : 600,
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
                    ]
                }
            ],
            listeners : {
                btnclick : function (e)
                {
                    console.log(e);
                    if(e == 'cancel') {
                        _this.dialog.hide();
                        return;
                    }

                    _this.cropbox.crop();
                }
            }
        });
    }
}

Roo.onReady(function() {
    
    Roo.get('show-dialog-btn').on('click',function () {
        test.show({});
        console.log(test);
    });
});