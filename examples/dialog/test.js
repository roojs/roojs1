Roo.onReady(function() {
    
    Roo.get('show-dialog-btn').on('click',function () {
        console.log("TEST");
        var uc = new Roo.UploadCropbox({});
        console.log(uc.isVisible());
        console.log("TEST2");
    });
});