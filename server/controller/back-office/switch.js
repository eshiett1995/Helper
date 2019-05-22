let bcrypt = require('bcryptjs');

let util =  require('util');

const jwt  = require('jsonwebtoken');

let JwtUtils = require('./../../utility/jwtUtils');

let app = require('./../../backOffice');

module.exports = function(expressApp) {

    let backOfficeSwitchRoutes = {};

    app.get('/', function(req, res, next) {


        try{

            let legit = jwt.verify(
                req.cookies.gambeat,
                JwtUtils.getPublicKey,
                new JwtUtils.generateVerifyOptions()
            );

            if(legit.userType === "ADMIN"){

                res.render('back-office/dashboard', { title: 'Express' });

            }else{

                res.render('back-office/login', { title: 'Express' });
            }

        }catch(err){

            res.render('back-office/login', { title: 'Express' });
        }



    });




    return backOfficeSwitchRoutes;
};



