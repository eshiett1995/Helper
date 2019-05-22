let bcrypt = require('bcryptjs');

let util =  require('util');

let JwtUtils = require('./../../../../utility/jwtUtils');

const jwt  = require('jsonwebtoken');

let WalletConfigurationODM = require('./../../../../odm/walletConfigurationODM');

module.exports = function(expressApp) {

    let backOfficeLoginControllerV1Routes = {};

    expressApp.get('/api/back-office/configurations/wallet', function(req, res) {


        let responseModel = {};

        let legit;

        try{

            legit = jwt.verify(
                req.headers.bearer,
                JwtUtils.getPublicKey,
                new JwtUtils.generateVerifyOptions()
            );

            WalletConfigurationODM.getAllConfigurations(function (error, foundWalletConfigurations) {




                if(error){

                    responseModel.isSuccessful = false;

                    responseModel.responseMessage = "A database error occurred while saving device";

                    res.status(500).send(responseModel);


                }else{

                    console.log(foundWalletConfigurations[0])

                    res.status(200).send(foundWalletConfigurations[0]);

                }

            })

        }catch(err){

            responseModel.isSuccessful = false;

            responseModel.responseMessage = "Please login to access data";

            res.status(415).send(responseModel);

            return;
        }



    });

    expressApp.post('/api/back-office/configurations/wallet/save', function(req, res) {


        console.log(req.body);

        let responseModel = {};

        let legit;

        try{

            legit = jwt.verify(
                req.headers.bearer,
                JwtUtils.getPublicKey,
                new JwtUtils.generateVerifyOptions()
            );

            WalletConfigurationODM.findByIdAndUpdate(req.body._id, req.body,  function (error, updatedWalletConfiguration) {

                if(error){

                    responseModel.isSuccessful = false;

                    responseModel.responseMessage = "A database error occurred while saving wallet configuration";

                    res.status(500).send(responseModel);


                }else{

                    responseModel.isSuccessful = true;

                    responseModel.responseMessage = "You have successfully saved the wallet configuration";

                    res.status(200).send(responseModel);

                }

            })

        }catch(err){

            responseModel.isSuccessful = false;

            responseModel.responseMessage = "Please login to access data";

            res.status(415).send(responseModel);

            return;
        }



    });


    return backOfficeLoginControllerV1Routes;
};