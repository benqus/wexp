var Rectangle = gauges.Rectangle = Drawing.extend({
    constructor: function (x, y, width, height) {
        this.x = (x || 0);
        this.y = (y || 0);
        this.width = (width || 1);
        this.height = (height || 1);
    },

    getX: function () {
        return this.x;
    },

    getY: function () {
        return this.y;
    },

    getWidth: function () {
        return this.width;
    },

    getHeight: function () {
        return this.height;
    },

    draw: function (context) {
        context.fillRect(
            this.getX(),
            this.getY(),
            this.getWidth(),
            this.getHeight()
        );

        return this;
    }
});