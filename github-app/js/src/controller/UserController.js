define([
    'controller/Controller',
    'collection/RepositoriesCollection',
    'controller/RepositoriesController',
    'view/RepositoriesView',
    'view/UserView',
    'model/UserModel'
], function (Controller, RepositoriesCollection, RepositoriesController, RepositoriesView, UserView, UserModel) {

    function UserController(setup) {
        Controller.call(this, undefined, undefined);

        setup = setup || {};

        this.containerView = setup.container;
        this.model = new UserModel({
            userName: setup.userName
        });
        this.repositoriesController = new RepositoriesController(undefined, this.model);
        this.view = new UserView({
            model: this.model,
            repositories: this.repositoriesController.getView()
        });
        this.addListeners();
    }

    var proto = UserController.prototype = Object.create(Controller.prototype);
    proto.constructor = UserController;

    proto.addListeners = function () {
        this.getModel().on("change:loaded", this.renderView, this);
    };

    proto.renderView = function () {
        var containerView = this.containerView;

        if (containerView) {
            containerView.$el.append(this.getView().render().$el);
        }
    };

    proto.destroy = function () {
        var containerView = this.containerView;

        if (containerView) {
            this.getView().remove();
        }
    };

    return UserController;
});