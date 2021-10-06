
/**
 * @class Roo.htmleditor.FilterStyleToTag
 * part of the word stuff... - certain 'styles' should be converted to tags.
 * eg.
 *   font-weight: bold -> bold
 *   ?? super / subscrit etc..
 * 
 * @constructor
* Run a new style to tag filter.
* @param {Object} config Configuration options
 */
Roo.htmleditor.FilterStyleToTag = function(cfg)
{
    Roo.apply(this, cfg);
    this.walk(cfg.node);
}


