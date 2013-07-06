define([
    'template/RepositoryItemTemplate'
], function (RepositoryItemTemplate) {
    return Backbone.View.extend({
        tagName: 'ul',
        className: 'RepositoriesView',

        initialize: function () {
            this.collection.on("sync", this.renderRepositories, this);
        },

        renderRepositories: function () {
            var $el = this.$el.empty();

            this.collection.each(function (repository) {
                $el.append(RepositoryItemTemplate(repository.attributes));
            });
        }
    });
});