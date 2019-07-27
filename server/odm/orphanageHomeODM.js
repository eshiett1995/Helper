let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let orphanageHomeSchema = new Schema({

    dateCreated : { type: Date, default: Date.now },
    detail : String,
    name: String,
    address: String,
    mobile:Number,
    email: String,
    noOfChildren: Number,
    needs : [{type: Schema.Types.ObjectId, ref: 'need'}],
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

let orphanageODM = mongoose.model('orphanage home', orphanageHomeSchema);

exports.save = function (competition, callback) {

    new orphanageODM(competition).save(function (error, savedCompetition) {

        callback(error, savedCompetition);

    });

};

exports.findById = function (id, callback) {

    orphanageODM.findById(id, function (err, foundOrphanageHome) {

        callback(err, foundOrphanageHome);

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

exports.getAllOrphanageHomes = function (callback) {
    orphanageODM.find({}, function(err, docs) {
        callback(err, docs)
    });
};


exports.getAllOrphanageHomesByMaxDistance = function (longitude, latitude, distance,  callback) {
    orphanageODM.find({
        location: {
            $near: {
                $maxDistance: distance,
                $geometry: {
                    type: "Point",
                    coordinates: [longitude, latitude]
                }
            }
        }
    }).find((error, results) => {
        callback(error, results);
    });
};


exports.deleteById = function (id, callback) {
    orphanageODM.findOneAndDelete({_id: id}, function (err, deletedGame) {
        callback(err, deletedGame);
    });
};

