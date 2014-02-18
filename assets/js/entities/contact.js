ContactManager.module("Entities", function (Entities, ContactManager, Backbone, Marionette, $, _) {

    Entities.Contact = Backbone.Model.extend({
        urlRoot: "contacts",

        defaults: {
            firstName: "",
            lastName: "",
            phoneNumber: ""
        },

        validate: function (attrs, options) {
            var errors = {};
            if (!attrs.firstName) {
                errors.firstName = "First name can't be blank";
            }
            if (!attrs.lastName) {
                errors.lastName = "Last name can't be blank";
            } else if (attrs.lastName.length < 2) {
                errors.lastName = "Last name is too short";
            }

            if (!_.isEmpty(errors)) {
                return errors;
            }
        }
    });

    Entities.configureStorage(Entities.Contact);

    Entities.ContactCollection = Backbone.Collection.extend({
        url: "contacts",
        model: Entities.Contact,
        comparator: function (contact) {
            return contact.attributes.firstName + " " + contact.attributes.lastName;
        }
    });

    Entities.configureStorage(Entities.ContactCollection);

    var API = {
        getContactEntity: function (contactId) {
            var contact = new Entities.Contact({ id: contactId });
            var defer = $.Deferred();
            setTimeout(function () {
                contact.fetch({
                    success: function (data) {
                        defer.resolve(data);
                    },
                    error: function (data) {
                        defer.resolve(undefined);
                    }
                });
            }, 2000);
            return defer.promise();
        },
        getContactEntities: function () {
            var contacts = new Entities.ContactCollection();
            var defer = $.Deferred();
            setTimeout(function () {
                contacts.fetch({
                    success: function (data) {
                        defer.resolve(data);
                    }
                });
            }, 2000);
            return defer.promise();
        }
    };

    ContactManager.reqres.setHandler("contact:entities", function () {
        return API.getContactEntities();
    });

    ContactManager.reqres.setHandler("contact:entity", function (id) {
        return API.getContactEntity(id);
    })

});