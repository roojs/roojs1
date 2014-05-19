/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */


/**
 * @class Roo.CompositeElement
 * Standard composite class. Creates a Roo.Element for every element in the collection.
 * <br><br>
 * <b>NOTE: Although they are not listed, this class supports all of the set/update methods of Roo.Element. All Roo.Element
 * actions will be performed on all the elements in this collection.</b>
 * <br><br>
 * All methods return <i>this</i> and can be chained.
 <pre><code>
 var els = Roo.select("#some-el div.some-class", true);
 // or select directly from an existing element
 var el = Roo.get('some-el');
 el.select('div.some-class', true);

 els.setWidth(100); // all elements become 100 width
 els.hide(true); // all elements fade out and hide
 // or
 els.setWidth(100).hide(true);
 </code></pre>
 */
Roo.CompositeElement = function(els){
    this.elements = [];
    this.addElements(els);
};
Roo.CompositeElement.prototype = {
    isComposite: true,
    addElements : function(els){
        if(!els) return this;
        if(typeof els == "string"){
            els = Roo.Element.selectorFunction(els);
        }
        var yels = this.elements;
        var index = yels.length-1;
        for(var i = 0, len = els.length; i < len; i++) {
        	yels[++index] = Roo.get(els[i]);
        }
        return this;
    },

    /**
    * Clears this composite and adds the elements returned by the passed selector.
    * @param {String/Array} els A string CSS selector, an array of elements or an element
    * @return {CompositeElement} this
    */
    fill : function(els){
        this.elements = [];
        this.add(els);
        return this;
    },

    /**
    * Filters this composite to only elements that match the passed selector.
    * @param {String} selector A string CSS selector
    * @param {Boolean} inverse return inverse filter (not matches)
    * @return {CompositeElement} this
    */
    filter : function(selector, inverse){
        var els = [];
        inverse = inverse || false;
        this.each(function(el){
            var match = inverse ? !el.is(selector) : el.is(selector);
            if(match){
                els[els.length] = el.dom;
            }
        });
        this.fill(els);
        return this;
    },

    invoke : function(fn, args){
        var els = this.elements;
        for(var i = 0, len = els.length; i < len; i++) {
        	Roo.Element.prototype[fn].apply(els[i], args);
        }
        return this;
    },
    /**
    * Adds elements to this composite.
    * @param {String/Array} els A string CSS selector, an array of elements or an element
    * @return {CompositeElement} this
    */
    add : function(els){
        if(typeof els == "string"){
            this.addElements(Roo.Element.selectorFunction(els));
        }else if(els.length !== undefined){
            this.addElements(els);
        }else{
            this.addElements([els]);
        }
        return this;
    },
    /**
    * Calls the passed function passing (el, this, index) for each element in this composite.
    * @param {Function} fn The function to call
    * @param {Object} scope (optional) The <i>this</i> object (defaults to the element)
    * @return {CompositeElement} this
    */
    each : function(fn, scope){
        var els = this.elements;
        for(var i = 0, len = els.length; i < len; i++){
            if(fn.call(scope || els[i], els[i], this, i) === false) {
                break;
            }
        }
        return this;
    },

    /**
     * Returns the Element object at the specified index
     * @param {Number} index
     * @return {Roo.Element}
     */
    item : function(index){
        return this.elements[index] || null;
    },

    /**
     * Returns the first Element
     * @return {Roo.Element}
     */
    first : function(){
        return this.item(0);
    },

    /**
     * Returns the last Element
     * @return {Roo.Element}
     */
    last : function(){
        return this.item(this.elements.length-1);
    },

    /**
     * Returns the number of elements in this composite
     * @return Number
     */
    getCount : function(){
        return this.elements.length;
    },

    /**
     * Returns true if this composite contains the passed element
     * @return Boolean
     */
    contains : function(el){
        return this.indexOf(el) !== -1;
    },

    /**
     * Returns true if this composite contains the passed element
     * @return Boolean
     */
    indexOf : function(el){
        return this.elements.indexOf(Roo.get(el));
    },


    /**
    * Removes the specified element(s).
    * @param {Mixed} el The id of an element, the Element itself, the index of the element in this composite
    * or an array of any of those.
    * @param {Boolean} removeDom (optional) True to also remove the element from the document
    * @return {CompositeElement} this
    */
    removeElement : function(el, removeDom){
        if(el instanceof Array){
            for(var i = 0, len = el.length; i < len; i++){
                this.removeElement(el[i]);
            }
            return this;
        }
        var index = typeof el == 'number' ? el : this.indexOf(el);
        if(index !== -1){
            if(removeDom){
                var d = this.elements[index];
                if(d.dom){
                    d.remove();
                }else{
                    d.parentNode.removeChild(d);
                }
            }
            this.elements.splice(index, 1);
        }
        return this;
    },

    /**
    * Replaces the specified element with the passed element.
    * @param {String/HTMLElement/Element/Number} el The id of an element, the Element itself, the index of the element in this composite
    * to replace.
    * @param {String/HTMLElement/Element} replacement The id of an element or the Element itself.
    * @param {Boolean} domReplace (Optional) True to remove and replace the element in the document too.
    * @return {CompositeElement} this
    */
    replaceElement : function(el, replacement, domReplace){
        var index = typeof el == 'number' ? el : this.indexOf(el);
        if(index !== -1){
            if(domReplace){
                this.elements[index].replaceWith(replacement);
            }else{
                this.elements.splice(index, 1, Roo.get(replacement))
            }
        }
        return this;
    },

    /**
     * Removes all elements.
     */
    clear : function(){
        this.elements = [];
    }
};
(function(){
    Roo.CompositeElement.createCall = function(proto, fnName){
        if(!proto[fnName]){
            proto[fnName] = function(){
                return this.invoke(fnName, arguments);
            };
        }
    };
    for(var fnName in Roo.Element.prototype){
        if(typeof Roo.Element.prototype[fnName] == "function"){
            Roo.CompositeElement.createCall(Roo.CompositeElement.prototype, fnName);
        }
    };
})();
