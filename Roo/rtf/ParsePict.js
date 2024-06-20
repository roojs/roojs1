Roo.rtf.ParsePict = function(text) {
    this.input = text;
    console.log("START PARSE PICT");
    var s = performance.now();
    var start = performance.now();

    this.index = text.indexOf('{\\*\\shppict');
    var i = 1;

    while(this.index > -1) {
        this.parserState = this.parseText;
    
        this.parserState(text[this.index++]);
        while(this.parenCount) {
            this.parserState(text[this.index++]);
        }

        Roo.log('Image ' + (i++) + ' : ' + this.index);
        var now = performance.now();
        Roo.log('TIME TAKEN');
        Roo.log(now - start);
        start = now;

        this.picts.push(this.shppict.cn[0]);
        this.shppict = false;
    
        this.index = text.indexOf('{\\*\\shppict', this.index + 1)
    }

    Roo.log(this);
    Roo.log(this.picts);

    console.log("END PARSE PICT");
    var e = performance.now();
    Roo.log(e - s);


    var start = performance.now();
    images = this.picts.map(function(g) { return g.toDataURL(); });
    Roo.log(images);
    var now = performance.now();
    Roo.log('TIME TAKEN');
    Roo.log(now - start);

}

Roo.rtf.ParsePict.prototype = {
    input : '',
    index: -1,
    parenCount : 0,
    shppict : false,
    picts : [],
    group : false,
    groupStack : [],
    text : '',
    controlWord : '',
    controlWordParam : '',

    parseText : function(c) 
    {
        switch(c) {
            case '\\' :
                this.parserState = this.parseEscapes;
                break;
            case '{' :
                this.parenCount++;
                this.emitStartGroup();
                break;
            case '}' :
                this.parenCount--;
                this.emitEndGroup();
                break;
            case '\x0A':
            case '\x0D':
                break;
            default :
                if(this.group.type == 'pict') {
                    var startIndex = this.index;
                    var endIndex = this.input.indexOf('}', startIndex + 1);
                    this.text = this.input.substring(startIndex, endIndex);

                }
                this.text += c;
        }
    },

    parseEscapes : function(c) 
    {
        if (c === '\\' || c === '{' || c === '}') {
            this.text += c;
            this.parserState = this.parseText;
        } else {
            this.parserState = this.parseControlSymbol;
            this.parseControlSymbol(c);
        }
    },

    parseControlSymbol : function(c)
    {
        switch(c) {
            case '*' :
                this.emitIgnorable();
                this.parserState = this.parseText;
                break;
            default :
                this.parserState = this.parseControlWord;
                this.parseControlWord(c);
        }
    },

    parseControlWord : function(c)
    {
        switch(true) {
            case ' ' :
                this.emitControlWord();
                this.parserState = this.parseText;
                break;
            case (/^[A-Za-z]$/.test(c)) :
                this.controlWord += c;
                break;
            case (/^[-\d]$/.test(c)) :
                this.parserState = this.parseControlWordParam;
                this.controlWordParam += c;
                break;
            default :
                this.emitControlWord();
                this.parserState = this.parseText;
                this.parseText(c);
        }
    },

    parseControlWordParam : function (c) {
        switch(true) {
            case (/^\d$/.test(c)) :
                this.controlWordParam += c;
                break;
            default :
                this.emitControlWord();
                this.parserState = this.parseText;
                this.parseText(c);
        }
    },

    emitStartGroup : function() 
    {
        this.emitText();

        if (this.group) {
            this.groupStack.push(this.group);
        }

        if (this.shppict === false) {
            this.group = this.shppict = new Roo.rtf.Group(this.group);
            return;
        }

        this.group = new Roo.rtf.Group(this.group);
    },

    emitEndGroup : function ()
    {
        this.emitText();

        var endingGroup = this.group;
        
        
        this.group = this.groupStack.pop();
        if (this.group) {
            this.group.addChild(endingGroup);
        }
    },

    emitText : function() 
    {
        if(this.text == '') {
            return;
        }

        var cmd = {
            value : this.text
        };

        this.group.addContent(new Roo.rtf.Span(cmd));

        this.text = '';
    },

    emitIgnorable : function ()
    {
        this.emitText();
        this.group.ignorable = true;
    },

    emitControlWord : function()
    {
        this.emitText();
        if(this.controlWord !== '') {
            var cmd = {
                value : this.controlWord,
                param: this.controlWordParam !== '' && Number(this.controlWordParam)
            };
            if (!this.group.type) {
                this.group.type = cmd.value;
            }
            else {
                this.group.addContent(new Roo.rtf.Ctrl(cmd));
            }
        }
        this.controlWord = '';
        this.controlWordParam = '';
    }
}