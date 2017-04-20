"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("../../../base/base");
var Identification = (function (_super) {
    __extends(Identification, _super);
    function Identification(params) {
        if (params === void 0) { params = null; }
        var _this = _super.call(this, params) || this;
        _this.SIREN = params ? params.SIREN : null;
        _this.NIC = params ? params.NIC : null;
        _this.APE = params ? params.APE : null;
        _this.RCS = params ? params.RCS : null;
        _this.RM = params ? params.RM : null;
        return _this;
    }
    Object.defineProperty(Identification.prototype, "SIRET", {
        get: function () {
            return this.SIREN + this.NIC;
        },
        enumerable: true,
        configurable: true
    });
    return Identification;
}(base_1.default.BaseModel));
exports.Identification = Identification;
