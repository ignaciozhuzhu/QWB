<%@ Page Title="" Language="C#" MasterPageFile="~/modules/pages/tables/Header.Master" AutoEventWireup="true" CodeBehind="WebForm1.aspx.cs" Inherits="Trip.JinJiang.H5Web.modules.pages.tables.WebForm1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="content-wrapper" ng-app="lhxApp" ng-controller="userCtrl">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>轮播图管理
                    <small>操作</small>
            </h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i>H5</a></li>
                <li><a href="#">二郎腿</a></li>
                <li class="active">轮播图管理</li>
            </ol>
        </section>

        <form id="example" class="modal hide fade in" style="display: none; height: 330px; width: 270px;">
            <div class="modal-header">
                <a class="close" data-dismiss="modal">×</a>
                <h3>线路类型编辑</h3>
            </div>
            <div class="modal-body">
                <div>
                    <div>描述:</div>
                    <div>
                        <input id="alt" type="text" style="height: 30px" />
                    </div>
                </div>
                <div>
                    <div>图片:</div>
                    <input id="File1" name="File1" type="file" />
                </div>
                <input type="text" name="txt" id="txt" style="display: none">
                <input type="button" name="btn" value="btn" id="btn" style="display: none">
            </div>
            <div class="modal-footer">
                <a href="#" class="btn btn-success" ng-click="reloadRoute()">保存</a>
                <a href="#" class="btn" data-dismiss="modal">关闭</a>
            </div>
        </form>

        <form id="example0" class="modal hide fade in" style="display: none; height: 120px; width: 270px;">
            <div class="modal-header">
                <a class="close" data-dismiss="modal">×</a>
                <h3>确认禁(可)用吗?</h3>
            </div>
            <div class="modal-footer">
                <a href="#" class="btn btn-success" ng-click="confirmEn()">确认</a>
                <a href="#" class="btn" data-dismiss="modal">取消</a>
            </div>
        </form>
        <form id="example2" class="modal hide fade in" style="display: none; height: 120px; width: 270px;">
            <div class="modal-header">
                <a class="close" data-dismiss="modal">×</a>
                <h3>确认删除吗?</h3>
            </div>
            <div class="modal-footer">
                <a href="#" class="btn btn-success" ng-click="confirmDel()">确认</a>
                <a href="#" class="btn" data-dismiss="modal">取消</a>
            </div>
        </form>

        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-xs-12">

                    <div class="box">
                        <!-- /.box-header -->
                        <div class="box-body">
                            <div><a ng-click="add()" data-toggle="modal" href="#example" style="margin-left: 1%">添加</a></div>

                            <table id="example1" class="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th ng-hide="true">Id</th>
                                        <th>描述</th>
                                        <th>图片</th>
                                        <th>状态</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr ng-repeat="x in lines">
                                        <td ng-hide="true">{{x.Id}}</td>
                                        <td>{{x.alt}}</td>
                                        <td>
                                            <img src="{{x.imgUrl}}" style="width: 200px; height: 120px"></td>
                                        <td>{{x.status===true?'可用':'禁用'}}</td>
                                        <td>
                                            <a ng-click="edit($event)" data-toggle="modal" href="#example">修改</a>
                                            <a ng-click="changeen($event)" data-toggle="modal" href="#example0" style="margin-left: 5%">禁(可)用</a>
                                            <a ng-click="delete($event)" data-toggle="modal" href="#example2" style="margin-left: 5%">删除</a>
                                        </td>
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
    </div>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolderScripts" runat="server">
    <script type="text/javascript">
        $(function () {
            $("#example1").DataTable();
        });

        var app = angular.module('lhxApp', ['ng-pagination']);
        var selectid;
        function modalclass() {
            $("#example").attr("class", "modal fade in");
        }
        function modalclass1() {
            $("#example0").attr("class", "modal fade in");
        }
        function modalclass2() {
            $("#example2").attr("class", "modal fade in");
        }

        app.controller('userCtrl', function ($scope, $http, $window) {
            $scope.pageCount = 100;
            percount = 5;
            $scope.add = function () {
                modalclass();
                selectid = "";
                $('#alt')[0].value = "";
            };
            $scope.edit = function ($event) {
                modalclass();
                selectid = $event.path[2].cells[0].innerText;
                $('#alt')[0].value = $event.path[2].cells[1].innerText;
            };
            $scope.changeen = function ($event) {
                modalclass1();
                selectid = $event.path[2].cells[0].innerText;
            };
            $scope.delete = function ($event) {
                modalclass2();
                selectid = $event.path[2].cells[0].innerText;
            };
            $scope.confirmEn = function () {
                $.ajax({
                    url: "../../../ajax/bannerImgHandler.ashx?fn=enbannerimg",
                    type: "post",
                    data: { Id: selectid },
                    success: function (text) {
                        $window.location.reload();
                    }
                });
            };
            $scope.confirmDel = function () {
                $.ajax({
                    url: "../../../ajax/bannerImgHandler.ashx?fn=delbannerimg",
                    type: "post",
                    data: { Id: selectid },
                    success: function (text) {
                        $window.location.reload();
                    }
                });
            };
            var nghttp = "../../../ajax/bannerImgHandler.ashx?fn=getbannerimglist";
            $http.get(nghttp).success(function (response) {
                responseCache = response;
                var arrayLine = new Array(0);
                var pagec = responseCache.ds.length - (percount * ($scope.currentPage - 1)) >= percount ? percount * $scope.currentPage : responseCache.ds.length;
                for (var i = 0; i < pagec; i++) {
                    arrayLine.push(responseCache.ds[i]);
                }
                $scope.lines = arrayLine;
            });
            $scope.onPageChange = function () {
                var arrayLine = new Array(0);
                var pagec = responseCache.ds.length - (percount * ($scope.currentPage - 1)) >= percount ? percount * $scope.currentPage : responseCache.ds.length;
                for (var i = percount * ($scope.currentPage - 1) ; i < pagec; i++) {
                    arrayLine.push(responseCache.ds[i]);
                }
                $scope.lines = arrayLine;
            };
            $scope.reloadRoute = function () {
                var path = document.getElementById("File1").value;
                var img = document.getElementById("img1");
                if ($.trim(path) == "") {
                    alert("请选择要上传的文件");
                    return;
                }

                //未选中行说明是新增.
                if (selectid === null || selectid === undefined || selectid === "") {
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
                                else { alert('操作失败！'); }
                            }
                            else alert('操作失败！');
                        },
                        error: function (error) { alert(error); },
                        url: '../../../ajax/bannerImgHandler.ashx?fn=addbannerimg',
                        type: "post",
                        data: { alt: $('#alt')[0].value },
                        dataType: "text"
                    });

                }
                else {
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
                                else { alert('操作失败！'); }
                            }
                            else alert('操作失败！');
                        },
                        error: function (error) { alert(error); },
                        url: '../../../ajax/bannerImgHandler.ashx?fn=editbannerimg',
                        type: "post",
                        data: { alt: $('#alt')[0].value, Id: selectid },
                        dataType: "text"
                    });

                }

            }

        });

    </script>
</asp:Content>
