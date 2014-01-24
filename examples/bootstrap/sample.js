

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
                                    active: true
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
                                }
                            ]
                        },
                        {
                            xtype: 'NavGroup',
                            xns: Roo.bootstrap,
                            items: [
                            ]
                        },
                        {
                            xtype: 'NavGroup',
                            xns: Roo.bootstrap,
                            items: [
                                {
                                    xtype: 'Item',
                                    xns: Roo.bootstrap.Navbar,
                                    href: '#',
                                    glyphicon: 'user',
                                    html: 'Users',
                                    menu:  {
                                            xtype: 'Menu',
                                            xns: Roo.bootstrap,
                                            type: 'submenu',
                                            items : [
                                                {
                                                    xtype: 'MenuItem',
                                                    xns: Roo.bootstrap,
                                                    html: "hello aaa",
                                                    href : 'http://roojs.com'
                                                },
                                                {
                                                    xtype: 'MenuItem',
                                                    xns: Roo.bootstrap,
                                                    html: "hello",
                                                    href : 'http://roojs.com'
                                                }
                                            ]
                                        }
                                }
                            ]
                        },
                        {
                            xtype: 'NavGroup',
                            xns: Roo.bootstrap,
                            items: [
                                {
                                    xtype: 'Item',
                                    xns: Roo.bootstrap.Navbar,
                                    href: '#',
                                    glyphicon: 'edit',
                                    html: 'Forms'
                                }
                            ]
                        },
                        {
                            xtype: 'NavGroup',
                            xns: Roo.bootstrap,
                            items: [
                                {
                                    xtype: 'Item',
                                    xns: Roo.bootstrap.Navbar,
                                    href: '#',
                                    glyphicon: 'picture',
                                    html: 'Gallery'
                                }
                            ]
                        },
                        {
                            xtype: 'NavGroup',
                            xns: Roo.bootstrap,
                            items: [
                                {
                                    xtype: 'Item',
                                    xns: Roo.bootstrap.Navbar,
                                    href: '#',
                                    glyphicon: 'calendar',
                                    html: 'Calendar'
                                }
                            ]
                        },
                        {
                            xtype: 'NavGroup',
                            xns: Roo.bootstrap,
                            items: [
                                {
                                    xtype: 'Item',
                                    xns: Roo.bootstrap.Navbar,
                                    href: '#',
                                    glyphicon: 'th-large',
                                    html: 'Tables'
                                }
                            ]
                        },
                        {
                            xtype: 'NavGroup',
                            xns: Roo.bootstrap,
                            items: [
                                {
                                    xtype: 'Item',
                                    xns: Roo.bootstrap.Navbar,
                                    href: '#',
                                    glyphicon: 'flash',
                                    html: 'UI Elements'
                                }
                            ]
                        },
                        {
                            xtype: 'NavGroup',
                            xns: Roo.bootstrap,
                            items: [
                                {
                                    xtype: 'Item',
                                    xns: Roo.bootstrap.Navbar,
                                    href: '#',
                                    glyphicon: 'cog',
                                    html: 'My Info'
                                }
                            ]
                        },
                        {
                            xtype: 'NavGroup',
                            xns: Roo.bootstrap,
                            items: [
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
                }
            ]
        };
    }
});