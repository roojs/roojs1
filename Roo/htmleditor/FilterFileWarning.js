
/**
 * @class Roo.htmleditor.FilterAttributes
 * clean attributes and  styles including http:// etc.. in attribute
 * @constructor
* Run a new Attribute Filter
* @param {Object} config Configuration options
 */
Roo.htmleditor.FilterFileWarning = function(cfg)
{
    
    var atag = cfg.node.getElementsByTagName('a');
    for(var i =0; i < atags.length;i++) {
        var str = '' + atags.item(i).getAttribute('href');
        if (str.match(/^file:/)) {
            throw new Exception ("got file url");
        }
    }
    // less likely
    atag = cfg.node.getElementsByTagName('img');
    for(var i =0; i < atags.length;i++) {
        var str = '' + atags.item(i).getAttribute('src');
        if (str.match(/^file:/)) {
            throw new Exception ("got file url");
        }
    }
}
