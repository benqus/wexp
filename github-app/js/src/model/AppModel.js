define([
    'config'
], function (config) {
    /**
     * @singleton
     */
    return new (Backbone.Model.extend({
        defaults: {
            defaultUser: config.defaultUser,
            currentRepositoryIndex: -1,
            currentUser: ""
        },

        start: function () {
            this.setUser(this.get("defaultUser"));
        },

        setUser: function (userName) {
            this.set({
                "currentUser": userName
            });
        },

        getUser: function () {
            return this.get("currentUser") || this.get("defaultUser");
        },

        getRepositoryIndex: function () {
            return this.get("currentRepositoryIndex");
        },

        setRepositoryIndex: function (index) {
            this.set({
                "currentRepositoryIndex": index
            });
        }
    }));

});