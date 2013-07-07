define([
    'template/RepositoryTemplate'
], function (RepositoryTemplate) {
    return Backbone.View.extend({
        render: function () {
            if (this.model) {
                console.log(this.model.attributes);
                this.$el
                    .empty()
                    .append(RepositoryTemplate(this.model.attributes));
            }

            return Backbone.View.prototype.render.call(this);
        }
    });
});
