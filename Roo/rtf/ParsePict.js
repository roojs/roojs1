Roo.rtf.ParsePict = function(text) {
    console.log("START PARSE PICT");
    var start = performance.now();

    var index = text.indexOf('{\\*\\shppict');
    var i = 1;

    while(index > -1) {
        this.parserState = this.parseText;
    
        this.parserState(text[index++]);
        while(this.parenCount) {
            this.parserState(text[index++]);
        }

        Roo.log('Image ' + i + ' : ' + index);
        var now = performance.now();
        Roo.log('TIME TAKEN');
        Roo.log(now - start);
        start = now;

        this.shppicts.push(this.shppict);
        this.shppict = false;
    
        index = text.indexOf('{\\*\\shppict', index + 1)
    }

    Roo.log(this);
    Roo.log(this.shppicts);


    console.log("END PARSE PICT");
}

Roo.rtf.ParsePict.prototype = {
    parenCount : 0,
    shppict : false,
    shppicts : [],
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