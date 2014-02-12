ContactManager.module("ContactsApp.Show", function (Show, ContactManager, Backbone, Marionette, $, _) {

    Show.Controller = {
        showContact: function (contact) {

            var contactView = new Show.Contact({
                model: contact
            });

            ContactManager.mainRegion.show(contactView);
        }
    };

});