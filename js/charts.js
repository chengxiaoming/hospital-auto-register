function t(t, e) {
    if (null == t) throw new TypeError("Cannot convert undefined or null to object");
    for (var i = Object(t), n = 1; n < arguments.length; n++) {
        var a = arguments[n];
        if (null != a) for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (i[o] = a[o]);
    }
    return i;
}

function e(t, e, i) {
    if (isNaN(t)) throw new Error("[wxCharts] unvalid series data!");
    i = i || 10, e = e || "upper";
    for (var n = 1; i < 1; ) i *= 10, n *= 10;
    for (t = "upper" === e ? Math.ceil(t * n) : Math.floor(t * n); t % i != 0; ) "upper" === e ? t++ : t--;
    return t / n;
}

function i(t, e, i, n) {
    var a = n.width - i.padding - e.xAxisPoints[0], o = e.eachSpacing * n.categories.length, r = t;
    return t >= 0 ? r = 0 : Math.abs(t) >= o - a && (r = a - o), r;
}

function n(t, e, i) {
    function n(t) {
        for (;t < 0; ) t += 2 * Math.PI;
        for (;t > 2 * Math.PI; ) t -= 2 * Math.PI;
        return t;
    }
    return t = n(t), e = n(e), i = n(i), e > i && (i += 2 * Math.PI, t < e && (t += 2 * Math.PI)), 
    t >= e && t <= i;
}

function a(t, e, i) {
    var n = t, a = i - e, o = n + (i - a - n) / Math.sqrt(2);
    return {
        transX: o *= -1,
        transY: (i - a) * (Math.sqrt(2) - 1) - (i - a - n) / Math.sqrt(2)
    };
}

function o(t, e) {
    function i(t, e) {
        return !(!t[e - 1] || !t[e + 1]) && (t[e].y >= Math.max(t[e - 1].y, t[e + 1].y) || t[e].y <= Math.min(t[e - 1].y, t[e + 1].y));
    }
    var n = null, a = null, o = null, r = null;
    if (e < 1 ? (n = t[0].x + .2 * (t[1].x - t[0].x), a = t[0].y + .2 * (t[1].y - t[0].y)) : (n = t[e].x + .2 * (t[e + 1].x - t[e - 1].x), 
    a = t[e].y + .2 * (t[e + 1].y - t[e - 1].y)), e > t.length - 3) {
        var s = t.length - 1;
        o = t[s].x - .2 * (t[s].x - t[s - 1].x), r = t[s].y - .2 * (t[s].y - t[s - 1].y);
    } else o = t[e + 1].x - .2 * (t[e + 2].x - t[e].x), r = t[e + 1].y - .2 * (t[e + 2].y - t[e].y);
    return i(t, e + 1) && (r = t[e + 1].y), i(t, e) && (a = t[e].y), {
        ctrA: {
            x: n,
            y: a
        },
        ctrB: {
            x: o,
            y: r
        }
    };
}

function r(t, e, i) {
    return {
        x: i.x + t,
        y: i.y - e
    };
}

function s(t, e) {
    if (e) for (;et.isCollision(t, e); ) t.start.x > 0 ? t.start.y-- : t.start.x < 0 ? t.start.y++ : t.start.y > 0 ? t.start.y++ : t.start.y--;
    return t;
}

function l(t, e) {
    var i = 0;
    return t.map(function(t) {
        return t.color || (t.color = e.colors[i], i = (i + 1) % e.colors.length), t;
    });
}

function h(t, i) {
    var n = 0, a = i - t;
    return n = a >= 1e4 ? 1e3 : a >= 1e3 ? 100 : a >= 100 ? 10 : a >= 10 ? 5 : a >= 1 ? 1 : a >= .1 ? .1 : .01, 
    {
        minRange: e(t, "lower", n),
        maxRange: e(i, "upper", n)
    };
}

function c(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 10, i = 0;
    return (t = (t = String(t)).split("")).forEach(function(t) {
        /[a-zA-Z]/.test(t) ? i += 7 : /[0-9]/.test(t) ? i += 5.5 : /\./.test(t) ? i += 2.7 : /-/.test(t) ? i += 3.25 : /[\u4e00-\u9fa5]/.test(t) ? i += 10 : /\(|\)/.test(t) ? i += 3.73 : /\s/.test(t) ? i += 2.5 : /%/.test(t) ? i += 8 : i += 10;
    }), i * e / 10;
}

function f(t) {
    return t.reduce(function(t, e) {
        return (t.data ? t.data : t).concat(e.data);
    }, []);
}

function d(t, e) {
    var i = [];
    return t.forEach(function(t) {
        if (null !== t.data[e] && void 0 !== t.data[e]) {
            var n = {};
            n.color = t.color, n.name = t.name, n.data = t.format ? t.format(t.data[e]) : t.data[e], 
            i.push(n);
        }
    }), i;
}

function x(t) {
    var e = t.map(function(t) {
        return c(t);
    });
    return Math.max.apply(null, e);
}

function u(t) {
    for (var e = 2 * Math.PI / t, i = [], n = 0; n < t; n++) i.push(e * n);
    return i.map(function(t) {
        return -1 * t + Math.PI / 2;
    });
}

function g(t, e, i, n) {
    var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {}, o = t.map(function(t) {
        return {
            text: a.format ? a.format(t, n[i]) : t.name + ": " + t.data,
            color: t.color
        };
    }), r = [], s = {
        x: 0,
        y: 0
    };
    return e.forEach(function(t) {
        void 0 !== t[i] && null !== t[i] && r.push(t[i]);
    }), r.forEach(function(t) {
        s.x = Math.round(t.x), s.y += t.y;
    }), s.y /= r.length, {
        textList: o,
        offset: s
    };
}

function p(t, e, i, n) {
    var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0, o = -1;
    return y(t, i, n) && e.forEach(function(e, i) {
        t.x + a > e && (o = i);
    }), o;
}

