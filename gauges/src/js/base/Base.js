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