var Blur = gauges.Blur = Shadow.extend({
    constructor: function (blur, color) {
        Shadow.call(this, 0, 0, blur, color);
    }
});