function y(t, e, i) {
    return t.x < e.width - i.padding && t.x > i.padding + i.yAxisWidth + i.yAxisTitleWidth && t.y > i.padding && t.y < e.height - i.legendHeight - i.xAxisHeight - i.padding;
}

function v(t, e, i) {
    var n = 2 * Math.PI / i, a = -1;
    if (P(t, e.center, e.radius)) {
        var o = function(t) {
            return t < 0 && (t += 2 * Math.PI), t > 2 * Math.PI && (t -= 2 * Math.PI), t;
        }, r = Math.atan2(e.center.y - t.y, t.x - e.center.x);
        (r *= -1) < 0 && (r += 2 * Math.PI), e.angleList.map(function(t) {
            return t = o(-1 * t);
        }).forEach(function(t, e) {
            var i = o(t - n / 2), s = o(t + n / 2);
            s < i && (s += 2 * Math.PI), (r >= i && r <= s || r + 2 * Math.PI >= i && r + 2 * Math.PI <= s) && (a = e);
        });
    }
    return a;
}

function m(t, e) {
    var i = -1;
    if (P(t, e.center, e.radius)) {
        var a = Math.atan2(e.center.y - t.y, t.x - e.center.x);
        a = -a;
        for (var o = 0, r = e.series.length; o < r; o++) {
            var s = e.series[o];
            if (n(a, s._start_, s._start_ + 2 * s._proportion_ * Math.PI)) {
                i = o;
                break;
            }
        }
    }
    return i;
}

function P(t, e, i) {
    return Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2) <= Math.pow(i, 2);
}

function S(t) {
    var e = [], i = [];
    return t.forEach(function(t, n) {
        null !== t ? i.push(t) : (i.length && e.push(i), i = []);
    }), i.length && e.push(i), e;
}

function T(t, e, i) {
    if (!1 === e.legend) return {
        legendList: [],
        legendHeight: 0
    };
    var n = [], a = 0, o = [];
    return t.forEach(function(t) {
        var i = 30 + c(t.name || "undefined");
        a + i > e.width ? (n.push(o), a = i, o = [ t ]) : (a += i, o.push(t));
    }), o.length && n.push(o), {
        legendList: n,
        legendHeight: n.length * (i.fontSize + 8) + 5
    };
}

function A(t, e, i) {
    var n = {
        angle: 0,
        xAxisHeight: i.xAxisHeight
    }, a = F(t, e, i).eachSpacing, o = t.map(function(t) {
        return c(t);
    }), r = Math.max.apply(this, o);
    return r + 2 * i.xAxisTextPadding > a && (n.angle = 45 * Math.PI / 180, n.xAxisHeight = 2 * i.xAxisTextPadding + r * Math.sin(n.angle)), 
    n;
}

function b(t, e, i, n, a) {
    var o = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 1, s = a.extra.radar || {};
    s.max = s.max || 0;
    var l = Math.max(s.max, Math.max.apply(null, f(n))), h = [];
    return n.forEach(function(n) {
        var a = {};
        a.color = n.color, a.data = [], n.data.forEach(function(n, s) {
            var h = {};
            h.angle = t[s], h.proportion = n / l, h.position = r(i * h.proportion * o * Math.cos(h.angle), i * h.proportion * o * Math.sin(h.angle), e), 
            a.data.push(h);
        }), h.push(a);
    }), h;
}

function M(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1, i = 0, n = 0;
    return t.forEach(function(t) {
        t.data = null === t.data ? 0 : t.data, i += t.data;
    }), t.forEach(function(t) {
        t.data = null === t.data ? 0 : t.data, t._proportion_ = t.data / i * e;
    }), t.forEach(function(t) {
        t._start_ = n, n += 2 * t._proportion_ * Math.PI;
    }), t;
}

function _(t) {
    var e = 0;
    return (t = M(t)).forEach(function(t) {
        var i = t.format ? t.format(+t._proportion_.toFixed(2)) : et.toFixed(100 * t._proportion_) + "%";
        e = Math.max(e, c(i));
    }), e;
}

function E(t, e, i, n, a, o) {
    return t.map(function(t) {
        return null === t ? null : (t.width = (e - 2 * a.columePadding) / i, o.extra.column && o.extra.column.width && +o.extra.column.width > 0 ? t.width = Math.min(t.width, +o.extra.column.width) : t.width = Math.min(t.width, 25), 
        t.x += (n + .5 - i / 2) * t.width, t);
    });
}

function F(t, e, i) {
    var n = i.yAxisWidth + i.yAxisTitleWidth, a = (e.width - 2 * i.padding - n) / (e.enableScroll ? Math.min(5, t.length) : t.length), o = [], r = i.padding + n, s = e.width - i.padding;
    return t.forEach(function(t, e) {
        o.push(r + e * a);
    }), !0 === e.enableScroll ? o.push(r + t.length * a) : o.push(s), {
        xAxisPoints: o,
        startX: r,
        endX: s,
        eachSpacing: a
    };
}

function w(t, e, i, n, a, o, r) {
    var s = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : 1, l = [], h = o.height - 2 * r.padding - r.xAxisHeight - r.legendHeight;
    return t.forEach(function(t, c) {
        if (null === t) l.push(null); else {
            var f = {};
            f.x = n[c] + Math.round(a / 2);
            var d = h * (t - e) / (i - e);
            d *= s, f.y = o.height - r.xAxisHeight - r.legendHeight - Math.round(d) - r.padding, 
            l.push(f);
        }
    }), l;
}

function L(t, e, i) {
    var n = f(t);
    n = n.filter(function(t) {
        return null !== t;
    });
    var a = Math.min.apply(this, n), o = Math.max.apply(this, n);
    if ("number" == typeof e.yAxis.min && (a = Math.min(e.yAxis.min, a)), "number" == typeof e.yAxis.max && (o = Math.max(e.yAxis.max, o)), 
    a === o) {
        var r = o || 1;
        a -= r, o += r;
    }
    for (var s = h(a, o), l = s.minRange, c = [], d = (s.maxRange - l) / i.yAxisSplit, x = 0; x <= i.yAxisSplit; x++) c.push(l + d * x);
    return c.reverse();
}

