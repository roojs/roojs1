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
 
// create the LayoutExample application (single instance)
var LayoutExample = function(){
    // everything in this space is private and only accessible in the HelloWorld block
    
    // define some private variables
    var dialog, showBtn;
    
    var toggleTheme = function(){
        Roo.get(document.body, true).toggleClass('xtheme-gray');
    };
    // return a public interface
    return {
        init : function(){
             showBtn = Roo.get('show-dialog-btn');
             // attach to click event
             showBtn.on('click', this.showDialog, this);
             
        },
        
        showDialog : function(){
            if(!dialog){ // lazy initialize the dialog and only create it once
                dialog = new Roo.LayoutDialog("hello-dlg", { 
                        modal:true,
                        width:600,
                        height:400,
                        shadow:true,
                        minWidth:300,
                        minHeight:300,
                        proxyDrag: true,
                        west: {
	                        split:true,
	                        initialSize: 150,
	                        minSize: 100,
	                        maxSize: 250,
	                        titlebar: true,
	                        collapsible: true,
	                        animate: true
	                    },
	                    center: {
	                        autoScroll:true,
	                        tabPosition: 'top',
	                        closeOnTab: true,
	                        alwaysShowTabs: true
	                    }
                });
                dialog.addKeyListener(27, dialog.hide, dialog);
                dialog.addButton('Submit', dialog.hide, dialog);
                dialog.addButton('Close', dialog.hide, dialog);
                
                var layout = dialog.getLayout();
                layout.beginUpdate();
                layout.add('west', new Roo.panel.Content('west', {title: 'West'}));
	            layout.add('center', new Roo.panel.Content('center', {title: 'The First Tab'}));
                // generate some other tabs
                layout.add('center', new Roo.panel.Content(Roo.id(), {
                                        autoCreate:true, title: 'Another Tab', background:true}));
	            layout.add('center', new Roo.panel.Content(Roo.id(), {
                                        autoCreate:true, title: 'Third Tab', closable:true, background:true}));
	            layout.endUpdate();
            }
            dialog.show(showBtn.dom);
        }
    };
}();

// using onDocumentReady instead of window.onload initializes the application
// when the DOM is ready, without waiting for images and other resources to load
Roo.EventManager.onDocumentReady(LayoutExample.init, LayoutExample, true);