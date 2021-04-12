var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function(t) {
    var n = Object.prototype.toString, r = (t.lang = {
        en: {}
    }, "January February March April May June July August September October November December".split(" ")), a = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), u = {
        FullYear: 6,
        Month: 5,
        Date: 4,
        Hours: 3,
        Minutes: 2,
        Seconds: 1,
        Milliseconds: 0
    }, o = {
        yr: "FullYear",
        year: "FullYear",
        years: "FullYear",
        mn: "Month",
        month: "Month",
        months: "Month",
        day: "Date",
        days: "Date",
        date: "Date",
        hr: "Hours",
        hour: "Hours",
        hours: "Hours",
        min: "Minutes",
        minute: "Minutes",
        minutes: "Minutes",
        sec: "Seconds",
        second: "Seconds",
        seconds: "Seconds",
        ms: "Milliseconds",
        millisecond: "Milliseconds",
        milliseconds: "Milliseconds"
    }, s = t._parsers = {
        date_and_time: {
            test: /^(?:[+\-]\d{6}|\d{4})(?:(?:\-\d\d){1,2}|\d{4})[T ](?:\d\d)(?::?\d\d){0,2}(?:[\.,]\d+)?(?:Z|[+\-]\d\d(:?\d\d)?)?$/,
            size: 1,
            parse: function(e) {
                var t = e.split(/[T ]/), n = s.date.parse(t[0]), r = t[1].replace(/:/g, "").match(/^(\d\d)(\d\d)?(\d\d)?(?:[.,](\d+))?([+\-](?:\d\d){1,2})?/), a = 0, u = n.getTime() + 36e5 * parseInt(r[1], 10) + 6e4 * parseInt(r[2] || "0", 10) + 1e3 * parseInt(r[3] || "0", 10);
                return r[3] ? a = 1e3 : r[2] ? a = 6e4 : r[1] && (a = 36e5), u += parseFloat("0." + (r[4] || "0")) * a, 
                n.setTime(u), n.size = 0, n;
            }
        },
        date: {
            test: /^(?:[+\-]\d{6}|\d{4})(?:\-\d\d\-\d\d|\-?\d\d\d\d)$/,
            size: 864e5,
            parse: function(e) {
                var n = /^([+\-]\d{6}|\d{4})\-?(\d\d)\-?(\d\d)$/.exec(e), r = t.date(n[1], +n[2] - 1, n[3]);
                return r.size = 864e5, r;
            }
        },
        year_and_month: {
            test: /^[+\-]?\d{4,6}[\/\-](?:0[1-9]|1[012])$/,
            size: 2629746e3,
            parse: function(e) {
                var n = e.split(/[\/\-]/), r = t.date(n[0], +n[1] - 1, 1);
                return r.size = 864e5 * t.daysInMonth(r), r;
            }
        },
        year: {
            test: /^[+\-]?\d{4,6}$/,
            size: 31556952e3,
            parse: function(e) {
                var n = t.date(e, 0, 1);
                return n.size = 864e5 * (t.isLeapYear(n) ? 366 : 365), n;
            }
        },
        year_and_week: {
            test: /^[+\-]?\d{4,6}\-?[Ww]\d\d(?:\-?\d)?$/,
            size: 6048e5,
            parse: function(e) {
                var n = e.toLowerCase().replace(/[^w\d]/g, "").split("w"), r = t.date(n[0], 0, 3);
                return r.setUTCDate(3 - r.getUTCDay() + 7 * (parseInt(n[1].substr(0, 2), 10) - 1) + parseInt(n[1].substr(2, 1) || "1", 10)), 
                r.size = 6048e5, r;
            }
        },
        year_and_ordinal: {
            test: /^[+\-]?\d{4,6}\-[0-3]\d\d$/,
            size: 864e5,
            parse: function(e) {
                var t = new Date(0);
                return t.setUTCFullYear(parseInt(e.substr(0, e.length - 4), 10)), t.setDate(parseInt(e.substr(e.length - 3), 10)), 
                t.size = 864e5, t;
            }
        },
        year_and_quarter: {
            test: /^[+\-]?\d{4,6}\-?[Qq][1-4]$/,
            size: 7889238e3,
            parse: function(e) {
                var n = e.split(/\-?[Qq]/), r = t.date(n[0], 3 * (parseInt(n[1], 10) - 1));
                return r.size = 864e5, r;
            }
        }
    }, i = t._formats = {
        a: function(e) {
            return e.getUTCHours() >= 12 ? "pm" : "am";
        },
        A: function(e) {
            return e.getUTCHours() >= 12 ? "PM" : "AM";
        },
        c: function(e, n) {
            return t.isoyear(e) + t.format(e, "-m-d\\TH:i:s.", n) + t.pad(e.getUTCMilliseconds(), 3) + "Z";
        },
        d: function(e) {
            return t.pad(e.getUTCDate());
        },
        D: function(e, n) {
            return t._(a[e.getUTCDay()].substr(0, 3), n);
        },
        e: function(e) {
            return "UTC";
        },
        F: function(e, n) {
            return t._(r[e.getUTCMonth()], n);
        },
        g: function(e) {
            return e.getUTCHours() % 12 || 12;
        },
        G: function(e) {
            return e.getUTCHours();
        },
        h: function(e) {
            return t.pad(e.getUTCHours() % 12 || 12);
        },
        H: function(e) {
            return t.pad(e.getUTCHours());
        },
        i: function(e) {
            return t.pad(e.getUTCMinutes());
        },
        j: function(e) {
            return e.getUTCDate();
        },
        l: function(e, n) {
            return t._(a[e.getUTCDay()], n);
        },
        L: function(e) {
            return 1 * t.isLeapYear(e);
        },
        m: function(e) {
            return t.pad(e.getUTCMonth() + 1);
        },
        M: function(e, n) {
            return t._(r[e.getUTCMonth()].substr(0, 3), n);
        },
        n: function(e) {
            return e.getUTCMonth() + 1;
        },
        N: function(e) {
            return e.getUTCDay() || 7;
        },
        o: function(e) {
            return t.pad(t.isocalendar(e)[0], 4);
        },
        O: function(e) {
            return "+0000";
        },
        P: function(e) {
            return "+00:00";
        },
        q: function(e) {
            return 1 + ~~(e.getUTCMonth() / 3);
        },
        r: function(e, n) {
            return t.format(e, "D, d M Y H:i:s O", n);
        },
        s: function(e) {
            return t.pad(e.getUTCSeconds());
        },
        S: function(e) {
            var t = e.getUTCDate() % 10, n = e.getUTCDate() % 100;
            return 1 === t && 11 !== n && "st" || 2 === t && 12 !== n && "nd" || 3 === t && 13 !== n && "rd" || "th";
        },
        t: function(e) {
            return t.daysInMonth(e);
        },
        T: function(e) {
            return "UTC";
        },
        u: function(e) {
            return t.pad(e.getUTCMilliseconds(), 6);
        },
        U: function(e) {
            return ~~(e / 1e3);
        },
        w: function(e) {
            return e.getUTCDay();
        },
        W: function(e) {
            return t.pad(t.isocalendar(e)[1]);
        },
        y: function(e) {
            return (e.getUTCFullYear() + "").substr(2);
        },
        Y: function(e) {
            return e.getUTCFullYear();
        },
        z: function(e) {
            return Math.floor((e - new Date(Date.UTC(e.getUTCFullYear(), 0, 1))) / 864e5);
        }
    };
    t.date = function(e, n, r, a, u, o, s) {
        if (!arguments.length) return new Date(t.now());
        if (e = parseInt(e || 0, 10), 1 === arguments.length) return new Date(e);
        var i = Date.UTC(e, parseInt(n || 0, 10), parseInt(r || 1, 10), parseInt(a || 0, 10), parseInt(u || 0, 10), parseInt(o || 0, 10), parseInt(s || 0, 10)), r = new Date(i);
        return e < 100 && e >= 0 && r.setUTCFullYear(e), r;
    }, t.pad = function(e, n) {
        var r = t.pad.z;
        if (!r) {
            var a = [];
            a[999] = "", r = t.pad.z = a.join("0");
        }
        return (r += e).substring(r.length - (n || 2));
    }, t.isLeapYear = function(e) {
        return "[object Date]" === n.call(e) && (e = e.getUTCFullYear()), e % 4 == 0 && e % 100 != 0 || e % 400 == 0;
    }, t.daysInMonth = function(e) {
        var n = e.getUTCMonth();
        return 1 === n ? t.isLeapYear(e) ? 29 : 28 : [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ][n];
    }, t.isocalendar = function(e) {
        var n = e.getUTCDay(), r = new Date(e.valueOf());
        r.setDate(r.getDate() - (n + 6) % 7 + 3);
        var a = r.getUTCFullYear(), u = Math.floor((r.getTime() - t.date(a, 0, 1, -6)) / 864e5);
        return [ a, 1 + Math.floor(u / 7), n || 7 ];
    }, t.isoyear = function(e) {
        var n = e.getUTCFullYear();
        return n >= 0 && n <= 9999 ? t.pad(Math.abs(n), 4) : (n < 0 ? "-" : "+") + t.pad(Math.abs(n), 6);
    }, t.set = function(t, n) {
        if ("object" === (void 0 === n ? "undefined" : e(n))) {
            var r, a, s = [];
            for (var i in n) i in o && (r = o[i], s.push([ n[i], r, u[r] ]));
            for (s = s.sort(function(e, t) {
                return e[2] - t[2];
            }), a = 0; a < s.length; a++) t["setUTC" + s[a][1]]("Date" === s[a][1] ? 1 : 0);
            for (a = s.length; a--; ) t["setUTC" + s[a][1]](s[a][0]);
        }
        return t;
    }, t.parse = function(e) {
        var t;
        if ("string" != typeof e) throw new Error("dateutil parser can't parse non-strings.");
        for (var n in s) if (s[n].test.test(e)) {
            (t = s[n].parse(e)).type = n, t.size = t.size || 0;
            break;
        }
        return t || ((t = new Date(e)).size = 0, t.type = "unknown_date"), t;
    }, t.format = function(e, t, r) {
        if ("[object Date]" === n.call(this)) r = t, t = e, e = this; else if ("[object Date]" !== n.call(e)) throw new Error("No date passed to format.");
        for (var a, u = [], o = t.length, s = 0; s < o; s++) "\\" !== (a = t.charAt(s)) ? u.push(a in i ? i[a](e, r) : a) : (a = s < t.length ? t.charAt(++s) : a, 
        u.push(a));
        return u.join("");
    }, t.today = function() {
        return t.set(t.date(), {
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0
        });
    }, t.now = "function" == typeof Date.now ? Date.now : function() {
        return +new Date();
    }, t._ = function(e, n) {
        var r = n && t.lang[n];
        return r && e in r ? r[e] : e;
    };
}("undefined" != typeof module && module.exports ? module.exports : (void 0).dateutil = {});