Roo.example = Roo.example || {};

Roo.example.multiLineTag = new Roo.XComponent({
    part     :  ["example","multiLineTag"],
    order    : '001-viewpanel',
    region   : '',
    parent   : false,
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
                                            xtype: 'MultiLineTag',
                                            xns: Roo.bootstrap.form,
                                            listeners : {
                                                beforeload : function(_self, store, options) {
                                                    options.params = options.params || {};
                                                    options.params._clients = 1;
                                                },
                                                change : function(_self, newValue, oldValue) {
                                                    Roo.log('onCHANGE');
                                                    Roo.log(newValue);
                                                    Roo.log(_self.getValue());
                                                }
                                            }
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