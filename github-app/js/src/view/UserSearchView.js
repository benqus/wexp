define([
    'model/AppModel',
    'template/UserSearchTemplate'
], function (AppModel, UserSearchTemplate) {

    return Backbone.View.extend({

        events: {
            "keyup .user-search": "onKeyUp"
        },

        onKeyUp: function (evt) {
            if (evt.keyCode === 13) {
                AppModel.setUser($(evt.target).val());
            }
        },

        render: function () {
            this.$el.append(UserSearchTemplate({
                "userName": AppModel.getUser()
            }));

            return Backbone.View.prototype.render.call(this);
        }

    });

});