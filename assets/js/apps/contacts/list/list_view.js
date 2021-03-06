ContactManager.module("ContactsApp.List", function (List, ContactManager, Backbone, Marionette, $, _) {

    List.Layout = Marionette.Layout.extend({
        template: '#contact-list-layout',

        regions: {
            panelRegion: '#panel-region',
            contactsRegion: '#contacts-region'
        }
    });

    List.Panel = Marionette.ItemView.extend({
        template: '#contact-list-panel',

        triggers: {
            'click button.js-new': 'contact:new'
        },

        events: {
            'submit #filter-form': 'filterContacts'
        },

        ui: {
            criterion: 'input.js-filter-criterion'
        },

        filterContacts: function (e) {
            e.preventDefault();
            var criterion = this.ui.criterion.val();
            this.trigger("contacts:filter", criterion);
        },

        onSetFilterCriterion: function (criterion) {
            this.ui.criterion.val(criterion);
        }
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

    var noContactsView = Marionette.ItemView.extend({
        template: '#contact-list-none',
        tagName: 'tr',
        className: 'warning'
    });

    List.Contacts = Marionette.CompositeView.extend({
        tagName: "table",
        className: "table table-hover",
        template: '#contact-list',
        itemView: List.Contact,
        emptyView: noContactsView,
        itemViewContainer: 'tbody',

        initialize: function () {
            this.listenTo(this.collection, "reset", function () {
                this.appendHtml = function (collectionView, itemView, index) {
                    collectionView.$el.prepend(itemView.el);
                }
            });
        },

        onCompositeCollectionRendered: function () {
            this.appendHtml = function (collectionView, itemView, index) {
                collectionView.$el.prepend(itemView.el);
            }
        }
    });

});
