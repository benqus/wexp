define(function () {

    function replaceUnderscores(string) {
        var array = string.split("_");
        var part;
        var i = 1;

        while (i < array.length) {
            part = array[i];
            array[i] = part.substr(0, 1).toUpperCase() + part.substr(1);
            i++;
        }

        return array.join("");
    }

    return Backbone.Model.extend({

        constructor: function (repository) {
            var obj = {};
            var i;

            Backbone.Model.prototype.constructor.call(this);

            for (i in repository) {
                if (repository.hasOwnProperty(i)) {
                    obj[replaceUnderscores(i)] = repository[i];
                }
            }

            this.set(obj);
        }

    });

});