requirejs.config({
    baseUrl: "assets/js",
    paths: {
        jquery: "vendor/jquery",
        underscore: "vendor/underscore",
        json2: "vendor/json2",
        backbone: "vendor/backbone",
        marionette: "vendor/backbone.marionette",
        "jquery-ui": "vendor/jquery-ui",
    },

    shim: {
        underscore: {
            exports: "_"
        },
        backbone: {
            deps: ['jquery', 'underscore', 'json2'],
            exports: "Backbone"
        },
        marionette: {
            deps: ['backbone'],
            exports: "Marionette"
        },
        'jquery-ui': {
            deps: ['jquery']
        }
    }
});

require(['app'], function (ContactManager) {
    ContactManager.start();
});