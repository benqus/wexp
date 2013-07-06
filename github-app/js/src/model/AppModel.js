define([
    'config'
], function (config) {
    /**
     * @singleton
     */
    return new (Backbone.Model.extend({
        defaults: {
            defaultUser: config.defaultUser,
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
        }
    }));

});