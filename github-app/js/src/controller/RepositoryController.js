define([
    'controller/Controller',
    'view/RepositoryView'
], function (Controller, RepositoryView) {

    function RepositoryController(model) {
        Controller.call(this, undefined, model);

        this.view = new RepositoryView({
            model: this.getModel()
        });
    }

    var proto = RepositoryController.prototype = Object.create(Controller.prototype);
    proto.constructor = RepositoryController;

    proto.setRepository = function (model) {
        this.model = model;
        this.view.model = this.model;
        this.view.render();
    };

    return RepositoryController;
});