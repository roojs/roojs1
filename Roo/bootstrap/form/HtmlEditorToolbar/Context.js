  
/**
 * @class Roo.bootstrap.form.HtmlEditorToolbar.Context
 * @parent Roo.bootstrap.form.HtmlEditor
 * @extends Roo.bootstrap.nav.Simplebar
 * Basic Toolbar
 * 
 * @example
 * Usage:
 *
 new Roo.bootstrap.form.HtmlEditor({
    ....
    toolbars : [
        {
            xtyle: 'Standard',
            disable : { fonts: 1 , format: 1, ..., ... , ...],
            btns : [ .... ]
        },
        {
            xtyle : 'Context',
            ....
        }
    }
     
 * 
 * 
 */
 
Roo.bootstrap.form.HtmlEditorToolbar.Context = function(config)
{
    
    Roo.apply(this, config);
    
    
    Roo.bootstrap.form.HtmlEditorToolbar.Context.superclass.constructor.call(this, config);
    
    this.editor = config.editor;
    this.editorcore = config.editor.editorcore;
    
    this.buttons   = new Roo.util.MixedCollection(false, function(o) { return o.cmd; });
    
}
Roo.extend(Roo.bootstrap.form.HtmlEditorToolbar.Context, Roo.bootstrap.nav.Simplebar,  {
    
    editor : false,
    editorcore : false,
    
    
    
});