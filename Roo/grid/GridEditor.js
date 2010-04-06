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

// private - not really -- you end up using it !
// This is a support class used internally by the Grid components

/**
 * @class Roo.grid.GridEditor
 * @extends Roo.Editor
 * Class for creating and editable grid elements.
 * @param {Object} config any settings (must include field)
 */
Roo.grid.GridEditor = function(field, config){
    if (!config && field.field) {
        config = field;
        field = Roo.factory(config.field, Roo.form);
    }
    Roo.grid.GridEditor.superclass.constructor.call(this, field, config);
    field.monitorTab = false;
};

Roo.extend(Roo.grid.GridEditor, Roo.Editor, {
    
    /**
     * @cfg {Roo.form.Field} field Field to wrap (or xtyped)
     */
    
    alignment: "tl-tl",
    autoSize: "width",
    hideEl : false,
    cls: "x-small-editor x-grid-editor",
    shim:false,
    shadow:"frame"
});