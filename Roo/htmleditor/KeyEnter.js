
/**
 * @class Roo.htmleditor.KeyEnter
 * Handle Enter press..
 * @cfg {Roo.HtmlEditorCore} core the editor.
 * @constructor
 * Create a new Filter.
 * @param {Object} config Configuration options
 */



Roo.htmleditor.KeyEnter = function(cfg) {
    Roo.apply(this, cfg);
    // this does not actually call walk as it's really just a abstract class
 
    Roo.get(this.core.doc.body).on('keypress', this.keypress, this);
}


Roo.htmleditor.KeyEnter.prototype = {
    
    core : false,
    
    keypress : function(e)
    {
        if (e.charCode != 13) {
            return true;
        }
        e.preventDefault();
        // https://stackoverflow.com/questions/18552336/prevent-contenteditable-adding-div-on-enter-chrome
        var doc = this.core.doc;
        
        var docFragment = doc.createDocumentFragment();
    
        //add a new line
        var newEle = doc.createTextNode('\n');
        docFragment.appendChild(newEle);
    
    
        var range = this.core.win.getSelection().getRangeAt(0);
        var n = range.commonAncestorContainer ;
        while (n && n.nodeType != 1) {
            n  = n.parentNode;
        }
        var li = false;
        if (n && n.tagName == 'UL') {
            li = doc.createElement('LI');
            n.appendChild(li);
            
        }
        if (n && n.tagName == 'LI') {
            li = doc.createElement('LI');
            if (n.nextSibling) {
                n.parentNode.insertBefore(li, n.firstSibling);
                
            } else {
                n.parentNode.appendChild(li);
            }
        }
        if (li) {   
            range = doc.createRange();
            range.setStartAfter(li);
            range.collapse(true);
        
            //make the cursor there
            var sel = this.core.win.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
            return false;
            
            
        }
        //add the br, or p, or something else
        newEle = doc.createElement('br');
        docFragment.appendChild(newEle);
    
        //make the br replace selection
        
        range.deleteContents();
        
        range.insertNode(docFragment);
        range = range.cloneRange();
        range.collapse(true);
        var sel = this.core.win.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        
    
        return false;
         
    }
};
    