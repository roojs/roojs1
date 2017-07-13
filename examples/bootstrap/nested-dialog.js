//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Example');

Example.NestedDialog = {

    dialog : false,
    callback:  false,
   
    show : function(data, cb)
    {
        if (!this.dialog) {
         this.create();
        }
      
        this.callback = cb;
        this.data = data;
        this.dialog.show(this.data._el);
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
            '|xns' : 'Roo.bootstrap',
            title : "Nested example",
            xtype : 'Modal',
            buttonPosition : 'center',
            buttons : Roo.bootstrap.Modal.OKCANCEL,
            xns : Roo.bootstrap,
            listeners : {
                btnclick : function (e)
                 {
                     if(e == 'cancel'){
                         _this.dialog.hide();
                         return;
                     }
                     
                     _this.form.doAction('submit');
                 }
           
            },
            items : [
                {
                    xtype : 'Border',
                    xns : Roo.bootstrap.layout,
                     west: {
                        xtype : 'Region',
                        xns: Roo.bootstrap.layout,
                        split:true,
                        tabPosition: 'top',
                        initialSize: 400,
                        titlebar: false,
                       // collapsible: true,
                        minSize: 100,
                        maxSize: 500,
                        cls : 'hidden-xs'
                    },
                    
                    center: {
                        xtype : 'Region',
                        xns: Roo.bootstrap.layout,
                        autoScroll: false,
                        tabPosition:'top',
                         titlebar: false
                    },
                    items : [
                        {
                            xtype : 'Content',
                            xns: Roo.bootstrap.panel,
                            title : "Title west" ,
                            fitToFrame:true,
                            closable:false,
                            region : 'west',
                            html: "west"
                        },
                        {
                            xtype : 'Content',
                            xns: Roo.bootstrap.panel,
                            title : "Title center" ,
                            fitToFrame:true,
                            closable:false,
                            region : 'center',
                            html: "center"
                        },
                        {
                            xtype : 'Content',
                            xns: Roo.bootstrap.panel,
                            title : "Title center 2" ,
                            fitToFrame:true,
                            closable:false,
                            region : 'center',
                            html: "center2"
                        }
                    ]
                }
            ]           
         });
    }
 
};
