(function (win, lib) {
    var _width = 750,
        _fontSize = 100,
        flexRem = lib.flexRem || (lib.flexRem = {}),
        tid;
    var docEl = document.documentElement;

    function refreshRem() {
        var deviceW = docEl.clientWidth;
        // 限定宽度最高540
        // deviceW >=540 && (deviceW = 540);
        var rem = deviceW / (_width / _fontSize);
        docEl.style.fontSize = rem + 'px';
        flexRem.rem = rem;
    }
    refreshRem();
    flexRem.refreshRem = refreshRem;
    flexRem.rem2px = function (d) {
        var val = parseFloat(d) * this.rem;
        if (typeof d === 'string' && d.match(/rem$/)) {
            val += 'px';
        }
        return val;
    };
    flexRem.px2rem = function (d) {
        var val = parseFloat(d) / this.rem;
        if (typeof d === 'string' && d.match(/px$/)) {
            val += 'rem';
        }
        return val;
    }
    window.addEventListener('resize', function (e) {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);
})(window, window['lib'] || (window['lib'] = {}));