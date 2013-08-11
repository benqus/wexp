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