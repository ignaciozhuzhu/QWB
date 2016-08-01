// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

angular.module('starter', ['ionic', 'ionic-datepicker', 'starter.controllers'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.backButton.text("");
    $ionicConfigProvider.backButton.previousTitleText(false);
    $stateProvider

      .state('app', {
          url: '/app',
          abstract: true,
          templateUrl: 'templates/menu.html',
          controller: 'AppCtrl'
      })
        //主页------------------------------------------------
      .state('app.index2', {
          url: '/index2',
          views: {
              'menuContent': {
                  templateUrl: 'templates/index2.html',
                  controller: 'indexCtrl'
              }
          }
      })
     .state('app.carsearch', {
         url: '/carsearch',
         views: {
             'menuContent': {
                 templateUrl: 'templates/carsearch.html',
                 controller: 'carsearchCtrl'
             }
         }
     })
      //接送机车的列表
     .state('app.carlist', {
         url: '/carlist/:pickosend/:airportname/:caridArray/:airportscode/:date/:endaddress/:wcityid',
         views: {
             'menuContent': {
                 templateUrl: 'templates/carlist.html',
                 controller: 'carlistCtrl'
             }
         }
     })
      //标准用车的列表
     .state('app.carlist2', {
         //cache: false,
         url: '/carlist2/:cityname/:caridArray/:date1/:date2/:wcityid',
         views: {
             'menuContent': {
                 templateUrl: 'templates/carlist.html',
                 controller: 'carlist2Ctrl'
             }
         }
     })
     .state('app.air_booking', {
         url: '/air_booking',
         views: {
             'menuContent': {
                 templateUrl: 'templates/air_booking.html',
                 controller: 'air_bookingCtrl'
             }
         }
     })
        //接送机服务
     .state('app.air_service', {
         url: '/air_service/:cityid/:pickosend/:airportname/:brand/:car_name/:driver_category_name/:carid/:pickprice/:airportscode/:date/:endaddress',
         views: {
             'menuContent': {
                 templateUrl: 'templates/air_service.html',
                 controller: 'air_serviceCtrl'
             }
         }
     })
        //标准车服务(单地用车)
     .state('app.car_service', {
         url: '/car_service/:driver_category_id/:cityname/:cityid/:brand/:car_name/:driver_category_name/:carid/:date1/:date2',
         views: {
             'menuContent': {
                 templateUrl: 'templates/car_service.html',
                 controller: 'car_serviceCtrl'
             }
         }
     })
        //支付订单
     .state('app.airpay', {
         url: '/airpay/:orderid',
         views: {
             'menuContent': {
                 templateUrl: 'templates/airpay.html',
                 controller: 'airpayCtrl'
             }
         }
     })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/index2');///app/playlists
});

