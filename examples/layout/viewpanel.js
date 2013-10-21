//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

viewpanel = new Roo.XComponent({
    part     :  ["layout","viewpanel"],
    order    : '001-viewpanel',
    region   : '',
    parent   : '#view-panel',
    name     : "unnamed module",
    disabled : false, 
    permname : '', 
    _tree : function()
    {
        var _this = this;
        var MODULE = this;
        return {
            xtype: 'ContentPanel',
            xns: Roo,
            items : [
                {
                    xtype: 'View',
                    xns: Roo,
                    footer : {
                        xtype: 'PagingToolbar',
                        xns: Roo,
                        pageSize : 20
                    },
                    tpl : {
                        xtype: 'Template',
                        xns: Roo
                    },
                    store : {
                        xtype: 'Store',
                        xns: Roo.data,
                        listeners : {
                            beforeload : function (_self, o)
                            {
                                o.params = o.params || {};
                                o.params.test = 1;
                            }
                        },
                        proxy : {
                            xtype: 'HttpProxy',
                            xns: Roo.data,
                            method : 'POST',
                            url : get-images.php
                        },
                        reader : {
                            xtype: 'JsonReader',
                            xns: Roo.data,
                            id : 'id'
                        }
                    }
                }
            ],
            toolbar : {
                xtype: 'Toolbar',
                xns: Roo,
                items : [
                    {
                        xtype: 'Button',
                        xns: Roo.Toolbar
                    }
                ]
            }
        };
    }
});
