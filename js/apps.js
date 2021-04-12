var p = [ {
    appId: "1",
    appName: "预约挂号",
    appIcon: "/assets/images/icon_yygh.png",
    appUrl: "/pages/appointment-register/department-choice/index",
    enable: !0
}, {
    appId: "2",
    appName: "当天挂号",
    appIcon: "/assets/images/icon_dtgh.png",
    appUrl: "/pages/today-register/department-choice/index",
    enable: !0
}, {
    appId: "3",
    appName: "门诊缴费",
    appIcon: "/assets/images/icon_hzcx.png",
    appUrl: "/pages/outpatient-expenses/outpatient-payfor/index",
    enable: !0
}, {
    appId: "4",
    appName: "住院预交",
    appIcon: "/assets/images/icon_mzcz.png",
    appUrl: "/pages/medical-money/medical-pay/index",
    enable: !0
}, {
    appId: "5",
    appName: "住院费用",
    appIcon: "/assets/images/icon_mzfy.png",
    appUrl: "/pages/medical-money/list/index",
    enable: !0
}, {
    appId: "6",
    appName: "报告查询",
    appIcon: "/assets/images/icon_zycz.png",
    appUrl: "/pages/report-query/index",
    enable: !0
}, {
    appId: "7",
    appName: "体检预约",
    appIcon: "/assets/images/icon_zyfy.png",
    appUrl: "/pages/dzfp/index",
    enable: !0
}, {
    appId: "8",
    appName: "体检结果",
    appIcon: "/assets/images/icon_bgcx.png",
    appUrl: "/pages/dzfp/index",
    enable: !0
} ], a = function() {
    for (var a = [], e = 0; e < p.length; e++) {
        var n = p[e];
        n.enable && a.push(n);
    }
    return a;
};

module.exports = {
    getApps: a,
    getAppById: function(p) {
        for (var e, n = a(), s = 0; s < n.length; s++) {
            var i = n[s];
            if (i.appId == p) {
                e = i;
                break;
            }
        }
        return e;
    }
};