define(function () {

    function Controller(view, model) {
        this.view = view;
        this.model = model;
    }

    Controller.prototype = Object.create({
        constructor: Controller,

        getView: function () {
            return this.view;
        },

        getModel: function () {
            return this.model;
        }

    });

    return Controller;
});