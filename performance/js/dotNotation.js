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

    var ns2 = new (function () {
        this.com = {};
        this.com.benqus = {};
        this.com.benqus.my = {};
        this.com.benqus.my.space = {};
        this.com.benqus.my.space.variables = {};
    })();

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
            },

            dots2: function dot() {
                var max = test.iteration;
                var i = 0;
                var holder;

                while (i < max) {
                    holder = ns2.com.benqus.my.space.variables;
                    i++;
                }
            },

            brackets2: function dot() {
                var max = test.iteration;
                var i = 0;
                var holder;

                while (i++ < max) {
                    holder = ns2["com"]["benqus"]["my"]["space"]["variables"];
                    i++;
                }
            },

            dots3: function dot() {
                var max = test.iteration;
                var i = 0;
                var holder;

                while (i < max) {
                    holder = ns2.com;
                    i++;
                }
            },

            brackets3: function dot() {
                var max = test.iteration;
                var i = 0;
                var holder;

                while (i++ < max) {
                    holder = ns2["com"];
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
        test.run("dots");
        test.run("brackets");
        test.run("dots2");
        test.run("brackets2");
        test.run("dots3");
        test.run("brackets3");
    };
}());