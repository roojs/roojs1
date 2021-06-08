/**
 * @class Roo.util.Clipboard
 * @static
 * 
 * Clipboard UTILS
 * 
 **/
Roo.util.Clipboard = {
    
    write : function(text) {
        // navigator clipboard api needs a secure context (https)
        if (navigator.clipboard && window.isSecureContext) {
            // navigator clipboard api method'
            navigator.clipboard.writeText(text);
            return ;
        } 
        // text area method
        var ta = document.createElement("textarea");
        ta.value = text;
        // make the textarea out of viewport
        ta.style.position = "fixed";
        ta.style.left = "-999999px";
        ta.style.top = "-999999px";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand('copy');
        (function() {
            ta.remove();
        }).defer(100);
        
    }
        
}
    