function t(t) {
    n.request(t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getGlobalData = function(t) {
    for (var e, i = o.globalData, s = t.split("."), a = 0; a < s.length; a++) {
        var c = i[s[a]];
        if (a == s.length - 1) n.isNotEmpty(c) && (e = c); else {
            if (n.isEmpty(c)) break;
            i = c;
        }
    }
    return n.isEmpty(e) && (e = ""), e;
}, exports.setGlobalSessionKey = function(t) {
    o.globalData.sessionKey = t;
}, exports.getGlobalSessionKey = function() {
    return o.globalData.sessionKey || "";
}, exports.setGlobalAccessToken = function(t) {
    o.globalData.accessToken = t;
}, exports.getGlobalAccessToken = function() {
    return o.globalData.accessToken || "";
}, exports.setGlobalRegistered = function(t) {
    o.globalData.registered = t;
}, exports.getGlobalRegistered = function() {
    return o.globalData.registered || !1;
}, exports.setGlobalCardInfo = function(t) {
    o.globalData.cardInfo = t;
}, exports.getGlobalCardInfo = function() {
    return o.globalData.cardInfo || [];
}, exports._request = t, exports.login = function(t, o) {
    n.login(t, o);
}, exports.needSubMessage = function(t, o) {
    var i = e.subMessageArrays[t] || [];
    wx.getSetting({
        withSubscriptions: !0,
        success: function(t) {
            var e = t.subscriptionsSetting || {};
            if (n.isFalse(e.mainSwitch)) return console.warn("订阅消息失败：用户关闭了主开关"), void (o && o(!1));
            var s = e.itemSettings || {}, a = i.filter(function(t) {
                return n.isEmpty(s[t]);
            });
            o && o(a.length > 0);
        },
        fail: function() {
            o && o(!1);
        }
    });
}, exports.authSubMessage = function(t, o, i, s) {
    var a = wx.canIUse("requestSubscribeMessage"), c = e.subMessageArrays[o] || [];
    a && "function" == typeof wx.requestSubscribeMessage ? wx.getSetting({
        withSubscriptions: !0,
        success: function(o) {
            var e = o.subscriptionsSetting || {};
            if (n.isFalse(e.mainSwitch)) return console.warn("订阅消息失败：用户关闭了主开关"), void (i && i(t));
            wx.requestSubscribeMessage({
                tmplIds: c,
                success: function(t) {},
                fail: function(t) {},
                complete: function(n) {
                    s.setData({
                        showTip: !1,
                        tipPosition: 0
                    }), i && i(t);
                }
            });
        },
        fail: function() {
            i && i(t);
        }
    }) : i && i(t);
}, exports.throttle = function(t, n) {
    null != n && void 0 != n || (n = 1500);
    var o = null;
    return function() {
        var e = +new Date();
        (e - o > n || !o) && (t.apply(this, arguments), o = e);
    };
};

var n = require("./wxutil.js"), o = getApp(), e = getApp().hospitalInfo;

exports.getPhoneNumber = function(n, o, e) {
    t({
        loading: !1,
        url: "/api/userInfo/decryPhoneNumber.json",
        method: "post",
        data: n,
        success: function(t) {
            o && o(t);
        },
        fail: function(t) {
            e && e(t);
        }
    });
}, exports.getRealnameinfo = function(n, o, e) {
    t({
        loading: !1,
        url: "/api/userInfo/decryPatientIdCard",
        method: "post",
        data: n,
        success: function(t) {
            o && o(t);
        },
        fail: function(t) {
            e && e(t);
        }
    });
}, exports.userRegister = function(n, o, e) {
    t({
        loading: !1,
        url: "/api/userInfo/userRegister.json",
        method: "post",
        data: n,
        success: function(t) {
            o && o(t);
        },
        fail: function(t) {
            e && e(t);
        }
    });
}, exports.verifyUser = function(n, o, e) {
    t({
        loading: !1,
        url: "/api/userInfo/verifyUser.json",
        method: "post",
        data: n,
        success: function(t) {
            o && o(t);
        },
        fail: function(t) {
            e && e(t);
        }
    });
}, exports.setDefaultPatientInfo = function(n, o, e) {
    t({
        loading: !1,
        url: "/api/patientInfo/setDefaultPatientInfo.json",
        method: "post",
        data: n,
        success: function(t) {
            o && o(t);
        },
        fail: function(t) {
            e && e(t);
        }
    });
}, exports.bindCardSendVerificationCode = function(n, o, e) {
    t({
        loading: !1,
        url: "/weixin/bindCardSendVerificationCode",
        method: "post",
        data: n,
        success: function(t) {
            o && o(t);
        },
        fail: function(t) {
            e && e(t);
        }
    });
}, exports.sendVerificationCode = function(n, o, e) {
    t({
        loading: !1,
        url: "/api/patientInfo/sendVerificationCode",
        method: "post",
        data: n,
        success: function(t) {
            o && o(t);
        },
        fail: function(t) {
            e && e(t);
        }
    });
}, exports.bindPatientInfo = function(n, o, e) {
    t({
        loading: !1,
        url: "/api/patientInfo/bindPatientInfo.json",
        method: "post",
        data: n,
        success: function(t) {
            o && o(t);
        },
        fail: function(t) {
            e && e(t);
        }
    });
}, exports.bindPatientInfoByCreate = function(n, o, e) {
    t({
        loading: !1,
        url: "/api/patientInfo/bindPatientInfoByCreate.json",
        method: "post",
        data: n,
        success: function(t) {
            o && o(t);
        },
        fail: function(t) {
            e && e(t);
        }
    });
}, exports.unbindPatientInfo = function(n, o, e) {
    t({
        loading: !1,
        url: "/api/patientInfo/unBindPatientInfo.json",
        method: "post",
        data: n,
        success: function(t) {
            o && o(t);
        },
        fail: function(t) {
            e && e(t);
        }
    });
}, exports.startCollection = function(n, o, e) {
    t({
        loading: !1,
        url: "/api/doctorCollect/startCollection.json",
        method: "post",
        data: n,
        success: function(t) {
            o && o(t);
        },
        fail: function(t) {
            e && e(t);
        }
    });
}, exports.cancelCollection = function(n, o, e) {
    t({
        loading: !1,
        url: "/api/doctorCollect/cancelCollection.json",
        method: "post",
        data: n,
        success: function(t) {
            o && o(t);
        },
        fail: function(t) {
            e && e(t);
        }
    });
}, exports.isCollected = function(n, o, e) {
    t({
        loading: !1,
        url: "/api/doctorCollect/isCollected.json",
        method: "post",
        data: n,
        success: function(t) {
            o && o(t);
        },
        fail: function(t) {
            e && e(t);
        }
    });
}, exports.collectionPage = function(n, o, e) {
    t({
        loading: !1,
        url: "/api/doctorCollect/collectionPage.json",
        method: "post",
        data: n,
        success: function(t) {
            o && o(t);
        },
        fail: function(t) {
            e && e(t);
        }
    });
}, exports.deleteByCollectId = function(n, o, e) {
    t({
        loading: !1,
        url: "/api/doctorCollect/deleteByCollectId.json",
        method: "post",
        data: n,
        success: function(t) {
            o && o(t);
        },
        fail: function(t) {
            e && e(t);
        }
    });
}, exports.appointmentRegister = function(n, o, e) {
    t({
        loading: !1,
        url: "/api/appointmentRecord/appointmentRegister.json",
        method: "post",
        data: n,
        success: function(t) {
            o && o(t);
        },
        fail: function(t) {
            e && e(t);
        }
    });
}, exports.appointmentRecordPage = function(n, o, e) {
    t({
        loading: !1,
        url: "/api/appointmentRecord/appointmentRecordPage.json",
        method: "post",
        data: n,
        success: function(t) {
            o && o(t);
        },
        fail: function(t) {
            e && e(t);
        }
    });
}, exports.cancelRecord = function(n, o, e) {
    t({
        loading: !1,
        url: "/api/appointmentRecord/cancelRecord.json",
        method: "post",
        data: n,
        success: function(t) {
            o && o(t);
        },
        fail: function(t) {
            e && e(t);
        }
    });
};