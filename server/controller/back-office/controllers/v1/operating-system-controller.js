let bcrypt = require('bcryptjs');

let util =  require('util');

let JwtUtils = require('./../../../../utility/jwtUtils');

const jwt  = require('jsonwebtoken');

let OperatingSystemODM = require('./../../../../odm/operatingSystemODM');

module.exports = function(expressApp) {

    let backOfficeLoginControllerV1Routes = {};

    expressApp.post('/api/back-office/operating-system/save', function(req, res) {


        let responseModel = {};

        try{

            let legit = jwt.verify(
                req.headers.bearer,
                JwtUtils.getPublicKey,
                new JwtUtils.generateVerifyOptions()
            );

            OperatingSystemODM.save(req.body, function (error, foundOperatingSystem) {

                if(error){

                    responseModel.isSuccessful = false;

                    responseModel.responseMessage = "A database error occurred while saving OS";

                    res.status(500).send(responseModel);


                }else{

                    responseModel.isSuccessful = true;

                    responseModel.responseMessage = "You have successfully saved a OS";

                    res.status(200).send(responseModel);
                }
            })

        }catch(err){

            responseModel.isSuccessful = false;

            responseModel.responseMessage = "Please login to access data";

            res.status(415).send(responseModel);
        }
    });

    expressApp.post('/api/back-office/operating-system/update', function(req, res) {


        let responseModel = {};

        try{

            let legit = jwt.verify(
                req.headers.bearer,
                JwtUtils.getPublicKey,
                new JwtUtils.generateVerifyOptions()
            );

            OperatingSystemODM.findByIdAndUpdate(req.body._id,req.body, function (error, updatedOperatingSystem) {

                if(error){

                    responseModel.isSuccessful = false;

                    responseModel.responseMessage = "A database error occurred while saving OS";

                    res.status(500).send(responseModel);


                }else{

                    responseModel.isSuccessful = true;

                    responseModel.responseMessage = "You have successfully saved an OS";

                    res.status(200).send(responseModel);
                }
            })

        }catch(err){

            responseModel.isSuccessful = false;

            responseModel.responseMessage = "Please login to access data";

            res.status(415).send(responseModel);
        }
    });

    expressApp.delete('/api/back-office/operating-system/delete/:operatingSystemId', function(req, res) {

        let responseModel = {};

        try{

            let legit = jwt.verify(
                req.headers.bearer,
                JwtUtils.getPublicKey,
                new JwtUtils.generateVerifyOptions()
            );

            OperatingSystemODM.deleteById(req.params.operatingSystemId, function (error) {

                if(error){
                    responseModel.isSuccessful = false;

                    responseModel.responseMessage = "A database error occurred while deleting an OS";

                    res.status(500).send(responseModel);

                }else{

                    responseModel.isSuccessful = true;

                    responseModel.responseMessage = "You have successfully deleted an OS";

                    res.status(200).send(responseModel);
                }
            })

        }catch(error){

            responseModel.isSuccessful = false;

            responseModel.responseMessage = "Please login to access data";

            res.status(404).send(responseModel);
        }
    });

    expressApp.get('/api/back-office/operating-system/view/query', function(req, res) {

        let responseModel = {};

        let legit;

        try{

            OperatingSystemODM.getAllOperatingSystems(function (error, foundOperatingSystems) {

                res.status(200).send({
                    draw : 2,
                    recordsTotal : 2,
                    data : foundOperatingSystems,
                    recordsFiltered : 2,
                });

            })

        }catch(error){

            responseModel.isSuccessful = false;

            responseModel.responseMessage = "Please login to access data";

            res.status(404).send(responseModel);
        }
    });

    expressApp.get('/api/back-office/operatingSystem/:operatingSystemId', function(req, res) {

        console.log(req.query)

        let responseModel = {};

        let legit;

        try{

            OperatingSystemODM.findById(req.params.operatingSystemId,function (error, foundCompetitionType) {

                if(error){

                    responseModel.isSuccessful = false;
                    responseModel.responseMessage = "A database error occurred while fetching platforms";
                    res.status(500).send(responseModel);

                }else {
                    console.log(foundCompetitionType)
                    res.status(200).send(foundCompetitionType);
                }
            })

        }catch(error){

            responseModel.isSuccessful = false;
            responseModel.responseMessage = "Please login to access data";
            res.status(404).send(responseModel);
        }

    });

    return backOfficeLoginControllerV1Routes;
};