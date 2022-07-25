//<script type="text/javascript">


/**
 * @class Roo.Login
 * @extends Roo.LayoutDialog
 * A generic Login Dialog..... - only one needed in theory!?!?
 *
 * Fires XComponent builder on success...
 * 
 * Sends 
 *    username,password, lang = for login actions.
 *    check = 1 for periodic checking that sesion is valid.
 *    passwordRequest = email request password
 *    logout = 1 = to logout
 * 
 * Affects: (this id="????" elements)
 *   loading  (removed) (used to indicate application is loading)
 *   loading-mask (hides) (used to hide application when it's building loading)
 *   
 * 
 * Usage: 
 *    
 * 
 * Myapp.login = Roo.Login({
     url: xxxx,
   
     realm : 'Myapp', 
     
     
     method : 'POST',
     
     
     * 
 })
 * 
 * 
 * 
 **/
 
Roo.Login = function(cfg)
{
    this.addEvents({
        'refreshed' : true
    });
    
    Roo.apply(this,cfg);
    
    Roo.onReady(function() {
        this.onLoad();
    }, this);
    // call parent..
    
   
    Roo.Login.superclass.constructor.call(this, this);
    //this.addxtype(this.items[0]);
    
    
}


Roo.extend(Roo.Login, Roo.LayoutDialog, {
    
    /**
     * @cfg {String} method
     * Method used to query for login details.
     */
    
    method : 'POST',
    /**
     * @cfg {String} url
     * URL to query login data. - eg. baseURL + '/Login.php'
     */
    url : '',
    
    /**
     * @property user
     * The user data - if user.id < 0 then login will be bypassed. (used for inital setup situation.
     * @type {Object} 
     */
    user : false,
    /**
     * @property checkFails
     * Number of times we have attempted to get authentication check, and failed.
     * @type {Number} 
     */
    checkFails : 0,
      /**
     * @property intervalID
     * The window interval that does the constant login checking.
     * @type {Number} 
     */
    intervalID : 0,
    
    
    onLoad : function() // called on page load...
    {
        // load 
         
        if (Roo.get('loading')) { // clear any loading indicator..
            Roo.get('loading').remove();
        }
        
        //this.switchLang('en'); // set the language to english..
       
        this.check({
            success:  function(response, opts)  {  // check successfull...
            
                var res = this.processResponse(response);
                this.checkFails =0;
                if (!res.success) { // error!
                    this.checkFails = 5;
                    //console.log('call failure');
                    return this.failure(response,opts);
                }
                
                if (!res.data.id) { // id=0 == login failure.
                    return this.show();
                }
                
                              
                        //console.log(success);
                this.fillAuth(res.data);   
                this.checkFails =0;
                Roo.XComponent.build();
            },
            failure : this.show
        });
        
    }, 
    
    
    check: function(cfg) // called every so often to refresh cookie etc..
    {
        if (cfg.again) { // could be undefined..
            this.checkFails++;
        } else {
            this.checkFails = 0;
        }
        var _this = this;
        if (this.sending) {
            if ( this.checkFails > 4) {
                Roo.MessageBox.alert("Error",  
                    "Error getting authentication status. - try reloading, or wait a while", function() {
                        _this.sending = false;
                    }); 
                return;
            }
            cfg.again = true;
            _this.check.defer(10000, _this, [ cfg ]); // check in 10 secs.
            return;
        }
        this.sending = true;
        
        Roo.Ajax.request({  
            url: this.url,
            params: {
                getAuthUser: true
            },  
            method: this.method,
            success:  cfg.success || this.success,
            failure : cfg.failure || this.failure,
            scope : this,
            callCfg : cfg
              
        });  
    }, 
    
    
    logout: function()
    {
        window.onbeforeunload = function() { }; // false does not work for IE..
        this.user = false;
        var _this = this;
        
        Roo.Ajax.request({  
            url: this.url,
            params: {
                logout: 1
            },  
            method: 'GET',
            failure : function() {
                Roo.MessageBox.alert("Error", "Error logging out. - continuing anyway.", function() {
                    document.location = document.location.toString() + '?ts=' + Math.random();
                });
                
            },
            success : function() {
                _this.user = false;
                this.checkFails =0;
                // fixme..
                document.location = document.location.toString() + '?ts=' + Math.random();
            }
              
              
        }); 
    },
    
    processResponse : function (response)
    {
        var res = '';
        try {
            res = Roo.decode(response.responseText);
            // oops...
            if (typeof(res) != 'object') {
                res = { success : false, errorMsg : res, errors : true };
            }
            if (typeof(res.success) == 'undefined') {
                res.success = false;
            }
            
        } catch(e) {
            res = { success : false,  errorMsg : response.responseText, errors : true };
        }
        return res;
    },
    
    success : function(response, opts)  // check successfull...
    {  
        this.sending = false;
        var res = this.processResponse(response);
        if (!res.success) {
            return this.failure(response, opts);
        }
        if (!res.data || !res.data.id) {
            return this.failure(response,opts);
        }
        //console.log(res);
        this.fillAuth(res.data);
        
        this.checkFails =0;
        
    },
    
    
    failure : function (response, opts) // called if login 'check' fails.. (causes re-check)
    {
        this.authUser = -1;
        this.sending = false;
        var res = this.processResponse(response);
        //console.log(res);
        if ( this.checkFails > 2) {
        
            Roo.MessageBox.alert("Error", res.errorMsg ? res.errorMsg : 
                "Error getting authentication status. - try reloading"); 
            return;
        }
        opts.callCfg.again = true;
        this.check.defer(1000, this, [ opts.callCfg ]);
        return;  
    },
    
    
    
    fillAuth: function(au) {
        this.startAuthCheck();
        this.authUserId = au.id;
        this.authUser = au;
        this.lastChecked = new Date();
        this.fireEvent('refreshed', au);
        //Pman.Tab.FaxQueue.newMaxId(au.faxMax);
        //Pman.Tab.FaxTab.setTitle(au.faxNumPending);
        au.lang = au.lang || 'en';
        //this.switchLang(Roo.state.Manager.get('Pman.Login.lang', 'en'));
        Roo.state.Manager.set( this.realm + 'lang' , au.lang);
        this.switchLang(au.lang );
        
     
        // open system... - -on setyp..
        if (this.authUserId  < 0) {
            Roo.MessageBox.alert("Warning", 
                "This is an open system - please set up a admin user with a password.");  
        }
         
        //Pman.onload(); // which should do nothing if it's a re-auth result...
        
             
    },
    
    startAuthCheck : function() // starter for timeout checking..
    {
        if (this.intervalID) { // timer already in place...
            return false;
        }
        var _this = this;
        this.intervalID =  window.setInterval(function() {
              _this.check(false);
            }, 120000); // every 120 secs = 2mins..
        
        
    },
         
    
    switchLang : function (lang) 
    {
        _T = typeof(_T) == 'undefined' ? false : _T;
          if (!_T || !lang.length) {
            return;
        }
        
        if (!_T && lang != 'en') {
            Roo.MessageBox.alert("Sorry", "Language not available yet (" + lang +')');
            return;
        }
        
        if (typeof(_T.en) == 'undefined') {
            _T.en = {};
            Roo.apply(_T.en, _T);
        }
        
        if (typeof(_T[lang]) == 'undefined') {
            Roo.MessageBox.alert("Sorry", "Language not available yet (" + lang +')');
            return;
        }
        
        
        Roo.apply(_T, _T[lang]);
        // just need to set the text values for everything...
        var _this = this;
        /* this will not work ...
        if (this.form) { 
            
               
            function formLabel(name, val) {
                _this.form.findField(name).fieldEl.child('label').dom.innerHTML  = val;
            }
            
            formLabel('password', "Password"+':');
            formLabel('username', "Email Address"+':');
            formLabel('lang', "Language"+':');
            this.dialog.setTitle("Login");
            this.dialog.buttons[0].setText("Forgot Password");
            this.dialog.buttons[1].setText("Login");
        }
        */
        
        
    },
    
    
    title: "Login",
    modal: true,
    width:  350,
    //height: 230,
    height: 180,
    shadow: true,
    minWidth:200,
    minHeight:180,
    //proxyDrag: true,
    closable: false,
    draggable: false,
    collapsible: false,
    resizable: false,
    center: {  // needed??
        autoScroll:false,
        titlebar: false,
       // tabPosition: 'top',
        hideTabs: true,
        closeOnTab: true,
        alwaysShowTabs: false
    } ,
    listeners : {
        
        show  : function(dlg)
        {
            //console.log(this);
            this.form = this.layout.getRegion('center').activePanel.form;
            this.form.dialog = dlg;
            this.buttons[0].form = this.form;
            this.buttons[0].dialog = dlg;
            this.buttons[1].form = this.form;
            this.buttons[1].dialog = dlg;
           
           //this.resizeToLogo.defer(1000,this);
            // this is all related to resizing for logos..
            //var sz = Roo.get(Pman.Login.form.el.query('img')[0]).getSize();
           //// if (!sz) {
             //   this.resizeToLogo.defer(1000,this);
             //   return;
           // }
            //var w = Ext.lib.Dom.getViewWidth() - 100;
            //var h = Ext.lib.Dom.getViewHeight() - 100;
            //this.resizeTo(Math.max(350, Math.min(sz.width + 30, w)),Math.min(sz.height+200, h));
            //this.center();
            if (this.disabled) {
                this.hide();
                return;
            }
            
            if (this.user.id < 0) { // used for inital setup situations.
                return;
            }
            
            if (this.intervalID) {
                // remove the timer
                window.clearInterval(this.intervalID);
                this.intervalID = false;
            }
            
            
            if (Roo.get('loading')) {
                Roo.get('loading').remove();
            }
            if (Roo.get('loading-mask')) {
                Roo.get('loading-mask').hide();
            }
            
            //incomming._node = tnode;
            this.form.reset();
            //this.dialog.modal = !modal;
            //this.dialog.show();
            this.el.unmask(); 
            
            
            this.form.setValues({
                'username' : Roo.state.Manager.get(this.realm + '.username', ''),
                'lang' : Roo.state.Manager.get(this.realm + '.lang', 'en')
            });
            
            this.switchLang(Roo.state.Manager.get(this.realm + '.lang', 'en'));
            if (this.form.findField('username').getValue().length > 0 ){
                this.form.findField('password').focus();
            } else {
               this.form.findField('username').focus();
            }
    
        }
    },
    items : [
         {
       
            xtype : 'Content',
            xns : Roo.panel,
            region: 'center',
            fitToFrame : true,
            
            items : [
    
                {
               
                    xtype : 'Form',
                    xns : Roo.form,
                    labelWidth: 100,
                    style : 'margin: 10px;',
                    
                    listeners : {
                        actionfailed : function(f, act) {
                            // form can return { errors: .... }
                                
                            //act.result.errors // invalid form element list...
                            //act.result.errorMsg// invalid form element list...
                            
                            this.dialog.el.unmask();
                            Roo.MessageBox.alert("Error", act.result.errorMsg ? act.result.errorMsg : 
                                        "Login failed - communication error - try again.");
                                      
                        },
                        actioncomplete: function(re, act) {
                             
                            Roo.state.Manager.set(
                                this.dialog.realm + '.username',  
                                    this.findField('username').getValue()
                            );
                            Roo.state.Manager.set(
                                this.dialog.realm + '.lang',  
                                this.findField('lang').getValue() 
                            );
                            
                            this.dialog.fillAuth(act.result.data);
                              
                            this.dialog.hide();
                            
                            if (Roo.get('loading-mask')) {
                                Roo.get('loading-mask').show();
                            }
                            Roo.XComponent.build();
                            
                             
                            
                        }
                    },
                    items : [
                        {
                            xtype : 'TextField',
                            xns : Roo.form,
                            fieldLabel: "Email Address",
                            name: 'username',
                            width:200,
                            autoCreate : {tag: "input", type: "text", size: "20"}
                        },
                        {
                            xtype : 'TextField',
                            xns : Roo.form,
                            fieldLabel: "Password",
                            inputType: 'password',
                            name: 'password',
                            width:200,
                            autoCreate : {tag: "input", type: "text", size: "20"},
                            listeners : {
                                specialkey : function(e,ev) {
                                    if (ev.keyCode == 13) {
                                        this.form.dialog.el.mask("Logging in");
                                        this.form.doAction('submit', {
                                            url: this.form.dialog.url,
                                            method: this.form.dialog.method
                                        });
                                    }
                                }
                            }  
                        },
                        {
                            xtype : 'ComboBox',
                            xns : Roo.form,
                            fieldLabel: "Language",
                            name : 'langdisp',
                            store: {
                                xtype : 'SimpleStore',
                                fields: ['lang', 'ldisp'],
                                data : [
                                    [ 'en', 'English' ],
                                    [ 'zh_HK' , '\u7E41\u4E2D' ],
                                    [ 'zh_CN', '\u7C21\u4E2D' ]
                                ]
                            },
                            
                            valueField : 'lang',
                            hiddenName:  'lang',
                            width: 200,
                            displayField:'ldisp',
                            typeAhead: false,
                            editable: false,
                            mode: 'local',
                            triggerAction: 'all',
                            emptyText:'Select a Language...',
                            selectOnFocus:true,
                            listeners : {
                                select :  function(cb, rec, ix) {
                                    this.form.switchLang(rec.data.lang);
                                }
                            }
                        
                        }
                    ]
                }
                  
                
            ]
        }
    ],
    buttons : [
        {
            xtype : 'Button',
            xns : 'Roo',
            text : "Forgot Password",
            listeners : {
                click : function() {
                    //console.log(this);
                    var n = this.form.findField('username').getValue();
                    if (!n.length) {
                        Roo.MessageBox.alert("Error", "Fill in your email address");
                        return;
                    }
                    Roo.Ajax.request({
                        url: this.dialog.url,
                        params: {
                            passwordRequest: n
                        },
                        method: this.dialog.method,
                        success:  function(response, opts)  {  // check successfull...
                        
                            var res = this.dialog.processResponse(response);
                            if (!res.success) { // error!
                               Roo.MessageBox.alert("Error" ,
                                    res.errorMsg ? res.errorMsg  : "Problem Requesting Password Reset");
                               return;
                            }
                            Roo.MessageBox.alert("Notice" ,
                                "Please check you email for the Password Reset message");
                        },
                        failure : function() {
                            Roo.MessageBox.alert("Error" , "Problem Requesting Password Reset");
                        }
                        
                    });
                }
            }
        },
        {
            xtype : 'Button',
            xns : 'Roo',
            text : "Login",
            listeners : {
                
                click : function () {
                        
                    this.dialog.el.mask("Logging in");
                    this.form.doAction('submit', {
                            url: this.dialog.url,
                            method: this.dialog.method
                    });
                }
            }
        }
    ]
  
  
})
 


   