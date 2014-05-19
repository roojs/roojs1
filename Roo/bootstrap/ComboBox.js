/*
 * - LGPL
 * * 
 */

/**
 * @class Roo.bootstrap.ComboBox
 * @extends Roo.bootstrap.Component
 * A combobox control with support for autocomplete, remote-loading, paging and many other features.
 * @cfg {Boolean} showSearchBar  (true|false) default false
 * 
 * @constructor
 * Create a new ComboBox.
 * @param {Object} config Configuration options
 */
Roo.bootstrap.ComboBox = function(config){
    Roo.bootstrap.ComboBox.superclass.constructor.call(this, config);

};

Roo.extend(Roo.bootstrap.ComboBox, Roo.bootstrap.Component, {
    
    showSearchBar : false,
    resultsSelector : ".select2-results",
    
    getAutoCreate : function()
    {
        var id = Roo.id();
        
        var cfg = {
            tag: 'select',
            id: id,
            cn: [
                {
                    tag: 'option',
                    value: 'AK',
                    html: 'Alaska'
                },
                {
                    tag: 'option',
                    value: 'HI',
                    html: 'Hawfaii'
                },
                {
                    tag: 'option',
                    value: 'CA',
                    html: 'California'
                }
            ]
        };
       
        return cfg;
        
    },
    
    initEvents : function()
    {
        Roo.log('initEvents');
        
        this.container = Roo.bootstrap.ComboBox.SingleSelect2.createContainer();
        
        var liveRegion = {
            tag: 'span',
            role: 'status',
            cls: 'select2-hidden-accessible'
        }
        
        this.liveRegion = Roo.get(document.body).createChild(liveRegion);
        
        this.containerId="s2id_"+(this.el.attr("id") || Roo.id());
        
        this.container.attr("id", "s2id_"+(this.el.attr("id") || Roo.id()));
        
        this.container.attr("title", this.el.attr("title"));
        
        this.container.attr("style", this.el.attr("style"));
        
        this.container.addClass(this.el.attr('class'));
        
        this.container.on("click", this.killEvent);
        
        this.elementTabIndex = this.el.attr("tabindex");
        
        this.dropdown = this.container.select(".select2-drop", true).first();
        
        this.dropdown.addClass(this.el.attr('class'));
        
        this.dropdown.on("click", this.killEvent);
        
        this.results = this.container.select(this.resultsSelector, true).first();
        
        this.search = this.container.select("input.select2-input", true).first();
        
        this.initContainer();
        
    },
    
    populateResults: function(container, results, query) {
        var populate, id=this.opts.id, liveRegion=this.liveRegion;

        populate=function(results, container, depth) {

            var i, l, result, selectable, disabled, compound, node, label, innerContainer, formatted;

            results = this.sortResults(results, container, query);

            for (i = 0, l = results.length; i < l; i = i + 1) {

                result=results[i];

                disabled = (result.disabled === true);
                selectable = (!disabled) && (id(result) !== undefined);

                compound=result.children && result.children.length > 0;

                node=new Roo.Element(document.createElement("li"), true);
                node.addClass("select2-results-dept-"+depth);
                node.addClass("select2-result");
                node.addClass(selectable ? "select2-result-selectable" : "select2-result-unselectable");
                if (disabled) { node.addClass("select2-disabled"); }
                if (compound) { node.addClass("select2-result-with-children"); }
                node.addClass(this.formatResultCssClass(result));
                node.attr("role", "presentation");

                label=new Roo.Element(document.createElement("div"), true);
                label.addClass("select2-result-label");
                label.attr("id", "select2-result-label-" + nextUid());
                label.attr("role", "option");

                formatted=this.formatResult(result, label, query, this.defaultEscapeMarkup);
                if (formatted!==undefined) {
                    label.html(formatted);
                    node.append(label);
                }


                if (compound) {

                    innerContainer=new Roo.Element(document.createElement("ul"), true);
                    innerContainer.addClass("select2-result-sub");
                    populate(result.children, innerContainer, depth+1);
                    node.append(innerContainer);
                }

                node.data("select2-data", result);
                container.append(node);
            }

            liveRegion.text(this.formatMatches(results.length));
        };

        populate(results, container, 0);
    },
    
    sortResults: function (results, container, query) 
    {
        return results;
    },
    
    formatResultCssClass: function(data) 
    {
        return data.css;
    },
    
    formatResult: function(result, container, query, escapeMarkup) 
    {
        var markup=[];
        markMatch(result.text, query.term, markup, escapeMarkup);
        return markup.join("");
    },
    
    defaultEscapeMarkup : function (markup) {
        var replace_map = {
            '\\': '&#92;',
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            "/": '&#47;'
        };

        return String(markup).replace(/[&<>"'\/\\]/g, function (match) {
            return replace_map[match];
        });
    },
    
    formatMatches: function (matches) 
    { 
        return matches + " results are available, use up and down arrow keys to navigate."; 
    },
    
    initContainer: function () {

        var idSuffix = Roo.id(),
            elementLabel;
        
        this.hideSearchBar();
        
        if (this.showSearchBar) {
            this.showSearchBar();
        }
        
        this.selection = this.container.select(".select2-choice", true).first();

        this.focusser = this.container.select(".select2-focusser", true).first();

        // add aria associations
        this.selection.select(".select2-chosen",true).first().attr("id", "select2-chosen-" + idSuffix);
        this.focusser.attr("aria-labelledby", "select2-chosen-" + idSuffix);
        this.results.attr("id", "select2-results-" + idSuffix);
        this.search.attr("aria-owns", "select2-results-" + idSuffix);

        // rewrite labels from original element to focusser
        this.focusser.attr("id", "s2id_" + idSuffix);

        Roo.get(this.focusser.getPrevSibling()).attr('for', this.focusser.attr('id'));
        
        // Ensure the original element retains an accessible name
//        var originalTitle = this.el.attr("title");
//        this.opts.element.attr("title", (originalTitle || elementLabel.text()));

        this.focusser.attr("tabindex", this.elementTabIndex);

        // write label for search field using the label from the focusser element
        this.search.attr("id", this.focusser.attr('id') + '_search');

        Roo.get(this.search.getPrevSibling()).attr('for', this.search.attr('id'));
        
        this.search.on("keydown", this.bind(function (e) {
            if (!this.isInterfaceEnabled()) return;

            if (e.which === KEY.PAGE_UP || e.which === KEY.PAGE_DOWN) {
                // prevent the page from scrolling
                killEvent(e);
                return;
            }

            switch (e.which) {
                case KEY.UP:
                case KEY.DOWN:
                    this.moveHighlight((e.which === KEY.UP) ? -1 : 1);
                    killEvent(e);
                    return;
                case KEY.ENTER:
                    this.selectHighlighted();
                    killEvent(e);
                    return;
                case KEY.TAB:
                    this.selectHighlighted({noFocus: true});
                    return;
                case KEY.ESC:
                    this.cancel(e);
                    killEvent(e);
                    return;
            }
        }));

        this.search.on("blur", this.bind(function(e) {

            // a workaround for chrome to keep the search field focussed when the scroll bar is used to scroll the dropdown.
            // without this the search field loses focus which is annoying
            if (document.activeElement === this.body.get(0)) {
                window.setTimeout(this.bind(function() {
                    if (this.opened()) {
                        this.search.focus();
                    }
                }), 0);
            }
        }));

        this.focusser.on("keydown", this.bind(function (e) {
            console.log('focusser on keydown');
            if (!this.isInterfaceEnabled()) return;

            if (e.which === KEY.TAB || KEY.isControl(e) || KEY.isFunctionKey(e) || e.which === KEY.ESC) {
                return;
            }

            if (this.opts.openOnEnter === false && e.which === KEY.ENTER) {
                killEvent(e);
                return;
            }

            if (e.which == KEY.DOWN || e.which == KEY.UP
                || (e.which == KEY.ENTER && this.opts.openOnEnter)) {

                if (e.altKey || e.ctrlKey || e.shiftKey || e.metaKey) return;

                this.open();
                killEvent(e);
                return;
            }

            if (e.which == KEY.DELETE || e.which == KEY.BACKSPACE) {
                if (this.opts.allowClear) {
                    this.clear();
                }
                killEvent(e);
                return;
            }
        }));


        installKeyUpChangeEvent(this.focusser);
        this.focusser.on("keyup-change input", this.bind(function(e) {
            if (this.opts.minimumResultsForSearch >= 0) {
                e.stopPropagation();
                if (this.opened()) return;
                this.open();
            }
        }));

        selection.on("mousedown touchstart", "abbr", this.bind(function (e) {
            if (!this.isInterfaceEnabled()) return;
            this.clear();
            killEventImmediately(e);
            this.close();
            this.selection.focus();
        }));

        selection.on("mousedown touchstart", this.bind(function (e) {
            // Prevent IE from generating a click event on the body
            reinsertElement(selection);

            if (!this.container.hasClass("select2-container-active")) {
                this.opts.element.trigger($.Event("select2-focus"));
            }

            if (this.opened()) {
                this.close();
            } else if (this.isInterfaceEnabled()) {
                this.open();
            }

            killEvent(e);
        }));

        dropdown.on("mousedown touchstart", this.bind(function() {
            if (this.opts.shouldFocusInput(this)) {
                this.search.focus();
            }
        }));

        selection.on("focus", this.bind(function(e) {
            killEvent(e);
        }));

        this.focusser.on("focus", this.bind(function(){
            if (!this.container.hasClass("select2-container-active")) {
                this.opts.element.trigger($.Event("select2-focus"));
            }
            this.container.addClass("select2-container-active");
        })).on("blur", this.bind(function() {
            if (!this.opened()) {
                this.container.removeClass("select2-container-active");
                this.opts.element.trigger($.Event("select2-blur"));
            }
        }));
        this.search.on("focus", this.bind(function(){
            if (!this.container.hasClass("select2-container-active")) {
                this.opts.element.trigger($.Event("select2-focus"));
            }
            this.container.addClass("select2-container-active");
        }));

        this.initContainerWidth();
        this.opts.element.addClass("select2-offscreen");
        this.setPlaceholder();

    },
    
    showSearchBar: function() {
        
        if(!this.dropdown.select(".select2-search",true).first().hasClass("select2-search-hidden")){
            this.dropdown.select(".select2-search",true).first().addClass("select2-search-hidden");
        }
        
        if(!this.dropdown.select(".select2-search",true).first().hasClass("select2-offscreen")){
            this.dropdown.select(".select2-search",true).first().addClass("select2-offscreen");
        }
        
        if(!this.dropdown.hasClass("select2-with-searchbox")){
            this.dropdown.addClass("select2-with-searchbox");
        }
        
        if(!this.container.hasClass("select2-with-searchbox")){
            this.container.addClass("select2-with-searchbox");
        }
        
    },
    
    hideSearchBar: function() {
        
        if(this.dropdown.select(".select2-search",true).first().hasClass("select2-search-hidden")){
            this.dropdown.select(".select2-search",true).first().removeClass("select2-search-hidden");
        }
        
        if(this.dropdown.select(".select2-search",true).first().hasClass("select2-offscreen")){
            this.dropdown.select(".select2-search",true).first().removeClass("select2-offscreen");
        }
        
        if(this.dropdown.hasClass("select2-with-searchbox")){
            this.dropdown.removeClass("select2-with-searchbox");
        }
        
        if(this.container.hasClass("select2-with-searchbox")){
            this.container.removeClass("select2-with-searchbox");
        }
        
    },
    
    killEvent : function (event) {
        Roo.log('KILLEVENT');
        event.preventDefault();
        event.stopPropagation();
    }
    
    
});

