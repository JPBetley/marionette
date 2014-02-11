ContactManager.module("ContactsApp.List", function (List, ContactManager, Backbone, Marionette, $, _) {
    
    List.Contact = Marionette.ItemView.extend({
        tagName: 'li',
        template: _.template(List.Templates.listItemView)
    });

    List.Contacts = Marionette.CollectionView.extend({
        tagName: "ul",
        itemView: List.Contact
    });

});