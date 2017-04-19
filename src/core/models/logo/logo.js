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
var Logo = (function (_super) {
    __extends(Logo, _super);
    function Logo(params) {
        if (params === void 0) { params = null; }
        var _this = _super.call(this, params) || this;
        _this.base64 = params ? params.base64 : "";
        return _this;
    }
    return Logo;
}(base_1.default.BaseModel));
exports.Logo = Logo;
