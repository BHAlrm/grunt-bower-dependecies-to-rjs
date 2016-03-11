
'use strict';

module.exports = function (grunt) {

    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'libs/*.js'
            ]
        },
        bowerShimToRjs:{
            test: {
                rjsConfig: 'test/main.js',
                options:{
                    application:{
                        name: 'app',
                        overwrite: {
                            'angular': 'ng'
                        }
                    }
                }
            }
        }
    });

    grunt.loadTasks('tasks');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('lint', 'jshint');
    grunt.registerTask('test', 'bowerShimToRjs');
};