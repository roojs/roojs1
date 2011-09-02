/*
 * 
 * (C) Alan Knowles 2011
 * Licence : Roojs - LGPL
 */
 
var mform;
var combo
Roo.onReady(function(){

    Roo.QuickTips.init();

 
    /*
     * ================  Form 2  =======================
     */
    mform = Roo.factory({
        xns : Roo.form,
        xtype : 'Form',
        labelAlign: 'top',
        items : [
            {
                xtype : 'ComboCheck',
                xns: Roo.form,
                
                fieldLabel: 'State',
                
                name : 'states_list',
                hiddenName:'states',
                
                
                valueField : 'abbr',
                displayField:'state',
                
             
                store: {
                    xns : Roo.data,
                    xtype : 'SimpleStore',
                    fields: ['abbr', 'state'],
                    data : Roo.exampledata.states // from states.js
                   
                },
                
                typeAhead: true,
                mode: 'local',
                triggerAction: 'all',
                emptyText:'Select a state...',
                selectOnFocus:true,
                width:190,
                listeners : {
                    changed: function() {
                        Roo.log("changed to " + this.getValue());
                        
                    }
                }
          }

            
        ]
        
    });

    mform.render('form-ct5');
    combo = mform.findField('states');
    mform.setValues({
        states : '["AK","AZ"]',
        states_list : "Alaska, Arizona"
        
    })
    
    
});