/**
 * set the version of bootstrap based on the stylesheet...
 *
 */

Roo.bootstrap.version = (
        function() {
                var ret=3;
                Roo.each(document.styleSheets, function(s) {
                    if (typeof(s.href) != 'undefined' && s.href.match(/css-bootstrap4/)) {
                        ret=4;
                    }
                });
        return ret;
})(); 