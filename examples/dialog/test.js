Roo.onReady(function() {
    
    Roo.get('show-dialog-btn').on('click',function () {
        console.log("TEST");
        var uc = new Roo.dialog.UploadCropbox();
        console.log(uc);
        console.log("TEST2");
    });
});