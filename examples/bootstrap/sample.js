

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
                                        },
                                        {
                                            xtype: 'Column',
                                            xns: Roo.bootstrap,
                                            md: 6,
                                            items: [
                                                {
                                                    xtype: 'Table',
                                                    xns: Roo.bootstrap,
                                                    items: [
                                                        {
                                                            xtype: 'Element',
                                                            xns: Roo.bootstrap,
                                                            tag: 'tbody',
                                                            items: [
                                                                {
                                                                    xtype: 'Element',
                                                                    xns: Roo.bootstrap,
                                                                    tag: 'tr',
                                                                    items: [
                                                                        {
                                                                            xtype: 'Element',
                                                                            xns: Roo.bootstrap,
                                                                            tag: 'td',
                                                                            items: [
                                                                                {
                                                                                    xtype: 'Element',
                                                                                    xns: Roo.bootstrap,
                                                                                    tag: 'code',
                                                                                    html: '.btn-flat.inverse'
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'Element',
                                                                            xns: Roo.bootstrap,
                                                                            tag: 'td',
                                                                            items: [
                                                                                {
                                                                                    xtype: 'Element',
                                                                                    xns: Roo.bootstrap,
                                                                                    tag: 'a',
                                                                                    cls: 'btn-flat inverse',
                                                                                    html: 'INVERSE BUTTON'
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'Element',
                                                                    xns: Roo.bootstrap,
                                                                    tag: 'tr',
                                                                    items: [
                                                                        {
                                                                            xtype: 'Element',
                                                                            xns: Roo.bootstrap,
                                                                            tag: 'td',
                                                                            items: [
                                                                                {
                                                                                    xtype: 'Element',
                                                                                    xns: Roo.bootstrap,
                                                                                    tag: 'code',
                                                                                    html: '.btn-flat.white'
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'Element',
                                                                            xns: Roo.bootstrap,
                                                                            tag: 'td',
                                                                            items: [
                                                                                {
                                                                                    xtype: 'Element',
                                                                                    xns: Roo.bootstrap,
                                                                                    tag: 'a',
                                                                                    cls: 'btn-flat white',
                                                                                    html: 'WHITE BUTTON'
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'Element',
                                                                    xns: Roo.bootstrap,
                                                                    tag: 'tr',
                                                                    items: [
                                                                        {
                                                                            xtype: 'Element',
                                                                            xns: Roo.bootstrap,
                                                                            tag: 'td',
                                                                            items: [
                                                                                {
                                                                                    xtype: 'Element',
                                                                                    xns: Roo.bootstrap,
                                                                                    tag: 'code',
                                                                                    html: '.btn-flat.gray'
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'Element',
                                                                            xns: Roo.bootstrap,
                                                                            tag: 'td',
                                                                            items: [
                                                                                {
                                                                                    xtype: 'Element',
                                                                                    xns: Roo.bootstrap,
                                                                                    tag: 'a',
                                                                                    cls: 'btn-flat gray',
                                                                                    html: 'GRAY BUTTON'
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'Element',
                                                                    xns: Roo.bootstrap,
                                                                    tag: 'tr',
                                                                    items: [
                                                                        {
                                                                            xtype: 'Element',
                                                                            xns: Roo.bootstrap,
                                                                            tag: 'td',
                                                                            items: [
                                                                                {
                                                                                    xtype: 'Element',
                                                                                    xns: Roo.bootstrap,
                                                                                    tag: 'code',
                                                                                    html: '.btn-flat.default'
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'Element',
                                                                            xns: Roo.bootstrap,
                                                                            tag: 'td',
                                                                            items: [
                                                                                {
                                                                                    xtype: 'Element',
                                                                                    xns: Roo.bootstrap,
                                                                                    tag: 'a',
                                                                                    cls: 'btn-flat default',
                                                                                    html: 'DEFAULT BUTTON'
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'Element',
                                                                    xns: Roo.bootstrap,
                                                                    tag: 'tr',
                                                                    items: [
                                                                        {
                                                                            xtype: 'Element',
                                                                            xns: Roo.bootstrap,
                                                                            tag: 'td',
                                                                            items: [
                                                                                {
                                                                                    xtype: 'Element',
                                                                                    xns: Roo.bootstrap,
                                                                                    tag: 'code',
                                                                                    html: '.btn-flat.primary'
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'Element',
                                                                            xns: Roo.bootstrap,
                                                                            tag: 'td',
                                                                            items: [
                                                                                {
                                                                                    xtype: 'Element',
                                                                                    xns: Roo.bootstrap,
                                                                                    tag: 'a',
                                                                                    cls: 'btn-flat primary',
                                                                                    html: 'PRIMARY BUTTON'
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'Element',
                                                                    xns: Roo.bootstrap,
                                                                    tag: 'tr',
                                                                    items: [
                                                                        {
                                                                            xtype: 'Element',
                                                                            xns: Roo.bootstrap,
                                                                            tag: 'td',
                                                                            items: [
                                                                                {
                                                                                    xtype: 'Element',
                                                                                    xns: Roo.bootstrap,
                                                                                    tag: 'code',
                                                                                    html: '.btn-flat.success'
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'Element',
                                                                            xns: Roo.bootstrap,
                                                                            tag: 'td',
                                                                            items: [
                                                                                {
                                                                                    xtype: 'Element',
                                                                                    xns: Roo.bootstrap,
                                                                                    tag: 'a',
                                                                                    cls: 'btn-flat success',
                                                                                    html: 'SUCCESS BUTTON'
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'Element',
                                                                    xns: Roo.bootstrap,
                                                                    tag: 'tr',
                                                                    items: [
                                                                        {
                                                                            xtype: 'Element',
                                                                            xns: Roo.bootstrap,
                                                                            tag: 'td',
                                                                            items: [
                                                                                {
                                                                                    xtype: 'Element',
                                                                                    xns: Roo.bootstrap,
                                                                                    tag: 'code',
                                                                                    html: '.btn-flat.info'
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'Element',
                                                                            xns: Roo.bootstrap,
                                                                            tag: 'td',
                                                                            items: [
                                                                                {
                                                                                    xtype: 'Element',
                                                                                    xns: Roo.bootstrap,
                                                                                    tag: 'a',
                                                                                    cls: 'btn-flat info',
                                                                                    html: 'INFO BUTTON'
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'Element',
                                                                    xns: Roo.bootstrap,
                                                                    tag: 'tr',
                                                                    items: [
                                                                        {
                                                                            xtype: 'Element',
                                                                            xns: Roo.bootstrap,
                                                                            tag: 'td',
                                                                            items: [
                                                                                {
                                                                                    xtype: 'Element',
                                                                                    xns: Roo.bootstrap,
                                                                                    tag: 'code',
                                                                                    html: '.btn-flat.danger'
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'Element',
                                                                            xns: Roo.bootstrap,
                                                                            tag: 'td',
                                                                            items: [
                                                                                {
                                                                                    xtype: 'Element',
                                                                                    xns: Roo.bootstrap,
                                                                                    tag: 'a',
                                                                                    cls: 'btn-flat danger',
                                                                                    html: 'DANGER BUTTON'
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
                                            xtype: 'Column',
                                            xns: Roo.bootstrap,
                                            md: 5,
                                            items: [
                                                {
                                                    xtype: 'Row',
                                                    xns: Roo.bootstrap,
                                                    cls: 'ctrls',
                                                    items: [
                                                        {
                                                            xtype: 'ButtonGroup',
                                                            xns: Roo.bootstrap,
                                                            cls: 'large',
                                                            items: [
                                                                {
                                                                    xtype: 'Button',
                                                                    xns: Roo.bootstrap,
                                                                    cls: 'glow left',
                                                                    html: ' ',
                                                                    glyphicon: 'link'
                                                                },
                                                                {
                                                                    xtype: 'Button',
                                                                    xns: Roo.bootstrap,
                                                                    cls: 'glow middle',
                                                                    html: ' ',
                                                                    glyphicon: 'random'
                                                                },
                                                                {
                                                                    xtype: 'Button',
                                                                    xns: Roo.bootstrap,
                                                                    cls: 'glow middle',
                                                                    html: ' ',
                                                                    glyphicon: 'fullscreen'
                                                                },
                                                                {
                                                                    xtype: 'Button',
                                                                    xns: Roo.bootstrap,
                                                                    cls: 'glow right',
                                                                    html: ' ',
                                                                    glyphicon: 'zoom-out'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'ButtonGroup',
                                                            xns: Roo.bootstrap,
                                                            items: [
                                                                {
                                                                    xtype: 'Button',
                                                                    xns: Roo.bootstrap,
                                                                    cls: 'glow left',
                                                                    html: 'LEFT',
                                                                    active: true
                                                                },
                                                                {
                                                                    xtype: 'Button',
                                                                    xns: Roo.bootstrap,
                                                                    cls: 'glow middle',
                                                                    html: 'RIGHT'
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
                        }
                    ]
                }
            ]
        };
    }
});