define(function () {
    var Coordinate = function (num) {
        this.number = (this.check(num) || 0);
    };

    Coordinate.prototype = {
        constructor: Coordinate,

        check: function (num) {
            return (typeof num === "number" && !isNaN(num) && isFinite(num));
        },

        get: function () {
            return this.number;
        },

        set: function (num) {
            (this.check(num) && (this.number = num))
        }
    };

    return Coordinate;
});