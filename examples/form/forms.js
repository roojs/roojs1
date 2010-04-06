/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */

Roo.onReady(function(){
    Roo.QuickTips.init();

    Roo.MessageBox.alert("Warning", "This example is not done and results may vary.");

    // Change field to default to validation message "under" instead of tooltips
    Roo.form.Field.prototype.msgTarget = 'under';


    var date = new Roo.form.DateField({
        allowBlank:false
    });

    date.applyTo('markup-date');

    var tranny = new Roo.form.ComboBox({
        typeAhead: true,
        triggerAction: 'all',
        transform:'light',
        width:120,
        forceSelection:true
    });

    var required = new Roo.form.TextField({
        allowBlank:false
    });
    required.applyTo('required');

    var alpha = new Roo.form.TextField({
        vtype:'alpha'
    });
    alpha.applyTo('alpha');

    var alpha2 = new Roo.form.TextField({
        vtype:'alpha',
        disableKeyFilter:true
    });
    alpha2.applyTo('alpha2');

    var alphanum = new Roo.form.TextField({
        vtype:'alphanum'
    });
    alphanum.applyTo('alphanum');

    var email = new Roo.form.TextField({
        allowBlank:false,
        vtype:'email'
    });
    email.applyTo('email');

    var url = new Roo.form.TextField({
        vtype:'url'
    });
    url.applyTo('url');

    var grow = new Roo.form.TextArea({
        width:200, grow:true
    });
    grow.applyTo('grow');

});