function k(t, e, i) {
    var n = L(t, e, i), a = i.yAxisWidth, o = n.map(function(t) {
        return t = et.toFixed(t, 2), t = e.yAxis.format ? e.yAxis.format(Number(t)) : t, 
        a = Math.max(a, c(t) + 5), t;
    });
    return !0 === e.yAxis.disabled && (a = 0), {
        rangesFormat: o,
        ranges: n,
        yAxisWidth: a
    };
}

function C(t, e, i, n) {
    n.beginPath(), n.setStrokeStyle("#ffffff"), n.setLineWidth(1), n.setFillStyle(e), 
    "diamond" === i ? t.forEach(function(t, e) {
        null !== t && (n.moveTo(t.x, t.y - 4.5), n.lineTo(t.x - 4.5, t.y), n.lineTo(t.x, t.y + 4.5), 
        n.lineTo(t.x + 4.5, t.y), n.lineTo(t.x, t.y - 4.5));
    }) : "circle" === i ? t.forEach(function(t, e) {
        null !== t && (n.moveTo(t.x + 3.5, t.y), n.arc(t.x, t.y, 4, 0, 2 * Math.PI, !1));
    }) : "rect" === i ? t.forEach(function(t, e) {
        null !== t && (n.moveTo(t.x - 3.5, t.y - 3.5), n.rect(t.x - 3.5, t.y - 3.5, 7, 7));
    }) : "triangle" === i && t.forEach(function(t, e) {
        null !== t && (n.moveTo(t.x, t.y - 4.5), n.lineTo(t.x - 4.5, t.y + 4.5), n.lineTo(t.x + 4.5, t.y + 4.5), 
        n.lineTo(t.x, t.y - 4.5));
    }), n.closePath(), n.fill(), n.stroke();
}

function H(t, e, i) {
    var n = t.title.fontSize || e.titleFontSize, a = t.subtitle.fontSize || e.subtitleFontSize, o = t.title.name || "", r = t.subtitle.name || "", s = t.title.color || e.titleColor, l = t.subtitle.color || e.subtitleColor, h = o ? n : 0, f = r ? a : 0;
    if (r) {
        var d = c(r, a), x = (t.width - d) / 2 + (t.subtitle.offsetX || 0), u = (t.height - e.legendHeight + a) / 2;
        o && (u -= (h + 5) / 2), i.beginPath(), i.setFontSize(a), i.setFillStyle(l), i.fillText(r, x, u), 
        i.stroke(), i.closePath();
    }
    if (o) {
        var g = c(o, n), p = (t.width - g) / 2 + (t.title.offsetX || 0), y = (t.height - e.legendHeight + n) / 2;
        r && (y += (f + 5) / 2), i.beginPath(), i.setFontSize(n), i.setFillStyle(s), i.fillText(o, p, y), 
        i.stroke(), i.closePath();
    }
}

function I(t, e, i, n) {
    var a = e.data;
    n.beginPath(), n.setFontSize(i.fontSize), n.setFillStyle("#666666"), t.forEach(function(t, i) {
        if (null !== t) {
            var o = e.format ? e.format(a[i]) : a[i];
            n.fillText(o, t.x - c(o) / 2, t.y - 2);
        }
    }), n.closePath(), n.stroke();
}

function z(t, e, i, n, a, o) {
    var s = n.extra.radar || {};
    e += a.radarLabelTextMargin, o.beginPath(), o.setFontSize(a.fontSize), o.setFillStyle(s.labelColor || "#666666"), 
    t.forEach(function(t, s) {
        var l = {
            x: e * Math.cos(t),
            y: e * Math.sin(t)
        }, h = r(l.x, l.y, i), f = h.x, d = h.y;
        et.approximatelyEqual(l.x, 0) ? f -= c(n.categories[s] || "") / 2 : l.x < 0 && (f -= c(n.categories[s] || "")), 
        o.fillText(n.categories[s] || "", f, d + a.fontSize / 2);
    }), o.stroke(), o.closePath();
}

function D(t, e, i, n, a, o) {
    var l = a + i.pieChartLinePadding, h = [], f = null;
    t.map(function(t) {
        return {
            arc: 2 * Math.PI - (t._start_ + 2 * Math.PI * t._proportion_ / 2),
            text: t.format ? t.format(+t._proportion_.toFixed(2)) : et.toFixed(100 * t._proportion_) + "%",
            color: t.color
        };
    }).forEach(function(t) {
        var e = Math.cos(t.arc) * l, n = Math.sin(t.arc) * l, o = Math.cos(t.arc) * a, r = Math.sin(t.arc) * a, d = e >= 0 ? e + i.pieChartTextPadding : e - i.pieChartTextPadding, x = n, u = c(t.text), g = x;
        f && et.isSameXCoordinateArea(f.start, {
            x: d
        }) && (g = d > 0 ? Math.min(x, f.start.y) : e < 0 ? Math.max(x, f.start.y) : x > 0 ? Math.max(x, f.start.y) : Math.min(x, f.start.y)), 
        d < 0 && (d -= u);
        var p = {
            lineStart: {
                x: o,
                y: r
            },
            lineEnd: {
                x: e,
                y: n
            },
            start: {
                x: d,
                y: g
            },
            width: u,
            height: i.fontSize,
            text: t.text,
            color: t.color
        };
        f = s(p, f), h.push(f);
    }), h.forEach(function(t) {
        var e = r(t.lineStart.x, t.lineStart.y, o), a = r(t.lineEnd.x, t.lineEnd.y, o), s = r(t.start.x, t.start.y, o);
        n.setLineWidth(1), n.setFontSize(i.fontSize), n.beginPath(), n.setStrokeStyle(t.color), 
        n.setFillStyle(t.color), n.moveTo(e.x, e.y);
        var l = t.start.x < 0 ? s.x + t.width : s.x, h = t.start.x < 0 ? s.x - 5 : s.x + 5;
        n.quadraticCurveTo(a.x, a.y, l, s.y), n.moveTo(e.x, e.y), n.stroke(), n.closePath(), 
        n.beginPath(), n.moveTo(s.x + t.width, s.y), n.arc(l, s.y, 2, 0, 2 * Math.PI), n.closePath(), 
        n.fill(), n.beginPath(), n.setFillStyle("#666666"), n.fillText(t.text, h, s.y + 3), 
        n.closePath(), n.stroke(), n.closePath();
    });
}

