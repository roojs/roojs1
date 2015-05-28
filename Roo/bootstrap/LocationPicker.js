/*
 * - LGPL
 *
 * Location Picker
 * 
 */

/**
 * @class Roo.bootstrap.LocationPicker
 * @extends Roo.bootstrap.Component
 * Bootstrap LocationPicker class
 * @cfg {Number} latitude Position when init default 0
 * @cfg {Number} longitude Position when init default 0
 * @cfg {Number} zoom default 15
 * @cfg {String} mapTypeId default google.maps.MapTypeId.ROADMAP
 * @cfg {Boolean} mapTypeControl default false
 * @cfg {Boolean} disableDoubleClickZoom default false
 * @cfg {Boolean} scrollwheel default true
 * @cfg {Boolean} streetViewControl default false
 * @cfg {Number} radius default 0
 * @cfg {String} locationName
 * @cfg {Boolean} draggable default true
 * @cfg {Boolean} enableAutocomplete default false
 * @cfg {Boolean} enableReverseGeocode default true
 * @cfg {String} markerTitle
 * 
 * @constructor
 * Create a new LocationPicker
 * @param {Object} config The config object
 */


Roo.bootstrap.LocationPicker = function(config){
    
    Roo.bootstrap.LocationPicker.superclass.constructor.call(this, config);
    
     this.addEvents({
            /**
             * @event initial
             * Fires when the picker initialized.
             * @param {Roo.bootstrap.LocationPicker} this
             * @param {Google Location} location
             */
            initial : true,
            /**
             * @event positionchanged
             * Fires when the picker position changed.
             * @param {Roo.bootstrap.LocationPicker} this
             * @param {Google Location} location
             */
            positionchanged : true,
            /**
             * @event resize
             * Fires when the map resize.
             * @param {Roo.bootstrap.LocationPicker} this
             */
            resize : true,
            /**
             * @event show
             * Fires when the map show.
             * @param {Roo.bootstrap.LocationPicker} this
             */
            show : true,
            /**
             * @event hide
             * Fires when the map hide.
             * @param {Roo.bootstrap.LocationPicker} this
             */
            hide : true
        });
        
};

