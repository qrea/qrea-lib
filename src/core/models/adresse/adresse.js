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
var Adresse = (function (_super) {
    __extends(Adresse, _super);
    function Adresse(params) {
        var _this = _super.call(this, params) || this;
        _this.nom = params ? params.nom : null;
        _this.ligne1 = params ? params.ligne1 : null;
        _this.ligne2 = params ? params.ligne2 : null;
        _this.cp = params ? params.cp : null;
        _this.ville = params ? params.ville : null;
        _this.pays = params ? params.pays : null;
        return _this;
    }
    return Adresse;
}(base_1.default.BaseModel));
exports.Adresse = Adresse;
