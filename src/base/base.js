System.register([], function(exports_1) {
    var Base;
    return {
        setters:[],
        execute: function() {
            (function (Base) {
                var BaseModel = (function () {
                    function BaseModel(o) {
                    }
                    BaseModel.instanciate = function (o) {
                        if (!o)
                            return null;
                        if (o['getName'] && o.getName() === this.getName()) {
                            return o;
                        }
                        else {
                            return new this(o);
                        }
                    };
                    ;
                    BaseModel.prototype.getName = function () {
                        return this.constructor.name;
                    };
                    ;
                    BaseModel.getName = function () {
                        return this.constructor.name;
                    };
                    ;
                    BaseModel.prototype.getPourcent = function (value) {
                        return Math.round(value * 100 * 100) / 100;
                    };
                    ;
                    BaseModel.prototype.round = function (value) {
                        var v = value * 100;
                        v = Math.round(v);
                        v = v / 100;
                        return v;
                    };
                    ;
                    BaseModel.prototype.watch = function (prop, handler) {
                        var oldval = this[prop];
                        var newval = oldval;
                        var getter = function () {
                            return newval;
                        };
                        var setter = function (val) {
                            oldval = newval;
                            return newval = handler.call(this, prop, oldval, val);
                        };
                        if (delete this[prop]) {
                            if (Object.defineProperty) {
                                Object.defineProperty(this, prop, {
                                    'get': getter,
                                    'set': setter
                                });
                            }
                            else if (Object.prototype['__defineGetter__'] && Object.prototype['__defineSetter__']) {
                                Object.prototype['__defineGetter__'].call(this, prop, getter);
                                Object.prototype['__defineSetter__'].call(this, prop, setter);
                            }
                        }
                    };
                    ;
                    BaseModel.prototype.unwatch = function (prop) {
                        var val = this[prop];
                        delete this[prop];
                        this[prop] = val;
                    };
                    ;
                    return BaseModel;
                })();
                Base.BaseModel = BaseModel;
                ;
            })(Base || (Base = {}));
            ;
            exports_1("default",Base);
        }
    }
});
