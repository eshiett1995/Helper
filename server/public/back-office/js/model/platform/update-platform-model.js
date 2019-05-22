
function updatePlatformPageModel(data) {

    var model = {};

    model.callingServer = { savingPlatform :ko.observable(false)};

    model.devices = ko.mapping.fromJS(data.devices);

    model.operatingSystems = ko.mapping.fromJS(data.operatingSystems);



    model.platform = {

        _id : ko.observable(data.platform._id),

        name : ko.observable(data.platform.name),

        device : ko.observable(data.device),

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


                post("/api/back-office/platform/update", ko.toJSON(model.platform), function (isSuccessful,response) {

                    // checks if the call was successful from your box
                    if(isSuccessful) {

                        if (response.isSuccessful) {

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

    model.getSelectedDeviceFromObservableArray = function (observableArray, device) {

        return ko.utils.arrayFirst(observableArray, function(item) {
            if(item.name() === device.name) return item;
        });
    };

    model.getSelectedOperatingSystemFromObservableArray = function (observableArray, operatingSystem) {

        return ko.utils.arrayFirst(observableArray, function(item) {
            if(item.name() === operatingSystem.name) return item;
        });
    };

    model.platform.device(model.getSelectedDeviceFromObservableArray(model.devices(),data.platform.device));
    model.platform.operatingSystem(model.getSelectedOperatingSystemFromObservableArray(model.operatingSystems(),data.platform.operatingSystem));

    return model;
}