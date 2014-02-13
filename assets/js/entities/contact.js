ContactManager.module("Entities", function (Entities, ContactManager, Backbone, Marionette, $, _) {

    Entities.Contact = Backbone.Model.extend({
        urlRoot: "contacts"
    });

    Entities.ContactCollection = Backbone.Collection.extend({
        url: "contacts",
        model: Entities.Contact,
        comparator: function (contact) {
            return contact.attributes.firstName + " " + contact.attributes.lastName;
        }
    });

    var contacts;

    var initializeContacts = function () {
        contacts = new Entities.ContactCollection([
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
    };

    var API = {
        getContactEntities: function () {
            if (contacts === undefined) {
                initializeContacts();
            }
            return contacts;
        }
    };

    ContactManager.reqres.setHandler("contact:entities", function () {
        return API.getContactEntities();
    });

});