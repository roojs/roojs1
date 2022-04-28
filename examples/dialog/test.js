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
            xns : Roo,
            xtype : 'LayoutDialog',
            autoTabs:true,
            width:500,
            height:300,
            shadow:true,
            minWidth:300,
            minHeight:250,
            proxyDrag: true,
            items : [   
                {
                    xtype : 'UploadCropbox',
                    xns : Roo
                }
            ],
            buttons : [
                {
                    xtype : 'Button',
                    xns : Roo,
                    text : 'ok',
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