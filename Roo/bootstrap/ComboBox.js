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
    
    escapeMarkup: defaultEscapeMarkup,
    
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
        Roo.log(cfg);
        return cfg;
        
    },
    
    initEvents : function()
    {
        Roo.log('initEvents');
        var results, search, resultsSelector = ".select2-results";
        this.container = this.createContainer();
        
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

                formatted=this.formatResult(result, label, query, this.escapeMarkup);
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
            var container = new Roo.Element(document.createElement("div"));
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
                    }
                ]
            });
            
            var container = $(document.createElement("div")).attr({
                "class": "select2-container"
            }).html([
                "<a href='javascript:void(0)' class='select2-choice' tabindex='-1'>",
                "   <span class='select2-chosen'>&#160;</span><abbr class='select2-search-choice-close'></abbr>",
                "   <span class='select2-arrow' role='presentation'><b role='presentation'></b></span>",
                "</a>",
                "<label for='' class='select2-offscreen'></label>",
                "<input class='select2-focusser select2-offscreen' type='text' aria-haspopup='true' role='button' />",
                "<div class='select2-drop select2-display-none'>",
                "   <div class='select2-search'>",
                "       <label for='' class='select2-offscreen'></label>",
                "       <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input' role='combobox' aria-expanded='true'",
                "       aria-autocomplete='list' />",
                "   </div>",
                "   <ul class='select2-results' role='listbox'>",
                "   </ul>",
                "</div>"].join(""));
            return container;
        },
    }
        
});