
// this looks like it's normally the {rtf{ .... }}
Roo.rtf.Document = function()
{
    // we dont want to acutally store parent - it will make debug a nightmare..
    this.rtlch  = [];
    this.content = [];
    this.cn = [];
    
};
Roo.extend(Roo.rtf.Document, Roo.rtf.Group, { 
    addChild : function(cn)
    {
        this.cn.push(cn);
        switch(cn.type) {
            case 'rtlch': // most content seems to be inside this??
            case 'listtext':
            case 'shpinst':
                this.rtlch.push(cn);
                return;
            default:
                this[cn.type] = cn;
        }
        
    },
    
    getElementsByType : function(type)
    {
        var ret =  [];
        this._getElementsByType(type, ret, this.cn, 'rtf');
        return ret;
    },
    _getElementsByType : function (type, ret, search_array, path)
    {
        search_array.forEach(function(n,i) {
            if (n.type == type) {
                n.path = path + '/' + n.type + ':' + i;
                ret.push(n);
            }
            if (n.cn.length > 0) {
                this._getElementsByType(type, ret, n.cn, path + '/' + n.type+':'+i);
            }
        },this);
    }
    
});
