ContactManager.module("ContactsApp.Edit", function (Edit, ContactManager, Backbone, Marionette, $, _) {
    Edit.Contact = Marionette.ItemView.extend({
        template: "#contact-form",

        events: {
            "click button.js-submit": "submitClicked"
        },

        submitClicked: function (e) {
            e.preventDefault();
            var data = Backbone.Syphon.serialize(this);
            this.trigger("form:submit", data);
        },

        onFormDataInvalid: function (errors) {
            var self = this;
            var markErrors = function (value, key) {
                var $formControl = self.$el.find("#contact-" + key);
                var $formGroup = $formControl.parent();
                var $errorIcon = $("<span>", { class: "glyphicon glyphicon-remove form-control-feedback" });
                var $errorEl = $("<div>", { class: "help-block", text: value });
                $formGroup.append($errorIcon).append($errorEl).addClass("has-error").addClass("has-feedback");
            }
            _.each(errors, markErrors);
        }
    });
});