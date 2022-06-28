[1mdiff --git a/Roo/htmleditor/BlockTd.js b/Roo/htmleditor/BlockTd.js[m
[1mindex b6022caa76..74706b723c 100644[m
[1m--- a/Roo/htmleditor/BlockTd.js[m
[1m+++ b/Roo/htmleditor/BlockTd.js[m
[36m@@ -339,7 +339,6 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
      */[m
     toObject : function()[m
     {[m
[31m-        [m
         var ret = {[m
             tag : 'td',[m
             contenteditable : 'true', // this stops cell selection from picking the table.[m
[36m@@ -481,6 +480,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     [m
     mergeRight: function()[m
     {[m
[32m+[m[32m        console.log("htmleditor.BlockTd mergeRight");[m
          [m
         // get the contents of the next cell along..[m
         var tr = this.node.closest('tr');[m
[36m@@ -506,6 +506,9 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
         this.colspan += rc.colspan;[m
         this.node.setAttribute('colspan', this.colspan);[m
 [m
[32m+[m[32m        var table = this.toTableArray();[m
[32m+[m[32m        this.normalizeWidths(table);[m
[32m+[m[32m        this.updateWidths(table);[m
     },[m
     [m
     [m
[36m@@ -598,6 +601,11 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     },[m
     updateWidths : function(table)[m
     {[m
[32m+[m[32m        console.log("htmleditor.BlockTd updateWidths");[m
[32m+[m[32m        console.log("TABLE");[m
[32m+[m[32m        console.log(table);[m
[32m+[m[32m        console.log("COLWIDTH");[m
[32m+[m[32m        console.log(this.colWidths);[m
         for(var r = 0 ; r < table.length; r++) {[m
            [m
             for(var c = 0 ; c < table[r].length; c++) {[m
[36m@@ -606,10 +614,23 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
                 }[m
                 [m
                 if (this.colWidths[0] != false && table[r][c].colspan < 2) {[m
[32m+[m[32m                    console.log("CELL");[m
[32m+[m[32m                    console.log(table[r][c].cell);[m
                     var el = Roo.htmleditor.Block.factory(table[r][c].cell);[m
                     el.width = Math.floor(this.colWidths[c])  +'%';[m
                     el.updateElement(el.node);[m
                 }[m
[32m+[m[32m                else {[m
[32m+[m[32m                    console.log("CELL COLSPAN");[m
[32m+[m[32m                    console.log(table[r][c]);[m
[32m+[m[32m                    var el = Roo.htmleditor.Block.factory(table[r][c].cell);[m
[32m+[m[32m                    var width = 0;[m
[32m+[m[32m                    for(var i = 0; i < table[r][c].colspan; i ++) {[m
[32m+[m[32m                        width += Math.floor(this.colWidths[c + i]);[m
[32m+[m[32m                    }[m
[32m+[m[32m                    el.width = width  +'%';[m
[32m+[m[32m                    el.updateElement(el.node);[m
[32m+[m[32m                }[m
                 table[r][c].cell = false; // done[m
             }[m
         }[m
[1mdiff --git a/roojs-all.js b/roojs-all.js[m
[1mindex 39a3e49f52..4fa4af1418 100644[m
[1m--- a/roojs-all.js[m
[1m+++ b/roojs-all.js[m
[36m@@ -2042,16 +2042,17 @@[m [mB().deleteColumn();E();A.editorcore.selectNode(t.node);A.editorcore.onEditorEven[m
 this.rowspan=Math.max(1,1*A.getAttribute('rowspan'));this.html=A.innerHTML;},emptyCell:function(){return {colspan:1,rowspan:1,textAlign:'left',html:"&nbsp;"};},removeNode:function(){return this.node.closest('table');},cellData:false,colWidths:false,toTableArray:function(){var A=[];[m
 var B=this.node.closest('tr').closest('table');Array.from(B.rows).forEach(function(r,ri){A[ri]=[];});var rn=0;this.colWidths=[];var C=true;Array.from(B.rows).forEach(function(r,ri){var cn=0;Array.from(r.cells).forEach(function(ce,ci){var c={cell:ce,row:rn,col:cn,colspan:ce.colSpan,rowspan:ce.rowSpan}[m
 ;if(ce.isEqualNode(this.node)){this.cellData=c;}if(typeof(A[rn][cn])!='undefined'){while(typeof(A[rn][cn])!='undefined'){cn++;}c.col=cn;}if(typeof(this.colWidths[cn])=='undefined'){this.colWidths[cn]=ce.style.width;if(this.colWidths[cn]!=''){C=false;}}if(c.colspan<2&&c.rowspan<2){A[rn][cn]=c;[m
[31m-cn++;return;}for(var j=0;j<c.rowspan;j++){if(typeof(A[rn+j])=='undefined'){continue;}A[rn+j][cn]=c;for(var i=0;i<c.colspan;i++){A[rn+j][cn+i]=c;}}cn+=c.colspan;},this);rn++;},this);if(C){this.colWidths[0]=false;}return A;},mergeRight:function(){var tr=this.node.closest('tr');[m
[31m-var i=Array.prototype.indexOf.call(tr.childNodes,this.node);if(i>=tr.childNodes.length-1){return;}var A=this.toTableArray();if(typeof(A[this.cellData.row][this.cellData.col+this.cellData.colspan])=='undefined'){return;}var rc=A[this.cellData.row][this.cellData.col+this.cellData.colspan];[m
[31m-if(rc.rowspan!=this.cellData.rowspan||rc.row!=this.cellData.row){return;}this.node.innerHTML+=' '+rc.cell.innerHTML;tr.removeChild(rc.cell);this.colspan+=rc.colspan;this.node.setAttribute('colspan',this.colspan);},mergeBelow:function(){var A=this.toTableArray();[m
[31m-if(typeof(A[this.cellData.row+this.cellData.rowspan])=='undefined'){return;}if(typeof(A[this.cellData.row+this.cellData.rowspan][this.cellData.col])=='undefined'){return;}var rc=A[this.cellData.row+this.cellData.rowspan][this.cellData.col];if(rc.colspan!=this.cellData.colspan||rc.col!=this.cellData.col){return;[m
[31m-}this.node.innerHTML=this.node.innerHTML+rc.cell.innerHTML;rc.cell.parentNode.removeChild(rc.cell);this.rowspan+=rc.rowspan;this.node.setAttribute('rowspan',this.rowspan);},split:function(){if(this.node.rowSpan<2&&this.node.colSpan<2){return;}var A=this.toTableArray();[m
[31m-var cd=this.cellData;this.rowspan=1;this.colspan=1;for(var r=cd.row;r<cd.row+cd.rowspan;r++){for(var c=cd.col;c<cd.col+cd.colspan;c++){if(r==cd.row&&c==cd.col){this.node.removeAttribute('rowspan');this.node.removeAttribute('colspan');continue;}var B=this.node.cloneNode();[m
[31m-B.removeAttribute('id');B.innerHTML='';A[r][c]={cell:B,col:c,row:r,colspan:1,rowspan:1};}}this.redrawAllCells(A);},redrawAllCells:function(A){var B=this.node.closest('tr').closest('table');var C=B.rows[0].parentNode;Array.from(B.rows).forEach(function(r,ri){Array.from(r.cells).forEach(function(ce,ci){ce.parentNode.removeChild(ce);[m
[32m+[m[32mcn++;return;}for(var j=0;j<c.rowspan;j++){if(typeof(A[rn+j])=='undefined'){continue;}A[rn+j][cn]=c;for(var i=0;i<c.colspan;i++){A[rn+j][cn+i]=c;}}cn+=c.colspan;},this);rn++;},this);if(C){this.colWidths[0]=false;}return A;},mergeRight:function(){console.log("htmleditor.BlockTd mergeRight");[m
[32m+[m[32mvar tr=this.node.closest('tr');var i=Array.prototype.indexOf.call(tr.childNodes,this.node);if(i>=tr.childNodes.length-1){return;}var A=this.toTableArray();if(typeof(A[this.cellData.row][this.cellData.col+this.cellData.colspan])=='undefined'){return;}var rc=A[this.cellData.row][this.cellData.col+this.cellData.colspan];[m
[32m+[m[32mif(rc.rowspan!=this.cellData.rowspan||rc.row!=this.cellData.row){return;}this.node.innerHTML+=' '+rc.cell.innerHTML;tr.removeChild(rc.cell);this.colspan+=rc.colspan;this.node.setAttribute('colspan',this.colspan);var A=this.toTableArray();this.normalizeWidths(A);[m
[32m+[m[32mthis.updateWidths(A);},mergeBelow:function(){var A=this.toTableArray();if(typeof(A[this.cellData.row+this.cellData.rowspan])=='undefined'){return;}if(typeof(A[this.cellData.row+this.cellData.rowspan][this.cellData.col])=='undefined'){return;}var rc=A[this.cellData.row+this.cellData.rowspan][this.cellData.col];[m
[32m+[m[32mif(rc.colspan!=this.cellData.colspan||rc.col!=this.cellData.col){return;}this.node.innerHTML=this.node.innerHTML+rc.cell.innerHTML;rc.cell.parentNode.removeChild(rc.cell);this.rowspan+=rc.rowspan;this.node.setAttribute('rowspan',this.rowspan);},split:function(){if(this.node.rowSpan<2&&this.node.colSpan<2){return;[m
[32m+[m[32m}var A=this.toTableArray();var cd=this.cellData;this.rowspan=1;this.colspan=1;for(var r=cd.row;r<cd.row+cd.rowspan;r++){for(var c=cd.col;c<cd.col+cd.colspan;c++){if(r==cd.row&&c==cd.col){this.node.removeAttribute('rowspan');this.node.removeAttribute('colspan');[m
[32m+[m[32mcontinue;}var B=this.node.cloneNode();B.removeAttribute('id');B.innerHTML='';A[r][c]={cell:B,col:c,row:r,colspan:1,rowspan:1};}}this.redrawAllCells(A);},redrawAllCells:function(A){var B=this.node.closest('tr').closest('table');var C=B.rows[0].parentNode;Array.from(B.rows).forEach(function(r,ri){Array.from(r.cells).forEach(function(ce,ci){ce.parentNode.removeChild(ce);[m
 });r.parentNode.removeChild(r);});for(var r=0;r<A.length;r++){var re=B.rows[r];var re=B.ownerDocument.createElement('tr');C.appendChild(re);for(var c=0;c<A[r].length;c++){if(A[r][c].cell===false){continue;}re.appendChild(A[r][c].cell);A[r][c].cell=false;}[m
[31m-}},updateWidths:function(A){for(var r=0;r<A.length;r++){for(var c=0;c<A[r].length;c++){if(A[r][c].cell===false){continue;}if(this.colWidths[0]!=false&&A[r][c].colspan<2){var el=Roo.htmleditor.Block.factory(A[r][c].cell);el.width=Math.floor(this.colWidths[c])+'%';[m
[31m-el.updateElement(el.node);}A[r][c].cell=false;}}},normalizeWidths:function(A){if(this.colWidths[0]===false){var nw=100.0/this.colWidths.length;this.colWidths.forEach(function(w,i){this.colWidths[i]=nw;},this);return;}var t=0,B=[];this.colWidths.forEach(function(w,i){this.colWidths[i]=this.colWidths[i]==''?0:(this.colWidths[i]+'').replace(/[^0-9]+/g,'')*1;[m
[32m+[m[32m}},updateWidths:function(A){console.log("htmleditor.BlockTd updateWidths");console.log("TABLE");console.log(A);console.log("COLWIDTH");console.log(this.colWidths);for(var r=0;r<A.length;r++){for(var c=0;c<A[r].length;c++){if(A[r][c].cell===false){continue;[m
[32m+[m[32m}if(this.colWidths[0]!=false&&A[r][c].colspan<2){console.log("CELL");console.log(A[r][c].cell);var el=Roo.htmleditor.Block.factory(A[r][c].cell);el.width=Math.floor(this.colWidths[c])+'%';el.updateElement(el.node);}else{console.log("CELL COLSPAN");console.log(A[r][c]);[m
[32m+[m[32m}A[r][c].cell=false;}}},normalizeWidths:function(A){if(this.colWidths[0]===false){var nw=100.0/this.colWidths.length;this.colWidths.forEach(function(w,i){this.colWidths[i]=nw;},this);return;}var t=0,B=[];this.colWidths.forEach(function(w,i){this.colWidths[i]=this.colWidths[i]==''?0:(this.colWidths[i]+'').replace(/[^0-9]+/g,'')*1;[m
 var D=this.colWidths[i];if(D>0){t+=D;return;}B.push(i);},this);var nc=this.colWidths.length;if(B.length){var C=(nc-B.length)/(1.0*nc);var t=C*t;var ew=(100-t)/(1.0*B.length);this.colWidths.forEach(function(w,i){if(w>0){this.colWidths[i]=w*C;return;}this.colWidths[i]=ew;[m
 },this);}},shrinkColumn:function(){var A=this.toTableArray();this.normalizeWidths(A);var B=this.cellData.col;var nw=this.colWidths[B]*0.8;if(nw<5){return;}var C=(this.colWidths[B]*0.2)/(this.colWidths.length-1);this.colWidths.forEach(function(w,i){if(i==B){this.colWidths[i]=nw;[m
 return;}this.colWidths[i]+=C},this);this.updateWidths(A);},growColumn:function(){var A=this.toTableArray();this.normalizeWidths(A);var B=this.cellData.col;var nw=this.colWidths[B]*1.2;if(nw>90){return;}var C=(this.colWidths[B]*0.2)/(this.colWidths.length-1);[m
[1mdiff --git a/roojs-debug.js b/roojs-debug.js[m
[1mindex 779fa0189f..df0c12750f 100644[m
[1m--- a/roojs-debug.js[m
[1m+++ b/roojs-debug.js[m
[36m@@ -49276,7 +49276,6 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
      */[m
     toObject : function()[m
     {[m
[31m-        [m
         var ret = {[m
             tag : 'td',[m
             contenteditable : 'true', // this stops cell selection from picking the table.[m
[36m@@ -49418,6 +49417,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     [m
     mergeRight: function()[m
     {[m
[32m+[m[32m        console.log("htmleditor.BlockTd mergeRight");[m
          [m
         // get the contents of the next cell along..[m
         var tr = this.node.closest('tr');[m
[36m@@ -49443,6 +49443,9 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
         this.colspan += rc.colspan;[m
         this.node.setAttribute('colspan', this.colspan);[m
 [m
[32m+[m[32m        var table = this.toTableArray();[m
[32m+[m[32m        this.normalizeWidths(table);[m
[32m+[m[32m        this.updateWidths(table);[m
     },[m
     [m
     [m
[36m@@ -49535,6 +49538,11 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     },[m
     updateWidths : function(table)[m
     {[m
[32m+[m[32m        console.log("htmleditor.BlockTd updateWidths");[m
[32m+[m[32m        console.log("TABLE");[m
[32m+[m[32m        console.log(table);[m
[32m+[m[32m        console.log("COLWIDTH");[m
[32m+[m[32m        console.log(this.colWidths);[m
         for(var r = 0 ; r < table.length; r++) {[m
            [m
             for(var c = 0 ; c < table[r].length; c++) {[m
[36m@@ -49543,10 +49551,16 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
                 }[m
                 [m
                 if (this.colWidths[0] != false && table[r][c].colspan < 2) {[m
[32m+[m[32m                    console.log("CELL");[m
[32m+[m[32m                    console.log(table[r][c].cell);[m
                     var el = Roo.htmleditor.Block.factory(table[r][c].cell);[m
                     el.width = Math.floor(this.colWidths[c])  +'%';[m
                     el.updateElement(el.node);[m
                 }[m
[32m+[m[32m                else {[m
[32m+[m[32m                    console.log("CELL COLSPAN");[m
[32m+[m[32m                    console.log(table[r][c]);[m
[32m+[m[32m                }[m
                 table[r][c].cell = false; // done[m
             }[m
         }[m
[1mdiff --git a/roojs-ui-debug.js b/roojs-ui-debug.js[m
[1mindex 6623fbfdb0..f35b8e5a06 100644[m
[1m--- a/roojs-ui-debug.js[m
[1m+++ b/roojs-ui-debug.js[m
[36m@@ -24784,7 +24784,6 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
      */[m
     toObject : function()[m
     {[m
[31m-        [m
         var ret = {[m
             tag : 'td',[m
             contenteditable : 'true', // this stops cell selection from picking the table.[m
[36m@@ -24926,6 +24925,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     [m
     mergeRight: function()[m
     {[m
[32m+[m[32m        console.log("htmleditor.BlockTd mergeRight");[m
          [m
         // get the contents of the next cell along..[m
         var tr = this.node.closest('tr');[m
[36m@@ -24951,6 +24951,9 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
         this.colspan += rc.colspan;[m
         this.node.setAttribute('colspan', this.colspan);[m
 [m
[32m+[m[32m        var table = this.toTableArray();[m
[32m+[m[32m        this.normalizeWidths(table);[m
[32m+[m[32m        this.updateWidths(table);[m
     },[m
     [m
     [m
[36m@@ -25043,6 +25046,11 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     },[m
     updateWidths : function(table)[m
     {[m
[32m+[m[32m        console.log("htmleditor.BlockTd updateWidths");[m
[32m+[m[32m        console.log("TABLE");[m
[32m+[m[32m        console.log(table);[m
[32m+[m[32m        console.log("COLWIDTH");[m
[32m+[m[32m        console.log(this.colWidths);[m
         for(var r = 0 ; r < table.length; r++) {[m
            [m
             for(var c = 0 ; c < table[r].length; c++) {[m
[36m@@ -25051,10 +25059,16 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
                 }[m
                 [m
                 if (this.colWidths[0] != false && table[r][c].colspan < 2) {[m
[32m+[m[32m                    console.log("CELL");[m
[32m+[m[32m                    console.log(table[r][c].cell);[m
                     var el = Roo.htmleditor.Block.factory(table[r][c].cell);[m
                     el.width = Math.floor(this.colWidths[c])  +'%';[m
                     el.updateElement(el.node);[m
                 }[m
[32m+[m[32m                else {[m
[32m+[m[32m                    console.log("CELL COLSPAN");[m
[32m+[m[32m                    console.log(table[r][c]);[m
[32m+[m[32m                }[m
                 table[r][c].cell = false; // done[m
             }[m
         }[m
[1mdiff --git a/roojs-ui.js b/roojs-ui.js[m
[1mindex 40ce72d195..313c6f61dc 100644[m
[1m--- a/roojs-ui.js[m
[1m+++ b/roojs-ui.js[m
[36m@@ -1096,16 +1096,17 @@[m [mB().deleteColumn();E();A.editorcore.selectNode(t.node);A.editorcore.onEditorEven[m
 this.rowspan=Math.max(1,1*A.getAttribute('rowspan'));this.html=A.innerHTML;},emptyCell:function(){return {colspan:1,rowspan:1,textAlign:'left',html:"&nbsp;"};},removeNode:function(){return this.node.closest('table');},cellData:false,colWidths:false,toTableArray:function(){var A=[];[m
 var B=this.node.closest('tr').closest('table');Array.from(B.rows).forEach(function(r,ri){A[ri]=[];});var rn=0;this.colWidths=[];var C=true;Array.from(B.rows).forEach(function(r,ri){var cn=0;Array.from(r.cells).forEach(function(ce,ci){var c={cell:ce,row:rn,col:cn,colspan:ce.colSpan,rowspan:ce.rowSpan}[m
 ;if(ce.isEqualNode(this.node)){this.cellData=c;}if(typeof(A[rn][cn])!='undefined'){while(typeof(A[rn][cn])!='undefined'){cn++;}c.col=cn;}if(typeof(this.colWidths[cn])=='undefined'){this.colWidths[cn]=ce.style.width;if(this.colWidths[cn]!=''){C=false;}}if(c.colspan<2&&c.rowspan<2){A[rn][cn]=c;[m
[31m-cn++;return;}for(var j=0;j<c.rowspan;j++){if(typeof(A[rn+j])=='undefined'){continue;}A[rn+j][cn]=c;for(var i=0;i<c.colspan;i++){A[rn+j][cn+i]=c;}}cn+=c.colspan;},this);rn++;},this);if(C){this.colWidths[0]=false;}return A;},mergeRight:function(){var tr=this.node.closest('tr');[m
[31m-var i=Array.prototype.indexOf.call(tr.childNodes,this.node);if(i>=tr.childNodes.length-1){return;}var A=this.toTableArray();if(typeof(A[this.cellData.row][this.cellData.col+this.cellData.colspan])=='undefined'){return;}var rc=A[this.cellData.row][this.cellData.col+this.cellData.colspan];[m
[31m-if(rc.rowspan!=this.cellData.rowspan||rc.row!=this.cellData.row){return;}this.node.innerHTML+=' '+rc.cell.innerHTML;tr.removeChild(rc.cell);this.colspan+=rc.colspan;this.node.setAttribute('colspan',this.colspan);},mergeBelow:function(){var A=this.toTableArray();[m
[31m-if(typeof(A[this.cellData.row+this.cellData.rowspan])=='undefined'){return;}if(typeof(A[this.cellData.row+this.cellData.rowspan][this.cellData.col])=='undefined'){return;}var rc=A[this.cellData.row+this.cellData.rowspan][this.cellData.col];if(rc.colspan!=this.cellData.colspan||rc.col!=this.cellData.col){return;[m
[31m-}this.node.innerHTML=this.node.innerHTML+rc.cell.innerHTML;rc.cell.parentNode.removeChild(rc.cell);this.rowspan+=rc.rowspan;this.node.setAttribute('rowspan',this.rowspan);},split:function(){if(this.node.rowSpan<2&&this.node.colSpan<2){return;}var A=this.toTableArray();[m
[31m-var cd=this.cellData;this.rowspan=1;this.colspan=1;for(var r=cd.row;r<cd.row+cd.rowspan;r++){for(var c=cd.col;c<cd.col+cd.colspan;c++){if(r==cd.row&&c==cd.col){this.node.removeAttribute('rowspan');this.node.removeAttribute('colspan');continue;}var B=this.node.cloneNode();[m
[31m-B.removeAttribute('id');B.innerHTML='';A[r][c]={cell:B,col:c,row:r,colspan:1,rowspan:1};}}this.redrawAllCells(A);},redrawAllCells:function(A){var B=this.node.closest('tr').closest('table');var C=B.rows[0].parentNode;Array.from(B.rows).forEach(function(r,ri){Array.from(r.cells).forEach(function(ce,ci){ce.parentNode.removeChild(ce);[m
[32m+[m[32mcn++;return;}for(var j=0;j<c.rowspan;j++){if(typeof(A[rn+j])=='undefined'){continue;}A[rn+j][cn]=c;for(var i=0;i<c.colspan;i++){A[rn+j][cn+i]=c;}}cn+=c.colspan;},this);rn++;},this);if(C){this.colWidths[0]=false;}return A;},mergeRight:function(){console.log("htmleditor.BlockTd mergeRight");[m
[32m+[m[32mvar tr=this.node.closest('tr');var i=Array.prototype.indexOf.call(tr.childNodes,this.node);if(i>=tr.childNodes.length-1){return;}var A=this.toTableArray();if(typeof(A[this.cellData.row][this.cellData.col+this.cellData.colspan])=='undefined'){return;}var rc=A[this.cellData.row][this.cellData.col+this.cellData.colspan];[m
[32m+[m[32mif(rc.rowspan!=this.cellData.rowspan||rc.row!=this.cellData.row){return;}this.node.innerHTML+=' '+rc.cell.innerHTML;tr.removeChild(rc.cell);this.colspan+=rc.colspan;this.node.setAttribute('colspan',this.colspan);var A=this.toTableArray();this.normalizeWidths(A);[m
[32m+[m[32mthis.updateWidths(A);},mergeBelow:function(){var A=this.toTableArray();if(typeof(A[this.cellData.row+this.cellData.rowspan])=='undefined'){return;}if(typeof(A[this.cellData.row+this.cellData.rowspan][this.cellData.col])=='undefined'){return;}var rc=A[this.cellData.row+this.cellData.rowspan][this.cellData.col];[m
[32m+[m[32mif(rc.colspan!=this.cellData.colspan||rc.col!=this.cellData.col){return;}this.node.innerHTML=this.node.innerHTML+rc.cell.innerHTML;rc.cell.parentNode.removeChild(rc.cell);this.rowspan+=rc.rowspan;this.node.setAttribute('rowspan',this.rowspan);},split:function(){if(this.node.rowSpan<2&&this.node.colSpan<2){return;[m
[32m+[m[32m}var A=this.toTableArray();var cd=this.cellData;this.rowspan=1;this.colspan=1;for(var r=cd.row;r<cd.row+cd.rowspan;r++){for(var c=cd.col;c<cd.col+cd.colspan;c++){if(r==cd.row&&c==cd.col){this.node.removeAttribute('rowspan');this.node.removeAttribute('colspan');[m
[32m+[m[32mcontinue;}var B=this.node.cloneNode();B.removeAttribute('id');B.innerHTML='';A[r][c]={cell:B,col:c,row:r,colspan:1,rowspan:1};}}this.redrawAllCells(A);},redrawAllCells:function(A){var B=this.node.closest('tr').closest('table');var C=B.rows[0].parentNode;Array.from(B.rows).forEach(function(r,ri){Array.from(r.cells).forEach(function(ce,ci){ce.parentNode.removeChild(ce);[m
 });r.parentNode.removeChild(r);});for(var r=0;r<A.length;r++){var re=B.rows[r];var re=B.ownerDocument.createElement('tr');C.appendChild(re);for(var c=0;c<A[r].length;c++){if(A[r][c].cell===false){continue;}re.appendChild(A[r][c].cell);A[r][c].cell=false;}[m
[31m-}},updateWidths:function(A){for(var r=0;r<A.length;r++){for(var c=0;c<A[r].length;c++){if(A[r][c].cell===false){continue;}if(this.colWidths[0]!=false&&A[r][c].colspan<2){var el=Roo.htmleditor.Block.factory(A[r][c].cell);el.width=Math.floor(this.colWidths[c])+'%';[m
[31m-el.updateElement(el.node);}A[r][c].cell=false;}}},normalizeWidths:function(A){if(this.colWidths[0]===false){var nw=100.0/this.colWidths.length;this.colWidths.forEach(function(w,i){this.colWidths[i]=nw;},this);return;}var t=0,B=[];this.colWidths.forEach(function(w,i){this.colWidths[i]=this.colWidths[i]==''?0:(this.colWidths[i]+'').replace(/[^0-9]+/g,'')*1;[m
[32m+[m[32m}},updateWidths:function(A){console.log("htmleditor.BlockTd updateWidths");console.log("TABLE");console.log(A);console.log("COLWIDTH");console.log(this.colWidths);for(var r=0;r<A.length;r++){for(var c=0;c<A[r].length;c++){if(A[r][c].cell===false){continue;[m
[32m+[m[32m}if(this.colWidths[0]!=false&&A[r][c].colspan<2){console.log("CELL");console.log(A[r][c].cell);var el=Roo.htmleditor.Block.factory(A[r][c].cell);el.width=Math.floor(this.colWidths[c])+'%';el.updateElement(el.node);}else{console.log("CELL COLSPAN");console.log(A[r][c]);[m
[32m+[m[32m}A[r][c].cell=false;}}},normalizeWidths:function(A){if(this.colWidths[0]===false){var nw=100.0/this.colWidths.length;this.colWidths.forEach(function(w,i){this.colWidths[i]=nw;},this);return;}var t=0,B=[];this.colWidths.forEach(function(w,i){this.colWidths[i]=this.colWidths[i]==''?0:(this.colWidths[i]+'').replace(/[^0-9]+/g,'')*1;[m
 var D=this.colWidths[i];if(D>0){t+=D;return;}B.push(i);},this);var nc=this.colWidths.length;if(B.length){var C=(nc-B.length)/(1.0*nc);var t=C*t;var ew=(100-t)/(1.0*B.length);this.colWidths.forEach(function(w,i){if(w>0){this.colWidths[i]=w*C;return;}this.colWidths[i]=ew;[m
 },this);}},shrinkColumn:function(){var A=this.toTableArray();this.normalizeWidths(A);var B=this.cellData.col;var nw=this.colWidths[B]*0.8;if(nw<5){return;}var C=(this.colWidths[B]*0.2)/(this.colWidths.length-1);this.colWidths.forEach(function(w,i){if(i==B){this.colWidths[i]=nw;[m
 return;}this.colWidths[i]+=C},this);this.updateWidths(A);},growColumn:function(){var A=this.toTableArray();this.normalizeWidths(A);var B=this.cellData.col;var nw=this.colWidths[B]*1.2;if(nw>90){return;}var C=(this.colWidths[B]*0.2)/(this.colWidths.length-1);[m
[1mdiff --git a/Roo/htmleditor/BlockTd.js b/Roo/htmleditor/BlockTd.js[m
[1mindex b6022caa76..71caa01101 100644[m
[1m--- a/Roo/htmleditor/BlockTd.js[m
[1m+++ b/Roo/htmleditor/BlockTd.js[m
[36m@@ -339,7 +339,6 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
      */[m
     toObject : function()[m
     {[m
[31m-        [m
         var ret = {[m
             tag : 'td',[m
             contenteditable : 'true', // this stops cell selection from picking the table.[m
[36m@@ -481,6 +480,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     [m
     mergeRight: function()[m
     {[m
[32m+[m[32m        console.log("htmleditor.BlockTd mergeRight");[m
          [m
         // get the contents of the next cell along..[m
         var tr = this.node.closest('tr');[m
[36m@@ -506,6 +506,9 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
         this.colspan += rc.colspan;[m
         this.node.setAttribute('colspan', this.colspan);[m
 [m
[32m+[m[32m        var table = this.toTableArray();[m
[32m+[m[32m        this.normalizeWidths(table);[m
[32m+[m[32m        this.updateWidths(table);[m
     },[m
     [m
     [m
[36m@@ -559,8 +562,9 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
             [m
         }[m
         this.redrawAllCells(table);[m
[31m-        [m
[31m-         [m
[32m+[m
[32m+[m[32m        var table = this.toTableArray();[m
[32m+[m[32m        this.updateWidths(table);[m
         [m
     },[m
     [m
[36m@@ -598,6 +602,11 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     },[m
     updateWidths : function(table)[m
     {[m
[32m+[m[32m        console.log("htmleditor.BlockTd updateWidths");[m
[32m+[m[32m        console.log("TABLE");[m
[32m+[m[32m        console.log(table);[m
[32m+[m[32m        console.log("COLWIDTH");[m
[32m+[m[32m        console.log(this.colWidths);[m
         for(var r = 0 ; r < table.length; r++) {[m
            [m
             for(var c = 0 ; c < table[r].length; c++) {[m
[36m@@ -606,10 +615,23 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
                 }[m
                 [m
                 if (this.colWidths[0] != false && table[r][c].colspan < 2) {[m
[32m+[m[32m                    console.log("CELL");[m
[32m+[m[32m                    console.log(table[r][c].cell);[m
                     var el = Roo.htmleditor.Block.factory(table[r][c].cell);[m
                     el.width = Math.floor(this.colWidths[c])  +'%';[m
                     el.updateElement(el.node);[m
                 }[m
[32m+[m[32m                else {[m
[32m+[m[32m                    console.log("CELL COLSPAN");[m
[32m+[m[32m                    console.log(table[r][c]);[m
[32m+[m[32m                    var el = Roo.htmleditor.Block.factory(table[r][c].cell);[m
[32m+[m[32m                    var width = 0;[m
[32m+[m[32m                    for(var i = 0; i < table[r][c].colspan; i ++) {[m
[32m+[m[32m                        width += Math.floor(this.colWidths[c + i]);[m
[32m+[m[32m                    }[m
[32m+[m[32m                    el.width = width  +'%';[m
[32m+[m[32m                    el.updateElement(el.node);[m
[32m+[m[32m                }[m
                 table[r][c].cell = false; // done[m
             }[m
         }[m
[1mdiff --git a/roojs-all.js b/roojs-all.js[m
[1mindex 39a3e49f52..90a18263b2 100644[m
[1m--- a/roojs-all.js[m
[1m+++ b/roojs-all.js[m
[36m@@ -2042,15 +2042,17 @@[m [mB().deleteColumn();E();A.editorcore.selectNode(t.node);A.editorcore.onEditorEven[m
 this.rowspan=Math.max(1,1*A.getAttribute('rowspan'));this.html=A.innerHTML;},emptyCell:function(){return {colspan:1,rowspan:1,textAlign:'left',html:"&nbsp;"};},removeNode:function(){return this.node.closest('table');},cellData:false,colWidths:false,toTableArray:function(){var A=[];[m
 var B=this.node.closest('tr').closest('table');Array.from(B.rows).forEach(function(r,ri){A[ri]=[];});var rn=0;this.colWidths=[];var C=true;Array.from(B.rows).forEach(function(r,ri){var cn=0;Array.from(r.cells).forEach(function(ce,ci){var c={cell:ce,row:rn,col:cn,colspan:ce.colSpan,rowspan:ce.rowSpan}[m
 ;if(ce.isEqualNode(this.node)){this.cellData=c;}if(typeof(A[rn][cn])!='undefined'){while(typeof(A[rn][cn])!='undefined'){cn++;}c.col=cn;}if(typeof(this.colWidths[cn])=='undefined'){this.colWidths[cn]=ce.style.width;if(this.colWidths[cn]!=''){C=false;}}if(c.colspan<2&&c.rowspan<2){A[rn][cn]=c;[m
[31m-cn++;return;}for(var j=0;j<c.rowspan;j++){if(typeof(A[rn+j])=='undefined'){continue;}A[rn+j][cn]=c;for(var i=0;i<c.colspan;i++){A[rn+j][cn+i]=c;}}cn+=c.colspan;},this);rn++;},this);if(C){this.colWidths[0]=false;}return A;},mergeRight:function(){var tr=this.node.closest('tr');[m
[31m-var i=Array.prototype.indexOf.call(tr.childNodes,this.node);if(i>=tr.childNodes.length-1){return;}var A=this.toTableArray();if(typeof(A[this.cellData.row][this.cellData.col+this.cellData.colspan])=='undefined'){return;}var rc=A[this.cellData.row][this.cellData.col+this.cellData.colspan];[m
[31m-if(rc.rowspan!=this.cellData.rowspan||rc.row!=this.cellData.row){return;}this.node.innerHTML+=' '+rc.cell.innerHTML;tr.removeChild(rc.cell);this.colspan+=rc.colspan;this.node.setAttribute('colspan',this.colspan);},mergeBelow:function(){var A=this.toTableArray();[m
[31m-if(typeof(A[this.cellData.row+this.cellData.rowspan])=='undefined'){return;}if(typeof(A[this.cellData.row+this.cellData.rowspan][this.cellData.col])=='undefined'){return;}var rc=A[this.cellData.row+this.cellData.rowspan][this.cellData.col];if(rc.colspan!=this.cellData.colspan||rc.col!=this.cellData.col){return;[m
[31m-}this.node.innerHTML=this.node.innerHTML+rc.cell.innerHTML;rc.cell.parentNode.removeChild(rc.cell);this.rowspan+=rc.rowspan;this.node.setAttribute('rowspan',this.rowspan);},split:function(){if(this.node.rowSpan<2&&this.node.colSpan<2){return;}var A=this.toTableArray();[m
[31m-var cd=this.cellData;this.rowspan=1;this.colspan=1;for(var r=cd.row;r<cd.row+cd.rowspan;r++){for(var c=cd.col;c<cd.col+cd.colspan;c++){if(r==cd.row&&c==cd.col){this.node.removeAttribute('rowspan');this.node.removeAttribute('colspan');continue;}var B=this.node.cloneNode();[m
[31m-B.removeAttribute('id');B.innerHTML='';A[r][c]={cell:B,col:c,row:r,colspan:1,rowspan:1};}}this.redrawAllCells(A);},redrawAllCells:function(A){var B=this.node.closest('tr').closest('table');var C=B.rows[0].parentNode;Array.from(B.rows).forEach(function(r,ri){Array.from(r.cells).forEach(function(ce,ci){ce.parentNode.removeChild(ce);[m
[31m-});r.parentNode.removeChild(r);});for(var r=0;r<A.length;r++){var re=B.rows[r];var re=B.ownerDocument.createElement('tr');C.appendChild(re);for(var c=0;c<A[r].length;c++){if(A[r][c].cell===false){continue;}re.appendChild(A[r][c].cell);A[r][c].cell=false;}[m
[31m-}},updateWidths:function(A){for(var r=0;r<A.length;r++){for(var c=0;c<A[r].length;c++){if(A[r][c].cell===false){continue;}if(this.colWidths[0]!=false&&A[r][c].colspan<2){var el=Roo.htmleditor.Block.factory(A[r][c].cell);el.width=Math.floor(this.colWidths[c])+'%';[m
[32m+[m[32mcn++;return;}for(var j=0;j<c.rowspan;j++){if(typeof(A[rn+j])=='undefined'){continue;}A[rn+j][cn]=c;for(var i=0;i<c.colspan;i++){A[rn+j][cn+i]=c;}}cn+=c.colspan;},this);rn++;},this);if(C){this.colWidths[0]=false;}return A;},mergeRight:function(){console.log("htmleditor.BlockTd mergeRight");[m
[32m+[m[32mvar tr=this.node.closest('tr');var i=Array.prototype.indexOf.call(tr.childNodes,this.node);if(i>=tr.childNodes.length-1){return;}var A=this.toTableArray();if(typeof(A[this.cellData.row][this.cellData.col+this.cellData.colspan])=='undefined'){return;}var rc=A[this.cellData.row][this.cellData.col+this.cellData.colspan];[m
[32m+[m[32mif(rc.rowspan!=this.cellData.rowspan||rc.row!=this.cellData.row){return;}this.node.innerHTML+=' '+rc.cell.innerHTML;tr.removeChild(rc.cell);this.colspan+=rc.colspan;this.node.setAttribute('colspan',this.colspan);var A=this.toTableArray();this.normalizeWidths(A);[m
[32m+[m[32mthis.updateWidths(A);},mergeBelow:function(){var A=this.toTableArray();if(typeof(A[this.cellData.row+this.cellData.rowspan])=='undefined'){return;}if(typeof(A[this.cellData.row+this.cellData.rowspan][this.cellData.col])=='undefined'){return;}var rc=A[this.cellData.row+this.cellData.rowspan][this.cellData.col];[m
[32m+[m[32mif(rc.colspan!=this.cellData.colspan||rc.col!=this.cellData.col){return;}this.node.innerHTML=this.node.innerHTML+rc.cell.innerHTML;rc.cell.parentNode.removeChild(rc.cell);this.rowspan+=rc.rowspan;this.node.setAttribute('rowspan',this.rowspan);},split:function(){if(this.node.rowSpan<2&&this.node.colSpan<2){return;[m
[32m+[m[32m}var A=this.toTableArray();var cd=this.cellData;this.rowspan=1;this.colspan=1;for(var r=cd.row;r<cd.row+cd.rowspan;r++){for(var c=cd.col;c<cd.col+cd.colspan;c++){if(r==cd.row&&c==cd.col){this.node.removeAttribute('rowspan');this.node.removeAttribute('colspan');[m
[32m+[m[32mcontinue;}var B=this.node.cloneNode();B.removeAttribute('id');B.innerHTML='';A[r][c]={cell:B,col:c,row:r,colspan:1,rowspan:1};}}this.redrawAllCells(A);var A=this.toTableArray();this.updateWidths(A);},redrawAllCells:function(A){var B=this.node.closest('tr').closest('table');[m
[32m+[m[32mvar C=B.rows[0].parentNode;Array.from(B.rows).forEach(function(r,ri){Array.from(r.cells).forEach(function(ce,ci){ce.parentNode.removeChild(ce);});r.parentNode.removeChild(r);});for(var r=0;r<A.length;r++){var re=B.rows[r];var re=B.ownerDocument.createElement('tr');[m
[32m+[m[32mC.appendChild(re);for(var c=0;c<A[r].length;c++){if(A[r][c].cell===false){continue;}re.appendChild(A[r][c].cell);A[r][c].cell=false;}}},updateWidths:function(A){console.log("htmleditor.BlockTd updateWidths");console.log("TABLE");console.log(A);console.log("COLWIDTH");[m
[32m+[m[32mconsole.log(this.colWidths);for(var r=0;r<A.length;r++){for(var c=0;c<A[r].length;c++){if(A[r][c].cell===false){continue;}if(this.colWidths[0]!=false&&A[r][c].colspan<2){console.log("CELL");console.log(A[r][c].cell);var el=Roo.htmleditor.Block.factory(A[r][c].cell);[m
[32m+[m[32mel.width=Math.floor(this.colWidths[c])+'%';el.updateElement(el.node);}else{console.log("CELL COLSPAN");console.log(A[r][c]);var el=Roo.htmleditor.Block.factory(A[r][c].cell);var B=0;for(var i=0;i<A[r][c].colspan;i++){B+=Math.floor(this.colWidths[c+i]);}el.width=B+'%';[m
 el.updateElement(el.node);}A[r][c].cell=false;}}},normalizeWidths:function(A){if(this.colWidths[0]===false){var nw=100.0/this.colWidths.length;this.colWidths.forEach(function(w,i){this.colWidths[i]=nw;},this);return;}var t=0,B=[];this.colWidths.forEach(function(w,i){this.colWidths[i]=this.colWidths[i]==''?0:(this.colWidths[i]+'').replace(/[^0-9]+/g,'')*1;[m
 var D=this.colWidths[i];if(D>0){t+=D;return;}B.push(i);},this);var nc=this.colWidths.length;if(B.length){var C=(nc-B.length)/(1.0*nc);var t=C*t;var ew=(100-t)/(1.0*B.length);this.colWidths.forEach(function(w,i){if(w>0){this.colWidths[i]=w*C;return;}this.colWidths[i]=ew;[m
 },this);}},shrinkColumn:function(){var A=this.toTableArray();this.normalizeWidths(A);var B=this.cellData.col;var nw=this.colWidths[B]*0.8;if(nw<5){return;}var C=(this.colWidths[B]*0.2)/(this.colWidths.length-1);this.colWidths.forEach(function(w,i){if(i==B){this.colWidths[i]=nw;[m
[1mdiff --git a/roojs-debug.js b/roojs-debug.js[m
[1mindex 779fa0189f..ace5837bba 100644[m
[1m--- a/roojs-debug.js[m
[1m+++ b/roojs-debug.js[m
[36m@@ -49276,7 +49276,6 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
      */[m
     toObject : function()[m
     {[m
[31m-        [m
         var ret = {[m
             tag : 'td',[m
             contenteditable : 'true', // this stops cell selection from picking the table.[m
[36m@@ -49418,6 +49417,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     [m
     mergeRight: function()[m
     {[m
[32m+[m[32m        console.log("htmleditor.BlockTd mergeRight");[m
          [m
         // get the contents of the next cell along..[m
         var tr = this.node.closest('tr');[m
[36m@@ -49443,6 +49443,9 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
         this.colspan += rc.colspan;[m
         this.node.setAttribute('colspan', this.colspan);[m
 [m
[32m+[m[32m        var table = this.toTableArray();[m
[32m+[m[32m        this.normalizeWidths(table);[m
[32m+[m[32m        this.updateWidths(table);[m
     },[m
     [m
     [m
[36m@@ -49496,8 +49499,9 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
             [m
         }[m
         this.redrawAllCells(table);[m
[31m-        [m
[31m-         [m
[32m+[m
[32m+[m[32m        var table = this.toTableArray();[m
[32m+[m[32m        this.updateWidths(table);[m
         [m
     },[m
     [m
[36m@@ -49535,6 +49539,11 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     },[m
     updateWidths : function(table)[m
     {[m
[32m+[m[32m        console.log("htmleditor.BlockTd updateWidths");[m
[32m+[m[32m        console.log("TABLE");[m
[32m+[m[32m        console.log(table);[m
[32m+[m[32m        console.log("COLWIDTH");[m
[32m+[m[32m        console.log(this.colWidths);[m
         for(var r = 0 ; r < table.length; r++) {[m
            [m
             for(var c = 0 ; c < table[r].length; c++) {[m
[36m@@ -49543,10 +49552,23 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
                 }[m
                 [m
                 if (this.colWidths[0] != false && table[r][c].colspan < 2) {[m
[32m+[m[32m                    console.log("CELL");[m
[32m+[m[32m                    console.log(table[r][c].cell);[m
                     var el = Roo.htmleditor.Block.factory(table[r][c].cell);[m
                     el.width = Math.floor(this.colWidths[c])  +'%';[m
                     el.updateElement(el.node);[m
                 }[m
[32m+[m[32m                else {[m
[32m+[m[32m                    console.log("CELL COLSPAN");[m
[32m+[m[32m                    console.log(table[r][c]);[m
[32m+[m[32m                    var el = Roo.htmleditor.Block.factory(table[r][c].cell);[m
[32m+[m[32m                    var width = 0;[m
[32m+[m[32m                    for(var i = 0; i < table[r][c].colspan; i ++) {[m
[32m+[m[32m                        width += Math.floor(this.colWidths[c + i]);[m
[32m+[m[32m                    }[m
[32m+[m[32m                    el.width = width  +'%';[m
[32m+[m[32m                    el.updateElement(el.node);[m
[32m+[m[32m                }[m
                 table[r][c].cell = false; // done[m
             }[m
         }[m
[1mdiff --git a/roojs-ui-debug.js b/roojs-ui-debug.js[m
[1mindex 6623fbfdb0..e1139418df 100644[m
[1m--- a/roojs-ui-debug.js[m
[1m+++ b/roojs-ui-debug.js[m
[36m@@ -24784,7 +24784,6 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
      */[m
     toObject : function()[m
     {[m
[31m-        [m
         var ret = {[m
             tag : 'td',[m
             contenteditable : 'true', // this stops cell selection from picking the table.[m
[36m@@ -24926,6 +24925,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     [m
     mergeRight: function()[m
     {[m
[32m+[m[32m        console.log("htmleditor.BlockTd mergeRight");[m
          [m
         // get the contents of the next cell along..[m
         var tr = this.node.closest('tr');[m
[36m@@ -24951,6 +24951,9 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
         this.colspan += rc.colspan;[m
         this.node.setAttribute('colspan', this.colspan);[m
 [m
[32m+[m[32m        var table = this.toTableArray();[m
[32m+[m[32m        this.normalizeWidths(table);[m
[32m+[m[32m        this.updateWidths(table);[m
     },[m
     [m
     [m
[36m@@ -25004,8 +25007,9 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
             [m
         }[m
         this.redrawAllCells(table);[m
[31m-        [m
[31m-         [m
[32m+[m
[32m+[m[32m        var table = this.toTableArray();[m
[32m+[m[32m        this.updateWidths(table);[m
         [m
     },[m
     [m
[36m@@ -25043,6 +25047,11 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     },[m
     updateWidths : function(table)[m
     {[m
[32m+[m[32m        console.log("htmleditor.BlockTd updateWidths");[m
[32m+[m[32m        console.log("TABLE");[m
[32m+[m[32m        console.log(table);[m
[32m+[m[32m        console.log("COLWIDTH");[m
[32m+[m[32m        console.log(this.colWidths);[m
         for(var r = 0 ; r < table.length; r++) {[m
            [m
             for(var c = 0 ; c < table[r].length; c++) {[m
[36m@@ -25051,10 +25060,23 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
                 }[m
                 [m
                 if (this.colWidths[0] != false && table[r][c].colspan < 2) {[m
[32m+[m[32m                    console.log("CELL");[m
[32m+[m[32m                    console.log(table[r][c].cell);[m
                     var el = Roo.htmleditor.Block.factory(table[r][c].cell);[m
                     el.width = Math.floor(this.colWidths[c])  +'%';[m
                     el.updateElement(el.node);[m
                 }[m
[32m+[m[32m                else {[m
[32m+[m[32m                    console.log("CELL COLSPAN");[m
[32m+[m[32m                    console.log(table[r][c]);[m
[32m+[m[32m                    var el = Roo.htmleditor.Block.factory(table[r][c].cell);[m
[32m+[m[32m                    var width = 0;[m
[32m+[m[32m                    for(var i = 0; i < table[r][c].colspan; i ++) {[m
[32m+[m[32m                        width += Math.floor(this.colWidths[c + i]);[m
[32m+[m[32m                    }[m
[32m+[m[32m                    el.width = width  +'%';[m
[32m+[m[32m                    el.updateElement(el.node);[m
[32m+[m[32m                }[m
                 table[r][c].cell = false; // done[m
             }[m
         }[m
[1mdiff --git a/roojs-ui.js b/roojs-ui.js[m
[1mindex 40ce72d195..cf42c68aaa 100644[m
[1m--- a/roojs-ui.js[m
[1m+++ b/roojs-ui.js[m
[36m@@ -1096,15 +1096,17 @@[m [mB().deleteColumn();E();A.editorcore.selectNode(t.node);A.editorcore.onEditorEven[m
 this.rowspan=Math.max(1,1*A.getAttribute('rowspan'));this.html=A.innerHTML;},emptyCell:function(){return {colspan:1,rowspan:1,textAlign:'left',html:"&nbsp;"};},removeNode:function(){return this.node.closest('table');},cellData:false,colWidths:false,toTableArray:function(){var A=[];[m
 var B=this.node.closest('tr').closest('table');Array.from(B.rows).forEach(function(r,ri){A[ri]=[];});var rn=0;this.colWidths=[];var C=true;Array.from(B.rows).forEach(function(r,ri){var cn=0;Array.from(r.cells).forEach(function(ce,ci){var c={cell:ce,row:rn,col:cn,colspan:ce.colSpan,rowspan:ce.rowSpan}[m
 ;if(ce.isEqualNode(this.node)){this.cellData=c;}if(typeof(A[rn][cn])!='undefined'){while(typeof(A[rn][cn])!='undefined'){cn++;}c.col=cn;}if(typeof(this.colWidths[cn])=='undefined'){this.colWidths[cn]=ce.style.width;if(this.colWidths[cn]!=''){C=false;}}if(c.colspan<2&&c.rowspan<2){A[rn][cn]=c;[m
[31m-cn++;return;}for(var j=0;j<c.rowspan;j++){if(typeof(A[rn+j])=='undefined'){continue;}A[rn+j][cn]=c;for(var i=0;i<c.colspan;i++){A[rn+j][cn+i]=c;}}cn+=c.colspan;},this);rn++;},this);if(C){this.colWidths[0]=false;}return A;},mergeRight:function(){var tr=this.node.closest('tr');[m
[31m-var i=Array.prototype.indexOf.call(tr.childNodes,this.node);if(i>=tr.childNodes.length-1){return;}var A=this.toTableArray();if(typeof(A[this.cellData.row][this.cellData.col+this.cellData.colspan])=='undefined'){return;}var rc=A[this.cellData.row][this.cellData.col+this.cellData.colspan];[m
[31m-if(rc.rowspan!=this.cellData.rowspan||rc.row!=this.cellData.row){return;}this.node.innerHTML+=' '+rc.cell.innerHTML;tr.removeChild(rc.cell);this.colspan+=rc.colspan;this.node.setAttribute('colspan',this.colspan);},mergeBelow:function(){var A=this.toTableArray();[m
[31m-if(typeof(A[this.cellData.row+this.cellData.rowspan])=='undefined'){return;}if(typeof(A[this.cellData.row+this.cellData.rowspan][this.cellData.col])=='undefined'){return;}var rc=A[this.cellData.row+this.cellData.rowspan][this.cellData.col];if(rc.colspan!=this.cellData.colspan||rc.col!=this.cellData.col){return;[m
[31m-}this.node.innerHTML=this.node.innerHTML+rc.cell.innerHTML;rc.cell.parentNode.removeChild(rc.cell);this.rowspan+=rc.rowspan;this.node.setAttribute('rowspan',this.rowspan);},split:function(){if(this.node.rowSpan<2&&this.node.colSpan<2){return;}var A=this.toTableArray();[m
[31m-var cd=this.cellData;this.rowspan=1;this.colspan=1;for(var r=cd.row;r<cd.row+cd.rowspan;r++){for(var c=cd.col;c<cd.col+cd.colspan;c++){if(r==cd.row&&c==cd.col){this.node.removeAttribute('rowspan');this.node.removeAttribute('colspan');continue;}var B=this.node.cloneNode();[m
[31m-B.removeAttribute('id');B.innerHTML='';A[r][c]={cell:B,col:c,row:r,colspan:1,rowspan:1};}}this.redrawAllCells(A);},redrawAllCells:function(A){var B=this.node.closest('tr').closest('table');var C=B.rows[0].parentNode;Array.from(B.rows).forEach(function(r,ri){Array.from(r.cells).forEach(function(ce,ci){ce.parentNode.removeChild(ce);[m
[31m-});r.parentNode.removeChild(r);});for(var r=0;r<A.length;r++){var re=B.rows[r];var re=B.ownerDocument.createElement('tr');C.appendChild(re);for(var c=0;c<A[r].length;c++){if(A[r][c].cell===false){continue;}re.appendChild(A[r][c].cell);A[r][c].cell=false;}[m
[31m-}},updateWidths:function(A){for(var r=0;r<A.length;r++){for(var c=0;c<A[r].length;c++){if(A[r][c].cell===false){continue;}if(this.colWidths[0]!=false&&A[r][c].colspan<2){var el=Roo.htmleditor.Block.factory(A[r][c].cell);el.width=Math.floor(this.colWidths[c])+'%';[m
[32m+[m[32mcn++;return;}for(var j=0;j<c.rowspan;j++){if(typeof(A[rn+j])=='undefined'){continue;}A[rn+j][cn]=c;for(var i=0;i<c.colspan;i++){A[rn+j][cn+i]=c;}}cn+=c.colspan;},this);rn++;},this);if(C){this.colWidths[0]=false;}return A;},mergeRight:function(){console.log("htmleditor.BlockTd mergeRight");[m
[32m+[m[32mvar tr=this.node.closest('tr');var i=Array.prototype.indexOf.call(tr.childNodes,this.node);if(i>=tr.childNodes.length-1){return;}var A=this.toTableArray();if(typeof(A[this.cellData.row][this.cellData.col+this.cellData.colspan])=='undefined'){return;}var rc=A[this.cellData.row][this.cellData.col+this.cellData.colspan];[m
[32m+[m[32mif(rc.rowspan!=this.cellData.rowspan||rc.row!=this.cellData.row){return;}this.node.innerHTML+=' '+rc.cell.innerHTML;tr.removeChild(rc.cell);this.colspan+=rc.colspan;this.node.setAttribute('colspan',this.colspan);var A=this.toTableArray();this.normalizeWidths(A);[m
[32m+[m[32mthis.updateWidths(A);},mergeBelow:function(){var A=this.toTableArray();if(typeof(A[this.cellData.row+this.cellData.rowspan])=='undefined'){return;}if(typeof(A[this.cellData.row+this.cellData.rowspan][this.cellData.col])=='undefined'){return;}var rc=A[this.cellData.row+this.cellData.rowspan][this.cellData.col];[m
[32m+[m[32mif(rc.colspan!=this.cellData.colspan||rc.col!=this.cellData.col){return;}this.node.innerHTML=this.node.innerHTML+rc.cell.innerHTML;rc.cell.parentNode.removeChild(rc.cell);this.rowspan+=rc.rowspan;this.node.setAttribute('rowspan',this.rowspan);},split:function(){if(this.node.rowSpan<2&&this.node.colSpan<2){return;[m
[32m+[m[32m}var A=this.toTableArray();var cd=this.cellData;this.rowspan=1;this.colspan=1;for(var r=cd.row;r<cd.row+cd.rowspan;r++){for(var c=cd.col;c<cd.col+cd.colspan;c++){if(r==cd.row&&c==cd.col){this.node.removeAttribute('rowspan');this.node.removeAttribute('colspan');[m
[32m+[m[32mcontinue;}var B=this.node.cloneNode();B.removeAttribute('id');B.innerHTML='';A[r][c]={cell:B,col:c,row:r,colspan:1,rowspan:1};}}this.redrawAllCells(A);var A=this.toTableArray();this.updateWidths(A);},redrawAllCells:function(A){var B=this.node.closest('tr').closest('table');[m
[32m+[m[32mvar C=B.rows[0].parentNode;Array.from(B.rows).forEach(function(r,ri){Array.from(r.cells).forEach(function(ce,ci){ce.parentNode.removeChild(ce);});r.parentNode.removeChild(r);});for(var r=0;r<A.length;r++){var re=B.rows[r];var re=B.ownerDocument.createElement('tr');[m
[32m+[m[32mC.appendChild(re);for(var c=0;c<A[r].length;c++){if(A[r][c].cell===false){continue;}re.appendChild(A[r][c].cell);A[r][c].cell=false;}}},updateWidths:function(A){console.log("htmleditor.BlockTd updateWidths");console.log("TABLE");console.log(A);console.log("COLWIDTH");[m
[32m+[m[32mconsole.log(this.colWidths);for(var r=0;r<A.length;r++){for(var c=0;c<A[r].length;c++){if(A[r][c].cell===false){continue;}if(this.colWidths[0]!=false&&A[r][c].colspan<2){console.log("CELL");console.log(A[r][c].cell);var el=Roo.htmleditor.Block.factory(A[r][c].cell);[m
[32m+[m[32mel.width=Math.floor(this.colWidths[c])+'%';el.updateElement(el.node);}else{console.log("CELL COLSPAN");console.log(A[r][c]);var el=Roo.htmleditor.Block.factory(A[r][c].cell);var B=0;for(var i=0;i<A[r][c].colspan;i++){B+=Math.floor(this.colWidths[c+i]);}el.width=B+'%';[m
 el.updateElement(el.node);}A[r][c].cell=false;}}},normalizeWidths:function(A){if(this.colWidths[0]===false){var nw=100.0/this.colWidths.length;this.colWidths.forEach(function(w,i){this.colWidths[i]=nw;},this);return;}var t=0,B=[];this.colWidths.forEach(function(w,i){this.colWidths[i]=this.colWidths[i]==''?0:(this.colWidths[i]+'').replace(/[^0-9]+/g,'')*1;[m
 var D=this.colWidths[i];if(D>0){t+=D;return;}B.push(i);},this);var nc=this.colWidths.length;if(B.length){var C=(nc-B.length)/(1.0*nc);var t=C*t;var ew=(100-t)/(1.0*B.length);this.colWidths.forEach(function(w,i){if(w>0){this.colWidths[i]=w*C;return;}this.colWidths[i]=ew;[m
 },this);}},shrinkColumn:function(){var A=this.toTableArray();this.normalizeWidths(A);var B=this.cellData.col;var nw=this.colWidths[B]*0.8;if(nw<5){return;}var C=(this.colWidths[B]*0.2)/(this.colWidths.length-1);this.colWidths.forEach(function(w,i){if(i==B){this.colWidths[i]=nw;[m
[1mdiff --git a/Roo/htmleditor/BlockTd.js b/Roo/htmleditor/BlockTd.js[m
[1mindex b6022caa76..d86513f7ed 100644[m
[1m--- a/Roo/htmleditor/BlockTd.js[m
[1m+++ b/Roo/htmleditor/BlockTd.js[m
[36m@@ -28,6 +28,8 @@[m
 [m
 Roo.htmleditor.BlockTd = function(cfg)[m
 {[m
[32m+[m[32m    console.log("htmleditor.BlockTd constructor");[m
[32m+[m[32m    console.log(cfg.node);[m
     if (cfg.node) {[m
         this.readElement(cfg.node);[m
         this.updateElement(cfg.node);[m
[36m@@ -57,6 +59,8 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     [m
     contextMenu : function(toolbar)[m
     {[m
[32m+[m[32m        console.log("htmleditor.BlodTd contextMenu");[m
[32m+[m[32m        console.log(this.node);[m
         [m
         var cell = function() {[m
             return Roo.htmleditor.Block.factory(toolbar.tb.selectedNode);[m
[36m@@ -339,7 +343,6 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
      */[m
     toObject : function()[m
     {[m
[31m-        [m
         var ret = {[m
             tag : 'td',[m
             contenteditable : 'true', // this stops cell selection from picking the table.[m
[36m@@ -407,18 +410,18 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     [m
     toTableArray  : function()[m
     {[m
[32m+[m[32m        console.log("htmleditor.BlockTd toTableArray ");[m
         var ret = [];[m
         var tab = this.node.closest('tr').closest('table');[m
         Array.from(tab.rows).forEach(function(r, ri){[m
             ret[ri] = [];[m
         });[m
         var rn = 0;[m
[31m-        this.colWidths = [];[m
[31m-        var all_auto = true;[m
         Array.from(tab.rows).forEach(function(r, ri){[m
             [m
             var cn = 0;[m
             Array.from(r.cells).forEach(function(ce, ci){[m
[32m+[m
                 var c =  {[m
                     cell : ce,[m
                     row : rn,[m
[36m@@ -437,14 +440,6 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
                     c.col = cn;[m
                 }[m
                 [m
[31m-                if (typeof(this.colWidths[cn]) == 'undefined') {[m
[31m-                    this.colWidths[cn] =   ce.style.width;[m
[31m-                    if (this.colWidths[cn] != '') {[m
[31m-                        all_auto = false;[m
[31m-                    }[m
[31m-                }[m
[31m-                [m
[31m-                [m
                 if (c.colspan < 2 && c.rowspan < 2 ) {[m
                     ret[rn][cn] = c;[m
                     cn++;[m
[36m@@ -465,15 +460,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
             rn++;[m
         }, this);[m
         [m
[31m-        // initalize widths.?[m
[31m-        // either all widths or no widths..[m
[31m-        if (all_auto) {[m
[31m-            this.colWidths[0] = false; // no widths flag.[m
[31m-        }[m
[31m-        [m
[31m-        [m
         return ret;[m
[31m-        [m
     },[m
     [m
     [m
[36m@@ -481,6 +468,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     [m
     mergeRight: function()[m
     {[m
[32m+[m[32m        console.log("htmleditor.BlockTd mergeRight");[m
          [m
         // get the contents of the next cell along..[m
         var tr = this.node.closest('tr');[m
[36m@@ -489,6 +477,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
             return; // no cells on right to merge with.[m
         }[m
         var table = this.toTableArray();[m
[32m+[m[32m        console.log(table);[m
         [m
         if (typeof(table[this.cellData.row][this.cellData.col+this.cellData.colspan]) == 'undefined') {[m
             return; // nothing right?[m
[36m@@ -506,6 +495,11 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
         this.colspan += rc.colspan;[m
         this.node.setAttribute('colspan', this.colspan);[m
 [m
[32m+[m[32m        var table = this.toTableArray();[m
[32m+[m[32m        console.log(table);[m
[32m+[m[32m        this.normalizeWidths(table);[m
[32m+[m[32m        console.log(this.colWidths);[m
[32m+[m[32m        // this.updateWidths(table);[m
     },[m
     [m
     [m
[36m@@ -560,8 +554,6 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
         }[m
         this.redrawAllCells(table);[m
         [m
[31m-         [m
[31m-        [m
     },[m
     [m
     [m
[36m@@ -610,13 +602,23 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
                     el.width = Math.floor(this.colWidths[c])  +'%';[m
                     el.updateElement(el.node);[m
                 }[m
[32m+[m[32m                // else {[m
[32m+[m[32m                //     var el = Roo.htmleditor.Block.factory(table[r][c].cell);[m
[32m+[m[32m                //     var width = 0;[m
[32m+[m[32m                //     for(var i = 0; i < table[r][c].colspan; i ++) {[m
[32m+[m[32m                //         width += Math.floor(this.colWidths[c + i]);[m
[32m+[m[32m                //     }[m
[32m+[m[32m                //     el.width = width  +'%';[m
[32m+[m[32m                //     el.updateElement(el.node);[m
[32m+[m[32m                // }[m
                 table[r][c].cell = false; // done[m
             }[m
         }[m
     },[m
     normalizeWidths : function(table)[m
     {[m
[31m-    [m
[32m+[m[32m        console.log("htmleditor.BlockTd normalizeWidths");[m
[32m+[m[32m        console.log(this.colWidths);[m
         if (this.colWidths[0] === false) {[m
             var nw = 100.0 / this.colWidths.length;[m
             this.colWidths.forEach(function(w,i) {[m
[36m@@ -663,7 +665,9 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     shrinkColumn : function()[m
     {[m
         var table = this.toTableArray();[m
[32m+[m[32m        console.log(table);[m
         this.normalizeWidths(table);[m
[32m+[m[32m        console.log(this.colWidths);[m
         var col = this.cellData.col;[m
         var nw = this.colWidths[col] * 0.8;[m
         if (nw < 5) {[m
[1mdiff --git a/roojs-all.js b/roojs-all.js[m
[1mindex 39a3e49f52..e11d4edeff 100644[m
[1m--- a/roojs-all.js[m
[1m+++ b/roojs-all.js[m
[36m@@ -2027,37 +2027,40 @@[m [mreturn;}for(var i=0;i<c.colspan;i++){B.push(c);}});return B;},deleteColumn:funct[m
 this.updateElement();},emptyCell:function(){return (new Roo.htmleditor.BlockTd({})).toObject();},removeNode:function(){return this.node;},resetWidths:function(){Array.from(this.node.getElementsByTagName('td')).forEach(function(n){var nn=Roo.htmleditor.Block.factory(n);[m
 nn.width='';nn.updateElement(n);});}})[m
 // Roo/htmleditor/BlockTd.js[m
[31m-Roo.htmleditor.BlockTd=function(A){if(A.node){this.readElement(A.node);this.updateElement(A.node);}Roo.apply(this,A);};Roo.extend(Roo.htmleditor.BlockTd,Roo.htmleditor.Block,{node:false,width:'',textAlign:'left',valign:'top',colspan:1,rowspan:1,friendly_name:'Table Cell',deleteTitle:false,contextMenu:function(A){var B=function(){return Roo.htmleditor.Block.factory(A.tb.selectedNode);[m
[31m-};var C=function(){return Roo.htmleditor.Block.factory(A.tb.selectedNode.closest('table'));};var lr=false;var D=function(){lr=A.editorcore.getSelection().getRangeAt(0);};var restoreSel=function(){if(lr){(function(){A.editorcore.focus();var cr=A.editorcore.getSelection();[m
[31m-cr.removeAllRanges();cr.addRange(lr);A.editorcore.onEditorEvent();}).defer(10,this);}};var rooui=typeof(Roo.bootstrap)=='undefined'?Roo:Roo.bootstrap;var E=A.editorcore.syncValue;var F={};return [{xtype:'Button',text:'Edit Table',listeners:{click:function(){var t=A.tb.selectedNode.closest('table');[m
[31m-A.editorcore.selectNode(t);A.editorcore.onEditorEvent();}}},{xtype:'TextItem',text:"Column Width: ",xns:rooui.Toolbar},{xtype:'Button',text:'-',listeners:{click:function(G,e){A.editorcore.selectNode(A.tb.selectedNode);B().shrinkColumn();E();A.editorcore.onEditorEvent();[m
[31m-}},xns:rooui.Toolbar},{xtype:'Button',text:'+',listeners:{click:function(G,e){A.editorcore.selectNode(A.tb.selectedNode);B().growColumn();E();A.editorcore.onEditorEvent();}},xns:rooui.Toolbar},{xtype:'TextItem',text:"Vertical Align: ",xns:rooui.Toolbar},{xtype:'ComboBox',allowBlank:false,displayField:'val',editable:true,listWidth:100,triggerAction:'all',typeAhead:true,valueField:'val',width:100,name:'valign',listeners:{select:function(G,r,H){A.editorcore.selectNode(A.tb.selectedNode);[m
[31m-var b=B();b.valign=r.get('val');b.updateElement();E();A.editorcore.onEditorEvent();}},xns:rooui.form,store:{xtype:'SimpleStore',data:[['top'],['middle'],['bottom']],fields:['val'],xns:Roo.data}},{xtype:'TextItem',text:"Merge Cells: ",xns:rooui.Toolbar},{xtype:'Button',text:'Right',listeners:{click:function(G,e){A.editorcore.selectNode(A.tb.selectedNode);[m
[32m+[m[32mRoo.htmleditor.BlockTd=function(A){console.log("htmleditor.BlockTd constructor");console.log(A.node);if(A.node){this.readElement(A.node);this.updateElement(A.node);}Roo.apply(this,A);};Roo.extend(Roo.htmleditor.BlockTd,Roo.htmleditor.Block,{node:false,width:'',textAlign:'left',valign:'top',colspan:1,rowspan:1,friendly_name:'Table Cell',deleteTitle:false,contextMenu:function(A){console.log("htmleditor.BlodTd contextMenu");[m
[32m+[m[32mconsole.log(this.node);var B=function(){return Roo.htmleditor.Block.factory(A.tb.selectedNode);};var C=function(){return Roo.htmleditor.Block.factory(A.tb.selectedNode.closest('table'));};var lr=false;var D=function(){lr=A.editorcore.getSelection().getRangeAt(0);[m
[32m+[m[32m};var restoreSel=function(){if(lr){(function(){A.editorcore.focus();var cr=A.editorcore.getSelection();cr.removeAllRanges();cr.addRange(lr);A.editorcore.onEditorEvent();}).defer(10,this);}};var rooui=typeof(Roo.bootstrap)=='undefined'?Roo:Roo.bootstrap;var E=A.editorcore.syncValue;[m
[32m+[m[32mvar F={};return [{xtype:'Button',text:'Edit Table',listeners:{click:function(){var t=A.tb.selectedNode.closest('table');A.editorcore.selectNode(t);A.editorcore.onEditorEvent();}}},{xtype:'TextItem',text:"Column Width: ",xns:rooui.Toolbar},{xtype:'Button',text:'-',listeners:{click:function(G,e){A.editorcore.selectNode(A.tb.selectedNode);[m
[32m+[m[32mB().shrinkColumn();E();A.editorcore.onEditorEvent();}},xns:rooui.Toolbar},{xtype:'Button',text:'+',listeners:{click:function(G,e){A.editorcore.selectNode(A.tb.selectedNode);B().growColumn();E();A.editorcore.onEditorEvent();}},xns:rooui.Toolbar},{xtype:'TextItem',text:"Vertical Align: ",xns:rooui.Toolbar}[m
[32m+[m[32m,{xtype:'ComboBox',allowBlank:false,displayField:'val',editable:true,listWidth:100,triggerAction:'all',typeAhead:true,valueField:'val',width:100,name:'valign',listeners:{select:function(G,r,H){A.editorcore.selectNode(A.tb.selectedNode);var b=B();b.valign=r.get('val');[m
[32m+[m[32mb.updateElement();E();A.editorcore.onEditorEvent();}},xns:rooui.form,store:{xtype:'SimpleStore',data:[['top'],['middle'],['bottom']],fields:['val'],xns:Roo.data}},{xtype:'TextItem',text:"Merge Cells: ",xns:rooui.Toolbar},{xtype:'Button',text:'Right',listeners:{click:function(G,e){A.editorcore.selectNode(A.tb.selectedNode);[m
 B().mergeRight();E();A.editorcore.onEditorEvent();}},xns:rooui.Toolbar},{xtype:'Button',text:'Below',listeners:{click:function(G,e){A.editorcore.selectNode(A.tb.selectedNode);B().mergeBelow();E();A.editorcore.onEditorEvent();}},xns:rooui.Toolbar},{xtype:'TextItem',text:"| ",xns:rooui.Toolbar}[m
 ,{xtype:'Button',text:'Split',listeners:{click:function(G,e){B().split();E();A.editorcore.selectNode(A.tb.selectedNode);A.editorcore.onEditorEvent();}},xns:rooui.Toolbar},{xtype:'Fill',xns:rooui.Toolbar},{xtype:'Button',text:'Delete',xns:rooui.Toolbar,menu:{xtype:'Menu',xns:rooui.menu,items:[{xtype:'Item',html:'Column',listeners:{click:function(G,e){var t=C();[m
 B().deleteColumn();E();A.editorcore.selectNode(t.node);A.editorcore.onEditorEvent();}},xns:rooui.menu},{xtype:'Item',html:'Row',listeners:{click:function(G,e){var t=C();B().deleteRow();E();A.editorcore.selectNode(t.node);A.editorcore.onEditorEvent();}},xns:rooui.menu}[m
 ,{xtype:'Separator',xns:rooui.menu},{xtype:'Item',html:'Table',listeners:{click:function(G,e){var t=C();var nn=t.node.nextSibling||t.node.previousSibling;t.node.parentNode.removeChild(t.node);if(nn){A.editorcore.selectNode(nn,true);}A.editorcore.onEditorEvent();[m
 }},xns:rooui.menu}]}}];},toObject:function(){var A={tag:'td',contenteditable:'true','data-block':'Td',valign:this.valign,style:{'text-align':this.textAlign,border:'solid 1px rgb(0, 0, 0)','border-collapse':'collapse',padding:'6px','vertical-align':this.valign}[m
 ,html:this.html};if(this.width!=''){A.width=this.width;A.style.width=this.width;}if(this.colspan>1){A.colspan=this.colspan;}if(this.rowspan>1){A.rowspan=this.rowspan;}return A;},readElement:function(A){A=A?A:this.node;this.width=A.style.width;this.colspan=Math.max(1,1*A.getAttribute('colspan'));[m
[31m-this.rowspan=Math.max(1,1*A.getAttribute('rowspan'));this.html=A.innerHTML;},emptyCell:function(){return {colspan:1,rowspan:1,textAlign:'left',html:"&nbsp;"};},removeNode:function(){return this.node.closest('table');},cellData:false,colWidths:false,toTableArray:function(){var A=[];[m
[31m-var B=this.node.closest('tr').closest('table');Array.from(B.rows).forEach(function(r,ri){A[ri]=[];});var rn=0;this.colWidths=[];var C=true;Array.from(B.rows).forEach(function(r,ri){var cn=0;Array.from(r.cells).forEach(function(ce,ci){var c={cell:ce,row:rn,col:cn,colspan:ce.colSpan,rowspan:ce.rowSpan}[m
[32m+[m[32mthis.rowspan=Math.max(1,1*A.getAttribute('rowspan'));this.html=A.innerHTML;},emptyCell:function(){return {colspan:1,rowspan:1,textAlign:'left',html:"&nbsp;"};},removeNode:function(){return this.node.closest('table');},cellData:false,colWidths:false,toTableArray:function(){console.log("htmleditor.BlockTd toTableArray ");[m
[32m+[m[32mvar A=[];var B=this.node.closest('tr').closest('table');Array.from(B.rows).forEach(function(r,ri){A[ri]=[];});var rn=0;this.colWidths=[];var C=true;Array.from(B.rows).forEach(function(r,ri){var cn=0;Array.from(r.cells).forEach(function(ce,ci){var c={cell:ce,row:rn,col:cn,colspan:ce.colSpan,rowspan:ce.rowSpan}[m
 ;if(ce.isEqualNode(this.node)){this.cellData=c;}if(typeof(A[rn][cn])!='undefined'){while(typeof(A[rn][cn])!='undefined'){cn++;}c.col=cn;}if(typeof(this.colWidths[cn])=='undefined'){this.colWidths[cn]=ce.style.width;if(this.colWidths[cn]!=''){C=false;}}if(c.colspan<2&&c.rowspan<2){A[rn][cn]=c;[m
[31m-cn++;return;}for(var j=0;j<c.rowspan;j++){if(typeof(A[rn+j])=='undefined'){continue;}A[rn+j][cn]=c;for(var i=0;i<c.colspan;i++){A[rn+j][cn+i]=c;}}cn+=c.colspan;},this);rn++;},this);if(C){this.colWidths[0]=false;}return A;},mergeRight:function(){var tr=this.node.closest('tr');[m
[31m-var i=Array.prototype.indexOf.call(tr.childNodes,this.node);if(i>=tr.childNodes.length-1){return;}var A=this.toTableArray();if(typeof(A[this.cellData.row][this.cellData.col+this.cellData.colspan])=='undefined'){return;}var rc=A[this.cellData.row][this.cellData.col+this.cellData.colspan];[m
[31m-if(rc.rowspan!=this.cellData.rowspan||rc.row!=this.cellData.row){return;}this.node.innerHTML+=' '+rc.cell.innerHTML;tr.removeChild(rc.cell);this.colspan+=rc.colspan;this.node.setAttribute('colspan',this.colspan);},mergeBelow:function(){var A=this.toTableArray();[m
[31m-if(typeof(A[this.cellData.row+this.cellData.rowspan])=='undefined'){return;}if(typeof(A[this.cellData.row+this.cellData.rowspan][this.cellData.col])=='undefined'){return;}var rc=A[this.cellData.row+this.cellData.rowspan][this.cellData.col];if(rc.colspan!=this.cellData.colspan||rc.col!=this.cellData.col){return;[m
[31m-}this.node.innerHTML=this.node.innerHTML+rc.cell.innerHTML;rc.cell.parentNode.removeChild(rc.cell);this.rowspan+=rc.rowspan;this.node.setAttribute('rowspan',this.rowspan);},split:function(){if(this.node.rowSpan<2&&this.node.colSpan<2){return;}var A=this.toTableArray();[m
[31m-var cd=this.cellData;this.rowspan=1;this.colspan=1;for(var r=cd.row;r<cd.row+cd.rowspan;r++){for(var c=cd.col;c<cd.col+cd.colspan;c++){if(r==cd.row&&c==cd.col){this.node.removeAttribute('rowspan');this.node.removeAttribute('colspan');continue;}var B=this.node.cloneNode();[m
[31m-B.removeAttribute('id');B.innerHTML='';A[r][c]={cell:B,col:c,row:r,colspan:1,rowspan:1};}}this.redrawAllCells(A);},redrawAllCells:function(A){var B=this.node.closest('tr').closest('table');var C=B.rows[0].parentNode;Array.from(B.rows).forEach(function(r,ri){Array.from(r.cells).forEach(function(ce,ci){ce.parentNode.removeChild(ce);[m
[31m-});r.parentNode.removeChild(r);});for(var r=0;r<A.length;r++){var re=B.rows[r];var re=B.ownerDocument.createElement('tr');C.appendChild(re);for(var c=0;c<A[r].length;c++){if(A[r][c].cell===false){continue;}re.appendChild(A[r][c].cell);A[r][c].cell=false;}[m
[31m-}},updateWidths:function(A){for(var r=0;r<A.length;r++){for(var c=0;c<A[r].length;c++){if(A[r][c].cell===false){continue;}if(this.colWidths[0]!=false&&A[r][c].colspan<2){var el=Roo.htmleditor.Block.factory(A[r][c].cell);el.width=Math.floor(this.colWidths[c])+'%';[m
[31m-el.updateElement(el.node);}A[r][c].cell=false;}}},normalizeWidths:function(A){if(this.colWidths[0]===false){var nw=100.0/this.colWidths.length;this.colWidths.forEach(function(w,i){this.colWidths[i]=nw;},this);return;}var t=0,B=[];this.colWidths.forEach(function(w,i){this.colWidths[i]=this.colWidths[i]==''?0:(this.colWidths[i]+'').replace(/[^0-9]+/g,'')*1;[m
[31m-var D=this.colWidths[i];if(D>0){t+=D;return;}B.push(i);},this);var nc=this.colWidths.length;if(B.length){var C=(nc-B.length)/(1.0*nc);var t=C*t;var ew=(100-t)/(1.0*B.length);this.colWidths.forEach(function(w,i){if(w>0){this.colWidths[i]=w*C;return;}this.colWidths[i]=ew;[m
[31m-},this);}},shrinkColumn:function(){var A=this.toTableArray();this.normalizeWidths(A);var B=this.cellData.col;var nw=this.colWidths[B]*0.8;if(nw<5){return;}var C=(this.colWidths[B]*0.2)/(this.colWidths.length-1);this.colWidths.forEach(function(w,i){if(i==B){this.colWidths[i]=nw;[m
[31m-return;}this.colWidths[i]+=C},this);this.updateWidths(A);},growColumn:function(){var A=this.toTableArray();this.normalizeWidths(A);var B=this.cellData.col;var nw=this.colWidths[B]*1.2;if(nw>90){return;}var C=(this.colWidths[B]*0.2)/(this.colWidths.length-1);[m
[31m-this.colWidths.forEach(function(w,i){if(i==B){this.colWidths[i]=nw;return;}this.colWidths[i]-=C},this);this.updateWidths(A);},deleteRow:function(){var A=this.toTableArray();for(var i=0;i<A[this.cellData.row].length;i++){var c=A[this.cellData.row][i];if(c.row!=this.cellData.row){c.rowspan--;[m
[31m-c.cell.setAttribute('rowspan',c.rowspan);continue;}if(c.rowspan>1){c.rowspan--;c.cell.setAttribute('rowspan',c.rowspan);}}A.splice(this.cellData.row,1);this.redrawAllCells(A);},deleteColumn:function(){var A=this.toTableArray();for(var i=0;i<A.length;i++){var c=A[i][this.cellData.col];[m
[31m-if(c.col!=this.cellData.col){A[i][this.cellData.col].colspan--;}else if(c.colspan>1){c.colspan--;c.cell.setAttribute('colspan',c.colspan);}A[i].splice(this.cellData.col,1);}this.redrawAllCells(A);}})[m
[32m+[m[32mcn++;return;}for(var j=0;j<c.rowspan;j++){if(typeof(A[rn+j])=='undefined'){continue;}A[rn+j][cn]=c;for(var i=0;i<c.colspan;i++){A[rn+j][cn+i]=c;}}cn+=c.colspan;},this);rn++;},this);if(C){this.colWidths[0]=false;}return A;},mergeRight:function(){console.log("htmleditor.BlockTd mergeRight");[m
[32m+[m[32mvar tr=this.node.closest('tr');var i=Array.prototype.indexOf.call(tr.childNodes,this.node);if(i>=tr.childNodes.length-1){return;}var A=this.toTableArray();console.log(A);if(typeof(A[this.cellData.row][this.cellData.col+this.cellData.colspan])=='undefined'){return;[m
[32m+[m[32m}var rc=A[this.cellData.row][this.cellData.col+this.cellData.colspan];if(rc.rowspan!=this.cellData.rowspan||rc.row!=this.cellData.row){return;}this.node.innerHTML+=' '+rc.cell.innerHTML;tr.removeChild(rc.cell);this.colspan+=rc.colspan;this.node.setAttribute('colspan',this.colspan);[m
[32m+[m[32mvar A=this.toTableArray();console.log(A);this.normalizeWidths(A);console.log(this.colWidths);},mergeBelow:function(){var A=this.toTableArray();if(typeof(A[this.cellData.row+this.cellData.rowspan])=='undefined'){return;}if(typeof(A[this.cellData.row+this.cellData.rowspan][this.cellData.col])=='undefined'){return;[m
[32m+[m[32m}var rc=A[this.cellData.row+this.cellData.rowspan][this.cellData.col];if(rc.colspan!=this.cellData.colspan||rc.col!=this.cellData.col){return;}this.node.innerHTML=this.node.innerHTML+rc.cell.innerHTML;rc.cell.parentNode.removeChild(rc.cell);this.rowspan+=rc.rowspan;[m
[32m+[m[32mthis.node.setAttribute('rowspan',this.rowspan);},split:function(){if(this.node.rowSpan<2&&this.node.colSpan<2){return;}var A=this.toTableArray();var cd=this.cellData;this.rowspan=1;this.colspan=1;for(var r=cd.row;r<cd.row+cd.rowspan;r++){for(var c=cd.col;[m
[32m+[m[32mc<cd.col+cd.colspan;c++){if(r==cd.row&&c==cd.col){this.node.removeAttribute('rowspan');this.node.removeAttribute('colspan');continue;}var B=this.node.cloneNode();B.removeAttribute('id');B.innerHTML='';A[r][c]={cell:B,col:c,row:r,colspan:1,rowspan:1};}}this.redrawAllCells(A);[m
[32m+[m[32m},redrawAllCells:function(A){var B=this.node.closest('tr').closest('table');var C=B.rows[0].parentNode;Array.from(B.rows).forEach(function(r,ri){Array.from(r.cells).forEach(function(ce,ci){ce.parentNode.removeChild(ce);});r.parentNode.removeChild(r);});for(var r=0;[m
[32m+[m[32mr<A.length;r++){var re=B.rows[r];var re=B.ownerDocument.createElement('tr');C.appendChild(re);for(var c=0;c<A[r].length;c++){if(A[r][c].cell===false){continue;}re.appendChild(A[r][c].cell);A[r][c].cell=false;}}},updateWidths:function(A){for(var r=0;r<A.length;[m
[32m+[m[32mr++){for(var c=0;c<A[r].length;c++){if(A[r][c].cell===false){continue;}if(this.colWidths[0]!=false&&A[r][c].colspan<2){var el=Roo.htmleditor.Block.factory(A[r][c].cell);el.width=Math.floor(this.colWidths[c])+'%';el.updateElement(el.node);}A[r][c].cell=false;[m
[32m+[m[32m}}},normalizeWidths:function(A){console.log("htmleditor.BlockTd normalizeWidths");console.log(this.colWidths);if(this.colWidths[0]===false){var nw=100.0/this.colWidths.length;this.colWidths.forEach(function(w,i){this.colWidths[i]=nw;},this);return;}var t=0,B=[];[m
[32m+[m[32mthis.colWidths.forEach(function(w,i){this.colWidths[i]=this.colWidths[i]==''?0:(this.colWidths[i]+'').replace(/[^0-9]+/g,'')*1;var D=this.colWidths[i];if(D>0){t+=D;return;}B.push(i);},this);var nc=this.colWidths.length;if(B.length){var C=(nc-B.length)/(1.0*nc);[m
[32m+[m[32mvar t=C*t;var ew=(100-t)/(1.0*B.length);this.colWidths.forEach(function(w,i){if(w>0){this.colWidths[i]=w*C;return;}this.colWidths[i]=ew;},this);}},shrinkColumn:function(){var A=this.toTableArray();console.log(A);this.normalizeWidths(A);console.log(this.colWidths);[m
[32m+[m[32mvar B=this.cellData.col;var nw=this.colWidths[B]*0.8;if(nw<5){return;}var C=(this.colWidths[B]*0.2)/(this.colWidths.length-1);this.colWidths.forEach(function(w,i){if(i==B){this.colWidths[i]=nw;return;}this.colWidths[i]+=C},this);this.updateWidths(A);},growColumn:function(){var A=this.toTableArray();[m
[32m+[m[32mthis.normalizeWidths(A);var B=this.cellData.col;var nw=this.colWidths[B]*1.2;if(nw>90){return;}var C=(this.colWidths[B]*0.2)/(this.colWidths.length-1);this.colWidths.forEach(function(w,i){if(i==B){this.colWidths[i]=nw;return;}this.colWidths[i]-=C},this);this.updateWidths(A);[m
[32m+[m[32m},deleteRow:function(){var A=this.toTableArray();for(var i=0;i<A[this.cellData.row].length;i++){var c=A[this.cellData.row][i];if(c.row!=this.cellData.row){c.rowspan--;c.cell.setAttribute('rowspan',c.rowspan);continue;}if(c.rowspan>1){c.rowspan--;c.cell.setAttribute('rowspan',c.rowspan);[m
[32m+[m[32m}}A.splice(this.cellData.row,1);this.redrawAllCells(A);},deleteColumn:function(){var A=this.toTableArray();for(var i=0;i<A.length;i++){var c=A[i][this.cellData.col];if(c.col!=this.cellData.col){A[i][this.cellData.col].colspan--;}else if(c.colspan>1){c.colspan--;[m
[32m+[m[32mc.cell.setAttribute('colspan',c.colspan);}A[i].splice(this.cellData.col,1);}this.redrawAllCells(A);}})[m
 // Roo/HtmlEditorCore.js[m
 Roo.HtmlEditorCore=function(A){Roo.HtmlEditorCore.superclass.constructor.call(this,A);this.addEvents({initialize:true,activate:true,beforesync:true,beforepush:true,sync:true,push:true,editorevent:true});this.applyBlacklists();};Roo.extend(Roo.HtmlEditorCore,Roo.Component,{owner:false,resizable:false,height:300,width:500,autoClean:true,enableBlocks:true,stylesheets:false,language:'en',allowComments:false,frameId:false,validationEvent:false,deferHeight:true,initialized:false,activated:false,sourceEditMode:false,onFocus:Roo.emptyFn,iframePad:3,hideMode:'offsets',clearUp:true,black:false,white:false,bodyCls:'',undoManager:false,getDocMarkup:function(){var st='';[m
 if(this.stylesheets===false){Roo.get(document.head).select('style').each(function(B){st+=B.dom.outerHTML||new XMLSerializer().serializeToString(B.dom);});Roo.get(document.head).select('link').each(function(B){st+=B.dom.outerHTML||new XMLSerializer().serializeToString(B.dom);[m
[1mdiff --git a/roojs-debug.js b/roojs-debug.js[m
[1mindex 779fa0189f..edb9ed778e 100644[m
[1m--- a/roojs-debug.js[m
[1m+++ b/roojs-debug.js[m
[36m@@ -48965,6 +48965,8 @@[m [mRoo.extend(Roo.htmleditor.BlockTable, Roo.htmleditor.Block, {[m
 [m
 Roo.htmleditor.BlockTd = function(cfg)[m
 {[m
[32m+[m[32m    console.log("htmleditor.BlockTd constructor");[m
[32m+[m[32m    console.log(cfg.node);[m
     if (cfg.node) {[m
         this.readElement(cfg.node);[m
         this.updateElement(cfg.node);[m
[36m@@ -48994,6 +48996,8 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     [m
     contextMenu : function(toolbar)[m
     {[m
[32m+[m[32m        console.log("htmleditor.BlodTd contextMenu");[m
[32m+[m[32m        console.log(this.node);[m
         [m
         var cell = function() {[m
             return Roo.htmleditor.Block.factory(toolbar.tb.selectedNode);[m
[36m@@ -49276,7 +49280,6 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
      */[m
     toObject : function()[m
     {[m
[31m-        [m
         var ret = {[m
             tag : 'td',[m
             contenteditable : 'true', // this stops cell selection from picking the table.[m
[36m@@ -49344,6 +49347,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     [m
     toTableArray  : function()[m
     {[m
[32m+[m[32m        console.log("htmleditor.BlockTd toTableArray ");[m
         var ret = [];[m
         var tab = this.node.closest('tr').closest('table');[m
         Array.from(tab.rows).forEach(function(r, ri){[m
[36m@@ -49356,6 +49360,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
             [m
             var cn = 0;[m
             Array.from(r.cells).forEach(function(ce, ci){[m
[32m+[m
                 var c =  {[m
                     cell : ce,[m
                     row : rn,[m
[36m@@ -49418,6 +49423,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     [m
     mergeRight: function()[m
     {[m
[32m+[m[32m        console.log("htmleditor.BlockTd mergeRight");[m
          [m
         // get the contents of the next cell along..[m
         var tr = this.node.closest('tr');[m
[36m@@ -49426,6 +49432,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
             return; // no cells on right to merge with.[m
         }[m
         var table = this.toTableArray();[m
[32m+[m[32m        console.log(table);[m
         [m
         if (typeof(table[this.cellData.row][this.cellData.col+this.cellData.colspan]) == 'undefined') {[m
             return; // nothing right?[m
[36m@@ -49443,6 +49450,11 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
         this.colspan += rc.colspan;[m
         this.node.setAttribute('colspan', this.colspan);[m
 [m
[32m+[m[32m        var table = this.toTableArray();[m
[32m+[m[32m        console.log(table);[m
[32m+[m[32m        this.normalizeWidths(table);[m
[32m+[m[32m        console.log(this.colWidths);[m
[32m+[m[32m        // this.updateWidths(table);[m
     },[m
     [m
     [m
[36m@@ -49497,8 +49509,6 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
         }[m
         this.redrawAllCells(table);[m
         [m
[31m-         [m
[31m-        [m
     },[m
     [m
     [m
[36m@@ -49547,13 +49557,23 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
                     el.width = Math.floor(this.colWidths[c])  +'%';[m
                     el.updateElement(el.node);[m
                 }[m
[32m+[m[32m                // else {[m
[32m+[m[32m                //     var el = Roo.htmleditor.Block.factory(table[r][c].cell);[m
[32m+[m[32m                //     var width = 0;[m
[32m+[m[32m                //     for(var i = 0; i < table[r][c].colspan; i ++) {[m
[32m+[m[32m                //         width += Math.floor(this.colWidths[c + i]);[m
[32m+[m[32m                //     }[m
[32m+[m[32m                //     el.width = width  +'%';[m
[32m+[m[32m                //     el.updateElement(el.node);[m
[32m+[m[32m                // }[m
                 table[r][c].cell = false; // done[m
             }[m
         }[m
     },[m
     normalizeWidths : function(table)[m
     {[m
[31m-    [m
[32m+[m[32m        console.log("htmleditor.BlockTd normalizeWidths");[m
[32m+[m[32m        console.log(this.colWidths);[m
         if (this.colWidths[0] === false) {[m
             var nw = 100.0 / this.colWidths.length;[m
             this.colWidths.forEach(function(w,i) {[m
[36m@@ -49600,7 +49620,9 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     shrinkColumn : function()[m
     {[m
         var table = this.toTableArray();[m
[32m+[m[32m        console.log(table);[m
         this.normalizeWidths(table);[m
[32m+[m[32m        console.log(this.colWidths);[m
         var col = this.cellData.col;[m
         var nw = this.colWidths[col] * 0.8;[m
         if (nw < 5) {[m
[1mdiff --git a/roojs-ui-debug.js b/roojs-ui-debug.js[m
[1mindex 6623fbfdb0..d82815532c 100644[m
[1m--- a/roojs-ui-debug.js[m
[1m+++ b/roojs-ui-debug.js[m
[36m@@ -24473,6 +24473,8 @@[m [mRoo.extend(Roo.htmleditor.BlockTable, Roo.htmleditor.Block, {[m
 [m
 Roo.htmleditor.BlockTd = function(cfg)[m
 {[m
[32m+[m[32m    console.log("htmleditor.BlockTd constructor");[m
[32m+[m[32m    console.log(cfg.node);[m
     if (cfg.node) {[m
         this.readElement(cfg.node);[m
         this.updateElement(cfg.node);[m
[36m@@ -24502,6 +24504,8 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     [m
     contextMenu : function(toolbar)[m
     {[m
[32m+[m[32m        console.log("htmleditor.BlodTd contextMenu");[m
[32m+[m[32m        console.log(this.node);[m
         [m
         var cell = function() {[m
             return Roo.htmleditor.Block.factory(toolbar.tb.selectedNode);[m
[36m@@ -24784,7 +24788,6 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
      */[m
     toObject : function()[m
     {[m
[31m-        [m
         var ret = {[m
             tag : 'td',[m
             contenteditable : 'true', // this stops cell selection from picking the table.[m
[36m@@ -24852,6 +24855,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     [m
     toTableArray  : function()[m
     {[m
[32m+[m[32m        console.log("htmleditor.BlockTd toTableArray ");[m
         var ret = [];[m
         var tab = this.node.closest('tr').closest('table');[m
         Array.from(tab.rows).forEach(function(r, ri){[m
[36m@@ -24864,6 +24868,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
             [m
             var cn = 0;[m
             Array.from(r.cells).forEach(function(ce, ci){[m
[32m+[m
                 var c =  {[m
                     cell : ce,[m
                     row : rn,[m
[36m@@ -24926,6 +24931,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     [m
     mergeRight: function()[m
     {[m
[32m+[m[32m        console.log("htmleditor.BlockTd mergeRight");[m
          [m
         // get the contents of the next cell along..[m
         var tr = this.node.closest('tr');[m
[36m@@ -24934,6 +24940,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
             return; // no cells on right to merge with.[m
         }[m
         var table = this.toTableArray();[m
[32m+[m[32m        console.log(table);[m
         [m
         if (typeof(table[this.cellData.row][this.cellData.col+this.cellData.colspan]) == 'undefined') {[m
             return; // nothing right?[m
[36m@@ -24951,6 +24958,11 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
         this.colspan += rc.colspan;[m
         this.node.setAttribute('colspan', this.colspan);[m
 [m
[32m+[m[32m        var table = this.toTableArray();[m
[32m+[m[32m        console.log(table);[m
[32m+[m[32m        this.normalizeWidths(table);[m
[32m+[m[32m        console.log(this.colWidths);[m
[32m+[m[32m        // this.updateWidths(table);[m
     },[m
     [m
     [m
[36m@@ -25005,8 +25017,6 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
         }[m
         this.redrawAllCells(table);[m
         [m
[31m-         [m
[31m-        [m
     },[m
     [m
     [m
[36m@@ -25055,13 +25065,23 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
                     el.width = Math.floor(this.colWidths[c])  +'%';[m
                     el.updateElement(el.node);[m
                 }[m
[32m+[m[32m                // else {[m
[32m+[m[32m                //     var el = Roo.htmleditor.Block.factory(table[r][c].cell);[m
[32m+[m[32m                //     var width = 0;[m
[32m+[m[32m                //     for(var i = 0; i < table[r][c].colspan; i ++) {[m
[32m+[m[32m                //         width += Math.floor(this.colWidths[c + i]);[m
[32m+[m[32m                //     }[m
[32m+[m[32m                //     el.width = width  +'%';[m
[32m+[m[32m                //     el.updateElement(el.node);[m
[32m+[m[32m                // }[m
                 table[r][c].cell = false; // done[m
             }[m
         }[m
     },[m
     normalizeWidths : function(table)[m
     {[m
[31m-    [m
[32m+[m[32m        console.log("htmleditor.BlockTd normalizeWidths");[m
[32m+[m[32m        console.log(this.colWidths);[m
         if (this.colWidths[0] === false) {[m
             var nw = 100.0 / this.colWidths.length;[m
             this.colWidths.forEach(function(w,i) {[m
[36m@@ -25108,7 +25128,9 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     shrinkColumn : function()[m
     {[m
         var table = this.toTableArray();[m
[32m+[m[32m        console.log(table);[m
         this.normalizeWidths(table);[m
[32m+[m[32m        console.log(this.colWidths);[m
         var col = this.cellData.col;[m
         var nw = this.colWidths[col] * 0.8;[m
         if (nw < 5) {[m
[1mdiff --git a/roojs-ui.js b/roojs-ui.js[m
[1mindex 40ce72d195..b1aeca363c 100644[m
[1m--- a/roojs-ui.js[m
[1m+++ b/roojs-ui.js[m
[36m@@ -1081,37 +1081,40 @@[m [mreturn;}for(var i=0;i<c.colspan;i++){B.push(c);}});return B;},deleteColumn:funct[m
 this.updateElement();},emptyCell:function(){return (new Roo.htmleditor.BlockTd({})).toObject();},removeNode:function(){return this.node;},resetWidths:function(){Array.from(this.node.getElementsByTagName('td')).forEach(function(n){var nn=Roo.htmleditor.Block.factory(n);[m
 nn.width='';nn.updateElement(n);});}})[m
 // Roo/htmleditor/BlockTd.js[m
[31m-Roo.htmleditor.BlockTd=function(A){if(A.node){this.readElement(A.node);this.updateElement(A.node);}Roo.apply(this,A);};Roo.extend(Roo.htmleditor.BlockTd,Roo.htmleditor.Block,{node:false,width:'',textAlign:'left',valign:'top',colspan:1,rowspan:1,friendly_name:'Table Cell',deleteTitle:false,contextMenu:function(A){var B=function(){return Roo.htmleditor.Block.factory(A.tb.selectedNode);[m
[31m-};var C=function(){return Roo.htmleditor.Block.factory(A.tb.selectedNode.closest('table'));};var lr=false;var D=function(){lr=A.editorcore.getSelection().getRangeAt(0);};var restoreSel=function(){if(lr){(function(){A.editorcore.focus();var cr=A.editorcore.getSelection();[m
[31m-cr.removeAllRanges();cr.addRange(lr);A.editorcore.onEditorEvent();}).defer(10,this);}};var rooui=typeof(Roo.bootstrap)=='undefined'?Roo:Roo.bootstrap;var E=A.editorcore.syncValue;var F={};return [{xtype:'Button',text:'Edit Table',listeners:{click:function(){var t=A.tb.selectedNode.closest('table');[m
[31m-A.editorcore.selectNode(t);A.editorcore.onEditorEvent();}}},{xtype:'TextItem',text:"Column Width: ",xns:rooui.Toolbar},{xtype:'Button',text:'-',listeners:{click:function(G,e){A.editorcore.selectNode(A.tb.selectedNode);B().shrinkColumn();E();A.editorcore.onEditorEvent();[m
[31m-}},xns:rooui.Toolbar},{xtype:'Button',text:'+',listeners:{click:function(G,e){A.editorcore.selectNode(A.tb.selectedNode);B().growColumn();E();A.editorcore.onEditorEvent();}},xns:rooui.Toolbar},{xtype:'TextItem',text:"Vertical Align: ",xns:rooui.Toolbar},{xtype:'ComboBox',allowBlank:false,displayField:'val',editable:true,listWidth:100,triggerAction:'all',typeAhead:true,valueField:'val',width:100,name:'valign',listeners:{select:function(G,r,H){A.editorcore.selectNode(A.tb.selectedNode);[m
[31m-var b=B();b.valign=r.get('val');b.updateElement();E();A.editorcore.onEditorEvent();}},xns:rooui.form,store:{xtype:'SimpleStore',data:[['top'],['middle'],['bottom']],fields:['val'],xns:Roo.data}},{xtype:'TextItem',text:"Merge Cells: ",xns:rooui.Toolbar},{xtype:'Button',text:'Right',listeners:{click:function(G,e){A.editorcore.selectNode(A.tb.selectedNode);[m
[32m+[m[32mRoo.htmleditor.BlockTd=function(A){console.log("htmleditor.BlockTd constructor");console.log(A.node);if(A.node){this.readElement(A.node);this.updateElement(A.node);}Roo.apply(this,A);};Roo.extend(Roo.htmleditor.BlockTd,Roo.htmleditor.Block,{node:false,width:'',textAlign:'left',valign:'top',colspan:1,rowspan:1,friendly_name:'Table Cell',deleteTitle:false,contextMenu:function(A){console.log("htmleditor.BlodTd contextMenu");[m
[32m+[m[32mconsole.log(this.node);var B=function(){return Roo.htmleditor.Block.factory(A.tb.selectedNode);};var C=function(){return Roo.htmleditor.Block.factory(A.tb.selectedNode.closest('table'));};var lr=false;var D=function(){lr=A.editorcore.getSelection().getRangeAt(0);[m
[32m+[m[32m};var restoreSel=function(){if(lr){(function(){A.editorcore.focus();var cr=A.editorcore.getSelection();cr.removeAllRanges();cr.addRange(lr);A.editorcore.onEditorEvent();}).defer(10,this);}};var rooui=typeof(Roo.bootstrap)=='undefined'?Roo:Roo.bootstrap;var E=A.editorcore.syncValue;[m
[32m+[m[32mvar F={};return [{xtype:'Button',text:'Edit Table',listeners:{click:function(){var t=A.tb.selectedNode.closest('table');A.editorcore.selectNode(t);A.editorcore.onEditorEvent();}}},{xtype:'TextItem',text:"Column Width: ",xns:rooui.Toolbar},{xtype:'Button',text:'-',listeners:{click:function(G,e){A.editorcore.selectNode(A.tb.selectedNode);[m
[32m+[m[32mB().shrinkColumn();E();A.editorcore.onEditorEvent();}},xns:rooui.Toolbar},{xtype:'Button',text:'+',listeners:{click:function(G,e){A.editorcore.selectNode(A.tb.selectedNode);B().growColumn();E();A.editorcore.onEditorEvent();}},xns:rooui.Toolbar},{xtype:'TextItem',text:"Vertical Align: ",xns:rooui.Toolbar}[m
[32m+[m[32m,{xtype:'ComboBox',allowBlank:false,displayField:'val',editable:true,listWidth:100,triggerAction:'all',typeAhead:true,valueField:'val',width:100,name:'valign',listeners:{select:function(G,r,H){A.editorcore.selectNode(A.tb.selectedNode);var b=B();b.valign=r.get('val');[m
[32m+[m[32mb.updateElement();E();A.editorcore.onEditorEvent();}},xns:rooui.form,store:{xtype:'SimpleStore',data:[['top'],['middle'],['bottom']],fields:['val'],xns:Roo.data}},{xtype:'TextItem',text:"Merge Cells: ",xns:rooui.Toolbar},{xtype:'Button',text:'Right',listeners:{click:function(G,e){A.editorcore.selectNode(A.tb.selectedNode);[m
 B().mergeRight();E();A.editorcore.onEditorEvent();}},xns:rooui.Toolbar},{xtype:'Button',text:'Below',listeners:{click:function(G,e){A.editorcore.selectNode(A.tb.selectedNode);B().mergeBelow();E();A.editorcore.onEditorEvent();}},xns:rooui.Toolbar},{xtype:'TextItem',text:"| ",xns:rooui.Toolbar}[m
 ,{xtype:'Button',text:'Split',listeners:{click:function(G,e){B().split();E();A.editorcore.selectNode(A.tb.selectedNode);A.editorcore.onEditorEvent();}},xns:rooui.Toolbar},{xtype:'Fill',xns:rooui.Toolbar},{xtype:'Button',text:'Delete',xns:rooui.Toolbar,menu:{xtype:'Menu',xns:rooui.menu,items:[{xtype:'Item',html:'Column',listeners:{click:function(G,e){var t=C();[m
 B().deleteColumn();E();A.editorcore.selectNode(t.node);A.editorcore.onEditorEvent();}},xns:rooui.menu},{xtype:'Item',html:'Row',listeners:{click:function(G,e){var t=C();B().deleteRow();E();A.editorcore.selectNode(t.node);A.editorcore.onEditorEvent();}},xns:rooui.menu}[m
 ,{xtype:'Separator',xns:rooui.menu},{xtype:'Item',html:'Table',listeners:{click:function(G,e){var t=C();var nn=t.node.nextSibling||t.node.previousSibling;t.node.parentNode.removeChild(t.node);if(nn){A.editorcore.selectNode(nn,true);}A.editorcore.onEditorEvent();[m
 }},xns:rooui.menu}]}}];},toObject:function(){var A={tag:'td',contenteditable:'true','data-block':'Td',valign:this.valign,style:{'text-align':this.textAlign,border:'solid 1px rgb(0, 0, 0)','border-collapse':'collapse',padding:'6px','vertical-align':this.valign}[m
 ,html:this.html};if(this.width!=''){A.width=this.width;A.style.width=this.width;}if(this.colspan>1){A.colspan=this.colspan;}if(this.rowspan>1){A.rowspan=this.rowspan;}return A;},readElement:function(A){A=A?A:this.node;this.width=A.style.width;this.colspan=Math.max(1,1*A.getAttribute('colspan'));[m
[31m-this.rowspan=Math.max(1,1*A.getAttribute('rowspan'));this.html=A.innerHTML;},emptyCell:function(){return {colspan:1,rowspan:1,textAlign:'left',html:"&nbsp;"};},removeNode:function(){return this.node.closest('table');},cellData:false,colWidths:false,toTableArray:function(){var A=[];[m
[31m-var B=this.node.closest('tr').closest('table');Array.from(B.rows).forEach(function(r,ri){A[ri]=[];});var rn=0;this.colWidths=[];var C=true;Array.from(B.rows).forEach(function(r,ri){var cn=0;Array.from(r.cells).forEach(function(ce,ci){var c={cell:ce,row:rn,col:cn,colspan:ce.colSpan,rowspan:ce.rowSpan}[m
[32m+[m[32mthis.rowspan=Math.max(1,1*A.getAttribute('rowspan'));this.html=A.innerHTML;},emptyCell:function(){return {colspan:1,rowspan:1,textAlign:'left',html:"&nbsp;"};},removeNode:function(){return this.node.closest('table');},cellData:false,colWidths:false,toTableArray:function(){console.log("htmleditor.BlockTd toTableArray ");[m
[32m+[m[32mvar A=[];var B=this.node.closest('tr').closest('table');Array.from(B.rows).forEach(function(r,ri){A[ri]=[];});var rn=0;this.colWidths=[];var C=true;Array.from(B.rows).forEach(function(r,ri){var cn=0;Array.from(r.cells).forEach(function(ce,ci){var c={cell:ce,row:rn,col:cn,colspan:ce.colSpan,rowspan:ce.rowSpan}[m
 ;if(ce.isEqualNode(this.node)){this.cellData=c;}if(typeof(A[rn][cn])!='undefined'){while(typeof(A[rn][cn])!='undefined'){cn++;}c.col=cn;}if(typeof(this.colWidths[cn])=='undefined'){this.colWidths[cn]=ce.style.width;if(this.colWidths[cn]!=''){C=false;}}if(c.colspan<2&&c.rowspan<2){A[rn][cn]=c;[m
[31m-cn++;return;}for(var j=0;j<c.rowspan;j++){if(typeof(A[rn+j])=='undefined'){continue;}A[rn+j][cn]=c;for(var i=0;i<c.colspan;i++){A[rn+j][cn+i]=c;}}cn+=c.colspan;},this);rn++;},this);if(C){this.colWidths[0]=false;}return A;},mergeRight:function(){var tr=this.node.closest('tr');[m
[31m-var i=Array.prototype.indexOf.call(tr.childNodes,this.node);if(i>=tr.childNodes.length-1){return;}var A=this.toTableArray();if(typeof(A[this.cellData.row][this.cellData.col+this.cellData.colspan])=='undefined'){return;}var rc=A[this.cellData.row][this.cellData.col+this.cellData.colspan];[m
[31m-if(rc.rowspan!=this.cellData.rowspan||rc.row!=this.cellData.row){return;}this.node.innerHTML+=' '+rc.cell.innerHTML;tr.removeChild(rc.cell);this.colspan+=rc.colspan;this.node.setAttribute('colspan',this.colspan);},mergeBelow:function(){var A=this.toTableArray();[m
[31m-if(typeof(A[this.cellData.row+this.cellData.rowspan])=='undefined'){return;}if(typeof(A[this.cellData.row+this.cellData.rowspan][this.cellData.col])=='undefined'){return;}var rc=A[this.cellData.row+this.cellData.rowspan][this.cellData.col];if(rc.colspan!=this.cellData.colspan||rc.col!=this.cellData.col){return;[m
[31m-}this.node.innerHTML=this.node.innerHTML+rc.cell.innerHTML;rc.cell.parentNode.removeChild(rc.cell);this.rowspan+=rc.rowspan;this.node.setAttribute('rowspan',this.rowspan);},split:function(){if(this.node.rowSpan<2&&this.node.colSpan<2){return;}var A=this.toTableArray();[m
[31m-var cd=this.cellData;this.rowspan=1;this.colspan=1;for(var r=cd.row;r<cd.row+cd.rowspan;r++){for(var c=cd.col;c<cd.col+cd.colspan;c++){if(r==cd.row&&c==cd.col){this.node.removeAttribute('rowspan');this.node.removeAttribute('colspan');continue;}var B=this.node.cloneNode();[m
[31m-B.removeAttribute('id');B.innerHTML='';A[r][c]={cell:B,col:c,row:r,colspan:1,rowspan:1};}}this.redrawAllCells(A);},redrawAllCells:function(A){var B=this.node.closest('tr').closest('table');var C=B.rows[0].parentNode;Array.from(B.rows).forEach(function(r,ri){Array.from(r.cells).forEach(function(ce,ci){ce.parentNode.removeChild(ce);[m
[31m-});r.parentNode.removeChild(r);});for(var r=0;r<A.length;r++){var re=B.rows[r];var re=B.ownerDocument.createElement('tr');C.appendChild(re);for(var c=0;c<A[r].length;c++){if(A[r][c].cell===false){continue;}re.appendChild(A[r][c].cell);A[r][c].cell=false;}[m
[31m-}},updateWidths:function(A){for(var r=0;r<A.length;r++){for(var c=0;c<A[r].length;c++){if(A[r][c].cell===false){continue;}if(this.colWidths[0]!=false&&A[r][c].colspan<2){var el=Roo.htmleditor.Block.factory(A[r][c].cell);el.width=Math.floor(this.colWidths[c])+'%';[m
[31m-el.updateElement(el.node);}A[r][c].cell=false;}}},normalizeWidths:function(A){if(this.colWidths[0]===false){var nw=100.0/this.colWidths.length;this.colWidths.forEach(function(w,i){this.colWidths[i]=nw;},this);return;}var t=0,B=[];this.colWidths.forEach(function(w,i){this.colWidths[i]=this.colWidths[i]==''?0:(this.colWidths[i]+'').replace(/[^0-9]+/g,'')*1;[m
[31m-var D=this.colWidths[i];if(D>0){t+=D;return;}B.push(i);},this);var nc=this.colWidths.length;if(B.length){var C=(nc-B.length)/(1.0*nc);var t=C*t;var ew=(100-t)/(1.0*B.length);this.colWidths.forEach(function(w,i){if(w>0){this.colWidths[i]=w*C;return;}this.colWidths[i]=ew;[m
[31m-},this);}},shrinkColumn:function(){var A=this.toTableArray();this.normalizeWidths(A);var B=this.cellData.col;var nw=this.colWidths[B]*0.8;if(nw<5){return;}var C=(this.colWidths[B]*0.2)/(this.colWidths.length-1);this.colWidths.forEach(function(w,i){if(i==B){this.colWidths[i]=nw;[m
[31m-return;}this.colWidths[i]+=C},this);this.updateWidths(A);},growColumn:function(){var A=this.toTableArray();this.normalizeWidths(A);var B=this.cellData.col;var nw=this.colWidths[B]*1.2;if(nw>90){return;}var C=(this.colWidths[B]*0.2)/(this.colWidths.length-1);[m
[31m-this.colWidths.forEach(function(w,i){if(i==B){this.colWidths[i]=nw;return;}this.colWidths[i]-=C},this);this.updateWidths(A);},deleteRow:function(){var A=this.toTableArray();for(var i=0;i<A[this.cellData.row].length;i++){var c=A[this.cellData.row][i];if(c.row!=this.cellData.row){c.rowspan--;[m
[31m-c.cell.setAttribute('rowspan',c.rowspan);continue;}if(c.rowspan>1){c.rowspan--;c.cell.setAttribute('rowspan',c.rowspan);}}A.splice(this.cellData.row,1);this.redrawAllCells(A);},deleteColumn:function(){var A=this.toTableArray();for(var i=0;i<A.length;i++){var c=A[i][this.cellData.col];[m
[31m-if(c.col!=this.cellData.col){A[i][this.cellData.col].colspan--;}else if(c.colspan>1){c.colspan--;c.cell.setAttribute('colspan',c.colspan);}A[i].splice(this.cellData.col,1);}this.redrawAllCells(A);}})[m
[32m+[m[32mcn++;return;}for(var j=0;j<c.rowspan;j++){if(typeof(A[rn+j])=='undefined'){continue;}A[rn+j][cn]=c;for(var i=0;i<c.colspan;i++){A[rn+j][cn+i]=c;}}cn+=c.colspan;},this);rn++;},this);if(C){this.colWidths[0]=false;}return A;},mergeRight:function(){console.log("htmleditor.BlockTd mergeRight");[m
[32m+[m[32mvar tr=this.node.closest('tr');var i=Array.prototype.indexOf.call(tr.childNodes,this.node);if(i>=tr.childNodes.length-1){return;}var A=this.toTableArray();console.log(A);if(typeof(A[this.cellData.row][this.cellData.col+this.cellData.colspan])=='undefined'){return;[m
[32m+[m[32m}var rc=A[this.cellData.row][this.cellData.col+this.cellData.colspan];if(rc.rowspan!=this.cellData.rowspan||rc.row!=this.cellData.row){return;}this.node.innerHTML+=' '+rc.cell.innerHTML;tr.removeChild(rc.cell);this.colspan+=rc.colspan;this.node.setAttribute('colspan',this.colspan);[m
[32m+[m[32mvar A=this.toTableArray();console.log(A);this.normalizeWidths(A);console.log(this.colWidths);},mergeBelow:function(){var A=this.toTableArray();if(typeof(A[this.cellData.row+this.cellData.rowspan])=='undefined'){return;}if(typeof(A[this.cellData.row+this.cellData.rowspan][this.cellData.col])=='undefined'){return;[m
[32m+[m[32m}var rc=A[this.cellData.row+this.cellData.rowspan][this.cellData.col];if(rc.colspan!=this.cellData.colspan||rc.col!=this.cellData.col){return;}this.node.innerHTML=this.node.innerHTML+rc.cell.innerHTML;rc.cell.parentNode.removeChild(rc.cell);this.rowspan+=rc.rowspan;[m
[32m+[m[32mthis.node.setAttribute('rowspan',this.rowspan);},split:function(){if(this.node.rowSpan<2&&this.node.colSpan<2){return;}var A=this.toTableArray();var cd=this.cellData;this.rowspan=1;this.colspan=1;for(var r=cd.row;r<cd.row+cd.rowspan;r++){for(var c=cd.col;[m
[32m+[m[32mc<cd.col+cd.colspan;c++){if(r==cd.row&&c==cd.col){this.node.removeAttribute('rowspan');this.node.removeAttribute('colspan');continue;}var B=this.node.cloneNode();B.removeAttribute('id');B.innerHTML='';A[r][c]={cell:B,col:c,row:r,colspan:1,rowspan:1};}}this.redrawAllCells(A);[m
[32m+[m[32m},redrawAllCells:function(A){var B=this.node.closest('tr').closest('table');var C=B.rows[0].parentNode;Array.from(B.rows).forEach(function(r,ri){Array.from(r.cells).forEach(function(ce,ci){ce.parentNode.removeChild(ce);});r.parentNode.removeChild(r);});for(var r=0;[m
[32m+[m[32mr<A.length;r++){var re=B.rows[r];var re=B.ownerDocument.createElement('tr');C.appendChild(re);for(var c=0;c<A[r].length;c++){if(A[r][c].cell===false){continue;}re.appendChild(A[r][c].cell);A[r][c].cell=false;}}},updateWidths:function(A){for(var r=0;r<A.length;[m
[32m+[m[32mr++){for(var c=0;c<A[r].length;c++){if(A[r][c].cell===false){continue;}if(this.colWidths[0]!=false&&A[r][c].colspan<2){var el=Roo.htmleditor.Block.factory(A[r][c].cell);el.width=Math.floor(this.colWidths[c])+'%';el.updateElement(el.node);}A[r][c].cell=false;[m
[32m+[m[32m}}},normalizeWidths:function(A){console.log("htmleditor.BlockTd normalizeWidths");console.log(this.colWidths);if(this.colWidths[0]===false){var nw=100.0/this.colWidths.length;this.colWidths.forEach(function(w,i){this.colWidths[i]=nw;},this);return;}var t=0,B=[];[m
[32m+[m[32mthis.colWidths.forEach(function(w,i){this.colWidths[i]=this.colWidths[i]==''?0:(this.colWidths[i]+'').replace(/[^0-9]+/g,'')*1;var D=this.colWidths[i];if(D>0){t+=D;return;}B.push(i);},this);var nc=this.colWidths.length;if(B.length){var C=(nc-B.length)/(1.0*nc);[m
[32m+[m[32mvar t=C*t;var ew=(100-t)/(1.0*B.length);this.colWidths.forEach(function(w,i){if(w>0){this.colWidths[i]=w*C;return;}this.colWidths[i]=ew;},this);}},shrinkColumn:function(){var A=this.toTableArray();console.log(A);this.normalizeWidths(A);console.log(this.colWidths);[m
[32m+[m[32mvar B=this.cellData.col;var nw=this.colWidths[B]*0.8;if(nw<5){return;}var C=(this.colWidths[B]*0.2)/(this.colWidths.length-1);this.colWidths.forEach(function(w,i){if(i==B){this.colWidths[i]=nw;return;}this.colWidths[i]+=C},this);this.updateWidths(A);},growColumn:function(){var A=this.toTableArray();[m
[32m+[m[32mthis.normalizeWidths(A);var B=this.cellData.col;var nw=this.colWidths[B]*1.2;if(nw>90){return;}var C=(this.colWidths[B]*0.2)/(this.colWidths.length-1);this.colWidths.forEach(function(w,i){if(i==B){this.colWidths[i]=nw;return;}this.colWidths[i]-=C},this);this.updateWidths(A);[m
[32m+[m[32m},deleteRow:function(){var A=this.toTableArray();for(var i=0;i<A[this.cellData.row].length;i++){var c=A[this.cellData.row][i];if(c.row!=this.cellData.row){c.rowspan--;c.cell.setAttribute('rowspan',c.rowspan);continue;}if(c.rowspan>1){c.rowspan--;c.cell.setAttribute('rowspan',c.rowspan);[m
[32m+[m[32m}}A.splice(this.cellData.row,1);this.redrawAllCells(A);},deleteColumn:function(){var A=this.toTableArray();for(var i=0;i<A.length;i++){var c=A[i][this.cellData.col];if(c.col!=this.cellData.col){A[i][this.cellData.col].colspan--;}else if(c.colspan>1){c.colspan--;[m
[32m+[m[32mc.cell.setAttribute('colspan',c.colspan);}A[i].splice(this.cellData.col,1);}this.redrawAllCells(A);}})[m
 // Roo/HtmlEditorCore.js[m
 Roo.HtmlEditorCore=function(A){Roo.HtmlEditorCore.superclass.constructor.call(this,A);this.addEvents({initialize:true,activate:true,beforesync:true,beforepush:true,sync:true,push:true,editorevent:true});this.applyBlacklists();};Roo.extend(Roo.HtmlEditorCore,Roo.Component,{owner:false,resizable:false,height:300,width:500,autoClean:true,enableBlocks:true,stylesheets:false,language:'en',allowComments:false,frameId:false,validationEvent:false,deferHeight:true,initialized:false,activated:false,sourceEditMode:false,onFocus:Roo.emptyFn,iframePad:3,hideMode:'offsets',clearUp:true,black:false,white:false,bodyCls:'',undoManager:false,getDocMarkup:function(){var st='';[m
 if(this.stylesheets===false){Roo.get(document.head).select('style').each(function(B){st+=B.dom.outerHTML||new XMLSerializer().serializeToString(B.dom);});Roo.get(document.head).select('link').each(function(B){st+=B.dom.outerHTML||new XMLSerializer().serializeToString(B.dom);[m
[1mdiff --git a/Roo/htmleditor/BlockTd.js b/Roo/htmleditor/BlockTd.js[m
[1mindex b6022caa76..ccfb7b1a70 100644[m
[1m--- a/Roo/htmleditor/BlockTd.js[m
[1m+++ b/Roo/htmleditor/BlockTd.js[m
[36m@@ -339,7 +339,6 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
      */[m
     toObject : function()[m
     {[m
[31m-        [m
         var ret = {[m
             tag : 'td',[m
             contenteditable : 'true', // this stops cell selection from picking the table.[m
[36m@@ -407,6 +406,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     [m
     toTableArray  : function()[m
     {[m
[32m+[m[32m        console.log("htmleditor.BlockTd toTableArray ");[m
         var ret = [];[m
         var tab = this.node.closest('tr').closest('table');[m
         Array.from(tab.rows).forEach(function(r, ri){[m
[36m@@ -419,6 +419,8 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
             [m
             var cn = 0;[m
             Array.from(r.cells).forEach(function(ce, ci){[m
[32m+[m[32m                console.log("CELL");[m
[32m+[m[32m                console.log(ce);[m
                 var c =  {[m
                     cell : ce,[m
                     row : rn,[m
[36m@@ -438,6 +440,8 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
                 }[m
                 [m
                 if (typeof(this.colWidths[cn]) == 'undefined') {[m
[32m+[m[32m                    console.log("CELL WIDTH");[m
[32m+[m[32m                    console.log(ce.style.width);[m
                     this.colWidths[cn] =   ce.style.width;[m
                     if (this.colWidths[cn] != '') {[m
                         all_auto = false;[m
[36m@@ -481,6 +485,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     [m
     mergeRight: function()[m
     {[m
[32m+[m[32m        console.log("htmleditor.BlockTd mergeRight");[m
          [m
         // get the contents of the next cell along..[m
         var tr = this.node.closest('tr');[m
[36m@@ -489,6 +494,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
             return; // no cells on right to merge with.[m
         }[m
         var table = this.toTableArray();[m
[32m+[m[32m        console.log(table);[m
         [m
         if (typeof(table[this.cellData.row][this.cellData.col+this.cellData.colspan]) == 'undefined') {[m
             return; // nothing right?[m
[36m@@ -506,6 +512,11 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
         this.colspan += rc.colspan;[m
         this.node.setAttribute('colspan', this.colspan);[m
 [m
[32m+[m[32m        // var table = this.toTableArray();[m
[32m+[m[32m        // console.log(table);[m
[32m+[m[32m        // this.normalizeWidths(table);[m
[32m+[m[32m        // console.log(this.colWidths);[m
[32m+[m[32m        // this.updateWidths(table);[m
     },[m
     [m
     [m
[36m@@ -560,8 +571,6 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
         }[m
         this.redrawAllCells(table);[m
         [m
[31m-         [m
[31m-        [m
     },[m
     [m
     [m
[36m@@ -610,13 +619,23 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
                     el.width = Math.floor(this.colWidths[c])  +'%';[m
                     el.updateElement(el.node);[m
                 }[m
[32m+[m[32m                // else {[m
[32m+[m[32m                //     var el = Roo.htmleditor.Block.factory(table[r][c].cell);[m
[32m+[m[32m                //     var width = 0;[m
[32m+[m[32m                //     for(var i = 0; i < table[r][c].colspan; i ++) {[m
[32m+[m[32m                //         width += Math.floor(this.colWidths[c + i]);[m
[32m+[m[32m                //     }[m
[32m+[m[32m                //     el.width = width  +'%';[m
[32m+[m[32m                //     el.updateElement(el.node);[m
[32m+[m[32m                // }[m
                 table[r][c].cell = false; // done[m
             }[m
         }[m
     },[m
     normalizeWidths : function(table)[m
     {[m
[31m-    [m
[32m+[m[32m        console.log("htmleditor.BlockTd normalizeWidths");[m
[32m+[m[32m        console.log(this.colWidths);[m
         if (this.colWidths[0] === false) {[m
             var nw = 100.0 / this.colWidths.length;[m
             this.colWidths.forEach(function(w,i) {[m
[36m@@ -663,7 +682,9 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     shrinkColumn : function()[m
     {[m
         var table = this.toTableArray();[m
[32m+[m[32m        console.log(table);[m
         this.normalizeWidths(table);[m
[32m+[m[32m        console.log(this.colWidths);[m
         var col = this.cellData.col;[m
         var nw = this.colWidths[col] * 0.8;[m
         if (nw < 5) {[m
[1mdiff --git a/roojs-all.js b/roojs-all.js[m
[1mindex 39a3e49f52..5639f0ffbc 100644[m
[1m--- a/roojs-all.js[m
[1m+++ b/roojs-all.js[m
[36m@@ -2039,25 +2039,27 @@[m [mB().deleteColumn();E();A.editorcore.selectNode(t.node);A.editorcore.onEditorEven[m
 ,{xtype:'Separator',xns:rooui.menu},{xtype:'Item',html:'Table',listeners:{click:function(G,e){var t=C();var nn=t.node.nextSibling||t.node.previousSibling;t.node.parentNode.removeChild(t.node);if(nn){A.editorcore.selectNode(nn,true);}A.editorcore.onEditorEvent();[m
 }},xns:rooui.menu}]}}];},toObject:function(){var A={tag:'td',contenteditable:'true','data-block':'Td',valign:this.valign,style:{'text-align':this.textAlign,border:'solid 1px rgb(0, 0, 0)','border-collapse':'collapse',padding:'6px','vertical-align':this.valign}[m
 ,html:this.html};if(this.width!=''){A.width=this.width;A.style.width=this.width;}if(this.colspan>1){A.colspan=this.colspan;}if(this.rowspan>1){A.rowspan=this.rowspan;}return A;},readElement:function(A){A=A?A:this.node;this.width=A.style.width;this.colspan=Math.max(1,1*A.getAttribute('colspan'));[m
[31m-this.rowspan=Math.max(1,1*A.getAttribute('rowspan'));this.html=A.innerHTML;},emptyCell:function(){return {colspan:1,rowspan:1,textAlign:'left',html:"&nbsp;"};},removeNode:function(){return this.node.closest('table');},cellData:false,colWidths:false,toTableArray:function(){var A=[];[m
[31m-var B=this.node.closest('tr').closest('table');Array.from(B.rows).forEach(function(r,ri){A[ri]=[];});var rn=0;this.colWidths=[];var C=true;Array.from(B.rows).forEach(function(r,ri){var cn=0;Array.from(r.cells).forEach(function(ce,ci){var c={cell:ce,row:rn,col:cn,colspan:ce.colSpan,rowspan:ce.rowSpan}[m
[31m-;if(ce.isEqualNode(this.node)){this.cellData=c;}if(typeof(A[rn][cn])!='undefined'){while(typeof(A[rn][cn])!='undefined'){cn++;}c.col=cn;}if(typeof(this.colWidths[cn])=='undefined'){this.colWidths[cn]=ce.style.width;if(this.colWidths[cn]!=''){C=false;}}if(c.colspan<2&&c.rowspan<2){A[rn][cn]=c;[m
[31m-cn++;return;}for(var j=0;j<c.rowspan;j++){if(typeof(A[rn+j])=='undefined'){continue;}A[rn+j][cn]=c;for(var i=0;i<c.colspan;i++){A[rn+j][cn+i]=c;}}cn+=c.colspan;},this);rn++;},this);if(C){this.colWidths[0]=false;}return A;},mergeRight:function(){var tr=this.node.closest('tr');[m
[31m-var i=Array.prototype.indexOf.call(tr.childNodes,this.node);if(i>=tr.childNodes.length-1){return;}var A=this.toTableArray();if(typeof(A[this.cellData.row][this.cellData.col+this.cellData.colspan])=='undefined'){return;}var rc=A[this.cellData.row][this.cellData.col+this.cellData.colspan];[m
[31m-if(rc.rowspan!=this.cellData.rowspan||rc.row!=this.cellData.row){return;}this.node.innerHTML+=' '+rc.cell.innerHTML;tr.removeChild(rc.cell);this.colspan+=rc.colspan;this.node.setAttribute('colspan',this.colspan);},mergeBelow:function(){var A=this.toTableArray();[m
[31m-if(typeof(A[this.cellData.row+this.cellData.rowspan])=='undefined'){return;}if(typeof(A[this.cellData.row+this.cellData.rowspan][this.cellData.col])=='undefined'){return;}var rc=A[this.cellData.row+this.cellData.rowspan][this.cellData.col];if(rc.colspan!=this.cellData.colspan||rc.col!=this.cellData.col){return;[m
[31m-}this.node.innerHTML=this.node.innerHTML+rc.cell.innerHTML;rc.cell.parentNode.removeChild(rc.cell);this.rowspan+=rc.rowspan;this.node.setAttribute('rowspan',this.rowspan);},split:function(){if(this.node.rowSpan<2&&this.node.colSpan<2){return;}var A=this.toTableArray();[m
[31m-var cd=this.cellData;this.rowspan=1;this.colspan=1;for(var r=cd.row;r<cd.row+cd.rowspan;r++){for(var c=cd.col;c<cd.col+cd.colspan;c++){if(r==cd.row&&c==cd.col){this.node.removeAttribute('rowspan');this.node.removeAttribute('colspan');continue;}var B=this.node.cloneNode();[m
[31m-B.removeAttribute('id');B.innerHTML='';A[r][c]={cell:B,col:c,row:r,colspan:1,rowspan:1};}}this.redrawAllCells(A);},redrawAllCells:function(A){var B=this.node.closest('tr').closest('table');var C=B.rows[0].parentNode;Array.from(B.rows).forEach(function(r,ri){Array.from(r.cells).forEach(function(ce,ci){ce.parentNode.removeChild(ce);[m
[32m+[m[32mthis.rowspan=Math.max(1,1*A.getAttribute('rowspan'));this.html=A.innerHTML;},emptyCell:function(){return {colspan:1,rowspan:1,textAlign:'left',html:"&nbsp;"};},removeNode:function(){return this.node.closest('table');},cellData:false,colWidths:false,toTableArray:function(){console.log("htmleditor.BlockTd toTableArray ");[m
[32m+[m[32mvar A=[];var B=this.node.closest('tr').closest('table');Array.from(B.rows).forEach(function(r,ri){A[ri]=[];});var rn=0;this.colWidths=[];var C=true;Array.from(B.rows).forEach(function(r,ri){var cn=0;Array.from(r.cells).forEach(function(ce,ci){console.log("CELL");[m
[32m+[m[32mconsole.log(ce);var c={cell:ce,row:rn,col:cn,colspan:ce.colSpan,rowspan:ce.rowSpan};if(ce.isEqualNode(this.node)){this.cellData=c;}if(typeof(A[rn][cn])!='undefined'){while(typeof(A[rn][cn])!='undefined'){cn++;}c.col=cn;}if(typeof(this.colWidths[cn])=='undefined'){console.log("CELL WIDTH");[m
[32m+[m[32mconsole.log(ce.style.width);this.colWidths[cn]=ce.style.width;if(this.colWidths[cn]!=''){C=false;}}if(c.colspan<2&&c.rowspan<2){A[rn][cn]=c;cn++;return;}for(var j=0;j<c.rowspan;j++){if(typeof(A[rn+j])=='undefined'){continue;}A[rn+j][cn]=c;for(var i=0;i<c.colspan;[m
[32m+[m[32mi++){A[rn+j][cn+i]=c;}}cn+=c.colspan;},this);rn++;},this);if(C){this.colWidths[0]=false;}return A;},mergeRight:function(){console.log("htmleditor.BlockTd mergeRight");var tr=this.node.closest('tr');var i=Array.prototype.indexOf.call(tr.childNodes,this.node);[m
[32m+[m[32mif(i>=tr.childNodes.length-1){return;}var A=this.toTableArray();console.log(A);if(typeof(A[this.cellData.row][this.cellData.col+this.cellData.colspan])=='undefined'){return;}var rc=A[this.cellData.row][this.cellData.col+this.cellData.colspan];if(rc.rowspan!=this.cellData.rowspan||rc.row!=this.cellData.row){return;[m
[32m+[m[32m}this.node.innerHTML+=' '+rc.cell.innerHTML;tr.removeChild(rc.cell);this.colspan+=rc.colspan;this.node.setAttribute('colspan',this.colspan);},mergeBelow:function(){var A=this.toTableArray();if(typeof(A[this.cellData.row+this.cellData.rowspan])=='undefined'){return;[m
[32m+[m[32m}if(typeof(A[this.cellData.row+this.cellData.rowspan][this.cellData.col])=='undefined'){return;}var rc=A[this.cellData.row+this.cellData.rowspan][this.cellData.col];if(rc.colspan!=this.cellData.colspan||rc.col!=this.cellData.col){return;}this.node.innerHTML=this.node.innerHTML+rc.cell.innerHTML;[m
[32m+[m[32mrc.cell.parentNode.removeChild(rc.cell);this.rowspan+=rc.rowspan;this.node.setAttribute('rowspan',this.rowspan);},split:function(){if(this.node.rowSpan<2&&this.node.colSpan<2){return;}var A=this.toTableArray();var cd=this.cellData;this.rowspan=1;this.colspan=1;[m
[32m+[m[32mfor(var r=cd.row;r<cd.row+cd.rowspan;r++){for(var c=cd.col;c<cd.col+cd.colspan;c++){if(r==cd.row&&c==cd.col){this.node.removeAttribute('rowspan');this.node.removeAttribute('colspan');continue;}var B=this.node.cloneNode();B.removeAttribute('id');B.innerHTML='';[m
[32m+[m[32mA[r][c]={cell:B,col:c,row:r,colspan:1,rowspan:1};}}this.redrawAllCells(A);},redrawAllCells:function(A){var B=this.node.closest('tr').closest('table');var C=B.rows[0].parentNode;Array.from(B.rows).forEach(function(r,ri){Array.from(r.cells).forEach(function(ce,ci){ce.parentNode.removeChild(ce);[m
 });r.parentNode.removeChild(r);});for(var r=0;r<A.length;r++){var re=B.rows[r];var re=B.ownerDocument.createElement('tr');C.appendChild(re);for(var c=0;c<A[r].length;c++){if(A[r][c].cell===false){continue;}re.appendChild(A[r][c].cell);A[r][c].cell=false;}[m
 }},updateWidths:function(A){for(var r=0;r<A.length;r++){for(var c=0;c<A[r].length;c++){if(A[r][c].cell===false){continue;}if(this.colWidths[0]!=false&&A[r][c].colspan<2){var el=Roo.htmleditor.Block.factory(A[r][c].cell);el.width=Math.floor(this.colWidths[c])+'%';[m
[31m-el.updateElement(el.node);}A[r][c].cell=false;}}},normalizeWidths:function(A){if(this.colWidths[0]===false){var nw=100.0/this.colWidths.length;this.colWidths.forEach(function(w,i){this.colWidths[i]=nw;},this);return;}var t=0,B=[];this.colWidths.forEach(function(w,i){this.colWidths[i]=this.colWidths[i]==''?0:(this.colWidths[i]+'').replace(/[^0-9]+/g,'')*1;[m
[31m-var D=this.colWidths[i];if(D>0){t+=D;return;}B.push(i);},this);var nc=this.colWidths.length;if(B.length){var C=(nc-B.length)/(1.0*nc);var t=C*t;var ew=(100-t)/(1.0*B.length);this.colWidths.forEach(function(w,i){if(w>0){this.colWidths[i]=w*C;return;}this.colWidths[i]=ew;[m
[31m-},this);}},shrinkColumn:function(){var A=this.toTableArray();this.normalizeWidths(A);var B=this.cellData.col;var nw=this.colWidths[B]*0.8;if(nw<5){return;}var C=(this.colWidths[B]*0.2)/(this.colWidths.length-1);this.colWidths.forEach(function(w,i){if(i==B){this.colWidths[i]=nw;[m
[31m-return;}this.colWidths[i]+=C},this);this.updateWidths(A);},growColumn:function(){var A=this.toTableArray();this.normalizeWidths(A);var B=this.cellData.col;var nw=this.colWidths[B]*1.2;if(nw>90){return;}var C=(this.colWidths[B]*0.2)/(this.colWidths.length-1);[m
[31m-this.colWidths.forEach(function(w,i){if(i==B){this.colWidths[i]=nw;return;}this.colWidths[i]-=C},this);this.updateWidths(A);},deleteRow:function(){var A=this.toTableArray();for(var i=0;i<A[this.cellData.row].length;i++){var c=A[this.cellData.row][i];if(c.row!=this.cellData.row){c.rowspan--;[m
[31m-c.cell.setAttribute('rowspan',c.rowspan);continue;}if(c.rowspan>1){c.rowspan--;c.cell.setAttribute('rowspan',c.rowspan);}}A.splice(this.cellData.row,1);this.redrawAllCells(A);},deleteColumn:function(){var A=this.toTableArray();for(var i=0;i<A.length;i++){var c=A[i][this.cellData.col];[m
[31m-if(c.col!=this.cellData.col){A[i][this.cellData.col].colspan--;}else if(c.colspan>1){c.colspan--;c.cell.setAttribute('colspan',c.colspan);}A[i].splice(this.cellData.col,1);}this.redrawAllCells(A);}})[m
[32m+[m[32mel.updateElement(el.node);}A[r][c].cell=false;}}},normalizeWidths:function(A){console.log("htmleditor.BlockTd normalizeWidths");console.log(this.colWidths);if(this.colWidths[0]===false){var nw=100.0/this.colWidths.length;this.colWidths.forEach(function(w,i){this.colWidths[i]=nw;[m
[32m+[m[32m},this);return;}var t=0,B=[];this.colWidths.forEach(function(w,i){this.colWidths[i]=this.colWidths[i]==''?0:(this.colWidths[i]+'').replace(/[^0-9]+/g,'')*1;var D=this.colWidths[i];if(D>0){t+=D;return;}B.push(i);},this);var nc=this.colWidths.length;if(B.length){var C=(nc-B.length)/(1.0*nc);[m
[32m+[m[32mvar t=C*t;var ew=(100-t)/(1.0*B.length);this.colWidths.forEach(function(w,i){if(w>0){this.colWidths[i]=w*C;return;}this.colWidths[i]=ew;},this);}},shrinkColumn:function(){var A=this.toTableArray();console.log(A);this.normalizeWidths(A);console.log(this.colWidths);[m
[32m+[m[32mvar B=this.cellData.col;var nw=this.colWidths[B]*0.8;if(nw<5){return;}var C=(this.colWidths[B]*0.2)/(this.colWidths.length-1);this.colWidths.forEach(function(w,i){if(i==B){this.colWidths[i]=nw;return;}this.colWidths[i]+=C},this);this.updateWidths(A);},growColumn:function(){var A=this.toTableArray();[m
[32m+[m[32mthis.normalizeWidths(A);var B=this.cellData.col;var nw=this.colWidths[B]*1.2;if(nw>90){return;}var C=(this.colWidths[B]*0.2)/(this.colWidths.length-1);this.colWidths.forEach(function(w,i){if(i==B){this.colWidths[i]=nw;return;}this.colWidths[i]-=C},this);this.updateWidths(A);[m
[32m+[m[32m},deleteRow:function(){var A=this.toTableArray();for(var i=0;i<A[this.cellData.row].length;i++){var c=A[this.cellData.row][i];if(c.row!=this.cellData.row){c.rowspan--;c.cell.setAttribute('rowspan',c.rowspan);continue;}if(c.rowspan>1){c.rowspan--;c.cell.setAttribute('rowspan',c.rowspan);[m
[32m+[m[32m}}A.splice(this.cellData.row,1);this.redrawAllCells(A);},deleteColumn:function(){var A=this.toTableArray();for(var i=0;i<A.length;i++){var c=A[i][this.cellData.col];if(c.col!=this.cellData.col){A[i][this.cellData.col].colspan--;}else if(c.colspan>1){c.colspan--;[m
[32m+[m[32mc.cell.setAttribute('colspan',c.colspan);}A[i].splice(this.cellData.col,1);}this.redrawAllCells(A);}})[m
 // Roo/HtmlEditorCore.js[m
 Roo.HtmlEditorCore=function(A){Roo.HtmlEditorCore.superclass.constructor.call(this,A);this.addEvents({initialize:true,activate:true,beforesync:true,beforepush:true,sync:true,push:true,editorevent:true});this.applyBlacklists();};Roo.extend(Roo.HtmlEditorCore,Roo.Component,{owner:false,resizable:false,height:300,width:500,autoClean:true,enableBlocks:true,stylesheets:false,language:'en',allowComments:false,frameId:false,validationEvent:false,deferHeight:true,initialized:false,activated:false,sourceEditMode:false,onFocus:Roo.emptyFn,iframePad:3,hideMode:'offsets',clearUp:true,black:false,white:false,bodyCls:'',undoManager:false,getDocMarkup:function(){var st='';[m
 if(this.stylesheets===false){Roo.get(document.head).select('style').each(function(B){st+=B.dom.outerHTML||new XMLSerializer().serializeToString(B.dom);});Roo.get(document.head).select('link').each(function(B){st+=B.dom.outerHTML||new XMLSerializer().serializeToString(B.dom);[m
[1mdiff --git a/roojs-debug.js b/roojs-debug.js[m
[1mindex 779fa0189f..31445da998 100644[m
[1m--- a/roojs-debug.js[m
[1m+++ b/roojs-debug.js[m
[36m@@ -49276,7 +49276,6 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
      */[m
     toObject : function()[m
     {[m
[31m-        [m
         var ret = {[m
             tag : 'td',[m
             contenteditable : 'true', // this stops cell selection from picking the table.[m
[36m@@ -49344,6 +49343,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     [m
     toTableArray  : function()[m
     {[m
[32m+[m[32m        console.log("htmleditor.BlockTd toTableArray ");[m
         var ret = [];[m
         var tab = this.node.closest('tr').closest('table');[m
         Array.from(tab.rows).forEach(function(r, ri){[m
[36m@@ -49356,6 +49356,8 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
             [m
             var cn = 0;[m
             Array.from(r.cells).forEach(function(ce, ci){[m
[32m+[m[32m                console.log("CELL");[m
[32m+[m[32m                console.log(ce);[m
                 var c =  {[m
                     cell : ce,[m
                     row : rn,[m
[36m@@ -49375,6 +49377,8 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
                 }[m
                 [m
                 if (typeof(this.colWidths[cn]) == 'undefined') {[m
[32m+[m[32m                    console.log("CELL WIDTH");[m
[32m+[m[32m                    console.log(ce.style.width);[m
                     this.colWidths[cn] =   ce.style.width;[m
                     if (this.colWidths[cn] != '') {[m
                         all_auto = false;[m
[36m@@ -49418,6 +49422,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     [m
     mergeRight: function()[m
     {[m
[32m+[m[32m        console.log("htmleditor.BlockTd mergeRight");[m
          [m
         // get the contents of the next cell along..[m
         var tr = this.node.closest('tr');[m
[36m@@ -49426,6 +49431,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
             return; // no cells on right to merge with.[m
         }[m
         var table = this.toTableArray();[m
[32m+[m[32m        console.log(table);[m
         [m
         if (typeof(table[this.cellData.row][this.cellData.col+this.cellData.colspan]) == 'undefined') {[m
             return; // nothing right?[m
[36m@@ -49443,6 +49449,11 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
         this.colspan += rc.colspan;[m
         this.node.setAttribute('colspan', this.colspan);[m
 [m
[32m+[m[32m        // var table = this.toTableArray();[m
[32m+[m[32m        // console.log(table);[m
[32m+[m[32m        // this.normalizeWidths(table);[m
[32m+[m[32m        // console.log(this.colWidths);[m
[32m+[m[32m        // this.updateWidths(table);[m
     },[m
     [m
     [m
[36m@@ -49497,8 +49508,6 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
         }[m
         this.redrawAllCells(table);[m
         [m
[31m-         [m
[31m-        [m
     },[m
     [m
     [m
[36m@@ -49547,13 +49556,23 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
                     el.width = Math.floor(this.colWidths[c])  +'%';[m
                     el.updateElement(el.node);[m
                 }[m
[32m+[m[32m                // else {[m
[32m+[m[32m                //     var el = Roo.htmleditor.Block.factory(table[r][c].cell);[m
[32m+[m[32m                //     var width = 0;[m
[32m+[m[32m                //     for(var i = 0; i < table[r][c].colspan; i ++) {[m
[32m+[m[32m                //         width += Math.floor(this.colWidths[c + i]);[m
[32m+[m[32m                //     }[m
[32m+[m[32m                //     el.width = width  +'%';[m
[32m+[m[32m                //     el.updateElement(el.node);[m
[32m+[m[32m                // }[m
                 table[r][c].cell = false; // done[m
             }[m
         }[m
     },[m
     normalizeWidths : function(table)[m
     {[m
[31m-    [m
[32m+[m[32m        console.log("htmleditor.BlockTd normalizeWidths");[m
[32m+[m[32m        console.log(this.colWidths);[m
         if (this.colWidths[0] === false) {[m
             var nw = 100.0 / this.colWidths.length;[m
             this.colWidths.forEach(function(w,i) {[m
[36m@@ -49600,7 +49619,9 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     shrinkColumn : function()[m
     {[m
         var table = this.toTableArray();[m
[32m+[m[32m        console.log(table);[m
         this.normalizeWidths(table);[m
[32m+[m[32m        console.log(this.colWidths);[m
         var col = this.cellData.col;[m
         var nw = this.colWidths[col] * 0.8;[m
         if (nw < 5) {[m
[1mdiff --git a/roojs-ui-debug.js b/roojs-ui-debug.js[m
[1mindex 6623fbfdb0..21e46e6eb0 100644[m
[1m--- a/roojs-ui-debug.js[m
[1m+++ b/roojs-ui-debug.js[m
[36m@@ -24784,7 +24784,6 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
      */[m
     toObject : function()[m
     {[m
[31m-        [m
         var ret = {[m
             tag : 'td',[m
             contenteditable : 'true', // this stops cell selection from picking the table.[m
[36m@@ -24852,6 +24851,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     [m
     toTableArray  : function()[m
     {[m
[32m+[m[32m        console.log("htmleditor.BlockTd toTableArray ");[m
         var ret = [];[m
         var tab = this.node.closest('tr').closest('table');[m
         Array.from(tab.rows).forEach(function(r, ri){[m
[36m@@ -24864,6 +24864,8 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
             [m
             var cn = 0;[m
             Array.from(r.cells).forEach(function(ce, ci){[m
[32m+[m[32m                console.log("CELL");[m
[32m+[m[32m                console.log(ce);[m
                 var c =  {[m
                     cell : ce,[m
                     row : rn,[m
[36m@@ -24883,6 +24885,8 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
                 }[m
                 [m
                 if (typeof(this.colWidths[cn]) == 'undefined') {[m
[32m+[m[32m                    console.log("CELL WIDTH");[m
[32m+[m[32m                    console.log(ce.style.width);[m
                     this.colWidths[cn] =   ce.style.width;[m
                     if (this.colWidths[cn] != '') {[m
                         all_auto = false;[m
[36m@@ -24926,6 +24930,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     [m
     mergeRight: function()[m
     {[m
[32m+[m[32m        console.log("htmleditor.BlockTd mergeRight");[m
          [m
         // get the contents of the next cell along..[m
         var tr = this.node.closest('tr');[m
[36m@@ -24934,6 +24939,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
             return; // no cells on right to merge with.[m
         }[m
         var table = this.toTableArray();[m
[32m+[m[32m        console.log(table);[m
         [m
         if (typeof(table[this.cellData.row][this.cellData.col+this.cellData.colspan]) == 'undefined') {[m
             return; // nothing right?[m
[36m@@ -24951,6 +24957,11 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
         this.colspan += rc.colspan;[m
         this.node.setAttribute('colspan', this.colspan);[m
 [m
[32m+[m[32m        // var table = this.toTableArray();[m
[32m+[m[32m        // console.log(table);[m
[32m+[m[32m        // this.normalizeWidths(table);[m
[32m+[m[32m        // console.log(this.colWidths);[m
[32m+[m[32m        // this.updateWidths(table);[m
     },[m
     [m
     [m
[36m@@ -25005,8 +25016,6 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
         }[m
         this.redrawAllCells(table);[m
         [m
[31m-         [m
[31m-        [m
     },[m
     [m
     [m
[36m@@ -25055,13 +25064,23 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
                     el.width = Math.floor(this.colWidths[c])  +'%';[m
                     el.updateElement(el.node);[m
                 }[m
[32m+[m[32m                // else {[m
[32m+[m[32m                //     var el = Roo.htmleditor.Block.factory(table[r][c].cell);[m
[32m+[m[32m                //     var width = 0;[m
[32m+[m[32m                //     for(var i = 0; i < table[r][c].colspan; i ++) {[m
[32m+[m[32m                //         width += Math.floor(this.colWidths[c + i]);[m
[32m+[m[32m                //     }[m
[32m+[m[32m                //     el.width = width  +'%';[m
[32m+[m[32m                //     el.updateElement(el.node);[m
[32m+[m[32m                // }[m
                 table[r][c].cell = false; // done[m
             }[m
         }[m
     },[m
     normalizeWidths : function(table)[m
     {[m
[31m-    [m
[32m+[m[32m        console.log("htmleditor.BlockTd normalizeWidths");[m
[32m+[m[32m        console.log(this.colWidths);[m
         if (this.colWidths[0] === false) {[m
             var nw = 100.0 / this.colWidths.length;[m
             this.colWidths.forEach(function(w,i) {[m
[36m@@ -25108,7 +25127,9 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     shrinkColumn : function()[m
     {[m
         var table = this.toTableArray();[m
[32m+[m[32m        console.log(table);[m
         this.normalizeWidths(table);[m
[32m+[m[32m        console.log(this.colWidths);[m
         var col = this.cellData.col;[m
         var nw = this.colWidths[col] * 0.8;[m
         if (nw < 5) {[m
[1mdiff --git a/roojs-ui.js b/roojs-ui.js[m
[1mindex 40ce72d195..800ac1bd02 100644[m
[1m--- a/roojs-ui.js[m
[1m+++ b/roojs-ui.js[m
[36m@@ -1093,25 +1093,27 @@[m [mB().deleteColumn();E();A.editorcore.selectNode(t.node);A.editorcore.onEditorEven[m
 ,{xtype:'Separator',xns:rooui.menu},{xtype:'Item',html:'Table',listeners:{click:function(G,e){var t=C();var nn=t.node.nextSibling||t.node.previousSibling;t.node.parentNode.removeChild(t.node);if(nn){A.editorcore.selectNode(nn,true);}A.editorcore.onEditorEvent();[m
 }},xns:rooui.menu}]}}];},toObject:function(){var A={tag:'td',contenteditable:'true','data-block':'Td',valign:this.valign,style:{'text-align':this.textAlign,border:'solid 1px rgb(0, 0, 0)','border-collapse':'collapse',padding:'6px','vertical-align':this.valign}[m
 ,html:this.html};if(this.width!=''){A.width=this.width;A.style.width=this.width;}if(this.colspan>1){A.colspan=this.colspan;}if(this.rowspan>1){A.rowspan=this.rowspan;}return A;},readElement:function(A){A=A?A:this.node;this.width=A.style.width;this.colspan=Math.max(1,1*A.getAttribute('colspan'));[m
[31m-this.rowspan=Math.max(1,1*A.getAttribute('rowspan'));this.html=A.innerHTML;},emptyCell:function(){return {colspan:1,rowspan:1,textAlign:'left',html:"&nbsp;"};},removeNode:function(){return this.node.closest('table');},cellData:false,colWidths:false,toTableArray:function(){var A=[];[m
[31m-var B=this.node.closest('tr').closest('table');Array.from(B.rows).forEach(function(r,ri){A[ri]=[];});var rn=0;this.colWidths=[];var C=true;Array.from(B.rows).forEach(function(r,ri){var cn=0;Array.from(r.cells).forEach(function(ce,ci){var c={cell:ce,row:rn,col:cn,colspan:ce.colSpan,rowspan:ce.rowSpan}[m
[31m-;if(ce.isEqualNode(this.node)){this.cellData=c;}if(typeof(A[rn][cn])!='undefined'){while(typeof(A[rn][cn])!='undefined'){cn++;}c.col=cn;}if(typeof(this.colWidths[cn])=='undefined'){this.colWidths[cn]=ce.style.width;if(this.colWidths[cn]!=''){C=false;}}if(c.colspan<2&&c.rowspan<2){A[rn][cn]=c;[m
[31m-cn++;return;}for(var j=0;j<c.rowspan;j++){if(typeof(A[rn+j])=='undefined'){continue;}A[rn+j][cn]=c;for(var i=0;i<c.colspan;i++){A[rn+j][cn+i]=c;}}cn+=c.colspan;},this);rn++;},this);if(C){this.colWidths[0]=false;}return A;},mergeRight:function(){var tr=this.node.closest('tr');[m
[31m-var i=Array.prototype.indexOf.call(tr.childNodes,this.node);if(i>=tr.childNodes.length-1){return;}var A=this.toTableArray();if(typeof(A[this.cellData.row][this.cellData.col+this.cellData.colspan])=='undefined'){return;}var rc=A[this.cellData.row][this.cellData.col+this.cellData.colspan];[m
[31m-if(rc.rowspan!=this.cellData.rowspan||rc.row!=this.cellData.row){return;}this.node.innerHTML+=' '+rc.cell.innerHTML;tr.removeChild(rc.cell);this.colspan+=rc.colspan;this.node.setAttribute('colspan',this.colspan);},mergeBelow:function(){var A=this.toTableArray();[m
[31m-if(typeof(A[this.cellData.row+this.cellData.rowspan])=='undefined'){return;}if(typeof(A[this.cellData.row+this.cellData.rowspan][this.cellData.col])=='undefined'){return;}var rc=A[this.cellData.row+this.cellData.rowspan][this.cellData.col];if(rc.colspan!=this.cellData.colspan||rc.col!=this.cellData.col){return;[m
[31m-}this.node.innerHTML=this.node.innerHTML+rc.cell.innerHTML;rc.cell.parentNode.removeChild(rc.cell);this.rowspan+=rc.rowspan;this.node.setAttribute('rowspan',this.rowspan);},split:function(){if(this.node.rowSpan<2&&this.node.colSpan<2){return;}var A=this.toTableArray();[m
[31m-var cd=this.cellData;this.rowspan=1;this.colspan=1;for(var r=cd.row;r<cd.row+cd.rowspan;r++){for(var c=cd.col;c<cd.col+cd.colspan;c++){if(r==cd.row&&c==cd.col){this.node.removeAttribute('rowspan');this.node.removeAttribute('colspan');continue;}var B=this.node.cloneNode();[m
[31m-B.removeAttribute('id');B.innerHTML='';A[r][c]={cell:B,col:c,row:r,colspan:1,rowspan:1};}}this.redrawAllCells(A);},redrawAllCells:function(A){var B=this.node.closest('tr').closest('table');var C=B.rows[0].parentNode;Array.from(B.rows).forEach(function(r,ri){Array.from(r.cells).forEach(function(ce,ci){ce.parentNode.removeChild(ce);[m
[32m+[m[32mthis.rowspan=Math.max(1,1*A.getAttribute('rowspan'));this.html=A.innerHTML;},emptyCell:function(){return {colspan:1,rowspan:1,textAlign:'left',html:"&nbsp;"};},removeNode:function(){return this.node.closest('table');},cellData:false,colWidths:false,toTableArray:function(){console.log("htmleditor.BlockTd toTableArray ");[m
[32m+[m[32mvar A=[];var B=this.node.closest('tr').closest('table');Array.from(B.rows).forEach(function(r,ri){A[ri]=[];});var rn=0;this.colWidths=[];var C=true;Array.from(B.rows).forEach(function(r,ri){var cn=0;Array.from(r.cells).forEach(function(ce,ci){console.log("CELL");[m
[32m+[m[32mconsole.log(ce);var c={cell:ce,row:rn,col:cn,colspan:ce.colSpan,rowspan:ce.rowSpan};if(ce.isEqualNode(this.node)){this.cellData=c;}if(typeof(A[rn][cn])!='undefined'){while(typeof(A[rn][cn])!='undefined'){cn++;}c.col=cn;}if(typeof(this.colWidths[cn])=='undefined'){console.log("CELL WIDTH");[m
[32m+[m[32mconsole.log(ce.style.width);this.colWidths[cn]=ce.style.width;if(this.colWidths[cn]!=''){C=false;}}if(c.colspan<2&&c.rowspan<2){A[rn][cn]=c;cn++;return;}for(var j=0;j<c.rowspan;j++){if(typeof(A[rn+j])=='undefined'){continue;}A[rn+j][cn]=c;for(var i=0;i<c.colspan;[m
[32m+[m[32mi++){A[rn+j][cn+i]=c;}}cn+=c.colspan;},this);rn++;},this);if(C){this.colWidths[0]=false;}return A;},mergeRight:function(){console.log("htmleditor.BlockTd mergeRight");var tr=this.node.closest('tr');var i=Array.prototype.indexOf.call(tr.childNodes,this.node);[m
[32m+[m[32mif(i>=tr.childNodes.length-1){return;}var A=this.toTableArray();console.log(A);if(typeof(A[this.cellData.row][this.cellData.col+this.cellData.colspan])=='undefined'){return;}var rc=A[this.cellData.row][this.cellData.col+this.cellData.colspan];if(rc.rowspan!=this.cellData.rowspan||rc.row!=this.cellData.row){return;[m
[32m+[m[32m}this.node.innerHTML+=' '+rc.cell.innerHTML;tr.removeChild(rc.cell);this.colspan+=rc.colspan;this.node.setAttribute('colspan',this.colspan);},mergeBelow:function(){var A=this.toTableArray();if(typeof(A[this.cellData.row+this.cellData.rowspan])=='undefined'){return;[m
[32m+[m[32m}if(typeof(A[this.cellData.row+this.cellData.rowspan][this.cellData.col])=='undefined'){return;}var rc=A[this.cellData.row+this.cellData.rowspan][this.cellData.col];if(rc.colspan!=this.cellData.colspan||rc.col!=this.cellData.col){return;}this.node.innerHTML=this.node.innerHTML+rc.cell.innerHTML;[m
[32m+[m[32mrc.cell.parentNode.removeChild(rc.cell);this.rowspan+=rc.rowspan;this.node.setAttribute('rowspan',this.rowspan);},split:function(){if(this.node.rowSpan<2&&this.node.colSpan<2){return;}var A=this.toTableArray();var cd=this.cellData;this.rowspan=1;this.colspan=1;[m
[32m+[m[32mfor(var r=cd.row;r<cd.row+cd.rowspan;r++){for(var c=cd.col;c<cd.col+cd.colspan;c++){if(r==cd.row&&c==cd.col){this.node.removeAttribute('rowspan');this.node.removeAttribute('colspan');continue;}var B=this.node.cloneNode();B.removeAttribute('id');B.innerHTML='';[m
[32m+[m[32mA[r][c]={cell:B,col:c,row:r,colspan:1,rowspan:1};}}this.redrawAllCells(A);},redrawAllCells:function(A){var B=this.node.closest('tr').closest('table');var C=B.rows[0].parentNode;Array.from(B.rows).forEach(function(r,ri){Array.from(r.cells).forEach(function(ce,ci){ce.parentNode.removeChild(ce);[m
 });r.parentNode.removeChild(r);});for(var r=0;r<A.length;r++){var re=B.rows[r];var re=B.ownerDocument.createElement('tr');C.appendChild(re);for(var c=0;c<A[r].length;c++){if(A[r][c].cell===false){continue;}re.appendChild(A[r][c].cell);A[r][c].cell=false;}[m
 }},updateWidths:function(A){for(var r=0;r<A.length;r++){for(var c=0;c<A[r].length;c++){if(A[r][c].cell===false){continue;}if(this.colWidths[0]!=false&&A[r][c].colspan<2){var el=Roo.htmleditor.Block.factory(A[r][c].cell);el.width=Math.floor(this.colWidths[c])+'%';[m
[31m-el.updateElement(el.node);}A[r][c].cell=false;}}},normalizeWidths:function(A){if(this.colWidths[0]===false){var nw=100.0/this.colWidths.length;this.colWidths.forEach(function(w,i){this.colWidths[i]=nw;},this);return;}var t=0,B=[];this.colWidths.forEach(function(w,i){this.colWidths[i]=this.colWidths[i]==''?0:(this.colWidths[i]+'').replace(/[^0-9]+/g,'')*1;[m
[31m-var D=this.colWidths[i];if(D>0){t+=D;return;}B.push(i);},this);var nc=this.colWidths.length;if(B.length){var C=(nc-B.length)/(1.0*nc);var t=C*t;var ew=(100-t)/(1.0*B.length);this.colWidths.forEach(function(w,i){if(w>0){this.colWidths[i]=w*C;return;}this.colWidths[i]=ew;[m
[31m-},this);}},shrinkColumn:function(){var A=this.toTableArray();this.normalizeWidths(A);var B=this.cellData.col;var nw=this.colWidths[B]*0.8;if(nw<5){return;}var C=(this.colWidths[B]*0.2)/(this.colWidths.length-1);this.colWidths.forEach(function(w,i){if(i==B){this.colWidths[i]=nw;[m
[31m-return;}this.colWidths[i]+=C},this);this.updateWidths(A);},growColumn:function(){var A=this.toTableArray();this.normalizeWidths(A);var B=this.cellData.col;var nw=this.colWidths[B]*1.2;if(nw>90){return;}var C=(this.colWidths[B]*0.2)/(this.colWidths.length-1);[m
[31m-this.colWidths.forEach(function(w,i){if(i==B){this.colWidths[i]=nw;return;}this.colWidths[i]-=C},this);this.updateWidths(A);},deleteRow:function(){var A=this.toTableArray();for(var i=0;i<A[this.cellData.row].length;i++){var c=A[this.cellData.row][i];if(c.row!=this.cellData.row){c.rowspan--;[m
[31m-c.cell.setAttribute('rowspan',c.rowspan);continue;}if(c.rowspan>1){c.rowspan--;c.cell.setAttribute('rowspan',c.rowspan);}}A.splice(this.cellData.row,1);this.redrawAllCells(A);},deleteColumn:function(){var A=this.toTableArray();for(var i=0;i<A.length;i++){var c=A[i][this.cellData.col];[m
[31m-if(c.col!=this.cellData.col){A[i][this.cellData.col].colspan--;}else if(c.colspan>1){c.colspan--;c.cell.setAttribute('colspan',c.colspan);}A[i].splice(this.cellData.col,1);}this.redrawAllCells(A);}})[m
[32m+[m[32mel.updateElement(el.node);}A[r][c].cell=false;}}},normalizeWidths:function(A){console.log("htmleditor.BlockTd normalizeWidths");console.log(this.colWidths);if(this.colWidths[0]===false){var nw=100.0/this.colWidths.length;this.colWidths.forEach(function(w,i){this.colWidths[i]=nw;[m
[32m+[m[32m},this);return;}var t=0,B=[];this.colWidths.forEach(function(w,i){this.colWidths[i]=this.colWidths[i]==''?0:(this.colWidths[i]+'').replace(/[^0-9]+/g,'')*1;var D=this.colWidths[i];if(D>0){t+=D;return;}B.push(i);},this);var nc=this.colWidths.length;if(B.length){var C=(nc-B.length)/(1.0*nc);[m
[32m+[m[32mvar t=C*t;var ew=(100-t)/(1.0*B.length);this.colWidths.forEach(function(w,i){if(w>0){this.colWidths[i]=w*C;return;}this.colWidths[i]=ew;},this);}},shrinkColumn:function(){var A=this.toTableArray();console.log(A);this.normalizeWidths(A);console.log(this.colWidths);[m
[32m+[m[32mvar B=this.cellData.col;var nw=this.colWidths[B]*0.8;if(nw<5){return;}var C=(this.colWidths[B]*0.2)/(this.colWidths.length-1);this.colWidths.forEach(function(w,i){if(i==B){this.colWidths[i]=nw;return;}this.colWidths[i]+=C},this);this.updateWidths(A);},growColumn:function(){var A=this.toTableArray();[m
[32m+[m[32mthis.normalizeWidths(A);var B=this.cellData.col;var nw=this.colWidths[B]*1.2;if(nw>90){return;}var C=(this.colWidths[B]*0.2)/(this.colWidths.length-1);this.colWidths.forEach(function(w,i){if(i==B){this.colWidths[i]=nw;return;}this.colWidths[i]-=C},this);this.updateWidths(A);[m
[32m+[m[32m},deleteRow:function(){var A=this.toTableArray();for(var i=0;i<A[this.cellData.row].length;i++){var c=A[this.cellData.row][i];if(c.row!=this.cellData.row){c.rowspan--;c.cell.setAttribute('rowspan',c.rowspan);continue;}if(c.rowspan>1){c.rowspan--;c.cell.setAttribute('rowspan',c.rowspan);[m
[32m+[m[32m}}A.splice(this.cellData.row,1);this.redrawAllCells(A);},deleteColumn:function(){var A=this.toTableArray();for(var i=0;i<A.length;i++){var c=A[i][this.cellData.col];if(c.col!=this.cellData.col){A[i][this.cellData.col].colspan--;}else if(c.colspan>1){c.colspan--;[m
[32m+[m[32mc.cell.setAttribute('colspan',c.colspan);}A[i].splice(this.cellData.col,1);}this.redrawAllCells(A);}})[m
 // Roo/HtmlEditorCore.js[m
 Roo.HtmlEditorCore=function(A){Roo.HtmlEditorCore.superclass.constructor.call(this,A);this.addEvents({initialize:true,activate:true,beforesync:true,beforepush:true,sync:true,push:true,editorevent:true});this.applyBlacklists();};Roo.extend(Roo.HtmlEditorCore,Roo.Component,{owner:false,resizable:false,height:300,width:500,autoClean:true,enableBlocks:true,stylesheets:false,language:'en',allowComments:false,frameId:false,validationEvent:false,deferHeight:true,initialized:false,activated:false,sourceEditMode:false,onFocus:Roo.emptyFn,iframePad:3,hideMode:'offsets',clearUp:true,black:false,white:false,bodyCls:'',undoManager:false,getDocMarkup:function(){var st='';[m
 if(this.stylesheets===false){Roo.get(document.head).select('style').each(function(B){st+=B.dom.outerHTML||new XMLSerializer().serializeToString(B.dom);});Roo.get(document.head).select('link').each(function(B){st+=B.dom.outerHTML||new XMLSerializer().serializeToString(B.dom);[m
[1mdiff --git a/Roo/htmleditor/BlockTd.js b/Roo/htmleditor/BlockTd.js[m
[1mindex b6022caa76..8be02436d9 100644[m
[1m--- a/Roo/htmleditor/BlockTd.js[m
[1m+++ b/Roo/htmleditor/BlockTd.js[m
[36m@@ -339,7 +339,6 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
      */[m
     toObject : function()[m
     {[m
[31m-        [m
         var ret = {[m
             tag : 'td',[m
             contenteditable : 'true', // this stops cell selection from picking the table.[m
[36m@@ -407,6 +406,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     [m
     toTableArray  : function()[m
     {[m
[32m+[m[32m        console.log("htmleditor.BlockTd toTableArray ");[m
         var ret = [];[m
         var tab = this.node.closest('tr').closest('table');[m
         Array.from(tab.rows).forEach(function(r, ri){[m
[36m@@ -419,6 +419,8 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
             [m
             var cn = 0;[m
             Array.from(r.cells).forEach(function(ce, ci){[m
[32m+[m[32m                console.log("CELL");[m
[32m+[m[32m                console.log(ce);[m
                 var c =  {[m
                     cell : ce,[m
                     row : rn,[m
[36m@@ -437,7 +439,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
                     c.col = cn;[m
                 }[m
                 [m
[31m-                if (typeof(this.colWidths[cn]) == 'undefined') {[m
[32m+[m[32m                if (typeof(this.colWidths[cn]) == 'undefined' && c.colspan < 2 && c.rowspan < 2) {[m
                     this.colWidths[cn] =   ce.style.width;[m
                     if (this.colWidths[cn] != '') {[m
                         all_auto = false;[m
[36m@@ -481,6 +483,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     [m
     mergeRight: function()[m
     {[m
[32m+[m[32m        console.log("htmleditor.BlockTd mergeRight");[m
          [m
         // get the contents of the next cell along..[m
         var tr = this.node.closest('tr');[m
[36m@@ -489,6 +492,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
             return; // no cells on right to merge with.[m
         }[m
         var table = this.toTableArray();[m
[32m+[m[32m        console.log(table);[m
         [m
         if (typeof(table[this.cellData.row][this.cellData.col+this.cellData.colspan]) == 'undefined') {[m
             return; // nothing right?[m
[36m@@ -506,6 +510,11 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
         this.colspan += rc.colspan;[m
         this.node.setAttribute('colspan', this.colspan);[m
 [m
[32m+[m[32m        // var table = this.toTableArray();[m
[32m+[m[32m        // console.log(table);[m
[32m+[m[32m        // this.normalizeWidths(table);[m
[32m+[m[32m        // console.log(this.colWidths);[m
[32m+[m[32m        // this.updateWidths(table);[m
     },[m
     [m
     [m
[36m@@ -560,8 +569,6 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
         }[m
         this.redrawAllCells(table);[m
         [m
[31m-         [m
[31m-        [m
     },[m
     [m
     [m
[36m@@ -610,13 +617,23 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
                     el.width = Math.floor(this.colWidths[c])  +'%';[m
                     el.updateElement(el.node);[m
                 }[m
[32m+[m[32m                // else {[m
[32m+[m[32m                //     var el = Roo.htmleditor.Block.factory(table[r][c].cell);[m
[32m+[m[32m                //     var width = 0;[m
[32m+[m[32m                //     for(var i = 0; i < table[r][c].colspan; i ++) {[m
[32m+[m[32m                //         width += Math.floor(this.colWidths[c + i]);[m
[32m+[m[32m                //     }[m
[32m+[m[32m                //     el.width = width  +'%';[m
[32m+[m[32m                //     el.updateElement(el.node);[m
[32m+[m[32m                // }[m
                 table[r][c].cell = false; // done[m
             }[m
         }[m
     },[m
     normalizeWidths : function(table)[m
     {[m
[31m-    [m
[32m+[m[32m        console.log("htmleditor.BlockTd normalizeWidths");[m
[32m+[m[32m        console.log(this.colWidths);[m
         if (this.colWidths[0] === false) {[m
             var nw = 100.0 / this.colWidths.length;[m
             this.colWidths.forEach(function(w,i) {[m
[36m@@ -663,7 +680,9 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     shrinkColumn : function()[m
     {[m
         var table = this.toTableArray();[m
[32m+[m[32m        console.log(table);[m
         this.normalizeWidths(table);[m
[32m+[m[32m        console.log(this.colWidths);[m
         var col = this.cellData.col;[m
         var nw = this.colWidths[col] * 0.8;[m
         if (nw < 5) {[m
[1mdiff --git a/roojs-all.js b/roojs-all.js[m
[1mindex 39a3e49f52..27fa6d7a7b 100644[m
[1m--- a/roojs-all.js[m
[1m+++ b/roojs-all.js[m
[36m@@ -2039,25 +2039,27 @@[m [mB().deleteColumn();E();A.editorcore.selectNode(t.node);A.editorcore.onEditorEven[m
 ,{xtype:'Separator',xns:rooui.menu},{xtype:'Item',html:'Table',listeners:{click:function(G,e){var t=C();var nn=t.node.nextSibling||t.node.previousSibling;t.node.parentNode.removeChild(t.node);if(nn){A.editorcore.selectNode(nn,true);}A.editorcore.onEditorEvent();[m
 }},xns:rooui.menu}]}}];},toObject:function(){var A={tag:'td',contenteditable:'true','data-block':'Td',valign:this.valign,style:{'text-align':this.textAlign,border:'solid 1px rgb(0, 0, 0)','border-collapse':'collapse',padding:'6px','vertical-align':this.valign}[m
 ,html:this.html};if(this.width!=''){A.width=this.width;A.style.width=this.width;}if(this.colspan>1){A.colspan=this.colspan;}if(this.rowspan>1){A.rowspan=this.rowspan;}return A;},readElement:function(A){A=A?A:this.node;this.width=A.style.width;this.colspan=Math.max(1,1*A.getAttribute('colspan'));[m
[31m-this.rowspan=Math.max(1,1*A.getAttribute('rowspan'));this.html=A.innerHTML;},emptyCell:function(){return {colspan:1,rowspan:1,textAlign:'left',html:"&nbsp;"};},removeNode:function(){return this.node.closest('table');},cellData:false,colWidths:false,toTableArray:function(){var A=[];[m
[31m-var B=this.node.closest('tr').closest('table');Array.from(B.rows).forEach(function(r,ri){A[ri]=[];});var rn=0;this.colWidths=[];var C=true;Array.from(B.rows).forEach(function(r,ri){var cn=0;Array.from(r.cells).forEach(function(ce,ci){var c={cell:ce,row:rn,col:cn,colspan:ce.colSpan,rowspan:ce.rowSpan}[m
[31m-;if(ce.isEqualNode(this.node)){this.cellData=c;}if(typeof(A[rn][cn])!='undefined'){while(typeof(A[rn][cn])!='undefined'){cn++;}c.col=cn;}if(typeof(this.colWidths[cn])=='undefined'){this.colWidths[cn]=ce.style.width;if(this.colWidths[cn]!=''){C=false;}}if(c.colspan<2&&c.rowspan<2){A[rn][cn]=c;[m
[31m-cn++;return;}for(var j=0;j<c.rowspan;j++){if(typeof(A[rn+j])=='undefined'){continue;}A[rn+j][cn]=c;for(var i=0;i<c.colspan;i++){A[rn+j][cn+i]=c;}}cn+=c.colspan;},this);rn++;},this);if(C){this.colWidths[0]=false;}return A;},mergeRight:function(){var tr=this.node.closest('tr');[m
[31m-var i=Array.prototype.indexOf.call(tr.childNodes,this.node);if(i>=tr.childNodes.length-1){return;}var A=this.toTableArray();if(typeof(A[this.cellData.row][this.cellData.col+this.cellData.colspan])=='undefined'){return;}var rc=A[this.cellData.row][this.cellData.col+this.cellData.colspan];[m
[31m-if(rc.rowspan!=this.cellData.rowspan||rc.row!=this.cellData.row){return;}this.node.innerHTML+=' '+rc.cell.innerHTML;tr.removeChild(rc.cell);this.colspan+=rc.colspan;this.node.setAttribute('colspan',this.colspan);},mergeBelow:function(){var A=this.toTableArray();[m
[31m-if(typeof(A[this.cellData.row+this.cellData.rowspan])=='undefined'){return;}if(typeof(A[this.cellData.row+this.cellData.rowspan][this.cellData.col])=='undefined'){return;}var rc=A[this.cellData.row+this.cellData.rowspan][this.cellData.col];if(rc.colspan!=this.cellData.colspan||rc.col!=this.cellData.col){return;[m
[31m-}this.node.innerHTML=this.node.innerHTML+rc.cell.innerHTML;rc.cell.parentNode.removeChild(rc.cell);this.rowspan+=rc.rowspan;this.node.setAttribute('rowspan',this.rowspan);},split:function(){if(this.node.rowSpan<2&&this.node.colSpan<2){return;}var A=this.toTableArray();[m
[31m-var cd=this.cellData;this.rowspan=1;this.colspan=1;for(var r=cd.row;r<cd.row+cd.rowspan;r++){for(var c=cd.col;c<cd.col+cd.colspan;c++){if(r==cd.row&&c==cd.col){this.node.removeAttribute('rowspan');this.node.removeAttribute('colspan');continue;}var B=this.node.cloneNode();[m
[31m-B.removeAttribute('id');B.innerHTML='';A[r][c]={cell:B,col:c,row:r,colspan:1,rowspan:1};}}this.redrawAllCells(A);},redrawAllCells:function(A){var B=this.node.closest('tr').closest('table');var C=B.rows[0].parentNode;Array.from(B.rows).forEach(function(r,ri){Array.from(r.cells).forEach(function(ce,ci){ce.parentNode.removeChild(ce);[m
[31m-});r.parentNode.removeChild(r);});for(var r=0;r<A.length;r++){var re=B.rows[r];var re=B.ownerDocument.createElement('tr');C.appendChild(re);for(var c=0;c<A[r].length;c++){if(A[r][c].cell===false){continue;}re.appendChild(A[r][c].cell);A[r][c].cell=false;}[m
[31m-}},updateWidths:function(A){for(var r=0;r<A.length;r++){for(var c=0;c<A[r].length;c++){if(A[r][c].cell===false){continue;}if(this.colWidths[0]!=false&&A[r][c].colspan<2){var el=Roo.htmleditor.Block.factory(A[r][c].cell);el.width=Math.floor(this.colWidths[c])+'%';[m
[31m-el.updateElement(el.node);}A[r][c].cell=false;}}},normalizeWidths:function(A){if(this.colWidths[0]===false){var nw=100.0/this.colWidths.length;this.colWidths.forEach(function(w,i){this.colWidths[i]=nw;},this);return;}var t=0,B=[];this.colWidths.forEach(function(w,i){this.colWidths[i]=this.colWidths[i]==''?0:(this.colWidths[i]+'').replace(/[^0-9]+/g,'')*1;[m
[31m-var D=this.colWidths[i];if(D>0){t+=D;return;}B.push(i);},this);var nc=this.colWidths.length;if(B.length){var C=(nc-B.length)/(1.0*nc);var t=C*t;var ew=(100-t)/(1.0*B.length);this.colWidths.forEach(function(w,i){if(w>0){this.colWidths[i]=w*C;return;}this.colWidths[i]=ew;[m
[31m-},this);}},shrinkColumn:function(){var A=this.toTableArray();this.normalizeWidths(A);var B=this.cellData.col;var nw=this.colWidths[B]*0.8;if(nw<5){return;}var C=(this.colWidths[B]*0.2)/(this.colWidths.length-1);this.colWidths.forEach(function(w,i){if(i==B){this.colWidths[i]=nw;[m
[31m-return;}this.colWidths[i]+=C},this);this.updateWidths(A);},growColumn:function(){var A=this.toTableArray();this.normalizeWidths(A);var B=this.cellData.col;var nw=this.colWidths[B]*1.2;if(nw>90){return;}var C=(this.colWidths[B]*0.2)/(this.colWidths.length-1);[m
[31m-this.colWidths.forEach(function(w,i){if(i==B){this.colWidths[i]=nw;return;}this.colWidths[i]-=C},this);this.updateWidths(A);},deleteRow:function(){var A=this.toTableArray();for(var i=0;i<A[this.cellData.row].length;i++){var c=A[this.cellData.row][i];if(c.row!=this.cellData.row){c.rowspan--;[m
[31m-c.cell.setAttribute('rowspan',c.rowspan);continue;}if(c.rowspan>1){c.rowspan--;c.cell.setAttribute('rowspan',c.rowspan);}}A.splice(this.cellData.row,1);this.redrawAllCells(A);},deleteColumn:function(){var A=this.toTableArray();for(var i=0;i<A.length;i++){var c=A[i][this.cellData.col];[m
[31m-if(c.col!=this.cellData.col){A[i][this.cellData.col].colspan--;}else if(c.colspan>1){c.colspan--;c.cell.setAttribute('colspan',c.colspan);}A[i].splice(this.cellData.col,1);}this.redrawAllCells(A);}})[m
[32m+[m[32mthis.rowspan=Math.max(1,1*A.getAttribute('rowspan'));this.html=A.innerHTML;},emptyCell:function(){return {colspan:1,rowspan:1,textAlign:'left',html:"&nbsp;"};},removeNode:function(){return this.node.closest('table');},cellData:false,colWidths:false,toTableArray:function(){console.log("htmleditor.BlockTd toTableArray ");[m
[32m+[m[32mvar A=[];var B=this.node.closest('tr').closest('table');Array.from(B.rows).forEach(function(r,ri){A[ri]=[];});var rn=0;this.colWidths=[];var C=true;Array.from(B.rows).forEach(function(r,ri){var cn=0;Array.from(r.cells).forEach(function(ce,ci){console.log("CELL");[m
[32m+[m[32mconsole.log(ce);var c={cell:ce,row:rn,col:cn,colspan:ce.colSpan,rowspan:ce.rowSpan};if(ce.isEqualNode(this.node)){this.cellData=c;}if(typeof(A[rn][cn])!='undefined'){while(typeof(A[rn][cn])!='undefined'){cn++;}c.col=cn;}if(typeof(this.colWidths[cn])=='undefined'&&c.colspan<2&&c.rowspan<2){this.colWidths[cn]=ce.style.width;[m
[32m+[m[32mif(this.colWidths[cn]!=''){C=false;}}if(c.colspan<2&&c.rowspan<2){A[rn][cn]=c;cn++;return;}for(var j=0;j<c.rowspan;j++){if(typeof(A[rn+j])=='undefined'){continue;}A[rn+j][cn]=c;for(var i=0;i<c.colspan;i++){A[rn+j][cn+i]=c;}}cn+=c.colspan;},this);rn++;},this);[m
[32m+[m[32mif(C){this.colWidths[0]=false;}return A;},mergeRight:function(){console.log("htmleditor.BlockTd mergeRight");var tr=this.node.closest('tr');var i=Array.prototype.indexOf.call(tr.childNodes,this.node);if(i>=tr.childNodes.length-1){return;}var A=this.toTableArray();[m
[32m+[m[32mconsole.log(A);if(typeof(A[this.cellData.row][this.cellData.col+this.cellData.colspan])=='undefined'){return;}var rc=A[this.cellData.row][this.cellData.col+this.cellData.colspan];if(rc.rowspan!=this.cellData.rowspan||rc.row!=this.cellData.row){return;}this.node.innerHTML+=' '+rc.cell.innerHTML;[m
[32m+[m[32mtr.removeChild(rc.cell);this.colspan+=rc.colspan;this.node.setAttribute('colspan',this.colspan);},mergeBelow:function(){var A=this.toTableArray();if(typeof(A[this.cellData.row+this.cellData.rowspan])=='undefined'){return;}if(typeof(A[this.cellData.row+this.cellData.rowspan][this.cellData.col])=='undefined'){return;[m
[32m+[m[32m}var rc=A[this.cellData.row+this.cellData.rowspan][this.cellData.col];if(rc.colspan!=this.cellData.colspan||rc.col!=this.cellData.col){return;}this.node.innerHTML=this.node.innerHTML+rc.cell.innerHTML;rc.cell.parentNode.removeChild(rc.cell);this.rowspan+=rc.rowspan;[m
[32m+[m[32mthis.node.setAttribute('rowspan',this.rowspan);},split:function(){if(this.node.rowSpan<2&&this.node.colSpan<2){return;}var A=this.toTableArray();var cd=this.cellData;this.rowspan=1;this.colspan=1;for(var r=cd.row;r<cd.row+cd.rowspan;r++){for(var c=cd.col;[m
[32m+[m[32mc<cd.col+cd.colspan;c++){if(r==cd.row&&c==cd.col){this.node.removeAttribute('rowspan');this.node.removeAttribute('colspan');continue;}var B=this.node.cloneNode();B.removeAttribute('id');B.innerHTML='';A[r][c]={cell:B,col:c,row:r,colspan:1,rowspan:1};}}this.redrawAllCells(A);[m
[32m+[m[32m},redrawAllCells:function(A){var B=this.node.closest('tr').closest('table');var C=B.rows[0].parentNode;Array.from(B.rows).forEach(function(r,ri){Array.from(r.cells).forEach(function(ce,ci){ce.parentNode.removeChild(ce);});r.parentNode.removeChild(r);});for(var r=0;[m
[32m+[m[32mr<A.length;r++){var re=B.rows[r];var re=B.ownerDocument.createElement('tr');C.appendChild(re);for(var c=0;c<A[r].length;c++){if(A[r][c].cell===false){continue;}re.appendChild(A[r][c].cell);A[r][c].cell=false;}}},updateWidths:function(A){for(var r=0;r<A.length;[m
[32m+[m[32mr++){for(var c=0;c<A[r].length;c++){if(A[r][c].cell===false){continue;}if(this.colWidths[0]!=false&&A[r][c].colspan<2){var el=Roo.htmleditor.Block.factory(A[r][c].cell);el.width=Math.floor(this.colWidths[c])+'%';el.updateElement(el.node);}A[r][c].cell=false;[m
[32m+[m[32m}}},normalizeWidths:function(A){console.log("htmleditor.BlockTd normalizeWidths");console.log(this.colWidths);if(this.colWidths[0]===false){var nw=100.0/this.colWidths.length;this.colWidths.forEach(function(w,i){this.colWidths[i]=nw;},this);return;}var t=0,B=[];[m
[32m+[m[32mthis.colWidths.forEach(function(w,i){this.colWidths[i]=this.colWidths[i]==''?0:(this.colWidths[i]+'').replace(/[^0-9]+/g,'')*1;var D=this.colWidths[i];if(D>0){t+=D;return;}B.push(i);},this);var nc=this.colWidths.length;if(B.length){var C=(nc-B.length)/(1.0*nc);[m
[32m+[m[32mvar t=C*t;var ew=(100-t)/(1.0*B.length);this.colWidths.forEach(function(w,i){if(w>0){this.colWidths[i]=w*C;return;}this.colWidths[i]=ew;},this);}},shrinkColumn:function(){var A=this.toTableArray();console.log(A);this.normalizeWidths(A);console.log(this.colWidths);[m
[32m+[m[32mvar B=this.cellData.col;var nw=this.colWidths[B]*0.8;if(nw<5){return;}var C=(this.colWidths[B]*0.2)/(this.colWidths.length-1);this.colWidths.forEach(function(w,i){if(i==B){this.colWidths[i]=nw;return;}this.colWidths[i]+=C},this);this.updateWidths(A);},growColumn:function(){var A=this.toTableArray();[m
[32m+[m[32mthis.normalizeWidths(A);var B=this.cellData.col;var nw=this.colWidths[B]*1.2;if(nw>90){return;}var C=(this.colWidths[B]*0.2)/(this.colWidths.length-1);this.colWidths.forEach(function(w,i){if(i==B){this.colWidths[i]=nw;return;}this.colWidths[i]-=C},this);this.updateWidths(A);[m
[32m+[m[32m},deleteRow:function(){var A=this.toTableArray();for(var i=0;i<A[this.cellData.row].length;i++){var c=A[this.cellData.row][i];if(c.row!=this.cellData.row){c.rowspan--;c.cell.setAttribute('rowspan',c.rowspan);continue;}if(c.rowspan>1){c.rowspan--;c.cell.setAttribute('rowspan',c.rowspan);[m
[32m+[m[32m}}A.splice(this.cellData.row,1);this.redrawAllCells(A);},deleteColumn:function(){var A=this.toTableArray();for(var i=0;i<A.length;i++){var c=A[i][this.cellData.col];if(c.col!=this.cellData.col){A[i][this.cellData.col].colspan--;}else if(c.colspan>1){c.colspan--;[m
[32m+[m[32mc.cell.setAttribute('colspan',c.colspan);}A[i].splice(this.cellData.col,1);}this.redrawAllCells(A);}})[m
 // Roo/HtmlEditorCore.js[m
 Roo.HtmlEditorCore=function(A){Roo.HtmlEditorCore.superclass.constructor.call(this,A);this.addEvents({initialize:true,activate:true,beforesync:true,beforepush:true,sync:true,push:true,editorevent:true});this.applyBlacklists();};Roo.extend(Roo.HtmlEditorCore,Roo.Component,{owner:false,resizable:false,height:300,width:500,autoClean:true,enableBlocks:true,stylesheets:false,language:'en',allowComments:false,frameId:false,validationEvent:false,deferHeight:true,initialized:false,activated:false,sourceEditMode:false,onFocus:Roo.emptyFn,iframePad:3,hideMode:'offsets',clearUp:true,black:false,white:false,bodyCls:'',undoManager:false,getDocMarkup:function(){var st='';[m
 if(this.stylesheets===false){Roo.get(document.head).select('style').each(function(B){st+=B.dom.outerHTML||new XMLSerializer().serializeToString(B.dom);});Roo.get(document.head).select('link').each(function(B){st+=B.dom.outerHTML||new XMLSerializer().serializeToString(B.dom);[m
[1mdiff --git a/roojs-debug.js b/roojs-debug.js[m
[1mindex 779fa0189f..f3f1ee678e 100644[m
[1m--- a/roojs-debug.js[m
[1m+++ b/roojs-debug.js[m
[36m@@ -49276,7 +49276,6 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
      */[m
     toObject : function()[m
     {[m
[31m-        [m
         var ret = {[m
             tag : 'td',[m
             contenteditable : 'true', // this stops cell selection from picking the table.[m
[36m@@ -49344,6 +49343,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     [m
     toTableArray  : function()[m
     {[m
[32m+[m[32m        console.log("htmleditor.BlockTd toTableArray ");[m
         var ret = [];[m
         var tab = this.node.closest('tr').closest('table');[m
         Array.from(tab.rows).forEach(function(r, ri){[m
[36m@@ -49356,6 +49356,8 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
             [m
             var cn = 0;[m
             Array.from(r.cells).forEach(function(ce, ci){[m
[32m+[m[32m                console.log("CELL");[m
[32m+[m[32m                console.log(ce);[m
                 var c =  {[m
                     cell : ce,[m
                     row : rn,[m
[36m@@ -49374,7 +49376,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
                     c.col = cn;[m
                 }[m
                 [m
[31m-                if (typeof(this.colWidths[cn]) == 'undefined') {[m
[32m+[m[32m                if (typeof(this.colWidths[cn]) == 'undefined' && c.colspan < 2 && c.rowspan < 2) {[m
                     this.colWidths[cn] =   ce.style.width;[m
                     if (this.colWidths[cn] != '') {[m
                         all_auto = false;[m
[36m@@ -49418,6 +49420,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     [m
     mergeRight: function()[m
     {[m
[32m+[m[32m        console.log("htmleditor.BlockTd mergeRight");[m
          [m
         // get the contents of the next cell along..[m
         var tr = this.node.closest('tr');[m
[36m@@ -49426,6 +49429,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
             return; // no cells on right to merge with.[m
         }[m
         var table = this.toTableArray();[m
[32m+[m[32m        console.log(table);[m
         [m
         if (typeof(table[this.cellData.row][this.cellData.col+this.cellData.colspan]) == 'undefined') {[m
             return; // nothing right?[m
[36m@@ -49443,6 +49447,11 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
         this.colspan += rc.colspan;[m
         this.node.setAttribute('colspan', this.colspan);[m
 [m
[32m+[m[32m        // var table = this.toTableArray();[m
[32m+[m[32m        // console.log(table);[m
[32m+[m[32m        // this.normalizeWidths(table);[m
[32m+[m[32m        // console.log(this.colWidths);[m
[32m+[m[32m        // this.updateWidths(table);[m
     },[m
     [m
     [m
[36m@@ -49497,8 +49506,6 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
         }[m
         this.redrawAllCells(table);[m
         [m
[31m-         [m
[31m-        [m
     },[m
     [m
     [m
[36m@@ -49547,13 +49554,23 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
                     el.width = Math.floor(this.colWidths[c])  +'%';[m
                     el.updateElement(el.node);[m
                 }[m
[32m+[m[32m                // else {[m
[32m+[m[32m                //     var el = Roo.htmleditor.Block.factory(table[r][c].cell);[m
[32m+[m[32m                //     var width = 0;[m
[32m+[m[32m                //     for(var i = 0; i < table[r][c].colspan; i ++) {[m
[32m+[m[32m                //         width += Math.floor(this.colWidths[c + i]);[m
[32m+[m[32m                //     }[m
[32m+[m[32m                //     el.width = width  +'%';[m
[32m+[m[32m                //     el.updateElement(el.node);[m
[32m+[m[32m                // }[m
                 table[r][c].cell = false; // done[m
             }[m
         }[m
     },[m
     normalizeWidths : function(table)[m
     {[m
[31m-    [m
[32m+[m[32m        console.log("htmleditor.BlockTd normalizeWidths");[m
[32m+[m[32m        console.log(this.colWidths);[m
         if (this.colWidths[0] === false) {[m
             var nw = 100.0 / this.colWidths.length;[m
             this.colWidths.forEach(function(w,i) {[m
[36m@@ -49600,7 +49617,9 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     shrinkColumn : function()[m
     {[m
         var table = this.toTableArray();[m
[32m+[m[32m        console.log(table);[m
         this.normalizeWidths(table);[m
[32m+[m[32m        console.log(this.colWidths);[m
         var col = this.cellData.col;[m
         var nw = this.colWidths[col] * 0.8;[m
         if (nw < 5) {[m
[1mdiff --git a/roojs-ui-debug.js b/roojs-ui-debug.js[m
[1mindex 6623fbfdb0..caaefa5960 100644[m
[1m--- a/roojs-ui-debug.js[m
[1m+++ b/roojs-ui-debug.js[m
[36m@@ -24784,7 +24784,6 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
      */[m
     toObject : function()[m
     {[m
[31m-        [m
         var ret = {[m
             tag : 'td',[m
             contenteditable : 'true', // this stops cell selection from picking the table.[m
[36m@@ -24852,6 +24851,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     [m
     toTableArray  : function()[m
     {[m
[32m+[m[32m        console.log("htmleditor.BlockTd toTableArray ");[m
         var ret = [];[m
         var tab = this.node.closest('tr').closest('table');[m
         Array.from(tab.rows).forEach(function(r, ri){[m
[36m@@ -24864,6 +24864,8 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
             [m
             var cn = 0;[m
             Array.from(r.cells).forEach(function(ce, ci){[m
[32m+[m[32m                console.log("CELL");[m
[32m+[m[32m                console.log(ce);[m
                 var c =  {[m
                     cell : ce,[m
                     row : rn,[m
[36m@@ -24882,7 +24884,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
                     c.col = cn;[m
                 }[m
                 [m
[31m-                if (typeof(this.colWidths[cn]) == 'undefined') {[m
[32m+[m[32m                if (typeof(this.colWidths[cn]) == 'undefined' && c.colspan < 2 && c.rowspan < 2) {[m
                     this.colWidths[cn] =   ce.style.width;[m
                     if (this.colWidths[cn] != '') {[m
                         all_auto = false;[m
[36m@@ -24926,6 +24928,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     [m
     mergeRight: function()[m
     {[m
[32m+[m[32m        console.log("htmleditor.BlockTd mergeRight");[m
          [m
         // get the contents of the next cell along..[m
         var tr = this.node.closest('tr');[m
[36m@@ -24934,6 +24937,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
             return; // no cells on right to merge with.[m
         }[m
         var table = this.toTableArray();[m
[32m+[m[32m        console.log(table);[m
         [m
         if (typeof(table[this.cellData.row][this.cellData.col+this.cellData.colspan]) == 'undefined') {[m
             return; // nothing right?[m
[36m@@ -24951,6 +24955,11 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
         this.colspan += rc.colspan;[m
         this.node.setAttribute('colspan', this.colspan);[m
 [m
[32m+[m[32m        // var table = this.toTableArray();[m
[32m+[m[32m        // console.log(table);[m
[32m+[m[32m        // this.normalizeWidths(table);[m
[32m+[m[32m        // console.log(this.colWidths);[m
[32m+[m[32m        // this.updateWidths(table);[m
     },[m
     [m
     [m
[36m@@ -25005,8 +25014,6 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
         }[m
         this.redrawAllCells(table);[m
         [m
[31m-         [m
[31m-        [m
     },[m
     [m
     [m
[36m@@ -25055,13 +25062,23 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
                     el.width = Math.floor(this.colWidths[c])  +'%';[m
                     el.updateElement(el.node);[m
                 }[m
[32m+[m[32m                // else {[m
[32m+[m[32m                //     var el = Roo.htmleditor.Block.factory(table[r][c].cell);[m
[32m+[m[32m                //     var width = 0;[m
[32m+[m[32m                //     for(var i = 0; i < table[r][c].colspan; i ++) {[m
[32m+[m[32m                //         width += Math.floor(this.colWidths[c + i]);[m
[32m+[m[32m                //     }[m
[32m+[m[32m                //     el.width = width  +'%';[m
[32m+[m[32m                //     el.updateElement(el.node);[m
[32m+[m[32m                // }[m
                 table[r][c].cell = false; // done[m
             }[m
         }[m
     },[m
     normalizeWidths : function(table)[m
     {[m
[31m-    [m
[32m+[m[32m        console.log("htmleditor.BlockTd normalizeWidths");[m
[32m+[m[32m        console.log(this.colWidths);[m
         if (this.colWidths[0] === false) {[m
             var nw = 100.0 / this.colWidths.length;[m
             this.colWidths.forEach(function(w,i) {[m
[36m@@ -25108,7 +25125,9 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     shrinkColumn : function()[m
     {[m
         var table = this.toTableArray();[m
[32m+[m[32m        console.log(table);[m
         this.normalizeWidths(table);[m
[32m+[m[32m        console.log(this.colWidths);[m
         var col = this.cellData.col;[m
         var nw = this.colWidths[col] * 0.8;[m
         if (nw < 5) {[m
[1mdiff --git a/roojs-ui.js b/roojs-ui.js[m
[1mindex 40ce72d195..adcd2fab96 100644[m
[1m--- a/roojs-ui.js[m
[1m+++ b/roojs-ui.js[m
[36m@@ -1093,25 +1093,27 @@[m [mB().deleteColumn();E();A.editorcore.selectNode(t.node);A.editorcore.onEditorEven[m
 ,{xtype:'Separator',xns:rooui.menu},{xtype:'Item',html:'Table',listeners:{click:function(G,e){var t=C();var nn=t.node.nextSibling||t.node.previousSibling;t.node.parentNode.removeChild(t.node);if(nn){A.editorcore.selectNode(nn,true);}A.editorcore.onEditorEvent();[m
 }},xns:rooui.menu}]}}];},toObject:function(){var A={tag:'td',contenteditable:'true','data-block':'Td',valign:this.valign,style:{'text-align':this.textAlign,border:'solid 1px rgb(0, 0, 0)','border-collapse':'collapse',padding:'6px','vertical-align':this.valign}[m
 ,html:this.html};if(this.width!=''){A.width=this.width;A.style.width=this.width;}if(this.colspan>1){A.colspan=this.colspan;}if(this.rowspan>1){A.rowspan=this.rowspan;}return A;},readElement:function(A){A=A?A:this.node;this.width=A.style.width;this.colspan=Math.max(1,1*A.getAttribute('colspan'));[m
[31m-this.rowspan=Math.max(1,1*A.getAttribute('rowspan'));this.html=A.innerHTML;},emptyCell:function(){return {colspan:1,rowspan:1,textAlign:'left',html:"&nbsp;"};},removeNode:function(){return this.node.closest('table');},cellData:false,colWidths:false,toTableArray:function(){var A=[];[m
[31m-var B=this.node.closest('tr').closest('table');Array.from(B.rows).forEach(function(r,ri){A[ri]=[];});var rn=0;this.colWidths=[];var C=true;Array.from(B.rows).forEach(function(r,ri){var cn=0;Array.from(r.cells).forEach(function(ce,ci){var c={cell:ce,row:rn,col:cn,colspan:ce.colSpan,rowspan:ce.rowSpan}[m
[31m-;if(ce.isEqualNode(this.node)){this.cellData=c;}if(typeof(A[rn][cn])!='undefined'){while(typeof(A[rn][cn])!='undefined'){cn++;}c.col=cn;}if(typeof(this.colWidths[cn])=='undefined'){this.colWidths[cn]=ce.style.width;if(this.colWidths[cn]!=''){C=false;}}if(c.colspan<2&&c.rowspan<2){A[rn][cn]=c;[m
[31m-cn++;return;}for(var j=0;j<c.rowspan;j++){if(typeof(A[rn+j])=='undefined'){continue;}A[rn+j][cn]=c;for(var i=0;i<c.colspan;i++){A[rn+j][cn+i]=c;}}cn+=c.colspan;},this);rn++;},this);if(C){this.colWidths[0]=false;}return A;},mergeRight:function(){var tr=this.node.closest('tr');[m
[31m-var i=Array.prototype.indexOf.call(tr.childNodes,this.node);if(i>=tr.childNodes.length-1){return;}var A=this.toTableArray();if(typeof(A[this.cellData.row][this.cellData.col+this.cellData.colspan])=='undefined'){return;}var rc=A[this.cellData.row][this.cellData.col+this.cellData.colspan];[m
[31m-if(rc.rowspan!=this.cellData.rowspan||rc.row!=this.cellData.row){return;}this.node.innerHTML+=' '+rc.cell.innerHTML;tr.removeChild(rc.cell);this.colspan+=rc.colspan;this.node.setAttribute('colspan',this.colspan);},mergeBelow:function(){var A=this.toTableArray();[m
[31m-if(typeof(A[this.cellData.row+this.cellData.rowspan])=='undefined'){return;}if(typeof(A[this.cellData.row+this.cellData.rowspan][this.cellData.col])=='undefined'){return;}var rc=A[this.cellData.row+this.cellData.rowspan][this.cellData.col];if(rc.colspan!=this.cellData.colspan||rc.col!=this.cellData.col){return;[m
[31m-}this.node.innerHTML=this.node.innerHTML+rc.cell.innerHTML;rc.cell.parentNode.removeChild(rc.cell);this.rowspan+=rc.rowspan;this.node.setAttribute('rowspan',this.rowspan);},split:function(){if(this.node.rowSpan<2&&this.node.colSpan<2){return;}var A=this.toTableArray();[m
[31m-var cd=this.cellData;this.rowspan=1;this.colspan=1;for(var r=cd.row;r<cd.row+cd.rowspan;r++){for(var c=cd.col;c<cd.col+cd.colspan;c++){if(r==cd.row&&c==cd.col){this.node.removeAttribute('rowspan');this.node.removeAttribute('colspan');continue;}var B=this.node.cloneNode();[m
[31m-B.removeAttribute('id');B.innerHTML='';A[r][c]={cell:B,col:c,row:r,colspan:1,rowspan:1};}}this.redrawAllCells(A);},redrawAllCells:function(A){var B=this.node.closest('tr').closest('table');var C=B.rows[0].parentNode;Array.from(B.rows).forEach(function(r,ri){Array.from(r.cells).forEach(function(ce,ci){ce.parentNode.removeChild(ce);[m
[31m-});r.parentNode.removeChild(r);});for(var r=0;r<A.length;r++){var re=B.rows[r];var re=B.ownerDocument.createElement('tr');C.appendChild(re);for(var c=0;c<A[r].length;c++){if(A[r][c].cell===false){continue;}re.appendChild(A[r][c].cell);A[r][c].cell=false;}[m
[31m-}},updateWidths:function(A){for(var r=0;r<A.length;r++){for(var c=0;c<A[r].length;c++){if(A[r][c].cell===false){continue;}if(this.colWidths[0]!=false&&A[r][c].colspan<2){var el=Roo.htmleditor.Block.factory(A[r][c].cell);el.width=Math.floor(this.colWidths[c])+'%';[m
[31m-el.updateElement(el.node);}A[r][c].cell=false;}}},normalizeWidths:function(A){if(this.colWidths[0]===false){var nw=100.0/this.colWidths.length;this.colWidths.forEach(function(w,i){this.colWidths[i]=nw;},this);return;}var t=0,B=[];this.colWidths.forEach(function(w,i){this.colWidths[i]=this.colWidths[i]==''?0:(this.colWidths[i]+'').replace(/[^0-9]+/g,'')*1;[m
[31m-var D=this.colWidths[i];if(D>0){t+=D;return;}B.push(i);},this);var nc=this.colWidths.length;if(B.length){var C=(nc-B.length)/(1.0*nc);var t=C*t;var ew=(100-t)/(1.0*B.length);this.colWidths.forEach(function(w,i){if(w>0){this.colWidths[i]=w*C;return;}this.colWidths[i]=ew;[m
[31m-},this);}},shrinkColumn:function(){var A=this.toTableArray();this.normalizeWidths(A);var B=this.cellData.col;var nw=this.colWidths[B]*0.8;if(nw<5){return;}var C=(this.colWidths[B]*0.2)/(this.colWidths.length-1);this.colWidths.forEach(function(w,i){if(i==B){this.colWidths[i]=nw;[m
[31m-return;}this.colWidths[i]+=C},this);this.updateWidths(A);},growColumn:function(){var A=this.toTableArray();this.normalizeWidths(A);var B=this.cellData.col;var nw=this.colWidths[B]*1.2;if(nw>90){return;}var C=(this.colWidths[B]*0.2)/(this.colWidths.length-1);[m
[31m-this.colWidths.forEach(function(w,i){if(i==B){this.colWidths[i]=nw;return;}this.colWidths[i]-=C},this);this.updateWidths(A);},deleteRow:function(){var A=this.toTableArray();for(var i=0;i<A[this.cellData.row].length;i++){var c=A[this.cellData.row][i];if(c.row!=this.cellData.row){c.rowspan--;[m
[31m-c.cell.setAttribute('rowspan',c.rowspan);continue;}if(c.rowspan>1){c.rowspan--;c.cell.setAttribute('rowspan',c.rowspan);}}A.splice(this.cellData.row,1);this.redrawAllCells(A);},deleteColumn:function(){var A=this.toTableArray();for(var i=0;i<A.length;i++){var c=A[i][this.cellData.col];[m
[31m-if(c.col!=this.cellData.col){A[i][this.cellData.col].colspan--;}else if(c.colspan>1){c.colspan--;c.cell.setAttribute('colspan',c.colspan);}A[i].splice(this.cellData.col,1);}this.redrawAllCells(A);}})[m
[32m+[m[32mthis.rowspan=Math.max(1,1*A.getAttribute('rowspan'));this.html=A.innerHTML;},emptyCell:function(){return {colspan:1,rowspan:1,textAlign:'left',html:"&nbsp;"};},removeNode:function(){return this.node.closest('table');},cellData:false,colWidths:false,toTableArray:function(){console.log("htmleditor.BlockTd toTableArray ");[m
[32m+[m[32mvar A=[];var B=this.node.closest('tr').closest('table');Array.from(B.rows).forEach(function(r,ri){A[ri]=[];});var rn=0;this.colWidths=[];var C=true;Array.from(B.rows).forEach(function(r,ri){var cn=0;Array.from(r.cells).forEach(function(ce,ci){console.log("CELL");[m
[32m+[m[32mconsole.log(ce);var c={cell:ce,row:rn,col:cn,colspan:ce.colSpan,rowspan:ce.rowSpan};if(ce.isEqualNode(this.node)){this.cellData=c;}if(typeof(A[rn][cn])!='undefined'){while(typeof(A[rn][cn])!='undefined'){cn++;}c.col=cn;}if(typeof(this.colWidths[cn])=='undefined'&&c.colspan<2&&c.rowspan<2){this.colWidths[cn]=ce.style.width;[m
[32m+[m[32mif(this.colWidths[cn]!=''){C=false;}}if(c.colspan<2&&c.rowspan<2){A[rn][cn]=c;cn++;return;}for(var j=0;j<c.rowspan;j++){if(typeof(A[rn+j])=='undefined'){continue;}A[rn+j][cn]=c;for(var i=0;i<c.colspan;i++){A[rn+j][cn+i]=c;}}cn+=c.colspan;},this);rn++;},this);[m
[32m+[m[32mif(C){this.colWidths[0]=false;}return A;},mergeRight:function(){console.log("htmleditor.BlockTd mergeRight");var tr=this.node.closest('tr');var i=Array.prototype.indexOf.call(tr.childNodes,this.node);if(i>=tr.childNodes.length-1){return;}var A=this.toTableArray();[m
[32m+[m[32mconsole.log(A);if(typeof(A[this.cellData.row][this.cellData.col+this.cellData.colspan])=='undefined'){return;}var rc=A[this.cellData.row][this.cellData.col+this.cellData.colspan];if(rc.rowspan!=this.cellData.rowspan||rc.row!=this.cellData.row){return;}this.node.innerHTML+=' '+rc.cell.innerHTML;[m
[32m+[m[32mtr.removeChild(rc.cell);this.colspan+=rc.colspan;this.node.setAttribute('colspan',this.colspan);},mergeBelow:function(){var A=this.toTableArray();if(typeof(A[this.cellData.row+this.cellData.rowspan])=='undefined'){return;}if(typeof(A[this.cellData.row+this.cellData.rowspan][this.cellData.col])=='undefined'){return;[m
[32m+[m[32m}var rc=A[this.cellData.row+this.cellData.rowspan][this.cellData.col];if(rc.colspan!=this.cellData.colspan||rc.col!=this.cellData.col){return;}this.node.innerHTML=this.node.innerHTML+rc.cell.innerHTML;rc.cell.parentNode.removeChild(rc.cell);this.rowspan+=rc.rowspan;[m
[32m+[m[32mthis.node.setAttribute('rowspan',this.rowspan);},split:function(){if(this.node.rowSpan<2&&this.node.colSpan<2){return;}var A=this.toTableArray();var cd=this.cellData;this.rowspan=1;this.colspan=1;for(var r=cd.row;r<cd.row+cd.rowspan;r++){for(var c=cd.col;[m
[32m+[m[32mc<cd.col+cd.colspan;c++){if(r==cd.row&&c==cd.col){this.node.removeAttribute('rowspan');this.node.removeAttribute('colspan');continue;}var B=this.node.cloneNode();B.removeAttribute('id');B.innerHTML='';A[r][c]={cell:B,col:c,row:r,colspan:1,rowspan:1};}}this.redrawAllCells(A);[m
[32m+[m[32m},redrawAllCells:function(A){var B=this.node.closest('tr').closest('table');var C=B.rows[0].parentNode;Array.from(B.rows).forEach(function(r,ri){Array.from(r.cells).forEach(function(ce,ci){ce.parentNode.removeChild(ce);});r.parentNode.removeChild(r);});for(var r=0;[m
[32m+[m[32mr<A.length;r++){var re=B.rows[r];var re=B.ownerDocument.createElement('tr');C.appendChild(re);for(var c=0;c<A[r].length;c++){if(A[r][c].cell===false){continue;}re.appendChild(A[r][c].cell);A[r][c].cell=false;}}},updateWidths:function(A){for(var r=0;r<A.length;[m
[32m+[m[32mr++){for(var c=0;c<A[r].length;c++){if(A[r][c].cell===false){continue;}if(this.colWidths[0]!=false&&A[r][c].colspan<2){var el=Roo.htmleditor.Block.factory(A[r][c].cell);el.width=Math.floor(this.colWidths[c])+'%';el.updateElement(el.node);}A[r][c].cell=false;[m
[32m+[m[32m}}},normalizeWidths:function(A){console.log("htmleditor.BlockTd normalizeWidths");console.log(this.colWidths);if(this.colWidths[0]===false){var nw=100.0/this.colWidths.length;this.colWidths.forEach(function(w,i){this.colWidths[i]=nw;},this);return;}var t=0,B=[];[m
[32m+[m[32mthis.colWidths.forEach(function(w,i){this.colWidths[i]=this.colWidths[i]==''?0:(this.colWidths[i]+'').replace(/[^0-9]+/g,'')*1;var D=this.colWidths[i];if(D>0){t+=D;return;}B.push(i);},this);var nc=this.colWidths.length;if(B.length){var C=(nc-B.length)/(1.0*nc);[m
[32m+[m[32mvar t=C*t;var ew=(100-t)/(1.0*B.length);this.colWidths.forEach(function(w,i){if(w>0){this.colWidths[i]=w*C;return;}this.colWidths[i]=ew;},this);}},shrinkColumn:function(){var A=this.toTableArray();console.log(A);this.normalizeWidths(A);console.log(this.colWidths);[m
[32m+[m[32mvar B=this.cellData.col;var nw=this.colWidths[B]*0.8;if(nw<5){return;}var C=(this.colWidths[B]*0.2)/(this.colWidths.length-1);this.colWidths.forEach(function(w,i){if(i==B){this.colWidths[i]=nw;return;}this.colWidths[i]+=C},this);this.updateWidths(A);},growColumn:function(){var A=this.toTableArray();[m
[32m+[m[32mthis.normalizeWidths(A);var B=this.cellData.col;var nw=this.colWidths[B]*1.2;if(nw>90){return;}var C=(this.colWidths[B]*0.2)/(this.colWidths.length-1);this.colWidths.forEach(function(w,i){if(i==B){this.colWidths[i]=nw;return;}this.colWidths[i]-=C},this);this.updateWidths(A);[m
[32m+[m[32m},deleteRow:function(){var A=this.toTableArray();for(var i=0;i<A[this.cellData.row].length;i++){var c=A[this.cellData.row][i];if(c.row!=this.cellData.row){c.rowspan--;c.cell.setAttribute('rowspan',c.rowspan);continue;}if(c.rowspan>1){c.rowspan--;c.cell.setAttribute('rowspan',c.rowspan);[m
[32m+[m[32m}}A.splice(this.cellData.row,1);this.redrawAllCells(A);},deleteColumn:function(){var A=this.toTableArray();for(var i=0;i<A.length;i++){var c=A[i][this.cellData.col];if(c.col!=this.cellData.col){A[i][this.cellData.col].colspan--;}else if(c.colspan>1){c.colspan--;[m
[32m+[m[32mc.cell.setAttribute('colspan',c.colspan);}A[i].splice(this.cellData.col,1);}this.redrawAllCells(A);}})[m
 // Roo/HtmlEditorCore.js[m
 Roo.HtmlEditorCore=function(A){Roo.HtmlEditorCore.superclass.constructor.call(this,A);this.addEvents({initialize:true,activate:true,beforesync:true,beforepush:true,sync:true,push:true,editorevent:true});this.applyBlacklists();};Roo.extend(Roo.HtmlEditorCore,Roo.Component,{owner:false,resizable:false,height:300,width:500,autoClean:true,enableBlocks:true,stylesheets:false,language:'en',allowComments:false,frameId:false,validationEvent:false,deferHeight:true,initialized:false,activated:false,sourceEditMode:false,onFocus:Roo.emptyFn,iframePad:3,hideMode:'offsets',clearUp:true,black:false,white:false,bodyCls:'',undoManager:false,getDocMarkup:function(){var st='';[m
 if(this.stylesheets===false){Roo.get(document.head).select('style').each(function(B){st+=B.dom.outerHTML||new XMLSerializer().serializeToString(B.dom);});Roo.get(document.head).select('link').each(function(B){st+=B.dom.outerHTML||new XMLSerializer().serializeToString(B.dom);[m
[1mdiff --git a/Roo/htmleditor/BlockTd.js b/Roo/htmleditor/BlockTd.js[m
[1mindex b6022caa76..90a7df25ad 100644[m
[1m--- a/Roo/htmleditor/BlockTd.js[m
[1m+++ b/Roo/htmleditor/BlockTd.js[m
[36m@@ -339,7 +339,6 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
      */[m
     toObject : function()[m
     {[m
[31m-        [m
         var ret = {[m
             tag : 'td',[m
             contenteditable : 'true', // this stops cell selection from picking the table.[m
[36m@@ -407,6 +406,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     [m
     toTableArray  : function()[m
     {[m
[32m+[m[32m        console.log("htmleditor.BlockTd toTableArray ");[m
         var ret = [];[m
         var tab = this.node.closest('tr').closest('table');[m
         Array.from(tab.rows).forEach(function(r, ri){[m
[36m@@ -419,6 +419,8 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
             [m
             var cn = 0;[m
             Array.from(r.cells).forEach(function(ce, ci){[m
[32m+[m[32m                console.log("CELL");[m
[32m+[m[32m                console.log(ce);[m
                 var c =  {[m
                     cell : ce,[m
                     row : rn,[m
[36m@@ -437,7 +439,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
                     c.col = cn;[m
                 }[m
                 [m
[31m-                if (typeof(this.colWidths[cn]) == 'undefined') {[m
[32m+[m[32m                if (typeof(this.colWidths[cn]) == 'undefined' && c.colspan < 2 && c.rowspan < 2) {[m
                     this.colWidths[cn] =   ce.style.width;[m
                     if (this.colWidths[cn] != '') {[m
                         all_auto = false;[m
[36m@@ -481,6 +483,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     [m
     mergeRight: function()[m
     {[m
[32m+[m[32m        console.log("htmleditor.BlockTd mergeRight");[m
          [m
         // get the contents of the next cell along..[m
         var tr = this.node.closest('tr');[m
[36m@@ -489,6 +492,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
             return; // no cells on right to merge with.[m
         }[m
         var table = this.toTableArray();[m
[32m+[m[32m        console.log(table);[m
         [m
         if (typeof(table[this.cellData.row][this.cellData.col+this.cellData.colspan]) == 'undefined') {[m
             return; // nothing right?[m
[36m@@ -506,6 +510,9 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
         this.colspan += rc.colspan;[m
         this.node.setAttribute('colspan', this.colspan);[m
 [m
[32m+[m[32m        var table = this.toTableArray();[m
[32m+[m[32m        this.normalizeWidths(table);[m
[32m+[m[32m        this.updateWidths(table);[m
     },[m
     [m
     [m
[36m@@ -560,8 +567,6 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
         }[m
         this.redrawAllCells(table);[m
         [m
[31m-         [m
[31m-        [m
     },[m
     [m
     [m
[36m@@ -610,13 +615,23 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
                     el.width = Math.floor(this.colWidths[c])  +'%';[m
                     el.updateElement(el.node);[m
                 }[m
[32m+[m[32m                if (this.colWidths[0] != false && table[r][c].colspan > 1) {[m
[32m+[m[32m                    var el = Roo.htmleditor.Block.factory(table[r][c].cell);[m
[32m+[m[32m                    var width = 0;[m
[32m+[m[32m                    for(var i = 0; i < table[r][c].colspan; i ++) {[m
[32m+[m[32m                        width += Math.floor(this.colWidths[c + i]);[m
[32m+[m[32m                    }[m
[32m+[m[32m                    el.width = width  +'%';[m
[32m+[m[32m                    el.updateElement(el.node);[m
[32m+[m[32m                }[m
                 table[r][c].cell = false; // done[m
             }[m
         }[m
     },[m
     normalizeWidths : function(table)[m
     {[m
[31m-    [m
[32m+[m[32m        console.log("htmleditor.BlockTd normalizeWidths");[m
[32m+[m[32m        console.log(this.colWidths);[m
         if (this.colWidths[0] === false) {[m
             var nw = 100.0 / this.colWidths.length;[m
             this.colWidths.forEach(function(w,i) {[m
[36m@@ -663,7 +678,9 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     shrinkColumn : function()[m
     {[m
         var table = this.toTableArray();[m
[32m+[m[32m        console.log(table);[m
         this.normalizeWidths(table);[m
[32m+[m[32m        console.log(this.colWidths);[m
         var col = this.cellData.col;[m
         var nw = this.colWidths[col] * 0.8;[m
         if (nw < 5) {[m
[1mdiff --git a/roojs-all.js b/roojs-all.js[m
[1mindex 39a3e49f52..44dd3d9f7d 100644[m
[1m--- a/roojs-all.js[m
[1m+++ b/roojs-all.js[m
[36m@@ -2039,25 +2039,28 @@[m [mB().deleteColumn();E();A.editorcore.selectNode(t.node);A.editorcore.onEditorEven[m
 ,{xtype:'Separator',xns:rooui.menu},{xtype:'Item',html:'Table',listeners:{click:function(G,e){var t=C();var nn=t.node.nextSibling||t.node.previousSibling;t.node.parentNode.removeChild(t.node);if(nn){A.editorcore.selectNode(nn,true);}A.editorcore.onEditorEvent();[m
 }},xns:rooui.menu}]}}];},toObject:function(){var A={tag:'td',contenteditable:'true','data-block':'Td',valign:this.valign,style:{'text-align':this.textAlign,border:'solid 1px rgb(0, 0, 0)','border-collapse':'collapse',padding:'6px','vertical-align':this.valign}[m
 ,html:this.html};if(this.width!=''){A.width=this.width;A.style.width=this.width;}if(this.colspan>1){A.colspan=this.colspan;}if(this.rowspan>1){A.rowspan=this.rowspan;}return A;},readElement:function(A){A=A?A:this.node;this.width=A.style.width;this.colspan=Math.max(1,1*A.getAttribute('colspan'));[m
[31m-this.rowspan=Math.max(1,1*A.getAttribute('rowspan'));this.html=A.innerHTML;},emptyCell:function(){return {colspan:1,rowspan:1,textAlign:'left',html:"&nbsp;"};},removeNode:function(){return this.node.closest('table');},cellData:false,colWidths:false,toTableArray:function(){var A=[];[m
[31m-var B=this.node.closest('tr').closest('table');Array.from(B.rows).forEach(function(r,ri){A[ri]=[];});var rn=0;this.colWidths=[];var C=true;Array.from(B.rows).forEach(function(r,ri){var cn=0;Array.from(r.cells).forEach(function(ce,ci){var c={cell:ce,row:rn,col:cn,colspan:ce.colSpan,rowspan:ce.rowSpan}[m
[31m-;if(ce.isEqualNode(this.node)){this.cellData=c;}if(typeof(A[rn][cn])!='undefined'){while(typeof(A[rn][cn])!='undefined'){cn++;}c.col=cn;}if(typeof(this.colWidths[cn])=='undefined'){this.colWidths[cn]=ce.style.width;if(this.colWidths[cn]!=''){C=false;}}if(c.colspan<2&&c.rowspan<2){A[rn][cn]=c;[m
[31m-cn++;return;}for(var j=0;j<c.rowspan;j++){if(typeof(A[rn+j])=='undefined'){continue;}A[rn+j][cn]=c;for(var i=0;i<c.colspan;i++){A[rn+j][cn+i]=c;}}cn+=c.colspan;},this);rn++;},this);if(C){this.colWidths[0]=false;}return A;},mergeRight:function(){var tr=this.node.closest('tr');[m
[31m-var i=Array.prototype.indexOf.call(tr.childNodes,this.node);if(i>=tr.childNodes.length-1){return;}var A=this.toTableArray();if(typeof(A[this.cellData.row][this.cellData.col+this.cellData.colspan])=='undefined'){return;}var rc=A[this.cellData.row][this.cellData.col+this.cellData.colspan];[m
[31m-if(rc.rowspan!=this.cellData.rowspan||rc.row!=this.cellData.row){return;}this.node.innerHTML+=' '+rc.cell.innerHTML;tr.removeChild(rc.cell);this.colspan+=rc.colspan;this.node.setAttribute('colspan',this.colspan);},mergeBelow:function(){var A=this.toTableArray();[m
[31m-if(typeof(A[this.cellData.row+this.cellData.rowspan])=='undefined'){return;}if(typeof(A[this.cellData.row+this.cellData.rowspan][this.cellData.col])=='undefined'){return;}var rc=A[this.cellData.row+this.cellData.rowspan][this.cellData.col];if(rc.colspan!=this.cellData.colspan||rc.col!=this.cellData.col){return;[m
[31m-}this.node.innerHTML=this.node.innerHTML+rc.cell.innerHTML;rc.cell.parentNode.removeChild(rc.cell);this.rowspan+=rc.rowspan;this.node.setAttribute('rowspan',this.rowspan);},split:function(){if(this.node.rowSpan<2&&this.node.colSpan<2){return;}var A=this.toTableArray();[m
[31m-var cd=this.cellData;this.rowspan=1;this.colspan=1;for(var r=cd.row;r<cd.row+cd.rowspan;r++){for(var c=cd.col;c<cd.col+cd.colspan;c++){if(r==cd.row&&c==cd.col){this.node.removeAttribute('rowspan');this.node.removeAttribute('colspan');continue;}var B=this.node.cloneNode();[m
[31m-B.removeAttribute('id');B.innerHTML='';A[r][c]={cell:B,col:c,row:r,colspan:1,rowspan:1};}}this.redrawAllCells(A);},redrawAllCells:function(A){var B=this.node.closest('tr').closest('table');var C=B.rows[0].parentNode;Array.from(B.rows).forEach(function(r,ri){Array.from(r.cells).forEach(function(ce,ci){ce.parentNode.removeChild(ce);[m
[32m+[m[32mthis.rowspan=Math.max(1,1*A.getAttribute('rowspan'));this.html=A.innerHTML;},emptyCell:function(){return {colspan:1,rowspan:1,textAlign:'left',html:"&nbsp;"};},removeNode:function(){return this.node.closest('table');},cellData:false,colWidths:false,toTableArray:function(){console.log("htmleditor.BlockTd toTableArray ");[m
[32m+[m[32mvar A=[];var B=this.node.closest('tr').closest('table');Array.from(B.rows).forEach(function(r,ri){A[ri]=[];});var rn=0;this.colWidths=[];var C=true;Array.from(B.rows).forEach(function(r,ri){var cn=0;Array.from(r.cells).forEach(function(ce,ci){console.log("CELL");[m
[32m+[m[32mconsole.log(ce);var c={cell:ce,row:rn,col:cn,colspan:ce.colSpan,rowspan:ce.rowSpan};if(ce.isEqualNode(this.node)){this.cellData=c;}if(typeof(A[rn][cn])!='undefined'){while(typeof(A[rn][cn])!='undefined'){cn++;}c.col=cn;}if(typeof(this.colWidths[cn])=='undefined'&&c.colspan<2&&c.rowspan<2){this.colWidths[cn]=ce.style.width;[m
[32m+[m[32mif(this.colWidths[cn]!=''){C=false;}}if(c.colspan<2&&c.rowspan<2){A[rn][cn]=c;cn++;return;}for(var j=0;j<c.rowspan;j++){if(typeof(A[rn+j])=='undefined'){continue;}A[rn+j][cn]=c;for(var i=0;i<c.colspan;i++){A[rn+j][cn+i]=c;}}cn+=c.colspan;},this);rn++;},this);[m
[32m+[m[32mif(C){this.colWidths[0]=false;}return A;},mergeRight:function(){console.log("htmleditor.BlockTd mergeRight");var tr=this.node.closest('tr');var i=Array.prototype.indexOf.call(tr.childNodes,this.node);if(i>=tr.childNodes.length-1){return;}var A=this.toTableArray();[m
[32m+[m[32mconsole.log(A);if(typeof(A[this.cellData.row][this.cellData.col+this.cellData.colspan])=='undefined'){return;}var rc=A[this.cellData.row][this.cellData.col+this.cellData.colspan];if(rc.rowspan!=this.cellData.rowspan||rc.row!=this.cellData.row){return;}this.node.innerHTML+=' '+rc.cell.innerHTML;[m
[32m+[m[32mtr.removeChild(rc.cell);this.colspan+=rc.colspan;this.node.setAttribute('colspan',this.colspan);var A=this.toTableArray();this.normalizeWidths(A);this.updateWidths(A);},mergeBelow:function(){var A=this.toTableArray();if(typeof(A[this.cellData.row+this.cellData.rowspan])=='undefined'){return;[m
[32m+[m[32m}if(typeof(A[this.cellData.row+this.cellData.rowspan][this.cellData.col])=='undefined'){return;}var rc=A[this.cellData.row+this.cellData.rowspan][this.cellData.col];if(rc.colspan!=this.cellData.colspan||rc.col!=this.cellData.col){return;}this.node.innerHTML=this.node.innerHTML+rc.cell.innerHTML;[m
[32m+[m[32mrc.cell.parentNode.removeChild(rc.cell);this.rowspan+=rc.rowspan;this.node.setAttribute('rowspan',this.rowspan);},split:function(){if(this.node.rowSpan<2&&this.node.colSpan<2){return;}var A=this.toTableArray();var cd=this.cellData;this.rowspan=1;this.colspan=1;[m
[32m+[m[32mfor(var r=cd.row;r<cd.row+cd.rowspan;r++){for(var c=cd.col;c<cd.col+cd.colspan;c++){if(r==cd.row&&c==cd.col){this.node.removeAttribute('rowspan');this.node.removeAttribute('colspan');continue;}var B=this.node.cloneNode();B.removeAttribute('id');B.innerHTML='';[m
[32m+[m[32mA[r][c]={cell:B,col:c,row:r,colspan:1,rowspan:1};}}this.redrawAllCells(A);},redrawAllCells:function(A){var B=this.node.closest('tr').closest('table');var C=B.rows[0].parentNode;Array.from(B.rows).forEach(function(r,ri){Array.from(r.cells).forEach(function(ce,ci){ce.parentNode.removeChild(ce);[m
 });r.parentNode.removeChild(r);});for(var r=0;r<A.length;r++){var re=B.rows[r];var re=B.ownerDocument.createElement('tr');C.appendChild(re);for(var c=0;c<A[r].length;c++){if(A[r][c].cell===false){continue;}re.appendChild(A[r][c].cell);A[r][c].cell=false;}[m
 }},updateWidths:function(A){for(var r=0;r<A.length;r++){for(var c=0;c<A[r].length;c++){if(A[r][c].cell===false){continue;}if(this.colWidths[0]!=false&&A[r][c].colspan<2){var el=Roo.htmleditor.Block.factory(A[r][c].cell);el.width=Math.floor(this.colWidths[c])+'%';[m
[31m-el.updateElement(el.node);}A[r][c].cell=false;}}},normalizeWidths:function(A){if(this.colWidths[0]===false){var nw=100.0/this.colWidths.length;this.colWidths.forEach(function(w,i){this.colWidths[i]=nw;},this);return;}var t=0,B=[];this.colWidths.forEach(function(w,i){this.colWidths[i]=this.colWidths[i]==''?0:(this.colWidths[i]+'').replace(/[^0-9]+/g,'')*1;[m
[31m-var D=this.colWidths[i];if(D>0){t+=D;return;}B.push(i);},this);var nc=this.colWidths.length;if(B.length){var C=(nc-B.length)/(1.0*nc);var t=C*t;var ew=(100-t)/(1.0*B.length);this.colWidths.forEach(function(w,i){if(w>0){this.colWidths[i]=w*C;return;}this.colWidths[i]=ew;[m
[31m-},this);}},shrinkColumn:function(){var A=this.toTableArray();this.normalizeWidths(A);var B=this.cellData.col;var nw=this.colWidths[B]*0.8;if(nw<5){return;}var C=(this.colWidths[B]*0.2)/(this.colWidths.length-1);this.colWidths.forEach(function(w,i){if(i==B){this.colWidths[i]=nw;[m
[31m-return;}this.colWidths[i]+=C},this);this.updateWidths(A);},growColumn:function(){var A=this.toTableArray();this.normalizeWidths(A);var B=this.cellData.col;var nw=this.colWidths[B]*1.2;if(nw>90){return;}var C=(this.colWidths[B]*0.2)/(this.colWidths.length-1);[m
[31m-this.colWidths.forEach(function(w,i){if(i==B){this.colWidths[i]=nw;return;}this.colWidths[i]-=C},this);this.updateWidths(A);},deleteRow:function(){var A=this.toTableArray();for(var i=0;i<A[this.cellData.row].length;i++){var c=A[this.cellData.row][i];if(c.row!=this.cellData.row){c.rowspan--;[m
[31m-c.cell.setAttribute('rowspan',c.rowspan);continue;}if(c.rowspan>1){c.rowspan--;c.cell.setAttribute('rowspan',c.rowspan);}}A.splice(this.cellData.row,1);this.redrawAllCells(A);},deleteColumn:function(){var A=this.toTableArray();for(var i=0;i<A.length;i++){var c=A[i][this.cellData.col];[m
[31m-if(c.col!=this.cellData.col){A[i][this.cellData.col].colspan--;}else if(c.colspan>1){c.colspan--;c.cell.setAttribute('colspan',c.colspan);}A[i].splice(this.cellData.col,1);}this.redrawAllCells(A);}})[m
[32m+[m[32mel.updateElement(el.node);}if(this.colWidths[0]!=false&&A[r][c].colspan>1){var el=Roo.htmleditor.Block.factory(A[r][c].cell);var B=0;for(var i=0;i<A[r][c].colspan;i++){B+=Math.floor(this.colWidths[c+i]);}el.width=B+'%';el.updateElement(el.node);}A[r][c].cell=false;[m
[32m+[m[32m}}},normalizeWidths:function(A){console.log("htmleditor.BlockTd normalizeWidths");console.log(this.colWidths);if(this.colWidths[0]===false){var nw=100.0/this.colWidths.length;this.colWidths.forEach(function(w,i){this.colWidths[i]=nw;},this);return;}var t=0,B=[];[m
[32m+[m[32mthis.colWidths.forEach(function(w,i){this.colWidths[i]=this.colWidths[i]==''?0:(this.colWidths[i]+'').replace(/[^0-9]+/g,'')*1;var D=this.colWidths[i];if(D>0){t+=D;return;}B.push(i);},this);var nc=this.colWidths.length;if(B.length){var C=(nc-B.length)/(1.0*nc);[m
[32m+[m[32mvar t=C*t;var ew=(100-t)/(1.0*B.length);this.colWidths.forEach(function(w,i){if(w>0){this.colWidths[i]=w*C;return;}this.colWidths[i]=ew;},this);}},shrinkColumn:function(){var A=this.toTableArray();console.log(A);this.normalizeWidths(A);console.log(this.colWidths);[m
[32m+[m[32mvar B=this.cellData.col;var nw=this.colWidths[B]*0.8;if(nw<5){return;}var C=(this.colWidths[B]*0.2)/(this.colWidths.length-1);this.colWidths.forEach(function(w,i){if(i==B){this.colWidths[i]=nw;return;}this.colWidths[i]+=C},this);this.updateWidths(A);},growColumn:function(){var A=this.toTableArray();[m
[32m+[m[32mthis.normalizeWidths(A);var B=this.cellData.col;var nw=this.colWidths[B]*1.2;if(nw>90){return;}var C=(this.colWidths[B]*0.2)/(this.colWidths.length-1);this.colWidths.forEach(function(w,i){if(i==B){this.colWidths[i]=nw;return;}this.colWidths[i]-=C},this);this.updateWidths(A);[m
[32m+[m[32m},deleteRow:function(){var A=this.toTableArray();for(var i=0;i<A[this.cellData.row].length;i++){var c=A[this.cellData.row][i];if(c.row!=this.cellData.row){c.rowspan--;c.cell.setAttribute('rowspan',c.rowspan);continue;}if(c.rowspan>1){c.rowspan--;c.cell.setAttribute('rowspan',c.rowspan);[m
[32m+[m[32m}}A.splice(this.cellData.row,1);this.redrawAllCells(A);},deleteColumn:function(){var A=this.toTableArray();for(var i=0;i<A.length;i++){var c=A[i][this.cellData.col];if(c.col!=this.cellData.col){A[i][this.cellData.col].colspan--;}else if(c.colspan>1){c.colspan--;[m
[32m+[m[32mc.cell.setAttribute('colspan',c.colspan);}A[i].splice(this.cellData.col,1);}this.redrawAllCells(A);}})[m
 // Roo/HtmlEditorCore.js[m
 Roo.HtmlEditorCore=function(A){Roo.HtmlEditorCore.superclass.constructor.call(this,A);this.addEvents({initialize:true,activate:true,beforesync:true,beforepush:true,sync:true,push:true,editorevent:true});this.applyBlacklists();};Roo.extend(Roo.HtmlEditorCore,Roo.Component,{owner:false,resizable:false,height:300,width:500,autoClean:true,enableBlocks:true,stylesheets:false,language:'en',allowComments:false,frameId:false,validationEvent:false,deferHeight:true,initialized:false,activated:false,sourceEditMode:false,onFocus:Roo.emptyFn,iframePad:3,hideMode:'offsets',clearUp:true,black:false,white:false,bodyCls:'',undoManager:false,getDocMarkup:function(){var st='';[m
 if(this.stylesheets===false){Roo.get(document.head).select('style').each(function(B){st+=B.dom.outerHTML||new XMLSerializer().serializeToString(B.dom);});Roo.get(document.head).select('link').each(function(B){st+=B.dom.outerHTML||new XMLSerializer().serializeToString(B.dom);[m
[1mdiff --git a/roojs-debug.js b/roojs-debug.js[m
[1mindex 779fa0189f..ed0e0542c0 100644[m
[1m--- a/roojs-debug.js[m
[1m+++ b/roojs-debug.js[m
[36m@@ -49276,7 +49276,6 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
      */[m
     toObject : function()[m
     {[m
[31m-        [m
         var ret = {[m
             tag : 'td',[m
             contenteditable : 'true', // this stops cell selection from picking the table.[m
[36m@@ -49344,6 +49343,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     [m
     toTableArray  : function()[m
     {[m
[32m+[m[32m        console.log("htmleditor.BlockTd toTableArray ");[m
         var ret = [];[m
         var tab = this.node.closest('tr').closest('table');[m
         Array.from(tab.rows).forEach(function(r, ri){[m
[36m@@ -49356,6 +49356,8 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
             [m
             var cn = 0;[m
             Array.from(r.cells).forEach(function(ce, ci){[m
[32m+[m[32m                console.log("CELL");[m
[32m+[m[32m                console.log(ce);[m
                 var c =  {[m
                     cell : ce,[m
                     row : rn,[m
[36m@@ -49374,7 +49376,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
                     c.col = cn;[m
                 }[m
                 [m
[31m-                if (typeof(this.colWidths[cn]) == 'undefined') {[m
[32m+[m[32m                if (typeof(this.colWidths[cn]) == 'undefined' && c.colspan < 2 && c.rowspan < 2) {[m
                     this.colWidths[cn] =   ce.style.width;[m
                     if (this.colWidths[cn] != '') {[m
                         all_auto = false;[m
[36m@@ -49418,6 +49420,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     [m
     mergeRight: function()[m
     {[m
[32m+[m[32m        console.log("htmleditor.BlockTd mergeRight");[m
          [m
         // get the contents of the next cell along..[m
         var tr = this.node.closest('tr');[m
[36m@@ -49426,6 +49429,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
             return; // no cells on right to merge with.[m
         }[m
         var table = this.toTableArray();[m
[32m+[m[32m        console.log(table);[m
         [m
         if (typeof(table[this.cellData.row][this.cellData.col+this.cellData.colspan]) == 'undefined') {[m
             return; // nothing right?[m
[36m@@ -49443,6 +49447,9 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
         this.colspan += rc.colspan;[m
         this.node.setAttribute('colspan', this.colspan);[m
 [m
[32m+[m[32m        var table = this.toTableArray();[m
[32m+[m[32m        this.normalizeWidths(table);[m
[32m+[m[32m        this.updateWidths(table);[m
     },[m
     [m
     [m
[36m@@ -49497,8 +49504,6 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
         }[m
         this.redrawAllCells(table);[m
         [m
[31m-         [m
[31m-        [m
     },[m
     [m
     [m
[36m@@ -49547,13 +49552,23 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
                     el.width = Math.floor(this.colWidths[c])  +'%';[m
                     el.updateElement(el.node);[m
                 }[m
[32m+[m[32m                if (this.colWidths[0] != false && table[r][c].colspan > 1) {[m
[32m+[m[32m                    var el = Roo.htmleditor.Block.factory(table[r][c].cell);[m
[32m+[m[32m                    var width = 0;[m
[32m+[m[32m                    for(var i = 0; i < table[r][c].colspan; i ++) {[m
[32m+[m[32m                        width += Math.floor(this.colWidths[c + i]);[m
[32m+[m[32m                    }[m
[32m+[m[32m                    el.width = width  +'%';[m
[32m+[m[32m                    el.updateElement(el.node);[m
[32m+[m[32m                }[m
                 table[r][c].cell = false; // done[m
             }[m
         }[m
     },[m
     normalizeWidths : function(table)[m
     {[m
[31m-    [m
[32m+[m[32m        console.log("htmleditor.BlockTd normalizeWidths");[m
[32m+[m[32m        console.log(this.colWidths);[m
         if (this.colWidths[0] === false) {[m
             var nw = 100.0 / this.colWidths.length;[m
             this.colWidths.forEach(function(w,i) {[m
[36m@@ -49600,7 +49615,9 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     shrinkColumn : function()[m
     {[m
         var table = this.toTableArray();[m
[32m+[m[32m        console.log(table);[m
         this.normalizeWidths(table);[m
[32m+[m[32m        console.log(this.colWidths);[m
         var col = this.cellData.col;[m
         var nw = this.colWidths[col] * 0.8;[m
         if (nw < 5) {[m
[1mdiff --git a/roojs-ui-debug.js b/roojs-ui-debug.js[m
[1mindex 6623fbfdb0..3301c8a150 100644[m
[1m--- a/roojs-ui-debug.js[m
[1m+++ b/roojs-ui-debug.js[m
[36m@@ -24784,7 +24784,6 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
      */[m
     toObject : function()[m
     {[m
[31m-        [m
         var ret = {[m
             tag : 'td',[m
             contenteditable : 'true', // this stops cell selection from picking the table.[m
[36m@@ -24852,6 +24851,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     [m
     toTableArray  : function()[m
     {[m
[32m+[m[32m        console.log("htmleditor.BlockTd toTableArray ");[m
         var ret = [];[m
         var tab = this.node.closest('tr').closest('table');[m
         Array.from(tab.rows).forEach(function(r, ri){[m
[36m@@ -24864,6 +24864,8 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
             [m
             var cn = 0;[m
             Array.from(r.cells).forEach(function(ce, ci){[m
[32m+[m[32m                console.log("CELL");[m
[32m+[m[32m                console.log(ce);[m
                 var c =  {[m
                     cell : ce,[m
                     row : rn,[m
[36m@@ -24882,7 +24884,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
                     c.col = cn;[m
                 }[m
                 [m
[31m-                if (typeof(this.colWidths[cn]) == 'undefined') {[m
[32m+[m[32m                if (typeof(this.colWidths[cn]) == 'undefined' && c.colspan < 2 && c.rowspan < 2) {[m
                     this.colWidths[cn] =   ce.style.width;[m
                     if (this.colWidths[cn] != '') {[m
                         all_auto = false;[m
[36m@@ -24926,6 +24928,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     [m
     mergeRight: function()[m
     {[m
[32m+[m[32m        console.log("htmleditor.BlockTd mergeRight");[m
          [m
         // get the contents of the next cell along..[m
         var tr = this.node.closest('tr');[m
[36m@@ -24934,6 +24937,7 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
             return; // no cells on right to merge with.[m
         }[m
         var table = this.toTableArray();[m
[32m+[m[32m        console.log(table);[m
         [m
         if (typeof(table[this.cellData.row][this.cellData.col+this.cellData.colspan]) == 'undefined') {[m
             return; // nothing right?[m
[36m@@ -24951,6 +24955,9 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
         this.colspan += rc.colspan;[m
         this.node.setAttribute('colspan', this.colspan);[m
 [m
[32m+[m[32m        var table = this.toTableArray();[m
[32m+[m[32m        this.normalizeWidths(table);[m
[32m+[m[32m        this.updateWidths(table);[m
     },[m
     [m
     [m
[36m@@ -25005,8 +25012,6 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
         }[m
         this.redrawAllCells(table);[m
         [m
[31m-         [m
[31m-        [m
     },[m
     [m
     [m
[36m@@ -25055,13 +25060,23 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
                     el.width = Math.floor(this.colWidths[c])  +'%';[m
                     el.updateElement(el.node);[m
                 }[m
[32m+[m[32m                if (this.colWidths[0] != false && table[r][c].colspan > 1) {[m
[32m+[m[32m                    var el = Roo.htmleditor.Block.factory(table[r][c].cell);[m
[32m+[m[32m                    var width = 0;[m
[32m+[m[32m                    for(var i = 0; i < table[r][c].colspan; i ++) {[m
[32m+[m[32m                        width += Math.floor(this.colWidths[c + i]);[m
[32m+[m[32m                    }[m
[32m+[m[32m                    el.width = width  +'%';[m
[32m+[m[32m                    el.updateElement(el.node);[m
[32m+[m[32m                }[m
                 table[r][c].cell = false; // done[m
             }[m
         }[m
     },[m
     normalizeWidths : function(table)[m
     {[m
[31m-    [m
[32m+[m[32m        console.log("htmleditor.BlockTd normalizeWidths");[m
[32m+[m[32m        console.log(this.colWidths);[m
         if (this.colWidths[0] === false) {[m
             var nw = 100.0 / this.colWidths.length;[m
             this.colWidths.forEach(function(w,i) {[m
[36m@@ -25108,7 +25123,9 @@[m [mRoo.extend(Roo.htmleditor.BlockTd, Roo.htmleditor.Block, {[m
     shrinkColumn : function()[m
     {[m
         var table = this.toTableArray();[m
[32m+[m[32m        console.log(table);[m
         this.normalizeWidths(table);[m
[32m+[m[32m        console.log(this.colWidths);[m
         var col = this.cellData.col;[m
         var nw = this.colWidths[col] * 0.8;[m
         if (nw < 5) {[m
[1mdiff --git a/roojs-ui.js b/roojs-ui.js[m
[1mindex 40ce72d195..6212babf17 100644[m
[1m--- a/roojs-ui.js[m
[1m+++ b/roojs-ui.js[m
[36m@@ -1093,25 +1093,28 @@[m [mB().deleteColumn();E();A.editorcore.selectNode(t.node);A.editorcore.onEditorEven[m
 ,{xtype:'Separator',xns:rooui.menu},{xtype:'Item',html:'Table',listeners:{click:function(G,e){var t=C();var nn=t.node.nextSibling||t.node.previousSibling;t.node.parentNode.removeChild(t.node);if(nn){A.editorcore.selectNode(nn,true);}A.editorcore.onEditorEvent();[m
 }},xns:rooui.menu}]}}];},toObject:function(){var A={tag:'td',contenteditable:'true','data-block':'Td',valign:this.valign,style:{'text-align':this.textAlign,border:'solid 1px rgb(0, 0, 0)','border-collapse':'collapse',padding:'6px','vertical-align':this.valign}[m
 ,html:this.html};if(this.width!=''){A.width=this.width;A.style.width=this.width;}if(this.colspan>1){A.colspan=this.colspan;}if(this.rowspan>1){A.rowspan=this.rowspan;}return A;},readElement:function(A){A=A?A:this.node;this.width=A.style.width;this.colspan=Math.max(1,1*A.getAttribute('colspan'));[m
[31m-this.rowspan=Math.max(1,1*A.getAttribute('rowspan'));this.html=A.innerHTML;},emptyCell:function(){return {colspan:1,rowspan:1,textAlign:'left',html:"&nbsp;"};},removeNode:function(){return this.node.closest('table');},cellData:false,colWidths:false,toTableArray:function(){var A=[];[m
[31m-var B=this.node.closest('tr').closest('table');Array.from(B.rows).forEach(function(r,ri){A[ri]=[];});var rn=0;this.colWidths=[];var C=true;Array.from(B.rows).forEach(function(r,ri){var cn=0;Array.from(r.cells).forEach(function(ce,ci){var c={cell:ce,row:rn,col:cn,colspan:ce.colSpan,rowspan:ce.rowSpan}[m
[31m-;if(ce.isEqualNode(this.node)){this.cellData=c;}if(typeof(A[rn][cn])!='undefined'){while(typeof(A[rn][cn])!='undefined'){cn++;}c.col=cn;}if(typeof(this.colWidths[cn])=='undefined'){this.colWidths[cn]=ce.style.width;if(this.colWidths[cn]!=''){C=false;}}if(c.colspan<2&&c.rowspan<2){A[rn][cn]=c;[m
[31m-cn++;return;}for(var j=0;j<c.rowspan;j++){if(typeof(A[rn+j])=='undefined'){continue;}A[rn+j][cn]=c;for(var i=0;i<c.colspan;i++){A[rn+j][cn+i]=c;}}cn+=c.colspan;},this);rn++;},this);if(C){this.colWidths[0]=false;}return A;},mergeRight:function(){var tr=this.node.closest('tr');[m
[31m-var i=Array.prototype.indexOf.call(tr.childNodes,this.node);if(i>=tr.childNodes.length-1){return;}var A=this.toTableArray();if(typeof(A[this.cellData.row][this.cellData.col+this.cellData.colspan])=='undefined'){return;}var rc=A[this.cellData.row][this.cellData.col+this.cellData.colspan];[m
[31m-if(rc.rowspan!=this.cellData.rowspan||rc.row!=this.cellData.row){return;}this.node.innerHTML+=' '+rc.cell.innerHTML;tr.removeChild(rc.cell);this.colspan+=rc.colspan;this.node.setAttribute('colspan',this.colspan);},mergeBelow:function(){var A=this.toTableArray();[m
[31m-if(typeof(A[this.cellData.row+this.cellData.rowspan])=='undefined'){return;}if(typeof(A[this.cellData.row+this.cellData.rowspan][this.cellData.col])=='undefined'){return;}var rc=A[this.cellData.row+this.cellData.rowspan][this.cellData.col];if(rc.colspan!=this.cellData.colspan||rc.col!=this.cellData.col){return;[m
[31m-}this.node.innerHTML=this.node.innerHTML+rc.cell.innerHTML;rc.cell.parentNode.removeChild(rc.cell);this.rowspan+=rc.rowspan;this.node.setAttribute('rowspan',this.rowspan);},split:function(){if(this.node.rowSpan<2&&this.node.colSpan<2){return;}var A=this.toTableArray();[m
[31m-var cd=this.cellData;this.rowspan=1;this.colspan=1;for(var r=cd.row;r<cd.row+cd.rowspan;r++){for(var c=cd.col;c<cd.col+cd.colspan;c++){if(r==cd.row&&c==cd.col){this.node.removeAttribute('rowspan');this.node.removeAttribute('colspan');continue;}var B=this.node.cloneNode();[m
[31m-B.removeAttribute('id');B.innerHTML='';A[r][c]={cell:B,col:c,row:r,colspan:1,rowspan:1};}}this.redrawAllCells(A);},redrawAllCells:function(A){var B=this.node.closest('tr').closest('table');var C=B.rows[0].parentNode;Array.from(B.rows).forEach(function(r,ri){Array.from(r.cells).forEach(function(ce,ci){ce.parentNode.removeChild(ce);[m
[32m+[m[32mthis.rowspan=Math.max(1,1*A.getAttribute('rowspan'));this.html=A.innerHTML;},emptyCell:function(){return {colspan:1,rowspan:1,textAlign:'left',html:"&nbsp;"};},removeNode:function(){return this.node.closest('table');},cellData:false,colWidths:false,toTableArray:function(){console.log("htmleditor.BlockTd toTableArray ");[m
[32m+[m[32mvar A=[];var B=this.node.closest('tr').closest('table');Array.from(B.rows).forEach(function(r,ri){A[ri]=[];});var rn=0;this.colWidths=[];var C=true;Array.from(B.rows).forEach(function(r,ri){var cn=0;Array.from(r.cells).forEach(function(ce,ci){console.log("CELL");[m
[32m+[m[32mconsole.log(ce);var c={cell:ce,row:rn,col:cn,colspan:ce.colSpan,rowspan:ce.rowSpan};if(ce.isEqualNode(this.node)){this.cellData=c;}if(typeof(A[rn][cn])!='undefined'){while(typeof(A[rn][cn])!='undefined'){cn++;}c.col=cn;}if(typeof(this.colWidths[cn])=='undefined'&&c.colspan<2&&c.rowspan<2){this.colWidths[cn]=ce.style.width;[m
[32m+[m[32mif(this.colWidths[cn]!=''){C=false;}}if(c.colspan<2&&c.rowspan<2){A[rn][cn]=c;cn++;return;}for(var j=0;j<c.rowspan;j++){if(typeof(A[rn+j])=='undefined'){continue;}A[rn+j][cn]=c;for(var i=0;i<c.colspan;i++){A[rn+j][cn+i]=c;}}cn+=c.colspan;},this);rn++;},this);[m
[32m+[m[32mif(C){this.colWidths[0]=false;}return A;},mergeRight:function(){console.log("htmleditor.BlockTd mergeRight");var tr=this.node.closest('tr');var i=Array.prototype.indexOf.call(tr.childNodes,this.node);if(i>=tr.childNodes.length-1){return;}var A=this.toTableArray();[m
[32m+[m[32mconsole.log(A);if(typeof(A[this.cellData.row][this.cellData.col+this.cellData.colspan])=='undefined'){return;}var rc=A[this.cellData.row][this.cellData.col+this.cellData.colspan];if(rc.rowspan!=this.cellData.rowspan||rc.row!=this.cellData.row){return;}this.node.innerHTML+=' '+rc.cell.innerHTML;[m
[32m+[m[32mtr.removeChild(rc.cell);this.colspan+=rc.colspan;this.node.setAttribute('colspan',this.colspan);var A=this.toTableArray();this.normalizeWidths(A);this.updateWidths(A);},mergeBelow:function(){var A=this.toTableArray();if(typeof(A[this.cellData.row+this.cellData.rowspan])=='undefined'){return;[m
[32m+[m[32m}if(typeof(A[this.cellData.row+this.cellData.rowspan][this.cellData.col])=='undefined'){return;}var rc=A[this.cellData.row+this.cellData.rowspan][this.cellData.col];if(rc.colspan!=this.cellData.colspan||rc.col!=this.cellData.col){return;}this.node.innerHTML=this.node.innerHTML+rc.cell.innerHTML;[m
[32m+[m[32mrc.cell.parentNode.removeChild(rc.cell);this.rowspan+=rc.rowspan;this.node.setAttribute('rowspan',this.rowspan);},split:function(){if(this.node.rowSpan<2&&this.node.colSpan<2){return;}var A=this.toTableArray();var cd=this.cellData;this.rowspan=1;this.colspan=1;[m
[32m+[m[32mfor(var r=cd.row;r<cd.row+cd.rowspan;r++){for(var c=cd.col;c<cd.col+cd.colspan;c++){if(r==cd.row&&c==cd.col){this.node.removeAttribute('rowspan');this.node.removeAttribute('colspan');continue;}var B=this.node.cloneNode();B.removeAttribute('id');B.innerHTML='';[m
[32m+[m[32mA[r][c]={cell:B,col:c,row:r,colspan:1,rowspan:1};}}this.redrawAllCells(A);},redrawAllCells:function(A){var B=this.node.closest('tr').closest('table');var C=B.rows[0].parentNode;Array.from(B.rows).forEach(function(r,ri){Array.from(r.cells).forEach(function(ce,ci){ce.parentNode.removeChild(ce);[m
 });r.parentNode.removeChild(r);});for(var r=0;r<A.length;r++){var re=B.rows[r];var re=B.ownerDocument.createElement('tr');C.appendChild(re);for(var c=0;c<A[r].length;c++){if(A[r][c].cell===false){continue;}re.appendChild(A[r][c].cell);A[r][c].cell=false;}[m
 }},updateWidths:function(A){for(var r=0;r<A.length;r++){for(var c=0;c<A[r].length;c++){if(A[r][c].cell===false){continue;}if(this.colWidths[0]!=false&&A[r][c].colspan<2){var el=Roo.htmleditor.Block.factory(A[r][c].cell);el.width=Math.floor(this.colWidths[c])+'%';[m
[31m-el.updateElement(el.node);}A[r][c].cell=false;}}},normalizeWidths:function(A){if(this.colWidths[0]===false){var nw=100.0/this.colWidths.length;this.colWidths.forEach(function(w,i){this.colWidths[i]=nw;},this);return;}var t=0,B=[];this.colWidths.forEach(function(w,i){this.colWidths[i]=this.colWidths[i]==''?0:(this.colWidths[i]+'').replace(/[^0-9]+/g,'')*1;[m
[31m-var D=this.colWidths[i];if(D>0){t+=D;return;}B.push(i);},this);var nc=this.colWidths.length;if(B.length){var C=(nc-B.length)/(1.0*nc);var t=C*t;var ew=(100-t)/(1.0*B.length);this.colWidths.forEach(function(w,i){if(w>0){this.colWidths[i]=w*C;return;}this.colWidths[i]=ew;[m
[31m-},this);}},shrinkColumn:function(){var A=this.toTableArray();this.normalizeWidths(A);var B=this.cellData.col;var nw=this.colWidths[B]*0.8;if(nw<5){return;}var C=(this.colWidths[B]*0.2)/(this.colWidths.length-1);this.colWidths.forEach(function(w,i){if(i==B){this.colWidths[i]=nw;[m
[31m-return;}this.colWidths[i]+=C},this);this.updateWidths(A);},growColumn:function(){var A=this.toTableArray();this.normalizeWidths(A);var B=this.cellData.col;var nw=this.colWidths[B]*1.2;if(nw>90){return;}var C=(this.colWidths[B]*0.2)/(this.colWidths.length-1);[m
[31m-this.colWidths.forEach(function(w,i){if(i==B){this.colWidths[i]=nw;return;}this.colWidths[i]-=C},this);this.updateWidths(A);},deleteRow:function(){var A=this.toTableArray();for(var i=0;i<A[this.cellData.row].length;i++){var c=A[this.cellData.row][i];if(c.row!=this.cellData.row){c.rowspan--;[m
[31m-c.cell.setAttribute('rowspan',c.rowspan);continue;}if(c.rowspan>1){c.rowspan--;c.cell.setAttribute('rowspan',c.rowspan);}}A.splice(this.cellData.row,1);this.redrawAllCells(A);},deleteColumn:function(){var A=this.toTableArray();for(var i=0;i<A.length;i++){var c=A[i][this.cellData.col];[m
[31m-if(c.col!=this.cellData.col){A[i][this.cellData.col].colspan--;}else if(c.colspan>1){c.colspan--;c.cell.setAttribute('colspan',c.colspan);}A[i].splice(this.cellData.col,1);}this.redrawAllCells(A);}})[m
[32m+[m[32mel.updateElement(el.node);}if(this.colWidths[0]!=false&&A[r][c].colspan>1){var el=Roo.htmleditor.Block.factory(A[r][c].cell);var B=0;for(var i=0;i<A[r][c].colspan;i++){B+=Math.floor(this.colWidths[c+i]);}el.width=B+'%';el.updateElement(el.node);}A[r][c].cell=false;[m
[32m+[m[32m}}},normalizeWidths:function(A){console.log("htmleditor.BlockTd normalizeWidths");console.log(this.colWidths);if(this.colWidths[0]===false){var nw=100.0/this.colWidths.length;this.colWidths.forEach(function(w,i){this.colWidths[i]=nw;},this);return;}var t=0,B=[];[m
[32m+[m[32mthis.colWidths.forEach(function(w,i){this.colWidths[i]=this.colWidths[i]==''?0:(this.colWidths[i]+'').replace(/[^0-9]+/g,'')*1;var D=this.colWidths[i];if(D>0){t+=D;return;}B.push(i);},this);var nc=this.colWidths.length;if(B.length){var C=(nc-B.length)/(1.0*nc);[m
[32m+[m[32mvar t=C*t;var ew=(100-t)/(1.0*B.length);this.colWidths.forEach(function(w,i){if(w>0){this.colWidths[i]=w*C;return;}this.colWidths[i]=ew;},this);}},shrinkColumn:function(){var A=this.toTableArray();console.log(A);this.normalizeWidths(A);console.log(this.colWidths);[m
[32m+[m[32mvar B=this.cellData.col;var nw=this.colWidths[B]*0.8;if(nw<5){return;}var C=(this.colWidths[B]*0.2)/(this.colWidths.length-1);this.colWidths.forEach(function(w,i){if(i==B){this.colWidths[i]=nw;return;}this.colWidths[i]+=C},this);this.updateWidths(A);},growColumn:function(){var A=this.toTableArray();[m
[32m+[m[32mthis.normalizeWidths(A);var B=this.cellData.col;var nw=this.colWidths[B]*1.2;if(nw>90){return;}var C=(this.colWidths[B]*0.2)/(this.colWidths.length-1);this.colWidths.forEach(function(w,i){if(i==B){this.colWidths[i]=nw;return;}this.colWidths[i]-=C},this);this.updateWidths(A);[m
[32m+[m[32m},deleteRow:function(){var A=this.toTableArray();for(var i=0;i<A[this.cellData.row].length;i++){var c=A[this.cellData.row][i];if(c.row!=this.cellData.row){c.rowspan--;c.cell.setAttribute('rowspan',c.rowspan);continue;}if(c.rowspan>1){c.rowspan--;c.cell.setAttribute('rowspan',c.rowspan);[m
[32m+[m[32m}}A.splice(this.cellData.row,1);this.redrawAllCells(A);},deleteColumn:function(){var A=this.toTableArray();for(var i=0;i<A.length;i++){var c=A[i][this.cellData.col];if(c.col!=this.cellData.col){A[i][this.cellData.col].colspan--;}else if(c.colspan>1){c.colspan--;[m
[32m+[m[32mc.cell.setAttribute('colspan',c.colspan);}A[i].splice(this.cellData.col,1);}this.redrawAllCells(A);}})[m
 // Roo/HtmlEditorCore.js[m
 Roo.HtmlEditorCore=function(A){Roo.HtmlEditorCore.superclass.constructor.call(this,A);this.addEvents({initialize:true,activate:true,beforesync:true,beforepush:true,sync:true,push:true,editorevent:true});this.applyBlacklists();};Roo.extend(Roo.HtmlEditorCore,Roo.Component,{owner:false,resizable:false,height:300,width:500,autoClean:true,enableBlocks:true,stylesheets:false,language:'en',allowComments:false,frameId:false,validationEvent:false,deferHeight:true,initialized:false,activated:false,sourceEditMode:false,onFocus:Roo.emptyFn,iframePad:3,hideMode:'offsets',clearUp:true,black:false,white:false,bodyCls:'',undoManager:false,getDocMarkup:function(){var st='';[m
 if(this.stylesheets===false){Roo.get(document.head).select('style').each(function(B){st+=B.dom.outerHTML||new XMLSerializer().serializeToString(B.dom);});Roo.get(document.head).select('link').each(function(B){st+=B.dom.outerHTML||new XMLSerializer().serializeToString(B.dom);[m
