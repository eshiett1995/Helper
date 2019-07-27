let bcrypt = require('bcryptjs');

let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let adminSchema = new Schema({
    dateCreated : { type: Date, default: Date.now },
    userName: String,
    password: String,
});

let adminODM = mongoose.model('admin', adminSchema);

exports.save = function (competition, callback) {

    new adminODM(competition).save(function (error, savedCompetition) {

        callback(error, savedCompetition);

    });

};

exports.findById = function (id, callback) {

    adminODM.findById(id, function (err, foundCompetition) {

        callback(err, foundCompetition);

    });

};


exports.update = function (competitionObject, callback) {

    adminODM.updateOne(competitionObject, function (err, updatedCompetition) {

        callback(err, updatedCompetition);

    });
};


exports.findByIdAndUpdate = function (id, competition, callback) {

    adminODM.findByIdAndUpdate(id, competition, function (err, updatedCompetition) {

        callback(err, updatedCompetition);

    });
};

exports.findByUsername = function (username, callback) {

    adminODM.findOne({userName: username }, function(err, admin)
    {
        callback(err,admin);
    });
};

/**
let salt = bcrypt.genSaltSync(10);


let admin = {
    userName: "osi",
    password: bcrypt.hashSync("password", salt),
};

this.save(admin, function (error, saved) {

    console.log("done");

}) **/