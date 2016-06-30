
__CreateJSPath = function (js) {
    var scripts = document.getElementsByTagName("script");
    var path = "";
    for (var i = 0, l = scripts.length; i < l; i++) {
        var src = scripts[i].src;
        if (src.indexOf(js) != -1) {
            var ss = src.split(js);
            path = ss[0];
            break;
        }
    }
    var href = location.href;
    href = href.split("#")[0];
    href = href.split("?")[0];
    var ss = href.split("/");
    ss.length = ss.length - 1;
    href = ss.join("/");
    if (path.indexOf("https:") == -1 && path.indexOf("http:") == -1 && path.indexOf("file:") == -1 && path.indexOf("\/") != 0) {
        path = href + "/" + path;
    }
    return path;
}

var bootPATH = __CreateJSPath("boot.js");

//miniui
document.write('<script src="' + bootPATH + 'jquery-1.6.2.min.js" type="text/javascript"></sc' + 'ript>');
document.write('<script src="' + bootPATH + 'miniui/miniui.js" type="text/javascript" ></sc' + 'ript>');
document.write('<link href="' + bootPATH + 'miniui/themes/default/miniui.css" rel="stylesheet" type="text/css" />');
document.write('<link href="' + bootPATH + 'miniui/themes/icons.css" rel="stylesheet" type="text/css" />');
document.write('<script src="/script/base.js" type="text/javascript" ></sc' + 'ript>');
//skin

document.write('<link href="' + bootPATH + 'miniui/themes/blue2010/skin.css" rel="stylesheet" type="text/css" />');




////////////////////////////////////////////////////////////////////////////////////////

function getCookie(check_name) {
    var a_all_cookies = document.cookie.split(';');
    var a_temp_cookie = '';
    var cookie_name = '';
    var cookie_value = '';
    var b_cookie_found = false;
    for (i = 0; i < a_all_cookies.length; i++) {
        a_temp_cookie = a_all_cookies[i].split('=');
        cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
        if (cookie_name == check_name) {
            b_cookie_found = true;
            if (a_temp_cookie.length > 1)
                cookie_value = unescape(a_temp_cookie[1].replace(/^\s+|\s+$/g, ''));
            return cookie_value;
        }
        a_temp_cookie = null;
        cookie_name = '';
    }
    if (!b_cookie_found)
        return null;
}
function setCookie(sName, sValue) {
    try {
        var sCookie = sName + "=" + encodeURIComponent(sValue);
        document.cookie = sCookie;
    }
    catch (e) { }
}
function jsdatetostring(d) {
    if (d == null || d == "") {
        return "";
    } else {
        return d.getFullYear() + "-" + (d.getMonth() / 1 + 1) + "-" + (d.getDate() / 1);
    }

}
//获取URL的参数
function request(paras) {
    var url = location.href;
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = {}
    for (i = 0; j = paraString[i]; i++) {
        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if (typeof (returnValue) == "undefined") {
        return "";
    } else {
        return returnValue;
    }
}
String.prototype.replaceAll = function (reallyDo, replaceWith, ignoreCase) {
    if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
        return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi" : "g")), replaceWith);
    } else {
        return this.replace(reallyDo, replaceWith);
    }
}

OpenWindow = function (config) {
    config.title = config.title ? config.title : "选择窗体";
    config.showModal = config.showModal ? config.showModal : false;
    config.width = config.width ? config.width : 650;
    config.height = config.height ? config.height : 400;

    function defaultCallback(o, action) {
        var iframe = o.getIFrameEl();
        var data = iframe.contentWindow.GetData();
        data = mini.clone(data);
        if (data) {
            return data;
        } else {
            return null;
        }
    }

    config.callback = config.callback ? config.callback : defaultCallback;

    var win = mini.open({
        title: config.title,
        url: config.url,
        showModal: config.showModal,
        width: config.width,
        height: config.height,
        ondestroy: function (action) {
            var data = defaultCallback(this, action);
            if (config.callback != defaultCallback)
                config.callback(data);
        }
    });

}

//调整后的方法。可以根据action操作不同返回不同的返回值
OpenWindowNew = function (config) {
    config.title = config.title ? config.title : "选择窗体";
    config.showModal = config.showModal ? config.showModal : false;
    config.width = config.width ? config.width : 650;
    config.height = config.height ? config.height : 400;

    function defaultCallback(o, action) {
        var iframe = o.getIFrameEl();
        var data = iframe.contentWindow.GetData(action);
        data = mini.clone(data);
        if (data) {
            return data;
        } else {
            return null;
        }
    }

    config.callback = config.callback ? config.callback : defaultCallback;

    var win = mini.open({
        title: config.title,
        url: config.url,
        showModal: config.showModal,
        width: config.width,
        height: config.height,
        ondestroy: function (action) {
            var data = defaultCallback(this, action);
            if (config.callback != defaultCallback)
                config.callback(data);
        }
    });

}
