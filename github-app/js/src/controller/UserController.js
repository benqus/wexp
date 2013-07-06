define([
    'controller/Controller',
    'view/RepositoriesView',
    'view/UserView',
    'model/UserModel'
], function (Controller, RepositoriesView, UserView, UserModel) {

    function UserController(setup) {
        setup = setup || {};

        var repositoriesView = new RepositoriesView();
        var model = new UserModel({ "userName": setup.userName });
        var view = new UserView({
            "model": model,
            "repositories": repositoriesView
        });

        Controller.call(this, view, model);

        this.containerView = setup.container;
        this.repositoriesView = repositoriesView;

        this.addListeners();
    }

    UserController.prototype = Object.create(Controller.prototype);
    UserController.prototype.constructor = UserController;

    UserController.prototype.addListeners = function () {
        this.model.on("change:loaded", this.renderView, this);
    };

    UserController.prototype.renderView = function () {
        var containerView = this.containerView;

        if (containerView) {
            containerView.$el.append(this.getView().render().$el);

            this.repositoriesView.updateRepositories(this.getModel().get("reposUrl"));
        }
    };

    UserController.prototype.destroy = function () {
        var containerView = this.containerView;

        if (containerView) {
            this.getView().remove();
        }
    };

    return UserController;
});