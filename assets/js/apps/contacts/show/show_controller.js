ContactManager.module("ContactsApp.Show", function (Show, ContactManager, Backbone, Marionette, $, _) {

    Show.Controller = {
        showContact: function (id) {
            var loadingView = new ContactManager.Common.Views.Loading();
            ContactManager.mainRegion.show(loadingView);


            var fetchingContact = ContactManager.request("contact:entity", id);

            $.when(fetchingContact).done(function (model) {
                var contactView;

                if (model !== undefined) {
                    contactView = new Show.Contact({
                        model: model
                    });
                } else {
                    contactView = new Show.MissingContact();
                }

                ContactManager.mainRegion.show(contactView);
            });
        }
    };

});