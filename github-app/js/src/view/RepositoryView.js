define([
    'template/RepositoryTemplate'
], function (RepositoryTemplate) {
    return Backbone.View.extend({
        render: function () {
            this.$el.append(RepositoryTemplate(this.model.attributes));
            return Backbone.View.prototype.render.call(this);
        }
    });
});
