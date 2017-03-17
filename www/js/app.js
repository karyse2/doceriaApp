// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('doceriaApp', ['ionic', 'angular-md5', 'ngAnimate', 'ngStorage', 'ngCordova', 'ui.router'])

    .run(function ($ionicPlatform, $ionicPopup, config, $cordovaPreferences) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)

            if (window.Connection) {
                if (navigator.connection.type == Connection.NONE) {
                    $ionicPopup.alert({
                            title: "Sem Conexao",
                            content: "The internet is disconnected on your device."
                        })
                        .then(function (result) {});
                }
            }

            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
            var notificationOpenedCallback = function (jsonData) {
                // console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
                $state.go('login');
            };

            // window.plugins.OneSignal
            //     .startInit("f19ff274-36ad-4f4d-acc2-2d04b530b496")
            //     .handleNotificationOpened(notificationOpenedCallback)
            //     .endInit();
            //
            // window.plugins.OneSignal.getIds(function(ids) {
            //     config.idPush = ids.userId;
            // });
        });
    })
    .constant('config', {
        usuario: {
            token: null,
            dispositivo: null,
            avaliacao_propostas: true,
            relatorios: true,
            idPush: null
        },
        idPush: null,
        serverUrl: ''
    })

    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $ionicConfigProvider.views.maxCache(0);
        // setup an abstract state for the tabs directive

        $stateProvider.state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'views/menu.html',
                controller: 'menuCtrl'
            })

            .state('app.login', {
                url: '/login',
                views: {
                    'menuContent': {
                        templateUrl: 'views/login.html',
                        controller: 'loginCtrl'
                    },
                    'fabContent': {
                        template: ''
                    }
                }
            })

            .state('app.paginaInicial', {
                url: '/paginaInicial',
                views: {
                    'menuContent': {
                        templateUrl: 'views/paginaInicial.html',
                        controller: 'paginaInicialCtrl'
                    },
                
                }
            })







        // Each tab has its own nav history stack:

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/login');

    });
