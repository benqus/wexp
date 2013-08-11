var Shadow = gauges.Shadow = Base.extend({
    /**
     * @constructor
     * @param x {Number} X offset
     * @param y {Number} Y offset
     * @param blur {Number} blur
     * @param color {Color|undefined}
     */
    constructor: function (x, y, blur, color) {
        var defaults = DEFAULTS.Shadow;

        this.color = undefined;
        this.blur = (blur || defaults.blur);
        this.offset = {
            x: (x || defaults.offset.x),
            y: (y || defaults.offset.y)
        };

        this.setColor(color || new Color());
    },

    getX: function () {
        return this.offset.x;
    },

    getY: function () {
        return this.offset.y;
    },

    getBlur: function () {
        return this.blur;
    },

    getColor: function () {
        return this.color.toString();
    },

    setColor: function (color) {
        if (color instanceof Color) {
            this.color = color;
        }

        return this;
    },

    draw: function (context) {
        context.save();
        context.shadowBlur = this.getBlur();
        context.shadowColor = this.getColor();
        context.shadowOffsetX = this.getX();
        context.shadowOffsetY = this.getY();
        context.restore();

        return this;
    }
});