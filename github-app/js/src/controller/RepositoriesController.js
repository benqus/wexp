define([
    'controller/Controller',
    'collection/RepositoriesCollection',
    'view/RepositoriesView'
], function (Controller, RepositoriesCollection, RepositoriesView) {

    //receives model from UserController to listen to in addListener
    function RepositoriesController(view, model) {
        Controller.call(this, view, model);

        this.collection = new RepositoriesCollection();
        this.view = new RepositoriesView({
            collection: this.getCollection()
        });

        this.addListeners();
    }

    var proto = RepositoriesController.prototype = Object.create(Controller.prototype);
    proto.constructor = RepositoriesController;

    proto.addListeners = function () {
        this.getModel().on("change:loaded", this.syncRepos, this);
    };

    proto.syncRepos = function (model) {
        this.getCollection().setUrl(model.get("reposUrl"));
    };

    proto.getCollection = function () {
        return this.collection;
    };

    proto.getRepository = function (index) {
        return this.getCollection().models[index];
    };

    return RepositoriesController;
});