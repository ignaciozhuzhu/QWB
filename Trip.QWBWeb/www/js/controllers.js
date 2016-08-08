//var app = angular.module('myApp', []);

angular.module('starter.controllers', [])

.controller('AppCtrl', function () {
})

    //封面
.controller('indexCtrl', ['$scope', '$http', function ($scope, $http) {
    var shopname = request2("shop");
    if (shopname == "") {
        shopname = "tuogu";
    }
    setCookie("shopid4QWB", shopname, 30);

    var nghttp = "../../ajax/apihandler.ashx?fn=iflogin";
    $http.get(nghttp).success(function (response) {
        if (response == "true") {
            $scope.bzyc = function () {
                window.location.href = " #/app/carsearch";
            }
            $scope.jsj = function () {
                window.location.href = " #/app/air_booking";
            }
        }
        else {
          //  layermyui('请先使用拓谷帐号登录');

            $scope.bzyc = function () {
                window.location.href = "http://oando.com.cn/" + shopname + "/login.html?returnUrl=http://qwb.oando.com.cn/?shop=" + shopname + "";
               // layermyui('请先使用拓谷帐号登录');
            }
            $scope.jsj = function () {
                window.location.href = "http://oando.com.cn/" + shopname + "/login.html?returnUrl=http://qwb.oando.com.cn/?shop=" + shopname + "";
                //layermyui('请先使用拓谷帐号登录');
            }
        }
    })

}])

    //标准车--------------------------------------------------------------------------------------------------------------
.controller('carsearchCtrl', ['$scope', '$http', '$ionicScrollDelegate', '$compile', 'getcitysev', 'getdistancessev', 'hexafy', function ($scope, $http, $ionicScrollDelegate, $compile, getcitysev, getdistancessev, hexafy) {
    var soloovarious = "";

    $scope.displaybox = function ($event) {
        $($event.target.parentNode.nextElementSibling).css('display', 'block');
    }
    $scope.displaynonebox = function ($event) {
        $($event.target.parentNode.nextElementSibling).css('display', 'none');
    }

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
        $ionicScrollDelegate.scrollTo(0, 270);
        if (soloovarious == 2) {
            var indexposition = $event.target.outerHTML.indexOf("model[");
            var myindex = $event.target.outerHTML.substring(indexposition + 6, indexposition + 7);
            $(".carsearch .citydistancetip")[myindex - 1].className = "citydistancetip displaynone";
        }
    }
    var clickcount = 0;
    $scope.delday = function () {
        $(".carlinedetail")[0].lastElementChild.remove();

        //   clickcount--;
        //   $("variocities-components")[clickcount].className = "displaynone";
    }

    $scope.adddate = function () {
        var queryRow = angular.element(document.createElement('variocities-components'));
        $compile(queryRow)($scope);
        $(".carlinedetail").append(queryRow);
        displaynonecountry(".carsearch");

        //$("variocities-components")[clickcount].className = "displayblock";
        //clickcount++;
    }

    //cities 组件bg----------------------------------------------------------------------------

    var funcallback = function (_responseche) {
        responseche = _responseche;
    }
    var responseche = getcitysev.myFunc($http, $scope, funcallback);

    //用车地域改变监听
    $scope.change = function (x) {
        for (var i = 0; i < responseche.zones.length; i++) {
            if (responseche.zones[i].id == x) {
                $scope.areas = responseche.zones[i].areas;
            }
        }
        $scope.model = { wcity: "", wcityid: 0 };
        displaynonecountry(".carsearch");
    }
    //输入降落城市框监听
    $scope.changecity = function () {
        displaynonecountry(".carsearch");
    }

    //降落城市改变监听(点击事件)
    $scope.selectcity = function ($event) {
        $scope.model = { wcity: $event.target.innerText, wcityid: $event.target.children[0].innerText };
        $scope.caridArray = "";
        cityselectfun();
        displaynonecountry(".carsearch");

        //清空距离提示
        if (soloovarious == 2) {
            for (var i = 0; i < 10; i++) {
                $(".carsearch .citydistancetip")[i].innerText = "";
            }
        }
    }
    //动态控件的城市点击事件(多地用车)
    $scope.selectcity2 = function ($event) {
        var indexposition = $event.target.outerHTML.indexOf("model[");
        var myindex = $event.target.outerHTML.substring(indexposition + 6, indexposition + 7);
        $scope.model[myindex] = { wcity: $event.target.innerText, wcityid2: $event.target.children[0].innerText };
        $scope.model.length = parseInt(myindex) + 1;
        $scope.caridArray = "";
        cityselectfun();
        displaynonecountry(".carsearch");

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
        var responseche = getdistancessev.myFunc($http, cityid1, cityid2, myindex);
    }

    $scope.caridArray = "";
    var cityselectfun = function () {
        //回调函数
        var fun = function (_caridArray) {
            $scope.caridArray = _caridArray;
        }
        hexafy.myFunc2($scope.model.wcityid, $http, $scope, fun);
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

        if (!$scope.model.wcity) {
            layermyui('请选择城市');
            return;
        }
        if (date1 > date2 && soloovarious == 1) {
            layermyui('开始时间不能晚于结束时间');
            return;
        }

        window.location.href = "#/app/carlist2/" + $scope.model.wcity + "/" + $scope.caridArray + "/" + date1 + "/" + date2 + "/" + cityid + "";
    }
}])

