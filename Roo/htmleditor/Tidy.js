
/**
 * @class Roo.htmleditor.Tidy
 * Tidy HTML 
 * @cfg {Roo.HtmlEditorCore} core the editor.
 * @constructor
 * Create a new Filter.
 * @param {Object} config Configuration options
 */


Roo.htmleditor.Tidy = function(cfg) {
    Roo.apply(this, cfg);
    
    this.core.doc.body.innerHTML = this.tidy(this.core.doc.body, '');
     
}

Roo.htmleditor.Tidy.toString = function(node)
{
    return Roo.htmleditor.Tidy.prototype.tidy(node, '');
}

Roo.htmleditor.Tidy.prototype = {
    
    
    wrap : function(s) {
        return s.replace(/\n/g, " ").replace(/(?![^\n]{1,80}$)([^\n]{1,80})\s/g, '$1\n');
    },

    
    tidy : function(node, indent) {
     
        if  (node.nodeType == 3) {
            // text.
            
            
            return indent === false ? node.nodeValue : this.wrap(node.nodeValue.trim()).split("\n").join("\n" + indent);
                
            
        }
        
        if  (node.nodeType != 1) {
            return '';
        }
        
        
        
        if (node.tagName == 'BODY') {
            
            return this.cn(node, '');
        }
             
             // Prints the node tagName, such as <A>, <IMG>, etc
        var ret = "<" + node.tagName +  this.attr(node) ;
        
        // elements with no children..
        if (['IMG', 'BR', 'HR', 'INPUT'].indexOf(node.tagName) > -1) {
                return ret + '/>';
        }
        ret += '>';
        
        
        var cindent = indent === false ? '' : (indent + '  ');
        // tags where we will not pad the children.. (inline text tags etc..)
        if (['PRE', 'TEXTAREA', 'TD', 'A', 'SPAN', 'B', 'I', 'S'].indexOf(node.tagName) > -1) { // or code?
            cindent = false;
            
            
        }
        
        var cn = this.cn(node, cindent );
        
        return ret + cn  + '</' + node.tagName + '>';
        
    },
    cn: function(node, indent)
    {
        var ret = [];
        
        var ar = Array.from(node.childNodes);
        for (var i = 0 ; i < ar.length ; i++) {
            if (indent !== false   // indent==false preservies everything
                && i > 0
                && ar[i].nodeType == 3 
                && ar[i].nodeValue.length > 0
                && ar[i].nodeValue.match(/^\s+/)
            ) {
                ret.push(" "); // add a space if i'm a text item with a space at the front, as tidy will strip spaces.
            }
            if (indent !== false
                && ar[i].nodeType == 1 // element - and indent is not set... 
            ) {
                ret.push("\n" + indent); 
            }
            
            ret.push(this.tidy(ar[i], indent));
            // text + trailing indent 
            if (indent !== false
                && ar[i].nodeType == 3
                && ar[i].nodeValue.length > 0
                && ar[i].nodeValue.match(/\s+$/)
            ){
                ret.push("\n" + indent); 
            }
            
            
            
            
        }
        // what if all text?
        
        
        return ret.join('');
    },
    
         
        
    attr : function(node)
    {
        var attr = [];
        for(i = 0; i < node.attributes.length;i++) {
            
            // skip empty values?
            if (!node.attributes.item(i).value.length) {
                continue;
            }
            attr.push(  node.attributes.item(i).name + '="' +
                    Roo.util.Format.htmlEncode(node.attributes.item(i).value) + '"'
            );
        }
        return attr.length ? (' ' + attr.join(' ') ) : '';
        
    }
    
    
    
}