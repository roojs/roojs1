/*
 * - LGPL
 *
 * StreamBox — read-only streaming markdown display panel
 */

/**
 * @class Roo.bootstrap.panel.StreamBox
 * @extends Roo.bootstrap.Component
 * @parent builder Roo.bootstrap.layout.Border
 * Read-only panel that renders markdown incrementally while streaming,
 * or via {@link Roo.Markdown.toHtml} when streaming is disabled.
 *
 * @cfg {String} content Initial markdown content
 * @cfg {Boolean} streaming Use {@link Roo.MarkdownParser} when true (default true)
 * @cfg {String} region Border layout region (center|north|south|east|west)
 * @constructor
 * @param {Object} config
 */
Roo.bootstrap.panel.StreamBox = function(config)
{
    Roo.bootstrap.panel.StreamBox.superclass.constructor.call(this, config);
    this.addEvents({
        /**
         * @event chunk
         * Fires after each chunk is appended.
         * @param {Roo.bootstrap.panel.StreamBox} this
         * @param {String} chunk
         */
        'chunk' : true,
        /**
         * @event complete
         * Fires when streaming ends via {@link #end}.
         * @param {Roo.bootstrap.panel.StreamBox} this
         */
        'complete' : true,
        /**
         * @event activate
         * Fires when this panel is activated in a border region.
         * @param {Roo.bootstrap.panel.StreamBox} this
         */
        'activate' : true,
        /**
         * @event deactivate
         * Fires when this panel is deactivated in a border region.
         * @param {Roo.bootstrap.panel.StreamBox} this
         */
        'deactivate' : true
    });
};

Roo.extend(Roo.bootstrap.panel.StreamBox, Roo.bootstrap.Component, {

    content : '',
    streaming : true,
    region : 'center',
    parser : false,
    bodyEl : false,
    active : false,

    /**
     * DomHelper config for the panel element.
     *
     * @return {Object}
     */
    getAutoCreate : function()
    {
        return {
            tag : 'div',
            cls : 'roo-layout-inactive-content roo-streambox',
            cn : [
                { tag : 'div', cls : 'roo-streambox-body roo-markdown', style : 'overflow:auto;height:100%' }
            ]
        };
    },

    /**
     * @param {Roo.Element} ct Container element
     * @param {String} position DOM insert position
     */
    onRender : function(ct, position)
    {
        Roo.bootstrap.panel.StreamBox.superclass.onRender.call(this, ct, position);
        this.bodyEl = this.el.select('.roo-streambox-body', true).first();
        if (this.streaming) {
            this.parser = new Roo.MarkdownParser(this.bodyEl);
        }
        if (this.content) {
            this.setContent(this.content);
        }
        this.initEvents();
    },

    /**
     * Start a new chat message bubble; subsequent {@link #append} / {@link #end}
     * calls render into that bubble until the next beginMessage or {@link #reset}.
     *
     * @param {String} role user or assistant
     * @return {Roo.bootstrap.panel.StreamBox} this
     */
    beginMessage : function(role)
    {
        if (!this.rendered) {
            this.render();
        }
        var wrap = this.bodyEl.createChild({
            cls : 'roo-chat-msg roo-chat-msg-' + role + ' roo-markdown'
        });
        if (this.streaming) {
            this.parser = new Roo.MarkdownParser(wrap);
        }
        return this;
    },

    /**
     * Append a complete chat message bubble.
     *
     * @param {String} text Markdown source
     * @param {String} role user or assistant
     * @return {Roo.bootstrap.panel.StreamBox} this
     */
    appendMessage : function(text, role)
    {
        this.beginMessage(role);
        if (this.streaming && this.parser) {
            this.parser.write(text);
            this.parser.end();
        }
        this.fireEvent('chunk', this, text);
        return this;
    },

    /**
     * Append a markdown chunk to the display.
     *
     * @param {String} chunk Markdown text
     * @return {Roo.bootstrap.panel.StreamBox} this
     */
    append : function(chunk)
    {
        if (!this.rendered) {
            this.render();
        }
        if (this.streaming) {
            this.parser.write(chunk);
        }
        this.fireEvent('chunk', this, chunk);
        return this;
    },

    /**
     * Finalize the current stream (closes open markdown constructs).
     *
     * @return {Roo.bootstrap.panel.StreamBox} this
     */
    end : function()
    {
        if (this.streaming && this.parser) {
            this.parser.end();
        }
        this.fireEvent('complete', this);
        return this;
    },

    /**
     * Clear content and reset the parser.
     *
     * @return {Roo.bootstrap.panel.StreamBox} this
     */
    reset : function()
    {
        if (!this.rendered) {
            return this;
        }
        if (this.streaming && this.parser) {
            this.parser.reset();
            this.parser = new Roo.MarkdownParser(this.bodyEl);
            return this;
        }
        this.bodyEl.dom.innerHTML = '';
        return this;
    },

    /**
     * Replace content with the given markdown text.
     *
     * @param {String} text Markdown source
     * @return {Roo.bootstrap.panel.StreamBox} this
     */
    setContent : function(text)
    {
        if (!this.rendered) {
            this.render();
        }
        if (this.streaming) {
            this.parser.reset();
            this.parser.write(text);
            this.parser.end();
            return this;
        }
        this.bodyEl.update(Roo.Markdown.toHtml(text));
        return this;
    },

    /**
     * Returns this panel's element for border layout regions.
     *
     * @return {Roo.Element}
     */
    getEl : function()
    {
        return this.el;
    },

    /**
     * Called by a border region when this panel is added.
     *
     * @param {Roo.bootstrap.layout.Region|false} region
     */
    setRegion : function(region)
    {
        this.region = region;
        this.setActiveClass(!!region);
    },

    /**
     * Toggle active/inactive CSS classes for border layout.
     *
     * @param {Boolean} state
     */
    setActiveClass : function(state)
    {
        if (state) {
            this.el.replaceClass('roo-layout-inactive-content', 'roo-layout-active-content');
            this.el.setStyle('position', 'relative');
            return;
        }
        this.el.replaceClass('roo-layout-active-content', 'roo-layout-inactive-content');
        this.el.setStyle('position', 'absolute');
    },

    /**
     * Activate or deactivate this panel in a border region.
     *
     * @param {Boolean} active
     * @return {Boolean}
     */
    setActiveState : function(active)
    {
        this.active = active;
        this.setActiveClass(active);
        if (!active) {
            if (this.fireEvent('deactivate', this) === false) {
                return false;
            }
            return true;
        }
        this.fireEvent('activate', this);
        return true;
    }
});
