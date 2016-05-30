var d = (document.domain || "").match(/ctrip(travel)?\.com$/);
if (d) window.__uidc_init = new Date * 1;
var _ = window,
    __ = document,
    ___ = __.documentElement,
    Ctrip = {
    module: {}
},
    $topWin = _,
    $$ = {};
_.module = {};
_.module.event = {};
(function () {
    try {
        for (;;) {
            var a = $topWin.parent;
            if (a && a != $topWin && a.Ctrip) $topWin = a;
            else break
        }
    } catch(b) {}
})();
$$.browser = function (a) {
    var b = /opera/.test(a),
        h = /chrome/.test(a),
        c = /webkit/.test(a),
        l = !h && /safari/.test(a),
        f = !b && /msie/.test(a),
        e = f && /msie 7/.test(a),
        g = f && /msie 8/.test(a),
        i = f && /msie 9/.test(a),
        n = f && !e && !g && !i,
        m = !c && /gecko/.test(a),
        o = m && /rv:1\.8/.test(a);
    m && /rv:1\.9/.test(a);
    return {
        IE: f,
        IE6: n,
        IE7: e,
        IE8: g,
        IE9: i,
        Moz: m,
        FF2: o,
        Opera: b,
        Safari: l,
        WebKit: c,
        Chrome: h
    }
}(navigator.userAgent.toLowerCase());
$extend(Date.prototype, {
    dateValue: function () {
        return new Date(this.getFullYear(), this.getMonth(), this.getDate())
    },
    addDate: function (a) {
        return new Date(this.getFullYear(), this.getMonth(), this.getDate() + a)
    },
    toStdString: function () {
        return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate()
    },
    toEngString: function () {
        return "Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec".split("|")[this.getMonth()] + "-" + this.getDate() + "-" + this.getFullYear()
    }
});
$$.status = new
function () {
    this.load = this.domReady = !1;
    this.regEventCount = this.busy = 0;
    this.regEventHash = {};
    this.charset = (((_.__.charset ? _.__.charset : _.__.characterSet) || "").match(/^(gb2312|big5|utf-8)$/gi) || "gb2312").toString().toLowerCase();
    this.version = {
        gb2312: "zh-cn",
        big5: "zh-tw",
        "utf-8": "en"
    }[this.charset];
    this.alertDiv = _.__.getElementById("tuna_alert");
    this.container = _.__.getElementById("jsContainer");
    this.saveStatus = _.__.getElementById("jsSaveStatus");
    this.back = !1;
    this.pageValue = {
        data: {}
    };
    this.globalValue = {};
    this.today = (new Date).toStdString()
};
$$.module = {
    iframe: [],
    list: {},
    tab: {},
    selectAll: {},
    address: {
        source: {}
    },
    calendar: {},
    init: []
};
$$.string = {
    "zh-cn": {
        display: "@\u25b2|\u25bc@\u663e\u793a|\u9690\u85cf@"
    },
    "zh-tw": {
        display: "@\u25b2|\u25bc@\u986f\u793a|\u96b1\u85cf@"
    },
    en: {
        display: "@Show|Hidden@"
    }
}[$$.status.version];

function $extend(a) {
    for (var b = 1; b < arguments.length; b++) {
        var h = arguments[b],
            c;
        for (c in h) h.hasOwnProperty(c) && (a[c] = h[c])
    }
    return a
}
_.$s2t = function (a) {
    return a
};

