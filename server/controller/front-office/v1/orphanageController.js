let JwtUtils = require('./../../../../utility/jwtUtils');

const jwt  = require('jsonwebtoken');

let app = require('./../../../app');

let orphanageODM = require('./../../../odm/orphanageHomeODM');

module.exports = function(expressApp) {

    let backOfficeLoginControllerV1Routes = {};

    app.get('/api/orphanage-home', function(req, res) {

        try{

            orphanageODM.save(req.body, function (error, orphanageHomes) {

                if(error){
                    res.status(500);

                }else{
                    res.status(200).send(orphanageHomes);

                }
            })

        }catch(error){

            res.status(500);
        }
    });

    app.get('/api/orphanage-home/:id', function(req, res) {

        try{

            orphanageODM.findById(req.params.id, function (error, orphanageHome) {

                if(error){
                    res.status(500);

                }else{
                    res.status(200).send(orphanageHome);

                }
            })

        }catch(error){

            res.status(500);
        }
    });

    app.post('/api/orphanage-home/:id', function(req, res) {

        try{

            orphanageODM.save(req.body, function (error, orphanageHomes) {

                if(error){
                    res.status(500);

                }else{
                    res.status(200).send(orphanageHomes);

                }
            })

        }catch(error){

            res.status(500);
        }
    });

    return backOfficeLoginControllerV1Routes;
};