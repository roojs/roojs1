/*
 * @class Roo.form.Action.Sse
 * @extends Roo.util.Observable
 * Fetch + ReadableStream parser for custom SSE-style responses (event:/data: lines).
 * Fires events; wire UI (MessageBox, form.afterAction) in listeners.
 * Requires Roo.util.Observable and {@link Roo.form.Action} (base) loaded first.
 *
 * Global stream lifecycle: {@link Roo.form.Action.Sse.global} fires begin(sse) / end(sse). Use .on on that
 * instance or {@link Roo.form.Action.Sse.onBegin} / {@link Roo.form.Action.Sse.onEnd}.
 */
Roo.form.Action.Sse = function(config) {
    config = config || {};
    config.events = Roo.applyIf(config.events || {}, {
        begin: true,
        end: true,
        progress: true,
        error: true,
        complete: true,
        streamend: true,
        readerror: true,
        fetcherror: true,
        parseerror: true
    });
    Roo.form.Action.Sse.superclass.constructor.call(this, config);
};

Roo.extend(Roo.form.Action.Sse, Roo.util.Observable, {

    /**
     * POST formData to url, then read stream.
     * @param {String} url
     * @param {FormData} formData
     */
    start: function(url, formData) {
        var _this = this;
        Roo.form.Action.Sse.global.fireEvent('begin', this);
        Roo.MessageBox.progress("Processing", "Starting...");
        fetch(url, {
            method: 'POST',
            body: formData
        }).then(function(response) {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.status);
            }
            var state = {
                reader: response.body.getReader(),
                decoder: new TextDecoder(),
                buffer: '',
                chunkCount: 0,
                currentEvent: null,
                finished: false,
                fakeProgressInterval: null,
                baseProgress: 0,
                progressMessage: 'Processing...'
            };
            _this.readLoop(state);
        }).catch(function(error) {
            Roo.MessageBox.hide();
            Roo.form.Action.Sse.global.fireEvent('end', _this);
            _this.fireEvent('fetcherror', _this, error);
        });
    },

    stopFakeProgress: function(state) {
        if (state.fakeProgressInterval) {
            clearInterval(state.fakeProgressInterval);
            state.fakeProgressInterval = null;
        }
    },

    startFakeProgress: function(state, realProgress, message, totalSteps) {
        this.stopFakeProgress(state);
        state.baseProgress = realProgress;
        state.progressMessage = message || 'Processing...';
        totalSteps = totalSteps || 1;
        var stepSpace = 100 / totalSteps;
        var oscillateStep = stepSpace * 0.20;
        var tickCount = 0;
        var maxOffset = 4;
        var minBounce = 2;
        var currentOffset = 0;
        var goingUp = true;
        var inBouncePhase = false;
        state.fakeProgressInterval = setInterval(function() {
            tickCount++;
            var displayedProgress;
            if (!inBouncePhase) {
                currentOffset = tickCount;
                if (currentOffset >= maxOffset) {
                    currentOffset = maxOffset;
                    inBouncePhase = true;
                    goingUp = false;
                }
                displayedProgress = state.baseProgress + (currentOffset * oscillateStep);
                Roo.MessageBox.updateProgress(
                    displayedProgress / 100,
                    state.progressMessage
                );
                return;
            }
            if (goingUp) {
                currentOffset++;
                if (currentOffset >= maxOffset) {
                    currentOffset = maxOffset;
                    goingUp = false;
                }
                displayedProgress = state.baseProgress + (currentOffset * oscillateStep);
                Roo.MessageBox.updateProgress(
                    displayedProgress / 100,
                    state.progressMessage
                );
                return;
            }
            currentOffset--;
            if (currentOffset <= minBounce) {
                currentOffset = minBounce;
                goingUp = true;
            }
            displayedProgress = state.baseProgress + (currentOffset * oscillateStep);
            Roo.MessageBox.updateProgress(
                displayedProgress / 100,
                state.progressMessage
            );
        }, 1000);
    },

    handleDataEvent: function(state, data) {
        var ev = state.currentEvent;
        if (ev === 'progress' && data.progress !== undefined) {
            Roo.MessageBox.updateProgress(
                data.progress / 100,
                data.message || 'Processing...'
            );
            this.startFakeProgress(state, data.progress, data.message, data.total);
            this.fireEvent('progress', this, data);
            return;
        }
        if (ev === 'error') {
            state.finished = true;
            this.stopFakeProgress(state);
            Roo.form.Action.Sse.global.fireEvent('end', this);
            this.fireEvent('error', this, data);
            return;
        }
        if (ev === 'complete') {
            state.finished = true;
            this.stopFakeProgress(state);
            Roo.form.Action.Sse.global.fireEvent('end', this);
            Roo.MessageBox.hide();
            this.fireEvent('complete', this, data);
        }
    },

    handleJsonParseError: function(state, jsonStr) {
        state.finished = true;
        this.stopFakeProgress(state);
        Roo.form.Action.Sse.global.fireEvent('end', this);
        this.fireEvent('parseerror', this, jsonStr);
    },

    processLine: function(state, line) {
        if (line.trim() === '') {
            return;
        }
        if (line.startsWith('event: ')) {
            state.currentEvent = line.substring(7).trim();
            return;
        }
        if (!line.startsWith('data: ')) {
            return;
        }
        var jsonStr = line.substring(6);
        try {
            var data = JSON.parse(jsonStr);
            this.handleDataEvent(state, data);
            state.currentEvent = null;
        } catch (e) {
            this.handleJsonParseError(state, jsonStr);
        }
    },

    onReadResult: function(state, result) {
        state.chunkCount++;
        if (result.done) {
            this.stopFakeProgress(state);
            Roo.form.Action.Sse.global.fireEvent('end', this);
            if (!state.finished) {
                Roo.MessageBox.hide();
            }
            this.fireEvent('streamend', this);
            return;
        }
        if (state.finished) {
            return;
        }
        var chunk = state.decoder.decode(result.value, {stream: true});
        state.buffer += chunk;
        var lines = state.buffer.split('\n');
        state.buffer = lines.pop();
        var _this = this;
        lines.forEach(function(line) {
            _this.processLine(state, line);
        });
        if (!state.finished) {
            this.readLoop(state);
        }
    },

    onReadError: function(state, error) {
        if (state.finished) {
            return;
        }
        state.finished = true;
        this.stopFakeProgress(state);
        Roo.form.Action.Sse.global.fireEvent('end', this);
        this.fireEvent('readerror', this, error);
    },

    readLoop: function(state) {
        var _this = this;
        state.reader.read().then(function(result) {
            _this.onReadResult(state, result);
        }).catch(function(error) {
            _this.onReadError(state, error);
        });
    }
});

/** @type {Roo.form.Action.Sse} Shared bus: fires begin(sse) / end(sse) for any active stream (use .on). */
Roo.form.Action.Sse.global = new Roo.form.Action.Sse();

/**
 * Shorthand for Roo.form.Action.Sse.global.on('begin', ...).
 * @param {Function} fn (sse)
 * @param {Object} scope (optional)
 * @param {Object} o (optional) listener options (delay, single, etc.)
 */
Roo.form.Action.Sse.onBegin = function(fn, scope, o) {
    Roo.form.Action.Sse.global.on('begin', fn, scope, o);
};

/**
 * Shorthand for Roo.form.Action.Sse.global.on('end', ...).
 * @param {Function} fn (sse)
 * @param {Object} scope (optional)
 * @param {Object} o (optional) listener options
 */
Roo.form.Action.Sse.onEnd = function(fn, scope, o) {
    Roo.form.Action.Sse.global.on('end', fn, scope, o);
};
