﻿//var app = angular.module('myApp', []);

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
    //封面
.controller('indexCtrl', function ($scope, $http) {
    $scope.bzyc = function () {
        window.location.href = " #/app/carsearch";
    }
    $scope.jsj = function () {
        window.location.href = " #/app/air_booking";
    }
})
    //自定义行程路线控件
.directive('carlinedetailpday', function () {

    return {
        restrict: 'E',
        template: function (tElement, tAttrs) {
            var myindex = tAttrs.myindex;
            var _html = '<p>Day ' + myindex + '  </p><div class="car_serach"><a class="btn-select car_select">'
            _html += '<input class="cur-select cur_car_select" ng-click="clickCity($event)" placeholder="请选择留宿城市" '
            _html += 'onfocus="myfocus(this)" onblur="myblur(this)" ng-model="model[' + myindex + '].wcity" ng-change=changecity()>'
            _html += '<div ng-hide="true" ng-model="model[' + myindex + '].wcityid2"></div>'
            _html += '</a> <div style="display:none;margin:0 3%;max-height:310px;overflow:hidden">'
            _html += '<hr />'
            _html += '<p style="font-weight:bold;">热门城市列表 可输入城市中文</p>'
            _html += '<div style="color:#9B9B9B;font-size:14px;max-height:70px;overflow:hidden" ng-repeat="x in areas">'
            _html += '<div class="mycitynameclass">{{x.name}}</div>'
            _html += '<span ng-click="selectcity2($event)" style="color:black;margin:0 3% 0 0"'
            _html += 'ng-repeat="xx in x.cities|filter:model[' + myindex + '].wcity|filter:x.is_hot">{{xx.name}}'
            _html += '<span ng-show="false">{{xx.id}}</span></span>'
            _html += '</div>'
            _html += '</div><p class="citydistancetip displaynone">一天内可以到达</p></div>'
            _html += '<img src="img/减号.png" style="height:30px !important;width: 30px !important;margin: 5px 0;" ng-click="delday()"></img>';
            return _html;
        }

    };

})

    //标准车--------------------------------------------------------------------------------------------------------------
