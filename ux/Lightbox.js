/* <script type="text/javascript">
// -----------------------------------------------------------------------------------
// Roo lightbox - based on..
//
//	Lightbox v2.04
//	by Lokesh Dhakar - http://www.lokeshdhakar.com
//	Last Modification: 2/9/08
//
//	For more information, visit:
//	http://lokeshdhakar.com/projects/lightbox2/
//
//	Licensed under the Creative Commons Attribution 2.5 License - http://creativecommons.org/licenses/by/2.5/
//  	- Free for use in both personal and commercial projects
//		- Attribution requires leaving author name, author link, and the license info intact.
//	
//  Thanks: Scott Upton(uptonic.com), Peter-Paul Koch(quirksmode.com), and Thomas Fuchs(mir.aculo.us) for ideas, libs, and snippets.
//  		Artemy Tregubenko (arty.name) for cleanup and help in updating to latest ver of proto-aculous.
//
// -----------------------------------------------------------------------------------
/*

    Table of Contents
    -----------------
    Configuration

    Lightbox Class Declaration
    - initialize()
    - updateImageList()
    - start()
    - changeImage()
    - resizeImageContainer()
    - showImage()
    - updateDetails()
    - updateNav()
    - enableKeyboardNav()
    - disableKeyboardNav()
    - keyboardAction()
    - preloadNeighborImages()
    - end()
    
    Function Calls
    - document.observe()
   
*/
Roo.namespace('Roo.ux'); 
 
Roo.ux.Lightbox = function(cfg) {
    this.imageArray = [];
    Roo.apply(this,cfg);
    this.initialize();
}

