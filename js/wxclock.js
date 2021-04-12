var t = function() {
    function t() {}
    return t.prototype.init = function(t) {
        this.destroy(), this.time = parseInt((t || new Date().getTime()) / 1e3), this.timer = setInterval(function() {
            this.time++;
        }.bind(this), 1e3);
    }, t.prototype.destroy = function() {
        this.timer && (clearInterval(this.timer), this.timer = void 0);
    }, t.prototype.getTime = function() {
        return this.time;
    }, t;
}();

module.exports = {
    Clock: new t()
};