Roo.htmleditor.FilterList = function(cfg)
{
    this.replaceList(cfg.node);   
}

Roo.extend(Roo.htmleditor.FilterList, Roo.htmleditor.Filter,
{
    replaceList : function(doc)
    {
        var ol = Array.from(doc.getElementsByTagName('ol'));
        
    }
});