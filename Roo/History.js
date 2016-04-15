/**
 * Originally based of this code... - refactored for Roo...
 *
 * History.js Core
 * @author Benjamin Arthur Lupton <contact@balupton.com>
 * @copyright 2010-2011 Benjamin Arthur Lupton <contact@balupton.com>
 * @license New BSD License <http://creativecommons.org/licenses/BSD/>
 */

Roo.History = {
	 
     
    // ====================================================================
	// Options

    
    /**
     * hashChangeInterval
     * How long should the interval be before hashchange checks
     */
    thishashChangeInterval  : 100,
    
    /**
     * safariPollInterval
     * How long should the interval be before safari poll checks
     */
    safariPollInterval : 500,
    
    /**
     * doubleCheckInterval
     * How long should the interval be before we perform a double check
     */
    doubleCheckInterval : 500,
    
    /**
     * disableSuid
     * Force this.not to append suid
     */
    disableSuid : false,
    
    /**
     * storeInterval
     * How long should we wait between store calls
     */
    storeInterval : 1000,
    
    /**
     * busyDelay
     * How long should we wait between busy events
     */
    busyDelay : 250,
    
    /**
     * debug
     * If true will enable debug messages to be logged
     */
    debug : false,
    
    /**
     * initialTitle
     * What is the title of the initial state
     */
    initialTitle : '',
    
    /**
     * html4Mode
     * If true, will force HTMl4 mode (hashtags)
     */
    html4Mode : false,
    
    /**
     * delayInit
     * Want to override default options and call init manually.
     */
    delayInit : false,
    
    /**
    * History.bugs
    * Which bugs are present
    */
    bugs : {
        /**
        * Safari 5 and Safari iOS 4 fail to return to the correct state once a hash is replaced by a `replaceState` call
        * https://bugs.webkit.org/show_bug.cgi?id=56249
        */
        setHash: false,

       /**
        * Safari 5 and Safari iOS 4 sometimes fail to apply the state change under busy conditions
        * https://bugs.webkit.org/show_bug.cgi?id=42940
        */
       safariPoll: false,

       /**
        * MSIE 6 and 7 sometimes do not apply a hash even it was told to (requiring a second call to the apply function)
        */
       ieDoubleCheck: false,

       /**
        * MSIE 6 requires the entire hash to be encoded for the hashes to trigger the onHashChange event
        */
       hashEscape: false,
    },
     
	// ========================================================================
	// Initialise

	// Localise Globals
	
		  
	sessionStorage : false, // sessionStorage
		 
    intervalList : false, // array normally.
    /**
    * enabled
    * Is History enabled?
    */
    enabled : false,

    // ====================================================================
		// State Storage

    /**
     * store
     * The store for all session specific data
     */
    store :false,

    /**
     * idToState
     * 1-1: State ID to State Object
     */
    idToState : false,

    /**
     * stateToId
     * 1-1: State String to State ID
     */
    stateToId :false,

    /**
     * urlToId
     * 1-1: State URL to State ID
     */
    urlToId : false,

    /**
     * storedStates
     * Store the states in an array
     */
    storedStates : false,

    /**
     * savedStates
     * Saved the states in an array
     */
    savedStates : false,

   /**
    * queues
    * The list of queues to use
    * First In, First Out
    */
    queues : [],

    /**
    * busy.flag
    */
    busy_flag : false,
    
	// Initialise History
	init : function(options){
        
        initialTitle : window.document.title,
        this.store = {};
        this.idToState={};
		this.stateToId={};
		this.urlToId={};
		this.storedStates=[];
		this.savedStates=[];
        this.queues = [];
        
        Roo.apply(this,options)
        
		// Check Load Status of Adapter
		//if ( typeof this.Adapter === 'undefined' ) {
		//	return false;
		//}

		// Check Load Status of Core
		if ( typeof this.initCore !== 'undefined' ) {
			this.initCore();
		}

		// Check Load Status of HTML4 Support
		if ( typeof this.initHtml4 !== 'undefined' ) {
			this.initHtml4();
		}
        
        this.initEmulated();
       
		this.enabled = !this.emulated.pushState;

         
        
        
        
        

		// Return true
		return true;
	},


	// ========================================================================
	// Initialise Core

	// Initialise Core
	initCore : function(options){
		// Initialise
        this.intervalList = [];
        
        
        try {
            this.sessionStorage = window.sessionStorage; // This will throw an exception in some browsers when cookies/localStorage are explicitly disabled (i.e. Chrome)
            this.sessionStorage.setItem('TEST', '1');
            this.sessionStorage.removeItem('TEST');
        } catch(e) {
            this.sessionStorage = false;
        }
        
        
		if ( typeof this.initCore.initialized !== 'undefined' ) {
			// Already Loaded
			return false;
		}
		else {
			this.initCore.initialized = true;
		}
        

    },
		 

    /**
     * clearAllIntervals
     * Clears all setInterval instances.
     */
    clearAllIntervals: function()
    {
        var i, il = this.intervalList;
        if (typeof il !== "undefined" && il !== null) {
            for (i = 0; i < il.length; i++) {
                clearInterval(il[i]);
            }
            this.intervalList = null;
        }
    },


    // ====================================================================
    // Debug

    /**
     * debugLog(message,...)
     * Logs the passed arguments if debug enabled
     */
    debugLog : function()
    {
        if ( (this.debug||false) ) {
            Roo.log.apply(this,arguments);
        }
    },

		 

    // ====================================================================
    // Emulated Status

    /**
     * getInternetExplorerMajorVersion()
     * Get's the major version of Internet Explorer
     * @return {integer}
     * @license Public Domain
     * @author Benjamin Arthur Lupton <contact@balupton.com>
     * @author James Padolsey <https://gist.github.com/527683>
     */
    getInternetExplorerMajorVersion : function(){
        var result = this.getInternetExplorerMajorVersion.cached =
                (typeof this.getInternetExplorerMajorVersion.cached !== 'undefined')
            ?	this.getInternetExplorerMajorVersion.cached
            :	(function(){
                    var v = 3,
                            div = window.document.createElement('div'),
                            all = div.getElementsByTagName('i');
                    while ( (div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->') && all[0] ) {}
                    return (v > 4) ? v : false;
                })()
            ;
        return result;
    },

    /**
     * isInternetExplorer()
     * Are we using Internet Explorer?
     * @return {boolean}
     * @license Public Domain
     * @author Benjamin Arthur Lupton <contact@balupton.com>
     */
    isInternetExplorer : function(){
        var result =
            this.isInternetExplorer.cached =
            (typeof this.isInternetExplorer.cached !== 'undefined')
                ?	this.isInternetExplorer.cached
                :	Boolean(this.getInternetExplorerMajorVersion())
            ;
        return result;
    },
    /**
     * emulated
     * Which features require emulating?
     */

    emulated : {
        pushState : true,
        hashChange: true
    },
    
    initEmulated : function()
    {
    
	
		if (this.html4Mode) {
			return;
		}

		

        this.emulated.pushState = !Boolean(
					window.history && window.history.pushState && window.history.replaceState
					&& !(
						(/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i).test(window.navigator.userAgent) /* disable for versions of iOS before version 4.3 (8F190) */
						|| (/AppleWebKit\/5([0-2]|3[0-2])/i).test(window.navigator.userAgent) /* disable for the mercury iOS browser, or at least older versions of the webkit engine */
					)
				);
        this.emulated.hashChange = Boolean(
					!(('onhashchange' in window) || ('onhashchange' in window.document))
					||
					(this.isInternetExplorer() && this.getInternetExplorerMajorVersion() < 8)
				);
			
	}

	 

    /**
     * isEmptyObject(obj)
     * Checks to see if the Object is Empty
     * @param {Object} obj
     * @return {boolean}
     */
    isEmptyObject = function(obj) {
        for ( var name in obj ) {
            if ( obj.hasOwnProperty(name) ) {
                return false;
            }
        }
        return true;
    };

    /**
     * cloneObject(obj)
     * Clones a object and eliminate all references to the original contexts
     * @param {Object} obj
     * @return {Object}
     */
    cloneObject = function(obj) {
        var hash,newObj;
        if ( obj ) {
            hash = JSON.stringify(obj);
            newObj = JSON.parse(hash);
        }
        else {
            newObj = {};
        }
        return newObj;
    };


    // ====================================================================
    // URL Helpers

    /**
     * getRootUrl()
     * Turns "http://mysite.com/dir/page.html?asd" into "http://mysite.com"
     * @return {String} rootUrl
     */
    getRootUrl = function(){
        // Create
        var rootUrl = window.document.location.protocol+'//'+(window.document.location.hostname||window.document.location.host);
        if ( window.document.location.port||false ) {
            rootUrl += ':'+window.document.location.port;
        }
        rootUrl += '/';

        // Return
        return rootUrl;
    };

    /**
     * getBaseHref()
     * Fetches the `href` attribute of the `<base href="...">` element if it exists
     * @return {String} baseHref
     */
    getBaseHref = function(){
        // Create
        var
            baseElements = window.document.getElementsByTagName('base'),
            baseElement = null,
            baseHref = '';

        // Test for Base Element
        if ( baseElements.length === 1 ) {
            // Prepare for Base Element
            baseElement = baseElements[0];
            baseHref = baseElement.href.replace(/[^\/]+$/,'');
        }

        // Adjust trailing slash
        baseHref = baseHref.replace(/\/+$/,'');
        if ( baseHref ) baseHref += '/';

        // Return
        return baseHref;
    };

    /**
     * getBaseUrl()
     * Fetches the baseHref or basePageUrl or rootUrl (whichever one exists first)
     * @return {String} baseUrl
     */
    getBaseUrl = function(){
        // Create
        var baseUrl = this.getBaseHref()||this.getBasePageUrl()||this.getRootUrl();

        // Return
        return baseUrl;
    };

    /**
     * getPageUrl()
     * Fetches the URL of the current page
     * @return {String} pageUrl
     */
    getPageUrl = function(){
        // Fetch
        var
            State = this.getState(false,false),
            stateUrl = (State||{}).url||this.getLocationHref(),
            pageUrl;

        // Create
        pageUrl = stateUrl.replace(/\/+$/,'').replace(/[^\/]+$/,function(part,index,string){
            return (/\./).test(part) ? part : part+'/';
        });

        // Return
        return pageUrl;
    };

    /**
     * getBasePageUrl()
     * Fetches the Url of the directory of the current page
     * @return {String} basePageUrl
     */
    getBasePageUrl = function(){
        // Create
        var basePageUrl = (this.getLocationHref()).replace(/[#\?].*/,'').replace(/[^\/]+$/,function(part,index,string){
            return (/[^\/]$/).test(part) ? '' : part;
        }).replace(/\/+$/,'')+'/';

        // Return
        return basePageUrl;
    };

    /**
     * getFullUrl(url)
     * Ensures that we have an absolute URL and not a relative URL
     * @param {string} url
     * @param {Boolean} allowBaseHref
     * @return {string} fullUrl
     */
    getFullUrl = function(url,allowBaseHref){
        // Prepare
        var fullUrl = url, firstChar = url.substring(0,1);
        allowBaseHref = (typeof allowBaseHref === 'undefined') ? true : allowBaseHref;

        // Check
        if ( /[a-z]+\:\/\//.test(url) ) {
            // Full URL
        }
        else if ( firstChar === '/' ) {
            // Root URL
            fullUrl = this.getRootUrl()+url.replace(/^\/+/,'');
        }
        else if ( firstChar === '#' ) {
            // Anchor URL
            fullUrl = this.getPageUrl().replace(/#.*/,'')+url;
        }
        else if ( firstChar === '?' ) {
            // Query URL
            fullUrl = this.getPageUrl().replace(/[\?#].*/,'')+url;
        }
        else {
            // Relative URL
            if ( allowBaseHref ) {
                fullUrl = this.getBaseUrl()+url.replace(/^(\.\/)+/,'');
            } else {
                fullUrl = this.getBasePageUrl()+url.replace(/^(\.\/)+/,'');
            }
            // We have an if condition above as we do not want hashes
            // which are relative to the baseHref in our URLs
            // as if the baseHref changes, then all our bookmarks
            // would now point to different locations
            // whereas the basePageUrl will always stay the same
        }

        // Return
        return fullUrl.replace(/\#$/,'');
    };

    /**
     * getShortUrl(url)
     * Ensures that we have a relative URL and not a absolute URL
     * @param {string} url
     * @return {string} url
     */
    getShortUrl = function(url){
        // Prepare
        var shortUrl = url, baseUrl = this.getBaseUrl(), rootUrl = this.getRootUrl();

        // Trim baseUrl
        if ( this.emulated.pushState ) {
            // We are in a if statement as when pushState is not emulated
            // The actual url these short urls are relative to can change
            // So within the same session, we the url may end up somewhere different
            shortUrl = shortUrl.replace(baseUrl,'');
        }

        // Trim rootUrl
        shortUrl = shortUrl.replace(rootUrl,'/');

        // Ensure we can still detect it as a state
        if ( this.isTraditionalAnchor(shortUrl) ) {
            shortUrl = './'+shortUrl;
        }

        // Clean It
        shortUrl = shortUrl.replace(/^(\.\/)+/g,'./').replace(/\#$/,'');

        // Return
        return shortUrl;
    };

    /**
     * getLocationHref(document)
     * Returns a normalized version of document.location.href
     * accounting for browser inconsistencies, etc.
     *
     * This URL will be URI-encoded and will include the hash
     *
     * @param {object} document
     * @return {string} url
     */
    getLocationHref = function(doc) {
        doc = doc || window.document;

        // most of the time, this will be true
        if (doc.URL === doc.location.href)
            return doc.location.href;

        // some versions of webkit URI-decode document.location.href
        // but they leave document.URL in an encoded state
        if (doc.location.href === decodeURIComponent(doc.URL))
            return doc.URL;

        // FF 3.6 only updates document.URL when a page is reloaded
        // document.location.href is updated correctly
        if (doc.location.hash && decodeURIComponent(doc.location.href.replace(/^[^#]+/, "")) === doc.location.hash)
            return doc.location.href;

        if (doc.URL.indexOf('#') == -1 && doc.location.href.indexOf('#') != -1)
            return doc.location.href;
        
        return doc.URL || doc.location.href;
    };


		
    /**
     * noramlizeStore()
     * Noramlize the store by adding necessary values
     */
    normalizeStore = function(){
        this.store.idToState = this.store.idToState||{};
        this.store.urlToId = this.store.urlToId||{};
        this.store.stateToId = this.store.stateToId||{};
    };

    /**
     * getState()
     * Get an object containing the data, title and url of the current state
     * @param {Boolean} friendly
     * @param {Boolean} create
     * @return {Object} State
     */
    getState : function(friendly,create){
        // Prepare
        if ( typeof friendly === 'undefined' ) { friendly = true; }
        if ( typeof create === 'undefined' ) { create = true; }

        // Fetch
        var State = this.getLastSavedState();

        // Create
        if ( !State && create ) {
            State = this.createStateObject();
        }

        // Adjust
        if ( friendly ) {
            State = this.cloneObject(State);
            State.url = this.cleanUrl||State.url;
        }

        // Return
        return State;
    };

		/**
		 * getIdByState(State)
		 * Gets a ID for a State
		 * @param {State} newState
		 * @return {String} id
		 */
		getIdByState = function(newState){

			// Fetch ID
			var id = this.extractId(newState.url),
				str;

			if ( !id ) {
				// Find ID via State String
				str = this.getStateString(newState);
				if ( typeof this.stateToId[str] !== 'undefined' ) {
					id = this.stateToId[str];
				}
				else if ( typeof this.store.stateToId[str] !== 'undefined' ) {
					id = this.store.stateToId[str];
				}
				else {
					// Generate a new ID
					while ( true ) {
						id = (new Date()).getTime() + String(Math.random()).replace(/\D/g,'');
						if ( typeof this.idToState[id] === 'undefined' && typeof this.store.idToState[id] === 'undefined' ) {
							break;
						}
					}

					// Apply the new State to the ID
					this.stateToId[str] = id;
					this.idToState[id] = newState;
				}
			}

			// Return ID
			return id;
		};

		/**
		 * normalizeState(State)
		 * Expands a State Object
		 * @param {object} State
		 * @return {object}
		 */
		normalizeState = function(oldState){
			// Variables
			var newState, dataNotEmpty;

			// Prepare
			if ( !oldState || (typeof oldState !== 'object') ) {
				oldState = {};
			}

			// Check
			if ( typeof oldState.normalized !== 'undefined' ) {
				return oldState;
			}

			// Adjust
			if ( !oldState.data || (typeof oldState.data !== 'object') ) {
				oldState.data = {};
			}

			// ----------------------------------------------------------------

			// Create
			newState = {};
			newState.normalized = true;
			newState.title = oldState.title||'';
			newState.url = this.getFullUrl(oldState.url?oldState.url:(this.getLocationHref()));
			newState.hash = this.getShortUrl(newState.url);
			newState.data = this.cloneObject(oldState.data);

			// Fetch ID
			newState.id = this.getIdByState(newState);

			// ----------------------------------------------------------------

			// Clean the URL
			newState.cleanUrl = newState.url.replace(/\??\&_suid.*/,'');
			newState.url = newState.cleanUrl;

			// Check to see if we have more than just a url
			dataNotEmpty = !this.isEmptyObject(newState.data);

			// Apply
			if ( (newState.title || dataNotEmpty) && this.disableSuid !== true ) {
				// Add ID to Hash
				newState.hash = this.getShortUrl(newState.url).replace(/\??\&_suid.*/,'');
				if ( !/\?/.test(newState.hash) ) {
					newState.hash += '?';
				}
				newState.hash += '&_suid='+newState.id;
			}

			// Create the Hashed URL
			newState.hashedUrl = this.getFullUrl(newState.hash);

			// ----------------------------------------------------------------

			// Update the URL if we have a duplicate
			if ( (this.emulated.pushState || this.bugs.safariPoll) && this.hasUrlDuplicate(newState) ) {
				newState.url = newState.hashedUrl;
			}

			// ----------------------------------------------------------------

			// Return
			return newState;
		};

		/**
		 * createStateObject(data,title,url)
		 * Creates a object based on the data, title and url state params
		 * @param {object} data
		 * @param {string} title
		 * @param {string} url
		 * @return {object}
		 */
		createStateObject = function(data,title,url){
			// Hashify
			var State = {
				'data': data,
				'title': title,
				'url': url
			};

			// Expand the State
			State = this.normalizeState(State);

			// Return object
			return State;
		};

		/**
		 * getStateById(id)
		 * Get a state by it's UID
		 * @param {String} id
		 */
		getStateById = function(id){
			// Prepare
			id = String(id);

			// Retrieve
			var State = this.idToState[id] || this.store.idToState[id] || undefined;

			// Return State
			return State;
		};

		/**
		 * Get a State's String
		 * @param {State} passedState
		 */
		getStateString = function(passedState){
			// Prepare
			var State, cleanedState, str;

			// Fetch
			State = this.normalizeState(passedState);

			// Clean
			cleanedState = {
				data: State.data,
				title: passedState.title,
				url: passedState.url
			};

			// Fetch
			str = JSON.stringify(cleanedState);

			// Return
			return str;
		};

		/**
		 * Get a State's ID
		 * @param {State} passedState
		 * @return {String} id
		 */
		getStateId = function(passedState){
			// Prepare
			var State, id;

			// Fetch
			State = this.normalizeState(passedState);

			// Fetch
			id = State.id;

			// Return
			return id;
		};

		/**
		 * getHashByState(State)
		 * Creates a Hash for the State Object
		 * @param {State} passedState
		 * @return {String} hash
		 */
		getHashByState = function(passedState){
			// Prepare
			var State, hash;

			// Fetch
			State = this.normalizeState(passedState);

			// Hash
			hash = State.hash;

			// Return
			return hash;
		};

		/**
		 * extractId(url_or_hash)
		 * Get a State ID by it's URL or Hash
		 * @param {string} url_or_hash
		 * @return {string} id
		 */
		this.extractId = function ( url_or_hash ) {
			// Prepare
			var id,parts,url, tmp;

			// Extract
			
			// If the URL has a #, use the id from before the #
			if (url_or_hash.indexOf('#') != -1)
			{
				tmp = url_or_hash.split("#")[0];
			}
			else
			{
				tmp = url_or_hash;
			}
			
			parts = /(.*)\&_suid=([0-9]+)$/.exec(tmp);
			url = parts ? (parts[1]||url_or_hash) : url_or_hash;
			id = parts ? String(parts[2]||'') : '';

			// Return
			return id||false;
		};

		/**
		 * isTraditionalAnchor
		 * Checks to see if the url is a traditional anchor or not
		 * @param {String} url_or_hash
		 * @return {Boolean}
		 */
		isTraditionalAnchor = function(url_or_hash){
			// Check
			var isTraditional = !(/[\/\?\.]/.test(url_or_hash));

			// Return
			return isTraditional;
		};

		/**
		 * extractState
		 * Get a State by it's URL or Hash
		 * @param {String} url_or_hash
		 * @return {State|null}
		 */
		extractState = function(url_or_hash,create){
			// Prepare
			var State = null, id, url;
			create = create||false;

			// Fetch SUID
			id = this.extractId(url_or_hash);
			if ( id ) {
				State = this.getStateById(id);
			}

			// Fetch SUID returned no State
			if ( !State ) {
				// Fetch URL
				url = this.getFullUrl(url_or_hash);

				// Check URL
				id = this.getIdByUrl(url)||false;
				if ( id ) {
					State = this.getStateById(id);
				}

				// Create State
				if ( !State && create && !this.isTraditionalAnchor(url_or_hash) ) {
					State = this.createStateObject(null,null,url);
				}
			}

			// Return
			return State;
		};

		/**
		 * getIdByUrl()
		 * Get a State ID by a State URL
		 */
		getIdByUrl = function(url){
			// Fetch
			var id = this.urlToId[url] || this.store.urlToId[url] || undefined;

			// Return
			return id;
		};

		/**
		 * getLastSavedState()
		 * Get an object containing the data, title and url of the current state
		 * @return {Object} State
		 */
		getLastSavedState = function(){
			return this.savedStates[this.savedStates.length-1]||undefined;
		};

		/**
		 * getLastStoredState()
		 * Get an object containing the data, title and url of the current state
		 * @return {Object} State
		 */
		getLastStoredState = function(){
			return this.storedStates[this.storedStates.length-1]||undefined;
		};

		/**
		 * hasUrlDuplicate
		 * Checks if a Url will have a url conflict
		 * @param {Object} newState
		 * @return {Boolean} hasDuplicate
		 */
		hasUrlDuplicate = function(newState) {
			// Prepare
			var hasDuplicate = false,
				oldState;

			// Fetch
			oldState = this.extractState(newState.url);

			// Check
			hasDuplicate = oldState && oldState.id !== newState.id;

			// Return
			return hasDuplicate;
		};

		/**
		 * storeState
		 * Store a State
		 * @param {Object} newState
		 * @return {Object} newState
		 */
		storeState = function(newState){
			// Store the State
			this.urlToId[newState.url] = newState.id;

			// Push the State
			this.storedStates.push(this.cloneObject(newState));

			// Return newState
			return newState;
		};

		/**
		 * isLastSavedState(newState)
		 * Tests to see if the state is the last state
		 * @param {Object} newState
		 * @return {boolean} isLast
		 */
		isLastSavedState = function(newState){
			// Prepare
			var isLast = false,
				newId, oldState, oldId;

			// Check
			if ( this.savedStates.length ) {
				newId = newState.id;
				oldState = this.getLastSavedState();
				oldId = oldState.id;

				// Check
				isLast = (newId === oldId);
			}

			// Return
			return isLast;
		};

		/**
		 * saveState
		 * Push a State
		 * @param {Object} newState
		 * @return {boolean} changed
		 */
		saveState = function(newState){
			// Check Hash
			if ( this.isLastSavedState(newState) ) {
				return false;
			}

			// Push the State
			this.savedStates.push(this.cloneObject(newState));

			// Return true
			return true;
		};

		/**
		 * getStateByIndex()
		 * Gets a state by the index
		 * @param {integer} index
		 * @return {Object}
		 */
		getStateByIndex = function(index){
			// Prepare
			var State = null;

			// Handle
			if ( typeof index === 'undefined' ) {
				// Get the last inserted
				State = this.savedStates[this.savedStates.length-1];
			}
			else if ( index < 0 ) {
				// Get from the end
				State = this.savedStates[this.savedStates.length+index];
			}
			else {
				// Get from the beginning
				State = this.savedStates[index];
			}

			// Return State
			return State;
		};
		
		/**
		 * getCurrentIndex()
		 * Gets the current index
		 * @return (integer)
		*/
		getCurrentIndex = function(){
			// Prepare
			var index = null;
			
			// No states saved
			if(this.savedStates.length < 1) {
				index = 0;
			}
			else {
				index = this.savedStates.length-1;
			}
			return index;
		};

		// ====================================================================
		// Hash Helpers

		/**
		 * getHash()
		 * @param {Location=} location
		 * Gets the current document hash
		 * Note: unlike location.hash, this is guaranteed to return the escaped hash in all browsers
		 * @return {string}
		 */
		getHash = function(doc){
			var url = this.getLocationHref(doc),
				hash;
			hash = this.getHashByUrl(url);
			return hash;
		};

		/**
		 * unescapeHash()
		 * normalize and Unescape a Hash
		 * @param {String} hash
		 * @return {string}
		 */
		unescapeHash = function(hash){
			// Prepare
			var result = this.normalizeHash(hash);

			// Unescape hash
			result = decodeURIComponent(result);

			// Return result
			return result;
		};

		/**
		 * normalizeHash()
		 * normalize a hash across browsers
		 * @return {string}
		 */
		normalizeHash = function(hash){
			// Prepare
			var result = hash.replace(/[^#]*#/,'').replace(/#.*/, '');

			// Return result
			return result;
		};

		/**
		 * setHash(hash)
		 * Sets the document hash
		 * @param {string} hash
		 * @return {Roo.History}
		 */
		setHash = function(hash,queue){
			// Prepare
			var State, pageUrl;

			// Handle Queueing
			if ( queue !== false && this.busy() ) {
				// Wait + Push to Queue
				//this.debug('this.setHash: we must wait', arguments);
				this.pushQueue({
					scope: this.
					callback: this.setHash,
					args: arguments,
					queue: queue
				});
				return false;
			}

			// Log
			//this.debug('this.setHash: called',hash);

			// Make Busy + Continue
			this.busy(true);

			// Check if hash is a state
			State = this.extractState(hash,true);
			if ( State && !this.emulated.pushState ) {
				// Hash is a state so skip the setHash
				//this.debug('this.setHash: Hash is a state so skipping the hash set with a direct pushState call',arguments);

				// PushState
				this.pushState(State.data,State.title,State.url,false);
			}
			else if ( this.getHash() !== hash ) {
				// Hash is a proper hash, so apply it

				// Handle browser bugs
				if ( this.bugs.setHash ) {
					// Fix Safari Bug https://bugs.webkit.org/show_bug.cgi?id=56249

					// Fetch the base page
					pageUrl = this.getPageUrl();

					// Safari hash apply
					this.pushState(null,null,pageUrl+'#'+hash,false);
				}
				else {
					// Normal hash apply
					window.document.location.hash = hash;
				}
			}

			// Chain
			return this;
		};

		/**
		 * escape()
		 * normalize and Escape a Hash
		 * @return {string}
		 */
		escapeHash = function(hash){
			// Prepare
			var result = normalizeHash(hash);

			// Escape hash
			result = window.encodeURIComponent(result);

			// IE6 Escape Bug
			if ( !this.bugs.hashEscape ) {
				// Restore common parts
				result = result
					.replace(/\%21/g,'!')
					.replace(/\%26/g,'&')
					.replace(/\%3D/g,'=')
					.replace(/\%3F/g,'?');
			}

			// Return result
			return result;
		};

		/**
		 * getHashByUrl(url)
		 * Extracts the Hash from a URL
		 * @param {string} url
		 * @return {string} url
		 */
		getHashByUrl = function(url){
			// Extract the hash
			var hash = String(url)
				.replace(/([^#]*)#?([^#]*)#?(.*)/, '$2')
				;

			// Unescape hash
			hash = this.unescapeHash(hash);

			// Return hash
			return hash;
		};

		/**
		 * setTitle(title)
		 * Applies the title to the document
		 * @param {State} newState
		 * @return {Boolean}
		 */
		setTitle = function(newState){
			// Prepare
			var title = newState.title,
				firstState;

			// Initial
			if ( !title ) {
				firstState = this.getStateByIndex(0);
				if ( firstState && firstState.url === newState.url ) {
					title = firstState.title||this.initialTitle;
				}
			}

			// Apply
			try {
				window.document.getElementsByTagName('title')[0].innerHTML = title.replace('<','&lt;').replace('>','&gt;').replace(' & ',' &amp; ');
			}
			catch ( Exception ) { }
			window.document.title = title;

			// Chain
			return this;
		};


		// ====================================================================
		// Queueing


		/**
		 * busy(value)
		 * @param {boolean} value [optional]
		 * @return {boolean} busy
		 */
		busy = function(value){
			// Apply
			if ( typeof value !== 'undefined' ) {
				//this.debug('this.busy: changing ['+(this.busy.flag||false)+'] to ['+(value||false)+']', this.queues.length);
				this.busy.flag = value;
			}
			// Default
			else if ( typeof this.busy.flag === 'undefined' ) {
				this.busy.flag = false;
			}

			// Queue
			if ( !this.busy.flag ) {
				// Execute the next item in the queue
				window.clearTimeout(this.busy.timeout);
				var fireNext = function(){
					var i, queue, item;
					if ( this.busy.flag ) return;
					for ( i=this.queues.length-1; i >= 0; --i ) {
						queue = this.queues[i];
						if ( queue.length === 0 ) continue;
						item = queue.shift();
						this.fireQueueItem(item);
						this.busy.timeout = window.setTimeout(fireNext,this.busyDelay);
					}
				};
				this.busy.timeout = window.setTimeout(fireNext,this.busyDelay);
			}

			// Return
			return this.busy.flag;
		};

		

		/**
		 * History.fireQueueItem(item)
		 * Fire a Queue Item
		 * @param {Object} item
		 * @return {Mixed} result
		 */
		History.fireQueueItem = function(item){
			return item.callback.apply(item.scope||History,item.args||[]);
		};

		/**
		 * History.pushQueue(callback,args)
		 * Add an item to the queue
		 * @param {Object} item [scope,callback,args,queue]
		 */
		History.pushQueue = function(item){
			// Prepare the queue
			History.queues[item.queue||0] = History.queues[item.queue||0]||[];

			// Add to the queue
			History.queues[item.queue||0].push(item);

			// Chain
			return History;
		};

		/**
		 * History.queue (item,queue), (func,queue), (func), (item)
		 * Either firs the item now if not busy, or adds it to the queue
		 */
		History.queue = function(item,queue){
			// Prepare
			if ( typeof item === 'function' ) {
				item = {
					callback: item
				};
			}
			if ( typeof queue !== 'undefined' ) {
				item.queue = queue;
			}

			// Handle
			if ( History.busy() ) {
				History.pushQueue(item);
			} else {
				History.fireQueueItem(item);
			}

			// Chain
			return History;
		};

		/**
		 * History.clearQueue()
		 * Clears the Queue
		 */
		History.clearQueue = function(){
			History.busy.flag = false;
			History.queues = [];
			return History;
		};


		// ====================================================================
		// IE Bug Fix

		/**
		 * History.stateChanged
		 * States whether or not the state has changed since the last double check was initialised
		 */
		History.stateChanged = false;

		/**
		 * History.doubleChecker
		 * Contains the timeout used for the double checks
		 */
		History.doubleChecker = false;

		/**
		 * History.doubleCheckComplete()
		 * Complete a double check
		 * @return {History}
		 */
		History.doubleCheckComplete = function(){
			// Update
			History.stateChanged = true;

			// Clear
			History.doubleCheckClear();

			// Chain
			return History;
		};

		/**
		 * History.doubleCheckClear()
		 * Clear a double check
		 * @return {History}
		 */
		History.doubleCheckClear = function(){
			// Clear
			if ( History.doubleChecker ) {
				window.clearTimeout(History.doubleChecker);
				History.doubleChecker = false;
			}

			// Chain
			return History;
		};

		/**
		 * History.doubleCheck()
		 * Create a double check
		 * @return {History}
		 */
		History.doubleCheck = function(tryAgain){
			// Reset
			History.stateChanged = false;
			History.doubleCheckClear();

			// Fix IE6,IE7 bug where calling history.back or history.forward does not actually change the hash (whereas doing it manually does)
			// Fix Safari 5 bug where sometimes the state does not change: https://bugs.webkit.org/show_bug.cgi?id=42940
			if ( History.bugs.ieDoubleCheck ) {
				// Apply Check
				History.doubleChecker = window.setTimeout(
					function(){
						History.doubleCheckClear();
						if ( !History.stateChanged ) {
							//History.debug('History.doubleCheck: State has not yet changed, trying again', arguments);
							// Re-Attempt
							tryAgain();
						}
						return true;
					},
					this.doubleCheckInterval
				);
			}

			// Chain
			return History;
		};


		// ====================================================================
		// Safari Bug Fix

		/**
		 * History.safariStatePoll()
		 * Poll the current state
		 * @return {History}
		 */
		History.safariStatePoll = function(){
			// Poll the URL

			// Get the Last State which has the new URL
			var
				urlState = History.extractState(History.getLocationHref()),
				newState;

			// Check for a difference
			if ( !History.isLastSavedState(urlState) ) {
				newState = urlState;
			}
			else {
				return;
			}

			// Check if we have a state with that url
			// If not create it
			if ( !newState ) {
				//History.debug('History.safariStatePoll: new');
				newState = History.createStateObject();
			}

			// Apply the New State
			//History.debug('History.safariStatePoll: trigger');
			History.Adapter.trigger(window,'popstate');

			// Chain
			return History;
		};


		// ====================================================================
		// State Aliases

		/**
		 * History.back(queue)
		 * Send the browser history back one item
		 * @param {Integer} queue [optional]
		 */
		History.back = function(queue){
			//History.debug('History.back: called', arguments);

			// Handle Queueing
			if ( queue !== false && History.busy() ) {
				// Wait + Push to Queue
				//History.debug('History.back: we must wait', arguments);
				History.pushQueue({
					scope: History,
					callback: History.back,
					args: arguments,
					queue: queue
				});
				return false;
			}

			// Make Busy + Continue
			History.busy(true);

			// Fix certain browser bugs that prevent the state from changing
			History.doubleCheck(function(){
				History.back(false);
			});

			// Go back
			history.go(-1);

			// End back closure
			return true;
		};

		/**
		 * History.forward(queue)
		 * Send the browser history forward one item
		 * @param {Integer} queue [optional]
		 */
		History.forward = function(queue){
			//History.debug('History.forward: called', arguments);

			// Handle Queueing
			if ( queue !== false && History.busy() ) {
				// Wait + Push to Queue
				//History.debug('History.forward: we must wait', arguments);
				History.pushQueue({
					scope: History,
					callback: History.forward,
					args: arguments,
					queue: queue
				});
				return false;
			}

			// Make Busy + Continue
			History.busy(true);

			// Fix certain browser bugs that prevent the state from changing
			History.doubleCheck(function(){
				History.forward(false);
			});

			// Go forward
			history.go(1);

			// End forward closure
			return true;
		};

		/**
		 * History.go(index,queue)
		 * Send the browser history back or forward index times
		 * @param {Integer} queue [optional]
		 */
		History.go = function(index,queue){
			//History.debug('History.go: called', arguments);

			// Prepare
			var i;

			// Handle
			if ( index > 0 ) {
				// Forward
				for ( i=1; i<=index; ++i ) {
					History.forward(queue);
				}
			}
			else if ( index < 0 ) {
				// Backward
				for ( i=-1; i>=index; --i ) {
					History.back(queue);
				}
			}
			else {
				throw new Error('History.go: History.go requires a positive or negative integer passed.');
			}

			// Chain
			return History;
		};


		// ====================================================================
		// HTML5 State Support

		// Non-Native pushState Implementation
		if ( History.emulated.pushState ) {
			/*
			 * Provide Skeleton for HTML4 Browsers
			 */

			// Prepare
			var emptyFunction = function(){};
			History.pushState = History.pushState||emptyFunction;
			History.replaceState = History.replaceState||emptyFunction;
		} // History.emulated.pushState

		// Native pushState Implementation
		else {
			/*
			 * Use native HTML5 History API Implementation
			 */

			/**
			 * History.onPopState(event,extra)
			 * Refresh the Current State
			 */
			History.onPopState = function(event,extra){
				// Prepare
				var stateId = false, newState = false, currentHash, currentState;

				// Reset the double check
				History.doubleCheckComplete();

				// Check for a Hash, and handle apporiatly
				currentHash = History.getHash();
				if ( currentHash ) {
					// Expand Hash
					currentState = History.extractState(currentHash||History.getLocationHref(),true);
					if ( currentState ) {
						// We were able to parse it, it must be a State!
						// Let's forward to replaceState
						//History.debug('History.onPopState: state anchor', currentHash, currentState);
						History.replaceState(currentState.data, currentState.title, currentState.url, false);
					}
					else {
						// Traditional Anchor
						//History.debug('History.onPopState: traditional anchor', currentHash);
						History.Adapter.trigger(window,'anchorchange');
						History.busy(false);
					}

					// We don't care for hashes
					History.expectedStateId = false;
					return false;
				}

				// Ensure
				stateId = History.Adapter.extractEventData('state',event,extra) || false;

				// Fetch State
				if ( stateId ) {
					// Vanilla: Back/forward button was used
					newState = History.getStateById(stateId);
				}
				else if ( History.expectedStateId ) {
					// Vanilla: A new state was pushed, and popstate was called manually
					newState = History.getStateById(History.expectedStateId);
				}
				else {
					// Initial State
					newState = History.extractState(History.getLocationHref());
				}

				// The State did not exist in our store
				if ( !newState ) {
					// Regenerate the State
					newState = History.createStateObject(null,null,History.getLocationHref());
				}

				// Clean
				History.expectedStateId = false;

				// Check if we are the same state
				if ( History.isLastSavedState(newState) ) {
					// There has been no change (just the page's hash has finally propagated)
					//History.debug('History.onPopState: no change', newState, History.savedStates);
					History.busy(false);
					return false;
				}

				// Store the State
				History.storeState(newState);
				History.saveState(newState);

				// Force update of the title
				History.setTitle(newState);

				// Fire Our Event
				History.Adapter.trigger(window,'statechange');
				History.busy(false);

				// Return true
				return true;
			};
			History.Adapter.bind(window,'popstate',History.onPopState);

			/**
			 * History.pushState(data,title,url)
			 * Add a new State to the history object, become it, and trigger onpopstate
			 * We have to trigger for HTML4 compatibility
			 * @param {object} data
			 * @param {string} title
			 * @param {string} url
			 * @return {true}
			 */
			History.pushState = function(data,title,url,queue){
				//History.debug('History.pushState: called', arguments);

				// Check the State
				if ( History.getHashByUrl(url) && History.emulated.pushState ) {
					throw new Error('History.js does not support states with fragement-identifiers (hashes/anchors).');
				}

				// Handle Queueing
				if ( queue !== false && History.busy() ) {
					// Wait + Push to Queue
					//History.debug('History.pushState: we must wait', arguments);
					History.pushQueue({
						scope: History,
						callback: History.pushState,
						args: arguments,
						queue: queue
					});
					return false;
				}

				// Make Busy + Continue
				History.busy(true);

				// Create the newState
				var newState = History.createStateObject(data,title,url);

				// Check it
				if ( History.isLastSavedState(newState) ) {
					// Won't be a change
					History.busy(false);
				}
				else {
					// Store the newState
					History.storeState(newState);
					History.expectedStateId = newState.id;

					// Push the newState
					history.pushState(newState.id,newState.title,newState.url);

					// Fire HTML5 Event
					History.Adapter.trigger(window,'popstate');
				}

				// End pushState closure
				return true;
			};

			/**
			 * History.replaceState(data,title,url)
			 * Replace the State and trigger onpopstate
			 * We have to trigger for HTML4 compatibility
			 * @param {object} data
			 * @param {string} title
			 * @param {string} url
			 * @return {true}
			 */
			History.replaceState = function(data,title,url,queue){
				//History.debug('History.replaceState: called', arguments);

				// Check the State
				if ( History.getHashByUrl(url) && History.emulated.pushState ) {
					throw new Error('History.js does not support states with fragement-identifiers (hashes/anchors).');
				}

				// Handle Queueing
				if ( queue !== false && History.busy() ) {
					// Wait + Push to Queue
					//History.debug('History.replaceState: we must wait', arguments);
					History.pushQueue({
						scope: History,
						callback: History.replaceState,
						args: arguments,
						queue: queue
					});
					return false;
				}

				// Make Busy + Continue
				History.busy(true);

				// Create the newState
				var newState = History.createStateObject(data,title,url);

				// Check it
				if ( History.isLastSavedState(newState) ) {
					// Won't be a change
					History.busy(false);
				}
				else {
					// Store the newState
					History.storeState(newState);
					History.expectedStateId = newState.id;

					// Push the newState
					history.replaceState(newState.id,newState.title,newState.url);

					// Fire HTML5 Event
					History.Adapter.trigger(window,'popstate');
				}

				// End replaceState closure
				return true;
			};

		} // !History.emulated.pushState


		// ====================================================================
		// Initialise

		/**
		 * Load the Store
		 */
		if ( sessionStorage ) {
			// Fetch
			try {
				History.store = JSON.parse(sessionStorage.getItem('History.store'))||{};
			}
			catch ( err ) {
				History.store = {};
			}

			// Normalize
			History.normalizeStore();
		}
		else {
			// Default Load
			History.store = {};
			History.normalizeStore();
		}

		/**
		 * Clear Intervals on exit to prevent memory leaks
		 */
		History.Adapter.bind(window,"unload",History.clearAllIntervals);

		/**
		 * Create the initial State
		 */
		History.saveState(History.storeState(History.extractState(History.getLocationHref(),true)));

		/**
		 * Bind for Saving Store
		 */
		if ( sessionStorage ) {
			// When the page is closed
			History.onUnload = function(){
				// Prepare
				var	currentStore, item, currentStoreString;

				// Fetch
				try {
					currentStore = JSON.parse(sessionStorage.getItem('History.store'))||{};
				}
				catch ( err ) {
					currentStore = {};
				}

				// Ensure
				currentStore.idToState = currentStore.idToState || {};
				currentStore.urlToId = currentStore.urlToId || {};
				currentStore.stateToId = currentStore.stateToId || {};

				// Sync
				for ( item in History.idToState ) {
					if ( !History.idToState.hasOwnProperty(item) ) {
						continue;
					}
					currentStore.idToState[item] = History.idToState[item];
				}
				for ( item in History.urlToId ) {
					if ( !History.urlToId.hasOwnProperty(item) ) {
						continue;
					}
					currentStore.urlToId[item] = History.urlToId[item];
				}
				for ( item in History.stateToId ) {
					if ( !History.stateToId.hasOwnProperty(item) ) {
						continue;
					}
					currentStore.stateToId[item] = History.stateToId[item];
				}

				// Update
				History.store = currentStore;
				History.normalizeStore();

				// In Safari, going into Private Browsing mode causes the
				// Session Storage object to still exist but if you try and use
				// or set any property/function of it it throws the exception
				// "QUOTA_EXCEEDED_ERR: DOM Exception 22: An attempt was made to
				// add something to storage that exceeded the quota." infinitely
				// every second.
				currentStoreString = JSON.stringify(currentStore);
				try {
					// Store
					sessionStorage.setItem('History.store', currentStoreString);
				}
				catch (e) {
					if (e.code === DOMException.QUOTA_EXCEEDED_ERR) {
						if (sessionStorage.length) {
							// Workaround for a bug seen on iPads. Sometimes the quota exceeded error comes up and simply
							// removing/resetting the storage can work.
							sessionStorage.removeItem('History.store');
							sessionStorage.setItem('History.store', currentStoreString);
						} else {
							// Otherwise, we're probably private browsing in Safari, so we'll ignore the exception.
						}
					} else {
						throw e;
					}
				}
			};

			// For Internet Explorer
			History.intervalList.push(setInterval(History.onUnload,this.storeInterval));

			// For Other Browsers
			History.Adapter.bind(window,'beforeunload',History.onUnload);
			History.Adapter.bind(window,'unload',History.onUnload);

			// Both are enabled for consistency
		}

		// Non-Native pushState Implementation
		if ( !History.emulated.pushState ) {
			// Be aware, the following is only for native pushState implementations
			// If you are wanting to include something for all browsers
			// Then include it above this if block

			/**
			 * Setup Safari Fix
			 */
			if ( History.bugs.safariPoll ) {
				History.intervalList.push(setInterval(History.safariStatePoll, this.safariPollInterval));
			}

			/**
			 * Ensure Cross Browser Compatibility
			 */
			if ( window.navigator.vendor === 'Apple Computer, Inc.' || (window.navigator.appCodeName||'') === 'Mozilla' ) {
				/**
				 * Fix Safari HashChange Issue
				 */

				// Setup Alias
				History.Adapter.bind(window,'hashchange',function(){
					History.Adapter.trigger(window,'popstate');
				});

				// Initialise Alias
				if ( History.getHash() ) {
					History.Adapter.onDomLoad(function(){
						History.Adapter.trigger(window,'hashchange');
					});
				}
			}

		} // !History.emulated.pushState


	}; // History.initCore

	// Try to Initialise History
	if (!History.options || !History.options.delayInit) {
		History.init();
	}

})(window);