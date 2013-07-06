requirejs.config({
    baseUrl: "js/src/"
});

require([
    'view/AppView',
    'model/AppModel'
], function (AppView, AppModel) {

    var appView = new AppView({
        el: $("#main")[0],
        model: AppModel
    });

    appView.start();

});
