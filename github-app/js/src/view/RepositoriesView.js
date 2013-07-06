define([
    'collection/RepositoriesCollection',
    'template/RepositoryItemTemplate'
], function (RepositoriesCollection, RepositoryItemTemplate) {

    return Backbone.View.extend({
        tagName: 'ul',
        className: 'RepositoriesView',

        initialize: function () {
            this.collection = new RepositoriesCollection();
            this.addListeners();
        },

        addListeners: function () {
            this.collection.on("sync", this.renderRepositories, this);
        },

        updateRepositories: function (repositoriesUrl) {
            if (repositoriesUrl) {
                this.collection.url = repositoriesUrl;
                this.collection.fetch();
            }
        },

        renderRepositories: function () {
            var $el = this.$el.empty();

            this.collection.each(function (repository) {
                $el.append(RepositoryItemTemplate(repository.attributes));
            });
        }

    });

});