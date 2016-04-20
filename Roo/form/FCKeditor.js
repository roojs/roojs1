//<script type="text/javascript">

/**
 * @class Roo.form.FCKeditor
 * @extends Roo.form.TextArea
 * Wrapper around the FCKEditor http://www.fckeditor.net
 * @constructor
 * Creates a new FCKeditor
 * @param {Object} config Configuration options
 */
Roo.form.FCKeditor = function(config){
    Roo.form.FCKeditor.superclass.constructor.call(this, config);
    this.addEvents({
         /**
         * @event editorinit
         * Fired when the editor is initialized - you can add extra handlers here..
         * @param {FCKeditor} this
         * @param {Object} the FCK object.
         */
        editorinit : true
    });
    
    
};
Roo.form.FCKeditor.editors = { };
Roo.extend(Roo.form.FCKeditor, Roo.form.TextArea,
{
    //defaultAutoCreate : {
    //    tag : "textarea",style   : "width:100px;height:60px;" ,autocomplete    : "off"
    //},
    // private
    /**
     * @cfg {Object} fck options - see fck manual for details.
     */
    fckconfig : false,
    
    /**
     * @cfg {Object} fck toolbar set (Basic or Default)
     */
    toolbarSet : 'Basic',
    /**
     * @cfg {Object} fck BasePath
     */ 
    basePath : '/fckeditor/',
    
    
    frame : false,
    
    value : '',
    
   
    onRender : function(ct, position)
    {
        if(!this.el){
            this.defaultAutoCreate = {
                tag: "textarea",
                style:"width:300px;height:60px;",
                autocomplete: "new-password"
            };
        }
        Roo.form.FCKeditor.superclass.onRender.call(this, ct, position);
        /*
        if(this.grow){
            this.textSizeEl = Roo.DomHelper.append(document.body, {tag: "pre", cls: "x-form-grow-sizer"});
            if(this.preventScrollbars){
                this.el.setStyle("overflow", "hidden");
            }
            this.el.setHeight(this.growMin);
        }
        */
        //console.log('onrender' + this.getId() );
        Roo.form.FCKeditor.editors[this.getId()] = this;
         

        this.replaceTextarea() ;
        
    },
    
    getEditor : function() {
        return this.fckEditor;
    },
    /**
     * Sets a data value into the field and validates it.  To set the value directly without validation see {@link #setRawValue}.
     * @param {Mixed} value The value to set
     */
    
    
    setValue : function(value)
    {
        //console.log('setValue: ' + value);
        
        if(typeof(value) == 'undefined') { // not sure why this is happending...
            return;
        }
        Roo.form.FCKeditor.superclass.setValue.apply(this,[value]);
        
        //if(!this.el || !this.getEditor()) {
        //    this.value = value;
            //this.setValue.defer(100,this,[value]);    
        //    return;
        //} 
        
        if(!this.getEditor()) {
            return;
        }
        
        this.getEditor().SetData(value);
        
        //

    },

    /**
     * Returns the normalized data value (undefined or emptyText will be returned as '').  To return the raw value see {@link #getRawValue}.
     * @return {Mixed} value The field value
     */
    getValue : function()
    {
        
        if (this.frame && this.frame.dom.style.display == 'none') {
            return Roo.form.FCKeditor.superclass.getValue.call(this);
        }
        
        if(!this.el || !this.getEditor()) {
           
           // this.getValue.defer(100,this); 
            return this.value;
        }
       
        
        var value=this.getEditor().GetData();
        Roo.form.FCKeditor.superclass.setValue.apply(this,[value]);
        return Roo.form.FCKeditor.superclass.getValue.call(this);
        

    },

    /**
     * Returns the raw data value which may or may not be a valid, defined value.  To return a normalized value see {@link #getValue}.
     * @return {Mixed} value The field value
     */
    getRawValue : function()
    {
        if (this.frame && this.frame.dom.style.display == 'none') {
            return Roo.form.FCKeditor.superclass.getRawValue.call(this);
        }
        
        if(!this.el || !this.getEditor()) {
            //this.getRawValue.defer(100,this); 
            return this.value;
            return;
        }
        
        
        
        var value=this.getEditor().GetData();
        Roo.form.FCKeditor.superclass.setRawValue.apply(this,[value]);
        return Roo.form.FCKeditor.superclass.getRawValue.call(this);
         
    },
    
    setSize : function(w,h) {
        
        
        
        //if (this.frame && this.frame.dom.style.display == 'none') {
        //    Roo.form.FCKeditor.superclass.setSize.apply(this, [w, h]);
        //    return;
        //}
        //if(!this.el || !this.getEditor()) {
        //    this.setSize.defer(100,this, [w,h]); 
        //    return;
        //}
        
        
        
        Roo.form.FCKeditor.superclass.setSize.apply(this, [w, h]);
        
        this.frame.dom.setAttribute('width', w);
        this.frame.dom.setAttribute('height', h);
        this.frame.setSize(w,h);
        
    },
    
    toggleSourceEdit : function(value) {
        
      
         
        this.el.dom.style.display = value ? '' : 'none';
        this.frame.dom.style.display = value ?  'none' : '';
        
    },
    
    
    focus: function(tag)
    {
        if (this.frame.dom.style.display == 'none') {
            return Roo.form.FCKeditor.superclass.focus.call(this);
        }
        if(!this.el || !this.getEditor()) {
            this.focus.defer(100,this, [tag]); 
            return;
        }
        
        
        
        
        var tgs = this.getEditor().EditorDocument.getElementsByTagName(tag);
        this.getEditor().Focus();
        if (tgs.length) {
            if (!this.getEditor().Selection.GetSelection()) {
                this.focus.defer(100,this, [tag]); 
                return;
            }
            
            
            var r = this.getEditor().EditorDocument.createRange();
            r.setStart(tgs[0],0);
            r.setEnd(tgs[0],0);
            this.getEditor().Selection.GetSelection().removeAllRanges();
            this.getEditor().Selection.GetSelection().addRange(r);
            this.getEditor().Focus();
        }
        
    },
    
    
    
    replaceTextarea : function()
    {
        if ( document.getElementById( this.getId() + '___Frame' ) ) {
            return ;
        }
        //if ( !this.checkBrowser || this._isCompatibleBrowser() )
        //{
            // We must check the elements firstly using the Id and then the name.
        var oTextarea = document.getElementById( this.getId() );
        
        var colElementsByName = document.getElementsByName( this.getId() ) ;
         
        oTextarea.style.display = 'none' ;

        if ( oTextarea.tabIndex ) {            
            this.TabIndex = oTextarea.tabIndex ;
        }
        
        this._insertHtmlBefore( this._getConfigHtml(), oTextarea ) ;
        this._insertHtmlBefore( this._getIFrameHtml(), oTextarea ) ;
        this.frame = Roo.get(this.getId() + '___Frame')
    },
    
    _getConfigHtml : function()
    {
        var sConfig = '' ;

        for ( var o in this.fckconfig ) {
            sConfig += sConfig.length > 0  ? '&amp;' : '';
            sConfig += encodeURIComponent( o ) + '=' + encodeURIComponent( this.fckconfig[o] ) ;
        }

        return '<input type="hidden" id="' + this.getId() + '___Config" value="' + sConfig + '" style="display:none" />' ;
    },
    
    
    _getIFrameHtml : function()
    {
        var sFile = 'fckeditor.html' ;
        /* no idea what this is about..
        try
        {
            if ( (/fcksource=true/i).test( window.top.location.search ) )
                sFile = 'fckeditor.original.html' ;
        }
        catch (e) { 
        */

        var sLink = this.basePath + 'editor/' + sFile + '?InstanceName=' + encodeURIComponent( this.getId() ) ;
        sLink += this.toolbarSet ? ( '&amp;Toolbar=' + this.toolbarSet)  : '';
        
        
        var html = '<iframe id="' + this.getId() +
            '___Frame" src="' + sLink +
            '" width="' + this.width +
            '" height="' + this.height + '"' +
            (this.tabIndex ?  ' tabindex="' + this.tabIndex + '"' :'' ) +
            ' frameborder="0" scrolling="no"></iframe>' ;

        return html ;
    },
    
    _insertHtmlBefore : function( html, element )
    {
        if ( element.insertAdjacentHTML )	{
            // IE
            element.insertAdjacentHTML( 'beforeBegin', html ) ;
        } else { // Gecko
            var oRange = document.createRange() ;
            oRange.setStartBefore( element ) ;
            var oFragment = oRange.createContextualFragment( html );
            element.parentNode.insertBefore( oFragment, element ) ;
        }
    }
    
    
  
    
    
    
    

});

//Roo.reg('fckeditor', Roo.form.FCKeditor);

function FCKeditor_OnComplete(editorInstance){
    var f = Roo.form.FCKeditor.editors[editorInstance.Name];
    f.fckEditor = editorInstance;
    //console.log("loaded");
    f.fireEvent('editorinit', f, editorInstance);
} 
  

 















