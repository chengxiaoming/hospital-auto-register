module.exports = {
    shareFunction: function() {
        return {
            title: "关注民生，保障生活！",
            path: "/pages/start/start",
            imageUrl: "http://resource.leanpay.cn/INCOMM/M00/00/AF/rBsAEF5KTxyAT8aGAAEs8qtsiAw643.jpg"
        };
    },
    showTotal: function(t, e, i) {
        wx.showToast({
            title: t,
            icon: e,
            duration: i
        });
    },
    IdentityCodeValid: function(t) {
        var e = {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江 ",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽",
            35: "福建",
            36: "江西",
            37: "山东",
            41: "河南",
            42: "湖北 ",
            43: "湖南",
            44: "广东",
            45: "广西",
            46: "海南",
            50: "重庆",
            51: "四川",
            52: "贵州",
            53: "云南",
            54: "西藏 ",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门",
            91: "国外 "
        }, i = "", s = !0;
        if (t && /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(t)) if (e[t.substr(0, 2)]) {
            if (18 == t.length) {
                t = t.split("");
                for (var n = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ], r = [ 1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2 ], a = 0, o = 0; o < 17; o++) a += t[o] * n[o];
                r[a % 11] != t[17] && (i = "身份证号码不合法", s = !1);
            }
        } else i = "身份证地址编码错误", s = !1; else i = "身份证号格式错误", s = !1;
        return !!s || i;
    },
    isTelAvailable: function(t) {
        return !!/^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(t);
    },
    isPoneAvailable: function(t) {
        return !!/^[1][3,4,5,7,8][0-9]{9}$/.test(t);
    },
    defMyApp: defMyApp
};