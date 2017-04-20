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
var adresse_1 = require("../adresse/adresse");
var identification_1 = require("../identification/identification");
var Personne = (function (_super) {
    __extends(Personne, _super);
    function Personne(params) {
        if (params === void 0) { params = null; }
        var _this = _super.call(this, params) || this;
        _this.adresse = params && params.adresse ? params.adresse : new adresse_1.Adresse({});
        _this.isEntreprise = params && params.isEntreprise ? params.isEntreprise : false;
        _this.numeroTVA = params && params.numeroTVA ? params.numeroTVA : null;
        _this.telephone = params && params.telephone ? params.telephone : null;
        _this.email = params && params.email ? params.email : null;
        _this.siteInternet = params && params.siteInternet ? params.siteInternet : null;
        _this.fax = params && params.fax ? params.fax : null;
        _this.identification = params && params.identification ? params.identification : new identification_1.Identification();
        _this.nomComplet = params && params.nomComplet ? params.nomComplet : null;
        return _this;
    }
    Personne.instanciatePhysiqueOuMorale = function (newPersonne) {
        if (!newPersonne ||
            (!newPersonne.denominationSociale && !newPersonne.nom)) {
            return new Personne();
        }
        else if (!newPersonne.denominationSociale) {
            return PersonnePhysique.instanciate(newPersonne);
        }
        else {
            return PersonneMorale.instanciate(newPersonne);
        }
    };
    Object.defineProperty(Personne.prototype, "adresse", {
        get: function () {
            return this._adresse;
        },
        set: function (a) {
            this._adresse = adresse_1.Adresse.instanciate(a);
        },
        enumerable: true,
        configurable: true
    });
    return Personne;
}(base_1.default.BaseModel));
exports.Personne = Personne;
var PersonnePhysique = (function (_super) {
    __extends(PersonnePhysique, _super);
    function PersonnePhysique(params) {
        if (params === void 0) { params = null; }
        var _this = _super.call(this, params) || this;
        _this.civilite = params ? params.civilite : null;
        _this.nom = params ? params.nom : null;
        _this.prenom = params ? params.prenom : null;
        _this.nomCommercial = params ? params.nomCommercial : null;
        return _this;
    }
    Object.defineProperty(PersonnePhysique.prototype, "nomComplet", {
        get: function () {
            if (this.nomCommercial) {
                return this.nomCommercial.toUpperCase();
            }
            else if (this._nomComplet) {
                return this._nomComplet;
            }
            else if (this.nom && this.prenom) {
                var nom = this.civilite ? this.civilite + ' ' : '';
                nom += this.nom ? this.nom.toUpperCase() : '';
                nom += ' ';
                nom += this.prenom ? this.prenom.toUpperCase() : '';
                return nom;
            }
            else {
                return this._nomComplet;
            }
        },
        set: function (v) {
            this._nomComplet = v;
        },
        enumerable: true,
        configurable: true
    });
    return PersonnePhysique;
}(Personne));
exports.PersonnePhysique = PersonnePhysique;
var PersonneMorale = (function (_super) {
    __extends(PersonneMorale, _super);
    function PersonneMorale(params) {
        if (params === void 0) { params = null; }
        var _this = _super.call(this, params) || this;
        _this.forme = params ? params.forme : null;
        _this.denominationSociale = params ? params.denominationSociale : null;
        _this.capitalSocial = params ? params.capitalSocial : null;
        _this.isCapitalVariable = params ? params.isCapitalVariable : false;
        return _this;
    }
    Object.defineProperty(PersonneMorale.prototype, "nomComplet", {
        get: function () {
            if (this._nomComplet) {
                return this._nomComplet;
            }
            else if (this.forme && this.denominationSociale) {
                var nom = this.forme.toUpperCase() + ' ' + this.denominationSociale.toUpperCase();
                return nom;
            }
            else {
                return this._nomComplet;
            }
        },
        set: function (v) {
            this._nomComplet = v;
        },
        enumerable: true,
        configurable: true
    });
    return PersonneMorale;
}(Personne));
exports.PersonneMorale = PersonneMorale;
