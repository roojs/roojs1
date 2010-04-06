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
 
var fck = false;
Roo.onReady(function(){

    Roo.QuickTips.init();

    // turn on validation errors beside the field globally
    Roo.form.Field.prototype.msgTarget = 'side';
 
    /*
     * ================  Form 2  =======================
     */
    var top = new Roo.form.Form({
        labelAlign: 'top'
    });

    fck = new Roo.form.FCKeditor({
            id:'bio',
            fieldLabel:'Biography',
            
            fckconfig : {
                CustomConfigurationsPath : '/roojs1/examples/form/fckconfig.js'
            },
            
            toolbarSet : 'Roo',
            width:750,
            value : '<blockquote>aaa<br/></blockquote>',
            
            height:300,
            listeners : {
                editorinit : function(ed, f) {
                    var de = f.EnterKeyHandler.DoEnter;
                    f.EnterKeyHandler.constructor.prototype.DoEnter =
                    f.EnterKeyHandler.DoEnter = function(m,h) {
                        //console.log(this); 
                        try { de(m,h); } catch(e) {  }
                        //..console.log(this); 
                        
                        window.setTimeout( function() {
                            try { 
                                f.EditorDocument.execCommand('outdent', false, null);
                                f.EditorDocument.execCommand('outdent', false, null);
                                f.EditorDocument.execCommand('outdent', false, null);
                                f.EditorDocument.execCommand('outdent', false, null);
                            } catch(e) {  console.log(e)}
                        }, 100);
                            
                        
                       // this._OutdentWithSelection( currentBlock, range )
                        
                    };
                    //f.EnterKeyHandler.DoEnter = function(m, hs) {
                    //    eh(m,hs);
                     //   console.log(this);
                    //}
                    

                }
            }
        });

    top.container({},
        fck
    );

    top.addButton('Save', function(){
        top.doAction('submit', {
            url: './fck.js',
            method: 'POST'
            
        });
       });
    top.addButton('Cancel');

    top.render('form-ct2');
 
});