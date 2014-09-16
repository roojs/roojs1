//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Login = new Roo.XComponent({
    part     :  ["bootstrap", "Login" ],
    order    : '001-Login',
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
            cls : 'bg-black',
            xtype : 'Body',
            xns : Roo.bootstrap,
            items : [
            	{
                    cls : 'form-box',
                    xtype : 'Container',
                    xns : Roo.bootstrap,
                    items : [
                    	{
                            cls : 'header',
                            xtype : 'Element',
                            xns : Roo.bootstrap,
                            html : 'Sign in'
                        },
                    	{
                            xtype : 'Form',
                            xns : Roo.bootstrap
                        }
                    ]

                }
            ]

        };    }
});
