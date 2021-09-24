/**
 * @class Roo.htmleditor.FilterComment
 * remove comments.
 * @constructor
* Run a new Comments Filter
* @param {Object} config Configuration options
 */
Roo.htmleditor.FilterComment = function(cfg)
{
    this.walk(cfg.node);
}

Roo.extend(Roo.htmleditor.FilterComment, Roo.htmleditor.Filter,
{
  
    replaceComment : function(n)
    {
        n.parentNode.removeChild(n);
    }
});