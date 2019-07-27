function updateOrphanageHomePageModel(data) {

    var model = {};

    model.callingServer = { savingOrphanageHome :ko.observable(false)};

    model.orphanageHome = {

        _id : ko.observable(data._id),

        name: ko.observable(data.name),

        address :  ko.observable(data.address),

        image : ko.observable(''),

        mobile : ko.observable(data.mobile),

        email : ko.observable(data.email),

        noOfChildren : ko.observable(data.noOfChildren),

        coordinate : {

            latitude : ko.observable(data.coordinate.latitude),

            longitude : ko.observable(data.coordinate.longitude),
        }
    };


    model.validateOrphanageHome = function (callback) {

        if(model.orphanageHome.name().trim() === ""){
            return callback(false,"Enter a name");
        }

        if(model.orphanageHome.address().trim() === ""){
            return callback(false,"Select an address");
        }

        if(model.orphanageHome.mobile().trim() === ""){
            return callback(false,"Enter a number");
        }

        return callback(true,"validated!");
    };


    model.saveOrphanageHome = function () {

        model.callingServer.savingOrphanageHome(true);

        var formData = new FormData();

        formData.append( 'file', model.orphanageHome.image());

        formData.append('model',ko.toJSON(model.orphanageHome));

        model.validateOrphanageHome(function (isSuccessful, message) {

            if(!isSuccessful){

                toast("error", message, 3000);

                model.callingServer.savingOrphanageHome(false);

            }else{

                Ladda.create(document.querySelector( '#save-button' )).start();

                postFormData("/api/back-office/orphanage-home/save", formData, function (isSuccessful,response) {

                    // checks if the call was successful from your box
                    if(isSuccessful) {

                        if (response.isSuccessful) {

                            model.orphanageHome.name('');
                            model.orphanageHome.address('');
                            model.orphanageHome.mobile('');
                            model.orphanageHome.email('');
                            model.orphanageHome.noOfChildren(0);
                            model.orphanageHome.coordinate.longitude(0.0);
                            model.orphanageHome.coordinate.latitude(0.0);

                            toast("success", response.responseMessage, 5000);

                        } else {
                            toast("error", response.responseMessage, 5000);
                        }

                    }else{
                        toast("error", "Oops! and error occurred", 5000);
                    }

                    model.callingServer.savingOrphanageHome(false);
                    Ladda.create(document.querySelector( '#save-button' )).stop();
                });
            }
        })
    };

    model.fileUpload = function(data, e)
    {
        var _URL = window.URL || window.webkitURL;
        var file    = e.target.files[0];
        var reader  = new FileReader();
        img = new Image();

        img.onload = function () {

            if(Number(this.width) === Number(512) && Number(this.height) === Number(512)){

            }else{

                model.game.image('');

                toast("error", "image dimension must be 512x512", 5000);

            }

        };

        reader.onloadend = function (onloadend_e)
        {
            var result = reader.result; // Here is your base 64 encoded file. Do with it what you want.

            //model.image(result);

        };

        if(file)
        {
            reader.readAsDataURL(file);

            img.src = _URL.createObjectURL(file);

            model.game.image(file);
        }
    };


    return model;
}