.controller('carsearchCtrl', function ($scope, $http) {
    var soloovarious = "";
    //单地用车标签
    $scope.solo = function () {
        $(".carsearch #new1").css("color", "#01d4c1");
        $(".carsearch #new2").css("color", "#b1b1b1");
        $(".carsearch .endcartime").css("display", "block");
        $(".carsearch .carline").css("display", "none");
        $(".carsearch #buttonadddate").css("display", "none");
        soloovarious = 1;
    }
    //多地用车标签
    $scope.various = function () {
        $(".carsearch #new1").css("color", "#b1b1b1");
        $(".carsearch #new2").css("color", "#01d4c1");
        $(".carsearch .endcartime").css("display", "none");
        $(".carsearch .carline").css("display", "block");
        $(".carsearch #buttonadddate").css("display", "block");
        soloovarious = 2;
    }

    $scope.clickCity = function ($event) {
        var indexposition = $event.target.outerHTML.indexOf("model[");
        var myindex = $event.target.outerHTML.substring(indexposition + 6, indexposition + 7);
        $(".carsearch .citydistancetip")[myindex - 1].className = "citydistancetip displaynone";
    }
    $scope.delday = function () {
        //debugger
        clickcount--;
        $("carlinedetailpday")[clickcount].className = "displaynone";
    }

    var clickcount = 0;
    $scope.adddate = function () {
        $("carlinedetailpday")[clickcount].className = "displayblock";
        clickcount++;
    }

    //cities 组件bg----------------------------------------------------------------------------
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
            var mylen = $(".carsearch .mycitynameclass").length;
            for (var i = 0; i < mylen; i++) {
                if (!$(".carsearch .mycitynameclass")[i].nextElementSibling) {
                    $(".carsearch .mycitynameclass")[i].className = "displaynonecity";
                    i--;
                    mylen--;
                }
            }
            //显示回有热门城市的国家
            var mylen = $(".carsearch .displaynonecity").length;
            for (var i = 0; i < mylen; i++) {
                if ($(".carsearch .displaynonecity")[i].nextElementSibling) {
                    $(".carsearch .displaynonecity")[i].className = "mycitynameclass";
                    i--;
                    mylen--;
                }
            }
        }, 200);
    }

    //降落城市改变监听(点击事件)
    $scope.selectcity = function ($event) {
        $scope.model = { wcity: $event.target.innerText, wcityid: $event.target.children[0].innerText };
        $scope.caridArray = "";
        cityselectfun();
        displaynonecountry();
    }
    //动态控件的城市点击事件
    $scope.selectcity2 = function ($event) {
        var indexposition = $event.target.outerHTML.indexOf("model[");
        var myindex = $event.target.outerHTML.substring(indexposition + 6, indexposition + 7);
        $scope.model[myindex] = { wcity: $event.target.innerText, wcityid2: $event.target.children[0].innerText };
        $scope.model.length = parseInt(myindex) + 1;
        $scope.caridArray = "";
        cityselectfun();
        displaynonecountry();

        var cityid1;
        var cityid2;
        try {
            cityid1 = $scope.model[myindex - 1].wcityid2;
            cityid2 = $scope.model[myindex].wcityid2;
        }
        catch (err) {
            cityid1 = $scope.model.wcityid;
            cityid2 = $scope.model[myindex].wcityid2;
        }
        distancetip(cityid1, cityid2, myindex);
    }

    function distancetip(cityid1, cityid2, myindex) {
        var nghttp = "../../ajax/apihandler.ashx?fn=getdistances&from_location_id=" + cityid1 + "&to_location_id=" + cityid2 + "";
        $http.get(nghttp).success(function (response) {
            //debugger
            if (response.status == 0) {
                $(".carsearch .citydistancetip")[myindex - 1].className = "citydistancetip displayblock";
                if (response.distance < 400) {
                    $(".carsearch .citydistancetip")[myindex - 1].innerText = "一天内可以到达";
                }
                else if (response.distance >= 400 && response.distance < 600) {
                    $(".carsearch .citydistancetip")[myindex - 1].innerText = "约" + response.distance + "公里,距离较远,可能会加收费用.";
                }
                else if (response.distance > 600) {
                    $(".carsearch .citydistancetip")[myindex - 1].innerText = "约" + response.distance + "公里,距离太远,一天内可能无法抵达.";
                }
            }
            else {
                $(".carsearch .citydistancetip")[myindex - 1].className = "citydistancetip displaynone";
            }
        })
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
    //-----------------------------------------------------------------------------------------

    //datepicker 组件bg

    var Tommorow2 = new Date();
    Tommorow2 = new Date(Tommorow2.valueOf() + 3 * 24 * 60 * 60 * 1000);
    $scope.currentDate = Tommorow2;
    $scope.minDate = Tommorow2;
    $scope.maxDate = new Date(2017, 1, 1);
    $scope.currentDate2 = Tommorow2;
    $scope.minDate2 = Tommorow2;
    $scope.maxDate2 = new Date(2017, 1, 1);
    $(".carsearch .weekdayget")[0].innerText = getmyweekday(Tommorow2);
    $(".carsearch .weekdayget")[1].innerText = getmyweekday(Tommorow2);

    $scope.datePickerCallback = function (val) {
        if (!val) {
            console.log('Date not selected');
        } else {
            console.log('Selected date is : ', val);
            $(".carsearch .weekdayget")[0].innerText = getmyweekday(val);
            $scope.minDate2 = val;
        }
    };
    $scope.datePickerCallback2 = function (val) {
        if (!val) {
            console.log('Date not selected');
        } else {
            console.log('Selected date is : ', val);
            $(".carsearch .weekdayget")[1].innerText = getmyweekday(val);
            $scope.maxDate = val;
        }
    };
    //datepicker 组件ed

    //立即搜索
    $scope.search = function () {
        var date1;
        var date2;
        var cityid;
        if (soloovarious == 2) {
            cityid = $scope.model.wcityid;
            var datebegin = $("ionic-datepicker")[0].innerText;
            var datebegin2Date = parserDate(datebegin);
            var Tommorow
            date2 = "";
            date1 = datebegin;
            for (var i = 1; i < $scope.model.length; i++) {
                cityid += "|" + $scope.model[i].wcityid2;
                if (i == 1) {
                    Tommorow = datebegin2Date;
                }
                else {
                    Tommorow = parserDate(Tommorow);
                }
                Tommorow = FormatDateYear(new Date(Tommorow.valueOf() + 1 * 24 * 60 * 60 * 1000));
                date1 += "|" + Tommorow;
            }
        }
        else {
            date1 = $("ionic-datepicker")[0].innerText.trim();
            date2 = $("ionic-datepicker")[1].innerText.trim();
            cityid = $scope.model.wcityid;
        }
        window.location.href = "#/app/carlist2/" + $scope.model.wcity + "/" + $scope.caridArray + "/" + date1 + "/" + date2 + "/" + cityid + "";
    }
})

