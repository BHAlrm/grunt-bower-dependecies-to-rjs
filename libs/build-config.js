var _ = require('lodash');

/**
 *
 * @param dependencyGraph -- bower dependency graph generated from bower utility
 * @param excludedDependencies -- excluded dependencies
 */
function buildConfig(dependencyGraph, excludedDependencies, application) {

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
    var applicationName = application.name || dependencyGraph.pkgMeta.name;
    if(dependencyGraph.pkgMeta){
        var applicationDependencies = _.keys(dependencyGraph.pkgMeta.dependencies);
        if(application.exclude){
            _.remove(applicationDependencies, function(n){return application.exclude.indexOf(n) > -1; });
        }

        if(application.overwrite){
            applicationDependencies = _.map(applicationDependencies, function(n){ return (application.overwrite[n])? application.overwrite[n]: n; })
        }
        config.shim[applicationName] = {deps: applicationDependencies};
    }
    return config;
}

module.exports = buildConfig;