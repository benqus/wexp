var SomethingMixin = function() {
    this._listeners = {};
};
SomethingMixin.prototype = {
    getSomething: function () {
        return this.something;
    },
    setSomething: function (something) {
        this.something = something;
    }
};

var SomethingElseMixin = function() {
    this._listeners = {};
};
SomethingElseMixin.prototype = {
    getSomethingElse: function () {
        return this.something;
    },
    setSomethingElse: function (something) {
        this.something = something;
    }
};

//function mixin(obj, Mixin) {
//    var mixins;
//
//    if (obj.getMixins === undefined) {
//        mixins = [];
//        obj.getMixins = function() {
//            return mixins;
//        };
//    }
//
//    mixins = obj.getMixins();
//    mixins.push(new Mixin());
//
//    obj.invokeBehaviour = function (Mixin, method) {
//        var i = 0;
//        var mixins = this.getMixins();
//        var mixin = mixins[i];
//
//        while (!(mixin instanceof Mixin) || i < mixins.length) {
//            mixin = mixins[i++];
//        }
//
//        if (mixin) {
//            return Mixin[method].apply(mixin, arguments);
//        }
//    };
//}









function mixin(obj, Mixin) {
    var mixins;

    if (typeof obj.getMixins === 'function') {
        mixins = [];
        obj.getMixins = function() {
            return mixins;
        };
    }

    mixins = obj.getMixins();
    mixins.push(new Mixin());
}


function mixMethod(Mixin, method) {
    return function() {
        var i = 0;
        var mixins = this.getMixins();
        var mixin = mixins[i];
        var result;

        while (!(mixin instanceof Mixin) || i < mixins.length) {
            mixin = mixins[i++];
        }

        if (mixin) {
            result = Mixin[method].apply(mixin, arguments);
        }

        return result;
    }
}

function mixinMethods(Klass) {
    var mixins = Array.prototype.slice.call(arguments, 1);
    var prototype = Klass.prototype;
    var Mixin;
    var i;

    while (mixins.length > 0) {
        Mixin = mixins.shift().prototype;

        for (i in Mixin) {
            if (Mixin.hasOwnProperty(i) && typeof Mixin[i] === 'function') {
                prototype[i] = Mixin[i];
            }
        }
    }

    return Klass;
}



//class
function MyClass() {
    mixin(this, EventEmitter);
}

MyClass.prototype = {
    constructor: MyClass,

    on: mixMethod(EventEmitter, 'on'),
    once: mixMethod(EventEmitter, 'once'),

    off: function () {
        return this.invokeBehaviour(EventEmitter, 'off', arguments);
    }

};

mixinMethods(MyClass, EventEmitter, OtherMixin);