//接送机搜索--------------------------------------------------------------------------------------------------------------
.controller('air_bookingCtrl', function ($scope, $http, $ionicScrollDelegate) {
    //接机或送机
    var pickosend = 1;
    //防止菜鸟客户看不到城市选择框
    $scope.clickCity = function () {
        // $ionicScrollDelegate.scrollTo(0, 250);
    }

    $scope.pick = function () {
        $(".air_booking .pickcity")[0].innerText = "降落城市";
        $(".air_booking .pickairport")[0].innerText = "降落机场";
        $(".air_booking .pickdate")[0].innerText = "接机日期";
        $(".air_booking .pickaddress")[0].innerText = "送达地点";
        $(".air_booking #new1").css("color", "#01d4c1");
        $(".air_booking #new2").css("color", "#b1b1b1");
        pickosend = 1;
    }
    $scope.send = function () {
        $(".air_booking .pickcity")[0].innerText = "送达城市";
        $(".air_booking .pickairport")[0].innerText = "送达机场";
        $(".air_booking .pickdate")[0].innerText = "上车日期";
        $(".air_booking .pickaddress")[0].innerText = "上车地点";
        $(".air_booking #new1").css("color", "#b1b1b1");
        $(".air_booking #new2").css("color", "#01d4c1");
        pickosend = 2;
    }

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
        $scope.model2 = { airports: "", airportsid: 0, airportscode: "", airportname: "" };
        $scope.model3 = { endaddress: "" };
        $(".air_booking #inputendaddress")[0].value = "";

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
            var mylen = $(".air_booking .mycitynameclass").length;
            for (var i = 0; i < mylen; i++) {
                if (!$(".air_booking .mycitynameclass")[i].nextElementSibling) {
                    $(".air_booking .mycitynameclass")[i].className = "displaynonecity";
                    i--;
                    mylen--;
                }
            }
            //显示回有热门城市的国家
            var mylen = $(".air_booking .displaynonecity").length;
            for (var i = 0; i < mylen; i++) {
                if ($(".air_booking .displaynonecity")[i].nextElementSibling) {
                    $(".air_booking .displaynonecity")[i].className = "mycitynameclass";
                    i--;
                    mylen--;
                }
            }
        }, 200);
    }

    //降落城市改变监听(点击事件)
    $scope.selectcity = function ($event) {
        $scope.model = { wcity: $event.target.innerText, wcityid: $event.target.children[0].innerText };
        $scope.caridArray = "";
        cityselectfun();
        $scope.model2 = { airports: "", airportsid: 0, airportscode: "", airportname: "" };
        $scope.model3 = { endaddress: "" };
        $(".air_booking #inputendaddress")[0].value = "";

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
        $scope.model2 = { airports: $event.target.innerText, airportsid: $event.target.children[0].innerText, airportscode: $event.target.children[1].innerText, airportname: $event.target.children[2].innerText };
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
        $(".air_booking #inputendaddress")[0].value = $event.target.innerText;
    }
    //送达地点 ed

    //datepicker 组件bg

    var Tommorow2 = new Date();
    Tommorow2 = new Date(Tommorow2.valueOf() + 3 * 24 * 60 * 60 * 1000);

    $scope.currentDate = Tommorow2;
    $scope.minDate = new Date();
    $scope.maxDate = new Date(2017, 1, 1);
    $(".air_booking .weekdayget")[0].innerText = getmyweekday(Tommorow2);

    $scope.datePickerCallback = function (val) {
        if (!val) {
            // console.log('Date not selected');
        } else {
            // console.log('Selected date is : ', val);
            $(".air_booking .weekdayget")[0].innerText = getmyweekday(val);
        }
    };
    //datepicker 组件ed


    //立即搜索
    $scope.search = function () {
        var date = $("ionic-datepicker")[0].innerText;
        window.location.href = "#/app/carlist/" + pickosend + "/" + $scope.model2.airportname + "/" + $scope.caridArray + "/" + $scope.model2.airportscode + "/" + date + "/" + $scope.model3.endaddress + "/" + $scope.model.wcityid + "";
    }

})

