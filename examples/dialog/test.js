Roo.onReady(function() {
    
    Roo.get('show-dialog-btn').on('click',function () {
        console.log("TEST");
        var uc = new Roo.UploadCropbox({});
        console.log(uc);
        console.log(uc.superclass);
        console.log(uc);
        console.log("TEST2");
    });
});