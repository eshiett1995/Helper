
function updateGenrePageModel(data) {


    var model = {};

    model.callingServer = { saveGenre :ko.observable(false)};

    model.genre = {

        _id: ko.observable(data._id),

        name: ko.observable(data.name),
    };

    model.validateGenre = function (callback) {


        if(model.genre.name().trim() === ""){

            return callback(false,"Enter a name");

        }

        return callback(true,"validated!");

    };


    model.saveGenre = function () {


        model.callingServer.saveGenre(true);

        model.validateGenre(function (isSuccessful, message) {

            if(!isSuccessful){

                toast("error", message, 3000);

                model.callingServer.saveGenre(false);

            }else{

                Ladda.create(document.querySelector( '#save-button' )).start();

                post("/api/back-office/genre/update", ko.toJSON(model.genre), function (isSuccessful,response) {

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

                    model.callingServer.saveGenre(false);
                    Ladda.create(document.querySelector( '#save-button' )).stop();

                });


            }



        })

    };

    return model;
}