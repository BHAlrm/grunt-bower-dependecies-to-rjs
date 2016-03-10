'use strict';
var bowerShimRJS = require('../libs/index');
var loadGruntTasks = require('load-grunt-tasks');

function task() {
    var options = this.options({
        config: this.data.rjsConfig,
        exclude: [],
        baseUrl: '',
        transitive: false,
        excludeDev: false
    });

    options['exclude-dev'] = options.excludeDev;

    bowerShimRJS(options, this.async());
}

module.exports = function (grunt) {
    // make sure conflicting grunt tasks are loaded before registering tasks
    loadGruntTasks(grunt, {pattern: ['grunt-bower*', '!grunt-bower-requirejs'] });

    // only register bower task if it's not already registered by another plugin
    if (!grunt.task.exists('bower')) {
        grunt.registerMultiTask('bower', 'Wire-up Bower components in RJS shim config', function () {
            grunt.log.warn('The task "bower" is deprecated for this module. Use "bowerShimToRjs" instead');
            task.call(this);
        });
    }

    grunt.registerMultiTask('bowerShimToRjs', 'Wire-up Bower dependencies in RJS config', task);
};
