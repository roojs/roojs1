

Roo.example = Roo.example || {};

Roo.example.bootstrap = new Roo.XComponent({
    part     :  ["layout","viewpanel"],
    order    : '001-viewpanel',
    region   : '',
    parent   : '#bootstrap',
    name     : "unnamed module",
    disabled : false, 
    permname : '', 
    _tree    : function() {
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
            items: [
                {
                    xtype: 'Navbar',
                    xns: Roo.bootstrap,
                    bar: true,
                    position: 'static-top',
                    inverse: true,
                    brand: '<img src="http://detail.herokuapp.com/img/logo.png" alt="logo">',
                    collapse: true,
                    items: [
                        {
                            xtype: 'NavGroup',
                            xns: Roo.bootstrap,
                            align: 'right',
                            items: [
                                {
                                    xtype: 'Item',
                                    xns: Roo.bootstrap.Navbar,
                                    href: '#',
                                    html: "hello",
                                    badge: 'test',
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'Navbar',
                    xns: Roo.bootstrap,
                    sidebar: true,
                    items: [
                        {
                            xtype: 'NavGroup',
                            xns: Roo.bootstrap,
                            items: [
                                {
                                    xtype: 'Item',
                                    xns: Roo.bootstrap.Navbar,
                                    href: '#',
                                    glyphicon: 'home',
                                    html: 'Hello'
                                },
                                {
                                    xtype: 'Item',
                                    xns: Roo.bootstrap.Navbar,
                                    href: '#',
                                    glyphicon: 'stats',
                                    html: 'Charts'
                                },
                                {
                                    xtype: 'Item',
                                    xns: Roo.bootstrap.Navbar,
                                    href: '#',
                                    glyphicon: 'user',
                                    html: 'Users',
                                    active: true,
                                    menu:  {
                                            xtype: 'Menu',
                                            xns: Roo.bootstrap,
                                            type: 'submenu',
                                            items : [
                                                {
                                                    xtype: 'MenuItem',
                                                    xns: Roo.bootstrap,
                                                    html: "User list",
                                                    href : 'http://roojs.com'
                                                },
                                                {
                                                    xtype: 'MenuItem',
                                                    xns: Roo.bootstrap,
                                                    html: "New user form",
                                                    href : 'http://roojs.com'
                                                },
                                                {
                                                    xtype: 'MenuItem',
                                                    xns: Roo.bootstrap,
                                                    html: "User profile",
                                                    href : 'http://roojs.com'
                                                }
                                            ]
                                        }
                                },
                                {
                                    xtype: 'Item',
                                    xns: Roo.bootstrap.Navbar,
                                    href: '#',
                                    glyphicon: 'edit',
                                    html: 'Forms'
                                },
                                {
                                    xtype: 'Item',
                                    xns: Roo.bootstrap.Navbar,
                                    href: '#',
                                    glyphicon: 'picture',
                                    html: 'Gallery'
                                },
                                {
                                    xtype: 'Item',
                                    xns: Roo.bootstrap.Navbar,
                                    href: '#',
                                    glyphicon: 'calendar',
                                    html: 'Calendar'
                                },
                                {
                                    xtype: 'Item',
                                    xns: Roo.bootstrap.Navbar,
                                    href: '#',
                                    glyphicon: 'th-large',
                                    html: 'Tables'
                                },
                                {
                                    xtype: 'Item',
                                    xns: Roo.bootstrap.Navbar,
                                    href: '#',
                                    glyphicon: 'flash',
                                    html: 'UI Elements'
                                },
                                {
                                    xtype: 'Item',
                                    xns: Roo.bootstrap.Navbar,
                                    href: '#',
                                    glyphicon: 'cog',
                                    html: 'My Info'
                                },
                                {
                                    xtype: 'Item',
                                    xns: Roo.bootstrap.Navbar,
                                    href: '#',
                                    glyphicon: 'share-alt',
                                    html: 'Extras'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'Container',
                    xns: Roo.bootstrap,
                    cls: 'content',
                    items: [
                        {
                            xtype: 'Container',
                            xns: Roo.bootstrap,
                            cls: 'pad-wrapper',
                            items: [
                                {
                                    xtype: 'Row',
                                    xns: Roo.bootstrap,
                                    cls: 'section btns',
                                    items: [
                                        {
                                            xtype: 'Header',
                                            xns: Roo.bootstrap,
                                            level: 4,
                                            html: 'Flat Buttons',
                                            cls: 'title'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'Column',
                                    xns: Too.bootstrap,
                                    md: 6,
                                    html: 'a'
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    }
});