var Base;
(function (Base) {
    var BaseModel = (function () {
        function BaseModel(o) {
            if (o === void 0) { o = null; }
            if (o) {
                this.id = o.id ? o.id : o.id;
                this.relations = o.relations ? o.relations : null;
            }
            this.relations = this.relations ? this.relations : {};
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
        return BaseModel;
    })();
    Base.BaseModel = BaseModel;
    ;
})(Base || (Base = {}));
;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Base;
