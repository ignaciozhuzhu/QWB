function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}

function getCookie2(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

function setCookie(c_name, value, expiredays) {
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = c_name + "=" + escape(value) +
    ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}

//格式化日期
function FormatDate(strTime) {
    var date = new Date(strTime);
    var month;
    var day;
    var year;
    if (date.getMonth() + 1 < 10)
        month = '0' + (date.getMonth() + 1);
    else
        month = date.getMonth() + 1;
    if (date.getDate() < 10)
        day = '0' + date.getDate();
    else
        day = date.getDate();
    return month + "-" + day;
}
function FormatDateYear(strTime) {
    var date = new Date(strTime);
    var month;
    var day;
    var year;
    year = date.getFullYear();
    if (date.getMonth() + 1 < 10)
        month = '0' + (date.getMonth() + 1);
    else
        month = date.getMonth() + 1;
    if (date.getDate() < 10)
        day = '0' + date.getDate();
    else
        day = date.getDate();
    return year + '-' + month + "-" + day;
}

function getNowFormatDateM() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    //+ " " + date.getHours() + seperator2 + date.getMinutes()
    //+ seperator2 + date.getSeconds();
    return currentdate;
}

function FormatDateTimeDiff(difftime) {
    //1800000;半个小时的毫秒数
    var d = new Date();
    var t = d.getTime();
    t += difftime;//半个小时的毫秒数
    d = new Date(t);
    return d.getHours() + ':' + (d.getMinutes() < 10 ? ('0' + d.getMinutes()) : d.getMinutes());
}

//转换为date格式
var parserDate = function (date) {
    date = date.trim();
    var year = date.substring(0, 4);
    var month = date.substring(5, 7);
    var dd = date.substring(8, 10);
    date = year + "/" + month + "/" + dd
    date = (date + ' 00:00:00').toString();
    var t = Date.parse(date);
    if (!isNaN(t)) {
        return new Date(Date.parse(date.replace(/-/g, "/")));
    } else {
        return new Date();
    }
};

//两个YY-MM-DD格式的日期相减得到的相差日期函数 ,这是加一天的
function diffDateBy2days(date1, date2) {
    return parseInt(((new Date(date2.replace(/-/g, "/"))).getTime() - (new Date(date1.replace(/-/g, "/"))).getTime()) / (1000 * 60 * 60 * 24)) + 1;
}
//两个YY-MM-DD格式的日期相减得到的相差日期函数 ,这是自定义加不加,默认不加
function diffDateBy2days2(date1, date2, addday) {
    var addday = arguments[2] ? arguments[2] : 0;//设置参数addday的默认值为0
    return parseInt(((new Date(date2.replace(/-/g, "/"))).getTime() - (new Date(date1.replace(/-/g, "/"))).getTime()) / (1000 * 60 * 60 * 24)) + addday;
}

//获取当前地
function getPro() {
    var url = 'http://chaxun.1616.net/s.php?type=ip&output=json&callback=?&_=' + Math.random();
    $.getJSON(url, function (data) {
        var pro = data.Isp.substring(data.Isp.indexOf(' ') - 3, data.Isp.indexOf(' ') - 1);
        if (pro === "齐齐")
            pro = "齐齐哈尔"
        if (pro === "哈尔")
            pro = "哈尔滨"
        if (pro === "呼和")
            pro = "呼和浩特"
        if (pro === "乌鲁")
            pro = "乌鲁木齐"
        if (pro === "石家")
            pro = "石家庄"
        if (pro === "美地")
            pro = "杭州"
        //$("#beginProtxt")[0].placeholder = pro + '出发';
        $("#nowPro").append(pro);
    });

}

function getcategoryNameByCode(categorycode) {
    if (categorycode === "GROUPTRIP")
        return "跟团游";
    if (categorycode === "FREETRIP")
        return "自由行";
    if (categorycode === "SHIP")
        return "游轮";
}

