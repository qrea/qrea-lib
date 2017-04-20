var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require('../../../base/base');
var Logo = (function (_super) {
    __extends(Logo, _super);
    function Logo(params) {
        _super.call(this, params);
        this.base64 = params.base64 || "";
    }
    return Logo;
})(base_1.default.BaseModel);
exports.Logo = Logo;
