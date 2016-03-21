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
    
    this.addEvents({// not in used??
         /**
         * @event confirm
         * Fires when the 'confirm' icon is pressed (add a listener to enable add button)
	     * @param {Roo.form.Signature} combo This combo box
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
     * @cfg {Object} labels Label to use when rendering a form.
     * defaults to 
     * labels : { 
     *      clear : "Clear",
     *      confirm : "Confirm"
     *  }
     */
    labels : { 
        clear : "Clear",
        confirm : "Confirm"
    },
    /**
     * @cfg {Number} width The signature panel width (defaults to 300)
     */
    width: 300,
    /**
     * @cfg {Number} height The signature panel height (defaults to 100)
     */
    height : 100,
    /**
     * @cfg {Boolean} allowBlank False to validate that the value length > 0 (defaults to false)
     */
    allowBlank : false,
    
    //private
    // {Object} signPanel The signature SVG panel element (defaults to {})
    signPanel : {},
    // {Boolean} isMouseDown False to validate that the mouse down event (defaults to false)
    isMouseDown : false,
    // {Boolean} isConfirmed validate the signature is confirmed or not for submitting form (defaults to false)
    isConfirmed : false,
    // {String} signatureTmp SVG mapping string (defaults to empty string)
    signatureTmp : '',
    
    
    defaultAutoCreate : { // modified by initCompnoent..
        tag: "input",
        type:"hidden"
    },

    // private
    onRender : function(ct, position){
        
        Roo.form.Signature.superclass.onRender.call(this, ct, position);
        
        this.wrap = this.el.wrap({
            cls:'x-form-signature-wrap', style : 'width: ' + this.width + 'px', cn:{cls:'x-form-signature'}
        });
        
        this.createToolbar(this);
        this.signPanel = this.wrap.createChild({
                tag: 'div',
                style: 'width: ' + this.width + 'px; height: ' + this.height + 'px; border: 0;'
            }, this.el
        );
            
        this.svgID = Roo.id();
        this.svgEl = this.signPanel.createChild({
              xmlns : 'http://www.w3.org/2000/svg',
              tag : 'svg',
              id : this.svgID + "-svg",
              width: this.width,
              height: this.height,
              viewBox: '0 0 '+this.width+' '+this.height,
              cn : [
                {
                    tag: "rect",
                    id: this.svgID + "-svg-r",
                    width: this.width,
                    height: this.height,
                    fill: "#ffa"
                },
                {
                    tag: "line",
                    id: this.svgID + "-svg-l",
                    x1: "0", // start
                    y1: (this.height*0.8), // start set the line in 80% of height
                    x2: this.width, // end
                    y2: (this.height*0.8), // end set the line in 80% of height
                    'stroke': "#666",
                    'stroke-width': "1",
                    'stroke-dasharray': "3",
                    'shape-rendering': "crispEdges",
                    'pointer-events': "none"
                },
                {
                    tag: "path",
                    id: this.svgID + "-svg-p",
                    'stroke': "navy",
                    'stroke-width': "3",
                    'fill': "none",
                    'pointer-events': 'none'
                }
              ]
        });
        this.createSVG();
        this.svgBox = this.svgEl.dom.getScreenCTM();
    },
    createSVG : function(){ 
        var svg = this.signPanel;
        var r = svg.select('#'+ this.svgID + '-svg-r', true).first().dom;
        var t = this;

        r.addEventListener('mousedown', function(e) { return t.down(e); }, false);
        r.addEventListener('mousemove', function(e) { return t.move(e); }, false);
        r.addEventListener('mouseup', function(e) { return t.up(e); }, false);
        r.addEventListener('mouseout', function(e) { return t.up(e); }, false);
        r.addEventListener('touchstart', function(e) { return t.down(e); }, false);
        r.addEventListener('touchmove', function(e) { return t.move(e); }, false);
        r.addEventListener('touchend', function(e) { return t.up(e); }, false);
        
    },
    isTouchEvent : function(e){
        return e.type.match(/^touch/);
    },
    getCoords : function (e) {
        var pt    = this.svgEl.dom.createSVGPoint();
        pt.x = e.clientX; 
        pt.y = e.clientY;
        if (this.isTouchEvent(e)) {
            pt.x =  e.targetTouches[0].clientX;
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
        this.signPanel.select('#'+ this.svgID + '-svg-p', true).first().attr('d', this.signatureTmp);
        
        this.isMouseDown = true;
        
        e.preventDefault();
    },
    move : function (e) {
        if (this.isMouseDown) {
            this.signatureTmp += 'L' + this.getCoords(e) + ' ';
            this.signPanel.select('#'+ this.svgID + '-svg-p', true).first().attr( 'd', this.signatureTmp);
        }
        
        e.preventDefault();
    },
    up : function (e) {
        this.isMouseDown = false;
        var sp = this.signatureTmp.split(' ');
        
        if(sp.length > 1){
            if(!sp[sp.length-2].match(/^L/)){
                sp.pop();
                sp.pop();
                sp.push("");
                this.signatureTmp = sp.join(" ");
            }
        }
        if(this.getValue() != this.signatureTmp){
            this.signPanel.select('#'+ this.svgID + '-svg-r', true).first().attr('fill', '#ffa');
            this.isConfirmed = false;
        }
        e.preventDefault();
    },
    
    /**
     * Protected method that will not generally be called directly. It
     * is called when the editor creates its toolbar. Override this method if you need to
     * add custom toolbar buttons.
     * @param {HtmlEditor} editor
     */
    createToolbar : function(editor){
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
                cls : ' x-signature-btn x-signature-'+id,
                scope: editor, // was editor...
                handler: this.reset,
                clickEvent:'mousedown',
                text: this.labels.clear
            },
            {
                 xtype : 'Fill',
                 xns: Roo.Toolbar
            }, 
            {
                cls : '  x-signature-btn x-signature-'+id,
                scope: editor, // was editor...
                handler: this.confirmHandler,
                clickEvent:'mousedown',
                text: this.labels.confirm
            }
        );
    
    },
    //public
    /**
     * when user is clicked confirm then show this image.....
     * 
     * @return {String} Image Data URI
     */
    getImageDataURI : function(){
        var svg = this.svgEl.dom.parentNode.innerHTML;
        var src = 'data:image/svg+xml;base64,'+window.btoa(svg);
        return src; 
    },
    /**
     * 
     * @return {Boolean} this.isConfirmed
     */
    getConfirmed : function(){
        return this.isConfirmed;
    },
    /**
     * 
     * @return {Number} this.width
     */
    getWidth : function(){
        return this.width;
    },
    /**
     * 
     * @return {Number} this.height
     */
    getHeight : function(){
        return this.height;
    },
    // private
    getSignature : function(){
        return this.signatureTmp;
    },
    // private
    reset : function(){
        this.signatureTmp = '';
        this.signPanel.select('#'+ this.svgID + '-svg-r', true).first().attr('fill', '#ffa');
        this.signPanel.select('#'+ this.svgID + '-svg-p', true).first().attr( 'd', '');
        this.isConfirmed = false;
        Roo.form.Signature.superclass.reset.call(this);
    },
    setSignature : function(s){
        this.signatureTmp = s;
        this.signPanel.select('#'+ this.svgID + '-svg-r', true).first().attr('fill', '#ffa');
        this.signPanel.select('#'+ this.svgID + '-svg-p', true).first().attr( 'd', s);
        this.setValue(s);
        this.isConfirmed = false;
        Roo.form.Signature.superclass.reset.call(this);
    }, 
    test : function(){
//        Roo.log(this.signPanel.dom.contentWindow.up())
    },
    //private
    setConfirmed : function(){
        
        
        
//        Roo.log(Roo.get(this.signPanel.dom.contentWindow.r).attr('fill', '#cfc'));
    },
    // private
    confirmHandler : function(){
        if(!this.getSignature()){
            return;
        }
        
        this.signPanel.select('#'+ this.svgID + '-svg-r', true).first().attr('fill', '#cfc');
        this.setValue(this.getSignature());
        this.isConfirmed = true;
        
        this.fireEvent('confirm', this);
    },
    // private
    // Subclasses should provide the validation implementation by overriding this
    validateValue : function(value){
        if(this.allowBlank){
            return true;
        }
        
        if(this.isConfirmed){
            return true;
        }
        return false;
    }
});