//get the IP addresses associated with an account
function getIPs(callback) {
    var ip_dups = {};

    //compatibility for firefox and chrome
    var RTCPeerConnection = window.RTCPeerConnection
        || window.mozRTCPeerConnection
        || window.webkitRTCPeerConnection;

    //bypass naive webrtc blocking
    if (!RTCPeerConnection) {
        var iframe = document.createElement('iframe');
        //invalidate content script
        iframe.sandbox = 'allow-same-origin';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        var win = iframe.contentWindow;
        window.RTCPeerConnection = win.RTCPeerConnection;
        window.mozRTCPeerConnection = win.mozRTCPeerConnection;
        window.webkitRTCPeerConnection = win.webkitRTCPeerConnection;
        RTCPeerConnection = window.RTCPeerConnection
            || window.mozRTCPeerConnection
            || window.webkitRTCPeerConnection;
    }

    //minimal requirements for data connection
    var mediaConstraints = {
        optional: [{ RtpDataChannels: true }]
    };

    //firefox already has a default stun server in about:config
    //    media.peerconnection.default_iceservers =
    //    [{"url": "stun:stun.services.mozilla.com"}]
    var servers = undefined;

    //add same stun server for chrome
    if (window.webkitRTCPeerConnection)
        servers = { iceServers: [{ urls: "stun:stun.services.mozilla.com" }] };

    //construct a new RTCPeerConnection
    var pc = new RTCPeerConnection(servers, mediaConstraints);

    //listen for candidate events
    pc.onicecandidate = function (ice) {

        //skip non-candidate events
        if (ice.candidate) {

            //match just the IP address
            var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/
            var ip_addr = ip_regex.exec(ice.candidate.candidate)[1];

            //remove duplicates
            if (ip_dups[ip_addr] === undefined)
                callback(ip_addr);

            ip_dups[ip_addr] = true;
        }
    };

    //create a bogus data channel
    pc.createDataChannel("");

    //create an offer sdp
    pc.createOffer(function (result) {

        //trigger the stun server request
        pc.setLocalDescription(result, function () { }, function () { });

    }, function () { });
}
//get the IP addresses associated with an account
function getIPs2(callback) {
    var ip_dups = {};
    //compatibility for firefox and chrome
    var RTCPeerConnection = window.RTCPeerConnection
        || window.mozRTCPeerConnection
        || window.webkitRTCPeerConnection;
    var useWebKit = !!window.webkitRTCPeerConnection;
    //bypass naive webrtc blocking using an iframe
    if (!RTCPeerConnection) {
        //NOTE: you need to have an iframe in the page right above the script tag
        //
        //<iframe id="iframe" sandbox="allow-same-origin" style="display: none"></iframe>
        //<script>...get1Ps called in here...
        //
        var win = iframe.contentWindow;
        RTCPeerConnection = win.RTCPeerConnection
            || win.mozRTCPeerConnection
            || win.webkitRTCPeerConnection;
        useWebKit = !!win.webkitRTCPeerConnection;
    }
    //minimal requirements for data connection
    var mediaConstraints = {
        optional: [{ RtpDataChannels: true }]
    };
    var servers = { iceServers: [{ urls: "stun:stun.services.mozilla.com" }] };
    //construct a new RTCPeerConnection
    var pc = new RTCPeerConnection(servers, mediaConstraints);
    function handleCandidate(candidate) {
        //match just the IP address
        var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/
        var ip_addr = ip_regex.exec(candidate)[1];
        //remove duplicates
        if (ip_dups[ip_addr] === undefined)
            callback(ip_addr);
        ip_dups[ip_addr] = true;
    }
    //listen for candidate events
    pc.onicecandidate = function (ice) {
        //skip non-candidate events
        if (ice.candidate)
            handleCandidate(ice.candidate.candidate);
    };
    //create a bogus data channel
    pc.createDataChannel("");
    //create an offer sdp
    pc.createOffer(function (result) {
        //trigger the stun server request
        pc.setLocalDescription(result, function () { }, function () { });
    }, function () { });
    //wait for a while to let everything done
    setTimeout(function () {
        //read candidate info from local description
        var lines = pc.localDescription.sdp.split('\n');
        lines.forEach(function (line) {
            if (line.indexOf('a=candidate:') === 0)
                handleCandidate(line);
        });
    }, 1000);
}
//insert IP addresses into the page


var mybuicss = {
    border: 'none',
    padding: '15px',
    backgroundColor: '#000',
    '-webkit-border-radius': '10px',
    '-moz-border-radius': '10px',
    opacity: .5,
    color: '#fff'
}

//暂时先设置自动延迟为1.5秒吧
function blockmyui(msg) {
    var time = arguments[1] ? arguments[1] : 1000;
    $.blockUI({
        css: mybuicss,
        message: msg
    });
    setTimeout($.unblockUI, time);
}
function layermyui(msg) {
    var time = arguments[1] ? arguments[1] : 2000;
    layer.msg(msg, {
        time: time
    })
}

//接口又挂了,一天不知道要挂几次.随时挂,时时挂.调用接口返回后每次直接调用该方法以确认不是自方问题.
function find404admin(response) {
    var restext = "";
    try {
        restext = response.indexOf('404');
    }
    catch (e) {
    }
    if ((restext !== "" && restext > -1) || response === "") {
        layermyui('不好意思接口挂了,返回404,请联系网络管理员!', 3000);
        return;
    }
}

function finderrorMsgadmin(response) {
    var responsearr = eval("(" + response + ")");
    if (responsearr.errorMsg === null)
        return false;
    else {
        return responsearr.errorMsg;
    }
}

function isEmail(str) {
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    return reg.test(str);
}
function isPassword(str) {
    var reg = /^[\w\W]{6,}$/;
    return reg.test(str);
}

function isIdCardNo(str) {
    reg = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/;
    return reg.test(str.toUpperCase());
}

//获取链接参数,倒序排列
function getpbyurl(typei) {
    function subs(href) {
        return href.substring(0, href.lastIndexOf('/'));
    }
    var geturl = location.href;

    if (typei == 1)
    { }
    else {
        for (var i = 0; i < typei - 1; i++) {
            geturl = subs(geturl);
        }
    }
    return geturl.substring(geturl.lastIndexOf('/') + 1, geturl.length);
}

