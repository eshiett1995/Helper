let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userSchema = new Schema({

    dateCreated : { type: Date, default: Date.now },
    firstName: String,
    lastName: String,
    password: String,
    mobile:Number,
    email: String,
});

let orphanageODM = mongoose.model('user', userSchema);

exports.save = function (competition, callback) {

    new orphanageODM(competition).save(function (error, savedCompetition) {

        callback(error, savedCompetition);

    });

};

exports.findById = function (id, callback) {

    orphanageODM.findById(id, function (err, foundCompetition) {

        callback(err, foundCompetition);

    });

};


exports.update = function (competitionObject, callback) {

    orphanageODM.updateOne(competitionObject, function (err, updatedCompetition) {

        callback(err, updatedCompetition);

    });
};


exports.findByIdAndUpdate = function (id, competition, callback) {

    orphanageODM.findByIdAndUpdate(id, competition, function (err, updatedCompetition) {

        callback(err, updatedCompetition);

    });
};


exports.findOneById = function (id, callback) {

    orphanageODM.findOne({_id: id}).populate(
        {
            path: 'competitors.player',
            populate: {
                path: 'wallet'
            }
        }
    ).exec(function(err, foundCompetition)
    {

        callback(err,foundCompetition);

    });
};


