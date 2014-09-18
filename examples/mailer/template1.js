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
                            blocktype : 'row',
                            xtype : 'Block',
                            xns : Roo.mailer,
                            items : [
                            	{
                                    xtype : 'Column',
                                    column : 'left',
                                    xns : Roo.mailer,
                                    src : 'http://gallery.mailchimp.com/27aac8a65e64c994c4416d6b8/images/header_placeholder_260px.png',
                                    html : 'test'
                                },
                            	{
                                    xtype : 'Column',
                                    xns : Roo.mailer,
                                    column : 'right',
                                    src : 'http://gallery.mailchimp.com/27aac8a65e64c994c4416d6b8/images/header_placeholder_260px.png',
                                    html : 'test2'
                                }
                            ]

                        },
                    	{
                            blocktype : 'footer',
                            xtype : 'Block',
                            html : 'test footer',
                            xns : Roo.mailer
                        }
                    ]

                }
            ]

        };    }
});