function W(t, e, i, n) {
    var a = i.padding, o = e.height - i.padding - i.xAxisHeight - i.legendHeight;
    n.beginPath(), n.setStrokeStyle("#cccccc"), n.setLineWidth(1), n.moveTo(t, a), n.lineTo(t, o), 
    n.stroke(), n.closePath();
}

function O(e, i, n, a, o) {
    var r = !1;
    (i = t({
        x: 0,
        y: 0
    }, i)).y -= 8;
    var s = e.map(function(t) {
        return c(t.text);
    }), l = 9 + 4 * a.toolTipPadding + Math.max.apply(null, s), h = 2 * a.toolTipPadding + e.length * a.toolTipLineHeight;
    i.x - Math.abs(n._scrollDistance_) + 8 + l > n.width && (r = !0), o.beginPath(), 
    o.setFillStyle(n.tooltip.option.background || a.toolTipBackground), o.setGlobalAlpha(a.toolTipOpacity), 
    r ? (o.moveTo(i.x, i.y + 10), o.lineTo(i.x - 8, i.y + 10 - 5), o.lineTo(i.x - 8, i.y + 10 + 5), 
    o.moveTo(i.x, i.y + 10), o.fillRect(i.x - l - 8, i.y, l, h)) : (o.moveTo(i.x, i.y + 10), 
    o.lineTo(i.x + 8, i.y + 10 - 5), o.lineTo(i.x + 8, i.y + 10 + 5), o.moveTo(i.x, i.y + 10), 
    o.fillRect(i.x + 8, i.y, l, h)), o.closePath(), o.fill(), o.setGlobalAlpha(1), e.forEach(function(t, e) {
        o.beginPath(), o.setFillStyle(t.color);
        var n = i.x + 8 + 2 * a.toolTipPadding, s = i.y + (a.toolTipLineHeight - a.fontSize) / 2 + a.toolTipLineHeight * e + a.toolTipPadding;
        r && (n = i.x - l - 8 + 2 * a.toolTipPadding), o.fillRect(n, s, 4, a.fontSize), 
        o.closePath();
    }), o.beginPath(), o.setFontSize(a.fontSize), o.setFillStyle("#ffffff"), e.forEach(function(t, e) {
        var n = i.x + 8 + 2 * a.toolTipPadding + 4 + 5;
        r && (n = i.x - l - 8 + 2 * a.toolTipPadding + 4 + 5);
        var s = i.y + (a.toolTipLineHeight - a.fontSize) / 2 + a.toolTipLineHeight * e + a.toolTipPadding;
        o.fillText(t.text, n, s + a.fontSize);
    }), o.stroke(), o.closePath();
}

function X(t, e, i, n) {
    var a = i.xAxisHeight + (e.height - i.xAxisHeight - c(t)) / 2;
    n.save(), n.beginPath(), n.setFontSize(i.fontSize), n.setFillStyle(e.yAxis.titleFontColor || "#333333"), 
    n.translate(0, e.height), n.rotate(-90 * Math.PI / 180), n.fillText(t, a, i.padding + .5 * i.fontSize), 
    n.stroke(), n.closePath(), n.restore();
}

function G(t, e, i, n) {
    var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1, o = k(t, e, i).ranges, r = F(e.categories, e, i), s = r.xAxisPoints, l = r.eachSpacing, h = o.pop(), c = o.shift();
    return n.save(), e._scrollDistance_ && 0 !== e._scrollDistance_ && !0 === e.enableScroll && n.translate(e._scrollDistance_, 0), 
    t.forEach(function(o, r) {
        var f = w(o.data, h, c, s, l, e, i, a);
        f = E(f, l, t.length, r, i, e), n.beginPath(), n.setFillStyle(o.color), f.forEach(function(t, a) {
            if (null !== t) {
                var o = t.x - t.width / 2 + 1, r = e.height - t.y - i.padding - i.xAxisHeight - i.legendHeight;
                n.moveTo(o, t.y), n.rect(o, t.y, t.width - 2, r);
            }
        }), n.closePath(), n.fill();
    }), t.forEach(function(o, r) {
        var f = w(o.data, h, c, s, l, e, i, a);
        f = E(f, l, t.length, r, i, e), !1 !== e.dataLabel && 1 === a && I(f, o, i, n);
    }), n.restore(), {
        xAxisPoints: s,
        eachSpacing: l
    };
}

function R(t, e, i, n) {
    var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1, r = k(t, e, i).ranges, s = F(e.categories, e, i), l = s.xAxisPoints, h = s.eachSpacing, c = r.pop(), f = r.shift(), d = e.height - i.padding - i.xAxisHeight - i.legendHeight, x = [];
    return n.save(), e._scrollDistance_ && 0 !== e._scrollDistance_ && !0 === e.enableScroll && n.translate(e._scrollDistance_, 0), 
    e.tooltip && e.tooltip.textList && e.tooltip.textList.length && 1 === a && W(e.tooltip.offset.x, e, i, n), 
    t.forEach(function(t, r) {
        var s = w(t.data, c, f, l, h, e, i, a);
        if (x.push(s), S(s).forEach(function(i) {
            if (n.beginPath(), n.setStrokeStyle(t.color), n.setFillStyle(t.color), n.setGlobalAlpha(.6), 
            n.setLineWidth(2), i.length > 1) {
                var a = i[0], r = i[i.length - 1];
                n.moveTo(a.x, a.y), "curve" === e.extra.lineStyle ? i.forEach(function(t, e) {
                    if (e > 0) {
                        var a = o(i, e - 1);
                        n.bezierCurveTo(a.ctrA.x, a.ctrA.y, a.ctrB.x, a.ctrB.y, t.x, t.y);
                    }
                }) : i.forEach(function(t, e) {
                    e > 0 && n.lineTo(t.x, t.y);
                }), n.lineTo(r.x, d), n.lineTo(a.x, d), n.lineTo(a.x, a.y);
            } else {
                var s = i[0];
                n.moveTo(s.x - h / 2, s.y), n.lineTo(s.x + h / 2, s.y), n.lineTo(s.x + h / 2, d), 
                n.lineTo(s.x - h / 2, d), n.moveTo(s.x - h / 2, s.y);
            }
            n.closePath(), n.fill(), n.setGlobalAlpha(1);
        }), !1 !== e.dataPointShape) {
            var u = i.dataPointShape[r % i.dataPointShape.length];
            C(s, t.color, u, n);
        }
    }), !1 !== e.dataLabel && 1 === a && t.forEach(function(t, o) {
        I(w(t.data, c, f, l, h, e, i, a), t, i, n);
    }), n.restore(), {
        xAxisPoints: l,
        calPoints: x,
        eachSpacing: h
    };
}

