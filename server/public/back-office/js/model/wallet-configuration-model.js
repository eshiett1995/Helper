
function createWalletConfigurationPageModel(data) {

    var model = {};



    console.log("lets see");

    console.log(data);

    model.callingServer = { updatingWalletConfiguration :ko.observable(false)};

    model.walletConfiguration = {

        _id : ko.observable(data._id),

        minimumWalletBalance : ko.observable(data.minimumWalletBalance),

        maintenanceFee : ko.observable(data.maintenanceFee),

        smsChargeFee : ko.observable(data.smsChargeFee),

        gambeatCompetitionCharge : ko.observable(5000),


    };


    model.validateWalletConfiguration = function (callback) {


        if(model.walletConfiguration.minimumWalletBalance() === ""){

            return callback(false,"Enter a minimum wallet balance");

        }


        if(model.walletConfiguration.maintenanceFee() === ""){

            return callback(false,"Enter a maintenance fee");

        }

        if(model.walletConfiguration.smsChargeFee() === ""){

            return callback(false,"Enter a sms fee");

        }

        return callback(true,"validated!");

    };


    model.updateWalletConfiguration = function () {


        model.callingServer.updatingWalletConfiguration(true);

        model.validateWalletConfiguration(function (isSuccessful, message) {

            if(!isSuccessful){

                toast("error", message, 3000);

                model.callingServer.updatingWalletConfiguration(false);

            }else{

                post("/api/back-office/configurations/wallet/save", ko.toJSON(model.walletConfiguration), function (isSuccessful,response) {

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

                    model.callingServer.updatingWalletConfiguration(false);

                });


            }



        })

    };

    return model;
}