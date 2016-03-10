module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],
        files: [
            'libs/*.js',
            'test/*.js'
        ],
        hostname: 'artem',
        browswer: ['Chrome'],
        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher'
        ]
    });
};