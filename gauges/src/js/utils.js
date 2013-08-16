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