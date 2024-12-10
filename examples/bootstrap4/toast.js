  Roo.BLANK_IMAGE_URL = '../../images/default/s.gif';
       Roo.onReady(function() {
          new Roo.bootstrap.Toast({
             title: '1. test',
             body : 'here is a messsage',
             timeout : false
              
          });
          
          new Roo.bootstrap.Toast({
             title: '2. test',
             body : 'here is a messsage',
             timeout : 60,
             show_time : true,
             listeners : {
                close : function()
                {
                    new Roo.bootstrap.Toast({
                        title: 'You closed 2',
                        timeout : 10
                         
                     });
                    
                }
             }
              
          });
          new Roo.bootstrap.Toast({
             title: '3. test',
             body : 'here is a messsage',
             weight : 'danger',
             timeout : 60,
             progress : 0,
             listeners : {
                show : function() {
                    
                    var upd = function() {
                        if (this.progress >= 1.0) {
                            this.hide();
                            return;
                        }
                        this.updateBody("Progress so far : " + Math.floor((this.progress + 0.1)* 100) + "%");
                        this.updateProgress(this.progress + 0.1);
                        upd.defer(1000, this);
                    };
                    upd.defer(1000, this);
                }
              
             }
          });
      });
