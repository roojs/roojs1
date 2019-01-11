//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Roo.docs');

Roo.docs.ViewSource= function() {}
Roo.apply(Roo.docs.ViewSource.prototype, {

 _strings : {
  'eab9dc0ccdb8cffda2c74258fc433437' :"Please scroll through and read the full document in order to agree the statement",
  'd41d8cd98f00b204e9800998ecf8427e' :"",
  'c4408d335012a56ff58937d78050efad' :"Accept",
  'c3eb5c3b9018d75cb7032deb99fe43e9' :"I understand",
  '39535fa9d04b1337c8394b684ccec7bb' :"I agree",
  '8ae4424e3e8d151789d3bdb669c20e6b' :"<i class='lnr lnr-download'></i> Download"
 },
 _named_strings : {
  'accept_terms_dialog_BTN_UDS' : 'c3eb5c3b9018d75cb7032deb99fe43e9' /* I understand */ ,
  'accept_terms_dialog_SCROLL_AGREE' : 'eab9dc0ccdb8cffda2c74258fc433437' /* Please scroll through and read the full document in order to agree the statement */ ,
  'accept_terms_dialog_title' : 'd41d8cd98f00b204e9800998ecf8427e' /*  */ ,
  'accept_terms_dialog_BTN_AGREE' : '39535fa9d04b1337c8394b684ccec7bb' /* I agree */ 
 },

 dialog : false,
 callback:  false,

 show : function(data, cb)
 {
  if (!this.dialog) {
   this.create();
  }

  this.callback = cb;
  this.data = data;
  this.dialog.show(this.data._el);
  if (this.form) {
   this.form.reset();
   this.form.setValues(data);
   this.form.fireEvent('actioncomplete', this.form,  { type: 'setdata', data: data });
  }

 },

 create : function()
 {
  var _this = this;
  this.dialog = Roo.factory({
    xtype : 'Modal',
    _BTN_AGREE : _this._strings['39535fa9d04b1337c8394b684ccec7bb'] /* I agree */,
    _BTN_UDS : _this._strings['c3eb5c3b9018d75cb7032deb99fe43e9'] /* I understand */,
    cls : 'accept-dialog enable-modal-body-overflow',
    fit_content : true,
    init : function() 
    { 
        _this.dialog.bodyEl.scrollTo('top');
        
        _this.acceptBtn.enableIt();
        
        if(
            typeof(_this.data.disableScrolling) != 'undefined' &&
            _this.data.disableScrolling == 1
        ){
            return;
        }
        
        var scrollHeight = _this.dialog.bodyEl.dom.scrollHeight;
        
        /*
        * 50px is leeway
        */
        
        if(scrollHeight <= _this.dialog.bodyEl.getHeight() + 50){
            return;
        }
        
        _this.acceptBtn.disableIt();
        
        _this.dialog.bodyEl.on('scroll', this.onScroll, this);
        
         (function() {
           this.onScroll();  
        }).defer(100,this);
        
    },
    max_width : 900,
    name : 'accept_terms_dialog',
    onScroll : function() 
    { 
        var scrollHeight = _this.dialog.bodyEl.dom.scrollHeight;
        
        var scrollTop = Math.ceil(_this.dialog.bodyEl.getScroll().top); // prevent zoom browser
        
        /*
        * Container height is 480px, however we need to give some leeway for handling the zoom level issue..
        * 50px is leeway
        */
        
        if(scrollHeight - _this.dialog.bodyEl.getHeight() - 50 > scrollTop){
            return;
        }
        
        _this.acceptBtn.enableIt();
        
    },
    _SCROLL_AGREE : _this._strings['eab9dc0ccdb8cffda2c74258fc433437'] /* Please scroll through and read the full document in order to agree the statement */,
    title : _this._strings['d41d8cd98f00b204e9800998ecf8427e'] /*  */,
    listeners : {
     show : function (_self)
      {
          if(_this.data.buttonText){
              _this.acceptBtn.setText(_this.data.buttonText);
          }
          
          if(_this.data.titleType) {
              _this.dialog.titleEl.dom.innerHTML = this['_'+_this.data.titleType];
          }
          
          if(_this.data.btnType) {
              _this.acceptBtn.setText(this['_'+_this.data.btnType]);
              _this.acceptBtn['_'+_this.data.btnType] = this['_'+_this.data.btnType];
          }
          
          if(_this.data.cls){
              _this.dialog.el.addClass(_this.data.cls);
          }
          
          if(_this.data.declaration){
              
              Roo.Ajax.request({
                  url : baseURL + '/Roo/DeclarationsRender/' + _this.data.declaration,
                  method : 'GET',
                  mask : 'Loading...',
                  success : function(res) {
                      
                      _this.terms_body.el.dom.innerHTML = res.responseText;
                      
                      _this.dialog.init();
                      
                      (function() {
                          _this.dialog.resize();
                      }).defer(10);
                  }
              });
              
          }
          
          if(_this.data.nickname){
              
              new Pman.Request({
                  url: baseURL + '/Roo/Coba_declarations.php',
                  method : 'GET',
                  mask : 'Loading...',
                  params : {
                      _nickname : _this.data.nickname
                  },
                  success : function(res) {
                      
                      if(typeof(_this.data.title) == 'undefined') {
                          
                          _this.dialog.titleEl.dom.innerHTML = res.data.title;
                      }
                      
                      _this.terms_body.el.dom.innerHTML = res.data.content;
                      
                      _this.dialog.init();
                      
                      (function() {
                          _this.dialog.resize();
                      }).defer(10);
                  }
              });
              
          }
          
          if(_this.data.title){
              _this.dialog.titleEl.dom.innerHTML = _this.data.title;
          }
          
          _this.download_btn.hide();
          
          if(_this.data.allow_download) {
              
              _this.download_btn.show();
          }
          
          _this.dialog.el.setStyle('zIndex', '10002');
          
      }
    },
    xns : Roo.bootstrap,
    '|xns' : 'Roo.bootstrap',
    buttons : [
     {
      xtype : 'Button',
      cls : 'coba-agree-btn',
      disableIt : function() 
      { 
          this.setText('Scroll to end before agree');
          this.disable();
      },
      enableIt : function() 
      {
          this.setText('Agree');
          
          if(_this.data.buttonText){
              this.setText(_this.data.buttonText);
          }
          
          if(_this.data.btnType) {
              this.setText(this['_'+_this.data.btnType]);
          }
          
          this.enable();
      },
      html : _this._strings['c4408d335012a56ff58937d78050efad'] /* Accept */,
      weight : 'primary',
      listeners : {
       click : function (_self, e)
        {
            _this.dialog.hide();
        
            if(_this.callback){
                _this.callback.call(_this);
            }
            
        },
       render : function (_self)
        {
            _this.acceptBtn = this;
            
        }
      },
      xns : Roo.bootstrap,
      '|xns' : 'Roo.bootstrap'
     },
     {
      xtype : 'Button',
      cls : 'coba-download-btn',
      html : _this._strings['8ae4424e3e8d151789d3bdb669c20e6b'] /* <i class='lnr lnr-download'></i> Download */,
      weight : 'default',
      listeners : {
       click : function (_self, e)
        {
            window.open(baseURL+'/Download/Popup/'+_this.data.declaration);
        },
       render : function (_self)
        {
            _this.download_btn = this;
        }
      },
      xns : Roo.bootstrap,
      '|xns' : 'Roo.bootstrap'
     }
    ],
    items  : [
     {
      xtype : 'Container',
      style : 'width: 100%;',
      xns : Roo.bootstrap,
      '|xns' : 'Roo.bootstrap',
      items  : [
       {
        xtype : 'Row',
        xns : Roo.bootstrap,
        '|xns' : 'Roo.bootstrap',
        items  : [
         {
          xtype : 'Column',
          cls : 'document-body-ctn',
          md : 12,
          listeners : {
           render : function (_self)
            {
                _this.terms_body = this;
            }
          },
          xns : Roo.bootstrap,
          '|xns' : 'Roo.bootstrap'
         }
        ]
       }
      ]
     }
    ]
   }  );
 }
});
Roo.apply(Roo.docs.ViewSource, Roo.docs.ViewSource.prototype);
