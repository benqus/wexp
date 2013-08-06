define([
    'Coordinate'
],function (Coordinate) {
    var Position = function (x, y) {
        this.x = new Coordinate(x);
        this.y = new Coordinate(y);
    };

    Position.prototype = {
        constructor: Position,

        getX: function () {
            return this.x.get();
        },

        setX: function (x) {
            this.x.set(x);
            return this;
        },

        getY: function () {
            return this.y.get();
        },

        setY: function (y) {
            this.y.set(y);
            return this;
        },

        setPositions: function (x, y) {
            return this.setX(x).setY(y);
        },

        clone: function () {
            return new Position(this.getX(), this.getY());
        },

        getPositionsAsArray: function () {
            return [this.getX(), this.getY()];
        }
    };

    return Position;
});