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
    var element = canvas.getElement();

//    element.style.width = window.innerWidth + "px";
//    element.style.height = window.innerHeight + "px";

    element.width = window.innerWidth;
    element.height = window.innerHeight;

    $(document)
        .on("mousedown", function (evt) {
            var x = evt.pageX;
            var y = evt.pageY;

            canvas.startDrawing(x, y);

            //draw red circles of 3px radius
            new Circle(canvas.getElement())
                .setPosition(x, y)
                .setRadius(10)
                .setFillColor("#ff0000")
                .draw();
        })
        .on("mousemove", function (evt) {
            var last = canvas.lastPositions;

            if (canvas.isDrawing) {
                var x = evt.pageX;
                var y = evt.pageY;

                //drawing a line
                new Line(element)
                    .from(last.x, last.y)
                    .to(x, y)
                    .below()
                    .setStrokeWidth(2)
                    .draw();

                //draw red circles of 3px radius
                new Circle(element)
                    .setPosition(x, y)
                    .setRadius(10)
                    .setStrokeWidth(1)
                    .setFillColor("#ff0000")
                    .draw();

                canvas.setLastPositions(x, y);
            }
        })
        .on("mouseup", function (evt) {
            canvas.stopDrawing(evt.pageX, evt.pageY);
        });
});