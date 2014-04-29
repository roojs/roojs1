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
var editor;
Roo.onReady(function(){

    Roo.QuickTips.init();

 
    /*
     * ================  Form 2  =======================
     */
    mform = new Roo.form.Form({
        labelAlign: 'top',
        items : [
            {
                xtype : 'HtmlEditor',
                xns: Roo.form,
           /*     toolbars : [    
                    {
                        xtype : 'ToolbarStandard',
                        xns : Roo.form.HtmlEditor
                    },
                      {
                        xtype : 'ToolbarContext',
                        xns : Roo.form.HtmlEditor,
                        styles : {
                            '*' : [ 'headline' ] ,
                            'TD' : [ 'underline', 'double-underline' ]
                        }
                    },
                    
                    
                ],
                */
                id:'bio',
                name : 'bio',
                fieldLabel:'Biography',
                width:800,
                height:400,
                resizable: 's' /// where the handles should got..

            },
            {
                xtype : 'Button',
                xns: Roo.form,
                text: 'Save'
            },
            {
                xtype : 'Button',
                xns: Roo.form,
                text: 'Cancel'
            }
            
        ]
        
    });

    mform.render('form-ct5');
    editor = mform.findField('bio');
});