Roo.extend(Roo.bootstrap.LocationPicker, Roo.bootstrap.Component,  {
    
    gMapContext: false,
    
    latitude: 0,
    longitude: 0,
    zoom: 15,
    mapTypeId: false,
    mapTypeControl: false,
    disableDoubleClickZoom: false,
    scrollwheel: true,
    streetViewControl: false,
    radius: 0,
    locationName: '',
    draggable: true,
    enableAutocomplete: false,
    enableReverseGeocode: true,
    markerTitle: '',
    
    getAutoCreate: function()
    {

        var cfg = {
            tag: 'div',
            cls: 'roo-location-picker'
        };
        
        return cfg
    },
    
    initEvents: function(ct, position)
    {   
        if(!this.mapTypeId){
            this.mapTypeId = google.maps.MapTypeId.ROADMAP;
        }
            
        if(!this.el.getWidth() || this.isApplied()){
            return;
        }
        
        this.el.setVisibilityMode(Roo.Element.DISPLAY);
        
        this.initial();
    },
    
    initial: function()
    {
        this.gMapContext = this.GMapContext();
        
        var _this = this;
        
        google.maps.event.addListener(this.gMapContext.marker, "dragend", function(event) {
            _this.setPosition(_this.gMapContext.marker.position);
        });
        
        this.setPosition(this.gMapContext.location);
        
        this.fireEvent('initial', this, this.gMapContext.location);
    },
    
    isApplied: function() 
    {
        return this.getGmapContext() == false ? false : true;
    },
    
    getGmapContext: function() 
    {
        return this.gMapContext
    },
    
    GMapContext: function() 
    {
        var _map = new google.maps.Map(this.el.dom, this);
        var _marker = new google.maps.Marker({
            position: new google.maps.LatLng(this.latitude, this.longitude),
            map: _map,
            title: this.markerTitle,
            draggable: this.draggable
        });
        
        return {
            map: _map,
            marker: _marker,
            circle: null,
            location: _marker.position,
            radius: this.radius,
            locationName: this.locationName,
            addressComponents: {
                formatted_address: null,
                addressLine1: null,
                addressLine2: null,
                streetName: null,
                streetNumber: null,
                city: null,
                district: null,
                state: null,
                stateOrProvince: null
            },
            settings: this,
            domContainer: this.el.dom,
            geodecoder: new google.maps.Geocoder()
        };
    },
    
    drawCircle: function(center, radius, options) 
    {
        if (this.gMapContext.circle != null) {
            this.gMapContext.circle.setMap(null);
        }
        if (radius > 0) {
            radius *= 1;
            options = Roo.apply({}, options, {
                strokeColor: "#0000FF",
                strokeOpacity: .35,
                strokeWeight: 2,
                fillColor: "#0000FF",
                fillOpacity: .2
            });
            
            options.map = this.gMapContext.map;
            options.radius = radius;
            options.center = center;
            this.gMapContext.circle = new google.maps.Circle(options);
            return this.gMapContext.circle;
        }
        
        return null;
    },
    
    setPosition: function(location) 
    {
        this.gMapContext.location = location;
        this.gMapContext.marker.setPosition(location);
        this.gMapContext.map.panTo(location);
        this.drawCircle(location, this.gMapContext.radius, {});
        
        var _this = this;
        
        if (this.gMapContext.settings.enableReverseGeocode) {
            this.gMapContext.geodecoder.geocode({
                latLng: this.gMapContext.location
            }, function(results, status) {
                Roo.log(results);
                if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
                    _this.gMapContext.locationName = results[0].formatted_address;
                    _this.gMapContext.addressComponents = _this.address_component_from_google_geocode(results[0].address_components);
                    
                    _this.fireEvent('positionchanged', this, location);
                }
            });
            
            return;
        }
        
        this.fireEvent('positionchanged', this, location);
    },
    
    resize: function()
    {
        google.maps.event.trigger(this.gMapContext.map, "resize");
        
        this.gMapContext.map.setCenter(this.gMapContext.marker.position);
        
        this.fireEvent('resize', this);
    },
    
    setPositionByLatLng: function(latitude, longitude)
    {
        this.setPosition(new google.maps.LatLng(latitude, longitude));
    },
    
    getCurrentPosition: function() 
    {
        return {
            latitude: this.gMapContext.location.lat(),
            longitude: this.gMapContext.location.lng()
        };
    },
    
    getAddressName: function() 
    {
        return this.gMapContext.locationName;
    },
    
    getAddressComponents: function() 
    {
        return this.gMapContext.addressComponents;
    },
    
    address_component_from_google_geocode: function(address_components) 
    {
        var result = {};
        Roo.log(address_components);
        for (var i = address_components.length - 1; i >= 0; i--) {
            var component = address_components[i];
            if (component.types.indexOf("postal_code") >= 0) {
                result.postalCode = component.short_name;
            } else if (component.types.indexOf("street_number") >= 0) {
                result.streetNumber = component.short_name;
            } else if (component.types.indexOf("route") >= 0) {
                result.streetName = component.short_name;
            } else if (component.types.indexOf("neighborhood") >= 0) {
                Roo.log('get neighborhood');
                result.city = component.short_name;
            } else if (component.types.indexOf("locality") >= 0) {
                Roo.log('get locality');
                result.city = component.short_name;
            } else if (component.types.indexOf("sublocality") >= 0) {
                result.district = component.short_name;
            } else if (component.types.indexOf("administrative_area_level_1") >= 0) {
                result.stateOrProvince = component.short_name;
            } else if (component.types.indexOf("country") >= 0) {
                result.country = component.short_name;
            }
        }
        Roo.log(result);
        result.addressLine1 = [ result.streetNumber, result.streetName ].join(" ").trim();
        result.addressLine2 = "";
        return result;
    },
    
    setZoomLevel: function(zoom)
    {
        this.gMapContext.map.setZoom(zoom);
    },
    
    show: function()
    {
        if(!this.el){
            return;
        }
        
        this.el.show();
        
        this.resize();
        
        this.fireEvent('show', this);
    },
    
    hide: function()
    {
        if(!this.el){
            return;
        }
        
        this.el.hide();
        
        this.fireEvent('hide', this);
    }
    
});
