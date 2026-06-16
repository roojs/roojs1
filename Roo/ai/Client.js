/*
 * - LGPL
 *
 * OpenAI-compatible streaming LLM client.
 * Logic from ko-ai - MIT License, Copyright developit
 * https://github.com/developit/ko-ai
 */

/**
 * @class Roo.ai.Client
 * @extends Roo.util.Observable
 * @cfg {String} apiKey API key for the provider
 * @cfg {String} baseURL Base URL for the API (default https://api.openai.com/v1)
 * @cfg {String} model Model name
 * @cfg {String} instructions System instructions (responses mode)
 * @cfg {String} mode API mode: responses or completions
 * @cfg {Array|false} tools Tool definitions with call handlers
 * @cfg {String|false} chat_id Pman relay session id (sent in request body)
 * @constructor
 * @param {Object} config
 */
Roo.ai.Client = function(config) {
    Roo.ai.Client.superclass.constructor.call(this, config || {});
    this.addEvents({
        /**
         * @event text
         * Fires for each text chunk from the model.
         * @param {Roo.ai.Client} this
         * @param {String} chunk
         */
        'text' : true,
        /**
         * @event toolcall
         * Fires when the model requests a tool call.
         * @param {Roo.ai.Client} this
         * @param {String} id
         * @param {String} name
         * @param {Object} args
         */
        'toolcall' : true,
        /**
         * @event toolresult
         * Fires when a tool call completes.
         * @param {Roo.ai.Client} this
         * @param {String} id
         * @param {String} name
         * @param {*} result
         */
        'toolresult' : true,
        /**
         * @event complete
         * Fires when the response stream finishes.
         * @param {Roo.ai.Client} this
         */
        'complete' : true,
        /**
         * @event error
         * Fires on request or stream errors.
         * @param {Roo.ai.Client} this
         * @param {Error} err
         */
        'error' : true
    });
    this.messages = false;
    this.conversation = false;
    this.abortCtrl = false;
};

