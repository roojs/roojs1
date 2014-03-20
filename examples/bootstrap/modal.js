/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



Roo.example = Roo.example || {};

Roo.example.modal = new Roo.XComponent({
    part     :  ["layout","modal"],
    order    : '001-modal',
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
            xtype: 'Modal',
            xns: Roo.bootstrap,
            title : "Login",
            buttons : Roo.bootstrap.Modal.OKCANCEL,
            items : [
                {
                    xtype: 'Row',
                    xns: Roo.bootstrap,
                    items : [
                        {
                            xtype: 'Container',
                            xns: Roo.bootstrap,
                            items : [
                                {
                                    xtype: 'Button',
                                    xns: Roo.bootstrap,
                                    html : 'LinkedIn'
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    }
});