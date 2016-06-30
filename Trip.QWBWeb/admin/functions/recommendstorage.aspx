<%@ Page Title="" Language="C#" MasterPageFile="~/modules/admin/master/Header.Master" AutoEventWireup="true" CodeBehind="recommendstorage.aspx.cs" Inherits="Trip.JinJiang.H5Web.modules.admin.functions.recommendstorage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <style>
        .box {
            border: 1px solid #ccc;
        }

        #example {
            left: 45%;
        }
    </style>
    <div class="content-wrapper" ng-app="lhxApp" ng-controller="userCtrl">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>推荐产品查询区
            </h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i>H5</a></li>
                <li>推荐产品查询区</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-xs-12">
                    <div>
                        线路名称: 
                        <span style="padding-left: 10px">
                            <input id="linenamesc" type="text" style="height: 30px">
                        </span>
                        旅行社品牌: 
                        <span style="padding-left: 10px">
                            <input id="agencysc" type="text" style="height: 30px">
                        </span>
                        线路ID:
                        <span style="padding-left: 10px; ">
                            <input id="lineidsc" type="text" style="height: 30px">
                        </span>
                        <input style="margin-left: 100px; width: 100px" ng-click="filtcategory()" type="button" value="查询">
                    </div>
                    <div>
                        <div style="display: none">产品类型: </div>
                        <span style="padding-left: 10px; display: none">
                            <input id="categorysc_back" type="text" style="height: 30px; display: none">
                        </span>
                        所属旅行社: 
                        <span style="padding-left: 10px">
                            <select id="agencysc2" style="width: 200px">
                                <option value="{{x.code}}" ng-repeat="x in agencies">{{x.agency}}</option>
                            </select>
                        </span>
                        <span style="margin-right: 38px">分类: </span>
                        <select id="categorysc" style="padding-left: 10px">
                            <option value=""></option>
                            <option value="FREETRIP">自由行</option>
                            <option value="GROUPTRIP">跟团游</option>
                            <option value="SHIP">邮轮</option>
                        </select>
