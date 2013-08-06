define([
    'drawing/Drawing'
], function (Drawing) {
    var Canvas = function (canvas, context) {
        this.canvas = document.getElementById(canvas);
        this.context = (context || "2d");
        this.isDrawing = false;
        this.lastPositions = {
            x: 0,
            y: 0
        }
    };

    Canvas.prototype = {
        constructor: Canvas,

        history: [],

        addToHistory: function (drawing) {
            if (drawing instanceof Drawing) {
                this.history.push(Drawing);
            }
            return this;
        },

        getElement: function () {
            return this.canvas;
        },


        getContext: function () {
            return this.getElement().getContext(this.context);
        },

        startDrawing: function (x, y) {
            this.isDrawing = true;
            this.setLastPositions(x, y);
            return this;
        },

        stopDrawing: function (x, y) {
            this.isDrawing = false;
            this.setLastPositions(x, y);
            return this;
        },

        setLastPositions: function (x, y) {
            this.lastPositions.x = x;
            this.lastPositions.y = y;
            return this;
        }
    };

    return Canvas;
});