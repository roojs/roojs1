/*
 
The idea of this is to work out a new way for the builder to generate code
That is more component based..
-> basically the top level item would be 'extend' something... - like document body, etc..
and then it would render the children...

Changes that might need making?

factory on the children might need to be more flexible?


- 1st step -- the outer code will be standard 'extend format'
 
 
 */

Dynamic.Component = function(cfg)
{
    config = Roo.apply({
        // the values specified in the builder for this element go here...
        
    }, cfg);

    Dynamic.Component.superclass.constructor.call(this, config);
    
    // we can add 'events that the extended element creates here..
    this.addEvents({
        //eg..
       // "click" : true,
       // "toggle" : true
    });
}