function evtDomReady(a) {
    function b() {
        if (!$$.status.domReady) {
            var b;
            $$.status.domReady = !0;
            if ("domready" in _.module.event) for (; b = _.module.event.domready.shift();) if (b.enabled) try {
                b.func(a)
            } catch(c) {
                $t("domReady Error", [b.func, _])
            }
        }
    }
    $$.browser.WebKit || $$.browser.Opera ? setTimeout(b, 1) : b()
}
if ($$.browser.Moz) __.addEventListener("DOMContentLoaded", evtDomReady, !1);
else if ($$.browser.IE) try {
    _.frameElement ||
    function () {
        try {
            ___.doScroll("left")
        } catch(a) {
            setTimeout(arguments.callee, 50);
            return
        }
        evtDomReady()
    }()
} catch(e$$9) {} else if ($$.browser.WebKit) var domReadyTimer = setInterval(function () {
    if (__.readyState == "loaded" || __.readyState == "complete") clearInterval(domReadyTimer),
    evtDomReady()
},
10);
var CtripJsLoader = function (a, b) {
    var h = function () {
        this.jsExecList = [];
        this.mainDom = b.getElementsByTagName("head")[0];
        this.bDom = b.getElementsByTagName("body")[0];
        this.jsInterval = ""
    };
    h.prototype = {
        isIEorOpera: function () {
            return a.opera && a.opera.toString() == "[object Opera]" || a.ActiveXObject
        },
        createObject: function (c) {
            var a = c.key,
                f = c.file,
                e;
            this.isIEorOpera() ? (e = new Image, e.src = f, e.onerror = function () {
                c.loaded = !0
            }) : (e = b.createElement("object"), e.id = "object_" + a, e.data = f, e.style.display = "none", this.bDom.appendChild(e), e.onload = function () {
                c.loaded = !0
            });
            return e
        },
        removeObject: function () {
            return !0
        },
        createScript: function (c) {
            var a = this,
                f = b.createElement("script");
            f.type = "text/javascript";
            f.charset = c.charset;
            f.src = c.loaded ? c.file : c.bakfile;
            f.id = "script_" + c.key;
            this.mainDom.appendChild(f);
            c.created = !0;
            f.readyState ? f.onreadystatechange = function () {
                if (f.readyState == "loaded" || f.readyState == "complete") this.onreadystatechange = null,
                a.handleModule(),
                c.callback != null && eval(c.callback)(),
                c.exec = !0,
                a.handleScriptLoad(c.key)
            } : f.onload = function () {
                a.handleModule();
                c.callback != null && eval(c.callback)();
                c.exec = !0;
                a.handleScriptLoad(c.key)
            }
        },
        handleModule: function () {
            if ($$ && $$.module && $$.module.queue) {
                var a = [],
                    b;
                for (b in $$.module.queue) typeof $$.module.queue[b] == "object" && a.push(b);
                if (a.length != 0) {
                    b = 0;
                    for (var f = a.length; b < f; b++) {
                        var e = a[b];
                        if (Ctrip.module[e]) {
                            for (var g = 0, h = $$.module.queue[e].length; g < h; g++) new Ctrip.module[e]($$.module.queue[e][g]);
                            delete $$.module.queue[e]
                        }
                    }
                }
            }
        },
        handleScriptLoad: function () {
            this.jsExecList.shift();
            this.jsExecList.length == 0 && clearInterval(this.jsInterval)
        },
        genData: function (a) {
            for (var b = document.getElementById("releaseno"), b = b == null ? "" : b.value, f = 0, e = a.length; f < e; f++) {
                var g = a[f];
                this.jsExecList.push({
                    key: "k" + f,
                    file: g[0] + b,
                    bakfile: g[2] ? g[0].replace("webresource.c-ctrip.com", "webresource.ctrip.com") + b : g[0] + b,
                    loaded: !1,
                    exec: !1,
                    created: !1,
                    needLoadBak: !1,
                    charset: g[2] ? g[1] : "",
                    callback: g[3]
                })
            }
            return this.jsExecList.concat()
        },
        scriptAll: function (a) {
            var b = this;
            this.orilist = this.genData(a);
            for (var a = 0, f = this.orilist.length; a < f; a++) this.script(this.orilist[a]);
            this.jsInterval = setInterval(function () {
                b.createScriptAll()
            },
            100)
        },
        script: function (a) {
            this.createObject(a);
            setTimeout(function () {
                a && !a.loaded && (a.needLoadBak = !0)
            },
            1500)
        },
        createScriptAll: function () {
            var a = this.jsExecList[0];
            if (!a.created || a.exec)(a.loaded || a.needLoadBak) && this.createScript(a)
        }
    };
    return h
}(window, document),
    adManager = function () {
    this.adsScriptList = [];
    this.count = 0
};
adManager.prototype = {
    init: function (a) {
        this.isMulti = a.isMulti;
        this.adsList = a.adsList;
        this.g_adArr = [];
        this.genData()
    },
    getKey: function (a) {
        a = a.match(/\?user=([^&]+)/);
        if (a != null) return a[1];
        return null
    },
    genData: function () {
        for (var a = 0, b = this.adsList.length; a < b; a++) try {
            this.initScript(this.adsList[a], !1)
        } catch(h) {}
    },
    initScript: function (a, b) {
        var h = this.getKey(a),
            c = $c("script"),
            l = this;
        c.type = "text/javascript";
        c.src = a;
        c.id = "ads_" + h;
        this.count++;
        document.getElementsByTagName("head")[0].appendChild(c);
        if (b) c.readyState ? c.onreadystatechange = function () {
            if (c.readyState == "loaded" || c.readyState == "complete") this.onreadystatechange = null,
            l.handleCallback(this.src)
        } : c.onload = function () {
            l.handleCallback(this.src)
        }
    },
    handleCallback: function (a) {
        if (this.g_adArr.length != 0) a = this.getKey(a),
        $(a).innerHTML = this.g_adArr.join(""),
        this.g_adArr = [],
        this.removeScript(a)
    },
    removeScript: function (a) {
        a = $("ads_" + a);
        document.getElementsByTagName("head")[0].removeChild(a);
        this.count--;
        if (this.count == 0) document.write = this.DWFn,
        this.isMulti && this.initMultiAds()
    },
    getCount: function () {
        return this.count
    },
    initMultiAds: function () {
        function a(a) {
            return function () {
                b(a)
            }
        }
        function b(a) {
            function c() {
                e[j].style.display = "none";
                e[j].style.filter = "";
                q = !1;
                o = setTimeout(function () {
                    b(null)
                },
                p === null ? l : 200)
            }
            if (a !== null) if (a == k) return;
            else p = a;
            clearTimeout(o);
            if (!q) if (q = !0, j = k, k = (k + 1) % e.length, p !== null && (k = p), p = null, n.parentNode.insertBefore(e[j], n), e[j].style.position = "relative", e[k].style.position = "absolute", e[k].style.display = "", m[j].className = "", m[k].className = "pic_current", $$.browser.IE) h.filters[0].apply(),
            e[j].style.display = "none",
            h.filters[0].play(),
            c();
            else var g = 100,
                i = setInterval(function () {
                g = Math.max(g - f, 0);
                e[j].style.opacity = g / 100;
                e[j].style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + g + ")";
                if (!g) clearInterval(i),
                e[j].style.opacity = 100,
                c()
            },
            20)
        }
        for (var h = $("adpic"), c = $("adpicBtn"), l = 5E3, f = $$.browser.IE ? 25 : 5, e = [], g = h.$("div"), i = 0; i < g.length; i++) g[i].style.display = "none",
        e.push(g[i]);
        var n = document.createElement("a");
        n.style.display = "none";
        h.appendChild(n);
        if (e.length) {
            if (c) {
                c.innerHTML = "";
                for (var m = [], i = 0; i < e.length; i++) {
                    g = $c("li");
                    if (!i) g.className = "pic_current";
                    g.innerHTML = i + 1;
                    m.push(g);
                    c.appendChild(g);
                    g.onclick = a(i)
                }
            }
            var o, q = !1,
                j = 0,
                k = 0,
                p = null;
            if ($$.browser.IE) h.style.position = "relative",
            h.style.filter = "progid:DXImageTransform.Microsoft.Fade(duration=1)";
            e[j].style.display = "";
            o = setTimeout(function () {
                b(null)
            },
            l)
        }
    }
};

function insertCS() {
    if (d) {
        var a = document.createElement("script");
        a.type = "text/javascript";
        a.src = "http://www." + (d[1] ? "dev.sh." + d[0] : d[0]) + "/rp/uiScript.asp";
        document.getElementsByTagName("head")[0].appendChild(a)
    }
}
function insertAds() {
    if (config_adm.length == 0) return !1;
    var a = new adManager;
    a.DWFn = document.write;
    document.write = function (c) {
        if (arguments.callee.caller == null) {
            var b = a.getKey(c);
            b != null && /^\<a/.test(c) ? ($(b).innerHTML = c, a.removeScript(b)) : a.g_adArr.push(c)
        } else a.DWFn.apply(this, arguments)
    };
    for (var b = 0, h = config_adm.length; b < h; b++) a.init(config_adm[b])
};