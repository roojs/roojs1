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
            buttons : {ok:true, cancel:true},
            listeners : {

            },
            items : [
                {
                    xtype: 'UploadCropbox',
                    xns: Roo                    
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