angular.module('starter.service', [])

//angular初代service
//给我一个城市id,我给你一组  车型列表  
//你若再给我一个车型id,我给你 这个车型的详细信息.
.service('hexafy', function () {
    this.myFunc = function (cityid, $http, $scope, carid, callback) {
        var cityidarray = cityid.split('|');
        var nghttp = "../../ajax/apihandler.ashx?fn=getcarslist&locationid=" + cityidarray[0] + "";
        $http.get(nghttp).success(function (response) {
            if (response.car_categories == null) {
                layermyui('该车型乘坐人数配置不全');
            }
            else {
                for (var i = 0; i < response.car_categories.length; i++) {
                    if (response.car_categories[i].id == carid) {
                        callback(response.car_categories[i].max_seats);
                    }
                }
            }
        }).error(function (data, header, config, status) {
            layermyui('该车型配置有误');
        })
    }
    this.myFunc2 = function (cityid, $http, $scope, callback) {
        var nghttp = "../../ajax/apihandler.ashx?fn=getcarslist&locationid=" + cityid + "";
        $http.get(nghttp).success(function (response) {
            if (response.car_categories == null) {
                layermyui('该车型乘坐人数配置不全');
            }
            else {
                var caridArray = "";
                for (var i = 0; i < response.car_categories.length; i++) {
                    caridArray += response.car_categories[i].id + "|";
                }
                caridArray = caridArray.substr(0, caridArray.length - 1);
                callback(caridArray);
            }
        }).error(function (data, header, config, status) {
            layermyui('该车型配置有误');
        })
    }
})

.service('getcitysev', function () {
    this.myFunc = function ($http, $scope, funcallback) {
        var nghttp = "../../ajax/apihandler.ashx?fn=getcitieslist";
        $http.get(nghttp).success(function (response) {
            for (var i = 0; i < response.zones.length; i++) {
                for (var j = 0; j < response.zones[i].areas.length; j++) {
                    if (response.zones[i].areas[j].is_hot == false)
                        response.zones[i].areas[j].is_hot = "a";
                    for (var k = 0; k < response.zones[i].areas[j].cities.length; k++) {
                        if (response.zones[i].areas[j].cities[k].is_hot == false)
                            response.zones[i].areas[j].cities[k].is_hot = "b";
                    }
                }
            }
            $scope.zones = response.zones;
            funcallback(response);
            for (var i = 0; i < $(".inittext").length; i++) {
                $(".inittext")[i].text = "请选择";
            }
        });
    }
})
//获取城市间距离并显示文本
.service('getdistancessev', function () {
    this.myFunc = function ($http, cityid1, cityid2, myindex) {
        var nghttp = "../../ajax/apihandler.ashx?fn=getdistances&from_location_id=" + cityid1 + "&to_location_id=" + cityid2 + "";
        $http.get(nghttp).success(function (response) {
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
})

//获取导游信息列表
.service('getdriverinfo', function () {
    this.myFunc = function ($http) {
        var nghttp = "../../ajax/apihandler.ashx?fn=getdriver_categories";
        //loading层
        var mylayeruiwait = layer.load(1, { shade: [0.5, '#ababab'] });
        $http.get(nghttp).success(function (response) {
            layer.close(mylayeruiwait);
            if (response.driver_categories == null) {
                //layermyui('暂无数据');
                $(".carlist .smalltips").append("很抱歉,无导游司机信息!");
            }
            else {
                $scope.driver_categories = response.driver_categories;
            }
        }).error(function (data, state) {
            console.log(data);
        })
    }
})
