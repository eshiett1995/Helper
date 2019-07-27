let fs = require('fs');

let StaticStrings = require('./../../../../utility/static-strings');

let multer  = require('multer');
let upload = multer({ dest: 'uploads/' });

let JwtUtils = require('./../../../../utility/jwtUtils');

const jwt  = require('jsonwebtoken');

let orphanageHomeODM = require('./../../../../odm/orphanageHomeODM');

let app = require('./../../../../backOffice');

module.exports = function() {

    let backOfficeOrphanageHomeControllerV1Routes = {};

    app.post('/api/back-office/orphanage-home/save', upload.single('file'), function(req, res) {


        let responseModel = {};

        try{

            let legit = jwt.verify(
                req.headers.bearer,
                JwtUtils.getPublicKey,
                new JwtUtils.generateVerifyOptions()
            );

            orphanageHomeODM.save(JSON.parse(req.body.model), function (error, savedGame) {

                if(error){
                    responseModel.isSuccessful = false;
                    responseModel.responseMessage = "A database error occurred while saving orphanage home";
                    res.status(500).send(responseModel);

                }else{

                    if(req.file === undefined){
                        responseModel.isSuccessful = true;
                        responseModel.responseMessage = "You have successfully saved the orphanage home";
                        res.status(200).send(responseModel);

                    }else{
                        let file = StaticStrings.game_image_directory + savedGame._id + "." + req.file.originalname.split('.').pop();

                        fs.rename(req.file.path, file, function(error) {

                            if (error) {
                                res.send(500);

                            } else {
                                responseModel.isSuccessful = true;
                                responseModel.responseMessage = "You have successfully saved the orphanage home";
                                res.status(200).send(responseModel);
                            }
                        });
                    }
                }
            })
        }catch(error){
            responseModel.isSuccessful = false;
            responseModel.responseMessage = "Please login to access data";
            res.status(404).send(responseModel);
        }
    });

    app.post('/api/back-office/orphanage-home/update', upload.single('file'), function(req, res) {


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

    app.delete('/api/back-office/orphanage-home/delete/:orphanageHomeId', function(req, res) {

        let responseModel = {};

        try{

            let legit = jwt.verify(
                req.headers.bearer,
                JwtUtils.getPublicKey,
                new JwtUtils.generateVerifyOptions()
            );

            orphanageHomeODM.deleteById(req.params.orphanageHomeId, function (error) {

                if(error){
                    responseModel.isSuccessful = false;
                    responseModel.responseMessage = "A database error occurred while deleting the orphanage home";
                    res.status(500).send(responseModel);

                }else{
                    responseModel.isSuccessful = true;
                    responseModel.responseMessage = "You have successfully deleted the orphanage home";
                    res.status(200).send(responseModel);
                }
            })

        }catch(error){
            responseModel.isSuccessful = false;
            responseModel.responseMessage = "Please login to access data";
            res.status(404).send(responseModel);
        }
    });

    app.get('/api/back-office/game/fetch/data', function(req, res) {


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

    app.get('/api/back-office/orphanage-home/view/query', function(req, res) {

        console.log(req.query)

        let responseModel = {};

        let legit;

        try{

            orphanageHomeODM.getAllOrphanageHomes(function (error, foundOrphanageHomes) {
                res.status(200).send({
                    draw : 2,
                    recordsTotal : foundOrphanageHomes.length,
                    data : foundOrphanageHomes,
                    recordsFiltered : 2,
                });
            })

        }catch(error){
            responseModel.isSuccessful = false;
            responseModel.responseMessage = "Please login to access data";
            res.status(404).send(responseModel);
        }
    });

    app.get('/api/back-office/orphanage-home/:orphanageHomeId', function(req, res) {

        console.log(req.query)

        let responseModel = {};

        let legit;

        try{

            orphanageHomeODM.findById(req.params.orphanageHomeId,function (error, foundOrphanage) {

                    if(error){
                        responseModel.isSuccessful = false;
                        responseModel.responseMessage = "A database error occurred while fetching genres";
                        res.status(500).send(responseModel);

                    }else{
                        res.status(200).send(foundOrphanage);
                    }
            })

        }catch(error){
            responseModel.isSuccessful = false;
            responseModel.responseMessage = "Please login to access data";
            res.status(404).send(responseModel);
        }
    });

    return backOfficeOrphanageHomeControllerV1Routes;
};