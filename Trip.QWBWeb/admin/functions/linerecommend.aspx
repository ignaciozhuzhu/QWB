<%@ Page Title="" Language="C#" MasterPageFile="~/modules/admin/master/Header.Master" AutoEventWireup="true" CodeBehind="linerecommend.aspx.cs" Inherits="Trip.JinJiang.H5Web.modules.admin.functions.linerecommend" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <style>
        .box {
            border: 1px solid #ccc;
        }
    </style>
    <div class="content-wrapper" ng-app="lhxApp" ng-controller="userCtrl">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>已推荐产品
            </h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i>H5</a></li>
                <li>已推荐产品</li>
            </ol>
        </section>

        <form id="example" class="modal hide fade in" style="display: none; height: 430px; width: 330px;">
            <div class="modal-header">
                <a class="close" data-dismiss="modal">×</a>
                <h3>推荐产品编辑</h3>
            </div>
            <div class="modal-body">
                <div>
                    <div>标题:</div>
                    <div>
                        <input id="lineTitle" type="text" style="height: 30px" />
                    </div>
                </div>
                <div>
                    <div>排序:</div>
                    <div>
                        <input id="order" type="number" style="height: 30px" />
                    </div>
                    <div>图标:尺寸建议(宽412px 高202px)</div>
                    <input id="File1" name="File1" type="file" style="" />
                    <img id="imgurl2" style="height: 90px" />
                </div>
                <input type="text" name="txt" id="txt" style="display: none">
                <input type="button" name="btn" value="btn" id="btn" style="display: none">
            </div>
            <div class="modal-footer">
                <a href="#" class="btn btn-success" ng-click="reloadRoute()">保存</a>
                <a href="#" class="btn" data-dismiss="modal">关闭</a>
            </div>
        </form>

        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-xs-12">
                    <div>
                        分类名称: <span style="padding-left: 10px">
                            <input id="selectedcate" type="text" style="height: 30px"></span>
                        <input ng-click="filtcategory()" type="button" value="查找">
                    </div>
                    <div class="box">
                        <!-- /.box-header -->
                        <div class="box-body">
                            <table id="example1" class="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th ng-hide="true">ID</th>
                                        <th style="width: 7%">产品id</th>
                                        <th>产品标题</th>
                                        <th style="width: 10%">分类</th>
                                        <th>所属旅行社</th>
                                        <th style="width: 7%">排序</th>
                                        <th>图片</th>
                                        <th style="width: 17%">操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr ng-repeat="x in lines">
                                        <td ng-hide="true">{{x.Id}}</td>
                                        <td>{{x.lineId}}</td>
                                        <td>{{x.lineTitle}}</td>
                                        <td>{{x.lineCategory}}</td>
                                        <td>{{x.travelAgency}}</td>
                                        <td>{{x.order}}</td>
                                        <td>
                                            <img src="{{x.imgUrl}}" style="width: 160px; height: 120px"></td>
                                        <td>
                                            <img src='../../img/edit.png'><a ng-click="edit($event)" data-toggle="modal" href="#example">修改</a>
                                            <img src='../../img/delete.png'><a ng-click="delete($event)" data-toggle="modal" href="#example2">删除</a></td>
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
    </div>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolderScripts" runat="server">
    <script type="text/javascript">

        $('.treeview-menu .treeviewli5').addClass('active');
        var app = angular.module('lhxApp', ['ng-pagination']);
        var selectid;

        function modalclass() {
            $("#example").attr("class", "modal fade in");
        }
        function modalclass2() {
            $("#example2").attr("class", "modal fade in");
        }
        app.controller('userCtrl', function ($scope, $http, $window) {
            // $scope.pageCount = 100;
            percount = 6;

            $scope.edit = function ($event) {
                modalclass();
                selectid = $event.path[2].cells[0].innerText;
                $('#lineTitle')[0].value = $event.path[2].cells[2].innerText;
                $('#imgurl2')[0].src = $event.path[2].cells[6].childNodes[1].src;
                $('#order')[0].value = $event.path[2].cells[5].innerText;
            };

            $scope.delete = function ($event) {
                modalclass2();
                selectid = $event.path[2].cells[0].innerText;
            };

            $scope.confirmDel = function () {
                $.ajax({
                    url: "../../../ajax/recommendHandler.ashx?fn=delrecommend",
                    type: "post",
                    data: { Id: selectid },
                    success: function (text) {
                        //debugger
                        alert(text);
                        $window.location.reload();
                    }
                });
            };

            var nghttp0 = "../../../ajax/apihandler.ashx?fn=getlinecategorys0";
            $http.get(nghttp0).success(function (response) {
                //  debugger
                var responseCache0 = response;
                var arrayLine = new Array(0);
                for (var i = 0; i < responseCache0.ds.length; i++) {
                    arrayLine.push(responseCache0.ds[i]);
                }
                $scope.linecates = arrayLine;
            });

            $scope.reloadRoute = function () {
                //debugger
                var path = document.getElementById("File1").value;
                //var img = document.getElementById("img1");
                if ($.trim(path) == "" && $('#imgurl2')[0].src === "") {
                    alert("请选择要上传的文件");
                    return;
                }
                //如果本来有图且没有去置换该图,则不需要上传图片
                if ($('#imgurl2')[0].src !== "" && $.trim(path) == "") {
                    path = $('#imgurl2')[0].src;
                }

                //修改(推荐产品编辑).
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
                    url: '../../../ajax/recommendHandler.ashx?fn=editrecommend',
                    type: "post",
                    data: { lineTitle: $('#lineTitle')[0].value, Id: selectid, order: $('#order')[0].value, path: path },
                    dataType: "text"
                });
            }

            function loadproduct() {
                //线路列表bg
                var filtcate = $('#selectedcate').val();
                var nghttp = "../../../ajax/recommendHandler.ashx?fn=getrecommendlist&search=" + filtcate + "";
                $http.get(nghttp).success(function (response) {
                    $scope.pageCount = Math.ceil(response.ds.length / percount);
                    responseCache2 = response;
                    var arrayLine = new Array(0);
                    var mypercount = percount > responseCache2.ds.length ? responseCache2.ds.length : percount;
                    for (var i = 0; i < mypercount; i++) {
                        arrayLine.push(responseCache2.ds[i]);
                    }
                    $scope.lines = arrayLine;
                });
                $scope.onPageChange = function () {
                    var arrayLine = new Array(0);
                    var pagec = responseCache2.ds.length - (percount * ($scope.currentPage - 1)) >= percount ? percount * $scope.currentPage : responseCache2.ds.length;
                    for (var i = percount * ($scope.currentPage - 1) ; i < pagec; i++) {
                        arrayLine.push(responseCache2.ds[i]);
                    }
                    $scope.lines = arrayLine;
                };
                //线路列表ed
            }
            loadproduct();

            $scope.filtcategory = function () {
                loadproduct();
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

    </script>
</asp:Content>
