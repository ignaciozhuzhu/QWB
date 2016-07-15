//var app = angular.module('myApp', []);

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
    //标准车--------------------------------------------------------------------------------------------------------------
.controller('carsearchCtrl', function ($scope, $http) {
    //cities 组件bg
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
        $("#inputcity")[0].value = $event.target.innerText;
    }
    //cities 组件ed

    //datepicker 组件bg
    $scope.currentDate = new Date();
    $scope.minDate = new Date();
    $scope.maxDate = new Date(2017, 1, 1);
    $scope.currentDate2 = new Date();
    $scope.minDate2 = new Date();
    $scope.maxDate2 = new Date(2017, 1, 1);
    $(".weekdayget")[0].innerText = getmyweekday(new Date());
    $(".weekdayget")[1].innerText = getmyweekday(new Date());

    $scope.datePickerCallback = function (val) {
        if (!val) {
            console.log('Date not selected');
        } else {
            console.log('Selected date is : ', val);
            $(".weekdayget")[0].innerText = getmyweekday(val);
            $scope.minDate2 = val;
        }
    };
    $scope.datePickerCallback2 = function (val) {
        if (!val) {
            console.log('Date not selected');
        } else {
            console.log('Selected date is : ', val);
            $(".weekdayget")[1].innerText = getmyweekday(val);
            $scope.maxDate = val;
        }
    };
    //datepicker 组件ed
})

