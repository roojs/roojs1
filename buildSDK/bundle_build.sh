#!/bin/sh
# run at top leve!!!!
 
seed ../gnome.introspection-doc-generator/pack.js \
     -f buildSDK/dependancy_core.txt -o roojs-core.js -O roojs-core-debug.js

seed ../gnome.introspection-doc-generator/pack.js \
     -f buildSDK/dependancy_ui.txt -o roojs-ui.js -O roojs-ui-debug.js
 
seed ../gnome.introspection-doc-generator/pack.js \
    -f buildSDK/dependancy_core.txt \
     -f buildSDK/dependancy_ui.txt -o roojs-all.js -O roojs-debug.js
 
#docs.. 
seed ../gnome.introspection-doc-generator/jsdocbuild.js --baseDir ../roojs1 \
   --target ../roojs/docs --conf ../roojs1/buildSDK/jsdoc.cfg.json --cacheDirectory /tmp/roocache/
