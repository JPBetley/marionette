ContactManager.module("ContactsApp.Common.Views", function(Views, ContactManager, Backbone, Marionette, $, _) {

    Views.Form = Marionette.ItemView.extend({
        template: '#contact-form',

        events: {
            'click button.js-submit': 'submitClicked'
        },

        submitClicked: function(e) {
            e.preventDefault();
            var data = Backbone.Syphon.serialize(this);
            this.trigger("form:submit", data);
        },

        onFormDataInvalid: function (errors) {
            var self = this;
            var $view = this.$el;
            
            var clearFormErrors = function () {
                var $form = $view.find("form");
                $form.find("span.form-control-feedback").each(function() {
                    $(this).remove();
                });
                $form.find("div.help-block").each(function () {
                    $(this).remove();
                });
                $form.find(".form-group").each(function () {
                    $(this).removeClass("has-error").removeClass("has-feedback");
                });
            };

            var markErrors = function (value, key) {
                var $formControl = $view.find("#contact-" + key);
                var $formGroup = $formControl.parent();
                var $errorIcon = $("<span>", { class: "glyphicon glyphicon-remove form-control-feedback" });
                var $errorEl = $("<div>", { class: "help-block", text: value });
                $formGroup.append($errorIcon).append($errorEl).addClass("has-error").addClass("has-feedback");
            }

            clearFormErrors();
            _.each(errors, markErrors);
        },

        onRender: function() {
            if (!this.options.asModal) {
                var $title = $("<h1>", { text: this.title});
                this.$el.prepend($title);
            }
        },
        
        onShow: function() {
            if (this.options.asModal) {
                this.$el.dialog({
                    modal: true,
                    width: "auto",
                    title: this.title
                });
            }
        }
    });

});
