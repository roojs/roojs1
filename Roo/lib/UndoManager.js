/**
 * Originally based of this code... - refactored for Roo...
 * https://github.com/aaalsaleh/undo-manager
 
 * undo-manager.js
 * @author  Abdulrahman Alsaleh 
 * @copyright 2015 Abdulrahman Alsaleh 
 * @license  MIT License (c) 
 *
 * Hackily modifyed by alan@roojs.com
 *
 *
 *  
 *
 *  TOTALLY UNTESTED...
 *
 *  Documentation to be done....
 */
 

/**
* @class Roo.lib.UndoManager
* An undo manager implementation in JavaScript. It follows the W3C UndoManager and DOM Transaction
* Draft and the undocumented and disabled Mozilla Firefox's UndoManager implementation.

 * Usage:
 * <pre><code>


editor.undoManager = new Roo.lib.UndoManager(1000, editor);

var html = editor.innerHTML;
var merge = false;
var timer = null;

// warning: some browsers do not support input event
editor.addEventListener('input', function(e) {
	if(editor.innerHTML != html) {
		clearTimeout(timer);
		timer = setTimeout(function() { merge = false; }, 1000);

		editor.undoManager.transact({
			oldHTML: html,
			newHTML: editor.innerHTML,
			// nothing to execute (content already changed when input is fired)
			execute: function() { },
			undo: function() {
				editor.innerHTML = html = this.oldHTML;
			},
			redo: function() {
				editor.innerHTML = html = this.newHTML;
			}
		}, merge);

		html = editor.innerHTML;
		merge = true;
	}

});
editor.addEventListener('keydown', function(e) {
	if ((e.ctrlKey || e.metaKey) && e.keyCode === 90) {
		if (e.shiftKey)
			editor.undoManager.redo(); // Ctrl/Command + Shift + Z
		else
			editor.undoManager.undo(); // Ctrl/Command + Z

		e.preventDefault();
	}
});
</code></pre>

* For more information see this blog post with examples:
*  <a href="http://www.cnitblog.com/seeyeah/archive/2011/12/30/38728.html/">DomHelper
     - Create Elements using DOM, HTML fragments and Templates</a>. 
* @constructor
* @param {Number} limit how far back to go ... use 1000?
* @param {Object} scope usually use document..
*/

Roo.lib.UndoManager = function (limit, undoScopeHost)
{
    this.stack = [];
    this.limit = limit;
    this.scope = undoScopeHost;
    this.fireEvent = typeof CustomEvent != 'undefined' && undoScopeHost && undoScopeHost.dispatchEvent;
    if (this.fireEvent ) {
        this.bindEvents();
    }
};
        
Roo.lib.UndoManager.prototype = {
    
    limit : false,
    stack : false,
    scope :  false,
    fireEvent : false,
    position : 0,
    length : 0,
    
    
     /**
     * To push and execute a transaction, the method undoManager.transact
     * must be called by passing a transaction object as the first argument, and a merge
     * flag as the second argument. A transaction object has the following properties:
     *
     * Usage:
<pre><code>
undoManager.transact({
    label: 'Typing',
    execute: function() { ... },
    undo: function() { ... },
    // redo same as execute
    redo: function() { this.execute(); }
}, false);

// merge transaction
undoManager.transact({
    label: 'Typing',
    execute: function() { ... },  // this will be run...
    undo: function() { ... }, // what to do when undo is run.
    // redo same as execute
    redo: function() { this.execute(); }
}, true); 
</code></pre> 
     *
     * 
     * @param {Object} transaction The transaction to add to the stack.
     * @return {String} The HTML fragment
     */
    
    
    transact : function (transaction, merge)
    {
        if (arguments.length < 2) {
            throw new TypeError('Not enough arguments to UndoManager.transact.');
        }

        transaction.execute();

        this.stack.splice(0, this.position);
        if (merge && this.length) {
            this.stack[0].push(transaction);
        } else {
            this.stack.unshift([transaction]);
        }
    
        this.position = 0;

        if (this.limit && this.stack.length > this.limit) {
            this.length = this.stack.length = this.limit;
        } else {
            this.length = this.stack.length;
        }

        if (this.fireEvent) {
            this.scope.dispatchEvent(
                new CustomEvent('DOMTransaction', {
                    detail: {
                        transactions: this.stack[0].slice()
                    },
                    bubbles: true,
                    cancelable: false
                })
            );
        }
    },

    undo : function ()
    {
        if (this.position < this.length) {
            for (var i = this.stack[this.position].length - 1; i >= 0; i--) {
                this.stack[this.position][i].undo();
            }
            this.position++;

            if (this.fireEvent) {
                this.scope.dispatchEvent(
                    new CustomEvent('undo', {
                        detail: {
                            transactions: this.stack[this.position - 1].slice()
                        },
                        bubbles: true,
                        cancelable: false
                    })
                );
            }
        }
    },

    redo : function ()
    {
        if (this.position > 0) {
            for (var i = 0, n = this.stack[this.position - 1].length; i < n; i++) {
                this.stack[this.position - 1][i].redo();
            }
            this.position--;

            if (this.fireEvent) {
                this.scope.dispatchEvent(
                    new CustomEvent('redo', {
                        detail: {
                            transactions: this.stack[this.position].slice()
                        },
                        bubbles: true,
                        cancelable: false
                    })
                );
            }
        }
    },

    item : function (index)
    {
        if (index >= 0 && index < this.length) {
            return this.stack[index].slice();
        }
        return null;
    },

    clearUndo : function () {
        this.stack.length = this.length = this.position;
    },

    clearRedo : function () {
        this.stack.splice(0, this.position);
        this.position = 0;
        this.length = this.stack.length;
    },
    
    bindEvents : function()
    {
        var el  = this.scope;
        this.scope.addEventListener('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.keyCode === 90) {
                if (e.shiftKey)
                    el.undoManager.redo(); // Ctrl/Command + Shift + Z
                else
                    el.undoManager.undo(); // Ctrl/Command + Z
        
                e.preventDefault();
            }
        });
    }
    
    
    
    
};
