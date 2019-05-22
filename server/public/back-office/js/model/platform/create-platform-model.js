
function createPlatformPageModel(data) {

    var model = {};

    model.callingServer = { savingPlatform :ko.observable(false)};

    model.devices = ko.mapping.fromJS(data.devices);

    model.operatingSystems = ko.mapping.fromJS(data.operatingSystems);



    model.platform = {

        name : ko.observable(""),

        device : ko.observable(""),

        operatingSystem : ko.observable(""),

    };

    model.validatePlatform = function (callback) {


        if(model.platform.name().trim() === ""){

            return callback(false,"Enter a name");

        }

        if(model.platform.device() === ""){

            return callback(false,"Select a device");

        }


        if(model.platform.operatingSystem() === ""){

            return callback(false,"Select an Operating system");

        }

        return callback(true,"validated!");

    };


    model.savePlatform = function () {


        model.callingServer.savingPlatform(true);

        model.validatePlatform(function (isSuccessful, message) {

            if(!isSuccessful){

                toast("error", message, 3000);

                model.callingServer.savingPlatform(false);

            }else{


                post("/api/back-office/platform/save", ko.toJSON(model.platform), function (isSuccessful,response) {

                    // checks if the call was successful from your box
                    if(isSuccessful) {

                        if (response.isSuccessful) {

                            model.platform.name("");

                            toast("success", response.responseMessage, 5000);

                        } else {

                            toast("error", response.responseMessage, 5000);

                        }

                    }else{

                        toast("error", "Oops! and error occurred", 5000);
                    }

                    model.callingServer.savingPlatform(false);

                });

            }

        })



    };

    return model;
}