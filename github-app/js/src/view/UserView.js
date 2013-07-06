define([
    'template/UserTemplate'
], function (UserTemplate) {
    return Backbone.View.extend({
        className: 'UserView',

        initialize: function (setup) {
            this.repositories = setup.repositories;
        },

        render: function () {
            this.$el
                .append(UserTemplate(this.model.attributes))
                .find("nav.repositories")
                    .empty()
                    .append(this.repositories.render().$el);

            return Backbone.View.prototype.render.call(this);
        }

    });
});