function q(t, e, i, n) {
    var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1, r = k(t, e, i).ranges, s = F(e.categories, e, i), l = s.xAxisPoints, h = s.eachSpacing, c = r.pop(), f = r.shift(), d = [];
    return n.save(), e._scrollDistance_ && 0 !== e._scrollDistance_ && !0 === e.enableScroll && n.translate(e._scrollDistance_, 0), 
    e.tooltip && e.tooltip.textList && e.tooltip.textList.length && 1 === a && W(e.tooltip.offset.x, e, i, n), 
    t.forEach(function(t, r) {
        var s = w(t.data, c, f, l, h, e, i, a);
        if (d.push(s), S(s).forEach(function(i, a) {
            n.beginPath(), n.setStrokeStyle(t.color), n.setLineWidth(2), 1 === i.length ? (n.moveTo(i[0].x, i[0].y), 
            n.arc(i[0].x, i[0].y, 1, 0, 2 * Math.PI)) : (n.moveTo(i[0].x, i[0].y), "curve" === e.extra.lineStyle ? i.forEach(function(t, e) {
                if (e > 0) {
                    var a = o(i, e - 1);
                    n.bezierCurveTo(a.ctrA.x, a.ctrA.y, a.ctrB.x, a.ctrB.y, t.x, t.y);
                }
            }) : i.forEach(function(t, e) {
                e > 0 && n.lineTo(t.x, t.y);
            }), n.moveTo(i[0].x, i[0].y)), n.closePath(), n.stroke();
        }), !1 !== e.dataPointShape) {
            var x = i.dataPointShape[r % i.dataPointShape.length];
            C(s, t.color, x, n);
        }
    }), !1 !== e.dataLabel && 1 === a && t.forEach(function(t, o) {
        I(w(t.data, c, f, l, h, e, i, a), t, i, n);
    }), n.restore(), {
        xAxisPoints: l,
        calPoints: d,
        eachSpacing: h
    };
}

function B(t, e, i, n) {
    i.save(), t._scrollDistance_ && 0 !== t._scrollDistance_ && !0 === t.enableScroll && i.translate(t._scrollDistance_, 0), 
    t.tooltip && t.tooltip.textList && t.tooltip.textList.length && 1 === n && O(t.tooltip.textList, t.tooltip.offset, t, e, i), 
    i.restore();
}

function j(t, e, i, n) {
    var o = F(t, e, i), r = o.xAxisPoints, s = (o.startX, o.endX, o.eachSpacing), l = e.height - i.padding - i.xAxisHeight - i.legendHeight, h = l + i.xAxisLineHeight;
    n.save(), e._scrollDistance_ && 0 !== e._scrollDistance_ && n.translate(e._scrollDistance_, 0), 
    n.beginPath(), n.setStrokeStyle(e.xAxis.gridColor || "#cccccc"), !0 !== e.xAxis.disableGrid && ("calibration" === e.xAxis.type ? r.forEach(function(t, e) {
        e > 0 && (n.moveTo(t - s / 2, l), n.lineTo(t - s / 2, l + 4));
    }) : r.forEach(function(t, e) {
        n.moveTo(t, l), n.lineTo(t, h);
    })), n.closePath(), n.stroke();
    var f = e.width - 2 * i.padding - i.yAxisWidth - i.yAxisTitleWidth, d = Math.min(t.length, Math.ceil(f / i.fontSize / 1.5)), x = Math.ceil(t.length / d);
    t = t.map(function(t, e) {
        return e % x != 0 ? "" : t;
    }), 0 === i._xAxisTextAngle_ ? (n.beginPath(), n.setFontSize(i.fontSize), n.setFillStyle(e.xAxis.fontColor || "#666666"), 
    t.forEach(function(t, e) {
        var a = s / 2 - c(t) / 2;
        n.fillText(t, r[e] + a, l + i.fontSize + 5);
    }), n.closePath(), n.stroke()) : t.forEach(function(t, o) {
        n.save(), n.beginPath(), n.setFontSize(i.fontSize), n.setFillStyle(e.xAxis.fontColor || "#666666");
        var h = c(t), f = s / 2 - h, d = a(r[o] + s / 2, l + i.fontSize / 2 + 5, e.height), x = d.transX, u = d.transY;
        n.rotate(-1 * i._xAxisTextAngle_), n.translate(x, u), n.fillText(t, r[o] + f, l + i.fontSize + 5), 
        n.closePath(), n.stroke(), n.restore();
    }), n.restore();
}

function N(t, e, i) {
    for (var n = t.height - 2 * e.padding - e.xAxisHeight - e.legendHeight, a = Math.floor(n / e.yAxisSplit), o = e.yAxisWidth + e.yAxisTitleWidth, r = e.padding + o, s = t.width - e.padding, l = [], h = 0; h < e.yAxisSplit; h++) l.push(e.padding + a * h);
    l.push(e.padding + a * e.yAxisSplit + 2), i.beginPath(), i.setStrokeStyle(t.yAxis.gridColor || "#cccccc"), 
    i.setLineWidth(1), l.forEach(function(t, e) {
        i.moveTo(r, t), i.lineTo(s, t);
    }), i.closePath(), i.stroke();
}

