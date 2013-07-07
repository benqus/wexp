define([
    'model/AppModel',
    'template/RepositoryItemTemplate'
], function (AppModel, RepositoryItemTemplate) {
    return Backbone.View.extend({
        tagName: 'ul',
        className: 'RepositoriesView',

        events: {
            "click li.RepositoryItem": "onRepositoryClick"
        },

        initialize: function () {
            this.collection.on("sync", this.renderRepositories, this);
        },

        onRepositoryClick: function (evt) {
            var index = this.$el.find("li.RepositoryItem").index(evt.currentTarget);
            AppModel.setRepositoryIndex(index);
        },

        renderRepositories: function () {
            var $el = this.$el.empty();

            this.collection.each(function (repository) {
                $el.append(RepositoryItemTemplate(repository.attributes));
            });
        }
    });
});