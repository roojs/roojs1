//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

viewpanel = new Roo.XComponent({
    part     :  ["layout","viewpanel"],
    order    : '001-viewpanel',
    region   : '#view-panel',
    parent   : false,
    name     : "unnamed module",
    disabled : false, 
    permname : '', 
    _tree : function()
    {
        var _this = this;
        var MODULE = this;
        return {
            xtype: 'ViewPanel',
            xns: Roo,
            view : {
                xtype: 'View',
                xns: Roo,
                tpl : {
                    xtype: 'Template',
                    xns: Roo
                },
                store : {
                    xtype: 'Store',
                    xns: Roo.data,
                    proxy : {
                        xtype: 'HttpProxy',
                        xns: Roo.data
                    },
                    reader : {
                        xtype: 'JsonReader',
                        xns: Roo.data
                    }
                }
            }
        };
    }
});