Roo.apply(Roo.bootstrap.ComboBox,  {
    SingleSelect2 : {
        createContainer: function () {
            var container = new Roo.Element(document.createElement("div"), true);
            container.addClass("select2-container");
            
            container.createChild({
                tag: 'a',
                href: 'javascript:void(0)',
                cls: 'select2-choice',
                tabindex: '-1',
                cn: [
                    {
                        tag: 'span',
                        cls: 'select2-chosen',
                        html: '&#160;'
                    },
                    {
                        tag: 'abbr',
                        cls: 'select2-search-choice-close'
                    },
                    {
                        tag: 'span',
                        cls: 'select2-arrow',
                        role: 'presentation'
                    },
                    {
                        tag: 'b',
                        role: 'presentation'
                    }
                ]
            });
            
            container.createChild({
                tag: 'label',
                'for': '',
                cls: 'select2-offscreen'
            });
            
            container.createChild({
                tag: 'input',
                type: 'text',
                cls: 'select2-focusser select2-offscreen',
                'aria-haspopup': true,
                role: 'button'
            });
            
            container.createChild({
                tag: 'div',
                cls: 'select2-drop select2-display-none',
                cn: [
                    {
                        tag: 'div',
                        cls: 'select2-search',
                        cn: [
                            {
                                tag: 'label',
                                'for': '',
                                cls: 'select2-offscreen'
                            },
                            {
                                tag: 'input',
                                type: 'text',
                                cls: 'select2-input',
                                role: 'combobox',
                                autocomplete: 'off',
                                autocorrect: 'off',
                                autocapitalize: 'off',
                                spellcheck: false,
                                'aria-expanded': true,
                                'aria-autocomplete': 'lsit'
                            },
                            
                        ]
                    },
                    {
                        tag: 'ul',
                        cls: 'select2-results',
                        role: 'listbox'
                    }
                ]
            });
            
            return container;
        }
    }
        
});