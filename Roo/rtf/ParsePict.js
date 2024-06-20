Roo.rtf.ParsePict = function(text) {
    console.log("START PARSE PICT");
    var start = performance.now();

    var index = text.indexOf('{\\*\\shppict');
    this.parserState = this.parseText;

    var i = index;

    while(index < i + 45) {
        console.log(text[index]);
        this.parserState(text[index++]); // {\*\shppict{
    }

    Roo.log(this);


    console.log("END PARSE PICT");
    var end = performance.now();
    Roo.log('TIME TAKEN');
    Roo.log(end - start);
}

Roo.rtf.ParsePict.prototype = {
    parenCount : 0,
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
            case '\x0A':
            case '\x0D':
                break;
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

        this.group = new Roo.rtf.Group(this.group);
    },

    emitText : function() 
    {
        if(this.text == '') {
            return;
        }
    },

    emitIgnorable : function ()
    {
        this.emitText();
        this.group.ignorable = true;
    },

    emitControlWord : function(cmd)
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