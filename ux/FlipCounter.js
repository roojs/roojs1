

Roo.ux.FlipCounter = function(options)
{
    Roo.apply(this, options);
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
        
    init : function ()
    { 
        var startNum = ""+ this.startnumber;
        
        for (i=startNum.length-1; i>=0; i=i-1)
        {
            this.addDigit(startNum[i]);
        }
    },
    
    addDigit : function (num) {
        // Add separator after every 3rd digit
        if (this.digits.length % 3 == 0 && this.digits.length != 0)
        {
            this.addSeparator();
        }
        
        this.el.insertHtml('afterBegin', '<li>\
            <div class="numberwrap">\
                <div class="flipper_top flipper_top1"></div>\
                <div class="flipper_top flipper_top2 flipper_top_back">\
                    <span>'+num+'</span>\
                    <div class="rings"></div>\
                </div>\
                <div class="flipper_top flipper_top_front">\
                    <span>'+num+'</span>\
                    <div class="rings"></div>\
                </div>\
                <div class="flipper_bottom flipper_bottom4"></div>\
                <div class="flipper_bottom flipper_bottom3"></div>\
                <div class="flipper_bottom flipper_bottom2"></div>\
                <div class="flipper_bottom flipper_bottom1 flipper_bottom_back">\
                    <span>'+num+'</span>\
                    <div class="rings"></div>\
                </div>\
                <div class="flipper_bottom flipper_bottom_front">\
                    <span>'+num+'</span>\
                    <div class="rings"></div>\
                </div>\
            </div>\
        </li>');
        
        var li = this.el.select('li'.true).first();
        var digit = new Roo.ux.FlipCounter.Digit(li, num);
        digit.manager = this;
        this.digits.push(digit);
        
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
            var comma = this.ul.find('li.comma:first-child');
            this.ulWidth = this.ulWidth - comma.outerWidth(true);
            comma.remove();
        }
        
        // Update width to current
        this.el.set( { 'min-width' : this.ulWidth});
    }
    
    addSeparator : function (num)
    {
        this.ul.prepend('<li class="comma">,</li>');
        
        // Update width
        var comma = this.ul.find('li.comma:first-child');
        this.ulWidth = this.ulWidth + comma.outerWidth(true);
        this.ul.css('min-width', this.ulWidth);
    };
    
    FlipCounter.prototype.updateTo = function (num) {
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
            
            this.options['onResize']();
        }
        
        // Change all digit values
        for (i=0; i<numStr.length; i=i+1)
        {
            this.digits[i].flipTo(numStr[numStr.length - 1 - i]);
        }
    };
    
    function Digit( element, currentNumber ) {
        currentNumber = parseInt(currentNumber);
        
        this.li = $(element);
        this.topFrontDiv = this.li.find('.flipper_top_front');
        this.bottomFrontDiv = this.li.find('.flipper_bottom_front');
        this.topNumBack = this.li.find('.flipper_top_back span');
        this.topNumFront = this.li.find('.flipper_top_front span');
        this.bottomNumBack = this.li.find('.flipper_bottom_back span');
        this.bottomNumFront = this.li.find('.flipper_bottom_front span');
        
        this.targetNum = currentNumber;
        this.currentNum = currentNumber;
        this.nextNum = currentNumber;
        
        this.currentlyAnimating = false;
    }
    
    Digit.prototype.flipTo = function (num) {
        if (this.currentNum === num)
            return;
        
        this.targetNum = num;
        if (this.currentlyAnimating)
            return;
        
        this.animNext();
    };
    
    Digit.prototype.animNext = function () {
        if (this.currentNum == this.targetNum)
        {
            this.currentlyAnimating = false;
            return;
        }
        
        var doRandomDelay = !this.currentlyAnimating;
        this.currentlyAnimating = true;
        this.nextNum = this.currentNum + 1;
        if (this.nextNum > 9)
            this.nextNum = 0;
        
        var delay = Math.random()/5;
        if (!doRandomDelay) delay = 0.01;
        
        // Animate top flipper
        var digit = this;
        digit.topNumBack.html(digit.nextNum);
        digit.topFrontDiv.tween({
            transform: {
                start: 'scaleY(1)',
                stop: 'scaleY(0)',
                time: delay,
                duration: this.manager.options.speed,
                units: '',
                effect: 'easeIn'
            }
        }).play();
        
        // Animate bottom flipper with delay
        digit.bottomFrontDiv.tween({
            transform: {
                start: 'scaleY(0)',
                stop: 'scaleY(1)',
                time: delay + this.manager.options.speed,
                duration: this.manager.options.speed * 0.5,
                units: '',
                effect: 'easeOut',
                onStart: function() {
                    digit.bottomNumFront.html(digit.nextNum);
                },
                onStop: function() {
                    digit.currentNum = digit.nextNum;
                    digit.topNumFront.html(digit.currentNum);
                    digit.topFrontDiv.removeAttr('style', '');
                    digit.bottomNumBack.html(digit.currentNum);
                    digit.animNext();
                    digit.manager.options['onFlip']();
                }
            }
        }).play();
    }

    // A really lightweight plugin wrapper around the constructor, 
    // preventing against multiple instantiations
    $.fn[pluginName+'Init'] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, 
                new FlipCounter( this, options ));
            }
        });
    }
        
    $.fn[pluginName+'Update'] = function ( num ) {
        return this.each(function () {
            var obj = $.data(this, 'plugin_' + pluginName);
            if (obj) {
                obj.updateTo(num);
            }
        });
    }

})( jQuery, window, document );