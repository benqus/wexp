var Circle = gauges.Circle = Drawing.extend({
    constructor: function (x, y, radius, start, end, clockWise) {
        this.x = (x || 0);
        this.y = (y || 0);
        this.r = (radius || gauges.defaults);
        this.start = (start || 0);
        this.end = (end || (Math.PI * 2));
        this.clockWise = (clockWise !== false);
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
        return this.start;
    },

    getEndAngle: function () {
        return this.end;
    },

    isClockWise: function () {
        return this.clockWise;
    },

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