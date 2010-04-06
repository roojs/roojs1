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

    // turn on validation errors beside the field globally
    Roo.form.Field.prototype.msgTarget = 'side';

    var fs = new Roo.form.Form({
        //labelAlign: 'right',
        labelWidth: 120,
        waitMsgTarget: 'box-bd',

        // configure how to read the XML Data
        reader : new Roo.data.XmlReader({
            record : 'contact',
            success: '@success'
        }, [
            {name: 'first', mapping:'name/first'}, // custom mapping
            {name: 'last', mapping:'name/last'},
            'company', 'email', 'state',
            {name: 'dob', type:'date', dateFormat:'m/d/Y'} // custom data types
        ]),

        // reusable eror reader class defined at the end of this file
        errorReader: new Roo.form.XmlErrorReader()
    });

    fs.fieldset(
        {legend:'Contact Information'},
        new Roo.form.TextField({
            fieldLabel: 'First Name',
            name: 'first',
            width:190
        }),

        new Roo.form.TextField({
            fieldLabel: 'Last Name',
            name: 'last',
            width:190
        }),

        new Roo.form.TextField({
            fieldLabel: 'Company',
            name: 'company',
            width:190
        }),

        new Roo.form.TextField({
            fieldLabel: 'Email',
            name: 'email',
            vtype:'email',
            width:190
        }),

        new Roo.form.ComboBox({
            fieldLabel: 'State',
            hiddenName:'state',
            store: new Roo.data.SimpleStore({
                fields: ['abbr', 'state'],
                data : Roo.exampledata.states // from states.js
            }),
            valueField:'abbr',
            displayField:'state',
            typeAhead: true,
            mode: 'local',
            triggerAction: 'all',
            emptyText:'Select a state...',
            selectOnFocus:true,
            width:190
        }),

        new Roo.form.DateField({
            fieldLabel: 'Date of Birth',
            name: 'dob',
            width:190,
            allowBlank:false
        })
    );

    // simple button add
    fs.addButton('Load', function(){
        fs.load({url:'xml-form.xml', waitMsg:'Loading'});
    });

    // explicit add
    var submit = fs.addButton({
        text: 'Submit',
        disabled:true,
        handler: function(){
            fs.submit({url:'xml-errors.xml', waitMsg:'Saving Data...'});
        }
    });

    fs.render('form-ct');

    fs.on({
        actioncomplete: function(form, action){
            if(action.type == 'load'){
                submit.enable();
            }
        }
    });

});

// A reusable error reader class for XML forms
Roo.form.XmlErrorReader = function(){
    Roo.form.XmlErrorReader.superclass.constructor.call(this, {
            record : 'field',
            success: '@success'
        }, [
            'id', 'msg'
        ]
    );
};
Roo.extend(Roo.form.XmlErrorReader, Roo.data.XmlReader);