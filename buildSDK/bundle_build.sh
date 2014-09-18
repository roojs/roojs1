#!/bin/sh
# run at top leve!!!!
 
seed ../gnome.introspection-doc-generator/pack.js \
     -f buildSDK/dependancy_core.txt -o roojs-core.js -O roojs-core-debug.js

seed ../gnome.introspection-doc-generator/pack.js \
     -f buildSDK/dependancy_ui.txt -o roojs-ui.js -O roojs-ui-debug.js



cat      roojs-core.js  roojs-ui.js >  roojs-all.js
cat roojs-core-debug.js  roojs-ui-debug.js > roojs-debug.js


seed ../gnome.introspection-doc-generator/pack.js \
     -f buildSDK/dependancy_bootstrap.txt -o roojs-bootstrap.js -O roojs-bootstrap-debug.js

seed ../gnome.introspection-doc-generator/pack.js \
     -f buildSDK/dependancy_calendar.txt -o roojs-calendar.js -O roojs-calendar-debug.js
  

seed ../gnome.introspection-doc-generator/pack.js \
     -f buildSDK/dependancy_mailer.txt -o roojs-mailer.js -O roojs-mailer-debug.js
  

     
#seed ../gnome.introspection-doc-generator/pack.js \
#    -f buildSDK/dependancy_core.txt \
#    
#docs.. 
seed ../gnome.introspection-doc-generator/jsdocbuild.js --baseDir ../roojs1 \
   --target ../roojs1/docs --conf ../roojs1/buildSDK/jsdoc.cfg.json \
   --cacheDirectory /tmp/roocache/
