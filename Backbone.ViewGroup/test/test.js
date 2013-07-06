(function () {

    function getChildLength(viewGroup) {
        return Object.keys(viewGroup.children).length;
    }

    module("Backbone.ViewGroup");

    test("ViewGroup", function () {
        equal(typeof Backbone.ViewGroup, "function");
        equal(typeof Backbone.ViewGroup.ViewWrapper, "function");
        ok(Backbone.ViewGroup.class instanceof Object);
    });

    test("instance", function () {
        var viewGroup = new Backbone.ViewGroup();

        ok(viewGroup instanceof Backbone.ViewGroup);
        ok(viewGroup.children instanceof Object);
        equal(getChildLength(viewGroup), 0);
    });

    test("addChild, no render", function () {
        var ViewGroup = Backbone.ViewGroup;
        var viewGroup = new ViewGroup();
        var name = "child";
        var view = new Backbone.View({});

        viewGroup.addView(name, view, false);

        equal(getChildLength(viewGroup), 1);
        ok(viewGroup.children.hasOwnProperty(name));
        ok(viewGroup.children[name] instanceof ViewGroup.ViewWrapper);
        equal(viewGroup.children[name].name, name);
        equal(viewGroup.children[name].view, view);
        equal(viewGroup.children[name].rendered, false);
    });

    test("addChild, render", function () {
        var ViewGroup = Backbone.ViewGroup;
        var viewGroup = new ViewGroup();
        var name = "child";
        var view = new Backbone.View({});

        viewGroup.addView(name, view);

        equal(getChildLength(viewGroup), 1);
        ok(viewGroup.children.hasOwnProperty(name));
        ok(viewGroup.children[name] instanceof ViewGroup.ViewWrapper);
        equal(viewGroup.children[name].name, name);
        equal(viewGroup.children[name].view, view);
        equal(viewGroup.children[name].rendered, true);
        ok($.contains(viewGroup.$el[0], view.$el[0]));
    });

    test("removeChild", function () {
        var viewGroup = new Backbone.ViewGroup();
        var name = "child";
        var view = new Backbone.View({});

        viewGroup.addView(name, view);
        viewGroup.removeView(name);

        equal(getChildLength(viewGroup), 0);
        ok(!viewGroup.children.hasOwnProperty(name));
        ok(!$.contains(viewGroup.$el[0], view.$el[0]));
    });

}());