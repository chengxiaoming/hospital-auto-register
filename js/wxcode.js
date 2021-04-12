function e(e) {
    return Math.round(wx.getSystemInfoSync().windowWidth * e / 750);
}

var r = require("./qrcode.js"), o = require("./barcode.js");

module.exports = {
    qrcode: function(o, t, n, c, d) {
        r.api.draw(o, t, e(n), e(c), d);
    },
    barcode: function(r, t, n, c) {
        o.code128(wx.createCanvasContext(r), t, e(n), e(c));
    }
};