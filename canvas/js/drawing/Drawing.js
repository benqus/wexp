define(function () {

    var Drawing = function (canvas, context) {
        this.canvas = canvas;
        this.context = (context || "2d");

        context = this.getContext();

        this.fillColor = context.fillStyle;
        this.strokeColor = context.strokeStyle;
        this.strokeWidth = context.lineWidth;
        this.globalCompositeOperation = "source-over";
    };

    Drawing.prototype = {
        constructor: Drawing,

        below: function () {
            this.globalCompositeOperation = "destination-over";
            return this;
        },

        above: function () {
            this.globalCompositeOperation = "source-over";
            return this;
        },

        getCanvas: function () {
            return this.canvas;
        },

        getContext: function () {
            return this.getCanvas().getContext(this.context);
        },

        setStrokeColor: function (color) {
            this.strokeColor = color;
            return this;
        },

        setStrokeWidth: function (width) {
            this.strokeWidth = width;
            return this;
        },

        setFillColor: function (color) {
            this.fillColor = color;
            return this;
        },

        //base draw method, needs to be overridden
        draw: function () {
            var context = this.getContext();

            //drawing Drawing
            context.fillStyle = this.fillColor;
            context.strokeStyle = this.strokeColor;
            context.lineWidth = this.strokeWidth;
            context.globalCompositeOperation = this.globalCompositeOperation;
            context.fill();
            context.stroke();

            //restoring context
            context.restore();

            return this;
        }
    };

    Drawing.extend = function extend(proto) {
        var Super = this;
        var constructor;

        proto || (proto = {});

        if (typeof proto.constructor === 'function') {
            constructor = proto.constructor;
            delete proto.constructor;
        } else {
            constructor = function () {
                return Super.apply(this, arguments);
            };
        }

        var surrogate = Object.create(Super.prototype);

        //merging prototype properties
        var i;
        for (i in proto) {
            if (proto.hasOwnProperty(i)) {
                surrogate[i] = proto[i];
            }
        }

        //setting constructor
        surrogate.constructor = constructor;

        //setting inheritance
        constructor.prototype = surrogate;
        constructor.extend = extend;
        constructor.base = Super;

        return constructor;
    };

    return Drawing;
});