<%@ Page Title="" Language="C#" MasterPageFile="~/modules/admin/master/Header.Master" AutoEventWireup="true" CodeBehind="linecategory.aspx.cs" Inherits="Trip.JinJiang.H5Web.modules.admin.functions.linecategory" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <style>
        .box {
        border:1px solid #ccc
        }
    </style>
    <div class="content-wrapper" ng-app="lhxApp" ng-controller="userCtrl">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>线路分类管理
                <small>操作</small>
            </h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i>H5</a></li>
                <li>线路分类管理</li>
            </ol>
        </section>

        <form id="example" class="modal hide fade in" style="display: none; height: 470px; width: 330px;">
            <div class="modal-header">
                <a class="close" data-dismiss="modal">×</a>
                <h3>线路类型编辑</h3>
            </div>
            <div class="modal-body">
                <div>
                    <div>分类名称:</div>
                    <div>
                        <input id="categoryName" type="text" style="height: 30px" />
                    </div>
                </div>
                <div>
                    <div>分类编码:</div>
                    <div>
                        <input id="lineCategory" type="text" style="height: 30px" />
                    </div>
                    <div>样式归属:</div>
                    <div>
                        <select id="pattern">
                            <option value="{{x.pattern}}" ng-repeat="x in patterns">{{x.pattern}}</option>
                        </select>
                    </div>
                    <div>排序:</div>
                    <div>
                        <input id="order" type="number" style="height: 30px" />
                    </div>
                    <div>图标:尺寸建议(宽150px 高150px)</div>
                    <input id="File1" name="File1" type="file" style="" />
                    <%--<input id="imgurl"  type="text" style="height: 30px" />--%>
                    <img id="imgurl2" style="height: 30px" />
<%--                    <div class="div1">
    <div class="div2">选择文件</div>
    <input type="file" class="inputstyle">
</div>--%>
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
                <h3>确认操作吗?</h3>
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
                            <div>
                                <img src='../../img/add.png' style="margin-left: 1%"><a ng-click="add()" data-toggle="modal" href="#example">添加</a>
                            </div>

                            <table id="example1" class="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th ng-hide="true">Id</th>
                                        <th style="width: 15%">分类名称</th>
                                        <th style="width: 15%">分类编码</th>
                                        <th style="width: 10%">图标</th>
                                        <th style="width: 10%">样式归属</th>
                                        <th style="width: 10%">排序</th>
                                        <th style="width: 10%">状态</th>
                                        <th style="width: 30%">操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr ng-repeat="x in lines">
                                        <td ng-hide="true">{{x.Id}}</td>
                                        <td>{{x.categoryName}}</td>
                                        <td>{{x.lineCategory}}</td>
                                        <td>
                                            <img src="{{x.imgUrl}}" style="width: 30px; height: 30px"></td>
                                        <td>{{x.pattern}}</td>
                                        <td>{{x.order}}</td>
                                        <td><a ng-click="changeen($event)" data-toggle="modal" href="#example0">{{x.status===true?'可用':'禁用'}}</a></td>
                                        <td>
                                            <img src='../../img/edit.png'><a ng-click="edit($event)" data-toggle="modal" href="#example">修改</a>
                                            <%--<img style="margin-left: 5%" src='../../img/disable.png'><a ng-click="changeen($event)" data-toggle="modal" href="#example0">禁(可)用</a>--%>
                                            <img style="margin-left: 5%" src='../../img/delete.png'><a ng-click="delete($event)" data-toggle="modal" href="#example2">删除</a>
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
        $('.treeview-menu .treeviewli2').addClass('active');
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
            //$scope.pageCount = 100;
            percount = 10;
            $scope.add = function () {
                modalclass();
                selectid = "";
                $('#categoryName')[0].value = "";
                $('#lineCategory')[0].value = "";
                $('#lineCategory').removeAttr('disabled');
                $('#pattern')[0].value = "";
                //$('#pattern').removeAttr('disabled');
                $('#order')[0].value = "1";
            };
            $scope.edit = function ($event) {
                modalclass();
                selectid = $event.path[2].cells[0].innerText;
                $('#categoryName')[0].value = $event.path[2].cells[1].innerText;
                $('#lineCategory')[0].value = $event.path[2].cells[2].innerText;
                //$('#imgurl')[0].value = $event.path[2].cells[3].childNodes[1].src;
                $('#imgurl2')[0].src = $event.path[2].cells[3].childNodes[1].src;
                $('#lineCategory').attr("disabled", "disabled");
                $('#pattern')[0].value = $event.path[2].cells[4].innerText;
                //$('#pattern').attr("disabled", "disabled");
                $('#order')[0].value = $event.path[2].cells[5].innerText;
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
                    url: "../../../ajax/apihandler.ashx?fn=enlinecategory",
                    type: "post",
                    data: { Id: selectid },
                    success: function (text) {
                        $window.location.reload();
                    }
                });
            };
            $scope.confirmDel = function () {
                $.ajax({
                    url: "../../../ajax/apihandler.ashx?fn=dellinecategory",
                    type: "post",
                    data: { Id: selectid },
                    success: function (text) {
                        $window.location.reload();
                    }
                });
            };
            var nghttp = "../../../ajax/apihandler.ashx?fn=getlinecategorys";
            $http.get(nghttp).success(function (response) {
                $scope.pageCount = Math.ceil(response.ds.length / percount);
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
                //debugger
                var path = document.getElementById("File1").value;
                //var img = document.getElementById("img1");
                if ($('#pattern')[0].value === "") {
                    alert("请选择样式归属");
                    return;
                }
                if ($.trim(path) == "" && $('#pattern')[0].value === "S1" && $('#imgurl2')[0].src === "") {
                    alert("请选择要上传的文件");
                    return;
                }
                //如果本来有图且没有去置换该图,则不需要上传图片
                if ($('#imgurl2')[0].src !== "" && $.trim(path) == "") {
                    path = $('#imgurl2')[0].src;
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
                                else { alert('操作失败！检查是否重复排序'); }
                            }
                            else alert('操作失败！检查是否重复排序');
                        },
                        error: function (error) { alert(error); },
                        url: '../../../ajax/lineCategoryHandler.ashx?fn=addcategory',
                        type: "post",
                        data: { categoryName: $('#categoryName')[0].value, lineCategory: $('#lineCategory')[0].value, pattern: $('#pattern')[0].value, order: $('#order')[0].value, path: path },
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
                                else { alert('操作失败！检查是否重复排序'); }
                            }
                            else alert('操作失败！检查是否重复排序');
                        },
                        error: function (error) { alert(error); },
                        url: '../../../ajax/lineCategoryHandler.ashx?fn=editlinecategory',
                        type: "post",
                        data: { categoryName: $('#categoryName')[0].value, lineCategory: $('#lineCategory')[0].value, Id: selectid, order: $('#order')[0].value, path: path, pattern: $('#pattern')[0].value },
                        dataType: "text"
                    });

                }

            }

            var nghttp02 = "../../../ajax/lineCategoryHandler.ashx?fn=getpatterns";
            $http.get(nghttp02).success(function (response) {
                $scope.patterns = response.ds;
            })

        });

    </script>
</asp:Content>
