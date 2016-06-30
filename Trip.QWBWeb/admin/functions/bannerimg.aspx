<%@ Page Title="" Language="C#" MasterPageFile="~/modules/admin/master/Header.Master" AutoEventWireup="true" CodeBehind="bannerimg.aspx.cs" Inherits="Trip.JinJiang.H5Web.modules.admin.functions.bannerimg" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <style>
        #example.modal {
            max-height: 700px;
            max-width: 1200px;
            left: 30%;
            top: 30%;
        }

        #example .modal-footer {
            /*margin-top: 50px;*/
            width:240px;
            background-color:#fff;
            border-top:0;
            margin-left:25px;
        }

        #example .col-xs-4 {
            margin-top: 50px;
        }
        .box {
        border:1px solid #ccc
        }

    </style>
    <div class="content-wrapper" ng-app="lhxApp" ng-controller="userCtrl">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>轮播图管理
                    <small>操作</small>
            </h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i>H5</a></li>
                <li>轮播图管理</li>
            </ol>
        </section>

        <form id="example" class="modal hide fade in" style="display: none; height: 700px; width: 1200px;">
            <div class="modal-header">
                <a class="close" data-dismiss="modal">×</a>
                <h3>编辑</h3>
            </div>
            <div class="modal-body">

                <div class="col-xs-8">

                    <div>
                        <div>名称或类型或线路ID:</div>
                        <%--                        <select ng-model="selectedcate" ng-options="x.categoryName for x in linecates">
                        </select>--%>
                        <input id="selectedcate" type="text" style="height: 30px" />
                        <input ng-click="filtcategory()" type="button" value="查找">
                    </div>
                    <div class="box">
                        <!-- /.box-header -->
                        <div class="box-body">
                            <table id="example20" class="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th ng-hide="true">Id</th>
                                        <th>名称</th>
                                        <th>标题</th>
                                        <th>目的地</th>
                                        <th>线路类型</th>
                                        <th>最低价</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr ng-repeat="x in linesad ">
                                        <td ng-hide="true">{{x.lineId}}</td>
                                        <td>{{x.name}}</td>
                                        <td>{{x.title}}</td>
                                        <td>{{x.destinationInfo}}</td>
                                        <td>{{x.lineCategory}}</td>
                                        <td>{{x.originalPrice}}</td>
                                        <td>
                                            <img class="myselectrarion" src='../../img/radiono.png'><a href="#" ng-click="selectedline($event)">选择</a></td>
                                    </tr>
                                </tbody>
                            </table>

                            <pager page-count="pageCount2" current-page="currentPage2" on-page-change="onPageChange2()" first-text="首页" next-text="下一页" prev-text="上一页" last-text="尾页"></pager>
                        </div>
                        <!-- /.box-body -->
                    </div>
                    <!-- /.box -->
                </div>

                <div class="col-xs-4">
                    <div>
                        <div>描述:</div>
                        <div>
                            <input id="alt" type="text" style="height: 30px" />
                        </div>
                    </div>
                    <div>
                        <div>线路名称:</div>
                        <div>
                            <input id="linename" disabled type="text" style="height: 30px" />
                            <input id="linenameid" type="text" style="height: 30px; display: none" />
                        </div>
                    </div>
                    <div>
                        <div>H5Url:(格式遵循http://)</div>
                        <div>
                            <input id="H5Url" type="text" style="height: 30px" />
                        </div>
                    </div>
                    <div>
                        <div>排序:</div>
                        <div>
                            <input id="order" type="number" style="height: 30px" />
                        </div>
                    </div>
                    <div>
                        <div>开始时间:</div>
                        <div>
                            <input id="beginDate" type="date" style="height: 30px"  /><img ng-click="taketodate()" src='../../img/今2.png' style="width:30px;margin-left:10px">
                        </div>
                    </div>
                    <div>
                        <div>结束时间:</div>
                        <div>
                            <input id="endDate" type="date" style="height: 30px" /><img ng-click="takemaxdate()" src='../../img/无穷大.png' style="width:30px;margin-left:10px">
                        </div>
                    </div>
                    <div>
                        <div>图片:尺寸建议(宽412px 高202px)</div>
                        <input id="File1" name="File1" type="file" />
                        <img id="imgurl2" style="height: 80px" />
                    </div>
                    <input type="text" name="txt" id="txt" style="display: none">
                    <input type="button" name="btn" value="btn" id="btn" style="display: none">
                    <div class="modal-footer">
                        <a href="#" class="btn btn-success" ng-click="reloadRoute()">保存</a>
                        <a href="#" class="btn" data-dismiss="modal">关闭</a>
                    </div>
                </div>
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
                                        <th style="width: 10%">描述</th>
                                        <th style="width: 10%">图片</th>
                                        <th style="width: 10%">排序</th>
                                        <th style="width: 10%">H5Url</th>
                                        <th style="width: 10%">开始时间</th>
                                        <th style="width: 10%">结束时间</th>
                                        <th ng-hide="true">线路ID</th> 
                                        <th style="width: 10%">线路名称</th> 
                                        <%--<th style="width: 10%">状态</th>--%> 
                                        <th style="width: 20%">操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr ng-repeat="x in lines">
                                        <td ng-hide="true">{{x.Id}}</td>
                                        <td>{{x.alt}}</td>
                                        <td>
                                            <img src="{{x.imgUrl}}" style="width: 200px; height: 120px"></td>
                                        <td>{{x.order}}</td>
                                        <td>{{x.H5Url}}</td>
                                        <td>{{x.beginDate}}</td>
                                        <td>{{x.endDate}}</td>
                                        <td ng-hide="true">{{x.lineId}}</td>
                                        <td>{{x.name}}</td>
                                        <%--<td>{{x.status===true?'可用':'禁用'}}</td>--%>
                                        <td>
                                            <img src='../../img/edit.png'><a ng-click="edit($event)" data-toggle="modal" href="#example">修改</a>
                                           <%-- <img style="margin-left: 5%" src='../../img/disable.png'><a ng-click="changeen($event)" data-toggle="modal" href="#example0">禁(可)用</a>--%>
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
        $('.treeview-menu .treeviewli3').addClass('active');
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
            percount = 5;
            $scope.add = function () {
                modalclass();
                selectid = "";
                $('#alt')[0].value = "";
                $('#order')[0].value = "1";
                $('#H5Url')[0].value = "";
                //$('#selectedcate')[0].value = "";
            };
            $scope.edit = function ($event) {
                modalclass();
                selectid = $event.path[2].cells[0].innerText;
                $('#alt')[0].value = $event.path[2].cells[1].innerText;
                $('#order')[0].value = $event.path[2].cells[3].innerText;
                $('#H5Url')[0].value = $event.path[2].cells[4].innerText;
                //自带的这个日期控件暂时不知道怎么直接jquery去赋值!之后再做尝试.已解
                $('#beginDate')[0].value = $event.path[2].cells[5].innerText;
                $('#endDate')[0].value = $event.path[2].cells[6].innerText;
                $('#imgurl2')[0].src = $event.path[2].cells[2].childNodes[1].src;

                $('#linenameid')[0].value = $event.path[2].cells[7].innerText;
                $('#linename')[0].value = $event.path[2].cells[8].innerText;

                //$('#linename')[0].value = $event.path[2].cells[1].innerText;
                //$('#linenameid')[0].value = $event.path[2].cells[0].innerText;
            };
            $scope.changeen = function ($event) {
                modalclass1();
                selectid = $event.path[2].cells[0].innerText;
            };
            $scope.delete = function ($event) {
                modalclass2();
                selectid = $event.path[2].cells[0].innerText;
            };
            //线路分类下拉框bg
            var nghttp0 = "../../../ajax/apihandler.ashx?fn=getlinecategorys&status=true";
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

            //线路列表bg
            var nghttp = "../../../ajax/apihandler.ashx?fn=getlinesad";
            $http.get(nghttp).success(function (response) {
                //  debugger
                $scope.pageCount2 = Math.ceil(response.ds.length / percount);
                responseCache2 = response;
                var arrayLine = new Array(0);
                for (var i = 0; i < percount; i++) {
                    arrayLine.push(responseCache2.ds[i]);
                }
                $scope.linesad = arrayLine;
            });
            $scope.onPageChange2 = function () {
                var arrayLine = new Array(0);
                var pagec = responseCache2.ds.length - (percount * ($scope.currentPage2 - 1)) >= percount ? percount * $scope.currentPage2 : responseCache2.ds.length;
                for (var i = percount * ($scope.currentPage2 - 1) ; i < pagec; i++) {
                    arrayLine.push(responseCache2.ds[i]);
                }
                $scope.linesad = arrayLine;
            };
            //线路列表ed

            $scope.filtcategory = function () {
                //线路列表bg
                //debugger
                var filtcate = $('#selectedcate').val(); //$scope.selectedcate.categoryName;
                var nghttp = "../../../ajax/apihandler.ashx?fn=getlinesadsearch&search=" + filtcate + "";
                $http.get(nghttp).success(function (response) {
                    //  debugger
                    $scope.pageCount2 = Math.ceil(response.ds.length / percount);
                    responseCache2 = response;
                    var arrayLine = new Array(0);
                    var mypercount = percount > responseCache2.ds.length ? responseCache2.ds.length : percount;
                    for (var i = 0; i < mypercount; i++) {
                        arrayLine.push(responseCache2.ds[i]);
                    }
                    $scope.linesad = arrayLine;
                });
                $scope.onPageChange2 = function () {
                    var arrayLine = new Array(0);
                    var pagec = responseCache2.ds.length - (percount * ($scope.currentPage2 - 1)) >= percount ? percount * $scope.currentPage2 : responseCache2.ds.length;
                    for (var i = percount * ($scope.currentPage2 - 1) ; i < pagec; i++) {
                        arrayLine.push(responseCache2.ds[i]);
                    }
                    $scope.linesad = arrayLine;
                };
                //线路列表ed
            }
            $scope.selectedline = function (event) {
                //debugger
                $("#linename")[0].value = event.target.parentNode.parentElement.cells[1].innerText;
                $("#linenameid")[0].value = event.target.parentNode.parentElement.cells[0].innerText;
                $(".myselectrarion").attr('src', "../../img/radiono.png");
                event.target.previousSibling.src = "../../img/radiook.png";
            }

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
            $scope.taketodate = function () {
                $('#beginDate')[0].value = getNowFormatDateM();
            }
            $scope.takemaxdate = function () {
                $('#endDate')[0].value = '2100-01-01';
            }
            $scope.reloadRoute = function () {
                var path = document.getElementById("File1").value;
                var img = document.getElementById("img1");
                if ($.trim(path) == "" && $('#imgurl2')[0].src === "") {
                    alert("请选择要上传的文件");
                    return;
                }
                //如果本来有图且没有去置换该图,则不需要上传图片
                if ($('#imgurl2')[0].src !== "" && $.trim(path) == "") {
                    path = $('#imgurl2')[0].src;
                }
                var linenameid = document.getElementById("linenameid").value;
                var H5Url = document.getElementById("H5Url").value;
                if (!linenameid && !H5Url) {
                    alert("请选择线路或填写H5Url");
                    return;
                }
                if (linenameid && H5Url) {
                    alert("不允许同时选择线路和填写H5Url");
                    return;
                }

                //日期时间限制bg
                if (!$('#beginDate')[0].value) {
                    alert("请选择开始时间");
                    return;
                }
                if (!$('#endDate')[0].value) {
                    alert("请选择结束时间");
                    return;
                }
                var datenow = new Date();

                var mybeginDate = new Date();
                mybeginDate.setFullYear($('#beginDate')[0].value.split("-")[0], $('#beginDate')[0].value.split("-")[1] - 1, $('#beginDate')[0].value.split("-")[2]);
                var myendDate = new Date();
                myendDate.setFullYear($('#endDate')[0].value.split("-")[0], $('#endDate')[0].value.split("-")[1] - 1, $('#endDate')[0].value.split("-")[2]);
                if (mybeginDate < datenow) {
                    alert("开始时间不能早于今天");
                    return;
                }
                if (myendDate < datenow) {
                    alert("结束时间不能早于今天");
                    return;
                }
                if (mybeginDate > myendDate) {
                    alert("开始时间不能早于结束时间");
                    return;
                }
                //日期时间限制ed

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
                        url: '../../../ajax/bannerImgHandler.ashx?fn=addbannerimg',
                        type: "post",
                        data: { alt: $('#alt')[0].value, lineId: linenameid, order: $('#order')[0].value, H5Url: $('#H5Url')[0].value, beginDate: $('#beginDate')[0].value, endDate: $('#endDate')[0].value, path: path },
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
                        url: '../../../ajax/bannerImgHandler.ashx?fn=editbannerimg',
                        type: "post",
                        data: { alt: $('#alt')[0].value, Id: selectid, lineId: linenameid, order: $('#order')[0].value, H5Url: $('#H5Url')[0].value, beginDate: $('#beginDate')[0].value, endDate: $('#endDate')[0].value, path: path },
                        dataType: "text"
                    });

                }

            }

        });

    </script>
</asp:Content>
