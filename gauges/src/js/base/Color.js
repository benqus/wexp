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