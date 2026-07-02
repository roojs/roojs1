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
 * @class Roo.form.GridButton
 * @extends Roo.form.Field
 * Block button for grid-style form navigation (e.g. home dashboard columns).
 * Fires {@link #click} via {@link #listeners} — not legacy Roo.Button handler.
 * @cfg {String} text Visible button label
 * @cfg {String} cls Variant name: primary, secondary, light, warning (maps to x-form-grid-btn-* CSS)
 * @cfg {Object} listeners Use listeners.click for navigation
 * @constructor
 * @param {Object} config Configuration options
 */
Roo.form.GridButton = function(config){
    Roo.form.GridButton.superclass.constructor.call(this, config);
    this.addEvents({
        /**
         * @event click
         * @param {Roo.form.GridButton} this
         * @param {Roo.EventObject} e
         */
        click : true
    });
};

Roo.extend(Roo.form.GridButton, Roo.form.Field, {
    fieldLabel : '',
    labelSeparator : '',
    inputType : 'hidden',
    allowBlank : true,
    value : '',
    text : '',
    itemCls : 'x-form-item-grid-btn',
    focusClass : undefined,
    fieldClass : 'x-form-field',

    getResizeEl : function(){
        return this.wrap;
    },

    getPositionEl : function(){
        return this.wrap;
    },

    isClickable : function(){
        var ce = this.events['click'];
        return ce && ce.listeners && ce.listeners.length > 0;
    },

    // private
    initEvents : function(){
        Roo.form.GridButton.superclass.initEvents.call(this);
        if (this.viewEl && this.isClickable()) {
            this.viewEl.on('click', this.onBtnClick, this);
        }
    },

    onBtnClick : function(e){
        this.fireEvent('click', this, e);
    },

    // private
    onRender : function(ct, position){
        var variant = this.cls;
        delete this.cls;

        Roo.form.GridButton.superclass.onRender.call(this, ct, position);

        var btnCls = 'x-form-grid-btn';
        if (variant) {
            btnCls += ' x-form-grid-btn-' + variant;
        }
        if (this.isClickable()) {
            btnCls += ' x-form-grid-btn-clickable';
        }

        this.wrap = this.el.wrap({cls: 'x-form-grid-btn-wrap'});
        this.viewEl = this.wrap.createChild({ tag: 'div', cls: btnCls });

        if (this.text) {
            this.setText(this.text);
        } else if (this.value) {
            this.setText(this.value);
        }
    },

    setText : function(t){
        this.text = t || '';
        if (this.viewEl) {
            this.viewEl.dom.innerHTML = Roo.util.Format.htmlEncode(this.text);
        }
        this.setValue(this.text);
    },

    setValue : function(v){
        v = typeof(v) == 'undefined' || v === null ? '' : String(v);
        this.value = v;
        if (this.viewEl) {
            this.text = v;
            this.viewEl.dom.innerHTML = Roo.util.Format.htmlEncode(v);
        }
        if (this.el) {
            Roo.form.GridButton.superclass.setValue.call(this, v);
        }
    }
});
