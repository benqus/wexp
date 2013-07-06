define([
    'controller/UserController',
    'view/UserSearchView',
    'model/AppModel'
], function (UserController, UserSearchView, AppModel) {
    return Backbone.View.extend({

        initialize: function () {
            this.userController = undefined;
            this.searchView = undefined;
            this.userInitialized = false;

            this.addListeners();
        },

        addListeners: function () {
            AppModel.on('change:currentUser', this.initializeUser, this);
        },

        initializeUser: function () {
            var user = AppModel.getUser();

            this.searchView = new UserSearchView({
                el: $("#user-search")[0],
                defaultUser: user
            });

            if (this.userInitialized) {
                this.userController.destroy();
            }

            this.userController = new UserController({
                userName: user,
                container: this
            });

            this.userInitialized = true;
        },

        start: function () {
            AppModel.start();
            this.render();
        },

        render: function () {
            this.searchView.render();
            return Backbone.View.prototype.render.call(this);
        }
    });
});
