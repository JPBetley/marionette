ContactManager.module("ContactsApp.List", function (List, ContactManager, Backbone, Marionette, $, _) {

    List.Layout = Marionette.Layout.extend({
        template: '#contact-list-layout',

        regions: {
            panelRegion: '#panel-region',
            contactsRegion: '#contacts-region'
        }
    });

    List.Panel = Marionette.ItemView.extend({
        template: '#contact-list-panel'
    });

    List.Contact = Marionette.ItemView.extend({
        tagName: 'tr',
        template: '#contact-list-item',

        events: {
            "click": "highlightName",
            "click button.js-delete": "deleteClicked",
            "click a.js-show": "showClicked",
            "click a.js-edit": "editClicked"
        },

        highlightName: function (e) {
            this.$el.toggleClass("warning");
        },

        deleteClicked: function (e) {
            e.stopPropagation();
            this.trigger("contact:delete", this.model);
        },

        showClicked: function (e) {
            e.stopPropagation();
            e.preventDefault();
            this.trigger("contact:show", this.model);
        },

        editClicked: function (e) {
            console.log("eid");
            e.preventDefault();
            e.stopPropagation();
            this.trigger("contact:edit", this.model);
        },

        remove: function () {
            var self = this;
            this.$el.fadeOut(function () {
                Marionette.ItemView.prototype.remove.call(self);
            });
        },

        flash: function (cssClass) {
            var $view = this.$el;
            $view.hide().toggleClass(cssClass).fadeIn(800, function () {
                setTimeout(function () {
                    $view.toggleClass(cssClass);
                }, 500);
            });
        }

    });

    List.Contacts = Marionette.CompositeView.extend({
        tagName: "table",
        className: "table table-hover",
        template: '#contact-list',
        itemView: List.Contact,
        itemViewContainer: 'tbody'
    });

});