<%--                        <span style="margin-right: 38px">线路业务类型: </span>
                        <select id="businesscategory" style="padding-left: 10px">
                            <option value=""></option>
                            <option value="DOMESTIC">国内</option>
                            <option value="OUTBOUND">出境</option>
                            <option value="INBOUND">入境</option>
                        </select>--%>
                        <%--                        产品区域: 
                        <span style="padding-left: 10px">
                            <input id="selectedcate" type="text" style="height: 30px">
                        </span>--%>
                    </div>
                    <div class="box">
                        <!-- /.box-header -->
                        <div class="box-body">
                            <table id="example1" class="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th ng-hide="true">ID</th>
                                        <th style="width: 10%">ID</th>
                                        <th style="width: 20%">线路名称</th>
                                        <th style="width: 20%">所属旅行社</th>
                                        <th style="width: 15%">品牌</th>
                                        <th style="width: 10%">价格</th>
                                        <th style="width: 10%">分类</th>
                                        <th style="width: 20%">操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr ng-repeat="x in lines">
                                        <td ng-hide="true">{{x.Id}}</td>
                                        <td>{{x.id}}</td>
                                        <td>{{x.title}}</td>
                                        <td>{{x.travelAgency}}</td>
                                        <td>{{x.travelBrand}}</td>
                                        <td>{{x.minPrice}}</td>
                                        <td>{{x.lineCategory}}</td>
                                        <td>
                                            <img src='../../img/edit.png'><a ng-click="toggle($event)" data-toggle="modal" href="#example">添加</a></td>
                                    </tr>
                                </tbody>
                            </table>

                            <pager page-count="pageCount" current-page="currentPage" on-page-change="onPageChange()" first-text="首页" next-text="下一页" prev-text="上一页" last-text="尾页"></pager>
                        </div>
                        <!-- /.box-body -->
                    </div>
                    <!-- /.box -->
                </div>
                <!-- /.col -->
            </div>
            <!-- /.row -->
        </section>
        <!-- /.content -->
        <form id="example" class="modal hide fade in" style="display: none; height: 380px; width: 600px;">
            <div>
                <div class="modal-header">
                    <a class="close" data-dismiss="modal">×</a>
                    <h3>推荐/修改旅游营销产品</h3>
                </div>
                <div class="modal-body">
                    <div>
                        <input type="text" style="display: none" id="lineid">
                    </div>
                    <div>
                        <input type="text" style="display: none" id="agency">
                    </div>
                    <div>线路:<input type="text" style="height: 30px; margin-left: 30px; width: 400px;" disabled name="txt" id="linetitle"></div>
                    <div>标题:<input type="text" style="height: 30px; margin-left: 30px; width: 400px" name="txt" id="title"></div>
                    <div>
                        分类:
                        <select ng-model="selectedcate" style="margin-left: 25px; width: 160px" ng-options="x.categoryName for x in linecates">
                        </select>
                    </div>
                    <div>排序:<input type="number" style="height: 30px; margin-left: 30px; width: 160px" name="txt" id="order"></div>
                    <div>
                        <div>
                            <p style="float: left">图片:</p>
                            <p style="margin-left: 60px">尺寸建议(宽412px 高202px)</p>
                        </div>
                        <input id="File1" name="File1" type="file" />
                    </div>
                </div>
                <div class="modal-footer">
                    <a href="#" class="btn btn-success" ng-click="reloadRoute()">保存</a>
                    <a href="#" class="btn" data-dismiss="modal">关闭</a>
                </div>
            </div>
        </form>

    </div>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolderScripts" runat="server">
    <script type="text/javascript">
        $('.treeview-menu .treeviewli6').addClass('active');
        var app = angular.module('lhxApp', ['ng-pagination']);
        var lineid;
        var travelagency;
        app.controller('userCtrl', function ($scope, $http, $window) {
            // $scope.pageCount = 100;
            percount = 10;
            $scope.toggle = function ($event) {
                $("#example").attr("class", "modal fade in");
                lineid = $event.path[2].cells[1].innerText;
                travelagency = $event.path[2].cells[3].innerText;
                $('#linetitle')[0].value = $event.path[2].cells[2].innerText;
            };

            //线路分类下拉框bg
            var nghttp0 = "../../../ajax/apihandler.ashx?fn=getlinecategorys3&status=true&pattern=S2";
            $http.get(nghttp0).success(function (response) {
                //  debugger
                var responseCache0 = response;
                var arrayLine = new Array(0);
                for (var i = 0; i < responseCache0.ds.length; i++) {
                    arrayLine.push(responseCache0.ds[i]);
                }
                $scope.linecates = arrayLine;
            });
            //线路分类下拉框ed
            $scope.reloadRoute = function () {
                if (!$('#title')[0].value) {
                    alert("请输入标题");
                    return;
                }
                if (!travelagency) {
                    alert("请选择分类");
                    return;
                }
                if (!$('#order')[0].value) {
                    alert("请输入排序");
                    return;
                }
                $("#example").ajaxSubmit({
                    success: function (str) {
                        if (str != null && str != "undefined") {
                            if (str == "操作成功!") {
                                alert(str);
                                $window.location.reload();
                            }
                            else if (str == "2") { alert("只能上传jpg或png格式的图片"); }
                            else if (str == "3") { alert("图片不能大于1M"); }
                            else if (str == "4") { alert("请选择要上传的文件!!"); }
                            else { alert(str); }
                        }
                        else alert(str);
                    },
                    error: function (error) { alert(error); },
                    url: '../../../ajax/recommendHandler.ashx?fn=addrecommend',
                    type: "post",
                    data: {
                        lineTitle: $('#title')[0].value,
                        travelAgency: travelagency,
                        lineId: lineid,
                        order: $('#order')[0].value,
                        lineCategory: $scope.selectedcate.categoryName
                    },
                    dataType: "text"
                });
            }

            var nghttpagency = "../../../ajax/apihandler.ashx?fn=getagencies";
            $http.get(nghttpagency).success(function (response) {
                //  debugger
                var responseCache0 = response;
                var arrayLine = new Array(0);
                for (var i = 0; i < responseCache0.ds.length; i++) {
                    arrayLine.push(responseCache0.ds[i]);
                }
                $scope.agencies = arrayLine;
            });

            getlinelist();

            function getlinelist() {
                //线路列表bg
                var linenamesc = $('#linenamesc').val();
                var agencysc = $('#agencysc').val();
                var lineidsc = $('#lineidsc').val();
                var categorysc = $('#categorysc').val();
                var agencysc2 = $('#agencysc2').val();
                if (agencysc2 == null)
                    agencysc2 = "";
                var json = '{"lineCategory":"' + categorysc + '","lineName":"' + linenamesc + '","travelAgency":"' + agencysc2 + '","travelBrand":"' + agencysc + '","lineId":"' + lineidsc + '"}';
                var nghttp = "../../../ajax/recommendHandler.ashx?fn=getlinescmssearch&json=" + json + "";
                $http.get(nghttp).success(function (response) {
                    //debugger
                    //替换旅行社名字
                    for (var i = 0; i < response.length; i++) {
                        if (response[i].travelAgency !== null)
                            response[i].travelAgency = replaceAgency(response[i].travelAgency);
                        if (response[i].lineCategory !== null)
                            response[i].lineCategory = replaceCategory(response[i].lineCategory);
                    }
                    $scope.pageCount = Math.ceil(response.length / percount);
                    responseCache2 = response;
                    var arrayLine = new Array(0);
                    var mypercount = percount > responseCache2.length ? responseCache2.length : percount;
                    for (var i = 0; i < mypercount; i++) {
                        arrayLine.push(responseCache2[i]);
                    }
                    $scope.lines = arrayLine;
                });

                $scope.onPageChange = function () {
                    var arrayLine = new Array(0);
                    var pagec = responseCache2.length - (percount * ($scope.currentPage - 1)) >= percount ? percount * $scope.currentPage : responseCache2.length;
                    for (var i = percount * ($scope.currentPage - 1) ; i < pagec; i++) {
                        arrayLine.push(responseCache2[i]);
                    }
                    $scope.lines = arrayLine;

                };
                //线路列表ed
            }

            $scope.filtcategory = function () {
                getlinelist();
            }
        });


        function getlinecategorys() {
            $.ajax({
                url: "../../../ajax/apihandler.ashx?fn=getlinecategorys",
                type: "post",
                success: function (text) {
                    var d = eval("(" + text + ")");
                }
            });
        }

        function replaceAgency(agencycode) {
            agencycode = agencycode.replace("SHT", "上海华亭海外旅游有限公司");
            agencycode = agencycode.replace("STD", "旅游事业部");
            agencycode = agencycode.replace("SWD", "上海锦江国际旅游股份有限公司网点分公司");
            agencycode = agencycode.replace("STS", "上海旅行社有限公司");
            agencycode = agencycode.replace("SHZ", "浙江锦旅国旅旅行社有限公司");
            agencycode = agencycode.replace("CTH", "上海中旅国际旅行社有限公司");
            agencycode = agencycode.replace("CYR", "上海中旅杨休国际旅行社有限公司");
            agencycode = agencycode.replace("SIT", "信息中心");
            agencycode = agencycode.replace("SHA", "上海国旅国际旅行社有限公司");
            agencycode = agencycode.replace("BJT", "北京锦江国际旅行社有限公司");
            agencycode = agencycode.replace("SJT", "上海锦江旅游有限公司");
            return agencycode;
        }

        function replaceCategory(lineCategory) {
            lineCategory = lineCategory.replace("FREETRIP", "自由行");
            lineCategory = lineCategory.replace("GROUPTRIP", "跟团游");
            lineCategory = lineCategory.replace("SHIP", "邮轮");
            return lineCategory;
        }

    </script>
</asp:Content>
