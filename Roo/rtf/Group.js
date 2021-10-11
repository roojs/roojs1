
Roo.rtf.Group = function(parent)
{
    // we dont want to acutally store parent - it will make debug a nightmare..
    this.content = [];
    
}
Roo.rtf.Group.prototype = {
    ignorable : false,
    content: false,
    addContent : function(node) {
        // could set styles...
        this.content.push(node);
    },
    
    // only for images really...
    toDataURL : function()
    {
        var mimetype = false;
        switch(true) {
            case this.content.filter(function(a) { return a.value == 'pngblip' } ).length > 0: 
                mimetype = "image/png";
                break;
             case this.content.filter(function(a) { return a.value == 'jpegblip' } ).length > 0:
                mimetype = "image/jpeg";
                break;
            default :
                return 'about:blank'; // ?? error?
        }
        
        
        var hexstring = this.content[this.content.length-1].value;
        
        return mimetype + ';base64,' + btoa(hexstring.match(/\w{2}/g).map(function(a) {
            return String.fromCharCode(parseInt(a, 16));
        }).join(""));
    }
    
}