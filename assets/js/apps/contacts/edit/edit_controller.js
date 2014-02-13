ContactManager.module("ContactsApp.Edit", function (Edit, ContactManager, Backbone, Marionette, $, _) {

    Edit.Controller = {
        editContact: function (id) {
            var loadingView = new ContactManager.Common.Views.Loading();
            ContactManager.mainRegion.show(loadingView);


            var fetchingContact = ContactManager.request("contact:entity", id);

            $.when(fetchingContact).done(function (model) {
                var contactView;

                if (model !== undefined) {
                    contactView = new Edit.Contact({
                        model: model
                    });
                } else {
                    contactView = new new ContactManager.ContactsApp.Show.MissingContact();
                }

                ContactManager.mainRegion.show(contactView);
            });
        }
    };

});