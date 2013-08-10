/**
 * Version: 0.1.0
 */

(function () {

    var global = this;
    var defaults = {
        width: 200,
        height: 200,
        radius: 5
    };
    var gauges = {
        defaults: defaults
    };
    
    global.gauges && (gauges._gauges = global.gauges);
    global.gauges = gauges;

    function createCanvas(width, height) {
        var defaults = gauges.defaults;
        var canvas = document.createElement('canvas');
    
        canvas.width = width || defaults.width;
        canvas.height = height || defaults.height;
    
        return canvas;
    }
    
    function getCanvas(canvas) {
        if (typeof canvas === "string") {
            canvas = document.getElementById(canvas);
        }
    
        return canvas;
    }
    
    function getContext(canvas) {
        return canvas.getContext("2d");
    }
    
    function getConsole() {
        var console = console;
    
        if (!console) {
            console = {
                log: function () {},
                warm: function () {},
                info: function () {},
                trace: function () {}
            }
        }
    
        return console;
    }
    
    function mix(receiver, provider) {
        var i;
    
        for (i in provider) {
            if (provider.hasOwnProperty(i)) {
                receiver[i] = provider[i];
            }
        }
    
        return receiver;
    }

    function Base() {}
    
    Base.extend = function extend(proto) {
        proto || (proto = {});
    
        var Base = this;
        var constructor = proto.constructor;
    
        if (typeof constructor !== 'function') {
            constructor = function () {
                return Base.apply(this, arguments);
            };
        }
    
        var prototype = Object.create(Base.prototype);
    
        mix(prototype, proto);
    
        constructor.extend = extend;
        constructor.prototype = prototype;
    
        return constructor;
    };
    
    gauges.Base = Base;

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

}).call(this);