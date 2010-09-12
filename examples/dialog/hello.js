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

Roo.BLANK_IMAGE_URL  = "../../images/default/s.gif";



HelloWorld = {

    dialog : false,
    callback:  false,

    show : function(data, cb)
    {
        // standard code example..
        if (!this.dialog) {
            this.create();
        }

        this.callback = cb;
        this.data = data;
        this.dialog.show(data._el ? data._el : false);
        if (this.form) {
           this.form.reset();
           this.form.setValues(data);
           this.form.fireEvent('actioncomplete', this.form,  { type: 'setdata', data: data });
        }

    },

    create : function()
    {
        var _this = this;
        this.dialog = Roo.factory({
            xns : Roo,
            xtype : 'BasicDialog',
            autoTabs:true,
            width:500,
            height:300,
            shadow:true,
            minWidth:300,
            minHeight:250,
            proxyDrag: true,
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
                }
                buttons : [
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
            listeners : {
                keydown : function(dlg, e) {
                    var k = e.getKey(); 
                    if(k == 27){ _this.dialog.hide(); }  
                }
            }
            
        });
            
    }
};                


// create the HelloWorld application (single instance)
var HelloWorld = function(){
    // everything in this space is private and only accessible in the HelloWorld block
    
    // define some private variables
    var dialog, showBtn;
    
    // return a public interface
    return {
        init : function(){
             showBtn = Roo.get('show-dialog-btn');
             // attach to click event
             showBtn.on('click', this.showDialog, this);
        },
       
        showDialog : function(){
            if(!dialog){ // lazy initialize the dialog and only create it once
                dialog = new Roo.BasicDialog("hello-dlg", { 
                        autoTabs:true,
                        width:500,
                        height:300,
                        shadow:true,
                        minWidth:300,
                        minHeight:250,
                        proxyDrag: true
                });
                dialog.addKeyListener(27, dialog.hide, dialog);
                dialog.addButton('Submit', dialog.hide, dialog).disable();
                dialog.addButton('Close', dialog.hide, dialog);
            }
            dialog.show(showBtn.dom);
        }
    };
}();

// using onDocumentReady instead of window.onload initializes the application
// when the DOM is ready, without waiting for images and other resources to load
Roo.onReady(function() {
    var showBtn = Roo.get('show-dialog-btn');
    showBtn.on('click',function () {
        HelloWorld.show({ _el, this});
    });
});