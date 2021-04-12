var t = function(t) {
    return (t = t.toString())[1] ? t : "0" + t;
};

module.exports = {
    formatTime: function(e) {
        var n = e.getFullYear(), r = e.getMonth() + 1, a = e.getDate(), o = e.getHours(), u = e.getMinutes(), i = e.getSeconds();
        return [ n, r, a ].map(t).join("/") + " " + [ o, u, i ].map(t).join(":");
    },
    nowTimeFormat: function() {
        var t = new Date(), e = t.getFullYear(), n = t.getMonth() + 1;
        return n >= 1 && n <= 9 && (n = "0" + n), e + "-" + n;
    },
    lastTimeFormat: function() {
        var t = new Date(), e = t.getFullYear(), n = t.getMonth();
        return 0 <= n && n <= 9 && (0 === n ? (e = Value - 1, n = 12) : n = "0" + n), e + "-" + n;
    },
    timeCompare: function(t, e) {
        var n = t.split("-"), r = e.split("-");
        return r[0] > n[0] || r[0] === n[0] && r[1] >= n[1];
    },
    nowDate: function() {
        var t = new Date(), e = t.getFullYear(), n = t.getMonth() + 1;
        return n >= 1 && n <= 9 && (n = "0" + n), e + "-" + n + "-" + t.getDate();
    },
    aginDate: function() {
        var t = new Date(), e = t.getFullYear(), n = t.getMonth() + 1, r = t.getDate(), a = new Date(e, n, 0);
        a = a.getDate();
        var o = e, u = parseInt(n) + 1;
        13 == u && (o = parseInt(o) + 1, u = 1);
        var i = r, g = new Date(o, u, 0);
        return i > (g = g.getDate()) && (i = g), u < 10 && (u = "0" + u), o + "-" + u + "-" + i;
    },
    dateCompare: function(t, e) {
        var n = t.split("-"), r = e.split("-");
        return r[0] > n[0] || r[0] === n[0] && r[1] > n[1] || r[0] === n[0] && r[1] === n[1] && r[2] >= n[2];
    }
};