/**
 * 
 *
 *
 */

// slideshow..  
var iSlideShow = new Class.create();
iSlideShow.prototype = {
	
	initialize : function (oArgs){
		this.wait 			= oArgs.wait ? oArgs.wait : 4000;
		this.start 			= oArgs.start ? oArgs.start : 0;
		this.duration		= oArgs.duration ? oArgs.duration : 0.5;
		this.autostart		= (typeof(oArgs.autostart)=='undefined') ? true : oArgs.autostart;
		this.slides 		= oArgs.slides;
		this.counter		= oArgs.counter;
		this.caption		= oArgs.caption;
		this.playButton		= $(oArgs.playButton ? oArgs.playButton : 'PlayButton');
		this.pauseButton	= $(oArgs.pauseButton ? oArgs.pauseButton : 'PauseButton');
		this.iImageId		= this.start;
		if ( this.slides ) {
			this.numOfImages	= this.slides.length;
			if ( !this.numOfImages ) {
				alert('No slides?');
			}
		}
		if ( this.autostart ) {
			this.startSlideShow();
		}
	},
	
	// The Fade Function
	swapImage: function (x,y) {		
		$(this.slides[x]) && $(this.slides[x]).appear({ duration: this.duration });
		$(this.slides[y]) && $(this.slides[y]).fade({duration: this.duration });
	},
	
	// the onload event handler that starts the fading.
	startSlideShow: function () {
        var _t  = this;
		window.setInterval(function () {
            _t.play() },this.wait);
		this.playButton && this.playButton.hide();
		this.pauseButton && this.pauseButton.appear({ duration: 0});
     
		this.updatecounter();
									
	},
	
	play: function () {
		
		var imageShow, imageHide;
	
		imageShow = this.iImageId+1;
		imageHide = this.iImageId;
		
		if (imageShow == this.numOfImages) {
			this.swapImage(0,imageHide);	
			this.iImageId = 0;					
		} else {
			this.swapImage(imageShow,imageHide);			
			this.iImageId++;
		}
		
		this.textIn = this.iImageId+1 + ' of ' + this.numOfImages;
		this.updatecounter();
	},
	
	stop: function  () {
		clearInterval(this.play);				
		this.playButton && this.playButton.appear({ duration: 0});
		this.pauseButton && this.pauseButton.hide();
	},
	
	goNext: function () {
		clearInterval(this.play);
		$(this.playButton).appear({ duration: 0});
		$(this.pauseButton).hide();
		
		var imageShow, imageHide;
	
		imageShow = this.iImageId+1;
		imageHide = this.iImageId;
		
		if (imageShow == this.numOfImages) {
			this.swapImage(0,imageHide);	
			this.iImageId = 0;					
		} else {
			this.swapImage(imageShow,imageHide);			
			this.iImageId++;
		}
	
		this.updatecounter();
	},
	
	goPrevious: function () {
		clearInterval(this.play);
		$(this.playButton).appear({ duration: 0});
		$(this.pauseButton).hide();
	
		var imageShow, imageHide;
					
		imageShow = this.iImageId-1;
		imageHide = this.iImageId;
		
		if (this.iImageId == 0) {
			this.swapImage(this.numOfImages-1,imageHide);	
			this.iImageId = this.numOfImages-1;		
			
			//alert(NumOfImages-1 + ' and ' + imageHide + ' i=' + i)
						
		} else {
			this.swapImage(imageShow,imageHide);			
			this.iImageId--;
			
			//alert(imageShow + ' and ' + imageHide)
		}
		
		this.updatecounter();
	},
	
	updatecounter: function () {
		var textIn = this.iImageId+1 + ' of ' + this.numOfImages;
		$(this.counter) && ( $(this.counter).innerHTML = textIn );
		if ( $(this.caption) && ( oNewCaption = $(this.slides[this.iImageId]).down('.image-caption') ) ) {
			$(this.caption).innerHTML = oNewCaption.innerHTML;
		}
	}
}
Event.observe(window, 'load', function(){
        if ($$('.category-slide').length < 2) {
            if (!$$('.category-slide').length) {
                return;
            }
            $$('.category-slide')[0].appear( { duration : 1 });
            return;
        }
        oMySlides = new iSlideShow({
 				autostart 	: true,		// optional, boolean (default:true)
				start		: 0,	 	// optional, slides[start] (default:0) 
				wait 		: 4000, 	// optional, milliseconds (default:4s)
				slides 		: $$('.category-slide'),
				counter		: 'counter-div-id', // optional...
				caption 	: 'caption-div-id', // optional... 
				playButton	: 'PlayButton', 	// optional (default:playButton)
				pauseButton	: 'PauseButton', 	// optional (default:PauseButton)
			});
             $$('.category-slide')[0].appear( { duration : 1 });
			// oMySlides.startSlideShow();
});
  
  