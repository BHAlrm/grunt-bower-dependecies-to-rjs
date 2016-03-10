
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
                rjsConfig: 'test/main.js'
            }
        }
    });

    grunt.loadTasks('tasks');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('lint', 'jshint');
    grunt.registerTask('test', 'bowerShimToRjs');
};