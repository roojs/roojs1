 

/**
 * @class Roo.lib.Color
 * @constructor
 * An abstract Color implementation. Concrete Color implementations should use
 * an instance of this function as their prototype, and implement the getRGB and
 * getHSL functions. getRGB should return an object representing the RGB
 * components of this Color, with the red, green, and blue components in the
 * range [0,255] and the alpha component in the range [0,100]. getHSL should
 * return an object representing the HSL components of this Color, with the hue
 * component in the range [0,360), the saturation and lightness components in
 * the range [0,100], and the alpha component in the range [0,1].
 *
 *
 * Color.js
 *
 * Functions for Color handling and processing.
 *
 * http://www.safalra.com/web-design/javascript/Color-handling-and-processing/
 *
 * The author of this program, Safalra (Stephen Morley), irrevocably releases all
 * rights to this program, with the intention of it becoming part of the public
 * domain. Because this program is released into the public domain, it comes with
 * no warranty either expressed or implied, to the extent permitted by law.
 * 
 * For more free and public domain JavaScript code by the same author, visit:
 * http://www.safalra.com/web-design/javascript/
 * 
 */
Roo.lib.Color = function() { }


Roo.apply(Roo.lib.Color.prototype, {
  
  rgb : null,
  hsv : null,
  hsl : null,
  
  /**
   * getIntegerRGB
   * @return {Object} an object representing the RGBA components of this Color. The red,
   * green, and blue components are converted to integers in the range [0,255].
   * The alpha is a value in the range [0,1].
   */
  getIntegerRGB : function(){

    // get the RGB components of this Color
    var rgb = this.getRGB();

    // return the integer components
    return {
      'r' : Math.round(rgb.r),
      'g' : Math.round(rgb.g),
      'b' : Math.round(rgb.b),
      'a' : rgb.a
    };

  },

  /**
   * getPercentageRGB
   * @return {Object} an object representing the RGBA components of this Color. The red,
   * green, and blue components are converted to numbers in the range [0,100].
   * The alpha is a value in the range [0,1].
   */
  getPercentageRGB : function(){

    // get the RGB components of this Color
    var rgb = this.getRGB();

    // return the percentage components
    return {
      'r' : 100 * rgb.r / 255,
      'g' : 100 * rgb.g / 255,
      'b' : 100 * rgb.b / 255,
      'a' : rgb.a
    };

  },

  /**
   * getCSSHexadecimalRGB
   * @return {String} a string representing this Color as a CSS hexadecimal RGB Color
   * value - that is, a string of the form #RRGGBB where each of RR, GG, and BB
   * are two-digit hexadecimal numbers.
   */
  getCSSHexadecimalRGB : function()
  {

    // get the integer RGB components
    var rgb = this.getIntegerRGB();

    // determine the hexadecimal equivalents
    var r16 = rgb.r.toString(16);
    var g16 = rgb.g.toString(16);
    var b16 = rgb.b.toString(16);

    // return the CSS RGB Color value
    return '#'
        + (r16.length == 2 ? r16 : '0' + r16)
        + (g16.length == 2 ? g16 : '0' + g16)
        + (b16.length == 2 ? b16 : '0' + b16);

  },

  /**
   * getCSSIntegerRGB
   * @return {String} a string representing this Color as a CSS integer RGB Color
   * value - that is, a string of the form rgb(r,g,b) where each of r, g, and b
   * are integers in the range [0,255].
   */
  getCSSIntegerRGB : function(){

    // get the integer RGB components
    var rgb = this.getIntegerRGB();

    // return the CSS RGB Color value
    return 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';

  },

  /**
   * getCSSIntegerRGBA
   * @return {String} Returns a string representing this Color as a CSS integer RGBA Color
   * value - that is, a string of the form rgba(r,g,b,a) where each of r, g, and
   * b are integers in the range [0,255] and a is in the range [0,1].
   */
  getCSSIntegerRGBA : function(){

    // get the integer RGB components
    var rgb = this.getIntegerRGB();

    // return the CSS integer RGBA Color value
    return 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + rgb.a + ')';

  },

  /**
   * getCSSPercentageRGB
   * @return {String} a string representing this Color as a CSS percentage RGB Color
   * value - that is, a string of the form rgb(r%,g%,b%) where each of r, g, and
   * b are in the range [0,100].
   */
  getCSSPercentageRGB : function(){

    // get the percentage RGB components
    var rgb = this.getPercentageRGB();

    // return the CSS RGB Color value
    return 'rgb(' + rgb.r + '%,' + rgb.g + '%,' + rgb.b + '%)';

  },

  /**
   * getCSSPercentageRGBA
   * @return {String} a string representing this Color as a CSS percentage RGBA Color
   * value - that is, a string of the form rgba(r%,g%,b%,a) where each of r, g,
   * and b are in the range [0,100] and a is in the range [0,1].
   */
  getCSSPercentageRGBA : function(){

    // get the percentage RGB components
    var rgb = this.getPercentageRGB();

    // return the CSS percentage RGBA Color value
    return 'rgb(' + rgb.r + '%,' + rgb.g + '%,' + rgb.b + '%,' + rgb.a + ')';

  },

  /**
   * getCSSHSL
   * @return {String} a string representing this Color as a CSS HSL Color value - that
   * is, a string of the form hsl(h,s%,l%) where h is in the range [0,100] and
   * s and l are in the range [0,100].
   */
  getCSSHSL : function(){

    // get the HSL components
    var hsl = this.getHSL();

    // return the CSS HSL Color value
    return 'hsl(' + hsl.h + ',' + hsl.s + '%,' + hsl.l + '%)';

  },

  /**
   * getCSSHSLA
   * @return {String} a string representing this Color as a CSS HSLA Color value - that
   * is, a string of the form hsla(h,s%,l%,a) where h is in the range [0,100],
   * s and l are in the range [0,100], and a is in the range [0,1].
   */
  getCSSHSLA : function(){

    // get the HSL components
    var hsl = this.getHSL();

    // return the CSS HSL Color value
    return 'hsl(' + hsl.h + ',' + hsl.s + '%,' + hsl.l + '%,' + hsl.a + ')';

  },

  /**
   * Sets the Color of the specified node to this Color. This functions sets
   * the CSS 'color' property for the node. The parameter is:
   * 
   * @param {DomElement} node - the node whose Color should be set
   */
  setNodeColor : function(node){

    // set the Color of the node
    node.style.color = this.getCSSHexadecimalRGB();

  },

  /**
   * Sets the background Color of the specified node to this Color. This
   * functions sets the CSS 'background-color' property for the node. The
   * parameter is:
   *
   * @param {DomElement} node - the node whose background Color should be set
   */
  setNodeBackgroundColor : function(node){

    // set the background Color of the node
    node.style.backgroundColor = this.getCSSHexadecimalRGB();

  },
  // convert between formats..
  toRGB: function()
  {
    var r = this.getIntegerRGB();
    return new Roo.lib.RGBColor(r.r,r.g,r.b,r.a);
    
  },
  toHSL : function()
  {
     var hsl = this.getHSL();
  // return the CSS HSL Color value
    return new Roo.lib.HSLColor(hsl.h,  hsl.s, hsl.l ,  hsl.a );
    
  },
  
  toHSV : function()
  {
    var rgb = this.toRGB();
    var hsv = rgb.getHSV();
   // return the CSS HSL Color value
    return new Roo.lib.HSVColor(hsv.h,  hsv.s, hsv.v ,  hsv.a );
    
  },
  
  // modify  v = 0 ... 1 (eg. 0.5)
  saturate : function(v)
  {
      var rgb = this.toRGB();
      var hsv = rgb.getHSV();
      return new Roo.lib.HSVColor(hsv.h,  hsv.s * v, hsv.v ,  hsv.a );
      
  
  },
  
   
  /**
   * getRGB
   * @return {Object} the RGB and alpha components of this Color as an object with r,
   * g, b, and a properties. r, g, and b are in the range [0,255] and a is in
   * the range [0,1].
   */
  getRGB: function(){
   
    // return the RGB components
    return {
      'r' : this.rgb.r,
      'g' : this.rgb.g,
      'b' : this.rgb.b,
      'a' : this.alpha
    };

  },

  /**
   * getHSV
   * @return {Object} the HSV and alpha components of this Color as an object with h,
   * s, v, and a properties. h is in the range [0,360), s and v are in the range
   * [0,100], and a is in the range [0,1].
   */
  getHSV : function()
  {
    
    // calculate the HSV components if necessary
    if (this.hsv == null) this.calculateHSV();

    // return the HSV components
    return {
      'h' : this.hsv.h,
      's' : this.hsv.s,
      'v' : this.hsv.v,
      'a' : this.alpha
    };

  },

  /**
   * getHSL
   * @return {Object} the HSL and alpha components of this Color as an object with h,
   * s, l, and a properties. h is in the range [0,360), s and l are in the range
   * [0,100], and a is in the range [0,1].
   */
  getHSL : function(){
    
     
    // calculate the HSV components if necessary
    if (this.hsl == null) this.calculateHSL();

    // return the HSL components
    return {
      'h' : this.hsl.h,
      's' : this.hsl.s,
      'l' : this.hsl.l,
      'a' : this.alpha
    };

  }
  

});


