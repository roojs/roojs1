/*
 * Portions of this file are based on pieces of Yahoo User Interface Library
 * Copyright (c) 2007, Yahoo! Inc. All rights reserved.
 * YUI licensed under the BSD License:
 * http://developer.yahoo.net/yui/license.txt
 * <script type="text/javascript">
 *
 */
//@@dep Roo.lib.Region


Roo.lib.Point = function(x, y) {
    if (x instanceof Array) {
        y = x[1];
        x = x[0];
    }
    this.x = this.right = this.left = this[0] = x;
    this.y = this.top = this.bottom = this[1] = y;
};

Roo.lib.Point.prototype = new Roo.lib.Region();
