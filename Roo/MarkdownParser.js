/*
 * - LGPL
 *
 * Incremental streaming markdown parser.
 * Logic from streaming-markdown (smd) - MIT License, Copyright thetarnav
 * https://github.com/thetarnav/streaming-markdown
 */

/**
 * @class Roo.MarkdownParser
 * @extends Roo.util.Observable
 * @constructor
 * @param {Roo.Element|HTMLElement} container
 */
Roo.MarkdownParser = function(container) {
    Roo.MarkdownParser.superclass.constructor.call(this);
    var el = container.dom ? container.dom : container;
    this.containerEl = el;
    this.renderer = this.createRenderer(el);
    this.parser = this.createParser();
};

Roo.apply(Roo.MarkdownParser, {
    DOCUMENT        :  1,
    PARAGRAPH       :  2,
    HEADING_1       :  3,
    HEADING_2       :  4,
    HEADING_3       :  5,
    HEADING_4       :  6,
    HEADING_5       :  7,
    HEADING_6       :  8,
    CODE_BLOCK      :  9,
    CODE_FENCE      : 10,
    CODE_INLINE     : 11,
    ITALIC_AST      : 12,
    ITALIC_UND      : 13,
    STRONG_AST      : 14,
    STRONG_UND      : 15,
    STRIKE          : 16,
    LINK            : 17,
    RAW_URL         : 18,
    IMAGE           : 19,
    BLOCKQUOTE      : 20,
    LINE_BREAK      : 21,
    RULE            : 22,
    LIST_UNORDERED  : 23,
    LIST_ORDERED    : 24,
    LIST_ITEM       : 25,
    CHECKBOX        : 26,
    TABLE           : 27,
    TABLE_ROW       : 28,
    TABLE_CELL      : 29,
    EQUATION_BLOCK  : 30,
    EQUATION_INLINE : 31,
    NEWLINE         : 101,
    MAYBE_URL       : 102,
    MAYBE_TASK      : 103,
    MAYBE_BR        : 104,
    MAYBE_EQ_BLOCK  : 105,
    HREF            : 1,
    SRC             : 2,
    LANG            : 4,
    CHECKED         : 8,
    START           : 16,
    TOKEN_ARRAY_CAP : 24
});


