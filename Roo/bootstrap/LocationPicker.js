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
 * 
 * @cfg {Element} latitudeInput
 * @cfg {Element} longitudeInput
 * @cfg {Element} radiusInput
 * @cfg {Element} locationNameInput
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
    
    latitudeInput: null,
    longitudeInput: null,
    radiusInput: null,
    locationNameInput: null,
    
    enableAutocomplete: false,
    enableReverseGeocode: true,
    draggable: true,
    
    onchanged: function(currentLocation, radius, isMarkerDropped) {},
    onlocationnotfound: function(locationName) {},
    oninitialized: function(component) {},
    
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
        
        this.location = {
            latitude: this.latitude,
            longitude: this.longitude
        }
        
        this.inputBinding = {
            latitudeInput: this.latitudeInput,
            longitudeInput: this.longitudeInput,
            radiusInput: this.radiusInput,
            locationNameInput: this.locationNameInput
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
        
//        google.maps.event.addListener(gmapContext.marker, "dragend", function(event) {
//            GmUtility.setPosition(gmapContext, gmapContext.marker.position, function(context) {
//                var currentLocation = GmUtility.locationFromLatLng(gmapContext.location);
//                context.settings.onchanged.apply(gmapContext.domContainer, [ currentLocation, context.radius, true ]);
//                updateInputValues(gmapContext.settings.inputBinding, gmapContext);
//            });
//        });
//        GmUtility.setPosition(gmapContext, new google.maps.LatLng(settings.location.latitude, settings.location.longitude), function(context) {
//            updateInputValues(settings.inputBinding, gmapContext);
//            setupInputListenersInput(settings.inputBinding, gmapContext);
//            context.settings.oninitialized($target);
//        });
        
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
    }
    
});
