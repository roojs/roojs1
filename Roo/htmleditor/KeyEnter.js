
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

//Roo.htmleditor.KeyEnter.i = 0;


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
            this.core.undoManager.addEvent();
            return false;
            
            
        }
        var newEle = doc.createTextNode('\n');
        docFragment.appendChild(newEle);
        
        //add the br, or p, or something else
        newEle = doc.createElement('br');
        //newEle.setAttribute('data-id', Roo.htmleditor.KeyEnter.i++);
        docFragment.appendChild(newEle);
        doc.createTextNode('\n');
        docFragment.appendChild(newEle);
        
        range.deleteContents();
        range.insertNode(docFragment);  //<< inseting here...
         
        var ns = newEle.nextSibling
        while (ns && ns.nodeType == 3) { 
            ns = ns.nextSibling;
        }
        
        if (!ns) {
            //Roo.log('add extra');
            ns = doc.createElement('br');
            //ns.setAttribute('data-id', 'x' +  Roo.htmleditor.KeyEnter.i++);
            newEle.parentNode.appendChild(ns);
        }
        
        
        
        range = doc.createRange();
        range.setStartAfter(newEle);
        range.collapse(true);
        
        var sel = this.core.win.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        //this.core.undoManager.addEvent();
        return false;
         
    }
};
    