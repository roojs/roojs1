

Roo.example = Roo.example || {};

Roo.example.bootstrap = new Roo.XComponent({
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
            el : new Roo.bootstrap.Body(),
        }
        this.parent.el.layout = false;
        this.parent.el.render(document.body);
        
        var _this = this;
        var MODULE = this;
        return {
            xtype: 'Body',
            xns: Roo.bootstrap,
            items : [
                 {
                    xtype: 'Navbar',
                    cls : 'navbar-fixed-top navbar-inverse',
                    role : 'navigation',
                    xns: Roo.bootstrap,
                    items : [
                                
                        {
                            xtype: 'Item',
                            xns: Roo.bootstrap.Navbar,
                            html: "hello",
                            href : 'http://roojs.com'
                        },
                                
                        {
                            xtype: 'Dropdown',
                            xns: Roo.bootstrap.Navbar,
                            items : [
                                {
                                    xtype: 'Item',
                                    xns: Roo.bootstrap.Navbar.Dropdown,
                                    html: "hello",
                                    href : 'http://roojs.com'
                                }   ,
                                {
                                    xtype: 'Item',
                                    xns: Roo.bootstrap.Navbar.Dropdown,
                                    html: "hello",
                                    href : 'http://roojs.com'
                                }   
                            ]
                        }            
                    ]
                },
                {
                    xtype: 'Container',
                    xns: Roo.bootstrap,
                    style :  'margin-top:60px', 
                    html : '<h1> hello world </h1><p>test</p>'
                },
                {
                    xtype: 'Container',
                    xns: Roo.bootstrap,
                    style :  'margin-top:50px', 
                    items : [
                        {
                            xtype: 'Row',
                            xns: Roo.bootstrap,
                            items : [
                                
                                {
                                    xtype: 'Column',
                                    xns: Roo.bootstrap,
                                    colspan : 12,
                                    items : [
                                        
                                        {
                                            xtype: 'Navbar',
                                            xns: Roo.bootstrap,
                                            items : [
                                                        
                                                {
                                                    xtype: 'Item',
                                                    xns: Roo.bootstrap.Navbar,
                                                    html: "hello",
                                                    href : 'http://roojs.com'
                                                },
                                                        
                                                {
                                                    xtype: 'Dropdown',
                                                    xns: Roo.bootstrap.Navbar,
                                                    items : [
                                                        {
                                                            xtype: 'Item',
                                                            xns: Roo.bootstrap.Navbar.Dropdown,
                                                            html: "hello",
                                                            href : 'http://roojs.com'
                                                        }   ,
                                                        {
                                                            xtype: 'Item',
                                                            xns: Roo.bootstrap.Navbar.Dropdown,
                                                            html: "hello",
                                                            href : 'http://roojs.com'
                                                        }   
                                                    ]
                                                }            
                                            ]
                                        }
                                                
                                                
                                    ]
                                        
                                }
                            ]
                    
                        }
                    ]
                },
                {
                    xtype: 'Container',
                    xns: Roo.bootstrap,
                    style :  'margin-top:60px', 
                    items : [
                        {
                            xtype: 'Button',
                            xns : Roo.bootstrap
                        },
                         {
                            xtype: 'Button',
                            xns : Roo.bootstrap,
                            active: true
                        },
                        {
                            xtype: 'Button',
                            xns : Roo.bootstrap,
                            weight: 'primary'
                        },
                        {
                            xtype: 'Button',
                            xns : Roo.bootstrap,
                            weight: 'success',
                        },
                        {
                            xtype: 'Button',
                            xns : Roo.bootstrap,
                            weight: 'info',
                            size : 'lg',
                        },
                        {
                            xtype: 'Button',
                            xns : Roo.bootstrap,
                            weight: 'warning',
                        },
                        {
                            xtype: 'Button',
                            xns : Roo.bootstrap,
                            weight: 'danger',
                            size : 'sm',
                        },
                        {
                            xtype: 'Button',
                            xns : Roo.bootstrap,
                            weight: 'danger',
                            size : 'xs',
                        },
                        {
                            xtype: 'Button',
                            xns : Roo.bootstrap,
                            weight: 'link',
                            tag: 'a',
                            href: 'http://www.roojs.com'
                        },
                        {
                            xtype: 'Button',
                            xns : Roo.bootstrap,
                            tag: 'input'
                        },
                        {
                            xtype: 'Button',
                            xns : Roo.bootstrap,
                            tag: 'submit'
                        },
                        {
                            xtype: 'Button',
                            xns : Roo.bootstrap,
                            disabled: true
                        },
                        {
                            xtype: 'Button',
                            xns : Roo.bootstrap,
                            isClose: true
                        },
                        {
                            xtype: 'Button',
                            xns : Roo.bootstrap,
                            glyphicon: 'search'
                        },
                        {
                            xtype: 'Button',
                            xns : Roo.bootstrap,
                            items: [
                                {
                                    xtype: 'Button',
                                    xns : Roo.bootstrap,
                                }
                            ]
                        },
                        {
                            xtype: 'Button',
                            xns : Roo.bootstrap,
                            weight: 'primary',
                            badge: '42',
                        }
                    ]
                },
            ]
        };
    }
});