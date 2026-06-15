/*
 * - LGPL
 *
 * StreamBox — read-only streaming markdown display panel
 */

/**
 * @class Roo.panel.StreamBox
 * @extends Roo.panel.Content
 * @parent builder Roo.layout.Border
 * Read-only panel that renders markdown incrementally while streaming,
 * or via {@link Roo.Markdown.toHtml} when streaming is disabled.
 *
 * @cfg {String} content Initial markdown content
 * @cfg {Boolean} streaming Use {@link Roo.MarkdownParser} when true (default true)
 * @cfg {Boolean} fitToFrame Resize with the border layout region (default true)
 * @cfg {String} region Border layout region (center|north|south|east|west)
 * @constructor
 * @param {String/HTMLElement/Roo.Element} el The container element for this panel
 * @param {String/Object} config A string to set only the title or a config object
 * @param {String} content (optional) Initial markdown content
 */
Roo.panel.StreamBox = function(el, config, content)
{
    var cfg = config;
    if (el && el.autoCreate) {
        cfg = el;
        el = Roo.id();
        content = false;
    }
    cfg = cfg || {};
    if (typeof cfg == 'string') {
        content = content || false;
    } else {
        cfg.fitToFrame = cfg.fitToFrame !== false;
        cfg.autoScroll = false;
    }

    var initialContent = content || cfg.content || '';
    if (cfg.content) {
        delete cfg.content;
    }

    Roo.panel.StreamBox.superclass.constructor.call(this, el, cfg, false);

    this.addEvents({
        /**
         * @event chunk
         * Fires after each chunk is appended.
         * @param {Roo.panel.StreamBox} this
         * @param {String} chunk
         */
        'chunk' : true,
        /**
         * @event complete
         * Fires when streaming ends via {@link #end}.
         * @param {Roo.panel.StreamBox} this
         */
        'complete' : true
    });

    this.el.addClass('x-streambox');
    this.bodyEl = this.el.createChild({ cls : 'x-streambox-body roo-markdown' });
    this.on('resize', this.syncBodySize, this);
    this.on('activate', this.syncBodySize, this);

    if (this.streaming) {
        this.parser = new Roo.MarkdownParser(this.bodyEl);
    }

    if (initialContent) {
        this.setContent(initialContent);
    }
    this.syncBodySize();
};

Roo.extend(Roo.panel.StreamBox, Roo.panel.Content, {

    content : '',
    streaming : true,
    region : 'center',
    fitToFrame : true,
    parser : false,
    bodyEl : false,

    /**
     * Size the scroll body to match the panel after a layout resize.
     */
    syncBodySize : function()
    {
        if (!this.bodyEl || !this.fitToFrame) {
            return;
        }
        var w = this.el.getWidth();
        var h = this.el.getHeight();
        if (w > 0) {
            this.bodyEl.setWidth(w);
        }
        if (h > 0) {
            this.bodyEl.setHeight(h);
        }
    },

    /**
     * Scroll the body to show the latest streamed content.
     */
    scrollToEnd : function()
    {
        if (!this.bodyEl) {
            return;
        }
        var dom = this.bodyEl.dom;
        dom.scrollTop = dom.scrollHeight;
    },

    /**
     * Start a new chat message bubble; subsequent {@link #append} / {@link #end}
     * calls render into that bubble until the next beginMessage or {@link #reset}.
     *
     * @param {String} role user or assistant
     * @return {Roo.panel.StreamBox} this
     */
    beginMessage : function(role)
    {
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
     * @return {Roo.panel.StreamBox} this
     */
    appendMessage : function(text, role)
    {
        this.beginMessage(role);
        if (this.streaming && this.parser) {
            this.parser.write(text);
            this.parser.end();
        }
        this.scrollToEnd();
        this.fireEvent('chunk', this, text);
        return this;
    },

    /**
     * Append a markdown chunk to the display.
     *
     * @param {String} chunk Markdown text
     * @return {Roo.panel.StreamBox} this
     */
    append : function(chunk)
    {
        if (this.streaming && this.parser) {
            this.parser.write(chunk);
        }
        this.scrollToEnd();
        this.fireEvent('chunk', this, chunk);
        return this;
    },

    /**
     * Finalize the current stream (closes open markdown constructs).
     *
     * @return {Roo.panel.StreamBox} this
     */
    end : function()
    {
        if (this.streaming && this.parser) {
            this.parser.end();
        }
        this.scrollToEnd();
        this.fireEvent('complete', this);
        return this;
    },

    /**
     * Clear content and reset the parser.
     *
     * @return {Roo.panel.StreamBox} this
     */
    reset : function()
    {
        if (!this.bodyEl) {
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
     * @param {Boolean} loadScripts (optional) ignored when streaming
     * @return {Roo.panel.StreamBox} this
     */
    setContent : function(text, loadScripts)
    {
        if (this.streaming && this.parser) {
            this.parser.reset();
            this.parser.write(text);
            this.parser.end();
            this.scrollToEnd();
            return this;
        }
        this.bodyEl.update(Roo.Markdown.toHtml(text), loadScripts);
        this.scrollToEnd();
        return this;
    }
});
