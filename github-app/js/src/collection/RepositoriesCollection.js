define([
    'model/RepositoryModel'
], function (RepositoryModel) {
    return Backbone.Collection.extend({
        url: "/repos",
        model: RepositoryModel
    });
});