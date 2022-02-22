/**
 * @class Roo.htmleditor.FilterBlack
 * remove blacklisted elements.
 * @constructor
 * Run a new Blacklisted Filter
 * @param {Object} config Configuration options
 */

Roo.htmleditor.FilterBlack = function(cfg)
{
    Roo.apply(this, cfg);
    this.walk(cfg.node);
}

Roo.extend(Roo.htmleditor.FilterBlack, Roo.htmleditor.Filter,
{
    tag : true, // all elements.
   
    replaceTag : function(n)
    {
        n.parentNode.removeChild(n);
    }
});
