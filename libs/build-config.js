var _ = require('lodash');

/**
 *
 * @param dependencyGraph -- bower dependency graph generated from bower utility
 * @param excludedDependencies -- excluded dependencies
 */
function buildConfig(dependencyGraph, excludedDependencies, applicationName) {

    if (!dependencyGraph.dependencies) return;

    var config = {
        shim: {}
    };

    //bower dependencies shim wiring
    var components = dependencyGraph.dependencies;
    var excludeDependencies = excludedDependencies;
    _.forOwn(components, function (component, key) {
        if (excludeDependencies.indexOf(key) > -1) return;

        if(component.pkgMeta){
            var dependencies = _.keys(component.pkgMeta.dependencies);
            config.shim[key] = {deps: dependencies};
        }

    });

    // application shim wiring
    applicationName = applicationName || dependencyGraph.pkgMeta.name;
    if(dependencyGraph.pkgMeta){
        var applicationDependencies = _.keys(dependencyGraph.pkgMeta.dependencies);
        config.shim[applicationName] = {deps: applicationDependencies};
    }
    return config;
}

module.exports = buildConfig;