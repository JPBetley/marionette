var ContactManager = new Marionette.Application();
          
ContactManager.addRegions({
    mainRegion: '#main-region'
});

ContactManager.on('initialize:after', function () {

    if (Backbone.history) {
        Backbone.history.start();
    }

});