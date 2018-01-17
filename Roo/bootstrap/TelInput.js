/**
 * @class Roo.bootstrap.TelInput
 * @extends Roo.bootstrap.ComboBox
 * A TelInput provides an input control with a list of iso2 telephone format choices.
 
 * @constructor
 * Create a new TelInput.
 * @param {Object} config Configuration options
 */
 
 Roo.extend(Roo.bootstrap.TelInput, Roo.bootstrap.TriggerField, {
      
     Roo.extend(Roo.bootstrap.TelInput, Roo.bootstrap.TriggerField, {
          
          /**
          * @cfg {Number} listWidth The width in pixels of the dropdown list (defaults to the width of the ComboBox field)
          */
         listWidth: undefined,
         
         
         /**
          * @cfg {String} valueField The underlying data value name to bind to this CombBox (defaults to undefined if
          * mode = 'remote' or 'value' if mode = 'local'). 
          * Note: use of a valueField requires the user make a selection
          * in order for a value to be mapped.
          */
         valueField: undefined,
         /**
          * @cfg {String} modalTitle The title of the dialog that pops up on mobile views.
          */
         modalTitle : '',
         
         /**
          * @cfg {String} hiddenName If specified, a hidden form field with this name is dynamically generated to store the
          * field's data value (defaults to the underlying DOM element's name)
          */
         hiddenName: undefined,
         
         /**
          * @cfg {String} listClass CSS class to apply to the dropdown list element (defaults to '')
          */
         listClass: '',
         
         /**
          * @cfg {String} selectedClass CSS class to apply to the selected item in the dropdown list (defaults to 'x-combo-selected')
          */
         selectedClass: 'active',
         
         /**
          * @cfg {Boolean/String} shadow True or "sides" for the default effect, "frame" for 4-way shadow, and "drop" for bottom-right
          */
         shadow:'sides',
         
         /**
          * @cfg {String} listAlign A valid anchor position value. See {@link Roo.Element#alignTo} for details on supported
          * anchor positions (defaults to 'tl-bl')
          */
         listAlign: 'tl-bl?',
         
         /**
          * @cfg {Number} maxHeight The maximum height in pixels of the dropdown list before scrollbars are shown (defaults to 300)
          */
         maxHeight: 300,
         
         /**
          * @cfg {String} triggerAction The action to execute when the trigger field is activated.  Use 'all' to run the
          * query specified by the allQuery config option (defaults to 'query')
          */
         triggerAction: 'query',
         
         /**
          * @cfg {Number} minChars The minimum number of characters the user must type before autocomplete and typeahead activate
          * (defaults to 4, does not apply if editable = false)
          */
         minChars : 4,
         
         /**
          * @cfg {Boolean} typeAhead True to populate and autoselect the remainder of the text being typed after a configurable
          * delay (typeAheadDelay) if it matches a known value (defaults to false)
          */
         typeAhead: false,
         /**
          * @cfg {Number} queryDelay The length of time in milliseconds to delay between the start of typing and sending the
          * query to filter the dropdown list (defaults to 500 if mode = 'remote' or 10 if mode = 'local')
          */
         queryDelay: 500,
         /**
          * @cfg {Number} pageSize If greater than 0, a paging toolbar is displayed in the footer of the dropdown list and the
          * filter queries will execute with page start and limit parameters.  Only applies when mode = 'remote' (defaults to 0)
          */
         pageSize: 0,
         /**
          * @cfg {Boolean} selectOnFocus True to select any existing text in the field immediately on focus.  Only applies
          * when editable = true (defaults to false)
          */
         selectOnFocus:false,
         /**
          * @cfg {String} queryParam Name of the query as it will be passed on the querystring (defaults to 'query')
          */
         queryParam: 'query',
         /**
          * @cfg {String} loadingText The text to display in the dropdown list while data is loading.  Only applies
          * when mode = 'remote' (defaults to 'Loading...')
          */
         loadingText: 'Loading...',
         /**
          * @cfg {Boolean} resizable True to add a resize handle to the bottom of the dropdown list (defaults to false)
          */
         resizable: false,
         /**
          * @cfg {Number} handleHeight The height in pixels of the dropdown list resize handle if resizable = true (defaults to 8)
          */
         handleHeight : 8,
         /**
          * @cfg {Boolean} editable False to prevent the user from typing text directly into the field, just like a
          * traditional select (defaults to true)
          */
         editable: true,
         /**
          * @cfg {String} allQuery The text query to send to the server to return all records for the list with no filtering (defaults to '')
          */
         allQuery: '',
         /**
          * @cfg {String} mode Set to 'local' if the ComboBox loads local data (defaults to 'remote' which loads from the server)
          */
         mode: 'remote',
         /**
          * @cfg {Number} minListWidth The minimum width of the dropdown list in pixels (defaults to 70, will be ignored if
          * listWidth has a higher value)
          */
         minListWidth : 70,
         /**
          * @cfg {Boolean} forceSelection True to restrict the selected value to one of the values in the list, false to
          * allow the user to set arbitrary text into the field (defaults to false)
          */
         forceSelection:false,
         /**
          * @cfg {Number} typeAheadDelay The length of time in milliseconds to wait until the typeahead text is displayed
          * if typeAhead = true (defaults to 250)
          */
         typeAheadDelay : 250,
         /**
          * @cfg {String} valueNotFoundText When using a name/value combo, if the value passed to setValue is not found in
          * the store, valueNotFoundText will be displayed as the field text if defined (defaults to undefined)
          */
         valueNotFoundText : undefined,
         /**
          * @cfg {Boolean} blockFocus Prevents all focus calls, so it can work with things like HTML edtor bar
          */
         blockFocus : false,
         
         /**
          * @cfg {Boolean} disableClear Disable showing of clear button.
          */
         disableClear : false,
         /**
          * @cfg {Boolean} alwaysQuery  Disable caching of results, and always send query
          */
         alwaysQuery : false,
         
         /**
          * @cfg {Boolean} multiple  (true|false) ComboBobArray, default false
          */
         multiple : false,
         
         /**
          * @cfg {String} invalidClass The CSS class to use when marking a field invalid (defaults to "x-form-invalid")
          */
         invalidClass : "has-warning",
         
         /**
          * @cfg {String} validClass The CSS class to use when marking a field valid (defaults to "x-form-invalid")
          */
         validClass : "has-success",
         
         /**
          * @cfg {Boolean} specialFilter (true|false) special filter default false
          */
         specialFilter : false,
         
         /**
          * @cfg {Boolean} mobileTouchView (true|false) show mobile touch view when using a mobile default true
          */
         mobileTouchView : true,
         
         /**
          * @cfg {Boolean} useNativeIOS (true|false) render it as classic select for ios, not support dynamic load data (default false)
          */
         useNativeIOS : false,
         
         ios_options : false,
         
         //private
         addicon : false,
         editicon: false,
         
         page: 0,
         hasQuery: false,
         append: false,
         loadNext: false,
         autoFocus : true,
         tickable : false,
         btnPosition : 'right',
         triggerList : true,
         showToggleBtn : true,
         animate : true,
         emptyResultText: 'Empty',
         triggerText : 'Select',
         emptyTitle : '',
         
         // element that contains real text value.. (when hidden is used..)
         
     
     
     
 
 