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