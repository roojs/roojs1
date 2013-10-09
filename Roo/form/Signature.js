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
    
    signPanel : false,
    /**
     * @cfg {Boolean} allowBlank False to validate that the value length > 0 (defaults to true)
     */
    allowBlank : false,
    signatureTmp : '',
    isMouseDown : false,
    _t : false,
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
//        this.signPanel = this.signFrame.createChild({
//                tag: 'svg',
//                xmlns:"http://www.w3.org/2000/svg",
//                width: 300,
//                height: 100,
//                viewBox:"0 0 300 100"
//            }
//        );
        
        
//        this.signPanel = this.wrap.createChild({
//                tag: 'iframe',
//                style:"width: 300px; height: 100px; border: 0;",
//                src: 'signature.svg'
//            }, this.el
//        );
        this.signPanel = this.wrap.createChild({
                tag: 'div',
                style:"width: 300px; height: 100px; border: 0;"
        }, this.el
        );
//            new Roo.DomTemplate({
//                html: '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="100" viewBox="0 0 300 100"></svg>'
//            });
        
        this.svgEl = this.signPanel.createChild({
//              ns: 'svg',
              xmlns : 'http://www.w3.org/2000/svg',
              tag : 'svg',
              width: "300",
              height: "100",
              viewBox: "0 0 300 100",
              cn : [
                {
                    tag: "rect",
                    id: "svg-r",
                    width: 300,
                    height: 100,
                    fill: "#ffa"
                },
                {
                    tag: "line",
                    x1: "0",
                    y1: "80",
                    x2: "300",
                    y2: "80",
                    'stroke': "#666",
                    'stroke-width': "1",
                    'stroke-dasharray': "3",
                    'shape-rendering': "crispEdges",
                    'pointer-events': "none"
                },
                {
                    tag: "path",
                    id: "svg-p",
                    'stroke': "navy",
                    'stroke-width': "2",
                    'fill': "none",
                    'pointer-events': 'none',
                    d : 'M89,50 L90,50 L91,51 L92,51 L93,51 L95,51'
                    
                },
              ]
        });
        this.createSVG();
        this.svgBox = this.svgEl.dom.getScreenCTM();
    },
    createSVG : function(){ 
        var svg = this.signPanel;
        var r = svg.select('#svg-r', true).first().dom,
        p = this.signPanel.select('#svg-p', true).first();
        
        this.isMouseDown = false;
        Roo.log(r);

        var t = this;

        r.addEventListener('mousedown', function(e) { return t.down(e); }, false);
        r.addEventListener('mousemove', function(e) { return t.move(e); }, false);
        r.addEventListener('mouseup', function(e) { return t.up(e); }, false);
        r.addEventListener('touchstart', function(e) { return t.down(e); }, false);
        r.addEventListener('touchmove', function(e) { return t.move(e); }, false);
        r.addEventListener('touchend', function(e) { return t.up(e); }, false);
        r.addEventListener('mouseout', function(e) { return t.up(e); }, false);
        return;
        function clearSignature() {
            signaturePath = '';
            p.setAttribute('d', '');
        }

        function getSignature() {
            return signaturePath;
        }
    },
    isTouchEvent : function(e){
        return e.type.match(/^touch/);
    },
    getCoords : function (e) {
        var pt    = this.svgEl.dom.createSVGPoint();
        pt.x = e.clientX; 
        pt.y = e.clientY;
        if (this.isTouchEvent(e)) {
            pt.x =  e.targetTouches[0].clientX 
            pt.y = e.targetTouches[0].clientY;
        }
        var a = this.svgEl.dom.getScreenCTM();
        var b = a.inverse();
        var mx = pt.matrixTransform(b);
        return mx.x + ',' + mx.y;
    },
    //mouse event headler 
    down : function (e) {
        this.signatureTmp += 'M' + this.getCoords(e) + ' ';
        this.signPanel.select('#svg-p', true).first().attr('d', this.signatureTmp);
        Roo.log('down');
        this.isMouseDown = true;
        if (this.isTouchEvent(e)) e.preventDefault();
    },
    move : function (e) {
        if (this.isMouseDown) {
            this.signatureTmp += 'L' + this.getCoords(e) + ' ';
            this.signPanel.select('#svg-p', true).first().attr('d', this.signatureTmp);
        }
        if (this.isTouchEvent(e)) e.preventDefault();
    },
    up : function (e) {
        this.isMouseDown = false; 
        Roo.log(this.signatureTmp);
        if (this.isTouchEvent(e)) e.preventDefault();
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
            {
                cls : 'x-btn-icon x-signature-btn x-signature-'+id,
                scope: editor, // was editor...
                handler: this.setConfirmed,
                clickEvent:'mousedown',
                text: 'Confirm'
            },
            {
//                background: none repeat scroll 0 center transparent;
                cls : 'x-btn-icon x-signature-btn x-signature-'+id,
                scope: editor, // was editor...
                handler: this.reset,
                clickEvent:'mousedown',
                text: 'Cancel'
            },
            {
                cls : 'x-btn-icon x-signature-btn x-signature-'+id,
                scope: editor, // was editor...
                handler: this.test,
                clickEvent:'mousedown',
                text: 'TEST!!'
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
    // private
    getSignature : function(){
        return this.signatureTmp;
    },
    // private
    reset : function(){
        this.signatureTmp = '';
        this.signPanel.select('#svg-r', true).first().attr('fill', '#ffa');
        this.signPanel.select('#svg-p', true).first().attr('d', '');
        Roo.form.Signature.superclass.reset.call(this);
    },
    test : function(){
        Roo.log(this.signPanel.dom.contentWindow.up())
    },
    //public
    setConfirmed : function(){
        if(!this.getSignature()){
            return;
        }
        this.signPanel.select('#svg-r', true).first().attr('fill', '#cfc');
        this.setValue(this.getSignature());
        
//        Roo.log(Roo.get(this.signPanel.dom.contentWindow.r).attr('fill', '#cfc'));
    },
    //public
    clear : function(){
        this.signPanel.select('#svg-r', true).first().attr('fill', '#ffa');
        this.reset();
    },
    // private
    // Subclasses should provide the validation implementation by overriding this
    validateValue : function(value){
        
        return true;
    }
});