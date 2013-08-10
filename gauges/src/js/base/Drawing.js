/**
 * Abstract class for any drawing which will be drawn on the canvas.
 * @type {Drawing}
 */
var Drawing = gauges.Drawing = Base.extend({
    /**
     * @constructor
     * @param canvas {String|HTMLCanvasElement}
     * @param isolated {Boolean} should draw the Drawing in an isolated context
     */
    constructor: function (canvas, isolated) {
        this.canvas = undefined;
        this.context = undefined;
        this.isolated = (isolated === true);

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

    /**
     * @param canvas
     * @returns {*}
     */
    setCanvas: function (canvas) {
        if (canvas) {
            this.canvas = getCanvas(canvas);
            this.context = getContext(this.canvas);
        }

        return this;
    },

    /**
     * Isolates the Drawing in a separate coordinate system
     * @returns {*}
     */
    isolate: function () {
        this.isolated = true;
        return this;
    },

    /**
     * Determines whether the Drawing is isolated
     * @returns {*}
     */
    isIsolated: function () {
        return this.isolated;
    },

    /**
     * Method should be overriden only in special cases
     * @param context {CanvasRenderingContext2D} the context the drawing will be drawn on
     * @returns {Drawing}
     */
    beforeDraw: function (context) {
        if (this.isIsolated()) {
            context.save();
        }

        return this;
    },

    /**
     * Draws the Drawing to the canvas. Method should be overriden.
     * @param context {CanvasRenderingContext2D} the context the drawing will be drawn on
     * @returns {Drawing}
     */
    draw: function (context) {
        return this;
    },

    /**
     * Method should be overriden only in special cases
     * @param context {CanvasRenderingContext2D} the context the drawing will be drawn on
     * @returns {Drawing}
     */
    afterDraw: function (context) {
        if (this.isIsolated()) {
            context.restore();
        }

        return this;
    },

    /**
     * Method should not be used only by the framework.
     * @returns {Drawing}
     */
    render: function () {
        var context = this.getContext();

        //logic before drawing
        this.beforeDraw(context);

        //drawing logic
        this.draw(context);

        //logic after drawing
        this.afterDraw(context);

        return this;
    }
});