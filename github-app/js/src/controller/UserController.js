define([
    'controller/Controller',
    'controller/RepositoriesController',
    'controller/RepositoryController',
    'view/RepositoriesView',
    'view/UserView',
    'model/AppModel',
    'model/UserModel'
], function (Controller, RepositoriesController, RepositoryController, RepositoriesView, UserView, AppModel, UserModel) {

    function UserController(setup) {
        Controller.call(this, undefined, undefined);

        setup = setup || {};

        this.containerView = setup.container;
        this.model = new UserModel({
            userName: setup.userName
        });
        this.repositoriesController = new RepositoriesController(undefined, this.model);
        this.repositoryController = new RepositoryController();
        this.view = new UserView({
            model: this.model,
            repositories: this.repositoriesController.getView(),
            repository: this.repositoryController.getView()
        });

        this.addListeners();
    }

    var proto = UserController.prototype = Object.create(Controller.prototype);
    proto.constructor = UserController;

    proto.addListeners = function () {
        AppModel.on("change:currentRepositoryIndex", this.showRepository, this);
        this.getModel().on("change:loaded", this.renderView, this);
    };

    proto.showRepository = function () {
        var index = AppModel.getRepositoryIndex();
        var repository = this.repositoriesController.getRepository(index);
        this.repositoryController.setRepository(repository);
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