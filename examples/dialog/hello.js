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
Roo.onReady(HelloWorld.init, HelloWorld, true);