
/*
 * Portions of this file are based on pieces of Yahoo User Interface Library
 * Copyright (c) 2007, Yahoo! Inc. All rights reserved.
 * YUI licensed under the BSD License:
 * http://developer.yahoo.net/yui/license.txt
 * <script type="text/javascript">
 *
 */

Roo.lib.AnimMgr = new function() {

        var thread = null;


        var queue = [];


        var tweenCount = 0;


        this.fps = 1000;


        this.delay = 1;


        this.registerElement = function(tween) {
            queue[queue.length] = tween;
            tweenCount += 1;
            tween._onStart.fire();
            this.start();
        };


        this.unRegister = function(tween, index) {
            tween._onComplete.fire();
            index = index || getIndex(tween);
            if (index != -1) {
                queue.splice(index, 1);
            }

            tweenCount -= 1;
            if (tweenCount <= 0) {
                this.stop();
            }
        };


        this.start = function() {
            if (thread === null) {
                thread = setInterval(this.run, this.delay);
            }
        };


        this.stop = function(tween) {
            if (!tween) {
                clearInterval(thread);

                for (var i = 0, len = queue.length; i < len; ++i) {
                    if (queue[0].isAnimated()) {
                        this.unRegister(queue[0], 0);
                    }
                }

                queue = [];
                thread = null;
                tweenCount = 0;
            }
            else {
                this.unRegister(tween);
            }
        };


        this.run = function() {
            for (var i = 0, len = queue.length; i < len; ++i) {
                var tween = queue[i];
                if (!tween || !tween.isAnimated()) {
                    continue;
                }

                if (tween.currentFrame < tween.totalFrames || tween.totalFrames === null)
                {
                    tween.currentFrame += 1;

                    if (tween.useSeconds) {
                        correctFrame(tween);
                    }
                    tween._onTween.fire();
                }
                else {
                    Roo.lib.AnimMgr.stop(tween, i);
                }
            }
        };

        var getIndex = function(anim) {
            for (var i = 0, len = queue.length; i < len; ++i) {
                if (queue[i] == anim) {
                    return i;
                }
            }
            return -1;
        };


        var correctFrame = function(tween) {
            var frames = tween.totalFrames;
            var frame = tween.currentFrame;
            var expected = (tween.currentFrame * tween.duration * 1000 / tween.totalFrames);
            var elapsed = (new Date() - tween.getStartTime());
            var tweak = 0;

            if (elapsed < tween.duration * 1000) {
                tweak = Math.round((elapsed / expected - 1) * tween.currentFrame);
            } else {
                tweak = frames - (frame + 1);
            }
            if (tweak > 0 && isFinite(tweak)) {
                if (tween.currentFrame + tweak >= frames) {
                    tweak = frames - (frame + 1);
                }

                tween.currentFrame += tweak;
            }
        };
    };