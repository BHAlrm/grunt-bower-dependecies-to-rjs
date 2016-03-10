/*
 grunt-bower-shim-to-rjs
 * Copyright (c) 2015 Bhakarut Piboolsak, contributors
 * Licensed under the MIT license.
 */

'use strict';

var bower = require('bower');
var file = require('file-utils');
var fs = require('fs');
var path = require('path');
var buildConfig = require('../libs/build-config');
var writeConfig = require('../libs/write-config');
var chalk = require('chalk');
var success = chalk.green;
var danger = chalk.black.bgRed;

module.exports = function (opts, callback) {
    var doneFn = callback || function () {};
    var options = opts || {};
    var rjsConfigPath = opts.config;

    if (!rjsConfigPath) {
        console.error('rjsConfig doesn\'t exits.');
        return;
    }
    var rjsConfig = (file.exists(rjsConfigPath)) ? fs.readFileSync(String(rjsConfigPath), 'utf8') : fs.readFileSync(path.join(__dirname, './templates/rjsConfig.js'), 'utf8');

    function run() {
        var bowerOpts = {offline: true};

        bower.commands.list({}, bowerOpts)
             .on('end', function (dependencyGraph) {
                 if (dependencyGraph) {
                     var generatedConfig;

                     try {
                         generatedConfig = buildConfig(dependencyGraph, options.exclude);
                     } catch (err) {
                         return doneFn(false);
                     }

                     if (rjsConfigPath) {
                         writeConfig(generatedConfig, rjsConfig, rjsConfigPath, doneFn);
                     } else {
                         doneFn(generatedConfig);
                     }

                 }
             })
             .on('error', function (err) {
                 console.error(danger('ERR'), process.argv.slice(2).join(' '), '\n');
                 console.error(danger('ERR'), opts.debug ? err.stack : err.message);
                 process.exit(err.code || 1);
             });
    }

    run(options, rjsConfig, rjsConfigPath, callback);

};
