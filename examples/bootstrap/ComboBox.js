

Roo.example = Roo.example || {};

Roo.example.combobox = new Roo.XComponent({
    part     :  ["layout","viewpanel"],
    order    : '001-viewpanel',
    region   : '',
    parent   : '#bootstrap',
    name     : "unnamed module",
    disabled : false, 
    permname : '', 
    _tree : function()
    {
        
        this.parent = {
            el : new Roo.bootstrap.Body()
        }
        this.parent.el.layout = false;
        this.parent.el.render(document.body);
        
        var _this = this;
        var MODULE = this;
        var baseURL = '/web.eventmanager/admin.php';
        
        return {
            xtype: 'Body',
            xns: Roo.bootstrap,
            items : [
                 {
                    xtype: 'Container',
                    xns: Roo.bootstrap,
                    style :  'margin-top:50px', 
                    "items": [
                                {
                                    "xtype": "Column",
                                    "|xns": "Roo.bootstrap",
                                    "md": "9",
                                    "listeners": {},
                                    "items": [
                                        {
                                            "xtype": "Container",
                                            "|xns": "Roo.bootstrap",
                                            "cls": "col-md-12",
                                            "items": [
                                                {
                                                    "xtype": "ComboBox",
                                                    "|xns": "Roo.bootstrap",
                                                    "cls": "roo-dynamic"
                                                }
                                            ]
                                        }
                                    ]
                                }
                 }
                  
            ]
        };
    }
});