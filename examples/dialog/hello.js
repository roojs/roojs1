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



var HelloWorld = {

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
            xtype : 'LayoutDialog',
            autoTabs:true,
            width:500,
            height:300,
            shadow:true,
            minWidth:300,
            minHeight:250,
            proxyDrag: true,
            listeners : {
                show : function() {
                    var p = this.layout.getRegion('center').getPanel(0);
                    p.setContent("Hello World");
                    
                },
                keydown : function(dlg, e) {
                    var k = e.getKey(); 
                    if(k == 27){ _this.dialog.hide(); }  
                }
            },
            center : {
                xtype: 'LayoutRegion',
                xns: Roo
            },
            items : [
                {
                    xtype: 'Content',
                    xns: Roo.panel,
                    region : "center"
                    
                }
            ],
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
            ]
            
        });
            
    }
};                
 

// using onDocumentReady instead of window.onload initializes the application
// when the DOM is ready, without waiting for images and other resources to load
Roo.onReady(function() {
    
    Roo.get('show-dialog-btn').on('click',function () {
        HelloWorld.show({ _el : this});
    });
});