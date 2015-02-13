

Roo.example = Roo.example || {};

Roo.example.Editor = new Roo.XComponent({
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
        var baseURL = '/web.campaign/index.local.php';
        
//        Roo.Ajax.request({
//            url : baseURL + '/CampaignEdit/237',
//            method: 'GET',
//            params: {
//                _editor : 1
//            },
//            success : function(r)
//            {
//                Roo.log(r);
//            }
//        });
        
        return {
            xtype: 'Body',
            xns: Roo.bootstrap,
            items : [
                 {
                    xtype : 'Container',
                    cls : 'content',
                    xns : Roo.bootstrap,
                    style : 'margin-top:100px',
                    items : [
                    	{
                            xtype : 'Container',
                            cls : 'pad-wrapper',
                            xns : Roo.bootstrap,
                            items : [
                            	{
                                    xtype : 'Container',
                                    cls : 'container alpha',
                                    xns : Roo.bootstrap,
                                    listeners : {
                                        render : function (_self)
                                        {
                                            _this.panel = _self;
                                        }
                                    }

                                }
                            ]

                        }
                    ]

                }
            ]
        };
    }
});