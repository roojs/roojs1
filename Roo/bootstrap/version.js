/**
 * set the version of bootstrap based on the stylesheet...
 *
 */

Roo.bootstrap.version = ( function() {
    var ret=3;
    Roo.each(document.styleSheets, function(s) {
        if ( s.href  && s.href.match(/css-bootstrap4/)) {
            ret=4;
        }
    });
    if (ret > 3) {
         Roo.Element.prototype.visibilityMode = Roo.Element.DISPLAY;
    }
    return ret;
})(); 