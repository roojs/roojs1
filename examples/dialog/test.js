Roo.onReady(function() {
    
    Roo.get('show-dialog-btn').on('click',function () {
        console.log("TEST");
        var uc = new Roo.UploadCropbox({});
        uc.show();
        console.log("TEST2");
    });
});