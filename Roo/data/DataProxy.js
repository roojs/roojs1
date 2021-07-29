/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */

/**
 * @class Roo.data.DataProxy
 * @extends Roo.data.Observable
 * @abstract
 * This class is an abstract base class for implementations which provide retrieval of
 * unformatted data objects.<br>
 * <p>
 * DataProxy implementations are usually used in conjunction with an implementation of Roo.data.DataReader
 * (of the appropriate type which knows how to parse the data object) to provide a block of
 * {@link Roo.data.Records} to an {@link Roo.data.Store}.<br>
 * <p>
 * Custom implementations must implement the load method as described in
 * {@link Roo.data.HttpProxy#load}.
 */
Roo.data.DataProxy = function(){
    this.addEvents({
        /**
         * @event beforeload
         * Fires before a network request is made to retrieve a data object.
         * @param {Object} This DataProxy object.
         * @param {Object} params The params parameter to the load function.
         */
        beforeload : true,
        /**
         * @event load
         * Fires before the load method's callback is called.
         * @param {Object} This DataProxy object.
         * @param {Object} o The data object.
         * @param {Object} arg The callback argument object passed to the load function.
         */
        load : true,
        /**
         * @event loadexception
         * Fires if an Exception occurs during data retrieval.
         * @param {Object} This DataProxy object.
         * @param {Object} o The data object.
         * @param {Object} arg The callback argument object passed to the load function.
         * @param {Object} e The Exception.
         */
        loadexception : true
    });
    Roo.data.DataProxy.superclass.constructor.call(this);
};

Roo.extend(Roo.data.DataProxy, Roo.util.Observable);

    /**
     * @cfg {void} listeners (Not available) Constructor blocks listeners from being set
     */
