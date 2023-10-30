Roo.example = Roo.example || {};

Roo.example.calendar = new Roo.XComponent({
    part     :  ["layout","viewpanel"],
    order    : '001-viewpanel',
    region   : '',
    parent   : '#bootstrap',
    name     : "unnamed module",
    disabled : false, 
    permname : '', 
    _tree : function()
    {   

        return {
            xtype: 'Body',
            xns: Roo.bootstrap,
            items : [
                 {
                    xtype: 'Container',
                    xns: Roo.bootstrap,
                    items : [
                        {
                            xtype: 'Row',
                            xns: Roo.bootstrap,
                            items : [
                                { 
                                    xtype: 'Form',
                                    xns: Roo.bootstrap,
                                    items : [
                                        {
                                            xtype: 'HtmlEditor',
                                            xns: Roo.bootstrap
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                 },
                  
            ]
        };
    }
});