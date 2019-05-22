
function loginPageModel() {

    var model = {};

    model.callingServer = { login :ko.observable(false)};

    model.user = {

        userName: ko.observable(''),

        password: ko.observable(''),


    };

    model.validateLogin = function (callback) {


        if(model.user.userName().trim() === ""){

            return callback(false,"Enter a user name");

        }

        if(model.user.password().trim() === ""){

            return callback(false,"Enter a password");

        }

        return callback(true,"validated!");

    };


    model.login = function () {

        model.callingServer.login(true);

        model.validateLogin(function (isSuccessful, message) {

            if(!isSuccessful){

                toast("error", message, 3000);

                model.callingServer.login(false);

            }else{

                console.log(ko.toJSON(model.user));

                post("/api/back-office/login", ko.toJSON(model.user), function (isSuccessful,response) {

                    // checks if the call was successful from your box
                    if(isSuccessful) {

                        alert("here")
                        if (response.isSuccessful) {

                            setJwt(response.jwtToken);

                            window.location.href = "/";

                        } else {

                            toast("error", "User name and password is incorrect", 5000);

                        }

                    }else{

                        toast("error", "User name and password is incorrect", 5000);
                    }

                    model.callingServer.login(false);

                });


            }



        })

    };

    model.resetUserModel = function () {

        model.user.firstName('');

        model.user.lastName('');

        model.user.userName('');

        model.user.email('');

        model.user.DOB('');

        model.user.password('');

        model.user.re_password('');

        model.user.gender("UNSPECIFIED");

        model.user.address('');

        model.user.country('');

        model.user.picture('profile-photo.jpg');

        model.user.phoneNumber('');

        model.user.bio('');

        document.getElementById("imageFilePickerInput").value = "";

    };


    return model;
}