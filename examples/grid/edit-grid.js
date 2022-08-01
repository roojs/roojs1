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

var grid = false;

Roo.onReady(function(){
    Roo.QuickTips.init();
    function formatBoolean(value){
        return value ? 'Yes' : 'No';  
    };
    
    function formatDate(value){
        return value ? value.dateFormat('M d, Y') : '';
    };
    // shorthand alias
    var fm = Roo.form, Ed = Roo.grid.GridEditor;

    // the column model has information about grid columns
    // dataIndex maps the column to the specific data field in
    // the data store (created below)
    var cm = new Roo.grid.ColumnModel([{
           header: "Common Name",
           dataIndex: 'common',
           width: 220  /*,
           
           editor: new Ed(new fm.TextField({
               allowBlank: false
           })) */
        },{
           header: "Light",
           dataIndex: 'light',
           width: 130,
           editor: new Ed(new Roo.form.ComboBox({
               typeAhead: true,
               triggerAction: 'all',
               transform:'light',
               lazyRender:true
            }))
        },{
           header: "Price",
           dataIndex: 'price',
           width: 70,
           align: 'right',
           renderer: 'usMoney',
           editor: new Ed(new fm.NumberField({
               allowBlank: false,
               allowNegative: false,
               maxValue: 10
           }))
        },{
           header: "Available",
           dataIndex: 'availDate',
           width: 95,
           renderer: formatDate,
           editor: new Ed(new fm.DateField({
                format: 'm/d/y',
                minValue: '01/01/06',
                disabledDays: [0, 6],
                disabledDaysText: 'Plants are not available on the weekends'
            }))
        },{
           header: "Indoor?",
           dataIndex: 'indoor',
           width: 55,
           renderer: formatBoolean,
           editor: new Ed(new fm.Checkbox())
        }]);

    // by default columns are sortable
    cm.defaultSortable = true;

    // this could be inline, but we want to define the Plant record
    // type so we can add records dynamically
    var Plant = Roo.data.Record.create([
           // the "name" below matches the tag name to read, except "availDate"
           // which is mapped to the tag "availability"
           {name: 'common', type: 'string'},
           {name: 'botanical', type: 'string'},
           {name: 'light'},
           {name: 'price', type: 'float'},             // automatic date conversions
           {name: 'availDate', mapping: 'availability', type: 'date', dateFormat: 'm/d/Y'},
           {name: 'indoor', type: 'bool'}
      ]);

    // create the Data Store
    var ds = new Roo.data.Store({
        // load using HTTP
        proxy: new Roo.data.HttpProxy({url: 'plants.xml'}),
        remoteSort : true,
        
        // the return will be XML, so lets set up a reader
        reader: new Roo.data.XmlReader({
               // records will have a "plant" tag
               record: 'plant'
           }, Plant)
    });

    // create the editor grid
    grid = new Roo.grid.EditorGrid('editor-grid', {
        ds: ds,
        cm: cm,
        enableColLock:false,
        multiSort : true,
        enableDragDrop : true,
       
    });
    
   

    var layout = Roo.BorderLayout.create({
        center: {
            margins:{left:3,top:3,right:3,bottom:3},
            panels: [new Roo.panel.Grid(grid)]
        }
    }, 'grid-panel');


    // render it
    grid.render();

    
      grid.dropTarget = new Roo.dd.DropTarget(grid.view.el,  { 
                  listeners : {
                      drop : function (source, e, data)
                      {
                           //Roo.log("DROP");
                           var t = Roo.lib.Event.getTarget(e); 
                           var ri = grid.view.findRowIndex(t);
                           //Roo.log(e);
                           //Roo.log(data);
                            var dp = this.getDropPoint(e,data);
                          // at this point should have above or below..
                            var os = grid.selModel.getSelectedCell()
                            grid.ds.remove(data.selections[0]);
                            grid.ds.insert(ri + (dp == 'below' ? 1 : 0) , data.selections);
                            grid.selModel.select(ri + (dp == 'below' ? 1 : 0), os[1])
                            this.expandRow(false);
                            
                             
                      },
                      over : function (source, e, data)
                      {
                          //
                          // if drag point == drop point...
                           var t = Roo.lib.Event.getTarget(e); 
                           var ri = grid.view.findRowIndex(t);
                           var dp = this.getDropPoint(e,data);
                           Roo.log(dp);
                           //Roo.log(JSON.stringify({ dp: dp,  ri: ri, src_ri: data.rowIndex}));
                           if(ri == data.rowIndex ||
                                (dp == 'above' && ri-1 == data.rowIndex) ||
                                (dp == 'below' && ri+1 == data.rowIndex) 
                             ) {
                               this.expandRow(false);
                          
                                this.valid = false;
                                return;
                           }
                           this.expandRow(ri, dp);
                           
                         
                          this.valid = 'ok-add'; 
                          //Roo.log("SET VALID TO: " + this.valid)
                          //Roo.log([source,e,data]);
                          
                          // Roo.log("dragover");
                           
                          //Roo.log(e);
                          /*
                          var t = Roo.lib.Event.getTarget(e); 
                          var ri = _this.grid.view.findRowIndex(t);
                            //            Roo.log(ri);
                          
                          var rid  = false;
                          if (ri !== false) {
                              rid = _this.grid.getDataSource().getAt(ri).data;
                          }
                          
                          var s = _this.grid.getSelectionModel().getSelections();
                           */  
                          //if (!isFromGroup && isToGroup) {
                          //this.valid = 'ok-add';
                          
                      }
                  },
                  ddGroup : 'GridDD',
                  activeDom : false,
                  expandRow : function(ri,pos)
                  {
                        var dom = grid.view.getRow(ri);
                        //Roo.log(dom);
                        //if (this.activeDom == dom) {
                        //    return;
                        //}
                        if (this.activeDom) {
                            Roo.get(this.activeDom).removeClass('x-grid-dd-above');
                            Roo.get(this.activeDom).removeClass('x-grid-dd-below');
                            
                            this.activeDom = false;
                        }
                        
                        if (ri === false) {
                            return;
                        }
                        Roo.get(dom).addClass('x-grid-dd-' + pos);
                         
                        this.activeDom = dom;
                    
                    
                  },
                  getDropPoint : function(e, data)
                    {
                        //var tn = n.node;
                       // data is from griddragzone
                       
                        var te = Roo.lib.Event.getTarget(e); 
                        var ri =  Roo.fly(te).findParent("td", 6);
                            
                       
                        var dragEl = ri;
                        var t = Roo.lib.Dom.getY(dragEl),
                            b = t + dragEl.offsetHeight;
                        var y = Roo.lib.Event.getPageY(e);
                        //var noAppend = tn.allowChildren === false || tn.isLeaf();
                        
                        // we may drop nodes anywhere, as long as allowChildren has not been set to false..
                        
                          
                        var q = (b - t) / 2;
                        
                        
                        if(y >= t && y < (t + q)){
                            return "above";
                        }
                        if(y >= b-q && y <= b){
                            return "below";
                        }
                        Roo.log( JSON.stringify( {pos: y, dragtop : t, mid : q, drabgot: b }));
                        
                        
                        return false;
                    },                  
              });
      
    
    
    var gridHead = grid.getView().getHeaderPanel(true);
    var tb = new Roo.Toolbar(gridHead, [{
        text: 'Add Plant',
        handler : function(){
            var p = new Plant({
                common: 'New Plant 1',
                light: 'Mostly Shade',
                price: 0,
                availDate: new Date(),
                indoor: false
            });
            grid.stopEditing();
            ds.insert(0, p);
            grid.startEditing(0, 0);
        }
    }]);

    // trigger the data store load
    ds.load();
});