//车型推荐列表--------------------------------------------------------------------------------------------------------------
.controller('carlistCtrl', function ($scope, $http, $ionicScrollDelegate) {

    $scope.toogledown = function ($event) {
        var toggoleid = $event.target.parentElement.parentElement.parentElement.nextSibling.nextSibling;
        $(toggoleid).slideToggle();
        $(".collapse").css({ visibility: "visible" });
        $ionicScrollDelegate.resize();
    }
    var caridArray = decodeURI(getpbyurl(5));
    var airportscode = decodeURI(getpbyurl(4));
    var date = decodeURI(getpbyurl(3));
    var endaddress = decodeURI(getpbyurl(2));
    var wcityid = decodeURI(getpbyurl(1));
    var nghttp = "../../ajax/apihandler.ashx?fn=getair_bookingsnew&car_category_id=" + caridArray + "&pickup_airport_code=" + airportscode + "&pickup_flight=&pickup_time=" + date + "&pickup_addr=" + endaddress + "&locationid=" + wcityid + "";
    //loading层
    var mylayeruiwait = layer.load(1, { shade: [0.5, '#ababab'] });
    $http.get(nghttp).success(function (response) {
        //debugger
        layer.close(mylayeruiwait);
        if (response.list == null)
            layermyui('暂无数据');
        else
            $scope.car_categories = response.list;
    })
})
//接送机搜索--------------------------------------------------------------------------------------------------------------
.controller('air_bookingCtrl', function ($scope, $http) {

    //$scope.model 是降落城市
    //$scope.model2 是降落机场
    //要监听这两个是因为有三层联动关系.

    //cities 组件bg
    var nghttp = "../../ajax/apihandler.ashx?fn=getcitieslist";
    var responseche;
    $http.get(nghttp).success(function (response) {
        responseche = response;
        $scope.zones = response.zones;
    });

    //用车地域改变监听
    var getareax;
    $scope.change = function (x) {
        getareax = x;
        for (var i = 0; i < responseche.zones.length; i++) {
            if (responseche.zones[i].id == x) {

                for (var j = 0; j < responseche.zones[i].areas.length; j++) {
                    if (responseche.zones[i].areas[j].is_hot == false)
                        responseche.zones[i].areas[j].is_hot = "a";
                    for (var k = 0; k < responseche.zones[i].areas[j].cities.length; k++) {
                        if (responseche.zones[i].areas[j].cities[k].is_hot == false)
                            responseche.zones[i].areas[j].cities[k].is_hot = "b";
                    }
                }
                $scope.areas = responseche.zones[i].areas;
            }
        }
        $scope.model = { wcity: "", wcityid: 0 };
        $scope.model2 = { airports: "", airportsid: 0, airportscode: "" };
        $scope.model3 = { endaddress: "" };
        $("#inputendaddress")[0].value = "";

        displaynonecountry();
    }
    //输入降落城市框监听
    $scope.changecity = function () {
        displaynonecountry();
    }

    //显示或隐藏城市的国家
    var displaynonecountry = function () {
        setTimeout(function () {
            //隐藏没有热门城市的国家
            var mylen = $(".mycitynameclass").length;
            for (var i = 0; i < mylen; i++) {
                if (!$(".mycitynameclass")[i].nextElementSibling) {
                    $(".mycitynameclass")[i].className = "displaynonecity";
                    i--;
                    mylen--;
                }
            }
            //显示回有热门城市的国家
            var mylen = $(".displaynonecity").length;
            for (var i = 0; i < mylen; i++) {
                if ($(".displaynonecity")[i].nextElementSibling) {
                    $(".displaynonecity")[i].className = "mycitynameclass";
                    i--;
                    mylen--;
                }
            }
        }, 200);
    }

    //降落城市改变监听(点击事件)
    $scope.selectcity = function ($event) {
        $scope.model = { wcity: $event.target.innerText, wcityid: $event.target.children[0].innerText };
        cityselectfun();
        $scope.model2 = { airports: "", airportsid: 0, airportscode: "" };
        $scope.model3 = { endaddress: "" };
        $("#inputendaddress")[0].value = "";

        displaynonecountry();
    }

    $scope.caridArray = "";
    var cityselectfun = function () {
        //var caridArray = "";
        var nghttp = "../../ajax/apihandler.ashx?fn=getairports&city_id=" + $scope.model.wcityid + "";
        $http.get(nghttp).success(function (response) {
            $scope.airports = response.airports;
            var nghttp = "../../ajax/apihandler.ashx?fn=getcarslist&locationid=" + $scope.model.wcityid + "";
            $http.get(nghttp).success(function (response) {
                //将车型id遍历存入 caridArray 字符串中
                for (var i = 0; i < response.car_categories.length; i++) {
                    $scope.caridArray += response.car_categories[i].id + "|";
                }
                $scope.caridArray = $scope.caridArray.substr(0, $scope.caridArray.length - 1);
            })
        })
    }
    //cities 组件ed


    //选择机场的点击动作
    $scope.selectairport = function ($event) {
        $scope.model2 = { airports: $event.target.innerText, airportsid: $event.target.children[0].innerText, airportscode: $event.target.children[1].innerText };
    }

    //送达地点 bg
    //送达地点改变监听
    $scope.changeaddress = function (x) {
        var query = x;
        if ($scope.model2.airportscode) {
            try {
                var nghttp = "../../ajax/apihandler.ashx?fn=getairbookingsaddrs&airport_code=" + $scope.model2.airportscode + "&query=" + query + "";
                $http.get(nghttp).success(function (response) {
                    $scope.endaddress = response.results;
                })
            }
            catch (e) { }
        }
    }

    //选择目的地的点击动作
    $scope.selectaddress2 = function ($event) {
        $scope.model3 = { endaddress: $event.target.innerText };
        $("#inputendaddress")[0].value = $event.target.innerText;
    }
    //送达地点 ed

    //datepicker 组件bg
    $scope.currentDate = new Date();
    $scope.minDate = new Date();
    $scope.maxDate = new Date(2017, 1, 1);
    $(".weekdayget")[0].innerText = getmyweekday(new Date());

    $scope.datePickerCallback = function (val) {
        if (!val) {
            console.log('Date not selected');
        } else {
            console.log('Selected date is : ', val);
            $(".weekdayget")[0].innerText = getmyweekday(val);
        }
    };
    //datepicker 组件ed


    //立即搜索
    $scope.search = function () {
        //  debugger
        var date = $("ionic-datepicker")[0].innerText;
        window.location.href = "#/app/carlist/" + $scope.caridArray + "/" + $scope.model2.airportscode + "/" + date + "/" + $scope.model3.endaddress + "/" + $scope.model.wcityid + "";
    }

})
//接机服务--------------------------------------------------------------------------------------------------------------
.controller('air_serviceCtrl', function ($scope, $http) {
    $scope.$on("$ionicView.loaded", function () {
        //  debugger
        $('.spinner').spinner({});
        $('.spinner2').spinner2({});

        $(function () {
            var curr = new Date().getFullYear();
            var opt = {
                'date': {
                    preset: 'date',
                    dateOrder: 'd Dmmyy',
                    invalid: { daysOfWeek: [0, 6], daysOfMonth: ['5/1', '12/24', '12/25'] }
                },
                'datetime': {
                    preset: 'datetime',
                    minDate: new Date(2012, 3, 10, 9, 22),
                    maxDate: new Date(2014, 7, 30, 15, 44),
                    stepMinute: 5
                },
                'time': {
                    preset: 'time'
                },
                'credit': {
                    preset: 'date',
                    dateOrder: 'mmyy',
                    dateFormat: 'mm/yy',
                    startYear: curr,
                    endYear: curr + 10,
                    width: 100
                },
                'select': {
                    preset: 'select'
                },
                'select-opt': {
                    preset: 'select',
                    group: true,
                    width: 50
                }
            }

            $('.settings select').bind('change', function () {
                var demo = "time";

                if (!demo.match(/select/i)) {
                    $('.demo-test-' + demo).val('');
                }

                $('.demo-test-' + demo).scroller('destroy').scroller($.extend(opt[demo], {
                    lang: "zh"
                }));
                $('.demo').hide();
                $('.demo-' + demo).show();
            });

            $('#demo').trigger('change');

        });
    })

    //datepicker 组件bg
    $scope.currentDate = new Date();
    $scope.minDate = new Date();
    $scope.maxDate = new Date(2017, 1, 1);
    $(".weekdayget")[0].innerText = getmyweekday(new Date());

    $scope.datePickerCallback = function (val) {
        if (!val) {
            console.log('Date not selected');
        } else {
            console.log('Selected date is : ', val);
            $(".weekdayget")[0].innerText = getmyweekday(val);
        }
    };
    //datepicker 组件ed

    var locationid = getpbyurl(1);
    var nghttp = "../../ajax/apihandler.ashx?fn=getcarslist&locationid=" + locationid + "";
    $http.get(nghttp).success(function (response) {
        //debugger
        $scope.car_categories = response.car_categories;
    });


    $scope.createorder = function () {
        window.location.href = "#/app/carlist/1";
    }

})

//支付订单--------------------------------------------------------------------------------------------------------------
.controller('airpayCtrl', function ($scope, $http) {

    var locationid = getpbyurl(1);
    var nghttp = "../../ajax/apihandler.ashx?fn=getcarslist&locationid=" + locationid + "";
    $http.get(nghttp).success(function (response) {
        //debugger
        // $scope.car_categories = response.car_categories;
    });

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

function myfocus(ob) {
    //debugger
    $(ob.parentNode.nextElementSibling).css('display', 'block');
    // $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom();
}
function myblur(ob) {
    //  $("#secondcities").css('display', 'none');
    $(ob.parentNode.nextElementSibling).css('display', 'none');
}