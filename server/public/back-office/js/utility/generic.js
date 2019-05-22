// VARIABLES =============================================================
var TOKEN_KEY = "jwtToken";



function setJwt(token) {

    localStorage.setItem(TOKEN_KEY, token);
}

function getJwt() {

    return localStorage.getItem(TOKEN_KEY);
}


function createAuthorizationTokenHeader() {

    var token = getJwt();

    if (token) {

        return {"bearer": token};

    } else {

        return {};

    }
}

function toast(type, title, timer ) {

    const toast = swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: timer
    });

    toast({
        type: type,
        title: title
    })

}

function post(url,data,callback) {

    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        contentType: "application/json",
        headers: createAuthorizationTokenHeader(),
        data: data,

        success: function(response) {
            callback(true,response);
        },
        error: function (err) {
            callback(false,err);
        }
    });
}

function deleteData(url,callback) {

    $.ajax({
        url: url,
        type: 'DELETE',
        headers: createAuthorizationTokenHeader(),

        success: function(response) {
            callback(true,response);
        },
        error: function (err) {
            callback(false,err);
        }
    });
}

function postFormData(url,data,callback) {

    $.ajax({
        url: url,
        type: 'POST',
        contentType: false,
        processData: false,
        headers: createAuthorizationTokenHeader(),
        data: data,

        success: function(response) {

            callback(true,response);

        },

        error: function (err) {

            callback(false,err);

        }
    });

}