/**
 * @class Roo.lib.RGBColor
 * @extends Roo.lib.Color
 * Creates a Color specified in the RGB Color space, with an optional alpha
 * component. The parameters are:
 * @constructor
 * 

 * @param {Number} r - the red component, clipped to the range [0,255]
 * @param {Number} g - the green component, clipped to the range [0,255]
 * @param {Number} b - the blue component, clipped to the range [0,255]
 * @param {Number} a - the alpha component, clipped to the range [0,1] - this parameter is
 *     optional and defaults to 1
 */
Roo.lib.RGBColor = function (r, g, b, a){

  // store the alpha component after clipping it if necessary
  this.alpha = (a === undefined ? 1 : Math.max(0, Math.min(1, a)));

  // store the RGB components after clipping them if necessary
  this.rgb =
      {
        'r' : Math.max(0, Math.min(255, r)),
        'g' : Math.max(0, Math.min(255, g)),
        'b' : Math.max(0, Math.min(255, b))
      };

  // initialise the HSV and HSL components to null
  

  /* 
   * //private returns the HSV or HSL hue component of this RGBColor. The hue is in the
   * range [0,360). The parameters are:
   *
   * maximum - the maximum of the RGB component values
   * range   - the range of the RGB component values
   */
   

}
// this does an 'exteds'
Roo.extend(Roo.lib.RGBColor, Roo.lib.Color, {

  
    getHue  : function(maximum, range)
    {
      var rgb = this.rgb;
       
      // check whether the range is zero
      if (range == 0){
  
        // set the hue to zero (any hue is acceptable as the Color is grey)
        var hue = 0;
  
      }else{
  
        // determine which of the components has the highest value and set the hue
        switch (maximum){
  
          // red has the highest value
          case rgb.r:
            var hue = (rgb.g - rgb.b) / range * 60;
            if (hue < 0) hue += 360;
            break;
  
          // green has the highest value
          case rgb.g:
            var hue = (rgb.b - rgb.r) / range * 60 + 120;
            break;
  
          // blue has the highest value
          case rgb.b:
            var hue = (rgb.r - rgb.g) / range * 60 + 240;
            break;
  
        }
  
      }
  
      // return the hue
      return hue;
  
    },

  /* //private Calculates and stores the HSV components of this RGBColor so that they can
   * be returned be the getHSV function.
   */
   calculateHSV : function(){
    var rgb = this.rgb;
    // get the maximum and range of the RGB component values
    var maximum = Math.max(rgb.r, rgb.g, rgb.b);
    var range   = maximum - Math.min(rgb.r, rgb.g, rgb.b);

    // store the HSV components
    this.hsv =
        {
          'h' : this.getHue(maximum, range),
          's' : (maximum == 0 ? 0 : 100 * range / maximum),
          'v' : maximum / 2.55
        };

  },

  /* //private Calculates and stores the HSL components of this RGBColor so that they can
   * be returned be the getHSL function.
   */
   calculateHSL : function(){
    var rgb = this.rgb;
    // get the maximum and range of the RGB component values
    var maximum = Math.max(rgb.r, rgb.g, rgb.b);
    var range   = maximum - Math.min(rgb.r, rgb.g, rgb.b);

    // determine the lightness in the range [0,1]
    var l = maximum / 255 - range / 510;

    // store the HSL components
    this.hsl =
        {
          'h' : this.getHue(maximum, range),
          's' : (range == 0 ? 0 : range / 2.55 / (l < 0.5 ? l * 2 : 2 - l * 2)),
          'l' : 100 * l
        };

  }

});

