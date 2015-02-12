

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
                                    items : [
                                    	{
                                            level : 4,
                                            xtype : 'Header',
                                            html : 'Inline Editor',
                                            xns : Roo.bootstrap
                                        },
                                        {
                                            xtype : 'Panel',
                                            xns : Roo.bootstrap.editor,
                                            width : 1000,
                                            height : 1000,
                                            name : 'email-inline-editor',
                                            stylesheets : (function(){
                                                var css = [];
                                                
                                                css.push(rootURL + '/roojs1/css-bootstrap/bootstrap.css');
                                                
                                                return css;
                                            })(),
                                            items : [
                                                {
                                                    xtype : 'TextBlock',
                                                    xns : Roo.bootstrap.editor,
                                                    items : [
                                                        
//                                                        {
//                                                            xtype : 'HtmlEditor',
//                                                            xns : Roo.bootstrap,
//                                                            height : 200,
//                                                            name : 'block1'
//                                                        }
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