//接送机搜索--------------------------------------------------------------------------------------------------------------
.controller('air_bookingCtrl', ['$scope', '$http', '$ionicScrollDelegate', 'getcitysev', 'hexafy', function ($scope, $http, $ionicScrollDelegate, getcitysev, hexafy) {

    $scope.displaybox = function ($event) {
        $($event.target.parentNode.nextElementSibling).css('display', 'block');
    }
    $scope.displaynonebox = function ($event) {
        $($event.target.parentNode.nextElementSibling).css('display', 'none');
    }

    //layermyui("hi," + getCookie('custid4QWB'));
    //接机或送机
    var pickosend = 1;
    //防止菜鸟客户看不到城市选择框
    $scope.clickCity = function () {
        $ionicScrollDelegate.scrollTo(0, 230);
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
        $(".air_booking .pickcity")[0].innerText = "出发城市";
        $(".air_booking .pickairport")[0].innerText = "出发机场";
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
    var funcallback = function (_responseche) {
        responseche = _responseche;
    }
    var responseche = getcitysev.myFunc($http, $scope, funcallback);

    //用车地域改变监听
    $scope.change = function (x) {
        for (var i = 0; i < responseche.zones.length; i++) {
            if (responseche.zones[i].id == x) {
                $scope.areas = responseche.zones[i].areas;
            }
        }
        $scope.model = { wcity: "", wcityid: 0 };
        $scope.model2 = { airports: "", airportsid: 0, airportscode: "", airportname: "" };
        $scope.model3 = { endaddress: "" };
        $(".air_booking #inputendaddress")[0].value = "";

        displaynonecountry(".air_booking");
    }

    //输入降落城市框监听
    $scope.changecity = function () {
        displaynonecountry(".air_booking");
    }

    //降落城市改变监听(点击事件)
    $scope.selectcity = function ($event) {
        $scope.model = { wcity: $event.target.innerText, wcityid: $event.target.children[0].innerText };
        $scope.caridArray = "";
        cityselectfun();
        $scope.model2 = { airports: "", airportsid: 0, airportscode: "", airportname: "" };
        $scope.model3 = { endaddress: "" };
        $(".air_booking #inputendaddress")[0].value = "";
        //清空送达地点的下拉框数据
        $scope.endaddress = "";

        displaynonecountry(".air_booking");
    }

    $scope.caridArray = "";
    var cityselectfun = function () {
        //var caridArray = "";
        var nghttp = "../../ajax/apihandler.ashx?fn=getairports&city_id=" + $scope.model.wcityid + "";
        $http.get(nghttp).success(function (response) {
            if (response.airports.length > 0) {
                $scope.airports = response.airports;

                var fun = function (_caridArray) {
                    $scope.caridArray = _caridArray;
                }
                hexafy.myFunc2($scope.model.wcityid, $http, $scope, fun);
            }
            else {
                layermyui('该城市未开通机场');
            }
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

    $scope.downsome = function () {
        $ionicScrollDelegate.scrollTo(0, 310);
    }

    //立即搜索
    $scope.search = function () {
        if (!$scope.model2.airports) {
            layermyui('请选择机场');
            return;
        }
        if (!$scope.model3.endaddress) {
            layermyui('请选择地点');
            return;
        }

        var date = $("ionic-datepicker")[0].innerText;
        window.location.href = "#/app/carlist/" + pickosend + "/" + $scope.model2.airportname + "/" + $scope.caridArray + "/" + $scope.model2.airportscode + "/" + date + "/" + $scope.model3.endaddress + "/" + $scope.model.wcityid + "";

    }

}])

//车型推荐列表(接送机)--------------------------------------------------------------------------------------------------------------
.controller('carlistCtrl', ['$scope', '$http', '$ionicScrollDelegate','$timeout', function ($scope, $http, $ionicScrollDelegate, $timeout) {
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
        if (response.list == null) {
            //layermyui('暂无数据');
            $(".carlist .smalltips").append("很抱歉,该地目前未有车型推荐!");
        }
        else {
            $scope.group = uniqueObject(response);
            $scope.car_categories = response.list;
        }
    })
    $scope.ordernow = function ($event) {
        var targ = $event.target.previousElementSibling;
        var carid = targ.innerText;
        var total_price = targ.previousElementSibling.innerText;
        var driver_category_name = targ.previousElementSibling.previousElementSibling.innerText;
        var name = targ.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
        var brand = targ.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
        //pickosend=1接机 pickosend=2送机
        window.location.href = "#/app/air_service/" + wcityid + "/" + pickosend + "/" + airportname + "/" + brand + "/" + name + "/" + driver_category_name + "/" + carid + "/" + total_price + "/" + airportscode + "/" + date + "/" + endaddress + "";
    }

    $scope.toogledown = function ($event) {
        $timeout(function () {
            $ionicScrollDelegate.$getByHandle('mainScroll').resize();
            $ionicScrollDelegate.$getByHandle('mainScroll').resize();
        }, 400)
        var toggoleid = $event.target.parentElement.parentElement.parentElement.nextSibling.nextSibling;
        if (toggoleid.className == "panel-collapse collapse") {
            $(toggoleid).slideToggle();
            $(".collapse").css({ visibility: "visible" });
        }
    }
}])

//车型推荐列表(标准用车)--------------------------------------------------------------------------------------------------------------
.controller('carlist2Ctrl', ['$scope', '$http', '$ionicScrollDelegate', '$timeout', function ($scope, $http, $ionicScrollDelegate, $timeout) {
    $(".carlisthrefback").attr("href", "#/app/carsearch");
    var cityname = decodeURI(getpbyurl(5));
    var caridArray = decodeURI(getpbyurl(4));
    var date1 = decodeURI(getpbyurl(3));
    var date2 = decodeURI(getpbyurl(2));
    var wcityid = getpbyurl(1);

    var nghttp = "../../ajax/apihandler.ashx?fn=getbookingsnew&car_category_id=" + caridArray + "&pickup_time1=" + date1 + "&pickup_time2=" + date2 + "&locationid=" + wcityid + "";
    //loading层
    var mylayeruiwait = layer.load(1, { shade: [0.5, '#ababab'] });
    $http.get(nghttp).success(function (response) {
        layer.close(mylayeruiwait);
        if (response.list == null) {
            //layermyui('暂无数据');
            $(".carlist .smalltips").append("很抱歉,该地目前未有车型推荐!");
        }
        else {
            $scope.group = uniqueObject(response);
            $scope.car_categories = response.list;
        }
    }).error(function (data, state) {
        console.log(data);
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
        $timeout(function () {
            $ionicScrollDelegate.$getByHandle('mainScroll').resize();
            $ionicScrollDelegate.$getByHandle('mainScroll').resize();
        }, 400)
        var toggoleid = $event.target.parentElement.parentElement.parentElement.nextSibling.nextSibling;

        if (toggoleid.className == "panel-collapse collapse") {
            $(toggoleid).slideToggle();
            $(".collapse").css({ visibility: "visible" });
        }

    }
}])

//接机服务--------------------------------------------------------------------------------------------------------------
.controller('air_serviceCtrl', ['$scope', '$http', 'hexafy', function ($scope, $http, hexafy) {
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
    var cityid = getpbyurl(11);

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
    var total_price = pickprice;

    var max_seat;
    $scope.$on("$ionicView.loaded", function () {
        //回调函数
        var fun = function (_seat) {
            max_seat = _seat;
            $('.air_service .spinnercd').myspinner({ max: max_seat });
            $('.air_service .spinnerad').myspinner({ max: max_seat, min: 1 });
        }
        hexafy.myFunc(cityid, $http, $scope, carid, fun);

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

    var adults = 1;
    var kids = 0;
    //儿童点击
    $(".air_service #sp01").click(function () {
        kids = this.children[0].children[1].value;
        maxpassenger(".air_service #sp01", ".air_service #sp02", adults, kids, max_seat);
    });
    //成人点击
    $(".air_service #sp02").click(function () {
        adults = this.children[0].children[1].value;
        maxpassenger(".air_service #sp01", ".air_service #sp02", adults, kids, max_seat);
    });

    //datepicker 组件ed----------------------------------------------
    //接送机支付
    $scope.createorder = function () {

        var json = "";
        var api_url = "http://test.haihuilai.com/apis/qwb/v1/air_bookings/create";

        var shop_id = getCookie('shopid4QWB'); //55;//
        //layermyui("hi," + getCookie('custid4QWB'));
        if (!shop_id) { shop_id = "tuogu" }
        var source_guide_id = "";
        var customer_id = getCookie('custid4QWB'); //15086;// 
        //if (!customer_id) { customer_id = 15086 }
        var guideid = getCookie('guideid4QWB');// 11350;
        //if (!guideid) { guideid = 11350 }

        var pidstr = "";
        if (customer_id)
            pidstr = ",\"customer_id\":" + customer_id + ""
        else if (guideid)
            pidstr = ",\"guide_id\":" + guideid + ""

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

        var kids_age = "";
        if (kids > 0) {
            kids_age = ",\"kids\":" + kids + ",\"kids_age\":";
            //儿童年龄必填post,前台数据传递暂默认.
            kids_age += "[";
            for (var n = 1; n <= kids; n++) {
                kids_age += "10,";
            }
            kids_age = kids_age.substr(0, kids_age.length - 1);
            kids_age = kids_age + "]";
        }

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
        if (!checkMobile(contactPhone)) {
            layermyui('电话格式不正确');
            return;
        }


        json = "{\"api_url\":\"" + api_url + "\",\"shop\":\"" + shop_id + "\",\"order\":{\"car_category_id\":" + car_category_id + ",\"pickup_airport_code\":\"" + pickup_airport_code + "\",\"pickup_flight\":\"" + pickup_flight + "\",\"pickup_time\":\"" + pickup_time + "\",\"pickup_addr\":\"" + pickup_addr + "\",\"adults\":" + adults + "" + kids_age + ",\"traveller\":" + traveller + ",\"memo\":\"" + memo + "\",\"key\":\"" + key + "\",\"sign\":\"" + sign + "\",\"total_price\":\"" + total_price + "\"}}";
        var nghttp = "../../ajax/apihandler.ashx?fn=createordertg&json=" + json + "";
        var mylayeruiwait = layer.load(1, { shade: [0.5, '#ababab'] });
        $http.get(nghttp).success(function (response) {
            layer.close(mylayeruiwait);
            if (response.code == 0) {
                var orderid = response.data.order_no;
                var vendor_order_no = response.data.vendor_order_no;
                layermyui('下单成功!将为您自动跳转...');
                //现在是有动态链接地址了,暂时支持马上支付.
                setTimeout('window.location.href = "' + response.data.pay_url + '"', 2000);
                //下面的这个是固定的拓谷的外链
                //setTimeout('window.location.href = "http://oando.com.cn/tuogu/orders.html"', 2000);
            }
            else {
                layermyui('下单失败!' + response.message);
                return;
            }
        });

    }

}])

//标准车服务--------------------------------------------------------------------------------------------------------------
.controller('car_serviceCtrl', ['$scope', '$http', 'hexafy', function ($scope, $http, hexafy) {
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
    var max_seat;
    $scope.$on("$ionicView.loaded", function () {
        //回调函数
        var fun = function (_seat) {
            max_seat = _seat;
            $('.car_service .spinnercd').myspinner({ max: max_seat });
            $('.car_service .spinnerad').myspinner({ max: max_seat, min: 1 });
        }
        hexafy.myFunc(cityid, $http, $scope, carid, fun);
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
        maxpassenger(".car_service #sp01", ".car_service #sp02", adults, kids, max_seat);
    });
    //成人点击
    $(".car_service #sp02").click(function () {
        adults = this.children[0].children[1].value;
        accountCarPrice();
        maxpassenger(".car_service #sp01", ".car_service #sp02", adults, kids, max_seat);
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

    //layermyui("hi," + getCookie('custid4QWB'));
    //标准车支付
    $scope.createorder = function () {
        var json = "";
        var api_url = "http://test.haihuilai.com/apis/qwb/v1/bookings/create";
        var shop_id = getCookie('shopid4QWB'); //55;//
        //layermyui("hi," + getCookie('custid4QWB'));
        if (!shop_id) { shop_id = "tuogu" }
        var source_guide_id = "";
        var customer_id = getCookie('custid4QWB'); //15086;// 
        //if (!customer_id) { customer_id = 15086 }
        var guideid = getCookie('guideid4QWB');// 11350;
        //if (!guideid) { guideid = 11350 }

        var pidstr = "";
        if (customer_id)
            pidstr = ",\"customer_id\":" + customer_id + ""
        else if (guideid)
            pidstr = ",\"guide_id\":" + guideid + ""

        //订单信息
        //接机

        var from_date = date1;
        var from_location_id = cityid;
        var to_date = date2;
        var car_category_id = carid;

        var total_price = $scope.total_price;

        var travel_itemsstr = "";
        //多地对日期和地址数组处理.

        if (to_date == "") {
            var date1t = date1.substring(0, date1.indexOf("|")).trim();
            var date2t = date1.substring(date1.lastIndexOf("|") + 1);
            from_date = date1t;
            to_date = date2t;

            travel_itemsstr += "{\"location_id\":" + location_idarray[0] + ",\"days\":1},";
            for (var i = 1; i < datearray.length; i++) {
                travel_itemsstr += "{\"location_id\":" + location_idarray[i] + ",\"days\":" + diffDateBy2days2(datearray[parseInt(i) - 1], datearray[i]) + "},";
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
            for (var n = 1; n <= kids; n++) {
                kids_age += "10,";
            }
            kids_age = kids_age.substr(0, kids_age.length - 1);
            kids_age = kids_age + "]";
        }

        var contactName = $(".car_service #contactName")[0].value;
        var contactPassport = $(".car_service #contactPassport")[0].value;
        var contactPhone = $(".car_service #contactPhone")[0].value;
        var traveller = "{\"name\":\"" + contactName + "\",\"passport\":\"" + contactPassport + "\",\"mobile\":\"" + contactPhone + "\"}";

        var key = "qwb_1467082083";
        var sign = "3b1b7113028cc5eeefa5cc61f4872827";

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
        if (!checkMobile(contactPhone)) {
            layermyui('电话格式不正确');
            return;
        }

        json = "{\"api_url\":\"" + api_url + "\",\"shop\":\"" + shop_id + "\",\"order\":{\"from_date\":\"" + from_date + "\",\"from_location_id\":\"" + from_location_id + "\",\"to_date\":\"" + to_date + "\",\"car_category_id\":" + car_category_id + ",\"driver_category_id\":\"" + driver_category_id + "\",\"adults\":" + adults + "" + kids_age + ",\"traveller\":" + traveller + ",\"travel_items\":[" + travel_itemsstr + "],\"key\":\"" + key + "\",\"sign\":\"" + sign + "\",\"total_price\":\"" + total_price + "\"}}";
        var nghttp = "../../ajax/apihandler.ashx?fn=createcarordertg&json=" + json + "";
        var mylayeruiwait = layer.load(1, { shade: [0.5, '#ababab'] });
        $http.get(nghttp).success(function (response) {
            layer.close(mylayeruiwait);
            if (response.code == 0) {
                var orderid = response.data.order_no;
                var vendor_order_no = response.data.vendor_order_no;
                //window.location.href = "#/app/airpay/" + orderid + "";

                layermyui('下单成功!将为您自动跳转...');

                //现在是有动态链接地址了,暂时支持马上支付.
                setTimeout('window.location.href = "' + response.data.pay_url + '"', 2000);
                //下面的这个是固定的拓谷的外链
                //setTimeout('window.location.href = "http://oando.com.cn/tuogu/orders.html"', 2000);
            }
            else {
                layermyui('下单失败!' + response.message);
                return;
            }
        });

    }

}])