/**
 * @class Roo.lib.HSVColor
 * @extends Roo.lib.Color
 * Creates a Color specified in the HSV Color space, with an optional alpha
 * component. The parameters are:
 * @constructor
 *
 * @param {Number} h - the hue component, wrapped to the range [0,360)
 * @param {Number} s - the saturation component, clipped to the range [0,100]
 * @param {Number} v - the value component, clipped to the range [0,100]
 * @param {Number} a - the alpha component, clipped to the range [0,1] - this parameter is
 *     optional and defaults to 1
 */
Roo.lib.HSVColor = function (h, s, v, a){

  // store the alpha component after clipping it if necessary
  this.alpha = (a === undefined ? 1 : Math.max(0, Math.min(1, a)));

  // store the HSV components after clipping or wrapping them if necessary
  this.hsv =
      {
        'h' : (h % 360 + 360) % 360,
        's' : Math.max(0, Math.min(100, s)),
        'v' : Math.max(0, Math.min(100, v))
      };

  // initialise the RGB and HSL components to null
  this.rgb = null;
  this.hsl = null;
}

Roo.extend(Roo.lib.HSVColor, Roo.lib.Color, {
  /* Calculates and stores the RGB components of this HSVColor so that they can
   * be returned be the getRGB function.
   */
  calculateRGB: function ()
  {
    var hsv = this.hsv;
    // check whether the saturation is zero
    if (hsv.s == 0){

      // set the Color to the appropriate shade of grey
      var r = hsv.v;
      var g = hsv.v;
      var b = hsv.v;

    }else{

      // set some temporary values
      var f  = hsv.h / 60 - Math.floor(hsv.h / 60);
      var p  = hsv.v * (1 - hsv.s / 100);
      var q  = hsv.v * (1 - hsv.s / 100 * f);
      var t  = hsv.v * (1 - hsv.s / 100 * (1 - f));

      // set the RGB Color components to their temporary values
      switch (Math.floor(hsv.h / 60)){
        case 0: var r = hsv.v; var g = t; var b = p; break;
        case 1: var r = q; var g = hsv.v; var b = p; break;
        case 2: var r = p; var g = hsv.v; var b = t; break;
        case 3: var r = p; var g = q; var b = hsv.v; break;
        case 4: var r = t; var g = p; var b = hsv.v; break;
        case 5: var r = hsv.v; var g = p; var b = q; break;
      }

    }

    // store the RGB components
    this.rgb =
        {
          'r' : r * 2.55,
          'g' : g * 2.55,
          'b' : b * 2.55
        };

  },

  /* Calculates and stores the HSL components of this HSVColor so that they can
   * be returned be the getHSL function.
   */
  calculateHSL : function (){

    var hsv = this.hsv;
    // determine the lightness in the range [0,100]
    var l = (2 - hsv.s / 100) * hsv.v / 2;

    // store the HSL components
    this.hsl =
        {
          'h' : hsv.h,
          's' : hsv.s * hsv.v / (l < 50 ? l * 2 : 200 - l * 2),
          'l' : l
        };

    // correct a division-by-zero error
    if (isNaN(hsl.s)) hsl.s = 0;

  } 
 

});
 

