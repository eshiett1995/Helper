let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let needSchema = new Schema({
    dateCreated : { type: Date, default: Date.now },
    detail : String,
    quantity : Number,
    deliverer : [{}]
});

let needODM = mongoose.model('need', needSchema);

exports.save = function (competition, callback) {

    new needODM(competition).save(function (error, savedCompetition) {

        callback(error, savedCompetition);

    });

};

exports.findById = function (id, callback) {

    needODM.findById(id, function (err, foundCompetition) {

        callback(err, foundCompetition);

    });

};


exports.update = function (competitionObject, callback) {

    needODM.updateOne(competitionObject, function (err, updatedCompetition) {

        callback(err, updatedCompetition);

    });
};


exports.findByIdAndUpdate = function (id, competition, callback) {

    needODM.findByIdAndUpdate(id, competition, function (err, updatedCompetition) {

        callback(err, updatedCompetition);

    });
};


exports.findOneById = function (id, callback) {

    needODM.findOne({_id: id}).populate(
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


