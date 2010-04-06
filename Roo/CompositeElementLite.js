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
 * @class Roo.CompositeElementLite
 * @extends Roo.CompositeElement
 * Flyweight composite class. Reuses the same Roo.Element for element operations.
 <pre><code>
 var els = Roo.select("#some-el div.some-class");
 // or select directly from an existing element
 var el = Roo.get('some-el');
 el.select('div.some-class');

 els.setWidth(100); // all elements become 100 width
 els.hide(true); // all elements fade out and hide
 // or
 els.setWidth(100).hide(true);
 </code></pre><br><br>
 * <b>NOTE: Although they are not listed, this class supports all of the set/update methods of Roo.Element. All Roo.Element
 * actions will be performed on all the elements in this collection.</b>
 */
Roo.CompositeElementLite = function(els){
    Roo.CompositeElementLite.superclass.constructor.call(this, els);
    this.el = new Roo.Element.Flyweight();
};
Roo.extend(Roo.CompositeElementLite, Roo.CompositeElement, {
    addElements : function(els){
        if(els){
            if(els instanceof Array){
                this.elements = this.elements.concat(els);
            }else{
                var yels = this.elements;
                var index = yels.length-1;
                for(var i = 0, len = els.length; i < len; i++) {
                    yels[++index] = els[i];
                }
            }
        }
        return this;
    },
    invoke : function(fn, args){
        var els = this.elements;
        var el = this.el;
        for(var i = 0, len = els.length; i < len; i++) {
            el.dom = els[i];
        	Roo.Element.prototype[fn].apply(el, args);
        }
        return this;
    },
    /**
     * Returns a flyweight Element of the dom element object at the specified index
     * @param {Number} index
     * @return {Roo.Element}
     */
    item : function(index){
        if(!this.elements[index]){
            return null;
        }
        this.el.dom = this.elements[index];
        return this.el;
    },

    // fixes scope with flyweight
    addListener : function(eventName, handler, scope, opt){
        var els = this.elements;
        for(var i = 0, len = els.length; i < len; i++) {
            Roo.EventManager.on(els[i], eventName, handler, scope || els[i], opt);
        }
        return this;
    },

    /**
    * Calls the passed function passing (el, this, index) for each element in this composite. <b>The element
    * passed is the flyweight (shared) Roo.Element instance, so if you require a
    * a reference to the dom node, use el.dom.</b>
    * @param {Function} fn The function to call
    * @param {Object} scope (optional) The <i>this</i> object (defaults to the element)
    * @return {CompositeElement} this
    */
    each : function(fn, scope){
        var els = this.elements;
        var el = this.el;
        for(var i = 0, len = els.length; i < len; i++){
            el.dom = els[i];
        	if(fn.call(scope || el, el, this, i) === false){
                break;
            }
        }
        return this;
    },

    indexOf : function(el){
        return this.elements.indexOf(Roo.getDom(el));
    },

    replaceElement : function(el, replacement, domReplace){
        var index = typeof el == 'number' ? el : this.indexOf(el);
        if(index !== -1){
            replacement = Roo.getDom(replacement);
            if(domReplace){
                var d = this.elements[index];
                d.parentNode.insertBefore(replacement, d);
                d.parentNode.removeChild(d);
            }
            this.elements.splice(index, 1, replacement);
        }
        return this;
    }
});
Roo.CompositeElementLite.prototype.on = Roo.CompositeElementLite.prototype.addListener;

