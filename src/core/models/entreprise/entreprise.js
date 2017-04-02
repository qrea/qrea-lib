var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require('../../../base/base');
var personne_1 = require('../personne/personne');
var identification_1 = require('../identification/identification');
var logo_1 = require('../logo/logo');
var Entreprise = (function (_super) {
    __extends(Entreprise, _super);
    function Entreprise(params) {
        if (params === void 0) { params = null; }
        _super.call(this, params);
        if (!params || !params.personne) {
            var personne = new personne_1.PersonnePhysique();
            this.personne = personne;
        }
        else {
            this.personne = params.personne;
        }
        if (!params || !params.identification) {
            this.identification = new identification_1.Identification();
        }
        else {
            this.identification = params.identification;
        }
        if (!params || !params.logo) {
            this.logo = new logo_1.Logo();
        }
        else {
            this.logo = params.logo;
        }
        this.isAdherentCGA = params ? params.isAdherentCGA : null;
        this.isExonere = params ? params.isExonere : null;
        this.isAssujettiTVA = params ? params.isAssujettiTVA : null;
        this.isFranchiseEnBase = params ? params.isFranchiseEnBase : null;
        this.isRegimeMargeBeneficiaire = params ? params.isRegimeMargeBeneficiaire : null;
        this.isAutoliquidation = params ? params.isAutoliquidation : null;
        this.numeroTVA = params ? params.numeroTVA : null;
        this.capital = params ? params.capital : null;
        this.isCapitalVariable = params ? params.isCapitalVariable : null;
        this.tauxPenalitesReglement = params ? params.tauxPenalitesReglement : null;
        this.conditionsEscompte = params ? params.conditionsEscompte : null;
        this.mentionsParticulieres = params ? params.mentionsParticulieres : null;
        this.modeReglementDefaut = params ? params.modeReglementDefaut : null;
    }
    Object.defineProperty(Entreprise.prototype, "personne", {
        get: function () {
            return this._personne;
        },
        set: function (p) {
            this._personne = p;
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
            var s = '';
            if (this.isPersonneMorale) {
                var p = this.personne;
                s += p.denominationSociale || '' + ' ' + p.forme || '';
            }
            else {
                var p = this.personne;
                s += p.nomCommercial || ((p.prenom || '') + ' ' + (p.nom || ''));
            }
            return s;
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
})(base_1.default.BaseModel);
exports.Entreprise = Entreprise;
