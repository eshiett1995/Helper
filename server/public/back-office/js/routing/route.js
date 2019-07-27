
var self;

var app = $.sammy('.main', function () {

    this.use(Sammy.JSON);

    this.get('#/create/orphanage-home', function (context) {

        context.app.swap('');
        context.load('/back-office/partials/orphanage-home/create-orphanage-home.html')
            .appendTo(context.$element())
            .then(function (content) {

                ko.applyBindings(createOrphanagePageModel(),document.getElementById('create-orphanage-home'));

            });
    });

    this.get('#/view/orphanage-homes', function (context) {

        context.app.swap('');
        context.load('/back-office/partials/orphanage-home/view-orphanage-homes.html')
            .appendTo(context.$element())
            .then(function (content) {
                ko.applyBindings(viewOrphanageHomesPageModel(),document.getElementById('view-orphanage-homes'));
                viewOrphanageHomesPageModel().initDataTable();

            });
    });

    this.get('#/update/orphanage-home/:orphanageHomeId', function (context) {

        $.ajax({
            url: "/api/back-office/orphanage-home/"+ this.params['orphanageHomeId'],
            type: 'GET',
            dataType: 'json',
            headers: createAuthorizationTokenHeader(),
            success: function(data) {
                context.app.swap('');
                context.load('/back-office/partials/orphanage-home/create-orphanage-home.html')
                    .appendTo(context.$element())
                    .then(function (content) {
                        ko.applyBindings(updateOrphanageHomePageModel(data),document.getElementById('create-orphanage-home'));

                    });
            }
        });
    });


    this.notFound = function(){

        self.redirect('#/create/orphanage-home')
    }
});

app.run('#/create/orphanage-home');

