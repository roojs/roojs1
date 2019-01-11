#!/bin/sh
# run at top leve!!!!
 
#seed ../gnome.introspection-doc-generator/pack.js \
#     -f buildSDK/dependancy_core.txt -o roojs-core.js -O roojs-core-debug.js
roojspacker -t roojs-core.js -T roojs-core-debug.js -i buildSDK/dependancy_core.txt

#seed ../gnome.introspection-doc-generator/pack.js \
#     -f buildSDK/dependancy_ui.txt -o roojs-ui.js -O roojs-ui-debug.js

roojspacker -t roojs-ui.js -T roojs-ui-debug.js -i buildSDK/dependancy_ui.txt


cat      roojs-core.js  roojs-ui.js >  roojs-all.js
cat roojs-core-debug.js  roojs-ui-debug.js > roojs-debug.js

 
#bootstrap
roojspacker -t roojs-bootstrap.js -T roojs-bootstrap-debug.js -i buildSDK/dependancy_bootstrap.txt
 
roojspacker -t roojs-calendar.js -T roojs-calendar-debug.js -i buildSDK/dependancy_calendar.txt  
  
  
#build mailer library
#seed ../gnome.introspection-doc-generator/pack.js \
 #    -f buildSDK/dependancy_mailer.txt -o roojs-mailer.js -O roojs-mailer-debug.js
  

#build docbook library
roojspacker -t roojs-doc.js -T roojs-doc-debug.js -i buildSDK/dependancy_doc.txt

  

     

# = not used anymore
#seed ../gnome.introspection-doc-generator/jsdocbuild.js --baseDir ../roojs1 \
   #--target ../roojs1/docs --conf ../roojs1/buildSDK/jsdoc.cfg.json \
   -#-cacheDirectory /tmp/roocache/

#new version?? - under testing...
roojspacker -i buildSDK/dependancy_core.txt  -i buildSDK/dependancy_ui.txt  \
    -i buildSDK/dependancy_bootstrap.txt -i buildSDK/dependancy_calendar.txt \
   --doc-target=docs -D

