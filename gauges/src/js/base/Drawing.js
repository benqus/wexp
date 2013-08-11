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
        this.rotated = 0;
        this.scaleX = DEFAULTS.scaleX;
        this.scaleY = DEFAULTS.scaleY;

        //TODO: implement these stuff
        /**
         * @type {Shadow}
         */
        this.shadow = undefined;
        /**
         * @type {Blur}
         */
        this.blur = undefined;
        /**
         * @type {Color}
         */
        this.fillColor = undefined;
        /**
         * @type {Color}
         */
        this.strokeColor = undefined;

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

    getRotation: function() {
        return this.rotated;
    },

    getScaleX: function() {
        return this.scaleX;
    },

    getScaleY: function() {
        return this.scaleY;
    },

    getFillColor: function () {
        return this.fillColor.toString();
    },

    getStrokeColor: function () {
        return this.strokeColor.toString();
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

    shadow: function () {
        return this;
    },

    blur: function (blur) {
        var color = (this.getStrokeColor() || this.getFillColor());

        if (color) {
            this.blur = new Blur(blur, color.clone());
        }

        return this;
    },

    /**
     * Converts the given angle (in degrees) to radians
     * @param angle {Number} example: 360 (full circle)
     * @returns {Number}
     */
    convertAngle: function (angle) {
        return (Math.PI * (angle * 180));
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
     * Isolates and rotates the Drawing
     * @param angle {Number}
     * @returns {Drawing}
     */
    rotate: function (angle) {
        this.isolate();
        this.rotated = this.convertAngle(angle);
        return this;
    },

    /**
     * Scales the drawing
     * @param x {Number}
     * @param [y] {Number}
     * @returns {Drawing}
     */
    scale: function (x, y) {
        if (x > 0 && y > 0) {
            this.isolate();
            this.scaleX = x;
            this.scaleY = (y || x);
        }

        return this;
    },

    /**
     * Method should be overriden only in special cases
     * @param context {CanvasRenderingContext2D} the context the drawing will be drawn on
     * @returns {Drawing}
     */
    beforeDraw: function (context) {
        //Only if the Drawing is isolated
        if (this.isIsolated()) {
            var rotation = this.getRotation();
            var scaleX = this.getScaleX();
            var scaleY = this.getScaleY();

            context.save();

            if (rotation !== 0) {
                context.rotate(rotation);
            }

            if (scaleX !== 1 || scaleY !== 1) {
                context.scale(scaleX, scaleY);
            }
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