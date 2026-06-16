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
 * @cfg {Boolean} fitContainer Size the outer panel when using a separate resizeEl (default true)
 * @cfg {String} waitingText Label for {@link #showWaiting} (default Sending)
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
        cfg.fitContainer = cfg.fitContainer !== false;
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
    this.bodyEl.setStyle('overflow', 'auto');

    if (this.streaming) {
        this.parser = new Roo.MarkdownParser(this.bodyEl);
    }

    if (initialContent) {
        this.setContent(initialContent);
    }

    if (this.region && this.region.panelSize) {
        this.setSize(this.region.panelSize.width, this.region.panelSize.height);
    }
};

Roo.extend(Roo.panel.StreamBox, Roo.panel.Content, {

    content : '',
    streaming : true,
    region : 'center',
    fitToFrame : true,
    fitContainer : true,
    parser : false,
    bodyEl : false,
    messageEl : false,
    waitingEl : false,
    waitingTimer : false,
    waitingText : 'Sending',

    /**
     * Show an animated waiting label while a reply is pending.
     *
     * @param {String} text (optional) Label before the animated dots
     * @return {Roo.panel.StreamBox} this
     */
    showWaiting : function(text)
    {
        if (!this.bodyEl) {
            return this;
        }
        this.hideWaiting();
        var label = text || this.waitingText;
        this.waitingEl = this.bodyEl.createChild({
            cls : 'roo-chat-msg roo-chat-msg-assistant roo-streambox-waiting roo-markdown',
            cn : [
                { tag : 'span', cls : 'roo-streambox-waiting-text', html : label },
                { tag : 'span', cls : 'roo-streambox-waiting-dots', html : '' }
            ]
        });
        var dotsEl = this.waitingEl.select('.roo-streambox-waiting-dots', true).first();
        var dots = ['', '.', '..', '...'];
        var step = 0;
        this.waitingTimer = setInterval(function() {
            step = (step + 1) % dots.length;
            dotsEl.dom.innerHTML = dots[step];
        }, 400);
        this.scrollToEnd();
        return this;
    },

    /**
     * Remove the waiting label.
     *
     * @return {Roo.panel.StreamBox} this
     */
    hideWaiting : function()
    {
        if (this.waitingTimer) {
            clearInterval(this.waitingTimer);
            this.waitingTimer = false;
        }
        if (this.waitingEl) {
            this.waitingEl.remove();
            this.waitingEl = false;
        }
        return this;
    },

    /**
     * @param {Roo.layout.Region} region
     */
    setRegion : function(region)
    {
        Roo.panel.StreamBox.superclass.setRegion.call(this, region);
        if (region && region.panelSize) {
            this.setSize(region.panelSize.width, region.panelSize.height);
        }
    },

    /**
     * Keep the scroll body filling the outer frame after border layout resizes.
     *
     * @param {Number} width
     * @param {Number} height
     */
    setSize : function(width, height)
    {
        Roo.panel.StreamBox.superclass.setSize.call(this, width, height);
        this.syncBodySize();
    },

    /**
     * Size the scroll body to the outer frame's client box.
     */
    syncBodySize : function()
    {
        if (!this.bodyEl || !this.el) {
            return;
        }
        var outer = this.el.dom;
        var body = this.bodyEl.dom;
        body.style.width = outer.clientWidth + 'px';
        body.style.height = outer.clientHeight + 'px';
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
        var scroll = function() {
            dom.scrollTop = dom.scrollHeight;
        };
        scroll();
        if (typeof requestAnimationFrame !== 'undefined') {
            requestAnimationFrame(scroll);
        }
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
        this.hideWaiting();
        var wrap = this.bodyEl.createChild({
            cls : 'roo-chat-msg roo-chat-msg-' + role + ' roo-markdown'
        });
        this.messageEl = wrap;
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
        this.messageEl = false;
        if (this.streaming && this.bodyEl) {
            this.parser = new Roo.MarkdownParser(this.bodyEl);
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
        this.hideWaiting();
        if (!this.messageEl) {
            this.beginMessage('assistant');
        }
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
        this.hideWaiting();
        if (this.streaming && this.parser) {
            this.parser.end();
        }
        this.messageEl = false;
        if (this.streaming && this.bodyEl) {
            this.parser = new Roo.MarkdownParser(this.bodyEl);
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
        this.hideWaiting();
        this.messageEl = false;
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
        this.hideWaiting();
        this.messageEl = false;
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
