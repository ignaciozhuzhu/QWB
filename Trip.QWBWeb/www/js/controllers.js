angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    //$ionicModal.fromTemplateUrl('templates/login.html', {
    //    scope: $scope
    //}).then(function (modal) {
    //    $scope.modal = modal;
    //});

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };
})

.controller('carsearchCtrl', function ($scope, $http) {
    var nghttp = "../../ajax/apihandler.ashx?fn=getcitieslist";
    var responseche;
    $http.get(nghttp).success(function (response) {
        responseche = response;
        $scope.zones = response.zones;
    });
    $scope.change = function (x) {
        for (var i = 0; i < responseche.zones.length; i++) {
            if (responseche.zones[i].id == x)
                $scope.areas = responseche.zones[i].areas;
        }
    }
    $scope.selectcity = function ($event) {
        //debugger
        $("#inputcity")[0].value = $event.target.innerText;
    }

    $scope.currentDate = new Date();
    $scope.minDate = new Date(2016, 5, 29);
    $scope.maxDate = new Date(2018, 6, 31);

    $scope.datePickerCallback = function (val) {
        if (!val) {
            console.log('Date not selected');
        } else {
            console.log('Selected date is : ', val);
        }
    };
})


.controller('carlistCtrl', function ($scope, $http, $ionicScrollDelegate) {

    $scope.moredays = function () {
        $("#collapseOne").slideToggle();
        $(".collapse").css({ visibility: "visible"});
        //$(".collapse").css("overflow:hidden");
        $ionicScrollDelegate.resize();
    }

    $scope.currentDate = new Date();
    $scope.minDate = new Date(2016, 5, 29);
    $scope.maxDate = new Date(2018, 6, 31);

    $scope.datePickerCallback = function (val) {
        if (!val) {
            console.log('Date not selected');
        } else {
            console.log('Selected date is : ', val);
        }
    };
})

//***************************以下公用方法***************************


function secBoard(n) {
    for (i = 1; i < 3; i++) {
        document.getElementById("new" + i + "").style.color = "#b1b1b1";
        document.getElementById("new" + n + "").style.color = "#01d4c1";
    }
    for (i = 1; i < 3; i++) {
        document.getElementById("tbx" + i + "").style.display = "none";
        document.getElementById("tbx" + n + "").style.display = "block";
    }
}

//线路查询传参,前台点击事件
function searchLines() {
    var searchParam;
    if ($(".searchtxt")[1].placeholder !== "")
        searchParam = $(".searchtxt")[1].placeholder;
    else
        searchParam = $(".searchtxt")[1].value;
    window.location.href = '#/app/linelists?search=' + searchParam;
}

function myfocus() {
    $("#secondcities").css('display', 'block');
   // $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom();
}
function myblur() {
    $("#secondcities").css('display', 'none');
}