Roo.extend(Roo.MarkdownParser, Roo.util.Observable, {

    reset : function()
    {
        if (this.parser.pending.length > 0) {
            this.write("\n");
        }
        this.containerEl.innerHTML = '';
        this.renderer = this.createRenderer(this.containerEl);
        this.parser = this.createParser();
    },

    createRenderer : function(root)
    {
        return {
            data : { nodes : [root, , , , , ], index : 0 }
        };
    },

    createParser : function()
    {
        var tokens = new Uint32Array(Roo.MarkdownParser.TOKEN_ARRAY_CAP);
        tokens[0] = Roo.MarkdownParser.DOCUMENT;
        return {
            text       : "",
            pending    : "",
            tokens     : tokens,
            len        : 0,
            token      : Roo.MarkdownParser.DOCUMENT,
            fence_end  : 0,
            blockquote_idx : 0,
            hr_char    : '',
            hr_chars   : 0,
            fence_start : 0,
            spaces     : new Uint8Array(Roo.MarkdownParser.TOKEN_ARRAY_CAP),
            indent     : "",
            indent_len : 0,
            table_state : 0
        };
    },

    end : function()
    {
        if (this.parser.pending.length > 0) {
            this.write("\n");
        }
    },

    write : function(chunk)
    {
        for (var ci = 0; ci < chunk.length; ci++) {
            var char = chunk.charAt(ci);

            if (this.parser.token === Roo.MarkdownParser.NEWLINE) {
                if (this.writeNewlineIndent(char)) {
                    continue;
                }
            }

            var pending_with_char = this.parser.pending + char;

            if (this.writeTokenChar(char, pending_with_char)) {
                continue;
            }

            if (this.writeCommonPending(char, pending_with_char)) {
                continue;
            }

            this.parser.text += this.parser.pending;
            this.parser.pending = char;
        }

        this.addText();
    },

    writeTokenChar : function(char, pending_with_char)
    {
        switch (this.parser.token) {
            case Roo.MarkdownParser.LINE_BREAK:
            case Roo.MarkdownParser.DOCUMENT:
            case Roo.MarkdownParser.BLOCKQUOTE:
            case Roo.MarkdownParser.LIST_ORDERED:
            case Roo.MarkdownParser.LIST_UNORDERED:
                return this.writeRootToken(char, pending_with_char);
            case Roo.MarkdownParser.TABLE:
                return this.writeTableToken(char, pending_with_char);
            case Roo.MarkdownParser.TABLE_ROW:
                return this.writeTableRowToken(char, pending_with_char);
            case Roo.MarkdownParser.TABLE_CELL:
                return this.writeTableCellToken(char);
            case Roo.MarkdownParser.CODE_BLOCK:
                return this.writeCodeBlockToken(pending_with_char);
            case Roo.MarkdownParser.CODE_FENCE:
                return this.writeCodeFenceToken(char, pending_with_char);
            case Roo.MarkdownParser.CODE_INLINE:
                return this.writeCodeInlineToken(char, pending_with_char);
            case Roo.MarkdownParser.MAYBE_TASK:
                return this.writeMaybeTaskToken(char, pending_with_char);
            case Roo.MarkdownParser.STRONG_AST:
            case Roo.MarkdownParser.STRONG_UND:
                return this.writeStrongToken(char, pending_with_char);
            case Roo.MarkdownParser.ITALIC_AST:
            case Roo.MarkdownParser.ITALIC_UND:
                return this.writeItalicToken(char, pending_with_char);
            case Roo.MarkdownParser.STRIKE:
                return this.writeStrikeToken(pending_with_char);
            case Roo.MarkdownParser.MAYBE_EQ_BLOCK:
                return this.writeMaybeEqBlockToken(char, pending_with_char);
            case Roo.MarkdownParser.EQUATION_BLOCK:
                return this.writeEquationBlockToken(pending_with_char);
            case Roo.MarkdownParser.EQUATION_INLINE:
                return this.writeEquationInlineToken(char, pending_with_char);
            case Roo.MarkdownParser.MAYBE_URL:
                return this.writeMaybeUrlToken(char, pending_with_char);
            case Roo.MarkdownParser.LINK:
            case Roo.MarkdownParser.IMAGE:
                return this.writeLinkImageToken(char, pending_with_char);
            case Roo.MarkdownParser.RAW_URL:
                return this.writeRawUrlToken(char, pending_with_char);
            case Roo.MarkdownParser.MAYBE_BR:
                return this.writeMaybeBrToken(char, pending_with_char);
        }
        return false;
    },

    writeNewlineIndent : function(char)
    {
        switch (char) {
            case ' ':
                this.parser.indent_len += 1
                return true
            case '\t':
                this.parser.indent_len += 4
                return true
        }
        
        var indent = this.endTokensToIndent(this.parser.indent_len)
        
        this.parser.indent_len = 0
        this.parser.token = this.parser.tokens[this.parser.len]
        
        if (indent > 0) {
            this.write(" ".repeat(indent))
        }
        return false;
    },

    writeRootToken : function(char, pending_with_char)
    {
        switch (this.parser.pending[0]) {
            case undefined:
                this.parser.pending = char
                return true
            case ' ':
                this.parser.pending = char
                this.parser.indent += ' '
                this.parser.indent_len += 1
                return true
            case '\t':
                this.parser.pending = char
                this.parser.indent += '\t'
                this.parser.indent_len += 4
                return true
            case '\n':
            /*
                Lists can have an empty line in between items:
                1. foo
                <empty>
                2. bar
            */
                if (this.parser.tokens[this.parser.len] === Roo.MarkdownParser.LIST_ITEM && this.parser.token === Roo.MarkdownParser.LINE_BREAK) {
                this.endToken()
                this.clearRootPending()
                this.parser.pending = char
                return true
            }
            /*
                Exit out of tokens
                And ignore newlines in root
            */
                this.endTokensToLen(this.parser.blockquote_idx)
                this.clearRootPending()
                this.parser.blockquote_idx = 0
                this.parser.fence_start = 0
                this.parser.pending = char
                return true
            /* Heading */
            case '#':
            switch (char) {
                case '#':
                    if (this.parser.pending.length < 6) {
                    this.parser.pending = pending_with_char
                    return true
                }
                    break // fail
                case ' ':
                    this.endTokensToIndent(this.parser.indent_len)
                    this.addToken(this.headingFromLevel(this.parser.pending.length))
                    this.clearRootPending()
                    return true
            }
                break // fail
            /* Blockquote */
            case '>': {
                var next_blockquote_idx = this.idxOfToken(Roo.MarkdownParser.BLOCKQUOTE, this.parser.blockquote_idx+1)
        
            /*
                Only when there is no blockquote to the right of blockquote_idx
                a new blockquote can be created
            */
                if (next_blockquote_idx === -1) {
                    this.endTokensToLen(this.parser.blockquote_idx);
                    this.parser.blockquote_idx += 1;
                    this.parser.fence_start = 0;
                    this.addToken(Roo.MarkdownParser.BLOCKQUOTE);
                }
                if (next_blockquote_idx !== -1) {
                    this.parser.blockquote_idx = next_blockquote_idx;
                }

                this.clearRootPending();
                this.parser.pending = char;
                return true;
            }
        /* Horizontal Rule
           "-- - --- - --"
        */
        case '-':
        case '*':
        case '_':
            if (this.parser.hr_chars === 0) {
                this.parser.hr_chars = 1
                this.parser.hr_char = this.parser.pending
            }
        
            if (this.parser.hr_chars > 0) {
                switch (char) {
                    case this.parser.hr_char:
                        this.parser.hr_chars += 1
                        this.parser.pending = pending_with_char
                        return true
                    case ' ':
                        this.parser.pending = pending_with_char
                        return true
                    case '\n':
                        if (this.parser.hr_chars < 3) break
                        this.endTokensToIndent(this.parser.indent_len)
                        this.renderOpenToken(Roo.MarkdownParser.RULE)
                        this.renderCloseToken()
                        this.clearRootPending()
                        this.parser.hr_chars = 0
                        return true
                }
        
                this.parser.hr_chars = 0
            }
        
            /* Unordered list
            /  * foo
            /  * *bar*
            /  * **baz**
            /*/
            if ('_' !== this.parser.pending[0] &&
                ' ' === this.parser.pending[1]
            ) {
                this.continueOrAddList(Roo.MarkdownParser.LIST_UNORDERED)
                this.addListItem(2)
                this.write(pending_with_char.slice(2))
                return true
            }
        
            break // fail
        /* Code Fence */
        case '`':
            /*  ``?
                  ^
            */
            if (this.parser.pending.length < 3) {
                if ('`' === char) {
                    this.parser.pending = pending_with_char
                    this.parser.fence_start = pending_with_char.length
                    return true
                }
                this.parser.fence_start = 0
                break // fail
            }
        
            switch (char) {
                case '`':
                    if (this.parser.pending.length === this.parser.fence_start) {
                        this.parser.pending = pending_with_char;
                        this.parser.fence_start = pending_with_char.length;
                        return true;
                    }
                    this.addToken(Roo.MarkdownParser.PARAGRAPH);
                    this.clearRootPending();
                    this.parser.fence_start = 0;
                    this.write(pending_with_char);
                    return true;
                case '\n':
                    this.endTokensToIndent(this.parser.indent_len);
                    this.addToken(Roo.MarkdownParser.CODE_FENCE);
                    if (this.parser.pending.length > this.parser.fence_start) {
                        this.renderSetAttr(Roo.MarkdownParser.LANG, this.parser.pending.slice(this.parser.fence_start));
                    }
                    this.clearRootPending();
                    this.parser.token = Roo.MarkdownParser.NEWLINE;
                    return true;
                default:
                    this.parser.pending = pending_with_char;
                    return true;
            }
        /*
        List Unordered for '+'
        The other list types are handled with HORIZONTAL_RULE
        */
        case '+':
            if (' ' !== char) break // fail
        
            this.continueOrAddList(Roo.MarkdownParser.LIST_UNORDERED)
            this.addListItem(2)
            return true
        /* List Ordered */
        case '0': case '1': case '2': case '3': case '4':
        case '5': case '6': case '7': case '8': case '9':
            /*
            12. foo
               ^
            */
            if ('.' === this.parser.pending[this.parser.pending.length - 1]) {
                if (' ' !== char) {
                    break;
                }

                if (this.continueOrAddList(Roo.MarkdownParser.LIST_ORDERED) && this.parser.pending !== "1.") {
                    this.renderSetAttr(Roo.MarkdownParser.START, this.parser.pending.slice(0, -1));
                }
                this.addListItem(this.parser.pending.length + 1);
                return true;
            }

            var char_code = char.charCodeAt(0);
            if (char_code === 46 || this.isDigit(char_code)) {
                this.parser.pending = pending_with_char;
                return true;
            }
            break;
        /* Table */
        case '|':
            this.endTokensToLen(this.parser.blockquote_idx)
        
            this.addToken(Roo.MarkdownParser.TABLE)
            this.addToken(Roo.MarkdownParser.TABLE_ROW)
        
            this.parser.pending = ""
            this.write(char)
        
            return true
        }
        
        var to_write = pending_with_char
        
        /* Add a line break and continue in previous token */
        if (this.parser.token === Roo.MarkdownParser.LINE_BREAK) {
            this.parser.token = this.parser.tokens[this.parser.len];
            this.renderOpenToken(Roo.MarkdownParser.LINE_BREAK);
            this.renderCloseToken();
        }

        if (this.parser.indent_len >= 4) {
            var code_start = 0;
            for (; code_start < 4; code_start += 1) {
                if (this.parser.indent[code_start] === '\t') {
                    code_start = code_start + 1;
                    break;
                }
            }
            to_write = this.parser.indent.slice(code_start) + pending_with_char;
            this.addToken(Roo.MarkdownParser.CODE_BLOCK);
            this.clearRootPending();
            this.write(to_write);
            return true;
        }

        this.addToken(Roo.MarkdownParser.PARAGRAPH);
        this.clearRootPending();
        this.write(to_write);
        return true;
    },

    writeTableToken : function(char, pending_with_char)
    {
        if (this.parser.table_state === 1) {
            switch (char) {
                case '-':
                case ' ':
                case '|':
                case ':':
                    this.parser.pending = pending_with_char;
                    return true;
                case '\n':
                    this.parser.table_state = 2;
                    this.parser.pending = "";
                    return true;
                default:
                    this.endToken();
                    this.parser.table_state = 0;
                    break;
            }
            return false;
        }

        switch (this.parser.pending) {
            case "|":
                this.addToken(Roo.MarkdownParser.TABLE_ROW);
                this.parser.pending = "";
                this.write(char);
                return true;
            case "\n":
                this.endToken();
                this.parser.pending = "";
                this.parser.table_state = 0;
                this.write(char);
                return true;
        }
        return false;
    },

    writeTableRowToken : function(char, pending_with_char)
    {
        switch (this.parser.pending) {
            case "":
                break
            case "|":
                this.addToken(Roo.MarkdownParser.TABLE_CELL)
                this.endToken()
                this.parser.pending = ""
                this.write(char)
                return true
            case "\n":
                this.endToken()
                this.parser.table_state = Math.min(this.parser.table_state+1, 2)
                this.parser.pending = ""
                this.write(char)
                return true
            default:
                this.addToken(Roo.MarkdownParser.TABLE_CELL)
                this.write(char)
                return true
        }
        return false;
    },

    writeTableCellToken : function(char)
    {
        if (this.parser.pending === "|") {
            this.addText()
            this.endToken()
            this.parser.pending = ""
            this.write(char)
            return true
        }
        return false
    },

    writeCodeBlockToken : function(pending_with_char)
    {
        switch (pending_with_char) {
            case "\n    ":
            case "\n   \t":
            case "\n  \t":
            case "\n \t":
            case "\n\t":
                this.parser.text += "\n"
                this.parser.pending = ""
                return true
            case "\n":
            case "\n ":
            case "\n  ":
            case "\n   ":
                this.parser.pending = pending_with_char
                return true
            default:
                var char = pending_with_char.charAt(this.parser.pending.length);
                if (this.parser.pending.length !== 0) {
                    this.addText();
                    this.endToken();
                    this.parser.pending = char;
                    return true;
                }
                this.parser.text += char;
                return true;
        }
        return false;
    },

    writeCodeFenceToken : function(char, pending_with_char)
    {
        switch (char) {
            case '`':
            /*  ```\n<code>\n``??
                |                 ^
            */
                this.parser.pending = pending_with_char
                return true
            case '\n':
            /*  ```\n<code>\n```\n
                |                    ^
            */
                if (pending_with_char.length === this.parser.fence_start + this.parser.fence_end + 1) {
                this.addText()
                this.endToken()
                this.parser.pending = ""
                this.parser.fence_start = 0
                this.parser.fence_end = 0
                this.parser.token = Roo.MarkdownParser.NEWLINE
                return true
            }
                this.parser.token = Roo.MarkdownParser.NEWLINE
                break
            case ' ':
            /*  ```\n<code>\n ??
                |                ^  (space after newline is allowed)
            */
                if (this.parser.pending[0] === '\n') {
                this.parser.pending = pending_with_char
                this.parser.fence_end += 1
                return true
            }
                break
        }
        // any other char
        this.parser.text   += this.parser.pending
        this.parser.pending = char
        this.parser.fence_end = 1
        return true
    },

    writeCodeInlineToken : function(char, pending_with_char)
    {
        switch (char) {
            case '`':
                if (pending_with_char.length ===
                    this.parser.fence_start + Number(this.parser.pending[0] === ' ')) {
                    this.addText();
                    this.endToken();
                    this.parser.pending = "";
                    this.parser.fence_start = 0;
                    return true;
                }
                this.parser.pending = pending_with_char;
                return true;
            case '\n':
                this.parser.text += this.parser.pending
                this.parser.pending = ""
                this.parser.token = Roo.MarkdownParser.LINE_BREAK
                this.parser.blockquote_idx = 0
                this.addText()
                return true
            /* Trim space before ` */
            case ' ':
                this.parser.text += this.parser.pending
                this.parser.pending = char
                return true
            default:
                this.parser.text += pending_with_char
                this.parser.pending = ""
                return true
        }
        return false;
    },

    writeMaybeTaskToken : function(char, pending_with_char)
    {
        switch (this.parser.pending.length) {
            case 0:
                if ('[' !== char) break // fail
                this.parser.pending = pending_with_char
                return true
            case 1:
                if (' ' !== char && 'x' !== char) break // fail
                this.parser.pending = pending_with_char
                return true
            case 2:
                if (']' !== char) break // fail
                this.parser.pending = pending_with_char
                return true
            case 3:
                if (' ' !== char) break // fail
                this.renderOpenToken(Roo.MarkdownParser.CHECKBOX)
                if ('x' === this.parser.pending[1]) {
                this.renderSetAttr(Roo.MarkdownParser.CHECKED, "")
            }
                this.renderCloseToken()
                this.parser.pending = " "
                return true
        }
        
        this.parser.token = this.parser.tokens[this.parser.len]
        this.parser.pending = ""
        this.write(pending_with_char)
        return true
    },

    writeStrongToken : function(char, pending_with_char)
    {
        var symbol = '*'
        var italic = Roo.MarkdownParser.ITALIC_AST
        if (this.parser.token === Roo.MarkdownParser.STRONG_UND) {
            symbol = '_'
            italic = Roo.MarkdownParser.ITALIC_UND
        }
        
        if (symbol === this.parser.pending) {
            this.addText()
            /* **Bold**
                      ^
            */
            if (symbol === char) {
                this.endToken()
                this.parser.pending = ""
                return true
            }
            /* **Bold*Bold->Em*
                      ^
            */
            this.addToken(italic)
            this.parser.pending = char
            return true
        }
        
        return false
    },

    writeItalicToken : function(char, pending_with_char)
    {
        var symbol = '*'
        var strong = Roo.MarkdownParser.STRONG_AST
        if (this.parser.token === Roo.MarkdownParser.ITALIC_UND) {
            symbol = '_'
            strong = Roo.MarkdownParser.STRONG_UND
        }
        
        switch (this.parser.pending) {
            case symbol:
                if (symbol === char) {
                    if (this.parser.tokens[this.parser.len - 1] === strong) {
                        this.parser.pending = pending_with_char;
                        return true;
                    }
                    this.addText();
                    this.addToken(strong);
                    this.parser.pending = "";
                    return true;
                }
                this.addText();
                this.endToken();
                this.parser.pending = char;
                return true;
            case symbol + symbol:
                var italic = this.parser.token;
                this.addText();
                this.endToken();
                this.endToken();
                if (symbol !== char) {
                    this.addToken(italic);
                    this.parser.pending = char;
                    return true;
                }
                this.parser.pending = "";
                return true;
        }
        return false
    },

    writeStrikeToken : function(pending_with_char)
    {
        if ("~~" === pending_with_char) {
            this.addText()
            this.endToken()
            this.parser.pending = ""
            return true
        }
        return false
    },

    writeMaybeEqBlockToken : function(char, pending_with_char)
    {
        /*
         \[?  or  $$?
           ^        ^
        */
        if (char === '\n') {
            this.addText();
            this.addToken(Roo.MarkdownParser.EQUATION_BLOCK);
            this.parser.pending = "";
            return true;
        }

        this.parser.token = this.parser.tokens[this.parser.len];
        if (this.parser.pending[0] === '\\') {
            this.parser.text += '[';
        }
        if (this.parser.pending[0] !== '\\') {
            this.parser.text += '$$';
        }
        this.parser.pending = "";
        this.write(char);
        return true;
    },

    writeEquationBlockToken : function(pending_with_char)
    {
        if ("\\]" === pending_with_char || "$$" === pending_with_char) {
            this.addText()
            this.endToken()
            this.parser.pending = ""
            return true
        }
        return false
    },

    writeEquationInlineToken : function(char, pending_with_char)
    {
        if ("\\)" === pending_with_char || "$" === this.parser.pending[0]) {
            this.addText();
            this.endToken();

            if (char === ')') {
                this.parser.pending = "";
                return true;
            }
            this.parser.pending = char;
            return true;
        }
        return false
    },

    writeMaybeUrlToken : function(char, pending_with_char)
    {
        if ("http://" === pending_with_char || "https://" === pending_with_char) {
            this.addText();
            this.addToken(Roo.MarkdownParser.RAW_URL);
            this.parser.pending = pending_with_char;
            this.parser.text = pending_with_char;
            return true;
        }

        if ("http:/"[this.parser.pending.length] === char ||
            "https:/"[this.parser.pending.length] === char) {
            this.parser.pending = pending_with_char;
            return true;
        }

        this.parser.token = this.parser.tokens[this.parser.len];
        this.write(char);
        return true;
    },

    writeLinkImageToken : function(char, pending_with_char)
    {
        if ("]" === this.parser.pending) {
            this.addText();
            if ('(' === char) {
                this.parser.pending = pending_with_char;
                return true;
            }
            this.endToken();
            this.parser.pending = char;
            return true;
        }
        if (']' === this.parser.pending[0] &&
            '(' === this.parser.pending[1]) {
            if (')' === char) {
                var type = this.parser.token === Roo.MarkdownParser.LINK ? Roo.MarkdownParser.HREF : Roo.MarkdownParser.SRC;
                var url = this.parser.pending.slice(2);
                this.renderSetAttr(type, url);
                this.endToken();
                this.parser.pending = "";
                return true;
            }
            this.parser.pending += char;
            return true;
        }
        return false
    },

    writeRawUrlToken : function(char, pending_with_char)
    {
        /* http://example.com?
                             ^
        */
        if (' ' === char || '\n' === char || '\\' === char) {
            this.renderSetAttr(Roo.MarkdownParser.HREF, this.parser.pending);
            this.addText();
            this.endToken();
            this.parser.pending = char;
            return true;
        }

        this.parser.text += char;
        this.parser.pending = pending_with_char;
        return true;
    },

    writeMaybeBrToken : function(char, pending_with_char)
    {
        if (pending_with_char.startsWith("<br")) {
            if (/* "<br" */
                pending_with_char.length === 3 ||
                /* "<br " */
                char === ' ' ||
                /* "<br/" | "<br /" */
                char === '/' && (pending_with_char.length === 4 ||
                                 this.parser.pending[this.parser.pending.length-1] === ' ')
            ) {
                this.parser.pending = pending_with_char
                return true
            }
        
            /* "<br>" | "<br/>" */
            if (char === '>') {
                this.addText()
                this.parser.token = this.parser.tokens[this.parser.len]
                this.renderOpenToken(Roo.MarkdownParser.LINE_BREAK)
                this.renderCloseToken()
                this.parser.pending = ""
                return true
            }
        }
        // Fail
        this.parser.token = this.parser.tokens[this.parser.len]
        this.parser.text += '<'
        this.parser.pending = this.parser.pending.slice(1)
        this.write(char)
        return true
    },

    writeCommonPending : function(char, pending_with_char)
    {
        switch (this.parser.pending[0]) {
            /* Escape character */
            case '\\':
                if (this.parser.token === Roo.MarkdownParser.IMAGE ||
                    this.parser.token === Roo.MarkdownParser.EQUATION_BLOCK ||
                    this.parser.token === Roo.MarkdownParser.EQUATION_INLINE) {
                    break;
                }

                switch (char) {
                    case '(':
                        this.addText();
                        this.addToken(Roo.MarkdownParser.EQUATION_INLINE);
                        this.parser.pending = "";
                        return true;
                    case '[':
                        this.parser.token = Roo.MarkdownParser.MAYBE_EQ_BLOCK;
                        this.parser.pending = pending_with_char;
                        return true;
                    case '\n':
                        this.parser.pending = char;
                        return true;
                    default:
                        var charcode = char.charCodeAt(0);
                        this.parser.pending = "";
                        this.parser.text += this.isDigit(charcode) ||
                            (charcode >= 65 && charcode <= 90) ||
                            (charcode >= 97 && charcode <= 122)
                                ? pending_with_char
                                : char;
                        return true;
                }
            /* Newline */
            case '\n':
                switch (this.parser.token) {
                    case Roo.MarkdownParser.IMAGE:
                    case Roo.MarkdownParser.EQUATION_BLOCK:
                    case Roo.MarkdownParser.EQUATION_INLINE:
                        break;
                    case Roo.MarkdownParser.HEADING_1:
                    case Roo.MarkdownParser.HEADING_2:
                    case Roo.MarkdownParser.HEADING_3:
                    case Roo.MarkdownParser.HEADING_4:
                    case Roo.MarkdownParser.HEADING_5:
                    case Roo.MarkdownParser.HEADING_6:
                        this.addText();
                        this.endTokensToLen(this.parser.blockquote_idx);
                        this.parser.blockquote_idx = 0;
                        this.parser.pending = char;
                        return true;
                    default:
                        this.addText();
                        this.parser.pending = char;
                        this.parser.token = Roo.MarkdownParser.LINE_BREAK;
                        this.parser.blockquote_idx = 0;
                        return true;
                }
                break;
            /* <br> */
            case '<':
                if (this.parser.token === Roo.MarkdownParser.IMAGE ||
                    this.parser.token === Roo.MarkdownParser.EQUATION_BLOCK ||
                    this.parser.token === Roo.MarkdownParser.EQUATION_INLINE) {
                    break;
                }
                this.addText();
                this.parser.pending = pending_with_char;
                this.parser.token = Roo.MarkdownParser.MAYBE_BR;
                return true;
            /* `Code Inline` */
            case '`':
                if (this.parser.token === Roo.MarkdownParser.IMAGE) {
                    break;
                }
                if ('`' === char) {
                    this.parser.fence_start += 1;
                    this.parser.pending = pending_with_char;
                    return true;
                }
                this.parser.fence_start += 1;
                this.addText();
                this.addToken(Roo.MarkdownParser.CODE_INLINE);
                this.parser.text = ' ' === char || '\n' === char ? "" : char;
                this.parser.pending = "";
                return true;
            case '_':
            case '*': {
                if (this.parser.token === Roo.MarkdownParser.IMAGE ||
                    this.parser.token === Roo.MarkdownParser.EQUATION_BLOCK ||
                    this.parser.token === Roo.MarkdownParser.EQUATION_INLINE ||
                    this.parser.token === Roo.MarkdownParser.STRONG_AST) {
                    break;
                }

                var italic = Roo.MarkdownParser.ITALIC_AST;
                var strong = Roo.MarkdownParser.STRONG_AST;
                var symbol = this.parser.pending[0];
                if ('_' === symbol) {
                    italic = Roo.MarkdownParser.ITALIC_UND;
                    strong = Roo.MarkdownParser.STRONG_UND;
                }

                if (this.parser.pending.length === 1) {
                    if (symbol === char) {
                        this.parser.pending = pending_with_char;
                        return true;
                    }
                    if (' ' !== char && '\n' !== char) {
                        this.addText();
                        this.addToken(italic);
                        this.parser.pending = char;
                        return true;
                    }
                    break;
                }

                if (symbol === char) {
                    this.addText();
                    this.addToken(strong);
                    this.addToken(italic);
                    this.parser.pending = "";
                    return true;
                }
                if (' ' !== char && '\n' !== char) {
                    this.addText();
                    this.addToken(strong);
                    this.parser.pending = char;
                    return true;
                }
                break;
            }
            case '~':
                if (this.parser.token === Roo.MarkdownParser.IMAGE ||
                    this.parser.token === Roo.MarkdownParser.STRIKE) {
                    break;
                }
                if ("~" === this.parser.pending) {
                    if ('~' === char) {
                        this.parser.pending = pending_with_char;
                        return true;
                    }
                    break;
                }
                if (' ' !== char && '\n' !== char) {
                    this.addText();
                    this.addToken(Roo.MarkdownParser.STRIKE);
                    this.parser.pending = char;
                    return true;
                }
                break;
            /* $eq$ | $$eq$$ */
            case '$':
                if (this.parser.token === Roo.MarkdownParser.IMAGE ||
                    this.parser.token === Roo.MarkdownParser.STRIKE ||
                    "$" !== this.parser.pending) {
                    break;
                }
                if ('$' === char) {
                    this.parser.token = Roo.MarkdownParser.MAYBE_EQ_BLOCK;
                    this.parser.pending = pending_with_char;
                    return true;
                }
                if (this.isDelimeterOrNumber(char.charCodeAt(0))) {
                    break;
                }
                this.addText();
                this.addToken(Roo.MarkdownParser.EQUATION_INLINE);
                this.parser.pending = char;
                return true;
            /* [Image](url) */
            case '[':
                if (this.parser.token === Roo.MarkdownParser.IMAGE ||
                    this.parser.token === Roo.MarkdownParser.LINK ||
                    this.parser.token === Roo.MarkdownParser.EQUATION_BLOCK ||
                    this.parser.token === Roo.MarkdownParser.EQUATION_INLINE ||
                    ']' === char) {
                    break;
                }
                this.addText();
                this.addToken(Roo.MarkdownParser.LINK);
                this.parser.pending = char;
                return true;
            /* ![Image](url) */
            case '!':
                if (this.parser.token === Roo.MarkdownParser.IMAGE || '[' !== char) {
                    break;
                }
                this.addText();
                this.addToken(Roo.MarkdownParser.IMAGE);
                this.parser.pending = "";
                return true;
            /* Trim spaces */
            case ' ':
                if (this.parser.pending.length === 1 && ' ' === char) {
                    return true;
                }
                break;
        }

        if (this.parser.token !== Roo.MarkdownParser.IMAGE &&
            this.parser.token !== Roo.MarkdownParser.LINK &&
            this.parser.token !== Roo.MarkdownParser.EQUATION_BLOCK &&
            this.parser.token !== Roo.MarkdownParser.EQUATION_INLINE &&
            'h' === char &&
            (" " === this.parser.pending || "" === this.parser.pending)) {
            this.parser.text += this.parser.pending;
            this.parser.pending = char;
            this.parser.token = Roo.MarkdownParser.MAYBE_URL;
            return true;
        }
        return false;
    },


    addText : function()
    {
        if (this.parser.text.length === 0) {
            return;
        }
        this.renderText(this.parser.text);
        this.parser.text = "";
    },

    endToken : function()
    {
        this.parser.len -= 1;
        this.parser.token = this.parser.tokens[this.parser.len];
        this.renderCloseToken();
    },

    addToken : function(token)
    {
        if ((this.parser.tokens[this.parser.len] === Roo.MarkdownParser.LIST_ORDERED ||
             this.parser.tokens[this.parser.len] === Roo.MarkdownParser.LIST_UNORDERED) &&
            token !== Roo.MarkdownParser.LIST_ITEM) {
            this.endToken();
        }

        this.parser.len += 1;
        this.parser.tokens[this.parser.len] = token;
        this.parser.token = token;
        this.renderOpenToken(token);
    },

    idxOfToken : function(token, start_idx)
    {
        while (start_idx <= this.parser.len) {
            if (this.parser.tokens[start_idx] === token) {
                return start_idx;
            }
            start_idx += 1;
        }
        return -1;
    },

    endTokensToLen : function(len)
    {
        this.parser.fence_start = 0;

        while (this.parser.len > len) {
            this.endToken();
        }
    },

    endTokensToIndent : function(indent)
    {
        var idx = 0;
        for (var i = 0; i <= this.parser.len; i += 1) {
            indent -= this.parser.spaces[i];
            if (indent < 0) {
                break;
            }
            switch (this.parser.tokens[i]) {
                case Roo.MarkdownParser.CODE_BLOCK:
                case Roo.MarkdownParser.CODE_FENCE:
                case Roo.MarkdownParser.BLOCKQUOTE:
                case Roo.MarkdownParser.LIST_ITEM:
                    idx = i;
                    break;
            }
        }

        while (this.parser.len > idx) {
            this.endToken();
        }

        return indent;
    },

    continueOrAddList : function(list_token)
    {
        var list_idx = -1;
        var item_idx = -1;

        for (var i = this.parser.blockquote_idx + 1; i <= this.parser.len; i += 1) {
            if (this.parser.tokens[i] === Roo.MarkdownParser.LIST_ITEM) {
                if (this.parser.indent_len < this.parser.spaces[i]) {
                    item_idx = -1;
                    break;
                }
                item_idx = i;
            }
            if (this.parser.tokens[i] === list_token) {
                list_idx = i;
            }
        }

        if (item_idx === -1) {
            if (list_idx === -1) {
                this.endTokensToLen(this.parser.blockquote_idx);
                this.addToken(list_token);
                return true;
            }
            this.endTokensToLen(list_idx);
            return false;
        }
        this.endTokensToLen(item_idx);
        this.addToken(list_token);
        return true;
    },

    addListItem : function(prefix_length)
    {
        this.addToken(Roo.MarkdownParser.LIST_ITEM);
        this.parser.spaces[this.parser.len] = this.parser.indent_len + prefix_length;
        this.clearRootPending();
        this.parser.token = Roo.MarkdownParser.MAYBE_TASK;
    },

    clearRootPending : function()
    {
        this.parser.indent = "";
        this.parser.indent_len = 0;
        this.parser.pending = "";
    },

    isDigit : function(charcode)
    {
        return "0123456789".indexOf(String.fromCharCode(charcode)) !== -1;
    },

    isDelimeter : function(charcode)
    {
        return " :;),!?.]\n".indexOf(String.fromCharCode(charcode)) !== -1;
    },

    isDelimeterOrNumber : function(charcode)
    {
        return this.isDigit(charcode) || this.isDelimeter(charcode);
    },

    headingFromLevel : function(level)
    {
        return Roo.MarkdownParser['HEADING_' + level] || Roo.MarkdownParser.HEADING_6;
    },

    renderOpenToken : function(type)
    {
        var data = this.renderer.data;
        var parent = data.nodes[data.index];
        var slot;

        switch (type) {
            case Roo.MarkdownParser.DOCUMENT:
                return;
            case Roo.MarkdownParser.BLOCKQUOTE:
                slot = document.createElement("blockquote");
                break;
            case Roo.MarkdownParser.PARAGRAPH:
                slot = document.createElement("p");
                break;
            case Roo.MarkdownParser.LINE_BREAK:
                slot = document.createElement("br");
                break;
            case Roo.MarkdownParser.RULE:
                slot = document.createElement("hr");
                break;
            case Roo.MarkdownParser.HEADING_1:
                slot = document.createElement("h1");
                break;
            case Roo.MarkdownParser.HEADING_2:
                slot = document.createElement("h2");
                break;
            case Roo.MarkdownParser.HEADING_3:
                slot = document.createElement("h3");
                break;
            case Roo.MarkdownParser.HEADING_4:
                slot = document.createElement("h4");
                break;
            case Roo.MarkdownParser.HEADING_5:
                slot = document.createElement("h5");
                break;
            case Roo.MarkdownParser.HEADING_6:
                slot = document.createElement("h6");
                break;
            case Roo.MarkdownParser.ITALIC_AST:
            case Roo.MarkdownParser.ITALIC_UND:
                slot = document.createElement("em");
                break;
            case Roo.MarkdownParser.STRONG_AST:
            case Roo.MarkdownParser.STRONG_UND:
                slot = document.createElement("strong");
                break;
            case Roo.MarkdownParser.STRIKE:
                slot = document.createElement("s");
                break;
            case Roo.MarkdownParser.CODE_INLINE:
                slot = document.createElement("code");
                break;
            case Roo.MarkdownParser.RAW_URL:
            case Roo.MarkdownParser.LINK:
                slot = document.createElement("a");
                break;
            case Roo.MarkdownParser.IMAGE:
                slot = document.createElement("img");
                break;
            case Roo.MarkdownParser.LIST_UNORDERED:
                slot = document.createElement("ul");
                break;
            case Roo.MarkdownParser.LIST_ORDERED:
                slot = document.createElement("ol");
                break;
            case Roo.MarkdownParser.LIST_ITEM:
                slot = document.createElement("li");
                break;
            case Roo.MarkdownParser.CHECKBOX:
                slot = document.createElement("input");
                slot.type = "checkbox";
                slot.disabled = true;
                break;
            case Roo.MarkdownParser.CODE_BLOCK:
            case Roo.MarkdownParser.CODE_FENCE:
                parent = parent.appendChild(document.createElement("pre"));
                slot = document.createElement("code");
                break;
            case Roo.MarkdownParser.TABLE:
                slot = document.createElement("table");
                break;
            case Roo.MarkdownParser.TABLE_ROW:
            switch (parent.children.length) {
                case 0:
                    parent = parent.appendChild(document.createElement("thead"));
                    break;
                case 1:
                    parent = parent.appendChild(document.createElement("tbody"));
                    break;
                default:
                    parent = parent.children[1];
            }
                slot = document.createElement("tr");
                break;
            case Roo.MarkdownParser.TABLE_CELL:
                slot = document.createElement(
                (parent.parentElement ? parent.parentElement.tagName : false) === "THEAD" ? "th" : "td"
                );
                break;
            case Roo.MarkdownParser.EQUATION_BLOCK:
                slot = document.createElement("equation-block");
                break;
            case Roo.MarkdownParser.EQUATION_INLINE:
                slot = document.createElement("equation-inline");
                break;
        }

        data.nodes[++data.index] = parent.appendChild(slot);
    },

    renderCloseToken : function()
    {
        this.renderer.data.index -= 1;
    },

    renderText : function(text)
    {
        this.renderer.data.nodes[this.renderer.data.index].appendChild(document.createTextNode(text));
    },

    renderSetAttr : function(type, value)
    {
        this.renderer.data.nodes[this.renderer.data.index].setAttribute(this.attrToHtmlAttr(type), value);
    },

    attrToHtmlAttr : function(type)
    {
        switch (type) {
            case Roo.MarkdownParser.HREF:
                return "href";
            case Roo.MarkdownParser.SRC:
                return "src";
            case Roo.MarkdownParser.LANG:
                return "class";
            case Roo.MarkdownParser.CHECKED:
                return "checked";
            case Roo.MarkdownParser.START:
                return "start";
        }
    }
});