function Y(t, e, i, n) {
    if (!0 !== e.yAxis.disabled) {
        var a = k(t, e, i).rangesFormat, o = i.yAxisWidth + i.yAxisTitleWidth, r = e.height - 2 * i.padding - i.xAxisHeight - i.legendHeight, s = Math.floor(r / i.yAxisSplit), l = i.padding + o, h = e.width - i.padding, c = e.height - i.padding - i.xAxisHeight - i.legendHeight;
        n.setFillStyle(e.background || "#ffffff"), e._scrollDistance_ < 0 && n.fillRect(0, 0, l, c + i.xAxisHeight + 5), 
        n.fillRect(h, 0, e.width, c + i.xAxisHeight + 5);
        for (var f = [], d = 0; d <= i.yAxisSplit; d++) f.push(i.padding + s * d);
        n.stroke(), n.beginPath(), n.setFontSize(i.fontSize), n.setFillStyle(e.yAxis.fontColor || "#666666"), 
        a.forEach(function(t, e) {
            var a = f[e] ? f[e] : c;
            n.fillText(t, i.padding + i.yAxisTitleWidth, a + i.fontSize / 2);
        }), n.closePath(), n.stroke(), e.yAxis.title && X(e.yAxis.title, e, i, n);
    }
}

function Z(t, e, i, n) {
    if (e.legend) {
        T(t, e, i).legendList.forEach(function(t, a) {
            var o = 0;
            t.forEach(function(t) {
                t.name = t.name || "undefined", o += 15 + c(t.name) + 15;
            });
            var r = (e.width - o) / 2 + 5, s = e.height - i.padding - i.legendHeight + a * (i.fontSize + 8) + 5 + 8;
            n.setFontSize(i.fontSize), t.forEach(function(t) {
                switch (e.type) {
                  case "line":
                    n.beginPath(), n.setLineWidth(1), n.setStrokeStyle(t.color), n.moveTo(r - 2, s + 5), 
                    n.lineTo(r + 17, s + 5), n.stroke(), n.closePath(), n.beginPath(), n.setLineWidth(1), 
                    n.setStrokeStyle("#ffffff"), n.setFillStyle(t.color), n.moveTo(r + 7.5, s + 5), 
                    n.arc(r + 7.5, s + 5, 4, 0, 2 * Math.PI), n.fill(), n.stroke(), n.closePath();
                    break;

                  case "pie":
                  case "ring":
                    n.beginPath(), n.setFillStyle(t.color), n.moveTo(r + 7.5, s + 5), n.arc(r + 7.5, s + 5, 7, 0, 2 * Math.PI), 
                    n.closePath(), n.fill();
                    break;

                  default:
                    n.beginPath(), n.setFillStyle(t.color), n.moveTo(r, s), n.rect(r, s, 15, 10), n.closePath(), 
                    n.fill();
                }
                r += 20, n.beginPath(), n.setFillStyle(e.extra.legendTextColor || "#333333"), n.fillText(t.name, r, s + 9), 
                n.closePath(), n.stroke(), r += c(t.name) + 10;
            });
        });
    }
}

function J(t, e, i, n) {
    var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1, o = e.extra.pie || {};
    t = M(t, a);
    var r = {
        x: e.width / 2,
        y: (e.height - i.legendHeight) / 2
    }, s = Math.min(r.x - i.pieChartLinePadding - i.pieChartTextPadding - i._pieTextMaxLength_, r.y - i.pieChartLinePadding - i.pieChartTextPadding);
    if (e.dataLabel ? s -= 10 : s -= 2 * i.padding, (t = t.map(function(t) {
        return t._start_ += (o.offsetAngle || 0) * Math.PI / 180, t;
    })).forEach(function(t) {
        n.beginPath(), n.setLineWidth(2), n.setStrokeStyle("#ffffff"), n.setFillStyle(t.color), 
        n.moveTo(r.x, r.y), n.arc(r.x, r.y, s, t._start_, t._start_ + 2 * t._proportion_ * Math.PI), 
        n.closePath(), n.fill(), !0 !== e.disablePieStroke && n.stroke();
    }), "ring" === e.type) {
        var l = .6 * s;
        "number" == typeof e.extra.ringWidth && e.extra.ringWidth > 0 && (l = Math.max(0, s - e.extra.ringWidth)), 
        n.beginPath(), n.setFillStyle(e.background || "#ffffff"), n.moveTo(r.x, r.y), n.arc(r.x, r.y, l, 0, 2 * Math.PI), 
        n.closePath(), n.fill();
    }
    if (!1 !== e.dataLabel && 1 === a) {
        for (var h = !1, c = 0, f = t.length; c < f; c++) if (t[c].data > 0) {
            h = !0;
            break;
        }
        h && D(t, e, i, n, s, r);
    }
    return 1 === a && "ring" === e.type && H(e, i, n), {
        center: r,
        radius: s,
        series: t
    };
}

