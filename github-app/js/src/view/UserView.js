define([
    'template/UserTemplate'
], function (UserTemplate) {
    return Backbone.View.extend({
        className: 'UserView',

        initialize: function (setup) {
            this.repositories = setup.repositories;
        },

        render: function () {
            var model = this.model;

            this.$el
                .append(UserTemplate({
                    "avatarUrl": model.get("avatarUrl"),
                    "userName": model.get("userName"),
                    "reposCount": model.get("reposCount")
                }))
                .find("nav.repositories")
                    .empty()
                    .append(this.repositories.render().$el);

            return Backbone.View.prototype.render.call(this);
        }

    });
});