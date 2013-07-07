define([
    'template/UserTemplate'
], function (UserTemplate) {
    return Backbone.View.extend({
        className: 'UserView',

        initialize: function (setup) {
            this.repositories = setup.repositories;
            this.repository = setup.repository;
        },

        renderRepositories: function() {
            this.$el.find("nav.repositories")
                .empty()
                .append(this.repositories.render().$el);
        },

        renderRepository: function() {
            this.$el.find(".repository-data")
                .empty()
                .append(this.repository.render().$el);
        },

        render: function () {
            this.$el.append(UserTemplate(this.model.attributes));

            this.renderRepositories();
            this.renderRepository();

            return Backbone.View.prototype.render.call(this);
        }

    });
});