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

        /**
         * @type {Number}
         */
        this.x = undefined;
        /**
         * @type {Number}
         */
        this.y = undefined;
        /**
         * @type {Boolean}
         */
        this.isolated = (isolated === true);
        /**
         * @type {Number}
         */
        this.rotated = 0;
        /**
         * @type {Number}
         */
        this.scaleX = DEFAULTS.scaleX;
        /**
         * @type {Number}
         */
        this.scaleY = DEFAULTS.scaleY;

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

    getX: function () {
        return this.x;
    },

    getY: function () {
        return this.y;
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

    getBlur: function () {
        return this.blur;
    },

    getShadow: function () {
        return this.shadow;
    },

    hasBlur: function () {
        return (this.blur instanceof Blur);
    },

    hasShadow: function () {
        return (this.shadow instanceof Shadow);
    },

    /**
     * @param canvas
     * @returns {*}
     */
    setCanvas: function (canvas) {
        if (canvas instanceof HTMLCanvasElement) {
            this.canvas = getCanvas(canvas);
            this.context = getContext(this.canvas);
        }

        return this;
    },

    /**
     * Sets the fill for the drawing
     * @param color {Color}
     * @returns {Drawing}
     */
    setFill: function (color) {
        if (color instanceof Color) {
            this.isolate();
            this.strokeColor = color;
        }

        return this;
    },

    /**
     * Sets the stroke for the drawing
     * @param color {Color}
     * @returns {Drawing}
     */
    setStroke: function (color) {
        if (color instanceof Color) {
            this.isolate();
            this.strokeColor = color;
        }

        return this;
    },

    /**
     * Adds a drop shadow for the Drawing
     * @param shadow {Shadow} a Shadow instance
     * @returns {Drawing}
     */
    setShadow: function (shadow) {
        if (shadow instanceof Shadow) {
            this.isolate();
            this.shadow = shadow;
        }

        return this;
    },

    /**
     * Adds a Blur to the Drawing
     * @param blur {Blur}
     * @param [color] {Color}
     * @returns {Drawing}
     */
    setBlur: function (blur, color) {
        //color is either specified or the stroke color or the fill color
        color = (color || this.getStrokeColor() || this.getFillColor());

        if (color) {
            this.isolate();
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
        return (Math.PI * (angle / 180));
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
            var shadow = this.getShadow();
            var blur = this.getBlur();
            var stroke = this.get();

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