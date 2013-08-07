define([
    'Position',
    'drawing/Drawing'
], function (Position, Drawing) {
    return Drawing.extend({
        constructor: function (canvas) {
            Drawing.apply(this, arguments);

            //line will start from these coordinates
            this._from = new Position();

            //line will end at these coordinates
            this._to = new Position();
        },

        //sets starting positions
        from: function (x, y) {
            this._from.setPositions(x, y);
            return this;
        },

        //sets end positions
        to: function (x, y) {
            this._to.setPositions(x, y);
            return this;
        },

        //draws the line
        draw: function () {
            var context = this.getContext();

            context.beginPath();
            context.moveTo.apply(context, this._from.getPositionsAsArray());
            context.lineTo.apply(context, this._to.getPositionsAsArray());

            return Drawing.prototype.draw.call(this);
        }
    });
});