
function updateCompetitionTypePageModel(data) {

    var model = {};

    model.callingServer = { saveCompetitionType :ko.observable(false)};

    model.competitionType = {

        _id : ko.observable(data._id),

        name: ko.observable(data.name),

    };

    model.validateCompetitionType = function (callback) {


        if(model.competitionType.name().trim() === ""){

            return callback(false,"Enter a name");

        }

        return callback(true,"validated!");

    };


    model.saveCompetitionType = function () {


        model.callingServer.saveCompetitionType(true);

        model.validateCompetitionType(function (isSuccessful, message) {

            if(!isSuccessful){

                toast("error", message, 3000);

                model.callingServer.saveCompetitionType(false);

            }else{

                post("/api/back-office/competition-type/update", ko.toJSON(model.competitionType), function (isSuccessful,response) {

                    console.log(isSuccessful, response);
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

                    model.callingServer.saveCompetitionType(false);

                });


            }



        })

    };

    return model;
}