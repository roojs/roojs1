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
 
var mform;
var simple;
var signature;

Roo.onReady(function(){

    Roo.QuickTips.init();

    // turn on validation errors beside the field globally
    Roo.form.Field.prototype.msgTarget = 'side';

    /*
     * ================  Simple form  =======================
     */
    simple = new Roo.form.Form({
        labelWidth: 75, // label settings here cascade unless overridden
        url:'save-form.php'
    });
    simple.add(
        new Roo.form.TextField({
            fieldLabel: 'First Name',
            name: 'first',
            width:175,
            allowBlank:false
        }),

        new Roo.form.TextField({
            fieldLabel: 'Last Name',
            name: 'last',
            width:175
        }),

        
        
        new Roo.form.TextField({
            fieldLabel: 'Company',
            name: 'company',
            width:175
        }),
        new Roo.form.TextField({
            fieldLabel: 'Password',
            name: 'pwd',
            inputType: 'password',
            width:175
        }),

        new Roo.form.TextField({
            fieldLabel: 'Email',
            name: 'email',
            vtype:'email',
            width:175
        }),
        new Roo.form.DayPicker({
            fieldLabel: 'Pick a day',
            name: 'daypick',
            width:175
        })
    );

    simple.addButton('Save');
    simple.addButton('Cancel');

    simple.render('form-ct');


    /*
     * ================  Form 2  =======================
     */
    mform = new Roo.form.Form({
        labelAlign: 'top',
        items : [
            
            {
                
                xtype : 'Column', 
                width: 500, // precise column sizes or percentages or straight CSS
                items : [
                    {
                        xtype : 'ComboBoxArray',
                        xns : Roo.form,
                        fieldLabel: 'Multi select test',
                        name: 'countryNames',
                        hiddenName: 'country',
                        
                        width: 550,
                        combo : {
                            
                            valueField : 'abbr',
                            displayField : 'state',
                            
                            name : 'countryNames',
                            hiddenName : 'country',
                            
                            xtype : 'ComboBox',
                            xns : Roo.form,
                            store: {
                                xtype : 'SimpleStore',
                                xns: Roo.data,
                                fields: ['abbr', 'state'],
                                data : Roo.exampledata.states // from states.js    
                            },
                            width: 200,
                            listWidth : 300,
                            editable : false,
                            
                            typeAhead: false,
                            mode: 'local',
                            triggerAction: 'all',
                            emptyText:'Select a state...',
                            selectOnFocus:true,
                            resizable:true
                        }
                        
                        
                    }
                    
                ]
            },
            
            
            {
                
                xtype : 'Column', 
                width: 500, // precise column sizes or percentages or straight CSS
                items : [
                    {
                        xtype : 'ComboBoxArray',
                        xns : Roo.form,
                        fieldLabel: 'Multi select test',
                        
                        
                        name: 'countrylist_names',
                        hiddenName: 'countrylist',
                        
                        width: 550,
                        combo : {
                            
                            valueField : 'code',
                            displayField : 'title',
                            
                            // thes are not really needed as parent overwrites them!?
                            name : 'country_name',
                            hiddenName : 'country',
                            
                            xtype : 'ComboBox',
                            xns : Roo.form,
                            
                            
                             
        
                            
                            store: {
                                xtype : 'Store',
                                xns: Roo.data,
                                
                                proxy: {
                                    xns : Roo.data,
                                    xtype : 'ScriptTagProxy',
                                    url: 'http://www.roojs.com/forum/topics-remote.php'
                                },
                                reader: {
                                    xns : Roo.data,
                                    xtype : 'JsonReader',
                                    root: 'topics',
                                    totalProperty: 'totalCount',
                                    id: 'post_id',
                                    fields : [
                                        {name: 'title', mapping: 'topic_title'},
                                        {name: 'topicId', mapping: 'topic_id'},
                                        {name: 'author', mapping: 'author'},
                                        {name: 'lastPost', mapping: 'post_time', type: 'date', dateFormat: 'timestamp'},
                                        {name: 'excerpt', mapping: 'post_text'}
                                    ]
                                }
                            },
                            width: 200,
                            listWidth : 300,
                            editable : false,
                            
                            typeAhead: false,
                            mode: 'local',
                            triggerAction: 'all',
                            emptyText:'Select a state...',
                            selectOnFocus:true,
                            resizable:true
                        }
                        
                        
                    }
                    
                ]
            },
            
           

            
            
            
            {
                
                xtype : 'Column', 
                width: 272, // precise column sizes or percentages or straight CSS
                items : [
                    {
                        xtype : 'TextField',
                        fieldLabel: 'First Name',
                        name: 'first',
                        width:225
                    },
                    {
                        xtype : 'TextField',
                        fieldLabel: 'Company',
                        name: 'company',
                        width:225
                    }
                ]
            },
    
            {
                xtype : 'Column', 
                width:272, 
                style:'margin-left:10px', 
                clear:true,
                items : [
                    {
                        xtype : 'TextField',
                        fieldLabel: 'Last Name',
                        name: 'last',
                        width:225
                    },
                    {
                        xtype : 'TextField',
                        fieldLabel: 'Email',
                        name: 'email',
                        vtype:'email',
                        width:225
                    },
                    
                    {
                        xtype : 'Select',
                        fieldLabel: 'Country',
                        name: 'scountry',
                        //vtype:'email',
                        width:225,
                        valueField :'code',
                        displayField  : 'title',
                        emptyText : 'Select a country',
                        store: {
                             xtype : 'Store',
                             xns: Roo.data,
                             
                             proxy: {
                                 xns : Roo.data,
                                 xtype : 'HttpProxy',
                                 url: 'sample.data.json'
                             },
                             reader: {
                                 xns : Roo.data,
                                 xtype : 'JsonReader',
                                 root: 'data',
                                 totalProperty: 'totalCount',
                                 id: 'post_id',
                                 fields : [
                                     'code', 'title'
                                 ]
                             }
                         },
                    }
                ]
            },
            
            
            
            {
                  
                xtype : 'Column', 
                width:600, 
                labelAlign: 'top',
                items : [
                    {
                        xtype : 'HtmlEditor',
                        name : 'bio',
                        fieldLabel:'Biography',
                        width:550,
                        height:200,
                        resizable: 's', /// where the handles should got..
                        toolbars : [ 'ToolbarStandard', 'ToolbarContext' ]  
                    }
                ]
            }
        ] 
       
    });
    mform.addButton('Save');
    mform.addButton('Cancel');

   /*
    mform.render('form-ct2');
    mform.setValues({
        country  : 'AK,LA',
        countryNames : 'Alaska,Louisana',
        countrylist  : 'AG,AZ',
        countrylist_names : 'Antigua and Barbuda,Azerbaijan'        
    });
    */
    /*
     * ================  Form 3  =======================
     */
    var fs = new Roo.form.Form({
        labelAlign: 'right',
        labelWidth: 80
    });

    fs.fieldset(
        {legend:'Contact Information', style: 'width:320px;' },
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
        }),
        new Roo.form.MonthField({
            fieldLabel: 'Date of Month',
            name: 'dom',
            width:190,
            allowBlank:false
        })
    );

    fs.addButton('Save');
    fs.addButton('Cancel');

    fs.render('form-ct3');

    /*
     * ================  Form 4  =======================
     */
    var form = new Roo.form.Form({
        labelAlign: 'right',
        labelWidth: 75
    });

    form.column({width:342, labelWidth:75}); // open column, without auto close
    form.fieldset(
        {legend:'Contact Information'},
        new Roo.form.TextField({
            fieldLabel: 'Full Name',
            name: 'fullName',
            allowBlank:false,
            value: 'Fred Blogs'
        }),

        new Roo.form.TextField({
            fieldLabel: 'Job Title',
            name: 'title',
            value: 'RooJS user'
        }),

        new Roo.form.TextField({
            fieldLabel: 'Company',
            name: 'company',
            value: 'RooJS'
        }),

        new Roo.form.TextArea({
            fieldLabel: 'Address',
            name: 'address',
            grow: true,
            preventScrollbars:true,
            value: '123 example drive'
        })
    );
    form.fieldset(
        {legend:'Phone Numbers'},
        new Roo.form.TextField({
            fieldLabel: 'Home',
            name: 'home',
            value: '(123) 456 789'
        }),

        new Roo.form.TextField({
            fieldLabel: 'Business',
            name: 'business'
        }),

        new Roo.form.TextField({
            fieldLabel: 'Mobile',
            name: 'mobile'
        }),

        new Roo.form.TextField({
            fieldLabel: 'Fax',
            name: 'fax'
        })
    );
    form.end(); // closes the last container element (column, layout, fieldset, etc) and moves up 1 level in the stack

    
    form.column(
        {width:202, style:'margin-left:10px', clear:true}
    );

    form.fieldset(
        {id:'photo', legend:'Photo'}
    );
    form.end();

    form.fieldset(
        {legend:'Options', hideLabels:true},
        new Roo.form.Checkbox({
            boxLabel:'RooJS v1.1.1',
            name:'extuser',
            width:'auto'
        }),
        new Roo.form.Checkbox({
            boxLabel:'RooJS v2.0.0',
            name:'extcomm',
            width:'auto'
        }),
        new Roo.form.Checkbox({
            boxLabel:'RooScript',
            name:'extprem',
            width:'auto'
        })
        
    );

    form.end(); // close the column

    
    form.applyIfToFields({
        width:230
    });

    form.addButton('Save');
    form.addButton('Cancel');

    form.render('form-ct4');

    // The form elements are standard HTML elements. By assigning an id (as we did above)
    // we can manipulate them like any other element
    var photo = Roo.get('photo');
    var c = photo.createChild({
        tag:'center', 
        cn: {
            tag:'img',
            src: 'roojs_icon.jpg',
            style:'margin-bottom:5px;'
        }
    });
    new Roo.Button(c, {
        text: 'Change Photo'
    });
    
   form5 = new Roo.form.Form({
        labelAlign: 'left',
        labelWidth: 120,
        items : [
            {
            
                xtype: 'Checkbox',
                xns : Roo.form,
                fieldLabel: 'A checkbox',
                boxLabel:'RooJS v1.1.1',
                name:'extuser',
                inputValue : '1',
                value : '1',
                width:'auto'
            },
            
            {
            
                xtype: 'Radio',
                xns : Roo.form,
                fieldLabel: 'A test radio box',
                boxLabel:'Test1',
                name:'radiotest',
                inputValue : '1',
                width:'auto'
            },
              {
            
                xtype: 'Radio',
                xns : Roo.form,
                fieldLabel: 'A test radio box2',
                boxLabel:'Test1',
                name:'radiotest',
                inputValue : '2',
                checked: true,
                width:'auto'
            },
            {
            
                xtype: 'Checkbox',
                xns : Roo.form,
               fieldLabel: 'A checkbox',
                boxLabel:'RooJS v1.1.1',
                name:'extuser',
                inputValue : '1',
                value : '1',
                width:'auto'
            },
            
            
            {
                xtype : 'DisplayField',
                xns : Roo.form,
                name:'textex',
                fieldLabel: 'Simple',
                value : 'example text'
            } ,
            {
                xtype: 'ComboBox',
                xns : Roo.form,
                fieldLabel: 'State',
                hiddenName:'state',
                store: {
                    xtype: 'SimpleStore',
                    xns : Roo.data,
                    fields: ['abbr', 'state'],
                    data : Roo.exampledata.states // from states.js
                },
                displayField:'state',
                typeAhead: true,
                mode: 'local',
                triggerAction: 'all',
                emptyText:'Select a state...',
                selectOnFocus:true,
                width:190,
                listeners : {
                    add : function()
                    {
                        Roo.MessageBox.alert("Alert", "Add Pressed");
                    },
                    edit : function()
                    {
                        Roo.MessageBox.alert("Alert", "Edit Pressed");
                    }
                    
                }
            },
        
        ]
    });
    
    form5.render('form-ct5');
 
    
//    form6 = new Roo.form.Form({
//        labelAlign: 'left',
//        labelWidth: 120,
//        items : [
//            {
//            
//                xtype: 'TimePicker',
//                xns : Roo.form,
//                fieldLabel: 'test time picker',
//                name: 'time'
//            },
//            {
//                xtype: 'DateDisplay',
//                xns : Roo.form,
//                fieldLabel: 'test date picker',
//                name: 'date'
//            }
//             
//        
//        ]
//    });
//    
//    form6.render('form-ct6');
    
    
    
    /*
     * ================ form 7 =======================
     */
    signature = new Roo.form.Form({
        labelWidth: 75, // label settings here cascade unless overridden
        url:'save-form.php',
        width: 500
    });
    signature.add(
        new Roo.form.Signature({
            fieldLabel: 'Signature',
            name: 's',
            listeners : {
                confirm : function (_self)
                {
                    Roo.log(_self.getImageDataURI());
                    Roo.log('in confirm');
                }
            },
            width: 300
        })
    );
//
//    form7.addButton('Save');
//    form7.addButton('Cancel');

    signature.render('form-ct7');
    
    
    
    
    
});