//车型推荐列表(接送机)--------------------------------------------------------------------------------------------------------------
.controller('carlistCtrl', function ($scope, $http, $ionicScrollDelegate) {
    $(".carlisthrefback").attr("href", "#/app/air_booking");
    var pickosend = getpbyurl(7);
    var airportname = decodeURI(getpbyurl(6));
    var caridArray = decodeURI(getpbyurl(5));
    var airportscode = decodeURI(getpbyurl(4));
    var date = decodeURI(getpbyurl(3));
    var endaddress = decodeURI(getpbyurl(2));
    var wcityid = decodeURI(getpbyurl(1));
    var nghttp = "../../ajax/apihandler.ashx?fn=getair_bookingsnew&car_category_id=" + caridArray + "&pickup_airport_code=" + airportscode + "&pickup_flight=&pickup_time=" + date + "&pickup_addr=" + endaddress + "&locationid=" + wcityid + "";
    //loading层
    var mylayeruiwait = layer.load(1, { shade: [0.5, '#ababab'] });
    $http.get(nghttp).success(function (response) {
        layer.close(mylayeruiwait);
        if (response.list == null)
            layermyui('暂无数据');
        else {
            $scope.car_categories = response.list;
        }
    })
    $scope.ordernow = function ($event) {
        var targ = $event.target.previousElementSibling;
        var id = targ.innerText;
        var total_price = targ.previousElementSibling.innerText;
        var driver_category_name = targ.previousElementSibling.previousElementSibling.innerText;
        var name = targ.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
        var brand = targ.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
        //pickosend=1接机 pickosend=2送机
        window.location.href = "#/app/air_service/" + pickosend + "/" + airportname + "/" + brand + "/" + name + "/" + driver_category_name + "/" + id + "/" + total_price + "/" + airportscode + "/" + date + "/" + endaddress + "";
    }

    $scope.toogledown = function ($event) {
        var toggoleid = $event.target.parentElement.parentElement.parentElement.nextSibling.nextSibling;
        $(toggoleid).slideToggle();
        $(".collapse").css({ visibility: "visible" });
        $ionicScrollDelegate.resize();
    }
})

