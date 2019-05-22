
function updateDevicePageModel(data) {

    var model = {};

    model.callingServer = { registerDevice :ko.observable(false)};

    model.device = {

        _id: ko.observable(data._id),

        name: ko.observable(data.name),

    };

    model.validateDevice = function (callback) {


        if(model.device.name().trim() === ""){

            return callback(false,"Enter a name");

        }

        return callback(true,"validated!");

    };


    model.saveDevice = function () {


        model.callingServer.registerDevice(true);

        model.validateDevice(function (isSuccessful, message) {

            if(!isSuccessful){

                toast("error", message, 3000);

                model.callingServer.registerDevice(false);

            }else{

                console.log(ko.toJSON(model.device));

               post("/api/back-office/device/update", ko.toJSON(model.device), function (isSuccessful,response) {

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

                    model.callingServer.registerDevice(false);

                });


            }



        })

    };

    return model;
}