function K(t, e, i, n) {
    var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1, o = e.extra.radar || {}, s = u(e.categories.length), l = {
        x: e.width / 2,
        y: (e.height - i.legendHeight) / 2
    }, h = Math.min(l.x - (x(e.categories) + i.radarLabelTextMargin), l.y - i.radarLabelTextMargin);
    h -= i.padding, n.beginPath(), n.setLineWidth(1), n.setStrokeStyle(o.gridColor || "#cccccc"), 
    s.forEach(function(t) {
        var e = r(h * Math.cos(t), h * Math.sin(t), l);
        n.moveTo(l.x, l.y), n.lineTo(e.x, e.y);
    }), n.stroke(), n.closePath();
    for (var c = 1; c <= i.radarGridCount; c++) !function(t) {
        var e = {};
        n.beginPath(), n.setLineWidth(1), n.setStrokeStyle(o.gridColor || "#cccccc"), s.forEach(function(a, o) {
            var s = r(h / i.radarGridCount * t * Math.cos(a), h / i.radarGridCount * t * Math.sin(a), l);
            0 === o ? (e = s, n.moveTo(s.x, s.y)) : n.lineTo(s.x, s.y);
        }), n.lineTo(e.x, e.y), n.stroke(), n.closePath();
    }(c);
    return b(s, l, h, t, e, a).forEach(function(t, a) {
        if (n.beginPath(), n.setFillStyle(t.color), n.setGlobalAlpha(.6), t.data.forEach(function(t, e) {
            0 === e ? n.moveTo(t.position.x, t.position.y) : n.lineTo(t.position.x, t.position.y);
        }), n.closePath(), n.fill(), n.setGlobalAlpha(1), !1 !== e.dataPointShape) {
            var o = i.dataPointShape[a % i.dataPointShape.length];
            C(t.data.map(function(t) {
                return t.position;
            }), t.color, o, n);
        }
    }), z(s, h, l, e, i, n), {
        center: l,
        radius: h,
        angleList: s
    };
}

function Q(t, e) {
    e.draw();
}

function U(t) {
    this.isStop = !1, t.duration = void 0 === t.duration ? 1e3 : t.duration, t.timing = t.timing || "linear";
    var e = "undefined" != typeof requestAnimationFrame ? requestAnimationFrame : "undefined" != typeof setTimeout ? function(t, e) {
        setTimeout(function() {
            var e = +new Date();
            t(e);
        }, e);
    } : function(t) {
        t(null);
    }, i = null, n = function(a) {
        if (null === a || !0 === this.isStop) return t.onProcess && t.onProcess(1), void (t.onAnimationFinish && t.onAnimationFinish());
        if (null === i && (i = a), a - i < t.duration) {
            var o = (a - i) / t.duration;
            o = (0, it[t.timing])(o), t.onProcess && t.onProcess(o), e(n, 17);
        } else t.onProcess && t.onProcess(1), t.onAnimationFinish && t.onAnimationFinish();
    };
    n = n.bind(this), e(n, 17);
}

function V(t, e, i, n) {
    var a = this, o = e.series, r = e.categories, s = T(o = l(o, i), e, i).legendHeight;
    i.legendHeight = s;
    var h = k(o, e, i).yAxisWidth;
    if (i.yAxisWidth = h, r && r.length) {
        var c = A(r, e, i), f = c.xAxisHeight, d = c.angle;
        i.xAxisHeight = f, i._xAxisTextAngle_ = d;
    }
    "pie" !== t && "ring" !== t || (i._pieTextMaxLength_ = !1 === e.dataLabel ? 0 : _(o));
    var x = e.animation ? 1e3 : 0;
    switch (this.animationInstance && this.animationInstance.stop(), t) {
      case "line":
        this.animationInstance = new U({
            timing: "easeIn",
            duration: x,
            onProcess: function(t) {
                N(e, i, n);
                var s = q(o, e, i, n, t), l = s.xAxisPoints, h = s.calPoints, c = s.eachSpacing;
                a.chartData.xAxisPoints = l, a.chartData.calPoints = h, a.chartData.eachSpacing = c, 
                j(r, e, i, n), Z(e.series, e, i, n), Y(o, e, i, n), B(e, i, n, t), Q(e, n);
            },
            onAnimationFinish: function() {
                a.event.trigger("renderComplete");
            }
        });
        break;

      case "column":
        this.animationInstance = new U({
            timing: "easeIn",
            duration: x,
            onProcess: function(t) {
                N(e, i, n);
                var s = G(o, e, i, n, t), l = s.xAxisPoints, h = s.eachSpacing;
                a.chartData.xAxisPoints = l, a.chartData.eachSpacing = h, j(r, e, i, n), Z(e.series, e, i, n), 
                Y(o, e, i, n), Q(e, n);
            },
            onAnimationFinish: function() {
                a.event.trigger("renderComplete");
            }
        });
        break;

      case "area":
        this.animationInstance = new U({
            timing: "easeIn",
            duration: x,
            onProcess: function(t) {
                N(e, i, n);
                var s = R(o, e, i, n, t), l = s.xAxisPoints, h = s.calPoints, c = s.eachSpacing;
                a.chartData.xAxisPoints = l, a.chartData.calPoints = h, a.chartData.eachSpacing = c, 
                j(r, e, i, n), Z(e.series, e, i, n), Y(o, e, i, n), B(e, i, n, t), Q(e, n);
            },
            onAnimationFinish: function() {
                a.event.trigger("renderComplete");
            }
        });
        break;

      case "ring":
      case "pie":
        this.animationInstance = new U({
            timing: "easeInOut",
            duration: x,
            onProcess: function(t) {
                a.chartData.pieData = J(o, e, i, n, t), Z(e.series, e, i, n), Q(e, n);
            },
            onAnimationFinish: function() {
                a.event.trigger("renderComplete");
            }
        });
        break;

      case "radar":
        this.animationInstance = new U({
            timing: "easeInOut",
            duration: x,
            onProcess: function(t) {
                a.chartData.radarData = K(o, e, i, n, t), Z(e.series, e, i, n), Q(e, n);
            },
            onAnimationFinish: function() {
                a.event.trigger("renderComplete");
            }
        });
    }
}

function $() {
    this.events = {};
}