//车型推荐列表(标准用车)--------------------------------------------------------------------------------------------------------------
.controller('carlist2Ctrl', function ($scope, $http, $ionicScrollDelegate) {
    $(".carlisthrefback").attr("href", "#/app/carsearch");
    var cityname = decodeURI(getpbyurl(5));
    var caridArray = decodeURI(getpbyurl(4));
    var date1 = decodeURI(getpbyurl(3));
    var date2 = decodeURI(getpbyurl(2));
    var wcityid = getpbyurl(1);

    //date1 = "2016-08-01|2016-08-02|2016-08-03|2016-08-05|2016-08-06";
    // date2 = "";
    // wcityid = "2292|2334|2292|2334|2292";
    var nghttp = "../../ajax/apihandler.ashx?fn=getbookingsnew&car_category_id=" + caridArray + "&pickup_time1=" + date1 + "&pickup_time2=" + date2 + "&locationid=" + wcityid + "";
    //loading层
    var mylayeruiwait = layer.load(1, { shade: [0.5, '#ababab'] });
    $http.get(nghttp).success(function (response) {
        layer.close(mylayeruiwait);
        if (response.list == null)
            layermyui('暂无数据');
        else {
            $scope.car_categories = response.list;
        }
    })
    $scope.ordernow = function ($event) {
        var targ = $event.target.previousElementSibling;
        var carid = targ.innerText;
        var total_price = targ.previousElementSibling.innerText;
        var driver_category_name = targ.previousElementSibling.previousElementSibling.innerText;
        var car_name = targ.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
        var brand = targ.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
        var driver_category_id = targ.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
        window.location.href = "#/app/car_service/" + driver_category_id + "/" + cityname + "/" + wcityid + "/" + brand + "/" + car_name + "/" + driver_category_name + "/" + carid + "/" + date1 + "/" + date2 + "";
    }

    $scope.toogledown = function ($event) {
        var toggoleid = $event.target.parentElement.parentElement.parentElement.nextSibling.nextSibling;
        $(toggoleid).slideToggle();
        $(".collapse").css({ visibility: "visible" });
        $ionicScrollDelegate.resize();
    }
})

