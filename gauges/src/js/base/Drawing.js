var Drawing = gauges.Drawing = Base.extend({
    constructor: function (canvas) {
        this.canvas = undefined;
        this.context = undefined;

        if (canvas) {
            this.setCanvas(canvas);
        }
    },

    getWidth: function () {
        return this.canvas.width;
    },

    getHeight: function () {
        return this.canvas.height;
    },

    getContext: function () {
        return this.context;
    },

    setCanvas: function (canvas) {
        if (canvas) {
            this.canvas = getCanvas(canvas);
            this.context = getContext(this.canvas);
        }

        return this;
    },

    beforeDraw: function (context) {
        context.save();
        return this;
    },

    draw: function (/* context */) {
        return this;
    },

    afterDraw: function (context) {
        context.restore();
        return this;
    },

    render: function () {
        var context = this.getContext();

        this.beforeDraw(context);

        this.draw(context);

        this.afterDraw(context);

        return this;
    }
});