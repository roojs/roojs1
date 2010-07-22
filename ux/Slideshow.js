//<script type="text/javascript">
/**
 * Slideshow  - based on a prototype one..
 *
 *
 * usage:
 * 
Roo.onReady( function() 
{
   // use a dom selector to define slides..
    var slides = Roo.DomQuery.select('.category-slide');
   
    oMySlides = new Roo.ux.Slideshow({
        slides 		: slides,
    });
             
});
 * 
 * 
 * @class Roo.ux.Slideshow
 */

Roo.ux.Slideshow = function(cfg ) 
{
    Roo.apply(this, cfg);
    if ( this.slides ) {
        this.numOfImages	= this.slides.length;
        if ( !this.numOfImages ) {
            alert('No slides?');
        }
    }
    this.playButton = Roo.get(this.playButton);
    this.pauseButton = Roo.get(this.pauseButton);
    this.counter = Roo.get(this.counter);
    this.caption = Roo.get(this.caption);
    if ( this.autostart ) {
        this.startSlideShow();
    }
}

Roo.apply(Roo.ux.Slideshow.prototype, {
    
    wait 			: 4000
	start 			: 0
	duration		: 0.5,
	autostart		: true ,
	slides 		    : false,
    /**
     * @config id/dom element counter to show the 
     */
	counter		    : false,
     /**
     * @config id/dom element of the caption.
     */
	caption		    : false,
     /**
     * @config id/dom element for play button
     */
	playButton		: false, 
    /**
     * @config id/dom element of the pause button
     */
	pauseButton	    : false, 
	iImageId		: 0, 
    
    
	// The Fade Function
	swapImage: function (x,y) {
        if (this.slides[x] ) {
            this.slides[x].animate( 
                { opacity : { from : 0.0, to : 1.0 }},
                this.duration
            ); 
            this.slides[x].show();
        }
        if (this.slides[y] ) {
            this.slides[y].animate( 
                { opacity : { from : 1.0, to : 0.0 }},
                this.duration
            ); 
            this.slides[y].show();
        } 
		
	},
	
	// the onload event handler that starts the fading.
	startSlideShow: function () {
        var _t  = this;
		window.setInterval(function () {
            _t.play() }, this.wait);
            
		this.playButton && this.playButton.hide();
		this.pauseButton && this.pauseButton.show();
     
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
        if (!this.counter) {
            return;
        }
		var textIn = this.iImageId+1 + ' of ' + this.numOfImages;
		this.counter.update( textIn );
        var oNewCaption = this.slides[this.iImageId]).select('.image-caption', true)
		if ( this.caption &&  oNewCaption.length ) {
			this.caption.update( oNewCaption[0].innerHTML;
		}
	}
}
  
  