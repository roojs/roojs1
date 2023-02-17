

Roo.example = Roo.example || {};

Roo.example.Editor = new Roo.XComponent({
    part     :  ["layout","viewpanel"],
    order    : '001-viewpanel',
    region   : '',
    parent   : false,
    name     : "unnamed module",
    disabled : false, 
    permname : '', 
    _tree : function()
    {
         
        var _this = this;
        var MODULE = this;
         
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
                                            xtype : 'HtmlEditor',
                                            xns : Roo.bootstrap.form,
                                            name : 'thanks-email',
                                            width : 1000,
                                            height : 500,
											resize : 'vertical',
											//toolbars : [ 'Standard', 'Context' ],
                                            stylesheets : (function(){
                                                var css = [];
                                                
                                                css.push('../../css-bootstrap/bootstrap.css');
                                                css.push('../../css-bootstrap/font-awesome.css');
                                                //css.push(rootURL + '/Campaign/editor/editor.css');
                                                
                                                return css;
                                            })(),
                                            listeners : {
                                                render : function (_self)
                                                {
                                                    _this.previewPanel = _self;
                                                },
                                                imageadd : function(a) {
                                                    Roo.log(['imageadd', a])
                                                },
                                                imageupdate : function(a,b) {
                                                    Roo.log(['imageupdate', a,b])
                                                },
                                                imagedelete : function(a,b) {
                                                    Roo.log(['imagedelete', a,b])
                                                }
                                            }
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