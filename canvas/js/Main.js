requirejs.config({
    paths: {
        "drawing": "drawing"
    }
});

require([
    'Canvas',
    'drawing/Line',
    'drawing/Circle'
], function (Canvas, Line, Circle) {
    var canvas = new Canvas("canvas");

    $(document)
        .on("mousedown", function (evt) {
            canvas.startDrawing(evt.screenX, evt.screenY);
        })
        .on("mousemove", function (evt) {
            var last = canvas.lastPositions;
            var element = canvas.getElement();

            if (canvas.isDrawing) {
                var x = evt.screenX;
                var y = evt.screenY;

                //drawing a line
                var line = new Line(element);
                line
                    .from(last.x, last.y)
                    .to(x, y)
                    .draw();

                //draw red circles of 15px radius
                var circle = new Circle(element);
                circle
                    .setPosition(x, y)
                    .setRadius(15)
                    .draw();

                console.log(line, circle);

                canvas.setLastPositions(x, y);
            }
        })
        .on("mouseup", function (evt) {
            canvas.stopDrawing(evt.screenX, evt.screenY);
        });
});