var tt = {
    yAxisWidth: 15,
    yAxisSplit: 5,
    xAxisHeight: 15,
    xAxisLineHeight: 15,
    legendHeight: 15,
    yAxisTitleWidth: 15,
    padding: 12,
    columePadding: 3,
    fontSize: 10,
    dataPointShape: [ "diamond", "circle", "triangle", "rect" ],
    colors: [ "#7cb5ec", "#f7a35c", "#434348", "#90ed7d", "#f15c80", "#8085e9" ],
    pieChartLinePadding: 25,
    pieChartTextPadding: 15,
    xAxisTextPadding: 3,
    titleColor: "#333333",
    titleFontSize: 20,
    subtitleColor: "#999999",
    subtitleFontSize: 15,
    toolTipPadding: 3,
    toolTipBackground: "#000000",
    toolTipOpacity: .7,
    toolTipLineHeight: 14,
    radarGridCount: 3,
    radarLabelTextMargin: 15
}, et = {
    toFixed: function(t, e) {
        return e = e || 2, this.isFloat(t) && (t = t.toFixed(e)), t;
    },
    isFloat: function(t) {
        return t % 1 != 0;
    },
    approximatelyEqual: function(t, e) {
        return Math.abs(t - e) < 1e-10;
    },
    isSameSign: function(t, e) {
        return Math.abs(t) === t && Math.abs(e) === e || Math.abs(t) !== t && Math.abs(e) !== e;
    },
    isSameXCoordinateArea: function(t, e) {
        return this.isSameSign(t.x, e.x);
    },
    isCollision: function(t, e) {
        return t.end = {}, t.end.x = t.start.x + t.width, t.end.y = t.start.y - t.height, 
        e.end = {}, e.end.x = e.start.x + e.width, e.end.y = e.start.y - e.height, !(e.start.x > t.end.x || e.end.x < t.start.x || e.end.y > t.start.y || e.start.y < t.end.y);
    }
}, it = {
    easeIn: function(t) {
        return Math.pow(t, 3);
    },
    easeOut: function(t) {
        return Math.pow(t - 1, 3) + 1;
    },
    easeInOut: function(t) {
        return (t /= .5) < 1 ? .5 * Math.pow(t, 3) : .5 * (Math.pow(t - 2, 3) + 2);
    },
    linear: function(t) {
        return t;
    }
};

U.prototype.stop = function() {
    this.isStop = !0;
}, $.prototype.addEventListener = function(t, e) {
    this.events[t] = this.events[t] || [], this.events[t].push(e);
}, $.prototype.trigger = function() {
    for (var t = arguments.length, e = Array(t), i = 0; i < t; i++) e[i] = arguments[i];
    var n = e[0], a = e.slice(1);
    this.events[n] && this.events[n].forEach(function(t) {
        try {
            t.apply(null, a);
        } catch (t) {
            console.error(t);
        }
    });
};

var nt = function(e) {
    e.title = e.title || {}, e.subtitle = e.subtitle || {}, e.yAxis = e.yAxis || {}, 
    e.xAxis = e.xAxis || {}, e.extra = e.extra || {}, e.legend = !1 !== e.legend, e.animation = !1 !== e.animation;
    var i = t({}, tt);
    i.yAxisTitleWidth = !0 !== e.yAxis.disabled && e.yAxis.title ? i.yAxisTitleWidth : 0, 
    i.pieChartLinePadding = !1 === e.dataLabel ? 0 : i.pieChartLinePadding, i.pieChartTextPadding = !1 === e.dataLabel ? 0 : i.pieChartTextPadding, 
    this.opts = e, this.config = i, this.context = wx.createCanvasContext(e.canvasId), 
    this.chartData = {}, this.event = new $(), this.scrollOption = {
        currentOffset: 0,
        startTouchX: 0,
        distance: 0
    }, V.call(this, e.type, e, i, this.context);
};

nt.prototype.updateData = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    this.opts.series = e.series || this.opts.series, this.opts.categories = e.categories || this.opts.categories, 
    this.opts.title = t({}, this.opts.title, e.title || {}), this.opts.subtitle = t({}, this.opts.subtitle, e.subtitle || {}), 
    V.call(this, this.opts.type, this.opts, this.config, this.context);
}, nt.prototype.stopAnimation = function() {
    this.animationInstance && this.animationInstance.stop();
}, nt.prototype.addEventListener = function(t, e) {
    this.event.addEventListener(t, e);
}, nt.prototype.getCurrentDataIndex = function(t) {
    var e = t.touches && t.touches.length ? t.touches : t.changedTouches;
    if (e && e.length) {
        var i = e[0], n = i.x, a = i.y;
        return "pie" === this.opts.type || "ring" === this.opts.type ? m({
            x: n,
            y: a
        }, this.chartData.pieData) : "radar" === this.opts.type ? v({
            x: n,
            y: a
        }, this.chartData.radarData, this.opts.categories.length) : p({
            x: n,
            y: a
        }, this.chartData.xAxisPoints, this.opts, this.config, Math.abs(this.scrollOption.currentOffset));
    }
    return -1;
}, nt.prototype.showToolTip = function(e) {
    var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    if ("line" === this.opts.type || "area" === this.opts.type) {
        var n = this.getCurrentDataIndex(e), a = this.scrollOption.currentOffset, o = t({}, this.opts, {
            _scrollDistance_: a,
            animation: !1
        });
        if (n > -1) {
            var r = d(this.opts.series, n);
            if (0 !== r.length) {
                var s = g(r, this.chartData.calPoints, n, this.opts.categories, i), l = s.textList, h = s.offset;
                o.tooltip = {
                    textList: l,
                    offset: h,
                    option: i
                };
            }
        }
        V.call(this, o.type, o, this.config, this.context);
    }
}, nt.prototype.scrollStart = function(t) {
    t.touches[0] && !0 === this.opts.enableScroll && (this.scrollOption.startTouchX = t.touches[0].x);
}, nt.prototype.scroll = function(e) {
    if (e.touches[0] && !0 === this.opts.enableScroll) {
        var n = e.touches[0].x - this.scrollOption.startTouchX, a = this.scrollOption.currentOffset, o = i(a + n, this.chartData, this.config, this.opts);
        this.scrollOption.distance = n = o - a;
        var r = t({}, this.opts, {
            _scrollDistance_: a + n,
            animation: !1
        });
        V.call(this, r.type, r, this.config, this.context);
    }
}, nt.prototype.scrollEnd = function(t) {
    if (!0 === this.opts.enableScroll) {
        var e = this.scrollOption, i = e.currentOffset, n = e.distance;
        this.scrollOption.currentOffset = i + n, this.scrollOption.distance = 0;
    }
}, module.exports = nt;