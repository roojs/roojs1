Roo.htmleditor.FilterList = function(cfg)
{
    this.replaceList();   
}

Roo.extend(Roo.htmleditor.FilterList, Roo.htmleditor.Filter,
{
    replaceList : function(n)
    {
        n.parentNode.removeChild(n);
    }
});