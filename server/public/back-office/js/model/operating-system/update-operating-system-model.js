
function updateOperatingSystemPageModel(data) {

    var model = {};

    model.callingServer = { registerOS :ko.observable(false)};

    model.OS = {

        _id: ko.observable(data._id),

        name: ko.observable(data.name),
    };

    model.validateOS = function (callback) {


        if(model.OS.name().trim() === ""){

            return callback(false,"Enter a name");

        }

        return callback(true,"validated!");

    };


    model.registerOS = function () {


        model.callingServer.registerOS(true);

        model.validateOS(function (isSuccessful, message) {

            if(!isSuccessful){

                toast("error", message, 3000);

                model.callingServer.registerOS(false);

            }else{

                console.log(ko.toJSON(model.OS));

                post("/api/back-office/operating-system/update", ko.toJSON(model.OS), function (isSuccessful,response) {

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

                    model.callingServer.registerOS(false);

                });


            }



        })

    };

    return model;
}