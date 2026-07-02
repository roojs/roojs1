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
 * @class Roo.form.GridSpacer
 * @extends Roo.form.Field
 * Vertical gap between {@link Roo.form.GridButton} rows in grid-style forms.
 * @cfg {Number} height Gap height in pixels (default 6)
 * @constructor
 * @param {Object} config Configuration options
 */
Roo.form.GridSpacer = function(config){
    Roo.form.GridSpacer.superclass.constructor.call(this, config);
};

Roo.extend(Roo.form.GridSpacer, Roo.form.Field, {
    fieldLabel : '',
    labelSeparator : '',
    inputType : 'hidden',
    allowBlank : true,
    value : '',
    height : 6,
    itemCls : 'x-form-item-grid-spacer',
    focusClass : undefined,
    fieldClass : 'x-form-field',
    actionMode : 'fieldEl',

    getResizeEl : function(){
        return this.wrap;
    },

    getPositionEl : function(){
        return this.wrap;
    },

    initEvents : Roo.emptyFn,

    // private
    onRender : function(ct, position){
        Roo.form.GridSpacer.superclass.onRender.call(this, ct, position);
        this.wrap = this.el.wrap({cls: 'x-form-grid-spacer-wrap'});
        this.viewEl = this.wrap.createChild({
            tag : 'div',
            cls : 'x-form-grid-spacer',
            style : 'height:' + (this.height || 6) + 'px'
        });
    }
});
