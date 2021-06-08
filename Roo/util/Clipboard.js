/**
 * @class Roo.util.Clipboard
 * @static
 * 
 * Clipboard UTILS
 * 
 **/
Roo.util.Clipboard = {
    
    copy : function(textToCopy) {
        // navigator clipboard api needs a secure context (https)
        if (navigator.clipboard && window.isSecureContext) {
            // navigator clipboard api method'
            return navigator.clipboard.writeText(textToCopy);
        } 
        // text area method
        var textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        // make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        (function() {
            textArea.remove();
        }).defer(100);
        return true;
    }
        
}
    