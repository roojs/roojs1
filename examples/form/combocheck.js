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
    mform = new Roo.form.Form({
        labelAlign: 'top',
        items : [
            {
                xtype : 'CoComboBoxmbo',
                xns: Roo.form,
                
                name : 'states_list',
                fieldLabel: 'State',
                hiddenName:'states',
                store: {
                    xns : Roo.data,
                    xtype : 'SimpleStore',
                    fields: ['abbr', 'state'],
                    data : Roo.exampledata.states // from states.js
                   
                },
                displayField:'state',
                typeAhead: true,
                mode: 'local',
                triggerAction: 'all',
                emptyText:'Select a state...',
                selectOnFocus:true,
                width:190
          }

            
        ]
        
    });

    mform.render('form-ct5');
    combo = mform.findField('states');
});