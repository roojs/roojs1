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
 
/**
 * @class Roo.form.Signature
 * @extends Roo.form.Field
 * Signature field.  
 * @constructor
 * 
 * @param {Object} config Configuration options
 */

Roo.form.Signature = function(config){
    Roo.form.Signature.superclass.constructor.call(this, config);
    
    this.addEvents({
         /**
         * @event confirm
         * Fires when the 'confirm' icon is pressed (add a listener to enable add button)
	     * @param {Roo.form.ComboBox} combo This combo box
	     */
        'confirm' : true,
        /**
         * @event reset
         * Fires when the 'edit' icon is pressed (add a listener to enable add button)
	     * @param {Roo.form.ComboBox} combo This combo box
	     * @param {Roo.data.Record|false} record The data record returned from the underlying store (or false on nothing selected)
	     */
        'reset' : true
        
        
    });
};

Roo.extend(Roo.form.Signature, Roo.form.Field,  {
    /**
     * @cfg {Boolean} grow True if this field should automatically grow and shrink to its content
     */
    grow : false,
    /**
     * @cfg {Number} growMin The minimum width to allow when grow = true (defaults to 30)
     */
    growMin : 30,
    
    confirmed : false,
    
    /**
     * @cfg {Boolean} allowBlank False to validate that the value length > 0 (defaults to true)
     */
    allowBlank : false,
    /*                    <p>Please sign on the dotted line below.</p>
                    <iframe src=signature.svg style="width: 300px; height: 100px; border: 0;"></iframe>
                    <div>
                        <button onclick=showSignature()>Show signaure path data</button>
                        <button onclick=clearSignature()>Clear signature</button>
                        <div id=pathdata></div>
                    </div>
                    <script>
                    var svg = document.getElementsByTagName('iframe')[0].contentWindow;
                    var pathdata = document.getElementById('pathdata');

                    function showSignature() {
                        pathdata.textContent = svg.getSignature();
                    }

                    function clearSignature() {
                        svg.clearSignature();
                        pathdata.textContent = '';
                    }
                    </script>*/
    // private
    
     defaultAutoCreate : { // modified by initCompnoent..
        tag: "input",
        type:"hidden"
    },

    
    onRender : function(ct, position){
        Roo.log(ct);
        Roo.log(position);
        
        
        Roo.form.Signature.superclass.onRender.call(this, ct, position);
        
        this.wrap = this.el.wrap({
            cls:'x-html-editor-wrap', cn:{cls:'x-html-editor-tb'}
        });
        
        
        
        
        this.createToolbar(this);
        
        var iframe = this.wrap.createChild({
                tag: 'iframe',
                style:"width: 300px; height: 100px; border: 0;",
                src: "signature.svg"
            }, this.el
        );
        
        
//        if(this.grow){
//            this.textSizeEl = Roo.DomHelper.append(document.body, {
//                tag: "pre", cls: "x-form-grow-sizer"
//            });
//            if(this.preventScrollbars){
//                this.el.setStyle("overflow", "hidden");
//            }
//            this.el.setHeight(this.growMin);
//        }
    },
    /**
     * Protected method that will not generally be called directly. It
     * is called when the editor creates its toolbar. Override this method if you need to
     * add custom toolbar buttons.
     * @param {HtmlEditor} editor
     */
    createToolbar : function(editor){
        Roo.log('in?');
         function btn(id, toggle, handler){
            var xid = fid + '-'+ id ;
            return {
                id : xid,
                cmd : id,
                cls : 'x-btn-icon x-edit-'+id,
                enableToggle:toggle !== false,
                scope: editor, // was editor...
                handler:handler||editor.relayBtnCmd,
                clickEvent:'mousedown',
                tooltip: etb.buttonTips[id] || undefined, ///tips ???
                tabIndex:-1
            };
        }
        
        
        var tb = new Roo.Toolbar(editor.wrap.dom.firstChild);
        this.tb = tb;
        this.tb.add(
            // add filler here...
            {
                
                cls : '  x-signature-'+id,
                scope: editor, // was editor...
                handler: function() { },
                clickEvent:'mousedown',
                text: 'Cancel'
            },
             {
                cls : ' x-signature-'+id,
                scope: editor, // was editor...
                handler: this.setConfirmed,
                clickEvent:'mousedown',
                text: 'OK'
            } 
        );
             
//        
//        if (!editor.toolbars || !editor.toolbars.length) {
//            editor.toolbars = [ new Roo.form.HtmlEditor.ToolbarStandard() ]; // can be empty?
//        }
//        
//        for (var i =0 ; i < editor.toolbars.length;i++) {
//            editor.toolbars[i] = Roo.factory(
//                    typeof(editor.toolbars[i]) == 'string' ?
//                        { xtype: editor.toolbars[i]} : editor.toolbars[i],
//                Roo.form.HtmlEditor);
//            editor.toolbars[i].init(editor);
//        }
//         
        
    },
    getSignature : function(){
        var svg = this.el.dom.contentWindow;
        return svg.getSignature();
    },
    reset : function(){
        var svg = this.el.dom.contentWindow;
        svg.clearSignature();
        Roo.form.Signature.superclass.reset.call(this);
    },
    setConfirmed : function(){
        Roo.log('inin')
    },
    clear : function(){
        
    },
    // private
    // Subclasses should provide the validation implementation by overriding this
    validateValue : function(value){
        
        return true;
    }
});