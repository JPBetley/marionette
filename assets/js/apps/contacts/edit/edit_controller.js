ContactManager.module("ContactsApp.Edit", function (Edit, ContactManager, Backbone, Marionette, $, _) {

    Edit.Controller = {
        editContact: function (id) {
            var loadingView = new ContactManager.Common.Views.Loading();
            ContactManager.mainRegion.show(loadingView);


            var fetchingContact = ContactManager.request("contact:entity", id);

            $.when(fetchingContact).done(function (contact) {
                var contactView;

                if (contact !== undefined) {
                    contactView = new Edit.Contact({
                        model: contact
                    });

                    contactView.on("form:submit", function (data) {
                        if (contact.save(data)) {
                            ContactManager.trigger("contact:show", contact.get("id"));
                        } else {
                            contactView.triggerMethod("form:data:invalid", contact.validationError);
                        }
                    });
                } else {
                    contactView = new new ContactManager.ContactsApp.Show.MissingContact();
                }

                ContactManager.mainRegion.show(contactView);
            });
        }
    };

});