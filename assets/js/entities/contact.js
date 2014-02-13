ContactManager.module("Entities", function (Entities, ContactManager, Backbone, Marionette, $, _) {

    Entities.Contact = Backbone.Model.extend({
        urlRoot: "contacts"
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

    var initializeContacts = function () {
        var contacts = new Entities.ContactCollection([
            {
                id: 1,
                firstName: "Bob",
                lastName: "Brigham",
                phoneNumber: "555-5555"
            },
            {
                id: 2,
                firstName: 'Alice',
                lastName: 'Arten',
                phoneNumber: '555-0183'
            },
            {
                id: 3,
                firstName: 'Charlie',
                lastName: 'Chambell',
                phoneNumber: '555-0184'
            }
        ]);

        contacts.forEach(function (contact) {
            contact.save();
        });

        return contacts.models;
    };

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
            var promise = defer.promise();
            $.when(promise).done(function (contacts) {
                if (contacts.length === 0) {
                    var models = initializeContacts();
                    contacts.reset(models);
                }
            });

            return promise;
        }
    };

    ContactManager.reqres.setHandler("contact:entities", function () {
        return API.getContactEntities();
    });

    ContactManager.reqres.setHandler("contact:entity", function (id) {
        return API.getContactEntity(id);
    })

});