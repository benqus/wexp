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