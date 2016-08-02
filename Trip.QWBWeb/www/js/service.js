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
                        $scope.hex = response.car_categories[i];
                        callback($scope.hex.max_seats);
                    }
                }
            }
        }).error(function (data) {
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
            $(".inittext")[0].text = "请选择";
        });
    }
})
