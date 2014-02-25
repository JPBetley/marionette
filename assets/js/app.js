var ContactManager = new Marionette.Application();
          
ContactManager.addRegions({
    headerRegion: '#header-region',
    mainRegion: '#main-region',
    dialogRegion: Marionette.Region.Dialog.extend({
        el: '#dialog-region'
    })
});

ContactManager.on('initialize:after', function () {

    if (Backbone.history) {
        Backbone.history.start({ pushState: true });
    }

});
