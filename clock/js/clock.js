(function () {
    var canvas;
    var context;
    var radius;
    var tickLength = 10;

    //Math.PI = 180 degrees = half hour
    var ticks = {
        h: (Math.PI / 6),
        ms: (Math.PI / 30)
    };

    function drawLine(rotate, lineWidth, color, number) {
        var metrics;

        context.save();

        context.translate((canvas.width / 2), (canvas.height / 2));
        context.rotate(rotate);

        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(0, (-radius + (tickLength * 2.5)));
        context.lineWidth = (lineWidth || 1);
        context.strokeStyle = color;
        context.lineCap = "round";
        context.stroke();
        context.closePath();

        if (typeof number === "number" && !isNaN(number)) {
            context.font = "bold 20px Arial";
            metrics = context.measureText(number);

            context.fillStyle = color;
            context.arc(0, (-radius + (tickLength) + metrics.width), (metrics.width), 0, (Math.PI * 2));
            context.fill();

            context.fillStyle = "white";
            context.fillText(number, -(metrics.width / 2), (-radius + tickLength + metrics.width + 6));
        }

        context.restore();
    }

    function drawTick(rotate, thick) {
        var indent = (thick ? 3 : 0);

        context.save();
        context.translate((canvas.width / 2), (canvas.height / 2));
        context.rotate(rotate);
        context.beginPath();
        context.moveTo(0, (-radius + tickLength + indent));
        context.lineTo(0, -radius + indent);
        context.globalCompositeOperation = "destination-over";
        context.lineWidth = (thick ? 5 : 2);
        context.strokeStyle = (thick ? "gray" : "lightgray");
        context.lineCap = "round";
        context.stroke();
        context.closePath();
        context.restore();
    }

    function drawCircle() {
        context.save();
        context.beginPath();
        context.arc((canvas.width / 2), (canvas.height / 2), radius, 0, (2 * Math.PI));
        context.lineWidth = 5;
        context.strokeStyle = "gray";
        context.stroke();
        context.closePath();
        context.restore();

        for (var i = 0; i < 60; i++) {
            drawTick(ticks.ms * i, (i % 5 === 0));
        }
    }

    function drawClock() {
        var date = new Date();
        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();

        (hour > 12) && (hour -= 12);

        context.restore();
        context.clearRect(0, 0, canvas.width, canvas.height);

        drawCircle();
        drawLine((ticks.h * hour), 4, "red", hour); //hour
        drawLine((ticks.ms * min), 2, "green", min); //minutes
        drawLine((ticks.ms * sec), 1, "blue"); //seconds
    }

    function resize() {
        var size;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        size = canvas.height;

        if (canvas.width < canvas.height) {
            size = canvas.width;
        }

        radius = Math.round((size / 2) * 0.75);
    }

    window.onload = function () {
        canvas = document.getElementById('canvas');
        context = canvas.getContext('2d');

        resize();
        drawClock();

        window.setInterval(function () {
            drawClock();
        }, 1000);
    };

    window.onresize = function () {
        resize();
        drawClock();
    };
}());