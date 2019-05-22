
function updateGamePageModel(data) {

    console.log(data.foundGame.competitionType)


   var model = {};

    model.callingServer = { savingGame :ko.observable(false)};

    model.tempGame = {

        genres : ko.mapping.fromJS(data.genres),

        platforms : ko.mapping.fromJS(data.platforms),

        competitionType : ko.mapping.fromJS(data.competitionTypes),

    };



    model.game = {

        _id: ko.observable(data.foundGame._id),

        name: ko.observable(data.foundGame.name),

        genres :  ko.observableArray(''),

        image : ko.observable(''),

        competitionType : ko.observable(''),

        description : ko.observable(data.foundGame.description),

        platforms : ko.observableArray(''),

        downloadLinks : ko.observableArray(''),

        platformLinks : ko.observableArray(ko.mapping.fromJS(data.foundGame.platformLinks)()),

        createCompetitionUrl : ko.observable(data.foundGame.createCompetitionUrl),

        joinCompetitionUrl : ko.observable(data.foundGame.joinCompetitionUrl),

    };


    model.game.platforms.subscribe(function (platforms) {


        if(platforms.length < model.game.platformLinks().length){

            console.log("remove")

            ko.utils.arrayForEach(model.game.platformLinks(), function (platformLink) {

                if(platformLink == undefined)
                    return;

                var foundPlatforms = ko.utils.arrayFilter(platforms, function(platform) {

                    return platformLink.platform.name() == platform.name();
                });


                if(foundPlatforms.length == 0){

                    model.game.platformLinks.remove(platformLink)

                }
            });

        }else if(platforms.length > 0 &&  model.game.platformLinks().length > 0 && platforms.length == model.game.platformLinks().length){

            console.log("remove and add")

            ko.utils.arrayForEach(model.game.platformLinks(), function (platformLink) {

                if(platformLink == undefined)
                    return;

                var foundPlatforms = ko.utils.arrayFilter(platforms, function(platform) {

                    return platformLink.platform.name() == platform.name();
                });


                if(foundPlatforms.length == 0){

                    model.game.platformLinks.remove(platformLink)

                }
            });

            ko.utils.arrayForEach(platforms, function (platform) {




                var foundPlatformLinks = ko.utils.arrayFilter(model.game.platformLinks(), function(platformLink) {

                    return platformLink.platform.name() == platform.name();
                });

                console.log(foundPlatformLinks)

                if(foundPlatformLinks.length == 0){

                    var platformLink = {
                        platform : platform,
                        url : "",
                        downloadLink : "",
                    };

                    model.game.platformLinks.push(platformLink);
                }
            });

        }else{

            ko.utils.arrayForEach(platforms, function (platform) {




                var foundPlatformLinks = ko.utils.arrayFilter(model.game.platformLinks(), function(platformLink) {

                    return platformLink.platform.name() == platform.name();
                });

                console.log(foundPlatformLinks)

                if(foundPlatformLinks.length == 0){

                    var platformLink = {
                        platform : platform,
                        url : ko.observable(''),
                        downloadLink : ko.observable(''),
                    };

                    model.game.platformLinks.push(platformLink);
                }
            });
        }




    });

    model.validateGame = function (callback) {


        if(model.game.name().trim() === ""){

            return callback(false,"Enter a name");

        }

        if(model.game.genres().length === 0){

            return callback(false,"Select a genre");

        }

        if(model.game.description().trim() === ""){

            return callback(false,"Enter a description");

        }

        if(model.game.name().trim() === ""){

            return callback(false,"Enter a name");

        }

        return callback(true,"validated!");

    };


    model.saveGame = function () {

        $.confirm({
            title: 'Update Game!',
            content: 'Are you sure you want to update game ?',
            buttons: {
                confirm: function () {
                    model.sendDataToServer();
                },
                cancel: function () {

                },
            }
        });

    };

    model.fileUpload = function(data, e){
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

    model.sendDataToServer =  function(){

        model.callingServer.savingGame(true);

        var formData = new FormData();

        formData.append( 'file', model.game.image());

        formData.append('model',ko.toJSON(model.game));

        model.validateGame(function (isSuccessful, message) {

            if(!isSuccessful){

                toast("error", message, 3000);

                model.callingServer.savingGame(false);

            }else{

                postFormData("/api/back-office/game/update", formData, function (isSuccessful,response) {

                    if(isSuccessful) {

                        if (response.isSuccessful) {

                            model.game.name('');

                            model.game.description('');

                            model.game.createCompetitionUrl('');

                            model.game.joinCompetitionUrl ('');

                            toast("success", response.responseMessage, 5000);

                            window.location.href = "#/view/games";

                        } else {

                            toast("error", response.responseMessage, 5000);

                        }

                    }else{

                        toast("error", "Oops! and error occurred", 5000);
                    }

                    model.callingServer.savingGame(false);

                });

            }

        });
    };

    model.getSelectedCompetitionTypeFromObservableArray = function (observableArray, competitionType) {

            return ko.utils.arrayFirst(observableArray, function(item) {
                if(item.name() === competitionType.name) return item;
            });

    };

    model.getSelectedPlatformsFromObservableArray = function (observableArray, selectedPlatforms) {

        var array = [];

        selectedPlatforms.forEach(function (platform) {

            ko.utils.arrayFirst(observableArray, function(item) {

                if(item.name() === platform.name){

                    array.push(item);
                }
            });

        });

        return array;

    };

    model.getSelectedGenresFromObservableArray = function (observableArray, selectedGenres) {

        var array = [];

        selectedGenres.forEach(function (genre) {

             ko.utils.arrayFirst(observableArray, function(item) {

                if(item.name() === genre.name){

                    array.push(item);
                }
            });

        });

        return array;

    };

    if(data.foundGame.competitionType !== undefined)
    {
        model.game.competitionType(model.getSelectedCompetitionTypeFromObservableArray(model.tempGame.competitionType(),data.foundGame.competitionType));
    }

    model.game.platforms(model.getSelectedPlatformsFromObservableArray(model.tempGame.platforms(),data.foundGame.platforms));
    model.game.genres(model.getSelectedGenresFromObservableArray(model.tempGame.genres(),data.foundGame.genres));

    return model;
}