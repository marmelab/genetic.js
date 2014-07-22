module.exports = function (config) {
    "use strict";

    config.set({
        basePath: '../',
        browsers: [process.env.CI ? 'PhantomJS' : 'Chrome'],
        files: [
            {pattern: 'src/**/*.js', included: false},

            // test files
            {pattern: 'test/problem/problem2Spec.js', included: false},

            'test/main-test.js'
        ],
        frameworks: ['requirejs', 'jasmine'],
        captureTimeout: 35000
    });
};
