'use strict';
var bowerShimRJS = require('../libs/index');

function task() {
    var options = this.options({
        config: this.data.rjsConfig,
        exclude: [],
        applicationName: ''
    });

    bowerShimRJS(options, this.async());
}

module.exports = function (grunt) {
    // make sure conflicting grunt tasks are loaded before registering tasks
    grunt.registerMultiTask('bowerShimToRjs', 'Wire-up Bower dependencies in RJS config', task);
};
