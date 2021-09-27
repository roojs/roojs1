
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
Roo.htmleditor.Tidy.prototype = {
    
    
    wrap : function(s) {
        return s.replace(/\n/g, " ").replace(/(?![^\n]{1,80}$)([^\n]{1,80})\s/g, '$1\n');
    },

    
    /* ?? why ?? */
    tidy : function(node, indent) {
        
       
        //Roo.log(currentElement);
       
        var nodeName = node.nodeName;
        //var tagName = Roo.util.Format.htmlEncode(currentElement.tagName);
        var tagName = node.tagName; /// why encode tagname?
        
        if  (node.nodeType == 3) {
            // text.
            return indent === false ? node.nodeValue :
                this.wrap(node.nodeValue.trim()).split("\n").join("\n" + indent)
            
        }
        
        if  (node.nodeType != 1) {
            return '';
        }
        
        
        
        if (node.tagName == 'BODY') {
            
            return this.cn(node, '');
        }
             
             // Prints the node tagName, such as <A>, <IMG>, etc
        var ret = (indent === false ? '' : indent ) + "<"+ node.node.tagName +  _this.attr(node) 
        
        // elements with no children..
        if (['IMG', 'BR', 'HR', 'INPUT'].indexOf(tagName) > -1) {
                return ret + '/>';
        }
        ret += '>';
        
        var cindent = indent + '  ';
        if (['PRE', 'TEXTAREA', 'TD', 'A', 'SPAN'].indexOf(tagName) > -1) { // or code?
            cindent = false;
        }
        
        return ret +
                this.cn(node, cindent )  +
            '</' + node.tagName + '>' +
            (indent === false ? '' : "\n");
        
    },
    cn: function(node, indent)
    {
        var ret = [];
        var allText = true;
        var ar = Array.from(node.childNodes);
        for (var i = 0 ; i < ar.length ; i++) {
            ret.push(this.tidy(ar[i], indent));
            if (ar[i].nodeType != 3) { //text
                allText = false;
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
                    Roo.util.Format.htmlEncode(currentElement.attributes.item(i).value) + '"'
            );
        }
        return attr.length ? (' ' + attr.join(' ') ) : '';
        
    }
    
    
    
}