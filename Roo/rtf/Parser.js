/**
 *
 *
 * based on this https://github.com/iarna/rtf-parser
 * it's really only designed to extract pict from pasted RTF 
 *
 * usage:
 *
 *  var images = new Roo.rtf.Parser().parse(a_string).filter(function(g) { return g.type == 'pict'; });
 *  
 *
 */

 



Roo.rtf.Parser = function(text) {


    //super({objectMode: true})
    this.text = '';
    this.parserState = this.parseText;
    
    // these are for interpeter...
    this.doc = {};
    ///this.parserState = this.parseTop
    this.groupStack = [];
    this.hexStore = [];
    this.doc = false;
    
    this.groups = []; // where we put the return.

    // e.g. skip parsing groups of type 'pict' under groups of 'nonshppict'
    this.skipWords = [
        ['nonshppict'],
        [['pict']]
    ];
    this.skipParse = false;
    this.parenCount = 0;
    
    for (var ii = 0; ii < text.length; ++ii) {
        ++this.cpos;
        
        if (text[ii] === '\n') {
            ++this.row;
            this.col = 1;
        } else {
            ++this.col;
        }

        if(!this.skipParse) {
            this.parserState(text[ii]);
        }

        if(this.parenCount) {
            if(text[ii] == '{') {
                this.parenCount ++;
            }
            else if(text[ii] == '}') {
                this.parenCount --;
                if(!this.parenCount) {
                    this.skipParse = false;
                }
            }
        }
    }
    
    
    
};
Roo.rtf.Parser.prototype = {
    text : '', // string being parsed..
    controlWord : '',
    controlWordParam :  '',
    hexChar : '',
    doc : false,
    group: false,
    groupStack : false,
    hexStore : false,
    
    
    cpos : 0, 
    row : 1, // reportin?
    col : 1, //

     
    push : function (el)
    {
        var m = 'cmd'+ el.type;
        if (typeof(this[m]) == 'undefined') {
            Roo.log('invalid cmd:' + el.type);
            return;
        }
        this[m](el);
        //Roo.log(el);
    },
    flushHexStore : function()
    {
        if (this.hexStore.length < 1) {
            return;
        }
        var hexstr = this.hexStore.map(
            function(cmd) {
                return cmd.value;
        }).join('');
        
        this.group.addContent( new Roo.rtf.Hex( hexstr ));
              
            
        this.hexStore.splice(0)
        
    },
    
    cmdgroupstart : function()
    {
        this.flushHexStore();
        if (this.group) {
            this.groupStack.push(this.group);
        }
         // parent..
        if (this.doc === false) {
            this.group = this.doc = new Roo.rtf.Document();
            return;
            
        }
        this.group = new Roo.rtf.Group(this.group);
    },
    cmdignorable : function()
    {
        this.flushHexStore();
        this.group.ignorable = true;
    },
    cmdendparagraph : function()
    {
        this.flushHexStore();
        this.group.addContent(new Roo.rtf.Paragraph());
    },
    cmdgroupend : function ()
    {
        this.flushHexStore();
        var endingGroup = this.group;
        
        
        this.group = this.groupStack.pop();
        if (this.group) {
            this.group.addChild(endingGroup);
        }
        
        
        
        var doc = this.group || this.doc;
        //if (endingGroup instanceof FontTable) {
        //  doc.fonts = endingGroup.table
        //} else if (endingGroup instanceof ColorTable) {
        //  doc.colors = endingGroup.table
        //} else if (endingGroup !== this.doc && !endingGroup.get('ignorable')) {
        if (endingGroup.ignorable === false) {
            //code
            this.groups.push(endingGroup);
           // Roo.log( endingGroup );
        }
            //Roo.each(endingGroup.content, function(item)) {
            //    doc.addContent(item);
            //}
            //process.emit('debug', 'GROUP END', endingGroup.type, endingGroup.get('ignorable'))
        //}
    },
    cmdtext : function (cmd)
    {
        this.flushHexStore();
        if (!this.group) { // an RTF fragment, missing the {\rtf1 header
            //this.group = this.doc
            return;  // we really don't care about stray text...
        }
        if(!this.group.type == 'pict') {
            return;
        }
        this.group.addContent(new Roo.rtf.Span(cmd));
    },
    cmdcontrolword : function (cmd)
    {
        this.flushHexStore();
        if (!this.group.type) {
            this.group.type = cmd.value;
            return;
        }
        this.group.addContent(new Roo.rtf.Ctrl(cmd));
        // we actually don't care about ctrl words...
        return ;
        /*
        var method = 'ctrl$' + cmd.value.replace(/-(.)/g, (_, char) => char.toUpperCase())
        if (this[method]) {
            this[method](cmd.param)
        } else {
            if (!this.group.get('ignorable')) process.emit('debug', method, cmd.param)
        }
        */
    },
    cmdhexchar : function(cmd) {
        this.hexStore.push(cmd);
    },
    cmderror : function(cmd) {
        throw cmd.value;
    },
    
    /*
      _flush (done) {
        if (this.text !== '\u0000') this.emitText()
        done()
      }
      */
      
      
    parseText : function(c)
    {
        if(this.skipParse) {
            return;
        }
        if (c === '\\') {
            this.parserState = this.parseEscapes;
        } else if (c === '{') {
            this.emitStartGroup();
        } else if (c === '}') {
            this.emitEndGroup();
        } else if (c === '\x0A' || c === '\x0D') {
            // cr/lf are noise chars
        } else {
            this.text += c;
        }
    },
    
    parseEscapes: function (c)
    {
        if (c === '\\' || c === '{' || c === '}') {
            this.text += c;
            this.parserState = this.parseText;
        } else {
            this.parserState = this.parseControlSymbol;
            this.parseControlSymbol(c);
        }
    },
    parseControlSymbol: function(c)
    {
        if (c === '~') {
            this.text += '\u00a0'; // nbsp
            this.parserState = this.parseText
        } else if (c === '-') {
             this.text += '\u00ad'; // soft hyphen
        } else if (c === '_') {
            this.text += '\u2011'; // non-breaking hyphen
        } else if (c === '*') {
            this.emitIgnorable();
            this.parserState = this.parseText;
        } else if (c === "'") {
            this.parserState = this.parseHexChar;
        } else if (c === '|') { // formula cacter
            this.emitFormula();
            this.parserState = this.parseText;
        } else if (c === ':') { // subentry in an index entry
            this.emitIndexSubEntry();
            this.parserState = this.parseText;
        } else if (c === '\x0a') {
            this.emitEndParagraph();
            this.parserState = this.parseText;
        } else if (c === '\x0d') {
            this.emitEndParagraph();
            this.parserState = this.parseText;
        } else {
            this.parserState = this.parseControlWord;
            this.parseControlWord(c);
        }
    },
    parseHexChar: function (c)
    {
        if (/^[A-Fa-f0-9]$/.test(c)) {
            this.hexChar += c;
            if (this.hexChar.length >= 2) {
              this.emitHexChar();
              this.parserState = this.parseText;
            }
            return;
        }
        this.emitError("Invalid character \"" + c + "\" in hex literal.");
        this.parserState = this.parseText;
        
    },
    parseControlWord : function(c)
    {
        if (c === ' ') {
            this.emitControlWord();
            this.parserState = this.parseText;
        } else if (/^[-\d]$/.test(c)) {
            this.parserState = this.parseControlWordParam;
            this.controlWordParam += c;
        } else if (/^[A-Za-z]$/.test(c)) {
          this.controlWord += c;
        } else {
          this.emitControlWord();
          this.parserState = this.parseText;
          this.parseText(c);
        }
    },
    parseControlWordParam : function (c) {
        if (/^\d$/.test(c)) {
          this.controlWordParam += c;
        } else if (c === ' ') {
          this.emitControlWord();
          this.parserState = this.parseText;
        } else {
          this.emitControlWord();
          this.parserState = this.parseText;
          this.parseText(c);
        }
    },
    
    
    
    
    emitText : function () {
        if (this.text === '') {
            return;
        }
        this.push({
            type: 'text',
            value: this.text,
            pos: this.cpos,
            row: this.row,
            col: this.col
        });
        this.text = ''
    },
    emitControlWord : function ()
    {
        this.emitText();
        if (this.controlWord === '') {
            // do we want to track this - it seems just to cause problems.
            //this.emitError('empty control word');
        } else {
            var parentType = this.groupStack.length == 0 ? false : this.groupStack[this.groupStack.length - 1].type;
            var index = this.skipWords[0].indexOf(parentType);
            if(
                index > -1
                &&
                (this.skipWords[1][index].includes(this.controlWord))
            ) {
                Roo.log(parentType + ' - ' + index + ' - ' + this.controlWord);
                this.group = this.groupStack.pop();
                this.skipParse = true;
                this.parenCount = 1;
            }
            else {
                this.push({
                    type: 'controlword',
                    value: this.controlWord,
                    param: this.controlWordParam !== '' && Number(this.controlWordParam),
                    pos: this.cpos,
                    row: this.row,
                    col: this.col
              });
            }
        }
        this.controlWord = '';
        this.controlWordParam = '';
    },
    emitStartGroup : function ()
    {
        this.emitText();
        this.push({
            type: 'groupstart',
            pos: this.cpos,
            row: this.row,
            col: this.col
        });
    },
    emitEndGroup : function ()
    {
        this.emitText();
        this.push({
            type: 'groupend',
            pos: this.cpos,
            row: this.row,
            col: this.col
        });
    },
    emitIgnorable : function ()
    {
        this.emitText();
        this.push({
            type: 'ignorable',
            pos: this.cpos,
            row: this.row,
            col: this.col
        });
    },
    emitHexChar : function ()
    {
        this.emitText();
        this.push({
            type: 'hexchar',
            value: this.hexChar,
            pos: this.cpos,
            row: this.row,
            col: this.col
        });
        this.hexChar = ''
    },
    emitError : function (message)
    {
      this.emitText();
      this.push({
            type: 'error',
            value: message,
            row: this.row,
            col: this.col,
            char: this.cpos //,
            //stack: new Error().stack
        });
    },
    emitEndParagraph : function () {
        this.emitText();
        this.push({
            type: 'endparagraph',
            pos: this.cpos,
            row: this.row,
            col: this.col
        });
    }
     
} ;