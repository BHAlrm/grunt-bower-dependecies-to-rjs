# grunt-bower-dependencies-to-rjs
> Automagically wire-up installed Bower components dependencies as shim into your RequireJS config

## Getting Started

If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide, as it explains how to create a Gruntfile as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:

```shell
npm install grunt-bower-dependencies-to-rjs --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-bower-dependencies-to-rjs');
```

[grunt]: http://gruntjs.com
[Getting Started]: http://gruntjs.com/getting-started


## Example usage

```js
grunt.initConfig({
  bowerShimToRjs: {
    target: {
      rjsConfig: 'app/config.js'
    }
  }
});

grunt.loadNpmTasks('grunt-bower-dependencies-to-rjs');

grunt.registerTask('default', ['bower']);
```

## Documentation

When the `bower` task is run it merges the paths of installed Bower components into the `paths` property of your RequireJS config.

You trigger this task from another task in your Gruntfile or through the CLI: `grunt bower`


### rjsConfig

**Required**  
Type: `String`

Specify a relative path to your RequireJS config.

Make sure to specify the `baseUrl` property in your RequireJS config if you want to use relative paths.


### Options

#### exclude

Default: `[]`  
Type: `Array`

Specify components to be excluded from being added to the RequireJS config.

```js
bowerRequirejs: {
  all: {
    rjsConfig: 'scripts/main.js',
    options: {
      exclude: ['moment']
    }
  }
}
```

## Things to remember

### Config file

If you do not already have a `config.js` file at the location specified by the `--config` option then one will be generated for you. A basic `config.js` file looks like this:

``` js
requirejs.config({
  shim: {},
  paths: {}
});
```

## License
[BSD license](http://opensource.org/licenses/bsd-license.php) and copyright Bhakarut
