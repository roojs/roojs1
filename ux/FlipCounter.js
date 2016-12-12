

Roo.ux.FlipCounter = function(options)
{
    Roo.bootstrap.FlipCounter.superclass.constructor.call(this, config);
    
    //Roo.apply(this, options);
    //this.el = $(element);
    //this.options = $.extend({}, defaults, options);
    this.addEvents({
        // raw events
        /**
         * @event flip
         * When a box is flipped
         * @param {Roo.ux.FlipCounter} counter
         */
        "flip" : true,
        /**
         * @event resize
         * When a box is resized
         * @param {Roo.ux.FlipCounter} counter
         */
        "resize" : true
        
         
    });
    this.digits = new Array();
       
    //this.init();


    
}
Roo.extend(Roo.ux.FlipCounter, Roo.bootstrap.Component, {
    
    speed : 0.2,
    startnumber : 0,
    
    digits : false, // array...
    ulWidth : 0, 
    
    getAutoCreate : function(){
        
        return {
            tag: 'ul',
            cls: 'flipcounter',
            
        };
    },
        
    initEvents : function ()
    { 
        var startNum = ""+ this.startnumber;
        
        for (i=startNum.length-1; i>=0; i=i-1)
        {
            this.addDigit(startNum[i]);
        }
    },
    
    addDigit : function (num)
    {
        // Add separator after every 3rd digit
        if (this.digits.length % 3 == 0 && this.digits.length != 0)
        {
            this.addSeparator();
        }
        
         
        
        
        var digit = new Roo.ux.FlipCounter.Digit({ manager : this, currentNumber : num });
        digit.manager = this;
        this.digits.push(digit);
        digit.render(this.el);
         
        // Update width
        this.ulWidth = this.ulWidth + digit.el.getWidth(true);
        this.el.set({
            'min-width' : this.ulWidth,
            'min-height' :digit.el.getHeight(true)
        });
        
    },
    
    removeDigit : function ()
    {
        var digit = this.digits.splice(this.digits.length-1, 1)[0];
        
        this.ulWidth = this.ulWidth - digit.el.outerWidth(true);
        digit.li.remove();
        
        // Remove separators
        if (this.digits.length % 3 == 0)
        {
            var comma = this.el.select('li.comma:first-child');
            this.ulWidth = this.ulWidth - comma.getWidth(true);
            comma.remove();
        }
        
        // Update width to current
        this.el.set( { 'min-width' : this.ulWidth});
    },
    
    addSeparator : function (num)
    {
        var comma = this.el.insertHtml('afterBegin','<li class="comma">,</li>',true);
        
        // Update width
        
        this.ulWidth = this.ulWidth + comma.getWidth(true);
        this.el.set({'min-width' : this.ulWidth});
    },
    
    updateTo : function (num)
    {
        var numStr = parseInt(num).toString();
        
        // Change the number of digits displayed if needed
        if (numStr.length != this.digits.length)
        {
            var diff = numStr.length - this.digits.length;
            if (diff > 0)
            {
                for (i=0; i<diff; i=i+1) {
                    this.addDigit(0);
                }
            }
            else
            {
                for (i=diff; i<0; i=i+1) {
                    this.removeDigit();
                }
            }
            
            this.fireEvent('onResize',this);
        }
        
        // Change all digit values
        for (i=0; i<numStr.length; i=i+1)
        {
            this.digits[i].flipTo(numStr[numStr.length - 1 - i]);
        }
    }
    
});

Roo.ux.FlipCounter.Digit = function(options)
{
    //Roo.apply(this, options);
        Roo.bootstrap.FlipCounter.Digit.superclass.constructor.call(this, config);

    
    this.currentNumber = parseInt(this.currentNumber);
    
    
}

