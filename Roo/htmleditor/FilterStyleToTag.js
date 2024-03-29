
/**
 * @class Roo.htmleditor.FilterStyleToTag
 * part of the word stuff... - certain 'styles' should be converted to tags.
 * eg.
 *   font-weight: bold -> bold
 *   ?? super / subscrit etc..
 * 
 * @constructor
* Run a new style to tag filter.
* @param {Object} config Configuration options
 */
Roo.htmleditor.FilterStyleToTag = function(cfg)
{
    
    this.tags = {
        B  : [ 'fontWeight' , 'bold', 'font-weight'],
        I :  [ 'fontStyle' , 'italic', 'font-style'],
        //pre :  [ 'font-style' , 'italic'],
        // h1.. h6 ?? font-size?
        SUP : [ 'verticalAlign' , 'super', 'vertical-align'],
        SUB : [ 'verticalAlign' , 'sub', 'vertical-align']
        
        
    };
    
    Roo.apply(this, cfg);
     
    
    this.walk(cfg.node);
    
    
    
}


Roo.extend(Roo.htmleditor.FilterStyleToTag, Roo.htmleditor.Filter,
{
    tag: true, // all tags
    
    tags : false,
    
    
    replaceTag : function(node)
    {
        
        
        if (node.getAttribute("style") === null) {
            return true;
        }
        var inject = [];
        for (var k in this.tags) {
            if (node.style[this.tags[k][0]] == this.tags[k][1]) {
                inject.push(k);
                node.style.removeProperty(this.tags[k][2]);
            }
        }
        if (!inject.length) {
            return true; 
        }
        var cn = Array.from(node.childNodes);
        var nn = node;
        Roo.each(inject, function(t) {
            var nc = node.ownerDocument.createElement(t);
            nn.appendChild(nc);
            nn = nc;
        });
        for(var i = 0;i < cn.length;i++) {
            node.removeChild(cn[i]);
            nn.appendChild(cn[i]);
        }
        return true /// iterate thru
    }
    
})