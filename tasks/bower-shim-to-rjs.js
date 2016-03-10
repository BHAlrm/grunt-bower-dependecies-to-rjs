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
    loadGruntTasks(grunt, {pattern: ['grunt-bower*', '!grunt-bower-dependencies-to-rjs'] });
    grunt.registerMultiTask('bowerShimToRjs', 'Wire-up Bower dependencies in RJS config', task);
};
