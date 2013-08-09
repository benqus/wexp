(function () {
    var ns = {
        com: {
            benqus: {
                my: {
                    space: {
                        variables: {}
                    }
                }
            }
        }
    };

    var test = {

        iteration: 100000000,

        tests: {
            dots: function dot() {
                var max = test.iteration;
                var i = 0;
                var holder;

                while (i < max) {
                    holder = ns.com.benqus.my.space.variables;
                    i++;
                }
            },

            brackets: function dot() {
                var max = test.iteration;
                var i = 0;
                var holder;

                while (i++ < max) {
                    holder = ns["com"]["benqus"]["my"]["space"]["variables"];
                    i++;
                }
            }
        },

        run: function (type) {
            var start = Date.now();
            var end;

            this.tests[type]();

            end = Date.now();

            console.log(type + ": " + (end - start) + "ms");
        }
    };

    window.onload = function () {
        test.run("brackets");
        test.run("dots");
    };
}());