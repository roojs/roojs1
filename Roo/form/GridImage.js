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
 * @class Roo.form.GridImage
 * @extends Roo.form.Field
 * Static image for grid-style form layouts (e.g. home dashboard logo).
 * @cfg {String} src Image URL (absolute or site-relative)
 * @cfg {String} alt Alt text for the img element
 * @constructor
 * @param {Object} config Configuration options
 */
Roo.form.GridImage = function(config){
    Roo.form.GridImage.superclass.constructor.call(this, config);
};

Roo.extend(Roo.form.GridImage, Roo.form.Field, {
    fieldLabel : '',
    labelSeparator : '',
    inputType : 'hidden',
    allowBlank : true,
    value : '',
    src : '',
    alt : '',
    itemCls : 'x-form-item-grid-image',
    focusClass : undefined,
    fieldClass : 'x-form-field',

    getResizeEl : function(){
        return this.wrap;
    },

    getPositionEl : function(){
        return this.wrap;
    },

    initEvents : Roo.emptyFn,

    onRender : function(ct, position){
        Roo.form.GridImage.superclass.onRender.call(this, ct, position);
        this.wrap = this.el.wrap({cls: 'x-form-grid-image-wrap'});
        this.viewEl = this.wrap.createChild({
            tag : 'img',
            cls : 'x-form-grid-image',
            src : this.src || '',
            alt : this.alt || ''
        });
    }
});
