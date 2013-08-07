define([
    'Position',
    'drawing/Drawing'
], function (Position, Drawing) {
    return Drawing.extend({
        constructor: function () {
            Drawing.apply(this, arguments);

            this.position = new Position();
            this.radius = 5;
        },

        setRadius: function (r) {
            (typeof r === "number" && !isNaN(r) && (this.radius = r));
            return this;
        },

        setPosition: function (x, y) {
            this.position
                .setPositions(x, y);

            return this;
        },

        draw: function () {
            var context= this.getContext();
            var position = this.position;

            context.beginPath();
            context.arc(position.getX(), position.getY(), this.radius, 0, (2 * Math.PI));
            context.fillStyle = "#ffffff";
            context.fill();
            context.stroke();

            return Drawing.prototype.draw.call(this);
        }
    });
});