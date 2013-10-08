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
    onRender : function(ct, position){
        if(!this.el){
            this.defaultAutoCreate = {
                tag: "iframe",
                style:"width: 300px; height: 100px; border: 0;",
                src: "signature.svg"
            };
        }
//        Roo.form.TextArea.superclass.onRender.call(this, ct, position);
        if(this.grow){
            this.textSizeEl = Roo.DomHelper.append(document.body, {
                tag: "pre", cls: "x-form-grow-sizer"
            });
            if(this.preventScrollbars){
                this.el.setStyle("overflow", "hidden");
            }
            this.el.setHeight(this.growMin);
        }
    }
});