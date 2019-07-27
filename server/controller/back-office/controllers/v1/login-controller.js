let bcrypt = require('bcryptjs');

let util =  require('util');

let JwtUtils = require('./../../../../utility/jwtUtils');

const jwt  = require('jsonwebtoken');

let adminODM = require('./../../../../odm/adminODM');

let app = require('./../../../../backOffice');

module.exports = function(expressApp) {

    let backOfficeLoginControllerV1Routes = {};

    app.post('/api/back-office/login', function(req, res) {

        adminODM.findByUsername(req.body.userName, function (error, foundAdmin) {

            let responseModel = {};

            if(error){

                responseModel.isSuccessful = false;
                responseModel.responseMessage = "A database error occurred while searching for admin";
                res.status(500).send(responseModel);


            }else{

                if(foundAdmin === null){

                    responseModel.isSuccessful = false;

                    responseModel.responseMessage = "Username/password incorrect";

                    res.status(404).send(responseModel);

                }else{


                    if(bcrypt.compareSync(req.body.password, foundAdmin.password)){

                        responseModel.isSuccessful = true;

                        responseModel.responseMessage = "You have successfully registered";

                        responseModel.jwtToken =  jwt.sign(
                            new JwtUtils.generateAdminPayLoad(foundAdmin),
                            JwtUtils.getPrivateKey,
                            new JwtUtils.generateSignOptions()
                        );


                        let options = {
                            maxAge: 1000 * 60 * 10000000000, // would expire after 15 minutes
                            httpOnly: true, // The cookie only accessible by the web server
                            //signed: true // Indicates if the cookie should be signed
                        }

                        // Set cookie
                        res.cookie('helper', responseModel.jwtToken, options);
                        res.status(200).send(responseModel);
                    }else{

                        responseModel.isSuccessful = false;
                        responseModel.responseMessage = "username/password is incorrect";
                        res.status(404).send(responseModel);

                    }


                }

            }

        })

    });




    return backOfficeLoginControllerV1Routes;
};