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
        this.dialog.show(this.data_el);
        if(this.form) {
            this.form.reset();
            this.form.setValues(data);
            this.form.fireEvent('actioncomplete', this.form, {type: 'setdata', data: data});
        }
    }
}

Roo.onReady(function() {
    
    Roo.get('show-dialog-btn').on('click',function () {
    });
});