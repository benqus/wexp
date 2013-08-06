define(function () {

    var Drawing = function (canvas, context) {
        this.canvas = canvas;
        this.context = (context || "2d");
    };

    Drawing.prototype = {
        constructor: Drawing,

        getCanvas: function () {
            return this.canvas;
        },

        getContext: function () {
            return this.getCanvas().getContext(this.context);
        },

        //base draw method, needs to be overridden
        draw: function () {
            this.getContext()
                .restore();

            return this;
        }
    };

    Drawing.extend = function (proto) {
        var Base = this;
        var constructor;

        proto || (proto = {});

        if (typeof proto.constructor === 'function') {
            constructor = proto.constructor;
            delete proto.constructor;
        } else {
            constructor = function () {
                return Base.apply(this, arguments);
            };
        }

        var Surrogate = function () {};
        Surrogate.prototype = Base.prototype;

        var surrogate = new Surrogate();

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
        constructor.extend = Base.extend;

        return constructor;
    };

    return Drawing;
});