Roo.extend(Roo.ai.Client, Roo.util.Observable, {

    apiKey : '',
    baseURL : 'https://api.openai.com/v1',
    model : '',
    instructions : '',
    mode : 'responses',
    tools : false,
    stream : true,
    headers : false,
    chat_id : false,
    onToolCall : false,
    temperature : false,
    max_output_tokens : false,
    reasoning : false,

    /**
     * Send a user message and stream the response.
     *
     * @param {String} input User message text
     * @return {Roo.ai.Client} this
     */
    send : function(input)
    {
        var me = this;

        this.initHistory();

        if (this.abortCtrl) {
            this.abortCtrl.abort();
        }
        this.abortCtrl = typeof AbortController !== 'undefined' ? new AbortController() : false;

        var iter = this.createSendStream(
            input,
            {},
            this.abortCtrl ? this.abortCtrl.signal : false
        );

        var pump = function(result) {
            if (result.done || (result.value && result.value.type === 'done')) {
                me.fireEvent('complete', me);
                return;
            }

            var chunk = result.value;
            if (chunk.type === 'text') {
                me.fireEvent('text', me, chunk.text);
            }
            if (chunk.type === 'tool_call') {
                var args = {};
                try {
                    args = JSON.parse(chunk.function.arguments || '{}');
                } catch (e) {
                    args = {};
                }
                me.fireEvent('toolcall', me, chunk.id, chunk.function.name, args);
            }
            if (chunk.type === 'tool_result') {
                me.fireEvent('toolresult', me, chunk.id, chunk.function.name, chunk.result);
            }
            return iter.next().then(pump);
        };

        iter.next().then(pump).catch(function(err) {
            me.fireEvent('error', me, err);
        });

        return this;
    },

    /**
     * Abort the current request.
     */
    abort : function()
    {
        if (!this.abortCtrl) {
            return;
        }
        this.abortCtrl.abort();
        this.abortCtrl = false;
    },

    initHistory : function()
    {
        if (this.messages !== false) {
            return;
        }
        this.messages = [];
        if (this.mode === 'completions' && this.instructions) {
            this.messages.push({ role : 'system', content : this.instructions });
        }
        this.conversation = [];
    },

    isCompletionsMode : function()
    {
        return this.mode === 'completions';
    },

    callTool : function(name, args)
    {
        var tool = false;

        for (var i = 0; i < (this.tools ? this.tools.length : 0); i += 1) {
            if (this.tools[i].name !== name) {
                continue;
            }
            tool = this.tools[i];
            break;
        }

        try {
            if (tool && tool.call) {
                return Promise.resolve(tool.call(args));
            }
            if (this.onToolCall) {
                return Promise.resolve(this.onToolCall(name, args));
            }
            throw new Error(name);
        } catch (e) {
            return Promise.resolve({ error : e.message || e });
        }
    },

    wrapToolsForCompletions : function(tools)
    {
        var out = [];

        for (var i = 0; i < tools.length; i += 1) {
            out.push({
                type : tools[i].type,
                function : {
                    name : tools[i].name,
                    description : tools[i].description,
                    parameters : tools[i].parameters
                }
            });
        }
        return out;
    },

    buildRequestBody : function(input, overrides)
    {
        var body = {
            stream : overrides.stream !== undefined ? overrides.stream : this.stream,
            model : overrides.model || this.model
        };
        var temperature = overrides.temperature !== undefined ? overrides.temperature : this.temperature;
        var maxOutputTokens = overrides.max_output_tokens !== undefined
            ? overrides.max_output_tokens
            : this.max_output_tokens;
        var reasoning = overrides.reasoning !== undefined ? overrides.reasoning : this.reasoning;
        var tools = overrides.tools !== undefined ? overrides.tools : this.tools;

        if (temperature !== false) {
            body.temperature = temperature;
        }
        if (maxOutputTokens !== false) {
            body.max_output_tokens = maxOutputTokens;
        }
        if (reasoning !== false) {
            body.reasoning = reasoning;
        }
        if (tools !== false) {
            body.tools = tools;
        }

        if (!this.isCompletionsMode()) {
            if (this.instructions) {
                body.instructions = this.instructions;
            }
            if (input) {
                this.conversation.push({ type : 'message', role : 'user', content : input });
            }
            if (this.chat_id) {
                body.chat_id = this.chat_id;
            }
            return body;
        }

        if (input) {
            this.messages.push({ role : 'user', content : input });
        }
        if (body.tools) {
            body.tools = this.wrapToolsForCompletions(body.tools);
        }
        body.messages = this.messages;
        if (body.max_output_tokens != null) {
            body.max_tokens = body.max_output_tokens;
            delete body.max_output_tokens;
        }
        if (this.chat_id) {
            body.chat_id = this.chat_id;
        }
        return body;
    },

    saveAssistantMessage : function(completions, assistantContent, reasoningContent)
    {
        if (!completions || (!assistantContent && !reasoningContent)) {
            return;
        }
        var msg = { role : 'assistant' };
        if (assistantContent) {
            msg.content = assistantContent;
        }
        if (reasoningContent) {
            msg.reasoning_content = reasoningContent;
        }
        this.messages.push(msg);
    },

    appendToolResultsCompletions : function(pendingCalls, results, assistantContent, reasoningContent)
    {
        var msg = {
            role : 'assistant',
            content : assistantContent || null,
            tool_calls : []
        };

        if (reasoningContent) {
            msg.reasoning_content = reasoningContent;
        }
        for (var i = 0; i < pendingCalls.length; i += 1) {
            msg.tool_calls.push({
                id : pendingCalls[i].id,
                type : 'function',
                function : pendingCalls[i].function
            });
        }
        this.messages.push(msg);
        for (var j = 0; j < pendingCalls.length; j += 1) {
            this.messages.push({
                role : 'tool',
                tool_call_id : pendingCalls[j].id,
                content : JSON.stringify(results[j].result)
            });
        }
    },

    pushOutputItems : function(outputItems)
    {
        for (var i = 0; i < outputItems.length; i += 1) {
            this.conversation.push(outputItems[i]);
        }
    },

    appendToolResultsResponses : function(outputItems, pendingCalls, results)
    {
        this.pushOutputItems(outputItems);
        for (var i = 0; i < pendingCalls.length; i += 1) {
            this.conversation.push({
                type : 'function_call_output',
                call_id : pendingCalls[i].id,
                output : JSON.stringify(results[i].result)
            });
        }
    },

    parseCompletionsChoice : function(data, state)
    {
        var delta = data.choices[0].delta || data.choices[0].message;
        var call = null;

        if (delta.reasoning) {
            return { type : 'reasoning', text : delta.reasoning, id : state.messageId + '_R' };
        }
        if (delta.content) {
            return { type : 'text', text : delta.content, id : state.messageId };
        }
        if (!delta.tool_calls) {
            return null;
        }

        for (var i = 0; i < delta.tool_calls.length; i += 1) {
            var tc = delta.tool_calls[i];
            var idx = tc.index !== undefined ? tc.index : 0;
            call = state.toolCallMap[idx];
            if (!call) {
                call = {
                    type : 'tool_call',
                    id : '',
                    streaming : true,
                    function : { name : '', arguments : '' }
                };
                state.toolCallMap[idx] = call;
                state.pendingCalls.push(call);
            }
            if (tc.id) {
                call.id = tc.id;
            }
            if (tc.function && tc.function.name) {
                call.function.name += tc.function.name;
            }
            if (tc.function && tc.function.arguments) {
                call.function.arguments += tc.function.arguments;
                state.toolYield = call;
            }
        }
        return call;
    },

    parseResponsesEvent : function(data, state)
    {
        if (data.delta) {
            var isReasoning = data.type.indexOf('reasoning') !== -1;
            return {
                type : isReasoning ? 'reasoning' : 'text',
                text : data.delta,
                id : isReasoning ? state.messageId + '_R' : state.messageId
            };
        }

        if (data.item && data.item.type === 'function_call') {
            var id = data.item.call_id || data.item.id || '';
            var pending = state.toolCallMap[id];
            if (pending) {
                pending.function.arguments += data.item.arguments;
                state.toolYield = pending;
                return pending;
            }
            var chunk = {
                type : 'tool_call',
                id : id,
                streaming : true,
                function : {
                    name : data.item.name || '',
                    arguments : data.item.arguments || ''
                }
            };
            state.pendingCalls.push(chunk);
            state.toolCallMap[id] = chunk;
            return chunk;
        }

        var resp = data.response || data;
        if (resp.status !== 'completed') {
            return (data.usage || data.type === 'response.completed') ? data : null;
        }

        if (resp.output) {
            for (var i = 0; i < resp.output.length; i += 1) {
                state.outputItems.push(resp.output[i]);
            }
            if (!state.stream) {
                for (var j = 0; j < resp.output.length; j += 1) {
                    var item = resp.output[j];
                    if (item.type === 'function_call') {
                        state.pendingCalls.push({
                            type : 'tool_call',
                            id : item.call_id,
                            function : item
                        });
                    }
                    for (var c = 0; c < (item.content ? item.content.length : 0); c += 1) {
                        if (!item.content[c].text) {
                            continue;
                        }
                        state.textYield = {
                            type : 'text',
                            text : item.content[c].text,
                            id : state.messageId
                        };
                    }
                }
            }
        }

        state.completed = true;
        if (!state.pendingCalls.length) {
            state.doneYield = { type : 'done' };
        }
        return null;
    },

    pushStreamChunk : function(state, chunk)
    {
        if (!state.pendingNext) {
            state.queue.push(chunk);
            return;
        }
        state.pendingNext.resolve({ done : false, value : chunk });
        state.pendingNext = false;
    },

    finishSendStream : function(state)
    {
        state.done = true;
        if (!state.pendingNext) {
            return;
        }
        state.pendingNext.resolve({ done : true, value : undefined });
        state.pendingNext = false;
    },

    failSendStream : function(state, err)
    {
        state.done = true;
        state.error = err;
        if (!state.pendingNext) {
            return;
        }
        state.pendingNext.reject(err);
        state.pendingNext = false;
    },

    createSendStream : function(input, overrides, signal)
    {
        var me = this;
        var state = {
            queue : [],
            done : false,
            error : false,
            pendingNext : false
        };

        me.runSendStream(input, overrides, signal, state).catch(function(err) {
            me.failSendStream(state, err);
        });

        return {
            next : function() {
                if (state.error) {
                    return Promise.reject(state.error);
                }
                if (state.queue.length) {
                    return Promise.resolve({ done : false, value : state.queue.shift() });
                }
                if (state.done) {
                    return Promise.resolve({ done : true, value : undefined });
                }
                return new Promise(function(resolve, reject) {
                    state.pendingNext = { resolve : resolve, reject : reject };
                });
            }
        };
    },

    finishStreamDone : function(completions, assistantContent, reasoningContent, outputItems, state)
    {
        this.saveAssistantMessage(completions, assistantContent, reasoningContent);
        if (!completions && outputItems.length) {
            this.pushOutputItems(outputItems);
        }
        this.pushStreamChunk(state, { type : 'done' });
        this.finishSendStream(state);
    },

    getRequestHeaders : function()
    {
        var headers = { 'content-type' : 'application/json' };
        if (this.headers) {
            Roo.apply(headers, this.headers);
        }
        if (this.apiKey) {
            headers.authorization = 'Bearer ' + this.apiKey;
        }
        return headers;
    },

    prepareStreamLine : function(dataLine, stream, pendingCalls)
    {
        if (!stream) {
            return dataLine;
        }
        if (dataLine.indexOf('data: ') !== 0) {
            return false;
        }
        dataLine = dataLine.slice(6);
        if (dataLine === '[DONE]') {
            return pendingCalls.length ? false : '[DONE]';
        }
        return dataLine;
    },

    parseStreamDataLine : function(dataLine, roundCtx, stream, state, completions)
    {
        var parseState = {
            messageId : roundCtx.messageId,
            pendingCalls : roundCtx.pendingCalls,
            toolCallMap : roundCtx.toolCallMap,
            outputItems : roundCtx.outputItems,
            stream : stream,
            toolYield : false,
            textYield : false,
            doneYield : false,
            completed : false
        };
        var chunk = null;

        try {
            var data = JSON.parse(dataLine);
            roundCtx.messageId = data.id || (data.response ? data.response.id : '') || roundCtx.messageId;
            chunk = data.choices && data.choices[0]
                ? this.parseCompletionsChoice(data, parseState)
                : null;
            if (!chunk) {
                chunk = this.parseResponsesEvent(data, parseState);
            }
            roundCtx.pendingCalls = parseState.pendingCalls;

            if (parseState.toolYield) {
                this.pushStreamChunk(state, parseState.toolYield);
            }
            if (parseState.textYield) {
                this.pushStreamChunk(state, parseState.textYield);
            }
            if (parseState.doneYield) {
                if (!completions && roundCtx.outputItems.length) {
                    this.pushOutputItems(roundCtx.outputItems);
                }
                this.pushStreamChunk(state, parseState.doneYield);
                this.finishSendStream(state);
                return 'finish';
            }
            if (parseState.completed && roundCtx.pendingCalls.length) {
                return 'continue';
            }
        } catch (e) {
            chunk = null;
        }

        if (!chunk || chunk.type === 'tool_call') {
            return 'continue';
        }
        if (chunk.type === 'text') {
            roundCtx.assistantContent += chunk.text;
        }
        if (chunk.type === 'reasoning') {
            roundCtx.reasoningContent += chunk.text;
        }
        this.pushStreamChunk(state, chunk);
        return 'ok';
    },

    processStreamLines : function(lines, roundCtx, stream, state, completions)
    {
        for (var i = 0; i < lines.length; i += 1) {
            var dataLine = this.prepareStreamLine(lines[i], stream, roundCtx.pendingCalls);
            if (dataLine === false) {
                continue;
            }
            if (dataLine === '[DONE]') {
                this.finishStreamDone(
                    completions,
                    roundCtx.assistantContent,
                    roundCtx.reasoningContent,
                    roundCtx.outputItems,
                    state
                );
                return 'finish';
            }
            if (this.parseStreamDataLine(dataLine, roundCtx, stream, state, completions) === 'finish') {
                return 'finish';
            }
        }
        return 'ok';
    },

    readFetchStream : function(response, roundCtx, stream, signal, state, completions)
    {
        var me = this;
        var reader = response.body.getReader();
        var decoder = new TextDecoder();
        var buffer = '';

        var readChunks = function() {
            if (signal && signal.aborted) {
                throw new Error();
            }

            var lines = stream ? buffer.split('\n') : [buffer];
            if (stream) {
                buffer = lines.pop() || '';
            }

            if (me.processStreamLines(lines, roundCtx, stream, state, completions) === 'finish') {
                return;
            }

            return reader.read().then(function(readResult) {
                if (!readResult.done) {
                    buffer += decoder.decode(readResult.value, { stream : true });
                    return readChunks();
                }
                if (stream && buffer.trim()) {
                    buffer += '\ndata: [DONE]';
                    return readChunks();
                }
            });
        };

        return readChunks().then(function() {
            reader.releaseLock();
        });
    },

    finalizeStreamRound : function(roundCtx, state, completions, body, runRound)
    {
        if (state.done) {
            return Promise.resolve();
        }
        if (!roundCtx.pendingCalls.length) {
            this.finishStreamDone(
                completions,
                roundCtx.assistantContent,
                roundCtx.reasoningContent,
                roundCtx.outputItems,
                state
            );
            return Promise.resolve();
        }

        var me = this;
        for (var k = 0; k < roundCtx.pendingCalls.length; k += 1) {
            roundCtx.pendingCalls[k].streaming = false;
            me.pushStreamChunk(state, roundCtx.pendingCalls[k]);
        }

        return Promise.all(roundCtx.pendingCalls.map(function(call) {
            return me.callTool(
                call.function.name,
                JSON.parse(call.function.arguments || '{}')
            ).then(function(result) {
                return Roo.apply({ type : 'tool_result', result : result }, call);
            });
        })).then(function(results) {
            for (var r = 0; r < results.length; r += 1) {
                me.pushStreamChunk(state, results[r]);
            }

            body.tool_choice = undefined;
            if (completions) {
                me.appendToolResultsCompletions(
                    roundCtx.pendingCalls,
                    results,
                    roundCtx.assistantContent,
                    roundCtx.reasoningContent
                );
            }
            if (!completions) {
                me.appendToolResultsResponses(roundCtx.outputItems, roundCtx.pendingCalls, results);
            }
            return runRound();
        });
    },

    fetchStreamRound : function(endpoint, body, roundCtx, stream, signal, state, completions, runRound)
    {
        var me = this;

        return fetch(endpoint, {
            method : 'POST',
            headers : me.getRequestHeaders(),
            body : JSON.stringify(body),
            signal : signal
        }).then(function(response) {
            var cid = response.headers.get('x-roo-ai-chat-id');
            if (cid) {
                me.chat_id = cid;
            }
            if (!response.ok) {
                return response.text().then(function(text) {
                    throw new Error(text);
                });
            }
            return me.readFetchStream(response, roundCtx, stream, signal, state, completions).then(function() {
                return me.finalizeStreamRound(roundCtx, state, completions, body, runRound);
            });
        });
    },

    runSendStream : function(input, overrides, signal, state)
    {
        var me = this;
        var completions = this.isCompletionsMode();
        var endpoint = this.baseURL + (completions ? '/chat/completions' : '/responses');
        var body = this.buildRequestBody(input, overrides || {});
        var stream = body.stream !== false;

        var runRound = function() {
            var roundCtx = {
                pendingCalls : [],
                toolCallMap : {},
                outputItems : [],
                assistantContent : '',
                reasoningContent : '',
                messageId : ''
            };

            if (!completions && me.conversation.length) {
                body.input = me.conversation;
            }

            return me.fetchStreamRound(
                endpoint, body, roundCtx, stream, signal, state, completions, runRound
            );
        };

        return runRound();
    }
});
