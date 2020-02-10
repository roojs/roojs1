/*
 * 
 * (C) Alan Knowles 2011
 * Licence : Roojs - LGPL
 */
 
var mform;
var combo, cats;
Roo.onReady(function(){

    Roo.QuickTips.init();

      sampledata  = [
        ['A', 'A states', [
            ['AK', 'Alaska'],
            ['AZ', 'Arizona', [
                ['AK', 'Alaska'],
                ['AZ', 'Arizona'],
                ['AR', 'Arkansas']
            ]],
            ['AR', 'Arkansas']
                           
        ]],
        ['C', 'C states', [        
          ['CA', 'California'],
            ['CO', 'Colorado'],
            ['CT', 'Connecticut']
        ]],
        ['D', 'D states', [
            ['DE', 'Delaware'],
            ['DC', 'District of Columbia']
        ]],
        ['I', 'I states', [
        
            ['ID', 'Idaho'],
            ['IL', 'Illinois'],
            ['IN', 'Indiana'],
            ['IA', 'Iowa'],
            ['IDA', 'Idaho'],
            ['ILA', 'Illinois'],
            ['INA', 'Indiana'],
            ['IAA', 'Iowa']
        ]],
        ['E', 'Empty states', []],
    ];
    /*
     * ================  Form 2  =======================
     */
    mform = Roo.factory({
        xns : Roo.form,
        xtype : 'Form',
        labelAlign: 'top',
        items : [
            {
                xtype : 'ComboNested',
                xns: Roo.form,
                
                fieldLabel: 'State',
                
                name : 'states_list',
                hiddenName:'states',
                
                
                valueField : 'abbr',
                displayField:'state',
                
             
                store: {
                    xns : Roo.data,
                    xtype : 'SimpleStore',
                    fields: ['abbr', 'state' , 'cn'],
                    data : sampledata// from states.js
                   
                },
                listWidth: 250,
                typeAhead: true,
                mode: 'local',
                triggerAction: 'all',
                emptyText:'Select a state...',
                selectOnFocus:true,
                width:190,
                listeners : {
                    change: function() {
                        Roo.log("changed to " + this.getValue());
                        
                    }
                }
          },
          
           {
            xtype : 'ComboNested',
            allowBlank : true,
            alwaysQuery : true,
            displayField : 'name',
            editable : false,
            emptyText : 'Category',
            fieldLabel : 'Category',
            forceSelection : true,
            hiddenName : 'supplier_category_id',
            listWidth : 200,
            maxColumns : 4,
            loadingText : 'Searching',
            minChars : 2,
            name : 'supplier_category_id_name',
            pageSize : 999,
            qtip : 'Category',
            queryParam : 'query[fullpath]',
            selectOnFocus : true,
            triggerAction : 'all',
            typeAhead : true,
            valueField : 'id',
            width : 260,
            listeners : {
             select : function (combo, record, index)
              {
                  _this.grid.footer.onClick('first');
              }
            },
            xns : Roo.form,
            '|xns' : 'Roo.form',
            store : {
             xtype : 'Store',
             remoteSort : true,
             sortInfo : { direction : 'ASC', field: 'fullpath' },
             listeners : {
              beforeload : function (_self, o){
                   o.params = o.params || {};
                   o.params._as_tree = 1;
                   // set more here
               }
             },
             xns : Roo.data,
             '|xns' : 'Roo.data',
             proxy : {
              xtype : 'HttpProxy',
              method : 'GET',
              url : '/web.Texon/admin.php/Roo/category.php',
              xns : Roo.data,
              '|xns' : 'Roo.data'
             },
             reader : {
              xtype : 'JsonReader',
              fields : [{"name":"id","type":"int"},{"name":"fullpath","type":"string"},'name',   'cn' ],
              id : 'id',
              root : 'data',
              totalProperty : 'total',
              xns : Roo.data,
              '|xns' : 'Roo.data'
             }
            }
           },
          

            
        ]
        
    });

    mform.render('form-ct5');
    combo = mform.findField('states');
    cats = mform.findField('supplier_category_id');
   /* mform.setValues({
        states : '["AK","AZ"]',
        states_list : "Alaska, Arizona"
        
    });
    */
    
    
});