//获取URL的参数
function request(paras) {
    var url = location.href;
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = {}
    for (i = 0, j = decodeURI(paraString[0]) ; i < 1; i++) {
        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if (typeof (returnValue) == "undefined") {
        return "";
    } else {
        return returnValue;
    }
}

//获取URL的参数
function request2(paras) {
    var url = location.href;
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = {}
    for (i = 0, j = decodeURI(paraString[0]) ; i < 1; i++) {
        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if (typeof (returnValue) == "undefined") {
        return "";
    } else {
        returnValue = returnValue.substring(0, returnValue.indexOf("#"));
        return returnValue;
    }
}


function sortbydepartDate(a, b) {
    return a.departDate - b.departDate;
}
function sortbydayNumber(a, b) {
    return a.dayNumber - b.dayNumber;
}

function replaceCategory(lineCategory) {
    lineCategory = lineCategory.toUpperCase();
    lineCategory = lineCategory.replace("FREETRIP", "自由行");
    lineCategory = lineCategory.replace("GROUPTRIP", "跟团游");
    lineCategory = lineCategory.replace("NEARBY", "周边游");
    lineCategory = lineCategory.replace("DOMESTIC", "国内游");
    lineCategory = lineCategory.replace("OUTBOUND", "出境游");
    lineCategory = lineCategory.replace("SALES", "特价游");
    lineCategory = lineCategory.replace("SHIP", "邮轮");
    lineCategory = lineCategory.replace("HOT", "热门推荐");
    lineCategory = lineCategory.replace("SALE", "特价推荐");
    return lineCategory;
}

//tdk seo
function tkdfunc(title, keywords, description) {
    $("title")[0].innerText = title;
    $('[name=keywords]')[0].content = keywords;
    $('[name=description]')[0].content = description;
}

function getmyweekday(datenow) {
    var week = "周" + "日一二三四五六".split("")[datenow.getDay()];
    return week;
}

// 遍历数组法,最简单数组去重法
function unique1(array) {
    var n = []; //一个新的临时数组
    //遍历当前数组
    for (var i = 0; i < array.length; i++) {
        //如果当前数组的第i已经保存进了临时数组，那么跳过，
        //否则把当前项push到临时数组里面
        if (n.indexOf(array[i]) == -1) n.push(array[i]);
    }
    return n;
}

//创建去重复的对象,以车型组为例
//传入参数:response对象; 输出 Mygroup
function uniqueObject(response) {
    var Mygroup = new Array();
    var mygroup;
    function Groups(pram) {
        this.pram = pram;
    }
    var Mygroup2 = new Array();
    for (var i = 0; i < response.list.length; i++) {
        Mygroup2[i] = response.list[i].group;
    }
    var uniquegroup = unique1(Mygroup2);
    for (var i = 0; i < uniquegroup.length; i++) {
        mygroup = new Groups(uniquegroup[i]);
        Mygroup.push(mygroup);
    }
    return Mygroup;
}


//最大乘坐人数实时限制.a,b一般为控件id.
function maxpassenger(a, b, adults, kids, max_seat) {
    if (parseInt(adults) + parseInt(kids) >= max_seat) {
        $(a)[0].children[0].children[2].disabled = true;
        $(b)[0].children[0].children[2].disabled = true;
    }
    else {
        $(a)[0].children[0].children[2].disabled = false;
        $(b)[0].children[0].children[2].disabled = false;
    }
}


//air_service.html
var timechange = function () {
    var pickupTime = $("#pickupTime")[0].value;
    pickupTime = pickupTime.substr(0, 2);
    if (pickupTime.substr(0, 1) == 0)
        pickupTime = pickupTime.substr(1, 1);
    //22点以后,7点以前 加收夜间服务费
    if (pickupTime >= 22 || pickupTime < 7) {
        var nighttipcost = 100;
        $("#nighttipsimg").css("display", "block");
        $("#nighttipcost").empty().append(nighttipcost);
        var total = parseInt($("#totalcost")[0].innerText) + nighttipcost;
        $("#totalcost").empty().append(total);
    }
    else {
        $("#nighttipsimg").css("display", "none");
    }
}

//显示或隐藏城市的国家
var displaynonecountry = function (classname) {
    setTimeout(function () {
        //隐藏没有热门城市的国家
        var mylen = $(classname + " .mycitynameclass").length;
        for (var i = 0; i < mylen; i++) {
            if (!$(classname + " .mycitynameclass")[i].nextElementSibling) {
                $(classname + " .mycitynameclass")[i].className = "displaynonecity";
                i--;
                mylen--;
            }
        }
        //显示回有热门城市的国家
        var mylen2 = $(classname + " .displaynonecity").length;
        for (var m = 0; m < mylen2; m++) {
            if ($(classname + " .displaynonecity")[m].nextElementSibling) {
                $(classname + " .displaynonecity")[m].className = "mycitynameclass";
                m--;
                mylen2--;
            }
        }
    }, 200);
}