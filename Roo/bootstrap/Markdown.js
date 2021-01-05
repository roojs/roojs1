 
/*
 * - LGPL
 */

/**
 * @class Roo.bootstrap.Markdown
 * @extends Roo.bootstrap.TextArea
 * Bootstrap Showdown editable area
 * @cfg {string} content
 * 
 * @constructor
 * Create a new Showdown
 */

Roo.bootstrap.Markdown = function(config){
    Roo.bootstrap.Markdown.superclass.constructor.call(this, config);
   
};

Roo.extend(Roo.bootstrap.Markdown, Roo.bootstrap.TextArea,  {
    
    editing :false,
    
    initEvents : function()
    {
        
        Roo.bootstrap.TextArea.prototype.initEvents.call(this);
        this.markdownEl = this.el.createChild({
            cls : 'roo-markdown-area'
        });
        this.inputEl().addClass('d-none');
        var v = this.getValue();
        if (v === false) {
            v = '';
        }
        this.markdownEl.dom.innerHTML = Roo.Markdown.toHtml(Roo.util.Format.htmlEncode(this.getValue()));
        this.markdownEl.on('click', this.toggleTextEdit, this);
        this.on('blur', this.toggleTextEdit, this);
        this.on('specialkey', this.resizeTextArea, this);
    },
    
    toggleTextEdit : function()
    {
        var sh = this.markdownEl.getHeight();
        this.inputEl().addClass('d-none');
        this.markdownEl.addClass('d-none');
        if (!this.editing) {
            // show editor?
            this.inputEl().setHeight(Math.min(500, Math.max(sh,(this.getValue().split("\n").length+1) * 30)));
            this.inputEl().removeClass('d-none');
            this.inputEl().focus();
            this.editing = true;
            return;
        }
        // show showdown...
        this.updateMarkdown();
        this.markdownEl.removeClass('d-none');
        this.editing = false;
        return;
    },
    updateMarkdown : function()
    {
        if (this.getValue() == '') {
            this.markdownEl.dom.innerHTML = String.format('<span class="roo-placeholder">{0}</span>', this.placeholder);
            return;
        }
        this.markdownEl.dom.innerHTML = Roo.Markdown.toHtml(Roo.util.Format.htmlEncode(this.getValue()));
    },
    
    resizeTextArea: function () {
        
        var sh = 100;
        Roo.log([sh, this.getValue().split("\n").length * 30]);
        this.inputEl().setHeight(Math.min(500, Math.max(sh, (this.getValue().split("\n").length +1) * 30)));
    },
    setValue : function(val)
    {
        Roo.bootstrap.TextArea.prototype.setValue.call(this,val);
        if (!this.editing) {
            this.updateMarkdown();
        }
        
    },
    focus : function()
    {
        if (!this.editing) {
            this.toggleTextEdit();
        }
        
    }


});