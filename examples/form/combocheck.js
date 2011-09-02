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
                xtype : 'Combo',
                xns: Roo.form,
                
            
        ]
        
    });

    mform.render('form-ct5');
    editor = mform.findField('bio');
});