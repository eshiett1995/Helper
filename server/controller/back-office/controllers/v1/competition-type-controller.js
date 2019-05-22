let bcrypt = require('bcryptjs');

let util =  require('util');

let JwtUtils = require('./../../../../utility/jwtUtils');

const jwt  = require('jsonwebtoken');

let CompetitionTypeODM = require('./../../../../odm/competitionTypeODM');

module.exports = function(expressApp) {

    let backOfficeGenreControllerV1Routes = {};

    expressApp.post('/api/back-office/competition-type/save',  function(req, res) {

        let responseModel = {};

        try{

            let legit = jwt.verify(
                req.headers.bearer,
                JwtUtils.getPublicKey,
                new JwtUtils.generateVerifyOptions()
            );

            CompetitionTypeODM.save(req.body, function (error, foundAdmin) {


                if(error){

                    responseModel.isSuccessful = false;

                    responseModel.responseMessage = "A database error occurred while saving competition type";

                    res.status(500).send(responseModel);


                }else{

                    responseModel.isSuccessful = true;

                    responseModel.responseMessage = "You have successfully saved a competition type";

                    res.status(200).send(responseModel);
                }
            })

        }catch(err){

            responseModel.isSuccessful = false;

            responseModel.responseMessage = "Please login to access data";

            res.status(404).send(responseModel);
        }
    });

    expressApp.post('/api/back-office/competition-type/update',  function(req, res) {

        let responseModel = {};

        try{

            let legit = jwt.verify(
                req.headers.bearer,
                JwtUtils.getPublicKey,
                new JwtUtils.generateVerifyOptions()
            );

            console.log(req.body);
            CompetitionTypeODM.findByIdAndUpdate(req.body._id, req.body, function (error, updatedCompetitionType) {

                if(error){
                    responseModel.isSuccessful = false;
                    responseModel.responseMessage = "A database error occurred while updating competition type";
                    res.status(500).send(responseModel);

                }else{
                    responseModel.isSuccessful = true;
                    responseModel.responseMessage = "You have successfully updated a competition type";
                    res.status(200).send(responseModel);
                }
            })

        }catch(error){
            responseModel.isSuccessful = false;
            responseModel.responseMessage = "Please login to access data";
            res.status(404).send(responseModel);
        }
    });

    expressApp.delete('/api/back-office/competition-type/delete/:competitionTypeId', function(req, res) {

        let responseModel = {};

        try{

            let legit = jwt.verify(
                req.headers.bearer,
                JwtUtils.getPublicKey,
                new JwtUtils.generateVerifyOptions()
            );

            CompetitionTypeODM.deleteById(req.params.competitionTypeId, function (error) {

                if(error){
                    responseModel.isSuccessful = false;

                    responseModel.responseMessage = "A database error occurred while deleting a competition type";

                    res.status(500).send(responseModel);

                }else{

                    responseModel.isSuccessful = true;

                    responseModel.responseMessage = "You have successfully deleted a competition type";

                    res.status(200).send(responseModel);
                }
            })

        }catch(error){

            responseModel.isSuccessful = false;

            responseModel.responseMessage = "Please login to access data";

            res.status(404).send(responseModel);
        }
    });

    expressApp.get('/api/back-office/competition-type/view/query', function(req, res) {

        console.log(req.query)

        let responseModel = {};

        let legit;

        try{

            CompetitionTypeODM.getAllCompetitionTypes(function (error, foundCompetitionTypes) {

                res.status(200).send({
                    draw : 2,
                    recordsTotal : 2,
                    data : foundCompetitionTypes,
                    recordsFiltered : 2,
                });
            })

        }catch(error){

            responseModel.isSuccessful = false;

            responseModel.responseMessage = "Please login to access data";

            res.status(404).send(responseModel);
        }

    });

    expressApp.get('/api/back-office/competitionType/:competitionTypeId', function(req, res) {

        console.log(req.query)

        let responseModel = {};

        let legit;

        try{

            CompetitionTypeODM.findById(req.params.competitionTypeId,function (error, foundCompetitionType) {

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

    return backOfficeGenreControllerV1Routes;
};