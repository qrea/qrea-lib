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
var personne_1 = require("../personne/personne");
var identification_1 = require("../identification/identification");
var logo_1 = require("../logo/logo");
var TypeActivite;
(function (TypeActivite) {
    TypeActivite[TypeActivite["liberale"] = 0] = "liberale";
    TypeActivite[TypeActivite["artisanale"] = 1] = "artisanale";
    TypeActivite[TypeActivite["commerciale"] = 2] = "commerciale";
    TypeActivite[TypeActivite["inconnu"] = 3] = "inconnu";
})(TypeActivite = exports.TypeActivite || (exports.TypeActivite = {}));
var Entreprise = (function (_super) {
    __extends(Entreprise, _super);
    function Entreprise(params) {
        if (params === void 0) { params = null; }
        var _this = _super.call(this, params) || this;
        if (!params || !params.personne) {
            var personne = new personne_1.PersonnePhysique();
            _this.personne = personne;
        }
        else {
            _this.personne = params.personne;
        }
        if (!params || !params.identification) {
            _this.identification = new identification_1.Identification();
        }
        else {
            _this.identification = params.identification;
        }
        if (!params || !params.logo) {
            _this.logo = new logo_1.Logo();
        }
        else {
            _this.logo = params.logo;
        }
        _this.isAdherentCGA = params ? params.isAdherentCGA : null;
        _this.isExonere = params ? params.isExonere : null;
        _this.isAssujettiTVA = params ? params.isAssujettiTVA : null;
        _this.isFranchiseEnBase = params ? params.isFranchiseEnBase : null;
        _this.isRegimeMargeBeneficiaire = params ? params.isRegimeMargeBeneficiaire : null;
        _this.isAutoliquidation = params ? params.isAutoliquidation : null;
        _this.numeroTVA = params ? params.numeroTVA : null;
        _this.capital = params ? params.capital : null;
        _this.isCapitalVariable = params ? params.isCapitalVariable : null;
        _this.tauxPenalitesReglement = params ? params.tauxPenalitesReglement : null;
        _this.conditionsEscompte = params ? params.conditionsEscompte : null;
        _this.mentionsParticulieres = params ? params.mentionsParticulieres : null;
        _this.modeReglementDefaut = params ? params.modeReglementDefaut : null;
        _this.typeActivite = params ? params.typeActivite : TypeActivite.inconnu;
        return _this;
    }
    Object.defineProperty(Entreprise.prototype, "personne", {
        get: function () {
            return this._personne;
        },
        set: function (p) {
            if (p['getName'] && ['PersonneMorale', 'PersonnePhysique', 'Personne'].indexOf(p.getName()) > -1) {
                this._personne = p;
            }
            else {
                this._personne = personne_1.Personne.instanciatePhysiqueOuMorale(p);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entreprise.prototype, "identification", {
        get: function () {
            return this._identification;
        },
        set: function (i) {
            this._identification = identification_1.Identification.instanciate(i);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entreprise.prototype, "logo", {
        get: function () {
            return this._logo;
        },
        set: function (l) {
            this._logo = logo_1.Logo.instanciate(l);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entreprise.prototype, "isPersonneMorale", {
        get: function () {
            if (this.personne.getName() === 'PersonneMorale') {
                return true;
            }
            return false;
        },
        set: function (value) {
            if (this.personne.getName() === 'PersonneMorale' && value === false) {
                this.personne = new personne_1.PersonnePhysique(this.personne);
            }
            else if (this.personne.getName() === 'PersonnePhysique' && value === true) {
                this.personne = new personne_1.PersonneMorale(this.personne);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entreprise.prototype, "nomComplet", {
        get: function () {
            return this.personne.nomComplet;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entreprise.prototype, "nomCompletCapital", {
        get: function () {
            var s = this.nomComplet;
            if (this.isPersonneMorale) {
                s += ' au capital ';
                if (this.isCapitalVariable) {
                    s += 'variable minimum ';
                }
                s += 'de ' + (this.capital || '?') + ' €';
            }
            return s;
        },
        enumerable: true,
        configurable: true
    });
    return Entreprise;
}(base_1.default.BaseModel));
exports.Entreprise = Entreprise;
