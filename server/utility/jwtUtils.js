const fs = require('fs');

exports.generatePayLoad = function (user) {

    return {

        id: user._id,

        userType : "USER",

        userName: user.userName,

    };

};


exports.generateAdminPayLoad = function (admin) {

    return {

        id: admin._id,

        userType : "ADMIN",

        userName: admin.userName,

    };

};

exports.generateSignOptions = function () {

    return {
        issuer:  "Gambeat",
        subject:  "gambeat.com.ng",
        audience: "http://gambeat.com.ng",
        expiresIn:  "12h",
        algorithm:  "RS256"
    };

};

exports.generateVerifyOptions  = function () {

    return {
        issuer:  "Gambeat",
        subject:  "gambeat.com.ng",
        audience: "http://gambeat.com.ng",
        expiresIn:  "12h",
        algorithm:  ["RS256"]
    };

};


exports.getPrivateKey  = fs.readFileSync('./server/keys/private.key', 'utf8');

exports.getPublicKey  = fs.readFileSync('./server/keys/public.key', 'utf8');
