/*
 * - LGPL
 * * 
 */

/**
 * @class Roo.bootstrap.ComboBox
 * @extends Roo.bootstrap.Component
 * A combobox control with support for autocomplete, remote-loading, paging and many other features.
 * @constructor
 * Create a new ComboBox.
 * @param {Object} config Configuration options
 */
Roo.bootstrap.ComboBox = function(config){
    Roo.bootstrap.ComboBox.superclass.constructor.call(this, config);

};

Roo.extend(Roo.bootstrap.ComboBox, Roo.bootstrap.Component, {
    
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