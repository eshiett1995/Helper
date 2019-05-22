let bcrypt = require('bcryptjs');

let util =  require('util');

let JwtUtils = require('./../../../../utility/jwtUtils');

const jwt  = require('jsonwebtoken');

let PlatformODM = require('./../../../../odm/platformODM');

let DeviceODM = require('./../../../../odm/deviceODM');

let OperatingSystemODM = require('./../../../../odm/operatingSystemODM');

module.exports = function(expressApp) {

    let backOfficeLoginControllerV1Routes = {};


    expressApp.get('/api/back-office/platform/fetch/data', function(req, res) {


        let responseModel = {};

        let platformData = {};

        try{

            let legit = jwt.verify(
                req.headers.bearer,
                JwtUtils.getPublicKey,
                new JwtUtils.generateVerifyOptions()
            );

            DeviceODM.getAllDevices(function (error, foundDevices) {

                if(error){

                    responseModel.isSuccessful = false;

                    responseModel.responseMessage = "A database error occurred while saving Platform";

                    res.status(500).send(responseModel);

                }else{

                    OperatingSystemODM.getAllOperatingSystems(function (error, foundOperatingSystems) {

                        if(error){

                            responseModel.isSuccessful = false;

                            responseModel.responseMessage = "A database error occurred while saving Platform";

                            res.status(500).send(responseModel);

                        }else{

                            platformData.devices = foundDevices;

                            platformData.operatingSystems = foundOperatingSystems;

                            res.status(200).send(platformData);
                        }
                    })

                }
            })

        }catch(error){
            responseModel.isSuccessful = false;
            responseModel.responseMessage = "Please login to access data";
            res.status(415).send(responseModel);
        }
    });

    expressApp.post('/api/back-office/platform/save', function(req, res) {


        let responseModel = {};

        try{

            let legit = jwt.verify(
                req.headers.bearer,
                JwtUtils.getPublicKey,
                new JwtUtils.generateVerifyOptions()
            );

            PlatformODM.save(req.body, function (error, foundPlatform) {




                if(error){

                    responseModel.isSuccessful = false;

                    responseModel.responseMessage = "A database error occurred while saving Platform";

                    res.status(500).send(responseModel);


                }else{

                    responseModel.isSuccessful = true;

                    responseModel.responseMessage = "You have successfully saved a Platform";

                    res.status(200).send(responseModel);

                }

            })

        }catch(err){
            responseModel.isSuccessful = false;
            responseModel.responseMessage = "Please login to access data";
            res.status(415).send(responseModel);
        }
    });

    expressApp.post('/api/back-office/platform/update', function(req, res) {


        let responseModel = {};

        try{

            let legit = jwt.verify(
                req.headers.bearer,
                JwtUtils.getPublicKey,
                new JwtUtils.generateVerifyOptions()
            );

            console.log(req.body);

            PlatformODM.findByIdAndUpdate(req.body._id, req.body, function (error, foundPlatform) {

                if(error){

                    responseModel.isSuccessful = false;

                    responseModel.responseMessage = "A database error occurred while saving Platform";

                    res.status(500).send(responseModel);


                }else{

                    responseModel.isSuccessful = true;

                    responseModel.responseMessage = "You have successfully saved a Platform";

                    res.status(200).send(responseModel);

                }

            })

        }catch(err){
            responseModel.isSuccessful = false;
            responseModel.responseMessage = "Please login to access data";
            res.status(415).send(responseModel);
        }
    });

    expressApp.delete('/api/back-office/platform/delete/:platformId', function(req, res) {

        let responseModel = {};

        try{

            let legit = jwt.verify(
                req.headers.bearer,
                JwtUtils.getPublicKey,
                new JwtUtils.generateVerifyOptions()
            );

            DeviceODM.deleteById(req.params.platformId, function (error) {

                if(error){
                    responseModel.isSuccessful = false;

                    responseModel.responseMessage = "A database error occurred while deleting a platform";

                    res.status(500).send(responseModel);

                }else{

                    responseModel.isSuccessful = true;

                    responseModel.responseMessage = "You have successfully deleted a platform";

                    res.status(200).send(responseModel);
                }
            })

        }catch(error){

            responseModel.isSuccessful = false;

            responseModel.responseMessage = "Please login to access data";

            res.status(404).send(responseModel);
        }
    });

    expressApp.get('/api/back-office/platform/:platformId', function(req, res) {

        console.log(req.query)

        let responseModel = {};

        let platformData = {};

        let legit;

        try{

            PlatformODM.findById(req.params.platformId,function (error, foundPlatform) {

                if(error){

                    responseModel.isSuccessful = false;
                    responseModel.responseMessage = "A database error occurred while fetching platforms";
                    res.status(500).send(responseModel);

                }else {

                    DeviceODM.getAllDevices(function (error, foundDevices) {

                        if(error){

                            responseModel.isSuccessful = false;

                            responseModel.responseMessage = "A database error occurred while saving Platform";

                            res.status(500).send(responseModel);

                        }else{

                            OperatingSystemODM.getAllOperatingSystems(function (error, foundOperatingSystems) {

                                if(error){

                                    responseModel.isSuccessful = false;

                                    responseModel.responseMessage = "A database error occurred while saving Platform";

                                    res.status(500).send(responseModel);

                                }else{

                                    platformData.platform = foundPlatform;

                                    platformData.devices = foundDevices;

                                    platformData.operatingSystems = foundOperatingSystems;

                                    res.status(200).send(platformData);
                                }
                            })

                        }
                    })

                }
            })

        }catch(error){

            responseModel.isSuccessful = false;
            responseModel.responseMessage = "Please login to access data";
            res.status(404).send(responseModel);
        }

    });

    expressApp.get('/api/back-office/platform/view/query', function(req, res) {

        let responseModel = {};

        let legit;

        try{


            PlatformODM.getAllPlatforms(function (error, foundPlatforms) {

                console.log(foundPlatforms);

                res.status(200).send({
                    draw : 2,
                    recordsTotal : 2,
                    data : foundPlatforms,
                    recordsFiltered : 2,
                });

            })



        }catch(err){

            responseModel.isSuccessful = false;

            responseModel.responseMessage = "Please login to access data";

            res.status(404).send(responseModel);
        }
    });

    return backOfficeLoginControllerV1Routes;
};