<%@ Page Title="" Language="C#" MasterPageFile="~/modules/admin/master/Header.Master" AutoEventWireup="true" CodeBehind="searchtag.aspx.cs" Inherits="Trip.JinJiang.H5Web.modules.admin.functions.searchtag" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
        <style>
        .box {
        border:1px solid #ccc
        }
    </style>
    <div class="content-wrapper" ng-app="lhxApp" ng-controller="firstCtrl">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>目的地标签管理
                    <small>操作</small>
                <small><a href="" ng-click="ks1()">目的地标签</a></small>
                <small><a href="" ng-click="ks2()">空搜关键字</a></small>
            </h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i>H5</a></li>
                <li>目的地标签管理</li>
            </ol>
        </section>


        <!-- Main content -->
        <section class="content">

            <div class="row" id="row1">
                <div class="col-xs-6">

                    <!--弹出框编辑开始-->
                    <form id="editbox" class="modal hide fade in" style="display: none; height: 330px; width: 270px;">
                        <div class="modal-header">
                            <a class="close" data-dismiss="modal">×</a>
                            <h3>标签编辑</h3>
                        </div>
                        <div class="modal-body">
                            <div>
                                <div>标签名称:</div>
                                <div>
                                    <input id="areaName" type="text" style="height: 30px" />
                                </div>
                            </div>
                            <div>
                                <div>排序2:</div>
                                <div>
                                    <input id="order" type="number" style="height: 30px" />
                                </div>
                            </div>
                            <input type="text" name="txt" id="txt" style="display: none">
                            <input type="button" name="btn" value="btn" id="btn" style="display: none">
                        </div>
                        <div class="modal-footer">
                            <a href="#" class="btn btn-success" ng-click="reloadRoute()">保存</a>
                            <a href="#" class="btn" data-dismiss="modal">关闭</a>
                        </div>
                    </form>

                    <form id="confirmbox" class="modal hide fade in" style="display: none; height: 120px; width: 270px;">
                        <div class="modal-header">
                            <a class="close" data-dismiss="modal">×</a>
                            <h3>确认删除吗?</h3>
                        </div>
                        <div class="modal-footer">
                            <a href="#" class="btn btn-success" ng-click="confirmEn()">确认</a>
                            <a href="#" class="btn" data-dismiss="modal">取消</a>
                        </div>
                    </form>
                    <!--弹出框确认结束-->

                    <div class="box">
                        <!-- /.box-header -->
                        <div class="box-body">
                            <div>
                                <img src='../../img/add.png'><a ng-click="add()" data-toggle="modal" href="#editbox" style="margin-left: 1%">添加</a>
                            </div>

                            <table class="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th ng-hide="true">Id</th>
                                        <th>一级标签</th>
                                        <th ng-hide="false">排序</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr ng-repeat="x in lines">
                                        <td ng-hide="true">{{x.Id}}</td>
                                        <td ng-click="showson($event)"><a href="#">{{x.areaName}}</a></td>
                                        <td ng-hide="false">{{x.order}}</td>
                                        <td>
                                            <img src='../../img/edit.png'><a ng-click="edit($event)" data-toggle="modal" href="#editbox">修改</a>
                                            <img style="margin-left: 5%" src='../../img/delete.png'><a ng-click="changeen($event)" data-toggle="modal" href="#confirmbox">删除</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>


                        </div>
                        <!-- /.box-body -->
                    </div>
                    <!-- /.box -->
                </div>

                <div class="col-xs-6" ng-controller="secondCtrl">

                    <!--弹出框编辑开始-->
                    <form id="editbox2" class="modal hide fade in" style="display: none; height: 330px; width: 270px;">
                        <div class="modal-header">
                            <a class="close" data-dismiss="modal">×</a>
                            <h3>标签编辑</h3>
                        </div>
                        <div class="modal-body">
                            <div>
                                <div>标签名称:</div>
                                <div>
                                    <input id="destName" type="text" style="height: 30px" />
                                </div>
                            </div>
                            <div>
                                <div>排序:</div>
                                <div>
                                    <input id="order2" type="number" style="height: 30px" />
                                </div>
                            </div>
                            <div>
                                <div>关键词链接:(格式遵循http://)</div>
                                <div>
                                    <input id="H5Url2" type="text" style="height: 30px" />
                                </div>
                            </div>
                            <input type="text" name="txt" id="txt" style="display: none">
                            <input type="button" name="btn" value="btn" id="btn" style="display: none">
                        </div>
                        <div class="modal-footer">
                            <a href="#" class="btn btn-success" ng-click="reloadRoute()">保存</a>
                            <a href="#" class="btn" data-dismiss="modal">关闭</a>
                        </div>
                    </form>

                    <form id="confirmbox2" class="modal hide fade in" style="display: none; height: 120px; width: 270px;">
                        <div class="modal-header">
                            <a class="close" data-dismiss="modal">×</a>
                            <h3>确认删除吗?</h3>
                        </div>
                        <div class="modal-footer">
                            <a href="#" class="btn btn-success" ng-click="confirmEn()">确认</a>
                            <a href="#" class="btn" data-dismiss="modal">取消</a>
                        </div>
                    </form>
                    <!--弹出框确认结束-->

                    <div class="box">
                        <!-- /.box-header -->
                        <div class="box-body">
                            <div>
                                <img src='../../img/add.png'><a id="addtag" disabled ng-click="add()" data-toggle="modal" href="#editbox2" style="margin-left: 1%">添加</a>
                            </div>

                            <table class="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th ng-hide="true">Id</th>
                                        <th>二级标签</th>
                                        <th ng-hide="true">排序</th>
                                        <th>链接</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr ng-repeat="x in tags">
                                        <td ng-hide="true">{{x.Id}}</td>
                                        <td>{{x.destName}}</td>
                                        <td ng-hide="true">{{x.order}}</td>
                                        <td>{{x.H5Url}}</td>
                                        <td>
                                            <img src='../../img/edit.png'><a ng-click="edit($event)" data-toggle="modal" href="#editbox2">修改</a>
                                            <img style="margin-left: 5%" src='../../img/delete.png'><a ng-click="changeen($event)" data-toggle="modal" href="#confirmbox2">删除</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>


                        </div>
                        <!-- /.box-body -->
                    </div>
                    <!-- /.box -->
                </div>
                <!-- /.col -->
            </div>


            <!-- 空搜关键字-->
            <div class="row" id="row3" ng-controller="thirdCtrl" style="display: none">
                <div class="col-xs-6">

                    <!--弹出框编辑开始-->
                    <form id="editbox3" class="modal hide fade in" style="display: none; height: 270px; width: 270px;">
                        <div class="modal-header">
                            <a class="close" data-dismiss="modal">×</a>
                            <h3>关键词编辑</h3>
                        </div>
                        <div class="modal-body">
                            <div>
                                <div>关键词名称:</div>
                                <div>
                                    <input id="searchName" type="text" style="height: 30px" />
                                </div>
                            </div>
                            <div>
                                <div>关键词链接:(格式遵循http://)</div>
                                <div>
                                    <input id="H5Url3" type="text" style="height: 30px" />
                                </div>
                            </div>
                            <input type="text" name="txt" id="txt" style="display: none">
                            <input type="button" name="btn" value="btn" id="btn" style="display: none">
                        </div>
                        <div class="modal-footer">
                            <a href="#" class="btn btn-success" ng-click="reloadRoute()">保存</a>
                            <a href="#" class="btn" data-dismiss="modal">关闭</a>
                        </div>
                    </form>

                    <form id="confirmbox3" class="modal hide fade in" style="display: none; height: 120px; width: 270px;">
                        <div class="modal-header">
                            <a class="close" data-dismiss="modal">×</a>
                            <h3>确认删除吗?</h3>
                        </div>
                        <div class="modal-footer">
                            <a href="#" class="btn btn-success" ng-click="confirmEn()">确认</a>
                            <a href="#" class="btn" data-dismiss="modal">取消</a>
                        </div>
                    </form>
                    <!--弹出框确认结束-->

                    <div class="box">
                        <!-- /.box-header -->
                        <div class="box-body">
                            <div>
                                <img src='../../img/add.png'><a ng-click="add()" data-toggle="modal" href="#editbox3" style="margin-left: 1%">添加</a>
                            </div>

                            <table class="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th ng-hide="true">Id</th>
                                        <th>关键字</th>
                                        <th>链接</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr ng-repeat="x in emptyKey">
                                        <td ng-hide="true">{{x.Id}}</td>
                                        <td ng-click="showson($event)"><a href="#">{{x.searchName}}</a></td>
                                        <td>{{x.H5Url}}</td>
                                        <td>
                                            <img src='../../img/edit.png'><a ng-click="edit($event)" data-toggle="modal" href="#editbox3">修改</a>
                                            <img style="margin-left: 5%" src='../../img/delete.png'><a ng-click="changeen($event)" data-toggle="modal" href="#confirmbox3">删除</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>


                        </div>
                        <!-- /.box-body -->
                    </div>
                    <!-- /.box -->
                </div>
            </div>
            <!-- /.row -->
        </section>
        <!-- /.content -->
    </div>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolderScripts" runat="server">
    <script type="text/javascript">
        $('.treeview-menu .treeviewli4').addClass('active');
        var app = angular.module('lhxApp', ['ng-pagination']);
        var selectid;
        var aid;
        $('#addtag').removeAttr('href');

        function modalclass() {
            $("#editbox").attr("class", "modal fade in");
            $("#confirmbox").attr("class", "modal fade in");
            $("#editbox2").attr("class", "modal fade in");
            $("#confirmbox2").attr("class", "modal fade in");
            $("#editbox3").attr("class", "modal fade in");
            $("#confirmbox3").attr("class", "modal fade in");
        }

        app.controller('firstCtrl', function ($scope, $http, $window) {

            $scope.ks1 = function () {
                $('#row3').hide();
                $('#row1').show();
            }
            $scope.ks2 = function () {
                $('#row1').hide();
                $('#row3').show();
            }

            $scope.pageCount = 100;
            percount = 100;
            $scope.add = function () {
                modalclass();
                selectid = "";
                $('#areaName')[0].value = "";
                $('#order')[0].value = "1";
            };
            $scope.edit = function ($event) {
                modalclass();
                selectid = $event.path[2].cells[0].innerText;
                $('#areaName')[0].value = $event.path[2].cells[1].innerText;
                $('#order')[0].value = $event.path[2].cells[2].innerText;
            };
            $scope.changeen = function ($event) {
                modalclass();
                selectid = $event.path[2].cells[0].innerText;
            };
            $scope.confirmEn = function () {
                $.ajax({
                    url: "../../../ajax/areaHandler.ashx?fn=enarea",
                    type: "post",
                    data: { Id: selectid },
                    success: function (text) {
                        $window.location.reload();
                    }
                });
            };
            //默认显示之前选择修改或添加过的二级标签.
            if (getCookie('tagaid') == "undefined") {
                setCookie('tagaid', 1, 1);
            }
            if (getCookie('tagaid') > 0) {
                selectid = getCookie('tagaid');
                var nghttp = "../../../ajax/areaHandler.ashx?fn=getarea2list&aId=" + selectid + "";
                $http.get(nghttp).success(function (response) {
                    //debugger
                    responseCache = response;
                    var arrayLine = new Array(0);
                    var pagec = responseCache.ds.length - (percount * ($scope.currentPage - 1)) >= percount ? percount * $scope.currentPage : responseCache.ds.length;
                    for (var i = 0; i < pagec; i++) {
                        arrayLine.push(responseCache.ds[i]);
                    }
                    $scope.tags = arrayLine;
                });
                //防止为空的情况
                $scope.tags = "";
            }

            $scope.showson = function ($event) {
                selectid = $event.currentTarget.previousElementSibling.innerText;
                aid = selectid;
                $('#addtag').attr("href", "#editbox2");
                var nghttp = "../../../ajax/areaHandler.ashx?fn=getarea2list&aId=" + selectid + "";
                $http.get(nghttp).success(function (response) {
                    //debugger
                    responseCache = response;
                    var arrayLine = new Array(0);
                    var pagec = responseCache.ds.length - (percount * ($scope.currentPage - 1)) >= percount ? percount * $scope.currentPage : responseCache.ds.length;
                    for (var i = 0; i < pagec; i++) {
                        arrayLine.push(responseCache.ds[i]);
                    }
                    $scope.tags = arrayLine;
                });
                //防止为空的情况
                $scope.tags = "";
            };

            var nghttp = "../../../ajax/areaHandler.ashx?fn=getarealist";
            $http.get(nghttp).success(function (response) {
                responseCache = response;
                var arrayLine = new Array(0);
                var pagec = responseCache.ds.length - (percount * ($scope.currentPage - 1)) >= percount ? percount * $scope.currentPage : responseCache.ds.length;
                for (var i = 0; i < pagec; i++) {
                    arrayLine.push(responseCache.ds[i]);
                }
                $scope.lines = arrayLine;
            });

            $scope.reloadRoute = function () {
                var areaName = $('#areaName')[0].value;
                var order = $('#order')[0].value;
                if (selectid === null || selectid === undefined || selectid === "") {
                    $.ajax({
                        url: "../../../ajax/areaHandler.ashx?fn=addarea",
                        type: "post",
                        data: { areaName: areaName, order: order },
                        success: function (text) {
                            if (text != "操作成功!") {
                                alert(text);
                                return;
                            }
                            $window.location.reload();
                        }
                    });
                }
                else {
                    $.ajax({
                        url: "../../../ajax/areaHandler.ashx?fn=editarea",
                        type: "post",
                        data: { Id: selectid, areaName: areaName, order: order },
                        success: function (text) {
                            if (text != "操作成功!") {
                                alert(text);
                                return;
                            }
                            setCookie('tagaid', selectid, 1);
                            $window.location.reload();
                        }
                    });
                }
            }

        });

        app.controller('secondCtrl', function ($scope, $http, $window) {
            $scope.pageCount = 100;
            percount = 100;
            $scope.add = function () {
                modalclass();
                selectid = "";
                $('#destName')[0].value = "";
                $('#order2')[0].value = "1";
                $('#H5Url')[0].value = "";
            };
            $scope.edit = function ($event) {
                modalclass();
                selectid = $event.path[2].cells[0].innerText;
                $('#destName')[0].value = $event.path[2].cells[1].innerText;
                $('#order2')[0].value = $event.path[2].cells[2].innerText;
                $('#H5Url2')[0].value = $event.path[2].cells[3].innerText;
            };
            $scope.changeen = function ($event) {
                modalclass();
                selectid = $event.path[2].cells[0].innerText;
            };
            $scope.confirmEn = function () {
                $.ajax({
                    url: "../../../ajax/areaHandler.ashx?fn=enarea2",
                    type: "post",
                    data: { Id: selectid },
                    success: function (text) {
                        $window.location.reload();
                    }
                });
            };

            $scope.reloadRoute = function () {
                var destName = $('#destName')[0].value;
                var order = $('#order2')[0].value;
                var H5Url = $('#H5Url2')[0].value;
                if (selectid === null || selectid === undefined || selectid === "") {
                    $.ajax({
                        url: "../../../ajax/areaHandler.ashx?fn=addarea2",
                        type: "post",
                        data: { aId: aid, destName: destName, order: order, H5Url: H5Url },
                        success: function (text) {
                            setCookie('tagaid', aid, 1);
                            $window.location.reload();
                        }
                    });
                }
                else {
                    $.ajax({
                        url: "../../../ajax/areaHandler.ashx?fn=editarea2",
                        type: "post",
                        data: { aId: aid, Id: selectid, destName: destName, order: order, H5Url: H5Url },
                        success: function (text) {
                            setCookie('tagaid', aid, 1);
                            $window.location.reload();
                        }
                    });
                }
            }

        });

        app.controller('thirdCtrl', function ($scope, $http, $window) {
            $scope.pageCount = 100;
            percount = 100;
            $scope.add = function () {
                modalclass();
                selectid = "";
                $('#searchName')[0].value = "";
            };
            $scope.edit = function ($event) {
                modalclass();
                selectid = $event.path[2].cells[0].innerText;
                $('#searchName')[0].value = $event.path[2].cells[1].innerText;
                $('#H5Url3')[0].value = $event.path[2].cells[2].innerText;
            };
            $scope.changeen = function ($event) {
                modalclass();
                selectid = $event.path[2].cells[0].innerText;
            };
            var nghttp = "../../../ajax/areaHandler.ashx?fn=getarea3list";
            $http.get(nghttp).success(function (response) {
                responseCache = response;
                var arrayLine = new Array(0);
                var pagec = responseCache.ds.length - (percount * ($scope.currentPage - 1)) >= percount ? percount * $scope.currentPage : responseCache.ds.length;
                for (var i = 0; i < pagec; i++) {
                    arrayLine.push(responseCache.ds[i]);
                }
                $scope.emptyKey = arrayLine;
            });
            //防止为空的情况
            $scope.emptyKey = "";

            $scope.confirmEn = function () {
                $.ajax({
                    url: "../../../ajax/areaHandler.ashx?fn=enarea3",
                    type: "post",
                    data: { Id: selectid },
                    success: function (text) {
                        $window.location.reload();
                    }
                });
            };

            $scope.reloadRoute = function () {
                var searchName = $('#searchName')[0].value;
                var H5Url = $('#H5Url3')[0].value;
                if (selectid === null || selectid === undefined || selectid === "") {
                    $.ajax({
                        url: "../../../ajax/areaHandler.ashx?fn=addarea3",
                        type: "post",
                        data: { searchName: searchName, H5Url: H5Url },
                        success: function (text) {
                            $window.location.reload();
                        }
                    });
                }
                else {
                    $.ajax({
                        url: "../../../ajax/areaHandler.ashx?fn=editarea3",
                        type: "post",
                        data: { Id: selectid, searchName: searchName, H5Url: H5Url },
                        success: function (text) {
                            $window.location.reload();
                        }
                    });
                }
            }

        })
    </script>

</asp:Content>