/**
 * @class Roo.lib.HSLColor
 * @extends Roo.lib.Color
 *
 * @constructor
 * Creates a Color specified in the HSL Color space, with an optional alpha
 * component. The parameters are:
 *
 * @param {Number} h - the hue component, wrapped to the range [0,360)
 * @param {Number} s - the saturation component, clipped to the range [0,100]
 * @param {Number} l - the lightness component, clipped to the range [0,100]
 * @param {Number} a - the alpha component, clipped to the range [0,1] - this parameter is
 *     optional and defaults to 1
 */

Roo.lib.HSLColor = function(h, s, l, a){

  // store the alpha component after clipping it if necessary
  this.alpha = (a === undefined ? 1 : Math.max(0, Math.min(1, a)));

  // store the HSL components after clipping or wrapping them if necessary
  this.hsl =
      {
        'h' : (h % 360 + 360) % 360,
        's' : Math.max(0, Math.min(100, s)),
        'l' : Math.max(0, Math.min(100, l))
      };

  // initialise the RGB and HSV components to null
}

Roo.extend(Roo.lib.HSL, Roo.lib.Color, {

  /* Calculates and stores the RGB components of this HSLColor so that they can
   * be returned be the getRGB function.
   */
  calculateRGB: function (){

    // check whether the saturation is zero
    if (this.hsl.s == 0){

      // store the RGB components representing the appropriate shade of grey
      this.rgb =
          {
            'r' : this.hsl.l * 2.55,
            'g' : this.hsl.l * 2.55,
            'b' : this.hsl.l * 2.55
          };

    }else{

      // set some temporary values
      var p = this.hsl.l < 50
            ? this.hsl.l * (1 + hsl.s / 100)
            : this.hsl.l + hsl.s - hsl.l * hsl.s / 100;
      var q = 2 * hsl.l - p;

      // initialise the RGB components
      this.rgb =
          {
            'r' : (h + 120) / 60 % 6,
            'g' : h / 60,
            'b' : (h + 240) / 60 % 6
          };

      // loop over the RGB components
      for (var key in this.rgb){

        // ensure that the property is not inherited from the root object
        if (this.rgb.hasOwnProperty(key)){

          // set the component to its value in the range [0,100]
          if (this.rgb[key] < 1){
            this.rgb[key] = q + (p - q) * this.rgb[key];
          }else if (this.rgb[key] < 3){
            this.rgb[key] = p;
          }else if (this.rgb[key] < 4){
            this.rgb[key] = q + (p - q) * (4 - this.rgb[key]);
          }else{
            this.rgb[key] = q;
          }

          // set the component to its value in the range [0,255]
          this.rgb[key] *= 2.55;

        }

      }

    }

  },

  /* Calculates and stores the HSV components of this HSLColor so that they can
   * be returned be the getHSL function.
   */
   calculateHSV : function(){

    // set a temporary value
    var t = this.hsl.s * (this.hsl.l < 50 ? this.hsl.l : 100 - this.hsl.l) / 100;

    // store the HSV components
    this.hsv =
        {
          'h' : this.hsl.h,
          's' : 200 * t / (this.hsl.l + t),
          'v' : t + this.hsl.l
        };

    // correct a division-by-zero error
    if (isNaN(this.hsv.s)) this.hsv.s = 0;

  }
 

});
