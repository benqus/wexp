define(function () {
    return Backbone.Model.extend({
        url: "https://api.github.com/users/",

        defaults: {
            "userName": "",
            "reposUrl": undefined,
            "loaded": false
        },

        initialize: function (setup) {
            this.userName = setup.userName || setup.user;
            this.fetch();
        },

        fetch: function () {
            var that = this;
            var userName = that.userName;

            if (userName) {
                if (!this.get("loaded")) {
                    this.set({
                        "loaded": false
                    });
                }

                $.getJSON(that.url + userName + "?callback=?", function (data) {
                    that.updateModel(data.data);
                });
            }
        },

        updateModel: function (data) {
            this.set({
                "avatarUrl": data.avatar_url,
                "email": data.email,
                "name": data.name,
                "location": data.location,
                "githubUrl": data.html_url,
                "reposCount": data.public_repos,
                "reposUrl": data.repos_url,
                "loaded": true
            });
        }

    });
});