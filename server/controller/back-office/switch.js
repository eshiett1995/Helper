let util =  require('util');

const jwt  = require('jsonwebtoken');

let JwtUtils = require('./../../utility/jwtUtils');

let app = require('./../../backOffice');


module.exports = function(expressApp) {

    let backOfficeSwitchRoutes = {};

    app.get('/', function(req, res, next) {


        try{

            let legit = jwt.verify(
                req.cookies.helper,
                JwtUtils.getPublicKey,
                new JwtUtils.generateVerifyOptions()
            );

            if(legit.userType === "ADMIN"){
                res.render('back-office/dashboard', { title: 'Express' });

            }else{
                res.render('back-office/login', { title: 'Express' });
            }

        }catch(error){
            res.render('back-office/login', { title: 'Express' });
        }
    });




    return backOfficeSwitchRoutes;
};



