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
 * 
 * @constructor
 * Create a new LocationPicker
 * @param {Object} config The config object
 */

Roo.bootstrap.LocationPicker = function(config){
    Roo.bootstrap.LocationPicker.superclass.constructor.call(this, config);
    
//     this.addEvents({
//            /**
//             * @event show
//             * Fires when this field show.
//             * @param {Roo.bootstrap.DateField} this
//             * @param {Mixed} date The date value
//             */
//            show : true,
//            /**
//             * @event show
//             * Fires when this field hide.
//             * @param {Roo.bootstrap.DateField} this
//             * @param {Mixed} date The date value
//             */
//            hide : true,
//            /**
//             * @event select
//             * Fires when select a date.
//             * @param {Roo.bootstrap.DateField} this
//             * @param {Mixed} date The date value
//             */
//            select : true
//        });
        
};

Roo.extend(Roo.bootstrap.LocationPicker, Roo.bootstrap.Component,  {
    
    gmapContext: false,
    
    latitude: 0,
    longitude: 0,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    disableDoubleClickZoom: false,
    scrollwheel: true,
    streetViewControl: false,
    radius: 0,
    locationName: '',
    draggable: true,
    
    getAutoCreate: function()
    {
        Roo.log('location picker render');
        var cfg = {
            tag: 'div',
            cls: 'roo-location-picker'
        };
        
        return cfg
    },
    
    initEvents: function(ct, position)
    {
        Roo.log('location picker initEvents');
        
        if (this.isApplied()){
            Roo.log('location picker applied');
            return;
        }
        
        this.gmapContext = this.GMapContext(this, {
            zoom: this.zoom,
            center: new google.maps.LatLng(this.latitude, this.longitude),
            mapTypeId: this.mapTypeId,
            mapTypeControl: this.mapTypeControl,
            disableDoubleClickZoom: this.disableDoubleClickZoom,
            scrollwheel: this.scrollwheel,
            streetViewControl: this.streetViewControl,
            radius: this.radius,
            locationName: this.locationName,
            settings: this,
            draggable: this.draggable
        });
        
        google.maps.event.addListener(gmapContext.marker, "dragend", function(event) {
            GmUtility.setPosition(gmapContext, gmapContext.marker.position, function(context) {
//                var currentLocation = GmUtility.locationFromLatLng(gmapContext.location);
//                context.settings.onchanged.apply(gmapContext.domContainer, [ currentLocation, context.radius, true ]);
//                updateInputValues(gmapContext.settings.inputBinding, gmapContext);
            });
        });
        GmUtility.setPosition(gmapContext, new google.maps.LatLng(settings.location.latitude, settings.location.longitude), function(context) {
            updateInputValues(settings.inputBinding, gmapContext);
            setupInputListenersInput(settings.inputBinding, gmapContext);
            context.settings.oninitialized($target);
        });
        
    },
    
    isApplied: function() {
        return this.getGmapContext() == false ? false : true;
    },
    
    getGmapContext: function() {
        return this.gmapContext
    },
    
    GMapContext: function(options) {
        var _map = new google.maps.Map(this.el.dom, options);
        var _marker = new google.maps.Marker({
            position: new google.maps.LatLng(54.19335, -3.92695),
            map: _map,
            title: "Drag Me",
            draggable: options.draggable
        });
        return {
            map: _map,
            marker: _marker,
            circle: null,
            location: _marker.position,
            radius: options.radius,
            locationName: options.locationName,
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
            settings: options.settings,
            domContainer: this.el.dom,
            geodecoder: new google.maps.Geocoder()
        };
    },
    
    drawCircle: function(gmapContext, center, radius, options) 
    {
        if (gmapContext.circle != null) {
            gmapContext.circle.setMap(null);
        }
        if (radius > 0) {
            radius *= 1;
            options = $.extend({
                strokeColor: "#0000FF",
                strokeOpacity: .35,
                strokeWeight: 2,
                fillColor: "#0000FF",
                fillOpacity: .2
            }, options);
            options.map = gmapContext.map;
            options.radius = radius;
            options.center = center;
            gmapContext.circle = new google.maps.Circle(options);
            return gmapContext.circle;
        }
        return null;
    },
    
    setPosition: function(gMapContext, location, callback) 
    {
        gMapContext.location = location;
        gMapContext.marker.setPosition(location);
        gMapContext.map.panTo(location);
        this.drawCircle(gMapContext, location, gMapContext.radius, {});
        if (gMapContext.settings.enableReverseGeocode) {
            gMapContext.geodecoder.geocode({
                latLng: gMapContext.location
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
                    gMapContext.locationName = results[0].formatted_address;
                    gMapContext.addressComponents = GmUtility.address_component_from_google_geocode(results[0].address_components);
                }
                if (callback) {
                    callback.call(this, gMapContext);
                }
            });
        } else {
            if (callback) {
                callback.call(this, gMapContext);
            }
        }
    },
    
    locationFromLatLng: function(lnlg) 
    {
        return {
            latitude: lnlg.lat(),
            longitude: lnlg.lng()
        };
    },
    
    address_component_from_google_geocode: function(address_components) 
    {
        var result = {};
        for (var i = address_components.length - 1; i >= 0; i--) {
            var component = address_components[i];
            if (component.types.indexOf("postal_code") >= 0) {
                result.postalCode = component.short_name;
            } else if (component.types.indexOf("street_number") >= 0) {
                result.streetNumber = component.short_name;
            } else if (component.types.indexOf("route") >= 0) {
                result.streetName = component.short_name;
            } else if (component.types.indexOf("locality") >= 0) {
                result.city = component.short_name;
            } else if (component.types.indexOf("sublocality") >= 0) {
                result.district = component.short_name;
            } else if (component.types.indexOf("administrative_area_level_1") >= 0) {
                result.stateOrProvince = component.short_name;
            } else if (component.types.indexOf("country") >= 0) {
                result.country = component.short_name;
            }
        }
        result.addressLine1 = [ result.streetNumber, result.streetName ].join(" ").trim();
        result.addressLine2 = "";
        return result;
    }
    
});

 