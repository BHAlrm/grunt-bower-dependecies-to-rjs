
var requirejs = require('requirejs/bin/r.js');
var _ = require('lodash');
var fs = require('fs');
var chalk = require('chalk');
var success = chalk.green;

/**
 *
 * @param generatedConfig -- generated config that the result from buildConfig function.
 * @param originalConfig -- original config read from rjsFile.
 * @param rjsConfigPath -- rsjFile path.
 * @param callback -- done function.
 */
function writeConfig(generatedConfig, originalConfig, rjsConfigPath, callback) {

    requirejs.tools.useLib(function (require) {

        var rjsConfig = require('transform').modifyConfig(originalConfig, function (originRjsConfig) {

            if (generatedConfig.shim) {
                if (originRjsConfig.shim) {
                    _.forOwn(generatedConfig.shim, function (value, key) {
                        if (originRjsConfig.shim[key]) {
                            originRjsConfig.shim[key].deps = _.union(value.deps, originRjsConfig.shim[key].deps);
                        } else {
                            originRjsConfig.shim[key] = value;
                        }
                    });
                } else {
                    originRjsConfig.shim = generatedConfig.shim;
                }
            }

            return originRjsConfig;
        });
        fs.writeFileSync(rjsConfigPath, rjsConfig, 'utf-8');
        console.info(success('Updated RequireJS shim config with installed Bower components'));
        callback(generatedConfig);
    });

}

module.exports = writeConfig;