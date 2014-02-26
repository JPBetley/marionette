requirejs.config({
    baseUrl: "assets/js",
    paths: {
        jquery: "vendor/jquery",
        underscore: "vendor/underscore",
        json2: "vendor/json2",
        backbone: "vendor/backbone",
        marionette: "vendor/backbone.marionette"
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
        }
    }
});

require(['backbone'], function (bb) {
    console.log('jQuery version: ', $.fn.jquery);
    console.log('underscore identity call: ', _.identity(5));
    console.log('Backbone history: ', bb.history);
});