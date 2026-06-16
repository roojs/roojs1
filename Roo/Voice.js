/*
 * - LGPL
 *
 * Speech-to-text for text fields using the Web Speech API.
 */

/**
 * @class Roo.Voice
 * @extends Roo.util.Observable
 * Speech-to-text helper for text inputs and textareas.
 * Press Ctrl+Shift+Space while the field is focused to start and stop dictation.
 *
 * @cfg {String/HTMLElement/Roo.Element} el The input or textarea element
 * @cfg {String} lang BCP 47 language tag (defaults to the browser language)
 * @cfg {String} hint Hint text shown below the field (defaults to Ctrl+Shift+Space message)
 * @cfg {Boolean} showHint True to render a hint element (defaults to true)
 *
 * @event start
 * Fires when speech recognition starts.
 * @param {Roo.Voice} this
 *
 * @event result
 * Fires when a final transcript is inserted.
 * @param {Roo.Voice} this
 * @param {String} text The transcribed text
 *
 * @event end
 * Fires when speech recognition stops.
 * @param {Roo.Voice} this
 *
 * @event error
 * Fires on speech recognition errors.
 * @param {Roo.Voice} this
 * @param {String} message Error description
 *
 * @constructor
 * @param {Object} config
 */
Roo.Voice = function(config)
{
    config = config || {};
    Roo.apply(this, config);

    this.addEvents({
        start : true,
        result : true,
        end : true,
        error : true
    });

    Roo.Voice.superclass.constructor.call(this, config);

    this.el = Roo.get(this.el);
    this.recognition = false;
    this.keyMap = false;
    this.hintEl = false;
    this.listening = false;
    this.insertPos = 0;
    this.insertEnd = 0;

    if (this.el) {
        this.initRecognition();
        this.initHotkey();
    }
};

Roo.extend(Roo.Voice, Roo.util.Observable, {

  /**
   * @cfg {String} lang
   */
    lang : false,

  /**
   * @cfg {String} hint
   */
    hint : false,

  /**
   * @cfg {Boolean} showHint
   */
    showHint : true,

  /**
   * @cfg {String} listeningHint
   */
    listeningHint : 'Listening... Press Ctrl+Shift+Space to stop',

    /**
     * Default hint text for the dictation hotkey.
     *
     * @return {String}
     */
    getDefaultHint : function()
    {
        return 'Press Ctrl+Shift+Space to dictate';
    },

    /**
     * Append a hint element below a form field container.
     *
     * @param {String/HTMLElement/Roo.Element} container Parent element (e.g. form-group)
     * @return {Roo.Voice} this
     */
    renderHint : function(container)
    {
        if (!this.showHint || this.hintEl) {
            return this;
        }

        var text = this.hint || this.getDefaultHint();

        this.hintEl = Roo.DomHelper.append(Roo.get(container), {
            tag : 'small',
            cls : 'roo-voice-hint',
            html : text
        }, true);

        return this;
    },

    /**
     * Start speech recognition.
     *
     * @return {Roo.Voice} this
     */
    start : function()
    {
        if (!this.recognition || this.listening) {
            return this;
        }

        var dom = this.el.dom;

        if (dom.disabled || dom.readOnly) {
            return this;
        }

        this.insertPos = typeof dom.selectionStart === 'number' ? dom.selectionStart : dom.value.length;
        this.insertEnd = typeof dom.selectionEnd === 'number' ? dom.selectionEnd : this.insertPos;

        try {
            this.recognition.start();
        }
        catch (e) {
            Roo.log('Voice start failed: ' + e.message);
        }

        return this;
    },

    /**
     * Stop speech recognition.
     *
     * @return {Roo.Voice} this
     */
    stop : function()
    {
        if (!this.recognition || !this.listening) {
            return this;
        }

        try {
            this.recognition.stop();
        }
        catch (e) {
            Roo.log('Voice stop failed: ' + e.message);
        }

        return this;
    },

    /**
     * Toggle speech recognition on or off.
     *
     * @return {Roo.Voice} this
     */
    toggle : function()
    {
        if (this.listening) {
            this.stop();
        }
        else {
            this.start();
        }
        return this;
    },

    /**
     * Remove listeners and hint element.
     */
    destroy : function()
    {
        this.stop();

        if (this.keyMap) {
            this.keyMap.disable();
            this.keyMap = false;
        }

        if (this.hintEl) {
            this.hintEl.remove();
            this.hintEl = false;
        }

        this.recognition = false;
        this.el = false;
    },

    initRecognition : function()
    {
        var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            return;
        }

        var me = this;

        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = false;
        this.recognition.lang = this.lang || (navigator.language || 'en-US');

        this.recognition.onstart = function()
        {
            me.listening = true;
            me.el.addClass('roo-voice-active');

            if (me.hintEl) {
                me.hintEl.update(me.listeningHint);
                me.hintEl.addClass('roo-voice-hint-active');
            }

            me.fireEvent('start', me);
        };

        this.recognition.onresult = function(event)
        {
            var transcript = '';
            var i;

            for (i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    transcript += event.results[i][0].transcript;
                }
            }

            if (transcript) {
                me.insertTranscript(transcript);
                me.fireEvent('result', me, transcript);
            }
        };

        this.recognition.onerror = function(event)
        {
            var message = event.error || 'Speech recognition failed';

            Roo.log('Voice error: ' + message);
            me.fireEvent('error', me, message);
        };

        this.recognition.onend = function()
        {
            me.listening = false;
            me.el.removeClass('roo-voice-active');

            if (me.hintEl) {
                me.hintEl.update(me.hint || me.getDefaultHint());
                me.hintEl.removeClass('roo-voice-hint-active');
            }

            me.fireEvent('end', me);
        };
    },

    initHotkey : function()
    {
        var me = this;

        this.keyMap = new Roo.KeyMap(this.el, {
            key : Roo.EventObject.SPACE,
            ctrl : true,
            shift : true,
            stopEvent : true,
            fn : function()
            {
                me.toggle();
            }
        });
    },

    insertTranscript : function(text)
    {
        var dom = this.el.dom;
        var value = dom.value;
        var before = value.substring(0, this.insertPos);
        var after = value.substring(this.insertEnd);
        var prefix = '';

        if (before.length && before.charAt(before.length - 1) !== ' ' && text.charAt(0) !== ' ') {
            prefix = ' ';
        }

        var chunk = prefix + text;
        dom.value = before + chunk + after;
        this.insertPos += chunk.length;

        if (dom.setSelectionRange) {
            dom.setSelectionRange(this.insertPos, this.insertPos);
        }

        this.notifyInputChange();
    },

    /**
     * Fire DOM input events after programmatic value changes so listeners
     * (e.g. keyup handlers that enable submit buttons) behave like typing.
     */
    notifyInputChange : function()
    {
        var dom = this.el.dom;
        var evt;

        if (!dom || !dom.dispatchEvent) {
            return;
        }

        if (typeof KeyboardEvent === 'function') {
            evt = new KeyboardEvent('keyup', {
                bubbles : true,
                cancelable : true
            });
            dom.dispatchEvent(evt);
        }
        else if (document.createEvent) {
            evt = document.createEvent('Event');
            evt.initEvent('keyup', true, true);
            dom.dispatchEvent(evt);
        }

        if (typeof Event === 'function') {
            dom.dispatchEvent(new Event('input', {
                bubbles : true,
                cancelable : true
            }));
        }
    }
});

/**
 * Returns true when the Web Speech API is available.
 *
 * @return {Boolean}
 */
Roo.Voice.isSupported = function()
{
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
};
