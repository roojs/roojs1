
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
        if (e.charCode != 13 && e.charCode != 10) {
            Roo.log([e.charCode,e]);
            return true;
        }
        e.preventDefault();
        // https://stackoverflow.com/questions/18552336/prevent-contenteditable-adding-div-on-enter-chrome
        var doc = this.core.doc;
          //add a new line
       
    
        var sel = this.core.getSelection();
        var range = sel.getRangeAt(0);
        var n = range.commonAncestorContainer;
        var pc = range.closest([ 'ol', 'ul']);
        var pli = range.closest('li');
        if (!pc || e.ctrlKey) {
            // on it list, or ctrl pressed.
            if (pc) {
                sel.insertNode('br', 'after'); 
            } else {
                var br = doc.createElement('br');
                br.className = 'clear';
                br.setAttribute('style', 'clear:all');
                sel.insertNode(br, 'after'); 
            }
            
         
            this.core.undoManager.addEvent();
            this.core.fireEditorEvent(e);
            return false;
        }
        
        // deal with <li> insetion
        if (pli.innerText.trim() == '' &&
            pli.previousSibling &&
            pli.previousSibling.nodeName == 'LI' &&
            pli.previousSibling.innerText.trim() ==  '') {
            pli.parentNode.removeChild(pli.previousSibling);
            sel.cursorAfter(pc);
            this.core.undoManager.addEvent();
            this.core.fireEditorEvent(e);
            return false;
        }
    
        var li = doc.createElement('LI');
        li.innerHTML = '&nbsp;';
        if (!pli || !pli.firstSibling) {
            pc.appendChild(li);
        } else {
            pli.parentNode.insertBefore(li, pli.firstSibling);
        }
        sel.cursorText (li.firstChild);
      
        this.core.undoManager.addEvent();
        this.core.fireEditorEvent(e);

        return false;
        
    
        
        
         
    }
};
    