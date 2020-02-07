/*
 * 
 * (C) Alan Knowles 2011
 * Licence : Roojs - LGPL
 */
 
var mform;
var combo
Roo.onReady(function(){

    Roo.QuickTips.init();

      sampledata  = [
        ['A', 'A states', [
            ['AK', 'Alaska'],
            ['AZ', 'Arizona'],
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
        ]]
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
                listWidth: 300,
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
          }

            
        ]
        
    });

    mform.render('form-ct5');
    combo = mform.findField('states');
   /* mform.setValues({
        states : '["AK","AZ"]',
        states_list : "Alaska, Arizona"
        
    });
    */
    
    
});