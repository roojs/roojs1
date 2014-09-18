//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

template1 = new Roo.XComponent({
    part     :  ["mailer", "template1" ],
    order    : '001-template-',
    region   : 'center',
    parent   : false,
    name     : "unnamed module",
    disabled : false, 
    permname : '', 
    _tree : function()
    {
        var _this = this;
        var MODULE = this;
        return {
            xtype : 'Body',
            xns : Roo.mailer,
            items : [
            	{
                    xtype : 'BodyContainer',
                    xns : Roo.mailer,
                    items : [
                    	{
                            blocktype : 'header',
                            xtype : 'Block',
                            html : 'test',
                            xns : Roo.mailer
                        },
                    	{
                            blocktype : 'body',
                            xtype : 'Block',
                            html : 'test',
                            xns : Roo.mailer
                        },
                    	{
                            blocktype : 'body',
                            xtype : 'Block',
                            html : 'test',
                            xns : Roo.mailer,
                            items : [
                            	{
                                    xtype : 'Column',
                                    xns : Roo.mailer
                                }
                            ]

                        },
                    	{
                            blocktype : 'footer',
                            xtype : 'Block',
                            html : 'test',
                            xns : Roo.mailer
                        }
                    ]

                }
            ]

        };    }
});
