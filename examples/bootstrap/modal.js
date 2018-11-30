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
        var baseURL = '/web.eventmanager/demo.local.php';
        
        return {
            xtype: 'Modal',
            xns: Roo.bootstrap,
            title : "Login",
            buttons : Roo.bootstrap.Modal.OKCANCEL,
            listeners : {
                btnclick : function (name, e) {
                    if(name == 'cancel'){
                        _this.loginModal.hide();
                    }
                    
                    Roo.log(name);
                },
                render : function (_self) {
                    _this.loginModal = _self;
                }
            },
            items : [
                
                {
                    xtype: 'Container',
                    xns: Roo.bootstrap,
                    well : 'md',
                    style : 'margin-top:20px',
                    items : [
                        {
                            xtype: 'Form',
                            xns: Roo.bootstrap,
                            listeners : {
                                actioncomplete : function (_self, action) {
                                    if (action.type =='submit') {
                                        _this.loginModal.hide();
                                    }
                                }
                            },
                            items : [
                                {
                                    xtype: 'Input',
                                    xns: Roo.bootstrap,
                                    fieldLabel : 'Email',
                                    inputType : 'email',
                                    vtype : 'email'
                                },
                                {
                                    xtype: 'Input',
                                    xns: Roo.bootstrap,
                                    fieldLabel : 'Password',
                                    inputType : 'password'
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    }
});