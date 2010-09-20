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

var combo = false;
Roo.onReady(function(){
    // simple array store
    var store = new Roo.data.SimpleStore({
        fields: ['abbr', 'state'],
        data : Roo.exampledata.states // from states.js
    });
    combo = new Roo.form.ComboBox({
        store: store,
        editable : false,
        displayField:'state',
        typeAhead: false,
        mode: 'local',
        triggerAction: 'all',
        emptyText:'Select a state...',
        selectOnFocus:true,
        resizable:true
    });
    combo.applyTo('local-states');



    var converted = new Roo.form.ComboBox({
        typeAhead: true,
        triggerAction: 'all',
        transform:'state',
        width:135,
        forceSelection:true
    });
});