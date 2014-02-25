(function (Backbone, Marionette, _) {
    _.extend(Marionette.Application.prototype, {
        navigate: function (route, options) {
            options || (options = {});
            Backbone.history.navigate(route, options);
        },

        getCurrentRoute: function () {
            return Backbone.history.fragment;
        }
    });
})(Backbone, Marionette, _);