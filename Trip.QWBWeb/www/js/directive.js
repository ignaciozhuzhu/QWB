angular.module('starter.directive', [])

//自定义行程路线控件 -- 可输入城市中文 控件 多地,可多次添加
.directive('variocitiesComponents', function () {
    return {
        restrict: 'E',
        template: function (tElement, tAttrs) {
            var myindex = tAttrs.myindex;
            if (!myindex)
                myindex = $("variocities-components").length + 1;
            var _html = '<p>Day ' + myindex + '  </p><div class="car_serach"><a class="btn-select car_select">';
            _html += '<input class="cur-select cur_car_select" ng-click="clickCity($event)" placeholder="请选择留宿城市" ';
            _html += 'ng-focus="displaybox($event)" ng-blur="displaynonebox($event)" ng-model="model[' + myindex + '].wcity" ng-change=changecity()>';
            _html += '<div ng-hide="true" ng-model="model[' + myindex + '].wcityid2"></div>';
            _html += '</a> <div style="display:none;margin:0 3%;max-height:365px;overflow:hidden">';
            _html += '<hr />';
            _html += '<p style="font-weight:bold;">热门城市列表 可输入城市中文</p>';
            _html += '<div style="color:#9B9B9B;font-size:16px;max-height:75px;overflow:hidden" ng-repeat="x in areas track by x.id">';
            _html += '<div class="mycitynameclass">{{x.name}}</div>';
            _html += '<span ng-click="selectcity2($event)" style="color:black;margin:0 6% 0 0;line-height:24px"';
            _html += 'ng-repeat="xx in x.cities|filter:model[' + myindex + '].wcity|filter:x.is_hot">{{xx.name}}';
            _html += '<span ng-show="false">{{xx.id}}</span></span>';
            _html += '</div>';
            _html += '</div><p class="citydistancetip displaynone">一天内可以到达</p></div>';
            _html += '<img src="img/减号.png" style="height:30px !important;width: 30px !important;margin: 5px 0;" ng-click="delday()"></img>';
            return _html;
        }

    };

})

//热门城市列表 可输入城市中文 控件
.directive('citiesComponents', function () {
    return {
        restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
        templateUrl: 'js/directive_html/cities.html'
    };
})

//机场下拉框 控件
.directive('airportComponents', function () {
    return {
        restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
        templateUrl: 'js/directive_html/airport.html'
    };
})