Roo.apply(Roo.ux.Lightbox.prototype,  
{
    // optiosn..
     
    /**
     * @cfg overlayOpacity {number} controls transparency of shadow overlay
     */
    overlayOpacity: 0.8,   
    /**
     * @cfg animate {boolean} toggles resizing animations
     */
    animate: true,          
    /**
     * @cfg resizeSpeed {number} controls the speed of the image 
     * resizing animations (1=slowest and 10=fastest)
     */
    resizeSpeed: 9,
    /**
     * @cfg borderSize {number} if you adjust the padding in the CSS, 
     * you will need to update this variable
     */
    borderSize: 10,
    /**
     * @cfg labelImage {string} When grouping images this is used to write: Image # of #.
     * Change it for non-english localization
     */
	labelImage: "Image",
	/**
     * @cfg labelOf {string}  When grouping images this is used to write: Image # of #.
     */
    labelOf: "of",
    
    
    
    
    /**
     * List of images
     */
    imageArray: false,
    
    /**
     * Current image.
     * 
     */
     
    activeImage: undefined,
    
    /**
     * initialize() 
     *  Constructor runs on completion of the DOM loading. Calls updateImageList and then
     * the function inserts html at the bottom of the page which is used to display the shadow 
     *  overlay and the image container.
     * 
     * 
     */
    initialize: function() {    
        
        this.updateImageList();
        this.initializeCSS();
        // TBD this.keyboardAction = this.keyboardAction.bindAsEventListener(this);
        this.resizeSpeed  = Math.min(this.resizeSpeed, 10);
        this.resizeSpeed  = Math.max(this.resizeSpeed, 1);
        
	    this.resizeDuration = this.animate ? ((11 - this.resizeSpeed) * 0.15) : 0;
	    this.overlayDuration = this.animate ? 0.2 : 0;  // shadow fade in/out duration

        // When Lightbox starts it will resize itself from 250 by 250 to the current image dimension.
        // If animations are turned off, it will be hidden as to prevent a flicker of a
        // white 250 by 250 box.
        var size = (this.animate ? 250 : 1) + 'px';
        var dh = Roo.DomHelper;
        this.el = Roo.DomHelper.append(document.body, {
                html: 
                  '<div class="roo-lightbox-overlay"></div>' +
                  '<div class="roo-lightbox">' +
                  '   <div class="outer-image-container">' +
                  '       <div class="image-container">' +
                  '           <img class="lightbox-image">' +
                  '           <div style="" class="hover-nav">' +
                  '               <a href="#" class="prev-link"></a>' +
                  '               <a href="#" class="next-link"></a>' +
                  '           </div>' +
                  '           <div class="loading">' +
                  '               <a href="#" class="loading-link">&nbsp;</a>' +
                  '           </div>' +
                  '       </div>' +
                  '   </div>' +
                  '   <div class="image-data-container">' +
                  '       <div class="image-data">' +
                  '           <div class="image-details">' +
                  '               <span class="caption"></span>' +
                  '               <span class="number-display"></span>' +
                  '           </div>' +
                  '           <div class="bottom-nav">' +
                  '               <div href="#" class="bottom-nav-close"></div>' +
                  '           </div>' +
                  '       </div>' +
                  '   </div>' +
                 '</div>'
            }, true);
         
         
        
        var th = this;
        
        var ids = 'roo-lightbox outer-image-container image-container ' + 
            'lightbox-image hover-nav prev-link next-link loading loading-link ' + 
            'image-data-container image-data image-details caption number-display ' +
            'bottom-nav bottom-nav-close roo-lightbox-overlay';   
            
        Roo.each(ids.split(' '), 
            function(id){ 
                var vid = id.replace(/\-/g,'');
                th[vid] = th.el.child('.'+id); 
                if (!th[vid]) {
                    return;
                }
                
                th[vid].setVisibilityMode(Roo.Element.DISPLAY);
            });
        this.lightbox = this.roolightbox;

        this.overlay = this.roolightboxoverlay;
        this.overlay.hide();
         
		this.lightbox.hide();
        this.lightbox.on('click',  function(event) { 
                 if (Roo.get(event.getTarget()).hasClass('roo-lightbox')) {
                    this.end(); 
                }
            }, this);
            
		this.outerimagecontainer.setStyle({ width: size, height: size });
        
		this.prevlink.on('click', 
            function(event) { 
                event.stopEvent(); 
                this.changeImage(this.activeImage - 1); 
            }, this);
            
		this.nextlink.on('click', 
            function(event) { 
                event.stopEvent(); 
                this.changeImage(this.activeImage + 1); 
            },this);
            
		this.loadinglink.on('click', 
            function(event) { 
                event.stopEvent(); 
                this.end(); 
            }, this);
            
		this.bottomnavclose.on('click',  
            function(event) { 
                event.stopEvent(); 
                this.end(); 
            }, this);

        this.overlay.on('click',  
            function(event) { 
                event.stopEvent(); 
                this.end(); 
            }, this);

    },

    initializeCSS: function() {    
        if (typeof(Roo.ux.Lightbox.css) != 'undefined') {
            return;
        }
        var rootURL = Roo.BLANK_IMAGE_URL.replace(/\/gray\/s\.gif$/, '');
        
        Roo.ux.Lightbox.css = Roo.util.CSS.createStyleSheet( {
            '.roo-lightbox' : {
                position: 'absolute',
                left: 0,
                width: '100%',
                'text-align': 'center',
                'line-height': 0
            },
            '.roo-lightbox a img' : { border: 'none'  },
            '.roo-lightbox .outer-image-container' : {
                position: 'relative',
                'background-color': '#fff',
                width: '250px',
                height: '250px',
                margin: '0 auto'
            },
            
            '.roo-lightbox image-container'  :{ padding: '10px'  },

            '.roo-lightbox .loading' : { 
                position:'absolute', 
                top:'40%',
                left:'0%',
                height:'25%',
                width:'100%',
                'text-align':'center',
                'line-height':'0'
            
            },
            '.roo-lightbox .loading a' : { 
                background:'url('+ rootURL  + '/ux/lightbox/loading.gif) 0 0 no-repeat', 
                display:'block',
                width:'32px',
                height:'32px',
                cursor:'pointer'
            },
            '.roo-lightbox .bottom-nav-close' : {
                background:'url('+ rootURL  + '/ux/lightbox/close.gif) 0 0 no-repeat', 
                height:'26px',
                width:'26px',
                cursor:'pointer'
            },
            '.roo-lightbox .hover-nav' :{ 
                position:'absolute', 
                top:'0', 
                left:'0', 
                height:'100%', 
                width:'100%', 
                'z-index':'10'
            },
            '.roo-lightbox .image-container>.hover-nav' :{ left:'0' },
            '.roo-lightbox .hover-nav a' :{ outline:'none'},

            '.roo-lightbox .prev-link, .roo-lightbox .next-link' : { 
                width:'49%', 
                height:'100%', 
                'background-image':'url(data:image/gif;base64,AAAA)', 
                display:'block' 
            },
            '.roo-lightbox .prev-link' : { left:'0','float':'left'},
            '.roo-lightbox .next-link' : { right:'0','float':'right'},
            '.roo-lightbox .prev-link:hover, .roo-lightbox .prev-link:visited:hover ' :{ 
                    background:'url('+ rootURL  + '/ux/lightbox/prevlabel.gif) left 15% no-repeat'
            },
            '.roo-lightbox .next-link:hover, .roo-lightbox .next-link:visited:hover ' :{ 
                background:'url('+ rootURL  + '/ux/lightbox/nextlabel.gif) right 15% no-repeat'
            },

            '.roo-lightbox .image-data-container' : { 
                font: '10px Verdana, Helvetica, sans-serif',
                'background-color': '#fff',
                margin: '0 auto',
                'line-height': '1.4em', 
                overflow: 'auto', 
                width: '100%'
            },

            '.roo-lightbox .image-data' : { padding:'0 10px', color: '#666' },
            '.roo-lightbox .image-data .image-details ' : { width: '70%', 'float': 'left', 'text-align': 'left'}  ,
            '.roo-lightbox .image-data .caption' : { 'font-weight': 'bold' },
            '.roo-lightbox .image-data .number-display' : { 'display': 'block', clear: 'left', 'padding-bottom': '1.0em'  } ,   
            '.roo-lightbox .image-data .bottom-nav-close' : {  'float': 'right',  'padding-bottom': '0.7em','outline': 'none'} ,
            '.roo-lightbox-overlay' : {
                'background-color': 'black',
                height: '500px',
                left: '0px',
                position: 'absolute',
                top: '0px',
                width: '100%',
                'z-index': '90'
            }
        });
    },


    
    /**
     * updateImageList()
     * Loops through anchor tags looking for 'lightbox' references and applies onclick
     * events to appropriate links. You can rerun after dynamically adding images w/ajax.
     * 
     */
    updateImageList: function() {   
        this.updateImageList = Roo.emptyFn;
        if (this.imageArray.length) {
            return;
        }
        Roo.each(Roo.DomQuery.select('a[rel^=lightbox]'), function(e) {
            this.imageArray.push(Roo.get(e));
            Roo.get(e).on('click', (function(event, tg, tga,tgb) {
               
             
                event.stopEvent();
                this.start(tgb);
            }).createDelegate(this, [e], true));
        }, this)
        
    },
    
    /**
    * start()
    *  Display overlay and lightbox. If image is part of a set, add siblings to imageArray.
    */
    start: function(imageLink) {
        /*
        // hide all the objects that cause problems..
        $$('select', 'object', 'embed').each(
            function(node){ 
            node.style.visibility = 'hidden' }
        );
        */
        // stretch overlay to fill page and fade in
        //var arrayPageSize = this.getPageSize();
        
        this.overlay.setHeight(Roo.lib.Dom.getDocumentHeight()) ;
        this.overlay.setWidth(Roo.lib.Dom.getDocumentWidth());
        this.overlay.fadeIn({
                endOpacity: this.overlayOpacity, 
                easing: 'easeOut',
                duration: this.overlayDuration
        });
         
        //this.imageArray = [];
        var imageNum = 0;       
        
        if (imageLink) {
            imageLink = Roo.get(imageLink);
            //console.log(imageLink.id);
            Roo.each(this.imageArray, function (e, i) {
              //  console.log(e.id);
                if (e.id == imageLink.id) {
                    imageNum = i;
                }
            });
        }
        
        // let's assume the constructor sorts out the list of images..
        /*
        if ((imageLink.rel == 'lightbox')){
            // if image is NOT part of a set, add single image to imageArray
            this.imageArray.push([imageLink.href, imageLink.title]);         
        } else {
            // if image is part of a set..
            this.imageArray = 
                $$(imageLink.tagName + '[href][rel="' + imageLink.rel + '"]').
                collect(function(anchor){ return [anchor.href, anchor.title]; }).
                uniq();
            
            while (this.imageArray[imageNum][0] != imageLink.href) { imageNum++; }
        }
        */
        var s = Roo.get(document).getScroll();
         // calculate top and left offset for the lightbox 
        // weird.. why / 10?
        
        //var lightboxTop = s.top + (Roo.lib.Dom.getViewHeight() / 10);
        var lightboxTop = (Roo.lib.Dom.getViewHeight() / 10);
        var lightboxLeft = s.left
        this.lightbox.setStyle({ 
            top: lightboxTop + 'px', 
            left: lightboxLeft + 'px' ,
            zIndex : 1000
        })
        //console.log("show lightbox");
        this.lightbox.show();
        
        
        this.changeImage(imageNum);
    },

    //
    //  changeImage()
    //  Hide most elements and preload image in preparation for resizing image container.
    //
    changeImage: function(imageNum) {   
        
        this.activeImage = imageNum; // update global var

        // hide elements during transition
        if (this.animate) {
            this.loading.setStyle({
                zIndex :1200
            });
            this.loading.show();
            this.loadinglink.setX( (Roo.lib.Dom.getViewWidth() / 2) - 16);
            //this.loadingLink.show();
            // center the loading?
            
        }
        
        this.hovernav.hide();
        this.prevlink.hide();
        this.nextlink.hide();
		// HACK: Opera9 does not currently support scriptaculous opacity and appear fx
        this.imagedatacontainer.setStyle({opacity: .0001});
        this.numberdisplay.hide();
        
        var imgPreloader =  Roo.DomHelper.append(document.body, { tag: 'img' } , true);
        // once image is preloaded, resize image container

        imgPreloader.on('load', function() {
            Roo.log('this.imageArray[this.activeImage].dom.lwidth');
            Roo.log(this.imageArray[this.activeImage].dom.lwidth);
            
            Roo.log('this.imageArray[this.activeImage].dom.lheight');
            Roo.log(this.imageArray[this.activeImage].dom.lheight);
            
            this.lightboximage.dom.src = this.imageArray[this.activeImage].href || 
                this.imageArray[this.activeImage].dom.href || this.imageArray[this.activeImage].dom.src;
            
            this.resizeImageContainer(this.imageArray[this.activeImage].dom.lwidth || imgPreloader.getWidth(), this.imageArray[this.activeImage].dom.lheight || imgPreloader.getHeight());
            imgPreloader.remove();
        }, this);
        imgPreloader.dom.src = this.imageArray[this.activeImage].href || 
            this.imageArray[this.activeImage].dom.href ||  this.imageArray[this.activeImage].dom.src;
    },

    
    
    //
    //  resizeImageContainer()
    //
    resizeImageContainer: function(imgWidth, imgHeight) {

        // make sure we have some sensible sizes..
        imgWidth = Math.max(50, imgWidth);
        imgHeight = Math.max(50, imgHeight);
        
        // get current width and height
        var widthCurrent  = this.outerimagecontainer.getWidth();
        var heightCurrent = this.outerimagecontainer.getHeight();
        
        //fixme need better calcs.
        var w = window;
        var ww = w.innerWidth || (w.document.documentElement.clientWidth || w.document.body.clientWidth);
        var wh = w.innerHeight || (w.document.documentElement.clientHeight || w.document.body.clientHeight);
        Roo.log(ww);
        Roo.log(wh);
        ww -= 150;
        wh -= 150;
        
        // get new width and height
        var bs =  this.borderSize * 2;
        
        var widthNew  =  imgWidth  + bs;
        var heightNew =  imgHeight + bs;
        Roo.log(widthNew);
        Roo.log(heightNew);
        if (widthNew > ww || heightNew > wh) {
            // bigger than window.
            // scale here... - bit nasty..
            Roo.log(widthNew / ww );
            Roo.log(heightNew  / wh);
            var rescale = 1.1 * Math.max( widthNew / ww , heightNew  / wh);
            Roo.log(rescale);
             //console.log(rescale);
            imgWidth = Math.floor(imgWidth / rescale);
            imgHeight = Math.floor(imgHeight / rescale);
            widthNew  =  imgWidth  + bs;
            heightNew =  imgHeight + bs;
                    
            
        }
        
        this.lightboximage.set( { width : imgWidth, height : imgHeight });
        
        
        // scalars based on change from old to new
        var xScale = (widthNew  / widthCurrent)  * 100;
        var yScale = (heightNew / heightCurrent) * 100;

        // calculate size difference between new and old image, and resize if necessary
        var wDiff = widthCurrent - widthNew;
        var hDiff = heightCurrent - heightNew;
        
         
        this.outerimagecontainer.animate(
            { width: {to: widthNew}, height: {to: heightNew} },
            this.resizeDuration,
            null, // on complete
            'easeOut', // easing
            'run' // effect
        
        )        
       
        
        // if new and old image are same size and no scaling transition is necessary, 
        // do a quick pause to prevent image flicker.
        var timeout = 0;
        if ((hDiff == 0) && (wDiff == 0)){
            timeout = 100;
            if (Roo.isIE) timeout = 250;   
        }

        (function(){
            this.prevlink.setStyle({ height: imgHeight + 'px' });
            this.nextlink.setStyle({ height: imgHeight + 'px' });
            this.imagedatacontainer.setStyle({ width: widthNew + 'px'}); // the text area..
            this.showImage();
        }).defer(timeout / 1000, this);
    },
    
    //
    //  showImage()
    //  Display image and begin preloading neighbors.
    //
    showImage: function(){
        
        this.loading.hide();
        //this.loadingLink.hide();
        var _this=  this;
        this.lightboximage.animate( 
            {
                opacity : {  to: 1.0 }
            },
            this.resizeDuration,
            function(){ 
                _this.updateDetails(); 
            }
            
        );
        this.preloadNeighborImages();
    },

    //
    //  updateDetails()
    //  Display caption, image number, and bottom nav.
    //
    updateDetails: function() {
    
        // if caption is not null
        if (this.imageArray[this.activeImage].dom.title  != ""){
            this.caption.update(this.imageArray[this.activeImage].dom.title);
            this.caption.show();
        }
        
        // if image is part of set display 'Image x of x' 
        if (this.imageArray.length > 1){
            this.numberdisplay.update(
                this.labelImage + ' ' + (this.activeImage + 1) + ' ' + this.labelOf + '  ' + this.imageArray.length)
            this.numberdisplay.show();
        }
        var _this = this;
        this.imagedatacontainer.animate(
            {
                //slide down ?: , from: 0.0, to: 1.0 
                opacity :  {  to: 1.0 }
            },
            this.resizeDuration,
            function() {
	                // update overlay size and update nav
	                //var arrayPageSize = this.getPageSize();
	                //this.overlay.setStyle({ height: arrayPageSize[1] + 'px' });
	                _this.updateNav();
            }
             
        );
    },

    //
    //  updateNav()
    //  Display appropriate previous and next hover navigation.
    //
    updateNav: function() {

        this.hovernav.show();               

        // if not first image in set, display prev image button
        if (this.activeImage > 0) this.prevlink.show();

        // if not last image in set, display next image button
        if (this.activeImage < (this.imageArray.length - 1)) this.nextlink.show();
        
        this.enableKeyboardNav();
    },

    //
    //  enableKeyboardNav()
    //
    enableKeyboardNav: function() {
        Roo.get(document.body).on('keydown', this.keyboardAction, this); 
    },

    //
    //  disableKeyboardNav()
    //
    disableKeyboardNav: function() {
        Roo.get(document.body).un('keydown', this.keyboardAction, this); 
    },

    //
    //  keyboardAction()
    //
    keyboardAction: function(event)
    {
        var keycode = event.keyCode;

        var escapeKey;
        if (event.DOM_VK_ESCAPE) {  // mozilla
            escapeKey = event.DOM_VK_ESCAPE;
        } else { // ie
            escapeKey = 27;
        }

        var key = String.fromCharCode(keycode).toLowerCase();
        
        if (key.match(/x|o|c/) || (keycode == escapeKey)){ // close lightbox
            this.end();
        } else if ((key == 'p') || (keycode == 37)){ // display previous image
            if (this.activeImage != 0){
                this.disableKeyboardNav();
                this.changeImage(this.activeImage - 1);
            }
        } else if ((key == 'n') || (keycode == 39)){ // display next image
            if (this.activeImage != (this.imageArray.length - 1)){
                this.disableKeyboardNav();
                this.changeImage(this.activeImage + 1);
            }
        }
    },

    //
    //  preloadNeighborImages()
    //  Preload previous and next images.
    //
    preloadNeighborImages: function(){
        var preloadNextImage, preloadPrevImage;
        if (this.imageArray.length > this.activeImage + 1){
            preloadNextImage = Roo.DomHelper.append(document.body, { tag: 'img' } , true);
            preloadNextImage.on('load', function() { preloadNextImage.remove() });
            preloadNextImage.dom.src = this.imageArray[this.activeImage + 1].href ||
                    this.imageArray[this.activeImage + 1].dom.href || this.imageArray[this.activeImage + 1 ].dom.src;;
        }
        if (this.activeImage > 0){
            preloadPrevImage = Roo.DomHelper.append(document.body, { tag: 'img' } , true);
            preloadPrevImage.on('load', function() { preloadPrevImage.remove() });
            preloadPrevImage.dom.src = this.imageArray[this.activeImage - 1].href || 
                   this.imageArray[this.activeImage - 1].dom.href || this.imageArray[this.activeImage - 1].dom.src;
        }
    
    },

    //
    //  end()
    //
    end: function() {
        this.disableKeyboardNav();
        //console.log('lightbox hide');
        this.lightbox.hide();
        this.loading.hide();
        this.overlay.hide();
        Roo.get(document.body).unmask();
        // show all the objects that cause problems..
        //$$('select', 'object', 'embed').each(function(node){ node.style.visibility = 'visible' });
    }

     
});
 