let bcrypt = require('bcryptjs');

let StaticStrings = require('./../../../../utility/static-strings');

let util =  require('util');
let multer  = require('multer');
let upload = multer({ dest: 'uploads/' });

let JwtUtils = require('./../../../../utility/jwtUtils');

const jwt  = require('jsonwebtoken');

let GameODM = require('./../../../../odm/gameODM');

let GenreODM = require('./../../../../odm/genreODM');

let PlatformODM = require('./../../../../odm/platformODM');

let CompetitionTypeODM = require('./../../../../odm/competitionTypeODM');

module.exports = function(expressApp) {

    let backOfficeGameControllerV1Routes = {};

    expressApp.post('/api/back-office/game/save', upload.single('file'), function(req, res) {

        let responseModel = {};

        try{

            let legit = jwt.verify(
                req.headers.bearer,
                JwtUtils.getPublicKey,
                new JwtUtils.generateVerifyOptions()
            );


            GameODM.save(JSON.parse(req.body.model), function (error, savedGame) {

                if(error){

                    responseModel.isSuccessful = false;

                    responseModel.responseMessage = "A database error occurred while saving game";

                    res.status(500).send(responseModel);


                }else{

                    let file = StaticStrings.game_image_directory + savedGame._id + "." + req.file.originalname.split('.').pop();

                    fs.rename(req.file.path, file, function(err) {
                        if (err) {
                            console.log(err);
                            res.send(500);
                        } else {

                            console.log("ere")
                            responseModel.isSuccessful = true;

                            responseModel.responseMessage = "You have successfully saved a game";

                            res.status(200).send(responseModel);

                        }
                    });

                }

            })

        }catch(err){

            console.log("it got here");

            responseModel.isSuccessful = false;

            responseModel.responseMessage = "Please login to access data";

            res.status(404).send(responseModel);

            return;
        }



    });

    expressApp.post('/api/back-office/game/update', upload.single('file'), function(req, res) {


        let responseModel = {};

        let legit;

        try{

            legit = jwt.verify(
                req.headers.bearer,
                JwtUtils.getPublicKey,
                new JwtUtils.generateVerifyOptions()
            );



            let gameObject = JSON.parse(req.body.model);

             GameODM.findByIdAndUpdate(gameObject._id, gameObject, function (error, savedGame) {

                if(error){

                    responseModel.isSuccessful = false;

                    responseModel.responseMessage = "A database error occurred while updating game";

                    res.status(500).send(responseModel);


                }else{

                    if(req.file !== undefined) {

                        let file = StaticStrings.game_image_directory + savedGame._id + "." + req.file.originalname.split('.').pop();

                        fs.rename(req.file.path, file, function (err) {
                            if (err) {
                                console.log(err);
                                res.send(500);
                            } else {

                                responseModel.isSuccessful = true;

                                responseModel.responseMessage = "You have successfully updated a game";

                                res.status(200).send(responseModel);

                            }
                        });

                    }else {

                        responseModel.isSuccessful = true;

                        responseModel.responseMessage = "You have successfully updated a game";

                        res.status(200).send(responseModel);

                    }

                }

            })

        }catch(err){

            console.log(err);

            responseModel.isSuccessful = false;

            responseModel.responseMessage = "Please login to access data";

            res.status(404).send(responseModel);

            return;
        }



    });

    expressApp.delete('/api/back-office/game/delete/:gameId', function(req, res) {

        let responseModel = {};

        try{

            let legit = jwt.verify(
                req.headers.bearer,
                JwtUtils.getPublicKey,
                new JwtUtils.generateVerifyOptions()
            );

            GameODM.deleteById(req.params.gameId, function (error) {

                if(error){

                    responseModel.isSuccessful = false;

                    responseModel.responseMessage = "A database error occurred while saving genre";

                    res.status(500).send(responseModel);

                }else{

                    responseModel.isSuccessful = true;

                    responseModel.responseMessage = "You have successfully deleted a game";

                    res.status(200).send(responseModel);
                }
            })

        }catch(error){

            responseModel.isSuccessful = false;

            responseModel.responseMessage = "Please login to access data";

            res.status(404).send(responseModel);
        }
    });

    expressApp.get('/api/back-office/game/fetch/data', function(req, res) {


        let responseModel = {};

        let gameData = {};

        let legit;

        try{

            legit = jwt.verify(
                req.headers.bearer,
                JwtUtils.getPublicKey,
                new JwtUtils.generateVerifyOptions()
            );

            GenreODM.getAllGenres(function (error, foundGenres) {


                if(error){

                    responseModel.isSuccessful = false;

                    responseModel.responseMessage = "A database error occurred while fetching genres";

                    res.status(500).send(responseModel);


                }else{

                    PlatformODM.getAllPlatforms(function (error, foundPlatforms) {

                        if(error){

                            responseModel.isSuccessful = false;

                            responseModel.responseMessage = "A database error occurred while fetching platforms";

                            res.status(500).send(responseModel);


                        }else{

                            CompetitionTypeODM. getAllCompetitionTypes(function (error, foundCompetitionTypes) {

                                if(error){

                                    responseModel.isSuccessful = false;

                                    responseModel.responseMessage = "A database error occurred while fetching platforms";

                                    res.status(500).send(responseModel);


                                }else{

                                    gameData.genres = foundGenres;

                                    gameData.platforms = foundPlatforms;

                                    gameData.competitionTypes = foundCompetitionTypes;

                                    res.status(200).send(gameData);

                                }

                            })

                        }

                    })


                }

            })

        }catch(err){

            responseModel.isSuccessful = false;

            responseModel.responseMessage = "Please login to access data";

            res.status(415).send(responseModel);
        }

    });

    expressApp.get('/api/back-office/game/view/query', function(req, res) {

        console.log(req.query)

        let responseModel = {};

        let legit;

        try{


            GameODM.getAllGames(function (error, foundDevices) {



                res.status(200).send({
                    draw : 2,
                    recordsTotal : 2,
                    data : foundDevices,
                    recordsFiltered : 2,
                });

            })



        }catch(err){

            responseModel.isSuccessful = false;

            responseModel.responseMessage = "Please login to access data";

            res.status(404).send(responseModel);

            return;
        }



    });

    expressApp.get('/api/back-office/game/:gameId', function(req, res) {

        console.log(req.query)

        let responseModel = {};

        let legit;

        try{


            GameODM.findById(req.params.gameId,function (error, foundGame) {

                GenreODM.getAllGenres(function (error, foundGenres) {


                    if(error){

                        responseModel.isSuccessful = false;

                        responseModel.responseMessage = "A database error occurred while fetching genres";

                        res.status(500).send(responseModel);


                    }else{

                        PlatformODM.getAllPlatforms(function (error, foundPlatforms) {

                            if(error){

                                responseModel.isSuccessful = false;

                                responseModel.responseMessage = "A database error occurred while fetching platforms";

                                res.status(500).send(responseModel);


                            }else{

                                CompetitionTypeODM.getAllCompetitionTypes(function (error, foundCompetitionTypes) {

                                    if(error){

                                        responseModel.isSuccessful = false;

                                        responseModel.responseMessage = "A database error occurred while fetching platforms";

                                        res.status(500).send(responseModel);


                                    }else{

                                        let gameData = {};

                                        gameData.genres = foundGenres;

                                        gameData.platforms = foundPlatforms;

                                        gameData.competitionTypes = foundCompetitionTypes;

                                        gameData.foundGame =  foundGame;

                                        res.status(200).send(gameData);

                                    }

                                })
                            }
                        })
                    }
                });
            })

        }catch(err){

            responseModel.isSuccessful = false;

            responseModel.responseMessage = "Please login to access data";

            res.status(404).send(responseModel);
        }



    });



    return backOfficeGameControllerV1Routes;
};