
var baseUrl = "http://localhost:3000";

var self;

var app = $.sammy('.main', function () {

    this.use(Sammy.JSON);


    this.get('#/home', function (context) {

        self = this;
        context.app.swap('');
        context.load('/back-office/partials/create-platform.html')
            .appendTo(context.$element())
            .then(function (content) {

                //ko.applyBindings(homeModel(data.playerStats),document.getElementById('home'));


            });
        /**$.ajax({
            url: base_url + "home/stats",
            type: 'GET',
            dataType: 'json',
            headers: createAuthorizationTokenHeader(),
            success: function(data) {


                console.log(data);

                saveUserDetailsOffline(data.user);
                context.app.swap('');
                context.load('partials/home.html')
                    .appendTo(context.$element())
                    .then(function (content) {

                        ko.applyBindings(homeModel(data.playerStats),document.getElementById('home'));
                        initCard();
                        genericFunctions();
                        //setInterval(getPlayerStats(), 600000);
                        endProgressBar();

                    });

            },

            error: function (msg) {

                endProgressBar();

            }
        });**/
    });

    this.get('#/create/game', function (context) {

        $.ajax({
            url: "/api/back-office/game/fetch/data",
            type: 'GET',
            dataType: 'json',
            headers: createAuthorizationTokenHeader(),
            success: function(data) {
                context.app.swap('');
                context.load('/back-office/partials/game/create-game.html')
                    .appendTo(context.$element())
                    .then(function (content) {

                        console.log(data);

                        ko.applyBindings(createGamePageModel(data),document.getElementById('create-game'));

                    });
            }
        });
    });

    this.get('#/view/games', function (context) {

        context.app.swap('');
        context.load('/back-office/partials/game/view-games.html')
            .appendTo(context.$element())
            .then(function (content) {

                var VGPM = viewGamesPageModel();
                ko.applyBindings(VGPM,document.getElementById('view-games'));
                VGPM.initDataTable();


            });
    });

    this.get('#/update/:gameId', function (context) {

        $.ajax({
            url: "/api/back-office/game/"+ this.params['gameId'],
            type: 'GET',
            dataType: 'json',
            headers: createAuthorizationTokenHeader(),
            success: function(data) {
                context.app.swap('');
                context.load('/back-office/partials/game/create-game.html')
                    .appendTo(context.$element())
                    .then(function (content) {

                        console.log(data);

                        var UGPM = updateGamePageModel(data);

                        ko.applyBindings(UGPM,document.getElementById('create-game'));


                    });
            }
        });
    });

    this.get('#/create/platform', function (context) {

        $.ajax({
            url: "/api/back-office/platform/fetch/data",
            type: 'GET',
            dataType: 'json',
            headers: createAuthorizationTokenHeader(),
            success: function(data) {
                context.app.swap('');
                context.load('/back-office/partials/platform/create-platform.html')
                    .appendTo(context.$element())
                    .then(function (content) {

                        ko.applyBindings(createPlatformPageModel(data),document.getElementById('create-platform'));

                    });
            }
        });

    });

    this.get('#/view/platforms', function (context) {

        context.app.swap('');
        context.load('/back-office/partials/platform/view-platforms.html')
            .appendTo(context.$element())
            .then(function (content) {

                var viewPlatformPageModel = viewPlatformsPageModel();
                ko.applyBindings(viewPlatformPageModel,document.getElementById('view-platforms'));
                viewPlatformPageModel.initDataTable();
            });
    });

    this.get('#/update/platform/:platformId', function (context) {

        $.ajax({
            url: "/api/back-office/platform/"+ this.params['platformId'],
            type: 'GET',
            dataType: 'json',
            headers: createAuthorizationTokenHeader(),
            success: function(data) {
                context.app.swap('');
                context.load('/back-office/partials/platform/create-platform.html')
                    .appendTo(context.$element())
                    .then(function (content) {
                        ko.applyBindings(updatePlatformPageModel(data),document.getElementById('create-game'));

                    });
            }
        });
    });

    this.get('#/view/competition-types', function (context) {

        context.app.swap('');
        context.load('/back-office/partials/competition-type/view-competition-types.html')
            .appendTo(context.$element())
            .then(function (content) {

                var viewCompetitionTypesModel = viewCompetitionTypesPageModel();
                ko.applyBindings(viewCompetitionTypesModel,document.getElementById('view-competition-types'));
                viewCompetitionTypesModel.initDataTable();

            });
    });

    this.get('#/create/genre', function (context) {

        context.app.swap('');
        context.load('/back-office/partials/genre/create-genre.html')
            .appendTo(context.$element())
            .then(function (content) {
                ko.applyBindings(createGenrePageModel(),document.getElementById('create-genre'));
            });
    });

    this.get('#/view/genres', function (context) {

        context.app.swap('');
        context.load('/back-office/partials/genre/view-genres.html')
            .appendTo(context.$element())
            .then(function (content) {
                ko.applyBindings(viewGenresPageModel(),document.getElementById('view-genres'));
                viewGenresPageModel().initDataTable();
            });
    });

    this.get('#/update/genre/:genreId', function (context) {

        $.ajax({
            url: "/api/back-office/genre/"+ this.params['genreId'],
            type: 'GET',
            dataType: 'json',
            headers: createAuthorizationTokenHeader(),
            success: function(data) {
                context.app.swap('');
                context.load('/back-office/partials/genre/create-genre.html')
                    .appendTo(context.$element())
                    .then(function (content) {
                        ko.applyBindings(updateGenrePageModel(data),document.getElementById('create-genre'));

                    });
            }
        });
    });


    this.get('#/create/competition-type', function (context) {

        context.app.swap('');
        context.load('/back-office/partials/competition-type/create-competition-type.html')
            .appendTo(context.$element())
            .then(function (content) {
                ko.applyBindings(createCompetitionTypePageModel(),document.getElementById('create-competition-type'));
            });
    });

    this.get('#/update/competition-type/:competitionTypeId', function (context) {

        $.ajax({
            url: "/api/back-office/competitionType/"+ this.params['competitionTypeId'],
            type: 'GET',
            dataType: 'json',
            headers: createAuthorizationTokenHeader(),
            success: function(data) {
                context.app.swap('');
                context.load('/back-office/partials/competition-type/create-competition-type.html')
                    .appendTo(context.$element())
                    .then(function (content) {
                        ko.applyBindings(updateCompetitionTypePageModel(data),document.getElementById('create-competition-type'));
                    });
            }
        });
    });

    this.get('#/view/competition-types', function (context) {

        context.app.swap('');
        context.load('/back-office/partials/competition-type/view-competition-types.html')
            .appendTo(context.$element())
            .then(function (content) {

                var viewCompetitionTypesModel = viewCompetitionTypesPageModel();
                ko.applyBindings(viewCompetitionTypesModel,document.getElementById('view-competition-types'));
                viewCompetitionTypesModel.initDataTable();

            });
    });

    this.get('#/create/device', function (context) {

        context.app.swap('');
        context.load('/back-office/partials/device/create-device.html')
            .appendTo(context.$element())
            .then(function (content) {

                ko.applyBindings(createDevicePageModel(),document.getElementById('create-device'));


            });
    });

    this.get('#/view/devices', function (context) {

        context.app.swap('');
        context.load('/back-office/partials/device/view-devices.html')
            .appendTo(context.$element())
            .then(function (content) {

                var VDPM = viewDevicesPageModel();
                ko.applyBindings(VDPM,document.getElementById('view-devices'));
                VDPM.initDataTable();
            });
    });

    this.get('#/update/device/:deviceId', function (context) {

        $.ajax({
            url: "/api/back-office/device/"+ this.params['deviceId'],
            type: 'GET',
            dataType: 'json',
            headers: createAuthorizationTokenHeader(),
            success: function(data) {
                context.app.swap('');
                context.load('/back-office/partials/device/create-device.html')
                    .appendTo(context.$element())
                    .then(function (content) {
                        ko.applyBindings(updateDevicePageModel(data),document.getElementById('create-device'));
                    });
            }
        });
    });

    this.get('#/create/operating-system', function (context) {

        context.app.swap('');
        context.load('/back-office/partials/operating-system/create-operating-system.html')
            .appendTo(context.$element())
            .then(function (content) {

                ko.applyBindings(createOperatingSystemPageModel(),document.getElementById('create-os'));


            });
    });

    this.get('#/view/operating-systems', function (context) {

        context.app.swap('');
        context.load('/back-office/partials/operating-system/view-operating-systems.html')
            .appendTo(context.$element())
            .then(function (content) {

                var viewOperatingSystemsModel = viewOperatingSystemsPageModel();
                ko.applyBindings(viewOperatingSystemsModel,document.getElementById('view-operating-systems'));
                viewOperatingSystemsModel.initDataTable();
            });
    });

    this.get('#/update/operating-system/:operatingSystemId', function (context) {

        $.ajax({
            url: "/api/back-office/operatingSystem/"+ this.params['operatingSystemId'],
            type: 'GET',
            dataType: 'json',
            headers: createAuthorizationTokenHeader(),
            success: function(data) {
                context.app.swap('');
                context.load('/back-office/partials/operating-system/create-operating-system.html')
                    .appendTo(context.$element())
                    .then(function (content) {
                        ko.applyBindings(updateOperatingSystemPageModel(data),document.getElementById('create-os'));
                    });
            }
        });
    });

    this.get('#/view/competitions', function (context) {

        context.app.swap('');
        context.load('/back-office/partials/competition/view-competitions.html')
            .appendTo(context.$element())
            .then(function (content) {

                var VCPM = viewCompetitionsPageModel();
                ko.applyBindings(VCPM,document.getElementById('view-competitions'));
                VCPM.initDataTable();


            });
    });

    this.get('#/configuration/wallet', function (context) {


        $.ajax({
            url: "/api/back-office/configurations/wallet",
            type: 'GET',
            dataType: 'json',
            headers: createAuthorizationTokenHeader(),
            success: function(data) {
                context.app.swap('');
                context.load('/back-office/partials/wallet-configuration.html')
                    .appendTo(context.$element())
                    .then(function (content) {

                        ko.applyBindings(createWalletConfigurationPageModel(data),document.getElementById('update-wallet-configuration'));


                    });
            }
        });


    });

    this.get('#/activities/match-stats', function (context) {

        startProgressBar();

        self = this;

        context.app.swap('');
        context.load('partials/match-stats.html')
            .appendTo(context.$element())
            .then(function (content) {

                $('#basicDataTable').DataTable({
                    "processing":true,
                    "serverSide":true,
                    "ajax": {
                        url: base_url + "activities/match-stats",
                        cache: false,
                        type: 'GET',
                    }

                });

                /** ko.applyBindings(homeModel(data.playerStats),document.getElementById('match-stats'));
                 initCard();
                 genericFunctions();
                 setInterval(getPlayerStats(), 600000); **/
                endProgressBar();

            });


    });

    this.get("#/social/profile", function (context) {

        startProgressBar();
        $.ajax({
            url: base_url + "social/profile",
            type: 'GET',
            dataType: 'json',
            headers: createAuthorizationTokenHeader(),
            success: function(data) {
                context.app.swap('');
                context.load('partials/my-profile.html')
                    .appendTo(context.$element())
                    .then(function (content) {
                        ko.applyBindings(PlayerProfileModel(data.user),document.getElementById('my-profile'));
                        initCard();
                        genericFunctions();
                        endProgressBar();
                    });
            }
        });

    });

    this.get("#/social/friends", function (context) {
        startProgressBar();
        $.ajax({
            url: base_url + "social/friends/0",
            type: 'GET',
            contentType:'application/json',
            dataType: 'json',
            headers: createAuthorizationTokenHeader(),
            success: function(data) {

                if(data.numberOfUsers > 0) {

                    context.app.swap('');
                    context.load('partials/friends.html')
                        .appendTo(context.$element())
                        .then(function (content) {

                            var FM = new friendsListModel(data);

                            FM.init(data);

                            ko.applyBindings(FM,document.getElementById('friends'));

                            genericFunctions();

                            endProgressBar();

                            $('.friendsPage').twbsPagination({

                                totalPages: data.numberOfPages,

                                visiblePages: 5,

                                onPageClick: function (event, page) {

                                    FM.pagination(page);

                                }
                            });
                        });

                }else{

                    context.app.swap('');
                    context.load('partials/no-friends.html')
                        .appendTo(context.$element())
                        .then(function (content) {
                            ko.applyBindings(noFriendsListModel(),document.getElementById('no-friends'));

                            initChatBox();

                            genericFunctions();

                            endProgressBar();

                        });

                }

            }
        });
    });

    this.get("#/social/referrals", function (context) {

        startProgressBar();

        $.ajax({
            url: baseUrl + "/social/referrals/0",
            type: 'GET',
            contentType:'application/json',
            dataType: 'json',
            headers: createAuthorizationTokenHeader(),
            success: function(data) {

                if(data.numberOfUsers > 0) {

                    context.app.swap('');
                    context.load('partials/referrals.html')
                        .appendTo(context.$element())
                        .then(function (content) {
                            ko.applyBindings(referralsListModel(data),document.getElementById('referrals'));
                            initChatBox();
                            genericFunctions();
                            paginationFunction("referralsPage", data.numberOfPages);
                        });
                }else{

                    context.app.swap('');
                    context.load('partials/no-referrals.html')
                        .appendTo(context.$element())
                        .then(function (content) {
                            ko.applyBindings(referralsListModel(data),document.getElementById('no-referrals'));
                            initChatBox();
                            genericFunctions();
                            endProgressBar();
                        });

                }
            }
        });
    });

    this.get("#/message", function (context) {
        startProgressBar();
        $.ajax({
            url: base_url + "message/all/0",
            type: 'GET',
            dataType: 'json',
            headers: createAuthorizationTokenHeader(),
            success: function(data) {
                context.app.swap('');
                context.load('partials/message.html')
                    .appendTo(context.$element())
                    .then(function (content) {
                        ko.applyBindings(messageModel(data),document.getElementById('message'));

                        initChatBox();

                        genericFunctions();

                        endProgressBar();
                    });
            }
        });
    });

    this.get("#/message/:username", function (context) {
        startProgressBar();
        $.ajax({
            url: base_url + "message/all/0",
            type: 'GET',
            dataType: 'json',
            headers: createAuthorizationTokenHeader(),
            success: function(data) {
                context.app.swap('');
                context.load('partials/message.html')
                    .appendTo(context.$element())
                    .then(function (content) {
                        ko.applyBindings(messageModel(data),document.getElementById('message'));

                        initChatBox();

                        genericFunctions();

                        endProgressBar();
                    });
            }
        });
    });

    this.get("#/social/referrer", function (context) {
        startProgressBar();
        $.ajax({
            url: base_url + "social/referrer",
            type: 'GET',
            contentType:'application/json',
            dataType: 'json',
            headers: createAuthorizationTokenHeader(),
            success: function(data) {
                if(data.responseMessage !== "No referrer found!") {

                    context.app.swap('');
                    context.load('partials/referrers-profile.html')
                        .appendTo(context.$element())
                        .then(function (content) {
                            ko.applyBindings(referrersProfileModel(data), document.getElementById('referrers-profile'));

                            initCard();

                            genericFunctions();

                            endProgressBar();
                        });

                }else{

                    context.app.swap('');
                    context.load('partials/no-referrer.html')
                        .appendTo(context.$element())
                        .then(function (content) {
                            ko.applyBindings(referrersProfileModel(data), document.getElementById('no-referrer'));

                            genericFunctions();

                            endProgressBar();

                        });

                }
            }
        });
    });

    this.get("#/social/friends/:username", function (context) {

        $.ajax({
            url: base_url + "social/users/" + this.params['username'] ,
            type: 'GET',
            dataType: 'json',
            headers: createAuthorizationTokenHeader(),
            success: function(data) {

                context.app.swap('');
                context.load('partials/users-profile.html')
                    .appendTo(context.$element())
                    .then(function (content) {

                        ko.applyBindings(usersProfileModel(data), document.getElementById('users-profile'));

                        initCard();

                        genericFunctions();

                        endProgressBar();
                    });

            }
        });
    });

    this.get("#/social/users/:username", function (context) {

        $.ajax({
            url: base_url + "social/users/" + this.params['username'],
            type: 'GET',
            contentType:'application/json',
            dataType: 'json',
            headers: createAuthorizationTokenHeader(),
            success: function(data) {
                context.app.swap('');
                context.load('partials/users-profile.html')
                    .appendTo(context.$element())
                    .then(function (content) {
                        ko.applyBindings(usersProfileModel(data),document.getElementById('users-profile'));
                        initCard();

                        genericFunctions();

                        endProgressBar();
                    });
            }
        });
    });

    this.get("#/search/query::username", function (context) {



        var searchKeyWord = this.params['username'];


        $.ajax({
            url: base_url + "dashboard/search/" + this.params['username'] + "/0",
            type: 'GET',
            contentType:'application/json',
            dataType: 'json',
            headers: createAuthorizationTokenHeader(),
            success: function(data) {
                context.app.swap('');
                context.load('partials/search.html')
                    .appendTo(context.$element())
                    .then(function (content) {


                        var SM = new searchModel();

                        SM.init(data);

                        ko.applyBindings(SM,document.getElementById('search'));
                        initCard();
                        genericFunctions();

                        $('.searchPage').twbsPagination({
                            totalPages: data.totalPages,
                            visiblePages: 5,
                            onPageClick: function (event, page) {

                                startProgressBar();

                                SM.pagination(searchKeyWord, page);
                            }
                        });
                    });
            }
        });

    });

    this.get("#/logout", function (context) {

        $.ajax({
            url: base_url + "signout",
            type: 'GET',
            contentType:'application/json',
            dataType: 'json',
            headers: createAuthorizationTokenHeader(),
            success: function(data) {

                if(data.isSuccessful){

                    endProgressBar();

                    window.location.href = "/";

                }else{

                    endProgressBar();

                    self.redirect('#/home');

                    showNotification('top-right','error','connection error',350,  2000);
                }
            }
        });
    });

    this.get("#/account/deposit", function (context) {

        context.app.swap('');
        context.load('partials/deposit.html')
            .appendTo(context.$element())
            .then(function (content) {
                ko.applyBindings(depositModel(),document.getElementById('deposit'));

                genericFunctions();

                endProgressBar();
            });
    });

    this.get("#/account/withdraw", function (context) {



        $.ajax({
            url: base_url + "account/withdraw",
            type: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            headers: createAuthorizationTokenHeader(),
            success: function (data) {
                console.log(data);
                context.app.swap('');
                context.load('partials/withdraw.html')
                    .appendTo(context.$element())
                    .then(function (content) {
                        ko.applyBindings(withdrawModel(data), document.getElementById('deposit'));

                        genericFunctions();

                        endProgressBar();
                    });
            }
        });
    });

    this.get('#/account/transactions', function (context) {
        startProgressBar();
        self = this;
        $.ajax({
            url: base_url + "home/stats",
            type: 'GET',
            dataType: 'json',
            headers: createAuthorizationTokenHeader(),
            success: function(data) {



                saveUserDetailsOffline(data.user);
                context.app.swap('');
                context.load('partials/transactions.html')
                    .appendTo(context.$element())
                    .then(function (content) {

                        ko.applyBindings(transactionsModel(),document.getElementById('transactions'));
                        initCard();

                        genericFunctions();

                        setInterval(getPlayerStats(), 600000);

                        endProgressBar();

                    });

            }
        });
    });


    this.notFound = function(){

        self.redirect('#/home')
    }
});

app.run('#/home');

