/*
 * RooJS Library 
 * Copyright(c) 2007-2017, Roo J Solutions Ltd
 *
 * Licence LGPL 
 *
 */
 
/**
 * @class Roo.Document
 * @extends Roo.util.Observable
 * This is a convience class to wrap up the main document loading code.. , rather than adding Roo.onReady(......)
 * 
 * @param {Object} config the methods and properties of the 'base' class for the application.
 * 
 *  Generic Page handler - implement this to start your app..
 * 
 * eg.
 *  MyProject = new Roo.Document({
        events : {
            'load' : true // your events..
        },
        listeners : {
            'ready' : function() {
                // fired on Roo.onReady()
            }
        }
 * 
 */
Roo.Document = function(cfg) {
     
    this.addEvents({ 
        'ready' : true
    });
    Roo.util.Observable.call(this,cfg);
    
    var _this = this;
    
    Roo.onReady(function() {
        _this.fireEvent('ready');
    },null,false);
    
    
}

Roo.extend(Roo.Document, Roo.util.Observable, {});