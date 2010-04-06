/*
 * Portions of this file are based on pieces of Yahoo User Interface Library
 * Copyright (c) 2007, Yahoo! Inc. All rights reserved.
 * YUI licensed under the BSD License:
 * http://developer.yahoo.net/yui/license.txt
 * <script type="text/javascript">
 *
 */
 
(function() {   

    Roo.lib.Anim = {
        scroll : function(el, args, duration, easing, cb, scope) {
            this.run(el, args, duration, easing, cb, scope, Roo.lib.Scroll);
        },

        motion : function(el, args, duration, easing, cb, scope) {
            this.run(el, args, duration, easing, cb, scope, Roo.lib.Motion);
        },

        color : function(el, args, duration, easing, cb, scope) {
            this.run(el, args, duration, easing, cb, scope, Roo.lib.ColorAnim);
        },

        run : function(el, args, duration, easing, cb, scope, type) {
            type = type || Roo.lib.AnimBase;
            if (typeof easing == "string") {
                easing = Roo.lib.Easing[easing];
            }
            var anim = new type(el, args, duration, easing);
            anim.animateX(function() {
                Roo.callback(cb, scope);
            });
            return anim;
        }
    };
})();