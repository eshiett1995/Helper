let bcrypt = require('bcryptjs');

let util =  require('util');

let JwtUtils = require('./../../../../utility/jwtUtils');

const jwt  = require('jsonwebtoken');

let GenreODM = require('./../../../../odm/genreODM');

module.exports = function(expressApp) {

    let backOfficeGenreControllerV1Routes = {};

    expressApp.post('/api/back-office/genre/save', function(req, res) {

        let responseModel = {};

        let legit;

        try{

            legit = jwt.verify(
                req.headers.bearer,
                JwtUtils.getPublicKey,
                new JwtUtils.generateVerifyOptions()
            );

            GenreODM.save(req.body, function (error, savedGenre) {


                if(error){

                    responseModel.isSuccessful = false;

                    responseModel.responseMessage = "A database error occurred while saving genre";

                    res.status(500).send(responseModel);


                }else{

                    responseModel.isSuccessful = true;

                    responseModel.responseMessage = "You have successfully saved a genre";

                    res.status(200).send(responseModel);

                }

            })

        }catch(error){

            responseModel.isSuccessful = false;

            responseModel.responseMessage = "Please login to access data";

            res.status(404).send(responseModel);
        }
    });

    expressApp.post('/api/back-office/genre/update', function(req, res) {

        let responseModel = {};

        let legit;

        try{

            legit = jwt.verify(
                req.headers.bearer,
                JwtUtils.getPublicKey,
                new JwtUtils.generateVerifyOptions()
            );

            GenreODM.findByIdAndUpdate(req.body._id, req.body, function (error, updatedGenre) {

                if(error){

                    responseModel.isSuccessful = false;

                    responseModel.responseMessage = "A database error occurred while saving genre";

                    res.status(500).send(responseModel);


                }else{

                    responseModel.isSuccessful = true;

                    responseModel.responseMessage = "You have successfully updated a genre";

                    res.status(200).send(responseModel);

                }

            })

        }catch(error){

            responseModel.isSuccessful = false;

            responseModel.responseMessage = "Please login to access data";

            res.status(404).send(responseModel);
        }
    });

    expressApp.delete('/api/back-office/genre/delete/:genreId', function(req, res) {

        let responseModel = {};

        let legit;

        try{

            legit = jwt.verify(
                req.headers.bearer,
                JwtUtils.getPublicKey,
                new JwtUtils.generateVerifyOptions()
            );

            GenreODM.deleteById(req.params.genreId, function (error) {

                if(error){

                    responseModel.isSuccessful = false;

                    responseModel.responseMessage = "A database error occurred while saving genre";

                    res.status(500).send(responseModel);


                }else{

                    responseModel.isSuccessful = true;

                    responseModel.responseMessage = "You have successfully deleted a genre";

                    res.status(200).send(responseModel);

                }

            })

        }catch(error){

            responseModel.isSuccessful = false;

            responseModel.responseMessage = "Please login to access data";

            res.status(404).send(responseModel);
        }
    });

    expressApp.get('/api/back-office/genre/view/query', function(req, res) {

        let responseModel = {};

        let legit;

        try{


            GenreODM.getAllGenres(function (error, foundDevices) {

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

        }
    });

    expressApp.get('/api/back-office/genre/:genreId', function(req, res) {

        console.log(req.query)

        let responseModel = {};

        let legit;

        try{

            GenreODM.findById(req.params.genreId,function (error, foundDevice) {

                if(error){

                    responseModel.isSuccessful = false;
                    responseModel.responseMessage = "A database error occurred while fetching genre";
                    res.status(500).send(responseModel);

                }else {
                    res.status(200).send(foundDevice);
                }
            })

        }catch(error){

            responseModel.isSuccessful = false;
            responseModel.responseMessage = "Please login to access data";
            res.status(404).send(responseModel);
        }

    });

    return backOfficeGenreControllerV1Routes;
};