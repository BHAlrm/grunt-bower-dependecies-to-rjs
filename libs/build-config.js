var _ = require('lodash');
var chalk = require('chalk');
var success = chalk.green;
var danger = chalk.black.bgRed;
/**
 *
 * @param dependencyGraph -- bower dependency graph generated from bower utility
 * @param excludedDependencies -- excluded dependencies
 */
function buildConfig(dependencyGraph, excludedDependencies) {
    if (!dependencyGraph.dependencies) return;

    var config = {
        shim: {}
    };

    var components = dependencyGraph.dependencies;
    var excludeDependencies = excludedDependencies;

    _.forOwn(components, function (component, key) {
        if (excludeDependencies.indexOf(key) > -1) return;

        var dependencies = _.keys(component.pkgMeta.dependencies);
        config.shim[key] = {deps: dependencies};
    });

    return config;
}

module.exports = buildConfig;