
function createGenrePageModel() {


    var model = {};

    model.callingServer = { saveGenre :ko.observable(false)};

    model.genre = {

        name: ko.observable(''),

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

                post("/api/back-office/genre/save", ko.toJSON(model.genre), function (isSuccessful,response) {

                    console.log(isSuccessful, response);
                    // checks if the call was successful from your box
                    if(isSuccessful) {

                        if (response.isSuccessful) {

                            model.genre.name("");

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