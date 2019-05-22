let bcrypt = require('bcryptjs');

let util =  require('util');

let JwtUtils = require('./../../../../utility/jwtUtils');

const jwt  = require('jsonwebtoken');

let DeviceODM = require('./../../../../odm/deviceODM');

module.exports = function(expressApp) {

    let backOfficeLoginControllerV1Routes = {};

    expressApp.post('/api/back-office/device/save', function(req, res) {

        console.log(req.headers.bearer)

        let responseModel = {};

        let legit;

        try{

            legit = jwt.verify(
                req.headers.bearer,
                JwtUtils.getPublicKey,
                new JwtUtils.generateVerifyOptions()
            );

            DeviceODM.save(req.body, function (error, foundAdmin) {


                if(error){

                    responseModel.isSuccessful = false;

                    responseModel.responseMessage = "A database error occurred while saving device";

                    res.status(500).send(responseModel);


                }else{

                    responseModel.isSuccessful = true;

                    responseModel.responseMessage = "You have successfully saved a device";

                    res.status(200).send(responseModel);

                }

            })

        }catch(err){

            responseModel.isSuccessful = false;

            responseModel.responseMessage = "Please login to access data";

            res.status(404).send(responseModel);
        }



    });

    expressApp.post('/api/back-office/device/update', function(req, res) {

        console.log(req.headers.bearer)

        let responseModel = {};

        let legit;

        try{

            legit = jwt.verify(
                req.headers.bearer,
                JwtUtils.getPublicKey,
                new JwtUtils.generateVerifyOptions()
            );

            DeviceODM.findByIdAndUpdate(req.body._id,req.body, function (error, updatedDevice) {


                if(error){

                    responseModel.isSuccessful = false;

                    responseModel.responseMessage = "A database error occurred while saving device";

                    res.status(500).send(responseModel);


                }else{

                    responseModel.isSuccessful = true;

                    responseModel.responseMessage = "You have successfully updated a device";

                    res.status(200).send(responseModel);

                }

            })

        }catch(err){

            responseModel.isSuccessful = false;

            responseModel.responseMessage = "Please login to access data";

            res.status(404).send(responseModel);
        }



    });

    expressApp.delete('/api/back-office/device/delete/:deviceId', function(req, res) {

        let responseModel = {};

        try{

            let legit = jwt.verify(
                req.headers.bearer,
                JwtUtils.getPublicKey,
                new JwtUtils.generateVerifyOptions()
            );

            DeviceODM.deleteById(req.params.deviceId, function (error) {

                if(error){
                    responseModel.isSuccessful = false;

                    responseModel.responseMessage = "A database error occurred while deleting a device";

                    res.status(500).send(responseModel);

                }else{

                    responseModel.isSuccessful = true;

                    responseModel.responseMessage = "You have successfully deleted a device";

                    res.status(200).send(responseModel);
                }
            })

        }catch(error){

            responseModel.isSuccessful = false;

            responseModel.responseMessage = "Please login to access data";

            res.status(404).send(responseModel);
        }
    });

    expressApp.get('/api/back-office/device/view/query', function(req, res) {

        let responseModel = {};

        let legit;

        try{


            DeviceODM.getAllDevices(function (error, foundDevices) {

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

    expressApp.get('/api/back-office/device/:deviceId', function(req, res) {

        console.log(req.query)

        let responseModel = {};

        let legit;

        try{

            DeviceODM.findById(req.params.deviceId,function (error, foundDevice) {

                if(error){

                    responseModel.isSuccessful = false;
                    responseModel.responseMessage = "A database error occurred while fetching devices";
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

    return backOfficeLoginControllerV1Routes;
};