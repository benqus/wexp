/**
 * Version: 0.1.0
 */

(function () {

    var global = this;
    var DEFAULTS = {
        width: 200,
        height: 200,
        scaleX: 1,
        scaleY: 1,
        radius: 5,
        Circle: {
            radius: 5
        },
        Rectangle: {
            width: 1,
            height: 1
        },
        Shadow: {
            offset: {
                x: 0,
                y: 0
            },
            blur: 0,
            color: 'black'
        },
        Color: {
            R: 0,
            G: 0,
            B: 0,
            ALPHA: 1
        }
    };
    var gauges = {
        defaults: DEFAULTS
    };
    
    global.gauges && (gauges._gauges = global.gauges);
    global.gauges = gauges;

    /**
     * creates a new HTMLCanvasElement
     * @param width {Number}
     * @param height {Number}
     * @returns {HTMLCanvasElement}
     */
    function createCanvas(width, height) {
        var defaults = gauges.defaults;
        var canvas = document.createElement('canvas');
    
        canvas.width = width || defaults.width;
        canvas.height = height || defaults.height;
    
        return canvas;
    }
    
    /**
     * Returns a HTMLCanvasElement from the document (if the argument is String type) or the given HTMLCanvasElement
     * @param canvas {String|HTMLCanvasElement}
     * @returns {undefined|HTMLCanvasElement}
     */
    function getCanvas(canvas) {
        if (typeof canvas === "string") {
            canvas = document.getElementById(canvas);
        }
    
        return canvas;
    }
    
    /**
     * Return the context of a HTMLCanvasElement
     * @param canvas {HTMLCanvasElement}
     * @returns {*|CanvasRenderingContext2D}
     */
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
    
    /**
     * Merges all enumerable properties from the provider object to the receiver object
     * @param receiver {Object}
     * @param provider  {Object}
     * @returns {Object}
     */
    function mix(receiver, provider) {
        var i;
    
        for (i in provider) {
            if (provider.hasOwnProperty(i)) {
                receiver[i] = provider[i];
            }
        }
    
        return receiver;
    }
    
    /**
     * Determines whether a string is a hexadecimal string
     * @param string {String}
     * @returns {*|Boolean}
     */
    function isHexaColor(string) {
        //string and proper length for
        if (typeof string === 'string' && [3, 4, 6, 8].indexOf(string.length) > -1) {
            return ((/^#[a-f\d]$/).test(string));
        }
    
        return false;
    }
    
    /**
     * Determines whether a string is an RGB string. Example: "rgba(255, 255, 255, 0.45)" or "rgba(255, 120, 0)"
     * @param string {String}
     * @returns {*|Boolean}
     */
    function isRGBColor(string) {
        var valid = false;
        var args;
    
        if (typeof string === 'string') {
            args = string.replace(/[\s\)]/g, '').replace('(', ',').split(',');
    
            valid = (
                /^rgb(a)?$/.test(args[0]) && //is rgb or rgba
                parseInt(args[1], 10) < 256 && // R is less than 256
                parseInt(args[2], 10) < 256 && // G is less than 256
                parseInt(args[3], 10) < 256 && // B is less than 256
                (typeof args[4] === 'undefined' || parseFloat(args[4], 10) < 1)  // Alpha
            );
        }
    
        return valid;
    }
    
    gauges.mix = mix;
    gauges.createCanvas = createCanvas;
    gauges.getCanvas = getCanvas;
    gauges.getContext = getContext;
    gauges.getConsole = getConsole;
    gauges.isHexaColor = isHexaColor;
    gauges.isRGBColor = isRGBColor;

    function Base() {}
    
    Base.prototype = {
        constructor: Base
    };
    
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
     * RGB color class
     * @type {Color}
     */
    var Color = gauges.Color = Base.extend({
        /**
         * @constructor
         * @param r {Number} 0 to 255
         * @param g {Number} 0 to 255
         * @param b {Number} 0 to 255
         * @param a {Number} 0 to 255
         */
        constructor: function (r, g, b, a) {
            var defaults = DEFAULTS.Color;
    
            this.r = (r || defaults.R);
            this.g = (g || defaults.G);
            this.b = (b || defaults.B);
            this.a = (a || 1);
        },
    
        getR: function () {
            return this.r;
        },
    
        getG: function () {
            return this.g;
        },
    
        getB: function () {
            return this.b;
        },
    
        getA: function () {
            return this.a;
        },
    
        /**
         * Clones a new Color instance based on the current context
         * @returns {Color}
         */
        clone: function () {
            return new Color(this.getR(), this.getG(), this.getB(), this.getA());
        },
    
        /**
         * Converts the Color to a parseable string
         * @returns {string}
         */
        toString: function () {
            return ([
                ("rgba(" + this.getR()),
                this.getG(),
                this.getB(),
                (this.getA() + ")")
            ].join(", "));
        }
    });
    
    /**
     * Converters
     * @type {{HexToRGB: Function, RGBToHex: Function}}
     */
    Color.convert = {
        /**
         * Converts a hexadecimal string to RGBA values
         * @param hex {String} 'fff', '#fff', '#ffcedb', 'ffff', '#bbddcc44'
         * @returns {Array}
         */
        HexToRGB: function (hex) {
            //sanitizing string
            hex = ((hex || '').match(/[a-f\d]{3,8}/)[0] || '');
    
            var array;
            var result = [];
    
            if (hex.length > 4) {// long hexa
                array = hex.match(/.{1,2}/g);
            } else if (hex.length >= 3) { // short hexa
                array = hex.split('');
    
                //duplicate each character by itself
                array[0] += array[0];
                array[1] += array[1];
                array[2] += array[2];
    
                //if alpha is specified
                if (array[3]) {
                    array[3] += '0';
                }
            } else {
                //if it was an empty or an unknown edge case return the default values
                return result;
            }
    
            switch (array.length) {
                case 8:
                case 4:
                    result[3] = (parseInt(array[3], 16) / 256);
                    //let switch fall through to parse R, G, and B values
                case 6:
                case 3:
                    result[0] = parseInt(array[0], 16);
                    result[1] = parseInt(array[1], 16);
                    result[2] = parseInt(array[2], 16);
                    break;
            }
    
            return result;
        },
    
        /**
         * Convert RGB to hexadecimal string
         * @param r {Number} 0 to 255
         * @param g {Number} 0 to 255
         * @param b {Number} 0 to 255
         * @param a {Number} 0 to 1 or 0 to 255
         * @returns {String}
         * @constructor
         */
        RGBToHex: function (r, g, b, a) {
            var defaults = DEFAULTS.Color;
    
            r || (r = defaults.R);
            g || (g = defaults.G);
            b || (b = defaults.B);
    
            r = r.toString(16);
            g = g.toString(16);
            b = b.toString(16);
    
            if (a >= 0 && a < 256) {
                if (a < 1) {
                    a = Math.round(256 * a);
                }
                //do nothing if a is between 0 and 255
            }
    
            //alpha is specified
            if (a) {
                a = a.toString(16);
                a = (a.length === 1 ? '0' + a : a);
            }
    
            return ([
                '#',
                (r.length === 1 ? '0' + r : r),
                (g.length === 1 ? '0' + g : g),
                (b.length === 1 ? '0' + b : b),
                (a || '')
            ].join(''));
        }
    };
    
    /**
     * Creates and returns a new Color instance from hexadecimal string
     * @param hex {String}
     * @returns {Color}
     */
    Color.fromHex = function (hex) {
        var color = Color.convert.HexToRGB(hex);
    
        return new Color(color[0], color[1], color[2], color[3]);
    };
    
    /**
     * Determines whether the given parameter is a Color instance
     * @static
     * @param color {*}
     * @returns {Boolean}
     */
    Color.isColor = function (color) {
        return (color instanceof Color);
    };

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

    var Stroke = gauges.Stroke = Base.extend({
        constructor: function (width, color) {
            this.width = width;
            this.color = color;
        }
    });

    var Blur = gauges.Blur = Shadow.extend({
        constructor: function (blur, color) {
            Shadow.call(this, 0, 0, blur, color);
        }
    });

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

}).call(this);