Roo.extend(Roo.ux.FlipCounter.Digit, Roo.bootstrap.Component, {

    manager : null, // the flipcounter... 
    currentNumber : 0,
    targetNum : 0,
    
    topFrontDiv  : null,
    bottomFrontDiv : null,
    topNumBack : null,
    topNumFront : null,
    bottomNumBack : null,
    bottomNumFront : null,
    
    
    getAutoCreate : function(){
        
        return {
                tag: 'li',
                cn : [
                    {
                        cls: 'numberwrap',
                        cn : [
                            { cls : 'flipper_top flipper_top1' },
                            {
                                cls : 'flipper_top flipper_top2 flipper_top_back',
                                cn : [
                                    { tag: 'span', html: num },
                                    { cls : 'rings' }
                                ]
                        
                            },
                            {
                                cls : 'flipper_top flipper_top_front',
                                cn : [
                                    { tag: 'span', html: num },
                                    { cls : 'rings' }
                                ]
                        
                            },
                            { cls : 'flipper_bottom flipper_bottom4' },
                            { cls : 'flipper_bottom flipper_bottom3' },
                            { cls : 'flipper_bottom flipper_bottom2' },
                            {
                                cls : 'flipper_bottom flipper_bottom1 flipper_bottom_back',
                                cn : [
                                    { tag: 'span', html: num },
                                    { cls : 'rings' }
                                ]
                            },
                            {
                                cls : 'flipper_bottom flipper_bottom_front',
                                cn : [
                                    { tag: 'span', html: num },
                                    { cls : 'rings' }
                                ]
                            },
                        ]
                    }
                ]
        };
    },
    
    
    initEvents : function()
    {
        
         
        
        this.topFrontDiv = this.el.select('.flipper_top_front',true);
        this.bottomFrontDiv = this.el.select('.flipper_bottom_front',true);
        this.topNumBack = this.el.select('.flipper_top_back span',true);
        this.topNumFront = this.el.select('.flipper_top_front span',true);
        this.bottomNumBack = this.el.select('.flipper_bottom_back span',true);
        this.bottomNumFront = this.el.select('.flipper_bottom_front span',true);
        
        this.targetNum = currentNumber;
        this.currentNum = currentNumber;
        this.nextNum = currentNumber;
        
        this.currentlyAnimating = false;
    },
    
    flipTo : function (num)
    {
        if (this.currentNum === num)
            return;
        
        this.targetNum = num;
        if (this.currentlyAnimating) {
            return;
        }
        
        this.animNext();
    },
    
    animNext : function ()
    {
        if (this.currentNum == this.targetNum)
        {
            this.currentlyAnimating = false;
            return;
        }
        
        var doRandomDelay = !this.currentlyAnimating;
        this.currentlyAnimating = true;
        this.nextNum = this.currentNum + 1;
        if (this.nextNum > 9) {
            this.nextNum = 0;
        }
        
        var delay = Math.random()/5;
        if (!doRandomDelay) {
            delay = 0.01;
        }
        
        // Animate top flipper
        var digit = this;
        digit.topNumBack.html(digit.nextNum);
        (function() {
            digit.topFrontDiv.animate(
                {
                    scaleY: {from :1, to : 0}
                },
                this.manager.speed, //duration
                function() {}, // oncomplate
                'easeIn', //easing,
                'motion' // desplay type.
            );
        }).defer(delay, this);
        
        (function() {
            
            digit.bottomNumFront.dom.innerHTML  = digit.nextNum;
            
            digit.bottomFrontDiv.animate(
                {
                    scaleY: {from: 0, to : 1},
                    
                },
                this.manager.options.speed * 0.5, //duration
                function() {
                    digit.currentNum = digit.nextNum;
                    digit.topNumFront.dom.innerHTML = digit.currentNum;
                    digit.topFrontDiv.attr('style', '');
                    digit.bottomNumBack.dom.innerHTML = digit.currentNum;
                    
                    digit.animNext();
                    digit.manager.fireEvent('onFlip', digit.manager);
                    
                 }, // oncomplate
                'easeOut', //easing,
                'motion' // desplay type.
            )
            
        }).defer(delay + this.manager.speed, this);
                
                
 
       //??? digit.bottomFrontDiv. digit.bottomNumFront.html(digit.nextNum);
        
       
    }
});