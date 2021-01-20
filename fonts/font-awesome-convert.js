
// run this on https://fontawesome.com/how-to-use/upgrading-from-4#v4-shim
var ret = []; var ar = document.querySelectorAll('.table-wrap td'); for (var i = 16;i<ar.length;i+=3) { var old = ar[i].innerHTML, nw = ar[i+1].innerHTML; ret.push([old , nw]); } JSON.stringify(ret)

//then copy the array and run this ...- to get the migration css

ar = .....(from above)

function unicodeEscape(str) {
	return str.replace(/[\s\S]/g, function(character) {
    if (character.charCodeAt()< 256) {
      return character;
   }
		var escape = character.charCodeAt().toString(16),
		    longhand = escape.length > 2;
		return '\\' + ('0000' + escape).slice(longhand ? -4 : -2);
	});
}
unicodeEscape("\x63\x6f\x6e\x74\x65\x6e\x74\x3a\x20\x22\uf15c\x22\x3b");
function getStyle(className) {
    var classes = document.styleSheets[0].cssRules
    for(var x=0;x<classes.length;x++) {
        if(classes[x].selectorText==className) {
            return unicodeEscape(classes[x].style.cssText);
        }
    }
}
var out = "";
for (var i =0;i< ar.length;i++) {
out += '.fa-' + ar[i][0] + '::before { ' +  getStyle('.fa-' + ar[i][1] + '::before') + "}\n";
}
out