function t(t) {
    return void 0 == t || null == t || "" == t.toString().trim() || "null" == t.toString().trim().toLowerCase() || "{}" == JSON.stringify(t) || "[]" == JSON.stringify(t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports._showToast = function(t) {
    wx.showToast({
        title: t.title || "提示信息",
        icon: t.icon || "none",
        duration: t.duration || 1500,
        mask: t.mask || !0
    });
}, exports._showLoading = function(t) {
    wx.showLoading({
        title: t || "玩命加载中...",
        mask: !0
    });
}, exports._hideLoading = function() {
    wx.hideLoading();
}, exports._hideToast = function() {
    wx.hideToast();
}, exports._isEmpty = t, exports._isNotEmpty = function(o) {
    return !t(o);
}, exports._isTrue = function(t) {
    return "true" == t.toString().toLowerCase();
}, exports._isFalse = function(t) {
    return "false" == t.toString().toLowerCase();
};