/**
 * Draws a Circle
 * @extends {Drawing}
 * @type {Circle}
 */
var Circle = gauges.Circle = Drawing.extend({
    /**
     * @constructor
     * @param x {Number}
     * @param y {Number}
     * @param radius {Number}
     */
    constructor: function (x, y, radius) {
        this.x = (x || 0);
        this.y = (y || 0);
        this.r = (radius || gauges.DEFAULTS.Circle.radius);
    },

    getX: function () {
        return this.x;
    },

    getY: function () {
        return this.y;
    },

    getRadius: function () {
        return this.r;
    },

    getStartAngle: function () {
        return 0;
    },

    getEndAngle: function () {
        return (Math.PI * 2);
    },

    isClockWise: function () {
        return false;
    },

    /**
     * @override
     * @param context {CanvasRenderingContext2D}
     */
    draw: function (context) {
        context.arc(
            this.getX(),
            this.getY(),
            this.getRadius(),
            this.getStartAngle(),
            this.getEndAngle(),
            this.isClockWise()
        );
    }
});