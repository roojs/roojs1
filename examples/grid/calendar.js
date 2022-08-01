/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */

Roo.BLANK_IMAGE_URL  = "../../images/default/s.gif";
 
 
var Example = {
    init : function(){
        // some data yanked off the web
        Roo.QuickTips.init ();
  
        // create the Grid
        this.grid = new Roo.grid.Calendar('grid-example', {
            background: false,
            eventStore : {
                xtype: 'Store',
                xns: Roo.data,
                listeners : {
                    beforeload : function (_self, o){
                        o.params = o.params || {};
                        //var d = new Date().format('Y-m-d');
                        //if(_this.cal){
                        //    d = typeof(_this.cal.activeDate) == 'string' ? _this.cal.activeDate : _this.cal.activeDate.format("Y-m-d");
                        //}
                        //o.params._activeDate = d
                    }
                },
                remoteSort : true,
                sortInfo : { direction : 'ASC', field: 'start_dt' },
                proxy : {
                    xtype: 'HttpProxy',
                    xns: Roo.data,
                    method : 'GET',
                    url : 'http://roojs.com/admin.php/Roo/mtrack_ticket?_dc=1396967515369&_future_schedule=1&query%5Bviewtype%5D=active&limit=999&sort=summary&dir=ASC'
                },
                reader : {
                    xtype: 'JsonReader',
                    xns: Roo.data,
                    id : 'id',
                    root : 'data',
                    totalProperty : 'total',
                    fields : [{"name":"id","type":"int"},{"name":"title","type":"string"}]
                }
            },
            listeners : {
                eventrender : function(c, rec) {
                    rec.data.time = ''; // not needed
                    rec.data.title = rec.data.developer_id_name + ' ' + rec.data.project_id_name;
                    rec.data.qtip  = '#' + rec.data.id + ' ' + rec.data.summary;
                    
                    if (rec.data.estimated) {
                        rec.data.cls = "Greys-q3-6"; // grey...
                    } else {
                        rec.data.cls = 'RdYlGn-q' + rec.data.priority_id_seqid +'-7'
                    }
                    
                    
                    
                }
            }
        });
        
        var gpanel = new Roo.panel.Grid(this.grid);
        var layout = Roo.BorderLayout.create({
            center: {
                margins:{left:3,top:3,right:3,bottom:3},
                panels: [ gpanel ]
            }
        }, 'grid-panel');

        this.grid.render();
        this.grid.load();
        
        var gridHead = this.grid.getView().getHeaderPanel(true);
        var tb = new Roo.Toolbar(gridHead, [ {
                            xtype: 'Button',
                            xns: Roo.Toolbar,
                            listeners : {
                                click : function (_self, e)
                                {
                                    var sd = Date.parseDate(_this.monthField.getValue(), "Y-m-d");
                                    sd.setMonth(sd.getMonth()-1);
                                    _this.monthField.setValue(sd.format('Y-m-d'));
                                    _this.grid.ds.load({});
                                }
                            },
                            text : "Back"
                        },
                        {
                            xtype: 'Separator',
                            xns: Roo.Toolbar
                        },
                        {
                            xtype: 'MonthField',
                            xns: Roo.form,
                            listeners : {
                                render : function (_self)
                                {
                                 //   _this.monthField = _self;
                                   // _this.monthField.set  today
                                },
                                select : function (combo, date)
                                {
                                   // _this.grid.ds.load({});
                                }
                            },
                            value : (function() { return new Date(); })()
                        },
                        {
                            xtype: 'Separator',
                            xns: Roo.Toolbar
                        },
                         
                        {
                            xtype: 'Fill',
                            xns: Roo.Toolbar
                        },
                        {
                            xtype: 'Button',
                            xns: Roo.Toolbar,
                            listeners : {
                                click : function (_self, e)
                                {
                                    var sd = Date.parseDate(_this.monthField.getValue(), "Y-m-d");
                                    sd.setMonth(sd.getMonth()+1);
                                    _this.monthField.setValue(sd.format('Y-m-d'));
                                    _this.grid.ds.load({});
                                }
                            },
                            text : "Next"
                        }
            ]);
        
        
        
        //grid.getSelectionModel().selectFirstRow();
    }
};
Roo.onReady(Example.init, Example);