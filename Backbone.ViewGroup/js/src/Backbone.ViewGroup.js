(function ($b) {
    var ViewGroup;

    /**
     * @constructor
     * Wrapper class to maintain a {Backbone.View} instance inside the ViewGroup class
     * @param name {String} name of the view
     * @param view {Backbone.View}
     */
    function ViewWrapper(name, view) {
        this.name = name;
        this.view = view;
        this.rendered = false;
    }

    ViewWrapper.prototype.render = function ($el) {
        if (!this.rendered) {
            $el.append(this.view.render().$el);
        }

        this.rendered = true;

        return this;
    };

    ViewWrapper.prototype.remove = function () {
        this.view.remove();
        this.rendered = false;
        return this;
    };

    var proto = {
        initialize: function () {
            this.children = {};
        },

        /**
         * adds a new View as a child
         * @param name {String} name of the child View
         * @param view {Backbone.View}
         * @param [render] {Boolean} should render the view? defaults to true
         * @returns {ViewGroup}
         */
        addView: function (name, view, render) {
            var children = this.children,
                child;

            if (!children.hasOwnProperty(name)) {
                child = new ViewWrapper(name, view);
                children[name] = child;

                if (render !== false) {
                    child.render(this.$el);
                }
            }

            return this;
        },

        /**
         * removes a View for the children map
         * @param name {String} name of the child View
         * @returns {ViewGroup}
         */
        removeView: function (name) {
            var view = this.children[name];

            if (view) {
                view.remove();
                delete this.children[name];
            }

            return this;
        },

        /**
         * renders all children
         * @returns {ViewGroup}
         */
        renderViews: function () {
            var children = this.children,
                name;

            for (name in children) {
                if (children.hasOwnProperty(name)) {
                    children[name].render(this.$el);
                }
            }

            return this;
        },

        /**
         * removes all children
         * @returns {ViewGroup}
         */
        removeViews: function () {
            var children = this.children,
                name;

            for (name in children) {
                if (children.hasOwnProperty(name)) {
                    children[name].remove();
                }
            }

            return this;
        },

        /**
         * rerenders all children
         * @returns {ViewGroup}
         */
        rerenderViews: function () {
            var children = this.children,
                name;

            for (name in children) {
                if (children.hasOwnProperty(name)) {
                    children[name]
                        .remove()
                        .render(this.$el);
                }
            }

            return this;
        },

        /**
         * @override
         * @returns {*}
         */
        rerender: function () {
            this.removeViews();
            this.render();

            return this;
        },

        /**
         * @override
         * @returns {*}
         */
        render: function () {
            this.renderViews();
            return Backbone.View.prototype.render.call(this);
        }

    };

    ViewGroup = $b.View.extend(proto);
    ViewGroup.ViewWrapper = ViewWrapper;
    ViewGroup.class = proto;

    $b.ViewGroup = ViewGroup;

}(Backbone));