//接机服务--------------------------------------------------------------------------------------------------------------
.controller('air_serviceCtrl', function ($scope, $http) {
    var endaddress = decodeURI(getpbyurl(1));
    var date = decodeURI(getpbyurl(2));
    var airportscode = getpbyurl(3);
    var pickprice = getpbyurl(4);
    var carid = getpbyurl(5);
    var driver_category_name = decodeURI(getpbyurl(6));
    var car_name = decodeURI(getpbyurl(7));
    var car_brand = decodeURI(getpbyurl(8));
    var airportname = decodeURI(getpbyurl(9));
    var pickosend = getpbyurl(10);

    //1接机,2送机
    if (pickosend == 1) {
        $(".air_service .pickosendplane")[0].innerText = "降落机场";
        $(".air_service .pickosendaddress")[0].innerText = "目的地";
    }
    else if (pickosend == 2) {
        $(".air_service .pickosendplane")[0].innerText = "到达机场";
        $(".air_service .pickosendaddress")[0].innerText = "出发地";
    }

    $scope.driver_category_name = driver_category_name;
    $scope.car_name = car_name;
    $scope.car_brand = car_brand;
    $scope.airportname = airportname;
    $scope.endaddress = endaddress;
    $scope.pickprice = pickprice;

    $scope.$on("$ionicView.loaded", function () {
        $('.air_service .spinner').spinner({ max: 5 });
        $('.air_service .spinner2').spinner2({ max: 5 });
        //选择时间需要用的
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

    //datepicker 组件bg----------------------------------------------


    var date2Date = parserDate(date);
    //alert(date2Date)
    $scope.currentDate = date2Date;
    $scope.minDate = new Date();
    $scope.maxDate = new Date(2017, 1, 1);
    $(".air_service .weekdayget")[0].innerText = getmyweekday(date2Date);

    $scope.datePickerCallback = function (val) {
        if (!val) {
            console.log('Date not selected');
        } else {
            console.log('Selected date is : ', val);
            $(".air_service .weekdayget")[0].innerText = getmyweekday(val);
        }
    };
    //datepicker 组件ed----------------------------------------------

    $scope.createorder = function () {

        var json = "";
        var api_url = "http://test.haihuilai.com/apis/qwb/v1/air_bookings/create";
        var shop_id = 55;// getCookie('shopid4QWB');
        var source_guide_id = "";
        var guide_id = "";
        var customer_id = 15086;// getCookie('custid4QWB');
        //订单信息
        var car_category_id = carid;
        //接机
        var pickup_airport_code = airportscode;
        var pickup_flight = $(".air_service #pickupFlightNo")[0].value;
        var pitime = $(".air_service #pickupTime")[0].value;
        var pickup_time = $("ionic-datepicker")[0].innerText.substr(0, $("ionic-datepicker")[0].innerText.length - 4).trim();
        if (pitime)
            pickup_time += " " + pitime;
        var pickup_addr = endaddress;
        //送机
        //var drop_off_airport_code = "";
        //var drop_off_flight = "";
        //var drop_off_time = "";
        //var drop_off_addr = "";
        var adults = $(".air_service .spinner2")[0].children[1].value;
        var kids = $(".air_service .spinner")[0].children[1].value;

        //儿童年龄必填post,前台数据传递暂默认.
        var kids_age = "[";
        for (var i = 1; i <= kids; i++) {
            kids_age += "10,";
        }
        kids_age = kids_age.substr(0, kids_age.length - 1);
        kids_age = kids_age + "]";

        var contactName = $(".air_service #contactName")[0].value;
        var contactPassport = $(".air_service #contactPassport")[0].value;
        var contactPhone = $(".air_service #contactPhone")[0].value;
        var traveller = "{\"name\":\"" + contactName + "\",\"passport\":\"" + contactPassport + "\",\"mobile\":\"" + contactPhone + "\"}";
        var memo = $(".air_service #memo")[0].value;

        var key = "qwb_1467082083";
        var sign = "3b1b7113028cc5eeefa5cc61f4872827";

        if (pickup_flight == "") {
            layermyui('请输入航班号!');
            return;
        }
        if (contactName == "") {
            layermyui('请输入联系人姓名!');
            return;
        }
        if (contactPassport == "") {
            layermyui('请输入联系人证件号!');
            return;
        }
        if (contactPhone == "") {
            layermyui('请输入联系电话!');
            return;
        }

        json = "{\"api_url\":\"" + api_url + "\",\"shop_id\":" + shop_id + ",\"customer_id\":" + customer_id + ",\"order\":{\"car_category_id\":" + car_category_id + ",\"pickup_airport_code\":\"" + pickup_airport_code + "\",\"pickup_flight\":\"" + pickup_flight + "\",\"pickup_time\":\"" + pickup_time + "\",\"pickup_addr\":\"" + pickup_addr + "\",\"adults\":" + adults + ",\"traveller\":" + traveller + ",\"memo\":\"" + memo + "\",\"key\":\"" + key + "\",\"sign\":\"" + sign + "\"}}";
        var nghttp = "../../ajax/apihandler.ashx?fn=createordertg&json=" + json + "";
        var mylayeruiwait = layer.load(1, { shade: [0.5, '#ababab'] });
        $http.get(nghttp).success(function (response) {
            layer.close(mylayeruiwait);
            if (response.code == 0) {
                var orderid = response.data.order_no;
                var vendor_order_no = response.data.vendor_order_no;
                layermyui('下单成功!将为您自动跳转...');
                setTimeout('window.location.href = "http://oando.com.cn/tuogu/orders.html"', 2000);
            }
            else {
                layermyui('下单失败!' + response.message);
                return;
            }
        });

    }

})


//标准车服务--------------------------------------------------------------------------------------------------------------
.controller('car_serviceCtrl', function ($scope, $http) {
    var date2 = decodeURI(getpbyurl(1)).trim();
    var date1 = decodeURI(getpbyurl(2)).trim();
    var carid = decodeURI(getpbyurl(3));
    var driver_category_name = decodeURI(getpbyurl(4));
    var car_name = decodeURI(getpbyurl(5));
    var car_brand = decodeURI(getpbyurl(6));
    var cityid = decodeURI(getpbyurl(7));
    var cityname = decodeURI(getpbyurl(8));
    var driver_category_id = decodeURI(getpbyurl(9));
    //总共天数,相同天数算1天.
    //先判断是单地用车还是多地用车
    var daysdiff;
    var datearray;
    var location_idarray;
    //多地
    if (date2 == "") {
        datearray = date1.split('|');
        location_idarray = cityid.split('|');
        var date1t = date1.substring(0, date1.indexOf("|")).trim();
        var date2t = date1.substring(date1.lastIndexOf("|") + 1);
        daysdiff = diffDateBy2days(date1t, date2t);

        $scope.date1 = date1t;
        $scope.date2 = date2t;
    }
    else {
        daysdiff = diffDateBy2days(date1, date2);

        $scope.date1 = date1;
        $scope.date2 = date2;
    }

    $scope.driver_category_name = driver_category_name;
    $scope.car_name = car_name;
    $scope.car_brand = car_brand;

    $scope.$on("$ionicView.loaded", function () {
        $('.car_service .spinner').spinner({ max: 5 });
        $('.car_service .spinner2').spinner2({ max: 5 });
    })
    
    $scope.cityname = cityname;
    $scope.cityid = cityid;
    $scope.daysdiff = daysdiff;

    var adults = 1;
    var kids = 0;
    //儿童点击
    $(".car_service #sp01").click(function () {
        kids = this.children[0].children[1].value;
        accountCarPrice();
    });
    //成人点击
    $(".car_service #sp02").click(function () {
        adults = this.children[0].children[1].value;
        accountCarPrice();
    });
    accountCarPrice();

    function accountCarPrice() {
        var nghttp = "../../ajax/apihandler.ashx?fn=getbookingsnewp1&from_date=" + date1 + "&from_location_id=" + cityid + "&to_date=" + date2 + "&car_category_id=" + carid + "&driver_category_id=" + driver_category_id + "&adults=" + adults + "&kids=" + kids + "&kids_age=" + 0 + "";
        //loading层
        var mylayeruiwait = layer.load(1, { shade: [0.5, '#ababab'] });
        $http.get(nghttp).success(function (response) {
            layer.close(mylayeruiwait);
            $scope.price = response.price;
            $scope.food_fee = response.food_fee;
            $scope.room_fee = response.room_fee;
            $scope.tips = response.tips;
            $scope.total_price = response.total_price;
        })
    }

    $scope.createorder = function () {
        var json = "";
        var api_url = "http://test.haihuilai.com/apis/qwb/v1/bookings/create";
        var shop_id = 55;// getCookie('shopid4QWB');
        var source_guide_id = "";
        var guide_id = "";
        var customer_id = 15086;// getCookie('custid4QWB');
        //订单信息
        //接机

        var from_date = date1;
        var from_location_id = cityid;
        var to_date = date2;
        var car_category_id = carid;

        var travel_itemsstr = "";
        //多地对日期和地址数组处理.

        if (to_date == "") {
            var date1t = date1.substring(0, date1.indexOf("|")).trim();
            var date2t = date1.substring(date1.lastIndexOf("|") + 1);
            from_date = date1t;
            to_date = date2t;

            travel_itemsstr += "{\"location_id\":" + location_idarray[0] + ",\"days\":1},";
            for (var i = 1; i < datearray.length; i++) {
                travel_itemsstr += "{\"location_id\":" + location_idarray[i] + ",\"days\":" + diffDateBy2days2(datearray[parseInt(i) - 1], datearray[i])  + "},";
            }
            travel_itemsstr = travel_itemsstr.substr(0, travel_itemsstr.length - 1);
            from_location_id = location_idarray[0];
        }
        else {
            travel_itemsstr = "{\"location_id\":" + from_location_id + ",\"days\":" + daysdiff + "}";
        }

        //送机
        //var drop_off_airport_code = "";
        //var drop_off_flight = "";
        //var drop_off_time = "";
        //var drop_off_addr = "";

        var kids_age = "";
        if (kids > 0) {
            kids_age = ",\"kids\":" + kids + ",\"kids_age\":";
            //儿童年龄必填post,前台数据传递暂默认.
            kids_age += "[";
            for (var i = 1; i <= kids; i++) {
                kids_age += "10,";
            }
            kids_age = kids_age.substr(0, kids_age.length - 1);
            kids_age = kids_age + "]";
        }

        var order_no = "DDH00011";
        var contactName = $("#contactName")[0].value;
        var contactPassport = $("#contactPassport")[0].value;
        var contactPhone = $("#contactPhone")[0].value;
        var traveller = "{\"name\":\"" + contactName + "\",\"passport\":\"" + contactPassport + "\",\"mobile\":\"" + contactPhone + "\"}";

        var key = "qwb_1467082083";
        var sign = "3b1b7113028cc5eeefa5cc61f4872827";

        json = "{\"api_url\":\"" + api_url + "\",\"shop_id\":" + shop_id + ",\"customer_id\":" + customer_id + ",\"order\":{\"from_date\":\"" + from_date + "\",\"from_location_id\":\"" + from_location_id + "\",\"to_date\":\"" + to_date + "\",\"car_category_id\":" + car_category_id + ",\"driver_category_id\":\"" + driver_category_id + "\",\"adults\":" + adults + "" + kids_age + ",\"order_no\":\"" + order_no + "\",\"traveller\":" + traveller + ",\"travel_items\":[" + travel_itemsstr + "],\"key\":\"" + key + "\",\"sign\":\"" + sign + "\"}}";
        var nghttp = "../../ajax/apihandler.ashx?fn=createcarordertg&json=" + json + "";
        var mylayeruiwait = layer.load(1, { shade: [0.5, '#ababab'] });
        $http.get(nghttp).success(function (response) {
            layer.close(mylayeruiwait);
            if (response.code == 0) {
                var orderid = response.data.order_no;
                var vendor_order_no = response.data.vendor_order_no;
                //window.location.href = "#/app/airpay/" + orderid + "";

                layermyui('下单成功!将为您自动跳转...');
                setTimeout('window.location.href = "http://oando.com.cn/tuogu/orders.html"', 2000);
            }
            else {
                layermyui('下单失败!' + response.message);
                return;
            }
        });

    }

})



//***************************以下公用方法*******************************************************************

//air_service.html
var timechange = function () {
    var pickupTime = $("#pickupTime")[0].value;
    pickupTime = pickupTime.substr(0, 2);
    if (pickupTime.substr(0, 1) == 0)
        pickupTime = pickupTime.substr(1, 1);
    //22点以后,7点以前 加收夜间服务费
    if (pickupTime >= 22 || pickupTime < 7) {
        var nighttipcost = 100;
        $("#nighttipsimg").css("display", "block");
        $("#nighttipcost").empty().append(nighttipcost);
        var total = parseInt($("#totalcost")[0].innerText) + nighttipcost;
        $("#totalcost").empty().append(total);
    }
    else {
        $("#nighttipsimg").css("display", "none");
    }
}

//air_booking.html
//function secBoard(n) {
//    for (i = 1; i < 3; i++) {
//        document.getElementById("new" + i + "").style.color = "#b1b1b1";
//        document.getElementById("new" + n + "").style.color = "#01d4c1";
//    }
//    for (i = 1; i < 3; i++) {
//        document.getElementById("tbx" + i + "").style.display = "none";
//        document.getElementById("tbx" + n + "").style.display = "block";
//    }
//}
//air_booking.html
function myfocus(ob) {
    $(ob.parentNode.nextElementSibling).css('display', 'block');
    // $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom();
}
//air_booking.html
function myblur(ob) {
    $(ob.parentNode.nextElementSibling).css('display', 'none');
}