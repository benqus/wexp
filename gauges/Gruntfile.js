module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        concat: {

            options: {

                banner: [
                    "/**",
                    " * Version: <%= pkg.version %>",
                    " */\n\n"
                ].join("\n"),

                separator: "\n\n",

                process: function (content, file) {
                    console.log("Indenting " + file + "...");

                    if (!(/^src\/js/).test(file)) {
                        return content;
                    }

                    var lines = content.split('\n');
                    var indent = [];

                    lines.forEach(function (line) {
                        indent.push("    " + line);
                    });

                    return indent.join('\n');
                }
            },

            dist: {
                src: [
                    'src/misc/intro',
                    'src/js/*.js',
                    'src/js/**/*.js',
                    'src/misc/outro'
                ],

                dest: 'build/gauges-<%= pkg.version %>.js'
            }
        },

        update: {
            files: {
                'index.html': function (pkg, content) {
                    var include = [
                        '<script src="build/gauges-',
                        pkg.version,
                        '.js"></script>'
                    ].join('');

                    return content.replace('<!--SOURCE_BUILD-->', include);
                }
            }
        },

        watch: {
            files: ['package.json', 'src/js/**/*.js'],
            tasks: ['concat', 'update']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('dev', ['watch']);
    grunt.registerTask('update', "Updating all necessary files after concat", function () {
        var fs = require('fs');
        var file = 'index.html';
        var pkg = grunt.config.data.pkg;
        var regexp = /build\/gauges\-[\.\d]+\.js/gm;
        var content = fs.readFileSync(file);
        var build = [
            'build/gauges-',
            pkg.version,
            '.js'
        ].join('');

        content = content.toString().replace(regexp, build);

        fs.writeFileSync(file, content);

        console.log("File " + file + " updated to '" + build + "' ...");
    });
};
